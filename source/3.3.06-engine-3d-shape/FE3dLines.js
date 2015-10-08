//==========================================================
// <T>渲染矩形。</T>
//  0 ─ 1 
//  │  │
//  3 ─ 2
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dLines = function FE3dLines(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   o._count                = MO.Class.register(o, new MO.AGetter('_count'));
   // @attribute
   o._positionsData        = MO.Class.register(o, new MO.AGetter('_positionsData'));
   o._colorsData           = MO.Class.register(o, new MO.AGetter('_colorsData'));
   // @attribute
   o._vertexPositionBuffer = MO.Class.register(o, new MO.AGetter('_vertexPositionBuffer'));
   o._vertexColorBuffer    = MO.Class.register(o, new MO.AGetter('_vertexColorBuffer'));
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   //..........................................................
   // @method
   o.construct             = MO.FE3dLines_construct;
   // @method
   o.setCount              = MO.FE3dLines_setCount;
   o.setup                 = MO.FE3dLines_setup;
   o.upload                = MO.FE3dLines_upload;
   // @method
   o.dispose               = MO.FE3dLines_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dLines_construct = function FE3dLines_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._material = MO.Class.create(MO.FE3dMaterial);
}

//==========================================================
// <T>设置总数。</T>
//==========================================================
MO.FE3dLines_setCount = function FE3dLines_setCount(count){
   var o = this;
   var count = o._count;
   o._positionsData = new Float32Array(3 * count);
   o._colorsData = new Uint8Array(4 * count);
}

//==========================================================
// <T>设置处理。</T>
//==========================================================
MO.FE3dLines_setup = function FE3dLines_setup(){
   var o = this;
   var context = o._graphicContext;
   // 设置顶点数据
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   o.pushVertexBuffer(buffer);
   // 设置颜色数据
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   // 设置索引数据
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   o.pushIndexBuffer(buffer);
   // 设置纹理集合
   o._material.info().optionDouble = true;
}

//==========================================================
// <T>更新数据。</T>
//==========================================================
MO.FE3dLines_upload = function FE3dLines_upload(){
   var o = this;
   var count = o._count;
   o._vertexPositionBuffer.upload(o._positionsData, 4 * 3, count);
   o._indexBuffer.upload(o._colorsData, 4 * 1, count);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dLines_dispose = function FE3dLines_dispose(){
   var o = this;
   o._positionsData = null;
   o._colorsData = null;
   o._material = MO.Lang.Object.dispose(o._material);
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
