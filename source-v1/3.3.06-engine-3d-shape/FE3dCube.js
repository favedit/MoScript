//==========================================================
// <T>渲染立方体。</T>
//      04 ── 05
//    ╱│    ╱ │
//  00 ── 01   │
//  │  07─│─ 06
//  │╱    │ ╱
//  03 ── 02
//
// @author maocy
// @history 141231
//==========================================================
function FE3dCube(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   //..........................................................
   // @attribute
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   //..........................................................
   // @method
   o.setup                = FE3dCube_setup;
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
function FE3dCube_setup(p){
   var o = this;
   // 设置顶点数据
   var vp = [
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 8);
   // 设置颜色数据
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 8);
   // 设置索引数据
   var id = [
      0, 1, 2, 0, 2, 3,
      1, 5, 6, 1, 6, 2,
      5, 4, 7, 5, 7, 6,
      4, 0, 3, 4, 3, 7,
      0, 4, 5, 0, 5, 1,
      3, 2, 6, 3, 6, 7  ];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 36);
   //..........................................................
   // 设置材质
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
