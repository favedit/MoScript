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
   // @attribute
   o.flag      = false;
   o.rectangle = new MO.SRectangle();
   //..........................................................
   // @method
   o.isBefore  = MO.SGuiUpdateEvent_isBefore;
   o.isAfter   = MO.SGuiUpdateEvent_isAfter;
   // @method
   o.dispose   = MO.SGuiUpdateEvent_dispose;
   return o;
}

//==========================================================
// <T>判断是否开始处理。</T>
//
// @method
// @return Boolean 是否开始
//==========================================================
MO.SGuiUpdateEvent_isBefore = function SGuiUpdateEvent_isBefore(){
   return this.flag;
}

//==========================================================
// <T>判断是否结束处理。</T>
//
// @method
// @return Boolean 是否结束
//==========================================================
MO.SGuiUpdateEvent_isAfter = function SGuiUpdateEvent_isAfter(){
   return !this.flag;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiUpdateEvent_dispose = function SGuiUpdateEvent_dispose(){
   var o = this;
   o.rectangle = MO.Lang.Object.dispose(o.rectangle);
   return o;
}
