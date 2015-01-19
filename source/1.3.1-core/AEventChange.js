//==========================================================
// <T>内容改变事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventChange(n){
   var o = this;
   AEvent(o, n, 'change', 'onchange');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @method
   o.attach   = AEventChange_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventChange_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
