//==========================================================
// <T>渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   //..........................................................
   // @attribute
   o._strideCd   = MO.Class.register(o, new MO.AGetSet('_strideCd'), MO.EG3dIndexStride.Uint16);
   o._count      = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   // @attribute
   o._drawModeCd = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._lineWidth  = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   //..........................................................
   // @method
   o.upload      = MO.Method.virtual(o, 'upload');
   return o;
}
