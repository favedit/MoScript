//==========================================================
// <T>渲染程序常量类型。</T>
//
// @enum
// @author maocy
// @version 141231
//==========================================================
MO.EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   // @member 未知
   o.Unknown = 0;
   // @member 1维浮点数
   o.Float1 = 1;
   // @member 2维浮点数
   o.Float2 = 2;
   // @member 3维浮点数
   o.Float3 = 3;
   // @member 4维浮点数
   o.Float4 = 4;
   // @member 3x3矩阵
   o.Float3x3 = 5;
   // @member 4x3矩阵
   o.Float4x3 = 6;
   // @member 4x4矩阵
   o.Float4x4 = 7;
   return o;
}
