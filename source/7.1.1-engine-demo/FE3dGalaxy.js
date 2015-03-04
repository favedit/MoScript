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
   //..........................................................
   // @method
   o.construct             = FE3dGalaxy_construct;
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
   o._vertexData = new Float32Array();
   o._indexData = new Uint16Array();
}

//==========================================================
// <T>设置信息。</T>
//
// @param l:left:Number 左边
// @param t:top:Number 上边
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function FE3dGalaxy_generatePixel(i, x, y, v){
   var o = this;
   var cr = (v >> 16) & 0xFF
   var cg = (v >>  8) & 0xFF
   var cb = (v      ) & 0xFF
   //var cv = parseInt((cr + cg + cb) / 64);
   // 产生一个随机位置矩形
   for(var ci = 0; ci < 1; ci++){
      var vd = [
         i, -1,  1, 0, cr, cg, cb, 1
         i,  1,  1, 0, cr, cg, cb, 1
         i,  1, -1, 0, cr, cg, cb, 1
         i, -1, -1, 0, cr, cg, cb, 1 ];
      var l = vd.length;
      for(var i = 0; i < l; i++){
         o._vertexData.push(vd[i]);
      }
      var id = [0, 1, 2, 0, 2, 3];
      var l = id.length;
      for(var i = 0; i < l; i++){
         o._indexData.push(id[i]);
      }
   }
}

//==========================================================
// <T>设置信息。</T>
//
// @param l:left:Number 左边
// @param t:top:Number 上边
// @param w:width:Number 宽度
// @param h:height:Number 高度
//==========================================================
function FE3dGalaxy_setup(){
   var o = this;
   var c = o._graphicContext;
   var sw = o._cellSize.width;
   var sh = o._cellSize.height;
   // 获得位图数据
   var d = o._bitmapData;
   var ds = o._bitmapSize;
   var dw = ds.width;
   var dw2 = ds.width / 2;
   var dh = ds.height;
   var dh2 = ds.height / 2;
   var i = 0;
   for(var y = 0; y < dh; y += sh){
      for(var x = 0; x < dw; x += sw){
         o.generatePixel(i++, x - dw2, y - dh2, d[i]);
      }
   }
   //..........................................................
   o._vertexCount = vc;
   // 上传顶点数据
   var vb = o._vertexBuffer = c.createVertexBuffer();
   vb.upload(o._vertexData, 4 * 5, i);
   // 上传颜色数据
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vcd, 4, vc);
   o._vertexBuffers.set(vb._name, vb);
   // 上传索引数据
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(o._indexData, i);
   //..........................................................
   // 设置材质
   var mi = o.material().info();
   mi.effectCode = 'galaxy';
}
