//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.FE3rBone = function FE3rBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._matrix        = MO.Class.register(o, new AGetter('_matrix'));
   o._boneResource  = MO.Class.register(o, new AGetter('_boneResource'));
   o._trackResource = MO.Class.register(o, new AGetter('_trackResource'));
   //..........................................................
   // @method
   o.construct      = MO.FE3rBone_construct;
   // @method
   o.loadResource   = MO.FE3rBone_loadResource;
   o.update         = MO.FE3rBone_update;
   // @method
   o.dispose        = MO.FE3rBone_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rBone_construct = function FE3rBone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sBone 资源
//==========================================================
MO.FE3rBone_loadResource = function FE3rBone_loadResource(p){
   var o = this;
   o._boneResource = p;
   o._trackResource = p.track();
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param info:SE3rPlayInfo 播放信息
// @param tick:Integer 时刻
//==========================================================
MO.FE3rBone_update = function FE3rBone_update(info, tick){
   var o = this;
   // 计算帧信息
   var resource = o._trackResource;
   resource.calculate(info, tick);
   info.update();
   // 计算矩阵
   var matrix = o._matrix;
   matrix.assign(resource.matrixInvert());
   matrix.append(info.matrix);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rBone_dispose = function FE3rBone_dispose(){
   var o = this;
   // 释放内容
   o._boneResource = null;
   o._trackResource = null;
   // 父处理
   o.__base.FG3dBone.dispose.call(o);
}
