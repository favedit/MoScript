//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150202
//==========================================================
MO.FE3dMeshDisplay = function FE3dMeshDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._material      = MO.Class.register(o, new MO.AGetter('_material'));
   o._renderable    = MO.Class.register(o, new MO.AGetter('_renderable'));
   //..........................................................
   // @method
   o.load           = MO.FE3dMeshDisplay_load;
   o.reloadResource = MO.FE3dMeshDisplay_reloadResource;
   return o;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sMeshDisplay 网格显示资源
//==========================================================
MO.FE3dMeshDisplay_load = function FE3dMeshDisplay_load(resource){
   var o = this;
   o._resource = resource;
   o._matrix.assign(resource.matrix());
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dMeshDisplay_reloadResource = function FE3dMeshDisplay_reloadResource(){
   var o = this;
   o._matrix.assign(o._resource.matrix());
}
