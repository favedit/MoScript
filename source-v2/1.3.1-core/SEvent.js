//==========================================================
// <T>事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
function SEvent(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.annotation = null;
   // @attribute
   o.source     = null;
   o.hSender    = null;
   o.hSource    = null;
   //..........................................................
   // @method
   o.ohProcess  = null;
   o.onProcess  = null;
   // @method
   o.process    = null;
   // @method
   o.dispose    = SEvent_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function SEvent_dispose(){
   var o = this;
   for(var n in o){
      o[n] = null;
   }
}
