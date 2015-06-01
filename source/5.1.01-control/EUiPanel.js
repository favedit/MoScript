//==========================================================
// <T>面板类型枚举v。</T>
//
// @enum
// @author maocy
// @version 150101
//==========================================================
MO.EPanel = new function EPanel(){
   var o = this;
   // @attribute
   o.Container = 0;
   o.Parent    = 1;
   o.Size      = 8;

   o.Border    = 2;
   o.Edit      = 3;
   o.Focus     = 4;
   o.Design    = 5;
   o.Scroll    = 6;
   o.Shadow    = 7;
   o.Move      = 9;
   o.Disable   = 10;
   o.Drop      = 11;
   return o;
}
