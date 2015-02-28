//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FRd3Bone(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._matrix        = null
   o._boneResource  = null
   o._trackResource = null;
   //..........................................................
   // @method
   o.construct      = FRd3Bone_construct;
   // @method
   o.matrix         = FRd3Bone_matrix;
   o.trackResource  = FRd3Bone_trackResource;
   o.loadResource   = FRd3Bone_loadResource;
   o.update         = FRd3Bone_update;
   // @method
   o.dispose        = FRd3Bone_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3Bone_construct(){
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
function FRd3Bone_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得资源跟踪。</T>
//
// @method
// @return FE3sTrack 资源跟踪
//==========================================================
function FRd3Bone_trackResource(){
   return this._trackResource;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sBone 资源
//==========================================================
function FRd3Bone_loadResource(p){
   var o = this;
   o._boneResource = p;
   o._trackResource = p.track();
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param pi:playInfo:SRd3PlayInfo 播放信息
// @param pt:tick:Integer 时刻
//==========================================================
function FRd3Bone_update(pi, pt){
   var o = this;
   // 计算帧信息
   var t = o._trackResource;
   t.calculate(pi, pt);
   pi.update();
   // 计算矩阵
   var m = o._matrix;
   m.assign(t.matrixInvert());
   m.append(pi.matrix);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRd3Bone_dispose(){
   var o = this;
   // 释放内容
   o._boneResource = null;
   o._trackResource = null;
   // 父处理
   o.__base.FG3dBone.dispose.call(o);
}
