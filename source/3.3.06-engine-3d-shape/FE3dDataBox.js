//==========================================================
// <T>渲染数据。</T>
//
// @class
// @author maocy
// @history 150611
//==========================================================
MO.FE3dDataBox = function FE3dDataBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable, MO.ME3dDynamicRenderable);
   //..........................................................
   // @attribute
   o._optionColor          = MO.Class.register(o, new MO.AGetSet('_optionColor'), true);
   o._optionCoord          = MO.Class.register(o, new MO.AGetSet('_optionCoord'), false);
   o._optionNormal         = MO.Class.register(o, new MO.AGetSet('_optionNormal'), false);
   // @attribute
   o._vertexPositionBuffer = MO.Class.register(o, new MO.AGetter('_vertexPositionBuffer'));
   o._vertexColorBuffer    = MO.Class.register(o, new MO.AGetter('_vertexColorBuffer'));
   o._vertexCoordBuffer    = MO.Class.register(o, new MO.AGetter('_vertexCoordBuffer'));
   o._vertexNormalBuffer   = MO.Class.register(o, new MO.AGetter('_vertexNormalBuffer'));
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   //..........................................................
   // @method
   o.construct             = MO.FE3dDataBox_construct;
   // @method
   o.setup                 = MO.FE3dDataBox_setup;
   // @method
   o.calculateOutline      = MO.FE3dDataBox_calculateOutline;
   // @method
   o.dispose               = MO.FE3dDataBox_dispose;
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
   o.__base.ME3dDynamicRenderable.construct.call(o);
   // 设置属性
   o._material = MO.Class.create(MO.FE3dMaterial);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dDataBox_setup = function FE3dDataBox_setup(vd, vc, id){
   var o = this;
   var c = o._graphicContext;
   // 创建顶点缓冲
   var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   // 创建颜色缓冲
   if(o._optionColor){
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
   }
   // 创建纹理缓冲
   if(o._optionCoord){
      var buffer = o._vertexCoordBuffer = c.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
      o.pushVertexBuffer(buffer);
   }
   // 创建法线缓冲
   if(o._optionNormal){
      var buffer = o._vertexNormalBuffer = c.createVertexBuffer();
      buffer.setCode('normal');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
   }
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

//==========================================================
// <T>计算轮廓。</T>
//
// @method
// @return SOutline 轮廓
//==========================================================
MO.FE3dDataBox_calculateOutline = function FE3dDataBox_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var vertexCount = o._vertexCount;
      var data = o._vertexPositionBuffer._data;
      var index = 0;
      for(var i = 0; i < vertexCount; i++){
         var x = data[index++];
         var y = data[index++];
         var z = data[index++];
         outline.mergePoint(x, y, z);
      }
      outline.update();
   }
   return outline;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dDataBox_dispose = function FE3dDataBox_dispose(){
   var o = this;
   // 设置属性
   o._material = MO.Class.create(MO.FE3dMaterial);
   // 父处理
   o.__base.ME3dDynamicRenderable.dispose.call(o);
   o.__base.FE3dRenderable.dispose.call(o);
}
