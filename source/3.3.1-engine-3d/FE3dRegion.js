//==========================================================
// <T>渲染区域。</T>
//
// @class
// @author maocy
// @history 150303
//==========================================================
function FE3dRegion(o){
   o = RClass.inherits(this, o, FRegion, MG3dRegion, MGraphicObject);
   //..........................................................
   // @attribute
   o._calculateCameraMatrix = null;
   //..........................................................
   // @method
   o.construct = FE3dRegion_construct;
   o.prepare   = FE3dRegion_prepare;
   o.dispose   = FE3dRegion_dispose;
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
   // 设置属性
   o._calculateCameraMatrix = new SMatrix3d();
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
