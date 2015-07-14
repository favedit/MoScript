//==========================================================
// <T>渲染模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dTemplateDisplay = function FE3dTemplateDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3dSprite, MO.MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady       = false;
   o._ready           = false;
   // @attribute
   o._shapes          = MO.Class.register(o, new MO.AGetter('_shapes'));
   o._skeletons       = MO.Class.register(o, new MO.AGetter('_skeletons'));
   //..........................................................
   // @method
   o.construct        = MO.FE3dTemplateDisplay_construct;
   // @method
   o.testReady        = MO.FE3dTemplateDisplay_testReady;
   // @method
   o.findMeshByCode   = MO.FE3dTemplateDisplay_findMeshByCode;
   o.pushSkeleton     = MO.FE3dTemplateDisplay_pushSkeleton;
   // @method
   o.loadSkeletons    = MO.FE3dTemplateDisplay_loadSkeletons;
   o.linkAnimation    = MO.FE3dTemplateDisplay_linkAnimation;
   o.loadAnimations   = MO.FE3dTemplateDisplay_loadAnimations;
   o.loadResource     = MO.FE3dTemplateDisplay_loadResource;
   o.reloadResource   = MO.FE3dTemplateDisplay_reloadResource;
   // @method
   o.load             = MO.FE3dTemplateDisplay_load;
   // @method
   o.dispose          = MO.FE3dTemplateDisplay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateDisplay_construct = function FE3dTemplateDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._shapes = new MO.TObjects();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.FE3dTemplateDisplay_testReady = function FE3dTemplateDisplay_testReady(){
   var o = this;
   // 加载渲染对象
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      // 测试全部加载完成
      for(var i = 0; i < shapeCount; i++){
         var shape = shapes.at(i);
         if(!shape.testReady()){
            return false;
         }
      }
   }
   return true;
}

//==========================================================
// <T>根据代码查找网格。</T>
//
// @method
// @param p:code:String 代码
// @return FE3sMesh 网格
//==========================================================
MO.FE3dTemplateDisplay_findMeshByCode = function FE3dTemplateDisplay_findMeshByCode(p){
   var s = this._shapes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.at(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}

//==========================================================
// <T>增加一个渲染骨骼。</T>
//
// @method
// @param p:skeleton:FE3rSkeleton 渲染骨骼
//==========================================================
MO.FE3dTemplateDisplay_pushSkeleton = function FE3dTemplateDisplay_pushSkeleton(skeleton){
   var o = this;
   var resource = skeleton.resource();
   var skeletonGuid = resource.guid();
   var skeletons = o._skeletons;
   if(!skeletons){
      skeletons = o._skeletons = new MO.TDictionary();
   }
   if(!o._activeSkeleton){
      o._activeSkeleton = skeleton;
   }
   skeletons.set(skeletonGuid, skeleton);
}

//==========================================================
// <T>加载骨骼集合。</T>
//
// @method
// @param skeletons:TObjects 骨骼集合
//==========================================================
MO.FE3dTemplateDisplay_loadSkeletons = function FE3dTemplateDisplay_loadSkeletons(skeletonResources){
   var o = this;
   var count = skeletonResources.count();
   if(count > 0){
      for(var i = 0; i < count; i++){
         var skeletonResource = skeletonResources.at(i);
         // 创建骨骼
         var skeleton = MO.Class.create(MO.FE3rSkeleton);
         skeleton.loadResource(skeletonResource);
         o.pushSkeleton(skeleton);
      }
   }
}

//==========================================================
// <T>关联渲染动画。</T>
//
// @method
// @param animation:FE3rAnimation 渲染动画
//==========================================================
MO.FE3dTemplateDisplay_linkAnimation = function FE3dTemplateDisplay_linkAnimation(animation){
   var o = this;
   var tracks = animation.tracks();
   var count = tracks.count();
   for(var i = 0; i < count; i++){
      var track = tracks.at(i);
      var meshCode = track._resource._meshCode;
      if(meshCode){
         var mesh = o.findMeshByCode(meshCode);
         mesh._activeTrack = track;
      }
   }
}

//==========================================================
// <T>加载动画集合。</T>
//
// @method
// @param animations:TObjects 动画集合
//==========================================================
MO.FE3dTemplateDisplay_loadAnimations = function FE3dTemplateDisplay_loadAnimations(animationResources){
   var o = this;
   var animationCount = animationResources.count();
   for(var i = 0; i < animationCount; i++){
      var animationResource = animationResources.at(i);
      // 查找是否存在
      var guid = animationResource.guid();
      var animation = o.findAnimation(guid);
      if(animation){
         continue;
      }
      // 创建渲染动画
      if(animationResource.skeleton()){
         animation = MO.Class.create(MO.FE3rSkeletonAnimation);
      }else{
         animation = MO.Class.create(MO.FE3rMeshAnimation);
      }
      animation._display = o;
      animation.loadResource(animationResource);
      o.pushAnimation(animation);
   }
}

//==========================================================
// <T>加载资源模板。</T>
//
// @method
// @param resource:FE3sSprite 资源模板
//==========================================================
MO.FE3dTemplateDisplay_loadResource = function FE3dTemplateDisplay_loadResource(resource){
   var o = this;
   o._resource = resource;
   var instanceConsole = MO.Console.find(MO.FE3dInstanceConsole);
   // 设置矩阵
   o._matrix.assign(resource.matrix());
   // 加载资源渲染集合
   var renderableResources = resource.renderables();
   if(renderableResources){
      var shapes = o._shapes;
      var renderableCount = renderableResources.count();
      for(var i = 0; i < renderableCount; i++){
         var renderableResource = renderableResources.at(i);
         // 创建渲染对象
         var renderable = instanceConsole.create(MO.EE3dInstance.TemplateRenderable);
         renderable._display = o;
         renderable.linkGraphicContext(o);
         renderable.loadResource(renderableResource);
         shapes.push(renderable);
         o.pushRenderable(renderable);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dTemplateDisplay_reloadResource = function FE3dTemplateDisplay_reloadResource(){
   var o = this;
   var shapes = o._shapes;
   if(shapes){
      var count = shapes.count();
      for(var i = 0; i < count; i++){
         var shape = shapes.at(i);
         shape.reloadResource();
      }
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateDisplay_load = function FE3dTemplateDisplay_load(){
   var o = this;
   // 加载处理
   var shapes = o._shapes;
   if(shapes){
      var shapeCount = shapes.count();
      for(var i = 0; i < shapeCount; i++){
         var shape = shapes.at(i);
         shape.load();
      }
   }
   // 关联动画
   var animations = o._animations;
   if(animations){
      var animationCount = animations.count();
      for(var i = 0; i < animationCount; i++){
         var animation = animations.at(i);
         if(animation.resource().skeleton() == null){
            o.linkAnimation(animation);
         }
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateDisplay_dispose = function FE3dTemplateDisplay_dispose(){
   var o = this;
   o._shapes = MO.Lang.Object.dispose(o._shapes);
   o.__base.FE3dSprite.dispose.call(o);
}
