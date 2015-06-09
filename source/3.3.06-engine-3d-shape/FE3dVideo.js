with(MO){
    //==========================================================
   // <T>渲染模型。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3dVideo = function FE3dVideo(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable, MListenerLoad);
      //..........................................................
      // @attribute
      o._ready           = false;
      o._size            = null;
      //..........................................................
      // @method
      o.construct        = FE3dVideo_construct;
      // @method
      o.testReady        = FE3dVideo_testReady;
      o.size             = FE3dVideo_size;
      o.setSize          = FE3dVideo_setSize;
      o.setVideoData    = FE3dVideo_setVideoData;
      o.vertexBuffers    = FE3dVideo_vertexBuffers;
      o.material         = FE3dVideo_material;
      o.findVertexBuffer = FE3dVideo_findVertexBuffer;
      o.findTexture      = FE3dVideo_findTexture;
      o.textures         = FE3dVideo_textures;
      o.processLoad      = FE3dVideo_processLoad;
      o.process          = FE3dVideo_process;
      o.loadUrl          = FE3dVideo_loadUrl;
      // @method
      o.dispose          = FE3dVideo_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dVideo_construct = function FE3dVideo_construct(){
      var o = this;
      o.__base.FE3dMeshRenderable.construct.call(o);
      // 设置属性
      o._size = new SSize2();
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   MO.FE3dVideo_testReady = function FE3dVideo_testReady(){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            // 检查是否准备好
            o._ready = renderable.testReady();
            if(o._ready){
               //var size = renderable.size();
               //var adjustSize = renderable.adjustSize();
               //var matrix = o.matrix();
               //matrix.sx = adjustSize.width / size.width;
               //matrix.sz = adjustSize.height / size.height;
               //matrix.updateForce();
               var event = new SEvent(o);
               o.processLoadListener(event);
               event.dispose();
            }
            // 设置材质引用
            o._materialReference = renderable;
         }
      }
      return o._ready;
   }

   //==========================================================
   // <T>获得大小。</T>
   //
   // @return SSize2 大小
   //==========================================================
   MO.FE3dVideo_size = function FE3dVideo_size(){
      return this._size;
   }

   //==========================================================
   // <T>设置大小。</T>
   //
   // @param width:Number 宽度
   // @param height:Number 高度
   //==========================================================
   MO.FE3dVideo_setSize = function FE3dVideo_setSize(width, height){
      var o = this;
      o._size.set(width, height);
      o._matrix.setScale(width, height, 1);
      //o._scale.set(width, height, 1);
   }

   //==========================================================
   // <T>加载渲染对象。</T>
   //
   // @param videoData:FE3dVideoData 渲染对象
   //==========================================================
   MO.FE3dVideo_setVideoData = function FE3dVideo_setVideoData(videoData){
      var o = this;
      o._renderable = videoData;
   }

   //==========================================================
   // <T>获得顶点缓冲集合。</T>
   //
   // @method
   // @return TObjects 顶点缓冲集合
   //==========================================================
   MO.FE3dVideo_vertexBuffers = function FE3dVideo_vertexBuffers(){
      return this._renderable.vertexBuffers();
   }

   //==========================================================
   // <T>查找材质。</T>
   //
   // @method
   // @return FE3dMaterial 材质
   //==========================================================
   MO.FE3dVideo_material = function FE3dVideo_material(){
      return this._renderable.material();
   }

   //==========================================================
   // <T>查找顶点缓冲。</T>
   //
   // @method
   // @param p:name:String 名称
   //==========================================================
   MO.FE3dVideo_findVertexBuffer = function FE3dVideo_findVertexBuffer(p){
      return this._renderable.findVertexBuffer(p);
   }

   //==========================================================
   // <T>根据名称查找纹理。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FRenderIndexBuffer 纹理
   //==========================================================
   MO.FE3dVideo_findTexture = function FE3dVideo_findTexture(p){
      return this._renderable.findTexture(p);
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return TDictionary 纹理集合
   //==========================================================
   MO.FE3dVideo_textures = function FE3dVideo_textures(){
      return this._renderable.textures();
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dVideo_processLoad = function FE3dVideo_processLoad(){
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
   MO.FE3dVideo_process = function FE3dVideo_process(){
      var o = this;
      o.__base.FE3dMeshRenderable.process.call(o);
   }

   //==========================================================
   // <T>加载位图处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dVideo_loadUrl = function FE3dVideo_loadUrl(url){
      var o = this;
      var context = o._graphicContext;
      o._renderable = RConsole.find(FE3dVideoConsole).loadUrl(context, url);
      o._ready = false;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dVideo_dispose = function FE3dVideo_dispose(){
      var o = this;
      // 清空属性
      o._material = RObject.dispoe(o._material);
      // 父处理
      o.__base.FE3dMeshRenderable.dispose.call(o);
   }
}
