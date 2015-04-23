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
   o.value1         = new Array(1);
   o.value2         = new Array(2);
   o.value3         = new Array(3);
   o.value4         = new Array(4);
   o.value9         = new Array(9);
   o.value12        = new Array(12);
   o.value16        = new Array(16);
   // @attribute
   o.vectorAxisX    = null;
   o.vectorAxisY    = null;
   o.vectorAxisZ    = null;
   o.vectorScale    = null;
   o.vectorForward  = null;
   o.vectorBackward = null;
   // @attribute
   o.vector3        = null;
   o.rectangle      = null;
   o.matrix         = null;
   //..........................................................
   // @method
   o.construct      = RMath_construct;
   o.min            = RMath_min;
   o.max            = RMath_max;
   o.sign           = RMath_sign;
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
   o.vector3 = new SVector3();
   o.rectangle = new SRectangle();
   o.matrix = new SMatrix3d();
}

//==========================================================
// <T>计算参数中的最小值。</T>
//
// @method
// @param arguments:Array 数组
// @return Number 最小值
//==========================================================
function RMath_min(){
   var result = 0;
   var count = arguments.length;
   if(count > 1){
      result = Number.MAX_VALUE;
      for(var i = 0; i < count; i++){
         var value = arguments[i];
         if(value < result){
            result = value;
         }
      }
   }
   return result;
}

//==========================================================
// <T>计算参数中的最大值。</T>
//
// @method
// @param arguments:Array 数组
// @return Number 最大值
//==========================================================
function RMath_max(){
   var result = 0;
   var count = arguments.length;
   if(count > 1){
      result = Number.MIN_VALUE;
      for(var i = 0; i < count; i++){
         var value = arguments[i];
         if(value > result){
            result = value;
         }
      }
   }
   return result;
}

//==========================================================
// <T>计算数值的符号位。</T>
//
// @method
// @param value:Number 数值
// @return Number 符号
//==========================================================
function RMath_sign(value){
   if(value > 0){
      return 1;
   }else if(value < 0){
      return -1;
   }
   return 0;
}
