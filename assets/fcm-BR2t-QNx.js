const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-CE70f_J9.js","./index-DfmvHo9d.css"])))=>i.map(i=>d[i]);
import{_ as Dt,t as kt}from"./index-CE70f_J9.js";const Rt=()=>{};var me={};/**
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
 */const je=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Nt=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=e[n++],a=e[n++],c=e[n++],d=((i&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(d>>10)),t[r++]=String.fromCharCode(56320+(d&1023))}else{const o=e[n++],a=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Ve={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const o=e[i],a=i+1<e.length,c=a?e[i+1]:0,d=i+2<e.length,s=d?e[i+2]:0,O=o>>2,k=(o&3)<<4|c>>4;let M=(c&15)<<2|s>>6,B=s&63;d||(B=64,a||(M=64)),r.push(n[O],n[k],n[M],n[B])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(je(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Nt(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const o=n[e.charAt(i++)],c=i<e.length?n[e.charAt(i)]:0;++i;const s=i<e.length?n[e.charAt(i)]:64;++i;const k=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||c==null||s==null||k==null)throw new Ot;const M=o<<2|c>>4;if(r.push(M),s!==64){const B=c<<4&240|s>>2;if(r.push(B),k!==64){const vt=s<<6&192|k;r.push(vt)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Ot extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Mt=function(e){const t=je(e);return Ve.encodeByteArray(t,!0)},Ue=function(e){return Mt(e).replace(/\./g,"")},Bt=function(e){try{return Ve.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function Pt(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ft=()=>Pt().__FIREBASE_DEFAULTS__,$t=()=>{if(typeof process>"u"||typeof me>"u")return;const e=me.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Lt=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&Bt(e[1]);return t&&JSON.parse(t)},Ht=()=>{try{return Rt()||Ft()||$t()||Lt()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Ke=()=>{var e;return(e=Ht())==null?void 0:e.config};/**
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
 */class xt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}function We(){try{return typeof indexedDB=="object"}catch{return!1}}function qe(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)==null?void 0:o.message)||"")}}catch(n){t(n)}})}function jt(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Vt="FirebaseError";class v extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Vt,Object.setPrototypeOf(this,v.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,L.prototype.create)}}class L{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],a=o?Ut(o,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new v(i,c,r)}}function Ut(e,t){return e.replace(Kt,(n,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const Kt=/\{\$([^}]+)}/g;function ee(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const o=e[i],a=t[i];if(we(o)&&we(a)){if(!ee(o,a))return!1}else if(o!==a)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function we(e){return e!==null&&typeof e=="object"}/**
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
 */function ce(e){return e&&e._delegate?e._delegate:e}class w{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const y="[DEFAULT]";/**
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
 */class Wt{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new xt;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(zt(t))try{this.getOrInitializeService({instanceIdentifier:y})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=y){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=y){return this.instances.has(t)}getOptions(t=y){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(i)}return i}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&t(o,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:qt(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=y){return this.component?this.component.multipleInstances?t:y:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function qt(e){return e===y?void 0:e}function zt(e){return e.instantiationMode==="EAGER"}/**
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
 */class Gt{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Wt(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var f;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(f||(f={}));const Jt={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},Yt=f.INFO,Xt={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},Qt=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=Xt[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Zt{constructor(t){this.name=t,this._logLevel=Yt,this._logHandler=Qt,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in f))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Jt[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...t),this._logHandler(this,f.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...t),this._logHandler(this,f.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,f.INFO,...t),this._logHandler(this,f.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,f.WARN,...t),this._logHandler(this,f.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...t),this._logHandler(this,f.ERROR,...t)}}const en=(e,t)=>t.some(n=>e instanceof n);let ye,Ie;function tn(){return ye||(ye=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function nn(){return Ie||(Ie=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ze=new WeakMap,te=new WeakMap,Ge=new WeakMap,W=new WeakMap,de=new WeakMap;function rn(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",a)},o=()=>{n(h(e.result)),i()},a=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",a)});return t.then(n=>{n instanceof IDBCursor&&ze.set(n,e)}).catch(()=>{}),de.set(t,e),t}function on(e){if(te.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",a),e.removeEventListener("abort",a)},o=()=>{n(),i()},a=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",a),e.addEventListener("abort",a)});te.set(e,t)}let ne={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return te.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Ge.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return h(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function an(e){ne=e(ne)}function sn(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(q(this),t,...n);return Ge.set(r,t.sort?t.sort():[t]),h(r)}:nn().includes(e)?function(...t){return e.apply(q(this),t),h(ze.get(this))}:function(...t){return h(e.apply(q(this),t))}}function cn(e){return typeof e=="function"?sn(e):(e instanceof IDBTransaction&&on(e),en(e,tn())?new Proxy(e,ne):e)}function h(e){if(e instanceof IDBRequest)return rn(e);if(W.has(e))return W.get(e);const t=cn(e);return t!==e&&(W.set(e,t),de.set(t,e)),t}const q=e=>de.get(e);function H(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(e,t),c=h(a);return r&&a.addEventListener("upgradeneeded",d=>{r(h(a.result),d.oldVersion,d.newVersion,h(a.transaction),d)}),n&&a.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),c.then(d=>{o&&d.addEventListener("close",()=>o()),i&&d.addEventListener("versionchange",s=>i(s.oldVersion,s.newVersion,s))}).catch(()=>{}),c}function P(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),h(n).then(()=>{})}const dn=["get","getKey","getAll","getAllKeys","count"],un=["put","add","delete","clear"],z=new Map;function Ee(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(z.get(t))return z.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=un.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||dn.includes(n)))return;const o=async function(a,...c){const d=this.transaction(a,i?"readwrite":"readonly");let s=d.store;return r&&(s=s.index(c.shift())),(await Promise.all([s[n](...c),i&&d.done]))[0]};return z.set(t,o),o}an(e=>({...e,get:(t,n,r)=>Ee(t,n)||e.get(t,n,r),has:(t,n)=>!!Ee(t,n)||e.has(t,n)}));/**
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
 */class fn{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ln(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ln(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const re="@firebase/app",_e="0.15.1";/**
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
 */const g=new Zt("@firebase/app"),hn="@firebase/app-compat",pn="@firebase/analytics-compat",gn="@firebase/analytics",bn="@firebase/app-check-compat",mn="@firebase/app-check",wn="@firebase/auth",yn="@firebase/auth-compat",In="@firebase/database",En="@firebase/data-connect",_n="@firebase/database-compat",Sn="@firebase/functions",Tn="@firebase/functions-compat",An="@firebase/installations",Cn="@firebase/installations-compat",vn="@firebase/messaging",Dn="@firebase/messaging-compat",kn="@firebase/performance",Rn="@firebase/performance-compat",Nn="@firebase/remote-config",On="@firebase/remote-config-compat",Mn="@firebase/storage",Bn="@firebase/storage-compat",Pn="@firebase/firestore",Fn="@firebase/ai",$n="@firebase/firestore-compat",Ln="firebase";/**
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
 */const ie="[DEFAULT]",Hn={[re]:"fire-core",[hn]:"fire-core-compat",[gn]:"fire-analytics",[pn]:"fire-analytics-compat",[mn]:"fire-app-check",[bn]:"fire-app-check-compat",[wn]:"fire-auth",[yn]:"fire-auth-compat",[In]:"fire-rtdb",[En]:"fire-data-connect",[_n]:"fire-rtdb-compat",[Sn]:"fire-fn",[Tn]:"fire-fn-compat",[An]:"fire-iid",[Cn]:"fire-iid-compat",[vn]:"fire-fcm",[Dn]:"fire-fcm-compat",[kn]:"fire-perf",[Rn]:"fire-perf-compat",[Nn]:"fire-rc",[On]:"fire-rc-compat",[Mn]:"fire-gcs",[Bn]:"fire-gcs-compat",[Pn]:"fire-fst",[$n]:"fire-fst-compat",[Fn]:"fire-vertex","fire-js":"fire-js",[Ln]:"fire-js-all"};/**
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
 */const F=new Map,xn=new Map,oe=new Map;function Se(e,t){try{e.container.addComponent(t)}catch(n){g.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function E(e){const t=e.name;if(oe.has(t))return g.debug(`There were multiple attempts to register component ${t}.`),!1;oe.set(t,e);for(const n of F.values())Se(n,e);for(const n of xn.values())Se(n,e);return!0}function ue(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
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
 */const jn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},b=new L("app","Firebase",jn);/**
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
 */class Vn{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new w("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw b.create("app-deleted",{appName:this._name})}}function Je(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:ie,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw b.create("bad-app-name",{appName:String(i)});if(n||(n=Ke()),!n)throw b.create("no-options");const o=F.get(i);if(o){if(ee(n,o.options)&&ee(r,o.config))return o;throw b.create("duplicate-app",{appName:i})}const a=new Gt(i);for(const d of oe.values())a.addComponent(d);const c=new Vn(n,r,a);return F.set(i,c),c}function Un(e=ie){const t=F.get(e);if(!t&&e===ie&&Ke())return Je();if(!t)throw b.create("no-app",{appName:e});return t}function m(e,t,n){let r=Hn[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${t}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),g.warn(a.join(" "));return}E(new w(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const Kn="firebase-heartbeat-database",Wn=1,N="firebase-heartbeat-store";let G=null;function Ye(){return G||(G=H(Kn,Wn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(N)}catch(n){console.warn(n)}}}}).catch(e=>{throw b.create("idb-open",{originalErrorMessage:e.message})})),G}async function qn(e){try{const n=(await Ye()).transaction(N),r=await n.objectStore(N).get(Xe(e));return await n.done,r}catch(t){if(t instanceof v)g.warn(t.message);else{const n=b.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});g.warn(n.message)}}}async function Te(e,t){try{const r=(await Ye()).transaction(N,"readwrite");await r.objectStore(N).put(t,Xe(e)),await r.done}catch(n){if(n instanceof v)g.warn(n.message);else{const r=b.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});g.warn(r.message)}}}function Xe(e){return`${e.name}!${e.options.appId}`}/**
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
 */const zn=1024,Gn=30;class Jn{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Xn(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Ae();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>Gn){const a=Qn(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){g.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ae(),{heartbeatsToSend:r,unsentEntries:i}=Yn(this._heartbeatsCache.heartbeats),o=Ue(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return g.warn(n),""}}}function Ae(){return new Date().toISOString().substring(0,10)}function Yn(e,t=zn){const n=[];let r=e.slice();for(const i of e){const o=n.find(a=>a.agent===i.agent);if(o){if(o.dates.push(i.date),Ce(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ce(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Xn{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return We()?qe().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await qn(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Te(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Te(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Ce(e){return Ue(JSON.stringify({version:2,heartbeats:e})).length}function Qn(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
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
 */function Zn(e){E(new w("platform-logger",t=>new fn(t),"PRIVATE")),E(new w("heartbeat",t=>new Jn(t),"PRIVATE")),m(re,_e,e),m(re,_e,"esm2020"),m("fire-js","")}Zn("");var er="firebase",tr="12.16.0";/**
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
 */m(er,tr,"app");const Qe="@firebase/installations",fe="0.6.22";/**
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
 */const Ze=1e4,et=`w:${fe}`,tt="FIS_v2",nr="https://firebaseinstallations.googleapis.com/v1",rr=60*60*1e3,ir="installations",or="Installations";/**
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
 */const ar={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},_=new L(ir,or,ar);function nt(e){return e instanceof v&&e.code.includes("request-failed")}/**
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
 */function rt({projectId:e}){return`${nr}/projects/${e}/installations`}function it(e){return{token:e.token,requestStatus:2,expiresIn:cr(e.expiresIn),creationTime:Date.now()}}async function ot(e,t){const r=(await t.json()).error;return _.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function at({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function sr(e,{refreshToken:t}){const n=at(e);return n.append("Authorization",dr(t)),n}async function st(e){const t=await e();return t.status>=500&&t.status<600?e():t}function cr(e){return Number(e.replace("s","000"))}function dr(e){return`${tt} ${e}`}/**
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
 */async function ur({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=rt(e),i=at(e),o=t.getImmediate({optional:!0});if(o){const s=await o.getHeartbeatsHeader();s&&i.append("x-firebase-client",s)}const a={fid:n,authVersion:tt,appId:e.appId,sdkVersion:et},c={method:"POST",headers:i,body:JSON.stringify(a)},d=await st(()=>fetch(r,c));if(d.ok){const s=await d.json();return{fid:s.fid||n,registrationStatus:2,refreshToken:s.refreshToken,authToken:it(s.authToken)}}else throw await ot("Create Installation",d)}/**
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
 */function ct(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function fr(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const lr=/^[cdef][\w-]{21}$/,ae="";function hr(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=pr(e);return lr.test(n)?n:ae}catch{return ae}}function pr(e){return fr(e).substr(0,22)}/**
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
 */function D(e){return`${e.appName}!${e.appId}`}/**
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
 */const A=new Map;function dt(e,t){const n=D(e);ut(n,t),mr(n,t)}function gr(e,t){ft();const n=D(e);let r=A.get(n);r||(r=new Set,A.set(n,r)),r.add(t)}function br(e,t){const n=D(e),r=A.get(n);r&&(r.delete(t),r.size===0&&A.delete(n),lt())}function ut(e,t){const n=A.get(e);if(n)for(const r of n)r(t)}function mr(e,t){const n=ft();n&&n.postMessage({key:e,fid:t}),lt()}let I=null;function ft(){return!I&&"BroadcastChannel"in self&&(I=new BroadcastChannel("[Firebase] FID Change"),I.onmessage=e=>{ut(e.data.key,e.data.fid)}),I}function lt(){A.size===0&&I&&(I.close(),I=null)}/**
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
 */const wr="firebase-installations-database",yr=1,S="firebase-installations-store";let J=null;function le(){return J||(J=H(wr,yr,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(S)}}})),J}async function $(e,t){const n=D(e),i=(await le()).transaction(S,"readwrite"),o=i.objectStore(S),a=await o.get(n);return await o.put(t,n),await i.done,(!a||a.fid!==t.fid)&&dt(e,t.fid),t}async function ht(e){const t=D(e),r=(await le()).transaction(S,"readwrite");await r.objectStore(S).delete(t),await r.done}async function x(e,t){const n=D(e),i=(await le()).transaction(S,"readwrite"),o=i.objectStore(S),a=await o.get(n),c=t(a);return c===void 0?await o.delete(n):await o.put(c,n),await i.done,c&&(!a||a.fid!==c.fid)&&dt(e,c.fid),c}/**
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
 */async function he(e){let t;const n=await x(e.appConfig,r=>{const i=Ir(r),o=Er(e,i);return t=o.registrationPromise,o.installationEntry});return n.fid===ae?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function Ir(e){const t=e||{fid:hr(),registrationStatus:0};return pt(t)}function Er(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(_.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=_r(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Sr(e)}:{installationEntry:t}}async function _r(e,t){try{const n=await ur(e,t);return $(e.appConfig,n)}catch(n){throw nt(n)&&n.customData.serverCode===409?await ht(e.appConfig):await $(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function Sr(e){let t=await ve(e.appConfig);for(;t.registrationStatus===1;)await ct(100),t=await ve(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await he(e);return r||n}return t}function ve(e){return x(e,t=>{if(!t)throw _.create("installation-not-found");return pt(t)})}function pt(e){return Tr(e)?{fid:e.fid,registrationStatus:0}:e}function Tr(e){return e.registrationStatus===1&&e.registrationTime+Ze<Date.now()}/**
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
 */async function Ar({appConfig:e,heartbeatServiceProvider:t},n){const r=Cr(e,n),i=sr(e,n),o=t.getImmediate({optional:!0});if(o){const s=await o.getHeartbeatsHeader();s&&i.append("x-firebase-client",s)}const a={installation:{sdkVersion:et,appId:e.appId}},c={method:"POST",headers:i,body:JSON.stringify(a)},d=await st(()=>fetch(r,c));if(d.ok){const s=await d.json();return it(s)}else throw await ot("Generate Auth Token",d)}function Cr(e,{fid:t}){return`${rt(e)}/${t}/authTokens:generate`}/**
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
 */async function pe(e,t=!1){let n;const r=await x(e.appConfig,o=>{if(!gt(o))throw _.create("not-registered");const a=o.authToken;if(!t&&kr(a))return o;if(a.requestStatus===1)return n=vr(e,t),o;{if(!navigator.onLine)throw _.create("app-offline");const c=Nr(o);return n=Dr(e,c),c}});return n?await n:r.authToken}async function vr(e,t){let n=await De(e.appConfig);for(;n.authToken.requestStatus===1;)await ct(100),n=await De(e.appConfig);const r=n.authToken;return r.requestStatus===0?pe(e,t):r}function De(e){return x(e,t=>{if(!gt(t))throw _.create("not-registered");const n=t.authToken;return Or(n)?{...t,authToken:{requestStatus:0}}:t})}async function Dr(e,t){try{const n=await Ar(e,t),r={...t,authToken:n};return await $(e.appConfig,r),n}catch(n){if(nt(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ht(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await $(e.appConfig,r)}throw n}}function gt(e){return e!==void 0&&e.registrationStatus===2}function kr(e){return e.requestStatus===2&&!Rr(e)}function Rr(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+rr}function Nr(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function Or(e){return e.requestStatus===1&&e.requestTime+Ze<Date.now()}/**
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
 */async function Mr(e){const t=e,{installationEntry:n,registrationPromise:r}=await he(t);return r?r.catch(console.error):pe(t).catch(console.error),n.fid}/**
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
 */async function Br(e,t=!1){const n=e;return await Pr(n),(await pe(n,t)).token}async function Pr(e){const{registrationPromise:t}=await he(e);t&&await t}/**
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
 */function Fr(e,t){const{appConfig:n}=e;return gr(n,t),()=>{br(n,t)}}/**
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
 */function $r(e){if(!e||!e.options)throw Y("App Configuration");if(!e.name)throw Y("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Y(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Y(e){return _.create("missing-app-config-values",{valueName:e})}/**
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
 */const bt="installations",Lr="installations-internal",Hr=e=>{const t=e.getProvider("app").getImmediate(),n=$r(t),r=ue(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},xr=e=>{const t=e.getProvider("app").getImmediate(),n=ue(t,bt).getImmediate();return{getId:()=>Mr(n),getToken:i=>Br(n,i)}};function jr(){E(new w(bt,Hr,"PUBLIC")),E(new w(Lr,xr,"PRIVATE"))}jr();m(Qe,fe);m(Qe,fe,"esm2020");/**
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
 */const Vr="/firebase-messaging-sw.js",Ur="/firebase-cloud-messaging-push-scope",mt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Kr="https://fcmregistrations.googleapis.com/v1",wt="google.c.a.c_id",Wr="google.c.a.c_l",qr="google.c.a.ts",zr="google.c.a.e",ke=1e4;var Re;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Re||(Re={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var C;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked",e.FID_REGISTERED="fid-registered"})(C||(C={}));/**
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
 */function l(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function yt(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}/**
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
 */const X="fcm_token_details_db",Gr=5,Ne="fcm_token_object_Store";async function Jr(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(X))return null;let t=null;return(await H(X,Gr,{upgrade:async(r,i,o,a)=>{if(i<2||!r.objectStoreNames.contains(Ne))return;const c=a.objectStore(Ne),d=await c.index("fcmSenderId").get(e);if(await c.clear(),!!d){if(i===2){const s=d;if(!s.auth||!s.p256dh||!s.endpoint)return;t={token:s.fcmToken,createTime:s.createTime??Date.now(),subscriptionOptions:{auth:s.auth,p256dh:s.p256dh,endpoint:s.endpoint,swScope:s.swScope,vapidKey:typeof s.vapidKey=="string"?s.vapidKey:l(s.vapidKey)}}}else if(i===3){const s=d;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:l(s.auth),p256dh:l(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:l(s.vapidKey)}}}else if(i===4){const s=d;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:l(s.auth),p256dh:l(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:l(s.vapidKey)}}}}}})).close(),await P(X),await P("fcm_vapid_details_db"),await P("undefined"),Yr(t)?t:null}function Yr(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
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
 */const Xr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","fid-registration-failed":"A problem occurred while creating an FCM registration via FID: {$errorInfo}","fid-unregister-failed":"A problem occurred while unregistering the FCM registration via FID: {$errorInfo}","fid-registration-idb-schema-unavailable":"Unable to read or persist FID registration metadata because the messaging IndexedDB schema is unavailable (for example, the database could not be upgraded to the latest version).","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.","invalid-on-registered-handler":"No onRegistered callback handler was provided or registered. Implement onRegistered() before register()."},u=new L("messaging","Messaging",Xr);/**
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
 */const Oe="firebase-messaging-database",Me=2,T="firebase-messaging-store",p="firebase-messaging-fid-registration-store",Qr={openDB:H,deleteDB:P};let Be=Qr,R=null;function Zr(e,t,n){switch(t){case 0:if(e.createObjectStore(T),n===1)break;case 1:n===2&&e.createObjectStore(p)}}function Pe(e){return{upgrade:(t,n)=>{Zr(t,n,e)},blocked:()=>{},blocking:(t,n,r)=>{var i;R=null,(i=r.target)==null||i.close()},terminated:()=>{R=null}}}function j(){return R||(R=Be.openDB(Oe,Me,Pe(2)).catch(()=>Be.openDB(Oe,Me-1,Pe(1)))),R}function It(e,t){return e.objectStoreNames.contains(t)}function Et(e){if(!It(e,p))throw u.create("fid-registration-idb-schema-unavailable")}async function ei(e){const t=V(e),r=await(await j()).transaction(T).objectStore(T).get(t);if(r)return r;{const i=await Jr(e.appConfig.senderId);if(i)return await ge(e,i),i}}async function ge(e,t){const n=V(e),r=await j(),i=[T],o=It(r,p);o&&i.push(p);const a=r.transaction(i,"readwrite");return await a.objectStore(T).put(t,n),o&&await a.objectStore(p).delete(n),await a.done,t}async function _t(e){const t=V(e),n=await j();return Et(n),await n.transaction(p).objectStore(p).get(t)}async function ti(e,t){const n=V(e),r=await j();Et(r);const i=r.transaction([T,p],"readwrite");return await i.objectStore(p).put(t,n),await i.objectStore(T).delete(n),await i.done,t}function V({appConfig:e}){return e.appId}const Fe="@firebase/messaging",se="0.13.0";/**
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
 */const ni=3,ri=1e3;async function ii(e,t){const n=await K(e),r=be(t,e.appConfig.appName,!1),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(U(e.appConfig),i)).json()}catch(a){throw u.create("token-subscribe-failed",{errorInfo:a==null?void 0:a.toString()})}if(o.error){const a=o.error.message;throw u.create("token-subscribe-failed",{errorInfo:a})}if(!o.token)throw u.create("token-subscribe-no-token");return o.token}async function oi(e,t){var d;const n=await K(e),r=be(t,e.appConfig.appName,!0),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{o=await ui(()=>fetch(U(e.appConfig),i),ni,ri)}catch(s){throw u.create("fid-registration-failed",{errorInfo:s==null?void 0:s.toString()})}if(o.ok)return{responseFid:await ai(o)};let a;try{a=await o.json()}catch{throw u.create("fid-registration-failed",{errorInfo:o.statusText})}const c=((d=a.error)==null?void 0:d.message)??o.statusText;throw u.create("fid-registration-failed",{errorInfo:c})}async function ai(e){const t=await e.text();if(!t.trim())throw u.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is empty"});let n;try{n=JSON.parse(t)}catch{throw u.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is not valid JSON"})}const r=n.name;if(typeof r!="string"||r.length===0)throw u.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response did not include a non-empty name"});return si(r)}const $e="/registrations/";function si(e){const t=e.indexOf($e);if(t!==-1){const n=e.slice(t+$e.length);if(n.length>0)return n}throw u.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response name is not a valid registration resource name"})}async function ci(e,t){const n=await K(e),r=be(t.subscriptionOptions,e.appConfig.appName,!1),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(`${U(e.appConfig)}/${t.token}`,i)).json()}catch(a){throw u.create("token-update-failed",{errorInfo:a==null?void 0:a.toString()})}if(o.error){const a=o.error.message;throw u.create("token-update-failed",{errorInfo:a})}if(!o.token)throw u.create("token-update-no-token");return o.token}async function di(e,t){const r={method:"DELETE",headers:await K(e)};try{const o=await(await fetch(`${U(e.appConfig)}/${t}`,r)).json();if(o.error){const a=o.error.message;throw u.create("token-unsubscribe-failed",{errorInfo:a})}}catch(i){throw u.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}async function ui(e,t,n){let r;for(let i=0;i<t;i++)try{return await e()}catch(o){if(r=o,i<t-1){const a=n*Math.pow(2,i);await new Promise(c=>setTimeout(c,a))}}throw r}function U({projectId:e}){return`${Kr}/projects/${e}/registrations`}async function K({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function fi(e,t){var n,r;try{if(/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e))return new URL(e).host}catch{}try{if(typeof self<"u"&&((n=self.location)!=null&&n.href))return new URL(e,self.location.origin).host}catch{}return typeof self<"u"&&((r=self.location)!=null&&r.host)?self.location.host:t}function be({p256dh:e,auth:t,endpoint:n,vapidKey:r,swScope:i},o,a){const c={web:{origin:fi(i,o),endpoint:n,auth:t,p256dh:e}};return a&&(c.fcm_sdk_version=se),r!==mt&&(c.web.applicationPubKey=r),c}/**
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
 */const li=7*24*60*60*1e3;async function hi(e){const t=await gi(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:l(t.getKey("auth")),p256dh:l(t.getKey("p256dh"))},r=await ei(e.firebaseDependencies);if(r){if(bi(r.subscriptionOptions,n))return Date.now()>=r.createTime+li?pi(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await di(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Le(e.firebaseDependencies,n)}else return Le(e.firebaseDependencies,n)}async function pi(e,t){try{const n=await ci(e.firebaseDependencies,t),r={...t,token:n,createTime:Date.now()};return await ge(e.firebaseDependencies,r),n}catch(n){throw n}}async function Le(e,t){const r={token:await ii(e,t),createTime:Date.now(),subscriptionOptions:t};return await ge(e,r),r.token}async function gi(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:yt(t)})}function bi(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}function mi(e,t){const n=e.onRegisteredHandler;n&&(typeof n=="function"?n(t):n.next(t))}/**
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
 */async function wi(e){try{e.swRegistration=await navigator.serviceWorker.register(Vr,{scope:Ur}),e.swRegistration.update().catch(()=>{}),await yi(e.swRegistration)}catch(t){throw u.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}async function yi(e){return new Promise((t,n)=>{const r=setTimeout(()=>n(new Error(`Service worker not registered after ${ke} ms`)),ke),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=o=>{var a;((a=o.target)==null?void 0:a.state)==="activated"&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}/**
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
 */async function St(e,t){if(!t&&!e.swRegistration&&await wi(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw u.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function Tt(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=mt)}/**
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
 */const He=3;async function Ii(e,t){const n=await Ei(e.swRegistration,e.vapidKey),r={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:n.endpoint,auth:l(n.getKey("auth")),p256dh:l(n.getKey("p256dh"))},i=e.firebaseDependencies.installations;for(let o=0;o<He;o++){const{responseFid:a}=await oi(e.firebaseDependencies,r);if(a===t)return;o<He-1&&await i.getToken(!0)}throw u.create("fid-registration-failed",{errorInfo:"CreateRegistration response FID does not match Firebase Installation ID"})}async function Ei(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:yt(t)})}/**
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
 */const _i=7*24*60*60*1e3;async function At(e,t){if(!navigator)throw u.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw u.create("permission-blocked");if(!e.onRegisteredHandler)throw u.create("invalid-on-registered-handler");await Tt(e,t==null?void 0:t.vapidKey),await St(e,t==null?void 0:t.serviceWorkerRegistration);const n=e._registerNotifyChain.catch(()=>{});return e._registerNotifyChain=n.then(async()=>{const r=await e.firebaseDependencies.installations.getId(),i=await _t(e.firebaseDependencies),o=Date.now();if((!i||i.fid!==r||o>=i.lastRegisterTime+_i)&&(await Ii(e,r),await ti(e.firebaseDependencies,{fid:r,lastRegisterTime:o,vapidKey:e.vapidKey})),!e.onRegisteredHandler)throw u.create("invalid-on-registered-handler");mi(e,r)}),e._registerNotifyChain}/**
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
 */function Si(e,t){return Fr(t,()=>{(async()=>!e.onRegisteredHandler||!await _t(e.firebaseDependencies)||await At(e).catch(()=>{}))()})}/**
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
 */function xe(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Ti(t,e),Ai(t,e),Ci(t,e),t}function Ti(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const o=t.notification.icon;o&&(e.notification.icon=o)}function Ai(e,t){t.data&&(e.data=t.data)}function Ci(e,t){var i,o,a,c;if(!t.fcmOptions&&!((i=t.notification)!=null&&i.click_action))return;e.fcmOptions={};const n=((o=t.fcmOptions)==null?void 0:o.link)??((a=t.notification)==null?void 0:a.click_action);n&&(e.fcmOptions.link=n);const r=(c=t.fcmOptions)==null?void 0:c.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}/**
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
 */function vi(e){return typeof e=="object"&&!!e&&wt in e}/**
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
 */function Di(e){if(!e||!e.options)throw Q("App Configuration Object");if(!e.name)throw Q("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw Q(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Q(e){return u.create("missing-app-config-values",{valueName:e})}/**
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
 */class ki{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.onRegisteredHandler=null,this.onUnregisteredHandler=null,this._registerNotifyChain=Promise.resolve(),this._fidChangeUnsubscribe=null,this.logEvents=[],this.logQueue={state:"stopped"};const i=Di(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return this._fidChangeUnsubscribe&&(this._fidChangeUnsubscribe(),this._fidChangeUnsubscribe=null),this.logQueue.state==="scheduled"&&clearTimeout(this.logQueue.timerId),this.logQueue={state:"stopped"},Promise.resolve()}}/**
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
 */async function Ct(e,t){if(!navigator)throw u.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw u.create("permission-blocked");return await Tt(e,t==null?void 0:t.vapidKey),await St(e,t==null?void 0:t.serviceWorkerRegistration),hi(e)}/**
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
 */async function Ri(e,t,n){const r=Ni(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[wt],message_name:n[Wr],message_time:n[qr],message_device_time:Math.floor(Date.now()/1e3)})}function Ni(e){switch(e){case C.NOTIFICATION_CLICKED:return"notification_open";case C.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function Oi(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;if(e.onMessageHandler&&n.messageType===C.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(xe(n)):e.onMessageHandler.next(xe(n))),e.onRegisteredHandler&&n.messageType===C.FID_REGISTERED){const i=n.fid;typeof e.onRegisteredHandler=="function"?e.onRegisteredHandler(i):e.onRegisteredHandler.next(i)}const r=n.data;vi(r)&&r[zr]==="1"&&await Ri(e,n.messageType,r)}/**
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
 */const Mi=e=>{const t=new ki(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>Oi(t,n)),t._fidChangeUnsubscribe=Si(t,e.getProvider("installations").getImmediate()),t},Bi=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:r=>Ct(t,r),register:r=>At(t,r)}};function Pi(){E(new w("messaging",Mi,"PUBLIC")),E(new w("messaging-internal",Bi,"PRIVATE")),m(Fe,se),m(Fe,se,"esm2020")}/**
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
 */async function Fi(){try{await qe()}catch{return!1}return typeof window<"u"&&We()&&jt()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function $i(e,t){if(!navigator)throw u.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}/**
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
 */function Li(e=Un()){return Fi().then(t=>{if(!t)throw u.create("unsupported-browser")},t=>{throw u.create("indexed-db-unsupported")}),ue(ce(e),"messaging").getImmediate()}async function Hi(e,t){return e=ce(e),Ct(e,t)}function xi(e,t){return e=ce(e),$i(e,t)}Pi();const ji={apiKey:"AIzaSyAqjPL1viFUuMBNMFRRzXdkrfCtudunWGg",authDomain:"shield-safety-46fbb.firebaseapp.com",projectId:"shield-safety-46fbb",messagingSenderId:"658509344717",appId:"1:658509344717:web:3952c6fdbfe43728501e84"};let Z=null;async function Ui(){return"Notification"in window?await Notification.requestPermission()==="granted":!1}async function Ki(){try{const e=Je(ji);Z=Li(e);const t=await Hi(Z,{vapidKey:"BNjOYsbnmZpiOBIeXUBO1_9dPJqYz4Nw1fQBABP2zS7enCNwYtQlYS8U-z6HjSO1sVA6e0gKLAiV0ST66syWqq8"});if(t){console.log("FCM token:",t);const{supabase:n}=await Dt(async()=>{const{supabase:i}=await import("./index-CE70f_J9.js").then(o=>o.s);return{supabase:i}},__vite__mapDeps([0,1]),import.meta.url),{data:r}=await n.auth.getUser();r.user&&await n.from("profiles").update({fcm_token:t}).eq("id",r.user.id)}xi(Z,n=>{var r;console.log("Message received:",n),kt(((r=n.notification)==null?void 0:r.title)||"New alert")})}catch(e){console.log("FCM init failed:",e)}}export{Ki as initFCM,Ui as requestNotificationPermission};
//# sourceMappingURL=fcm-BR2t-QNx.js.map
