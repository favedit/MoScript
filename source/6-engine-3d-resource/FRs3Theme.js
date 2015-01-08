//==========================================================
// <T>资源主题对象。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3Theme(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._materials  = null;
   //..........................................................
   // @event
   o.onLoad      = FRs3Theme_onLoad;
   //..........................................................
   // @method
   o.load        = FRs3Theme_load;
   o.unserialize = FRs3Theme_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Theme_onLoad(p){
   p = asdf;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Theme_unserialize(p){
   this._name = p.readString();
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Theme_load(u){
   var hc = RClass.create(FHttpConnection);
   hc._asynchronous = true;
   hc.lsnsLoad.register(o, o.onDataLoad);
   hc.send(u);
}
