//==========================================================
// <T>界面模式枚举。</T>
//
// @enum
// @author maocy
// @version 150822
//==========================================================
MO.EUiMode = new function EUiMode(){
   var o = this;
   MO.TEnum.call(o);
   // @member
   o.View   = 'V';
   o.Design = 'S';
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   return o;
}
