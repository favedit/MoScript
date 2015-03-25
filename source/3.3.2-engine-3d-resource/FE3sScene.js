//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sScene(o){
   o = RClass.inherits(this, o, FE3sSpace);
   //..........................................................
   // @attribute
   o._dataCompress = true;
   o._typeName     = 'Scene';
   // @attribute
   o._themeGuid    = null;
   o._themeCode    = null;
   // @attribute
   o._textures     = null;
   o._templates    = null;
   //..........................................................
   // @method
   o.construct     = FE3sScene_construct;
   // @method
   o.unserialize   = FE3sScene_unserialize;
   o.saveConfig    = FE3sScene_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sSpace.construct.call(o);
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sScene_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   // 读取属性
   o._themeGuid = p.readString();
   o._themeCode = p.readString();
   // 读取技术
   o._technique.unserialize(p);
   // 读取区域
   o._region.unserialize(p);
   // 读取纹理集合
   var c = p.readInt16();
   if(c > 0){
      var tc = RConsole.find(FE3sTextureConsole);
      var s = o._textures = new TDictionary();
      for(var i = 0; i < c; i++){
         var t = tc.unserialize(p);
         s.set(t.guid(), t);
      }
   }
   // 读取模板集合
   var c = p.readInt16();
   if(c > 0){
      var tc = RConsole.find(FE3sTemplateConsole);
      var s = o._templates = new TDictionary();
      for(var i = 0; i < c; i++){
         var t = tc.unserialize(p);
         s.set(t.guid(), t);
      }
   }
   // 读取场景层
   var c = p.readInt16();
   if(c > 0){
      var s = o._layers = new TDictionary();
      for(var i = 0; i < c; i++){
         var l = RClass.create(FE3sSceneLayer);
         l.unserialize(p);
         s.set(l.code(), l);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sScene_saveConfig(p){
   var o = this;
   o.__base.FE3sSpace.saveConfig.call(o, p);
   // 存储属性
   p.set('theme_guid', o._themeGuid);
   p.set('theme_code', o._themeCode);
}
