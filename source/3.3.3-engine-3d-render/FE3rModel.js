//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3rModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   //..........................................................
   // @attribute
   o._resource            = null;
   // @attribute
   o._meshes              = null;
   o._skeletons           = null;
   // @attribute
   o._dataReady           = false;
   //..........................................................
   // @method
   o.findMeshByGuid       = FE3rModel_findMeshByGuid;
   o.geometrys            = FE3rModel_geometrys;
   o.resource             = FE3rModel_resource;
   o.setResource          = FE3rModel_setResource;
   // @method
   o.testReady            = FE3rModel_testReady;
   // @method
   o.loadResource         = FE3rModel_loadResource;
   o.loadSkeletonResource = FE3rModel_loadSkeletonResource;
   o.processLoad          = FE3rModel_processLoad;
   // @method
   o.dispose              = FE3rModel_dispose;
   return o;
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @param p:name:String 名称
//==========================================================
function FE3rModel_findMeshByGuid(p){
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
// <T>获得几何体集合。</T>
//
// @return 几何体集合
//==========================================================
function FE3rModel_geometrys(){
   return this._meshes;
}

//==========================================================
// <T>获得资源。</T>
//
// @return FE3sModel 资源
//==========================================================
function FE3rModel_resource(){
   return this._resource;
}

//==========================================================
// <T>设置资源。</T>
//
// @param p:resource:FE3sModel 资源
//==========================================================
function FE3rModel_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FE3rModel_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>加载骨骼资源。</T>
//
// @method
// @param p:resource:FE3sSkeleton 骨骼资源
//==========================================================
function FE3rModel_loadSkeletonResource(p){
   var o = this;
   var rmc = RConsole.find(FE3rModelConsole);
   // 加载骨骼皮肤
   var ss = p.skins();
   if(ss){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.get(i);
         // 创建皮肤
         var rs = RClass.create(FE3rSkin);
         rs.linkGraphicContext(o);
         rs.loadResource(s)
         // 放入网格
         var m = rmc.findMesh(s.meshGuid());
         m.pushSkin(rs);
      }
   }
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param p:resource:FE3sModel 模型资源
//==========================================================
function FE3rModel_loadResource(p){
   var o = this;
   var rmc = RConsole.find(FE3rModelConsole);
   // 读取网格集合
   var rgs = p.meshes();
   if(rgs){
      var gs = o._meshes = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FE3rModelMesh);
         g.linkGraphicContext(o);
         g.loadResource(rg);
         gs.push(g);
         rmc.meshs().set(g.guid(), g);
      }
   }
   // 读取骨骼集合
   var rks = p.skeletons();
   if(rks){
      var c = rks.count();
      for(var i = 0; i < c; i++){
         var rk = rks.get(i);
         o.loadSkeletonResource(rk);
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
function FE3rModel_processLoad(){
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
function FE3rModel_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._meshes = RObject.dispose(o._meshes);
   o._skeletons = RObject.dispose(o._skeletons);
   o.__base.FObject.dispose.call(o);
}
