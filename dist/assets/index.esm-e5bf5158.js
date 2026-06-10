import{L as ae,F as pm,i as aa,p as Wl,d as gs,c as _m,g as It,_ as Hl,a as ym,b as Im,e as Tm,f as Em,h as wm,j as Am,k as vm,l as ui,m as Jl,n as Yl,o as Rm,C as Pm,r as Ec,S as Vm}from"./index.esm-71de858e.js";var wc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var xe,Xl;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(T,_){function I(){}I.prototype=_.prototype,T.F=_.prototype,T.prototype=new I,T.prototype.constructor=T,T.D=function(w,E,V){for(var y=Array(arguments.length-2),Ft=2;Ft<arguments.length;Ft++)y[Ft-2]=arguments[Ft];return _.prototype[E].apply(w,y)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(n,e),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,_,I){I||(I=0);const w=Array(16);if(typeof _=="string")for(var E=0;E<16;++E)w[E]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(E=0;E<16;++E)w[E]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=T.g[0],I=T.g[1],E=T.g[2];let V=T.g[3],y;y=_+(V^I&(E^V))+w[0]+3614090360&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(E^_&(I^E))+w[1]+3905402710&4294967295,V=_+(y<<12&4294967295|y>>>20),y=E+(I^V&(_^I))+w[2]+606105819&4294967295,E=V+(y<<17&4294967295|y>>>15),y=I+(_^E&(V^_))+w[3]+3250441966&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(V^I&(E^V))+w[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(E^_&(I^E))+w[5]+1200080426&4294967295,V=_+(y<<12&4294967295|y>>>20),y=E+(I^V&(_^I))+w[6]+2821735955&4294967295,E=V+(y<<17&4294967295|y>>>15),y=I+(_^E&(V^_))+w[7]+4249261313&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(V^I&(E^V))+w[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(E^_&(I^E))+w[9]+2336552879&4294967295,V=_+(y<<12&4294967295|y>>>20),y=E+(I^V&(_^I))+w[10]+4294925233&4294967295,E=V+(y<<17&4294967295|y>>>15),y=I+(_^E&(V^_))+w[11]+2304563134&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(V^I&(E^V))+w[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=V+(E^_&(I^E))+w[13]+4254626195&4294967295,V=_+(y<<12&4294967295|y>>>20),y=E+(I^V&(_^I))+w[14]+2792965006&4294967295,E=V+(y<<17&4294967295|y>>>15),y=I+(_^E&(V^_))+w[15]+1236535329&4294967295,I=E+(y<<22&4294967295|y>>>10),y=_+(E^V&(I^E))+w[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^E&(_^I))+w[6]+3225465664&4294967295,V=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(V^_))+w[11]+643717713&4294967295,E=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(E^V))+w[0]+3921069994&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(E^V&(I^E))+w[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^E&(_^I))+w[10]+38016083&4294967295,V=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(V^_))+w[15]+3634488961&4294967295,E=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(E^V))+w[4]+3889429448&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(E^V&(I^E))+w[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^E&(_^I))+w[14]+3275163606&4294967295,V=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(V^_))+w[3]+4107603335&4294967295,E=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(E^V))+w[8]+1163531501&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(E^V&(I^E))+w[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=V+(I^E&(_^I))+w[2]+4243563512&4294967295,V=_+(y<<9&4294967295|y>>>23),y=E+(_^I&(V^_))+w[7]+1735328473&4294967295,E=V+(y<<14&4294967295|y>>>18),y=I+(V^_&(E^V))+w[12]+2368359562&4294967295,I=E+(y<<20&4294967295|y>>>12),y=_+(I^E^V)+w[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^E)+w[8]+2272392833&4294967295,V=_+(y<<11&4294967295|y>>>21),y=E+(V^_^I)+w[11]+1839030562&4294967295,E=V+(y<<16&4294967295|y>>>16),y=I+(E^V^_)+w[14]+4259657740&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(I^E^V)+w[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^E)+w[4]+1272893353&4294967295,V=_+(y<<11&4294967295|y>>>21),y=E+(V^_^I)+w[7]+4139469664&4294967295,E=V+(y<<16&4294967295|y>>>16),y=I+(E^V^_)+w[10]+3200236656&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(I^E^V)+w[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^E)+w[0]+3936430074&4294967295,V=_+(y<<11&4294967295|y>>>21),y=E+(V^_^I)+w[3]+3572445317&4294967295,E=V+(y<<16&4294967295|y>>>16),y=I+(E^V^_)+w[6]+76029189&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(I^E^V)+w[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=V+(_^I^E)+w[12]+3873151461&4294967295,V=_+(y<<11&4294967295|y>>>21),y=E+(V^_^I)+w[15]+530742520&4294967295,E=V+(y<<16&4294967295|y>>>16),y=I+(E^V^_)+w[2]+3299628645&4294967295,I=E+(y<<23&4294967295|y>>>9),y=_+(E^(I|~V))+w[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~E))+w[7]+1126891415&4294967295,V=_+(y<<10&4294967295|y>>>22),y=E+(_^(V|~I))+w[14]+2878612391&4294967295,E=V+(y<<15&4294967295|y>>>17),y=I+(V^(E|~_))+w[5]+4237533241&4294967295,I=E+(y<<21&4294967295|y>>>11),y=_+(E^(I|~V))+w[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~E))+w[3]+2399980690&4294967295,V=_+(y<<10&4294967295|y>>>22),y=E+(_^(V|~I))+w[10]+4293915773&4294967295,E=V+(y<<15&4294967295|y>>>17),y=I+(V^(E|~_))+w[1]+2240044497&4294967295,I=E+(y<<21&4294967295|y>>>11),y=_+(E^(I|~V))+w[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~E))+w[15]+4264355552&4294967295,V=_+(y<<10&4294967295|y>>>22),y=E+(_^(V|~I))+w[6]+2734768916&4294967295,E=V+(y<<15&4294967295|y>>>17),y=I+(V^(E|~_))+w[13]+1309151649&4294967295,I=E+(y<<21&4294967295|y>>>11),y=_+(E^(I|~V))+w[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=V+(I^(_|~E))+w[11]+3174756917&4294967295,V=_+(y<<10&4294967295|y>>>22),y=E+(_^(V|~I))+w[2]+718787259&4294967295,E=V+(y<<15&4294967295|y>>>17),y=I+(V^(E|~_))+w[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+V&4294967295}n.prototype.v=function(T,_){_===void 0&&(_=T.length);const I=_-this.blockSize,w=this.C;let E=this.h,V=0;for(;V<_;){if(E==0)for(;V<=I;)s(this,T,V),V+=this.blockSize;if(typeof T=="string"){for(;V<_;)if(w[E++]=T.charCodeAt(V++),E==this.blockSize){s(this,w),E=0;break}}else for(;V<_;)if(w[E++]=T[V++],E==this.blockSize){s(this,w),E=0;break}}this.h=E,this.o+=_},n.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;_=this.o*8;for(var I=T.length-8;I<T.length;++I)T[I]=_&255,_/=256;for(this.v(T),T=Array(16),_=0,I=0;I<4;++I)for(let w=0;w<32;w+=8)T[_++]=this.g[I]>>>w&255;return T};function i(T,_){var I=u;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=_(T)}function a(T,_){this.h=_;const I=[];let w=!0;for(let E=T.length-1;E>=0;E--){const V=T[E]|0;w&&V==_||(I[E]=V,w=!1)}this.g=I}var u={};function c(T){return-128<=T&&T<128?i(T,function(_){return new a([_|0],_<0?-1:0)}):new a([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return D(h(-T));const _=[];let I=1;for(let w=0;T>=I;w++)_[w]=T/I|0,I*=4294967296;return new a(_,0)}function f(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return D(f(T.substring(1),_));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const I=h(Math.pow(_,8));let w=m;for(let V=0;V<T.length;V+=8){var E=Math.min(8,T.length-V);const y=parseInt(T.substring(V,V+E),_);E<8?(E=h(Math.pow(_,E)),w=w.j(E).add(h(y))):(w=w.j(I),w=w.add(h(y)))}return w}var m=c(0),p=c(1),v=c(16777216);r=a.prototype,r.m=function(){if(N(this))return-D(this).m();let T=0,_=1;for(let I=0;I<this.g.length;I++){const w=this.i(I);T+=(w>=0?w:4294967296+w)*_,_*=4294967296}return T},r.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(x(this))return"0";if(N(this))return"-"+D(this).toString(T);const _=h(Math.pow(T,6));var I=this;let w="";for(;;){const E=X(I,_).g;I=q(I,E.j(_));let V=((I.g.length>0?I.g[0]:I.h)>>>0).toString(T);if(I=E,x(I))return V+w;for(;V.length<6;)V="0"+V;w=V+w}},r.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function x(T){if(T.h!=0)return!1;for(let _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function N(T){return T.h==-1}r.l=function(T){return T=q(this,T),N(T)?-1:x(T)?0:1};function D(T){const _=T.g.length,I=[];for(let w=0;w<_;w++)I[w]=~T.g[w];return new a(I,~T.h).add(p)}r.abs=function(){return N(this)?D(this):this},r.add=function(T){const _=Math.max(this.g.length,T.g.length),I=[];let w=0;for(let E=0;E<=_;E++){let V=w+(this.i(E)&65535)+(T.i(E)&65535),y=(V>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);w=y>>>16,V&=65535,y&=65535,I[E]=y<<16|V}return new a(I,I[I.length-1]&-2147483648?-1:0)};function q(T,_){return T.add(D(_))}r.j=function(T){if(x(this)||x(T))return m;if(N(this))return N(T)?D(this).j(D(T)):D(D(this).j(T));if(N(T))return D(this.j(D(T)));if(this.l(v)<0&&T.l(v)<0)return h(this.m()*T.m());const _=this.g.length+T.g.length,I=[];for(var w=0;w<2*_;w++)I[w]=0;for(w=0;w<this.g.length;w++)for(let E=0;E<T.g.length;E++){const V=this.i(w)>>>16,y=this.i(w)&65535,Ft=T.i(E)>>>16,_e=T.i(E)&65535;I[2*w+2*E]+=y*_e,j(I,2*w+2*E),I[2*w+2*E+1]+=V*_e,j(I,2*w+2*E+1),I[2*w+2*E+1]+=y*Ft,j(I,2*w+2*E+1),I[2*w+2*E+2]+=V*Ft,j(I,2*w+2*E+2)}for(T=0;T<_;T++)I[T]=I[2*T+1]<<16|I[2*T];for(T=_;T<2*_;T++)I[T]=0;return new a(I,0)};function j(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function U(T,_){this.g=T,this.h=_}function X(T,_){if(x(_))throw Error("division by zero");if(x(T))return new U(m,m);if(N(T))return _=X(D(T),_),new U(D(_.g),D(_.h));if(N(_))return _=X(T,D(_)),new U(D(_.g),_.h);if(T.g.length>30){if(N(T)||N(_))throw Error("slowDivide_ only works with positive integers.");for(var I=p,w=_;w.l(T)<=0;)I=J(I),w=J(w);var E=Y(I,1),V=Y(w,1);for(w=Y(w,2),I=Y(I,2);!x(w);){var y=V.add(w);y.l(T)<=0&&(E=E.add(I),V=y),w=Y(w,1),I=Y(I,1)}return _=q(T,E.j(_)),new U(E,_)}for(E=m;T.l(_)>=0;){for(I=Math.max(1,Math.floor(T.m()/_.m())),w=Math.ceil(Math.log(I)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),V=h(I),y=V.j(_);N(y)||y.l(T)>0;)I-=w,V=h(I),y=V.j(_);x(V)&&(V=p),E=E.add(V),T=q(T,y)}return new U(E,T)}r.B=function(T){return X(this,T).h},r.and=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)&T.i(w);return new a(I,this.h&T.h)},r.or=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)|T.i(w);return new a(I,this.h|T.h)},r.xor=function(T){const _=Math.max(this.g.length,T.g.length),I=[];for(let w=0;w<_;w++)I[w]=this.i(w)^T.i(w);return new a(I,this.h^T.h)};function J(T){const _=T.g.length+1,I=[];for(let w=0;w<_;w++)I[w]=T.i(w)<<1|T.i(w-1)>>>31;return new a(I,T.h)}function Y(T,_){const I=_>>5;_%=32;const w=T.g.length-I,E=[];for(let V=0;V<w;V++)E[V]=_>0?T.i(V+I)>>>_|T.i(V+I+1)<<32-_:T.i(V+I);return new a(E,T.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Xl=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,xe=a}).apply(typeof wc<"u"?wc:typeof self<"u"?self:typeof window<"u"?window:{});var zs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Zl,jr,th,Ys,ko,eh,nh,rh;(function(){var r,t=Object.defineProperty;function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof zs=="object"&&zs];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=e(this);function s(o,l){if(l)t:{var d=n;o=o.split(".");for(var g=0;g<o.length-1;g++){var R=o[g];if(!(R in d))break t;d=d[R]}o=o[o.length-1],g=d[o],l=l(g),l!=g&&l!=null&&t(d,o,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(l){var d=[],g;for(g in l)Object.prototype.hasOwnProperty.call(l,g)&&d.push([g,l[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function c(o,l,d){return o.call.apply(o.bind,arguments)}function h(o,l,d){return h=c,h.apply(null,arguments)}function f(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),o.apply(this,g)}}function m(o,l){function d(){}d.prototype=l.prototype,o.Z=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Ob=function(g,R,S){for(var M=Array(arguments.length-2),K=2;K<arguments.length;K++)M[K-2]=arguments[K];return l.prototype[R].apply(g,M)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function v(o){const l=o.length;if(l>0){const d=Array(l);for(let g=0;g<l;g++)d[g]=o[g];return d}return[]}function x(o,l){for(let g=1;g<arguments.length;g++){const R=arguments[g];var d=typeof R;if(d=d!="object"?d:R?Array.isArray(R)?"array":d:"null",d=="array"||d=="object"&&typeof R.length=="number"){d=o.length||0;const S=R.length||0;o.length=d+S;for(let M=0;M<S;M++)o[d+M]=R[M]}else o.push(R)}}class N{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function D(o){a.setTimeout(()=>{throw o},0)}function q(){var o=T;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class j{constructor(){this.h=this.g=null}add(l,d){const g=U.get();g.set(l,d),this.h?this.h.next=g:this.g=g,this.h=g}}var U=new N(()=>new X,o=>o.reset());class X{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let J,Y=!1,T=new j,_=()=>{const o=Promise.resolve(void 0);J=()=>{o.then(I)}};function I(){for(var o;o=q();){try{o.h.call(o.g)}catch(d){D(d)}var l=U;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}Y=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var V=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};a.addEventListener("test",d,l),a.removeEventListener("test",d,l)}catch{}return o}();function y(o){return/^[\s\xa0]*$/.test(o)}function Ft(o,l){E.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}m(Ft,E),Ft.prototype.init=function(o,l){const d=this.type=o.type,g=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Ft.Z.h.call(this)},Ft.prototype.h=function(){Ft.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var _e="closure_listenable_"+(Math.random()*1e6|0),qf=0;function Bf(o,l,d,g,R){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!g,this.ha=R,this.key=++qf,this.da=this.fa=!1}function Ss(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function bs(o,l,d){for(const g in o)l.call(d,o[g],g,o)}function Uf(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function Iu(o){const l={};for(const d in o)l[d]=o[d];return l}const Tu="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Eu(o,l){let d,g;for(let R=1;R<arguments.length;R++){g=arguments[R];for(d in g)o[d]=g[d];for(let S=0;S<Tu.length;S++)d=Tu[S],Object.prototype.hasOwnProperty.call(g,d)&&(o[d]=g[d])}}function Cs(o){this.src=o,this.g={},this.h=0}Cs.prototype.add=function(o,l,d,g,R){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const M=to(o,l,g,R);return M>-1?(l=o[M],d||(l.fa=!1)):(l=new Bf(l,this.src,S,!!g,R),l.fa=d,o.push(l)),l};function Zi(o,l){const d=l.type;if(d in o.g){var g=o.g[d],R=Array.prototype.indexOf.call(g,l,void 0),S;(S=R>=0)&&Array.prototype.splice.call(g,R,1),S&&(Ss(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function to(o,l,d,g){for(let R=0;R<o.length;++R){const S=o[R];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==g)return R}return-1}var eo="closure_lm_"+(Math.random()*1e6|0),no={};function wu(o,l,d,g,R){if(g&&g.once)return vu(o,l,d,g,R);if(Array.isArray(l)){for(let S=0;S<l.length;S++)wu(o,l[S],d,g,R);return null}return d=oo(d),o&&o[_e]?o.J(l,d,u(g)?!!g.capture:!!g,R):Au(o,l,d,!1,g,R)}function Au(o,l,d,g,R,S){if(!l)throw Error("Invalid event type");const M=u(R)?!!R.capture:!!R;let K=so(o);if(K||(o[eo]=K=new Cs(o)),d=K.add(l,d,g,M,S),d.proxy)return d;if(g=jf(),d.proxy=g,g.src=o,g.listener=d,o.addEventListener)V||(R=M),R===void 0&&(R=!1),o.addEventListener(l.toString(),g,R);else if(o.attachEvent)o.attachEvent(Pu(l.toString()),g);else if(o.addListener&&o.removeListener)o.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function jf(){function o(d){return l.call(o.src,o.listener,d)}const l=zf;return o}function vu(o,l,d,g,R){if(Array.isArray(l)){for(let S=0;S<l.length;S++)vu(o,l[S],d,g,R);return null}return d=oo(d),o&&o[_e]?o.K(l,d,u(g)?!!g.capture:!!g,R):Au(o,l,d,!0,g,R)}function Ru(o,l,d,g,R){if(Array.isArray(l))for(var S=0;S<l.length;S++)Ru(o,l[S],d,g,R);else g=u(g)?!!g.capture:!!g,d=oo(d),o&&o[_e]?(o=o.i,S=String(l).toString(),S in o.g&&(l=o.g[S],d=to(l,d,g,R),d>-1&&(Ss(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete o.g[S],o.h--)))):o&&(o=so(o))&&(l=o.g[l.toString()],o=-1,l&&(o=to(l,d,g,R)),(d=o>-1?l[o]:null)&&ro(d))}function ro(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[_e])Zi(l.i,o);else{var d=o.type,g=o.proxy;l.removeEventListener?l.removeEventListener(d,g,o.capture):l.detachEvent?l.detachEvent(Pu(d),g):l.addListener&&l.removeListener&&l.removeListener(g),(d=so(l))?(Zi(d,o),d.h==0&&(d.src=null,l[eo]=null)):Ss(o)}}}function Pu(o){return o in no?no[o]:no[o]="on"+o}function zf(o,l){if(o.da)o=!0;else{l=new Ft(l,this);const d=o.listener,g=o.ha||o.src;o.fa&&ro(o),o=d.call(g,l)}return o}function so(o){return o=o[eo],o instanceof Cs?o:null}var io="__closure_events_fn_"+(Math.random()*1e9>>>0);function oo(o){return typeof o=="function"?o:(o[io]||(o[io]=function(l){return o.handleEvent(l)}),o[io])}function St(){w.call(this),this.i=new Cs(this),this.M=this,this.G=null}m(St,w),St.prototype[_e]=!0,St.prototype.removeEventListener=function(o,l,d,g){Ru(this,o,l,d,g)};function Nt(o,l){var d,g=o.G;if(g)for(d=[];g;g=g.G)d.push(g);if(o=o.M,g=l.type||l,typeof l=="string")l=new E(l,o);else if(l instanceof E)l.target=l.target||o;else{var R=l;l=new E(g,o),Eu(l,R)}R=!0;let S,M;if(d)for(M=d.length-1;M>=0;M--)S=l.g=d[M],R=Ds(S,g,!0,l)&&R;if(S=l.g=o,R=Ds(S,g,!0,l)&&R,R=Ds(S,g,!1,l)&&R,d)for(M=0;M<d.length;M++)S=l.g=d[M],R=Ds(S,g,!1,l)&&R}St.prototype.N=function(){if(St.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const d=o.g[l];for(let g=0;g<d.length;g++)Ss(d[g]);delete o.g[l],o.h--}}this.G=null},St.prototype.J=function(o,l,d,g){return this.i.add(String(o),l,!1,d,g)},St.prototype.K=function(o,l,d,g){return this.i.add(String(o),l,!0,d,g)};function Ds(o,l,d,g){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let R=!0;for(let S=0;S<l.length;++S){const M=l[S];if(M&&!M.da&&M.capture==d){const K=M.listener,yt=M.ha||M.src;M.fa&&Zi(o.i,M),R=K.call(yt,g)!==!1&&R}}return R&&!g.defaultPrevented}function Gf(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=h(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function Vu(o){o.g=Gf(()=>{o.g=null,o.i&&(o.i=!1,Vu(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Kf extends w{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Vu(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ir(o){w.call(this),this.h=o,this.g={}}m(Ir,w);var Su=[];function bu(o){bs(o.g,function(l,d){this.g.hasOwnProperty(d)&&ro(l)},o),o.g={}}Ir.prototype.N=function(){Ir.Z.N.call(this),bu(this)},Ir.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ao=a.JSON.stringify,$f=a.JSON.parse,Qf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Cu(){}function Du(){}var Tr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function uo(){E.call(this,"d")}m(uo,E);function co(){E.call(this,"c")}m(co,E);var Qe={},xu=null;function xs(){return xu=xu||new St}Qe.Ia="serverreachability";function Nu(o){E.call(this,Qe.Ia,o)}m(Nu,E);function Er(o){const l=xs();Nt(l,new Nu(l))}Qe.STAT_EVENT="statevent";function ku(o,l){E.call(this,Qe.STAT_EVENT,o),this.stat=l}m(ku,E);function kt(o){const l=xs();Nt(l,new ku(l,o))}Qe.Ja="timingevent";function Fu(o,l){E.call(this,Qe.Ja,o),this.size=l}m(Fu,E);function wr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function Ar(){this.g=!0}Ar.prototype.ua=function(){this.g=!1};function Wf(o,l,d,g,R,S){o.info(function(){if(o.g)if(S){var M="",K=S.split("&");for(let rt=0;rt<K.length;rt++){var yt=K[rt].split("=");if(yt.length>1){const Et=yt[0];yt=yt[1];const Ht=Et.split("_");M=Ht.length>=2&&Ht[1]=="type"?M+(Et+"="+yt+"&"):M+(Et+"=redacted&")}}}else M=null;else M=S;return"XMLHTTP REQ ("+g+") [attempt "+R+"]: "+l+`
`+d+`
`+M})}function Hf(o,l,d,g,R,S,M){o.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+R+"]: "+l+`
`+d+`
`+S+" "+M})}function vn(o,l,d,g){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Yf(o,d)+(g?" "+g:"")})}function Jf(o,l){o.info(function(){return"TIMEOUT: "+l})}Ar.prototype.info=function(){};function Yf(o,l){if(!o.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var d=S[o];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var R=g[0];if(R!="noop"&&R!="stop"&&R!="close")for(let M=1;M<g.length;M++)g[M]=""}}}}return ao(S)}catch{return l}}var Ns={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Mu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ou;function lo(){}m(lo,Cu),lo.prototype.g=function(){return new XMLHttpRequest},Ou=new lo;function vr(o){return encodeURIComponent(String(o))}function Xf(o){var l=1;o=o.split(":");const d=[];for(;l>0&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function ye(o,l,d,g){this.j=o,this.i=l,this.l=d,this.S=g||1,this.V=new Ir(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Lu}function Lu(){this.i=null,this.g="",this.h=!1}var qu={},ho={};function fo(o,l,d){o.M=1,o.A=Fs(Wt(l)),o.u=d,o.R=!0,Bu(o,null)}function Bu(o,l){o.F=Date.now(),ks(o),o.B=Wt(o.A);var d=o.B,g=o.S;Array.isArray(g)||(g=[String(g)]),Zu(d.i,"t",g),o.C=0,d=o.j.L,o.h=new Lu,o.g=_c(o.j,d?l:null,!o.u),o.P>0&&(o.O=new Kf(h(o.Y,o,o.g),o.P)),l=o.V,d=o.g,g=o.ba;var R="readystatechange";Array.isArray(R)||(R&&(Su[0]=R.toString()),R=Su);for(let S=0;S<R.length;S++){const M=wu(d,R[S],g||l.handleEvent,!1,l.h||l);if(!M)break;l.g[M.key]=M}l=o.J?Iu(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),Er(),Wf(o.i,o.v,o.B,o.l,o.S,o.u)}ye.prototype.ba=function(o){o=o.target;const l=this.O;l&&Ee(o)==3?l.j():this.Y(o)},ye.prototype.Y=function(o){try{if(o==this.g)t:{const K=Ee(this.g),yt=this.g.ya(),rt=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||oc(this.g)))){this.K||K!=4||yt==7||(yt==8||rt<=0?Er(3):Er(2)),mo(this);var l=this.g.ca();this.X=l;var d=Zf(this);if(this.o=l==200,Hf(this.i,this.v,this.B,this.l,this.S,K,l),this.o){if(this.U&&!this.L){e:{if(this.g){var g,R=this.g;if((g=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(g)){var S=g;break e}}S=null}if(o=S)vn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,go(this,o);else{this.o=!1,this.m=3,kt(12),We(this),Rr(this);break t}}if(this.R){o=!0;let Et;for(;!this.K&&this.C<d.length;)if(Et=tm(this,d),Et==ho){K==4&&(this.m=4,kt(14),o=!1),vn(this.i,this.l,null,"[Incomplete Response]");break}else if(Et==qu){this.m=4,kt(15),vn(this.i,this.l,d,"[Invalid Chunk]"),o=!1;break}else vn(this.i,this.l,Et,null),go(this,Et);if(Uu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||d.length!=0||this.h.h||(this.m=1,kt(16),o=!1),this.o=this.o&&o,!o)vn(this.i,this.l,d,"[Invalid Chunked Response]"),We(this),Rr(this);else if(d.length>0&&!this.W){this.W=!0;var M=this.j;M.g==this&&M.aa&&!M.P&&(M.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Ao(M),M.P=!0,kt(11))}}else vn(this.i,this.l,d,null),go(this,d);K==4&&We(this),this.o&&!this.K&&(K==4?fc(this.j,this):(this.o=!1,ks(this)))}else mm(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,kt(12)):(this.m=0,kt(13)),We(this),Rr(this)}}}catch{}finally{}};function Zf(o){if(!Uu(o))return o.g.la();const l=oc(o.g);if(l==="")return"";let d="";const g=l.length,R=Ee(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return We(o),Rr(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<g;S++)o.h.h=!0,d+=o.h.i.decode(l[S],{stream:!(R&&S==g-1)});return l.length=0,o.h.g+=d,o.C=0,o.h.g}function Uu(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function tm(o,l){var d=o.C,g=l.indexOf(`
`,d);return g==-1?ho:(d=Number(l.substring(d,g)),isNaN(d)?qu:(g+=1,g+d>l.length?ho:(l=l.slice(g,g+d),o.C=g+d,l)))}ye.prototype.cancel=function(){this.K=!0,We(this)};function ks(o){o.T=Date.now()+o.H,ju(o,o.H)}function ju(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=wr(h(o.aa,o),l)}function mo(o){o.D&&(a.clearTimeout(o.D),o.D=null)}ye.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Jf(this.i,this.B),this.M!=2&&(Er(),kt(17)),We(this),this.m=2,Rr(this)):ju(this,this.T-o)};function Rr(o){o.j.I==0||o.K||fc(o.j,o)}function We(o){mo(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,bu(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function go(o,l){try{var d=o.j;if(d.I!=0&&(d.g==o||po(d.h,o))){if(!o.L&&po(d.h,o)&&d.I==3){try{var g=d.Ba.g.parse(l)}catch{g=null}if(Array.isArray(g)&&g.length==3){var R=g;if(R[0]==0){t:if(!d.v){if(d.g)if(d.g.F+3e3<o.F)Bs(d),Ls(d);else break t;wo(d),kt(18)}}else d.xa=R[1],0<d.xa-d.K&&R[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=wr(h(d.Va,d),6e3));Ku(d.h)<=1&&d.ta&&(d.ta=void 0)}else Je(d,11)}else if((o.L||d.g==o)&&Bs(d),!y(l))for(R=d.Ba.g.parse(l),l=0;l<R.length;l++){let rt=R[l];const Et=rt[0];if(!(Et<=d.K))if(d.K=Et,rt=rt[1],d.I==2)if(rt[0]=="c"){d.M=rt[1],d.ba=rt[2];const Ht=rt[3];Ht!=null&&(d.ka=Ht,d.j.info("VER="+d.ka));const Ye=rt[4];Ye!=null&&(d.za=Ye,d.j.info("SVER="+d.za));const we=rt[5];we!=null&&typeof we=="number"&&we>0&&(g=1.5*we,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Ae=o.g;if(Ae){const js=Ae.g?Ae.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(js){var S=g.h;S.g||js.indexOf("spdy")==-1&&js.indexOf("quic")==-1&&js.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(_o(S,S.h),S.h=null))}if(g.G){const vo=Ae.g?Ae.g.getResponseHeader("X-HTTP-Session-Id"):null;vo&&(g.wa=vo,ot(g.J,g.G,vo))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-o.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var M=o;if(g.na=pc(g,g.L?g.ba:null,g.W),M.L){$u(g.h,M);var K=M,yt=g.O;yt&&(K.H=yt),K.D&&(mo(K),ks(K)),g.g=M}else hc(g);d.i.length>0&&qs(d)}else rt[0]!="stop"&&rt[0]!="close"||Je(d,7);else d.I==3&&(rt[0]=="stop"||rt[0]=="close"?rt[0]=="stop"?Je(d,7):Eo(d):rt[0]!="noop"&&d.l&&d.l.qa(rt),d.A=0)}}Er(4)}catch{}}var em=class{constructor(o,l){this.g=o,this.map=l}};function zu(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Gu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ku(o){return o.h?1:o.g?o.g.size:0}function po(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function _o(o,l){o.g?o.g.add(l):o.h=l}function $u(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}zu.prototype.cancel=function(){if(this.i=Qu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Qu(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.G);return l}return v(o.i)}var Wu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function nm(o,l){if(o){o=o.split("&");for(let d=0;d<o.length;d++){const g=o[d].indexOf("=");let R,S=null;g>=0?(R=o[d].substring(0,g),S=o[d].substring(g+1)):R=o[d],l(R,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Ie(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Ie?(this.l=o.l,Pr(this,o.j),this.o=o.o,this.g=o.g,Vr(this,o.u),this.h=o.h,yo(this,tc(o.i)),this.m=o.m):o&&(l=String(o).match(Wu))?(this.l=!1,Pr(this,l[1]||"",!0),this.o=Sr(l[2]||""),this.g=Sr(l[3]||"",!0),Vr(this,l[4]),this.h=Sr(l[5]||"",!0),yo(this,l[6]||"",!0),this.m=Sr(l[7]||"")):(this.l=!1,this.i=new Cr(null,this.l))}Ie.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(br(l,Hu,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(br(l,Hu,!0),"@"),o.push(vr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&o.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(br(d,d.charAt(0)=="/"?im:sm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",br(d,am)),o.join("")},Ie.prototype.resolve=function(o){const l=Wt(this);let d=!!o.j;d?Pr(l,o.j):d=!!o.o,d?l.o=o.o:d=!!o.g,d?l.g=o.g:d=o.u!=null;var g=o.h;if(d)Vr(l,o.u);else if(d=!!o.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var R=l.h.lastIndexOf("/");R!=-1&&(g=l.h.slice(0,R+1)+g)}if(R=g,R==".."||R==".")g="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){g=R.lastIndexOf("/",0)==0,R=R.split("/");const S=[];for(let M=0;M<R.length;){const K=R[M++];K=="."?g&&M==R.length&&S.push(""):K==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),g&&M==R.length&&S.push("")):(S.push(K),g=!0)}g=S.join("/")}else g=R}return d?l.h=g:d=o.i.toString()!=="",d?yo(l,tc(o.i)):d=!!o.m,d&&(l.m=o.m),l};function Wt(o){return new Ie(o)}function Pr(o,l,d){o.j=d?Sr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Vr(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function yo(o,l,d){l instanceof Cr?(o.i=l,um(o.i,o.l)):(d||(l=br(l,om)),o.i=new Cr(l,o.l))}function ot(o,l,d){o.i.set(l,d)}function Fs(o){return ot(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Sr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function br(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,rm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function rm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Hu=/[#\/\?@]/g,sm=/[#\?:]/g,im=/[#\?]/g,om=/[#\?@]/g,am=/#/g;function Cr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function He(o){o.g||(o.g=new Map,o.h=0,o.i&&nm(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Cr.prototype,r.add=function(o,l){He(this),this.i=null,o=Rn(this,o);let d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Ju(o,l){He(o),l=Rn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Yu(o,l){return He(o),l=Rn(o,l),o.g.has(l)}r.forEach=function(o,l){He(this),this.g.forEach(function(d,g){d.forEach(function(R){o.call(l,R,g,this)},this)},this)};function Xu(o,l){He(o);let d=[];if(typeof l=="string")Yu(o,l)&&(d=d.concat(o.g.get(Rn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)d=d.concat(o[l]);return d}r.set=function(o,l){return He(this),this.i=null,o=Rn(this,o),Yu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=Xu(this,o),o.length>0?String(o[0]):l):l};function Zu(o,l,d){Ju(o,l),d.length>0&&(o.i=null,o.g.set(Rn(o,l),v(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let g=0;g<l.length;g++){var d=l[g];const R=vr(d);d=Xu(this,d);for(let S=0;S<d.length;S++){let M=R;d[S]!==""&&(M+="="+vr(d[S])),o.push(M)}}return this.i=o.join("&")};function tc(o){const l=new Cr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Rn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function um(o,l){l&&!o.j&&(He(o),o.i=null,o.g.forEach(function(d,g){const R=g.toLowerCase();g!=R&&(Ju(this,g),Zu(this,R,d))},o)),o.j=l}function cm(o,l){const d=new Ar;if(a.Image){const g=new Image;g.onload=f(Te,d,"TestLoadImage: loaded",!0,l,g),g.onerror=f(Te,d,"TestLoadImage: error",!1,l,g),g.onabort=f(Te,d,"TestLoadImage: abort",!1,l,g),g.ontimeout=f(Te,d,"TestLoadImage: timeout",!1,l,g),a.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=o}else l(!1)}function lm(o,l){const d=new Ar,g=new AbortController,R=setTimeout(()=>{g.abort(),Te(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:g.signal}).then(S=>{clearTimeout(R),S.ok?Te(d,"TestPingServer: ok",!0,l):Te(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(R),Te(d,"TestPingServer: error",!1,l)})}function Te(o,l,d,g,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),g(d)}catch{}}function hm(){this.g=new Qf}function Io(o){this.i=o.Sb||null,this.h=o.ab||!1}m(Io,Cu),Io.prototype.g=function(){return new Ms(this.i,this.h)};function Ms(o,l){St.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(Ms,St),r=Ms.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,xr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Dr(this)),this.readyState=0},r.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,xr(this)),this.g&&(this.readyState=3,xr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ec(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function ec(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}r.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Dr(this):xr(this),this.readyState==3&&ec(this)}},r.Oa=function(o){this.g&&(this.response=this.responseText=o,Dr(this))},r.Na=function(o){this.g&&(this.response=o,Dr(this))},r.ga=function(){this.g&&Dr(this)};function Dr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,xr(o)}r.setRequestHeader=function(o,l){this.A.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function xr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ms.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function nc(o){let l="";return bs(o,function(d,g){l+=g,l+=":",l+=d,l+=`\r
`}),l}function To(o,l,d){t:{for(g in d){var g=!1;break t}g=!0}g||(d=nc(d),typeof o=="string"?d!=null&&vr(d):ot(o,l,d))}function dt(o){St.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(dt,St);var dm=/^https?$/i,fm=["POST","PUT"];r=dt.prototype,r.Fa=function(o){this.H=o},r.ea=function(o,l,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ou.g(),this.g.onreadystatechange=p(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){rc(this,S);return}if(o=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var R in g)d.set(R,g[R]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const S of g.keys())d.set(S,g.get(S));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),R=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(fm,l,void 0)>=0)||g||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,M]of d)this.g.setRequestHeader(S,M);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){rc(this,S)}};function rc(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,sc(o),Os(o)}function sc(o){o.A||(o.A=!0,Nt(o,"complete"),Nt(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Nt(this,"complete"),Nt(this,"abort"),Os(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Os(this,!0)),dt.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?ic(this):this.Xa())},r.Xa=function(){ic(this)};function ic(o){if(o.h&&typeof i<"u"){if(o.v&&Ee(o)==4)setTimeout(o.Ca.bind(o),0);else if(Nt(o,"readystatechange"),Ee(o)==4){o.h=!1;try{const S=o.ca();t:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break t;default:l=!1}var d;if(!(d=l)){var g;if(g=S===0){let M=String(o.D).match(Wu)[1]||null;!M&&a.self&&a.self.location&&(M=a.self.location.protocol.slice(0,-1)),g=!dm.test(M?M.toLowerCase():"")}d=g}if(d)Nt(o,"complete"),Nt(o,"success");else{o.o=6;try{var R=Ee(o)>2?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.ca()+"]",sc(o)}}finally{Os(o)}}}}function Os(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const d=o.g;o.g=null,l||Nt(o,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function Ee(o){return o.g?o.g.readyState:0}r.ca=function(){try{return Ee(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),$f(l)}};function oc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function mm(o){const l={};o=(o.g&&Ee(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<o.length;g++){if(y(o[g]))continue;var d=Xf(o[g]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[R]||[];l[R]=S,S.push(d)}Uf(l,function(g){return g.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Nr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function ac(o){this.za=0,this.i=[],this.j=new Ar,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Nr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Nr("baseRetryDelayMs",5e3,o),this.Za=Nr("retryDelaySeedMs",1e4,o),this.Ta=Nr("forwardChannelMaxRetries",2,o),this.va=Nr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new zu(o&&o.concurrentRequestLimit),this.Ba=new hm,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=ac.prototype,r.ka=8,r.I=1,r.connect=function(o,l,d,g){kt(0),this.W=o,this.H=l||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=pc(this,null,this.W),qs(this)};function Eo(o){if(uc(o),o.I==3){var l=o.V++,d=Wt(o.J);if(ot(d,"SID",o.M),ot(d,"RID",l),ot(d,"TYPE","terminate"),kr(o,d),l=new ye(o,o.j,l),l.M=2,l.A=Fs(Wt(d)),d=!1,a.navigator&&a.navigator.sendBeacon)try{d=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&a.Image&&(new Image().src=l.A,d=!0),d||(l.g=_c(l.j,null),l.g.ea(l.A)),l.F=Date.now(),ks(l)}gc(o)}function Ls(o){o.g&&(Ao(o),o.g.cancel(),o.g=null)}function uc(o){Ls(o),o.v&&(a.clearTimeout(o.v),o.v=null),Bs(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function qs(o){if(!Gu(o.h)&&!o.m){o.m=!0;var l=o.Ea;J||_(),Y||(J(),Y=!0),T.add(l,o),o.D=0}}function gm(o,l){return Ku(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=wr(h(o.Ea,o,l),mc(o,o.D)),o.D++,!0)}r.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const R=new ye(this,this.j,o);let S=this.o;if(this.U&&(S?(S=Iu(S),Eu(S,this.U)):S=this.U),this.u!==null||this.R||(R.J=S,S=null),this.S)t:{for(var l=0,d=0;d<this.i.length;d++){e:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break e}g=void 0}if(g===void 0)break;if(l+=g,l>4096){l=d;break t}if(l===4096||d===this.i.length-1){l=d+1;break t}}l=1e3}else l=1e3;l=lc(this,R,l),d=Wt(this.J),ot(d,"RID",o),ot(d,"CVER",22),this.G&&ot(d,"X-HTTP-Session-Id",this.G),kr(this,d),S&&(this.R?l="headers="+vr(nc(S))+"&"+l:this.u&&To(d,this.u,S)),_o(this.h,R),this.Ra&&ot(d,"TYPE","init"),this.S?(ot(d,"$req",l),ot(d,"SID","null"),R.U=!0,fo(R,d,null)):fo(R,d,l),this.I=2}}else this.I==3&&(o?cc(this,o):this.i.length==0||Gu(this.h)||cc(this))};function cc(o,l){var d;l?d=l.l:d=o.V++;const g=Wt(o.J);ot(g,"SID",o.M),ot(g,"RID",d),ot(g,"AID",o.K),kr(o,g),o.u&&o.o&&To(g,o.u,o.o),d=new ye(o,o.j,d,o.D+1),o.u===null&&(d.J=o.o),l&&(o.i=l.G.concat(o.i)),l=lc(o,d,1e3),d.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),_o(o.h,d),fo(d,g,l)}function kr(o,l){o.H&&bs(o.H,function(d,g){ot(l,g,d)}),o.l&&bs({},function(d,g){ot(l,g,d)})}function lc(o,l,d){d=Math.min(o.i.length,d);const g=o.l?h(o.l.Ka,o.l,o):null;t:{var R=o.i;let K=-1;for(;;){const yt=["count="+d];K==-1?d>0?(K=R[0].g,yt.push("ofs="+K)):K=0:yt.push("ofs="+K);let rt=!0;for(let Et=0;Et<d;Et++){var S=R[Et].g;const Ht=R[Et].map;if(S-=K,S<0)K=Math.max(0,R[Et].g-100),rt=!1;else try{S="req"+S+"_"||"";try{var M=Ht instanceof Map?Ht:Object.entries(Ht);for(const[Ye,we]of M){let Ae=we;u(we)&&(Ae=ao(we)),yt.push(S+Ye+"="+encodeURIComponent(Ae))}}catch(Ye){throw yt.push(S+"type="+encodeURIComponent("_badmap")),Ye}}catch{g&&g(Ht)}}if(rt){M=yt.join("&");break t}}M=void 0}return o=o.i.splice(0,d),l.G=o,M}function hc(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;J||_(),Y||(J(),Y=!0),T.add(l,o),o.A=0}}function wo(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=wr(h(o.Da,o),mc(o,o.A)),o.A++,!0)}r.Da=function(){if(this.v=null,dc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=wr(h(this.Wa,this),o)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,kt(10),Ls(this),dc(this))};function Ao(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function dc(o){o.g=new ye(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=Wt(o.na);ot(l,"RID","rpc"),ot(l,"SID",o.M),ot(l,"AID",o.K),ot(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&ot(l,"TO",o.ia),ot(l,"TYPE","xmlhttp"),kr(o,l),o.u&&o.o&&To(l,o.u,o.o),o.O&&(o.g.H=o.O);var d=o.g;o=o.ba,d.M=1,d.A=Fs(Wt(l)),d.u=null,d.R=!0,Bu(d,o)}r.Va=function(){this.C!=null&&(this.C=null,Ls(this),wo(this),kt(19))};function Bs(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function fc(o,l){var d=null;if(o.g==l){Bs(o),Ao(o),o.g=null;var g=2}else if(po(o.h,l))d=l.G,$u(o.h,l),g=1;else return;if(o.I!=0){if(l.o)if(g==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var R=o.D;g=xs(),Nt(g,new Fu(g,d)),qs(o)}else hc(o);else if(R=l.m,R==3||R==0&&l.X>0||!(g==1&&gm(o,l)||g==2&&wo(o)))switch(d&&d.length>0&&(l=o.h,l.i=l.i.concat(d)),R){case 1:Je(o,5);break;case 4:Je(o,10);break;case 3:Je(o,6);break;default:Je(o,2)}}}function mc(o,l){let d=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(d*=2),d*l}function Je(o,l){if(o.j.info("Error code "+l),l==2){var d=h(o.bb,o),g=o.Ua;const R=!g;g=new Ie(g||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Pr(g,"https"),Fs(g),R?cm(g.toString(),d):lm(g.toString(),d)}else kt(2);o.I=0,o.l&&o.l.pa(l),gc(o),uc(o)}r.bb=function(o){o?(this.j.info("Successfully pinged google.com"),kt(2)):(this.j.info("Failed to ping google.com"),kt(1))};function gc(o){if(o.I=0,o.ja=[],o.l){const l=Qu(o.h);(l.length!=0||o.i.length!=0)&&(x(o.ja,l),x(o.ja,o.i),o.h.i.length=0,v(o.i),o.i.length=0),o.l.oa()}}function pc(o,l,d){var g=d instanceof Ie?Wt(d):new Ie(d);if(g.g!="")l&&(g.g=l+"."+g.g),Vr(g,g.u);else{var R=a.location;g=R.protocol,l=l?l+"."+R.hostname:R.hostname,R=+R.port;const S=new Ie(null);g&&Pr(S,g),l&&(S.g=l),R&&Vr(S,R),d&&(S.h=d),g=S}return d=o.G,l=o.wa,d&&l&&ot(g,d,l),ot(g,"VER",o.ka),kr(o,g),g}function _c(o,l,d){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new dt(new Io({ab:d})):new dt(o.ma),l.Fa(o.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function yc(){}r=yc.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Us(){}Us.prototype.g=function(o,l){return new qt(o,l)};function qt(o,l){St.call(this),this.g=new ac(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!y(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!y(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Pn(this)}m(qt,St),qt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},qt.prototype.close=function(){Eo(this.g)},qt.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.v&&(d={},d.__data__=ao(o),o=d);l.i.push(new em(l.Ya++,o)),l.I==3&&qs(l)},qt.prototype.N=function(){this.g.l=null,delete this.j,Eo(this.g),delete this.g,qt.Z.N.call(this)};function Ic(o){uo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){t:{for(const d in l){o=d;break t}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}m(Ic,uo);function Tc(){co.call(this),this.status=1}m(Tc,co);function Pn(o){this.g=o}m(Pn,yc),Pn.prototype.ra=function(){Nt(this.g,"a")},Pn.prototype.qa=function(o){Nt(this.g,new Ic(o))},Pn.prototype.pa=function(o){Nt(this.g,new Tc)},Pn.prototype.oa=function(){Nt(this.g,"b")},Us.prototype.createWebChannel=Us.prototype.g,qt.prototype.send=qt.prototype.o,qt.prototype.open=qt.prototype.m,qt.prototype.close=qt.prototype.close,rh=function(){return new Us},nh=function(){return xs()},eh=Qe,ko={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ns.NO_ERROR=0,Ns.TIMEOUT=8,Ns.HTTP_ERROR=6,Ys=Ns,Mu.COMPLETE="complete",th=Mu,Du.EventType=Tr,Tr.OPEN="a",Tr.CLOSE="b",Tr.ERROR="c",Tr.MESSAGE="d",St.prototype.listen=St.prototype.J,jr=Du,dt.prototype.listenOnce=dt.prototype.K,dt.prototype.getLastError=dt.prototype.Ha,dt.prototype.getLastErrorCode=dt.prototype.ya,dt.prototype.getStatus=dt.prototype.ca,dt.prototype.getResponseJson=dt.prototype.La,dt.prototype.getResponseText=dt.prototype.la,dt.prototype.send=dt.prototype.ea,dt.prototype.setWithCredentials=dt.prototype.Fa,Zl=dt}).apply(typeof zs<"u"?zs:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class At{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
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
 */let ar="12.14.0";function Sm(r){ar=r}/**
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
 *//**
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
 */const ke=new Em("@firebase/firestore");function Nn(){return ke.logLevel}function Dy(r){ke.setLogLevel(r)}function C(r,...t){if(ke.logLevel<=ae.DEBUG){const e=t.map(ua);ke.debug(`Firestore (${ar}): ${r}`,...e)}}function mt(r,...t){if(ke.logLevel<=ae.ERROR){const e=t.map(ua);ke.error(`Firestore (${ar}): ${r}`,...e)}}function Gt(r,...t){if(ke.logLevel<=ae.WARN){const e=t.map(ua);ke.warn(`Firestore (${ar}): ${r}`,...e)}}function ua(r){if(typeof r=="string")return r;try{return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
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
 */function O(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,sh(r,n,e)}function sh(r,t,e){let n=`FIRESTORE (${ar}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw mt(n),new Error(n)}function L(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||sh(t,s,n)}function xy(r,t){r||O(57014,t)}function F(r,t){return r}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class b extends pm{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Rt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class ih{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class bm{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(At.UNAUTHENTICATED))}shutdown(){}}class Cm{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Dm{constructor(t){this.t=t,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){L(this.o===void 0,42304);let n=this.i;const s=c=>this.i!==n?(n=this.i,e(c)):Promise.resolve();let i=new Rt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Rt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const c=i;t.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},u=c=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Rt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new ih(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return L(t===null||typeof t=="string",2055,{h:t}),new At(t)}}class xm{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=At.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Nm{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new xm(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(At.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Fo{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class km{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,wm(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){L(this.o===void 0,3512);const n=i=>{i.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,C("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>n(i))};const s=i=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Fo(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(L(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Fo(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class Ny{getToken(){return Promise.resolve(new Fo(""))}invalidateToken(){}start(t,e){}shutdown(){}}/**
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
 */function Fm(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
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
 */class ca{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Fm(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function z(r,t){return r<t?-1:r>t?1:0}function Mo(r,t){const e=Math.min(r.length,t.length);for(let n=0;n<e;n++){const s=r.charAt(n),i=t.charAt(n);if(s!==i)return Ro(s)===Ro(i)?z(s,i):Ro(s)?1:-1}return z(r.length,t.length)}const Mm=55296,Om=57343;function Ro(r){const t=r.charCodeAt(0);return t>=Mm&&t<=Om}function Bn(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}function oh(r){return r+"\0"}/**
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
 */const Oo="__name__";class Jt{constructor(t,e,n){e===void 0?e=0:e>t.length&&O(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&O(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return Jt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Jt?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=Jt.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return z(t.length,e.length)}static compareSegments(t,e){const n=Jt.isNumericId(t),s=Jt.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?Jt.extractNumericId(t).compare(Jt.extractNumericId(e)):Mo(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return xe.fromString(t.substring(4,t.length-2))}}class $ extends Jt{construct(t,e,n){return new $(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new b(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new $(e)}static emptyPath(){return new $([])}}const Lm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ct extends Jt{construct(t,e,n){return new ct(t,e,n)}static isValidIdentifier(t){return Lm.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ct.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Oo}static keyField(){return new ct([Oo])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new b(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new b(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new b(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=c,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new b(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ct(e)}static emptyPath(){return new ct([])}}/**
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
 */class k{constructor(t){this.path=t}static fromPath(t){return new k($.fromString(t))}static fromName(t){return new k($.fromString(t).popFirst(5))}static empty(){return new k($.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&$.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return $.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new k(new $(t.slice()))}}/**
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
 */function la(r,t,e){if(!e)throw new b(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function qm(r,t,e,n){if(t===!0&&n===!0)throw new b(P.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Ac(r){if(!k.isDocumentKey(r))throw new b(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function vc(r){if(k.isDocumentKey(r))throw new b(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function ah(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Ri(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":O(12329,{type:typeof r})}function Q(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new b(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ri(r);throw new b(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}function uh(r,t){if(t<=0)throw new b(P.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${t}.`)}/**
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
 */function _t(r,t){const e={typeString:r};return t&&(e.value=t),e}function In(r,t){if(!ah(r))throw new b(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){e=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${n}' field to equal '${i.value}'`;break}}if(e)throw new b(P.INVALID_ARGUMENT,e);return!0}/**
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
 */const Rc=-62135596800,Pc=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(t){return Z.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Pc);return new Z(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new b(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new b(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Rc)throw new b(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new b(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Pc}_compareTo(t){return this.seconds===t.seconds?z(this.nanoseconds,t.nanoseconds):z(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(In(t,Z._jsonSchema))return new Z(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Rc;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:_t("string",Z._jsonSchemaVersion),seconds:_t("number"),nanoseconds:_t("number")};/**
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
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new Z(0,0))}static max(){return new B(new Z(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Un=-1;class jn{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function Lo(r){return r.fields.find(t=>t.kind===2)}function Ze(r){return r.fields.filter(t=>t.kind!==2)}function Bm(r,t){let e=z(r.collectionGroup,t.collectionGroup);if(e!==0)return e;for(let n=0;n<Math.min(r.fields.length,t.fields.length);++n)if(e=Um(r.fields[n],t.fields[n]),e!==0)return e;return z(r.fields.length,t.fields.length)}jn.UNKNOWN_ID=-1;class an{constructor(t,e){this.fieldPath=t,this.kind=e}}function Um(r,t){const e=ct.comparator(r.fieldPath,t.fieldPath);return e!==0?e:z(r.kind,t.kind)}class zn{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new zn(0,Kt.min())}}function ch(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new Z(e+1,0):new Z(e,n));return new Kt(s,k.empty(),t)}function lh(r){return new Kt(r.readTime,r.key,Un)}class Kt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Kt(B.min(),k.empty(),Un)}static max(){return new Kt(B.max(),k.empty(),Un)}}function ha(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=k.comparator(r.documentKey,t.documentKey),e!==0?e:z(r.largestBatchId,t.largestBatchId))}/**
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
 */const hh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class dh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ue(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==hh)throw r;C("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class A{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&O(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new A((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof A?e:A.resolve(e)}catch(e){return A.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):A.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):A.reject(e)}static resolve(t){return new A((e,n)=>{e(t)})}static reject(t){return new A((e,n)=>{n(t)})}static waitFor(t){return new A((e,n)=>{let s=0,i=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&e()},c=>n(c))}),a=!0,i===s&&e()})}static or(t){let e=A.resolve(!1);for(const n of t)e=e.next(s=>s?A.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,i)=>{n.push(e.call(this,s,i))}),this.waitFor(n)}static mapArray(t,e){return new A((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;e(t[h]).next(f=>{a[h]=f,++u,u===i&&n(a)},f=>s(f))}})}static doWhile(t,e){return new A((n,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):n()};i()})}}/**
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
 */const Bt="SimpleDb";class Pi{static open(t,e,n,s){try{return new Pi(e,t.transaction(s,n))}catch(i){throw new $r(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new Rt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new $r(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=da(n.target.error);this.S.reject(new $r(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(C(Bt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new zm(e)}}class ee{static delete(t){return C(Bt,"Removing database:",t),en(Am().indexedDB.deleteDatabase(t)).toPromise()}static v(){if(!vm())return!1;if(ee.F())return!0;const t=ui(),e=ee.M(t),n=0<e&&e<10,s=fh(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)==null?void 0:t.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static O(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.N=n,this.B=null,ee.M(ui())===12.2&&mt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(t){return this.db||(C(Bt,"Opening database:",this.name),this.db=await new Promise((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new $r(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new b(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new b(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new $r(t,a))},s.onupgradeneeded=i=>{C(Bt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next(()=>{C(Bt,"Database upgrade to version "+this.version+" complete")})}})),this.q&&(this.db.onversionchange=e=>this.q(e)),this.db}K(t){this.q=t,this.db&&(this.db.onversionchange=e=>t(e))}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(t);const u=Pi.open(this.db,t,i?"readonly":"readwrite",n),c=s(u).next(h=>(u.C(),h)).catch(h=>(u.abort(h),A.reject(h))).toPromise();return c.catch(()=>{}),await u.D,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&a<3;if(C(Bt,"Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function fh(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class jm{constructor(t){this.U=t,this.$=!1,this.W=null}get isDone(){return this.$}get G(){return this.W}set cursor(t){this.U=t}done(){this.$=!0}j(t){this.W=t}delete(){return en(this.U.delete())}}class $r extends b{constructor(t,e){super(P.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function je(r){return r.name==="IndexedDbTransactionError"}class zm{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(C(Bt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(C(Bt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),en(n)}add(t){return C(Bt,"ADD",this.store.name,t,t),en(this.store.add(t))}get(t){return en(this.store.get(t)).next(e=>(e===void 0&&(e=null),C(Bt,"GET",this.store.name,t,e),e))}delete(t){return C(Bt,"DELETE",this.store.name,t),en(this.store.delete(t))}count(){return C(Bt,"COUNT",this.store.name),en(this.store.count())}J(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A((a,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{a(c.target.result)}})}{const i=this.cursor(n),a=[];return this.H(i,(u,c)=>{a.push(c)}).next(()=>a)}}Z(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new A((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}})}X(t,e){C(Bt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.Y=!1;const s=this.cursor(n);return this.H(s,(i,a,u)=>u.delete())}ee(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.H(s,e)}te(t){const e=this.cursor({});return new A((n,s)=>{e.onerror=i=>{const a=da(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next(u=>{u?a.continue():n()}):n()}})}H(t,e){const n=[];return new A((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const c=new jm(u),h=e(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch(m=>(c.done(),A.reject(m)));n.push(f)}c.isDone?s():c.G===null?u.continue():u.continue(c.G)}}).next(()=>A.waitFor(n))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Y?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function en(r){return new A((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=da(n.target.error);e(s)}})}let Vc=!1;function da(r){const t=ee.M(ui());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new b("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Vc||(Vc=!0,setTimeout(()=>{throw n},0)),n}}return r}const Qr="IndexBackfiller";class Gm{constructor(t,e){this.asyncQueue=t,this.ne=e,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(t){C(Qr,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{const e=await this.ne.ie();C(Qr,`Documents written: ${e}`)}catch(e){je(e)?C(Qr,"Ignoring IndexedDB error during index backfill: ",e):await Ue(e)}await this.re(6e4)})}}class Km{constructor(t,e){this.localStore=t,this.persistence=e}async ie(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.se(e,t))}se(t,e){const n=new Set;let s=e,i=!0;return A.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!n.has(a))return C(Qr,`Processing collection: ${a}`),this.oe(t,a,s).next(u=>{s-=u,n.add(a)});i=!1})).next(()=>e-s)}oe(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this._e(s,i)).next(u=>(C(Qr,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u))).next(()=>a.size)}))}_e(t,e){let n=t;return e.changes.forEach((s,i)=>{const a=lh(i);ha(a,n)>0&&(n=a)}),new Kt(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class Mt{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>e.writeSequenceNumber(n))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Mt.ce=-1;/**
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
 */const Ne=-1;function ps(r){return r==null}function es(r){return r===0&&1/r==-1/0}function mh(r){return typeof r=="number"&&Number.isInteger(r)&&!es(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */const ci="";function Dt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=Sc(t)),t=$m(r.get(e),t);return Sc(t)}function $m(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case ci:e+="";break;default:e+=i}}return e}function Sc(r){return r+ci+""}function Xt(r){const t=r.length;if(L(t>=2,64408,{path:r}),t===2)return L(r.charAt(0)===ci&&r.charAt(1)==="",56145,{path:r}),$.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(ci,i);switch((a<0||a>e)&&O(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:O(61167,{path:r})}i=a+2}return new $(n)}/**
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
 */const tn="remoteDocuments",_s="owner",Vn="owner",ns="mutationQueues",Qm="userId",Qt="mutations",bc="batchId",on="userMutationsIndex",Cc=["userId","batchId"];/**
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
 */function Xs(r,t){return[r,Dt(t)]}function gh(r,t,e){return[r,Dt(t),e]}const Wm={},Gn="documentMutations",li="remoteDocumentsV14",Hm=["prefixPath","collectionGroup","readTime","documentId"],Zs="documentKeyIndex",Jm=["prefixPath","collectionGroup","documentId"],ph="collectionGroupIndex",Ym=["collectionGroup","readTime","prefixPath","documentId"],rs="remoteDocumentGlobal",qo="remoteDocumentGlobalKey",Kn="targets",_h="queryTargetsIndex",Xm=["canonicalId","targetId"],$n="targetDocuments",Zm=["targetId","path"],fa="documentTargetsIndex",tg=["path","targetId"],hi="targetGlobalKey",un="targetGlobal",ss="collectionParents",eg=["collectionId","parent"],Qn="clientMetadata",ng="clientId",Vi="bundles",rg="bundleId",Si="namedQueries",sg="name",ma="indexConfiguration",ig="indexId",Bo="collectionGroupIndex",og="collectionGroup",Wr="indexState",ag=["indexId","uid"],yh="sequenceNumberIndex",ug=["uid","sequenceNumber"],Hr="indexEntries",cg=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Ih="documentKeyIndex",lg=["indexId","uid","orderedDocumentKey"],bi="documentOverlays",hg=["userId","collectionPath","documentId"],Uo="collectionPathOverlayIndex",dg=["userId","collectionPath","largestBatchId"],Th="collectionGroupOverlayIndex",fg=["userId","collectionGroup","largestBatchId"],ga="globals",mg="name",Eh=[ns,Qt,Gn,tn,Kn,_s,un,$n,Qn,rs,ss,Vi,Si],gg=[...Eh,bi],wh=[ns,Qt,Gn,li,Kn,_s,un,$n,Qn,rs,ss,Vi,Si,bi],Ah=wh,pa=[...Ah,ma,Wr,Hr],pg=pa,vh=[...pa,ga],_g=vh;/**
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
 */class jo extends dh{constructor(t,e){super(),this.le=t,this.currentSequenceNumber=e}}function Tt(r,t){const e=F(r);return ee.O(e.le,t)}/**
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
 */function Dc(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function ze(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Rh(r,t){const e=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.push(t(r[n],n,r));return e}function Ph(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
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
 */class st{constructor(t,e){this.comparator=t,this.root=e||Vt.EMPTY}insert(t,e){return new st(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Vt.BLACK,null,null))}remove(t){return new st(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Vt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Gs(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Gs(this.root,t,this.comparator,!1)}getReverseIterator(){return new Gs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Gs(this.root,t,this.comparator,!0)}}class Gs{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Vt{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??Vt.RED,this.left=s??Vt.EMPTY,this.right=i??Vt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new Vt(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Vt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Vt.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Vt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Vt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw O(43730,{key:this.key,value:this.value});if(this.right.isRed())throw O(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw O(27949);return t+(this.isRed()?0:1)}}Vt.EMPTY=null,Vt.RED=!0,Vt.BLACK=!1;Vt.EMPTY=new class{constructor(){this.size=0}get key(){throw O(57766)}get value(){throw O(16141)}get color(){throw O(16727)}get left(){throw O(29726)}get right(){throw O(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new Vt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class et{constructor(t){this.comparator=t,this.data=new st(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new xc(this.data.getIterator())}getIteratorFrom(t){return new xc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof et)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new et(this.comparator);return e.data=t,e}}class xc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Sn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class Ot{constructor(t){this.fields=t,t.sort(ct.comparator)}static empty(){return new Ot([])}unionWith(t){let e=new et(ct.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Ot(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Bn(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
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
 */class Vh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function Fy(){return typeof atob<"u"}/**
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
 */class ft{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Vh("Invalid base64 string: "+i):i}}(t);return new ft(e)}static fromUint8Array(t){const e=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(t);return new ft(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return z(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ft.EMPTY_BYTE_STRING=new ft("");const yg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ue(r){if(L(!!r,39018),typeof r=="string"){let t=0;const e=yg.exec(r);if(L(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:ut(r.seconds),nanos:ut(r.nanos)}}function ut(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ce(r){return typeof r=="string"?ft.fromBase64String(r):ft.fromUint8Array(r)}/**
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
 */const Sh="server_timestamp",bh="__type__",Ch="__previous_value__",Dh="__local_write_time__";function Ci(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[bh])==null?void 0:n.stringValue)===Sh}function Di(r){const t=r.mapValue.fields[Ch];return Ci(t)?Di(t):t}function is(r){const t=ue(r.mapValue.fields[Dh].timestampValue);return new Z(t.seconds,t.nanos)}/**
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
 */class Ig{constructor(t,e,n,s,i,a,u,c,h,f,m){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=m}}const os="(default)";class ln{constructor(t,e){this.projectId=t,this.database=e||os}static empty(){return new ln("","")}get isDefaultDatabase(){return this.database===os}isEqual(t){return t instanceof ln&&t.projectId===this.projectId&&t.database===this.database}}function Tg(r,t){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new b(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ln(r.options.projectId,t)}/**
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
 */const _a="__type__",xh="__max__",be={mapValue:{fields:{__type__:{stringValue:xh}}}},ya="__vector__",Wn="value",ti={nullValue:"NULL_VALUE"};function Fe(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ci(r)?4:kh(r)?9007199254740991:xi(r)?10:11:O(28295,{value:r})}function ie(r,t){if(r===t)return!0;const e=Fe(r);if(e!==Fe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return is(r).isEqual(is(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=ue(s.timestampValue),u=ue(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,i){return ce(s.bytesValue).isEqual(ce(i.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,i){return ut(s.geoPointValue.latitude)===ut(i.geoPointValue.latitude)&&ut(s.geoPointValue.longitude)===ut(i.geoPointValue.longitude)}(r,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ut(s.integerValue)===ut(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ut(s.doubleValue),u=ut(i.doubleValue);return a===u?es(a)===es(u):isNaN(a)&&isNaN(u)}return!1}(r,t);case 9:return Bn(r.arrayValue.values||[],t.arrayValue.values||[],ie);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Dc(a)!==Dc(u))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(u[c]===void 0||!ie(a[c],u[c])))return!1;return!0}(r,t);default:return O(52216,{left:r})}}function as(r,t){return(r.values||[]).find(e=>ie(e,t))!==void 0}function Me(r,t){if(r===t)return 0;const e=Fe(r),n=Fe(t);if(e!==n)return z(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,t.booleanValue);case 2:return function(i,a){const u=ut(i.integerValue||i.doubleValue),c=ut(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(r,t);case 3:return Nc(r.timestampValue,t.timestampValue);case 4:return Nc(is(r),is(t));case 5:return Mo(r.stringValue,t.stringValue);case 6:return function(i,a){const u=ce(i),c=ce(a);return u.compareTo(c)}(r.bytesValue,t.bytesValue);case 7:return function(i,a){const u=i.split("/"),c=a.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=z(u[h],c[h]);if(f!==0)return f}return z(u.length,c.length)}(r.referenceValue,t.referenceValue);case 8:return function(i,a){const u=z(ut(i.latitude),ut(a.latitude));return u!==0?u:z(ut(i.longitude),ut(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return kc(r.arrayValue,t.arrayValue);case 10:return function(i,a){var p,v,x,N;const u=i.fields||{},c=a.fields||{},h=(p=u[Wn])==null?void 0:p.arrayValue,f=(v=c[Wn])==null?void 0:v.arrayValue,m=z(((x=h==null?void 0:h.values)==null?void 0:x.length)||0,((N=f==null?void 0:f.values)==null?void 0:N.length)||0);return m!==0?m:kc(h,f)}(r.mapValue,t.mapValue);case 11:return function(i,a){if(i===be.mapValue&&a===be.mapValue)return 0;if(i===be.mapValue)return 1;if(a===be.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=a.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let m=0;m<c.length&&m<f.length;++m){const p=Mo(c[m],f[m]);if(p!==0)return p;const v=Me(u[c[m]],h[f[m]]);if(v!==0)return v}return z(c.length,f.length)}(r.mapValue,t.mapValue);default:throw O(23264,{he:e})}}function Nc(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return z(r,t);const e=ue(r),n=ue(t),s=z(e.seconds,n.seconds);return s!==0?s:z(e.nanos,n.nanos)}function kc(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=Me(e[s],n[s]);if(i)return i}return z(e.length,n.length)}function Hn(r){return zo(r)}function zo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=ue(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return ce(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return k.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=zo(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${zo(e.fields[a])}`;return s+"}"}(r.mapValue):O(61005,{value:r})}function ei(r){switch(Fe(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Di(r);return t?16+ei(t):16;case 5:return 2*r.stringValue.length;case 6:return ce(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+ei(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return ze(n.fields,(i,a)=>{s+=i.length+ei(a)}),s}(r.mapValue);default:throw O(13486,{value:r})}}function hn(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function us(r){return!!r&&"integerValue"in r}function Nh(r){return us(r)||function(e){return!!e&&"doubleValue"in e}(r)}function cs(r){return!!r&&"arrayValue"in r}function Fc(r){return!!r&&"nullValue"in r}function Mc(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function ni(r){return!!r&&"mapValue"in r}function xi(r){var e,n;return((n=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[_a])==null?void 0:n.stringValue)===ya}function Jr(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const t={mapValue:{fields:{}}};return ze(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=Jr(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Jr(r.arrayValue.values[e]);return t}return{...r}}function kh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===xh}const Fh={mapValue:{fields:{[_a]:{stringValue:ya},[Wn]:{arrayValue:{}}}}};function Eg(r){return"nullValue"in r?ti:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?hn(ln.empty(),k.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?xi(r)?Fh:{mapValue:{}}:O(35942,{value:r})}function wg(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?hn(ln.empty(),k.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Fh:"mapValue"in r?xi(r)?{mapValue:{}}:be:O(61959,{value:r})}function Oc(r,t){const e=Me(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function Lc(r,t){const e=Me(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
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
 */class vt{constructor(t){this.value=t}static empty(){return new vt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!ni(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Jr(e)}setAll(t){let e=ct.emptyPath(),n={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const c=this.getFieldsMap(e);this.applyChanges(c,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=Jr(a):s.push(u.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());ni(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return ie(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];ni(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){ze(e,(s,i)=>t[s]=i);for(const s of n)delete t[s]}clone(){return new vt(Jr(this.value))}}function Mh(r){const t=[];return ze(r.fields,(e,n)=>{const s=new ct([e]);if(ni(n)){const i=Mh(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)}),new Ot(t)}/**
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
 */class at{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new at(t,0,B.min(),B.min(),B.min(),vt.empty(),0)}static newFoundDocument(t,e,n,s){return new at(t,1,e,B.min(),n,s,0)}static newNoDocument(t,e){return new at(t,2,e,B.min(),B.min(),vt.empty(),0)}static newUnknownDocument(t,e){return new at(t,3,e,B.min(),B.min(),vt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=vt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof at&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Oe{constructor(t,e){this.position=t,this.inclusive=e}}function qc(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=k.comparator(k.fromName(a.referenceValue),e.key):n=Me(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Bc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!ie(r.position[e],t.position[e]))return!1;return!0}/**
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
 */class ls{constructor(t,e="asc"){this.field=t,this.dir=e}}function Ag(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
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
 */class Oh{}class W extends Oh{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new vg(t,e,n):e==="array-contains"?new Vg(t,n):e==="in"?new zh(t,n):e==="not-in"?new Sg(t,n):e==="array-contains-any"?new bg(t,n):new W(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Rg(t,n):new Pg(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Me(e,this.value)):e!==null&&Fe(this.value)===Fe(e)&&this.matchesComparison(Me(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return O(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tt extends Oh{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new tt(t,e)}matches(t){return Jn(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Jn(r){return r.op==="and"}function Go(r){return r.op==="or"}function Ia(r){return Lh(r)&&Jn(r)}function Lh(r){for(const t of r.filters)if(t instanceof tt)return!1;return!0}function Ko(r){if(r instanceof W)return r.field.canonicalString()+r.op.toString()+Hn(r.value);if(Ia(r))return r.filters.map(t=>Ko(t)).join(",");{const t=r.filters.map(e=>Ko(e)).join(",");return`${r.op}(${t})`}}function qh(r,t){return r instanceof W?function(n,s){return s instanceof W&&n.op===s.op&&n.field.isEqual(s.field)&&ie(n.value,s.value)}(r,t):r instanceof tt?function(n,s){return s instanceof tt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,u)=>i&&qh(a,s.filters[u]),!0):!1}(r,t):void O(19439)}function Bh(r,t){const e=r.filters.concat(t);return tt.create(e,r.op)}function Uh(r){return r instanceof W?function(e){return`${e.field.canonicalString()} ${e.op} ${Hn(e.value)}`}(r):r instanceof tt?function(e){return e.op.toString()+" {"+e.getFilters().map(Uh).join(" ,")+"}"}(r):"Filter"}class vg extends W{constructor(t,e,n){super(t,e,n),this.key=k.fromName(n.referenceValue)}matches(t){const e=k.comparator(t.key,this.key);return this.matchesComparison(e)}}class Rg extends W{constructor(t,e){super(t,"in",e),this.keys=jh("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Pg extends W{constructor(t,e){super(t,"not-in",e),this.keys=jh("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function jh(r,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(n=>k.fromName(n.referenceValue))}class Vg extends W{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return cs(e)&&as(e.arrayValue,this.value)}}class zh extends W{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&as(this.value.arrayValue,e)}}class Sg extends W{constructor(t,e){super(t,"not-in",e)}matches(t){if(as(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!as(this.value.arrayValue,e)}}class bg extends W{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!cs(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>as(this.value.arrayValue,n))}}/**
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
 */class Cg{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function $o(r,t=null,e=[],n=[],s=null,i=null,a=null){return new Cg(r,t,e,n,s,i,a)}function dn(r){const t=F(r);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>Ko(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),ps(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>Hn(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>Hn(n)).join(",")),t.Te=e}return t.Te}function ys(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!Ag(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!qh(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!Bc(r.startAt,t.startAt)&&Bc(r.endAt,t.endAt)}function di(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function fi(r,t){return r.filters.filter(e=>e instanceof W&&e.field.isEqual(t))}function Uc(r,t,e){let n=ti,s=!0;for(const i of fi(r,t)){let a=ti,u=!0;switch(i.op){case"<":case"<=":a=Eg(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=ti}Oc({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Oc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function jc(r,t,e){let n=be,s=!0;for(const i of fi(r,t)){let a=be,u=!0;switch(i.op){case">=":case">":a=wg(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=be}Lc({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Lc({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
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
 */class de{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,c=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=c,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Gh(r,t,e,n,s,i,a,u){return new de(r,t,e,n,s,i,a,u)}function ur(r){return new de(r)}function zc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Dg(r){return k.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ta(r){return r.collectionGroup!==null}function On(r){const t=F(r);if(t.Ie===null){t.Ie=[];const e=new Set;for(const i of t.explicitOrderBy)t.Ie.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new et(ct.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(u=u.add(h.field))})}),u})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.Ie.push(new ls(i,n))}),e.has(ct.keyField().canonicalString())||t.Ie.push(new ls(ct.keyField(),n))}return t.Ie}function xt(r){const t=F(r);return t.Ee||(t.Ee=$h(t,On(r))),t.Ee}function Kh(r){const t=F(r);return t.Re||(t.Re=$h(t,r.explicitOrderBy)),t.Re}function $h(r,t){if(r.limitType==="F")return $o(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new ls(s.field,i)});const e=r.endAt?new Oe(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Oe(r.startAt.position,r.startAt.inclusive):null;return $o(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function Qo(r,t){const e=r.filters.concat([t]);return new de(r.path,r.collectionGroup,r.explicitOrderBy.slice(),e,r.limit,r.limitType,r.startAt,r.endAt)}function xg(r,t){const e=r.explicitOrderBy.concat([t]);return new de(r.path,r.collectionGroup,e,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}function mi(r,t,e){return new de(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function Ng(r,t){return new de(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,t,r.endAt)}function kg(r,t){return new de(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),r.limit,r.limitType,r.startAt,t)}function Is(r,t){return ys(xt(r),xt(t))&&r.limitType===t.limitType}function Qh(r){return`${dn(xt(r))}|lt:${r.limitType}`}function kn(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>Uh(s)).join(", ")}]`),ps(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Hn(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Hn(s)).join(",")),`Target(${n})`}(xt(r))}; limitType=${r.limitType})`}function Ts(r,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):k.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,t)&&function(n,s){for(const i of On(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,u,c){const h=qc(a,u,c);return a.inclusive?h<=0:h<0}(n.startAt,On(n),s)||n.endAt&&!function(a,u,c){const h=qc(a,u,c);return a.inclusive?h>=0:h>0}(n.endAt,On(n),s))}(r,t)}function Wh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Hh(r){return(t,e)=>{let n=!1;for(const s of On(r)){const i=Fg(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function Fg(r,t,e){const n=r.field.isKeyField()?k.comparator(t.key,e.key):function(i,a,u){const c=a.data.field(i),h=u.data.field(i);return c!==null&&h!==null?Me(c,h):O(42886)}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return O(19790,{direction:r.dir})}}/**
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
 */class fe{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){ze(this.inner,(e,n)=>{for(const[s,i]of n)t(s,i)})}isEmpty(){return Ph(this.inner)}size(){return this.innerSize}}/**
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
 */const Mg=new st(k.comparator);function Lt(){return Mg}const Jh=new st(k.comparator);function zr(...r){let t=Jh;for(const e of r)t=t.insert(e.key,e);return t}function Yh(r){let t=Jh;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Zt(){return Yr()}function Xh(){return Yr()}function Yr(){return new fe(r=>r.toString(),(r,t)=>r.isEqual(t))}const Og=new st(k.comparator),Lg=new et(k.comparator);function G(...r){let t=Lg;for(const e of r)t=t.add(e);return t}const qg=new et(z);function Ea(){return qg}/**
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
 */function Ni(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:es(t)?"-0":t}}function wa(r){return{integerValue:""+r}}function ki(r,t){return mh(t)?wa(t):Ni(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class Fi{constructor(){this._=void 0}}function Bg(r,t,e){return r instanceof Yn?function(s,i){const a={fields:{[bh]:{stringValue:Sh},[Dh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ci(i)&&(i=Di(i)),i&&(a.fields[Ch]=i),{mapValue:a}}(e,t):r instanceof fn?td(r,t):r instanceof mn?ed(r,t):r instanceof gn?function(s,i){const a=Zh(s,i),u=gi(a)+gi(s.Ae);return us(a)&&us(s.Ae)?wa(u):Ni(s.serializer,u)}(r,t):r instanceof Xn?function(s,i){return Gc(s,i,Math.min)}(r,t):r instanceof Zn?function(s,i){return Gc(s,i,Math.max)}(r,t):void 0}function Ug(r,t,e){return r instanceof fn?td(r,t):r instanceof mn?ed(r,t):e}function Zh(r,t){return r instanceof gn?Nh(t)?t:{integerValue:0}:null}class Yn extends Fi{}class fn extends Fi{constructor(t){super(),this.elements=t}}function td(r,t){const e=nd(t);for(const n of r.elements)e.some(s=>ie(s,n))||e.push(n);return{arrayValue:{values:e}}}class mn extends Fi{constructor(t){super(),this.elements=t}}function ed(r,t){let e=nd(t);for(const n of r.elements)e=e.filter(s=>!ie(s,n));return{arrayValue:{values:e}}}class Aa extends Fi{constructor(t,e){super(),this.serializer=t,this.Ae=e}}class gn extends Aa{}class Xn extends Aa{}class Zn extends Aa{}function Gc(r,t,e){if(!Nh(t))return r.Ae;const n=e(gi(t),gi(r.Ae));return us(t)&&us(r.Ae)?wa(n):Ni(r.serializer,n)}function gi(r){return ut(r.integerValue||r.doubleValue)}function nd(r){return cs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class Tn{constructor(t,e){this.field=t,this.transform=e}}function jg(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof fn&&s instanceof fn||n instanceof mn&&s instanceof mn?Bn(n.elements,s.elements,ie):n instanceof gn&&s instanceof gn||n instanceof Xn&&s instanceof Xn||n instanceof Zn&&s instanceof Zn?ie(n.Ae,s.Ae):n instanceof Yn&&s instanceof Yn}(r.transform,t.transform)}class zg{constructor(t,e){this.version=t,this.transformResults=e}}class lt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new lt}static exists(t){return new lt(void 0,t)}static updateTime(t){return new lt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function ri(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class Mi{}function rd(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new lr(r.key,lt.none()):new cr(r.key,r.data,lt.none());{const e=r.data,n=vt.empty();let s=new et(ct.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new me(r.key,n,new Ot(s.toArray()),lt.none())}}function Gg(r,t,e){r instanceof cr?function(s,i,a){const u=s.value.clone(),c=$c(s.fieldTransforms,i,a.transformResults);u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,t,e):r instanceof me?function(s,i,a){if(!ri(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=$c(s.fieldTransforms,i,a.transformResults),c=i.data;c.setAll(sd(s)),c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(r,t,e):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function Xr(r,t,e,n){return r instanceof cr?function(i,a,u,c){if(!ri(i.precondition,a))return u;const h=i.value.clone(),f=Qc(i.fieldTransforms,c,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(r,t,e,n):r instanceof me?function(i,a,u,c){if(!ri(i.precondition,a))return u;const h=Qc(i.fieldTransforms,c,a),f=a.data;return f.setAll(sd(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(r,t,e,n):function(i,a,u){return ri(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(r,t,e)}function Kg(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=Zh(n.transform,s||null);i!=null&&(e===null&&(e=vt.empty()),e.set(n.field,i))}return e||null}function Kc(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Bn(n,s,(i,a)=>jg(i,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class cr extends Mi{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class me extends Mi{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function sd(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function $c(r,t,e){const n=new Map;L(r.length===e.length,32656,{Ve:e.length,de:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,Ug(a,u,e[s]))}return n}function Qc(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,Bg(i,a,t))}return n}class lr extends Mi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class va extends Mi{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Ra{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&Gg(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=Xr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=Xr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Xh();return this.mutations.forEach(s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const c=rd(a,u);c!==null&&n.set(s.key,c),a.isValidDocument()||a.convertToNoDocument(B.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),G())}isEqual(t){return this.batchId===t.batchId&&Bn(this.mutations,t.mutations,(e,n)=>Kc(e,n))&&Bn(this.baseMutations,t.baseMutations,(e,n)=>Kc(e,n))}}class Pa{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){L(t.mutations.length===n.length,58842,{me:t.mutations.length,fe:n.length});let s=function(){return Og}();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new Pa(t,e,n,s)}}/**
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
 */class Va{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class id{constructor(t,e,n){this.alias=t,this.aggregateType=e,this.fieldPath=n}}/**
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
 */class $g{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var pt,H;function od(r){switch(r){case P.OK:return O(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return O(15467,{code:r})}}function ad(r){if(r===void 0)return mt("GRPC error has no .code"),P.UNKNOWN;switch(r){case pt.OK:return P.OK;case pt.CANCELLED:return P.CANCELLED;case pt.UNKNOWN:return P.UNKNOWN;case pt.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case pt.INTERNAL:return P.INTERNAL;case pt.UNAVAILABLE:return P.UNAVAILABLE;case pt.UNAUTHENTICATED:return P.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case pt.NOT_FOUND:return P.NOT_FOUND;case pt.ALREADY_EXISTS:return P.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return P.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case pt.ABORTED:return P.ABORTED;case pt.OUT_OF_RANGE:return P.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return P.UNIMPLEMENTED;case pt.DATA_LOSS:return P.DATA_LOSS;default:return O(39323,{code:r})}}(H=pt||(pt={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Zr=null;function Qg(r){if(Zr)throw new Error("a TestingHooksSpi instance is already set");Zr=r}/**
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
 */function ud(){return new TextEncoder}/**
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
 */const Wg=new xe([4294967295,4294967295],0);function Wc(r){const t=ud().encode(r),e=new Xl;return e.update(t),new Uint8Array(e.digest())}function Hc(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new xe([e,n],0),new xe([s,i],0)]}class Sa{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new Gr(`Invalid padding: ${e}`);if(n<0)throw new Gr(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new Gr(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new Gr(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=xe.fromNumber(this.ge)}ye(t,e,n){let s=t.add(e.multiply(xe.fromNumber(n)));return s.compare(Wg)===1&&(s=new xe([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Wc(t),[n,s]=Hc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new Sa(i,s,e);return n.forEach(u=>a.insert(u)),a}insert(t){if(this.ge===0)return;const e=Wc(t),[n,s]=Hc(e);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class Gr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class hr{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,Es.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new hr(B.min(),s,new st(z),Lt(),G())}}class Es{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new Es(n,e,G(),G(),G())}}/**
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
 */class si{constructor(t,e,n,s){this.be=t,this.removedTargetIds=e,this.key=n,this.De=s}}class cd{constructor(t,e){this.targetId=t,this.Ce=e}}class ld{constructor(t,e,n=ft.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class Jc{constructor(t){this.targetId=t,this.ve=0,this.Fe=Yc(),this.Me=ft.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=G(),e=G(),n=G();return this.Fe.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:O(38017,{changeType:i})}}),new Es(this.Me,this.xe,t,e,n)}qe(){this.Oe=!1,this.Fe=Yc()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const Fr="WatchChangeAggregator";class Hg{constructor(t){this.Ge=t,this.ze=new Map,this.je=Lt(),this.Je=Ks(),this.He=Ks(),this.Ze=new st(z)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const n=this.ze.get(e);if(n)switch(t.state){case 0:this.nt(e)&&n.Le(t.resumeToken);break;case 1:n.We(),n.Ne||n.qe(),n.Le(t.resumeToken);break;case 2:n.We(),n.Ne||this.removeTarget(e);break;case 3:this.nt(e)&&(n.Qe(),n.Le(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),n.Le(t.resumeToken));break;default:O(56790,{state:t.state})}else C(Fr,`handleTargetChange received targetChange for untracked target ID (${e}) with state (${t.state})`)})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((n,s)=>{this.nt(s)&&e(s)})}it(t){const e=t.targetId,n=t.Ce.count,s=this.st(e);if(s){const i=s.target;if(di(i))if(n===0){const a=new k(i.path);this.et(e,a,at.newNoDocument(a,B.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this.ot(e);if(a!==n){const u=this._t(t),c=u?this.ut(u,t,a):1;if(c!==0){this.rt(e);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,h)}Zr==null||Zr.o(function(f,m,p,v,x){var q,j,U;const N={localCacheCount:f,existenceFilterCount:m.count,databaseId:p.database,projectId:p.projectId},D=m.unchangedNames;return D&&(N.bloomFilter={applied:x===0,hashCount:(D==null?void 0:D.hashCount)??0,bitmapLength:((j=(q=D==null?void 0:D.bits)==null?void 0:q.bitmap)==null?void 0:j.length)??0,padding:((U=D==null?void 0:D.bits)==null?void 0:U.padding)??0,mightContain:X=>(v==null?void 0:v.mightContain(X))??!1}),N}(a,t.Ce,this.Ge.lt(),u,c))}}}}_t(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ce(n).toUint8Array()}catch(c){if(c instanceof Vh)return Gt("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Sa(a,s,i)}catch(c){return Gt(c instanceof Gr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.ge===0?null:u}ut(t,e,n){return e.Ce.count===n-this.ht(t,e.targetId)?0:2}ht(t,e){const n=this.Ge.getRemoteKeysForTarget(e);let s=0;return n.forEach(i=>{const a=this.Ge.lt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.et(e,i,null),s++)}),s}Pt(t){const e=new Map;this.ze.forEach((i,a)=>{const u=this.st(a);if(u){if(i.current&&di(u.target)){const c=new k(u.target.path);this.Tt(c).has(a)||this.It(a,c)||this.et(a,c,at.newNoDocument(c,t))}i.Be&&(e.set(a,i.ke()),i.qe())}});let n=G();this.He.forEach((i,a)=>{let u=!0;a.forEachWhile(c=>{const h=this.st(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.je.forEach((i,a)=>a.setReadTime(t));const s=new hr(t,e,this.Ze,this.je,n);return this.je=Lt(),this.Je=Ks(),this.He=Ks(),this.Ze=new st(z),s}Ye(t,e){const n=this.ze.get(t);if(!n||!this.nt(t))return void C(Fr,`addDocumentToTarget received document for unknown inactive target (${t})`);const s=this.It(t,e.key)?2:0;n.Ke(e.key,s),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Tt(e.key).add(t)),this.He=this.He.insert(e.key,this.Et(e.key).add(t))}et(t,e,n){const s=this.ze.get(t);s&&this.nt(t)?(this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Et(e).delete(t)),this.He=this.He.insert(e,this.Et(e).add(t)),n&&(this.je=this.je.insert(e,n))):C(Fr,`removeDocumentFromTarget received document for unknown or inactive target (${t})`)}removeTarget(t){this.ze.delete(t)}ot(t){const e=this.ze.get(t);if(!e)return 0;const n=e.ke();return this.Ge.getRemoteKeysForTarget(t).size+n.addedDocuments.size-n.removedDocuments.size}$e(t){let e=this.ze.get(t);e||(C(Fr,`recordPendingTargetRequest set up tracking for target ID ${t}`),e=new Jc(t),this.ze.set(t,e)),e.$e()}Et(t){let e=this.He.get(t);return e||(e=new et(z),this.He=this.He.insert(t,e)),e}Tt(t){let e=this.Je.get(t);return e||(e=new et(z),this.Je=this.Je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||C(Fr,"Detected inactive target",t),e}st(t){const e=this.ze.get(t);return e===void 0||e.Ne?null:this.Ge.Rt(t)}rt(t){this.ze.set(t,new Jc(t)),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function Ks(){return new st(k.comparator)}function Yc(){return new st(k.comparator)}const Jg=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Yg=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Xg=(()=>({and:"AND",or:"OR"}))();class Zg{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Wo(r,t){return r.useProto3Json||ps(t)?t:{value:t}}function tr(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function hd(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function tp(r,t){return tr(r,t.toTimestamp())}function gt(r){return L(!!r,49232),B.fromTimestamp(function(e){const n=ue(e);return new Z(n.seconds,n.nanos)}(r))}function ba(r,t){return Ho(r,t).canonicalString()}function Ho(r,t){const e=function(s){return new $(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function dd(r){const t=$.fromString(r);return L(Ed(t),10190,{key:t.toString()}),t}function hs(r,t){return ba(r.databaseId,t.path)}function ne(r,t){const e=dd(t);if(e.get(1)!==r.databaseId.projectId)throw new b(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new b(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new k(gd(e))}function fd(r,t){return ba(r.databaseId,t)}function md(r){const t=dd(r);return t.length===4?$.emptyPath():gd(t)}function Jo(r){return new $(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function gd(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Xc(r,t,e){return{name:hs(r,t),fields:e.value.mapValue.fields}}function Oi(r,t,e){const n=ne(r,t.name),s=gt(t.updateTime),i=t.createTime?gt(t.createTime):B.min(),a=new vt({mapValue:{fields:t.fields}}),u=at.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function ep(r,t){return"found"in t?function(n,s){L(!!s.found,43571),s.found.name,s.found.updateTime;const i=ne(n,s.found.name),a=gt(s.found.updateTime),u=s.found.createTime?gt(s.found.createTime):B.min(),c=new vt({mapValue:{fields:s.found.fields}});return at.newFoundDocument(i,a,u,c)}(r,t):"missing"in t?function(n,s){L(!!s.missing,3894),L(!!s.readTime,22933);const i=ne(n,s.missing),a=gt(s.readTime);return at.newNoDocument(i,a)}(r,t):O(7234,{result:t})}function np(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:O(39313,{state:h})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),ft.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ft.fromUint8Array(f||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(h){const f=h.code===void 0?P.UNKNOWN:ad(h.code);return new b(f,h.message||"")}(a);e=new ld(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=ne(r,n.document.name),i=gt(n.document.updateTime),a=n.document.createTime?gt(n.document.createTime):B.min(),u=new vt({mapValue:{fields:n.document.fields}}),c=at.newFoundDocument(s,i,a,u),h=n.targetIds||[],f=n.removedTargetIds||[];e=new si(h,f,c.key,c)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=ne(r,n.document),i=n.readTime?gt(n.readTime):B.min(),a=at.newNoDocument(s,i),u=n.removedTargetIds||[];e=new si([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=ne(r,n.document),i=n.removedTargetIds||[];e=new si([],i,s,null)}else{if(!("filter"in t))return O(11601,{At:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new $g(s,i),u=n.targetId;e=new cd(u,a)}}return e}function ds(r,t){let e;if(t instanceof cr)e={update:Xc(r,t.key,t.value)};else if(t instanceof lr)e={delete:hs(r,t.key)};else if(t instanceof me)e={update:Xc(r,t.key,t.data),updateMask:up(t.fieldMask)};else{if(!(t instanceof va))return O(16599,{Vt:t.type});e={verify:hs(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(i,a){const u=a.transform;if(u instanceof Yn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof fn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof mn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof gn)return{fieldPath:a.field.canonicalString(),increment:u.Ae};if(u instanceof Xn)return{fieldPath:a.field.canonicalString(),minimum:u.Ae};if(u instanceof Zn)return{fieldPath:a.field.canonicalString(),maximum:u.Ae};throw O(20930,{transform:a.transform})}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:tp(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:O(27497)}(r,t.precondition)),e}function Yo(r,t){const e=t.currentDocument?function(i){return i.updateTime!==void 0?lt.updateTime(gt(i.updateTime)):i.exists!==void 0?lt.exists(i.exists):lt.none()}(t.currentDocument):lt.none(),n=t.updateTransforms?t.updateTransforms.map(s=>function(a,u){let c=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),c=new Yn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new fn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new mn(f)}else"increment"in u?c=new gn(a,u.increment):"minimum"in u?c=new Xn(a,u.minimum):"maximum"in u?c=new Zn(a,u.maximum):O(16584,{proto:u});const h=ct.fromServerFormat(u.fieldPath);return new Tn(h,c)}(r,s)):[];if(t.update){t.update.name;const s=ne(r,t.update.name),i=new vt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(c){const h=c.fieldPaths||[];return new Ot(h.map(f=>ct.fromServerFormat(f)))}(t.updateMask);return new me(s,i,a,e,n)}return new cr(s,i,e,n)}if(t.delete){const s=ne(r,t.delete);return new lr(s,e)}if(t.verify){const s=ne(r,t.verify);return new va(s,e)}return O(1463,{proto:t})}function rp(r,t){return r&&r.length>0?(L(t!==void 0,14353),r.map(e=>function(s,i){let a=s.updateTime?gt(s.updateTime):gt(i);return a.isEqual(B.min())&&(a=gt(i)),new zg(a,s.transformResults||[])}(e,t))):[]}function pd(r,t){return{documents:[fd(r,t.path)]}}function Li(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=fd(r,s);const i=function(h){if(h.length!==0)return Td(tt.create(h,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const a=function(h){if(h.length!==0)return h.map(f=>function(p){return{field:Ve(p.field),direction:ip(p.dir)}}(f))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=Wo(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(t.endAt)),{dt:e,parent:s}}function _d(r,t,e,n){const{dt:s,parent:i}=Li(r,t),a={},u=[];let c=0;return e.forEach(h=>{const f=n?h.alias:"aggregate_"+c++;a[f]=h.alias,h.aggregateType==="count"?u.push({alias:f,count:{}}):h.aggregateType==="avg"?u.push({alias:f,avg:{field:Ve(h.fieldPath)}}):h.aggregateType==="sum"&&u.push({alias:f,sum:{field:Ve(h.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:u,structuredQuery:s.structuredQuery},parent:s.parent},ft:a,parent:i}}function yd(r){let t=md(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){L(n===1,65062);const f=e.from[0];f.allDescendants?s=f.collectionId:t=t.child(f.collectionId)}let i=[];e.where&&(i=function(m){const p=Id(m);return p instanceof tt&&Ia(p)?p.getFilters():[p]}(e.where));let a=[];e.orderBy&&(a=function(m){return m.map(p=>function(x){return new ls(Fn(x.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(x.direction))}(p))}(e.orderBy));let u=null;e.limit&&(u=function(m){let p;return p=typeof m=="object"?m.value:m,ps(p)?null:p}(e.limit));let c=null;e.startAt&&(c=function(m){const p=!!m.before,v=m.values||[];return new Oe(v,p)}(e.startAt));let h=null;return e.endAt&&(h=function(m){const p=!m.before,v=m.values||[];return new Oe(v,p)}(e.endAt)),Gh(t,s,a,i,u,"F",c,h)}function sp(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return O(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Id(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Fn(e.unaryFilter.field);return W.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Fn(e.unaryFilter.field);return W.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Fn(e.unaryFilter.field);return W.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Fn(e.unaryFilter.field);return W.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return O(61313);default:return O(60726)}}(r):r.fieldFilter!==void 0?function(e){return W.create(Fn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return O(58110);default:return O(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return tt.create(e.compositeFilter.filters.map(n=>Id(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return O(1026)}}(e.compositeFilter.op))}(r):O(30097,{filter:r})}function ip(r){return Jg[r]}function op(r){return Yg[r]}function ap(r){return Xg[r]}function Ve(r){return{fieldPath:r.canonicalString()}}function Fn(r){return ct.fromServerFormat(r.fieldPath)}function Td(r){return r instanceof W?function(e){if(e.op==="=="){if(Mc(e.value))return{unaryFilter:{field:Ve(e.field),op:"IS_NAN"}};if(Fc(e.value))return{unaryFilter:{field:Ve(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Mc(e.value))return{unaryFilter:{field:Ve(e.field),op:"IS_NOT_NAN"}};if(Fc(e.value))return{unaryFilter:{field:Ve(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ve(e.field),op:op(e.op),value:e.value}}}(r):r instanceof tt?function(e){const n=e.getFilters().map(s=>Td(s));return n.length===1?n[0]:{compositeFilter:{op:ap(e.op),filters:n}}}(r):O(54877,{filter:r})}function up(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Ed(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function wd(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}/**
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
 */class te{constructor(t,e,n,s,i=B.min(),a=B.min(),u=ft.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(t){return new te(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new te(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Ad{constructor(t){this.gt=t}}function cp(r,t){let e;if(t.document)e=Oi(r.gt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=k.fromSegments(t.noDocument.path),s=_n(t.noDocument.readTime);e=at.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return O(56709);{const n=k.fromSegments(t.unknownDocument.path),s=_n(t.unknownDocument.version);e=at.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime(function(s){const i=new Z(s[0],s[1]);return B.fromTimestamp(i)}(t.readTime)),e}function Zc(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:pi(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(i,a){return{name:hs(i,a.key),fields:a.data.value.mapValue.fields,updateTime:tr(i,a.version.toTimestamp()),createTime:tr(i,a.createTime.toTimestamp())}}(r.gt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:pn(t.version)};else{if(!t.isUnknownDocument())return O(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:pn(t.version)}}return n}function pi(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function pn(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function _n(r){const t=new Z(r.seconds,r.nanoseconds);return B.fromTimestamp(t)}function nn(r,t){const e=(t.baseMutations||[]).map(i=>Yo(r.gt,i));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map(i=>Yo(r.gt,i)),s=Z.fromMillis(t.localWriteTimeMs);return new Ra(t.batchId,s,e,n)}function Kr(r){const t=_n(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?_n(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const a=i.documents.length;return L(a===1,1966,{count:a}),xt(ur(md(i.documents[0])))}(r.query):function(i){return xt(yd(i))}(r.query),new te(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,ft.fromBase64String(r.resumeToken))}function vd(r,t){const e=pn(t.snapshotVersion),n=pn(t.lastLimboFreeSnapshotVersion);let s;s=di(t.target)?pd(r.gt,t.target):Li(r.gt,t.target).dt;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:dn(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function qi(r){const t=yd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?mi(t,t.limit,"L"):t}function Po(r,t){return new Va(t.largestBatchId,Yo(r.gt,t.overlayMutation))}function tl(r,t){const e=t.path.lastSegment();return[r,Dt(t.path.popLast()),e]}function el(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:pn(n.readTime),documentKey:Dt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class lp{getBundleMetadata(t,e){return nl(t).get(e).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:_n(i.createTime),version:i.version}}(n)})}saveBundleMetadata(t,e){return nl(t).put(function(s){return{bundleId:s.id,createTime:pn(gt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return rl(t).get(e).next(n=>{if(n)return function(i){return{name:i.name,query:qi(i.bundledQuery),readTime:_n(i.readTime)}}(n)})}saveNamedQuery(t,e){return rl(t).put(function(s){return{name:s.name,readTime:pn(gt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function nl(r){return Tt(r,Vi)}function rl(r){return Tt(r,Si)}/**
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
 */class Bi{constructor(t,e){this.serializer=t,this.userId=e}static yt(t,e){const n=e.uid||"";return new Bi(t,n)}getOverlay(t,e){return Mr(t).get(tl(this.userId,e)).next(n=>n?Po(this.serializer,n):null)}getOverlays(t,e){const n=Zt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){const s=[];return n.forEach((i,a)=>{const u=new Va(e,a);s.push(this.wt(t,u))}),A.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach(a=>s.add(Dt(a.getCollectionPath())));const i=[];return s.forEach(a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(Mr(t).X(Uo,u))}),A.waitFor(i)}getOverlaysForCollection(t,e,n){const s=Zt(),i=Dt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Mr(t).J(Uo,a).next(u=>{for(const c of u){const h=Po(this.serializer,c);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(t,e,n,s){const i=Zt();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return Mr(t).ee({index:Th,range:u},(c,h,f)=>{const m=Po(this.serializer,h);i.size()<s||m.largestBatchId===a?(i.set(m.getKey(),m),a=m.largestBatchId):f.done()}).next(()=>i)}wt(t,e){return Mr(t).put(function(s,i,a){const[u,c,h]=tl(i,a.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:ds(s.gt,a.mutation)}}(this.serializer,this.userId,e))}}function Mr(r){return Tt(r,bi)}/**
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
 */class hp{St(t){return Tt(t,ga)}getSessionToken(t){return this.St(t).get("sessionToken").next(e=>{const n=e==null?void 0:e.value;return n?ft.fromUint8Array(n):ft.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.St(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
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
 */class rn{constructor(){}bt(t,e){this.Dt(t,e),e.Ct()}Dt(t,e){if("nullValue"in t)this.vt(e,5);else if("booleanValue"in t)this.vt(e,10),e.Ft(t.booleanValue?1:0);else if("integerValue"in t)this.vt(e,15),e.Ft(ut(t.integerValue));else if("doubleValue"in t){const n=ut(t.doubleValue);isNaN(n)?this.vt(e,13):(this.vt(e,15),es(n)?e.Ft(0):e.Ft(n))}else if("timestampValue"in t){let n=t.timestampValue;this.vt(e,20),typeof n=="string"&&(n=ue(n)),e.Mt(`${n.seconds||""}`),e.Ft(n.nanos||0)}else if("stringValue"in t)this.xt(t.stringValue,e),this.Ot(e);else if("bytesValue"in t)this.vt(e,30),e.Nt(ce(t.bytesValue)),this.Ot(e);else if("referenceValue"in t)this.Bt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.vt(e,45),e.Ft(n.latitude||0),e.Ft(n.longitude||0)}else"mapValue"in t?kh(t)?this.vt(e,Number.MAX_SAFE_INTEGER):xi(t)?this.Lt(t.mapValue,e):(this.kt(t.mapValue,e),this.Ot(e)):"arrayValue"in t?(this.qt(t.arrayValue,e),this.Ot(e)):O(19022,{Kt:t})}xt(t,e){this.vt(e,25),this.Ut(t,e)}Ut(t,e){e.Mt(t)}kt(t,e){const n=t.fields||{};this.vt(e,55);for(const s of Object.keys(n))this.xt(s,e),this.Dt(n[s],e)}Lt(t,e){var a,u;const n=t.fields||{};this.vt(e,53);const s=Wn,i=((u=(a=n[s].arrayValue)==null?void 0:a.values)==null?void 0:u.length)||0;this.vt(e,15),e.Ft(ut(i)),this.xt(s,e),this.Dt(n[s],e)}qt(t,e){const n=t.values||[];this.vt(e,50);for(const s of n)this.Dt(s,e)}Bt(t,e){this.vt(e,37),k.fromName(t).path.forEach(n=>{this.vt(e,60),this.Ut(n,e)})}vt(t,e){t.Ft(e)}Ot(t){t.Ft(2)}}rn.$t=new rn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=255;function dp(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function sl(r){const t=64-function(n){let s=0;for(let i=0;i<8;++i){const a=dp(255&n[i]);if(s+=a,a!==8)break}return s}(r);return Math.ceil(t/8)}class fp{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Qt(n.value),n=e.next();this.Gt()}zt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.jt(n.value),n=e.next();this.Jt()}Ht(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Qt(n);else if(n<2048)this.Qt(960|n>>>6),this.Qt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Qt(480|n>>>12),this.Qt(128|63&n>>>6),this.Qt(128|63&n);else{const s=e.codePointAt(0);this.Qt(240|s>>>18),this.Qt(128|63&s>>>12),this.Qt(128|63&s>>>6),this.Qt(128|63&s)}}this.Gt()}Zt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.jt(n);else if(n<2048)this.jt(960|n>>>6),this.jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.jt(480|n>>>12),this.jt(128|63&n>>>6),this.jt(128|63&n);else{const s=e.codePointAt(0);this.jt(240|s>>>18),this.jt(128|63&s>>>12),this.jt(128|63&s>>>6),this.jt(128|63&s)}}this.Jt()}Xt(t){const e=this.Yt(t),n=sl(e);this.en(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}tn(t){const e=this.Yt(t),n=sl(e);this.en(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}nn(){this.rn(bn),this.rn(255)}sn(){this._n(bn),this._n(255)}reset(){this.position=0}seed(t){this.en(t.length),this.buffer.set(t,this.position),this.position+=t.length}an(){return this.buffer.slice(0,this.position)}Yt(t){const e=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Qt(t){const e=255&t;e===0?(this.rn(0),this.rn(255)):e===bn?(this.rn(bn),this.rn(0)):this.rn(e)}jt(t){const e=255&t;e===0?(this._n(0),this._n(255)):e===bn?(this._n(bn),this._n(0)):this._n(t)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(t){this.en(1),this.buffer[this.position++]=t}_n(t){this.en(1),this.buffer[this.position++]=~t}en(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class mp{constructor(t){this.un=t}Nt(t){this.un.Wt(t)}Mt(t){this.un.Ht(t)}Ft(t){this.un.Xt(t)}Ct(){this.un.nn()}}class gp{constructor(t){this.un=t}Nt(t){this.un.zt(t)}Mt(t){this.un.Zt(t)}Ft(t){this.un.tn(t)}Ct(){this.un.sn()}}class Or{constructor(){this.un=new fp,this.ascending=new mp(this.un),this.descending=new gp(this.un)}seed(t){this.un.seed(t)}cn(t){return t===0?this.ascending:this.descending}an(){return this.un.an()}reset(){this.un.reset()}}/**
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
 */class sn{constructor(t,e,n,s){this.ln=t,this.hn=e,this.Pn=n,this.Tn=s}In(){const t=this.Tn.length,e=t===0||this.Tn[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.Tn,0),e!==t?n.set([0],this.Tn.length):++n[n.length-1],new sn(this.ln,this.hn,this.Pn,n)}En(t,e,n){return{indexId:this.ln,uid:t,arrayValue:ii(this.Pn),directionalValue:ii(this.Tn),orderedDocumentKey:ii(e),documentKey:n.path.toArray()}}Rn(t,e,n){const s=this.En(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function ve(r,t){let e=r.ln-t.ln;return e!==0?e:(e=il(r.Pn,t.Pn),e!==0?e:(e=il(r.Tn,t.Tn),e!==0?e:k.comparator(r.hn,t.hn)))}function il(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function ii(r){return Yl()?function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n}(r):r}function ol(r){return typeof r!="string"?r:function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(r)}class al{constructor(t){this.An=new et((e,n)=>ct.comparator(e.field,n.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.Vn=t.orderBy,this.dn=[];for(const e of t.filters){const n=e;n.isInequality()?this.An=this.An.add(n):this.dn.push(n)}}get mn(){return this.An.size>1}fn(t){if(L(t.collectionGroup===this.collectionId,49279),this.mn)return!1;const e=Lo(t);if(e!==void 0&&!this.gn(e))return!1;const n=Ze(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.gn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.An.size>0){const u=this.An.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.pn(u,c)||!this.yn(this.Vn[a++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.Vn.length||!this.yn(this.Vn[a++],u))return!1}return!0}wn(){if(this.mn)return null;let t=new et(ct.comparator);const e=[];for(const n of this.dn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new an(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new an(n.field,0))}for(const n of this.Vn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new an(n.field,n.dir==="asc"?0:1)));return new jn(jn.UNKNOWN_ID,this.collectionId,e,zn.empty())}gn(t){for(const e of this.dn)if(this.pn(e,t))return!0;return!1}pn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}yn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
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
 */function Rd(r){var e,n;if(L(r instanceof W||r instanceof tt,20012),r instanceof W){if(r instanceof zh){const s=((n=(e=r.value.arrayValue)==null?void 0:e.values)==null?void 0:n.map(i=>W.create(r.field,"==",i)))||[];return tt.create(s,"or")}return r}const t=r.filters.map(s=>Rd(s));return tt.create(t,r.op)}function pp(r){if(r.getFilters().length===0)return[];const t=ta(Rd(r));return L(Pd(t),7391),Xo(t)||Zo(t)?[t]:t.getFilters()}function Xo(r){return r instanceof W}function Zo(r){return r instanceof tt&&Ia(r)}function Pd(r){return Xo(r)||Zo(r)||function(e){if(e instanceof tt&&Go(e)){for(const n of e.getFilters())if(!Xo(n)&&!Zo(n))return!1;return!0}return!1}(r)}function ta(r){if(L(r instanceof W||r instanceof tt,34018),r instanceof W)return r;if(r.filters.length===1)return ta(r.filters[0]);const t=r.filters.map(n=>ta(n));let e=tt.create(t,r.op);return e=_i(e),Pd(e)?e:(L(e instanceof tt,64498),L(Jn(e),40251),L(e.filters.length>1,57927),e.filters.reduce((n,s)=>Ca(n,s)))}function Ca(r,t){let e;return L(r instanceof W||r instanceof tt,38388),L(t instanceof W||t instanceof tt,25473),e=r instanceof W?t instanceof W?function(s,i){return tt.create([s,i],"and")}(r,t):ul(r,t):t instanceof W?ul(t,r):function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),Jn(s)&&Jn(i))return Bh(s,i.getFilters());const a=Go(s)?s:i,u=Go(s)?i:s,c=a.filters.map(h=>Ca(h,u));return tt.create(c,"or")}(r,t),_i(e)}function ul(r,t){if(Jn(t))return Bh(t,r.getFilters());{const e=t.filters.map(n=>Ca(r,n));return tt.create(e,"or")}}function _i(r){if(L(r instanceof W||r instanceof tt,11850),r instanceof W)return r;const t=r.getFilters();if(t.length===1)return _i(t[0]);if(Lh(r))return r;const e=t.map(s=>_i(s)),n=[];return e.forEach(s=>{s instanceof W?n.push(s):s instanceof tt&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:tt.create(n,r.op)}/**
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
 */class _p{constructor(){this.Sn=new Da}addToCollectionParentIndex(t,e){return this.Sn.add(e),A.resolve()}getCollectionParents(t,e){return A.resolve(this.Sn.getEntries(e))}addFieldIndex(t,e){return A.resolve()}deleteFieldIndex(t,e){return A.resolve()}deleteAllFieldIndexes(t){return A.resolve()}createTargetIndexes(t,e){return A.resolve()}getDocumentsMatchingTarget(t,e){return A.resolve(null)}getIndexType(t,e){return A.resolve(0)}getFieldIndexes(t,e){return A.resolve([])}getNextCollectionGroupToUpdate(t){return A.resolve(null)}getMinOffset(t,e){return A.resolve(Kt.min())}getMinOffsetFromCollectionGroup(t,e){return A.resolve(Kt.min())}updateCollectionGroup(t,e,n){return A.resolve()}updateIndexEntries(t,e){return A.resolve()}}class Da{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new et($.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new et($.comparator)).toArray()}}/**
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
 */const cl="IndexedDbIndexManager",$s=new Uint8Array(0);class yp{constructor(t,e){this.databaseId=e,this.bn=new Da,this.Dn=new fe(n=>dn(n),(n,s)=>ys(n,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.bn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.bn.add(e)});const i={collectionId:n,parent:Dt(s)};return ll(t).put(i)}return A.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[oh(e),""],!1,!0);return ll(t).J(s).next(i=>{for(const a of i){if(a.collectionId!==e)break;n.push(Xt(a.parent))}return n})}addFieldIndex(t,e){const n=Lr(t),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=Dn(t);return i.next(u=>{a.put(el(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return i.next()}deleteFieldIndex(t,e){const n=Lr(t),s=Dn(t),i=Cn(t);return n.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=Lr(t),n=Cn(t),s=Dn(t);return e.X().next(()=>n.X()).next(()=>s.X())}createTargetIndexes(t,e){return A.forEach(this.Cn(e),n=>this.getIndexType(t,n).next(s=>{if(s===0||s===1){const i=new al(n).wn();if(i!=null)return this.addFieldIndex(t,i)}}))}getDocumentsMatchingTarget(t,e){const n=Cn(t);let s=!0;const i=new Map;return A.forEach(this.Cn(e),a=>this.vn(t,a).next(u=>{s&&(s=!!u),i.set(a,u)})).next(()=>{if(s){let a=G();const u=[];return A.forEach(i,(c,h)=>{C(cl,`Using index ${function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map(X=>`${X.fieldPath}:${X.kind}`).join(",")}`}(c)} to execute ${dn(e)}`);const f=function(U,X){const J=Lo(X);if(J===void 0)return null;for(const Y of fi(U,J.fieldPath))switch(Y.op){case"array-contains-any":return Y.value.arrayValue.values||[];case"array-contains":return[Y.value]}return null}(h,c),m=function(U,X){const J=new Map;for(const Y of Ze(X))for(const T of fi(U,Y.fieldPath))switch(T.op){case"==":case"in":J.set(Y.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return J.set(Y.fieldPath.canonicalString(),T.value),Array.from(J.values())}return null}(h,c),p=function(U,X){const J=[];let Y=!0;for(const T of Ze(X)){const _=T.kind===0?Uc(U,T.fieldPath,U.startAt):jc(U,T.fieldPath,U.startAt);J.push(_.value),Y&&(Y=_.inclusive)}return new Oe(J,Y)}(h,c),v=function(U,X){const J=[];let Y=!0;for(const T of Ze(X)){const _=T.kind===0?jc(U,T.fieldPath,U.endAt):Uc(U,T.fieldPath,U.endAt);J.push(_.value),Y&&(Y=_.inclusive)}return new Oe(J,Y)}(h,c),x=this.Fn(c,h,p),N=this.Fn(c,h,v),D=this.Mn(c,h,m),q=this.xn(c.indexId,f,x,p.inclusive,N,v.inclusive,D);return A.forEach(q,j=>n.Z(j,e.limit).next(U=>{U.forEach(X=>{const J=k.fromSegments(X.documentKey);a.has(J)||(a=a.add(J),u.push(J))})}))}).next(()=>u)}return A.resolve(null)})}Cn(t){let e=this.Dn.get(t);return e||(t.filters.length===0?e=[t]:e=pp(tt.create(t.filters,"and")).map(n=>$o(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt)),this.Dn.set(t,e),e)}xn(t,e,n,s,i,a,u){const c=(e!=null?e.length:1)*Math.max(n.length,i.length),h=c/(e!=null?e.length:1),f=[];for(let m=0;m<c;++m){const p=e?this.On(e[m/h]):$s,v=this.Nn(t,p,n[m%h],s),x=this.Bn(t,p,i[m%h],a),N=u.map(D=>this.Nn(t,p,D,!0));f.push(...this.createRange(v,x,N))}return f}Nn(t,e,n,s){const i=new sn(t,k.empty(),e,n);return s?i:i.In()}Bn(t,e,n,s){const i=new sn(t,k.empty(),e,n);return s?i.In():i}vn(t,e){const n=new al(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(i=>{let a=null;for(const u of i)n.fn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a})}getIndexType(t,e){let n=2;const s=this.Cn(e);return A.forEach(s,i=>this.vn(t,i).next(a=>{a?n!==0&&a.fields.length<function(c){let h=new et(ct.comparator),f=!1;for(const m of c.filters)for(const p of m.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?f=!0:h=h.add(p.field));for(const m of c.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&n===2?1:n)}Ln(t,e){const n=new Or;for(const s of Ze(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.cn(s.kind);rn.$t.bt(i,a)}return n.an()}On(t){const e=new Or;return rn.$t.bt(t,e.cn(0)),e.an()}kn(t,e){const n=new Or;return rn.$t.bt(hn(this.databaseId,e),n.cn(function(i){const a=Ze(i);return a.length===0?0:a[a.length-1].kind}(t))),n.an()}Mn(t,e,n){if(n===null)return[];let s=[];s.push(new Or);let i=0;for(const a of Ze(t)){const u=n[i++];for(const c of s)if(this.qn(e,a.fieldPath)&&cs(u))s=this.Kn(s,a,u);else{const h=c.cn(a.kind);rn.$t.bt(u,h)}}return this.Un(s)}Fn(t,e,n){return this.Mn(t,e,n.position)}Un(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].an();return e}Kn(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const c=new Or;c.seed(u.an()),rn.$t.bt(a,c.cn(e.kind)),i.push(c)}return i}qn(t,e){return!!t.filters.find(n=>n instanceof W&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(t,e){const n=Lr(t),s=Dn(t);return(e?n.J(Bo,IDBKeyRange.bound(e,e)):n.J()).next(i=>{const a=[];return A.forEach(i,u=>s.get([u.indexId,this.uid]).next(c=>{a.push(function(f,m){const p=m?new zn(m.sequenceNumber,new Kt(_n(m.readTime),new k(Xt(m.documentKey)),m.largestBatchId)):zn.empty(),v=f.fields.map(([x,N])=>new an(ct.fromServerFormat(x),N));return new jn(f.indexId,f.collectionGroup,v,p)}(u,c))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:z(n.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,n){const s=Lr(t),i=Dn(t);return this.$n(t).next(a=>s.J(Bo,IDBKeyRange.bound(e,e)).next(u=>A.forEach(u,c=>i.put(el(c.indexId,this.uid,a,n)))))}updateIndexEntries(t,e){const n=new Map;return A.forEach(e,(s,i)=>{const a=n.get(s.collectionGroup);return(a?A.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),A.forEach(u,c=>this.Wn(t,s,c).next(h=>{const f=this.Qn(i,c);return h.isEqual(f)?A.resolve():this.Gn(t,i,c,h,f)}))))})}zn(t,e,n,s){return Cn(t).put(s.En(this.uid,this.kn(n,e.key),e.key))}jn(t,e,n,s){return Cn(t).delete(s.Rn(this.uid,this.kn(n,e.key),e.key))}Wn(t,e,n){const s=Cn(t);let i=new et(ve);return s.ee({index:Ih,range:IDBKeyRange.only([n.indexId,this.uid,ii(this.kn(n,e))])},(a,u)=>{i=i.add(new sn(n.indexId,e,ol(u.arrayValue),ol(u.directionalValue)))}).next(()=>i)}Qn(t,e){let n=new et(ve);const s=this.Ln(e,t);if(s==null)return n;const i=Lo(e);if(i!=null){const a=t.data.field(i.fieldPath);if(cs(a))for(const u of a.arrayValue.values||[])n=n.add(new sn(e.indexId,t.key,this.On(u),s))}else n=n.add(new sn(e.indexId,t.key,$s,s));return n}Gn(t,e,n,s,i){C(cl,"Updating index entries for document '%s'",e.key);const a=[];return function(c,h,f,m,p){const v=c.getIterator(),x=h.getIterator();let N=Sn(v),D=Sn(x);for(;N||D;){let q=!1,j=!1;if(N&&D){const U=f(N,D);U<0?j=!0:U>0&&(q=!0)}else N!=null?j=!0:q=!0;q?(m(D),D=Sn(x)):j?(p(N),N=Sn(v)):(N=Sn(v),D=Sn(x))}}(s,i,ve,u=>{a.push(this.zn(t,e,n,u))},u=>{a.push(this.jn(t,e,n,u))}),A.waitFor(a)}$n(t){let e=1;return Dn(t).ee({index:yh,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,n){n=n.sort((a,u)=>ve(a,u)).filter((a,u,c)=>!u||ve(a,c[u-1])!==0);const s=[];s.push(t);for(const a of n){const u=ve(a,t),c=ve(a,e);if(u===0)s[0]=t.In();else if(u>0&&c<0)s.push(a),s.push(a.In());else if(c>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Jn(s[a],s[a+1]))return[];const u=s[a].Rn(this.uid,$s,k.empty()),c=s[a+1].Rn(this.uid,$s,k.empty());i.push(IDBKeyRange.bound(u,c))}return i}Jn(t,e){return ve(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(hl)}getMinOffset(t,e){return A.mapArray(this.Cn(e),n=>this.vn(t,n).next(s=>s||O(44426))).next(hl)}}function ll(r){return Tt(r,ss)}function Cn(r){return Tt(r,Hr)}function Lr(r){return Tt(r,ma)}function Dn(r){return Tt(r,Wr)}function hl(r){L(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ha(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Kt(t.readTime,t.documentKey,e)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */const dl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Vd=41943040;class Ct{static withCacheSize(t){return new Ct(t,Ct.DEFAULT_COLLECTION_PERCENTILE,Ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function Sd(r,t,e){const n=r.store(Qt),s=r.store(Gn),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const c=n.ee({range:a},(f,m,p)=>(u++,p.delete()));i.push(c.next(()=>{L(u===1,47070,{batchId:e.batchId})}));const h=[];for(const f of e.mutations){const m=gh(t,f.key.path,e.batchId);i.push(s.delete(m)),h.push(f.key)}return A.waitFor(i).next(()=>h)}function yi(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw O(14731);t=r.noDocument}return JSON.stringify(t).length}/**
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
 */Ct.DEFAULT_COLLECTION_PERCENTILE=10,Ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ct.DEFAULT=new Ct(Vd,Ct.DEFAULT_COLLECTION_PERCENTILE,Ct.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ct.DISABLED=new Ct(-1,0,0);class Ui{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Hn={}}static yt(t,e,n,s){L(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new Ui(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Re(t).ee({index:on,range:n},(s,i,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,n,s){const i=Mn(t),a=Re(t);return a.add({}).next(u=>{L(typeof u=="number",49019);const c=new Ra(u,e,n,s),h=function(v,x,N){const D=N.baseMutations.map(j=>ds(v.gt,j)),q=N.mutations.map(j=>ds(v.gt,j));return{userId:x,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:D,mutations:q}}(this.serializer,this.userId,c),f=[];let m=new et((p,v)=>z(p.canonicalString(),v.canonicalString()));for(const p of s){const v=gh(this.userId,p.key.path,u);m=m.add(p.key.path.popLast()),f.push(a.put(h)),f.push(i.put(v,Wm))}return m.forEach(p=>{f.push(this.indexManager.addToCollectionParentIndex(t,p))}),t.addOnCommittedListener(()=>{this.Hn[u]=c.keys()}),A.waitFor(f).next(()=>c)})}lookupMutationBatch(t,e){return Re(t).get(e).next(n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),nn(this.serializer,n)):null)}Zn(t,e){return this.Hn[e]?A.resolve(this.Hn[e]):this.lookupMutationBatch(t,e).next(n=>{if(n){const s=n.keys();return this.Hn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Re(t).ee({index:on,range:s},(a,u,c)=>{u.userId===this.userId&&(L(u.batchId>=n,47524,{Xn:n}),i=nn(this.serializer,u)),c.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Ne;return Re(t).ee({index:on,range:e,reverse:!0},(s,i,a)=>{n=i.batchId,a.done()}).next(()=>n)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,Ne],[this.userId,Number.POSITIVE_INFINITY]);return Re(t).J(on,e).next(n=>n.map(s=>nn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=Xs(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return Mn(t).ee({range:s},(a,u,c)=>{const[h,f,m]=a,p=Xt(f);if(h===this.userId&&e.path.isEqual(p))return Re(t).get(m).next(v=>{if(!v)throw O(61480,{Yn:a,batchId:m});L(v.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:v.userId,batchId:m}),i.push(nn(this.serializer,v))});c.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new et(z);const s=[];return e.forEach(i=>{const a=Xs(this.userId,i.path),u=IDBKeyRange.lowerBound(a),c=Mn(t).ee({range:u},(h,f,m)=>{const[p,v,x]=h,N=Xt(v);p===this.userId&&i.path.isEqual(N)?n=n.add(x):m.done()});s.push(c)}),A.waitFor(s).next(()=>this.er(t,n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=Xs(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new et(z);return Mn(t).ee({range:a},(c,h,f)=>{const[m,p,v]=c,x=Xt(p);m===this.userId&&n.isPrefixOf(x)?x.length===s&&(u=u.add(v)):f.done()}).next(()=>this.er(t,u))}er(t,e){const n=[],s=[];return e.forEach(i=>{s.push(Re(t).get(i).next(a=>{if(a===null)throw O(35274,{batchId:i});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(nn(this.serializer,a))}))}),A.waitFor(s).next(()=>n)}removeMutationBatch(t,e){return Sd(t.le,this.userId,e).next(n=>(t.addOnCommittedListener(()=>{this.tr(e.batchId)}),A.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}tr(t){delete this.Hn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return A.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return Mn(t).ee({range:n},(i,a,u)=>{if(i[0]===this.userId){const c=Xt(i[1]);s.push(c)}else u.done()}).next(()=>{L(s.length===0,56720,{nr:s.map(i=>i.canonicalString())})})})}containsKey(t,e){return bd(t,this.userId,e)}rr(t){return Cd(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:Ne,lastStreamToken:""})}}function bd(r,t,e){const n=Xs(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return Mn(r).ee({range:i,Y:!0},(u,c,h)=>{const[f,m,p]=u;f===t&&m===s&&(a=!0),h.done()}).next(()=>a)}function Re(r){return Tt(r,Qt)}function Mn(r){return Tt(r,Gn)}function Cd(r){return Tt(r,ns)}/**
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
 */class le{constructor(t){this.ir=t}next(){return this.ir+=2,this.ir}static sr(){return new le(0)}static _r(){return new le(-1)}}/**
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
 */class Ip{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.ar(t).next(e=>{const n=new le(e.highestTargetId);return e.highestTargetId=n.next(),this.ur(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.ar(t).next(e=>B.fromTimestamp(new Z(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.ar(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,n){return this.ar(t).next(s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.ur(t,s)))}addTargetData(t,e){return this.cr(t,e).next(()=>this.ar(t).next(n=>(n.targetCount+=1,this.lr(e,n),this.ur(t,n))))}updateTargetData(t,e){return this.cr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>xn(t).delete(e.targetId)).next(()=>this.ar(t)).next(n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.ur(t,n)))}removeTargets(t,e,n){let s=0;const i=[];return xn(t).ee((a,u)=>{const c=Kr(u);c.sequenceNumber<=e&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(t,c)))}).next(()=>A.waitFor(i)).next(()=>s)}forEachTarget(t,e){return xn(t).ee((n,s)=>{const i=Kr(s);e(i)})}ar(t){return fl(t).get(hi).next(e=>(L(e!==null,2888),e))}ur(t,e){return fl(t).put(hi,e)}cr(t,e){return xn(t).put(vd(this.serializer,e))}lr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.ar(t).next(e=>e.targetCount)}getTargetData(t,e){const n=dn(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return xn(t).ee({range:s,index:_h},(a,u,c)=>{const h=Kr(u);ys(e,h.target)&&(i=h,c.done())}).next(()=>i)}addMatchingKeys(t,e,n){const s=[],i=Se(t);return e.forEach(a=>{const u=Dt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))}),A.waitFor(s)}removeMatchingKeys(t,e,n){const s=Se(t);return A.forEach(e,i=>{const a=Dt(i.path);return A.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])})}removeMatchingKeysForTargetId(t,e){const n=Se(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=Se(t);let i=G();return s.ee({range:n,Y:!0},(a,u,c)=>{const h=Xt(a[1]),f=new k(h);i=i.add(f)}).next(()=>i)}containsKey(t,e){const n=Dt(e.path),s=IDBKeyRange.bound([n],[oh(n)],!1,!0);let i=0;return Se(t).ee({index:fa,Y:!0,range:s},([a,u],c,h)=>{a!==0&&(i++,h.done())}).next(()=>i>0)}Rt(t,e){return xn(t).get(e).next(n=>n?Kr(n):null)}}function xn(r){return Tt(r,Kn)}function fl(r){return Tt(r,un)}function Se(r){return Tt(r,$n)}/**
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
 */const ml="LruGarbageCollector",Dd=1048576;function gl([r,t],[e,n]){const s=z(r,e);return s===0?z(t,n):s}class Tp{constructor(t){this.hr=t,this.buffer=new et(gl),this.Pr=0}Tr(){return++this.Pr}Ir(t){const e=[t,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();gl(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class xd{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(t){C(ml,`Garbage collection scheduled in ${t}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){je(e)?C(ml,"Ignoring IndexedDB error during garbage collection: ",e):await Ue(e)}await this.Rr(3e5)})}}class Ep{constructor(t,e){this.Ar=t,this.params=e}calculateTargetCount(t,e){return this.Ar.Vr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return A.resolve(Mt.ce);const n=new Tp(e);return this.Ar.forEachTarget(t,s=>n.Ir(s.sequenceNumber)).next(()=>this.Ar.dr(t,s=>n.Ir(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Ar.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Ar.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(dl)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),dl):this.mr(t,e))}getCacheSize(t){return this.Ar.getCacheSize(t)}mr(t,e){let n,s,i,a,u,c,h;const f=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(t,s))).next(m=>(n=m,u=Date.now(),this.removeTargets(t,n,e))).next(m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(t,n))).next(m=>(h=Date.now(),Nn()<=ae.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m})))}}function Nd(r,t){return new Ep(r,t)}/**
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
 */class wp{constructor(t,e){this.db=t,this.garbageCollector=Nd(this,e)}Vr(t){const e=this.gr(t);return this.db.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}gr(t){let e=0;return this.dr(t,n=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}dr(t,e){return this.pr(t,(n,s)=>e(s))}addReference(t,e,n){return Qs(t,n)}removeReference(t,e,n){return Qs(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return Qs(t,e)}yr(t,e){return function(s,i){let a=!1;return Cd(s).te(u=>bd(s,u,i).next(c=>(c&&(a=!0),A.resolve(!c)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.pr(t,(a,u)=>{if(u<=e){const c=this.yr(t,a).next(h=>{if(!h)return i++,n.getEntry(t,a).next(()=>(n.removeEntry(a,B.min()),Se(t).delete(function(m){return[0,Dt(m.path)]}(a))))});s.push(c)}}).next(()=>A.waitFor(s)).next(()=>n.apply(t)).next(()=>i)}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return Qs(t,e)}pr(t,e){const n=Se(t);let s,i=Mt.ce;return n.ee({index:fa},([a,u],{path:c,sequenceNumber:h})=>{a===0?(i!==Mt.ce&&e(new k(Xt(s)),i),i=h,s=c):i=Mt.ce}).next(()=>{i!==Mt.ce&&e(new k(Xt(s)),i)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function Qs(r,t){return Se(r).put(function(n,s){return{targetId:0,path:Dt(n.path),sequenceNumber:s}}(t,r.currentSequenceNumber))}/**
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
 */class kd{constructor(){this.changes=new fe(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,at.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?A.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Ap{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Xe(t).put(n)}removeEntry(t,e,n){return Xe(t).delete(function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],pi(a),u[u.length-1]]}(e,n))}updateMetadata(t,e){return this.getMetadata(t).next(n=>(n.byteSize+=e,this.wr(t,n)))}getEntry(t,e){let n=at.newInvalidDocument(e);return Xe(t).ee({index:Zs,range:IDBKeyRange.only(qr(e))},(s,i)=>{n=this.Sr(e,i)}).next(()=>n)}br(t,e){let n={size:0,document:at.newInvalidDocument(e)};return Xe(t).ee({index:Zs,range:IDBKeyRange.only(qr(e))},(s,i)=>{n={document:this.Sr(e,i),size:yi(i)}}).next(()=>n)}getEntries(t,e){let n=Lt();return this.Dr(t,e,(s,i)=>{const a=this.Sr(s,i);n=n.insert(s,a)}).next(()=>n)}Cr(t,e){let n=Lt(),s=new st(k.comparator);return this.Dr(t,e,(i,a)=>{const u=this.Sr(i,a);n=n.insert(i,u),s=s.insert(i,yi(a))}).next(()=>({documents:n,vr:s}))}Dr(t,e,n){if(e.isEmpty())return A.resolve();let s=new et(yl);e.forEach(c=>s=s.add(c));const i=IDBKeyRange.bound(qr(s.first()),qr(s.last())),a=s.getIterator();let u=a.getNext();return Xe(t).ee({index:Zs,range:i},(c,h,f)=>{const m=k.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&yl(u,m)<0;)n(u,null),u=a.getNext();u&&u.isEqual(m)&&(n(u,h),u=a.hasNext()?a.getNext():null),u?f.j(qr(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),pi(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Xe(t).J(IDBKeyRange.bound(u,c,!0)).next(h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Lt();for(const m of h){const p=this.Sr(k.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);p.isFoundDocument()&&(Ts(e,p)||s.has(p.key))&&(f=f.insert(p.key,p))}return f})}getAllFromCollectionGroup(t,e,n,s){let i=Lt();const a=_l(e,n),u=_l(e,Kt.max());return Xe(t).ee({index:ph,range:IDBKeyRange.bound(a,u,!0)},(c,h,f)=>{const m=this.Sr(k.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(t){return new vp(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return pl(t).get(qo).next(e=>(L(!!e,20021),e))}wr(t,e){return pl(t).put(qo,e)}Sr(t,e){if(e){const n=cp(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return at.newInvalidDocument(t)}}function Fd(r){return new Ap(r)}class vp extends kd{constructor(t,e){super(),this.Fr=t,this.trackRemovals=e,this.Mr=new fe(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(t){const e=[];let n=0,s=new et((i,a)=>z(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const u=this.Mr.get(i);if(e.push(this.Fr.removeEntry(t,i,u.readTime)),a.isValidDocument()){const c=Zc(this.Fr.serializer,a);s=s.add(i.path.popLast());const h=yi(c);n+=h-u.size,e.push(this.Fr.addEntry(t,i,c))}else if(n-=u.size,this.trackRemovals){const c=Zc(this.Fr.serializer,a.convertToNoDocument(B.min()));e.push(this.Fr.addEntry(t,i,c))}}),s.forEach(i=>{e.push(this.Fr.indexManager.addToCollectionParentIndex(t,i))}),e.push(this.Fr.updateMetadata(t,n)),A.waitFor(e)}getFromCache(t,e){return this.Fr.br(t,e).next(n=>(this.Mr.set(e,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(t,e){return this.Fr.Cr(t,e).next(({documents:n,vr:s})=>(s.forEach((i,a)=>{this.Mr.set(i,{size:a,readTime:n.get(i).readTime})}),n))}}function pl(r){return Tt(r,rs)}function Xe(r){return Tt(r,li)}function qr(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function _l(r,t){const e=t.documentKey.path.toArray();return[r,pi(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function yl(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=z(e[i],n[i]),s)return s;return s=z(e.length,n.length),s||(s=z(e[e.length-2],n[n.length-2]),s||z(e[e.length-1],n[n.length-1]))}/**
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
 *//**
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
 */class Rp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Md{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&Xr(n.mutation,s,Ot.empty(),Z.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,G()).next(()=>n))}getLocalViewOfDocuments(t,e,n=G()){const s=Zt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(i=>{let a=zr();return i.forEach((u,c)=>{a=a.insert(u,c.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=Zt();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,G()))}populateOverlays(t,e,n){const s=[];return n.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,n,s){let i=Lt();const a=Yr(),u=function(){return Yr()}();return e.forEach((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof me)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Xr(f.mutation,h,f.mutation.getFieldMask(),Z.now())):a.set(h.key,Ot.empty())}),this.recalculateAndSaveOverlays(t,i).next(c=>(c.forEach((h,f)=>a.set(h,f)),e.forEach((h,f)=>u.set(h,new Rp(f,a.get(h)??null))),u))}recalculateAndSaveOverlays(t,e){const n=Yr();let s=new st((a,u)=>a-u),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(c=>{const h=e.get(c);if(h===null)return;let f=n.get(c)||Ot.empty();f=u.applyToLocalView(h,f),n.set(c,f);const m=(s.get(u.batchId)||G()).add(c);s=s.insert(u.batchId,m)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,m=Xh();f.forEach(p=>{if(!i.has(p)){const v=rd(e.get(p),n.get(p));v!==null&&m.set(p,v),i=i.add(p)}}),a.push(this.documentOverlayCache.saveOverlays(t,h,m))}return A.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return Dg(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Ta(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):A.resolve(Zt());let u=Un,c=i;return a.next(h=>A.forEach(h,(f,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(t,f).next(p=>{c=c.insert(f,p)}))).next(()=>this.populateOverlays(t,h,i)).next(()=>this.computeViews(t,c,h,G())).next(f=>({batchId:u,changes:Yh(f)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new k(e)).next(n=>{let s=zr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=zr();return this.indexManager.getCollectionParents(t,i).next(u=>A.forEach(u,c=>{const h=function(m,p){return new de(p,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(e,c.child(i));return this.getDocumentsMatchingCollectionQuery(t,h,n,s).next(f=>{f.forEach((m,p)=>{a=a.insert(m,p)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s))).next(a=>{i.forEach((c,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,at.newInvalidDocument(f)))});let u=zr();return a.forEach((c,h)=>{const f=i.get(c);f!==void 0&&Xr(f.mutation,h,Ot.empty(),Z.now()),Ts(e,h)&&(u=u.insert(c,h))}),u})}}/**
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
 */class Pp{constructor(t){this.serializer=t,this.Or=new Map,this.Nr=new Map}getBundleMetadata(t,e){return A.resolve(this.Or.get(e))}saveBundleMetadata(t,e){return this.Or.set(e.id,function(s){return{id:s.id,version:s.version,createTime:gt(s.createTime)}}(e)),A.resolve()}getNamedQuery(t,e){return A.resolve(this.Nr.get(e))}saveNamedQuery(t,e){return this.Nr.set(e.name,function(s){return{name:s.name,query:qi(s.bundledQuery),readTime:gt(s.readTime)}}(e)),A.resolve()}}/**
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
 */class Vp{constructor(){this.overlays=new st(k.comparator),this.Br=new Map}getOverlay(t,e){return A.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Zt();return A.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,i)=>{this.wt(t,e,i)}),A.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.Br.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Br.delete(n)),A.resolve()}getOverlaysForCollection(t,e,n){const s=Zt(),i=e.length+1,a=new k(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!e.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new st((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===e&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Zt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Zt(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>u.set(h,f)),!(u.size()>=s)););return A.resolve(u)}wt(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.Br.get(s.largestBatchId).delete(n.key);this.Br.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Va(e,n));let i=this.Br.get(e);i===void 0&&(i=G(),this.Br.set(e,i)),this.Br.set(e,i.add(n.key))}}/**
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
 */class Sp{constructor(){this.sessionToken=ft.EMPTY_BYTE_STRING}getSessionToken(t){return A.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,A.resolve()}}/**
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
 */class xa{constructor(){this.Lr=new et(wt.kr),this.qr=new et(wt.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(t,e){const n=new wt(t,e);this.Lr=this.Lr.add(n),this.qr=this.qr.add(n)}Ur(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.$r(new wt(t,e))}Wr(t,e){t.forEach(n=>this.removeReference(n,e))}Qr(t){const e=new k(new $([])),n=new wt(e,t),s=new wt(e,t+1),i=[];return this.qr.forEachInRange([n,s],a=>{this.$r(a),i.push(a.key)}),i}Gr(){this.Lr.forEach(t=>this.$r(t))}$r(t){this.Lr=this.Lr.delete(t),this.qr=this.qr.delete(t)}zr(t){const e=new k(new $([])),n=new wt(e,t),s=new wt(e,t+1);let i=G();return this.qr.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(t){const e=new wt(t,0),n=this.Lr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class wt{constructor(t,e){this.key=t,this.jr=e}static kr(t,e){return k.comparator(t.key,e.key)||z(t.jr,e.jr)}static Kr(t,e){return z(t.jr,e.jr)||k.comparator(t.key,e.key)}}/**
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
 */class bp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Xn=1,this.Jr=new et(wt.kr)}checkEmpty(t){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Ra(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.Jr=this.Jr.add(new wt(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return A.resolve(a)}lookupMutationBatch(t,e){return A.resolve(this.Hr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Zr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Ne:this.Xn-1)}getAllMutationBatches(t){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new wt(e,0),s=new wt(e,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([n,s],a=>{const u=this.Hr(a.jr);i.push(u)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new et(z);return e.forEach(s=>{const i=new wt(s,0),a=new wt(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],u=>{n=n.add(u.jr)})}),A.resolve(this.Xr(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;k.isDocumentKey(i)||(i=i.child(""));const a=new wt(new k(i),0);let u=new et(z);return this.Jr.forEachWhile(c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.jr)),!0)},a),A.resolve(this.Xr(u))}Xr(t){const e=[];return t.forEach(n=>{const s=this.Hr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){L(this.Yr(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Jr;return A.forEach(e.mutations,s=>{const i=new wt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Jr=n})}tr(t){}containsKey(t,e){const n=new wt(e,0),s=this.Jr.firstAfterOrEqual(n);return A.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,A.resolve()}Yr(t,e){return this.Zr(t)}Zr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Hr(t){const e=this.Zr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Cp{constructor(t){this.ei=t,this.docs=function(){return new st(k.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ei(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return A.resolve(n?n.document.mutableCopy():at.newInvalidDocument(e))}getEntries(t,e){let n=Lt();return e.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():at.newInvalidDocument(s))}),A.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=Lt();const a=e.path,u=new k(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||ha(lh(f),n)<=0||(s.has(f.key)||Ts(e,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(t,e,n,s){O(9500)}ti(t,e){return A.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new Dp(this)}getSize(t){return A.resolve(this.size)}}class Dp extends kd{constructor(t){super(),this.Fr=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.Fr.addEntry(t,s)):this.Fr.removeEntry(n)}),A.waitFor(e)}getFromCache(t,e){return this.Fr.getEntry(t,e)}getAllFromCache(t,e){return this.Fr.getEntries(t,e)}}/**
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
 */class xp{constructor(t){this.persistence=t,this.ni=new fe(e=>dn(e),ys),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.ri=0,this.ii=new xa,this.targetCount=0,this.si=le.sr()}forEachTarget(t,e){return this.ni.forEach((n,s)=>e(s)),A.resolve()}getLastRemoteSnapshotVersion(t){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return A.resolve(this.ri)}allocateTargetId(t){return this.highestTargetId=this.si.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.ri&&(this.ri=e),A.resolve()}cr(t){this.ni.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.si=new le(e),this.highestTargetId=e),t.sequenceNumber>this.ri&&(this.ri=t.sequenceNumber)}addTargetData(t,e){return this.cr(e),this.targetCount+=1,A.resolve()}updateTargetData(t,e){return this.cr(e),A.resolve()}removeTargetData(t,e){return this.ni.delete(e.target),this.ii.Qr(e.targetId),this.targetCount-=1,A.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.ni.forEach((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.ni.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),A.waitFor(i).next(()=>s)}getTargetCount(t){return A.resolve(this.targetCount)}getTargetData(t,e){const n=this.ni.get(e)||null;return A.resolve(n)}addMatchingKeys(t,e,n){return this.ii.Ur(e,n),A.resolve()}removeMatchingKeys(t,e,n){this.ii.Wr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(a=>{i.push(s.markPotentiallyOrphaned(t,a))}),A.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.ii.Qr(e),A.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ii.zr(e);return A.resolve(n)}containsKey(t,e){return A.resolve(this.ii.containsKey(e))}}/**
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
 */class Na{constructor(t,e){this.oi={},this.overlays={},this._i=new Mt(0),this.ai=!1,this.ai=!0,this.ui=new Sp,this.referenceDelegate=t(this),this.ci=new xp(this),this.indexManager=new _p,this.remoteDocumentCache=function(s){return new Cp(s)}(n=>this.referenceDelegate.li(n)),this.serializer=new Ad(e),this.hi=new Pp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Vp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.oi[t.toKey()];return n||(n=new bp(e,this.referenceDelegate),this.oi[t.toKey()]=n),n}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(t,e,n){C("MemoryPersistence","Starting transaction:",t);const s=new Np(this._i.next());return this.referenceDelegate.Pi(),n(s).next(i=>this.referenceDelegate.Ti(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ii(t,e){return A.or(Object.values(this.oi).map(n=>()=>n.containsKey(t,e)))}}class Np extends dh{constructor(t){super(),this.currentSequenceNumber=t}}class ji{constructor(t){this.persistence=t,this.Ei=new xa,this.Ri=null}static Ai(t){return new ji(t)}get Vi(){if(this.Ri)return this.Ri;throw O(60996)}addReference(t,e,n){return this.Ei.addReference(n,e),this.Vi.delete(n.toString()),A.resolve()}removeReference(t,e,n){return this.Ei.removeReference(n,e),this.Vi.add(n.toString()),A.resolve()}markPotentiallyOrphaned(t,e){return this.Vi.add(e.toString()),A.resolve()}removeTarget(t,e){this.Ei.Qr(e.targetId).forEach(s=>this.Vi.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.Vi.add(i.toString()))}).next(()=>n.removeTargetData(t,e))}Pi(){this.Ri=new Set}Ti(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Vi,n=>{const s=k.fromPath(n);return this.di(t,s).next(i=>{i||e.removeEntry(s,B.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.di(t,e).next(n=>{n?this.Vi.delete(e.toString()):this.Vi.add(e.toString())})}li(t){return 0}di(t,e){return A.or([()=>A.resolve(this.Ei.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class Ii{constructor(t,e){this.persistence=t,this.mi=new fe(n=>Dt(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Nd(this,e)}static Ai(t,e){return new Ii(t,e)}Pi(){}Ti(t){return A.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}Vr(t){const e=this.gr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}gr(t){let e=0;return this.dr(t,n=>{e++}).next(()=>e)}dr(t,e){return A.forEach(this.mi,(n,s)=>this.yr(t,n,s).next(i=>i?A.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ti(t,a=>this.yr(t,a,e).next(u=>{u||(n++,i.removeEntry(a,B.min()))})).next(()=>i.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.mi.set(e,t.currentSequenceNumber),A.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.mi.set(n,t.currentSequenceNumber),A.resolve()}removeReference(t,e,n){return this.mi.set(n,t.currentSequenceNumber),A.resolve()}updateLimboDocument(t,e){return this.mi.set(e,t.currentSequenceNumber),A.resolve()}li(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=ei(t.data.value)),e}yr(t,e,n){return A.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.mi.get(e);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
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
 */class kp{constructor(t){this.serializer=t}k(t,e,n,s){const i=new Pi("createOrUpgrade",e);n<1&&s>=1&&(function(c){c.createObjectStore(_s)}(t),function(c){c.createObjectStore(ns,{keyPath:Qm}),c.createObjectStore(Qt,{keyPath:bc,autoIncrement:!0}).createIndex(on,Cc,{unique:!0}),c.createObjectStore(Gn)}(t),Il(t),function(c){c.createObjectStore(tn)}(t));let a=A.resolve();return n<3&&s>=3&&(n!==0&&(function(c){c.deleteObjectStore($n),c.deleteObjectStore(Kn),c.deleteObjectStore(un)}(t),Il(t)),a=a.next(()=>function(c){const h=c.store(un),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put(hi,f)}(i))),n<4&&s>=4&&(n!==0&&(a=a.next(()=>function(c,h){return h.store(Qt).J().next(m=>{c.deleteObjectStore(Qt),c.createObjectStore(Qt,{keyPath:bc,autoIncrement:!0}).createIndex(on,Cc,{unique:!0});const p=h.store(Qt),v=m.map(x=>p.put(x));return A.waitFor(v)})}(t,i))),a=a.next(()=>{(function(c){c.createObjectStore(Qn,{keyPath:ng})})(t)})),n<5&&s>=5&&(a=a.next(()=>this.fi(i))),n<6&&s>=6&&(a=a.next(()=>(function(c){c.createObjectStore(rs)}(t),this.gi(i)))),n<7&&s>=7&&(a=a.next(()=>this.pi(i))),n<8&&s>=8&&(a=a.next(()=>this.yi(t,i))),n<9&&s>=9&&(a=a.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(t)})),n<10&&s>=10&&(a=a.next(()=>this.wi(i))),n<11&&s>=11&&(a=a.next(()=>{(function(c){c.createObjectStore(Vi,{keyPath:rg})})(t),function(c){c.createObjectStore(Si,{keyPath:sg})}(t)})),n<12&&s>=12&&(a=a.next(()=>{(function(c){const h=c.createObjectStore(bi,{keyPath:hg});h.createIndex(Uo,dg,{unique:!1}),h.createIndex(Th,fg,{unique:!1})})(t)})),n<13&&s>=13&&(a=a.next(()=>function(c){const h=c.createObjectStore(li,{keyPath:Hm});h.createIndex(Zs,Jm),h.createIndex(ph,Ym)}(t)).next(()=>this.Si(t,i)).next(()=>t.deleteObjectStore(tn))),n<14&&s>=14&&(a=a.next(()=>this.bi(t,i))),n<15&&s>=15&&(a=a.next(()=>function(c){c.createObjectStore(ma,{keyPath:ig,autoIncrement:!0}).createIndex(Bo,og,{unique:!1}),c.createObjectStore(Wr,{keyPath:ag}).createIndex(yh,ug,{unique:!1}),c.createObjectStore(Hr,{keyPath:cg}).createIndex(Ih,lg,{unique:!1})}(t))),n<16&&s>=16&&(a=a.next(()=>{e.objectStore(Wr).clear()}).next(()=>{e.objectStore(Hr).clear()})),n<17&&s>=17&&(a=a.next(()=>{(function(c){c.createObjectStore(ga,{keyPath:mg})})(t)})),n<18&&s>=18&&Yl()&&(a=a.next(()=>{e.objectStore(Wr).clear()}).next(()=>{e.objectStore(Hr).clear()})),a}gi(t){let e=0;return t.store(tn).ee((n,s)=>{e+=yi(s)}).next(()=>{const n={byteSize:e};return t.store(rs).put(qo,n)})}fi(t){const e=t.store(ns),n=t.store(Qt);return e.J().next(s=>A.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,Ne],[i.userId,i.lastAcknowledgedBatchId]);return n.J(on,a).next(u=>A.forEach(u,c=>{L(c.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:c.batchId});const h=nn(this.serializer,c);return Sd(t,i.userId,h).next(()=>{})}))}))}pi(t){const e=t.store($n),n=t.store(tn);return t.store(un).get(hi).next(s=>{const i=[];return n.ee((a,u)=>{const c=new $(a),h=function(m){return[0,Dt(m)]}(c);i.push(e.get(h).next(f=>f?A.resolve():(m=>e.put({targetId:0,path:Dt(m),sequenceNumber:s.highestListenSequenceNumber}))(c)))}).next(()=>A.waitFor(i))})}yi(t,e){t.createObjectStore(ss,{keyPath:eg});const n=e.store(ss),s=new Da,i=a=>{if(s.add(a)){const u=a.lastSegment(),c=a.popLast();return n.put({collectionId:u,parent:Dt(c)})}};return e.store(tn).ee({Y:!0},(a,u)=>{const c=new $(a);return i(c.popLast())}).next(()=>e.store(Gn).ee({Y:!0},([a,u,c],h)=>{const f=Xt(u);return i(f.popLast())}))}wi(t){const e=t.store(Kn);return e.ee((n,s)=>{const i=Kr(s),a=vd(this.serializer,i);return e.put(a)})}Si(t,e){const n=e.store(tn),s=[];return n.ee((i,a)=>{const u=e.store(li),c=function(m){return m.document?new k($.fromString(m.document.name).popFirst(5)):m.noDocument?k.fromSegments(m.noDocument.path):m.unknownDocument?k.fromSegments(m.unknownDocument.path):O(36783)}(a).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(h))}).next(()=>A.waitFor(s))}bi(t,e){const n=e.store(Qt),s=Fd(this.serializer),i=new Na(ji.Ai,this.serializer.gt);return n.J().next(a=>{const u=new Map;return a.forEach(c=>{let h=u.get(c.userId)??G();nn(this.serializer,c).keys().forEach(f=>h=h.add(f)),u.set(c.userId,h)}),A.forEach(u,(c,h)=>{const f=new At(h),m=Bi.yt(this.serializer,f),p=i.getIndexManager(f),v=Ui.yt(f,this.serializer,p,i.referenceDelegate);return new Md(s,v,m,p).recalculateAndSaveOverlaysForDocumentKeys(new jo(e,Mt.ce),c).next()})})}}function Il(r){r.createObjectStore($n,{keyPath:Zm}).createIndex(fa,tg,{unique:!0}),r.createObjectStore(Kn,{keyPath:"targetId"}).createIndex(_h,Xm,{unique:!0}),r.createObjectStore(un)}const Pe="IndexedDbPersistence",Vo=18e5,So=5e3,bo="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Od="main";class ka{constructor(t,e,n,s,i,a,u,c,h,f,m=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Di=i,this.window=a,this.document=u,this.Ci=h,this.Fi=f,this.Mi=m,this._i=null,this.ai=!1,this.isPrimary=!1,this.networkEnabled=!0,this.xi=null,this.inForeground=!1,this.Oi=null,this.Ni=null,this.Bi=Number.NEGATIVE_INFINITY,this.Li=p=>Promise.resolve(),!ka.v())throw new b(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new wp(this,s),this.ki=e+Od,this.serializer=new Ad(c),this.qi=new ee(this.ki,this.Mi,new kp(this.serializer)),this.ui=new hp,this.ci=new Ip(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Fd(this.serializer),this.hi=new lp,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&mt(Pe,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ui().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new b(P.FAILED_PRECONDITION,bo);return this.$i(),this.Wi(),this.Qi(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.ci.getHighestSequenceNumber(t))}).then(t=>{this._i=new Mt(t,this.Ci)}).then(()=>{this.ai=!0}).catch(t=>(this.qi&&this.qi.close(),Promise.reject(t)))}Gi(t){return this.Li=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.qi.K(async e=>{e.newVersion===null&&await t()})}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Di.enqueueAndForget(async()=>{this.started&&await this.Ui()}))}Ui(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>Ws(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.zi(t).next(e=>{e||(this.isPrimary=!1,this.Di.enqueueRetryable(()=>this.Li(!1)))})}).next(()=>this.ji(t)).next(e=>this.isPrimary&&!e?this.Ji(t).next(()=>!1):!!e&&this.Hi(t).next(()=>!0))).catch(t=>{if(je(t))return C(Pe,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return C(Pe,"Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.Di.enqueueRetryable(()=>this.Li(t)),this.isPrimary=t})}zi(t){return Br(t).get(Vn).next(e=>A.resolve(this.Zi(e)))}Xi(t){return Ws(t).delete(this.clientId)}async Yi(){if(this.isPrimary&&!this.es(this.Bi,Vo)){this.Bi=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const n=Tt(e,Qn);return n.J().next(s=>{const i=this.ts(s,Vo),a=s.filter(u=>i.indexOf(u)===-1);return A.forEach(a,u=>n.delete(u.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Ki)for(const e of t)this.Ki.removeItem(this.ns(e.clientId))}}Qi(){this.Ni=this.Di.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ui().then(()=>this.Yi()).then(()=>this.Qi()))}Zi(t){return!!t&&t.ownerId===this.clientId}ji(t){return this.Fi?A.resolve(!0):Br(t).get(Vn).next(e=>{if(e!==null&&this.es(e.leaseTimestampMs,So)&&!this.rs(e.ownerId)){if(this.Zi(e)&&this.networkEnabled)return!0;if(!this.Zi(e)){if(!e.allowTabSynchronization)throw new b(P.FAILED_PRECONDITION,bo);return!1}}return!(!this.networkEnabled||!this.inForeground)||Ws(t).J().next(n=>this.ts(n,So).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&C(Pe,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ai=!1,this.ss(),this.Ni&&(this.Ni.cancel(),this.Ni=null),this._s(),this.us(),await this.qi.runTransaction("shutdown","readwrite",[_s,Qn],t=>{const e=new jo(t,Mt.ce);return this.Ji(e).next(()=>this.Xi(e))}),this.qi.close(),this.cs()}ts(t,e){return t.filter(n=>this.es(n.updateTimeMs,e)&&!this.rs(n.clientId))}ls(){return this.runTransaction("getActiveClients","readonly",t=>Ws(t).J().next(e=>this.ts(e,Vo).map(n=>n.clientId)))}get started(){return this.ai}getGlobalsCache(){return this.ui}getMutationQueue(t,e){return Ui.yt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new yp(t,this.serializer.gt.databaseId)}getDocumentOverlayCache(t){return Bi.yt(this.serializer,t)}getBundleCache(){return this.hi}runTransaction(t,e,n){C(Pe,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=function(c){return c===18?_g:c===17?vh:c===16?pg:c===15?pa:c===14?Ah:c===13?wh:c===12?gg:c===11?Eh:void O(60245)}(this.Mi);let a;return this.qi.runTransaction(t,s,i,u=>(a=new jo(u,this._i?this._i.next():Mt.ce),e==="readwrite-primary"?this.zi(a).next(c=>!!c||this.ji(a)).next(c=>{if(!c)throw mt(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Di.enqueueRetryable(()=>this.Li(!1)),new b(P.FAILED_PRECONDITION,hh);return n(a)}).next(c=>this.Hi(a).next(()=>c)):this.hs(a).next(()=>n(a)))).then(u=>(a.raiseOnCommittedEvent(),u))}hs(t){return Br(t).get(Vn).next(e=>{if(e!==null&&this.es(e.leaseTimestampMs,So)&&!this.rs(e.ownerId)&&!this.Zi(e)&&!(this.Fi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new b(P.FAILED_PRECONDITION,bo)})}Hi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Br(t).put(Vn,e)}static v(){return ee.v()}Ji(t){const e=Br(t);return e.get(Vn).next(n=>this.Zi(n)?(C(Pe,"Releasing primary lease."),e.delete(Vn)):A.resolve())}es(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(mt(`Detected an update time that is in the future: ${t} > ${n}`),!1))}$i(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Oi=()=>{this.Di.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ui()))},this.document.addEventListener("visibilitychange",this.Oi),this.inForeground=this.document.visibilityState==="visible")}_s(){this.Oi&&(this.document.removeEventListener("visibilitychange",this.Oi),this.Oi=null)}Wi(){var t;typeof((t=this.window)==null?void 0:t.addEventListener)=="function"&&(this.xi=()=>{this.ss();const e=/(?:Version|Mobile)\/1[456]/;Jl()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Di.enterRestrictedMode(!0),this.Di.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.xi))}us(){this.xi&&(this.window.removeEventListener("pagehide",this.xi),this.xi=null)}rs(t){var e;try{const n=((e=this.Ki)==null?void 0:e.getItem(this.ns(t)))!==null;return C(Pe,`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return mt(Pe,"Failed to get zombied client id.",n),!1}}ss(){if(this.Ki)try{this.Ki.setItem(this.ns(this.clientId),String(Date.now()))}catch(t){mt("Failed to set zombie client id.",t)}}cs(){if(this.Ki)try{this.Ki.removeItem(this.ns(this.clientId))}catch{}}ns(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function Br(r){return Tt(r,_s)}function Ws(r){return Tt(r,Qn)}function Fa(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
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
 */class Ma{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Ps=n,this.Ts=s}static Is(t,e){let n=G(),s=G();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ma(t,e.fromCache,n,s)}}/**
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
 */class Fp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Ld{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=function(){return Jl()?8:fh(ui())>0?6:4}()}initialize(t,e){this.ds=t,this.indexManager=e,this.Es=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.fs(t,e).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.gs(t,e,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Fp;return this.ps(t,e,a).next(u=>{if(i.result=u,this.Rs)return this.ys(t,e,a,u.size)})}).next(()=>i.result)}ys(t,e,n,s){return n.documentReadCount<this.As?(Nn()<=ae.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",kn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),A.resolve()):(Nn()<=ae.DEBUG&&C("QueryEngine","Query:",kn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Vs*s?(Nn()<=ae.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",kn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,xt(e))):A.resolve())}fs(t,e){if(zc(e))return A.resolve(null);let n=xt(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=mi(e,null,"F"),n=xt(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const a=G(...i);return this.ds.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,n).next(c=>{const h=this.ws(e,u);return this.Ss(e,h,a,c.readTime)?this.fs(t,mi(e,null,"F")):this.bs(t,h,e,c)}))})))}gs(t,e,n,s){return zc(e)||s.isEqual(B.min())?A.resolve(null):this.ds.getDocuments(t,n).next(i=>{const a=this.ws(e,i);return this.Ss(e,a,n,s)?A.resolve(null):(Nn()<=ae.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),kn(e)),this.bs(t,a,e,ch(s,Un)).next(u=>u))})}ws(t,e){let n=new et(Hh(t));return e.forEach((s,i)=>{Ts(t,i)&&(n=n.add(i))}),n}Ss(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ps(t,e,n){return Nn()<=ae.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",kn(e)),this.ds.getDocumentsMatchingQuery(t,e,Kt.min(),n)}bs(t,e,n,s){return this.ds.getDocumentsMatchingQuery(t,n,s).next(i=>(e.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
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
 */const Oa="LocalStore",Mp=3e8;class Op{constructor(t,e,n,s){this.persistence=t,this.Ds=e,this.serializer=s,this.Cs=new st(z),this.vs=new fe(i=>dn(i),ys),this.Fs=new Map,this.Ms=t.getRemoteDocumentCache(),this.ci=t.getTargetCache(),this.hi=t.getBundleCache(),this.xs(n)}xs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Md(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Cs))}}function qd(r,t,e,n){return new Op(r,t,e,n)}async function Bd(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,e.xs(t),e.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],u=[];let c=G();for(const h of s){a.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return e.localDocuments.getDocuments(n,c).next(h=>({Os:h,removedBatchIds:a,addedBatchIds:u}))})})}function Lp(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),i=e.Ms.newChangeBuffer({trackRemovals:!0});return function(u,c,h,f){const m=h.batch,p=m.keys();let v=A.resolve();return p.forEach(x=>{v=v.next(()=>f.getEntry(c,x)).next(N=>{const D=h.docVersions.get(x);L(D!==null,48541),N.version.compareTo(D)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),v.next(()=>u.mutationQueue.removeMutationBatch(c,m))}(e,n,t,i).next(()=>i.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let c=G();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function Ud(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.ci.getLastRemoteSnapshotVersion(e))}function qp(r,t){const e=F(r),n=t.snapshotVersion;let s=e.Cs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=e.Ms.newChangeBuffer({trackRemovals:!0});s=e.Cs;const u=[];t.targetChanges.forEach((f,m)=>{const p=s.get(m);if(!p)return;u.push(e.ci.removeMatchingKeys(i,f.removedDocuments,m).next(()=>e.ci.addMatchingKeys(i,f.addedDocuments,m)));let v=p.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(m)!==null?v=v.withResumeToken(ft.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,n)),s=s.insert(m,v),function(N,D,q){return N.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Mp?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(p,v,f)&&u.push(e.ci.updateTargetData(i,v))});let c=Lt(),h=G();if(t.documentUpdates.forEach(f=>{t.resolvedLimboDocuments.has(f)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,f))}),u.push(jd(i,a,t.documentUpdates).next(f=>{c=f.Ns,h=f.Bs})),!n.isEqual(B.min())){const f=e.ci.getLastRemoteSnapshotVersion(i).next(m=>e.ci.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(f)}return A.waitFor(u).next(()=>a.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(e.Cs=s,i))}function jd(r,t,e){let n=G(),s=G();return e.forEach(i=>n=n.add(i)),t.getEntries(r,n).next(i=>{let a=Lt();return e.forEach((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(B.min())?(t.removeEntry(u,c.readTime),a=a.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(t.addEntry(c),a=a.insert(u,c)):C(Oa,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)}),{Ns:a,Bs:s}})}function Bp(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=Ne),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function er(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.ci.getTargetData(n,t).next(i=>i?(s=i,A.resolve(s)):e.ci.allocateTargetId(n).next(a=>(s=new te(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.ci.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.Cs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Cs=e.Cs.insert(n.targetId,n),e.vs.set(t,n.targetId)),n})}async function nr(r,t,e){const n=F(r),s=n.Cs.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!je(a))throw a;C(Oa,`Failed to update sequence numbers for target ${t}: ${a}`)}n.Cs=n.Cs.remove(t),n.vs.delete(s.target)}function Ti(r,t,e){const n=F(r);let s=B.min(),i=G();return n.persistence.runTransaction("Execute query","readwrite",a=>function(c,h,f){const m=F(c),p=m.vs.get(f);return p!==void 0?A.resolve(m.Cs.get(p)):m.ci.getTargetData(h,f)}(n,a,xt(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.ci.getMatchingKeysForTargetId(a,u.targetId).next(c=>{i=c})}).next(()=>n.Ds.getDocumentsMatchingQuery(a,t,e?s:B.min(),e?i:G())).next(u=>(Kd(n,Wh(t),u),{documents:u,Ls:i})))}function zd(r,t){const e=F(r),n=F(e.ci),s=e.Cs.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",i=>n.Rt(i,t).next(a=>a?a.target:null))}function Gd(r,t){const e=F(r),n=e.Fs.get(t)||B.min();return e.persistence.runTransaction("Get new document changes","readonly",s=>e.Ms.getAllFromCollectionGroup(s,t,ch(n,Un),Number.MAX_SAFE_INTEGER)).then(s=>(Kd(e,t,s),s))}function Kd(r,t,e){let n=r.Fs.get(t)||B.min();e.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.Fs.set(t,n)}async function Up(r,t,e,n){const s=F(r);let i=G(),a=Lt();for(const h of e){const f=t.ks(h.metadata.name);h.document&&(i=i.add(f));const m=t.qs(h);m.setReadTime(t.Ks(h.metadata.readTime)),a=a.insert(f,m)}const u=s.Ms.newChangeBuffer({trackRemovals:!0}),c=await er(s,function(f){return xt(ur($.fromString(`__bundle__/docs/${f}`)))}(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",h=>jd(h,u,a).next(f=>(u.apply(h),f)).next(f=>s.ci.removeMatchingKeysForTargetId(h,c.targetId).next(()=>s.ci.addMatchingKeys(h,i,c.targetId)).next(()=>s.localDocuments.getLocalViewOfDocuments(h,f.Ns,f.Bs)).next(()=>f.Ns)))}async function jp(r,t,e=G()){const n=await er(r,xt(qi(t.bundledQuery))),s=F(r);return s.persistence.runTransaction("Save named query","readwrite",i=>{const a=gt(t.readTime);if(n.snapshotVersion.compareTo(a)>=0)return s.hi.saveNamedQuery(i,t);const u=n.withResumeToken(ft.EMPTY_BYTE_STRING,a);return s.Cs=s.Cs.insert(u.targetId,u),s.ci.updateTargetData(i,u).next(()=>s.ci.removeMatchingKeysForTargetId(i,n.targetId)).next(()=>s.ci.addMatchingKeys(i,e,n.targetId)).next(()=>s.hi.saveNamedQuery(i,t))})}/**
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
 */const $d="firestore_clients";function Tl(r,t){return`${$d}_${r}_${t}`}const Qd="firestore_mutations";function El(r,t,e){let n=`${Qd}_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const Wd="firestore_targets";function Co(r,t){return`${Wd}_${r}_${t}`}/**
 * @license
 * Copyright 2018 Google LLC
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
 */const Yt="SharedClientState";class Ei{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static Us(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new b(s.error.code,s.error.message))),a?new Ei(t,e,s.state,i):(mt(Yt,`Failed to parse mutation state for ID '${e}': ${n}`),null)}$s(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class ts{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Us(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new b(n.error.code,n.error.message))),i?new ts(t,n.state,s):(mt(Yt,`Failed to parse target state for ID '${t}': ${e}`),null)}$s(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class wi{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Us(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Ea();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=mh(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new wi(t,i):(mt(Yt,`Failed to parse client data for instance '${t}': ${e}`),null)}}class La{constructor(t,e){this.clientId=t,this.onlineState=e}static Us(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new La(e.clientId,e.onlineState):(mt(Yt,`Failed to parse online state: ${t}`),null)}}class ea{constructor(){this.activeTargetIds=Ea()}Ws(t){this.activeTargetIds=this.activeTargetIds.add(t)}Qs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}$s(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Do{constructor(t,e,n,s,i){this.window=t,this.Di=e,this.persistenceKey=n,this.Gs=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.zs=this.js.bind(this),this.Js=new st(z),this.started=!1,this.Hs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Zs=Tl(this.persistenceKey,this.Gs),this.Xs=function(c){return`firestore_sequence_number_${c}`}(this.persistenceKey),this.Js=this.Js.insert(this.Gs,new ea),this.Ys=new RegExp(`^${$d}_${a}_([^_]*)$`),this.eo=new RegExp(`^${Qd}_${a}_(\\d+)(?:_(.*))?$`),this.no=new RegExp(`^${Wd}_${a}_(\\d+)$`),this.ro=function(c){return`firestore_online_state_${c}`}(this.persistenceKey),this.io=function(c){return`firestore_bundle_loaded_v2_${c}`}(this.persistenceKey),this.window.addEventListener("storage",this.zs)}static v(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.ls();for(const n of t){if(n===this.Gs)continue;const s=this.getItem(Tl(this.persistenceKey,n));if(s){const i=wi.Us(n,s);i&&(this.Js=this.Js.insert(i.clientId,i))}}this.so();const e=this.storage.getItem(this.ro);if(e){const n=this.oo(e);n&&this._o(n)}for(const n of this.Hs)this.js(n);this.Hs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(t){this.setItem(this.Xs,JSON.stringify(t))}getAllActiveQueryTargets(){return this.ao(this.Js)}isActiveQueryTarget(t){let e=!1;return this.Js.forEach((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)}),e}addPendingMutation(t){this.uo(t,"pending")}updateMutationState(t,e,n){this.uo(t,e,n),this.co(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(Co(this.persistenceKey,t));if(s){const i=ts.Us(t,s);i&&(n=i.state)}}return e&&this.lo.Ws(t),this.so(),n}removeLocalQueryTarget(t){this.lo.Qs(t),this.so()}isLocalQueryTarget(t){return this.lo.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(Co(this.persistenceKey,t))}updateQueryState(t,e,n){this.ho(t,e,n)}handleUserChange(t,e,n){e.forEach(s=>{this.co(s)}),this.currentUser=t,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(t){this.Po(t)}notifyBundleLoaded(t){this.To(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.zs),this.removeItem(this.Zs),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return C(Yt,"READ",t,e),e}setItem(t,e){C(Yt,"SET",t,e),this.storage.setItem(t,e)}removeItem(t){C(Yt,"REMOVE",t),this.storage.removeItem(t)}js(t){const e=t;if(e.storageArea===this.storage){if(C(Yt,"EVENT",e.key,e.newValue),e.key===this.Zs)return void mt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Di.enqueueRetryable(async()=>{if(this.started){if(e.key!==null){if(this.Ys.test(e.key)){if(e.newValue==null){const n=this.Io(e.key);return this.Eo(n,null)}{const n=this.Ro(e.key,e.newValue);if(n)return this.Eo(n.clientId,n)}}else if(this.eo.test(e.key)){if(e.newValue!==null){const n=this.Ao(e.key,e.newValue);if(n)return this.Vo(n)}}else if(this.no.test(e.key)){if(e.newValue!==null){const n=this.mo(e.key,e.newValue);if(n)return this.fo(n)}}else if(e.key===this.ro){if(e.newValue!==null){const n=this.oo(e.newValue);if(n)return this._o(n)}}else if(e.key===this.Xs){const n=function(i){let a=Mt.ce;if(i!=null)try{const u=JSON.parse(i);L(typeof u=="number",30636,{po:i}),a=u}catch(u){mt(Yt,"Failed to read sequence number from WebStorage",u)}return a}(e.newValue);n!==Mt.ce&&this.sequenceNumberHandler(n)}else if(e.key===this.io){const n=this.yo(e.newValue);await Promise.all(n.map(s=>this.syncEngine.wo(s)))}}}else this.Hs.push(e)})}}get lo(){return this.Js.get(this.Gs)}so(){this.setItem(this.Zs,this.lo.$s())}uo(t,e,n){const s=new Ei(this.currentUser,t,e,n),i=El(this.persistenceKey,this.currentUser,t);this.setItem(i,s.$s())}co(t){const e=El(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Po(t){const e={clientId:this.Gs,onlineState:t};this.storage.setItem(this.ro,JSON.stringify(e))}ho(t,e,n){const s=Co(this.persistenceKey,t),i=new ts(t,e,n);this.setItem(s,i.$s())}To(t){const e=JSON.stringify(Array.from(t));this.setItem(this.io,e)}Io(t){const e=this.Ys.exec(t);return e?e[1]:null}Ro(t,e){const n=this.Io(t);return wi.Us(n,e)}Ao(t,e){const n=this.eo.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Ei.Us(new At(i),s,e)}mo(t,e){const n=this.no.exec(t),s=Number(n[1]);return ts.Us(s,e)}oo(t){return La.Us(t)}yo(t){return JSON.parse(t)}async Vo(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.So(t.batchId,t.state,t.error);C(Yt,`Ignoring mutation for non-active user ${t.user.uid}`)}fo(t){return this.syncEngine.bo(t.targetId,t.state,t.error)}Eo(t,e){const n=e?this.Js.insert(t,e):this.Js.remove(t),s=this.ao(this.Js),i=this.ao(n),a=[],u=[];return i.forEach(c=>{s.has(c)||a.push(c)}),s.forEach(c=>{i.has(c)||u.push(c)}),this.syncEngine.Do(a,u).then(()=>{this.Js=n})}_o(t){this.Js.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}ao(t){let e=Ea();return t.forEach((n,s)=>{e=e.unionWith(s.activeTargetIds)}),e}}class Hd{constructor(){this.Co=new ea,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Co.Ws(t),this.vo[t]||"not-current"}updateQueryState(t,e,n){this.vo[t]=e}removeLocalQueryTarget(t){this.Co.Qs(t)}isLocalQueryTarget(t){return this.Co.activeTargetIds.has(t)}clearQueryState(t){delete this.vo[t]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(t){return this.Co.activeTargetIds.has(t)}start(){return this.Co=new ea,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class zp{Fo(t){}shutdown(){}}/**
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
 */const wl="ConnectivityMonitor";class Al{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(t){this.Bo.push(t)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){C(wl,"Network connectivity changed: AVAILABLE");for(const t of this.Bo)t(0)}No(){C(wl,"Network connectivity changed: UNAVAILABLE");for(const t of this.Bo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Hs=null;function na(){return Hs===null?Hs=function(){return 268435456+Math.round(2147483648*Math.random())}():Hs++,"0x"+Hs.toString(16)}/**
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
 */const xo="RestConnection",Gp={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Kp{get ko(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=e+"://"+t.host,this.Ko=`projects/${n}/databases/${s}`,this.Uo=this.databaseId.database===os?`project_id=${n}`:`project_id=${n}&database_id=${s}`}$o(t,e,n,s,i){const a=na(),u=this.Wo(t,e.toUriEncodedString());C(xo,`Sending RPC '${t}' ${a}:`,u,n);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(c,s,i);const{host:h}=new URL(u),f=aa(h);return this.Go(t,u,c,n,f).then(m=>(C(xo,`Received RPC '${t}' ${a}: `,m),m),m=>{throw Gt(xo,`RPC '${t}' ${a} failed with error: `,m,"url: ",u,"request:",n),m})}zo(t,e,n,s,i,a){return this.$o(t,e,n,s,i)}Qo(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ar}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,i)=>t[i]=s),n&&n.headers.forEach((s,i)=>t[i]=s)}Wo(t,e){const n=Gp[t];let s=`${this.qo}/v1/${e}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
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
 */class $p{constructor(t){this.jo=t.jo,this.Jo=t.Jo}Ho(t){this.Zo=t}Xo(t){this.Yo=t}e_(t){this.t_=t}onMessage(t){this.n_=t}close(){this.Jo()}send(t){this.jo(t)}r_(){this.Zo()}i_(){this.Yo()}s_(t){this.t_(t)}o_(t){this.n_(t)}}/**
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
 */const bt="WebChannelConnection",Ur=(r,t,e)=>{r.listen(t,n=>{try{e(n)}catch(s){setTimeout(()=>{throw s},0)}})};class Ln extends Kp{constructor(t){super(t),this.__=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static a_(){if(!Ln.u_){const t=nh();Ur(t,eh.STAT_EVENT,e=>{e.stat===ko.PROXY?C(bt,"STAT_EVENT: detected buffering proxy"):e.stat===ko.NOPROXY&&C(bt,"STAT_EVENT: detected no buffering proxy")}),Ln.u_=!0}}Go(t,e,n,s,i){const a=na();return new Promise((u,c)=>{const h=new Zl;h.setWithCredentials(!0),h.listenOnce(th.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Ys.NO_ERROR:const m=h.getResponseJson();C(bt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(m)),u(m);break;case Ys.TIMEOUT:C(bt,`RPC '${t}' ${a} timed out`),c(new b(P.DEADLINE_EXCEEDED,"Request time out"));break;case Ys.HTTP_ERROR:const p=h.getStatus();if(C(bt,`RPC '${t}' ${a} failed with status:`,p,"response text:",h.getResponseText()),p>0){let v=h.getResponseJson();Array.isArray(v)&&(v=v[0]);const x=v==null?void 0:v.error;if(x&&x.status&&x.message){const N=function(q){const j=q.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(j)>=0?j:P.UNKNOWN}(x.status);c(new b(N,x.message))}else c(new b(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new b(P.UNAVAILABLE,"Connection failed."));break;default:O(9055,{c_:t,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{C(bt,`RPC '${t}' ${a} completed.`)}});const f=JSON.stringify(s);C(bt,`RPC '${t}' ${a} sending request:`,s),h.send(e,"POST",f,n,15)})}P_(t,e,n){const s=na(),i=[this.qo,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Qo(u.initMessageHeaders,e,n),u.encodeInitMessageHeaders=!0;const h=i.join("");C(bt,`Creating RPC '${t}' stream ${s}: ${h}`,u);const f=a.createWebChannel(h,u);this.T_(f);let m=!1,p=!1;const v=new $p({jo:x=>{p?C(bt,`Not sending because RPC '${t}' stream ${s} is closed:`,x):(m||(C(bt,`Opening RPC '${t}' stream ${s} transport.`),f.open(),m=!0),C(bt,`RPC '${t}' stream ${s} sending:`,x),f.send(x))},Jo:()=>f.close()});return Ur(f,jr.EventType.OPEN,()=>{p||(C(bt,`RPC '${t}' stream ${s} transport opened.`),v.r_())}),Ur(f,jr.EventType.CLOSE,()=>{p||(p=!0,C(bt,`RPC '${t}' stream ${s} transport closed`),v.s_(),this.I_(f))}),Ur(f,jr.EventType.ERROR,x=>{p||(p=!0,Gt(bt,`RPC '${t}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),v.s_(new b(P.UNAVAILABLE,"The operation could not be completed")))}),Ur(f,jr.EventType.MESSAGE,x=>{var N;if(!p){const D=x.data[0];L(!!D,16349);const q=D,j=(q==null?void 0:q.error)||((N=q[0])==null?void 0:N.error);if(j){C(bt,`RPC '${t}' stream ${s} received error:`,j);const U=j.status;let X=function(T){const _=pt[T];if(_!==void 0)return ad(_)}(U),J=j.message;U==="NOT_FOUND"&&J.includes("database")&&J.includes("does not exist")&&J.includes(this.databaseId.database)&&Gt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),X===void 0&&(X=P.INTERNAL,J="Unknown error status: "+U+" with message "+j.message),p=!0,v.s_(new b(X,J)),f.close()}else C(bt,`RPC '${t}' stream ${s} received:`,D),v.o_(D)}}),Ln.a_(),setTimeout(()=>{v.i_()},0),v}terminate(){this.__.forEach(t=>t.close()),this.__=[]}T_(t){this.__.push(t)}I_(t){this.__=this.__.filter(e=>e===t)}Qo(t,e,n){super.Qo(t,e,n),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return rh()}}/**
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
 */function Qp(r){return new Ln(r)}/**
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
 */function Jd(){return typeof window<"u"?window:null}function oi(){return typeof document<"u"?document:null}/**
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
 */function En(r){return new Zg(r,!0)}/**
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
 */Ln.u_=!1;class qa{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Di=t,this.timerId=e,this.E_=n,this.R_=s,this.A_=i,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(t){this.cancel();const e=Math.floor(this.V_+this.p_()),n=Math.max(0,Date.now()-this.m_),s=Math.max(0,e-n);s>0&&C("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),t())),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
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
 */const vl="PersistentStream";class Yd{constructor(t,e,n,s,i,a,u,c){this.Di=t,this.w_=n,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new qa(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(t,e){this.q_(),this.K_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(mt(e.toString()),mt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.e_(e)}U_(){}auth(){this.state=1;const t=this.W_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.b_===e&&this.Q_(n,s)},n=>{t(()=>{const s=new b(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.G_(s)})})}Q_(t,e){const n=this.W_(this.b_);this.stream=this.z_(t,e),this.stream.Ho(()=>{n(()=>this.listener.Ho())}),this.stream.Xo(()=>{n(()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.Xo()))}),this.stream.e_(s=>{n(()=>this.G_(s))}),this.stream.onMessage(s=>{n(()=>++this.v_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return C(vl,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Di.enqueueAndForget(()=>this.b_===t?e():(C(vl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Wp extends Yd{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=np(this.serializer,t),n=function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?gt(a.readTime):B.min()}(t);return this.listener.J_(e,n)}H_(t){const e={};e.database=Jo(this.serializer),e.addTarget=function(i,a){let u;const c=a.target;if(u=di(c)?{documents:pd(i,c)}:{query:Li(i,c).dt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=hd(i,a.resumeToken);const h=Wo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=tr(i,a.snapshotVersion.toTimestamp());const h=Wo(i,a.expectedCount);h!==null&&(u.expectedCount=h)}return u}(this.serializer,t);const n=sp(this.serializer,t);n&&(e.labels=n),this.k_(e)}Z_(t){const e={};e.database=Jo(this.serializer),e.removeTarget=t,this.k_(e)}}class Hp extends Yd{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return L(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,L(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){L(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();const e=rp(t.writeResults,t.commitTime),n=gt(t.commitTime);return this.listener.ta(n,e)}na(){const t={};t.database=Jo(this.serializer),this.k_(t)}Y_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>ds(this.serializer,n))};this.k_(e)}}/**
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
 */class Jp{}class Yp extends Jp{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new b(P.FAILED_PRECONDITION,"The client has already been terminated.")}$o(t,e,n,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.$o(t,Ho(e,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new b(P.UNKNOWN,i.toString())})}zo(t,e,n,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.zo(t,Ho(e,n),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new b(P.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}function Xp(r,t,e,n){return new Yp(r,t,e,n)}class Zp{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(mt(e),this._a=!1):C("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const oe="RemoteStore";class t_{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new le(1e3),this.Aa=new le(1001),this.Va=new Set,this.da=[],this.ma=i,this.ma.Fo(a=>{n.enqueueAndForget(async()=>{Ge(this)&&(C(oe,"Restarting streams for network reachability change."),await async function(c){const h=F(c);h.Va.add(4),await dr(h),h.fa.set("Unknown"),h.Va.delete(4),await ws(h)}(this))})}),this.fa=new Zp(n,s)}}async function ws(r){if(Ge(r))for(const t of r.da)await t(!0)}async function dr(r){for(const t of r.da)await t(!1)}function ra(r,t){return r.Ia.get(t)||void 0}function zi(r,t){const e=F(r),n=ra(e,t.targetId);if(n!==void 0&&e.Ta.has(n))return;const s=function(u,c){const h=ra(u,c);h!==void 0&&u.Ea.delete(h);const f=function(p,v){return v%2!=0?p.Aa.next():p.Ra.next()}(u,c);return u.Ia.set(c,f),u.Ea.set(f,c),f}(e,t.targetId);C(oe,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const i=new te(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ta.set(s,i),ja(e)?Ua(e):mr(e).x_()&&Ba(e,i)}function rr(r,t){const e=F(r),n=mr(e),s=ra(e,t);C(oe,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ta.delete(s),e.Ia.delete(t),e.Ea.delete(s),n.x_()&&Xd(e,s),e.Ta.size===0&&(n.x_()?n.B_():Ge(e)&&e.fa.set("Unknown"))}function Ba(r,t){if(r.ga.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=r.Ea.get(t.targetId);if(e===void 0)return void C(oe,"SDK target ID not found for remote ID: "+t.targetId);const n=r.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(n)}mr(r).H_(t)}function Xd(r,t){r.ga.$e(t),mr(r).Z_(t)}function Ua(r){r.ga=new Hg({getRemoteKeysForTarget:t=>{const e=r.Ea.get(t);return e!==void 0?r.remoteSyncer.getRemoteKeysForTarget(e):G()},Rt:t=>r.Ta.get(t)||null,lt:()=>r.datastore.serializer.databaseId}),mr(r).start(),r.fa.aa()}function ja(r){return Ge(r)&&!mr(r).M_()&&r.Ta.size>0}function Ge(r){return F(r).Va.size===0}function Zd(r){r.ga=void 0}async function e_(r){r.fa.set("Online")}async function n_(r){r.Ta.forEach((t,e)=>{Ba(r,t)})}async function r_(r,t){Zd(r),ja(r)?(r.fa.la(t),Ua(r)):r.fa.set("Unknown")}async function s_(r,t,e){if(r.fa.set("Online"),t instanceof ld&&t.state===2&&t.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds){if(s.Ta.has(u)){const c=s.Ea.get(u);c!==void 0&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Ea.delete(u)),s.Ta.delete(u)}s.ga.removeTarget(u)}}(r,t)}catch(n){C(oe,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Ai(r,n)}else if(t instanceof si?r.ga.Xe(t):t instanceof cd?r.ga.it(t):r.ga.tt(t),!e.isEqual(B.min()))try{const n=await Ud(r.localStore);e.compareTo(n)>=0&&await function(i,a){const u=i.ga.Pt(a);u.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=i.Ta.get(f);m&&i.Ta.set(f,m.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,f)=>{const m=i.Ta.get(h);if(!m)return;i.Ta.set(h,m.withResumeToken(ft.EMPTY_BYTE_STRING,m.snapshotVersion)),Xd(i,h);const p=new te(m.target,h,f,m.sequenceNumber);Ba(i,p)});const c=function(f,m){const p=new Map;m.targetChanges.forEach((x,N)=>{const D=f.Ea.get(N);D!==void 0&&p.set(D,x)});let v=new st(z);return m.targetMismatches.forEach((x,N)=>{const D=f.Ea.get(x);D!==void 0&&(v=v.insert(D,N))}),new hr(m.snapshotVersion,p,v,m.documentUpdates,m.resolvedLimboDocuments)}(i,u);return i.remoteSyncer.applyRemoteEvent(c)}(r,e)}catch(n){C(oe,"Failed to raise snapshot:",n),await Ai(r,n)}}async function Ai(r,t,e){if(!je(t))throw t;r.Va.add(1),await dr(r),r.fa.set("Offline"),e||(e=()=>Ud(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{C(oe,"Retrying IndexedDB access"),await e(),r.Va.delete(1),await ws(r)})}function tf(r,t){return t().catch(e=>Ai(r,e,t))}async function fr(r){const t=F(r),e=Le(t);let n=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:Ne;for(;i_(t);)try{const s=await Bp(t.localStore,n);if(s===null){t.Pa.length===0&&e.B_();break}n=s.batchId,o_(t,s)}catch(s){await Ai(t,s)}ef(t)&&nf(t)}function i_(r){return Ge(r)&&r.Pa.length<10}function o_(r,t){r.Pa.push(t);const e=Le(r);e.x_()&&e.X_&&e.Y_(t.mutations)}function ef(r){return Ge(r)&&!Le(r).M_()&&r.Pa.length>0}function nf(r){Le(r).start()}async function a_(r){Le(r).na()}async function u_(r){const t=Le(r);for(const e of r.Pa)t.Y_(e.mutations)}async function c_(r,t,e){const n=r.Pa.shift(),s=Pa.from(n,t,e);await tf(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await fr(r)}async function l_(r,t){t&&Le(r).X_&&await async function(n,s){if(function(a){return od(a)&&a!==P.ABORTED}(s.code)){const i=n.Pa.shift();Le(n).N_(),await tf(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await fr(n)}}(r,t),ef(r)&&nf(r)}async function Rl(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),C(oe,"RemoteStore received new credentials");const n=Ge(e);e.Va.add(3),await dr(e),n&&e.fa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Va.delete(3),await ws(e)}async function sa(r,t){const e=F(r);t?(e.Va.delete(2),await ws(e)):t||(e.Va.add(2),await dr(e),e.fa.set("Unknown"))}function mr(r){return r.pa||(r.pa=function(e,n,s){const i=F(e);return i.ia(),new Wp(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Ho:e_.bind(null,r),Xo:n_.bind(null,r),e_:r_.bind(null,r),J_:s_.bind(null,r)}),r.da.push(async t=>{t?(r.pa.N_(),ja(r)?Ua(r):r.fa.set("Unknown")):(await r.pa.stop(),Zd(r))})),r.pa}function Le(r){return r.ya||(r.ya=function(e,n,s){const i=F(e);return i.ia(),new Hp(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Ho:()=>Promise.resolve(),Xo:a_.bind(null,r),e_:l_.bind(null,r),ea:u_.bind(null,r),ta:c_.bind(null,r)}),r.da.push(async t=>{t?(r.ya.N_(),await fr(r)):(await r.ya.stop(),r.Pa.length>0&&(C(oe,`Stopping write stream with ${r.Pa.length} pending writes`),r.Pa=[]))})),r.ya}/**
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
 */class za{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new za(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new b(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function gr(r,t){if(mt("AsyncQueue",`${t}: ${r}`),je(r))return new b(P.UNAVAILABLE,`${t}: ${r}`);throw r}/**
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
 */class cn{static emptySet(t){return new cn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||k.comparator(e.key,n.key):(e,n)=>k.comparator(e.key,n.key),this.keyedMap=zr(),this.sortedSet=new st(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof cn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new cn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
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
 */class Pl{constructor(){this.wa=new st(k.comparator)}track(t){const e=t.doc.key,n=this.wa.get(e);n?t.type!==0&&n.type===3?this.wa=this.wa.insert(e,t):t.type===3&&n.type!==1?this.wa=this.wa.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.wa=this.wa.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.wa=this.wa.remove(e):t.type===1&&n.type===2?this.wa=this.wa.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.wa=this.wa.insert(e,{type:2,doc:t.doc}):O(63341,{At:t,Sa:n}):this.wa=this.wa.insert(e,t)}ba(){const t=[];return this.wa.inorderTraversal((e,n)=>{t.push(n)}),t}}class yn{constructor(t,e,n,s,i,a,u,c,h){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new yn(t,e,cn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Is(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
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
 */class h_{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some(t=>t.Fa())}}class d_{constructor(){this.queries=Vl(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(e,n){const s=F(e),i=s.queries;s.queries=Vl(),i.forEach((a,u)=>{for(const c of u.Ca)c.onError(n)})})(this,new b(P.ABORTED,"Firestore shutting down"))}}function Vl(){return new fe(r=>Qh(r),Is)}async function Ga(r,t){const e=F(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.va()&&t.Fa()&&(n=2):(i=new h_,n=t.Fa()?0:1);try{switch(n){case 0:i.Da=await e.onListen(s,!0);break;case 1:i.Da=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=gr(a,`Initialization of query '${kn(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.Ca.push(t),t.xa(e.onlineState),i.Da&&t.Oa(i.Da)&&$a(e)}async function Ka(r,t){const e=F(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.Ca.indexOf(t);a>=0&&(i.Ca.splice(a,1),i.Ca.length===0?s=t.Fa()?0:1:!i.va()&&t.Fa()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function f_(r,t){const e=F(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.Ca)u.Oa(s)&&(n=!0);a.Da=s}}n&&$a(e)}function m_(r,t,e){const n=F(r),s=n.queries.get(t);if(s)for(const i of s.Ca)i.onError(e);n.queries.delete(t)}function $a(r){r.Ma.forEach(t=>{t.next()})}var ia,Sl;(Sl=ia||(ia={})).Na="default",Sl.Cache="cache";class Qa{constructor(t,e,n){this.query=t,this.Ba=e,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=n||{}}Oa(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new yn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.La?this.qa(t)&&(this.Ba.next(t),e=!0):this.Ka(t,this.onlineState)&&(this.Ua(t),e=!0),this.ka=t,e}onError(t){this.Ba.error(t)}xa(t){this.onlineState=t;let e=!1;return this.ka&&!this.La&&this.Ka(this.ka,t)&&(this.Ua(this.ka),e=!0),e}Ka(t,e){if(!t.fromCache||!this.Fa())return!0;const n=e!=="Offline";return(!this.options.$a||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}qa(t){if(t.docChanges.length>0)return!0;const e=this.ka&&this.ka.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}Ua(t){t=yn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.La=!0,this.Ba.next(t)}Fa(){return this.options.source!==ia.Cache}}/**
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
 */class rf{constructor(t,e){this.Wa=t,this.byteLength=e}Qa(){return"metadata"in this.Wa}}/**
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
 */class bl{constructor(t){this.serializer=t}ks(t){return ne(this.serializer,t)}qs(t){return t.metadata.exists?Oi(this.serializer,t.document,!1):at.newNoDocument(this.ks(t.metadata.name),this.Ks(t.metadata.readTime))}Ks(t){return gt(t)}}class Wa{constructor(t,e){this.Ga=t,this.serializer=e,this.za=[],this.ja=[],this.collectionGroups=new Set,this.progress=sf(t)}get queries(){return this.za}get documents(){return this.ja}Ja(t){this.progress.bytesLoaded+=t.byteLength;let e=this.progress.documentsLoaded;if(t.Wa.namedQuery)this.za.push(t.Wa.namedQuery);else if(t.Wa.documentMetadata){this.ja.push({metadata:t.Wa.documentMetadata}),t.Wa.documentMetadata.exists||++e;const n=$.fromString(t.Wa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else t.Wa.document&&(this.ja[this.ja.length-1].document=t.Wa.document,++e);return e!==this.progress.documentsLoaded?(this.progress.documentsLoaded=e,{...this.progress}):null}Ha(t){const e=new Map,n=new bl(this.serializer);for(const s of t)if(s.metadata.queries){const i=n.ks(s.metadata.name);for(const a of s.metadata.queries){const u=(e.get(a)||G()).add(i);e.set(a,u)}}return e}async Za(t){const e=await Up(t,new bl(this.serializer),this.ja,this.Ga.id),n=this.Ha(this.documents);for(const s of this.za)await jp(t,s,n.get(s.name));return this.progress.taskState="Success",{progress:this.progress,Xa:this.collectionGroups,Ya:e}}}function sf(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
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
 */class of{constructor(t){this.key=t}}class af{constructor(t){this.key=t}}class uf{constructor(t,e){this.query=t,this.eu=e,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=G(),this.mutatedKeys=G(),this.ru=Hh(t),this.iu=new cn(this.ru)}get su(){return this.eu}ou(t,e){const n=e?e._u:new Pl,s=e?e.iu:this.iu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((f,m)=>{const p=s.get(f),v=Ts(this.query,m)?m:null,x=!!p&&this.mutatedKeys.has(p.key),N=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let D=!1;p&&v?p.data.isEqual(v.data)?x!==N&&(n.track({type:3,doc:v}),D=!0):this.au(p,v)||(n.track({type:2,doc:v}),D=!0,(c&&this.ru(v,c)>0||h&&this.ru(v,h)<0)&&(u=!0)):!p&&v?(n.track({type:0,doc:v}),D=!0):p&&!v&&(n.track({type:1,doc:p}),D=!0,(c||h)&&(u=!0)),D&&(v?(a=a.add(v),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{iu:a,_u:n,Ss:u,mutatedKeys:i}}au(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.iu;this.iu=t.iu,this.mutatedKeys=t.mutatedKeys;const a=t._u.ba();a.sort((f,m)=>function(v,x){const N=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return O(20277,{At:D})}};return N(v)-N(x)}(f.type,m.type)||this.ru(f.doc,m.doc)),this.uu(n),s=s??!1;const u=e&&!s?this.cu():[],c=this.nu.size===0&&this.current&&!s?1:0,h=c!==this.tu;return this.tu=c,a.length!==0||h?{snapshot:new yn(this.query,t.iu,i,a,t.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),lu:u}:{lu:u}}xa(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new Pl,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(t){return!this.eu.has(t)&&!!this.iu.has(t)&&!this.iu.get(t).hasLocalMutations}uu(t){t&&(t.addedDocuments.forEach(e=>this.eu=this.eu.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.eu=this.eu.delete(e)),this.current=t.current)}cu(){if(!this.current)return[];const t=this.nu;this.nu=G(),this.iu.forEach(n=>{this.hu(n.key)&&(this.nu=this.nu.add(n.key))});const e=[];return t.forEach(n=>{this.nu.has(n)||e.push(new af(n))}),this.nu.forEach(n=>{t.has(n)||e.push(new of(n))}),e}Pu(t){this.eu=t.Ls,this.nu=G();const e=this.ou(t.documents);return this.applyChanges(e,!0)}Tu(){return yn.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const Ke="SyncEngine";class g_{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class p_{constructor(t){this.key=t,this.Iu=!1}}class __{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Eu={},this.Ru=new fe(u=>Qh(u),Is),this.Au=new Map,this.Vu=new Set,this.du=new st(k.comparator),this.mu=new Map,this.fu=new xa,this.gu={},this.pu=new Map,this.yu=le._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function y_(r,t,e=!0){const n=Gi(r);let s;const i=n.Ru.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Tu()):s=await cf(n,t,e,!0),s}async function I_(r,t){const e=Gi(r);await cf(e,t,!0,!1)}async function cf(r,t,e,n){const s=await er(r.localStore,xt(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await Ha(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&zi(r.remoteStore,s),u}async function Ha(r,t,e,n,s){r.Su=(m,p,v)=>async function(N,D,q,j){let U=D.view.ou(q);U.Ss&&(U=await Ti(N.localStore,D.query,!1).then(({documents:T})=>D.view.ou(T,U)));const X=j&&j.targetChanges.get(D.targetId),J=j&&j.targetMismatches.get(D.targetId)!=null,Y=D.view.applyChanges(U,N.isPrimaryClient,X,J);return oa(N,D.targetId,Y.lu),Y.snapshot}(r,m,p,v);const i=await Ti(r.localStore,t,!0),a=new uf(t,i.Ls),u=a.ou(i.documents),c=Es.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),h=a.applyChanges(u,r.isPrimaryClient,c);oa(r,e,h.lu);const f=new g_(t,e,a);return r.Ru.set(t,f),r.Au.has(e)?r.Au.get(e).push(t):r.Au.set(e,[t]),h.snapshot}async function T_(r,t,e){const n=F(r),s=n.Ru.get(t),i=n.Au.get(s.targetId);if(i.length>1)return n.Au.set(s.targetId,i.filter(a=>!Is(a,t))),void n.Ru.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await nr(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&rr(n.remoteStore,s.targetId),sr(n,s.targetId)}).catch(Ue)):(sr(n,s.targetId),await nr(n.localStore,s.targetId,!0))}async function E_(r,t){const e=F(r),n=e.Ru.get(t),s=e.Au.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),rr(e.remoteStore,n.targetId))}async function w_(r,t,e){const n=Za(r);try{const s=await function(a,u){const c=F(a),h=Z.now(),f=u.reduce((v,x)=>v.add(x.key),G());let m,p;return c.persistence.runTransaction("Locally write mutations","readwrite",v=>{let x=Lt(),N=G();return c.Ms.getEntries(v,f).next(D=>{x=D,x.forEach((q,j)=>{j.isValidDocument()||(N=N.add(q))})}).next(()=>c.localDocuments.getOverlayedDocuments(v,x)).next(D=>{m=D;const q=[];for(const j of u){const U=Kg(j,m.get(j.key).overlayedDocument);U!=null&&q.push(new me(j.key,U,Mh(U.value.mapValue),lt.exists(!0)))}return c.mutationQueue.addMutationBatch(v,h,q,u)}).next(D=>{p=D;const q=D.applyToLocalDocumentSet(m,N);return c.documentOverlayCache.saveOverlays(v,D.batchId,q)})}).then(()=>({batchId:p.batchId,changes:Yh(m)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,u,c){let h=a.gu[a.currentUser.toKey()];h||(h=new st(z)),h=h.insert(u,c),a.gu[a.currentUser.toKey()]=h}(n,s.batchId,e),await ge(n,s.changes),await fr(n.remoteStore)}catch(s){const i=gr(s,"Failed to persist write");e.reject(i)}}async function lf(r,t){const e=F(r);try{const n=await qp(e.localStore,t);t.targetChanges.forEach((s,i)=>{const a=e.mu.get(i);a&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Iu=!0:s.modifiedDocuments.size>0?L(a.Iu,14607):s.removedDocuments.size>0&&(L(a.Iu,42227),a.Iu=!1))}),await ge(e,n,t)}catch(n){await Ue(n)}}function Cl(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Ru.forEach((i,a)=>{const u=a.view.xa(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const c=F(a);c.onlineState=u;let h=!1;c.queries.forEach((f,m)=>{for(const p of m.Ca)p.xa(u)&&(h=!0)}),h&&$a(c)}(n.eventManager,t),s.length&&n.Eu.J_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function A_(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.mu.get(t),i=s&&s.key;if(i){let a=new st(k.comparator);a=a.insert(i,at.newNoDocument(i,B.min()));const u=G().add(i),c=new hr(B.min(),new Map,new st(z),a,u);await lf(n,c),n.du=n.du.remove(i),n.mu.delete(t),Xa(n)}else await nr(n.localStore,t,!1).then(()=>sr(n,t,e)).catch(Ue)}async function v_(r,t){const e=F(r),n=t.batch.batchId;try{const s=await Lp(e.localStore,t);Ya(e,n,null),Ja(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await ge(e,s)}catch(s){await Ue(s)}}async function R_(r,t,e){const n=F(r);try{const s=await function(a,u){const c=F(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next(m=>(L(m!==null,37113),f=m.keys(),c.mutationQueue.removeMutationBatch(h,m))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(n.localStore,t);Ya(n,t,e),Ja(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await ge(n,s)}catch(s){await Ue(s)}}async function P_(r,t){const e=F(r);Ge(e.remoteStore)||C(Ke,"The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await function(a){const u=F(a);return u.persistence.runTransaction("Get highest unacknowledged batch id","readonly",c=>u.mutationQueue.getHighestUnacknowledgedBatchId(c))}(e.localStore);if(n===Ne)return void t.resolve();const s=e.pu.get(n)||[];s.push(t),e.pu.set(n,s)}catch(n){const s=gr(n,"Initialization of waitForPendingWrites() operation failed");t.reject(s)}}function Ja(r,t){(r.pu.get(t)||[]).forEach(e=>{e.resolve()}),r.pu.delete(t)}function Ya(r,t,e){const n=F(r);let s=n.gu[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.gu[n.currentUser.toKey()]=s}}function sr(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Au.get(t))r.Ru.delete(n),e&&r.Eu.bu(n,e);r.Au.delete(t),r.isPrimaryClient&&r.fu.Qr(t).forEach(n=>{r.fu.containsKey(n)||hf(r,n)})}function hf(r,t){r.Vu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(rr(r.remoteStore,e),r.du=r.du.remove(t),r.mu.delete(e),Xa(r))}function oa(r,t,e){for(const n of e)n instanceof of?(r.fu.addReference(n.key,t),V_(r,n)):n instanceof af?(C(Ke,"Document no longer in limbo: "+n.key),r.fu.removeReference(n.key,t),r.fu.containsKey(n.key)||hf(r,n.key)):O(19791,{Du:n})}function V_(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Vu.has(n)||(C(Ke,"New document in limbo: "+e),r.Vu.add(n),Xa(r))}function Xa(r){for(;r.Vu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Vu.values().next().value;r.Vu.delete(t);const e=new k($.fromString(t)),n=r.yu.next();r.mu.set(n,new p_(e)),r.du=r.du.insert(e,n),zi(r.remoteStore,new te(xt(ur(e.path)),n,"TargetPurposeLimboResolution",Mt.ce))}}async function ge(r,t,e){const n=F(r),s=[],i=[],a=[];n.Ru.isEmpty()||(n.Ru.forEach((u,c)=>{a.push(n.Su(c,t,e).then(h=>{var f;if((h||e)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=e==null?void 0:e.targetChanges.get(c.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Ma.Is(c.targetId,h);i.push(m)}}))}),await Promise.all(a),n.Eu.J_(s),await async function(c,h){const f=F(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>A.forEach(h,p=>A.forEach(p.Ps,v=>f.persistence.referenceDelegate.addReference(m,p.targetId,v)).next(()=>A.forEach(p.Ts,v=>f.persistence.referenceDelegate.removeReference(m,p.targetId,v)))))}catch(m){if(!je(m))throw m;C(Oa,"Failed to update sequence numbers: "+m)}for(const m of h){const p=m.targetId;if(!m.fromCache){const v=f.Cs.get(p),x=v.snapshotVersion,N=v.withLastLimboFreeSnapshotVersion(x);f.Cs=f.Cs.insert(p,N)}}}(n.localStore,i))}async function S_(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){C(Ke,"User change. New user:",t.toKey());const n=await Bd(e.localStore,t);e.currentUser=t,function(i,a){i.pu.forEach(u=>{u.forEach(c=>{c.reject(new b(P.CANCELLED,a))})}),i.pu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await ge(e,n.Os)}}function b_(r,t){const e=F(r),n=e.mu.get(t);if(n&&n.Iu)return G().add(n.key);{let s=G();const i=e.Au.get(t);if(!i)return s;for(const a of i){const u=e.Ru.get(a);s=s.unionWith(u.view.su)}return s}}async function C_(r,t){const e=F(r),n=await Ti(e.localStore,t.query,!0),s=t.view.Pu(n);return e.isPrimaryClient&&oa(e,t.targetId,s.lu),s}async function D_(r,t){const e=F(r);return Gd(e.localStore,t).then(n=>ge(e,n))}async function x_(r,t,e,n){const s=F(r),i=await function(u,c){const h=F(u),f=F(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",m=>f.Zn(m,c).next(p=>p?h.localDocuments.getDocuments(m,p):A.resolve(null)))}(s.localStore,t);i!==null?(e==="pending"?await fr(s.remoteStore):e==="acknowledged"||e==="rejected"?(Ya(s,t,n||null),Ja(s,t),function(u,c){F(F(u).mutationQueue).tr(c)}(s.localStore,t)):O(6720,"Unknown batchState",{Cu:e}),await ge(s,i)):C(Ke,"Cannot apply mutation batch with id: "+t)}async function N_(r,t){const e=F(r);if(Gi(e),Za(e),t===!0&&e.wu!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await Dl(e,n.toArray());e.wu=!0,await sa(e.remoteStore,!0);for(const i of s)zi(e.remoteStore,i)}else if(t===!1&&e.wu!==!1){const n=[];let s=Promise.resolve();e.Au.forEach((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then(()=>(sr(e,a),nr(e.localStore,a,!0))),rr(e.remoteStore,a)}),await s,await Dl(e,n),function(a){const u=F(a);u.mu.forEach((c,h)=>{rr(u.remoteStore,h)}),u.fu.Gr(),u.mu=new Map,u.du=new st(k.comparator)}(e),e.wu=!1,await sa(e.remoteStore,!1)}}async function Dl(r,t,e){const n=F(r),s=[],i=[];for(const a of t){let u;const c=n.Au.get(a);if(c&&c.length!==0){u=await er(n.localStore,xt(c[0]));for(const h of c){const f=n.Ru.get(h),m=await C_(n,f);m.snapshot&&i.push(m.snapshot)}}else{const h=await zd(n.localStore,a);u=await er(n.localStore,h),await Ha(n,df(h),a,!1,u.resumeToken)}s.push(u)}return n.Eu.J_(i),s}function df(r){return Gh(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function k_(r){return function(e){return F(F(e).persistence).ls()}(F(r).localStore)}async function F_(r,t,e,n){const s=F(r);if(s.wu)return void C(Ke,"Ignoring unexpected query state notification.");const i=s.Au.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await Gd(s.localStore,Wh(i[0])),u=hr.createSynthesizedRemoteEventForCurrentChange(t,e==="current",ft.EMPTY_BYTE_STRING);await ge(s,a,u);break}case"rejected":await nr(s.localStore,t,!0),sr(s,t,n);break;default:O(64155,e)}}async function M_(r,t,e){const n=Gi(r);if(n.wu){for(const s of t){if(n.Au.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){C(Ke,"Adding an already active target "+s);continue}const i=await zd(n.localStore,s),a=await er(n.localStore,i);await Ha(n,df(i),a.targetId,!1,a.resumeToken),zi(n.remoteStore,a)}for(const s of e)n.Au.has(s)&&await nr(n.localStore,s,!1).then(()=>{rr(n.remoteStore,s),sr(n,s)}).catch(Ue)}}function Gi(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=lf.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=b_.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=A_.bind(null,t),t.Eu.J_=f_.bind(null,t.eventManager),t.Eu.bu=m_.bind(null,t.eventManager),t}function Za(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=v_.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=R_.bind(null,t),t}function O_(r,t,e){const n=F(r);(async function(i,a,u){try{const c=await a.getMetadata();if(await function(v,x){const N=F(v),D=gt(x.createTime);return N.persistence.runTransaction("hasNewerBundle","readonly",q=>N.hi.getBundleMetadata(q,x.id)).then(q=>!!q&&q.createTime.compareTo(D)>=0)}(i.localStore,c))return await a.close(),u._completeWith(function(v){return{taskState:"Success",documentsLoaded:v.totalDocuments,bytesLoaded:v.totalBytes,totalDocuments:v.totalDocuments,totalBytes:v.totalBytes}}(c)),Promise.resolve(new Set);u._updateProgress(sf(c));const h=new Wa(c,a.serializer);let f=await a.vu();for(;f;){const p=await h.Ja(f);p&&u._updateProgress(p),f=await a.vu()}const m=await h.Za(i.localStore);return await ge(i,m.Ya,void 0),await function(v,x){const N=F(v);return N.persistence.runTransaction("Save bundle","readwrite",D=>N.hi.saveBundleMetadata(D,x))}(i.localStore,c),u._completeWith(m.progress),Promise.resolve(m.Xa)}catch(c){return Gt(Ke,`Loading bundle failed with ${c}`),u._failWith(c),Promise.resolve(new Set)}})(n,t,e).then(s=>{n.sharedClientState.notifyBundleLoaded(s)})}class ir{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=En(t.databaseInfo.databaseId),this.sharedClientState=this.Fu(t),this.persistence=this.Mu(t),await this.persistence.start(),this.localStore=this.xu(t),this.gcScheduler=this.Ou(t,this.localStore),this.indexBackfillerScheduler=this.Nu(t,this.localStore)}Ou(t,e){return null}Nu(t,e){return null}xu(t){return qd(this.persistence,new Ld,t.initialUser,this.serializer)}Mu(t){return new Na(ji.Ai,this.serializer)}Fu(t){return new Hd}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ir.provider={build:()=>new ir};class tu extends ir{constructor(t){super(),this.cacheSizeBytes=t}Ou(t,e){L(this.persistence.referenceDelegate instanceof Ii,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new xd(n,t.asyncQueue,e)}Mu(t){const e=this.cacheSizeBytes!==void 0?Ct.withCacheSize(this.cacheSizeBytes):Ct.DEFAULT;return new Na(n=>Ii.Ai(n,e),this.serializer)}}class eu extends ir{constructor(t,e,n){super(),this.Bu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.Bu.initialize(this,t),await Za(this.Bu.syncEngine),await fr(this.Bu.remoteStore),await this.persistence.Gi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}xu(t){return qd(this.persistence,new Ld,t.initialUser,this.serializer)}Ou(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new xd(n,t.asyncQueue,e)}Nu(t,e){const n=new Km(e,this.persistence);return new Gm(t.asyncQueue,n)}Mu(t){const e=Fa(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ct.withCacheSize(this.cacheSizeBytes):Ct.DEFAULT;return new ka(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,Jd(),oi(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Fu(t){return new Hd}}class ff extends eu{constructor(t,e){super(t,e,!1),this.Bu=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Bu.syncEngine;this.sharedClientState instanceof Do&&(this.sharedClientState.syncEngine={So:x_.bind(null,e),bo:F_.bind(null,e),Do:M_.bind(null,e),ls:k_.bind(null,e),wo:D_.bind(null,e)},await this.sharedClientState.start()),await this.persistence.Gi(async n=>{await N_(this.Bu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Fu(t){const e=Jd();if(!Do.v(e))throw new b(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Fa(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new Do(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class qe{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Cl(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=S_.bind(null,this.syncEngine),await sa(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new d_}()}createDatastore(t){const e=En(t.databaseInfo.databaseId),n=Qp(t.databaseInfo);return Xp(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,i,a,u){return new t_(n,s,i,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>Cl(this.syncEngine,e,0),function(){return Al.v()?new Al:new zp}())}createSyncEngine(t,e){return function(s,i,a,u,c,h,f){const m=new __(s,i,a,u,c,h);return f&&(m.wu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const i=F(s);C(oe,"RemoteStore shutting down."),i.Va.add(5),await dr(i),i.ma.shutdown(),i.fa.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}qe.provider={build:()=>new qe};function xl(r,t=10240){let e=0;return{async read(){if(e<r.byteLength){const n={value:r.slice(e,e+t),done:!1};return e+=t,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 *//**
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
 */class Ki{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Lu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Lu(this.observer.error,t):mt("Uncaught Error in snapshot listener:",t.toString()))}ku(){this.muted=!0}Lu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */class L_{constructor(t,e){this.qu=t,this.serializer=e,this.metadata=new Rt,this.buffer=new Uint8Array,this.Ku=function(){return new TextDecoder("utf-8")}(),this.Uu().then(n=>{n&&n.Qa()?this.metadata.resolve(n.Wa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n==null?void 0:n.Wa)}`))},n=>this.metadata.reject(n))}close(){return this.qu.cancel()}async getMetadata(){return this.metadata.promise}async vu(){return await this.getMetadata(),this.Uu()}async Uu(){const t=await this.$u();if(t===null)return null;const e=this.Ku.decode(t),n=Number(e);isNaN(n)&&this.Wu(`length string (${e}) is not valid number`);const s=await this.Qu(n);return new rf(JSON.parse(s),t.length+n)}Gu(){return this.buffer.findIndex(t=>t==="{".charCodeAt(0))}async $u(){for(;this.Gu()<0&&!await this.zu(););if(this.buffer.length===0)return null;const t=this.Gu();t<0&&this.Wu("Reached the end of bundle when a length string is expected.");const e=this.buffer.slice(0,t);return this.buffer=this.buffer.slice(t),e}async Qu(t){for(;this.buffer.length<t;)await this.zu()&&this.Wu("Reached the end of bundle when more is expected.");const e=this.Ku.decode(this.buffer.slice(0,t));return this.buffer=this.buffer.slice(t),e}Wu(t){throw this.qu.cancel(),new Error(`Invalid bundle format: ${t}`)}async zu(){const t=await this.qu.read();if(!t.done){const e=new Uint8Array(this.buffer.length+t.value.length);e.set(this.buffer),e.set(t.value,this.buffer.length),this.buffer=e}return t.done}}/**
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
 */class q_{constructor(t,e){this.bundleData=t,this.serializer=e,this.cursor=0,this.elements=[];let n=this.vu();if(!n||!n.Qa())throw new Error(`The first element of the bundle is not a metadata object, it is
         ${JSON.stringify(n==null?void 0:n.Wa)}`);this.metadata=n;do n=this.vu(),n!==null&&this.elements.push(n);while(n!==null)}getMetadata(){return this.metadata}ju(){return this.elements}vu(){if(this.cursor===this.bundleData.length)return null;const t=this.$u(),e=this.Qu(t);return new rf(JSON.parse(e),t)}Qu(t){if(this.cursor+t>this.bundleData.length)throw new b(P.INTERNAL,"Reached the end of bundle when more is expected.");return this.bundleData.slice(this.cursor,this.cursor+=t)}$u(){const t=this.cursor;let e=this.cursor;for(;e<this.bundleData.length;){if(this.bundleData[e]==="{"){if(e===t)throw new Error("First character is a bracket and not a number");return this.cursor=e,Number(this.bundleData.slice(t,e))}e++}throw new Error("Reached the end of bundle when more is expected.")}}/**
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
 */let B_=class{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new b(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await async function(s,i){const a=F(s),u={documents:i.map(m=>hs(a.serializer,m))},c=await a.zo("BatchGetDocuments",a.serializer.databaseId,$.emptyPath(),u,i.length),h=new Map;c.forEach(m=>{const p=ep(a.serializer,m);h.set(p.key.toString(),p)});const f=[];return i.forEach(m=>{const p=h.get(m.toString());L(!!p,55234,{key:m}),f.push(p)}),f}(this.datastore,t);return e.forEach(n=>this.recordVersion(n)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(t.toString())}delete(t){this.write(new lr(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((e,n)=>{const s=k.fromPath(n);this.mutations.push(new va(s,this.precondition(s)))}),await async function(n,s){const i=F(n),a={writes:s.map(u=>ds(i.serializer,u))};await i.$o("Commit",i.serializer.databaseId,$.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw O(50498,{Ju:t.constructor.name});e=B.min()}const n=this.readVersions.get(t.key.toString());if(n){if(!e.isEqual(n))throw new b(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(B.min())?lt.exists(!1):lt.updateTime(e):lt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(B.min()))throw new b(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return lt.updateTime(e)}return lt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}};/**
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
 */class U_{constructor(t,e,n,s,i){this.asyncQueue=t,this.datastore=e,this.options=n,this.updateFunction=s,this.deferred=i,this.Hu=n.maxAttempts,this.F_=new qa(this.asyncQueue,"transaction_retry")}Zu(){this.Hu-=1,this.Xu()}Xu(){this.F_.g_(async()=>{const t=new B_(this.datastore),e=this.Yu(t);e&&e.then(n=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(n)}).catch(s=>{this.ec(s)}))}).catch(n=>{this.ec(n)})})}Yu(t){try{const e=this.updateFunction(t);return!ps(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}ec(t){this.Hu>0&&this.tc(t)?(this.Hu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Xu(),Promise.resolve()))):this.deferred.reject(t)}tc(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!od(e)}return!1}}/**
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
 */const Be="FirestoreClient";class j_{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this._databaseInfo=s,this.user=At.UNAUTHENTICATED,this.clientId=ca.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{C(Be,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(C(Be,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=gr(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function No(r,t){r.asyncQueue.verifyOperationInProgress(),C(Be,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Bd(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=t}async function Nl(r,t){r.asyncQueue.verifyOperationInProgress();const e=await nu(r);C(Be,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Rl(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Rl(t.remoteStore,s)),r._onlineComponents=t}async function nu(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C(Be,"Using user provided OfflineComponentProvider");try{await No(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;Gt("Error using user provided cache. Falling back to memory cache: "+e),await No(r,new ir)}}else C(Be,"Using default OfflineComponentProvider"),await No(r,new tu(void 0));return r._offlineComponents}async function $i(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C(Be,"Using user provided OnlineComponentProvider"),await Nl(r,r._uninitializedComponentsProvider._online)):(C(Be,"Using default OnlineComponentProvider"),await Nl(r,new qe))),r._onlineComponents}function mf(r){return nu(r).then(t=>t.persistence)}function pr(r){return nu(r).then(t=>t.localStore)}function gf(r){return $i(r).then(t=>t.remoteStore)}function ru(r){return $i(r).then(t=>t.syncEngine)}function pf(r){return $i(r).then(t=>t.datastore)}async function or(r){const t=await $i(r),e=t.eventManager;return e.onListen=y_.bind(null,t.syncEngine),e.onUnlisten=T_.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=I_.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=E_.bind(null,t.syncEngine),e}function z_(r){return r.asyncQueue.enqueue(async()=>{const t=await mf(r),e=await gf(r);return t.setNetworkEnabled(!0),function(s){const i=F(s);return i.Va.delete(0),ws(i)}(e)})}function G_(r){return r.asyncQueue.enqueue(async()=>{const t=await mf(r),e=await gf(r);return t.setNetworkEnabled(!1),async function(s){const i=F(s);i.Va.add(0),await dr(i),i.fa.set("Offline")}(e)})}function K_(r,t,e,n){const s=new Ki(n),i=new Qa(t,s,e);return r.asyncQueue.enqueueAndForget(async()=>Ga(await or(r),i)),()=>{s.ku(),r.asyncQueue.enqueueAndForget(async()=>Ka(await or(r),i))}}function $_(r,t){const e=new Rt;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,a){try{const u=await function(h,f){const m=F(h);return m.persistence.runTransaction("read document","readonly",p=>m.localDocuments.getDocument(p,f))}(s,i);u.isFoundDocument()?a.resolve(u):u.isNoDocument()?a.resolve(null):a.reject(new b(P.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(u){const c=gr(u,`Failed to get document '${i} from cache`);a.reject(c)}}(await pr(r),t,e)),e.promise}function _f(r,t,e={}){const n=new Rt;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,c,h){const f=new Ki({next:p=>{f.ku(),a.enqueueAndForget(()=>Ka(i,m));const v=p.docs.has(u);!v&&p.fromCache?h.reject(new b(P.UNAVAILABLE,"Failed to get document because the client is offline.")):v&&p.fromCache&&c&&c.source==="server"?h.reject(new b(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(p)},error:p=>h.reject(p)}),m=new Qa(ur(u.path),f,{includeMetadataChanges:!0,$a:!0});return Ga(i,m)}(await or(r),r.asyncQueue,t,e,n)),n.promise}function Q_(r,t){const e=new Rt;return r.asyncQueue.enqueueAndForget(async()=>async function(s,i,a){try{const u=await Ti(s,i,!0),c=new uf(i,u.Ls),h=c.ou(u.documents),f=c.applyChanges(h,!1);a.resolve(f.snapshot)}catch(u){const c=gr(u,`Failed to execute query '${i} against cache`);a.reject(c)}}(await pr(r),t,e)),e.promise}function yf(r,t,e={}){const n=new Rt;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,c,h){const f=new Ki({next:p=>{f.ku(),a.enqueueAndForget(()=>Ka(i,m)),p.fromCache&&c.source==="server"?h.reject(new b(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(p)},error:p=>h.reject(p)}),m=new Qa(u,f,{includeMetadataChanges:!0,$a:!0});return Ga(i,m)}(await or(r),r.asyncQueue,t,e,n)),n.promise}function W_(r,t,e){const n=new Rt;return r.asyncQueue.enqueueAndForget(async()=>{try{const s=await pf(r);n.resolve(async function(a,u,c){var N;const h=F(a),{request:f,ft:m,parent:p}=_d(h.serializer,Kh(u),c);h.connection.ko||delete f.parent;const v=(await h.zo("RunAggregationQuery",h.serializer.databaseId,p,f,1)).filter(D=>!!D.result);L(v.length===1,64727);const x=(N=v[0].result)==null?void 0:N.aggregateFields;return Object.keys(x).reduce((D,q)=>(D[m[q]]=x[q],D),{})}(s,t,e))}catch(s){n.reject(s)}}),n.promise}function H_(r,t){const e=new Rt;return r.asyncQueue.enqueueAndForget(async()=>w_(await ru(r),t,e)),e.promise}function J_(r,t){const e=new Ki(t);return r.asyncQueue.enqueueAndForget(async()=>function(s,i){F(s).Ma.add(i),i.next()}(await or(r),e)),()=>{e.ku(),r.asyncQueue.enqueueAndForget(async()=>function(s,i){F(s).Ma.delete(i)}(await or(r),e))}}function Y_(r,t,e){const n=new Rt;return r.asyncQueue.enqueueAndForget(async()=>{const s=await pf(r);new U_(r.asyncQueue,s,e,t,n).Zu()}),n.promise}function X_(r,t,e,n){const s=function(a,u){let c;return c=typeof a=="string"?ud().encode(a):a,function(f,m){return new L_(f,m)}(function(f,m){if(f instanceof Uint8Array)return xl(f,m);if(f instanceof ArrayBuffer)return xl(new Uint8Array(f),m);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(c),u)}(e,En(t));r.asyncQueue.enqueueAndForget(async()=>{O_(await ru(r),s,n)})}function Z_(r,t){return r.asyncQueue.enqueue(async()=>function(n,s){const i=F(n);return i.persistence.runTransaction("Get named query","readonly",a=>i.hi.getNamedQuery(a,s))}(await pr(r),t))}function If(r,t){return function(n,s){return new q_(n,s)}(r,t)}function ty(r,t){return r.asyncQueue.enqueue(async()=>async function(n,s){const i=F(n),a=i.indexManager,u=[];return i.persistence.runTransaction("Configure indexes","readwrite",c=>a.getFieldIndexes(c).next(h=>function(m,p,v,x,N){m=[...m],p=[...p],m.sort(v),p.sort(v);const D=m.length,q=p.length;let j=0,U=0;for(;j<q&&U<D;){const X=v(m[U],p[j]);X<0?N(m[U++]):X>0?x(p[j++]):(j++,U++)}for(;j<q;)x(p[j++]);for(;U<D;)N(m[U++])}(h,s,Bm,f=>{u.push(a.addFieldIndex(c,f))},f=>{u.push(a.deleteFieldIndex(c,f))})).next(()=>A.waitFor(u)))}(await pr(r),t))}function ey(r,t){return r.asyncQueue.enqueue(async()=>function(n,s){F(n).Ds.Rs=s}(await pr(r),t))}function ny(r){return r.asyncQueue.enqueue(async()=>function(e){const n=F(e),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",i=>s.deleteAllFieldIndexes(i))}(await pr(r)))}/**
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
 */function Tf(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
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
 */const ry="ComponentProvider",kl=new Map;function sy(r,t,e,n,s){return new Ig(r,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Tf(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
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
 */const Ef="firestore.googleapis.com",Fl=!0;class Ml{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new b(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ef,this.ssl=Fl}else this.host=t.host,this.ssl=t.ssl??Fl;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Vd;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Dd)throw new b(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}qm("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Tf(t.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new b(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new b(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new b(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class As{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ml({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new b(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new b(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ml(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new bm;switch(n.type){case"firstParty":return new Nm(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new b(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=kl.get(e);n&&(C(ry,"Removing Datastore"),kl.delete(e),n.terminate())}(this),Promise.resolve()}}function iy(r,t,e,n={}){var h;r=Q(r,As);const s=aa(t),i=r._getSettings(),a={...i,emulatorOptions:r._getEmulatorOptions()},u=`${t}:${e}`;s&&Wl(`https://${u}`),i.host!==Ef&&i.host!==u&&Gt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:u,ssl:s,emulatorOptions:n};if(!gs(c,a)&&(r._setSettings(c),n.mockUserToken)){let f,m;if(typeof n.mockUserToken=="string")f=n.mockUserToken,m=At.MOCK_USER;else{f=_m(n.mockUserToken,(h=r._app)==null?void 0:h.options.projectId);const p=n.mockUserToken.sub||n.mockUserToken.user_id;if(!p)throw new b(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new At(p)}r._authCredentials=new Cm(new ih(f,m))}}/**
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
 */class Pt{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Pt(this.firestore,t,this._query)}}class nt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new re(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new nt(this.firestore,t,this._key)}toJSON(){return{type:nt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(In(e,nt._jsonSchema))return new nt(t,n||null,new k($.fromString(e.referencePath)))}}nt._jsonSchemaVersion="firestore/documentReference/1.0",nt._jsonSchema={type:_t("string",nt._jsonSchemaVersion),referencePath:_t("string")};class re extends Pt{constructor(t,e,n){super(t,e,ur(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new nt(this.firestore,null,new k(t))}withConverter(t){return new re(this.firestore,t,this._path)}}function Oy(r,t,...e){if(r=It(r),la("collection","path",t),r instanceof As){const n=$.fromString(t,...e);return vc(n),new re(r,null,n)}{if(!(r instanceof nt||r instanceof re))throw new b(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child($.fromString(t,...e));return vc(n),new re(r.firestore,null,n)}}function Ly(r,t){if(r=Q(r,As),la("collectionGroup","collection id",t),t.indexOf("/")>=0)throw new b(P.INVALID_ARGUMENT,`Invalid collection ID '${t}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Pt(r,null,function(n){return new de($.emptyPath(),n)}(t))}function oy(r,t,...e){if(r=It(r),arguments.length===1&&(t=ca.newId()),la("doc","path",t),r instanceof As){const n=$.fromString(t,...e);return Ac(n),new nt(r,null,new k(n))}{if(!(r instanceof nt||r instanceof re))throw new b(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child($.fromString(t,...e));return Ac(n),new nt(r.firestore,r instanceof re?r.converter:null,new k(n))}}function qy(r,t){return r=It(r),t=It(t),(r instanceof nt||r instanceof re)&&(t instanceof nt||t instanceof re)&&r.firestore===t.firestore&&r.path===t.path&&r.converter===t.converter}function wf(r,t){return r=It(r),t=It(t),r instanceof Pt&&t instanceof Pt&&r.firestore===t.firestore&&Is(r._query,t._query)&&r.converter===t.converter}/**
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
 */const Ol="AsyncQueue";class Ll{constructor(t=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new qa(this,"async_queue_retry"),this.cc=()=>{const n=oi();n&&C(Ol,"Visibility state changed to "+n.visibilityState),this.F_.y_()},this.lc=t;const e=oi();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.hc(),this.Pc(t)}enterRestrictedMode(t){if(!this.rc){this.rc=!0,this.ac=t||!1;const e=oi();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.cc)}}enqueue(t){if(this.hc(),this.rc)return new Promise(()=>{});const e=new Rt;return this.Pc(()=>this.rc&&this.ac?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.nc.push(t),this.Tc()))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(t){if(!je(t))throw t;C(Ol,"Operation failed with retryable error: "+t)}this.nc.length>0&&this.F_.g_(()=>this.Tc())}}Pc(t){const e=this.lc.then(()=>(this._c=!0,t().catch(n=>{throw this.oc=n,this._c=!1,mt("INTERNAL UNHANDLED ERROR: ",ql(n)),n}).then(n=>(this._c=!1,n))));return this.lc=e,e}enqueueAfterDelay(t,e,n){this.hc(),this.uc.indexOf(t)>-1&&(e=0);const s=za.createAndSchedule(this,t,e,n,i=>this.Ic(i));return this.sc.push(s),s}hc(){this.oc&&O(47125,{Ec:ql(this.oc)})}verifyOperationInProgress(){}async Rc(){let t;do t=this.lc,await t;while(t!==this.lc)}Ac(t){for(const e of this.sc)if(e.timerId===t)return!0;return!1}Vc(t){return this.Rc().then(()=>{this.sc.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.sc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Rc()})}dc(t){this.uc.push(t)}Ic(t){const e=this.sc.indexOf(t);this.sc.splice(e,1)}}function ql(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}/**
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
 */class ay{constructor(){this._progressObserver={},this._taskCompletionResolver=new Rt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(t,e,n){this._progressObserver={next:t,error:e,complete:n}}catch(t){return this._taskCompletionResolver.promise.catch(t)}then(t,e){return this._taskCompletionResolver.promise.then(t,e)}_completeWith(t){this._updateProgress(t),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(t)}_failWith(t){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(t),this._taskCompletionResolver.reject(t)}_updateProgress(t){this._lastProgress=t,this._progressObserver.next&&this._progressObserver.next(t)}}/**
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
 */const By=-1;class it extends As{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Ll,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Ll(t),this._firestoreClient=void 0,await t}}}function Uy(r,t,e){e||(e=os);const n=Hl(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(gs(i,t))return s;throw new b(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new b(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Dd)throw new b(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&aa(t.host)&&Wl(t.host),n.initialize({options:t,instanceIdentifier:e})}function jy(r,t){const e=typeof r=="object"?r:ym(),n=typeof r=="string"?r:t||os,s=Hl(e,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=Im("firestore");i&&iy(s,...i)}return s}function ht(r){if(r._terminated)throw new b(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Af(r),r._firestoreClient}function Af(r){var n,s,i,a;const t=r._freezeSettings(),e=sy(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,t);r._componentsProvider||(i=t.localCache)!=null&&i._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(r._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),r._firestoreClient=new j_(r._authCredentials,r._appCheckCredentials,r._queue,e,r._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(r._componentsProvider))}function zy(r,t){Gt("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();return vf(r,qe.provider,{build:n=>new eu(n,e.cacheSizeBytes,t==null?void 0:t.forceOwnership)}),Promise.resolve()}async function Gy(r){Gt("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();vf(r,qe.provider,{build:e=>new ff(e,t.cacheSizeBytes)})}function vf(r,t,e){if((r=Q(r,it))._firestoreClient||r._terminated)throw new b(P.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new b(P.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:t,_offline:e},Af(r)}function Ky(r){if(r._initialized&&!r._terminated)throw new b(P.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const t=new Rt;return r._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!ee.v())return Promise.resolve();const s=n+Od;await ee.delete(s)}(Fa(r._databaseId,r._persistenceKey)),t.resolve()}catch(e){t.reject(e)}}),t.promise}function $y(r){return function(e){const n=new Rt;return e.asyncQueue.enqueueAndForget(async()=>P_(await ru(e),n)),n.promise}(ht(r=Q(r,it)))}function Qy(r){return z_(ht(r=Q(r,it)))}function Wy(r){return G_(ht(r=Q(r,it)))}function Hy(r){return Tm(r.app,"firestore",r._databaseId.database),r._delete()}function Bl(r,t){const e=ht(r=Q(r,it)),n=new ay;return X_(e,r._databaseId,t,n),n}function uy(r,t){return Z_(ht(r=Q(r,it)),t).then(e=>e?new Pt(r,null,e.query):null)}/**
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
 */class Ut{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ut(ft.fromBase64String(t))}catch(e){throw new b(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ut(ft.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Ut._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(In(t,Ut._jsonSchema))return Ut.fromBase64String(t.bytes)}}Ut._jsonSchemaVersion="firestore/bytes/1.0",Ut._jsonSchema={type:_t("string",Ut._jsonSchemaVersion),bytes:_t("string")};/**
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
 */class _r{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new b(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ct(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function Jy(){return new _r(Oo)}/**
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
 */class pe{constructor(t){this._methodName=t}}/**
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
 */class se{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new b(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new b(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return z(this._lat,t._lat)||z(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:se._jsonSchemaVersion}}static fromJSON(t){if(In(t,se._jsonSchema))return new se(t.latitude,t.longitude)}}se._jsonSchemaVersion="firestore/geoPoint/1.0",se._jsonSchema={type:_t("string",se._jsonSchemaVersion),latitude:_t("number"),longitude:_t("number")};/**
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
 */class $t{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,t._values)}toJSON(){return{type:$t._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(In(t,$t._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new $t(t.vectorValues);throw new b(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}$t._jsonSchemaVersion="firestore/vectorValue/1.0",$t._jsonSchema={type:_t("string",$t._jsonSchemaVersion),vectorValues:_t("object")};/**
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
 */const cy=/^__.*__$/;class ly{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new me(t,this.data,this.fieldMask,e,this.fieldTransforms):new cr(t,this.data,e,this.fieldTransforms)}}class Rf{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return new me(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Pf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw O(40011,{dataSource:r})}}class Qi{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.mc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new Qi({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.yc(t),n}wc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),n=this.i({path:e,arrayElement:!1});return n.mc(),n}Sc(t){return this.i({path:void 0,arrayElement:!0})}bc(t){return vi(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}mc(){if(this.path)for(let t=0;t<this.path.length;t++)this.yc(this.path.get(t))}yc(t){if(t.length===0)throw this.bc("Document fields must not be empty");if(Pf(this.dataSource)&&cy.test(t))throw this.bc('Document fields cannot begin and end with "__"')}}class hy{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||En(t)}V(t,e,n,s=!1){return new Qi({dataSource:t,methodName:e,targetDoc:n,path:ct.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function wn(r){const t=r._freezeSettings(),e=En(r._databaseId);return new hy(r._databaseId,!!t.ignoreUndefinedProperties,e)}function Wi(r,t,e,n,s,i={}){const a=r.V(i.merge||i.mergeFields?2:0,t,e,s);du("Data must be an object, but it was:",a,n);const u=bf(n,a);let c,h;if(i.merge)c=new Ot(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const p=he(t,m,e);if(!a.contains(p))throw new b(P.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);Df(f,p)||f.push(p)}c=new Ot(f),h=a.fieldTransforms.filter(m=>c.covers(m.field))}else c=null,h=a.fieldTransforms;return new ly(new vt(u),c,h)}class vs extends pe{_toFieldTransform(t){if(t.dataSource!==2)throw t.dataSource===1?t.bc(`${this._methodName}() can only appear at the top level of your update data`):t.bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof vs}}function Vf(r,t,e){return new Qi({dataSource:3,targetDoc:t.settings.targetDoc,methodName:r._methodName,arrayElement:e},t.databaseId,t.serializer,t.ignoreUndefinedProperties)}class su extends pe{_toFieldTransform(t){return new Tn(t.path,new Yn)}isEqual(t){return t instanceof su}}class iu extends pe{constructor(t,e){super(t),this.Cc=e}_toFieldTransform(t){const e=Vf(this,t,!0),n=this.Cc.map(i=>An(i,e)),s=new fn(n);return new Tn(t.path,s)}isEqual(t){return t instanceof iu&&gs(this.Cc,t.Cc)}}class ou extends pe{constructor(t,e){super(t),this.Cc=e}_toFieldTransform(t){const e=Vf(this,t,!0),n=this.Cc.map(i=>An(i,e)),s=new mn(n);return new Tn(t.path,s)}isEqual(t){return t instanceof ou&&gs(this.Cc,t.Cc)}}class au extends pe{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=new gn(t.serializer,ki(t.serializer,this.vc));return new Tn(t.path,e)}isEqual(t){return t instanceof au&&(this.vc===t.vc||Number.isNaN(this.vc)&&Number.isNaN(t.vc))}}class uu extends pe{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=new Xn(t.serializer,ki(t.serializer,this.vc));return new Tn(t.path,e)}isEqual(t){return t instanceof uu&&(this.vc===t.vc||Number.isNaN(this.vc)&&Number.isNaN(t.vc))}}class cu extends pe{constructor(t,e){super(t),this.vc=e}_toFieldTransform(t){const e=new Zn(t.serializer,ki(t.serializer,this.vc));return new Tn(t.path,e)}isEqual(t){return t instanceof cu&&(this.vc===t.vc||Number.isNaN(this.vc)&&Number.isNaN(t.vc))}}function lu(r,t,e,n){const s=r.V(1,t,e);du("Data must be an object, but it was:",s,n);const i=[],a=vt.empty();ze(n,(c,h)=>{const f=fu(t,c,e);h=It(h);const m=s.wc(f);if(h instanceof vs)i.push(f);else{const p=An(h,m);p!=null&&(i.push(f),a.set(f,p))}});const u=new Ot(i);return new Rf(a,u,s.fieldTransforms)}function hu(r,t,e,n,s,i){const a=r.V(1,t,e),u=[he(t,n,e)],c=[s];if(i.length%2!=0)throw new b(P.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)u.push(he(t,i[p])),c.push(i[p+1]);const h=[],f=vt.empty();for(let p=u.length-1;p>=0;--p)if(!Df(h,u[p])){const v=u[p];let x=c[p];x=It(x);const N=a.wc(v);if(x instanceof vs)h.push(v);else{const D=An(x,N);D!=null&&(h.push(v),f.set(v,D))}}const m=new Ot(h);return new Rf(f,m,a.fieldTransforms)}function Sf(r,t,e,n=!1){return An(e,r.V(n?4:3,t))}function An(r,t){if(Cf(r=It(r)))return du("Unsupported field value:",t,r),bf(r,t);if(r instanceof pe)return function(n,s){if(!Pf(s.dataSource))throw s.bc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.bc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.bc("Nested arrays are not supported");return function(n,s){const i=[];let a=0;for(const u of n){let c=An(u,s.Sc(a));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),a++}return{arrayValue:{values:i}}}(r,t)}return function(n,s){if((n=It(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return ki(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Z.fromDate(n);return{timestampValue:tr(s.serializer,i)}}if(n instanceof Z){const i=new Z(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:tr(s.serializer,i)}}if(n instanceof se)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ut)return{bytesValue:hd(s.serializer,n._byteString)};if(n instanceof nt){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.bc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ba(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof $t)return function(a,u){const c=a instanceof $t?a.toArray():a;return{mapValue:{fields:{[_a]:{stringValue:ya},[Wn]:{arrayValue:{values:c.map(f=>{if(typeof f!="number")throw u.bc("VectorValues must only contain numeric values.");return Ni(u.serializer,f)})}}}}}}(n,s);if(wd(n))return n._toProto(s.serializer);throw s.bc(`Unsupported field value: ${Ri(n)}`)}(r,t)}function bf(r,t){const e={};return Ph(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ze(r,(n,s)=>{const i=An(s,t.gc(n));i!=null&&(e[n]=i)}),{mapValue:{fields:e}}}function Cf(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Z||r instanceof se||r instanceof Ut||r instanceof nt||r instanceof pe||r instanceof $t||wd(r))}function du(r,t,e){if(!Cf(e)||!ah(e)){const n=Ri(e);throw n==="an object"?t.bc(r+" a custom object"):t.bc(r+" "+n)}}function he(r,t,e){if((t=It(t))instanceof _r)return t._internalPath;if(typeof t=="string")return fu(r,t);throw vi("Field path arguments must be of type string or ",r,!1,void 0,e)}const dy=new RegExp("[~\\*/\\[\\]]");function fu(r,t,e){if(t.search(dy)>=0)throw vi(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new _r(...t.split("."))._internalPath}catch{throw vi(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function vi(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||a)&&(c+=" (found",i&&(c+=` in field ${n}`),a&&(c+=` in document ${s}`),c+=")"),new b(P.INVALID_ARGUMENT,u+r+c)}function Df(r,t){return r.some(e=>e.isEqual(t))}/**
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
 */class xf{convertValue(t,e="none"){switch(Fe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return ut(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ce(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw O(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return ze(t,(s,i)=>{n[s]=this.convertValue(i,e)}),n}convertVectorValue(t){var n,s,i;const e=(i=(s=(n=t.fields)==null?void 0:n[Wn].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>ut(a.doubleValue));return new $t(e)}convertGeoPoint(t){return new se(ut(t.latitude),ut(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=Di(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(is(t));default:return null}}convertTimestamp(t){const e=ue(t);return new Z(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=$.fromString(t);L(Ed(n),9688,{name:t});const s=new ln(n.get(1),n.get(3)),i=new k(n.popFirst(5));return s.isEqual(e)||mt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */class $e extends xf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ut(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new nt(this.firestore,null,e)}}/**
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
 */function Yy(){return new vs("deleteField")}function Xy(){return new su("serverTimestamp")}function Zy(...r){return new iu("arrayUnion",r)}function tI(...r){return new ou("arrayRemove",r)}function eI(r){return new au("increment",r)}function nI(r){return new uu("minimum",r)}function rI(r){return new cu("maximum",r)}function sI(r){return new $t(r)}/**
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
 */function iI(r){var n;const t=ht(Q(r.firestore,it)),e=(n=t._onlineComponents)==null?void 0:n.datastore.serializer;return e===void 0?null:Li(e,xt(r._query)).dt}function oI(r,t){var i;const e=Rh(t,(a,u)=>new id(u,a.aggregateType,a._internalFieldPath)),n=ht(Q(r.firestore,it)),s=(i=n._onlineComponents)==null?void 0:i.datastore.serializer;return s===void 0?null:_d(s,Kh(r._query),e,!0).request}const Ul="@firebase/firestore",jl="4.15.0";/**
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
 */function qn(r){return function(e,n){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}/**
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
 */class fs{constructor(t="count",e){this._internalFieldPath=e,this.type="AggregateField",this.aggregateType=t}}class fy{constructor(t,e,n){this._userDataWriter=e,this._data=n,this.type="AggregateQuerySnapshot",this.query=t}data(){return this._userDataWriter.convertObjectMap(this._data)}_fieldsProto(){return new vt({mapValue:{fields:this._data}}).clone().value.mapValue.fields}}/**
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
 */class ms{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new nt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new my(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(he("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class my extends ms{data(){return super.data()}}/**
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
 */function Nf(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new b(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class mu{}class Rs extends mu{}function aI(r,t,...e){let n=[];t instanceof mu&&n.push(t),n=n.concat(e),function(i){const a=i.filter(c=>c instanceof yr).length,u=i.filter(c=>c instanceof Ps).length;if(a>1||a>0&&u>0)throw new b(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class Ps extends Rs{constructor(t,e,n){super(),this._field=t,this._op=e,this._value=n,this.type="where"}static _create(t,e,n){return new Ps(t,e,n)}_apply(t){const e=this._parse(t);return Ff(t._query,e),new Pt(t.firestore,t.converter,Qo(t._query,e))}_parse(t){const e=wn(t.firestore);return function(i,a,u,c,h,f,m){let p;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new b(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Gl(m,f);const x=[];for(const N of m)x.push(zl(c,i,N));p={arrayValue:{values:x}}}else p=zl(c,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Gl(m,f),p=Sf(u,a,m,f==="in"||f==="not-in");return W.create(h,f,p)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}function uI(r,t,e){const n=t,s=he("where",r);return Ps._create(s,n,e)}class yr extends mu{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new yr(t,e)}_parse(t){const e=this._queryConstraints.map(n=>n._parse(t)).filter(n=>n.getFilters().length>0);return e.length===1?e[0]:tt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const c of u)Ff(a,c),a=Qo(a,c)}(t._query,e),new Pt(t.firestore,t.converter,Qo(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function cI(...r){return r.forEach(t=>Mf("or",t)),yr._create("or",r)}function lI(...r){return r.forEach(t=>Mf("and",t)),yr._create("and",r)}class gu extends Rs{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new gu(t,e)}_apply(t){const e=function(s,i,a){if(s.startAt!==null)throw new b(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new b(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ls(i,a)}(t._query,this._field,this._direction);return new Pt(t.firestore,t.converter,xg(t._query,e))}}function hI(r,t="asc"){const e=t,n=he("orderBy",r);return gu._create(n,e)}class Hi extends Rs{constructor(t,e,n){super(),this.type=t,this._limit=e,this._limitType=n}static _create(t,e,n){return new Hi(t,e,n)}_apply(t){return new Pt(t.firestore,t.converter,mi(t._query,this._limit,this._limitType))}}function dI(r){return uh("limit",r),Hi._create("limit",r,"F")}function fI(r){return uh("limitToLast",r),Hi._create("limitToLast",r,"L")}class Ji extends Rs{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new Ji(t,e,n)}_apply(t){const e=kf(t,this.type,this._docOrFields,this._inclusive);return new Pt(t.firestore,t.converter,Ng(t._query,e))}}function mI(...r){return Ji._create("startAt",r,!0)}function gI(...r){return Ji._create("startAfter",r,!1)}class Yi extends Rs{constructor(t,e,n){super(),this.type=t,this._docOrFields=e,this._inclusive=n}static _create(t,e,n){return new Yi(t,e,n)}_apply(t){const e=kf(t,this.type,this._docOrFields,this._inclusive);return new Pt(t.firestore,t.converter,kg(t._query,e))}}function pI(...r){return Yi._create("endBefore",r,!1)}function _I(...r){return Yi._create("endAt",r,!0)}function kf(r,t,e,n){if(e[0]=It(e[0]),e[0]instanceof ms)return function(i,a,u,c,h){if(!c)throw new b(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const m of On(i))if(m.field.isKeyField())f.push(hn(a,c.key));else{const p=c.data.field(m.field);if(Ci(p))throw new b(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const v=m.field.canonicalString();throw new b(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${v}' (used as the orderBy) does not exist.`)}f.push(p)}return new Oe(f,h)}(r._query,r.firestore._databaseId,t,e[0]._document,n);{const s=wn(r.firestore);return function(a,u,c,h,f,m){const p=a.explicitOrderBy;if(f.length>p.length)throw new b(P.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const v=[];for(let x=0;x<f.length;x++){const N=f[x];if(p[x].field.isKeyField()){if(typeof N!="string")throw new b(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof N}`);if(!Ta(a)&&N.indexOf("/")!==-1)throw new b(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${N}' contains a slash.`);const D=a.path.child($.fromString(N));if(!k.isDocumentKey(D))throw new b(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${D}' is not because it contains an odd number of segments.`);const q=new k(D);v.push(hn(u,q))}else{const D=Sf(c,h,N);v.push(D)}}return new Oe(v,m)}(r._query,r.firestore._databaseId,s,t,e,n)}}function zl(r,t,e){if(typeof(e=It(e))=="string"){if(e==="")throw new b(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ta(t)&&e.indexOf("/")!==-1)throw new b(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const n=t.path.child($.fromString(e));if(!k.isDocumentKey(n))throw new b(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return hn(r,new k(n))}if(e instanceof nt)return hn(r,e._key);throw new b(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ri(e)}.`)}function Gl(r,t){if(!Array.isArray(r)||r.length===0)throw new b(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Ff(r,t){const e=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new b(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new b(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function Mf(r,t){if(!(t instanceof Ps||t instanceof yr))throw new b(P.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}function Xi(r,t,e){let n;return n=r?e&&(e.merge||e.mergeFields)?r.toFirestore(t,e):r.toFirestore(t):t,n}class pu extends xf{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ut(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new nt(this.firestore,null,e)}}/**
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
 */function yI(r){return new fs("sum",he("sum",r))}function II(r){return new fs("avg",he("average",r))}function gy(){return new fs("count")}function TI(r,t){var e,n;return r instanceof fs&&t instanceof fs&&r.aggregateType===t.aggregateType&&((e=r._internalFieldPath)==null?void 0:e.canonicalString())===((n=t._internalFieldPath)==null?void 0:n.canonicalString())}function EI(r,t){return wf(r.query,t.query)&&gs(r.data(),t.data())}/**
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
 */function wI(r){return py(r,{count:gy()})}function py(r,t){const e=Q(r.firestore,it),n=ht(e),s=Rh(t,(i,a)=>new id(a,i.aggregateType,i._internalFieldPath));return W_(n,r._query,s).then(i=>function(u,c,h){const f=new $e(u);return new fy(c,f,h)}(e,r,i))}class _y{constructor(t){this.kind="memory",this._onlineComponentProvider=qe.provider,this._offlineComponentProvider=t!=null&&t.garbageCollector?t.garbageCollector._offlineComponentProvider:{build:()=>new tu(void 0)}}toJSON(){return{kind:this.kind}}}class yy{constructor(t){let e;this.kind="persistent",t!=null&&t.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=Ay(void 0),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class Iy{constructor(){this.kind="memoryEager",this._offlineComponentProvider=ir.provider}toJSON(){return{kind:this.kind}}}class Ty{constructor(t){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new tu(t)}}toJSON(){return{kind:this.kind}}}function AI(){return new Iy}function vI(r){return new Ty(r==null?void 0:r.cacheSizeBytes)}function RI(r){return new _y(r)}function PI(r){return new yy(r)}class Ey{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=qe.provider,this._offlineComponentProvider={build:e=>new eu(e,t==null?void 0:t.cacheSizeBytes,this.forceOwnership)}}}class wy{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=qe.provider,this._offlineComponentProvider={build:e=>new ff(e,t==null?void 0:t.cacheSizeBytes)}}}function Ay(r){return new Ey(r==null?void 0:r.forceOwnership)}function VI(){return new wy}/**
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
 *//**
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
 */const Of="NOT SUPPORTED";class Ce{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class jt extends ms{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ai(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(he("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new b(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=jt._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}function SI(r,t,e){if(In(t,jt._jsonSchema)){if(t.bundle===Of)throw new b(P.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=En(r._databaseId),s=If(t.bundle,n),i=s.ju(),a=new Wa(s.getMetadata(),n);for(const f of i)a.Ja(f);const u=a.documents;if(u.length!==1)throw new b(P.INVALID_ARGUMENT,`Expected bundle data to contain 1 document, but it contains ${u.length} documents.`);const c=Oi(n,u[0].document),h=new k($.fromString(t.bundleName));return new jt(r,new pu(r),h,c,new Ce(!1,!1),e||null)}}jt._jsonSchemaVersion="firestore/documentSnapshot/1.0",jt._jsonSchema={type:_t("string",jt._jsonSchemaVersion),bundleSource:_t("string","DocumentSnapshot"),bundleName:_t("string"),bundle:_t("string")};class ai extends jt{data(t={}){return super.data(t)}}class zt{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Ce(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new ai(this._firestore,this._userDataWriter,n.key,n,new Ce(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new b(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const c=new ai(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Ce(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const c=new ai(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Ce(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:vy(u.type),doc:c,oldIndex:h,newIndex:f}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new b(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=zt._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ca.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function bI(r,t,e){if(In(t,zt._jsonSchema)){if(t.bundle===Of)throw new b(P.INVALID_ARGUMENT,"The provided JSON object was created in a client environment, which is not supported.");const n=En(r._databaseId),s=If(t.bundle,n),i=s.ju(),a=new Wa(s.getMetadata(),n);for(const p of i)a.Ja(p);if(a.queries.length!==1)throw new b(P.INVALID_ARGUMENT,`Snapshot data expected 1 query but found ${a.queries.length} queries.`);const u=qi(a.queries[0].bundledQuery),c=a.documents;let h=new cn;c.map(p=>{const v=Oi(n,p.document);h=h.add(v)});const f=yn.fromInitialDocuments(u,h,G(),!1,!1),m=new Pt(r,e||null,u);return new zt(r,new pu(r),m,f)}}function vy(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return O(61501,{type:r})}}function CI(r,t){return r instanceof jt&&t instanceof jt?r._firestore===t._firestore&&r._key.isEqual(t._key)&&(r._document===null?t._document===null:r._document.isEqual(t._document))&&r._converter===t._converter:r instanceof zt&&t instanceof zt&&r._firestore===t._firestore&&wf(r.query,t.query)&&r.metadata.isEqual(t.metadata)&&r._snapshot.isEqual(t._snapshot)}/**
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
 */zt._jsonSchemaVersion="firestore/querySnapshot/1.0",zt._jsonSchema={type:_t("string",zt._jsonSchemaVersion),bundleSource:_t("string","QuerySnapshot"),bundleName:_t("string"),bundle:_t("string")};const Ry={maxAttempts:5};/**
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
 */class Py{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=wn(t)}set(t,e,n){this._verifyNotCommitted();const s=De(t,this._firestore),i=Xi(s.converter,e,n),a=Wi(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(a.toMutation(s._key,lt.none())),this}update(t,e,n,...s){this._verifyNotCommitted();const i=De(t,this._firestore);let a;return a=typeof(e=It(e))=="string"||e instanceof _r?hu(this._dataReader,"WriteBatch.update",i._key,e,n,s):lu(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(a.toMutation(i._key,lt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=De(t,this._firestore);return this._mutations=this._mutations.concat(new lr(e._key,lt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new b(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function De(r,t){if((r=It(r)).firestore!==t)throw new b(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
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
 */class Vy{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=wn(t)}get(t){const e=De(t,this._firestore),n=new pu(this._firestore);return this._transaction.lookup([e._key]).then(s=>{if(!s||s.length!==1)return O(24041);const i=s[0];if(i.isFoundDocument())return new ms(this._firestore,n,i.key,i,e.converter);if(i.isNoDocument())return new ms(this._firestore,n,e._key,null,e.converter);throw O(18433,{doc:i})})}set(t,e,n){const s=De(t,this._firestore),i=Xi(s.converter,e,n),a=Wi(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,n);return this._transaction.set(s._key,a),this}update(t,e,n,...s){const i=De(t,this._firestore);let a;return a=typeof(e=It(e))=="string"||e instanceof _r?hu(this._dataReader,"Transaction.update",i._key,e,n,s):lu(this._dataReader,"Transaction.update",i._key,e),this._transaction.update(i._key,a),this}delete(t){const e=De(t,this._firestore);return this._transaction.delete(e._key),this}}/**
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
 */class Sy extends Vy{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=De(t,this._firestore),n=new $e(this._firestore);return super.get(t).then(s=>new jt(this._firestore,n,e._key,s._document,new Ce(!1,!1),e.converter))}}function DI(r,t,e){r=Q(r,it);const n={...Ry,...e};(function(a){if(a.maxAttempts<1)throw new b(P.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n);const s=ht(r);return Y_(s,i=>t(new Sy(r,i)),n)}/**
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
 */function xI(r){r=Q(r,nt);const t=Q(r.firestore,it),e=ht(t);return _f(e,r._key).then(n=>_u(t,r,n))}function NI(r){r=Q(r,nt);const t=Q(r.firestore,it),e=ht(t),n=new $e(t);return $_(e,r._key).then(s=>new jt(t,n,r._key,s,new Ce(s!==null&&s.hasLocalMutations,!0),r.converter))}function kI(r){r=Q(r,nt);const t=Q(r.firestore,it),e=ht(t);return _f(e,r._key,{source:"server"}).then(n=>_u(t,r,n))}function FI(r){r=Q(r,Pt);const t=Q(r.firestore,it),e=ht(t),n=new $e(t);return Nf(r._query),yf(e,r._query).then(s=>new zt(t,n,r,s))}function MI(r){r=Q(r,Pt);const t=Q(r.firestore,it),e=ht(t),n=new $e(t);return Q_(e,r._query).then(s=>new zt(t,n,r,s))}function OI(r){r=Q(r,Pt);const t=Q(r.firestore,it),e=ht(t),n=new $e(t);return yf(e,r._query,{source:"server"}).then(s=>new zt(t,n,r,s))}function LI(r,t,e){r=Q(r,nt);const n=Q(r.firestore,it),s=Xi(r.converter,t,e),i=wn(n);return Vs(n,[Wi(i,"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,lt.none())])}function qI(r,t,e,...n){r=Q(r,nt);const s=Q(r.firestore,it),i=wn(s);let a;return a=typeof(t=It(t))=="string"||t instanceof _r?hu(i,"updateDoc",r._key,t,e,n):lu(i,"updateDoc",r._key,t),Vs(s,[a.toMutation(r._key,lt.exists(!0))])}function BI(r){return Vs(Q(r.firestore,it),[new lr(r._key,lt.none())])}function UI(r,t){const e=Q(r.firestore,it),n=oy(r),s=Xi(r.converter,t),i=wn(r.firestore);return Vs(e,[Wi(i,"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,lt.exists(!1))]).then(()=>n)}function Kl(r,...t){var h,f,m;r=It(r);let e={includeMetadataChanges:!1,source:"default"},n=0;typeof t[n]!="object"||qn(t[n])||(e=t[n++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(qn(t[n])){const p=t[n];t[n]=(h=p.next)==null?void 0:h.bind(p),t[n+1]=(f=p.error)==null?void 0:f.bind(p),t[n+2]=(m=p.complete)==null?void 0:m.bind(p)}let i,a,u;if(r instanceof nt)a=Q(r.firestore,it),u=ur(r._key.path),i={next:p=>{t[n]&&t[n](_u(a,r,p))},error:t[n+1],complete:t[n+2]};else{const p=Q(r,Pt);a=Q(p.firestore,it),u=p._query;const v=new $e(a);i={next:x=>{t[n]&&t[n](new zt(a,v,p,x))},error:t[n+1],complete:t[n+2]},Nf(r._query)}const c=ht(a);return K_(c,u,s,i)}function jI(r,t,...e){const n=It(r),s=function(c){const h={bundle:"",bundleName:"",bundleSource:""},f=["bundle","bundleName","bundleSource"];for(const m of f){if(!(m in c)){h.error=`snapshotJson missing required field: ${m}`;break}const p=c[m];if(typeof p!="string"){h.error=`snapshotJson field '${m}' must be a string.`;break}if(p.length===0){h.error=`snapshotJson field '${m}' cannot be an empty string.`;break}m==="bundle"?h.bundle=p:m==="bundleName"?h.bundleName=p:m==="bundleSource"&&(h.bundleSource=p)}return h}(t);if(s.error)throw new b(P.INVALID_ARGUMENT,s.error);let i,a=0;if(typeof e[a]!="object"||qn(e[a])||(i=e[a++]),s.bundleSource==="QuerySnapshot"){let u=null;if(typeof e[a]=="object"&&qn(e[a])){const c=e[a++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:e[a++],error:e[a++],complete:e[a++]};return function(h,f,m,p,v){let x,N=!1;return Bl(h,f.bundle).then(()=>uy(h,f.bundleName)).then(q=>{q&&!N&&(v&&q.withConverter(v),x=Kl(q,m||{},p))}).catch(q=>(p.error&&p.error(q),()=>{})),()=>{N||(N=!0,x&&x())}}(n,s,i,u,e[a])}if(s.bundleSource==="DocumentSnapshot"){let u=null;if(typeof e[a]=="object"&&qn(e[a])){const c=e[a++];u={next:c.next,error:c.error,complete:c.complete}}else u={next:e[a++],error:e[a++],complete:e[a++]};return function(h,f,m,p,v){let x,N=!1;return Bl(h,f.bundle).then(()=>{if(!N){const q=new nt(h,v||null,k.fromPath(f.bundleName));x=Kl(q,m||{},p)}}).catch(q=>(p.error&&p.error(q),()=>{})),()=>{N||(N=!0,x&&x())}}(n,s,i,u,e[a])}throw new b(P.INVALID_ARGUMENT,`unsupported bundle source: ${s.bundleSource}`)}function zI(r,t){r=Q(r,it);const e=ht(r),n=qn(t)?t:{next:t};return J_(e,n)}function Vs(r,t){const e=ht(r);return H_(e,t)}function _u(r,t,e){const n=e.docs.get(t._key),s=new $e(r);return new jt(r,s,t._key,n,new Ce(e.hasPendingWrites,e.fromCache),t.converter)}function GI(r){return r=Q(r,it),ht(r),new Py(r,t=>Vs(r,t))}/**
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
 */function KI(r,t){r=Q(r,it);const e=ht(r);if(!e._uninitializedComponentsProvider||e._uninitializedComponentsProvider._offline.kind==="memory")return Gt("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=function(i){const a=typeof i=="string"?function(h){try{return JSON.parse(h)}catch(f){throw new b(P.INVALID_ARGUMENT,"Failed to parse JSON: "+(f==null?void 0:f.message))}}(i):i,u=[];if(Array.isArray(a.indexes))for(const c of a.indexes){const h=$l(c,"collectionGroup"),f=[];if(Array.isArray(c.fields))for(const m of c.fields){const p=$l(m,"fieldPath"),v=fu("setIndexConfiguration",p);m.arrayConfig==="CONTAINS"?f.push(new an(v,2)):m.order==="ASCENDING"?f.push(new an(v,0)):m.order==="DESCENDING"&&f.push(new an(v,1))}u.push(new jn(jn.UNKNOWN_ID,h,f,zn.empty()))}return u}(t);return ty(e,n)}function $l(r,t){if(typeof r[t]!="string")throw new b(P.INVALID_ARGUMENT,"Missing string value for: "+t);return r[t]}/**
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
 */class by{constructor(t){this._firestore=t,this.type="PersistentCacheIndexManager"}}function $I(r){var s;r=Q(r,it);const t=Ql.get(r);if(t)return t;if(((s=ht(r)._uninitializedComponentsProvider)==null?void 0:s._offline.kind)!=="persistent")return null;const n=new by(r);return Ql.set(r,n),n}function QI(r){Lf(r,!0)}function WI(r){Lf(r,!1)}function HI(r){const t=ht(r._firestore);ny(t).then(e=>C("deleting all persistent cache indexes succeeded")).catch(e=>Gt("deleting all persistent cache indexes failed",e))}function Lf(r,t){const e=ht(r._firestore);ey(e,t).then(n=>C(`setting persistent cache index auto creation isEnabled=${t} succeeded`)).catch(n=>Gt(`setting persistent cache index auto creation isEnabled=${t} failed`,n))}const Ql=new WeakMap;/**
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
 */class JI{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(t){return yu.instance.onExistenceFilterMismatch(t)}}class yu{constructor(){this.t=new Map}static get instance(){return Js||(Js=new yu,Qg(Js)),Js}o(t){this.t.forEach(e=>e(t))}onExistenceFilterMismatch(t){const e=Symbol(),n=this.t;return n.set(e,t),()=>n.delete(e)}}let Js=null;(function(t,e=!0){Sm(Vm),Rm(new Pm("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new it(new Dm(n.getProvider("auth-internal")),new km(a,n.getProvider("app-check-internal")),Tg(a,s),a);return i={useFetchStreams:e,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),Ec(Ul,jl,t),Ec(Ul,jl,"esm2020")})();export{xf as AbstractUserDataWriter,fs as AggregateField,fy as AggregateQuerySnapshot,Ut as Bytes,By as CACHE_SIZE_UNLIMITED,re as CollectionReference,nt as DocumentReference,jt as DocumentSnapshot,_r as FieldPath,pe as FieldValue,it as Firestore,b as FirestoreError,se as GeoPoint,ay as LoadBundleTask,by as PersistentCacheIndexManager,Pt as Query,yr as QueryCompositeFilterConstraint,Rs as QueryConstraint,ai as QueryDocumentSnapshot,Yi as QueryEndAtConstraint,Ps as QueryFieldFilterConstraint,Hi as QueryLimitConstraint,gu as QueryOrderByConstraint,zt as QuerySnapshot,Ji as QueryStartAtConstraint,Ce as SnapshotMetadata,Z as Timestamp,Sy as Transaction,$t as VectorValue,Py as WriteBatch,ca as _AutoId,ft as _ByteString,ln as _DatabaseId,k as _DocumentKey,Ny as _EmptyAppCheckTokenProvider,bm as _EmptyAuthCredentialsProvider,ct as _FieldPath,JI as _TestingHooks,Q as _cast,xy as _debugAssert,oI as _internalAggregationQueryToProtoRunAggregationQueryRequest,iI as _internalQueryToProtoQueryTarget,Fy as _isBase64Available,Gt as _logWarn,qm as _validateIsNotUsedTogether,UI as addDoc,TI as aggregateFieldEqual,EI as aggregateQuerySnapshotEqual,lI as and,tI as arrayRemove,Zy as arrayUnion,II as average,Ky as clearIndexedDbPersistence,Oy as collection,Ly as collectionGroup,iy as connectFirestoreEmulator,gy as count,HI as deleteAllPersistentCacheIndexes,BI as deleteDoc,Yy as deleteField,Wy as disableNetwork,WI as disablePersistentCacheIndexAutoCreation,oy as doc,Jy as documentId,SI as documentSnapshotFromJSON,zy as enableIndexedDbPersistence,Gy as enableMultiTabIndexedDbPersistence,Qy as enableNetwork,QI as enablePersistentCacheIndexAutoCreation,_I as endAt,pI as endBefore,ht as ensureFirestoreConfigured,Vs as executeWrite,py as getAggregateFromServer,wI as getCountFromServer,xI as getDoc,NI as getDocFromCache,kI as getDocFromServer,FI as getDocs,MI as getDocsFromCache,OI as getDocsFromServer,jy as getFirestore,$I as getPersistentCacheIndexManager,eI as increment,Uy as initializeFirestore,dI as limit,fI as limitToLast,Bl as loadBundle,rI as maximum,AI as memoryEagerGarbageCollector,RI as memoryLocalCache,vI as memoryLruGarbageCollector,nI as minimum,uy as namedQuery,Kl as onSnapshot,jI as onSnapshotResume,zI as onSnapshotsInSync,cI as or,hI as orderBy,PI as persistentLocalCache,VI as persistentMultipleTabManager,Ay as persistentSingleTabManager,aI as query,wf as queryEqual,bI as querySnapshotFromJSON,qy as refEqual,DI as runTransaction,Xy as serverTimestamp,LI as setDoc,KI as setIndexConfiguration,Dy as setLogLevel,CI as snapshotEqual,gI as startAfter,mI as startAt,yI as sum,Hy as terminate,qI as updateDoc,sI as vector,$y as waitForPendingWrites,uI as where,GI as writeBatch};
