with(MO){
   MO.ME3dObject = function ME3dObject(o){
      o = RClass.inherits(this, o, MGraphicObject, MAttributeCode);
      o._guid = RClass.register(o, new AGetSet('_guid'));
      return o;
   }
}
with(MO){
   MO.FE3dCanvas = function FE3dCanvas(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerLoad, MMouseCapture);
      o._optionAlpha        = true;
      o._optionAntialias    = true;
      o._scaleRate          = 1;
      o._logicSize          = RClass.register(o, new AGetter('_logicSize'));
      o._screenSize         = RClass.register(o, new AGetter('_screenSize'));
      o._interval           = 1000 / 40;
      o._hPanel             = null;
      o._hCanvas            = null;
      o.onEnterFrame        = RMethod.empty;
      o.ohTouchStart        = FE3dCanvas_ohTouchStart;
      o.ohTouchMove         = FE3dCanvas_ohTouchMove;
      o.ohTouchStop         = FE3dCanvas_ohTouchStop;
      o.onMouseCaptureStart = RMethod.empty;
      o.onMouseCapture      = RMethod.empty;
      o.onMouseCaptureStop  = RMethod.empty;
      o.onTouchStart        = RMethod.empty;
      o.onTouchMove         = RMethod.empty;
      o.onTouchStop         = RMethod.empty;
      o.onResize            = FE3dCanvas_onResize;
      o.construct           = FE3dCanvas_construct;
      o.build               = FE3dCanvas_build;
      o.resize              = FE3dCanvas_resize;
      o.setPanel            = FE3dCanvas_setPanel;
      o.dispose             = FE3dCanvas_dispose;
      return o;
   }
   MO.FE3dCanvas_ohTouchStart = function FE3dCanvas_ohTouchStart(event){
      this.__linker.onTouchStart(event);
   }
   MO.FE3dCanvas_ohTouchMove = function FE3dCanvas_ohTouchMove(event){
      this.__linker.onTouchMove(event);
   }
   MO.FE3dCanvas_ohTouchStop = function FE3dCanvas_ohTouchStop(event){
      this.__linker.onTouchStop(event);
   }
   MO.FE3dCanvas_onResize = function FE3dCanvas_onResize(event){
      var o = this;
      var hPanel = o._hPanel;
      var width = hPanel.offsetWidth;
      var height = hPanel.offsetHeight;
      if(o._screenSize.equalsData(width, height)){
         return;
      }
      o._screenSize.set(width, height);
      var hCanvas = o._hCanvas;
      var scaleWidth = hCanvas.width = width * o._scaleRate;
      var scaleHeight = hCanvas.height = height * o._scaleRate;
      var context = o._graphicContext;
      var ratioX = o._logicSize.width / scaleWidth;
      var ratioY = o._logicSize.height / scaleHeight;
      var ratio = Math.max(ratioX, ratioY);
      context.setRatio(ratio);
      context.sizeRatio().set(ratioX, ratioY);
      context.setViewport(0, 0, scaleWidth, scaleHeight);
   }
   MO.FE3dCanvas_construct = function FE3dCanvas_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._logicSize = new SSize2(1280, 720);
      o._screenSize = new SSize2(0, 0);
   }
   MO.FE3dCanvas_build = function FE3dCanvas_build(hPanel){
      var o = this;
      var hCanvas = o._hCanvas = RBuilder.create(hPanel, 'CANVAS');
      hCanvas.__linker = o;
      hCanvas.style.width = '100%';
      hCanvas.style.height = '100%';
      if(!RMethod.isEmpty(o.onTouchStart)){
         hCanvas.addEventListener('touchstart', o.ohTouchStart, false);
      }
      if(!RMethod.isEmpty(o.onTouchMove)){
         hCanvas.addEventListener('touchmove', o.ohTouchMove, false);
      }
      if(!RMethod.isEmpty(o.onTouchStop)){
         hCanvas.addEventListener('touchend', o.ohTouchStop, false);
      }
      var parameters = new Object();
      parameters.alpha = o._optionAlpha;
      parameters.antialias = o._optionAntialias;
      o._graphicContext = REngine3d.createContext(FWglContext, hCanvas, parameters);
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start(o._interval);
      RWindow.lsnsResize.register(o, o.onResize);
      RWindow.lsnsOrientation.register(o, o.onResize);
      RConsole.find(FMouseConsole).register(o);
   }
   MO.FE3dCanvas_resize = function FE3dCanvas_resize(){
      this.onResize();
   }
   MO.FE3dCanvas_setPanel = function FE3dCanvas_setPanel(hPanel){
      var o = this;
      hPanel.appendChild(o._hCanvas);
      o._hPanel = hPanel;
      o.onResize();
   }
   MO.FE3dCanvas_dispose = function FE3dCanvas_dispose(){
      var o = this;
      var h = o._hCanvas;
      if(h){
         h.__linker = null;
         h.removeEventListener('touchstart', o.ohTouchStart);
         h.removeEventListener('touchmove', o.ohTouchMove);
         h.removeEventListener('touchend', o.ohTouchStop);
      }
      o._graphicContext = RObject.dispose(o._graphicContext);
      o._screenSize = RObject.dispose(o._screenSize);
      o._logicSize = RObject.dispose(o._logicSize);
      o._hPanel = RHtml.free(o._hPanel);
      o._hCanvas = RHtml.free(o._hCanvas);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3dDisplay = function FE3dDisplay(o){
      o = RClass.inherits(this, o, FDisplay);
      o._outline         = null;
      o._materials       = null;
      o.construct        = FE3dDisplay_construct;
      o.materials        = FE3dDisplay_materials;
      o.calculateOutline = FE3dDisplay_calculateOutline;
      o.dispose          = FE3dDisplay_dispose;
      return o;
   }
   MO.FE3dDisplay_construct = function FE3dDisplay_construct(){
      var o = this;
      o.__base.FDisplay.construct.call(o);
      o._outline = new SOutline3();
   }
   MO.FE3dDisplay_materials = function FE3dDisplay_materials(){
      return this._materials;
   }
   MO.FE3dDisplay_calculateOutline = function FE3dDisplay_calculateOutline(){
      var o = this;
      return o._outline;
   }
   MO.FE3dDisplay_dispose = function FE3dDisplay_dispose(){
      var o = this;
      o._materials = RObject.free(o._materials);
      o.__base.FDisplay.dispose.call(o);
   }
}
with(MO){
   MO.FE3dDisplayContainer = function FE3dDisplayContainer(o){
      o = RClass.inherits(this, o, FDisplayContainer);
      o._outline         = null;
      o._materials       = null;
      o.construct        = FE3dDisplayContainer_construct;
      o.materials        = FE3dDisplayContainer_materials;
      o.calculateOutline = FE3dDisplayContainer_calculateOutline;
      o.dispose          = FE3dDisplayContainer_dispose;
      return o;
   }
   MO.FE3dDisplayContainer_construct = function FE3dDisplayContainer_construct(){
      var o = this;
      o.__base.FDisplayContainer.construct.call(o);
      o._outline = new SOutline3d();
   }
   MO.FE3dDisplayContainer_materials = function FE3dDisplayContainer_materials(){
      return this._materials;
   }
   MO.FE3dDisplayContainer_calculateOutline = function FE3dDisplayContainer_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         outline.setMin();
         var renderables = o._renderables;
         if(renderables){
            var count = renderables.count();
            for(var i = 0; i < count; i++){
               var renderable = renderables.at(i);
               var renderableOutline = renderable.calculateOutline()
               outline.mergeMax(renderableOutline);
            }
         }
      }
      return outline;
   }
   MO.FE3dDisplayContainer_dispose = function FE3dDisplayContainer_dispose(){
      var o = this;
      o._materials = RObject.free(o._materials);
      o.__base.FDisplayContainer.dispose.call(o);
   }
}
with(MO){
   MO.FE3dRenderable = function FE3dRenderable(o){
      o = RClass.inherits(this, o, FRenderable, MG3dRenderable, MGraphicObject, MLinkerResource);
      o._display           = RClass.register(o, new AGetSet('_display'));
      o._outline           = null;
      o._outlineVisible    = true;
      o._calculateMatrix   = null;
      o._vertexCount       = RClass.register(o, new AGetter('_vertexCount'));
      o._vertexBuffers     = RClass.register(o, new AGetter('_vertexBuffers'));
      o._indexBuffers      = RClass.register(o, new AGetter('_indexBuffers'));
      o._materialReference = RClass.register(o, new AGetter('_materialReference'));
      o._materials         = RClass.register(o, new AGetter('_materials'));
      o._bones             = RClass.register(o, new AGetter('_bones'));
      o._textures          = RClass.register(o, new AGetter('_textures'));
      o.construct          = FE3dRenderable_construct;
      o.setup              = RMethod.empty;
      o.testReady          = RMethod.emptyTrue;
      o.testVisible        = FE3dRenderable_testVisible;
      o.findVertexBuffer   = FE3dRenderable_findVertexBuffer;
      o.pushVertexBuffer   = FE3dRenderable_pushVertexBuffer;
      o.pushIndexBuffer    = FE3dRenderable_pushIndexBuffer;
      o.pushMaterial       = FE3dRenderable_pushMaterial;
      o.findTexture        = FE3dRenderable_findTexture;
      o.pushTexture        = FE3dRenderable_pushTexture;
      o.processDelay       = RMethod.empty;
      o.update             = FE3dRenderable_update;
      o.remove             = FE3dRenderable_remove;
      return o;
   }
   MO.FE3dRenderable_construct = function FE3dRenderable_construct(){
      var o = this;
      o.__base.FRenderable.construct.call(o);
      o.__base.MG3dRenderable.construct.call(o);
      o._outline = new SOutline3d();
      o._calculateMatrix = new SMatrix3d();
      o._vertexBuffers = new TDictionary();
      o._materialReference = o;
   }
   MO.FE3dRenderable_testVisible = function FE3dRenderable_testVisible(){
      var o = this;
      var ready = o.testReady();
      if(!ready){
         return false;
      }
      var visible = o.__base.FRenderable.testVisible.call(o);
      if(!visible){
         return false;
      }
      if(!o._outlineVisible){
         return false;
      }
      var material = o._material;
      if(material){
         if(!material.testVisible()){
            return false;
         }
      }
      return true;
   }
   MO.FE3dRenderable_findVertexBuffer = function FE3dRenderable_findVertexBuffer(code){
      return this._vertexBuffers.get(code);
   }
   MO.FE3dRenderable_pushVertexBuffer = function FE3dRenderable_pushVertexBuffer(buffer){
      var o = this;
      var code = buffer.code();
      if(RString.isEmpty(code)){
         throw new TError('Buffer code is empty.');
      }
      var buffers = o._vertexBuffers;
      if(!buffers){
         buffers =  o._vertexBuffers = new TDictionary();
      }
      buffers.set(code, buffer);
   }
   MO.FE3dRenderable_pushIndexBuffer = function FE3dRenderable_pushIndexBuffer(buffer){
      var o = this;
      var buffers = o._indexBuffers;
      if(!buffers){
         buffers =  o._indexBuffers = new TObjects();
      }
      buffers.push(buffer);
   }
   MO.FE3dRenderable_pushMaterial = function FE3dRenderable_pushMaterial(material){
      var o = this;
      var materials = o._materials;
      if(!materials){
         materials = o._materials = new TObjects();
      }
      materials.push(material);
   }
   MO.FE3dRenderable_findTexture = function FE3dRenderable_findTexture(name){
      return this._textures.get(name);
   }
   MO.FE3dRenderable_pushTexture = function FE3dRenderable_pushTexture(texture, code){
      var o = this;
      var textures = o._textures;
      if(!textures){
         textures = o._textures = new TDictionary();
      }
      if(code != null){
         textures.set(code, texture);
      }else if(texture._name){
         textures.set(texture._name, texture);
      }else{
         textures.set(texture.code(), texture);
      }
   }
   MO.FE3dRenderable_update = function FE3dRenderable_update(region){
      var o = this;
      var calculateMatrix = o._calculateMatrix;
      calculateMatrix.assign(o._matrix);
      var drawable = o._drawable;
      if(drawable){
         calculateMatrix.append(drawable.currentMatrix());
      }
      var display = o._display;
      if(display){
         calculateMatrix.append(display.currentMatrix());
      }
      var changed = o._currentMatrix.attachData(calculateMatrix.data());
      if(changed && region){
         region.change();
      }
   }
   MO.FE3dRenderable_remove = function FE3dRenderable_remove(){
      var o = this;
      var display = o._display;
      if(display){
         display.removeRenderable(o);
         o._display = null;
      }
   }
}
with(MO){
   MO.FE3dStage = function FE3dStage(o){
      o = RClass.inherits(this, o, FStage, MGraphicObject);
      o._statistics        = RClass.register(o, new AGetter('_statistics'));
      o._technique         = RClass.register(o, new AGetter('_technique'));
      o._region            = RClass.register(o, new AGetter('_region'));
      o._allDisplays       = null;
      o.onProcess          = FE3dStage_onProcess;
      o.construct          = FE3dStage_construct;
      o.createRegion       = FE3dStage_createRegion;
      o.linkGraphicContext = FE3dStage_linkGraphicContext;
      o.setup              = FE3dStage_setup;
      o.camera             = FE3dStage_camera;
      o.projection         = FE3dStage_projection;
      o.directionalLight   = FE3dStage_directionalLight;
      o.selectTechnique    = FE3dStage_selectTechnique;
      o.filterDisplays     = FE3dStage_filterDisplays;
      o.allDisplays        = FE3dStage_allDisplays;
      return o;
   }
   MO.FE3dStage_onProcess = function FE3dStage_onProcess(){
      var o = this;
      var region = o._region;
      if(!region){
         return;
      }
      var technique = o._technique;
      if(!technique){
         return;
      }
      var context = technique._graphicContext;
      var statistics = region._statistics = o._statistics;
      statistics.resetFrame();
      statistics._frame.begin();
      statistics._frameProcess.begin();
      context.prepare();
      technique.updateRegion(region);
      region.prepare();
      region.change();
      var layers = o._layers;
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         region.reset();
         layer.process(region);
         layer.filterRenderables(region);
         region.update();
      }
      RConsole.find(FE3dStageConsole).process(region);
      statistics._frameProcess.end();
      statistics._frameDraw.begin();
      if(region.isChanged()){
         technique.clear(region.backgroundColor());
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            var layerTechnique = layer.technique();
            if(!layerTechnique){
               layerTechnique = technique;
            }
            region.reset();
            region.renderables().assign(layer.visibleRenderables());
            if(layer.optionClearDepth()){
               layerTechnique.clearDepth();
            }
            layerTechnique.drawRegion(region);
         }
         technique.present(region);
      }
      statistics._frameDraw.end();
      statistics._frame.end();
   }
   MO.FE3dStage_construct = function FE3dStage_construct(){
      var o = this;
      o.__base.FStage.construct.call(o);
      o._statistics = RClass.create(FE3dStageStatistics);
      RConsole.find(FStatisticsConsole).register('engine.stage', o._statistics);
      o._allDisplays = new TObjects();
      var region = o._region = o.createRegion();
      region._timer = o._timer;
   }
   MO.FE3dStage_createRegion = function FE3dStage_createRegion(){
      return RClass.create(FE3dRegion);
   }
   MO.FE3dStage_linkGraphicContext = function FE3dStage_linkGraphicContext(context){
      var o = this;
      o.__base.MGraphicObject.linkGraphicContext.call(o, context);
      var region = o._region;
      if(region){
         region.linkGraphicContext(context);
      }
   }
   MO.FE3dStage_setup = function FE3dStage_setup(){
      var o = this;
      o.__base.FStage.construct.call(o);
      o._region.linkGraphicContext(o);
      o._region.setup();
   }
   MO.FE3dStage_camera = function FE3dStage_camera(){
      return this._region.camera();
   }
   MO.FE3dStage_projection = function FE3dStage_projection(){
      return this._region.camera().projection();
   }
   MO.FE3dStage_directionalLight = function FE3dStage_directionalLight(){
      return this._region.directionalLight();
   }
   MO.FE3dStage_selectTechnique = function FE3dStage_selectTechnique(context, clazz){
      var o = this;
      var techniqueConsole = RConsole.find(FG3dTechniqueConsole);
      var technique = o._technique = techniqueConsole.find(context, clazz);
      return technique;
   }
   MO.FE3dStage_filterDisplays = function FE3dStage_filterDisplays(displays){
      var o = this;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.filterDisplays(displays);
      }
   }
   MO.FE3dStage_allDisplays = function FE3dStage_allDisplays(){
      var o = this;
      var displays = o._allDisplays;
      displays.clear();
      o.filterDisplays(displays);
      return displays;
   }
}
with(MO){
   MO.FE3dStageConsole = function FE3dStageConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._looper   = null;
      o._thread   = null;
      o._interval = 25;
      o._limit    = 8;
      o.onProcess = FE3dStageConsole_onProcess;
      o.construct = FE3dStageConsole_construct;
      o.process   = FE3dStageConsole_process;
      return o;
   }
   MO.FE3dStageConsole_onProcess = function FE3dStageConsole_onProcess(){
      var o = this;
      var s = o._looper;
      s.record();
      for(var i = o._limit - 1; i >= 0; i--){
         var r = s.next();
         if(r){
            r.processDelay(r._linkRegion);
         }else{
            break;
         }
      }
   }
   MO.FE3dStageConsole_construct = function FE3dStageConsole_construct(){
      var o = this;
      o._looper = new TLooper();
      o._renderables = new TDictionary();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3dStageConsole_process = function FE3dStageConsole_process(p){
      var o = this;
      var s = p.allRenderables();
      for(var i = s.count() - 1; i >= 0; i--){
         var r = s.getAt(i);
         if(!r._linkStageLooper){
            o._looper.push(r);
            r._linkRegion = p;
            r._linkStageLooper = o._looper;
         }
      }
   }
}
with(MO){
   MO.FE3dStageStatistics = function FE3dStageStatistics(o){
      o = RClass.inherits(this, o, FStatistics);
      o._frame         = null;
      o._frameProcess  = null;
      o._frameDraw     = null;
      o._frameDrawSort = null;
      o._frameDrawRenderable = null;
      o.construct      = FE3dStageStatistics_construct;
      o.reset          = FE3dStageStatistics_reset;
      o.resetFrame     = FE3dStageStatistics_resetFrame;
      return o;
   }
   MO.FE3dStageStatistics_construct = function FE3dStageStatistics_construct(){
      var o = this;
      o.__base.FStatistics.construct.call(o);
      o._frame = new TSpeed();
      o._frameProcess = new TSpeed();
      o._frameDraw = new TSpeed();
      o._frameDrawSort = new TSpeed();
      o._frameDrawRenderable = new TSpeed();
   }
   MO.FE3dStageStatistics_reset = function FE3dStageStatistics_reset(){
   }
   MO.FE3dStageStatistics_resetFrame = function FE3dStageStatistics_resetFrame(){
      var o = this;
      o._frame.reset();
      o._frameProcess.reset();
      o._frameDraw.reset();
      o._frameDrawSort.reset();
      o._frameDrawRenderable.reset();
   }
}
with(MO){
   MO.FE3dTechnique = function FE3dTechnique(o){
      o = RClass.inherits(this, o, FG3dTechnique, MLinkerResource);
      return o;
   }
}
with(MO){
   MO.RE3dEngine = function RE3dEngine(){
      var o = this;
      o._setuped = false;
      return o;
   }
   MO.RE3dEngine.prototype.onSetup = function RE3dEngine_onSetup(){
      var effectConsole = RConsole.find(FG3dEffectConsole);
      effectConsole.register('select.select.flat', FG3dSelectAutomaticEffect);
      effectConsole.register('select.select.control', FG3dSelectAutomaticEffect);
      effectConsole.register('select.select.automatic', FG3dSelectAutomaticEffect);
      effectConsole.register('select.select.skeleton', FG3dSelectSkeletonEffect);
      effectConsole.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
      effectConsole.register('control.control.automatic', FE3dControlAutomaticEffect);
      effectConsole.register('control.control.control', FE3dControlAutomaticEffect);
      effectConsole.register('general.color.control', FE3dControlAutomaticEffect);
      effectConsole.register('general.color.flat', FE3dGeneralColorFlatEffect);
      effectConsole.register('general.color.automatic', FE3dGeneralColorAutomaticEffect);
      effectConsole.register('general.color.skin', FE3dGeneralColorAutomaticEffect);
      effectConsole.register('general.color.parallax', FE3dGeneralColorAutomaticEffect);
      effectConsole.register('general.color.skeleton', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('general.color.skeleton.4', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('general.color.fur.skeleton', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('general.color.fur.skeleton.4', FE3dGeneralColorSkeletonEffect);
      effectConsole.register('shadow.depth.automatic', FE3dShadowDepthAutomaticEffect);
      effectConsole.register('shadow.depth.skeleton', FE3dShadowDepthSkeletonEffect);
      effectConsole.register('shadow.color.automatic', FE3dShadowColorAutomaticEffect);
      effectConsole.register('shadow.color.skeleton', FE3dShadowColorSkeletonEffect);
   }
   MO.RE3dEngine.prototype.setup = function RE3dEngine_setup(){
      var o = this;
      if(!o._setuped){
         o.onSetup();
         o._setuped = true;
      }
   }
   MO.RE3dEngine = new RE3dEngine();
}
