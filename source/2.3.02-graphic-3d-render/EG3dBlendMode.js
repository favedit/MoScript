//==========================================================
// <T>渲染融合枚举。</T>
//
// @enum
// @author maocy
// @version 141230
//==========================================================
var EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   // @member 0
   o.Zero             = 0;
   // @member 1
   o.One              = 1;
   // @member 来源颜色
   o.SrcColor         = 2;
   // @member 1-来源颜色
   o.OneMinusSrcColor = 3;
   // @member 目标颜色
   o.DstColor         = 4;
   // @member 1-目标颜色
   o.OneMinusDstColor = 5;
   // @member 来源透明
   o.SrcAlpha         = 6;
   // @member 1-来源透明
   o.OneMinusSrcAlpha = 7;
   // @member 目标透明
   o.DstAlpha         = 8;
   // @member 1-来源透明
   o.OneMinusDstAlpha = 9;
   // @member 透明渗透
   o.SrcAlphaSaturate = 10;
   return o;
}
