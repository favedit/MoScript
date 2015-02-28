//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FRd3Model(o){
   o = RClass.inherits(this, o, FRd3Object);
   //..........................................................
   // @attribute
   o._name                = null;
   o._resource            = null;
   // @attribute
   o._meshes              = null;
   o._skeletons           = null;
   // @attribute
   o._dataReady           = false;
   //..........................................................
   // @method
   o.name                 = FRd3Model_name;
   o.setName              = FRd3Model_setName;
   o.findMeshByGuid       = FRd3Model_findMeshByGuid;
   o.geometrys            = FRd3Model_geometrys;
   o.resource             = FRd3Model_resource;
   o.resource             = FRd3Model_resource;
   o.setResource          = FRd3Model_setResource;
   // @method
   o.testReady            = FRd3Model_testReady;
   // @method
   o.loadResource         = FRd3Model_loadResource;
   o.loadSkeletonResource = FRd3Model_loadSkeletonResource;
   o.processLoad          = FRd3Model_processLoad;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FRd3Model_name(){
   return this._name;
}

//==========================================================
// <T>设置名称。</T>
//
// @param p:name:String 名称
//==========================================================
function FRd3Model_setName(p){
   this._name = p;
}

//==========================================================
// <T>根据唯一编号查找网格。</T>
//
// @param p:name:String 名称
//==========================================================
function FRd3Model_findMeshByGuid(p){
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
function FRd3Model_geometrys(){
   return this._meshes;
}

//==========================================================
// <T>获得资源。</T>
//
// @return FE3sModel 资源
//==========================================================
function FRd3Model_resource(){
   return this._resource;
}

//==========================================================
// <T>设置资源。</T>
//
// @param p:resource:FE3sModel 资源
//==========================================================
function FRd3Model_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FRd3Model_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>加载骨骼资源。</T>
//
// @method
// @param p:resource:FE3sSkeleton 骨骼资源
//==========================================================
function FRd3Model_loadSkeletonResource(p){
   var o = this;
   var rmc = RConsole.find(FRd3ModelConsole);
   // 加载骨骼皮肤
   var ss = p.skins();
   if(ss){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.get(i);
         // 创建皮肤
         var rs = RClass.create(FRd3Skin);
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
function FRd3Model_loadResource(p){
   var o = this;
   var rmc = RConsole.find(FRd3ModelConsole);
   // 读取网格集合
   var rgs = p.meshes();
   if(rgs){
      var gs = o._meshes = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FRd3Mesh);
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
function FRd3Model_processLoad(){
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
