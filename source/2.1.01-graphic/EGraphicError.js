//==========================================================
// <T>图形错误枚举。</T>
//
// @enum
// @author maocy
// @version 150716
//==========================================================
MO.EGraphicError = new function EGraphicError(){
   var o = this;
   // @member 不支持2D绘制
   o.Unsupport2d    = 'unsupport.2d';
   // @member 不支持WEBGL绘制
   o.UnsupportWebGL = 'unsupport.webgL';
   return o;
}
