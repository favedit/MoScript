//==========================================================
// <T>渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o.strideCd = EG3dIndexStride.Uint16;
   o.count    = 0;
   //..........................................................
   // @method
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
