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
   //..........................................................
   // @event
   o.onImageLoad       = FE3rBitmap_onImageLoad;
   //..........................................................
   // @method
   o.construct         = FE3rBitmap_construct;
   // @method
   o.testReady         = FE3rBitmap_testReady;
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
   var image = event.image();
   // 创建纹理
   var texture = o._imageTexture = context.createFlatTexture();
   texture.upload(image);
   o._textures.set('diffuse', texture);
   o._ready = true;
   // 释放内容
   event.dispose();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rBitmap_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TObjects();
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
// @param p:name:String 名称
//==========================================================
function FE3rBitmap_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
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
   buffer._name = 'position';
   buffer._formatCd = EG3dAttributeFormat.Float3;
   buffer.upload(data, 4 * 3, 4);
   o._vertexBuffers.push(buffer);
   // 设置颜色数据
   var data = [
      0, 1,
      1, 1,
      1, 0,
      0, 0];
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer._name = 'coord';
   buffer._formatCd = EG3dAttributeFormat.Float2;
   buffer.upload(data, 4 * 2, 4);
   o._vertexBuffers.push(buffer);
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
function FE3rBitmap_loadUrl(context, url){
   var o = this;
   o.linkGraphicContext(context);
   o.setup();
   var image = o._image = RClass.create(FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
}
