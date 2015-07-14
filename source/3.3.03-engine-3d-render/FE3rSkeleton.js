//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3rSkeleton = function FE3rSkeleton(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._bones       = MO.Class.register(o, new AGetter('_bones'));
   o._skins       = MO.Class.register(o, new AGetter('_skins'));
   //..........................................................
   // @method
   o.loadResource = MO.FE3rSkeleton_loadResource;
   return o;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param resource:FE3sSkeleton 资源信息
//==========================================================
MO.FE3rSkeleton_loadResource = function FE3rSkeleton_loadResource(resource){
   var o = this;
   // 设置属性
   o._resource = resource;
   // 设置骨头集合
   var boneResources = resource._bones;
   var count = boneResources.count();
   if(count > 0){
      var bones = o._bones = new MO.TObjects();
      for(var i = 0; i < count; i++){
         var boneResource = boneResources.at(i);
         // 创建骨头
         var bone = MO.Class.create(MO.FE3rBone);
         bone.loadResource(boneResource);
         bones.push(bone);
      }
   }
}
