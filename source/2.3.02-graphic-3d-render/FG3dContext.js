with(MO){
   //==========================================================
   // <T>渲染环境。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dContext = function FG3dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      //..........................................................
      // @attribute
      o._optionAlpha        = true;
      o._optionAntialias    = false;
      o._size               = RClass.register(o, new AGetter('_size'));
      o._capability         = RClass.register(o, new AGetter('_capability'));
      o._statistics         = RClass.register(o, new AGetter('_statistics'));
      // @attribute
      o._fillModeCd         = EG3dFillMode.Face;
      o._optionDepth        = false;
      o._optionCull         = false;
      o._depthModeCd        = 0;
      o._cullModeCd         = 0;
      o._statusBlend        = false;
      o._blendSourceCd      = 0;
      o._blendTargetCd      = 0;
      o._program            = null;
      // @attribute
      o._storePrograms      = null;
      o._storeLayouts       = null;
      o._storeBuffers       = null;
      o._storeTextures      = null;
      o._storeTargets       = null;
      //..........................................................
      // @method
      o.construct           = FG3dContext_construct;
      // @method
      o.linkCanvas          = FG3dContext_linkCanvas;
      // @method
      o.createObject        = FG3dContext_createObject;
      o.createProgram       = RMethod.virtual(o, 'createProgram');
      o.createLayout        = RMethod.virtual(o, 'createLayout');
      o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
      o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
      o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
      o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
      o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
      // @method
      o.setViewport         = RMethod.virtual(o, 'setViewport');
      o.setFillMode         = RMethod.virtual(o, 'setFillMode');
      o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
      o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
      o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
      o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
      o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
      o.setProgram          = RMethod.virtual(o, 'setProgram');
      // @method
      o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
      o.bindTexture         = RMethod.virtual(o, 'bindTexture');
      // @method
      o.prepare             = FG3dContext_prepare;
      o.clear               = RMethod.virtual(o, 'clear');
      o.clearColor          = RMethod.virtual(o, 'clearColor');
      o.clearDepth          = RMethod.virtual(o, 'clearDepth');
      o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
      o.present             = RMethod.virtual(o, 'present');
      // @method
      o.dispose             = FG3dContext_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dContext_construct = function FG3dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      // 设置属性
      o._size = new SSize2();
      o._statistics = RClass.create(FG3dStatistics);
      RConsole.find(FStatisticsConsole).register('graphic3d.context', o._statistics);
      // 设置属性
      o._storePrograms = new TObjects();
      o._storeLayouts = new TObjects();
      o._storeBuffers = new TObjects();
      o._storeTextures = new TObjects();
      o._storeTargets = new TObjects();
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param h:hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }

   //==========================================================
   // <T>创建环境对象。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return MGraphicObject 环境对象
   //==========================================================
   MO.FG3dContext_createObject = function FG3dContext_createObject(clazz){
      var o = this;
      var instance = RClass.create(clazz);
      instance.linkGraphicContext(o);
      instance.setup();
      return instance;
   }

   //============================================================
   // <T>准备处理。</T>
   //
   // @return 处理结果
   //============================================================
   MO.FG3dContext_prepare = function FG3dContext_prepare(){
      this._statistics.resetFrame();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dContext_dispose = function FG3dContext_dispose(){
      var o = this;
      // 释放程序集合
      var programs = o._storePrograms;
      if(programs){
         var count = programs.count();
         for(var i = 0; i < count; i++){
            var program = programs.at(i);
            program.dispose();
         }
         o._storePrograms = RObject.dispose(programs);
      }
      // 释放布局集合
      var layouts = o._storeLayouts;
      if(layouts){
         var count = layouts.count();
         for(var i = 0; i < count; i++){
            var layout = layouts.at(i);
            layout.dispose();
         }
         o._storeLayouts = RObject.dispose(layouts);
      }
      // 释放顶点缓冲集合
      var buffers = o._storeBuffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            buffer.dispose();
         }
         o._storeBuffers = RObject.dispose(buffers);
      }
      // 释放像素缓冲集合
      var textures = o._storeTextures;
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var texture = textures.at(i);
            texture.dispose();
         }
         o._storeTextures = RObject.dispose(textures);
      }
      // 释放目标集合
      var targets = o._storeTargets;
      if(targets){
         var count = targets.count();
         for(var i = 0; i < count; i++){
            var target = targets.at(i);
            target.dispose();
         }
         o._storeTargets = RObject.dispose(targets);
      }
      // 释放属性
      o._program = null;
      o._size = RObject.dispose(o._size);
      o._capability = RObject.dispose(o._capability);
      o._statistics = RObject.dispose(o._statistics);
      // 释放属性
      o._handleInstance = null;
      o._handleLayout = null;
      o._handle = null;
      // 父处理
      o.__base.FGraphicContext.dispose.call(o);
   }
}
