with(MO){
    //==========================================================
   // <T>渲染模型。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3dBitmap = function FE3dBitmap(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable, MListenerLoad);
      //..........................................................
      // @attribute
      o._ready           = false;
      o._size            = null;
      o._renderable      = null;
      //..........................................................
      // @method
      o.construct        = FE3dBitmap_construct;
      // @method
      o.testReady        = FE3dBitmap_testReady;
      o.size             = FE3dBitmap_size;
      o.setSize          = FE3dBitmap_setSize;
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
      // @method
      o.dispose          = FE3dBitmap_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmap_construct = function FE3dBitmap_construct(){
      var o = this;
      o.__base.FE3dMeshRenderable.construct.call(o);
      // 设置属性
      o._material = RClass.create(FE3dMaterial);
      o._size = new SSize2();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   MO.FE3dBitmap_testReady = function FE3dBitmap_testReady(){
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
   // <T>获得大小。</T>
   //
   // @return SSize2 大小
   //==========================================================
   MO.FE3dBitmap_size = function FE3dBitmap_size(){
      return this._size;
   }

   //==========================================================
   // <T>设置大小。</T>
   //
   // @param width:Number 宽度
   // @param height:Number 高度
   //==========================================================
   MO.FE3dBitmap_setSize = function FE3dBitmap_setSize(width, height){
      var o = this;
      o._size.set(width, height);
      o._scale.set(width, height, 1);
   }

   //==========================================================
   // <T>加载渲染对象。</T>
   //
   // @param p:renderable:FE3dBitmap 渲染对象
   //==========================================================
   MO.FE3dBitmap_renderable = function FE3dBitmap_renderable(p){
      return this._renderable;
   }

   //==========================================================
   // <T>加载渲染对象。</T>
   //
   // @param p:renderable:FE3dBitmap 渲染对象
   //==========================================================
   MO.FE3dBitmap_setRenderable = function FE3dBitmap_setRenderable(p){
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
   MO.FE3dBitmap_vertexBuffers = function FE3dBitmap_vertexBuffers(){
      return this._renderable.vertexBuffers();
   }

   //==========================================================
   // <T>获得索引缓冲。</T>
   //
   // @method
   // @return FG3dIndexBuffer 索引缓冲
   //==========================================================
   MO.FE3dBitmap_indexBuffer = function FE3dBitmap_indexBuffer(){
      return this._renderable.indexBuffer();
   }

   //==========================================================
   // <T>查找顶点缓冲。</T>
   //
   // @method
   // @param p:name:String 名称
   //==========================================================
   MO.FE3dBitmap_findVertexBuffer = function FE3dBitmap_findVertexBuffer(p){
      return this._renderable.findVertexBuffer(p);
   }

   //==========================================================
   // <T>根据名称查找纹理。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FRenderIndexBuffer 纹理
   //==========================================================
   MO.FE3dBitmap_findTexture = function FE3dBitmap_findTexture(p){
      return this._renderable.findTexture(p);
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return TDictionary 纹理集合
   //==========================================================
   MO.FE3dBitmap_textures = function FE3dBitmap_textures(){
      return this._renderable.textures();
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmap_processLoad = function FE3dBitmap_processLoad(){
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
   MO.FE3dBitmap_process = function FE3dBitmap_process(){
      var o = this;
      o.__base.FE3dMeshRenderable.process.call(o);
   }

   //==========================================================
   // <T>加载位图处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmap_loadUrl = function FE3dBitmap_loadUrl(url){
      var o = this;
      var context = o._graphicContext;
      o._renderable = RConsole.find(FE3dBitmapConsole).loadUrl(context, url);
      o._ready = false;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmap_dispose = function FE3dBitmap_dispose(){
      var o = this;
      // 清空属性
      o._material = RObject.dispoe(o._material);
      // 父处理
      o.__base.FE3dMeshRenderable.dispose.call(o);
   }
}
