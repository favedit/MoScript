//==========================================================
// <T>锚点类型枚举。</T>
//
// @enum
// @author maocy
// @version 150701
//==========================================================
MO.EUiAnchor = new function EUiAnchor(){
   var o = this;
   // @attribute
   o.None   = 0;
   o.Left   = 1;
   o.Top    = 2;
   o.Right  = 4;
   o.Bottom = 8;
   o.Width  = 5;
   o.Height = 10;
   o.All    = 15;
   return o;
}
