//==========================================================
// <T>渲染区域。</T>
//
// @class
// @author maocy
// @history 150303
//==========================================================
function FE3dRegion(o){
   o = RClass.inherits(this, o, FRegion, MGraphicObject, MG3dRegion, MLinkerResource);
   //..........................................................
   // @attribute
   o._backgroundColor = null;
   //..........................................................
   // @method
   o.construct       = FE3dRegion_construct;
   // @method
   o.backgroundColor = FE3dRegion_backgroundColor;
   // @method
   o.loadResource    = FE3dRegion_loadResource;
   o.reloadResource  = FE3dRegion_reloadResource;
   // @method
   o.prepare         = FE3dRegion_prepare;
   // @method
   o.dispose         = FE3dRegion_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dRegion_construct(){
   var o = this;
   o.__base.FRegion.construct.call(o);
   o.__base.MG3dRegion.construct.call(o);
   // 创建背景色
   var c = o._backgroundColor = new SColor4();
   c.set(0, 0, 0, 1);
   // 设置属性
   o._calculateCameraMatrix = new SMatrix3d();
}

//==========================================================
// <T>获得背景色。</T>
//
// @method
// @return SColor4 背景色
//==========================================================
function FE3dRegion_backgroundColor(){
   return this._backgroundColor;
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
// @param p:resource:FE3sSceneRegion 资源
//==========================================================
function FE3dRegion_loadResource(p){
   var o = this;
   o._resource = p;
   o.reloadResource();
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dRegion_reloadResource(){
   var o = this;
   var r = o._resource;
   // 设置背景颜色
   var f = r.optionBackground();
   if(f){
      o._backgroundColor.assignPower(r.backgroundColor());
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
function FE3dRegion_prepare(){
   var o = this;
   o.__base.MG3dRegion.prepare.call(o);
   // 检查相机变更
   var r = o._calculateCameraMatrix.attach(o._camera.matrix());
   if(r){
      o._changed = true;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dRegion_dispose(){
   var o = this;
   o.__base.FRegion.dispose.call(o);
   o.__base.MG3dRegion.dispose.call(o);
}
