//==========================================================
// <T>平面结构。</T>
//
// @struct
// @author maocy
// @version 150116
//==========================================================
function SPlane(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.a         = 0;
   o.b         = 0;
   o.c         = 0;
   o.d         = 0;
   //..........................................................
   // @method
   o.assign    = SPlane_assign;
   o.set       = SPlane_set;
   o.normalize = SPlane_normalize;
   o.dot       = SPlane_dot;
   o.toString  = SPlane_toString;
   o.dump      = SPlane_dump;
   return o;
}

//============================================================
// <T>接收平面数据。</T>
//
// @method
// @param p:value:SPlane 平面
//============================================================
function SPlane_assign(p){
   var o = this;
   o.a = p.a;
   o.b = p.b;
   o.c = p.c;
   o.d = p.d;
}

//============================================================
// <T>设置数据内容。</T>
//
// @method
// @param a:Number 数据
// @param b:Number 数据
// @param c:Number 数据
// @param d:Number 数据
//============================================================
function SPlane_set(pa, pb, pc, pd){
   var o = this;
   o.a = pa;
   o.b = pb;
   o.c = pc;
   o.d = pd;
}

//============================================================
// <T>单位标准化处理。</T>
//
// @method
//============================================================
function SPlane_normalize(){
   var o = this;
   var r = 1 / Math.sqrt((o.a * o.a) + (o.b * o.b) + (o.c * o.c));
   o.a *= r;
   o.b *= r;
   o.c *= r;
   o.d *= r;
}

//============================================================
// <T>点乘处理。</T>
//
// @method
// @param x:Number 数据
// @param y:Number 数据
// @param z:Number 数据
//============================================================
function SPlane_dot(x, y, z){
   var o = this;
   return (x * o.a) + (y * o.b) + (z * o.c ) + o.d;
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
function SPlane_toString(){
   var o = this;
   return o.a + ',' + o.b + ',' + o.c + ',' + o.d;
}

//============================================================
// <T>获得运行信息。</T>
//
// @return String 运行信息
//============================================================
function SPlane_dump(){
   var o = this;
   return RClass.dump(o) + ' [' + o.toString() + ']';
}
