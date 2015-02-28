//==========================================================
// <T>渲染器类型枚举。</T>
//
// @enum
// @author maocy
// @version 141229
//==========================================================
MO.Graphic3d.EG3dShader = new function EG3dShader(){
   var o = this;
   // @member 未知
   o.Unknown = 0;
   // @member 顶点渲染器
   o.Vertex   = 1;
   // @member 像素渲染器
   o.Fragment = 2;
   return o;
}
