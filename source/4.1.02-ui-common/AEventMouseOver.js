//==========================================================
// <T>鼠标经过事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
MO.AEventMouseOver = function AEventMouseOver(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseover', 'onmouseover');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @attribute
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   //..........................................................
   // @method
   o.attach   = MO.AEventMouseOver_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
MO.AEventMouseOver_attach = function AEventMouseOver_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
