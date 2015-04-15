//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sSpace(o){
   o = RClass.inherits(this, o, FE3sResource);
   //..........................................................
   // @attribute
   o._typeName   = null;
   // @attribute
   o._technique  = null;
   o._region     = null;
   o._layers     = null;
   //..........................................................
   // @method
   o.construct   = FE3sSpace_construct;
   // @method
   o.technique   = FE3sSpace_technique;
   o.region      = FE3sSpace_region;
   o.layers      = FE3sSpace_layers;
   // @method
   o.unserialize = FE3sSpace_unserialize;
   o.saveConfig  = FE3sSpace_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSpace_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = RClass.create(FE3sTechnique);
   o._region = RClass.create(FE3sRegion);
}

//==========================================================
// <T>获得技术。</T>
//
// @method
// @return 技术
//==========================================================
function FE3sSpace_technique(){
   return this._technique;
}

//==========================================================
// <T>获得区域。</T>
//
// @method
// @return 区域
//==========================================================
function FE3sSpace_region(){
   return this._region;
}

//==========================================================
// <T>获得层集合。</T>
//
// @method
// @return TDictionary 层集合
//==========================================================
function FE3sSpace_layers(){
   return this._layers;
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sSpace_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   // 读取技术
   o._technique.unserialize(p);
   // 读取区域
   o._region.unserialize(p);
   // 读取场景层
   var c = p.readInt16();
   if(c > 0){
      var s = o._layers = new TDictionary();
      for(var i = 0; i < c; i++){
         var l = RClass.create(FE3sDisplayLayer);
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
function FE3sSpace_saveConfig(p){
   var o = this;
   o.__base.FE3sResource.saveConfig.call(o, p);
   // 存储属性
   p.setName(o._typeName);
   // 存储技术
   o._technique.saveConfig(p.create('Technique'));
   // 存储区域
   o._region.saveConfig(p.create('Region'));
   // 存储场景层
   var layers = o._layers;
   if(layers){
      var xlayers = p.create('LayerCollection');
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.valueAt(i);
         layer.saveConfig(xlayers.create('Layer'));
      }
   }
}
