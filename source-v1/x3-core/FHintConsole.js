// =========================================================
// <T>提示信息的控制台。</T>
// <P>控制一个提示层，逐渐显示和消失。</P>
//
// @console
// @author MAOCY
// @version 1.0.1
// =========================================================
function FHintConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope      = EScope.Page;
   o.hintWindow = null;
   // Method
   o.construct  = FHintConsole_construct;
   o.find       = FHintConsole_find;
   //o.maekHintsetHint    = FHintConsole_find;
   return o;
}
// ------------------------------------------------------------
function FHintConsole_construct(){
}
// ------------------------------------------------------------
function FHintConsole_find(){
   var o = this;
   // 获得提示信息的面板
   var w = o.hintWindow;
   if( !w ){
      w = o.hintWindow = RControl.create(FHintWindow);
   }
   return w;
}
