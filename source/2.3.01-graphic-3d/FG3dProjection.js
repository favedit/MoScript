//==========================================================
// <T>渲染投影。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dProjection = function FG3dProjection(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._matrix      = MO.Class.register(o, new MO.AGetter('_matrix'));
   // @attribute
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o._angle       = MO.Class.register(o, new MO.AGetSet('_angle'), 60.0);
   o._fieldOfView = MO.Class.register(o, new MO.AGetSet('_fieldOfView'), 0);
   o._znear       = MO.Class.register(o, new MO.AGetSet('_znear'), 0.1);
   o._zfar        = MO.Class.register(o, new MO.AGetSet('_zfar'), 200);
   o._zoom        = MO.Class.register(o, new MO.AGetSet('_zoom'), 1);
   //..........................................................
   // @method
   o.construct    = MO.FG3dProjection_construct;
   // @method
   o.distance     = MO.FG3dProjection_distance;
   // @method
   o.dispose      = MO.FG3dProjection_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dProjection_construct = function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._matrix = new MO.SMatrix3d();
   o._size = new MO.SSize2();
}

//==========================================================
// <T>获得距离。</T>
//
// @method
// @return Number 距离
//==========================================================
MO.FG3dProjection_distance = function FG3dProjection_distance(){
   return this._zfar - this._znear;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG3dProjection_dispose = function FG3dProjection_dispose(){
   var o = this;
   // 释放属性
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._size = MO.Lang.Object.dispose(o._size);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
