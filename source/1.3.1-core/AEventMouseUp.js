//==========================================================
// <T>鼠标抬起事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventMouseUp(n){
   var o = this;
   AEvent(o, n, 'mouseup', 'onmouseup');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @atribute
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o._offsetX = null;
   o._offsetY = null;
   o._clientX = null;
   o._clientY = null;
   //..........................................................
   // @method
   o.attach   = AEventMouseUp_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventMouseUp_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
      o._offsetX = p.layerX;
      o._offsetY = p.layerY;
   }else{
      o._x = p.x;
      o._y = p.y;
      o._offsetX = p.offsetX;
      o._offsetY = p.offsetY;
   }
   o._clientX = p.clientX;
   o._clientY = p.clientY;
}
