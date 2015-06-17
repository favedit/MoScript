with(MO){
   //==========================================================
   // <T>渲染数据。</T>
   //
   // @class
   // @author maocy
   // @history 150611
   //==========================================================
   MO.FE3dDataBox = function FE3dDataBox(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      //..........................................................
      // @attribute
      o._vertexPositionBuffer = RClass.register(o, new AGetter('_vertexPositionBuffer'));
      o._vertexColorBuffer    = RClass.register(o, new AGetter('_vertexColorBuffer'));
      //..........................................................
      // @method
      o.construct             = FE3dDataBox_construct;
      // @method
      o.setup                 = FE3dDataBox_setup;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dDataBox_construct = function FE3dDataBox_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      // 设置属性
      o._material = RClass.create(FE3dMaterial);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dDataBox_setup = function FE3dDataBox_setup(vd, vc, id){
      var o = this;
      var c = o._graphicContext;
      // 更新数据
      //o._vertexPositionBuffer.upload(data, 4 * 3, 32);
      // 创建顶点缓冲
      var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      // 创建颜色缓冲
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
      //..........................................................
      // 创建索引缓冲
      var buffer = o._indexBuffer = c.createIndexBuffer();
      //buffer.setDrawModeCd(EG3dDrawMode.Lines);
      //buffer.setLineWidth(1);
      o.pushIndexBuffer(buffer);
      //..........................................................
      // 设置材质
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }
}
