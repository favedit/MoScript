//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Scene(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._layers     = null;
   //..........................................................
   // @method
   o.construct   = FRs3Scene_construct;
   // @method
   o.technique   = FRs3Scene_technique;
   o.region      = FRs3Scene_region;
   o.layers      = FRs3Scene_layers;
   // @method
   o.unserialize = FRs3Scene_unserialize;
   o.saveConfig  = FRs3Scene_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._technique = RClass.create(FRs3SceneTechnique);
   o._region = RClass.create(FRs3SceneRegion);
   o._layers = new TDictionary();
}

//==========================================================
// <T>获得技术。</T>
//
// @method
// @return 技术
//==========================================================
function FRs3Scene_technique(){
   return this._technique;
}

//==========================================================
// <T>获得区域。</T>
//
// @method
// @return 区域
//==========================================================
function FRs3Scene_region(){
   return this._region;
}

//==========================================================
// <T>获得层集合。</T>
//
// @method
// @return TDictionary 层集合
//==========================================================
function FRs3Scene_layers(){
   return this._layers;
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   // 读取属性
   o._themeCode = p.readString();
   // 读取技术
   o._technique.unserialize(p);
   // 读取区域
   o._region.unserialize(p);
   // 读取场景层
   var c = p.readInt16();
   for(var i = 0; i < c; i++){
      var l = RClass.create(FRs3SceneLayer);
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
function FRs3Scene_saveConfig(p){
   var o = this;
   o.__base.FRs3Resource.saveConfig.call(o, p);
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
