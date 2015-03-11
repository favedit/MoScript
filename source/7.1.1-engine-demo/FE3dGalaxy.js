//==========================================================
// <T>根据位图生成银河系模拟。</T>
// <P>生成一个网格，通过渲染器，靠近中央的位置选中速度快，周围的旋转慢。</P>
// <P>根据位图灰度，产生上下的随机点，每个球体由一个圆球构成。</P>
// <P>通过网格一次绘制。</P>
//
// 一个面片
//  00 ─ 01
//  │    │
//  03 ─ 02   ->X
// @author maocy
// @history 141231
//==========================================================
function FE3dGalaxy(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   //..........................................................
   // @attribute
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   // @attribute
   o._vertexInstanceBuffer = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   // @attribute
   o._vertexInstanceData   = null;
   o._vertexPositionData   = null;
   o._vertexColorData      = null;
   o._indexData            = null;
   //..........................................................
   // @method
   o.construct             = FE3dGalaxy_construct;
   o.generatePixel             = FE3dGalaxy_generatePixel;
   // @method
   o.setup                 = FE3dGalaxy_setup;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dGalaxy_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._cellSize = new SSize2();
   o._cellSize.set(2, 2);
   o._size = new SSize2();
   o._size.set(16, 16);
}

//==========================================================
// <T>设置信息。</T>
//
// @param l:left:Number 左边
// @param t:top:Number 上边
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function FE3dGalaxy_generatePixel(i, ix, iy, x, y, d){
   var o = this;
   var di = (o._size.width * iy + ix) * 4;
   var cr = d[di++];
   var cg = d[di++];
   var cb = d[di++];
   // 产生一个随机位置矩形
   for(var ci = 0; ci < 1; ci++){
      // 写入顶点实例数据
      RFloat.fill(o._vertexInstanceData, 4 * i, 4, i);
      // 写入顶点坐标数据
      var s = 0.4;
      var vd = [
         x - s, 0, y + s,
         x + s, 0, y + s,
         x + s, 0, y - s,
         x - s, 0, y - s];
      RFloat.copy(o._vertexPositionData, 4 * 3 * i, vd, 0, 12);
      // 写入顶点颜色数据
      var vd = [
         cr, cg, cb, 1,
         cr, cg, cb, 1,
         cr, cg, cb, 1,
         cr, cg, cb, 1];
      RFloat.copy(o._vertexColorData, 4 * 4 * i, vd, 0, 16);
      // 写入索引数据
      var ib = i * 4;
      var id = [ib + 0, ib + 1, ib + 2, ib + 0, ib + 2, ib + 3];
      RInteger.copy(o._indexData, 6 * i, id, 0, 6);
   }
}

//==========================================================
// <T>设置信息。</T>
//
// @param p:data:Uint8Array 数据
//==========================================================
function FE3dGalaxy_setup(p){
   var o = this;
   var c = o._graphicContext;
   // 获得位图数据
   var dw = o._size.width;
   var dw2 = dw / 2;
   var dh = o._size.height;
   var dh2 = dh / 2;
   var sw = o._cellSize.width;
   var sh = o._cellSize.height;
   // 计算顶点数据
   var tc = (dw / sw) * (dh / sh);
   var vc = 4 * tc;
   o._vertexCount = vc;
   o._vertexInstanceData = new Float32Array(vc);
   o._vertexPositionData = new Float32Array(3 * vc);
   o._vertexColorData = new Uint8Array(4 * vc);
   o._indexData = new Uint32Array(6 * tc);
   // 生成点数据
   var i = 0;
   for(var y = 0; y < dh; y += sh){
      for(var x = 0; x < dw; x += sw){
         o.generatePixel(i++, x, y, x - dw2, y - dh2, p);
      }
   }
   //..........................................................
   // 上传顶点实例数据
   var vb = o._vertexInstanceBuffer = c.createVertexBuffer();
   vb._name = 'instance';
   vb._formatCd = EG3dAttributeFormat.Float1;
   vb.upload(o._vertexInstanceData, 4, vc);
   o._vertexBuffers.set(vb._name, vb);
   // 上传顶点坐标数据
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   vb.upload(o._vertexPositionData, 4 * 3, vc);
   o._vertexBuffers.set(vb._name, vb);
   // 上传顶点颜色数据
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(o._vertexColorData, 4, vc);
   o._vertexBuffers.set(vb._name, vb);
   // 上传索引数据
   var ib = o._indexBuffer = c.createIndexBuffer();
   //ib._fillMode = EG3dFillMode.Line;
   //ib._lineWidth = 1;
   ib._strideCd = EG3dIndexStride.Uint32;
   ib.upload(o._indexData, 6 * tc);
   //..........................................................
   // 设置材质
   var mi = o.material().info();
   mi.effectCode = 'galaxy';
   mi.ambientColor.set(1, 1, 1, 1);
}
