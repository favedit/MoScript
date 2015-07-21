//==========================================================
// <T>渲染区域。</T>
//
// @class
// @author maocy
// @history 150303
//==========================================================
MO.FE3dRegion = function FE3dRegion(o){
   o = MO.Class.inherits(this, o, MO.FRegion, MO.MGraphicObject, MO.MG3dRegion, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._backgroundColor = MO.Class.register(o, new MO.AGetter('_backgroundColor'));
   //..........................................................
   // @method
   o.construct        = MO.FE3dRegion_construct;
   // @method
   o.selectCamera     = MO.FE3dRegion_selectCamera;
   o.loadResource     = MO.FE3dRegion_loadResource;
   o.reloadResource   = MO.FE3dRegion_reloadResource;
   // @method
   o.prepare          = MO.FE3dRegion_prepare;
   // @method
   o.dispose          = MO.FE3dRegion_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRegion_construct = function FE3dRegion_construct(){
   var o = this;
   o.__base.FRegion.construct.call(o);
   o.__base.MG3dRegion.construct.call(o);
   // 创建相机
   var camera = o._camera = MO.Class.create(MO.FE3dPerspectiveCamera);
   camera.position().set(0, 0, -100);
   camera.lookAt(0, 0, 0);
   camera.update();
   camera.projection().update();
   // 创建方向光源
   var light = o._directionalLight = MO.Class.create(MO.FE3dDirectionalLight);
   light.direction().set(0, -1, 0);
   var lightCamera = light.camera();
   lightCamera.position().set(10, 10, -10);
   lightCamera.lookAt(0, 0, 0);
   // 创建背景色
   var backgroundColor = o._backgroundColor = new MO.SColor4();
   backgroundColor.set(0, 0, 0, 1);
   // 设置属性
   o._calculateCameraMatrix = new MO.SMatrix3d();
}

//==========================================================
// <T>选择相机。</T>
//
// @method
// @param camera:FE3dCamera 相机
//==========================================================
MO.FE3dRegion_selectCamera = function FE3dRegion_selectCamera(camera){
   this._camera = camera;
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
// @param resource:FE3sSceneRegion 资源
//==========================================================
MO.FE3dRegion_loadResource = function FE3dRegion_loadResource(resource){
   var o = this;
   o._resource = resource;
   o._camera.loadResource(resource.camera());
   o._directionalLight.loadResource(resource.light());
   o.reloadResource();
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dRegion_reloadResource = function FE3dRegion_reloadResource(){
   var o = this;
   var resource = o._resource;
   // 设置背景颜色
   var optionBackground = resource.optionBackground();
   if(optionBackground){
      o._backgroundColor.assignPower(resource.backgroundColor());
      o._backgroundColor.alpha = 1;
   }else{
      o._backgroundColor.set(0, 0, 0, 0);
   }
}

//==========================================================
// <T>准备处理。</T>
//
// @method
//==========================================================
MO.FE3dRegion_prepare = function FE3dRegion_prepare(){
   var o = this;
   o.__base.MG3dRegion.prepare.call(o);
   // 检查相机变更
   var changed = o._calculateCameraMatrix.attach(o._camera.matrix());
   if(changed){
      o._changed = true;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dRegion_dispose = function FE3dRegion_dispose(){
   var o = this;
   o.__base.FRegion.dispose.call(o);
   o.__base.MG3dRegion.dispose.call(o);
}
