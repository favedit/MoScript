with(MO){
   //==========================================================
   // <T>渲染索引流。</T>
   //
   // @class FObject
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
      o = RClass.inherits(this, o, FG3dBuffer);
      //..........................................................
      // @attribute
      o._strideCd   = RClass.register(o, new AGetSet('_strideCd'), EG3dIndexStride.Uint16);
      o._count      = RClass.register(o, new AGetSet('_count'), 0);
      // @attribute
      o._drawModeCd = RClass.register(o, new AGetSet('_drawModeCd'), EG3dDrawMode.Triangles);
      o._lineWidth  = RClass.register(o, new AGetSet('_lineWidth'), 1);
      //..........................................................
      // @method
      o.upload      = RMethod.virtual(o, 'upload');
      return o;
   }
}
