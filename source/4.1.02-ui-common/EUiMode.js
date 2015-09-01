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
   o.Insert = 'I';
   o.Update = 'U';
   o.Delete = 'D';
   o.Search = 'S';
   o.Picker = 'P';
   o.Zoom   = 'Z';
   o.Design = 'G';
   o.Print  = 'R';
   return o;
}
