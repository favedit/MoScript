//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150414
//==========================================================
function FE3dModelDisplay(o){
   o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
   //..........................................................
   // @attribute
   o._material      = null;
   //..........................................................
   // @method
   o.construct      = FE3dModelDisplay_construct;
   // @method
   o.material       = FE3dModelDisplay_material;
   // @method
   o.load           = FE3dModelDisplay_load;
   o.reloadResource = FE3dModelDisplay_reloadResource;
   // @method
   o.dispose        = FE3dModelDisplay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dModelDisplay_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   // 设置属性
   o._material = RClass.create(FE3dMaterial);
}

//==========================================================
// <T>获得渲染材质。</T>
//
// @method
// @return FE3dMaterial 渲染材质
//==========================================================
function FE3dModelDisplay_material(){
   return this._material;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sMeshDisplay 网格显示资源
//==========================================================
function FE3dModelDisplay_load(renderable){
   var o = this;
   var modelResource = renderable.resource();
   var resource = o._resource = modelResource._display;
   o._matrix.assign(resource.matrix());
   o._material.loadResource(resource.material());
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
         renderable._material = o._material;
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
   var resource = o._resource;
   o._matrix.assign(resource.matrix());
   o._material.loadResource(resource.material());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dModelDisplay_dispose(){
   var o = this;
   // 清空属性
   o._material = RObject.dispose(o._material);
   // 父处理
   o.__base.FE3dDisplay.dispose.call(o);
}
