//==========================================================
// <T>准备状态改变事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventReadyStateChange(n){
   var o = this;
   AEvent(o, n, 'readystatechange', 'onreadystatechange');
   //..........................................................
   // @method
   o.attach = AEventReadyStateChange_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
function AEventReadyStateChange_attach(e, h){
}
