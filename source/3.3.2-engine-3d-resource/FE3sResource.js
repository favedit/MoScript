//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sResource(o){
   o = RClass.inherits(this, o, FResource);
   //..........................................................
   // @attribute
   o._dataReady   = false;
   o._dataSize    = 0;
   o._lsnsLoad    = null;
   //..........................................................
   // @event
   o.onLoad       = FE3sResource_onLoad;
   //..........................................................
   // @method
   o.loadListener = FE3sResource_loadListener;
   o.testReady    = FE3sResource_testReady;
   // @method
   o.unserialize  = FE3sResource_unserialize;
   o.saveConfig   = FE3sResource_saveConfig;
   // @method
   o.load         = FE3sResource_load;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sResource_onLoad(p){
   var o = this;
   // 创建读取流
   var v = RClass.create(FDataView);
   v.setEndianCd(true);
   v.link(p.outputData());
   // 反序列化数据
   o.unserialize(v);
   // 释放资源
   v.dispose();
   // 加载完成
   o._dataReady = true;
   // 加载事件处理
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}

//==========================================================
// <T>构造处理</T>
//
// @method
// @return TListeners 监听器集合
//==========================================================
function FE3sResource_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
function FE3sResource_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sResource_unserialize(p){
   var o = this;
   // 检查结果
   var r = p.readInt32();
   if(r != EResult.Success){
      var s = p.readString();
      throw new TError('Unserial resource failure.\n{1}', s);
   }
   // 读取属性
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sResource_saveConfig(p){
   var o = this;
   // 存储属性
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sResource_load(u){
   var o = this;
   var hc = RConsole.find(FHttpConsole);
   var c = hc.send(u);
   c.lsnsLoad.register(o, o.onLoad);
}
