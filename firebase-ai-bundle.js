(()=>{var dt=()=>{};var ft=function(t){let e=[],n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},mn=function(t){let e=[],n=0,s=0;for(;n<t.length;){let r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){let i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){let i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{let i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},se={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){let i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,p=i>>2,h=(i&3)<<4|a>>4,f=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(f=64)),s.push(n[p],n[h],n[f],n[g])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ft(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):mn(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){let i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;let l=r<t.length?n[t.charAt(r)]:64;++r;let h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||h==null)throw new ye;let f=i<<2|a>>4;if(s.push(f),l!==64){let g=a<<4&240|l>>2;if(s.push(g),h!==64){let m=l<<6&192|h;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},ye=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},En=function(t){let e=ft(t);return se.encodeByteArray(e,!0)},Se=function(t){return En(t).replace(/\./g,"")},pt=function(t){try{return se.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function z(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var _n=()=>z().__FIREBASE_DEFAULTS__,bn=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},wn=()=>{if(typeof document=="undefined")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&pt(t[1]);return e&&JSON.parse(e)},yn=()=>{try{return dt()||_n()||bn()||wn()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}};var Ae=()=>{var t;return(t=yn())==null?void 0:t.config};var T=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}};function K(){try{return typeof indexedDB=="object"}catch{return!1}}function gt(){return new Promise((t,e)=>{try{let n=!0,s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(n){e(n)}})}var Sn="FirebaseError",v=class t extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Sn,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,$.prototype.create)}},$=class{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){let s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?An(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new v(r,a,s)}};function An(t,e){try{let n=0,s="";for(;n<t.length;){let r=t.indexOf("{$",n);if(r===-1){s+=t.substring(n);break}let i=t.indexOf("}",r+2);if(i===-1){s+=t.substring(n);break}let o=t.substring(r+2,i),a=e[o];s+=t.substring(n,r)+(a!=null?String(a):`<${o}?>`),n=i+1}return s}catch{return t}}function re(t,e){if(t===e)return!0;let n=Object.keys(t),s=Object.keys(e);for(let r of n){if(!s.includes(r))return!1;let i=t[r],o=e[r];if(ht(i)&&ht(o)){if(!re(i,o))return!1}else if(i!==o)return!1}for(let r of s)if(!n.includes(r))return!1;return!0}function ht(t){return t!==null&&typeof t=="object"}var Tn=1e3,On=2,Rn=4*60*60*1e3,Cn=.5;function mt(t,e=Tn,n=On){let s=e*Math.pow(n,t),r=Math.round(Cn*s*(Math.random()-.5)*2);return Math.min(Rn,s+r)}function ie(t){return t&&t._delegate?t._delegate:t}var A=class{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var B="[DEFAULT]";var Te=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let s=new T;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var r;let n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(r=e==null?void 0:e.optional)!=null?r:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(vn(e))try{this.getOrInitializeService({instanceIdentifier:B})}catch{}for(let[n,s]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(n);try{let i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=B){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=B){return this.instances.has(e)}getOptions(e=B){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(let[i,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var o;let s=this.normalizeInstanceIdentifier(n),r=(o=this.onInitCallbacks.get(s))!=null?o:new Set;r.add(e),this.onInitCallbacks.set(s,r);let i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){let s=this.onInitCallbacks.get(n);if(s)for(let r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:In(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=B){return this.component?this.component.multipleInstances?e:B:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function In(t){return t===B?void 0:t}function vn(t){return t.instantiationMode==="EAGER"}var oe=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new Te(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var Dn=[],E;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(E||(E={}));var kn={debug:E.DEBUG,verbose:E.VERBOSE,info:E.INFO,warn:E.WARN,error:E.ERROR,silent:E.SILENT},Nn=E.INFO,Ln={[E.DEBUG]:"log",[E.VERBOSE]:"log",[E.INFO]:"info",[E.WARN]:"warn",[E.ERROR]:"error"},Pn=(t,e,...n)=>{if(e<t.logLevel)return;let s=new Date().toISOString(),r=Ln[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},L=class{constructor(e){this.name=e,this._logLevel=Nn,this._logHandler=Pn,this._userLogHandler=null,Dn.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in E))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?kn[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,E.DEBUG,...e),this._logHandler(this,E.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,E.VERBOSE,...e),this._logHandler(this,E.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,E.INFO,...e),this._logHandler(this,E.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,E.WARN,...e),this._logHandler(this,E.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,E.ERROR,...e),this._logHandler(this,E.ERROR,...e)}};var Mn=(t,e)=>e.some(n=>t instanceof n),Et,_t;function xn(){return Et||(Et=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Un(){return _t||(_t=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var bt=new WeakMap,Re=new WeakMap,wt=new WeakMap,Oe=new WeakMap,Ie=new WeakMap;function $n(t){let e=new Promise((n,s)=>{let r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(R(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&bt.set(n,t)}).catch(()=>{}),Ie.set(e,t),e}function Bn(t){if(Re.has(t))return;let e=new Promise((n,s)=>{let r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Re.set(t,e)}var Ce={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Re.get(t);if(e==="objectStoreNames")return t.objectStoreNames||wt.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return R(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function yt(t){Ce=t(Ce)}function Fn(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let s=t.call(ae(this),e,...n);return wt.set(s,e.sort?e.sort():[e]),R(s)}:Un().includes(t)?function(...e){return t.apply(ae(this),e),R(bt.get(this))}:function(...e){return R(t.apply(ae(this),e))}}function Hn(t){return typeof t=="function"?Fn(t):(t instanceof IDBTransaction&&Bn(t),Mn(t,xn())?new Proxy(t,Ce):t)}function R(t){if(t instanceof IDBRequest)return $n(t);if(Oe.has(t))return Oe.get(t);let e=Hn(t);return e!==t&&(Oe.set(t,e),Ie.set(e,t)),e}var ae=t=>Ie.get(t);function At(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){let o=indexedDB.open(t,e),a=R(o);return s&&o.addEventListener("upgradeneeded",c=>{s(R(o.result),c.oldVersion,c.newVersion,R(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Gn=["get","getKey","getAll","getAllKeys","count"],Vn=["put","add","delete","clear"],ve=new Map;function St(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ve.get(e))return ve.get(e);let n=e.replace(/FromIndex$/,""),s=e!==n,r=Vn.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Gn.includes(n)))return;let i=async function(o,...a){let c=this.transaction(o,r?"readwrite":"readonly"),l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return ve.set(e,i),i}yt(t=>({...t,get:(e,n,s)=>St(e,n)||t.get(e,n,s),has:(e,n)=>!!St(e,n)||t.has(e,n)}));var ke=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(jn(n)){let s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}};function jn(t){let e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}var Ne="@firebase/app",Tt="0.16.2";var k=new L("@firebase/app"),Wn="@firebase/app-compat",zn="@firebase/analytics-compat",Kn="@firebase/analytics",Yn="@firebase/app-check-compat",qn="@firebase/app-check",Jn="@firebase/auth",Xn="@firebase/auth-compat",Qn="@firebase/database",Zn="@firebase/data-connect",es="@firebase/database-compat",ts="@firebase/functions",ns="@firebase/functions-compat",ss="@firebase/installations",rs="@firebase/installations-compat",is="@firebase/messaging",os="@firebase/messaging-compat",as="@firebase/performance",cs="@firebase/performance-compat",ls="@firebase/remote-config",us="@firebase/remote-config-compat",ds="@firebase/storage",hs="@firebase/storage-compat",fs="@firebase/firestore",ps="@firebase/ai",gs="@firebase/firestore-compat",ms="firebase";var Le="[DEFAULT]",Es={[Ne]:"fire-core",[Wn]:"fire-core-compat",[Kn]:"fire-analytics",[zn]:"fire-analytics-compat",[qn]:"fire-app-check",[Yn]:"fire-app-check-compat",[Jn]:"fire-auth",[Xn]:"fire-auth-compat",[Qn]:"fire-rtdb",[Zn]:"fire-data-connect",[es]:"fire-rtdb-compat",[ts]:"fire-fn",[ns]:"fire-fn-compat",[ss]:"fire-iid",[rs]:"fire-iid-compat",[is]:"fire-fcm",[os]:"fire-fcm-compat",[as]:"fire-perf",[cs]:"fire-perf-compat",[ls]:"fire-rc",[us]:"fire-rc-compat",[ds]:"fire-gcs",[hs]:"fire-gcs-compat",[fs]:"fire-fst",[gs]:"fire-fst-compat",[ps]:"fire-vertex","fire-js":"fire-js",[ms]:"fire-js-all"};var ce=new Map,_s=new Map,Pe=new Map;function Ot(t,e){try{t.container.addComponent(e)}catch(n){k.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function P(t){let e=t.name;if(Pe.has(e))return k.debug(`There were multiple attempts to register component ${e}.`),!1;Pe.set(e,t);for(let n of ce.values())Ot(n,t);for(let n of _s.values())Ot(n,t);return!0}function V(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function vt(t){return t==null?!1:t.settings!==void 0}var bs={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},D=new $("app","Firebase",bs);var Me=class{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new A("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw D.create("app-deleted",{appName:this._name})}};function $e(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let s={name:Le,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw D.create("bad-app-name",{appName:String(r)});if(n||(n=Ae()),!n)throw D.create("no-options");let i=ce.get(r);if(i)if(re(n,i.options)){if(re(s,i.config))return i;throw D.create("duplicate-app",{appName:r,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(s)})}else throw D.create("duplicate-app",{appName:r,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(n)});let o=new oe(r);for(let c of Pe.values())o.addComponent(c);let a=new Me(n,s,o);return ce.set(r,a),a}function le(t=Le){let e=ce.get(t);if(!e&&t===Le&&Ae())return $e();if(!e)throw D.create("no-app",{appName:t});return e}function C(t,e,n){var o;let s=(o=Es[t])!=null?o:t;n&&(s+=`-${n}`);let r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){let a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),k.warn(a.join(" "));return}P(new A(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}var ws="firebase-heartbeat-database",ys=1,Y="firebase-heartbeat-store",De=null;function Dt(){return De||(De=At(ws,ys,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Y)}catch(n){console.warn(n)}}}}).catch(t=>{throw D.create("idb-open",{originalErrorMessage:t.message})})),De}async function Ss(t){try{let n=(await Dt()).transaction(Y),s=await n.objectStore(Y).get(kt(t));return await n.done,s}catch(e){if(e instanceof v)k.warn(e.message);else{let n=D.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});k.warn(n.message)}}}async function Rt(t,e){try{let s=(await Dt()).transaction(Y,"readwrite");await s.objectStore(Y).put(e,kt(t)),await s.done}catch(n){if(n instanceof v)k.warn(n.message);else{let s=D.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});k.warn(s.message)}}}function kt(t){return`${t.name}!${t.options.appId}`}var As=1024,Ts=30,xe=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new Ue(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;try{let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ct();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>Ts){let o=Rs(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){k.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Ct(),{heartbeatsToSend:s,unsentEntries:r}=Os(this._heartbeatsCache.heartbeats),i=Se(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return k.warn(n),""}}};function Ct(){return new Date().toISOString().substring(0,10)}function Os(t,e=As){let n=[],s=t.slice();for(let r of t){let i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),It(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),It(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}var Ue=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return K()?gt().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await Ss(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var s;if(await this._canUseIndexedDBPromise){let r=await this.read();return Rt(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var s;if(await this._canUseIndexedDBPromise){let r=await this.read();return Rt(this.app,{lastSentHeartbeatDate:(s=e.lastSentHeartbeatDate)!=null?s:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function It(t){return Se(JSON.stringify({version:2,heartbeats:t})).length}function Rs(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}function Cs(t){P(new A("platform-logger",e=>new ke(e),"PRIVATE")),P(new A("heartbeat",e=>new xe(e),"PRIVATE")),C(Ne,Tt,t),C(Ne,Tt,"esm2020"),C("fire-js","")}Cs("");var Is="firebase",vs="12.19.0";C(Is,vs,"app");var Nt="@firebase/ai",Ve="2.16.0";var H="AI",Ds="us-central1",ks="global",Ns="firebasevertexai.googleapis.com",j="v1beta",Lt=Ve,Ls="gl-js",Ps="hybrid",Ms=180*1e3,xs="gemini-2.5-flash-lite";var d=class t extends v{constructor(e,n,s){let r=H,i=`${r}/${e}`,o=`${r}: ${n} (${i})`;super(e,o),this.code=e,this.customErrorData=s,Error.captureStackTrace&&Error.captureStackTrace(this,t),Object.setPrototypeOf(this,t.prototype),this.toString=()=>o}};var Pt=["user","model","function","system"];var Ht={HARM_SEVERITY_NEGLIGIBLE:"HARM_SEVERITY_NEGLIGIBLE",HARM_SEVERITY_LOW:"HARM_SEVERITY_LOW",HARM_SEVERITY_MEDIUM:"HARM_SEVERITY_MEDIUM",HARM_SEVERITY_HIGH:"HARM_SEVERITY_HIGH",HARM_SEVERITY_UNSUPPORTED:"HARM_SEVERITY_UNSUPPORTED"};var S={STOP:"STOP",MAX_TOKENS:"MAX_TOKENS",SAFETY:"SAFETY",RECITATION:"RECITATION",OTHER:"OTHER",BLOCKLIST:"BLOCKLIST",PROHIBITED_CONTENT:"PROHIBITED_CONTENT",SPII:"SPII",MALFORMED_FUNCTION_CALL:"MALFORMED_FUNCTION_CALL",IMAGE_SAFETY:"IMAGE_SAFETY",IMAGE_PROHIBITED_CONTENT:"IMAGE_PROHIBITED_CONTENT",IMAGE_OTHER:"IMAGE_OTHER",NO_IMAGE:"NO_IMAGE",IMAGE_RECITATION:"IMAGE_RECITATION",LANGUAGE:"LANGUAGE",UNEXPECTED_TOOL_CALL:"UNEXPECTED_TOOL_CALL",TOO_MANY_TOOL_CALLS:"TOO_MANY_TOOL_CALLS",MISSING_THOUGHT_SIGNATURE:"MISSING_THOUGHT_SIGNATURE",MALFORMED_RESPONSE:"MALFORMED_RESPONSE"};var O={PREFER_ON_DEVICE:"prefer_on_device",ONLY_ON_DEVICE:"only_on_device",ONLY_IN_CLOUD:"only_in_cloud",PREFER_IN_CLOUD:"prefer_in_cloud"},M={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};var u={ERROR:"error",REQUEST_ERROR:"request-error",RESPONSE_ERROR:"response-error",FETCH_ERROR:"fetch-error",SESSION_CLOSED:"session-closed",INVALID_CONTENT:"invalid-content",API_NOT_ENABLED:"api-not-enabled",INVALID_SCHEMA:"invalid-schema",NO_API_KEY:"no-api-key",NO_APP_ID:"no-app-id",NO_MODEL:"no-model",NO_PROJECT_ID:"no-project-id",PARSE_FAILED:"parse-failed",UNSUPPORTED:"unsupported"};var I={AGENT_PLATFORM:"AGENT_PLATFORM",VERTEX_AI:"VERTEX_AI",GOOGLE_AI:"GOOGLE_AI"};var J=class{constructor(e){this.backendType=e}},G=class extends J{constructor(){super(I.GOOGLE_AI)}_getModelPath(e,n){return`/${j}/projects/${e}/${n}`}_getTemplatePath(e,n){return`/${j}/projects/${e}/templates/${n}`}},X=class extends J{constructor(e){super(I.VERTEX_AI),this.location=Ds,e&&(this.location=e)}_getModelPath(e,n){return`/${j}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${j}/projects/${e}/locations/${this.location}/templates/${n}`}},Q=class extends J{constructor(e){super(I.AGENT_PLATFORM),this.location=ks,e&&(this.location=e)}_getModelPath(e,n){return`/${j}/projects/${e}/locations/${this.location}/${n}`}_getTemplatePath(e,n){return`/${j}/projects/${e}/locations/${this.location}/templates/${n}`}};function Us(t){if(t instanceof G)return`${H}/googleai`;if(t instanceof X)return`${H}/vertexai/${t.location}`;if(t instanceof Q)return`${H}/agentplatform/${t.location}`;throw new d(u.ERROR,`Invalid backend: ${JSON.stringify(t.backendType)}`)}function $s(t){let e=t.split("/");if(e[0]!==H)throw new d(u.ERROR,`Invalid instance identifier, unknown prefix '${e[0]}'`);switch(e[1]){case"vertexai":let s=e[2];if(!s)throw new d(u.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new X(s);case"agentplatform":let r=e[2];if(!r)throw new d(u.ERROR,`Invalid instance identifier, unknown location '${t}'`);return new Q(r);case"googleai":return new G;default:throw new d(u.ERROR,`Invalid instance identifier string: '${t}'`)}}var w=new L("@firebase/vertexai"),N;(function(t){t.UNAVAILABLE="unavailable",t.DOWNLOADABLE="downloadable",t.DOWNLOADING="downloading",t.AVAILABLE="available"})(N||(N={}));var Gt={type:"text",languages:["en"]},Be=[Gt,{type:"image"}],Fe=[Gt],de=class t{constructor(e,n,s){this.languageModelProvider=e,this.mode=n,this.downloadPromise=null,this.onDeviceParams={createOptions:{expectedInputs:Be,expectedOutputs:Fe}},s&&(this.onDeviceParams=s,this.onDeviceParams.createOptions?(this.onDeviceParams.createOptions.expectedInputs||(this.onDeviceParams.createOptions.expectedInputs=Be),this.onDeviceParams.createOptions.expectedOutputs||(this.onDeviceParams.createOptions.expectedOutputs=Fe)):this.onDeviceParams.createOptions={expectedInputs:Be,expectedOutputs:Fe})}async isAvailable(e){var s;if(!this.mode)return w.debug("On-device inference unavailable because mode is undefined."),!1;if(this.mode===O.ONLY_IN_CLOUD)return w.debug('On-device inference unavailable because mode is "only_in_cloud".'),!1;let n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));if(this.mode===O.ONLY_ON_DEVICE){if(n===N.UNAVAILABLE)throw new d(u.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(n===N.DOWNLOADABLE||n===N.DOWNLOADING){w.debug("Waiting for download of LanguageModel to complete.");try{await this.downloadPromise}catch(r){throw new d(u.ERROR,r.message)}return!0}return!0}return n!==N.AVAILABLE?(w.debug(`On-device inference unavailable because availability is "${n}".`),!1):t.isOnDeviceRequest(e)?!0:(w.debug("On-device inference unavailable because request is incompatible."),!1)}async generateContent(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),r=await n.prompt(s,this.onDeviceParams.promptOptions);return t.toResponse(r)}async generateContentStream(e){let n=await this.createSession(),s=await Promise.all(e.contents.map(t.toLanguageModelMessage)),r=n.promptStreaming(s,this.onDeviceParams.promptOptions);return t.toStreamResponse(r)}async countTokens(e){throw new d(u.REQUEST_ERROR,"Count Tokens is not yet available for on-device model.")}static isOnDeviceRequest(e){if(e.contents.length===0)return w.debug("Empty prompt rejected for on-device inference."),!1;for(let n of e.contents){if(n.parts.some(s=>"functionResponse"in s))return w.debug("Content with a function response part rejected for on-device inference."),!1;for(let s of n.parts)if(s.inlineData&&t.SUPPORTED_MIME_TYPES.indexOf(s.inlineData.mimeType)===-1)return w.debug(`Unsupported mime type "${s.inlineData.mimeType}" rejected for on-device inference.`),!1}return!0}async downloadIfAvailable(e){var s;let n=await((s=this.languageModelProvider)==null?void 0:s.availability(this.onDeviceParams.createOptions));return(n===N.DOWNLOADABLE||n===N.DOWNLOADING)&&this.download(e),n}download(e){var s;if(this.downloadPromise)return;let n={...this.onDeviceParams.createOptions};n&&!n.monitor&&e&&(n.monitor=r=>{r.addEventListener("downloadprogress",i=>{e(i.loaded)})}),this.downloadPromise=(s=this.languageModelProvider)==null?void 0:s.create(n).finally(()=>{this.downloadPromise=null})}static async toLanguageModelMessage(e){let n=await Promise.all(e.parts.map(t.toLanguageModelMessageContent));return{role:t.toLanguageModelMessageRole(e.role),content:n}}static async toLanguageModelMessageContent(e){if(e.text)return{type:"text",value:e.text};if(e.inlineData){let s=await(await fetch(`data:${e.inlineData.mimeType};base64,${e.inlineData.data}`)).blob();return{type:"image",value:await createImageBitmap(s)}}throw new d(u.REQUEST_ERROR,"Processing of this Part type is not currently supported.")}static toLanguageModelMessageRole(e){return e==="model"?"assistant":"user"}async createSession(){if(!this.languageModelProvider)throw new d(u.UNSUPPORTED,"Chrome AI requested for unsupported browser version.");let e=await this.languageModelProvider.create(this.onDeviceParams.createOptions);return this.oldSession&&this.oldSession.destroy(),this.oldSession=e,e}static toResponse(e){return{json:async()=>({candidates:[{content:{parts:[{text:e}]}}]})}}static toStreamResponse(e){let n=new TextEncoder;return{body:e.pipeThrough(new TransformStream({transform(s,r){let i=JSON.stringify({candidates:[{content:{role:"model",parts:[{text:s}]}}]});r.enqueue(n.encode(`data: ${i}

`))}}))}}};de.SUPPORTED_MIME_TYPES=["image/jpeg","image/png"];function Bs(t,e,n){let r=(e||z()).LanguageModel;if(r&&t)return new de(r,t,n)}var je=class{constructor(e,n,s,r,i){this.app=e,this.backend=n,this.chromeAdapterFactory=i;let o=r==null?void 0:r.getImmediate({optional:!0}),a=s==null?void 0:s.getImmediate({optional:!0});this.auth=a||null,this.appCheck=o||null,n instanceof X||n instanceof Q?this.location=n.location:this.location=""}_delete(){return Promise.resolve()}set options(e){this._options=e}get options(){return this._options}};function Fs(t,{instanceIdentifier:e}){if(!e)throw new d(u.ERROR,"AIService instance identifier is undefined.");let n=$s(e),s=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new je(s,n,r,i,Bs)}function Hs(t){var n,s,r,i,o,a,c;if((s=(n=t.app)==null?void 0:n.options)!=null&&s.apiKey)if((i=(r=t.app)==null?void 0:r.options)!=null&&i.projectId){if(!((a=(o=t.app)==null?void 0:o.options)!=null&&a.appId))throw new d(u.NO_APP_ID,'The "appId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid app ID.')}else throw new d(u.NO_PROJECT_ID,'The "projectId" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid project ID.');else throw new d(u.NO_API_KEY,'The "apiKey" field is empty in the local Firebase config. Firebase AI requires this field to contain a valid API key.');let e={apiKey:t.app.options.apiKey,project:t.app.options.projectId,appId:t.app.options.appId,automaticDataCollectionEnabled:t.app.automaticDataCollectionEnabled,location:t.location,backend:t.backend};if(vt(t.app)&&t.app.settings.appCheckToken){let l=t.app.settings.appCheckToken;e.getAppCheckToken=()=>Promise.resolve({token:l})}else t.appCheck&&((c=t.options)!=null&&c.useLimitedUseAppCheckTokens?e.getAppCheckToken=()=>t.appCheck.getLimitedUseToken():e.getAppCheckToken=()=>t.appCheck.getToken());return t.auth&&(e.getAuthToken=()=>t.auth.getToken()),e}var We=class t{constructor(e,n){this._apiSettings=Hs(e),this.model=t.normalizeModelName(n,this._apiSettings.backend.backendType)}static normalizeModelName(e,n){return n===I.GOOGLE_AI?t.normalizeGoogleAIModelName(e):t.normalizeVertexAIModelName(e)}static normalizeGoogleAIModelName(e){return`models/${e}`}static normalizeVertexAIModelName(e){let n;return e.includes("/")?e.startsWith("models/")?n=`publishers/google/${e}`:n=e:n=`publishers/google/models/${e}`,n}};var Gs="Timeout has expired.",He="AbortError",ze=class{constructor(e){this.params=e}toString(){let e=new URL(this.baseUrl);return e.pathname=this.pathname,e.search=this.queryParams.toString(),e.toString()}get pathname(){return this.params.templateId?`${this.params.apiSettings.backend._getTemplatePath(this.params.apiSettings.project,this.params.templateId)}:${this.params.task}`:`${this.params.apiSettings.backend._getModelPath(this.params.apiSettings.project,this.params.model)}:${this.params.task}`}get baseUrl(){var e,n;return(n=(e=this.params.singleRequestOptions)==null?void 0:e.baseUrl)!=null?n:`https://${Ns}`}get queryParams(){let e=new URLSearchParams;return this.params.stream&&e.set("alt","sse"),e}};function Vs(t){let e=[];return e.push(`${Ls}/${Lt}`),e.push(`fire/${Lt}`),(t.params.apiSettings.inferenceMode===O.PREFER_ON_DEVICE||t.params.apiSettings.inferenceMode===O.PREFER_IN_CLOUD)&&e.push(Ps),e.join(" ")}async function js(t){let e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",Vs(t)),e.append("x-goog-api-key",t.params.apiSettings.apiKey),t.params.apiSettings.automaticDataCollectionEnabled&&e.append("X-Firebase-Appid",t.params.apiSettings.appId),t.params.apiSettings.getAppCheckToken){let n=await t.params.apiSettings.getAppCheckToken();n&&(e.append("X-Firebase-AppCheck",n.token),n.error&&w.warn(`Unable to obtain a valid App Check token: ${n.error.message}`))}if(t.params.apiSettings.getAuthToken){let n=await t.params.apiSettings.getAuthToken();n&&e.append("Authorization",`Firebase ${n.accessToken}`)}return e}async function Je(t,e){var l,p,h;let n=new ze(t),s,r=(l=t.singleRequestOptions)==null?void 0:l.signal,i=((p=t.singleRequestOptions)==null?void 0:p.timeout)!=null&&t.singleRequestOptions.timeout>=0?t.singleRequestOptions.timeout:Ms,o=new AbortController,a=setTimeout(()=>{o.abort(new DOMException(Gs,He)),w.debug(`Aborting request to ${n} due to timeout (${i}ms)`)},i),c=AbortSignal.any(r?[r,o.signal]:[o.signal]);if(r&&r.aborted)throw clearTimeout(a),new DOMException((h=r.reason)!=null?h:"Aborted externally before fetch",He);try{let f={method:"POST",headers:await js(n),signal:c,body:e};if(s=await fetch(n.toString(),f),!s.ok){let g="",m;try{let b=await s.json();g=b.error.message,b.error.details&&(g+=` ${JSON.stringify(b.error.details)}`,m=b.error.details)}catch{}throw s.status===403&&m&&m.some(b=>b.reason==="SERVICE_DISABLED")&&m.some(b=>{var te,U;return(U=(te=b.links)==null?void 0:te[0])==null?void 0:U.description.includes("Google developers console API activation")})?new d(u.API_NOT_ENABLED,`The Firebase AI SDK requires the Firebase AI API ('firebasevertexai.googleapis.com') to be enabled in your Firebase project. Enable this API by visiting the Firebase Console at https://console.firebase.google.com/project/${n.params.apiSettings.project}/ailogic/ and clicking "Get started". If you enabled this API recently, wait a few minutes for the action to propagate to our systems and then retry.`,{status:s.status,statusText:s.statusText,errorDetails:m}):new d(u.FETCH_ERROR,`Error fetching from ${n}: [${s.status} ${s.statusText}] ${g}`,{status:s.status,statusText:s.statusText,errorDetails:m})}}catch(f){let g=f;throw f.code!==u.FETCH_ERROR&&f.code!==u.API_NOT_ENABLED&&f instanceof Error&&f.name!==He&&(g=new d(u.ERROR,`Error fetching from ${n.toString()}: ${f.message}`),g.stack=f.stack),g}finally{clearTimeout(a)}return s}function ue(t){if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&w.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),jt(t.candidates[0]))throw new d(u.RESPONSE_ERROR,`Response error: ${F(t)}. Response body stored in error.response`,{response:t});return!0}else return!1}function he(t,e=M.IN_CLOUD){t.candidates&&!t.candidates[0].hasOwnProperty("index")&&(t.candidates[0].index=0);let n=Ws(t);return n.inferenceSource=e,n}function Ws(t){return t.text=()=>{if(ue(t))return Mt(t,e=>!e.thought);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Text not available. ${F(t)}`,{response:t});return""},t.thoughtSummary=()=>{if(ue(t)){let e=Mt(t,n=>!!n.thought);return e===""?void 0:e}else if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Thought summary not available. ${F(t)}`,{response:t})},t.inlineDataParts=()=>{if(ue(t))return zs(t);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Data not available. ${F(t)}`,{response:t})},t.functionCalls=()=>{if(ue(t))return Vt(t);if(t.promptFeedback)throw new d(u.RESPONSE_ERROR,`Function call not available. ${F(t)}`,{response:t})},t}function Mt(t,e){var s,r,i,o;let n=[];if((r=(s=t.candidates)==null?void 0:s[0].content)!=null&&r.parts)for(let a of(o=(i=t.candidates)==null?void 0:i[0].content)==null?void 0:o.parts)a.text&&e(a)&&n.push(a.text);return n.length>0?n.join(""):""}function Vt(t){var n,s,r,i;if(!t)return;let e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(let o of(i=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:i.parts)o.functionCall&&e.push(o.functionCall);if(e.length>0)return e}function zs(t){var n,s,r,i;let e=[];if((s=(n=t.candidates)==null?void 0:n[0].content)!=null&&s.parts)for(let o of(i=(r=t.candidates)==null?void 0:r[0].content)==null?void 0:i.parts)o.inlineData&&e.push(o);if(e.length>0)return e}var Ks=[S.RECITATION,S.SAFETY,S.BLOCKLIST,S.PROHIBITED_CONTENT,S.SPII,S.MALFORMED_FUNCTION_CALL,S.IMAGE_SAFETY,S.IMAGE_PROHIBITED_CONTENT,S.IMAGE_OTHER,S.NO_IMAGE,S.IMAGE_RECITATION,S.LANGUAGE,S.UNEXPECTED_TOOL_CALL,S.TOO_MANY_TOOL_CALLS,S.MISSING_THOUGHT_SIGNATURE,S.MALFORMED_RESPONSE];function jt(t){return!!t.finishReason&&Ks.some(e=>e===t.finishReason)}function F(t){var n,s,r;let e="";if((!t.candidates||t.candidates.length===0)&&t.promptFeedback)e+="Response was blocked",(n=t.promptFeedback)!=null&&n.blockReason&&(e+=` due to ${t.promptFeedback.blockReason}`),(s=t.promptFeedback)!=null&&s.blockReasonMessage&&(e+=`: ${t.promptFeedback.blockReasonMessage}`);else if((r=t.candidates)!=null&&r[0]){let i=t.candidates[0];jt(i)&&(e+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(e+=`: ${i.finishMessage}`))}return e}function Wt(t){var e,n;if((e=t.safetySettings)==null||e.forEach(s=>{if(s.method)throw new d(u.UNSUPPORTED,"SafetySetting.method is not supported in the the Gemini Developer API. Please remove this property.")}),(n=t.generationConfig)!=null&&n.topK){let s=Math.round(t.generationConfig.topK);s!==t.generationConfig.topK&&(w.warn("topK in GenerationConfig has been rounded to the nearest integer to match the format for requests to the Gemini Developer API."),t.generationConfig.topK=s)}return t}function Xe(t){return{candidates:t.candidates?qs(t.candidates):void 0,prompt:t.promptFeedback?Js(t.promptFeedback):void 0,usageMetadata:t.usageMetadata}}function Ys(t,e){return{generateContentRequest:{model:e,...t}}}function qs(t){let e=[],n;return e&&t.forEach(s=>{var o,a;let r;if(s.citationMetadata&&(r={citations:s.citationMetadata.citationSources}),s.safetyRatings&&(n=s.safetyRatings.map(c=>{var l,p,h;return{...c,severity:(l=c.severity)!=null?l:Ht.HARM_SEVERITY_UNSUPPORTED,probabilityScore:(p=c.probabilityScore)!=null?p:0,severityScore:(h=c.severityScore)!=null?h:0}})),(a=(o=s.content)==null?void 0:o.parts)!=null&&a.some(c=>c==null?void 0:c.videoMetadata))throw new d(u.UNSUPPORTED,"Part.videoMetadata is not supported in the Gemini Developer API. Please remove this property.");let i={index:s.index,content:s.content,finishReason:s.finishReason,finishMessage:s.finishMessage,safetyRatings:n,citationMetadata:r,groundingMetadata:s.groundingMetadata,urlContextMetadata:s.urlContextMetadata};e.push(i)}),e}function Js(t){let e=[];return t.safetyRatings.forEach(s=>{var r,i,o;e.push({category:s.category,probability:s.probability,severity:(r=s.severity)!=null?r:Ht.HARM_SEVERITY_UNSUPPORTED,probabilityScore:(i=s.probabilityScore)!=null?i:0,severityScore:(o=s.severityScore)!=null?o:0,blocked:s.blocked})}),{blockReason:t.blockReason,safetyRatings:e,blockReasonMessage:t.blockReasonMessage}}var xt=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function Xs(t,e,n){let s=t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),r=tr(s),[i,o]=r.tee(),{response:a,firstValue:c}=await Qs(o,e,n);return{stream:er(i,e,n),response:a,firstValue:c}}async function Qs(t,e,n){let[s,r]=t.tee(),i=s.getReader(),{value:o}=await i.read();return{firstValue:o,response:Zs(r,e,n)}}async function Zs(t,e,n){let s=[],r=t.getReader();for(;;){let{done:i,value:o}=await r.read();if(i){let a=nr(s);return e.backend.backendType===I.GOOGLE_AI&&(a=Xe(a)),he(a,n)}s.push(o)}}async function*er(t,e,n){var r,i;let s=t.getReader();for(;;){let{value:o,done:a}=await s.read();if(a)break;let c;e.backend.backendType===I.GOOGLE_AI?c=he(Xe(o),n):c=he(o,n);let l=(r=c.candidates)==null?void 0:r[0];!((i=l==null?void 0:l.content)!=null&&i.parts)&&!(l!=null&&l.finishReason)&&!(l!=null&&l.citationMetadata)&&!(l!=null&&l.urlContextMetadata)||(yield c)}}function tr(t){let e=t.getReader();return new ReadableStream({start(s){let r="";return i();function i(){return e.read().then(({value:o,done:a})=>{if(a){if(r.trim()){s.error(new d(u.PARSE_FAILED,"Failed to parse stream"));return}s.close();return}r+=o;let c=r.match(xt),l;for(;c;){try{l=JSON.parse(c[1])}catch{s.error(new d(u.PARSE_FAILED,`Error parsing JSON response: "${c[1]}`));return}s.enqueue(l),r=r.substring(c[0].length),c=r.match(xt)}return i()})}}})}function nr(t){let e=t[t.length-1],n={promptFeedback:e==null?void 0:e.promptFeedback};for(let s of t)if(s.candidates)for(let r of s.candidates){let i=r.index||0;n.candidates||(n.candidates=[]),n.candidates[i]||(n.candidates[i]={index:r.index}),n.candidates[i].citationMetadata=r.citationMetadata,n.candidates[i].finishReason=r.finishReason,n.candidates[i].finishMessage=r.finishMessage,n.candidates[i].safetyRatings=r.safetyRatings,n.candidates[i].groundingMetadata=r.groundingMetadata;let o=r.urlContextMetadata;if(typeof o=="object"&&o!==null&&Object.keys(o).length>0&&(n.candidates[i].urlContextMetadata=o),r.content){if(!r.content.parts)continue;n.candidates[i].content||(n.candidates[i].content={role:r.content.role||"user",parts:[]});for(let a of r.content.parts){let c={...a};a.text!==""&&Object.keys(c).length>0&&n.candidates[i].content.parts.push(c)}}}return n}var sr=[u.FETCH_ERROR,u.ERROR,u.API_NOT_ENABLED];async function zt(t,e,n,s){if(!e)return{response:await s(),inferenceSource:M.IN_CLOUD};switch(e.mode){case O.ONLY_ON_DEVICE:if(await e.isAvailable(t))return{response:await n(),inferenceSource:M.ON_DEVICE};throw new d(u.UNSUPPORTED,"Inference mode is ONLY_ON_DEVICE, but an on-device model is not available.");case O.ONLY_IN_CLOUD:return{response:await s(),inferenceSource:M.IN_CLOUD};case O.PREFER_IN_CLOUD:try{return{response:await s(),inferenceSource:M.IN_CLOUD}}catch(r){if(r instanceof d&&sr.includes(r.code)&&await e.isAvailable(t))return{response:await n(),inferenceSource:M.ON_DEVICE};throw r}case O.PREFER_ON_DEVICE:return await e.isAvailable(t)?{response:await n(),inferenceSource:M.ON_DEVICE}:{response:await s(),inferenceSource:M.IN_CLOUD};default:throw new d(u.ERROR,`Unexpected infererence mode: ${e.mode}`)}}async function rr(t,e,n,s){return t.backend.backendType===I.GOOGLE_AI&&(n=Wt(n)),Je({task:"streamGenerateContent",model:e,apiSettings:t,stream:!0,singleRequestOptions:s},JSON.stringify(n))}async function Kt(t,e,n,s,r){let i=await zt(n,s,()=>s.generateContentStream(n),()=>rr(t,e,n,r));return Xs(i.response,t,i.inferenceSource)}async function ir(t,e,n,s){return t.backend.backendType===I.GOOGLE_AI&&(n=Wt(n)),Je({model:e,task:"generateContent",apiSettings:t,stream:!1,singleRequestOptions:s},JSON.stringify(n))}async function Yt(t,e,n,s,r){let i=await zt(n,s,()=>s.generateContent(n),()=>ir(t,e,n,r)),o=await or(i.response,t);return{response:he(o,i.inferenceSource)}}async function or(t,e){let n=await t.json();return e.backend.backendType===I.GOOGLE_AI?Xe(n):n}function Qe(t){if(t!=null){if(typeof t=="string")return{role:"system",parts:[{text:t}]};if(t.text)return{role:"system",parts:[t]};if(t.parts)return t.role?t:{role:"system",parts:t.parts}}}function q(t){let e=[];if(typeof t=="string")e=[{text:t}];else for(let n of t)typeof n=="string"?e.push({text:n}):e.push(n);return ar(e)}function ar(t){let e={role:"user",parts:[]},n=!1,s=!1;for(let r of t)"functionResponse"in r?s=!0:n=!0,e.parts.push(r);if(n&&s)throw new d(u.INVALID_CONTENT,"Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new d(u.INVALID_CONTENT,"No Content is provided for sending chat message.");return e}function Ge(t){let e;return t.contents?e=t:e={contents:[q(t)]},t.systemInstruction&&(e.systemInstruction=Qe(t.systemInstruction)),e}var Ut="SILENT_ERROR",$t=10,Ke=class{constructor(e,n,s){this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e}async getHistory(){return await this._sendPromise,this._history}async _sendMessage(e,n){let s={};await this._sendPromise;let r=[];return this._sendPromise=this._sendPromise.then(async()=>{var c,l,p,h;let i,o=0,a=(l=(c=this.requestOptions)==null?void 0:c.maxSequentialFunctionCalls)!=null?l:$t;do{let f;if(i){o++;let b=await this._callFunctionsAsNeeded(i);f=q(b)}else f=q(e);let g=this._formatRequest(f,[...r]);r.push(f);let m=await this._callGenerateContent(g,n);if(m)if(s=m,i=this._getCallableFunctionCalls(m.response),m.response.candidates&&m.response.candidates.length>0){let b={parts:((p=m.response.candidates)==null?void 0:p[0].content.parts)||[],role:((h=m.response.candidates)==null?void 0:h[0].content.role)||"model"};r.push(b)}else{let b=F(m.response);b&&w.warn(`sendMessage() was unsuccessful. ${b}. Inspect response object for details.`)}else i=void 0}while(i&&o<a);i&&o>=a&&w.warn(`Automatic function calling exceeded the limit of ${a} function calls. Returning last model response.`)}),await this._sendPromise,this._history=this._history.concat(r),s}async _sendMessageStream(e,n){await this._sendPromise;let s=[],i=(async()=>{var p,h;let o,a=0,c=(h=(p=this.requestOptions)==null?void 0:p.maxSequentialFunctionCalls)!=null?h:$t,l;do{let f;if(o){a++;let m=await this._callFunctionsAsNeeded(o);f=q(m)}else f=q(e);let g=this._formatRequest(f,[...s]);if(s.push(f),l=await this._callGenerateContentStream(g,n),o=this._getCallableFunctionCalls(l.firstValue),o&&l.firstValue&&l.firstValue.candidates&&l.firstValue.candidates.length>0){let m={...l.firstValue.candidates[0].content};m.role||(m.role="model"),s.push(m)}}while(o&&a<c);return o&&a>=c&&w.warn(`Automatic function calling exceeded the limit of ${c} function calls. Returning last model response.`),{stream:l.stream,response:l.response}})();return this._sendPromise=this._sendPromise.then(async()=>i).catch(o=>{throw new Error(Ut)}).then(o=>o.response).then(o=>{if(o.candidates&&o.candidates.length>0){this._history=this._history.concat(s);let a={...o.candidates[0].content};a.role||(a.role="model"),this._history.push(a)}else{let a=F(o);a&&w.warn(`sendMessageStream() was unsuccessful. ${a}. Inspect response object for details.`)}}).catch(o=>{o.message!==Ut&&o.name!=="AbortError"&&w.error(o)}),i}_getCallableFunctionCalls(e){var r,i,o;let n=(i=(r=this.params)==null?void 0:r.tools)==null?void 0:i.find(a=>a.functionDeclarations);if(!(n!=null&&n.functionDeclarations))return;let s=Vt(e);if(s){for(let a of s)if(!((o=n.functionDeclarations)==null?void 0:o.some(l=>l.name===a.name&&typeof l.functionReference=="function")))return;return s}}async _callFunctionsAsNeeded(e){var i,o;let n=[],s=[],r=(o=(i=this.params)==null?void 0:i.tools)==null?void 0:o.find(a=>a.functionDeclarations);if(r&&r.functionDeclarations){for(let c of e){let l=r.functionDeclarations.find(p=>p.name===c.name);if(l!=null&&l.functionReference){let p=Promise.resolve(l.functionReference(c.args)).catch(h=>{let f=new d(u.ERROR,`Error in user-defined function "${l.name}": ${h.message}`);throw f.stack=h.stack,f});n.push({name:c.name,id:c.id,results:p}),s.push(p)}}await Promise.all(s);let a=[];for(let{name:c,id:l,results:p}of n){let h={name:c,response:await p};l&&(h.id=l),a.push({functionResponse:h})}return a}else throw new d(u.REQUEST_ERROR,'No function declarations were provided in "tools".')}};var Bt=["text","inlineData","functionCall","functionResponse","thought","thoughtSignature"],cr={user:["text","inlineData","functionResponse"],function:["functionResponse"],model:["text","functionCall","thought","thoughtSignature"],system:["text"]},Ft={user:["model"],function:["model"],model:["user","function"],system:[]};function lr(t){let e=null;for(let n of t){let{role:s,parts:r}=n;if(!e&&s!=="user")throw new d(u.INVALID_CONTENT,`First Content should be with role 'user', got ${s}`);if(!Pt.includes(s))throw new d(u.INVALID_CONTENT,`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(Pt)}`);if(!Array.isArray(r))throw new d(u.INVALID_CONTENT,"Content should have 'parts' property with an array of Parts");if(r.length===0)throw new d(u.INVALID_CONTENT,"Each Content should have at least one part");let i={text:0,inlineData:0,functionCall:0,functionResponse:0,thought:0,thoughtSignature:0,executableCode:0,codeExecutionResult:0};for(let a of r)for(let c of Bt)c in a&&(i[c]+=1);let o=cr[s];for(let a of Bt)if(!o.includes(a)&&i[a]>0)throw new d(u.INVALID_CONTENT,`Content with role '${s}' can't contain '${a}' part`);if(e&&!Ft[s].includes(e.role))throw new d(u.INVALID_CONTENT,`Content with role '${s}' can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(Ft)}`);e=n}}var Ye=class extends Ke{constructor(e,n,s,r,i){var o;super(e,r,i),this.model=n,this.chromeAdapter=s,this.params=r,this.requestOptions=i,r!=null&&r.history&&(lr(r.history),this._history=r.history),((o=this.params)==null?void 0:o.systemInstruction)!=null&&(this.params={...this.params,systemInstruction:Qe(this.params.systemInstruction)})}_formatRequest(e,n){var s,r,i,o,a;return{safetySettings:(s=this.params)==null?void 0:s.safetySettings,generationConfig:(r=this.params)==null?void 0:r.generationConfig,tools:(i=this.params)==null?void 0:i.tools,toolConfig:(o=this.params)==null?void 0:o.toolConfig,systemInstruction:(a=this.params)==null?void 0:a.systemInstruction,contents:[...this._history,...n,e]}}_callGenerateContent(e,n){return Yt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}_callGenerateContentStream(e,n){return Kt(this._apiSettings,this.model,e,this.chromeAdapter,{...this.requestOptions,...n})}async sendMessage(e,n){return this._sendMessage(e,n)}async sendMessageStream(e,n){return this._sendMessageStream(e,n)}};async function ur(t,e,n,s){let r="";if(t.backend.backendType===I.GOOGLE_AI){let o=Ys(n,e);r=JSON.stringify(o)}else r=JSON.stringify(n);return(await Je({model:e,task:"countTokens",apiSettings:t,stream:!1,singleRequestOptions:s},r)).json()}async function dr(t,e,n,s,r){if((s==null?void 0:s.mode)===O.ONLY_ON_DEVICE)throw new d(u.UNSUPPORTED,"countTokens() is not supported for on-device models.");return ur(t,e,n,r)}var qe=class extends We{constructor(e,n,s,r){super(e,n.model),this.chromeAdapter=r,this.generationConfig=n.generationConfig||{},hr(this.generationConfig),this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=Qe(n.systemInstruction),this.requestOptions=s||{}}async initializeDeviceModel(e){if(!this.chromeAdapter||this.chromeAdapter.mode===O.ONLY_IN_CLOUD)return;if(await this.chromeAdapter.downloadIfAvailable(e)===N.UNAVAILABLE){let s=new d(u.API_NOT_ENABLED,"Local LanguageModel API not available in this environment.");if(this.chromeAdapter.mode===O.ONLY_ON_DEVICE)throw s;w.debug(s.message)}await this.chromeAdapter.downloadPromise}async generateContent(e,n){let s=Ge(e);return Yt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n})}async generateContentStream(e,n){let s=Ge(e),{stream:r,response:i}=await Kt(this._apiSettings,this.model,{generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,...s},this.chromeAdapter,{...this.requestOptions,...n});return{stream:r,response:i}}startChat(e){return new Ye(this._apiSettings,this.model,this.chromeAdapter,{tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,generationConfig:this.generationConfig,safetySettings:this.safetySettings,...e},this.requestOptions)}async countTokens(e,n){let s=Ge(e);return dr(this._apiSettings,this.model,s,this.chromeAdapter,{...this.requestOptions,...n})}};function hr(t){var e,n;if(((e=t.thinkingConfig)==null?void 0:e.thinkingBudget)!=null&&((n=t.thinkingConfig)!=null&&n.thinkingLevel))throw new d(u.UNSUPPORTED,"Cannot set both thinkingBudget and thinkingLevel in a config.");if(t.responseSchema!=null&&t.responseJsonSchema!=null)throw new d(u.UNSUPPORTED,"Cannot set both responseSchema and responseJsonSchema in a config.");if((t.responseSchema!=null||t.responseJsonSchema!=null)&&t.responseMimeType!=="application/json"&&t.responseMimeType!=="text/x.enum")throw new d(u.UNSUPPORTED,'responseMimeType must be set to "application/json" or "text/x.enum" if responseSchema or responseJsonSchema are set.')}var fr="audio-processor",vi=`
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
  registerProcessor('${fr}', AudioProcessor);
`;function qt(t=le(),e){var a,c;t=ie(t);let n=V(t,H),s=(a=e==null?void 0:e.backend)!=null?a:new G,r={useLimitedUseAppCheckTokens:(c=e==null?void 0:e.useLimitedUseAppCheckTokens)!=null?c:!1},i=Us(s),o=n.getImmediate({identifier:i});return o.options=r,o}var pr=["mode","onDeviceParams","inCloudParams"];function Jt(t,e,n){var a;let s=e,r;if(s.mode){for(let c of Object.keys(e))pr.includes(c)||w.warn(`When a hybrid inference mode is specified (mode is currently set to ${s.mode}), "${c}" cannot be configured at the top level. Configuration for in-cloud and on-device must be done separately in inCloudParams and onDeviceParams. Configuration values set outside of inCloudParams and onDeviceParams will be ignored.`);r=s.inCloudParams||{model:xs}}else r=e;if(!r.model)throw new d(u.NO_MODEL,"Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");let i=(a=t.chromeAdapterFactory)==null?void 0:a.call(t,s.mode,typeof window=="undefined"?void 0:window,s.onDeviceParams),o=new qe(t,r,n,i);return o._apiSettings.inferenceMode=s.mode,o}function gr(){P(new A(H,Fs,"PUBLIC").setMultipleInstances(!0)),C(Nt,Ve),C(Nt,Ve,"esm2020")}gr();var tt=new Map,en={activated:!1,tokenObservers:[]},mr={initialized:!1,enabled:!1};function _(t){return tt.get(t)||{...en}}function Er(t,e){return tt.set(t,e),tt.get(t)}function be(){return mr}var it="https://content-firebaseappcheck.googleapis.com/v1",_r="exchangeRecaptchaV3Token",br="exchangeRecaptchaEnterpriseToken",wr="exchangeDebugToken",Xt={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},yr=24*60*60*1e3;var nt=class{constructor(e,n,s,r,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=r,r>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new T,this.pending.promise.catch(n=>{}),await Sr(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new T,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{let n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}};function Sr(t){return new Promise(e=>{setTimeout(e,t)})}var Ar={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},y=new $("appCheck","AppCheck",Ar);function ge(t=!1){var e;return t?(e=self.grecaptcha)==null?void 0:e.enterprise:self.grecaptcha}function ot(t){if(!_(t).activated)throw y.create("use-before-activation",{appName:t.name})}function at(t){let e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-r*60,o="";return n&&(o+=fe(n)+"d:"),s&&(o+=fe(s)+"h:"),o+=fe(r)+"m:"+fe(i)+"s",o}function fe(t){return t===0?"00":t>=10?t.toString():"0"+t}async function we({url:t,body:e},n){let s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){let h=await r.getHeartbeatsHeader();h&&(s["X-Firebase-Client"]=h)}let i={method:"POST",body:JSON.stringify(e),headers:s},o;try{o=await fetch(t,i)}catch(h){throw y.create("fetch-network-error",{originalErrorMessage:h==null?void 0:h.message})}if(o.status!==200)throw y.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(h){throw y.create("fetch-parse-error",{originalErrorMessage:h==null?void 0:h.message})}let c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw y.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});let l=Number(c[1])*1e3,p=Date.now();return{token:a.token,expireTimeMillis:p+l,issuedAtTimeMillis:p}}function Tr(t,e){let{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${it}/projects/${n}/apps/${s}:${_r}?key=${r}`,body:{recaptcha_v3_token:e}}}function Or(t,e){let{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${it}/projects/${n}/apps/${s}:${br}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function tn(t,e){let{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${it}/projects/${n}/apps/${s}:${wr}?key=${r}`,body:{debug_token:e}}}var Rr="firebase-app-check-database",Cr=1,Z="firebase-app-check-store",nn="debug-token",pe=null;function sn(){return pe||(pe=new Promise((t,e)=>{try{let n=indexedDB.open(Rr,Cr);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{var r;e(y.create("storage-open",{originalErrorMessage:(r=s.target.error)==null?void 0:r.message}))},n.onupgradeneeded=s=>{let r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(Z,{keyPath:"compositeKey"})}}}catch(n){e(y.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}}),pe)}function Ir(t){return on(an(t))}function vr(t,e){return rn(an(t),e)}function Dr(t){return rn(nn,t)}function kr(){return on(nn)}async function rn(t,e){let s=(await sn()).transaction(Z,"readwrite"),i=s.objectStore(Z).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},s.onerror=c=>{var l;a(y.create("storage-set",{originalErrorMessage:(l=c.target.error)==null?void 0:l.message}))}})}async function on(t){let n=(await sn()).transaction(Z,"readonly"),r=n.objectStore(Z).get(t);return new Promise((i,o)=>{r.onsuccess=a=>{let c=a.target.result;i(c?c.value:void 0)},n.onerror=a=>{var c;o(y.create("storage-get",{originalErrorMessage:(c=a.target.error)==null?void 0:c.message}))}})}function an(t){return`${t.options.appId}-${t.name}`}var x=new L("@firebase/app-check");async function Nr(t){if(K()){let e;try{e=await Ir(t)}catch(n){x.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function Ze(t,e){return K()?vr(t,e).catch(n=>{x.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function Lr(t){let e;try{e=await kr()}catch{}if(e)return e;{let n=crypto.randomUUID(),s=`To use this token for app debugging, register it with your project.

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
`,console.log(s),Dr(n).catch(o=>x.warn(`Failed to persist debug token to IndexedDB. Error: ${o}`)),n}}function ct(){return be().enabled}async function lt(){let t=be();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Pr(t){let e=z(),n=be();if(n.initialized=!0,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&e.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;n.enabled=!0;let s=new T;n.token=s,typeof e.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?s.resolve(e.FIREBASE_APPCHECK_DEBUG_TOKEN):s.resolve(Lr(t))}var Mr={error:"UNKNOWN_ERROR"};function xr(t){return se.encodeString(JSON.stringify(t),!1)}async function st(t,e=!1,n=!1){let s=t.app;ot(s);let r=_(s),i=r.token,o;if(i&&!W(i)&&(r.token=void 0,i=void 0),!i){let l=await r.cachedTokenPromise;l&&(W(l)?i=l:await Ze(s,void 0))}if(!e&&i&&W(i))return{token:i.token};let a=!1;if(ct())try{let l=await lt();r.exchangeTokenPromise||(r.exchangeTokenPromise=we(tn(s,l),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);let p=await r.exchangeTokenPromise;return await Ze(s,p),r.token=p,{token:p.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?x.warn(l.message):n&&x.error(l),et(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),i=await _(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?x.warn(l.message):n&&x.error(l),o=l}let c;return i?o?W(i)?c={token:i.token,internalError:o}:c=et(o):(c={token:i.token},r.token=i,await Ze(s,i)):c=et(o),a&&un(s,c),c}async function Ur(t){let e=t.app;ot(e);let{provider:n}=_(e);if(ct()){let s=await lt(),r=tn(e,s);r.body.limited_use=!0;let{token:i}=await we(r,t.heartbeatServiceProvider);return{token:i}}else{let{token:s}=await n.getToken(!0);return{token:s}}}function cn(t,e,n,s){let{app:r}=t,i=_(r),o={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&W(i.token)){let a=i.token;Promise.resolve().then(()=>{n({token:a.token}),Qt(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Qt(t))}function ln(t,e){let n=_(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Qt(t){let{app:e}=t,n=_(e),s=n.tokenRefresher;s||(s=$r(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function $r(t){let{app:e}=t;return new nt(async()=>{let n=_(e),s;if(n.token?s=await st(t,!0):s=await st(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{let n=_(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5,r=n.token.expireTimeMillis-5*60*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},Xt.RETRIAL_MIN_WAIT,Xt.RETRIAL_MAX_WAIT)}function un(t,e){let n=_(t).tokenObservers;for(let s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function W(t){return t.expireTimeMillis-Date.now()>0}function et(t){return{token:xr(Mr),error:t}}var rt=class{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){let{tokenObservers:e}=_(this.app);for(let n of e)ln(this.app,n.next);return Promise.resolve()}};function Br(t,e){return new rt(t,e)}function Fr(t){return{getToken:e=>st(t,e),getLimitedUseToken:()=>Ur(t),addTokenListener:e=>cn(t,"INTERNAL",e),removeTokenListener:e=>ln(t.app,e)}}var Hr="@firebase/app-check",Gr="0.13.1";var Vr="https://www.google.com/recaptcha/api.js",jr="https://www.google.com/recaptcha/enterprise.js";function Wr(t,e){let n=new T,s=_(t);s.reCAPTCHAState={initialized:n};let r=dn(t),i=ge(!1);return i?me(t,e,i,r,n):Yr(()=>{let o=ge(!1);if(!o)throw new Error("no recaptcha");me(t,e,o,r,n)}),n.promise}function zr(t,e){let n=new T,s=_(t);s.reCAPTCHAState={initialized:n};let r=dn(t),i=ge(!0);return i?me(t,e,i,r,n):qr(()=>{let o=ge(!0);if(!o)throw new Error("no recaptcha");me(t,e,o,r,n)}),n.promise}function me(t,e,n,s,r){n.ready(()=>{Kr(t,e,n,s),r.resolve(n)})}function dn(t){let e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function hn(t){ot(t);let n=await _(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{let i=_(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function Kr(t,e,n,s){let r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{_(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{_(t).reCAPTCHAState.succeeded=!1}}),i=_(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:r}}function Yr(t){let e=document.createElement("script");e.src=Vr,e.onload=t,document.head.appendChild(e)}function qr(t){let e=document.createElement("script");e.src=jr+"?render=explicit",e.onload=t,document.head.appendChild(e)}var Ee=class t{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){var r,i,o;pn(this._throttleData);let n=await hn(this._app).catch(a=>{throw y.create("recaptcha-error")});if(!((r=_(this._app).reCAPTCHAState)!=null&&r.succeeded))throw y.create("recaptcha-error");let s;try{let a=Tr(this._app,n);e&&(a.body.limited_use=!0),s=await we(a,this._heartbeatServiceProvider)}catch(a){throw(i=a.code)!=null&&i.includes("fetch-status-error")?(this._throttleData=fn(Number((o=a.customData)==null?void 0:o.httpStatus),this._throttleData),y.create("initial-throttle",{time:at(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=V(e,"heartbeat"),Wr(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof t?this._siteKey===e._siteKey:!1}},_e=class t{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(e=!1){var r,i,o;pn(this._throttleData);let n=await hn(this._app).catch(a=>{throw y.create("recaptcha-error")});if(!((r=_(this._app).reCAPTCHAState)!=null&&r.succeeded))throw y.create("recaptcha-error");let s;try{let a=Or(this._app,n);e&&(a.body.limited_use=!0),s=await we(a,this._heartbeatServiceProvider)}catch(a){throw(i=a.code)!=null&&i.includes("fetch-status-error")?(this._throttleData=fn(Number((o=a.customData)==null?void 0:o.httpStatus),this._throttleData),y.create("initial-throttle",{time:at(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=V(e,"heartbeat"),zr(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof t?this._siteKey===e._siteKey:!1}};function fn(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+yr,httpStatus:t};{let n=e?e.backoffCount:0,s=mt(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function pn(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw y.create("throttled",{time:at(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}function gn(t=le(),e){var r;t=ie(t);let n=V(t,"app-check");if(be().initialized||Pr(t),ct()&&lt().then(i=>{console.log(`Firebase App Check debug token: ${i}`)}),n.isInitialized()){let i=n.getImmediate(),o=n.getOptions();if(o&&!!o.isTokenAutoRefreshEnabled==!!e.isTokenAutoRefreshEnabled&&((r=o.provider)!=null&&r.isEqual(e.provider)))return i;throw y.create("already-initialized",{appName:t.name})}let s=n.initialize({options:e});return Jr(t,e.provider,e.isTokenAutoRefreshEnabled),_(t).isTokenAutoRefreshEnabled&&cn(s,"INTERNAL",()=>{}),s}function Jr(t,e,n=!1){let s=Er(t,{...en});s.activated=!0,s.provider=e,s.cachedTokenPromise=Nr(t).then(r=>(r&&W(r)&&(s.token=r,un(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&x.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}var Xr="app-check",Zt="app-check-internal";function Qr(){P(new A(Xr,t=>{let e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return Br(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Zt).initialize()})),P(new A(Zt,t=>{let e=t.getProvider("app-check").getImmediate();return Fr(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),C(Hr,Gr)}Qr();var Zr=["gemini-3.8-flash","gemini-3.6-flash","gemini-flash-latest"];function ei(t){return new Promise((e,n)=>{let s=new FileReader;s.onload=()=>e(String(s.result).split(",")[1]),s.onerror=n,s.readAsDataURL(t)})}function ee(t,e){let n=new Error(e||t);return n.code=t,n}function ti(t){t=String(t||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/,"");try{return JSON.parse(t)}catch{}let e=t.indexOf("{"),n=t.lastIndexOf("}");if(e>=0&&n>e)return JSON.parse(t.slice(e,n+1));throw ee("bad_json","invalid JSON from model")}window.fbAI={create(t,e,n,s){let r=$e(t,"ai");gn(r,{provider:s==="v3"?new Ee(e):new _e(e),isTokenAutoRefreshEnabled:!0});let i=qt(r,{backend:new G}),o=[n,...Zr].filter((h,f,g)=>h&&g.indexOf(h)===f),a=0,c=()=>Jt(i,{model:o[a],generationConfig:{responseMimeType:"application/json",temperature:.4}}),l=c();async function p(h){for(;;)try{return await l.generateContent({contents:[{role:"user",parts:h}]})}catch(f){let g=String(f&&f.message||"")+" "+String(f&&f.code||"");if(/not.?found|404|is not supported|unknown model/i.test(g)&&a<o.length-1){a++,l=c();continue}throw/quota|resource.?exhausted|429/i.test(g)?ee(/per.?day|daily/i.test(g)?"quota":"rate_limited",g):/app.?check|recaptcha|permission|403|api has not been used|disabled/i.test(g)?ee("not_ready",g):!navigator.onLine||/network|failed to fetch/i.test(g)?ee("offline",g):f}}return{async limits(){return{images:{maxCount:3,maxBytes:7*1024*1024}}},async json(h,f={}){if(!navigator.onLine)throw ee("offline");let g=[{text:h+`

\u05E2\u05E0\u05D4 \u05D1-JSON \u05EA\u05E7\u05D9\u05DF \u05D1\u05DC\u05D1\u05D3, \u05D1\u05DC\u05D9 \u05D8\u05E7\u05E1\u05D8 \u05E0\u05D5\u05E1\u05E3.`}];for(let U of(f.images||[]).slice(0,3)){let ne=typeof U=="string"?await(await fetch(U)).blob():U;g.push({inlineData:{mimeType:ne.type||"image/jpeg",data:await ei(ne)}})}let m=p(g),b=f.signal?new Promise((U,ne)=>f.signal.addEventListener("abort",()=>{let ut=new Error("aborted");ut.name="AbortError",ne(ut)},{once:!0})):null,te=await(b?Promise.race([m,b]):m);return ti(te.response.text())}}}};})();
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
