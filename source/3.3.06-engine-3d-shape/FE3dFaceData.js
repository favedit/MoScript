//==========================================================
// <T>渲染平面数据。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dFaceData = function FE3dFaceData(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._ready                = false;
   // @attribute
   o._optionCenter         = MO.Class.register(o, new MO.AGetSet('_optionCenter'), false);
   // @attribute
   o._size                 = MO.Class.register(o, new MO.AGetter('_size'));
   o._adjustSize           = MO.Class.register(o, new MO.AGetter('_adjustSize'));
   // @attribute
   o._vertexPositionBuffer = MO.Class.register(o, new MO.AGetter('_vertexPositionBuffer'));
   o._vertexCoordBuffer    = MO.Class.register(o, new MO.AGetter('_vertexCoordBuffer'));
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   o._texture              = MO.Class.register(o, new MO.AGetter('_texture'));
   //..........................................................
   // @method
   o.construct             = MO.FE3dFaceData_construct;
   // @method
   o.testReady             = MO.FE3dFaceData_testReady;
   // @method
   o.setup                 = MO.FE3dFaceData_setup;
   // @method
   o.dispose               = MO.FE3dFaceData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dFaceData_construct = function FE3dFaceData_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._size = new MO.SSize2();
   o._adjustSize = new MO.SSize2();
   o._material = MO.Class.create(MO.FE3dMaterial);
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
MO.FE3dFaceData_testReady = function FE3dFaceData_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dFaceData_setup = function FE3dFaceData_setup(){
   var o = this;
   var context = o._graphicContext;
   // 设置顶点数量
   o._vertexCount = 4;
   // 设置顶点数据
   var data = null;
   if(o._optionCenter){
      data = [-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0];
   }else{
      data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
   }
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(data, 4 * 3, 4);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('position');
   stream.setDataCount(4);
   stream.setData(data);
   buffer._resource = stream;
   o.pushVertexBuffer(buffer);
   // 设置纹理数据
   var data = [0, 1, 1, 1, 1, 0, 0, 0];
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(data, 4 * 2, 4);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('coord');
   stream.setDataCount(4);
   stream.setData(data);
   buffer._resource = stream;
   o.pushVertexBuffer(buffer);
   // 设置索引数据
   var data = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, 6);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('index16');
   stream.setDataCount(2);
   stream.setData(data);
   buffer._resource = stream;
   o.pushIndexBuffer(buffer);
   // 创建纹理
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   // 设置材质
   o._material.info().optionDouble = true;
   o._material._textures = o._textures;

}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dFaceData_dispose = function FE3dFaceData_dispose(){
   var o = this;
   // 释放属性
   o._size = MO.Lang.Object.dispose(o._size);
   o._adjustSize = MO.Lang.Object.dispose(o._adjustSize);
   o._texture = MO.Lang.Object.dispose(o._texture);
   // 释放属性
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
