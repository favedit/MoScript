//==========================================================
// <T>渲染矩形。</T>
//  0 ─ 1 
//  │  │
//  3 ─ 2
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dRectangleArea = function FE3dRectangleArea(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   o._coordFlip            = MO.Class.register(o, new MO.AGetSet('_coordFlip'), false);
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   //..........................................................
   // @method
   o.construct             = MO.FE3dRectangleArea_construct;
   // @method
   o.setup                 = MO.FE3dRectangleArea_setup;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dRectangleArea_construct = function FE3dRectangleArea_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._material = MO.Class.create(MO.FE3dMaterial);
}

//==========================================================
// <T>设置信息。</T>
//==========================================================
MO.FE3dRectangleArea_setup = function FE3dRectangleArea_setup(){
   var o = this;
   var context = o._graphicContext;
   // 设置顶点数据
   var vertexPositionData = [-1, 1, 1, 1, 1, -1, -1, -1];
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(vertexPositionData, 4 * 2, 4);
   o.pushVertexBuffer(buffer);
   // 设置颜色数据
   //var vertexColorData = [255, 255, 255, 255, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
   //var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   //buffer.setCode('color');
   //buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   //buffer.upload(vertexColorData, 4, 4);
   //o.pushVertexBuffer(buffer);
   // 设置纹理数据
   var vertexCoordData = null;
   if(o._coordFlip){
      vertexCoordData = [0, 1, 1, 1, 1, 0, 0, 0];
   }else{
      vertexCoordData = [0, 1, 1, 1, 1, 0, 0, 0];
      //vertexCoordData = [0, 0, 1, 0, 1, 1, 0, 1];
   }
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(vertexCoordData, 4 * 2, 4);
   o.pushVertexBuffer(buffer);
   // 设置索引数据
   var indexData = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(indexData, 6);
   o.pushIndexBuffer(buffer);
   // 设置纹理集合
   o._material.info().optionDouble = true;
}
