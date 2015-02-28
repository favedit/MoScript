//==========================================================
// <T>渲染融合枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
MO.Graphic3d.EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   // @member 未知
   o.None = 0;
   // @member 来源透明
   o.SourceAlpha= 1;
   // @member 1-来源透明
   o.OneMinusSourceAlpha = 2;
   return o;
}
