//==========================================================
// <T>颜色。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SColor4(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.red      = 0;
   o.green    = 0;
   o.blue     = 0;
   o.alpha    = 1;
   // @attribute
   o._data     = null;
   //..........................................................
   // @method
   o.assign   = SColor4_assign;
   o.set      = SColor4_set;
   o.data     = SColor4_data;
   o.toString = SColor4_toString;
   return o;
}

//============================================================
// <T>接收数据。</T>
//
// @method
// @param p:value:SColor4 颜色
//============================================================
function SColor4_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}

//============================================================
// <T>设置数据内容。</T>
//
// @param r:red:Number 红色
// @param g:green:Number 绿色
// @param b:blue:Number 蓝色
// @param a:alpha:Number 透明
//============================================================
function SColor4_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}

//============================================================
// <T>获得数据。</T>
//
// @return Float32Array 数据
//============================================================
function SColor4_data(){
   var o = this;
   var d = o._data;
   if(d == null){
      d = o._data = new Float32Array(4);
   }
   d[0] = o.red;
   d[1] = o.green;
   d[2] = o.blue;
   d[2] = o.alpha;
   return d;
}

//============================================================
// <T>获得字符串。</T>
//
// @return String 字符串
//============================================================
function SColor4_toString(){
   var o = this;
   return o.red + ',' + o.green + ',' + o.blue + ',' + o.alpha;
}
