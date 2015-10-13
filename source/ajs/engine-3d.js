MO.ME3dObject = function ME3dObject(o){
   o = MO.Class.inherits(this, o, MO.MGraphicObject, MO.MAttributeCode);
   o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   return o;
}
MO.FE3dCanvas = function FE3dCanvas(o){
   o = MO.Class.inherits(this, o, MO.FCanvas, MO.MGraphicObject, MO.MMouseCapture);
   o._optionAlpha        = true;
   o._optionAntialias    = true;
   o._optionStageProcess = true;
   o._optionResize       = true;
   o._optionMouseCapture = true;
   o._listenerLoad       = MO.Class.register(o, new MO.AListener('_listenerLoad', MO.EEvent.Load));
   o._size               = MO.Class.register(o, new MO.AGetter('_size'));
   o._logicSize          = MO.Class.register(o, new MO.AGetter('_logicSize'));
   o._screenSize         = MO.Class.register(o, new MO.AGetter('_screenSize'));
   o._interval           = 10;
   o._hPanel             = null;
   o._hCanvas            = null;
   o.onEnterFrame        = MO.Method.empty;
   o.ohTouchStart        = MO.FE3dCanvas_ohTouchStart;
   o.ohTouchMove         = MO.FE3dCanvas_ohTouchMove;
   o.ohTouchStop         = MO.FE3dCanvas_ohTouchStop;
   o.onMouseCaptureStart = MO.Method.empty;
   o.onMouseCapture      = MO.Method.empty;
   o.onMouseCaptureStop  = MO.Method.empty;
   o.onTouchStart        = MO.Method.empty;
   o.onTouchMove         = MO.Method.empty;
   o.onTouchStop         = MO.Method.empty;
   o.onResize            = MO.FE3dCanvas_onResize;
   o.construct           = MO.FE3dCanvas_construct;
   o.build               = MO.FE3dCanvas_build;
   o.resize              = MO.FE3dCanvas_resize;
   o.show                = MO.FE3dCanvas_show;
   o.hide                = MO.FE3dCanvas_hide;
   o.setVisible          = MO.FE3dCanvas_setVisible;
   o.setPanel            = MO.FE3dCanvas_setPanel;
   o.dispose             = MO.FE3dCanvas_dispose;
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
   this.resize();
}
MO.FE3dCanvas_construct = function FE3dCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
   o._logicSize = new MO.SSize2(1280, 720);
   o._screenSize = new MO.SSize2(1280, 720);
}
MO.FE3dCanvas_build = function FE3dCanvas_build(hPanel){
   var o = this;
   var size = o._size;
   var width = size.width;
   var height = size.height;
   var hCanvas = o._hCanvas = MO.RBuilder.create(hPanel, 'CANVAS');
   hCanvas.__linker = o;
   hCanvas.width = width;
   hCanvas.height = height;
   var hStyle = hCanvas.style;
   hStyle.left = '0px';
   hStyle.top = '0px';
   hStyle.width = '100%';
   hStyle.height = '100%';
   if(!MO.Method.isEmpty(o.onTouchStart)){
      hCanvas.addEventListener('touchstart', o.ohTouchStart, false);
   }
   if(!MO.Method.isEmpty(o.onTouchMove)){
      hCanvas.addEventListener('touchmove', o.ohTouchMove, false);
   }
   if(!MO.Method.isEmpty(o.onTouchStop)){
      hCanvas.addEventListener('touchend', o.ohTouchStop, false);
   }
   var parameters = new Object();
   parameters.alpha = o._optionAlpha;
   parameters.antialias = o._optionAntialias;
   o._graphicContext = MO.Graphic.Context3d.createContext(MO.FWglContext, hCanvas, parameters);
   if(o._optionStageProcess){
      RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
      RStage.start(o._interval);
   }
   if(o._optionResize){
      MO.Window.lsnsResize.register(o, o.onResize);
      MO.Window.lsnsOrientation.register(o, o.onResize);
   }
   if(o._optionMouseCapture){
      MO.Console.find(MO.FMouseConsole).register(o);
   }
}
MO.FE3dCanvas_resize = function FE3dCanvas_resize(sourceWidth, sourceHeight){
   var o = this;
   if(!sourceWidth || !sourceHeight){
      throw new MO.TError(o, 'Invalid canvas size.');
   }
   o._screenSize.set(sourceWidth, sourceHeight);
   var width = parseInt(sourceWidth);
   var height = parseInt(sourceHeight);
   var hCanvas = o._hCanvas;
   hCanvas.width = width;
   hCanvas.height = height;
   o._size.set(width, height);
   var context = o._graphicContext;
   context.setViewport(0, 0, width, height);
   MO.Logger.debug(o, 'Canvas3d resize. (size={1}x{2}, buffer={3}x{4}, html={5})', width, height, context._handle.drawingBufferWidth, context._handle.drawingBufferHeight, hCanvas.outerHTML);
}
MO.FE3dCanvas_show = function FE3dCanvas_show(){
   this.setVisible(true);
}
MO.FE3dCanvas_hide = function FE3dCanvas_hide(){
   this.setVisible(false);
}
MO.FE3dCanvas_setVisible = function FE3dCanvas_setVisible(visible){
   MO.Window.Html.visibleSet(this._hCanvas, visible);
}
MO.FE3dCanvas_setPanel = function FE3dCanvas_setPanel(hPanel){
   var o = this;
   hPanel.appendChild(o._hCanvas);
   o._hPanel = hPanel;
   o.resize();
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
   o._graphicContext = MO.Lang.Object.dispose(o._graphicContext);
   o._size = MO.Lang.Object.dispose(o._size);
   o._screenSize = MO.Lang.Object.dispose(o._screenSize);
   o._logicSize = MO.Lang.Object.dispose(o._logicSize);
   o._hPanel = MO.RHtml.free(o._hPanel);
   o._hCanvas = MO.RHtml.free(o._hCanvas);
   o.__base.FCanvas.dispose.call(o);
}
MO.FE3dDisplay = function FE3dDisplay(o){
   o = MO.Class.inherits(this, o, MO.FDisplay);
   o._outline         = MO.Class.register(o, new MO.AGetter('_outline'));
   o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));
   o.construct        = MO.FE3dDisplay_construct;
   o.calculateOutline = MO.FE3dDisplay_calculateOutline;
   o.dispose          = MO.FE3dDisplay_dispose;
   return o;
}
MO.FE3dDisplay_construct = function FE3dDisplay_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._outline = new MO.SOutline3d();
}
MO.FE3dDisplay_calculateOutline = function FE3dDisplay_calculateOutline(){
   return this._outline;
}
MO.FE3dDisplay_dispose = function FE3dDisplay_dispose(){
   var o = this;
   o._materials = MO.Lang.Object.free(o._materials);
   o.__base.FDisplay.dispose.call(o);
}
MO.FE3dDisplayContainer = function FE3dDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayContainer);
   o._outline         = null;
   o._materials       = MO.Class.register(o, new MO.AGetter('_materials'));
   o.construct        = MO.FE3dDisplayContainer_construct;
   o.calculateOutline = MO.FE3dDisplayContainer_calculateOutline;
   o.dispose          = MO.FE3dDisplayContainer_dispose;
   return o;
}
MO.FE3dDisplayContainer_construct = function FE3dDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._outline = new MO.SOutline3d();
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
   o._materials = MO.Lang.Object.dispose(o._materials);
   o.__base.FDisplayContainer.dispose.call(o);
}
MO.FE3dRenderable = function FE3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.FRenderable, MO.MG3dRenderable, MO.MGraphicObject, MO.MLinkerResource);
   o._display           = MO.Class.register(o, new MO.AGetSet('_display'));
   o._outline           = null;
   o._outlineVisible    = true;
   o._calculateMatrix   = null;
   o._vertexCount       = MO.Class.register(o, new MO.AGetSet('_vertexCount'));
   o._vertexBuffers     = MO.Class.register(o, new MO.AGetter('_vertexBuffers'));
   o._indexBuffers      = MO.Class.register(o, new MO.AGetter('_indexBuffers'));
   o._materialReference = MO.Class.register(o, new MO.AGetSet('_materialReference'));
   o._materials         = MO.Class.register(o, new MO.AGetter('_materials'));
   o._bones             = MO.Class.register(o, new MO.AGetter('_bones'));
   o._textures          = MO.Class.register(o, new MO.AGetter('_textures'));
   o.construct          = MO.FE3dRenderable_construct;
   o.setup              = MO.Method.empty;
   o.testReady          = MO.Method.emptyTrue;
   o.testVisible        = MO.FE3dRenderable_testVisible;
   o.findVertexBuffer   = MO.FE3dRenderable_findVertexBuffer;
   o.pushVertexBuffer   = MO.FE3dRenderable_pushVertexBuffer;
   o.pushIndexBuffer    = MO.FE3dRenderable_pushIndexBuffer;
   o.pushMaterial       = MO.FE3dRenderable_pushMaterial;
   o.findTexture        = MO.FE3dRenderable_findTexture;
   o.pushTexture        = MO.FE3dRenderable_pushTexture;
   o.processDelay       = MO.Method.empty;
   o.update             = MO.FE3dRenderable_update;
   o.remove             = MO.FE3dRenderable_remove;
   return o;
}
MO.FE3dRenderable_construct = function FE3dRenderable_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o.__base.MG3dRenderable.construct.call(o);
   o._outline = new MO.SOutline3d();
   o._calculateMatrix = new MO.SMatrix3d();
   o._vertexBuffers = new MO.TDictionary();
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
   if(MO.Lang.String.isEmpty(code)){
      throw new MO.TError('Buffer code is empty.');
   }
   var buffers = o._vertexBuffers;
   if(!buffers){
      buffers =  o._vertexBuffers = new MO.TDictionary();
   }
   buffers.set(code, buffer);
}
MO.FE3dRenderable_pushIndexBuffer = function FE3dRenderable_pushIndexBuffer(buffer){
   var o = this;
   var buffers = o._indexBuffers;
   if(!buffers){
      buffers =  o._indexBuffers = new MO.TObjects();
   }
   buffers.push(buffer);
}
MO.FE3dRenderable_pushMaterial = function FE3dRenderable_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new MO.TObjects();
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
      textures = o._textures = new MO.TDictionary();
   }
   if(code){
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
MO.FE3dStage = function FE3dStage(o){
   o = MO.Class.inherits(this, o, MO.FStage, MO.MGraphicObject);
   o._statistics        = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._technique         = MO.Class.register(o, new MO.AGetter('_technique'));
   o._region            = MO.Class.register(o, new MO.AGetter('_region'));
   o._allDisplays       = null;
   o.onProcess          = MO.FE3dStage_onProcess;
   o.construct          = MO.FE3dStage_construct;
   o.createRegion       = MO.FE3dStage_createRegion;
   o.linkGraphicContext = MO.FE3dStage_linkGraphicContext;
   o.setup              = MO.FE3dStage_setup;
   o.camera             = MO.FE3dStage_camera;
   o.projection         = MO.FE3dStage_projection;
   o.directionalLight   = MO.FE3dStage_directionalLight;
   o.selectTechnique    = MO.FE3dStage_selectTechnique;
   o.filterDisplays     = MO.FE3dStage_filterDisplays;
   o.allDisplays        = MO.FE3dStage_allDisplays;
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
   MO.Console.find(MO.FE3dStageConsole).process(region);
   statistics._frameProcess.end();
   statistics._frameDraw.begin();
   if(region.isChanged()){
      technique.drawStage(o, region);
   }
   statistics._frameDraw.end();
   statistics._frame.end();
}
MO.FE3dStage_construct = function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._statistics = MO.Class.create(MO.FE3dStageStatistics);
   MO.Console.find(MO.FStatisticsConsole).register('engine.stage', o._statistics);
   o._allDisplays = new MO.TObjects();
   var region = o._region = o.createRegion();
   region._timer = o._timer;
}
MO.FE3dStage_createRegion = function FE3dStage_createRegion(){
   return MO.Class.create(MO.FE3dRegion);
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
   var techniqueConsole = MO.Console.find(MO.FG3dTechniqueConsole);
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
MO.FE3dStageConsole = function FE3dStageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._looper   = null;
   o._thread   = null;
   o._interval = 25;
   o._limit    = 8;
   o.onProcess = MO.FE3dStageConsole_onProcess;
   o.construct = MO.FE3dStageConsole_construct;
   o.process   = MO.FE3dStageConsole_process;
   return o;
}
MO.FE3dStageConsole_onProcess = function FE3dStageConsole_onProcess(){
   var o = this;
   var looper = o._looper;
   looper.record();
   for(var i = o._limit - 1; i >= 0; i--){
      var renderable = looper.next();
      if(renderable){
         renderable.processDelay(renderable._linkRegion);
      }else{
         break;
      }
   }
}
MO.FE3dStageConsole_construct = function FE3dStageConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._looper = new MO.TLooper();
   o._renderables = new MO.TDictionary();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FE3dStageConsole_process = function FE3dStageConsole_process(region){
   var o = this;
   var renderables = region.allRenderables();
   for(var i = renderables.count() - 1; i >= 0; i--){
      var renderable = renderables.at(i);
      if(!renderable._linkStageLooper){
         renderable._linkRegion = region;
         renderable._linkStageLooper = o._looper;
         o._looper.push(renderable);
      }
   }
}
MO.FE3dStageStatistics = function FE3dStageStatistics(o){
   o = MO.Class.inherits(this, o, MO.FStatistics);
   o._frame               = null;
   o._frameProcess        = null;
   o._frameDraw           = null;
   o._frameDrawSort       = null;
   o._frameDrawRenderable = null;
   o.construct            = MO.FE3dStageStatistics_construct;
   o.reset                = MO.FE3dStageStatistics_reset;
   o.resetFrame           = MO.FE3dStageStatistics_resetFrame;
   return o;
}
MO.FE3dStageStatistics_construct = function FE3dStageStatistics_construct(){
   var o = this;
   o.__base.FStatistics.construct.call(o);
   o._frame = new MO.TSpeed();
   o._frameProcess = new MO.TSpeed();
   o._frameDraw = new MO.TSpeed();
   o._frameDrawSort = new MO.TSpeed();
   o._frameDrawRenderable = new MO.TSpeed();
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
MO.FE3dTechnique = function FE3dTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechnique, MO.MLinkerResource);
   o.drawStage = MO.FE3dTechnique_drawStage;
   return o;
}
MO.FE3dTechnique_drawStage = function FE3dTechnique_drawStage(stage, region){
   var o = this;
   var layers = stage.layers();
   var layerCount = layers.count();
   region.setTechnique(o);
   var passes = o._passes;
   var count = passes.count();
   for(var passIndex = 0; passIndex < count; passIndex++){
      var pass = passes.at(passIndex);
      pass.drawBegin(region);
      for(var layerIndex = 0; layerIndex < layerCount; layerIndex++){
         var layer = layers.at(layerIndex);
         var layerTechnique = layer.technique();
         if(!layerTechnique){
            layerTechnique = o;
         }
         region.reset();
         region.renderables().assign(layer.visibleRenderables());
         if(layer.optionClearDepth()){
            layerTechnique.clearDepth();
         }
         region.setTechniquePass(pass, (passIndex == count - 1));
         pass.drawRegion(region);
      }
      pass.drawEnd(region);
   }
   o.present(region);
}
MO.RE3dEngine = function RE3dEngine(){
   var o = this;
   o._setuped = false;
   return o;
}
MO.RE3dEngine.prototype.onSetup = function RE3dEngine_onSetup(){
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('select.select.flat', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.control', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.automatic', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.skeleton', MO.FG3dSelectSkeletonEffect);
   effectConsole.register('select.select.skeleton.4', MO.FG3dSelectSkeletonEffect);
   effectConsole.register('control.control.automatic', MO.FE3dControlAutomaticEffect);
   effectConsole.register('control.control.control', MO.FE3dControlAutomaticEffect);
   effectConsole.register('general.color.control', MO.FE3dControlAutomaticEffect);
   effectConsole.register('general.color.flat', MO.FE3dGeneralColorFlatEffect);
   effectConsole.register('general.color.fill', MO.FE3dGeneralColorFillEffect);
   effectConsole.register('general.color.automatic', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skin', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.parallax', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.video', MO.FE3dGeneralColorVideoEffect);
   effectConsole.register('general.color.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('shadow.depth.automatic', MO.FE3dShadowDepthAutomaticEffect);
   effectConsole.register('shadow.depth.skeleton', MO.FE3dShadowDepthSkeletonEffect);
   effectConsole.register('shadow.color.automatic', MO.FE3dShadowColorAutomaticEffect);
   effectConsole.register('shadow.color.skeleton', MO.FE3dShadowColorSkeletonEffect);
}
MO.RE3dEngine.prototype.setup = function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
MO.RE3dEngine = new MO.RE3dEngine();
