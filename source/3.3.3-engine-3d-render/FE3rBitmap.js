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
   debugger
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
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
function FE3rBitmap_testReady(){
   var o = this;
   if(!o._ready){
      // 测试资源是否加载完成
      if(!o._resource.testReady()){
         return false;
      }
      // 测试所有位图加载好
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
      // 加载完成
      //o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3rBitmap_guid(){
   return this._resource.guid();
}

//==========================================================
// <T>获得资源。</T>
//
// @return FE3sModel 资源
//==========================================================
function FE3rBitmap_resource(){
   return this._resource;
}

//==========================================================
// <T>设置资源。</T>
//
// @param p:resource:FE3sModel 资源
//==========================================================
function FE3rBitmap_setResource(p){
   this._resource = p;
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
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.upload(data, 4 * 3, 4);
   // 设置颜色数据
   var data = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.upload(data, 4 * 4, 4);
   // 设置索引数据
   var data = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, 6);
   return true;
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
