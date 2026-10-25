// Keeps the app usable without reception: the app files and viewed photos are stored on the device.
const VERSION = 'v2';
const SHELL = `shell-${VERSION}`;
const IMAGES = 'images-v1';
const FONTS = 'fonts-v1';
const FILES = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'firebase-app-compat.js', 'firebase-auth-compat.js', 'firebase-firestore-compat.js', 'fb-adapter.js',
  'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('shell-') && k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

async function cacheFirst(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
  return res;
}
async function networkFirst(req, name) {
  const cache = await caches.open(name);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    return (await cache.match(req)) || (req.mode === 'navigate' ? cache.match('index.html') : Response.error());
  }
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('googleapis.com') && url.hostname !== 'fonts.googleapis.com') return; // live data: Firestore keeps its own offline copy
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') { e.respondWith(cacheFirst(req, FONTS)); return; }
  if (url.origin === self.location.origin) {
    if (/(compat|\.min)\.js$/.test(url.pathname)) { e.respondWith(cacheFirst(req, SHELL)); return; }
    e.respondWith(networkFirst(req, SHELL));
  }
});
