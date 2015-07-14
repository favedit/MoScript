//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150414
//==========================================================
MO.FE3dModelDisplay = function FE3dModelDisplay(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._material      = MO.Class.register(o, new MO.AGetter('_material'));
   o._shapes        = MO.Class.register(o, new MO.AGetter('_shapes'));
   //..........................................................
   // @method
   o.construct      = MO.FE3dModelDisplay_construct;
   // @method
   o.load           = MO.FE3dModelDisplay_load;
   o.reloadResource = MO.FE3dModelDisplay_reloadResource;
   // @method
   o.dispose        = MO.FE3dModelDisplay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dModelDisplay_construct = function FE3dModelDisplay_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   // 设置属性
   o._material = RClass.create(FE3dMaterial);
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sMeshDisplay 网格显示资源
//==========================================================
MO.FE3dModelDisplay_load = function FE3dModelDisplay_load(renderable){
   var o = this;
   var material = o._material;
   var instanceConsole = RConsole.find(FE3dInstanceConsole);
   // 设置资源
   var modelResource = renderable.resource();
   var resource = o._resource = modelResource.display();
   o._matrix.assign(resource.matrix());
   material.loadResource(resource.material());
   // 创建网格集合
   var geometryRenderables = renderable.geometrys();
   if(geometryRenderables){
      var geometryCount = geometryRenderables.count();
      var shapes = o._shapes = new MO.TObjects();
      for(var i = 0; i < geometryCount; i++){
         var geometryRenderable = geometryRenderables.get(i);
         // 创建形状
         var shape = instanceConsole.create(MO.EE3dInstance.ModelRenderable);
         shape.setDisplay(o);
         shape.setMaterial(material);
         shape.load(geometryRenderable);
         shapes.push(shape);
         // 放入显示队列
         o.pushRenderable(shape);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dModelDisplay_reloadResource = function FE3dModelDisplay_reloadResource(){
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
MO.FE3dModelDisplay_dispose = function FE3dModelDisplay_dispose(){
   var o = this;
   // 清空属性
   o._material = MO.Lang.Object.dispose(o._material);
   // 父处理
   o.__base.FE3dDisplay.dispose.call(o);
}
