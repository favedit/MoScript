//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sScene(o){
   o = RClass.inherits(this, o, FE3sResource);
   //..........................................................
   // @attribute
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._layers     = null;
   //..........................................................
   // @method
   o.construct   = FE3sScene_construct;
   // @method
   o.technique   = FE3sScene_technique;
   o.region      = FE3sScene_region;
   o.layers      = FE3sScene_layers;
   // @method
   o.unserialize = FE3sScene_unserialize;
   o.saveConfig  = FE3sScene_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = RClass.create(FE3sSceneTechnique);
   o._region = RClass.create(FE3sSceneRegion);
   o._layers = new TDictionary();
}

//==========================================================
// <T>获得技术。</T>
//
// @method
// @return 技术
//==========================================================
function FE3sScene_technique(){
   return this._technique;
}

//==========================================================
// <T>获得区域。</T>
//
// @method
// @return 区域
//==========================================================
function FE3sScene_region(){
   return this._region;
}

//==========================================================
// <T>获得层集合。</T>
//
// @method
// @return TDictionary 层集合
//==========================================================
function FE3sScene_layers(){
   return this._layers;
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
   o._themeCode = p.readString();
   // 读取技术
   o._technique.unserialize(p);
   // 读取区域
   o._region.unserialize(p);
   // 读取场景层
   var c = p.readInt16();
   for(var i = 0; i < c; i++){
      var l = RClass.create(FE3sSceneLayer);
      l.unserialize(p);
      o._layers.set(l.code(), l);
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
   o.__base.FE3sResource.saveConfig.call(o, p);
   // 存储属性
   p.setName('Scene');
   p.set('theme_code', o._themeCode);
   // 存储技术
   //o._technique.saveConfig(x.create('Technique'));
   // 存储区域
   //o._region.saveConfig(x.create('Region'));
   // 存储场景层
   var xls = p.create('LayerCollection');
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      var l = ls.value(i);
      l.saveConfig(xls.create('Layer'));
   }
}
