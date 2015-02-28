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
   o.PI             = Math.PI;
   o.PI2            = Math.PI * 2;
   // @attribute
   o.RADIAN_RATE    = 180 / Math.PI;
   o.DEGREE_RATE    = Math.PI / 180;
   // @attribute
   o.PERCENT_10     = 1 / 10;
   o.PERCENT_100    = 1 / 100;
   o.PERCENT_1000   = 1 / 1000;
   //..........................................................
   // @attribute
   o.vectorAxisX    = null;
   o.vectorAxisY    = null;
   o.vectorAxisZ    = null;
   o.vectorScale    = null;
   o.vectorForward  = null;
   o.vectorBackward = null;
   // @attribute
   o.identity4x4    = null;
   //..........................................................
   // @method
   o.construct      = RMath_construct;
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
   // 初始化属性
   o.vectorAxisX = new SVector3(1, 0, 0);
   o.vectorAxisY = new SVector3(0, 1, 0);
   o.vectorAxisZ = new SVector3(0, 0, 1);
   o.vectorScale = new SVector3(1, 1, 1);
   o.vectorForward = new SVector3(0, 0, 1);
   o.vectorBackward = new SVector3(0, 0, -1);
   // 初始化属性
   o.identity4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
