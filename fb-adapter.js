/* Connects the catalog app to Firebase: login, data (Firestore) and photos (stored inside Firestore).
   The app talks to `window.claude.use(name)`; this file provides those pieces. */
(() => {
  'use strict';
  const cfg = window.FIREBASE_CONFIG || {};
  const ADMIN_COLLS = ['clients', 'settings', 'plantPricing'];
  const IMG_COLL = 'images';
  let resolveCaps; const capsP = new Promise(r => { resolveCaps = r; });
  window.claude = {use: async name => (await capsP)[name] ?? null};
  window.APP_LIBS = {pdf: ['vendor/html2canvas.min.js', 'vendor/jspdf.umd.min.js'], xlsx: 'vendor/xlsx.full.min.js'};
  window.APP_TEXT = {
    workers: 'לכל עובד פותחים משתמש ב-Firebase (Authentication ← Users ← Add user). מי שאינו ברשימת המנהלים רואה רק את קטלוג הצמחים, בלי מחירים, ספקים ולקוחות, ולא יכול לשנות דבר.',
    offline: 'שינויים שתעשו עכשיו יישמרו במכשיר ויישלחו אוטומטית כשהחיבור יחזור. תמונות שלא נצפו קודם לא יופיעו.',
  };

  const $ = s => document.querySelector(s);
  const lsGet = (k, d) => { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const newId = () => { const a = 'abcdefghijklmnopqrstuvwxyz0123456789'; let s = ''; crypto.getRandomValues(new Uint8Array(20)).forEach(x => s += a[x % a.length]); return s; };

  /* ---------- login screen ---------- */
  const gate = document.createElement('div');
  gate.id = 'authGate';
  gate.innerHTML = `<div class="auth-card" role="dialog" aria-labelledby="authTitle">
      <svg viewBox="0 0 40 40" width="56" height="56" aria-hidden="true"><path d="M20 31V18" stroke="var(--leaf)" stroke-width="3" stroke-linecap="round"/><path d="M20 22c-9 0-13-6-13-14 9 0 13 5 13 14z" fill="var(--leaf)"/><path d="M20 18c0-7 4-12 13-12 0 8-4 12-13 12z" fill="var(--leaf)" opacity=".6"/><path d="M11 30h18l-2 7H13z" fill="var(--clay)"/></svg>
      <h1 id="authTitle">קטלוג המשתלה</h1>
      <div id="authBody"><p class="muted">טוען…</p></div></div>`;
  document.body.appendChild(gate);
  const showMsg = html => { $('#authBody').innerHTML = html; };

  if (!cfg.apiKey || /YOUR|XXXX/.test(cfg.apiKey) || !cfg.projectId) {
    showMsg(`<p>האפליקציה עוד לא מחוברת ל-Firebase.</p><p class="muted">פתחו את הקובץ <b dir="ltr">config.js</b> והדביקו בו את הגדרות הפרויקט מ-Firebase, לפי ההוראות בקובץ "הוראות התקנה".</p>`);
    return;
  }
  firebase.initializeApp(cfg);
  const auth = firebase.auth();
  const fs = firebase.firestore();
  fs.settings({ignoreUndefinedProperties: true, cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED, merge: true});
  const persistP = fs.enablePersistence({synchronizeTabs: true}).catch(e => console.warn('offline cache not available', e && e.code));

  function loginForm(note = '') {
    showMsg(`<form id="loginForm" class="stack" novalidate>
        ${note ? `<p class="auth-note" role="alert">${note}</p>` : ''}
        <div class="field"><label for="lgEmail">אימייל</label><input class="inp" id="lgEmail" type="email" autocomplete="username" dir="ltr" required></div>
        <div class="field"><label for="lgPass">סיסמה</label><input class="inp" id="lgPass" type="password" autocomplete="current-password" dir="ltr" required></div>
        <button class="btn primary" id="lgGo">כניסה</button>
        <button type="button" class="btn ghost" id="lgForgot">שכחתי סיסמה</button>
        <p class="hint" id="lgState" aria-live="polite" style="margin:0"></p></form>`);
    $('#lgEmail').value = lsGet('lastEmail', '');
    ($('#lgEmail').value ? $('#lgPass') : $('#lgEmail')).focus();
    $('#loginForm').onsubmit = async e => {
      e.preventDefault();
      const email = $('#lgEmail').value.trim(), password = $('#lgPass').value;
      if (!email || !password) { $('#lgState').textContent = 'מלאו אימייל וסיסמה.'; return; }
      if (!navigator.onLine) { $('#lgState').textContent = 'אין חיבור לאינטרנט. הכניסה הראשונה דורשת חיבור.'; return; }
      $('#lgGo').disabled = true; $('#lgState').textContent = 'מתחבר…';
      try { await auth.signInWithEmailAndPassword(email, password); lsSet('lastEmail', email); }
      catch (err) {
        $('#lgGo').disabled = false;
        const c = err && err.code || '';
        $('#lgState').textContent = /invalid-credential|wrong-password|user-not-found|invalid-email/.test(c) ? 'האימייל או הסיסמה שגויים.' : /too-many-requests/.test(c) ? 'יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.' : 'הכניסה נכשלה (' + c + ').';
      }
    };
    $('#lgForgot').onclick = async () => {
      const email = $('#lgEmail').value.trim();
      if (!email) { $('#lgState').textContent = 'כתבו קודם את האימייל, ואז לחצו שוב.'; $('#lgEmail').focus(); return; }
      try { await auth.sendPasswordResetEmail(email); $('#lgState').textContent = 'אם האימייל רשום, נשלח אליו קישור לבחירת סיסמה חדשה.'; }
      catch (err) { $('#lgState').textContent = 'השליחה נכשלה (' + (err && err.code) + ').'; }
    };
  }

  /* ---------- data: thin layer over Firestore ---------- */
  const mapErr = e => ({code: e && e.code === 'permission-denied' ? 'invalid_argument' : e && e.code === 'resource-exhausted' ? 'quota_exceeded' : 'unavailable', message: (e && e.message) || 'error'});
  const clean = o => JSON.parse(JSON.stringify(o));
  // nested objects in an update are merged field by field (the app relies on this)
  function flatten(obj, prefix = '', out = {}) {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? prefix + '.' + k : k;
      if (v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length) flatten(v, key, out); else out[key] = v;
    }
    return out;
  }
  // when offline, a write is applied on the device at once and synced later, so don't wait for the server
  const settle = p => { if (!navigator.onLine) { p.catch(e => console.warn('sync failed', e)); return Promise.resolve(); } return p.catch(e => { throw mapErr(e); }); };
  const wrapDocSnap = s => ({id: s.id, exists: s.exists, data: () => s.data(), metadata: s.metadata});
  function docRef(r) {
    return {
      id: r.id, path: r.path,
      get: async () => { try { return wrapDocSnap(await r.get()); } catch (e) { try { return wrapDocSnap(await r.get({source: 'cache'})); } catch { throw mapErr(e); } } },
      set: d => settle(r.set(clean(d))),
      update: async d => { const snap = await r.get().catch(() => r.get({source: 'cache'})); if (!snap.exists) throw {code: 'invalid_argument', message: 'missing document'}; return settle(r.update(flatten(clean(d)))); },
      delete: () => settle(r.delete()),
      onSnapshot(next, err) { return r.onSnapshot({includeMetadataChanges: false}, s => next(wrapDocSnap(s)), e => err && err(mapErr(e))); },
    };
  }
  function collRef(c) {
    const ref = fs.collection(c);
    return {
      path: c,
      doc: id => docRef(id ? ref.doc(id) : ref.doc()),
      add: async d => { const r = ref.doc(); await settle(r.set(clean(d))); return docRef(r); },
      onSnapshot(next, err) {
        let seenServer = false;
        return ref.onSnapshot({includeMetadataChanges: true}, s => {
          if (!s.metadata.fromCache) seenServer = true;
          if (s.empty && s.metadata.fromCache && !seenServer) return; // nothing cached yet: keep showing the saved copy
          next({docs: s.docs.map(wrapDocSnap), size: s.size, empty: s.empty, docChanges: () => [], metadata: s.metadata});
        }, e => err && err(mapErr(e)));
      },
    };
  }
  const dbApi = {doc: path => docRef(fs.doc(path)), collection: c => collRef(c)};

  /* ---------- photos: stored as compressed images inside Firestore ---------- */
  const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const urls = new Map(), blobs = new Map(), pending = new Map();
  const MARK = '#asset=';
  async function loadAsset(id) {
    if (blobs.has(id)) return blobs.get(id);
    if (pending.has(id)) return pending.get(id);
    const p = (async () => {
      const r = fs.collection(IMG_COLL).doc(id);
      let s = null;
      try { s = await r.get({source: 'cache'}); } catch {}
      if (!s || !s.exists) s = await r.get();
      if (!s.exists) throw new Error('missing image');
      const b = await (await fetch(s.data().data)).blob();
      blobs.set(id, b); urls.set(id, URL.createObjectURL(b));
      swapAll(id);
      return b;
    })().finally(() => pending.delete(id));
    pending.set(id, p);
    return p;
  }
  function swapAll(id) {
    const u = urls.get(id); if (!u) return;
    document.querySelectorAll('img').forEach(im => { const src = im.getAttribute('src') || ''; if (src.endsWith(MARK + encodeURIComponent(id))) im.src = u; });
  }
  window.assetUrl = id => {
    if (urls.has(id)) return urls.get(id);
    loadAsset(id).catch(() => {});
    return PIXEL + MARK + encodeURIComponent(id);
  };
  window.assetBlob = id => loadAsset(id);
  window.preloadAssets = ids => Promise.all(ids.map(id => loadAsset(id).catch(() => null)));
  // images rendered after their photo finished loading get the real address too
  new MutationObserver(muts => {
    for (const m of muts) {
      const nodes = m.type === 'attributes' ? [m.target] : [...m.addedNodes];
      for (const n of nodes) {
        if (!(n instanceof Element)) continue;
        const imgs = n.tagName === 'IMG' ? [n] : n.querySelectorAll ? n.querySelectorAll('img') : [];
        imgs.forEach(im => { const src = im.getAttribute('src') || ''; const i = src.indexOf(MARK); if (i >= 0) { const id = decodeURIComponent(src.slice(i + MARK.length)); if (urls.has(id)) im.src = urls.get(id); } });
      }
    }
  }).observe(document.body, {subtree: true, childList: true, attributes: true, attributeFilter: ['src']});

  async function compress(b) {
    const MAX_BYTES = 900 * 1024; // a Firestore document holds up to 1MB
    if (b.type === 'image/svg+xml' && b.size < MAX_BYTES * 0.7) return b;
    let bmp; try { bmp = await createImageBitmap(b); } catch { throw {code: 'unsupported_type', message: 'not an image'}; }
    for (const [max, q] of [[1600, .82], [1300, .78], [1000, .72], [800, .65]]) {
      const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const cv = document.createElement('canvas'); cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
      cv.getContext('2d').drawImage(bmp, 0, 0, cv.width, cv.height);
      const out = await new Promise(r => cv.toBlob(r, 'image/jpeg', q));
      if (out && out.size * 1.37 < MAX_BYTES) return out;
    }
    throw {code: 'too_large', message: 'image too large'};
  }
  const toDataUrl = b => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(b); });
  const assetsApi = {
    async upload(b) {
      const small = await compress(b);
      const id = newId();
      await settle(fs.collection(IMG_COLL).doc(id).set({data: await toDataUrl(small), type: small.type || 'image/jpeg', size: small.size, createdAt: Date.now()}));
      blobs.set(id, small); urls.set(id, URL.createObjectURL(small));
      return {id, url: urls.get(id), sizeBytes: small.size, contentType: small.type};
    },
    async delete(id) { await settle(fs.collection(IMG_COLL).doc(String(id)).delete()); return {deleted: true}; },
    async list() { return {assets: [], usage: {}}; },
  };

  /* ---------- downloads: a normal browser download ---------- */
  const downloadsApi = {
    async save({filename, data}) {
      const b = data instanceof Blob ? data : new Blob([data]);
      const url = URL.createObjectURL(b); const a = document.createElement('a');
      a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    },
  };

  /* ---------- start the app once signed in ---------- */
  let started = false;
  async function start(user) {
    if (started) return; started = true;
    await persistP;
    const email = (user.email || '').toLowerCase();
    let isAdmin = lsGet('isAdmin:' + user.uid, false);
    try { const s = await fs.collection('admins').doc(email).get(); isAdmin = s.exists; lsSet('isAdmin:' + user.uid, isAdmin); }
    catch { try { const s = await fs.collection('admins').doc(email).get({source: 'cache'}); if (s.exists) isAdmin = true; } catch {} }
    const userApi = {
      canEdit: async () => isAdmin, isOwner: async () => isAdmin, can: async () => isAdmin,
      id: async () => user.uid, me: async () => ({id: user.uid, email: user.email, name: user.displayName || ''}),
    };
    gate.remove();
    addAccountButton(user.email);
    resolveCaps({db: dbApi, user: userApi, assets: isAdmin ? assetsApi : null, downloads: downloadsApi});
  }
  function addAccountButton(email) {
    const grp = document.querySelector('.a11y'); if (!grp) return;
    const b = document.createElement('button');
    b.className = 'icon-btn'; b.title = 'יציאה (' + email + ')'; b.setAttribute('aria-label', 'יציאה מהחשבון ' + email);
    b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/></svg>';
    b.onclick = async () => {
      try { localStorage.removeItem('catalogCache1'); } catch {}
      try { await auth.signOut(); await fs.terminate(); await fs.clearPersistence(); } catch {}
      location.reload();
    };
    grp.appendChild(b);
  }
  auth.onAuthStateChanged(user => {
    if (user) start(user);
    else if (!started) loginForm(navigator.onLine ? '' : 'אין חיבור לאינטרנט. הכניסה הראשונה דורשת חיבור.');
  });
})();
