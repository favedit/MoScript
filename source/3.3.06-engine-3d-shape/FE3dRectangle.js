//==========================================================
// <T>渲染矩形。</T>
//  0 ─ 1 
//  │  │
//  3 ─ 2
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dRectangle = function FE3dRectangle(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   //..........................................................
   // @method
   o.setup                 = MO.FE3dRectangle_setup;
   return o;
}

//==========================================================
// <T>设置信息。</T>
//
// @param l:left:Number 左边
// @param t:top:Number 上边
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
MO.FE3dRectangle_setup = function FE3dRectangle_setup(context){
   var o = this;
   // 设置顶点数据
   var vp = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(vp, 4 * 3, 4);
   o.pushVertexBuffer(buffer);
   // 设置颜色数据
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   buffer.upload(vc, 4 * 4, 4);
   o.pushVertexBuffer(buffer);
   // 设置索引数据
   var id = [0, 1, 2, 0, 2, 3];
   var buffer = context.createIndexBuffer();
   buffer.upload(id, 6);
   o.pushIndexBuffer(buffer);
}
