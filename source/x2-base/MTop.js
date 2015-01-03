// ============================================================
// MTop
// ============================================================
function MTop(o){
   o = RClass.inherits(this, o, MDisplayAble);
   // Attribute
   o.space          = null;
   // Private Attribute
   o._refreshed     = false;
   // Method
   o.psRefreshFirst = MTop_psRefreshFirst;
   o.topResize      = MTop_topResize;
   return o;
}
// ------------------------------------------------------------
function MTop_psRefreshFirst(){
   var o = this;
   if(!o._refreshed){
      o._refreshed = true;
      o.psRefresh();
   }
}
//==========================================================
// <T>分发改变控件大小的事件</T>
//
// @method
// @see FComponent.process
//==========================================================
function MTop_topResize(c){
   var o = this;
   o.process(new TEventProcess(o, 'oeResize', FControl));
   RConsole.find(FListenerConsole).process(MTop, ETopAction.Resize, o, c);
}
