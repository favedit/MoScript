//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rBitmap(o){
   o = RClass.inherits(this, o, FE3rObject);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._vertexCount      = 4;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._material         = null;
   o._textures         = null;
   // @attribute
   o._image            = null;
   o._size             = null;
   o._adjustSize       = null;
   //..........................................................
   // @event
   o.onImageLoad       = FE3rBitmap_onImageLoad;
   //..........................................................
   // @method
   o.construct         = FE3rBitmap_construct;
   // @method
   o.testReady         = FE3rBitmap_testReady;
   // @method
   o.size              = FE3rBitmap_size;
   o.adjustSize        = FE3rBitmap_adjustSize;
   // @method
   o.vertexCount       = FE3rBitmap_vertexCount;
   o.findVertexBuffer  = FE3rBitmap_findVertexBuffer;
   o.vertexBuffers     = FE3rBitmap_vertexBuffers;
   o.indexBuffer       = FE3rBitmap_indexBuffer;
   o.material          = FE3rBitmap_material;
   o.findTexture       = FE3rBitmap_findTexture;
   o.textures          = FE3rBitmap_textures;
   // @method
   o.setup             = FE3rBitmap_setup;
   o.loadUrl           = FE3rBitmap_loadUrl;
   // @method
   o.dispose           = FE3rBitmap_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rBitmap_onImageLoad(event){
   var o = this;
   var context = o._graphicContext;
   var image = event.sender;
   var size = image.size();
   var width = size.width;
   var height = size.height;
   o._size.set(width, height);
   var adjustWidth = RInteger.pow2(width);
   var adjustHeight = RInteger.pow2(height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   // 绘制画板
   var canvasConsole = RConsole.find(FE2dCanvasConsole);
   var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
   var context2d = canvas.context();
   context2d.drawImage(image, 0, 0);
   // 创建纹理
   var texture = o._imageTexture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.upload(canvas);
   o._textures.set('diffuse', texture);
   // 释放画板
   canvasConsole.free(canvas);
   // 释放位图
   image.dispose();
   // 设置属性
   o._ready = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rBitmap_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   // 设置属性
   o._size = new SSize2();
   o._adjustSize = new SSize2();
   o._vertexBuffers = new TDictionary();
   o._textures = new TDictionary();
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
function FE3rBitmap_testReady(){
   return this._ready;
}

//==========================================================
// <T>获得大小。</T>
//
// @method
// @return SSize2 大小
//==========================================================
function FE3rBitmap_size(){
   return this._size;
}

//==========================================================
// <T>获得调整大小。</T>
//
// @method
// @return SSize2 调整大小
//==========================================================
function FE3rBitmap_adjustSize(){
   return this._adjustSize;
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FE3rBitmap_vertexCount(){
   return this._vertexCount;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param code:String 代码
//==========================================================
function FE3rBitmap_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FE3rBitmap_vertexBuffers(){
   return this._vertexBuffers;
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3rBitmap_indexBuffer(){
   return this._indexBuffer;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FRsMaterial 材质
//==========================================================
function FE3rBitmap_material(){
   return this._material;
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FG3dIndexBuffer 纹理
//==========================================================
function FE3rBitmap_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3rBitmap_textures(){
   return this._textures;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3rBitmap_setup(){
   var o = this;
   var context = o._graphicContext;
   // 设置顶点数据
   var data = [
      -1,  1, 0,
       1,  1, 0,
       1, -1, 0,
      -1, -1, 0 ];
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setName('position');
   buffer._formatCd = EG3dAttributeFormat.Float3;
   buffer.upload(data, 4 * 3, 4);
   o._vertexBuffers.set(buffer.name(), buffer);
   // 设置颜色数据
   var data = [
      0, 1,
      1, 1,
      1, 0,
      0, 0];
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setName('coord');
   buffer._formatCd = EG3dAttributeFormat.Float2;
   buffer.upload(data, 4 * 2, 4);
   o._vertexBuffers.set(buffer.name(), buffer);
   // 设置索引数据
   var data = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, 6);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3rBitmap_loadUrl(url){
   var o = this;
   // 释放纹理
   var texture = o._imageTexture;
   if(texture){
      texture.dispose();
      o._imageTexture = null;
      o._textures.clear();
   }
   // 加载图片
   var image = RClass.create(FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   // 设置属性
   o._ready = false;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3rBitmap_dispose(){
   var o = this;
   // 释放属性
   o._size = RObject.dispose(o._size);
   o._adjustSize = RObject.dispose(o._adjustSize);
   o._vertexBuffers = RObject.dispose(o._vertexBuffers);
   o._indexBuffer = RObject.dispose(o._indexBuffer);
   o._imageTexture = RObject.dispose(o._imageTexture);
   o._textures = RObject.dispose(o._textures);
   // 父处理
   o.__base.FE3rObject.dispose.call(o);
}
