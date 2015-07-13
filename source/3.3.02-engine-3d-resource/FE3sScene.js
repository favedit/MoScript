//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FE3sScene = function FE3sScene(o){
   o = MO.Class.inherits(this, o, MO.FE3sSpace);
   //..........................................................
   // @attribute
   o._typeName     = 'Scene';
   o._dataCompress = true;
   // @attribute
   o._templates    = null;
   //..........................................................
   // @method
   o.construct     = MO.FE3sScene_construct;
   // @method
   o.unserialize   = MO.FE3sScene_unserialize;
   o.saveConfig    = MO.FE3sScene_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sScene_construct = function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sScene_unserialize = function FE3sScene_unserialize(input){
   var o = this;
   o.__base.FE3sSpace.unserialize.call(o, input);
   // 读取模板集合
   var templateCount = input.readInt16();
   if(templateCount > 0){
      var templateConsole = MO.Console.find(MO.FE3sTemplateConsole);
      var templates = o._templates = new MO.TDictionary();
      for(var i = 0; i < templateCount; i++){
         var template = templateConsole.unserialize(p);
         templates.set(ttemplate.guid(), template);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.FE3sScene_saveConfig = function FE3sScene_saveConfig(p){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, p);
}
