with(MO){
   //==========================================================
   // <T>渲染顶点流。</T>
   //
   // @class FObject
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
      o = RClass.inherits(this, o, FG3dBuffer);
      //..........................................................
      // @attribute_formatCd
      o._formatCd = RClass.register(o, new AGetSet('_formatCd'), EG3dAttributeFormat.Unknown);
      o._stride   = RClass.register(o, new AGetSet('_stride'), 0);
      o._count    = RClass.register(o, new AGetSet('_count'), 0);
      //..........................................................
      // @method
      o.upload    = RMethod.virtual(o, 'upload');
      return o;
   }
}
