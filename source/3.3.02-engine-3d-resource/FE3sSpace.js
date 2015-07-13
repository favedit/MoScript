//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FE3sSpace = function FE3sSpace(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   //..........................................................
   // @attribute
   o._typeName   = null;
   // @attribute
   o._technique  = MO.Class.register(o, new MO.AGetter('_technique'));
   o._region     = MO.Class.register(o, new MO.AGetter('_region'));
   o._materials  = MO.Class.register(o, new MO.AGetter('_materials'));
   o._displays   = MO.Class.register(o, new MO.AGetter('_displays'));
   o._layers     = MO.Class.register(o, new MO.AGetter('_layers'));
   //..........................................................
   // @method
   o.construct   = MO.FE3sSpace_construct;
   // @method
   o.unserialize = MO.FE3sSpace_unserialize;
   o.saveConfig  = MO.FE3sSpace_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sSpace_construct = function FE3sSpace_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = MO.Class.create(MO.FE3sTechnique);
   o._region = MO.Class.create(MO.FE3sRegion);
}

//==========================================================
// <T>从输入流里反序列化信息内容。</T>
//
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sSpace_unserialize = function FE3sSpace_unserialize(input){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, input);
   var resourceConsole = MO.Console.find(MO.FE3sResourceConsole);
   var materialConsole = MO.Console.find(MO.FE3sMaterialConsole);
   // 读取技术
   o._technique.unserialize(input);
   // 读取区域
   o._region.unserialize(input);
   //..........................................................
   // 读取材质集合
   var materialCount = input.readInt16();
   if(materialCount > 0){
      var materials = o._materials = new MO.TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
      }
   }
   //..........................................................
   // 读取显示集合
   var displayCount = input.readInt16();
   if(displayCount > 0){
      var displays = o._displays = new MO.TObjects();
      for(var i = 0; i < displayCount; i++){
         var display = resourceConsole.unserialize(input);
         displays.push(display);
      }
   }
   //..........................................................
   // 读取显示层集合
   var layerCount = input.readInt16();
   if(layerCount > 0){
      var layers = o._layers = new MO.TDictionary();
      for(var i = 0; i < layerCount; i++){
         var layer = MO.Class.create(MO.FE3sDisplayLayer);
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
MO.FE3sSpace_saveConfig = function FE3sSpace_saveConfig(p){
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
