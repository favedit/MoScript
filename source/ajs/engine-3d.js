function ME3dObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._guid   = null;
   o._code   = null;
   o.guid    = ME3dObject_guid;
   o.setGuid = ME3dObject_setGuid;
   o.code    = ME3dObject_code;
   o.setCode = ME3dObject_setCode;
   return o;
}
function ME3dObject_guid(){
   return this._guid;
}
function ME3dObject_setGuid(p){
   this._guid = p;
}
function ME3dObject_code(){
   return this._code;
}
function ME3dObject_setCode(p){
   this._code = p;
}
function FE3dCanvas(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerLoad, MMouseCapture);
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._scaleRate          = 1;
   o._size               = null;
   o._interval           = 1000 / 60;
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
function FE3dCanvas_ohTouchStart(p){
   this.__linker.onTouchStart(p);
}
function FE3dCanvas_ohTouchMove(p){
   this.__linker.onTouchMove(p);
}
function FE3dCanvas_ohTouchStop(p){
   this.__linker.onTouchStop(p);
}
function FE3dCanvas_onResize(p){
   var o = this;
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   if(o._size.equalsData(w, h)){
      return;
   }
   o._size.set(w, h);
   var hc = o._hCanvas;
   var sw = hc.width = w * o._scaleRate;
   var sh = hc.height = h * o._scaleRate;
   o._graphicContext.setViewport(0, 0, sw, sh);
}
function FE3dCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new SSize2();
}
function FE3dCanvas_build(p){
   var o = this;
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   h.style.width = '100%';
   h.style.height = '100%';
   if(!RMethod.isEmpty(o.onTouchStart)){
      h.addEventListener('touchstart', o.ohTouchStart, false);
   }
   if(!RMethod.isEmpty(o.onTouchMove)){
      h.addEventListener('touchmove', o.ohTouchMove, false);
   }
   if(!RMethod.isEmpty(o.onTouchStop)){
      h.addEventListener('touchend', o.ohTouchStop, false);
   }
   var a = new Object();
   a.alpha = o._optionAlpha;
   a.antialias = o._optionAntialias;
   var c = o._graphicContext = REngine3d.createContext(FWglContext, h, a);
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(o._interval);
   RWindow.lsnsResize.register(o, o.onResize);
   RWindow.lsnsOrientation.register(o, o.onResize);
   RConsole.find(FMouseConsole).register(o);
}
function FE3dCanvas_resize(){
   this.onResize();
}
function FE3dCanvas_setPanel(p){
   var o = this;
   var c = o._graphicContext;
   var hc = o._hCanvas;
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   o.onResize();
}
function FE3dCanvas_dispose(){
   var o = this;
   var h = o._hCanvas;
   if(h){
      h.__linker = null;
      h.removeEventListener('touchstart', o.ohTouchStart);
      h.removeEventListener('touchmove', o.ohTouchMove);
      h.removeEventListener('touchend', o.ohTouchStop);
   }
   o._graphicContext = RObject.dispose(o._graphicContext);
   o._hPanel = RHtml.free(o._hPanel);
   o._hCanvas = RHtml.free(o._hCanvas);
   o.__base.FObject.dispose.call(o);
}
function FE3dDisplay(o){
   o = RClass.inherits(this, o, FDisplay);
   o._outline         = null;
   o._materials       = null;
   o.construct        = FE3dDisplay_construct;
   o.materials        = FE3dDisplay_materials;
   o.calculateOutline = FE3dDisplay_calculateOutline;
   o.dispose          = FE3dDisplay_dispose;
   return o;
}
function FE3dDisplay_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._outline = new SOutline3();
}
function FE3dDisplay_materials(){
   return this._materials;
}
function FE3dDisplay_calculateOutline(){
   var o = this;
   return o._outline;
}
function FE3dDisplay_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FDisplay.dispose.call(o);
}
function FE3dDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._outline         = null;
   o._materials       = null;
   o.construct        = FE3dDisplayContainer_construct;
   o.materials        = FE3dDisplayContainer_materials;
   o.calculateOutline = FE3dDisplayContainer_calculateOutline;
   o.dispose          = FE3dDisplayContainer_dispose;
   return o;
}
function FE3dDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._outline = new SOutline3();
}
function FE3dDisplayContainer_materials(){
   return this._materials;
}
function FE3dDisplayContainer_calculateOutline(){
   var o = this;
   return o._outline;
}
function FE3dDisplayContainer_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FDisplayContainer.dispose.call(o);
}
function FE3dMaterial(o){
   o = RClass.inherits(this, o, FE3rMaterial);
   return o;
}
function FE3dRenderable(o){
   o = RClass.inherits(this, o, FRenderable, MG3dRenderable, MGraphicObject, MLinkerResource);
   o._display           = null;
   o._outline           = null;
   o._outlineVisible    = true;
   o._calculateMatrix   = null;
   o._vertexCount       = 0;
   o._vertexBuffers     = null;
   o._indexBuffer       = null;
   o._indexBuffers      = null;
   o._materialReference = null;
   o._materials         = null;
   o._bones             = null;
   o._textures          = null;
   o.construct          = FE3dRenderable_construct;
   o.setup              = RMethod.empty;
   o.testReady          = RMethod.emptyTrue;
   o.testVisible        = FE3dRenderable_testVisible;
   o.display            = FE3dRenderable_display;
   o.setDisplay         = FE3dRenderable_setDisplay;
   o.vertexCount        = FE3dRenderable_vertexCount;
   o.findVertexBuffer   = FE3dRenderable_findVertexBuffer;
   o.vertexBuffers      = FE3dRenderable_vertexBuffers;
   o.indexBuffer        = FE3dRenderable_indexBuffer;
   o.indexBuffers       = FE3dRenderable_indexBuffers;
   o.materialReference  = FE3dRenderable_materialReference;
   o.materials          = FE3dRenderable_materials;
   o.pushMaterial       = FE3dRenderable_pushMaterial;
   o.bones              = FE3dRenderable_bones;
   o.findTexture        = FE3dRenderable_findTexture;
   o.pushTexture        = FE3dRenderable_pushTexture;
   o.textures           = FE3dRenderable_textures;
   o.processDelay       = RMethod.empty;
   o.update             = FE3dRenderable_update;
   o.remove             = FE3dRenderable_remove;
   return o;
}
function FE3dRenderable_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o.__base.MG3dRenderable.construct.call(o);
   o._outline = new SOutline3d();
   o._calculateMatrix = new SMatrix3d();
   o._vertexBuffers = new TDictionary();
   o._materialReference = o;
}
function FE3dRenderable_testVisible(){
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
function FE3dRenderable_display(){
   return this._display;
}
function FE3dRenderable_setDisplay(p){
   this._display = p;
}
function FE3dRenderable_vertexCount(){
   return this._vertexCount;
}
function FE3dRenderable_findVertexBuffer(code){
   return this._vertexBuffers.get(code);
}
function FE3dRenderable_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3dRenderable_materialReference(){
   return this._materialReference;
}
function FE3dRenderable_materials(){
   return this._materials;
}
function FE3dRenderable_pushMaterial(material){
   var o = this;
   var materials = o._materials;
   if(!materials){
      materials = o._materials = new TObjects();
   }
   materials.push(material);
}
function FE3dRenderable_indexBuffer(){
   return this._indexBuffer;
}
function FE3dRenderable_indexBuffers(){
   return this._indexBuffers;
}
function FE3dRenderable_bones(){
   return this._bones;
}
function FE3dRenderable_findTexture(p){
   return this._textures.get(p);
}
function FE3dRenderable_textures(){
   return this._textures;
}
function FE3dRenderable_pushTexture(texture){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new TDictionary();
   }
   var code = texture.code();
   textures.set(code, texture);
}
function FE3dRenderable_update(region){
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
function FE3dRenderable_remove(){
   var o = this;
   var display = o._display;
   if(display){
      display.removeRenderable(o);
      o._display = null;
   }
}
function FE3dStage(o){
   o = RClass.inherits(this, o, FStage, MGraphicObject);
   o._statistics       = null;
   o._camera           = null;
   o._directionalLight = null
   o._technique        = null;
   o._region           = null;
   o._allDisplays      = null;
   o.onProcess         = FE3dStage_onProcess;
   o.construct         = FE3dStage_construct;
   o.createRegion      = FE3dStage_createRegion;
   o.setup             = FE3dStage_setup;
   o.statistics        = FE3dStage_statistics;
   o.camera            = FE3dStage_camera;
   o.projection        = FE3dStage_projection;
   o.directionalLight  = FE3dStage_directionalLight;
   o.technique         = FE3dStage_technique;
   o.selectTechnique   = FE3dStage_selectTechnique;
   o.region            = FE3dStage_region;
   o.filterDisplays    = FE3dStage_filterDisplays;
   o.allDisplays       = FE3dStage_allDisplays;
   return o;
}
function FE3dStage_onProcess(){
   var o = this;
   var region = o._region;
   if(!region){
      return;
   }
   var technique = o._technique;
   if(!technique){
      return;
   }
   var g = technique._graphicContext;
   var ss = region._statistics = o._statistics;
   ss.resetFrame();
   ss._frame.begin();
   ss._frameProcess.begin();
   g.prepare();
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
   ss._frameProcess.end();
   ss._frameDraw.begin();
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
         layerTechnique.drawRegion(region);
      }
      technique.present(region);
   }
   ss._frameDraw.end();
   ss._frame.end();
}
function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._statistics = RClass.create(FE3dStageStatistics);
   RConsole.find(FStatisticsConsole).register('engine.stage', o._statistics);
   o._allDisplays = new TObjects();
   var r = o._region = o.createRegion();
   r._timer = o._timer;
}
function FE3dStage_createRegion(){
   return RClass.create(FE3dRegion);
}
function FE3dStage_setup(){
   var o = this;
   o.__base.FStage.construct.call(o);
   o._region.linkGraphicContext(o);
   o._region.setup();
}
function FE3dStage_statistics(){
   return this._statistics;
}
function FE3dStage_camera(){
   return this._region._camera;
}
function FE3dStage_projection(){
   return this._region._camera._projection;
}
function FE3dStage_directionalLight(){
   return this._region._directionalLight;
}
function FE3dStage_technique(){
   return this._technique;
}
function FE3dStage_selectTechnique(c, p){
   var o = this;
   var techniqueConsole = RConsole.find(FG3dTechniqueConsole);
   var technique = o._technique = techniqueConsole.find(c, p);
   return technique;
}
function FE3dStage_region(){
   return this._region;
}
function FE3dStage_filterDisplays(p){
   var o = this;
   var s = o._layers;
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.value(i).filterDisplays(p);
   }
}
function FE3dStage_allDisplays(){
   var o = this;
   var s = o._allDisplays;
   s.clear();
   o.filterDisplays(s);
   return s;
}
function FE3dStageConsole(o){
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
function FE3dStageConsole_onProcess(){
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
function FE3dStageConsole_construct(){
   var o = this;
   o._looper = new TLooper();
   o._renderables = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dStageConsole_process(p){
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
function FE3dStageStatistics(o){
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
function FE3dStageStatistics_construct(){
   var o = this;
   o.__base.FStatistics.construct.call(o);
   o._frame = new TSpeed();
   o._frameProcess = new TSpeed();
   o._frameDraw = new TSpeed();
   o._frameDrawSort = new TSpeed();
   o._frameDrawRenderable = new TSpeed();
}
function FE3dStageStatistics_reset(){
}
function FE3dStageStatistics_resetFrame(){
   var o = this;
   o._frame.reset();
   o._frameProcess.reset();
   o._frameDraw.reset();
   o._frameDrawSort.reset();
   o._frameDrawRenderable.reset();
}
function FE3dTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique, MLinkerResource);
   return o;
}
var RE3dEngine = new function RE3dEngine(){
   var o = this;
   o._setuped = false;
   o.onSetup  = RE3dEngine_onSetup;
   o.setup    = RE3dEngine_setup;
   return o;
}
function RE3dEngine_onSetup(){
   var effectConsole = RConsole.find(FG3dEffectConsole);
   effectConsole.register('select.select.control', FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.automatic', FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.skeleton', FG3dSelectSkeletonEffect);
   effectConsole.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
   effectConsole.register('control.control.automatic', FG3dControlAutomaticEffect);
   effectConsole.register('control.control.control', FG3dControlAutomaticEffect);
   effectConsole.register('general.color.control', FG3dControlAutomaticEffect);
   effectConsole.register('general.color.flat', FE3dGeneralColorFlatEffect);
   effectConsole.register('general.color.automatic', FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skeleton', FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.skeleton.4', FE3dGeneralColorSkeletonEffect);
   effectConsole.register('shadow.depth.automatic', FE3dShadowDepthAutomaticEffect);
   effectConsole.register('shadow.depth.skeleton', FE3dShadowDepthSkeletonEffect);
   effectConsole.register('shadow.color.automatic', FE3dShadowColorAutomaticEffect);
   effectConsole.register('shadow.color.skeleton', FE3dShadowColorSkeletonEffect);
}
function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
