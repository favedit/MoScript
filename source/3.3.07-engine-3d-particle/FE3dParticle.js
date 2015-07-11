 //==========================================================
// <T>渲染视频。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dParticle = function FE3dParticle(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._items                = MO.Class.register(o, new MO.AGetter('_items'));
   // @attribute
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   //..........................................................
   // @method
   o.construct             = MO.FE3dParticle_construct;
   o.setup                 = MO.FE3dParticle_setup;
   // @method
   o.testReady             = MO.FE3dParticle_testReady;
   o.findTexture           = MO.FE3dParticle_findTexture;
   o.textures              = MO.FE3dParticle_textures;
   o.material              = MO.FE3dParticle_material;
   o.setSize               = MO.FE3dParticle_setSize;
   o.setData               = MO.FE3dParticle_setData;
   o.loadUrl               = MO.FE3dParticle_loadUrl;
   // @method
   o.createItem            = MO.FE3dParticle_createItem;
   o.pushItem              = MO.FE3dParticle_pushItem;
   o.process               = MO.FE3dParticle_process;
   o.upload                = MO.FE3dParticle_upload;
   // @method
   o.dispose               = MO.FE3dParticle_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticle_construct = function FE3dParticle_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   // 设置属性
   o._items = new MO.TLooper();
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dParticle_setup = function FE3dParticle_setup(){
   var o = this;
   var context = o._graphicContext;
   // 设置顶点数量
   o._vertexCount = 0;
   // 设置顶点数据
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   // 设置纹理数据
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   o.pushVertexBuffer(buffer);
   // 设置颜色数据
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   // 设置索引数据
   var buffer = o._indexBuffer = context.createIndexBuffer();
   o.pushIndexBuffer(buffer);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
MO.FE3dParticle_testReady = function FE3dParticle_testReady(){
   var o = this;
   if(!o._ready){
      o._ready = o._renderable.testReady();
   }
   return o._ready;
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
MO.FE3dParticle_findTexture = function FE3dParticle_findTexture(p){
   return this._renderable.findTexture(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
MO.FE3dParticle_textures = function FE3dParticle_textures(){
   return this._renderable.textures();
}

//==========================================================
// <T>查找材质。</T>
//
// @method
// @return FE3dMaterial 材质
//==========================================================
MO.FE3dParticle_material = function FE3dParticle_material(){
   return this._renderable.material();
}

//==========================================================
// <T>设置大小。</T>
//
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.FE3dParticle_setSize = function FE3dParticle_setSize(width, height){
   var o = this;
   //o._size.set(width, height);
   //o._matrix.setScale(width, height, 1);
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param data:FE3dParticleData 渲染对象
//==========================================================
MO.FE3dParticle_setData = function FE3dParticle_setData(data){
   this._renderable = data;
}

//==========================================================
// <T>加载位图处理。</T>
//
// @method
//==========================================================
MO.FE3dParticle_loadUrl = function FE3dParticle_loadUrl(url){
   var o = this;
   var context = o._graphicContext;
   o._renderable = RConsole.find(FE3dParticleConsole).loadUrl(context, url);
   o._ready = false;
}

//==========================================================
// <T>创建一个粒子项目。</T>
//
// @method
//==========================================================
MO.FE3dParticle_createItem = function FE3dParticle_createItem(){
   var o = this;
   var item = MO.Class.create(MO.FE3dParticleItem);
   o.pushItem(item);
   return o;
}

//==========================================================
// <T>增加一个粒子项目。</T>
//
// @method
//==========================================================
MO.FE3dParticle_pushItem = function FE3dParticle_pushItem(item){
   this._items.push(item);
}

//==========================================================
// <T>加载位图处理。</T>
//
// @method
//==========================================================
MO.FE3dParticle_process = function FE3dParticle_process(){
   var o = this;
   o.__base.FE3dRenderable.process.call(o);
   var particleConsole = MO.Console.find(MO.FE3dParticleConsole);
   // 处理所有项目
   var items = o._items;
   items.record();
   while(items.next()){
      var item = items.current();
      if(item.currentFinish()){
         items.removeCurrent();
         // 释放对象
         particleConsole.itemFree(item);
      }
      item.process();
   }
   // 更新数据
   if(!items.isEmpty()){
      o.upload();
   }
}

//==========================================================
// <T>加载位图处理。</T>
//
// @method
//==========================================================
MO.FE3dParticle_upload = function FE3dParticle_upload(){
   var o = this;
   var context = o._graphicContext;
   var items = o._items;
   var count = items.count();
   var vertexCount = o._vertexCount = 4 * count;
   var vertexPositionIndex = 0;
   //var vertexPositionData = MO.RTypeArray.findTemp(MO.EDataType.Float32, 3 * vertexCount);
   var vertexPositionData = new Float32Array(3 * vertexCount);
   var vertexCoordIndex = 0;
   //var vertexCoordData = MO.RTypeArray.findTemp(MO.EDataType.Float32, 2 * vertexCount);
   var vertexCoordData = new Float32Array(2 * vertexCount);
   var vertexColorIndex = 0;
   //var vertexColorData = MO.RTypeArray.findTemp(MO.EDataType.Uint8, 4 * vertexCount);
   var vertexColorData = new Uint8Array(4 * vertexCount);
   var indexIndex = 0;
   //var indexData = MO.RTypeArray.findTemp(MO.EDataType.Uint16, 2 * 6 * count);
   var indexData = new Uint16Array(2 * 6 * count);
   var visibleCount = 0;
   items.record();
   var index = 0;
   while(items.next()){
      var item = items.current();
      if(!item.visible()){
         continue;
      }
      var matrix = item.currentMatrix();
      var color = item.color();
      var red = parseInt(255 * MO.Lang.Float.toRange(color.red, 0, 1));
      var green = parseInt(255 * color.green);
      var blue = parseInt(255 * color.blue);
      var alpha = parseInt(255 * item.currentAlpha());
      // 变换顶点
      matrix.transform(vertexPositionData, 12 * index, MO.Lang.Math.faceCenterPositions, 0, 4);
      // 设置顶点纹理
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 1;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      vertexCoordData[vertexCoordIndex++] = 0;
      // 设置顶点颜色
      for(var i = 0; i < 4; i++){
         vertexColorData[vertexColorIndex++] = red;
         vertexColorData[vertexColorIndex++] = green;
         vertexColorData[vertexColorIndex++] = blue;
         vertexColorData[vertexColorIndex++] = alpha;
      }
      // 设置索引
      var positionIndex = 4 * index;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 1;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 0;
      indexData[indexIndex++] = positionIndex + 2;
      indexData[indexIndex++] = positionIndex + 3;
      // 设置可见个数
      index++;
   }
   // 上传数据
   o._vertexPositionBuffer.upload(vertexPositionData, 4 * 3, index);
   o._vertexCoordBuffer.upload(vertexCoordData, 4 * 2, index);
   o._vertexColorBuffer.upload(vertexColorData, 4 * 1, index);
   o._indexBuffer.upload(indexData, 6 * index);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dParticle_dispose = function FE3dParticle_dispose(){
   var o = this;
   // 释放属性
   o._items = MO.Lang.Object.dispose(o._items);
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
