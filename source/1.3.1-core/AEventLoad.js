//==========================================================
// <T>加载事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150119
//==========================================================
function AEventLoad(n){
   var o = this;
   AEvent(o, n, 'load', 'onload');
   //..........................................................
   // @html
   o._hSource = null;
   //..........................................................
   // @method
   o.attach   = AEventLoad_attach;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param p:event:Event 事件
//==========================================================
function AEventLoad_attach(p){
   var o = this;
   o._hSource = p.srcElement;
}
