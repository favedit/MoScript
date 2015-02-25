//==========================================================
// <T>数据管理类。</T>
// <P>临时数据只能在不离开函数的范围内使用。</P>
//
// @reference
// @author maocy
// @version 150210
//==========================================================
var RValue = new function RValue(){
   var o = this;
   //..........................................................
   // @attribute
   o.float1    = null;
   o.float2    = null;
   o.float3    = null;
   o.float4    = null;
   o.float9    = null;
   o.float12   = null;
   o.float16   = null;
   // @attribute
   o.double1   = null;
   o.double2   = null;
   o.double3   = null;
   o.double4   = null;
   o.double16  = null;
   o.double16  = null;
   o.double64  = null;
   // @attribute
   o.vector3   = null;
   o.rectangle = null;
   o.matrix    = null;
   //..........................................................
   // @method
   o.construct = RValue_construct;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param s:source:Array 源数组
// @param t:target:Array 目标数组
// @return Boolean
//    <L value='true'>相等</L>
//    <L value='false'>不相等</L>
//==========================================================
function RValue_construct(){
   var o = this;
   // 支持类型数组
   if(RRuntime.supportHtml5()){
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
   }
   // 初始化属性
   o.vector3 = new SVector3();
   o.rectangle = new SRectangle();
   o.matrix = new SMatrix3d();
}
