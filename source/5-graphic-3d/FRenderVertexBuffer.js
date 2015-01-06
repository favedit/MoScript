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
   o._name     = 0;
   o._formatCd = ERenderAttributeFormat.Unknown;
   o.stride    = 0;
   o.count     = 0;
   //..........................................................
   // @method
   o.name   = FRenderVertexBuffer_name;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return 名称
//==========================================================
function FRenderVertexBuffer_name(){
   return this._name;
}
