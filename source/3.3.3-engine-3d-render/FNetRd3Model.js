//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FNetRd3Model(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._name        = null;
   o._meshes   = null;
   o._resource    = null;
   // @attribute
   o._dataReady       = false;
   //..........................................................
   // @method
   o.name         = FNetRd3Model_name;
   o.setName      = FNetRd3Model_setName;
   o.findMeshByGuid = FNetRd3Model_findMeshByGuid;
   o.geometrys    = FNetRd3Model_geometrys;
   o.resource     = FNetRd3Model_resource;
   o.resource     = FNetRd3Model_resource;
   o.setResource  = FNetRd3Model_setResource;
   // @method
   o.testReady    = FNetRd3Model_testReady;
   // @method
   o.loadResource = FNetRd3Model_loadResource;
   o.processLoad  = FNetRd3Model_processLoad;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FNetRd3Model_name(){
   return this._name;
}

//==========================================================
// <T>设置名称。</T>
//
// @param p:name:String 名称
//==========================================================
function FNetRd3Model_setName(p){
   this._name = p;
}

function FNetRd3Model_findMeshByGuid(p){
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
function FNetRd3Model_geometrys(){
   return this._meshes;
}

//==========================================================
// <T>获得资源。</T>
//
// @return FRs3Model 资源
//==========================================================
function FNetRd3Model_resource(){
   return this._resource;
}

//==========================================================
// <T>设置资源。</T>
//
// @param p:resource:FRs3Model 资源
//==========================================================
function FNetRd3Model_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FNetRd3Model_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param p:resource:FRsModel 资源信息
//==========================================================
function FNetRd3Model_loadResource(p){
   var o = this;
   // 读取网格集合
   var rgs = p.meshes();
   if(rgs){
      var gs = o._meshes = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FNetRd3ModelMesh);
         g.linkContext(o._context);
         g.loadResource(rg);
         gs.push(g);
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
function FNetRd3Model_processLoad(){
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
