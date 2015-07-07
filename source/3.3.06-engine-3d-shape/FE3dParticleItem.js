 //==========================================================
// <T>粒子项目。</T>
//
// @class
// @author maocy
// @history 150707
//==========================================================
MO.FE3dParticleItem = function FE3dParticleItem(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   o._matrix   = null;
   o._data     = MO.Class.register(o, new MO.AGetSet('_data'));
   //..........................................................
   // @method
   o.construct = MO.FE3dParticleItem_construct;
   // @method
   o.process   = MO.FE3dParticleItem_process;
   // @method
   o.dispose   = MO.FE3dParticleItem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_construct = function FE3dParticleItem_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 矩阵
   o._matrix = new MO.SMatrix3d();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_process = function FE3dParticleItem_process(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleItem_dispose = function FE3dParticleItem_dispose(){
   var o = this;
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
