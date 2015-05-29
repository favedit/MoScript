//==========================================================
// <T>渲染属性类型枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
MO.EG3dAttributeFormat = new function EG3dAttributeFormat(){
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
   // @member 字节
   o.Byte4 = 5;
   // @member 规范化字节
   o.Byte4Normal = 6;
   return o;
}
