var LZMAD=function(){function k(a,d){function b(){}h=b.prototype=d||new Ba;h.getClass$=S;h.typeId$=a;return b}function E(a,d){postMessage({action:3,callback_num:d,result:a})}function n(a,d,b,e,g){var c=Array(e);if(0<g&&(g=[null,0,!1,[0,0]][g],"number"!==typeof g))for(var f=0;f<e;++f)c[f]=g;I();T(c,A,J);c.arrayClass$=a;c.typeId$=d;c.queryId$=b;return c}function Ca(a,d,b,e){I();T(e,A,J);e.arrayClass$=a;e.typeId$=d;e.queryId$=b;return e}function Z(a,d,b){if(null!=b){var e;if(e=0<a.queryId$)e=b.typeId$,
e=!(e&&ma[e][a.queryId$]);if(e)throw new K;if(0>a.queryId$&&(b.typeMarker$==p||2==b.typeId$))throw new K;}return a[d]=b}function I(){I=p;A=[];J=[];var a=new Da,d=A,b=J,e=0,g,c;for(c in a)if(g=a[c])d[e]=c,b[e]=g,++e}function T(a,d,b){I();for(var e=0,g=d.length;e<g;++e)a[d[e]]=b[e]}function na(a,d){var b;if(b=null!=a)b=a.typeId$,b=!(b&&ma[b][d]);if(b)throw new Ea;return a}function oa(a,d){return L(a[0]+d[0],a[1]+d[1])}function ia(a,d){var b,e;if(a[0]==d[0]&&a[1]==d[1])return 0;b=0>a[1];e=0>d[1];return b&&
!e?-1:!b&&e?1:0>L(a[0]-d[0],a[1]-d[1])[1]?-1:1}function L(a,d){var b,e;d%=1.8446744073709552E19;a%=1.8446744073709552E19;b=d%4294967296;e=4294967296*Math.floor(a/4294967296);d=d-b+e;for(a=a-e+b;0>a;)a+=4294967296,d-=4294967296;for(;4294967295<a;)a-=4294967296,d+=4294967296;for(d%=1.8446744073709552E19;0x7fffffff00000000<d;)d-=1.8446744073709552E19;for(;-9223372036854775808>d;)d+=1.8446744073709552E19;return[a,d]}function M(a){var d,b;return-129<a&&128>a?(d=a+128,b=(pa(),U)[d],null==b&&(b=U[d]=0<=
a?[a,0]:[a+4294967296,-4294967296]),b):0<=a?[a,0]:[a+4294967296,-4294967296]}function qa(a){return 2147483648<=a[0]?~~Math.max(Math.min(a[0]-4294967296,2147483647),-2147483648):~~Math.max(Math.min(a[0],2147483647),-2147483648)}function pa(){pa=p;U=n(Fa,0,9,256,0)}function N(){N=p;Math.log(2);ra=Ga;sa=Ha;M(-1);M(1);M(2);ta=M(0)}function O(a){return a.pos>=a.count?-1:a.buf[a.pos++]&255}function aa(a,d){a.detailMessage=d;return a}function B(a,d){var b;b=new Ia;b.typeName=a+d;return b}function F(a,d){return a>
d?a:d}function G(a,d,b,e,g){var c,f,m,l;if(null==a||null==b)throw new Ja;m=(a.typeMarker$==p||2==a.typeId$?a.getClass$():S()).typeName;c=(b.typeMarker$==p||2==b.typeId$?b.getClass$():S()).typeName;if(91!=m.charCodeAt(0)||91!=c.charCodeAt(0))throw d=new K,d.detailMessage="Must be array types",d;if(m.charCodeAt(1)!=c.charCodeAt(1))throw d=new K,d.detailMessage="Array types must match",d;l=a.length;f=b.length;if(0>d||0>e||0>g||d+g>l||e+g>f)throw new Ka;if(f=76==m.charCodeAt(1)||91==m.charCodeAt(1))c=
null==c?!1:String(m)==c,f=!c;if(f)if(m=na(a,3),c=na(b,3),(null==a?null:a)===(null==b?null:b)&&d<e)for(d+=g,a=e+g;a-- >e;)Z(c,a,m[--d]);else for(a=e+g;e<a;)Z(c,e++,m[d++]);else for(c=0;c<g;++c)b[e+c]=a[d+c]}function La(a){try{var d;a:{var b=a.chunker,e;if(!b.alive)throw new Ma;e=!0;try{if(b.encoder)throw Error("No encoding");var g;b:{var c=b.decoder,f,m,l,h,k,n;n=qa(c.nowPos64)&c.m_PosStateMask;if(0==r(c.m_RangeDecoder,c.m_IsMatchDecoders,(c.state<<4)+n)){var q=c.m_LiteralDecoder,t=qa(c.nowPos64);
f=q.m_Coders[((t&q.m_PosMask)<<q.m_NumPrevBits)+((c.prevByte&255)>>>8-q.m_NumPrevBits)];if(7>c.state){var v=c.m_RangeDecoder,p;p=1;do p=p<<1|r(v,f.m_Decoders,p);while(256>p);c.prevByte=p<<24>>24}else{var z=c.m_RangeDecoder,y=ua(c.m_OutWindow,c.rep0),B,D,x;x=1;do if(D=y>>7&1,y<<=1,B=r(z,f.m_Decoders,(1+D<<8)+x),x=x<<1|B,D!=B){for(;256>x;)x=x<<1|r(z,f.m_Decoders,x);break}while(256>x);c.prevByte=x<<24>>24}var w=c.m_OutWindow,I=c.prevByte;w._buffer[w._pos++]=I;w._pos>=w._windowSize&&V(w);var A=c.state;
c.state=4>A?0:10>A?A-3:A-6;c.nowPos64=oa(c.nowPos64,Na)}else{if(1==r(c.m_RangeDecoder,c.m_IsRepDecoders,c.state))l=0,0==r(c.m_RangeDecoder,c.m_IsRepG0Decoders,c.state)?0==r(c.m_RangeDecoder,c.m_IsRep0LongDecoders,(c.state<<4)+n)&&(c.state=7>c.state?9:11,l=1):(0==r(c.m_RangeDecoder,c.m_IsRepG1Decoders,c.state)?m=c.rep1:(0==r(c.m_RangeDecoder,c.m_IsRepG2Decoders,c.state)?m=c.rep2:(m=c.rep3,c.rep3=c.rep2),c.rep2=c.rep1),c.rep1=c.rep0,c.rep0=m),0==l&&(l=va(c.m_RepLenDecoder,c.m_RangeDecoder,n)+2,c.state=
7>c.state?8:11);else{c.rep3=c.rep2;c.rep2=c.rep1;c.rep1=c.rep0;l=2+va(c.m_LenDecoder,c.m_RangeDecoder,n);c.state=7>c.state?7:10;var J=c.m_PosSlotDecoder;f=l;f-=2;k=ba(J[4>f?f:3],c.m_RangeDecoder);if(4<=k)if(h=(k>>1)-1,c.rep0=(2|k&1)<<h,14>k){var K=c.rep0,L=c.m_PosDecoders,N=c.rep0-k-1,S=c.m_RangeDecoder,E,ca,P,da;P=1;for(ca=da=0;ca<h;++ca)E=r(S,L,N+P),P<<=1,P+=E,da|=E<<ca;c.rep0=K+da}else{var U=c.rep0,u=c.m_RangeDecoder,F,ea,G;ea=0;for(F=h-4;0!=F;--F)u.Range>>>=1,G=u.Code-u.Range>>>31,u.Code-=u.Range&
G-1,ea=ea<<1|1-G,0==(u.Range&-16777216)&&(u.Code=u.Code<<8|O(u.Stream),u.Range<<=8);c.rep0=U+(ea<<4);var X=c.rep0,R=c.m_PosAlignDecoder,Y=c.m_RangeDecoder,ja,fa,Q,ga;Q=1;for(fa=ga=0;fa<R.NumBitLevels;++fa)ja=r(Y,R.Models,Q),Q<<=1,Q+=ja,ga|=ja<<fa;c.rep0=X+ga;if(0>c.rep0){g=-1==c.rep0?1:-1;break b}}else c.rep0=k}if(0<=ia(M(c.rep0),c.nowPos64)||c.rep0>=c.m_DictionarySizeCheck){g=-1;break b}var C=c.m_OutWindow;h=l;var H;H=C._pos-c.rep0-1;for(0>H&&(H+=C._windowSize);0!=h;--h)H>=C._windowSize&&(H=0),C._buffer[C._pos++]=
C._buffer[H++],C._pos>=C._windowSize&&V(C);c.nowPos64=oa(c.nowPos64,M(l));c.prevByte=ua(c.m_OutWindow,0)}g=0}if(-1==g)throw aa(new ha,"corrupted input");b.inBytesProcessed=ka;b.outBytesProcessed=b.decoder.nowPos64;if(1==g||0<=ia(b.decoder.outSize,W)&&0<=ia(b.decoder.nowPos64,b.decoder.outSize)){var la=b.decoder;V(la.m_OutWindow);var T=la.m_OutWindow;V(T);T._stream=null;la.m_RangeDecoder.Stream=null;b.alive=!1}e=!1;d=b.alive;break a}finally{e&&(b.alive=!1)}d=void 0}return d}catch(Z){return a.exception=
Z,!1}}function Oa(a,d){var b=new Pa;b.buf=n(y,0,-1,32,1);a.output=b;var e=new Qa,b=d.length;e.buf=d;e.pos=0;e.count=0+b;e.count>d.length&&(e.count=d.length);var g=a.output,c="",f,m,l;m=n(y,0,-1,5,1);for(f=0;f<m.length;++f){l=O(e);if(-1==l)throw aa(new ha,"truncated input");m[f]=l<<24>>24}b=new Ra;b.m_OutWindow=new Sa;b.m_RangeDecoder=new Ta;b.m_IsMatchDecoders=n(v,0,-1,192,1);b.m_IsRepDecoders=n(v,0,-1,12,1);b.m_IsRepG0Decoders=n(v,0,-1,12,1);b.m_IsRepG1Decoders=n(v,0,-1,12,1);b.m_IsRepG2Decoders=
n(v,0,-1,12,1);b.m_IsRep0LongDecoders=n(v,0,-1,192,1);b.m_PosSlotDecoder=n(X,0,7,4,0);b.m_PosDecoders=n(v,0,-1,114,1);b.m_PosAlignDecoder=D(new w,4);b.m_LenDecoder=wa(new xa);b.m_RepLenDecoder=wa(new xa);b.m_LiteralDecoder=new Ua;for(f=0;4>f;++f)b.m_PosSlotDecoder[f]=D(new w,6);var h,k,p;if(5>m.length)f=!1;else{f=m[0]&255;k=f%9;f=~~(f/9);p=f%5;l=~~(f/5);for(h=f=0;4>h;++h)f+=(m[1+h]&255)<<8*h;if(!(m=99999999<f)){if(8<k||4<p||4<l)l=!1;else{m=b.m_LiteralDecoder;if(null==m.m_Coders||m.m_NumPrevBits!=
k||m.m_NumPosBits!=p)for(m.m_NumPosBits=p,m.m_PosMask=(1<<p)-1,m.m_NumPrevBits=k,p=1<<m.m_NumPrevBits+m.m_NumPosBits,m.m_Coders=n(Va,0,4,p,0),k=0;k<p;++k){h=m.m_Coders;var r=k,t=new Wa;t.m_Decoders=n(v,0,-1,768,1);h[r]=t}l=1<<l;ya(b.m_LenDecoder,l);ya(b.m_RepLenDecoder,l);b.m_PosStateMask=l-1;l=!0}m=!l}if(m)f=!1;else if(0>f)f=!1;else{if(b.m_DictionarySize!=f){b.m_DictionarySize=f;b.m_DictionarySizeCheck=F(b.m_DictionarySize,1);f=b.m_OutWindow;l=F(b.m_DictionarySizeCheck,4096);if(null==f._buffer||
f._windowSize!=l)f._buffer=n(y,0,-1,l,1);f._windowSize=l;f._pos=0;f._streamPos=0}f=!0}}if(!f)throw aa(new ha,"corrupted input");for(f=0;64>f;f+=8){l=O(e);if(-1==l)throw aa(new ha,"truncated input");l=l.toString(16);1==l.length&&(l="0"+l);c=l+""+c}/^0+$|^f+$/i.test(c)?a.length_0=ka:(c=parseInt(c,16),c=4294967295<c?ka:isNaN(c)?(N(),ta):-9223372036854775808>c?(N(),sa):0x7fffffffffffffff<=c?(N(),ra):0<c?L(Math.floor(c),0):L(Math.ceil(c),0),a.length_0=c);c=a.length_0;b.m_RangeDecoder.Stream=e;e=b.m_OutWindow;
V(e);e._stream=null;e._stream=g;e=b.m_OutWindow;e._streamPos=0;e._pos=0;q(b.m_IsMatchDecoders);q(b.m_IsRep0LongDecoders);q(b.m_IsRepDecoders);q(b.m_IsRepG0Decoders);q(b.m_IsRepG1Decoders);q(b.m_IsRepG2Decoders);q(b.m_PosDecoders);e=b.m_LiteralDecoder;f=1<<e.m_NumPrevBits+e.m_NumPosBits;for(g=0;g<f;++g)q(e.m_Coders[g].m_Decoders);for(e=0;4>e;++e)q(b.m_PosSlotDecoder[e].Models);za(b.m_LenDecoder);za(b.m_RepLenDecoder);q(b.m_PosAlignDecoder.Models);e=b.m_RangeDecoder;e.Code=0;e.Range=-1;for(g=0;5>g;++g)e.Code=
e.Code<<8|O(e.Stream);b.state=0;b.rep0=0;b.rep1=0;b.rep2=0;b.rep3=0;b.outSize=c;b.nowPos64=W;b.prevByte=0;e=new Xa;e.decoder=b;e.encoder=null;e.alive=!0;a.chunker=e;return a}function V(a){var d;d=a._pos-a._streamPos;if(0!=d){var b=a._stream,e=a._buffer,g=a._streamPos,c=b.count+d;c<=b.buf.length||(c=F(c,2*b.buf.length),c=n(y,0,-1,c,1),G(b.buf,0,c,0,b.buf.length),b.buf=c);G(e,g,b.buf,b.count,d);b.count+=d;a._pos>=a._windowSize&&(a._pos=0);a._streamPos=a._pos}}function ua(a,d){var b;b=a._pos-d-1;0>b&&
(b+=a._windowSize);return a._buffer[b]}function ya(a,d){for(;a.m_NumPosStates<d;++a.m_NumPosStates)a.m_LowCoder[a.m_NumPosStates]=D(new w,3),a.m_MidCoder[a.m_NumPosStates]=D(new w,3)}function va(a,d,b){var e;if(0==r(d,a.m_Choice,0))return ba(a.m_LowCoder[b],d);e=8;return e=0==r(d,a.m_Choice,1)?e+ba(a.m_MidCoder[b],d):e+(8+ba(a.m_HighCoder,d))}function wa(a){a.m_Choice=n(v,0,-1,2,1);a.m_LowCoder=n(X,0,7,16,0);a.m_MidCoder=n(X,0,7,16,0);a.m_HighCoder=D(new w,8);return a}function za(a){var d;q(a.m_Choice);
for(d=0;d<a.m_NumPosStates;++d)q(a.m_LowCoder[d].Models),q(a.m_MidCoder[d].Models);q(a.m_HighCoder.Models)}function D(a,d){a.NumBitLevels=d;a.Models=n(v,0,-1,1<<d,1);return a}function ba(a,d){var b,e;e=1;for(b=a.NumBitLevels;0!=b;--b)e=(e<<1)+r(d,a.Models,e);return e-(1<<a.NumBitLevels)}function r(a,d,b){var e,g;g=d[b];e=(a.Range>>>11)*g;if((a.Code^-2147483648)<(e^-2147483648))return a.Range=e,d[b]=g+(2048-g>>>5)<<16>>16,0==(a.Range&-16777216)&&(a.Code=a.Code<<8|O(a.Stream),a.Range<<=8),0;a.Range-=
e;a.Code-=e;d[b]=g-(g>>>5)<<16>>16;0==(a.Range&-16777216)&&(a.Code=a.Code<<8|O(a.Stream),a.Range<<=8);return 1}function q(a){var d;for(d=0;d<a.length;++d)a[d]=1024}function z(a){var d;for(d=a.length-1;0<=d;--d)0>a[d]&&(a[d]=256+a[d]);return a}function Ya(a){var d=new Za,b;d.data=(b=[],b.explicitLength=0,b);var e,g,c;for(b=0;b<a.length;++b)if(e=a[b]&255,0==(e&128)){if(0==e)return z(a);g=d.data;e=String.fromCharCode(e&65535);g[g.explicitLength++]=e}else if(192==(e&224)){if(b+1>=a.length)return z(a);
g=a[++b]&255;if(128!=(g&192))return z(a);var f=d.data;e=String.fromCharCode((e&31)<<6&65535|g&63);f[f.explicitLength++]=e}else if(224==(e&240)){if(b+2>=a.length)return z(a);g=a[++b]&255;if(128!=(g&192))return z(a);c=a[++b]&255;if(128!=(c&192))return z(a);f=d.data;e=String.fromCharCode(((e&15)<<12|(g&63)<<6|c&63)&65535);f[f.explicitLength++]=e}else return z(a);a=d.data;var h,d=(h=a.join(""),a.length=a.explicitLength=0,h);return a[a.explicitLength++]=d}function $a(a){return a}function R(a){return a[1]+
a[0]}function p(){}var Aa="function"==typeof setImmediate?setImmediate:setTimeout,S=function(){return{typeName:this.typeId$+""}},h,Ha=[0,-9223372036854775808],ka=[4294967295,-4294967296],W=[0,0],Na=[1,0],Ga=[4294967295,0x7fffffff00000000],Ba=k(1,{});h.typeMarker$=p;var t=k(3),t=k(4,new t),t=k(5,new t),Da=k(0);h.getClass$=function(){return this.arrayClass$};h.length=0;h.queryId$=0;var A,J,ma=[{},{},{1:1},{2:1},{2:1},{2:1},{2:1},{2:1,10:1},{2:1},{2:1},{2:1},{2:1},{2:1},{2:1,11:1},{2:1},{2:1},{2:1},
{4:1},{5:1},{6:1},{7:1},{8:1},{9:1}],U,ra,sa,ta,Y=k(0),Qa=k(0,new Y);h.count=0;h.pos=0;var Y=k(0),Pa=k(0,new Y);h.count=0;var ha=k(7),K=k(9,new t),Ia=k(0),Ea=k(12,new t),Ma=k(14,new t),Ka=k(15,new t),Ja=k(16,new t),Za=k(0),t=k(0);h.length_0=W;var ab=k(0,new t),Sa=k(0);h._pos=0;h._streamPos=0;h._windowSize=0;var Xa=k(0),Ra=k(0);h.m_DictionarySize=-1;h.m_DictionarySizeCheck=-1;h.m_PosStateMask=0;h.nowPos64=W;h.outSize=W;h.prevByte=0;h.rep0=0;h.rep1=0;h.rep2=0;h.rep3=0;h.state=0;var xa=k(0);h.m_NumPosStates=
0;var Ua=k(0);h.m_NumPosBits=0;h.m_NumPrevBits=0;h.m_PosMask=0;var Wa=k(17),w=k(20);h.NumBitLevels=0;var Ta=k(0);h.Code=0;h.Range=0;var bb=k(0),y=B("","[B"),v=B("","[S"),X=B("[Ll","bd"),Va=B("[Ll.","d"),Fa=B("","[[D");"undefined"===typeof onmessage||"undefined"!=typeof window&&"undefined"!=typeof window.document||function(){onmessage=function(a){a&&a.data&&2==a.data.action&&LZMAD.decompress(a.data.data,a.data.callback_num)}}();return{decompress:function(a,d,b){function e(){var a;a=0;for(var k=(new Date).getTime();La(g.d);)if(0==
++a%1E3&&200<(new Date).getTime()-k)return h&&(c=R(g.d.chunker.decoder.nowPos64)/R(g.d.length_0),b?b(c):"undefined"!==typeof f&&E(c,f)),Aa(e,0),!1;h&&(b?b(1):"undefined"!==typeof f&&E(1,f));a=g.d.output;k=n(y,0,-1,a.count,1);G(a.buf,0,k,0,a.count);a=Ya(k);d?d(a):"undefined"!==typeof f&&postMessage({action:2,callback_num:f,result:"string"!==typeof a?a.slice(0):a})}var g=$a(new bb),c,f,h;"function"!==typeof d&&(f=d,d=b=0);a=Ca(y,0,-1,a);g.d=Oa(new ab,a);h=-1<R(g.d.length_0);b?b(h?0:-1):"undefined"!==
typeof f&&E(h?0:-1,f);Aa(e,0)}}}();this.LZMAD=this.LZMA_WORKER=LZMAD;
//! © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT
/// See LICENSE for more details.

// jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true, plusplus:true, quotmark:double, undef:true, unused:strict, browser: true, node: true

/// Does the environment support web workers?  If not, let's load the worker manually (without polluting the global scope).
if (typeof Worker === "undefined" || (typeof location !== "undefined" && location.protocol === "file:")) {
    /// Is this Node.js?
    if (typeof global !== "undefined" && typeof require !== "undefined") {
        this.LZMA = function (lzma_path) {
            return require(lzma_path || "./lzma_worker-min.js").LZMA;
        };
    /// Is this a browser?
    } else if (typeof window !== "undefined" && window.document) {
        (function ()
        {
            var that = this,
                global_var,
                req = function req(path) {
                    var script_tag  = document.createElement("script");
                    script_tag.type ="text/javascript";
                    script_tag.src  = path;
                    script_tag.onload = function () {
                        /// Make sure this LZMA variable doesn't get overwritten by the worker's.
                        that.LZMA = non_worker_lzma;
                    };
                    document.getElementsByTagName("head")[0].appendChild(script_tag);
                };
            
            /// Determine the global variable (it's called "window" in browsers, "global" in Node.js).
            if (typeof window !== "undefined") {
                global_var = window;
            } else if (global) {
                global_var = global;
            }
            
            function non_worker_lzma(path)
            {
                var fake_lzma;
                
                req(path);
                
                fake_lzma = {
                    compress: function compress(mixed, mode, on_finish, on_progress) {
                        if (global_var.LZMA_WORKER) {
                            global_var.LZMA_WORKER.compress(mixed, mode, on_finish, on_progress);
                        } else {
                            /// Wait
                            setTimeout(function ()
                            {
                                fake_lzma.compress(mixed, mode, on_finish, on_progress);
                            }, 50);
                        }
                    },
                    decompress: function decompress(byte_arr, on_finish, on_progress) {
                        if (global_var.LZMA_WORKER) {
                            global_var.LZMA_WORKER.decompress(byte_arr, on_finish, on_progress);
                        } else {
                            /// Wait
                            setTimeout(function ()
                            {
                                fake_lzma.decompress(byte_arr, on_finish, on_progress);
                            }, 50);
                        }
                    }
                };
                
                return fake_lzma;
            }
            
            that.LZMA = non_worker_lzma;
        }());
    } else {
        /// It doesn't seem to be either Node.js or a browser.
        console.log("Can't load the worker. Sorry.");
    }
} else {
    /// Let's use Web Workers.
    ///NOTE: The "this" keyword is the global context ("window" variable) if loaded via a <script> tag
    ///      or the function context if loaded as a module (e.g., in Node.js).
    this.LZMA_WORKER = function (lzma_path) {
        var action_compress   = 1,
            action_decompress = 2,
            action_progress   = 3,
            
            callback_obj = {},
            
            ///NOTE: Node.js needs something like "./" or "../" at the beginning.
            lzma_worker = new Worker(lzma_path || "./lzma_worker-min.js");
        
        lzma_worker.onmessage = function (e) {
            if (e.data.action === action_progress) {
                if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_progress === "function") {
                    callback_obj[e.data.cbn].on_progress(e.data.result);
                }
            } else {
                if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_finish === "function") {
                    callback_obj[e.data.cbn].on_finish(e.data.result);
                    
                    /// Since the (de)compression is complete, the callbacks are no longer needed.
                    delete callback_obj[e.data.cbn];
                }
            }
        };
        
        /// Very simple error handling.
        lzma_worker.onerror = function(event) {
            throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
        };
        
        return (function () {
            
            function send_to_worker(action, data, mode, on_finish, on_progress) {
                var cbn;
                
                do {
                    cbn = Math.floor(Math.random() * (10000000));
                } while(typeof callback_obj[cbn] !== "undefined");
                
                callback_obj[cbn] = {
                    on_finish:   on_finish,
                    on_progress: on_progress
                };
                
                lzma_worker.postMessage({
                    action: action, /// action_compress = 1, action_decompress = 2, action_progress = 3
                    cbn:    cbn,    /// callback number
                    data:   new Uint8Array(data),
                    mode:   mode
                });
            }
            
            return {
                compress: function compress(mixed, mode, on_finish, on_progress) {
                    send_to_worker(action_compress, mixed, mode, on_finish, on_progress);
                },
                decompress: function decompress(byte_arr, on_finish, on_progress) {
                    send_to_worker(action_decompress, byte_arr, false, on_finish, on_progress);
                }
            };
        }());
    };
}
var hexcase = 0;  
var b64pad  = ""; 
var chrsz   = 8;  
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function calcMD5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}

function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

function core_md5(x, len)
{
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  for(var i = 0; i < x.length; i += 16)
  {
    
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
  
}

function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++) 
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}