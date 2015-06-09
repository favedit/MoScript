with(MO){
   //==========================================================
   // <T>渲染立方体。</T>
   //
   //                     20─21    22─23        
   //                   ╱│          ╱│        
   //                 16  24        17  25        
   //                                             
   //                     26            27        
   //                     │            │        
   //                     28─29    30─31  (D面) 
   //                   ╱             ╱         
   //                 18             19  (C面)    
   //     12             13                       
   //   ╱             ╱                         
   //  00─01    02─03                           
   //  │            │                           
   //  04            05                           
   //                                             
   //  06  14        07   15  (B面)     Y   Z     
   //  │╱          │╱               | ╱      
   //  08─09    10─11  (A面)          o ─> X   
   //
   // @class
   // @author maocy
   // @history 150207
   //==========================================================
   MO.FE3dBoundBox = function FE3dBoundBox(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._outline              = RClass.create(o, new AGetter('_outline'));
      o._rate                 = 0.2;
      // @attribute
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      //..........................................................
      // @method
      o.construct             = FE3dBoundBox_construct;
      // @method
      o.setup                 = FE3dBoundBox_setup;
      o.upload                = FE3dBoundBox_upload;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBoundBox_construct = function FE3dBoundBox_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      // 设置属性
      o._material = RClass.create(FE3dMaterial);
      o._outline = new SOutline3();
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBoundBox_setup = function FE3dBoundBox_setup(){
      var o = this;
      var c = o._graphicContext;
      // 创建顶点缓冲
      var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      // 创建颜色缓冲
      var vertexData = new Uint8Array(4 * 32);
      for(var n = 4 * 32 - 1; n >= 0; n--){
         vertexData[n] = 0xFF;
      }
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(vertexData, 1 * 4, 32);
      o.pushVertexBuffer(buffer);
      o._vertexCount = 32;
      //..........................................................
      // 创建索引缓冲
      var indexData = [
          0,  1,  0,  4,  0, 12,
          3,  2,  3,  5,  3, 13,
          8,  6,  8,  9,  8, 14,
         11,  7, 11, 10, 11, 15,
         20, 16, 20, 21, 20, 24,
         23, 17, 23, 22, 23, 25,
         28, 18, 28, 26, 28, 29,
         31, 19, 31, 27, 31, 30 ];
      var buffer = o._indexBuffer = c.createIndexBuffer();
      buffer.setDrawModeCd(EG3dDrawMode.Lines);
      buffer.setLineWidth(1);
      buffer.upload(indexData, 48);
      o.pushIndexBuffer(buffer);
      //..........................................................
      // 更新处理
      o.update();
      //..........................................................
      // 设置材质
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }

   //==========================================================
   // <T>上传处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBoundBox_upload = function FE3dBoundBox_upload(){
      var o = this;
      // 设置变量
      var l = o._outline;
      var a = l.max;
      var ax = a.x;
      var ay = a.y;
      var az = a.z;
      var i = l.min;
      var ix = i.x;
      var iy = i.y;
      var iz = i.z;
      var r = o._rate;
      var cx = (ax - ix) * r;
      var cy = (ay - iy) * r;
      var cz = (az - iz) * r;
      // 设置顶点数据
      var data = [
         // A面12个点
         ix,       ay,      iz,
         ix + cx,  ay,      iz,
         ax - cx,  ay,      iz,
         ax,       ay,      iz,
         ix,       ay - cy, iz,
         ax,       ay - cy, iz,
         ix,       iy + cy, iz,
         ax,       iy + cy, iz,
         ix,       iy,      iz,
         ix + cx,  iy,      iz,
         ax - cx,  iy,      iz,
         ax,       iy,      iz,
         // B面4个点
         ix,       ay,      iz + cz,
         ax,       ay,      iz + cz,
         ix,       iy,      iz + cz,
         ax,       iy,      iz + cz,
         // C面4个点
         ix,       ay,      az - cz,
         ax,       ay,      az - cz,
         ix,       iy,      az - cz,
         ax,       iy,      az - cz,
         // D面12个点
         ix,       ay,      az,
         ix + cx,  ay,      az,
         ax - cx,  ay,      az,
         ax,       ay,      az,
         ix,       ay - cy, az,
         ax,       ay - cy, az,
         ix,       iy + cy, az,
         ax,       iy + cy, az,
         ix,       iy,      az,
         ix + cx,  iy,      az,
         ax - cx,  iy,      az,
         ax,       iy,      az];
      // 更新数据
      o._vertexPositionBuffer.upload(data, 4 * 3, 32);
   }
}
