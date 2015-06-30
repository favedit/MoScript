//==========================================================
// <T>渲染顶点流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   //..........................................................
   // @attribute_formatCd
   o._formatCd = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o._stride   = MO.Class.register(o, new MO.AGetSet('_stride'), 0);
   o._count    = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   //..........................................................
   // @method
   o.upload    = MO.Method.virtual(o, 'upload');
   return o;
}
