//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FE3sResource = function FE3sResource(o){
   o = MO.Class.inherits(this, o, MO.FResource, MO.MListener);
   //..........................................................
   // @attribute
   o._dataLoad      = false;
   o._dataReady     = false;
   o._dataSize      = 0;
   // @attribute
   o._blockSize     = 0;
   o._blockCount    = 0;
   // @attribute
   o._vendor        = MO.Class.register(o, new MO.AGetSet('_vendor'));
   // @attribute
   o._loadListeners = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   //..........................................................
   // @event
   o.onComplete     = MO.FE3sResource_onComplete;
   //..........................................................
   // @method
   o.makeLabel      = MO.FE3sResource_makeLabel;
   // @method
   o.testReady      = MO.FE3sResource_testReady;
   // @method
   o.unserialize    = MO.FE3sResource_unserialize;
   o.saveConfig     = MO.FE3sResource_saveConfig;
   // @method
   o.dispose        = MO.FE3sResource_dispose;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sResource_onComplete = function FE3sResource_onComplete(input){
   var o = this;
   // 读取数据
   if(MO.Class.isClass(input, MO.MDataStream)){
      // 反序列化数据
      o.unserialize(input);
   }else{
      // 创建读取流
      var view = MO.Class.create(MO.FDataView);
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
   }
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
MO.FE3sResource_makeLabel = function FE3sResource_makeLabel(){
   var o = this;
   var result = '';
   if(!MO.Lang.String.isEmpty(o._code)){
      result += o._code;
   }
   if(!MO.Lang.String.isEmpty(o._label)){
      result += ' [' + o._label + ']';
   }
   return result;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.FE3sResource_testReady = function FE3sResource_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sResource_unserialize = function FE3sResource_unserialize(input){
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
MO.FE3sResource_saveConfig = function FE3sResource_saveConfig(xconfig){
   var o = this;
   // 设置类型
   if(!MO.Lang.String.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   // 存储属性
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sResource_dispose = function FE3sResource_dispose(){
   var o = this;
   o._vendor = null;
   // 父处理
   o.__base.MListener.dispose.call(o);
   o.__base.FConsole.dispose.call(o);
}
