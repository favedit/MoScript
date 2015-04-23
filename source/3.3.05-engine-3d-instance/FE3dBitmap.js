 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dBitmap(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MListenerLoad);
   //..........................................................
   // @attribute
   o._ready           = false;
   o._renderable      = null;
   //..........................................................
   // @method
   o.construct        = FE3dBitmap_construct;
   // @method
   o.testReady        = FE3dBitmap_testReady;
   o.renderable       = FE3dBitmap_renderable;
   o.setRenderable    = FE3dBitmap_setRenderable;
   o.vertexBuffers    = FE3dBitmap_vertexBuffers;
   o.indexBuffer      = FE3dBitmap_indexBuffer;
   o.findVertexBuffer = FE3dBitmap_findVertexBuffer;
   o.findTexture      = FE3dBitmap_findTexture;
   o.textures         = FE3dBitmap_textures;
   o.processLoad      = FE3dBitmap_processLoad;
   o.process          = FE3dBitmap_process;
   o.loadUrl          = FE3dBitmap_loadUrl;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dBitmap_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FE3dBitmap_testReady(){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         o._ready = renderable.testReady();
         if(o._ready){
            var size = renderable.size();
            var adjustSize = renderable.adjustSize();
            var matrix = o.matrix();
            //matrix.sx = adjustSize.width / size.width;
            matrix.sz = adjustSize.height / size.height;
            matrix.updateForce();
            var event = new SEvent(o);
            o.processLoadListener(event);
            event.dispose();
         }
      }
   }
   return o._ready;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dBitmap 渲染对象
//==========================================================
function FE3dBitmap_renderable(p){
   return this._renderable;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dBitmap 渲染对象
//==========================================================
function FE3dBitmap_setRenderable(p){
   var o = this;
   this._renderable= p;
   o._ready = true;
   // 加载完成
   o.processLoadListener(o);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FE3dBitmap_vertexBuffers(){
   return this._renderable.vertexBuffers();
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3dBitmap_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FE3dBitmap_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3dBitmap_findTexture(p){
   return this._renderable.findTexture(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3dBitmap_textures(){
   return this._renderable.textures();
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dBitmap_processLoad(){
   var o = this;
   //if(!o._renderable.testReady()){
   //   return false;
   //}
   //o.loadRenderable(o._renderable);
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dBitmap_process(){
   var o = this;
   o.__base.FE3dMeshRenderable.process.call(o);
}

//==========================================================
// <T>加载位图处理。</T>
//
// @method
//==========================================================
function FE3dBitmap_loadUrl(url){
   var o = this;
   var context = o._graphicContext;
   o._renderable = RConsole.find(FE3rBitmapConsole).loadUrl(context, url);
   o._ready = false;
}
