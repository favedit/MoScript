//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FE3dModelRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._materialResource = null;
   //..........................................................
   // @method
   o.testVisible       = FE3dModelRenderable_testVisible;
   o.load              = FE3dModelRenderable_load;
   return o;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FE3dModelRenderable_testVisible(p){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         o._ready = renderable.testReady();
      }
   }
   return o._ready;
}

//==========================================================
// <T>加载资源。</T>
//
// @param resource:FE3sGeometry 资源
//==========================================================
function FE3dModelRenderable_load(renderable){
   var o = this;
   // 获得材质
   var material = o._material;
   var materialResource = o._materialResource = renderable.material();
   if(materialResource){
      material.assignInfo(materialResource.info());
   }
   // 设置属性
   o._effectCode = material.info().effectCode;
   o._renderable = renderable;
}
