//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3rModel = function FE3rModel(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   //..........................................................
   // @attribute
   o._resource            = MO.Class.register(o, new AGetSet('_resource'));
   // @attribute
   o._meshes              = MO.Class.register(o, new AGetter('_meshes'));
   o._skeletons           = MO.Class.register(o, new AGetter('_skeletons'));
   // @attribute
   o._dataReady           = false;
   //..........................................................
   // @method
   o.findMeshByGuid       = MO.FE3rModel_findMeshByGuid;
   // @method
   o.testReady            = MO.FE3rModel_testReady;
   // @method
   o.loadResource         = MO.FE3rModel_loadResource;
   o.loadSkeletonResource = MO.FE3rModel_loadSkeletonResource;
   o.processLoad          = MO.FE3rModel_processLoad;
   // @method
   o.dispose              = MO.FE3rModel_dispose;
   return o;
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @param p:name:String 名称
//==========================================================
MO.FE3rModel_findMeshByGuid = function FE3rModel_findMeshByGuid(p){
   var o = this;
   var s = o._meshes;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var m = s.get(i);
      if(m._guid == p){
         return m;
      }
   }
   return null;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
MO.FE3rModel_testReady = function FE3rModel_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>加载骨骼资源。</T>
//
// @method
// @param resource:FE3sSkeleton 骨骼资源
//==========================================================
MO.FE3rModel_loadSkeletonResource = function FE3rModel_loadSkeletonResource(resource){
   var o = this;
   var modelConsole = MO.Console.find(MO.FE3rModelConsole);
   // 加载骨骼皮肤
   var skinResources = resource.skins();
   if(skinResources){
      var skinCount = skinResources.count();
      for(var i = 0; i < skinCount; i++){
         var skinResource = skinResources.at(i);
         // 创建皮肤
         var skin = MO.Class.create(MO.FE3rSkin);
         skin.linkGraphicContext(o);
         skin.loadResource(skinResource)
         // 放入网格
         var meshGuid = skinResource.meshGuid();
         var mesh = modelConsole.findMesh(meshGuid);
         mesh.pushSkin(skin);
      }
   }
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param resource:FE3sModel 模型资源
//==========================================================
MO.FE3rModel_loadResource = function FE3rModel_loadResource(resource){
   var o = this;
   var modelConsole = MO.Console.find(MO.FE3rModelConsole);
   // 读取网格集合
   var meshResources = resource.meshes();
   if(meshResources){
      var meshes = o._meshes = new MO.TObjects();
      var meshCount = meshResources.count();
      for(var i = 0; i < meshCount; i++){
         var meshResource = meshResources.valueAt(i);
         // 创建渲染网格
         var mesh = MO.Class.create(MO.FE3rModelMesh);
         mesh.linkGraphicContext(o);
         mesh.loadResource(meshResource);
         meshes.push(mesh);
         modelConsole.meshs().set(mesh.guid(), mesh);
      }
   }
   // 读取骨骼集合
   var skeletonResources = resource.skeletons();
   if(skeletonResources){
      var skeletonCount = skeletonResources.count();
      for(var i = 0; i < skeletonCount; i++){
         var skeletonResource = skeletonResources.get(i);
         o.loadSkeletonResource(skeletonResource);
      }
   }
   // 加载完成
   o._dataReady = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3rModel_processLoad = function FE3rModel_processLoad(){
   var o = this;
   // 检查数据已加载
   if(o._dataReady){
      return true;
   }
   // 检查资源是否准备好
   if(!o._resource.testReady()){
      return false;
   }
   // 加载资源
   o.loadResource(o._resource);
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rModel_dispose = function FE3rModel_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._meshes = MO.Lang.Object.dispose(o._meshes);
   o._skeletons = MO.Lang.Object.dispose(o._skeletons);
   o.__base.FObject.dispose.call(o);
}
