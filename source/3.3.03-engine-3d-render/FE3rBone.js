//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FE3rBone(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._matrix        = null
   o._boneResource  = null
   o._trackResource = null;
   //..........................................................
   // @method
   o.construct      = FE3rBone_construct;
   // @method
   o.matrix         = FE3rBone_matrix;
   o.trackResource  = FE3rBone_trackResource;
   o.loadResource   = FE3rBone_loadResource;
   o.update         = FE3rBone_update;
   // @method
   o.dispose        = FE3rBone_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rBone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return SMatrix3d 矩阵
//==========================================================
function FE3rBone_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得资源跟踪。</T>
//
// @method
// @return FE3sTrack 资源跟踪
//==========================================================
function FE3rBone_trackResource(){
   return this._trackResource;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sBone 资源
//==========================================================
function FE3rBone_loadResource(p){
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
function FE3rBone_update(info, tick){
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
function FE3rBone_dispose(){
   var o = this;
   // 释放内容
   o._boneResource = null;
   o._trackResource = null;
   // 父处理
   o.__base.FG3dBone.dispose.call(o);
}
