//==========================================================
// <T>按键按下事件信息类。</T>
//
// @struct
// @author maocy
// @version 150113
//==========================================================
MO.SMouseEvent = function SMouseEvent(){
   var o = this;
   MO.SEvent.call(o);
   //..........................................................
   // @attribute
   o.button      = null;
   o.mouseLeft   = false;
   o.mouseMiddle = false;
   o.mouseRight  = false;
   o.altKey      = false;
   o.ctrlKey     = false;
   o.x           = 0;
   o.y           = 0;
   o.offsetX     = 0;
   o.offsetY     = 0;
   o.clientX     = 0;
   o.clientY     = 0;
   o.deltaX      = 0;
   o.deltaY      = 0;
   o.deltaZ      = 0;
   //..........................................................
   // @method
   o.attachEvent = MO.SMouseEvent_attachEvent;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param event:HtmlEvent 页面事件
//==========================================================
MO.SMouseEvent_attachEvent = function SMouseEvent_attachEvent(event){
   var o = this;
   var hs = o.hSource = MO.RHtml.eventSource(event);
   if(hs){
      o.source = hs.__linker;
   }
   o.button = event.button;
   o.mouseLeft = (event.button == MO.EMouseButton.Left);
   o.mouseMiddle = (event.button == MO.EMouseButton.Middle);
   o.mouseRight = (event.button == MO.EMouseButton.Right);
   o.altKey = event.altKey;
   o.ctrlKey = event.ctrlKey;
   if(MO.RBrowser.isBrowser(MO.EBrowser.FireFox)){
      o.x = event.pageX;
      o.y = event.pageY;
      o.offsetX = event.layerX;
      o.offsetY = event.layerY;
   }else{
      o.x = event.x;
      o.y = event.y;
      o.offsetX = event.offsetX;
      o.offsetY = event.offsetY;
   }
   o.clientX = event.clientX;
   o.clientY = event.clientY;
   o.deltaX = event.deltaX;
   o.deltaY = event.deltaY;
   o.deltaZ = event.deltaZ;
}
