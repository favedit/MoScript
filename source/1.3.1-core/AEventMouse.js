//==========================================================
// <T>鼠标落下事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150121
//==========================================================
function AEventMouse(o, n, l, h){
   if(!o){o = this;}
   AEvent(o, n, l, h);
   //..........................................................
   // @method
   o.attach = AEventMouse_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
function AEventMouse_attach(e, h){
   e.button = h.button;
   e.mouseLeft = (h.button == EMouseButton.Left);
   e.mouseMiddle = (h.button == EMouseButton.Middle);
   e.mouseRight = (h.button == EMouseButton.Right);
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
      e.offsetX = h.layerX;
      e.offsetY = h.layerY;
   }else{
      e.x = h.x;
      e.y = h.y;
      e.offsetX = h.offsetX;
      e.offsetY = h.offsetY;
   }
   e.clientX = h.clientX;
   e.clientY = h.clientY;
}
