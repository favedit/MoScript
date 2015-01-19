//==========================================================
// <T>鼠标卷动事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventMouseWheel(n){
   var o = this;
   AEvent(o, n, 'mousewheel', 'onmousewheel');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @attribute
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   ///@attribute 用来保存上下键值
   o._delta   = null;
   //..........................................................
   // @method
   o.attach   = AEventMouseWheel_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventMouseWheel_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   o._delta = p.wheelDelta;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
