//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sResource(o){
   o = RClass.inherits(this, o, FResource, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataLoad     = false;
   o._dataReady    = false;
   o._dataSize     = 0;
   o._dataCompress = false;
   o._vendor       = null;
   //..........................................................
   // @event
   o.onComplete    = FE3sResource_onComplete;
   //..........................................................
   // @method
   o.makeLabel     = FE3sResource_makeLabel;
   // @method
   o.vendor        = FE3sResource_vendor;
   o.setVendor     = FE3sResource_setVendor;
   // @method
   o.testReady     = FE3sResource_testReady;
   // @method
   o.unserialize   = FE3sResource_unserialize;
   o.saveConfig    = FE3sResource_saveConfig;
   // @method
   o.load          = FE3sResource_load;
   // @method
   o.dispose       = FE3sResource_dispose;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sResource_onComplete(input){
   var o = this;
   // 创建读取流
   var view = RClass.create(FDataView);
   view.setEndianCd(true);
   if(input.constructor == Array){
      var inputData = new Uint8Array(input);
      view.link(inputData.buffer);
   }else if(input.constructor == Uint8Array){
      view.link(input.buffer);
   }else{
      view.link(input.outputData());
   }
   // 反序列化数据
   o.unserialize(view);
   // 释放资源
   view.dispose();
   // 加载完成
   o._dataReady = true;
   // 加载事件处理
   o.processLoadListener();
}

//==========================================================
// <T>生成显示名称。</T>
//
// @return String 显示名称
//==========================================================
function FE3sResource_makeLabel(){
   var o = this;
   var result = '';
   if(!RString.isEmpty(o._code)){
      result += o._code;
   }
   if(!RString.isEmpty(o._label)){
      result += ' [' + o._label + ']';
   }
   return result;
}

//==========================================================
// <T>获得资源提供商。</T>
//
// @method
// @return Boolean 资源提供商
//==========================================================
function FE3sResource_vendor(){
   return this._vendor;
}

//==========================================================
// <T>设置资源提供商。</T>
//
// @method
// @param p:vendor:FE3sVendor 资源提供商
//==========================================================
function FE3sResource_setVendor(p){
   this._vendor = p;
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
// @param input:FByteStream 数据流
//==========================================================
function FE3sResource_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sResource_saveConfig(xconfig){
   var o = this;
   // 设置类型
   if(!RString.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   // 存储属性
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
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
   if(o._dataCompress){
      c.lsnsLoad.register(o, o.onLoad);
   }else{
      c.lsnsLoad.register(o, o.onComplete);
   }
   o._dataLoad = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sResource_dispose(){
   var o = this;
   o._vendor = null;
   // 父处理
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FConsole.dispose.call(o);
}
