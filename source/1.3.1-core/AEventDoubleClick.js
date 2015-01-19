//==========================================================
// <T>鼠标双击事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventDoubleClick(n){
   var o = this;
   AEvent(o, n, 'dblclick', 'ondblclick');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @method
   o.attach   = AEventDoubleClick_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventDoubleClick_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
