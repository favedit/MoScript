//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
MO.SEvent = function SEvent(sender){
   var o = this;
   //..........................................................
   // @attribute
   o.code       = null;
   // @attribute
   o.annotation = null;
   // @attribute
   o.listener   = null;
   o.sender     = sender;
   o.source     = null;
   // @attribute
   o.hEvent     = null;
   o.hSender    = null;
   o.hSource    = null;
   //..........................................................
   // @method
   o.ohProcess  = null;
   o.onProcess  = null;
   // @method
   o.process    = null;
   // @method
   o.dispose    = MO.SEvent_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SEvent_dispose = function SEvent_dispose(){
   var o = this;
   for(var name in o){
      o[name] = null;
   }
}
