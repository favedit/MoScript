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
   o._materials  = null;
   o._displays   = null;
   o._layers     = null;
   //..........................................................
   // @method
   o.construct   = FE3sSpace_construct;
   // @method
   o.technique   = FE3sSpace_technique;
   o.region      = FE3sSpace_region;
   o.materials   = FE3sSpace_materials;
   o.displays    = FE3sSpace_displays;
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
// <T>获得材质集合。</T>
//
// @method
// @return TDictionary 材质集合
//==========================================================
function FE3sSpace_materials(){
   return this._materials;
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return TDictionary 显示集合
//==========================================================
function FE3sSpace_displays(){
   return this._displays;
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
// @param input:FByteStream 数据流
//==========================================================
function FE3sSpace_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   var resourceConsole = RConsole.find(FE3sResourceConsole);
   var materialConsole = RConsole.find(FE3sMaterialConsole);
   // 读取技术
   o._technique.unserialize(input);
   // 读取区域
   o._region.unserialize(input);
   //..........................................................
   // 读取材质集合
   var materialCount = input.readInt16();
   if(materialCount > 0){
      var materials = o._materials = new TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
      }
   }
   //..........................................................
   // 读取显示集合
   var displayCount = input.readInt16();
   if(displayCount > 0){
      var displays = o._displays = new TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = resourceConsole.unserialize(input);
         displays.push(display);
      }
   }
   //..........................................................
   // 读取显示层集合
   var layerCount = input.readInt16();
   if(layerCount > 0){
      var layers = o._layers = new TDictionary();
      for(var i = 0; i < layerCount; i++){
         var layer = RClass.create(FE3sDisplayLayer);
         layer.unserialize(input);
         layers.set(layer.code(), layer);
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
   // 存储技术
   o._technique.saveConfig(p.create('Technique'));
   // 存储区域
   o._region.saveConfig(p.create('Region'));
   //..........................................................
   // 存储材质集合
   var materials = o._materials;
   if(materials){
      var xmaterials = p.create('MaterialCollection');
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         material.saveConfig(xmaterials.create('Material'));
      }
   }
   //..........................................................
   // 存储显示集合
   var displays = o._displays;
   if(displays){
      var xdisplays = p.create('DisplayCollection');
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         display.saveConfig(xdisplays.create('Display'));
      }
   }
   //..........................................................
   // 存储显示层集合
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
