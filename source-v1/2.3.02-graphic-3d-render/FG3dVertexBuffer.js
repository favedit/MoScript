//==========================================================
// <T>渲染顶点流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dBuffer);
   //..........................................................
   // @attribute
   o._formatCd   = EG3dAttributeFormat.Unknown;
   o._stride     = 0;
   o._count      = 0;
   //..........................................................
   // @method
   o.formatCd    = FG3dVertexBuffer_formatCd;
   o.setFormatCd = FG3dVertexBuffer_setFormatCd;
   o.stride      = FG3dVertexBuffer_stride;
   o.setStride   = FG3dVertexBuffer_setStride;
   o.count       = FG3dVertexBuffer_count;
   o.setCount    = FG3dVertexBuffer_setCount;
   // @method
   o.upload      = RMethod.virtual(o, 'upload');
   return o;
}

//==========================================================
// <T>获得格式类型。</T>
//
// @method
// @return EG3dAttributeFormat 格式
//==========================================================
function FG3dVertexBuffer_formatCd(){
   return this._formatCd;
}

//==========================================================
// <T>设置格式类型。</T>
//
// @method
// @param formatCd:EG3dAttributeFormat 格式
//==========================================================
function FG3dVertexBuffer_setFormatCd(formatCd){
   this._formatCd = formatCd;
}

//==========================================================
// <T>获得宽度。</T>
//
// @method
// @return Integer 宽度
//==========================================================
function FG3dVertexBuffer_stride(){
   return this._stride;
}

//==========================================================
// <T>设置宽度。</T>
//
// @method
// @param stride:Integer 宽度
//==========================================================
function FG3dVertexBuffer_setStride(stride){
   this._stride = stride;
}

//==========================================================
// <T>获得总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
function FG3dVertexBuffer_count(){
   return this._count;
}

//==========================================================
// <T>设置总数。</T>
//
// @method
// @param count:Integer 总数
//==========================================================
function FG3dVertexBuffer_setCount(count){
   this._count = count;
}
