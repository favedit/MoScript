with(MO){
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
   MO.FE3dGalaxy = function FE3dGalaxy(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._seed                 = 0;
      o._cellSize             = null;
      o._size                 = null;
      o._lineColor            = null;
      o._lineCenterColor      = null;
      o._radius               = 0;
      // @attribute
      o._vertexSpecialBuffer  = null;
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._vertexColorBuffer    = null;
      // @attribute
      o._vertexSpecialData    = null;
      o._vertexPositionData   = null;
      o._vertexCoordData      = null;
      o._vertexColorData      = null;
      o._indexData            = null;
      //..........................................................
      // @method
      o.construct             = FE3dGalaxy_construct;
      o.generatePixel         = FE3dGalaxy_generatePixel;
      // @method
      o.setup                 = FE3dGalaxy_setup;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dGalaxy_construct = function FE3dGalaxy_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
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
   MO.FE3dGalaxy_generatePixel = function FE3dGalaxy_generatePixel(i, ix, iy, x, y, d){
      var o = this;
      var di = (o._size.width * iy + ix) * 4;
      var cr = d[di++];
      var cg = d[di++];
      var cb = d[di++];
      var r = 1 - Math.sqrt(x * x + y * y) / o._radius;
      // 产生一个随机位置矩形
      for(var ci = 0; ci < 1; ci++){
         // 写入顶点实例数据
         var vd = [
            x, 0, y, r,
            x, 0, y, r,
            x, 0, y, r,
            x, 0, y, r];
         RFloat.copy(o._vertexSpecialData, 16 * i, vd, 0, 16);
         // 写入顶点坐标数据
         var s = 0.5;
         var vd = [
            x - s, 0, y + s,
            x + s, 0, y + s,
            x + s, 0, y - s,
            x - s, 0, y - s];
         RFloat.copy(o._vertexPositionData, 12 * i, vd, 0, 12);
         // 写入顶点纹理数据
         var vd = [
            0, 1,
            1, 1,
            1, 0,
            0, 0];
         RFloat.copy(o._vertexCoordData, 8 * i, vd, 0, 8);
         // 写入顶点颜色数据
         var vd = [
            cr, cg, cb, 1,
            cr, cg, cb, 1,
            cr, cg, cb, 1,
            cr, cg, cb, 1];
         RFloat.copy(o._vertexColorData, 16 * i, vd, 0, 16);
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
   MO.FE3dGalaxy_setup = function FE3dGalaxy_setup(p){
      var o = this;
      var c = o._graphicContext;
      // 获得位图数据
      var dw = o._size.width;
      var dw2 = dw / 2;
      var dh = o._size.height;
      var dh2 = dh / 2;
      var sw = o._cellSize.width;
      var sh = o._cellSize.height;
      o._radius = Math.sqrt(dw2 * dw2 + dh2 * dh2);
      // 计算顶点数据
      var tc = (dw / sw) * (dh / sh);
      var vc = 4 * tc;
      o._vertexCount = vc;
      o._vertexSpecialData = new Float32Array(4 * vc);
      o._vertexPositionData = new Float32Array(3 * vc);
      o._vertexCoordData = new Float32Array(2 * vc);
      o._vertexColorData = new Uint8Array(4 * vc);
      o._indexData = new Array(6 * tc);
      // 生成点数据
      var i = 0;
      for(var y = 0; y < dh; y += sh){
         for(var x = 0; x < dw; x += sw){
            o.generatePixel(i++, x, y, x - dw2, y - dh2, p);
         }
      }
      //..........................................................
      // 上传顶点实例数据
      var vb = o._vertexSpecialBuffer = c.createVertexBuffer();
      vb.setCode('special');
      vb._formatCd = EG3dAttributeFormat.Float4;
      vb.upload(o._vertexSpecialData, 4 * 4, vc);
      o.pushVertexBuffer(vb);
      // 上传顶点坐标数据
      var vb = o._vertexPositionBuffer = c.createVertexBuffer();
      vb.setCode('position');
      vb._formatCd = EG3dAttributeFormat.Float3;
      vb.upload(o._vertexPositionData, 4 * 3, vc);
      o.pushVertexBuffer(vb);
      // 上传顶点纹理数据
      var vb = o._vertexCoordBuffer = c.createVertexBuffer();
      vb.setCode('coord');
      vb._formatCd = EG3dAttributeFormat.Float2;
      vb.upload(o._vertexCoordData, 4 * 2, vc);
      o.pushVertexBuffer(vb);
      // 上传顶点颜色数据
      var vb = o._vertexColorBuffer = c.createVertexBuffer();
      vb.setCode('color');
      vb._formatCd = EG3dAttributeFormat.Byte4Normal;
      vb.upload(o._vertexColorData, 4, vc);
      o.pushVertexBuffer(vb);
      // 上传索引数据
      var ib = o._indexBuffer = c.createIndexBuffer();
      var i32 = context.capability().optionIndex32;
      if(i32){
         ib._strideCd = EG3dIndexStride.Uint32;
         ib.upload(new Uint32Array(o._indexData), 6 * tc);
      }else{
         ib._strideCd = EG3dIndexStride.Uint16;
         ib.upload(new Uint16Array(o._indexData), 6 * tc);
      }
      //ib._fillMode = EG3dFillMode.Line;
      //ib._lineWidth = 1;
      //..........................................................
      // 设置材质
      var mi = o.material().info();
      mi.effectCode = 'galaxy';
      //mi.optionDouble = true;
      //mi.optionAlpha = true;
      mi.ambientColor.set(1, 1, 1, 1);
   }
}
