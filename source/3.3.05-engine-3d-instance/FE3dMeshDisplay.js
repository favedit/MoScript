with(MO){
   //==========================================================
   // <T>网格渲染对象。</T>
   //
   // @author maocy
   // @history 150202
   //==========================================================
   MO.FE3dMeshDisplay = function FE3dMeshDisplay(o){
      o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
      //..........................................................
      // @attribute
      o._material      = null;
      o._renderable    = null;
      //..........................................................
      // @method
      o.renderable     = FE3dMeshDisplay_renderable;
      o.load           = FE3dMeshDisplay_load;
      o.reloadResource = FE3dMeshDisplay_reloadResource;
      return o;
   }

   //==========================================================
   // <T>获得渲染对象。</T>
   //
   // @method
   // @return FE3rMesh 渲染对象
   //==========================================================
   MO.FE3dMeshDisplay_renderable = function FE3dMeshDisplay_renderable(){
      return this._renderable;
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
}
