//==========================================================
// <T>资源渲染对象。</T>
//
// @class
// @author maocy
// @history 150415
//==========================================================
MO.FE3sRenderable = function FE3sRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3sDrawable);
   //..........................................................
   // @attribute
   o._materialRefers   = MO.Class.register(o, new MO.AGetter('_materialRefers'));
   //..........................................................
   // @method
   o.construct         = MO.FE3sRenderable_construct;
   // @method
   o.syncMaterialRefer = MO.FE3sRenderable_syncMaterialRefer;
   o.pushMaterialRefer = MO.FE3sRenderable_pushMaterialRefer;
   // @method
   o.unserialize       = MO.FE3sRenderable_unserialize;
   o.saveConfig        = MO.FE3sRenderable_saveConfig;
   o.clone             = MO.FE3sRenderable_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sRenderable_construct = function FE3sRenderable_construct(){
   var o = this;
   o.__base.FE3sDrawable.construct.call(o);
}

//==========================================================
// <T>同步一个材质引用。</T>
//
// @method
// @param index:Integer 索引位置
//==========================================================
MO.FE3sRenderable_syncMaterialRefer = function FE3sRenderable_syncMaterialRefer(index){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new MO.TObjects();
   }
   for(var i = materialRefers.count(); i <= index; i++){
      materialRefers.push(MO.Class.create(MO.FE3sMaterialRefer));
   }
   return materialRefers.at(index);
}

//==========================================================
// <T>增加一个材质引用。</T>
//
// @method
// @param materialRefer:FRs3MaterialRefer 材质引用
//==========================================================
MO.FE3sRenderable_pushMaterialRefer = function FE3sRenderable_pushMaterialRefer(materialRefer){
   var o = this;
   var materialRefers = o._materialRefers;
   if(!materialRefers){
      materialRefers = o._materialRefers = new MO.Objects();
   }
   materialRefers.push(materialRefer);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sRenderable_unserialize = function FE3sRenderable_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sDrawable.unserialize.call(o, input);
   // 读取主题集合
   var count = input.readUint16();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var materialRefer = MO.Class.create(MO.FE3sMaterialRefer);
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
MO.FE3sRenderable_saveConfig = function FE3sRenderable_saveConfig(xconfig){
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
MO.FE3sRenderable_clone = function FE3sRenderable_clone(instance){
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
