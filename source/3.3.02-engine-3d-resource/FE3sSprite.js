//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
MO.FE3sSprite = function FE3sSprite(o){
   o = MO.Class.inherits(this, o, MO.FE3sDisplayContainer);
   //..........................................................
   // @attribute
   o._materials   = MO.Class.register(o, new MO.AGetter('_materials'));
   //..........................................................
   // @method
   o.construct    = MO.FE3sSprite_construct;
   // @method
   o.pushMaterial = MO.FE3sSprite_pushMaterial;
   // @method
   o.unserialize  = MO.FE3sSprite_unserialize;
   o.saveConfig   = MO.FE3sSprite_saveConfig;
   o.clone        = MO.FE3sSprite_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sSprite_construct = function FE3sSprite_construct(){
   var o = this;
   o.__base.FE3sDisplayContainer.construct.call(o);
}

//==========================================================
// <T>增加一个材质。</T>
//
// @method
// @param material:FRs3Material 材质
//==========================================================
MO.FE3sSprite_pushMaterial = function FE3sSprite_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new MO.TDictionary();
   }
   materials.set(material.guid(), material);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sSprite_unserialize = function FE3sSprite_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   // 读取主题集合
   var materialCount = input.readUint16();
   if(materialCount > 0){
      var materialConsole = MO.Console.find(MO.FE3sMaterialConsole);
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         o.pushMaterial(material);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sSprite_saveConfig = function FE3sSprite_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
   // 存储材质集合
   var materials = o._materials;
   if(materials){
      var count = materials.count();
      var xmaterials = xconfig.create('MaterialCollection');
      for(var i = 0; i < count; i++){
         var material = materials.at(i);
         material.saveConfig(xmaterials.create('Material'));
      }
   }
   // 存储动画集合
   var movies = o._movies;
   if(movies){
      var count = movies.count();
      var xmovies = xconfig.create('MovieCollection');
      for(var i = 0; i < count; i++){
         var movie = movies.at(i);
         movie.saveConfig(xmovies.create('Movie'));
      }
   }
}

//==========================================================
// <T>克隆资源对象。</T>
//
// @method
// @param instance:FE3sObject 实例对象
// @return FE3sObject 资源对象
//==========================================================
MO.FE3sSprite_clone = function FE3sSprite_clone(instance){
   var o = this;
   var result = o.__base.FE3sDisplayContainer.clone.call(o, instance);
   // 存储材质集合
   var materials = o._materials;
   if(materials){
      var count = materials.count();
      for(var i = 0; i < count; i++){
         var material = materials.at(i);
         result.pushMaterial(material.clone());
      }
   }
   return result;
}
