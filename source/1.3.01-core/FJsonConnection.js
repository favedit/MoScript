//==========================================================
// <T>配置通讯链接。</T>
//
// @class
// @author maocy
// @version 150104
//==========================================================
MO.FJsonConnection = function FJsonConnection(o){
   o = MO.Class.inherits(this, o, MO.FHttpConnection);
   //..........................................................
   // @attribute
   o._contentCd           = MO.EHttpContent.Text;
   // @attribute
   o._content             = null;
   // @attribute
   //..........................................................
   // @event
   o.onConnectionComplete = MO.FJsonConnection_onConnectionComplete;
   //..........................................................
   // @method
   o.content              = MO.FJsonConnection_content;
   return o;
}

//==========================================================
// <T>事件响应处理。</T>
//
// @method
//==========================================================
MO.FJsonConnection_onConnectionComplete = function FJsonConnection_onConnectionComplete(){
   var o = this;
   o._statusFree = true;
   // 解析内容
   var content = null;
   var data = o._outputData;
   if(data){
      content = o._content = JSON.parse(data);
   }
   // 加载处理
   var event = o._event;
   event.connection = o;
   event.data = data;
   event.content = content;
   o.processLoadListener(event);
   // 完成处理
   o.processCompleteListener(event);
}

//==========================================================
// <T>获得内容。</T>
//
// @return Object 内容
//==========================================================
MO.FJsonConnection_content = function FJsonConnection_content(){
   return this._content;
}
