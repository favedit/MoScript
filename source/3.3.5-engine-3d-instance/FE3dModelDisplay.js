//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150414
//==========================================================
function FE3dModelDisplay(o){
   o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
   //..........................................................
   // @method
   o.load           = FE3dModelDisplay_load;
   o.reloadResource = FE3dModelDisplay_reloadResource;
   return o;
}

//==========================================================
// <T>获得渲染对象。</T>
//
// @method
// @return FE3rMesh 渲染对象
//==========================================================
function FE3dModelDisplay_renderable(){
   return this._renderable;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sMeshDisplay 网格显示资源
//==========================================================
function FE3dModelDisplay_load(renderable){
   var o = this;
   var resource = renderable.resource();
   //o._matrix.assign(resource.matrix());
   o._matrix.setScaleAll(0.01);
   o._matrix.update();
   // 创建网格集合
   var geometryRenderables = renderable.geometrys();
   if(geometryRenderables){
      var geometryCount = geometryRenderables.count();
      var geometrys = o._geometrys = new TObjects();
      //var renderables = o.renderables();
      for(var i = 0; i < geometryCount; i++){
         var geometryRenderable = geometryRenderables.get(i);
         var renderable = RClass.create(FE3dModelRenderable);
         renderable._display = o;
         renderable.load(geometryRenderable);
         geometrys.push(renderable);
         o.pushRenderable(renderable);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dModelDisplay_reloadResource(){
   var o = this;
   o._matrix.assign(o._resource.matrix());
}
