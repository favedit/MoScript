//==========================================================
// <T>界面绘制事件。</T>
//
// @struct
// @author maocy
// @version 150611
//==========================================================
MO.SGuiPaintEvent = function SGuiPaintEvent(){
   var o = this;
   //..........................................................
   // @method
   o.graphic         = null;
   // @method
   o.parentRectangle = new MO.SRectangle();
   o.rectangle       = new MO.SRectangle();
   //..........................................................
   // @method
   o.free            = MO.SGuiPaintEvent_free;
   o.dispose         = MO.SGuiPaintEvent_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiPaintEvent_free = function SGuiPaintEvent_free(){
   var o = this;
   o.graphic = null;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiPaintEvent_dispose = function SGuiPaintEvent_dispose(){
   var o = this;
   o.parentRectangle = MO.Lang.Object.dispose(o.parentRectangle);
   o.rectangle = MO.Lang.Object.dispose(o.rectangle);
   return o;
}
