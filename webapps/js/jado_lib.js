function hex2b64(a){var b,c,d="";for(b=0;b+3<=a.length;b+=3)c=parseInt(a.substring(b,b+3),16),d+=b64map.charAt(c>>6)+b64map.charAt(63&c);for(b+1==a.length?(c=parseInt(a.substring(b,b+1),16),d+=b64map.charAt(c<<2)):b+2==a.length&&(c=parseInt(a.substring(b,b+2),16),d+=b64map.charAt(c>>2)+b64map.charAt((3&c)<<4));(3&d.length)>0;)d+=b64padchar;return d}function b64tohex(a){var b,c,d="",e=0;for(b=0;b<a.length&&a.charAt(b)!=b64padchar;++b)v=b64map.indexOf(a.charAt(b)),v<0||(0==e?(d+=int2char(v>>2),c=3&v,e=1):1==e?(d+=int2char(c<<2|v>>4),c=15&v,e=2):2==e?(d+=int2char(c),d+=int2char(v>>2),c=3&v,e=3):(d+=int2char(c<<2|v>>4),d+=int2char(15&v),e=0));return 1==e&&(d+=int2char(c<<2)),d}function b64toBA(a){var b,c=b64tohex(a),d=new Array;for(b=0;2*b<c.length;++b)d[b]=parseInt(c.substring(2*b,2*b+2),16);return d}function ECFieldElementFp(a,b){this.x=b,this.q=a}function feFpEquals(a){return a==this?!0:this.q.equals(a.q)&&this.x.equals(a.x)}function feFpToBigInteger(){return this.x}function feFpNegate(){return new ECFieldElementFp(this.q,this.x.negate().mod(this.q))}function feFpAdd(a){return new ECFieldElementFp(this.q,this.x.add(a.toBigInteger()).mod(this.q))}function feFpSubtract(a){return new ECFieldElementFp(this.q,this.x.subtract(a.toBigInteger()).mod(this.q))}function feFpMultiply(a){return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger()).mod(this.q))}function feFpSquare(){return new ECFieldElementFp(this.q,this.x.square().mod(this.q))}function feFpDivide(a){return new ECFieldElementFp(this.q,this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q))}function ECPointFp(a,b,c,d){this.curve=a,this.x=b,this.y=c,null==d?this.z=BigInteger.ONE:this.z=d,this.zinv=null}function pointFpGetX(){null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q));var a=this.x.toBigInteger().multiply(this.zinv);return this.curve.reduce(a),this.curve.fromBigInteger(a)}function pointFpGetY(){null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q));var a=this.y.toBigInteger().multiply(this.zinv);return this.curve.reduce(a),this.curve.fromBigInteger(a)}function pointFpEquals(a){if(a==this)return!0;if(this.isInfinity())return a.isInfinity();if(a.isInfinity())return this.isInfinity();var b,c;return b=a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q),b.equals(BigInteger.ZERO)?(c=a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q),c.equals(BigInteger.ZERO)):!1}function pointFpIsInfinity(){return null==this.x&&null==this.y?!0:this.z.equals(BigInteger.ZERO)&&!this.y.toBigInteger().equals(BigInteger.ZERO)}function pointFpNegate(){return new ECPointFp(this.curve,this.x,this.y.negate(),this.z)}function pointFpAdd(a){if(this.isInfinity())return a;if(a.isInfinity())return this;var b=a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q),c=a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);if(BigInteger.ZERO.equals(c))return BigInteger.ZERO.equals(b)?this.twice():this.curve.getInfinity();var d=new BigInteger("3"),e=this.x.toBigInteger(),f=this.y.toBigInteger(),g=(a.x.toBigInteger(),a.y.toBigInteger(),c.square()),h=g.multiply(c),i=e.multiply(g),j=b.square().multiply(this.z),k=j.subtract(i.shiftLeft(1)).multiply(a.z).subtract(h).multiply(c).mod(this.curve.q),l=i.multiply(d).multiply(b).subtract(f.multiply(h)).subtract(j.multiply(b)).multiply(a.z).add(b.multiply(h)).mod(this.curve.q),m=h.multiply(this.z).multiply(a.z).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(k),this.curve.fromBigInteger(l),m)}function pointFpTwice(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var a=new BigInteger("3"),b=this.x.toBigInteger(),c=this.y.toBigInteger(),d=c.multiply(this.z),e=d.multiply(c).mod(this.curve.q),f=this.curve.a.toBigInteger(),g=b.square().multiply(a);BigInteger.ZERO.equals(f)||(g=g.add(this.z.square().multiply(f))),g=g.mod(this.curve.q);var h=g.square().subtract(b.shiftLeft(3).multiply(e)).shiftLeft(1).multiply(d).mod(this.curve.q),i=g.multiply(a).multiply(b).subtract(e.shiftLeft(1)).shiftLeft(2).multiply(e).subtract(g.square().multiply(g)).mod(this.curve.q),j=d.square().multiply(d).shiftLeft(3).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(h),this.curve.fromBigInteger(i),j)}function pointFpMultiply(a){if(this.isInfinity())return this;if(0==a.signum())return this.curve.getInfinity();var b,c=a,d=c.multiply(new BigInteger("3")),e=this.negate(),f=this;for(b=d.bitLength()-2;b>0;--b){f=f.twice();var g=d.testBit(b),h=c.testBit(b);g!=h&&(f=f.add(g?this:e))}return f}function pointFpMultiplyTwo(a,b,c){var d;d=a.bitLength()>c.bitLength()?a.bitLength()-1:c.bitLength()-1;for(var e=this.curve.getInfinity(),f=this.add(b);d>=0;)e=e.twice(),a.testBit(d)?e=e.add(c.testBit(d)?f:this):c.testBit(d)&&(e=e.add(b)),--d;return e}function ECCurveFp(a,b,c){this.q=a,this.a=this.fromBigInteger(b),this.b=this.fromBigInteger(c),this.infinity=new ECPointFp(this,null,null),this.reducer=new Barrett(this.q)}function curveFpGetQ(){return this.q}function curveFpGetA(){return this.a}function curveFpGetB(){return this.b}function curveFpEquals(a){return a==this?!0:this.q.equals(a.q)&&this.a.equals(a.a)&&this.b.equals(a.b)}function curveFpGetInfinity(){return this.infinity}function curveFpFromBigInteger(a){return new ECFieldElementFp(this.q,a)}function curveReduce(a){this.reducer.reduce(a)}function curveFpDecodePointHex(a){switch(parseInt(a.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var b=(a.length-2)/2,c=a.substr(2,b),d=a.substr(b+2,b);return new ECPointFp(this,this.fromBigInteger(new BigInteger(c,16)),this.fromBigInteger(new BigInteger(d,16)));default:return null}}function curveFpEncodePointHex(a){if(a.isInfinity())return"00";var b=a.getX().toBigInteger().toString(16),c=a.getY().toBigInteger().toString(16),d=this.getQ().toString(16).length;for(d%2!=0&&d++;b.length<d;)b="0"+b;for(;c.length<d;)c="0"+c;return"04"+b+c}function BigInteger(a,b,c){null!=a&&("number"==typeof a?this.fromNumber(a,b,c):null==b&&"string"!=typeof a?this.fromString(a,256):this.fromString(a,b))}function nbi(){return new BigInteger(null)}function am1(a,b,c,d,e,f){for(;--f>=0;){var g=b*this[a++]+c[d]+e;e=Math.floor(g/67108864),c[d++]=67108863&g}return e}function am2(a,b,c,d,e,f){for(var g=32767&b,h=b>>15;--f>=0;){var i=32767&this[a],j=this[a++]>>15,k=h*i+j*g;i=g*i+((32767&k)<<15)+c[d]+(1073741823&e),e=(i>>>30)+(k>>>15)+h*j+(e>>>30),c[d++]=1073741823&i}return e}function am3(a,b,c,d,e,f){for(var g=16383&b,h=b>>14;--f>=0;){var i=16383&this[a],j=this[a++]>>14,k=h*i+j*g;i=g*i+((16383&k)<<14)+c[d]+e,e=(i>>28)+(k>>14)+h*j,c[d++]=268435455&i}return e}function int2char(a){return BI_RM.charAt(a)}function intAt(a,b){var c=BI_RC[a.charCodeAt(b)];return null==c?-1:c}function bnpCopyTo(a){for(var b=this.t-1;b>=0;--b)a[b]=this[b];a.t=this.t,a.s=this.s}function bnpFromInt(a){this.t=1,this.s=0>a?-1:0,a>0?this[0]=a:-1>a?this[0]=a+this.DV:this.t=0}function nbv(a){var b=nbi();return b.fromInt(a),b}function bnpFromString(a,b){var c;if(16==b)c=4;else if(8==b)c=3;else if(256==b)c=8;else if(2==b)c=1;else if(32==b)c=5;else{if(4!=b)return void this.fromRadix(a,b);c=2}this.t=0,this.s=0;for(var d=a.length,e=!1,f=0;--d>=0;){var g=8==c?255&a[d]:intAt(a,d);0>g?"-"==a.charAt(d)&&(e=!0):(e=!1,0==f?this[this.t++]=g:f+c>this.DB?(this[this.t-1]|=(g&(1<<this.DB-f)-1)<<f,this[this.t++]=g>>this.DB-f):this[this.t-1]|=g<<f,f+=c,f>=this.DB&&(f-=this.DB))}8==c&&0!=(128&a[0])&&(this.s=-1,f>0&&(this[this.t-1]|=(1<<this.DB-f)-1<<f)),this.clamp(),e&&BigInteger.ZERO.subTo(this,this)}function bnpClamp(){for(var a=this.s&this.DM;this.t>0&&this[this.t-1]==a;)--this.t}function bnToString(a){if(this.s<0)return"-"+this.negate().toString(a);var b;if(16==a)b=4;else if(8==a)b=3;else if(2==a)b=1;else if(32==a)b=5;else{if(4!=a)return this.toRadix(a);b=2}var c,d=(1<<b)-1,e=!1,f="",g=this.t,h=this.DB-g*this.DB%b;if(g-->0)for(h<this.DB&&(c=this[g]>>h)>0&&(e=!0,f=int2char(c));g>=0;)b>h?(c=(this[g]&(1<<h)-1)<<b-h,c|=this[--g]>>(h+=this.DB-b)):(c=this[g]>>(h-=b)&d,0>=h&&(h+=this.DB,--g)),c>0&&(e=!0),e&&(f+=int2char(c));return e?f:"0"}function bnNegate(){var a=nbi();return BigInteger.ZERO.subTo(this,a),a}function bnAbs(){return this.s<0?this.negate():this}function bnCompareTo(a){var b=this.s-a.s;if(0!=b)return b;var c=this.t;if(b=c-a.t,0!=b)return this.s<0?-b:b;for(;--c>=0;)if(0!=(b=this[c]-a[c]))return b;return 0}function nbits(a){var b,c=1;return 0!=(b=a>>>16)&&(a=b,c+=16),0!=(b=a>>8)&&(a=b,c+=8),0!=(b=a>>4)&&(a=b,c+=4),0!=(b=a>>2)&&(a=b,c+=2),0!=(b=a>>1)&&(a=b,c+=1),c}function bnBitLength(){return this.t<=0?0:this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnpDLShiftTo(a,b){var c;for(c=this.t-1;c>=0;--c)b[c+a]=this[c];for(c=a-1;c>=0;--c)b[c]=0;b.t=this.t+a,b.s=this.s}function bnpDRShiftTo(a,b){for(var c=a;c<this.t;++c)b[c-a]=this[c];b.t=Math.max(this.t-a,0),b.s=this.s}function bnpLShiftTo(a,b){var c,d=a%this.DB,e=this.DB-d,f=(1<<e)-1,g=Math.floor(a/this.DB),h=this.s<<d&this.DM;for(c=this.t-1;c>=0;--c)b[c+g+1]=this[c]>>e|h,h=(this[c]&f)<<d;for(c=g-1;c>=0;--c)b[c]=0;b[g]=h,b.t=this.t+g+1,b.s=this.s,b.clamp()}function bnpRShiftTo(a,b){b.s=this.s;var c=Math.floor(a/this.DB);if(c>=this.t)return void(b.t=0);var d=a%this.DB,e=this.DB-d,f=(1<<d)-1;b[0]=this[c]>>d;for(var g=c+1;g<this.t;++g)b[g-c-1]|=(this[g]&f)<<e,b[g-c]=this[g]>>d;d>0&&(b[this.t-c-1]|=(this.s&f)<<e),b.t=this.t-c,b.clamp()}function bnpSubTo(a,b){for(var c=0,d=0,e=Math.min(a.t,this.t);e>c;)d+=this[c]-a[c],b[c++]=d&this.DM,d>>=this.DB;if(a.t<this.t){for(d-=a.s;c<this.t;)d+=this[c],b[c++]=d&this.DM,d>>=this.DB;d+=this.s}else{for(d+=this.s;c<a.t;)d-=a[c],b[c++]=d&this.DM,d>>=this.DB;d-=a.s}b.s=0>d?-1:0,-1>d?b[c++]=this.DV+d:d>0&&(b[c++]=d),b.t=c,b.clamp()}function bnpMultiplyTo(a,b){var c=this.abs(),d=a.abs(),e=c.t;for(b.t=e+d.t;--e>=0;)b[e]=0;for(e=0;e<d.t;++e)b[e+c.t]=c.am(0,d[e],b,e,0,c.t);b.s=0,b.clamp(),this.s!=a.s&&BigInteger.ZERO.subTo(b,b)}function bnpSquareTo(a){for(var b=this.abs(),c=a.t=2*b.t;--c>=0;)a[c]=0;for(c=0;c<b.t-1;++c){var d=b.am(c,b[c],a,2*c,0,1);(a[c+b.t]+=b.am(c+1,2*b[c],a,2*c+1,d,b.t-c-1))>=b.DV&&(a[c+b.t]-=b.DV,a[c+b.t+1]=1)}a.t>0&&(a[a.t-1]+=b.am(c,b[c],a,2*c,0,1)),a.s=0,a.clamp()}function bnpDivRemTo(a,b,c){var d=a.abs();if(!(d.t<=0)){var e=this.abs();if(e.t<d.t)return null!=b&&b.fromInt(0),void(null!=c&&this.copyTo(c));null==c&&(c=nbi());var f=nbi(),g=this.s,h=a.s,i=this.DB-nbits(d[d.t-1]);i>0?(d.lShiftTo(i,f),e.lShiftTo(i,c)):(d.copyTo(f),e.copyTo(c));var j=f.t,k=f[j-1];if(0!=k){var l=k*(1<<this.F1)+(j>1?f[j-2]>>this.F2:0),m=this.FV/l,n=(1<<this.F1)/l,o=1<<this.F2,p=c.t,q=p-j,r=null==b?nbi():b;for(f.dlShiftTo(q,r),c.compareTo(r)>=0&&(c[c.t++]=1,c.subTo(r,c)),BigInteger.ONE.dlShiftTo(j,r),r.subTo(f,f);f.t<j;)f[f.t++]=0;for(;--q>=0;){var s=c[--p]==k?this.DM:Math.floor(c[p]*m+(c[p-1]+o)*n);if((c[p]+=f.am(0,s,c,q,0,j))<s)for(f.dlShiftTo(q,r),c.subTo(r,c);c[p]<--s;)c.subTo(r,c)}null!=b&&(c.drShiftTo(j,b),g!=h&&BigInteger.ZERO.subTo(b,b)),c.t=j,c.clamp(),i>0&&c.rShiftTo(i,c),0>g&&BigInteger.ZERO.subTo(c,c)}}}function bnMod(a){var b=nbi();return this.abs().divRemTo(a,null,b),this.s<0&&b.compareTo(BigInteger.ZERO)>0&&a.subTo(b,b),b}function Classic(a){this.m=a}function cConvert(a){return a.s<0||a.compareTo(this.m)>=0?a.mod(this.m):a}function cRevert(a){return a}function cReduce(a){a.divRemTo(this.m,null,a)}function cMulTo(a,b,c){a.multiplyTo(b,c),this.reduce(c)}function cSqrTo(a,b){a.squareTo(b),this.reduce(b)}function bnpInvDigit(){if(this.t<1)return 0;var a=this[0];if(0==(1&a))return 0;var b=3&a;return b=b*(2-(15&a)*b)&15,b=b*(2-(255&a)*b)&255,b=b*(2-((65535&a)*b&65535))&65535,b=b*(2-a*b%this.DV)%this.DV,b>0?this.DV-b:-b}function Montgomery(a){this.m=a,this.mp=a.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<a.DB-15)-1,this.mt2=2*a.t}function montConvert(a){var b=nbi();return a.abs().dlShiftTo(this.m.t,b),b.divRemTo(this.m,null,b),a.s<0&&b.compareTo(BigInteger.ZERO)>0&&this.m.subTo(b,b),b}function montRevert(a){var b=nbi();return a.copyTo(b),this.reduce(b),b}function montReduce(a){for(;a.t<=this.mt2;)a[a.t++]=0;for(var b=0;b<this.m.t;++b){var c=32767&a[b],d=c*this.mpl+((c*this.mph+(a[b]>>15)*this.mpl&this.um)<<15)&a.DM;for(c=b+this.m.t,a[c]+=this.m.am(0,d,a,b,0,this.m.t);a[c]>=a.DV;)a[c]-=a.DV,a[++c]++}a.clamp(),a.drShiftTo(this.m.t,a),a.compareTo(this.m)>=0&&a.subTo(this.m,a)}function montSqrTo(a,b){a.squareTo(b),this.reduce(b)}function montMulTo(a,b,c){a.multiplyTo(b,c),this.reduce(c)}function bnpIsEven(){return 0==(this.t>0?1&this[0]:this.s)}function bnpExp(a,b){if(a>4294967295||1>a)return BigInteger.ONE;var c=nbi(),d=nbi(),e=b.convert(this),f=nbits(a)-1;for(e.copyTo(c);--f>=0;)if(b.sqrTo(c,d),(a&1<<f)>0)b.mulTo(d,e,c);else{var g=c;c=d,d=g}return b.revert(c)}function bnModPowInt(a,b){var c;return c=256>a||b.isEven()?new Classic(b):new Montgomery(b),this.exp(a,c)}function Arcfour(){this.i=0,this.j=0,this.S=new Array}function ARC4init(a){var b,c,d;for(b=0;256>b;++b)this.S[b]=b;for(c=0,b=0;256>b;++b)c=c+this.S[b]+a[b%a.length]&255,d=this.S[b],this.S[b]=this.S[c],this.S[c]=d;this.i=0,this.j=0}function ARC4next(){var a;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,a=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=a,this.S[a+this.S[this.i]&255]}function prng_newstate(){return new Arcfour}function rng_seed_int(a){rng_pool[rng_pptr++]^=255&a,rng_pool[rng_pptr++]^=a>>8&255,rng_pool[rng_pptr++]^=a>>16&255,rng_pool[rng_pptr++]^=a>>24&255,rng_pptr>=rng_psize&&(rng_pptr-=rng_psize)}function rng_seed_time(){rng_seed_int((new Date).getTime())}function rng_get_byte(){if(null==rng_state){for(rng_seed_time(),rng_state=prng_newstate(),rng_state.init(rng_pool),rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr)rng_pool[rng_pptr]=0;rng_pptr=0}return rng_state.next()}function rng_get_bytes(a){var b;for(b=0;b<a.length;++b)a[b]=rng_get_byte()}function SecureRandom(){}function parseBigInt(a,b){return new BigInteger(a,b)}function linebrk(a,b){for(var c="",d=0;d+b<a.length;)c+=a.substring(d,d+b)+"\n",d+=b;return c+a.substring(d,a.length)}function byte2Hex(a){return 16>a?"0"+a.toString(16):a.toString(16)}function pkcs1pad2(a,b){if(b<a.length+11)return alert("Message too long for RSA"),null;for(var c=new Array,d=a.length-1;d>=0&&b>0;){var e=a.charCodeAt(d--);128>e?c[--b]=e:e>127&&2048>e?(c[--b]=63&e|128,c[--b]=e>>6|192):(c[--b]=63&e|128,c[--b]=e>>6&63|128,c[--b]=e>>12|224)}c[--b]=0;for(var f=new SecureRandom,g=new Array;b>2;){for(g[0]=0;0==g[0];)f.nextBytes(g);c[--b]=g[0]}return c[--b]=2,c[--b]=0,new BigInteger(c)}function RSAKey(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}function RSASetPublic(a,b){null!=a&&null!=b&&a.length>0&&b.length>0?(this.n=parseBigInt(a,16),this.e=parseInt(b,16)):alert("Invalid RSA public key")}function RSADoPublic(a){return a.modPowInt(this.e,this.n)}function RSAEncrypt(a){var b=pkcs1pad2(a,this.n.bitLength()+7>>3);if(null==b)return null;var c=this.doPublic(b);if(null==c)return null;var d=c.toString(16);return 0==(1&d.length)?d:"0"+d}function X9ECParameters(a,b,c,d){this.curve=a,this.g=b,this.n=c,this.h=d}function x9getCurve(){return this.curve}function x9getG(){return this.g}function x9getN(){return this.n}function x9getH(){return this.h}function fromHex(a){return new BigInteger(a,16)}function secp128r1(){var a=fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF"),b=fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC"),c=fromHex("E87579C11079F43DD824993C2CEE5ED3"),d=fromHex("FFFFFFFE0000000075A30D1B9038A115"),e=BigInteger.ONE,f=new ECCurveFp(a,b,c),g=f.decodePointHex("04161FF7528B899B2D0C28607CA52C5B86CF5AC8395BAFEB13C02DA292DDED7A83");return new X9ECParameters(f,g,d,e)}function secp160k1(){var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73"),b=BigInteger.ZERO,c=fromHex("7"),d=fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3"),e=BigInteger.ONE,f=new ECCurveFp(a,b,c),g=f.decodePointHex("043B4C382CE37AA192A4019E763036F4F5DD4D7EBB938CF935318FDCED6BC28286531733C3F03C4FEE");return new X9ECParameters(f,g,d,e)}function secp160r1(){var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF"),b=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC"),c=fromHex("1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45"),d=fromHex("0100000000000000000001F4C8F927AED3CA752257"),e=BigInteger.ONE,f=new ECCurveFp(a,b,c),g=f.decodePointHex("044A96B5688EF573284664698968C38BB913CBFC8223A628553168947D59DCC912042351377AC5FB32");return new X9ECParameters(f,g,d,e)}function secp192k1(){var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37"),b=BigInteger.ZERO,c=fromHex("3"),d=fromHex("FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D"),e=BigInteger.ONE,f=new ECCurveFp(a,b,c),g=f.decodePointHex("04DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D");return new X9ECParameters(f,g,d,e)}function secp192r1(){var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF"),b=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC"),c=fromHex("64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1"),d=fromHex("FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831"),e=BigInteger.ONE,f=new ECCurveFp(a,b,c),g=f.decodePointHex("04188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF101207192B95FFC8DA78631011ED6B24CDD573F977A11E794811");return new X9ECParameters(f,g,d,e)}function secp224r1(){var a=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001"),b=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE"),c=fromHex("B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4"),d=fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D"),e=BigInteger.ONE,f=new ECCurveFp(a,b,c),g=f.decodePointHex("04B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34");return new X9ECParameters(f,g,d,e)}function secp256r1(){var a=fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF"),b=fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC"),c=fromHex("5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B"),d=fromHex("FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551"),e=BigInteger.ONE,f=new ECCurveFp(a,b,c),g=f.decodePointHex("046B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C2964FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5");return new X9ECParameters(f,g,d,e)}function getSECCurveByName(a){return"secp128r1"==a?secp128r1():"secp160k1"==a?secp160k1():"secp160r1"==a?secp160r1():"secp192k1"==a?secp192k1():"secp192r1"==a?secp192r1():"secp224r1"==a?secp224r1():"secp256r1"==a?secp256r1():null}function rotateRight(a,b){return b>>>a|b<<32-a}function choice(a,b,c){return a&b^~a&c}function majority(a,b,c){return a&b^a&c^b&c}function sha256_Sigma0(a){return rotateRight(2,a)^rotateRight(13,a)^rotateRight(22,a)}function sha256_Sigma1(a){return rotateRight(6,a)^rotateRight(11,a)^rotateRight(25,a)}function sha256_sigma0(a){return rotateRight(7,a)^rotateRight(18,a)^a>>>3}function sha256_sigma1(a){return rotateRight(17,a)^rotateRight(19,a)^a>>>10}function sha256_expand(a,b){return a[15&b]+=sha256_sigma1(a[b+14&15])+a[b+9&15]+sha256_sigma0(a[b+1&15])}function safe_add(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function sha256_init(){ihash=new Array(8),count=new Array(2),buffer=new Array(64),count[0]=count[1]=0,ihash[0]=1779033703,ihash[1]=3144134277,ihash[2]=1013904242,ihash[3]=2773480762,ihash[4]=1359893119,ihash[5]=2600822924,ihash[6]=528734635,ihash[7]=1541459225}function sha256_transform(){var a,b,c,d,e,f,g,h,i,j,k=new Array(16);a=ihash[0],b=ihash[1],c=ihash[2],d=ihash[3],e=ihash[4],f=ihash[5],g=ihash[6],h=ihash[7];for(var l=0;16>l;l++)k[l]=buffer[(l<<2)+3]|buffer[(l<<2)+2]<<8|buffer[(l<<2)+1]<<16|buffer[l<<2]<<24;for(var m=0;64>m;m++)i=h+sha256_Sigma1(e)+choice(e,f,g)+K256[m],i+=16>m?k[m]:sha256_expand(k,m),j=sha256_Sigma0(a)+majority(a,b,c),h=g,g=f,f=e,e=safe_add(d,i),d=c,c=b,b=a,a=safe_add(i,j);ihash[0]+=a,ihash[1]+=b,ihash[2]+=c,ihash[3]+=d,ihash[4]+=e,ihash[5]+=f,ihash[6]+=g,ihash[7]+=h}function sha256_update(a,b){var c,d,e=0;d=count[0]>>3&63;var f=63&b;for((count[0]+=b<<3)<b<<3&&count[1]++,count[1]+=b>>29,c=0;b>c+63;c+=64){for(var g=d;64>g;g++)buffer[g]=a.charCodeAt(e++);sha256_transform(),d=0}for(var g=0;f>g;g++)buffer[g]=a.charCodeAt(e++)}function sha256_final(){var a=count[0]>>3&63;if(buffer[a++]=128,56>=a)for(var b=a;56>b;b++)buffer[b]=0;else{for(var b=a;64>b;b++)buffer[b]=0;sha256_transform();for(var b=0;56>b;b++)buffer[b]=0}buffer[56]=count[1]>>>24&255,buffer[57]=count[1]>>>16&255,buffer[58]=count[1]>>>8&255,buffer[59]=255&count[1],buffer[60]=count[0]>>>24&255,buffer[61]=count[0]>>>16&255,buffer[62]=count[0]>>>8&255,buffer[63]=255&count[0],sha256_transform()}function sha256_encode_bytes(){for(var a=0,b=new Array(32),c=0;8>c;c++)b[a++]=ihash[c]>>>24&255,b[a++]=ihash[c]>>>16&255,b[a++]=ihash[c]>>>8&255,b[a++]=255&ihash[c];return b}function sha256_encode_hex(){for(var a=new String,b=0;8>b;b++)for(var c=28;c>=0;c-=4)a+=sha256_hex_digits.charAt(ihash[b]>>>c&15);return a}function sha256_digest(a){return sha256_init(),sha256_update(a,a.length),sha256_final(),sha256_encode_hex()}function sha256_self_test(){return"f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650"==sha256_digest("message digest")}var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64padchar="=";ECFieldElementFp.prototype.equals=feFpEquals,ECFieldElementFp.prototype.toBigInteger=feFpToBigInteger,ECFieldElementFp.prototype.negate=feFpNegate,ECFieldElementFp.prototype.add=feFpAdd,ECFieldElementFp.prototype.subtract=feFpSubtract,ECFieldElementFp.prototype.multiply=feFpMultiply,ECFieldElementFp.prototype.square=feFpSquare,ECFieldElementFp.prototype.divide=feFpDivide,ECPointFp.prototype.getX=pointFpGetX,ECPointFp.prototype.getY=pointFpGetY,ECPointFp.prototype.equals=pointFpEquals,ECPointFp.prototype.isInfinity=pointFpIsInfinity,ECPointFp.prototype.negate=pointFpNegate,ECPointFp.prototype.add=pointFpAdd,ECPointFp.prototype.twice=pointFpTwice,ECPointFp.prototype.multiply=pointFpMultiply,ECPointFp.prototype.multiplyTwo=pointFpMultiplyTwo,ECCurveFp.prototype.getQ=curveFpGetQ,ECCurveFp.prototype.getA=curveFpGetA,ECCurveFp.prototype.getB=curveFpGetB,ECCurveFp.prototype.equals=curveFpEquals,ECCurveFp.prototype.getInfinity=curveFpGetInfinity,ECCurveFp.prototype.fromBigInteger=curveFpFromBigInteger,ECCurveFp.prototype.reduce=curveReduce,ECCurveFp.prototype.decodePointHex=curveFpDecodePointHex,ECCurveFp.prototype.encodePointHex=curveFpEncodePointHex;var dbits,canary=0xdeadbeefcafe,j_lm=15715070==(16777215&canary);j_lm&&"Microsoft Internet Explorer"==navigator.appName?(BigInteger.prototype.am=am2,dbits=30):j_lm&&"Netscape"!=navigator.appName?(BigInteger.prototype.am=am1,dbits=26):(BigInteger.prototype.am=am3,dbits=28),BigInteger.prototype.DB=dbits,BigInteger.prototype.DM=(1<<dbits)-1,BigInteger.prototype.DV=1<<dbits;var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP),BigInteger.prototype.F1=BI_FP-dbits,BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz",BI_RC=new Array,rr,vv;for(rr="0".charCodeAt(0),vv=0;9>=vv;++vv)BI_RC[rr++]=vv;for(rr="a".charCodeAt(0),vv=10;36>vv;++vv)BI_RC[rr++]=vv;for(rr="A".charCodeAt(0),vv=10;36>vv;++vv)BI_RC[rr++]=vv;Classic.prototype.convert=cConvert,Classic.prototype.revert=cRevert,Classic.prototype.reduce=cReduce,Classic.prototype.mulTo=cMulTo,Classic.prototype.sqrTo=cSqrTo,Montgomery.prototype.convert=montConvert,Montgomery.prototype.revert=montRevert,Montgomery.prototype.reduce=montReduce,Montgomery.prototype.mulTo=montMulTo,Montgomery.prototype.sqrTo=montSqrTo,BigInteger.prototype.copyTo=bnpCopyTo,BigInteger.prototype.fromInt=bnpFromInt,BigInteger.prototype.fromString=bnpFromString,BigInteger.prototype.clamp=bnpClamp,BigInteger.prototype.dlShiftTo=bnpDLShiftTo,BigInteger.prototype.drShiftTo=bnpDRShiftTo,BigInteger.prototype.lShiftTo=bnpLShiftTo,BigInteger.prototype.rShiftTo=bnpRShiftTo,BigInteger.prototype.subTo=bnpSubTo,BigInteger.prototype.multiplyTo=bnpMultiplyTo,BigInteger.prototype.squareTo=bnpSquareTo,BigInteger.prototype.divRemTo=bnpDivRemTo,BigInteger.prototype.invDigit=bnpInvDigit,BigInteger.prototype.isEven=bnpIsEven,BigInteger.prototype.exp=bnpExp,BigInteger.prototype.toString=bnToString,BigInteger.prototype.negate=bnNegate,BigInteger.prototype.abs=bnAbs,BigInteger.prototype.compareTo=bnCompareTo,BigInteger.prototype.bitLength=bnBitLength,BigInteger.prototype.mod=bnMod,BigInteger.prototype.modPowInt=bnModPowInt,BigInteger.ZERO=nbv(0),BigInteger.ONE=nbv(1),Arcfour.prototype.init=ARC4init,Arcfour.prototype.next=ARC4next;var rng_psize=256,rng_state,rng_pool,rng_pptr,rng_psize=1024;if(null==rng_pool){rng_pool=new Array,rng_pptr=0;var t;if(window.crypto&&window.crypto.getRandomValues){var ua=new Uint8Array(32);for(window.crypto.getRandomValues(ua),t=0;32>t;++t)rng_pool[rng_pptr++]=ua[t]}if("Netscape"==navigator.appName&&navigator.appVersion<"5"&&window.crypto){var z=window.crypto.random(32);for(t=0;t<z.length;++t)rng_pool[rng_pptr++]=255&z.charCodeAt(t)}for(;rng_psize>rng_pptr;)t=Math.floor(65536*Math.random()),rng_pool[rng_pptr++]=t>>>8,rng_pool[rng_pptr++]=255&t;rng_pptr=0,rng_seed_time()}SecureRandom.prototype.nextBytes=rng_get_bytes,RSAKey.prototype.doPublic=RSADoPublic,RSAKey.prototype.setPublic=RSASetPublic,RSAKey.prototype.encrypt=RSAEncrypt,X9ECParameters.prototype.getCurve=x9getCurve,X9ECParameters.prototype.getG=x9getG,X9ECParameters.prototype.getN=x9getN,X9ECParameters.prototype.getH=x9getH;var K256=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),ihash,count,buffer,sha256_hex_digits="0123456789abcdef";