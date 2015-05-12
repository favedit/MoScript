//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3rSkeleton(o){
   o = RClass.inherits(this, o, FE3rObject, MLinkerResource);
   //..........................................................
   // @attribute
   o._bones       = null;
   o._skins       = null;
   //..........................................................
   // @method
   o.bones        = FE3rSkeleton_bones;
   o.skins        = FE3rSkeleton_skins;
   // @method
   o.loadResource = FE3rSkeleton_loadResource;
   return o;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FE3rSkeleton_bones(){
   return this._bones;
}

//==========================================================
// <T>获得蒙皮集合。</T>
//
// @method
// @return TObjects 蒙皮集合
//==========================================================
function FE3rSkeleton_skins(){
   return this._skins;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param resource:FE3sSkeleton 资源信息
//==========================================================
function FE3rSkeleton_loadResource(resource){
   var o = this;
   // 设置属性
   o._resource = resource;
   // 设置骨头集合
   var boneResources = resource._bones;
   var count = boneResources.count();
   if(count > 0){
      var bones = o._bones = new TObjects();
      for(var i = 0; i < count; i++){
         var boneResource = boneResources.at(i);
         // 创建骨头
         var bone = RClass.create(FE3rBone);
         bone.loadResource(boneResource);
         bones.push(bone);
      }
   }
}
