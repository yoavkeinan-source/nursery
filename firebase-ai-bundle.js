(()=>{var ht=()=>{};var pt=function(t){let e=[],n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},En=function(t){let e=[],n=0,s=0;for(;n<t.length;){let r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){let i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){let i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{let i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},re={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){let i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,g=i>>2,h=(i&3)<<4|a>>4,f=(a&15)<<2|l>>6,E=l&63;c||(E=64,o||(f=64)),s.push(n[g],n[h],n[f],n[E])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(pt(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):En(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){let i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;let l=r<t.length?n[t.charAt(r)]:64;++r;let h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||h==null)throw new Se;let f=i<<2|a>>4;if(s.push(f),l!==64){let E=a<<4&240|l>>2;if(s.push(E),h!==64){let p=l<<6&192|h;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Se=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},_n=function(t){let e=pt(t);return re.encodeByteArray(e,!0)},Ae=function(t){return _n(t).replace(/\./g,"")},gt=function(t){try{return re.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function K(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var bn=()=>K().__FIREBASE_DEFAULTS__,wn=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yn=()=>{if(typeof document=="undefined")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&gt(t[1]);return e&&JSON.parse(e)},Sn=()=>{try{return ht()||bn()||wn()||yn()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}};var Te=()=>{var t;return(t=Sn())==null?void 0:t.config};var T=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}};function Y(){try{return typeof indexedDB=="object"}catch{return!1}}function mt(){return new Promise((t,e)=>{try{let n=!0,s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}var An="FirebaseError",v=class t extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=An,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,U.prototype.create)}},U=class{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){let s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Tn(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new v(r,a,s)}};function Tn(t,e){try{let n=0,s="";for(;n<t.length;){let r=t.indexOf("{$",n);if(r===-1){s+=t.substring(n);break}let i=t.indexOf("}",r+2);if(i===-1){s+=t.substring(n);break}let o=t.substring(r+2,i),a=e[o];s+=t.substring(n,r)+(a!=null?String(a):`<${o}?>`),n=i+1}return s}catch{return t}}function ie(t,e){if(t===e)return!0;let n=Object.keys(t),s=Object.keys(e);for(let r of n){if(!s.includes(r))return!1;let i=t[r],o=e[r];if(ft(i)&&ft(o)){if(!ie(i,o))return!1}else if(i!==o)return!1}for(let r of s)if(!n.includes(r))return!1;return!0}function ft(t){return t!==null&&typeof t=="object"}var On=1e3,Rn=2,Cn=4*60*60*1e3,In=.5;function Et(t,e=On,n=Rn){let s=e*Math.pow(n,t),r=Math.round(In*s*(Math.random()-.5)*2);return Math.min(Cn,s+r)}function oe(t){return t&&t._delegate?t._delegate:t}var A=class{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var $="[DEFAULT]";var Oe=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let s=new T;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var r;let n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(r=e==null?void 0:e.optional)!=null?r:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dn(e))try{this.getOrInitializeService({instanceIdentifier:$})}catch{}for(let[n,s]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(n);try{let i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=$){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$){return this.instances.has(e)}getOptions(e=$){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(let[i,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var o;let s=this.normalizeInstanceIdentifier(n),r=(o=this.onInitCallbacks.get(s))!=null?o:new Set;r.add(e),this.onInitCallbacks.set(s,r);let i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){let s=this.onInitCallbacks.get(n);if(s)for(let r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:vn(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=$){return this.component?this.component.multipleInstances?e:$:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function vn(t){return t===$?void 0:t}function Dn(t){return t.instantiationMode==="EAGER"}var ae=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new Oe(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var kn=[],_;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(_||(_={}));var Nn={debug:_.DEBUG,verbose:_.VERBOSE,info:_.INFO,warn:_.WARN,error:_.ERROR,silent:_.SILENT},Ln=_.INFO,Pn={[_.DEBUG]:"log",[_.VERBOSE]:"log",[_.INFO]:"info",[_.WARN]:"warn",[_.ERROR]:"error"},Mn=(t,e,...n)=>{if(e<t.logLevel)return;let s=new Date().toISOString(),r=Pn[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},L=class{constructor(e){this.name=e,this._logLevel=Ln,this._logHandler=Mn,this._userLogHandler=null,kn.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in _))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Nn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,_.DEBUG,...e),this._logHandler(this,_.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,_.VERBOSE,...e),this._logHandler(this,_.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,_.INFO,...e),this._logHandler(this,_.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,_.WARN,...e),this._logHandler(this,_.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,_.ERROR,...e),this._logHandler(this,_.ERROR,...e)}};var xn=(t,e)=>e.some(n=>t instanceof n),_t,bt;function Un(){return _t||(_t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $n(){return bt||(bt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var wt=new WeakMap,Ce=new WeakMap,yt=new WeakMap,Re=new WeakMap,ve=new WeakMap;function Bn(t){let e=new Promise((n,s)=>{let r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(R(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&wt.set(n,t)}).catch(()=>{}),ve.set(e,t),e}function Fn(t){if(Ce.has(t))return;let e=new Promise((n,s)=>{let r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Ce.set(t,e)}var Ie={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ce.get(t);if(e==="objectStoreNames")return t.objectStoreNames||yt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return R(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function St(t){Ie=t(Ie)}function Hn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let s=t.call(ce(this),e,...n);return yt.set(s,e.sort?e.sort():[e]),R(s)}:$n().includes(t)?function(...e){return t.apply(ce(this),e),R(wt.get(this))}:function(...e){return R(t.apply(ce(this),e))}}function Gn(t){return typeof t=="function"?Hn(t):(t instanceof IDBTransaction&&Fn(t),xn(t,Un())?new Proxy(t,Ie):t)}function R(t){if(t instanceof IDBRequest)return Bn(t);if(Re.has(t))return Re.get(t);let e=Gn(t);return e!==t&&(Re.set(t,e),ve.set(e,t)),e}var ce=t=>ve.get(t);function Tt(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){let o=indexedDB.open(t,e),a=R(o);return s&&o.addEventListener("upgradeneeded",c=>{s(R(o.result),c.oldVersion,c.newVersion,R(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Vn=["get","getKey","getAll","getAllKeys","count"],jn=["put","add","delete","clear"],De=new Map;function At(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(De.get(e))return De.get(e);let n=e.replace(/FromIndex$/,""),s=e!==n,r=jn.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Vn.includes(n)))return;let i=async function(o,...a){let c=this.transaction(o,r?"readwrite":"readonly"),l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return De.set(e,i),i}St(t=>({...t,get:(e,n,s)=>At(e,n)||t.get(e,n,s),has:(e,n)=>!!At(e,n)||t.has(e,n)}));var Ne=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Wn(n)){let s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}};function Wn(t){let e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}var Le="@firebase/app",Ot="0.16.2";var k=new L("@firebase/app"),zn="@firebase/app-compat",Kn="@firebase/analytics-compat",Yn="@firebase/analytics",qn="@firebase/app-check-compat",Jn="@firebase/app-check",Xn="@firebase/auth",Qn="@firebase/auth-compat",Zn="@firebase/database",es="@firebase/data-connect",ts="@firebase/database-compat",ns="@firebase/functions",ss="@firebase/functions-compat",rs="@firebase/installations",is="@firebase/installations-compat",os="@firebase/messaging",as="@firebase/messaging-compat",cs="@firebase/performance",ls="@firebase/performance-compat",us="@firebase/remote-config",ds="@firebase/remote-config-compat",hs="@firebase/storage",fs="@firebase/storage-compat",ps="@firebase/firestore",gs="@firebase/ai",ms="@firebase/firestore-compat",Es="firebase";var Pe="[DEFAULT]",_s={[Le]:"fire-core",[zn]:"fire-core-compat",[Yn]:"fire-analytics",[Kn]:"fire-analytics-compat",[Jn]:"fire-app-check",[qn]:"fire-app-check-compat",[Xn]:"fire-auth",[Qn]:"fire-auth-compat",[Zn]:"fire-rtdb",[es]:"fire-data-connect",[ts]:"fire-rtdb-compat",[ns]:"fire-fn",[ss]:"fire-fn-compat",[rs]:"fire-iid",[is]:"fire-iid-compat",[os]:"fire-fcm",[as]:"fire-fcm-compat",[cs]:"fire-perf",[ls]:"fire-perf-compat",[us]:"fire-rc",[ds]:"fire-rc-compat",[hs]:"fire-gcs",[fs]:"fire-gcs-compat",[ps]:"fire-fst",[ms]:"fire-fst-compat",[gs]:"fire-vertex","fire-js":"fire-js",[Es]:"fire-js-all"};var le=new Map,bs=new Map,Me=new Map;function Rt(t,e){try{t.container.addComponent(e)}catch(n){k.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function P(t){let e=t.name;if(Me.has(e))return k.debug(`There were multiple attempts to register component ${e}.`),!1;Me.set(e,t);for(let n of le.values())Rt(n,t);for(let n of bs.values())Rt(n,t);return!0}function G(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Dt(t){return t==null?!1:t.settings!==void 0}var ws={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new U("app","Firebase",ws);var xe=class{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new A("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}};function Be(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let s={name:Pe,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw D.create("bad-app-name",{appName:String(r)});if(n||(n=Te()),!n)throw D.create("no-options");let i=le.get(r);if(i)if(ie(n,i.options)){if(ie(s,i.config))return i;throw D.create("duplicate-app",{appName:r,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(s)})}else throw D.create("duplicate-app",{appName:r,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(n)});let o=new ae(r);for(let c of Me.values())o.addComponent(c);let a=new xe(n,s,o);return le.set(r,a),a}function ue(t=Pe){let e=le.get(t);if(!e&&t===Pe&&Te())return Be();if(!e)throw D.create("no-app",{appName:t});return e}function C(t,e,n){var o;let s=(o=_s[t])!=null?o:t;n&&(s+=`-${n}`);let r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){let a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),k.warn(a.join(" "));return}P(new A(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var ys="firebase-heartbeat-database",Ss=1,q="firebase-heartbeat-store",ke=null;function kt(){return ke||(ke=Tt(ys,Ss,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(q)}catch(n){console.warn(n)}}}}).catch(t=>{throw D.create("idb-open",{originalErrorMessage:t.message})})),ke}async function As(t){try{let n=(await kt()).transaction(q),s=await n.objectStore(q).get(Nt(t));return await n.done,s}catch(e){if(e instanceof v)k.warn(e.message);else{let n=D.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});k.warn(n.message)}}}async function Ct(t,e){try{let s=(await kt()).transaction(q,"readwrite");await s.objectStore(q).put(e,Nt(t)),await s.done}catch(n){if(n instanceof v)k.warn(n.message);else{let s=D.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});k.warn(s.message)}}}function Nt(t){return`${t.name}!${t.options.appId}`}var Ts=1024,Os=30,Ue=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new $e(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=It();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>Os){let o=Cs(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){k.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=It(),{heartbeatsToSend:s,unsentEntries:r}=Rs(this._heartbeatsCache.heartbeats),i=Ae(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return k.warn(n),""}}};function It(){return new Date().toISOString().substring(0,10)}function Rs(t,e=Ts){let n=[],s=t.slice();for(let r of t){let i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),vt(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),vt(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}var $e=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Y()?mt().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await As(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var s;if(await this._canUseIndexedDBPromise){let r=await this.read();return Ct(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var s;if(await this._canUseIndexedDBPromise){let r=await this.read();return Ct(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function vt(t){return Ae(JSON.stringify({version:2,heartbeats:t})).length}function Cs(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}function Is(t){P(new A("platform-logger",e=>new Ne(e),"PRIVATE")),P(new A("heartbeat",e=>new Ue(e),"PRIVATE")),C(Le,Ot,t),C(Le,Ot,"esm2020"),C("fire-js","")}Is("");var vs="firebase",Ds="12.19.0";C(vs,Ds,"app");var Lt="@firebase/ai",je="2.16.0";var F="AI",ks="us-central1",Ns="global",Ls="firebasevertexai.googleapis.com",V="v1beta",Pt=je,Ps="gl-js",Ms="hybrid",xs=180*1e3,Us="gemini-2.5-flash-lite";var d=class t extends v{constructor(e,n,s){let r=F,i=`${r}/${e}`,o=`${r}: ${n} (${i})`;super(e,o),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,t),Object.setPrototypeOf(this,t.prototype),this.toString=()=>o}};var Mt=["user","model","function","system"];var Gt={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"};var S={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"};var O={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},M={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};var u={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};var I={AGENT_PLATFORM:"AGENT_PLATFORM",VERTEX_AI:"VERTEX_AI",GOOGLE_AI:"GOOGLE_AI"};var X=class{constructor(e){this.backendType=e}},H=class extends X{constructor(){super(I.GOOGLE_AI)}_getModelPath(e,n){return`/${V}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${V}/projects/${e}/templates/${n}`}},Q=class extends X{constructor(e){super(I.VERTEX_AI),this.location=ks,e&&(this.location=e)}_getModelPath(e,n){return`/${V}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${V}/projects/${e}/locations/${this.location}/templates/${n}`}},Z=class extends X{constructor(e){super(I.AGENT_PLATFORM),this.location=Ns,e&&(this.location=e)}_getModelPath(e,n){return`/${V}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${V}/projects/${e}/locations/${this.location}/templates/${n}`}};function $s(t){if(t instanceof H)return`${F}/googleai`;if(t instanceof Q)return`${F}/vertexai/${t.location}`;if(t instanceof Z)return`${F}/agentplatform/${t.location}`;throw new d(u.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function Bs(t){let e=t.split("/");if(e[0]!==F)throw new d(u.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"vertexai":let s=e[2];if(!s)throw new d(u.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new Q(s);case"agentplatform":let r=e[2];if(!r)throw new d(u.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new Z(r);case"googleai":return new H;default:throw new d(u.ERROR,`Invalid instance identifier string: '${t}'`)}}var w=new L("@firebase/vertexai"),N;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(N||(N={}));var Vt={type:"text",languages:["en"]},Fe=[Vt,{type:"image"}],He=[Vt],he=class t{constructor(e,n,s){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:Fe,expectedOutputs:He}},s&&(this.onDeviceParams=s,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=Fe),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=He)):this.onDeviceParams.createOptions={expectedInputs:Fe,expectedOutputs:He})}async isAvailable(e){var s;if(!this.mode)return w.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===O.ONLY_IN_CLOUD)return w.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;let n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));if(this.mode===O.ONLY_ON_DEVICE){if(n===N.UNAVAILABLE)throw new d(u.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===N.DOWNLOADABLE||n===N.DOWNLOADING){w.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(r){throw new d(u.ERROR,r.message)}return!0}return!0}return n!==N.AVAILABLE?(w.debug(`On-device inference unavailable because availability is "${n}".`),!1):t.isOnDeviceRequest(e)?!0:(w.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),r=await n.prompt(s,this.onDeviceParams.promptOptions);return t.toResponse(r)}async generateContentStream(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),r=n.promptStreaming(s,this.onDeviceParams.promptOptions);return t.toStreamResponse(r)}async countTokens(e){throw new d(u.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return w.debug("Empty prompt rejected for on-device inference."),!1;for(let n of e.contents){if(n.parts.some(s=>"functionResponse"in s))return w.debug("Content with a function response part rejected for on-device inference."),!1;for(let s of n.parts)if(s.inlineData&&t.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return w.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var s;let n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));return(n===N.DOWNLOADABLE||n===N.DOWNLOADING)&&this.download(e),n}download(e){var s;if(this.downloadPromise)return;let n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=r=>{r.addEventListener("downloadprogress",i=>{e(i.loaded)})}),this.downloadPromise=(s=this.languageModelProvider)==null?void 0:s.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){let n=await Promise.all(e.parts.map(t.toLanguageModelMessageContent));return{role:t.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if(e.text)return{type:"text",value:e.text};if(e.inlineData){let s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new d(u.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new d(u.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");let e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){let n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,r){let i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});r.enqueue(n.encode(`data: ${i}

`))}}))}}};he.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function Fs(t,e,n){let r=(e||K()).LanguageModel;if(r&&t)return new he(r,t,n)}var We=class{constructor(e,n,s,r,i){this.app=e,this.backend=n,this.chromeAdapterFactory=i;let o=r==null?void 0:r.getImmediate({optional:!0}),a=s==null?void 0:s.getImmediate({optional:!0});this.auth=a||null,this.appCheck=o||null,n instanceof Q||n instanceof Z?this.location=n.location:this.location=""}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}};function Hs(t,{instanceIdentifier:e}){if(!e)throw new d(u.ERROR,"AIService instance identifier is undefined.");let n=Bs(e),s=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new We(s,n,r,i,Fs)}function Gs(t){var n,s,r,i,o,a,c;if((s=(n=t.app)==null?void 0:n.options)!=null&&s.apiKey)if((i=(r=t.app)==null?void 0:r.options)!=null&&i.projectId){if(!((a=(o=t.app)==null?void 0:o.options)!=null&&a.appId))throw new d(u.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new d(u.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new d(u.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');let e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,location:t.location,backend:t.backend};if(Dt(t.app)&&t.app.settings.appCheckToken){let l=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:l})}else t.appCheck&&((c=t.options)!=null&&c.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}var ze=class t{constructor(e,n){this._apiSettings=Gs(e),this.model=t.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===I.GOOGLE_AI?t.normalizeGoogleAIModelName(e):t.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}};var Vs="Timeout has expired.",Ge="AbortError",Ke=class{constructor(e){this.params=e}toString(){let e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e,n;return(n=(e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)!=null?n:`https://${Ls}`}get queryParams(){let e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}};function js(t){let e=[];return e.push(`${Ps}/${Pt}`),e.push(`fire/${Pt}`),(t.params.apiSettings.inferenceMode===O.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===O.PREFER_IN_CLOUD)&&e.push(Ms),e.join(" ")}async function Ws(t){let e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",js(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){let n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&w.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){let n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Xe(t,e){var l,g,h;let n=new Ke(t),s,r=(l=t.singleRequestOptions)==null?void 0:l.signal,i=((g=t.singleRequestOptions)==null?void 0:g.timeout)!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:xs,o=new AbortController,a=setTimeout(()=>{o.abort(new DOMException(Vs,Ge)),w.debug(`Aborting request to ${n} due to timeout (${i}ms)`)},i),c=AbortSignal.any(r?[r,o.signal]:[o.signal]);if(r&&r.aborted)throw clearTimeout(a),new DOMException((h=r.reason)!=null?h:"Aborted externally before fetch",Ge);try{let f={method:"POST",headers:await Ws(n),signal:c,body:e};if(s=await fetch(n.toString(),f),!s.ok){let E="",p;try{let m=await s.json();E=m.error.message,m.error.details&&(E+=` ${JSON.stringify(m.error.details)}`,p=m.error.details)}catch{}throw s.status===403&&p&&p.some(m=>m.reason==="SERVICE_DISABLED")&&p.some(m=>{var z,te;return(te=(z=m.links)==null?void 0:z[0])==null?void 0:te.description.includes("Google developers console API activation")})?new d(u.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:s.status,statusText:s.statusText,errorDetails:p}):new d(u.FETCH_ERROR,`Error fetching from ${n}: [${s.status} ${s.statusText}] ${E}`,{status:s.status,statusText:s.statusText,errorDetails:p})}}catch(f){let E=f;throw f.code!==u.FETCH_ERROR&&f.code!==u.API_NOT_ENABLED&&f instanceof Error&&f.name!==Ge&&(E=new d(u.ERROR,`Error fetching from ${n.toString()}: ${f.message}`),E.stack=f.stack),E}finally{clearTimeout(a)}return s}function de(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&w.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Wt(t.candidates[0]))throw new d(u.RESPONSE_ERROR,`Response error: ${B(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function fe(t,e=M.IN_CLOUD){t.candidates&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0);let n=zs(t);return n.inferenceSource=e,n}function zs(t){return t.text=()=>{if(de(t))return xt(t,e=>!e.thought);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Text not available. ${B(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(de(t)){let e=xt(t,n=>!!n.thought);return e===""?void 0:e}else if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Thought summary not available. ${B(t)}`,{response:t})},t.inlineDataParts=()=>{if(de(t))return Ks(t);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Data not available. ${B(t)}`,{response:t})},t.functionCalls=()=>{if(de(t))return jt(t);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Function call not available. ${B(t)}`,{response:t})},t}function xt(t,e){var s,r,i,o;let n=[];if((r=(s=t.candidates)==null?void 0:s[0].content)!=null&&r.parts)for(let a of(o=(i=t.candidates)==null?void 0:i[0].content)==null?void 0:o.parts)a.text&&e(a)&&n.push(a.text);return n.length>0?n.join(""):""}function jt(t){var n,s,r,i;if(!t)return;let e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(let o of(i=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:i.parts)o.functionCall&&e.push(o.functionCall);if(e.length>0)return e}function Ks(t){var n,s,r,i;let e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(let o of(i=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:i.parts)o.inlineData&&e.push(o);if(e.length>0)return e}var Ys=[S.RECITATION,S.SAFETY,S.BLOCKLIST,S.PROHIBITED_CONTENT,S.SPII,S.MALFORMED_FUNCTION_CALL,S.IMAGE_SAFETY,S.IMAGE_PROHIBITED_CONTENT,S.IMAGE_OTHER,S.NO_IMAGE,S.IMAGE_RECITATION,S.LANGUAGE,S.UNEXPECTED_TOOL_CALL,S.TOO_MANY_TOOL_CALLS,S.MISSING_THOUGHT_SIGNATURE,S.MALFORMED_RESPONSE];function Wt(t){return!!t.finishReason&&Ys.some(e=>e===t.finishReason)}function B(t){var n,s,r;let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",(n=t.promptFeedback)!=null&&n.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),(s=t.promptFeedback)!=null&&s.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if((r=t.candidates)!=null&&r[0]){let i=t.candidates[0];Wt(i)&&(e+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(e+=`: ${i.finishMessage}`))}return e}function zt(t){var e,n;if((e=t.safetySettings)==null||e.forEach(s=>{if(s.method)throw new d(u.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(n=t.generationConfig)!=null&&n.topK){let s=Math.round(t.generationConfig.topK);s!==t.generationConfig.topK&&(w.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=s)}return t}function Qe(t){return{candidates:t.candidates?Js(t.candidates):void 0,prompt:t.promptFeedback?Xs(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function qs(t,e){return{generateContentRequest:{model:e,...t}}}function Js(t){let e=[],n;return e&&t.forEach(s=>{var o,a;let r;if(s.citationMetadata&&(r={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(c=>{var l,g,h;return{...c,severity:(l=c.severity)!=null?l:Gt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:(g=c.probabilityScore)!=null?g:0,severityScore:(h=c.severityScore)!=null?h:0}})),(a=(o=s.content)==null?void 0:o.parts)!=null&&a.some(c=>c==null?void 0:c.videoMetadata))throw new d(u.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");let i={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:r,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(i)}),e}function Xs(t){let e=[];return t.safetyRatings.forEach(s=>{var r,i,o;e.push({category:s.category,probability:s.probability,severity:(r=s.severity)!=null?r:Gt.HARM_SEVERITY_UNSUPPORTED,probabilityScore:(i=s.probabilityScore)!=null?i:0,severityScore:(o=s.severityScore)!=null?o:0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}var Ut=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function Qs(t,e,n){let s=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),r=nr(s),[i,o]=r.tee(),{response:a,firstValue:c}=await Zs(o,e,n);return{stream:tr(i,e,n),response:a,firstValue:c}}async function Zs(t,e,n){let[s,r]=t.tee(),i=s.getReader(),{value:o}=await i.read();return{firstValue:o,response:er(r,e,n)}}async function er(t,e,n){let s=[],r=t.getReader();for(;;){let{done:i,value:o}=await r.read();if(i){let a=sr(s);return e.backend.backendType===I.GOOGLE_AI&&(a=Qe(a)),fe(a,n)}s.push(o)}}async function*tr(t,e,n){var r,i;let s=t.getReader();for(;;){let{value:o,done:a}=await s.read();if(a)break;let c;e.backend.backendType===I.GOOGLE_AI?c=fe(Qe(o),n):c=fe(o,n);let l=(r=c.candidates)==null?void 0:r[0];!((i=l==null?void 0:l.content)!=null&&i.parts)&&!(l!=null&&l.finishReason)&&!(l!=null&&l.citationMetadata)&&!(l!=null&&l.urlContextMetadata)||(yield c)}}function nr(t){let e=t.getReader();return new ReadableStream({start(s){let r="";return i();function i(){return e.read().then(({value:o,done:a})=>{if(a){if(r.trim()){s.error(new d(u.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}r+=o;let c=r.match(Ut),l;for(;c;){try{l=JSON.parse(c[1])}catch{s.error(new d(u.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}s.enqueue(l),r=r.substring(c[0].length),c=r.match(Ut)}return i()})}}})}function sr(t){let e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(let s of t)if(s.candidates)for(let r of s.candidates){let i=r.index||0;n.candidates||(n.candidates=[]),n.candidates[i]||(n.candidates[i]={index:r.index}),n.candidates[i].citationMetadata=r.citationMetadata,n.candidates[i].finishReason=r.finishReason,n.candidates[i].finishMessage=r.finishMessage,n.candidates[i].safetyRatings=r.safetyRatings,n.candidates[i].groundingMetadata=r.groundingMetadata;let o=r.urlContextMetadata;if(typeof o=="object"&&o!==null&&Object.keys(o).length>0&&(n.candidates[i].urlContextMetadata=o),r.content){if(!r.content.parts)continue;n.candidates[i].content||(n.candidates[i].content={role:r.content.role||"user",parts:[]});for(let a of r.content.parts){let c={...a};a.text!==""&&Object.keys(c).length>0&&n.candidates[i].content.parts.push(c)}}}return n}var rr=[u.FETCH_ERROR,u.ERROR,u.API_NOT_ENABLED];async function Kt(t,e,n,s){if(!e)return{response:await s(),inferenceSource:M.IN_CLOUD};switch(e.mode){case O.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:M.ON_DEVICE};throw new d(u.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case O.ONLY_IN_CLOUD:return{response:await s(),inferenceSource:M.IN_CLOUD};case O.PREFER_IN_CLOUD:try{return{response:await s(),inferenceSource:M.IN_CLOUD}}catch(r){if(r instanceof d&&rr.includes(r.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:M.ON_DEVICE};throw r}case O.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:M.ON_DEVICE}:{response:await s(),inferenceSource:M.IN_CLOUD};default:throw new d(u.ERROR,`Unexpected infererence mode: ${e.mode}`)}}async function ir(t,e,n,s){return t.backend.backendType===I.GOOGLE_AI&&(n=zt(n)),Xe({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:s},JSON.stringify(n))}async function Yt(t,e,n,s,r){let i=await Kt(n,s,()=>s.generateContentStream(n),()=>ir(t,e,n,r));return Qs(i.response,t,i.inferenceSource)}async function or(t,e,n,s){return t.backend.backendType===I.GOOGLE_AI&&(n=zt(n)),Xe({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:s},JSON.stringify(n))}async function qt(t,e,n,s,r){let i=await Kt(n,s,()=>s.generateContent(n),()=>or(t,e,n,r)),o=await ar(i.response,t);return{response:fe(o,i.inferenceSource)}}async function ar(t,e){let n=await t.json();return e.backend.backendType===I.GOOGLE_AI?Qe(n):n}function Ze(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{text:t}]};if(t.text)return{role:"system",parts:[t]};if(t.parts)return t.role?t:{role:"system",parts:t.parts}}}function J(t){let e=[];if(typeof t=="string")e=[{text:t}];else for(let n of t)typeof n=="string"?e.push({text:n}):e.push(n);return cr(e)}function cr(t){let e={role:"user",parts:[]},n=!1,s=!1;for(let r of t)"functionResponse"in r?s=!0:n=!0,e.parts.push(r);if(n&&s)throw new d(u.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new d(u.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function Ve(t){let e;return t.contents?e=t:e={contents:[J(t)]},t.systemInstruction&&(e.systemInstruction=Ze(t.systemInstruction)),e}var $t="SILENT_ERROR",Bt=10,Ye=class{constructor(e,n,s){this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,this._history}async _sendMessage(e,n){let s={};await this._sendPromise;let r=[];return this._sendPromise=this._sendPromise.then(async()=>{var c,l,g,h;let i,o=0,a=(l=(c=this.requestOptions)==null?void 0:c.maxSequentialFunctionCalls)!=null?l:Bt;do{let f;if(i){o++;let m=await this._callFunctionsAsNeeded(i);f=J(m)}else f=J(e);let E=this._formatRequest(f,[...r]);r.push(f);let p=await this._callGenerateContent(E,n);if(p)if(s=p,i=this._getCallableFunctionCalls(p.response),p.response.candidates&&p.response.candidates.length>0){let m={parts:((g=p.response.candidates)==null?void 0:g[0].content.parts)||[],role:((h=p.response.candidates)==null?void 0:h[0].content.role)||"model"};r.push(m)}else{let m=B(p.response);m&&w.warn(`sendMessage() was unsuccessful. ${m}. Inspect response object for details.`)}else i=void 0}while(i&&o<a);i&&o>=a&&w.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(r),s}async _sendMessageStream(e,n){await this._sendPromise;let s=[],i=(async()=>{var g,h;let o,a=0,c=(h=(g=this.requestOptions)==null?void 0:g.maxSequentialFunctionCalls)!=null?h:Bt,l;do{let f;if(o){a++;let p=await this._callFunctionsAsNeeded(o);f=J(p)}else f=J(e);let E=this._formatRequest(f,[...s]);if(s.push(f),l=await this._callGenerateContentStream(E,n),o=this._getCallableFunctionCalls(l.firstValue),o&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){let p={...l.firstValue.candidates[0].content};p.role||(p.role="model"),s.push(p)}}while(o&&a<c);return o&&a>=c&&w.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>i).catch(o=>{throw new Error($t)}).then(o=>o.response).then(o=>{if(o.candidates&&o.candidates.length>0){this._history=this._history.concat(s);let a={...o.candidates[0].content};a.role||(a.role="model"),this._history.push(a)}else{let a=B(o);a&&w.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(o=>{o.message!==$t&&o.name!=="AbortError"&&w.error(o)}),i}_getCallableFunctionCalls(e){var r,i,o;let n=(i=(r=this.params)==null?void 0:r.tools)==null?void 0:i.find(a=>a.functionDeclarations);if(!(n!=null&&n.functionDeclarations))return;let s=jt(e);if(s){for(let a of s)if(!((o=n.functionDeclarations)==null?void 0:o.some(l=>l.name===a.name&&typeof l.functionReference=="function")))return;return s}}async _callFunctionsAsNeeded(e){var i,o;let n=[],s=[],r=(o=(i=this.params)==null?void 0:i.tools)==null?void 0:o.find(a=>a.functionDeclarations);if(r&&r.functionDeclarations){for(let c of e){let l=r.functionDeclarations.find(g=>g.name===c.name);if(l!=null&&l.functionReference){let g=Promise.resolve(l.functionReference(c.args)).catch(h=>{let f=new d(u.ERROR,`Error in user-defined function "${l.name}": ${h.message}`);throw f.stack=h.stack,f});n.push({name:c.name,id:c.id,results:g}),s.push(g)}}await Promise.all(s);let a=[];for(let{name:c,id:l,results:g}of n){let h={name:c,response:await g};l&&(h.id=l),a.push({functionResponse:h})}return a}else throw new d(u.REQUEST_ERROR,'No function declarations were provided in "tools".')}};var Ft=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],lr={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},Ht={user:["model"],function:["model"],model:["user","function"],system:[]};function ur(t){let e=null;for(let n of t){let{role:s,parts:r}=n;if(!e&&s!=="user")throw new d(u.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!Mt.includes(s))throw new d(u.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(Mt)}`);if(!Array.isArray(r))throw new d(u.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(r.length===0)throw new d(u.INVALID_CONTENT,"Each Content should have at least one part");let i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,executableCode:0,codeExecutionResult:0};for(let a of r)for(let c of Ft)c in a&&(i[c]+=1);let o=lr[s];for(let a of Ft)if(!o.includes(a)&&i[a]>0)throw new d(u.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!Ht[s].includes(e.role))throw new d(u.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(Ht)}`);e=n}}var qe=class extends Ye{constructor(e,n,s,r,i){var o;super(e,r,i),this.model=n,this.chromeAdapter=s,this.params=r,this.requestOptions=i,r!=null&&r.history&&(ur(r.history),this._history=r.history),((o=this.params)==null?void 0:o.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:Ze(this.params.systemInstruction)})}_formatRequest(e,n){var s,r,i,o,a;return{safetySettings:(s=this.params)==null?void 0:s.safetySettings,generationConfig:(r=this.params)==null?void 0:r.generationConfig,tools:(i=this.params)==null?void 0:i.tools,toolConfig:(o=this.params)==null?void 0:o.toolConfig,systemInstruction:(a=this.params)==null?void 0:a.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return qt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return Yt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}};async function dr(t,e,n,s){let r="";if(t.backend.backendType===I.GOOGLE_AI){let o=qs(n,e);r=JSON.stringify(o)}else r=JSON.stringify(n);return(await Xe({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:s},r)).json()}async function hr(t,e,n,s,r){if((s==null?void 0:s.mode)===O.ONLY_ON_DEVICE)throw new d(u.UNSUPPORTED,"countTokens() is not supported for on-device models.");return dr(t,e,n,r)}var Je=class extends ze{constructor(e,n,s,r){super(e,n.model),this.chromeAdapter=r,this.generationConfig=n.generationConfig||{},fr(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Ze(n.systemInstruction),this.requestOptions=s||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===O.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===N.UNAVAILABLE){let s=new d(u.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===O.ONLY_ON_DEVICE)throw s;w.debug(s.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){let s=Ve(e);return qt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){let s=Ve(e),{stream:r,response:i}=await Yt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n});return{stream:r,response:i}}startChat(e){return new qe(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){let s=Ve(e);return hr(this._apiSettings,this.model,s,this.chromeAdapter,{...this.requestOptions,...n})}};function fr(t){var e,n;if(((e=t.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((n=t.thinkingConfig)!=null&&n.thinkingLevel))throw new d(u.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new d(u.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new d(u.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}var pr="audio-processor",Di=`
  class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.targetSampleRate = options.processorOptions.targetSampleRate;
      // 'sampleRate' is a global variable available inside the AudioWorkletGlobalScope,
      // representing the native sample rate of the AudioContext.
      this.inputSampleRate = sampleRate;
    }

    /**
     * This method is called by the browser's audio engine for each block of audio data.
     * Input is a single input, with a single channel (input[0][0]).
     */
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0 && input[0].length > 0) {
        const pcmData = input[0]; // Float32Array of raw audio samples.
        
        // Simple linear interpolation for resampling.
        const resampled = new Float32Array(Math.round(pcmData.length * this.targetSampleRate / this.inputSampleRate));
        const ratio = pcmData.length / resampled.length;
        for (let i = 0; i < resampled.length; i++) {
          resampled[i] = pcmData[Math.floor(i * ratio)];
        }

        // Convert Float32 (-1, 1) samples to Int16 (-32768, 32767)
        const resampledInt16 = new Int16Array(resampled.length);
        for (let i = 0; i < resampled.length; i++) {
          const sample = Math.max(-1, Math.min(1, resampled[i]));
          if (sample < 0) {
            resampledInt16[i] = sample * 32768;
          } else {
            resampledInt16[i] = sample * 32767;
          }
        }
        
        this.port.postMessage(resampledInt16);
      }
      // Return true to keep the processor alive and processing the next audio block.
      return true;
    }
  }

  // Register the processor with a name that can be used to instantiate it from the main thread.
  registerProcessor('${pr}', AudioProcessor);
`;function Jt(t=ue(),e){var a,c;t=oe(t);let n=G(t,F),s=(a=e==null?void 0:e.backend)!=null?a:new H,r={useLimitedUseAppCheckTokens:(c=e==null?void 0:e.useLimitedUseAppCheckTokens)!=null?c:!1},i=$s(s),o=n.getImmediate({identifier:i});return o.options=r,o}var gr=["mode","onDeviceParams","inCloudParams"];function Xt(t,e,n){var a;let s=e,r;if(s.mode){for(let c of Object.keys(e))gr.includes(c)||w.warn(`When a hybrid inference mode is specified (mode is currently set to ${s.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);r=s.inCloudParams||{model:Us}}else r=e;if(!r.model)throw new d(u.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");let i=(a=t.chromeAdapterFactory)==null?void 0:a.call(t,s.mode,typeof window=="undefined"?void 0:window,s.onDeviceParams),o=new Je(t,r,n,i);return o._apiSettings.inferenceMode=s.mode,o}function mr(){P(new A(F,Hs,"PUBLIC").setMultipleInstances(!0)),C(Lt,je),C(Lt,je,"esm2020")}mr();var nt=new Map,tn={activated:!1,tokenObservers:[]},Er={initialized:!1,enabled:!1};function b(t){return nt.get(t)||{...tn}}function _r(t,e){return nt.set(t,e),nt.get(t)}function we(){return Er}var ot="https://content-firebaseappcheck.googleapis.com/v1",br="exchangeRecaptchaV3Token",wr="exchangeRecaptchaEnterpriseToken",yr="exchangeDebugToken",Qt={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},Sr=24*60*60*1e3;var st=class{constructor(e,n,s,r,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=r,r>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new T,this.pending.promise.catch(n=>{}),await Ar(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new T,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{let n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}};function Ar(t){return new Promise(e=>{setTimeout(e,t)})}var Tr={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},y=new U("appCheck","AppCheck",Tr);function me(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function at(t){if(!b(t).activated)throw y.create("use-before-activation",{appName:t.name})}function ct(t){let e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-r*60,o="";return n&&(o+=pe(n)+"d:"),s&&(o+=pe(s)+"h:"),o+=pe(r)+"m:"+pe(i)+"s",o}function pe(t){return t===0?"00":t>=10?t.toString():"0"+t}async function ye({url:t,body:e},n){let s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){let h=await r.getHeartbeatsHeader();h&&(s["X-Firebase-Client"]=h)}let i={method:"POST",body:JSON.stringify(e),headers:s},o;try{o=await fetch(t,i)}catch(h){throw y.create("fetch-network-error",{originalErrorMessage:h==null?void 0:h.message})}if(o.status!==200)throw y.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(h){throw y.create("fetch-parse-error",{originalErrorMessage:h==null?void 0:h.message})}let c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw y.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});let l=Number(c[1])*1e3,g=Date.now();return{token:a.token,expireTimeMillis:g+l,issuedAtTimeMillis:g}}function Or(t,e){let{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${ot}/projects/${n}/apps/${s}:${br}?key=${r}`,body:{recaptcha_v3_token:e}}}function Rr(t,e){let{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${ot}/projects/${n}/apps/${s}:${wr}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function nn(t,e){let{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${ot}/projects/${n}/apps/${s}:${yr}?key=${r}`,body:{debug_token:e}}}var Cr="firebase-app-check-database",Ir=1,ee="firebase-app-check-store",sn="debug-token",ge=null;function rn(){return ge||(ge=new Promise((t,e)=>{try{let n=indexedDB.open(Cr,Ir);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var r;e(y.create("storage-open",{originalErrorMessage:(r=s.target.error)==null?void 0:r.message}))},n.onupgradeneeded=s=>{let r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(ee,{keyPath:"compositeKey"})}}}catch(n){e(y.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),ge)}function vr(t){return an(cn(t))}function Dr(t,e){return on(cn(t),e)}function kr(t){return on(sn,t)}function Nr(){return an(sn)}async function on(t,e){let s=(await rn()).transaction(ee,"readwrite"),i=s.objectStore(ee).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},s.onerror=c=>{var l;a(y.create("storage-set",{originalErrorMessage:(l=c.target.error)==null?void 0:l.message}))}})}async function an(t){let n=(await rn()).transaction(ee,"readonly"),r=n.objectStore(ee).get(t);return new Promise((i,o)=>{r.onsuccess=a=>{let c=a.target.result;i(c?c.value:void 0)},n.onerror=a=>{var c;o(y.create("storage-get",{originalErrorMessage:(c=a.target.error)==null?void 0:c.message}))}})}function cn(t){return`${t.options.appId}-${t.name}`}var x=new L("@firebase/app-check");async function Lr(t){if(Y()){let e;try{e=await vr(t)}catch(n){x.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function et(t,e){return Y()?Dr(t,e).catch(n=>{x.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function Pr(t){let e;try{e=await Nr()}catch{}if(e)return e;{let n=crypto.randomUUID(),s=`To use this token for app debugging, register it with your project.

Firebase App Check debug token: ${n}

`,r=t==null?void 0:t.options.appId,i=t==null?void 0:t.options.projectId;return i&&r?s+=`You can do so in the Firebase Console:
https://console.firebase.google.com/project/${i}/appcheck/apps?selectedAppId=${r}

Or using the Firebase CLI:
firebase appcheck:debugtokens:create ${n} --project ${i} --app ${r}

`:s+=`You will need to add it to your app's App Check settings in the Firebase Console for it to work.

`,s+=`Note: To keep your project secure, please revoke and delete this token using the
Firebase Console or the CLI (\`firebase appcheck:debugtokens:delete\`) when you finish debugging.

Warning: This debug token is a secret and should not be shared or uploaded to source code.

Debug Token Guide: https://firebase.google.com/docs/app-check/web/debug-provider
Firebase CLI install instructions: https://firebase.google.com/docs/cli
`,console.log(s),kr(n).catch(o=>x.warn(`Failed to persist debug token to IndexedDB. Error: ${o}`)),n}}function lt(){return we().enabled}async function ut(){let t=we();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Mr(t){let e=K(),n=we();if(n.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;n.enabled=!0;let s=new T;n.token=s,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?s.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):s.resolve(Pr(t))}var xr={error:"UNKNOWN_ERROR"};function Ur(t){return re.encodeString(JSON.stringify(t),!1)}async function rt(t,e=!1,n=!1){let s=t.app;at(s);let r=b(s),i=r.token,o;if(i&&!j(i)&&(r.token=void 0,i=void 0),!i){let l=await r.cachedTokenPromise;l&&(j(l)?i=l:await et(s,void 0))}if(!e&&i&&j(i))return{token:i.token};let a=!1;if(lt())try{let l=await ut();r.exchangeTokenPromise||(r.exchangeTokenPromise=ye(nn(s,l),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);let g=await r.exchangeTokenPromise;return await et(s,g),r.token=g,{token:g.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?x.warn(l.message):n&&x.error(l),tt(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),i=await b(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?x.warn(l.message):n&&x.error(l),o=l}let c;return i?o?j(i)?c={token:i.token,internalError:o}:c=tt(o):(c={token:i.token},r.token=i,await et(s,i)):c=tt(o),a&&dn(s,c),c}async function $r(t){let e=t.app;at(e);let{provider:n}=b(e);if(lt()){let s=await ut(),r=nn(e,s);r.body.limited_use=!0;let{token:i}=await ye(r,t.heartbeatServiceProvider);return{token:i}}else{let{token:s}=await n.getToken(!0);return{token:s}}}function ln(t,e,n,s){let{app:r}=t,i=b(r),o={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&j(i.token)){let a=i.token;Promise.resolve().then(()=>{n({token:a.token}),Zt(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Zt(t))}function un(t,e){let n=b(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Zt(t){let{app:e}=t,n=b(e),s=n.tokenRefresher;s||(s=Br(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function Br(t){let{app:e}=t;return new st(async()=>{let n=b(e),s;if(n.token?s=await rt(t,!0):s=await rt(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{let n=b(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5,r=n.token.expireTimeMillis-5*60*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},Qt.RETRIAL_MIN_WAIT,Qt.RETRIAL_MAX_WAIT)}function dn(t,e){let n=b(t).tokenObservers;for(let s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function j(t){return t.expireTimeMillis-Date.now()>0}function tt(t){return{token:Ur(xr),error:t}}var it=class{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){let{tokenObservers:e}=b(this.app);for(let n of e)un(this.app,n.next);return Promise.resolve()}};function Fr(t,e){return new it(t,e)}function Hr(t){return{getToken:e=>rt(t,e),getLimitedUseToken:()=>$r(t),addTokenListener:e=>ln(t,"INTERNAL",e),removeTokenListener:e=>un(t.app,e)}}var Gr="@firebase/app-check",Vr="0.13.1";var jr="https://www.google.com/recaptcha/api.js",Wr="https://www.google.com/recaptcha/enterprise.js";function zr(t,e){let n=new T,s=b(t);s.reCAPTCHAState={initialized:n};let r=hn(t),i=me(!1);return i?Ee(t,e,i,r,n):qr(()=>{let o=me(!1);if(!o)throw new Error("no recaptcha");Ee(t,e,o,r,n)}),n.promise}function Kr(t,e){let n=new T,s=b(t);s.reCAPTCHAState={initialized:n};let r=hn(t),i=me(!0);return i?Ee(t,e,i,r,n):Jr(()=>{let o=me(!0);if(!o)throw new Error("no recaptcha");Ee(t,e,o,r,n)}),n.promise}function Ee(t,e,n,s,r){n.ready(()=>{Yr(t,e,n,s),r.resolve(n)})}function hn(t){let e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function fn(t){at(t);let n=await b(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{let i=b(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function Yr(t,e,n,s){let r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{b(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{b(t).reCAPTCHAState.succeeded=!1}}),i=b(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:r}}function qr(t){let e=document.createElement("script");e.src=jr,e.onload=t,document.head.appendChild(e)}function Jr(t){let e=document.createElement("script");e.src=Wr+"?render=explicit",e.onload=t,document.head.appendChild(e)}var _e=class t{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){var r,i,o;gn(this._throttleData);let n=await fn(this._app).catch(a=>{throw y.create("recaptcha-error")});if(!((r=b(this._app).reCAPTCHAState)!=null&&r.succeeded))throw y.create("recaptcha-error");let s;try{let a=Or(this._app,n);e&&(a.body.limited_use=!0),s=await ye(a,this._heartbeatServiceProvider)}catch(a){throw(i=a.code)!=null&&i.includes("fetch-status-error")?(this._throttleData=pn(Number((o=a.customData)==null?void 0:o.httpStatus),this._throttleData),y.create("initial-throttle",{time:ct(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=G(e,"heartbeat"),zr(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof t?this._siteKey===e._siteKey:!1}},be=class t{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){var r,i,o;gn(this._throttleData);let n=await fn(this._app).catch(a=>{throw y.create("recaptcha-error")});if(!((r=b(this._app).reCAPTCHAState)!=null&&r.succeeded))throw y.create("recaptcha-error");let s;try{let a=Rr(this._app,n);e&&(a.body.limited_use=!0),s=await ye(a,this._heartbeatServiceProvider)}catch(a){throw(i=a.code)!=null&&i.includes("fetch-status-error")?(this._throttleData=pn(Number((o=a.customData)==null?void 0:o.httpStatus),this._throttleData),y.create("initial-throttle",{time:ct(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=G(e,"heartbeat"),Kr(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof t?this._siteKey===e._siteKey:!1}};function pn(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+Sr,httpStatus:t};{let n=e?e.backoffCount:0,s=Et(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function gn(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw y.create("throttled",{time:ct(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}function mn(t=ue(),e){var r;t=oe(t);let n=G(t,"app-check");if(we().initialized||Mr(t),lt()&&ut().then(i=>{console.log(`Firebase App Check debug token: ${i}`)}),n.isInitialized()){let i=n.getImmediate(),o=n.getOptions();if(o&&!!o.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&((r=o.provider)!=null&&r.isEqual(e.provider)))return i;throw y.create("already-initialized",{appName:t.name})}let s=n.initialize({options:e});return Xr(t,e.provider,e.isTokenAutoRefreshEnabled),b(t).isTokenAutoRefreshEnabled&&ln(s,"INTERNAL",()=>{}),s}function Xr(t,e,n=!1){let s=_r(t,{...tn});s.activated=!0,s.provider=e,s.cachedTokenPromise=Lr(t).then(r=>(r&&j(r)&&(s.token=r,dn(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&x.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}var Qr="app-check",en="app-check-internal";function Zr(){P(new A(Qr,t=>{let e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return Fr(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(en).initialize()})),P(new A(en,t=>{let e=t.getProvider("app-check").getImmediate();return Hr(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),C(Gr,Vr)}Zr();var ei=["gemini-3.8-flash","gemini-3.8-flash-lite","gemini-3.6-flash","gemini-flash-latest","gemini-flash-lite-latest"];function ti(t){return new Promise((e,n)=>{let s=new FileReader;s.onload=()=>e(String(s.result).split(",")[1]),s.onerror=n,s.readAsDataURL(t)})}function W(t,e){let n=new Error(e||t);return n.code=t,n}function ni(t){t=String(t||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/,"");try{return JSON.parse(t)}catch{}let e=t.indexOf("{"),n=t.lastIndexOf("}");if(e>=0&&n>e)return JSON.parse(t.slice(e,n+1));throw W("bad_json","invalid JSON from model")}window.fbAI={create(t,e,n,s){let r=Be(t,"ai");mn(r,{provider:s==="v3"?new _e(e):new be(e),isTokenAutoRefreshEnabled:!0});let i=Jt(r,{backend:new H}),o=[n,...ei].filter((f,E,p)=>f&&p.indexOf(f)===E),a=0,c=()=>Xt(i,{model:o[a],generationConfig:{responseMimeType:"application/json",temperature:.4}}),l=c(),g=f=>new Promise(E=>setTimeout(E,f));async function h(f){let E=0;for(;;)try{return await l.generateContent({contents:[{role:"user",parts:f}]})}catch(p){let m=String(p&&p.message||"")+" "+String(p&&p.code||"");if(/not.?found|404|is not supported|unknown model/i.test(m)&&a<o.length-1){a++,l=c();continue}if(/\b50[034]\b|deadline|unavailable|overloaded|timed? ?out/i.test(m)){if(E++,E<=2){await g(1500*E);continue}if(a<o.length-1){a++,l=c(),E=0;continue}throw W("busy",m)}throw/quota|resource.?exhausted|429/i.test(m)?W(/per.?day|daily/i.test(m)?"quota":"rate_limited",m):/app.?check|recaptcha|permission|403|api has not been used|disabled/i.test(m)?W("not_ready",m):!navigator.onLine||/network|failed to fetch/i.test(m)?W("offline",m):p}}return{async limits(){return{images:{maxCount:3,maxBytes:7*1024*1024}}},async json(f,E={}){if(!navigator.onLine)throw W("offline");let p=[{text:f+`

\u05E2\u05E0\u05D4 \u05D1-JSON \u05EA\u05E7\u05D9\u05DF \u05D1\u05DC\u05D1\u05D3, \u05D1\u05DC\u05D9 \u05D8\u05E7\u05E1\u05D8 \u05E0\u05D5\u05E1\u05E3.`}];for(let ne of(E.images||[]).slice(0,3)){let se=typeof ne=="string"?await(await fetch(ne)).blob():ne;p.push({inlineData:{mimeType:se.type||"image/jpeg",data:await ti(se)}})}let m=h(p),z=E.signal?new Promise((ne,se)=>E.signal.addEventListener("abort",()=>{let dt=new Error("aborted");dt.name="AbortError",se(dt)},{once:!0})):null,te=await(z?Promise.race([m,z]):m);return ni(te.response.text())}}}};})();
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2026 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/ai/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
