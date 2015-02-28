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
   //..........................................................
   // @method
   o.attachEvent = SMouseEvent_attachEvent;
   return o;

   //==========================================================
   // <T>接收事件信息。</T>
   //
   // @method
   // @param p:event:HtmlEvent 页面事件
   //==========================================================
   function SMouseEvent_attachEvent(p){
      var o = this;
      var hs = o.hSource = RHtml.eventSource(p);
      if(hs){
         o.source = hs.__linker;
      }
      o.button = p.button;
      o.mouseLeft = (p.button == EMouseButton.Left);
      o.mouseMiddle = (p.button == EMouseButton.Middle);
      o.mouseRight = (p.button == EMouseButton.Right);
      o.altKey = p.altKey;
      o.ctrlKey = p.ctrlKey;
      if(RBrowser.isBrowser(EBrowser.FireFox)){
         o.x = p.pageX;
         o.y = p.pageY;
         o.offsetX = p.layerX;
         o.offsetY = p.layerY;
      }else{
         o.x = p.x;
         o.y = p.y;
         o.offsetX = p.offsetX;
         o.offsetY = p.offsetY;
      }
      o.clientX = p.clientX;
      o.clientY = p.clientY;
   }
}
