//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FE3sSprite(o){
   o = RClass.inherits(this, o, FE3sDisplayContainer);
   //..........................................................
   // @attribute
   o._materials   = null;
   //..........................................................
   // @method
   o.construct    = FE3sSprite_construct;
   // @method
   o.materials    = FE3sSprite_materials;
   o.pushMaterial = FE3sSprite_pushMaterial;
   // @method
   o.unserialize  = FE3sSprite_unserialize;
   o.saveConfig   = FE3sSprite_saveConfig;
   o.clone        = FE3sSprite_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSprite_construct(){
   var o = this;
   o.__base.FE3sDisplayContainer.construct.call(o);
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TObjects 材质集合
//==========================================================
function FE3sSprite_materials(){
   return this._materials;
}

//==========================================================
// <T>增加一个材质。</T>
//
// @method
// @param material:FRs3Material 材质
//==========================================================
function FE3sSprite_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new TDictionary();
   }
   materials.set(material.guid(), material);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSprite_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   // 读取主题集合
   var materialCount = input.readUint16();
   if(materialCount > 0){
      var materialConsole = RConsole.find(FE3sMaterialConsole);
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
function FE3sSprite_saveConfig(xconfig){
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
function FE3sSprite_clone(instance){
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
