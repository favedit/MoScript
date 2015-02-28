//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FRd3Track(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._matrix      = null
   o._resource    = null;
   //..........................................................
   // @method
   o.construct    = FRd3Track_construct;
   // @method
   o.matrix       = FRd3Track_matrix;
   o.resource     = FRd3Track_resource;
   o.loadResource = FRd3Track_loadResource;
   // @method
   o.dispose      = FRd3Track_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3Track_construct(){
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
function FRd3Track_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FRs3Track 资源
//==========================================================
function FRd3Track_resource(){
   return this._resource;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FRs3Bone 资源
//==========================================================
function FRd3Track_loadResource(p){
   var o = this;
   o._resource = p;
   // 设置属性
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRd3Track_dispose(){
   var o = this;
   // 释放内容
   o._resource = null;
   // 父处理
   o.__base.FG3dTrack.dispose.call(o);
}
