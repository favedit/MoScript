with(MO){
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
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o._indexBuffer          = null;
      //..........................................................
      // @method
      o.setup                 = FE3dRectangle_setup;
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
   MO.FE3dRectangle_setup = function FE3dRectangle_setup(p){
      var o = this;
      // 设置顶点数据
      var vp = [
         -1.0,  1.0, 0.0,
          1.0,  1.0, 0.0,
          1.0, -1.0, 0.0,
         -1.0, -1.0, 0.0 ];
      o._vertexPositionBuffer = p.createVertexBuffer();
      o._vertexPositionBuffer.upload(vp, 4 * 3, 4);
      // 设置颜色数据
      var vc = [
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         0.0, 0.0, 0.0, 1.0 ];
      o._vertexColorBuffer = p.createVertexBuffer();
      o._vertexColorBuffer.upload(vc, 4 * 4, 4);
      // 设置索引数据
      var id = [0, 1, 2, 0, 2, 3];
      o._indexBuffer = context.createIndexBuffer();
      o._indexBuffer.upload(id, 6);
   }
}
