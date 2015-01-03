//==========================================================
// <T>数学函数管理类</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
var RMath = new function RMath(){
   var o = this;
   //..........................................................
   // @attribute
   o.PI          = null;
   o.PI2         = null;
   o.RADIAN_RATE = null;
   o.DEGREE_RATE = null;
   //..........................................................
   // @method
   o.construct = RMath_construct;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//==========================================================
// <T>判断数组内所有内容是否全部相同。</T>
//
// @method
// @param s:source:Array 源数组
// @param t:target:Array 目标数组
// @return Boolean
//    <L value='true'>相等</L>
//    <L value='false'>不相等</L>
//==========================================================
function RMath_construct(){
   var o = this;
   o.PI = Math.PI;
   o.PI2 = Math.PI * 2;
   o.RADIAN_RATE = 180.0 / Math.PI;
   o.DEGREE_RATE = Math.PI / 180.0;
}
