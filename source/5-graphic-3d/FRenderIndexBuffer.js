//==========================================================
// <T>渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
function FRenderIndexBuffer(o){
   o = RClass.inherits(this, o, FRenderObject);
   //..........................................................
   // @attribute
   o.strideCd = ERenderIndexStride.Uint16;
   o.count    = 0;
   //..........................................................
   // @method
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
