//==========================================================
// <T>界面更新事件。</T>
//
// @struct
// @author maocy
// @version 150611
//==========================================================
MO.SGuiUpdateEvent = function SGuiUpdateEvent(){
   var o = this;
   //..........................................................
   // @method
   o.rectangle = new MO.SRectangle();
   //..........................................................
   // @method
   o.dispose   = MO.SGuiUpdateEvent_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiUpdateEvent_dispose = function SGuiUpdateEvent_dispose(){
   var o = this;
   o.rectangle = MO.RObject.dispose(o.rectangle);
   return o;
}
