//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.ME3dBoundaryPolygon = function ME3dBoundaryPolygon(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._positionCount = MO.Class.register(o, new MO.AGetter('_positionCount'));
   o._positions     = MO.Class.register(o, new MO.AGetter('_positions'));
   o._indexCount    = MO.Class.register(o, new MO.AGetter('_indexCount'));
   o._indexes       = MO.Class.register(o, new MO.AGetter('_indexes'));
   //..........................................................
   // @method
   o.construct      = MO.ME3dBoundaryPolygon_construct;
   // @method
   o.dispose        = MO.ME3dBoundaryPolygon_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.ME3dBoundaryPolygon_construct = function ME3dBoundaryPolygon_construct(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.ME3dBoundaryPolygon_dispose = function ME3dBoundaryPolygon_dispose(){
   var o = this;
   o._positions = null;
   o._indexes = null;
}
