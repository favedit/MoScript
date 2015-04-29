//==========================================================
// <T>资源渲染对象。</T>
//
// @class
// @author maocy
// @history 150415
//==========================================================
function FE3sRenderable(o){
   o = RClass.inherits(this, o, FE3sDrawable);
   //..........................................................
   // @attribute
   o._materialRefers   = null;
   //..........................................................
   // @method
   o.construct         = FE3sRenderable_construct;
   // @method
   o.materialRefers    = FE3sRenderable_materialRefers;
   o.pushMaterialRefer = FE3sRenderable_pushMaterialRefer;
   // @method
   o.unserialize       = FE3sRenderable_unserialize;
   o.saveConfig        = FE3sRenderable_saveConfig;
   o.clone             = FE3sRenderable_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sRenderable_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
}

//==========================================================
// <T>获得材质引用集合。</T>
//
// @method
// @return TObjects 材质引用集合
//==========================================================
function FE3sRenderable_materialRefers(){
   return this._materialRefers;
}

//==========================================================
// <T>增加一个材质引用。</T>
//
// @method
// @param materialRefer:FRs3MaterialRefer 材质引用
//==========================================================
function FE3sRenderable_pushMaterialRefer(materialRefer){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new TDictionary();
   }
   materialRefers.set(materialRefer.guid(), materialRefer);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sRenderable_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   // 读取主题集合
   var count = input.readUint16();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var materialRefer = RClass.create(FE3sMaterialRefer);
         materialRefer.unserialize(input);
         o.pushMaterialRefer(materialRefer);
      }
   }
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sRenderable_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
   // 存储材质集合
   var materialRefers = o._materialRefers;
   if(materialRefers){
      var count = materialRefers.count();
      var xmaterialRefers = xconfig.create('MaterialReferCollection');
      for(var i = 0; i < count; i++){
         materialRefers.at(i).saveConfig(xmaterialRefers.create('MaterialRefer'));
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
function FE3sRenderable_clone(instance){
   var o = this;
   var result = o.__base.FE3sDrawable.clone.call(o, instance);
   // 存储材质集合
   var materialRefers = o._materialRefers;
   if(materialRefers){
      var count = materialRefers.count();
      for(var i = 0; i < count; i++){
         var materialRefer = materialRefers.at(i);
         result.pushMaterialRefer(materialRefer.clone());
      }
   }
   return result;
}
