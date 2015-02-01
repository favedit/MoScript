//==========================================================
// <T>加载事件描述类。</T>
//
// @event
// @param n:name:String 名称
// @author maocy
// @version 150201
//==========================================================
function AEventInputChanged(n){
   var o = this;
   AEvent(o, n, 'input', 'oninput');
   //..........................................................
   // @method
   o.attach = AEventInputChanged_attach;
   o.bind   = AEventInputChanged_bind;
   return o;
}

//==========================================================
// <T>接收事件信息。</T>
//
// @method
// @param e:event:Event 事件
// @param h:htmlEvent:HtmlEvent 页面事件
//==========================================================
function AEventInputChanged_attach(e, h){
}

//==========================================================
// <T>绑定事件。</T>
//
// @method
// @return SEvent 事件对象
// @param h:html:HtmlTag 页面元素
// @param u:capture:Boolean 是否捕捉
//==========================================================
function AEventInputChanged_bind(h, u){
   var o = this;
   if(RBrowser.isBrowser(EBrowser.Explorer)){
      h.onpropertychange = REvent.ohEvent;
   }else{
      h.addEventListener('input', REvent.ohEvent);
   }
}
