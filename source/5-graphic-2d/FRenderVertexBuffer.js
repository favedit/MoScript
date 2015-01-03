//==========================================================
// <T>渲染顶点流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
function FRenderVertexBuffer(o){
   o = RClass.inherits(this, o, FRenderObject);
   //..........................................................
   // @attribute
   o.stride = 0;
   o.count  = 0;
   //..........................................................
   // @method
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
