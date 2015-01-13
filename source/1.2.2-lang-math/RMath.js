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
   o.PI           = null;
   o.PI2          = null;
   // @attribute
   o.RADIAN_RATE  = null;
   o.DEGREE_RATE  = null;
   // @attribute
   o.PERCENT_1000 = 1.0 / 1000.0;
   //..........................................................
   // @attribute
   o.float1       = null;
   o.float2       = null;
   o.float3       = null;
   o.float4       = null;
   o.float9       = null;
   o.float12      = null;
   o.float16      = null;
   // @attribute
   o.double1      = null;
   o.double2      = null;
   o.double3      = null;
   o.double4      = null;
   o.double16     = null;
   o.double16     = null;
   o.double64     = null;
   //..........................................................
   // @attribute
   o.vectorAxisX = null;
   o.vectorAxisY = null;
   o.vectorAxisZ = null;
   //..........................................................
   // @method
   o.construct    = RMath_construct;
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
   // 设置内容
   o.PI = Math.PI;
   o.PI2 = Math.PI * 2;
   o.RADIAN_RATE = 180.0 / Math.PI;
   o.DEGREE_RATE = Math.PI / 180.0;
   // 初始化临时数组
   o.float1 = new Float32Array(1);
   o.float2 = new Float32Array(2);
   o.float3 = new Float32Array(3);
   o.float4 = new Float32Array(4);
   o.float9 = new Float32Array(9);
   o.float12 = new Float32Array(12);
   o.float16 = new Float32Array(16);
   // 初始化临时数组
   o.double1 = new Float64Array(1);
   o.double2 = new Float64Array(2);
   o.double3 = new Float64Array(3);
   o.double4 = new Float64Array(4);
   o.double9 = new Float64Array(9);
   o.double12 = new Float64Array(12);
   o.double16 = new Float64Array(16);
   // 初始化方向轴
   o.vectorAxisX = new SVector3();
   o.vectorAxisX.set(1.0, 0.0, 0.0);
   o.vectorAxisY = new SVector3();
   o.vectorAxisY.set(0.0, 1.0, 0.0);
   o.vectorAxisZ = new SVector3();
   o.vectorAxisZ.set(0.0, 0.0, 1.0);
}
