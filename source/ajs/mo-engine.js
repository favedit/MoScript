function MListenerEnterFrame(o){
   o = RClass.inherits(this, o, MListener);
   o.addEnterFrameListener     = MListenerEnterFrame_addEnterFrameListener;
   o.removeEnterFrameListener  = MListenerEnterFrame_removeEnterFrameListener;
   o.processEnterFrameListener = MListenerEnterFrame_processEnterFrameListener;
   return o;
}
function MListenerEnterFrame_addEnterFrameListener(w, m){
   return this.addListener(EEvent.EnterFrame, w, m);
}
function MListenerEnterFrame_removeEnterFrameListener(w, m){
   this.removeListener(EEvent.EnterFrame, w, m);
}
function MListenerEnterFrame_processEnterFrameListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.EnterFrame, p1, p2, p3, p4, p5);
}
function MListenerLeaveFrame(o){
   o = RClass.inherits(this, o, MListener);
   o.addLeaveFrameListener     = MListenerLeaveFrame_addLeaveFrameListener;
   o.removeLeaveFrameListener  = MListenerLeaveFrame_removeLeaveFrameListener;
   o.processLeaveFrameListener = MListenerLeaveFrame_processLeaveFrameListener;
   return o;
}
function MListenerLeaveFrame_addLeaveFrameListener(w, m){
   return this.addListener(EEvent.LeaveFrame, w, m);
}
function MListenerLeaveFrame_removeLeaveFrameListener(w, m){
   this.removeListener(EEvent.LeaveFrame, w, m);
}
function MListenerLeaveFrame_processLeaveFrameListener(p1, p2, p3, p4, p5){
   this.processListener(EEvent.LeaveFrame, p1, p2, p3, p4, p5);
}
function FDisplay(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._parent           = null;
   o._currentMatrix    = null;
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDisplay_construct;
   o.parent            = FDisplay_parent;
   o.setParent         = FDisplay_setParent;
   o.isName            = FDisplay_isName;
   o.name              = FDisplay_name;
   o.setName           = FDisplay_setName;
   o.currentMatrix     = FDisplay_currentMatrix;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   o.hasRenderable     = FDisplay_hasRenderable;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.removeRenderable  = FDisplay_removeRenderable;
   o.filterDisplays    = FDisplay_filterDisplays;
   o.filterRenderables = FDisplay_filterRenderables;
   o.show              = FDisplay_show;
   o.hide              = FDisplay_hide;
   o.setVisible        = FDisplay_setVisible;
   o.update            = FDisplay_update;
   o.updateMatrix      = FDisplay_updateMatrix;
   o.process           = FDisplay_process;
   o.remove            = FDisplay_remove;
   o.dispose           = FDisplay_dispose;
   return o;
}
function FDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}
function FDisplay_parent(){
   return this._parent;
}
function FDisplay_setParent(p){
   this._parent = p;
}
function FDisplay_isName(p){
   return this._name == p;
}
function FDisplay_name(){
   return this._name;
}
function FDisplay_setName(p){
   this._name = p;
}
function FDisplay_currentMatrix(){
   return this._currentMatrix;
}
function FDisplay_matrix(){
   return this._matrix;
}
function FDisplay_location(){
   return this._location;
}
function FDisplay_rotation(){
   return this._rotation;
}
function FDisplay_scale(){
   return this._scale;
}
function FDisplay_hasRenderable(){
   var r = this._renderables;
   return r ? !r.isEmpty() : false;
}
function FDisplay_renderables(){
   var o = this;
   var r = o._renderables;
   if(!r){
      r = o._renderables = new TObjects();
   }
   return r;
}
function FDisplay_pushRenderable(p){
   var o = this;
   p._display = o;
   o.renderables().push(p);
}
function FDisplay_removeRenderable(p){
   var s = this._renderables;
   if(s){
      s.remove(p);
   }
}
function FDisplay_filterDisplays(p){
   var o = this;
   if(o._visible){
      p.push(o);
   }
}
function FDisplay_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).filterDrawables(p);
      }
   }
   return true;
}
function FDisplay_show(){
   this.setVisible(true);
}
function FDisplay_hide(){
   this.setVisible(false);
}
function FDisplay_setVisible(p){
   this._visible = p;
}
function FDisplay_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDisplay_updateMatrix(){
   var o = this;
   o._currentMatrix.assign(o._matrix);
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
}
function FDisplay_process(p){
   var o = this;
   o.updateMatrix();
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).process(p);
      }
   }
}
function FDisplay_remove(){
   var o = this;
   var c = o._parent;
   if(c){
      c.removeDisplay(o);
      o._parent = null;
   }
}
function FDisplay_dispose(){
   var o = this;
   RObject.dispose(o._currentMatrix);
   RObject.dispose(o._matrix);
   RObject.dispose(o._position);
   RObject.dispose(o._direction);
   RObject.dispose(o._scale);
   RObject.dispose(o._renderables)
   o.__base.FObject.dispose.call(o);
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._displays         = null;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.removeDisplay     = FDisplayContainer_removeDisplay;
   o.filterDisplays    = FDisplayContainer_filterDisplays;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}
function FDisplayContainer_hasDisplay(){
   var r = this._displays;
   if(r){
      return !r.isEmpty();
   }
   return false;
}
function FDisplayContainer_findDisplay(p){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var f = s.get(i);
         if(f.isName(p)){
            return f;
         }
      }
   }
   return null
}
function FDisplayContainer_searchDisplay(p){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var f = s.get(i);
         if(f.isName(p)){
            return f;
         }
         var r = f.searchDisplay(p);
         if(r){
            return r;
         }
      }
   }
   return null
}
function FDisplayContainer_displays(){
   var o = this;
   var r = o._displays;
   if(!r){
      r = o._displays = new TObjects();
   }
   return r;
}
function FDisplayContainer_pushDisplay(p){
   var o = this;
   p._parent = o;
   o.displays().push(p);
}
function FDisplayContainer_removeDisplay(p){
   var o = this;
   o.displays().remove(p);
   p._parent = null;
}
function FDisplayContainer_filterDisplays(p){
   var o = this;
   o.__base.FDisplay.filterDisplays.call(o, p);
   if(o._visible){
      var s = o._displays;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.get(i).filterDisplays(p);
         }
      }
   }
}
function FDisplayContainer_filterRenderables(p){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, p);
   if(!o._visible){
      return false;
   }
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).filterRenderables(p);
      }
   }
   return true;
}
function FDisplayContainer_process(p){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         d.process(p);
      }
   }
}
function FDisplayContainer_dispose(){
   var o = this;
   var v = o._displays;
   if(v){
      for(var i = v.count() - 1; i >= 0; i--){
         v.get(i).dispose();
      }
      v.dispose();
      o._displays = null;
   }
   o.__base.FDisplay.dispose.call(o);
}
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._statusActive       = false;
   o._technique          = null;
   o._visibleRenderables = null;
   o.construct           = FDisplayLayer_construct;
   o.technique           = FDisplayLayer_technique;
   o.setTechnique        = FDisplayLayer_setTechnique;
   o.selectTechnique     = FDisplayLayer_selectTechnique;
   o.visibleRenderables  = FDisplayLayer_visibleRenderables;
   o.filterRenderables   = FDisplayLayer_filterRenderables;
   o.active              = FDisplayLayer_active;
   o.deactive            = FDisplayLayer_deactive;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._visibleRenderables = new TObjects();
}
function FDisplayLayer_technique(){
   return this._technique;
}
function FDisplayLayer_setTechnique(p){
   this._technique = p;
}
function FDisplayLayer_selectTechnique(c, n){
   this._technique = RConsole.find(FG3dTechniqueConsole).find(c, n);
}
function FDisplayLayer_visibleRenderables(){
   return this._visibleRenderables;
}
function FDisplayLayer_filterRenderables(p){
   var o = this;
   o.__base.FDisplayContainer.filterRenderables.call(o, p);
   o._visibleRenderables.assign(p.renderables());
}
function FDisplayLayer_active(){
   this._statusActive = true;
}
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
function FDisplayUiLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   return o;
}
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   o._visible        = true;
   o._drawables      = null;
   o.testVisible     = FDrawable_testVisible;
   o.visible         = FDrawable_visible;
   o.setVisible      = FDrawable_setVisible;
   o.hasDrawable     = FDrawable_hasDrawable;
   o.drawables       = FDrawable_drawables;
   o.pushDrawable    = FDrawable_pushDrawable;
   o.removeDrawable  = FDrawable_removeDrawable;
   o.filterDrawables = FDrawable_filterDrawables;
   o.process         = FDrawable_process;
   return o;
}
function FDrawable_testVisible(){
   return this._visible;
}
function FDrawable_visible(){
   return this._visible;
}
function FDrawable_setVisible(p){
   this._visible = p;
}
function FDrawable_hasDrawable(){
   var s = this._drawables;
   return s ? !s.isEmpty() : false;
}
function FDrawable_drawables(){
   var o = this;
   var s = o._drawables;
   if(!s){
      s = o._drawables = new TObjects();
   }
   return s;
}
function FDrawable_pushDrawable(p){
   var o = this;
   p._parent = o;
   p._drawable = o;
   o.drawables().push(p);
}
function FDrawable_removeDrawable(p){
   var s = this._drawables;
   if(s){
      s.remove(p);
   }
}
function FDrawable_filterDrawables(p){
   var o = this;
   if(!o.testVisible()){
      return false;
   }
   p.pushRenderable(o);
   var s = o._drawables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.getAt(i);
         if(r.testVisible()){
            p.pushRenderable(r);
         }
      }
   }
}
function FDrawable_process(p){
   var o = this;
   var s = o._drawables;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).process(p);
      }
   }
}
function FRegion(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FStage(o){
   o = RClass.inherits(this, o, FObject, MListenerEnterFrame, MListenerLeaveFrame);
   o._statusActive   = false;
   o._layers         = null;
   o.onProcess       = FStage_onProcess;
   o.construct       = FStage_construct;
   o.registerLayer   = RStage_registerLayer;
   o.unregisterLayer = RStage_unregisterLayer;
   o.layers          = FStage_layers;
   o.active          = FStage_active;
   o.deactive        = FStage_deactive;
   o.process         = FStage_process;
   o.dispose         = FStage_dispose;
   return o;
}
function FStage_onProcess(){
   var o = this;
   var s = o._layers;
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.valueAt(i).process();
   }
}
function FStage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._layers = new TDictionary();
}
function RStage_registerLayer(n, l){
   this._layers.set(n, l);
}
function RStage_unregisterLayer(n){
   this._layers.set(n, null);
}
function FStage_layers(){
   return this._layers;
}
function FStage_active(){
   var o = this;
   o._statusActive = true;
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).active();
   }
}
function FStage_deactive(){
   var o = this;
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).deactive();
   }
   o._statusActive = false;
}
function FStage_process(){
   var o = this;
   o.processEnterFrameListener(o);
   o.onProcess();
   o.processLeaveFrameListener(o);
}
function FStage_dispose(){
   var o = this;
   o._layers = RObject.dispose(o._layers);
   o.__base.MListenerEnterFrame.dispose.call(o);
   o.__base.MListenerLeaveFrame.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
var RStage = new function RStage(){
   var o = this;
   o._active        = true;
   o._interval      = 1000 / 40;
   o._stages        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.onProcess      = RStage_onProcess;
   o.construct      = RStage_construct;
   o.register       = RStage_register;
   o.active         = RStage_active;
   o.deactive       = RStage_deactive;
   o.process        = RStage_process;
   o.start          = RStage_start;
   o.construct();
   return o;
}
function RStage_onProcess(){
   RStage.process();
}
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_register(n , s){
   var o = this;
   var ss = o._stages;
   if(ss == null){
      ss = o._stages = new TDictionary();
   }
   ss.set(n , s);
}
function RStage_active(){
   var o = this;
   var ss = o._stages;
   if(ss != null){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         ss.value(i).active();
      }
   }
}
function RStage_deactive(){
   var o = this;
   var ss = o._stages;
   if(ss != null){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         ss.value(i).deactive();
      }
   }
}
function RStage_process(){
   var o = this;
   if(o._active){
      o.lsnsEnterFrame.process(o);
      var s = o._stages;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.valueAt(i).process();
         }
      }
      o.lsnsLeaveFrame.process(o);
      RTimer.update();
   }
}
function RStage_start(v){
   var o = this;
   RE3dEngine.setup();
   o.active();
   o.process();
   if(v == null){
      v = o._interval;
   }
   RTimer.setup();
   setInterval('RStage_onProcess()', parseInt(v));
}
function FE2dDrawable(o){
   o = RClass.inherits(this, o, FDrawable);
   return o;
}
function FE3dCanvas(o){
   o = RClass.inherits(this, o, FObject, MListenerLoad, MMouseCapture);
   o._optionAlpha     = true;
   o._optionAntialias = false;
   o._context         = null;
   o._scaleRate       = 1;
   o._interval        = 1000 / 60;
   o._hPanel          = null;
   o._hCanvas         = null;
   o.ohTouchStart     = FE3dCanvas_ohTouchStart;
   o.ohTouchMove      = FE3dCanvas_ohTouchMove;
   o.ohTouchStop      = FE3dCanvas_ohTouchStop;
   o.onTouchStart     = RMethod.empty;
   o.onTouchMove      = RMethod.empty;
   o.onTouchStop      = RMethod.empty;
   o.onResize         = FE3dCanvas_onResize;
   o.construct        = FE3dCanvas_construct;
   o.build            = FE3dCanvas_build;
   o.setPanel         = FE3dCanvas_setPanel;
   o.dispose          = FE3dCanvas_dispose;
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
   var w = hp.offsetWidth * o._scaleRate;
   var h = hp.offsetHeight * o._scaleRate;
   var hc = o._hCanvas;
   hc.width = w;
   hc.height = h;
   var c = o._context;
   c.setViewport(0, 0, w, h);
}
function FE3dCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3dCanvas_build(p){
   var o = this;
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   h.style.width = '100%';
   h.style.height = '100%';
   h.style.display = 'block';
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
   var c = o._context = REngine3d.createContext(FWglContext, h, a);
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(o._interval);
   RWindow.lsnsResize.register(o, o.onResize);
   RWindow.lsnsOrientation.register(o, o.onResize);
   RConsole.find(FMouseConsole).register(o);
}
function FE3dCanvas_setPanel(p){
   var o = this;
   var c = o._context;
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
   o._context = RObject.dispose(o._context);
   o._hPanel = RHtml.free(o._hPanel);
   o._hCanvas = RHtml.free(o._hCanvas);
   o.__base.FObject.dispose.call(o);
}
function FE3dDisplay(o){
   o = RClass.inherits(this, o, FDisplay);
   o._materials = null;
   o.construct  = FE3dDisplay_construct;
   o.materials  = FE3dDisplay_materials;
   o.dispose    = FE3dDisplay_dispose;
   return o;
}
function FE3dDisplay_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._materials = new TDictionary();
}
function FE3dDisplay_materials(){
   return this._materials;
}
function FE3dDisplay_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FDisplay.dispose.call(o);
}
function FE3dDrawable(o){
   o = RClass.inherits(this, o, FDrawable);
   return o;
}
function FE3dRegion(o){
   o = RClass.inherits(this, o, FRegion, MG3dRegion, MGraphicObject);
   o._backgroundColor = null;
   o.construct        = FE3dRegion_construct;
   o.backgroundColor  = FE3dRegion_backgroundColor;
   o.prepare          = FE3dRegion_prepare;
   o.dispose          = FE3dRegion_dispose;
   return o;
}
function FE3dRegion_construct(){
   var o = this;
   o.__base.FRegion.construct.call(o);
   o.__base.MG3dRegion.construct.call(o);
   var c = o._backgroundColor = new SColor4();
   c.set(0, 0, 0, 1);
   o._calculateCameraMatrix = new SMatrix3d();
}
function FE3dRegion_backgroundColor(){
   return this._backgroundColor;
}
function FE3dRegion_prepare(){
   var o = this;
   o.__base.MG3dRegion.prepare.call(o);
   var r = o._calculateCameraMatrix.attach(o._camera.matrix());
   if(r){
      o._changed = true;
   }
}
function FE3dRegion_dispose(){
   var o = this;
   o.__base.FRegion.dispose.call(o);
   o.__base.MG3dRegion.dispose.call(o);
}
function FE3dRenderable(o){
   o = RClass.inherits(this, o, FE3dDrawable, MG3dRenderable, MGraphicObject);
   o._display         = null;
   o._calculateMatrix = null;
   o._vertexCount     = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._textures        = null;
   o.construct        = FE3dRenderable_construct;
   o.setup            = RMethod.empty;
   o.testVisible      = FE3dRenderable_testVisible;
   o.display          = FE3dRenderable_display;
   o.setDisplay       = FE3dRenderable_setDisplay;
   o.vertexCount      = FE3dRenderable_vertexCount;
   o.findVertexBuffer = FE3dRenderable_findVertexBuffer;
   o.vertexBuffers    = FE3dRenderable_vertexBuffers;
   o.indexBuffer      = FE3dRenderable_indexBuffer;
   o.findTexture      = FE3dRenderable_findTexture;
   o.textures         = FE3dRenderable_textures;
   o.bones            = RMethod.empty;
   o.update           = FE3dRenderable_update;
   o.remove           = FE3dRenderable_remove;
   return o;
}
function FE3dRenderable_construct(){
   var o = this;
   o.__base.FE3dDrawable.construct.call(o);
   o.__base.MG3dRenderable.construct.call(o);
   o._calculateMatrix = new SMatrix3d();
   o._vertexBuffers = new TDictionary();
}
function FE3dRenderable_testVisible(){
   var o = this;
   var r = o.__base.FE3dDrawable.testVisible.call(o);
   if(r){
      if(RRuntime.isDebug()){
         var m = o.material();
         if(!m.testVisible()){
            return false;
         }
      }
   }
   return r;
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
function FE3dRenderable_findVertexBuffer(p){
   return this._vertexBuffers.get(p);
}
function FE3dRenderable_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3dRenderable_indexBuffer(){
   return this._indexBuffer;
}
function FE3dRenderable_findTexture(p){
   return this._textures.get(p);
}
function FE3dRenderable_textures(){
   return this._textures;
}
function FE3dRenderable_update(p){
   var o = this;
   var m = o._calculateMatrix;
   m.assign(o._matrix);
   var d = o._drawable;
   if(d){
      m.append(d.currentMatrix());
   }
   var d = o._display;
   if(d){
      m.append(d.currentMatrix());
   }
   var c = o._currentMatrix.attachData(m.data());
   if(c && p){
      p.change();
   }
}
function FE3dRenderable_remove(){
   var o = this;
   var d = o._display;
   if(d){
      d.removeRenderable(o);
      o._display = null;
   }
}
function FE3dSimpleStage(o){
   o = RClass.inherits(this, o, FE3dStage);
   o._optionKeyboard = true;
   o._skyLayer       = null;
   o._mapLayer       = null;
   o._spriteLayer    = null;
   o._faceLayer      = null;
   o.onKeyDown       = FE3dSimpleStage_onKeyDown;
   o.construct       = FE3dSimpleStage_construct;
   o.skyLayer        = FE3dSimpleStage_skyLayer;
   o.mapLayer        = FE3dSimpleStage_mapLayer;
   o.spriteLayer     = FE3dSimpleStage_spriteLayer;
   o.faceLayer       = FE3dSimpleStage_faceLayer;
   o.active          = FE3dSimpleStage_active;
   o.deactive        = FE3dSimpleStage_deactive;
   return o;
}
function FE3dSimpleStage_onKeyDown(e){
   var o = this;
   var c = o._camera;
   var k = e.keyCode;
   var r = 0.3;
   switch(k){
      case EKeyCode.W:
         c.doWalk(r);
         break;
      case EKeyCode.S:
         c.doWalk(-r);
         break;
      case EKeyCode.A:
         c.doStrafe(r);
         break;
      case EKeyCode.D:
         c.doStrafe(-r);
         break;
      case EKeyCode.Q:
         c.doFly(r);
         break;
      case EKeyCode.E:
         c.doFly(-r);
         break;
   }
   c.update();
}
function FE3dSimpleStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   var l = o._spriteLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sprite', l);
   var l = o._faceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('face', l);
}
function FE3dSimpleStage_skyLayer(){
   return this._skyLayer;
}
function FE3dSimpleStage_mapLayer(){
   return this._mapLayer;
}
function FE3dSimpleStage_spriteLayer(){
   return this._spriteLayer;
}
function FE3dSimpleStage_faceLayer(){
   return this._faceLayer;
}
function FE3dSimpleStage_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
   if(o._optionKeyboard){
      RWindow.lsnsKeyDown.register(o, o.onKeyDown);
   }
}
function FE3dSimpleStage_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
   if(o._optionKeyboard){
      RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
   }
}
function FE3dSprite(o){
   o = RClass.inherits(this, o, FObject);
   o._context    = null;
   o._visible    = true;
   o.linkContext = FE3dSprite_linkContext;
   o.testVisible = FE3dSprite_testVisible;
   return o;
}
function FE3dSprite_linkContext(p){
   this._context = p;
}
function FE3dSprite_testVisible(p){
   return this._visible;
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
   var r = o._region;
   var t = o._technique;
   var g = t._graphicContext;
   var ss = r._statistics = o._statistics;
   ss.resetFrame();
   ss._frame.begin();
   ss._frameProcess.begin();
   g.prepare();
   t.updateRegion(r);
   r.prepare();
   r.change();
   var ls = o._layers;
   var lc = ls.count();
   for(var i = 0; i < lc; i++){
      var l = ls.valueAt(i);
      r.reset();
      l.process();
      l.filterRenderables(r);
      r.update();
   }
   RConsole.find(FE3dStageConsole).process(r);
   ss._frameProcess.end();
   ss._frameDraw.begin();
   if(r.isChanged()){
      t.clear(r.backgroundColor());
      for(var i = 0; i < lc; i++){
         var l = ls.valueAt(i);
         var lt = l.technique();
         if(!lt){
            lt = t;
         }
         r.reset();
         r.renderables().assign(l.visibleRenderables());
         lt.drawRegion(r);
      }
      t.present(r);
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
   var c = o._camera = RClass.create(FE3dCamera);
   c.position().set(0, 0, -100);
   c.lookAt(0, 0, 0);
   c.update();
   c._projection.update();
   var l = o._directionalLight = RClass.create(FG3dDirectionalLight);
   l.direction().set(0, -1, 0);
   var r = o._region = o.createRegion();
   r._camera = c;
   r._directionalLight = l;
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
   return this._camera;
}
function FE3dStage_projection(){
   return this._projection;
}
function FE3dStage_directionalLight(){
   return this._directionalLight;
}
function FE3dStage_technique(){
   return this._technique;
}
function FE3dStage_selectTechnique(c, p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(c, p);
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
   o._scopeCd     = EScope.Local;
   o._looper      = null;
   o._renderables = null;
   o._thread      = null;
   o._interval    = 50;
   o._limit       = 16;
   o.onProcess   = FE3dStageConsole_onProcess;
   o.construct   = FE3dStageConsole_construct;
   o.process     = FE3dStageConsole_process;
   return o;
}
function FE3dStageConsole_onProcess(){
   var o = this;
   var s = o._looper;
   s.record();
   for(var i = o._limit - 1; i >= 0; i--){
      var r = s.next();
      if(r){
         r.processDelay();
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
var RE3dEngine = new function RE3dEngine(){
   var o = this;
   o._setuped = false;
   o.onSetup  = RE3dEngine_onSetup;
   o.setup    = RE3dEngine_setup;
   return o;
}
function RE3dEngine_onSetup(){
   var ec = RConsole.find(FG3dEffectConsole);
   ec.register('select.select.control', FG3dSelectAutomaticEffect);
   ec.register('select.select.automatic', FG3dSelectAutomaticEffect);
   ec.register('select.select.skeleton', FG3dSelectSkeletonEffect);
   ec.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
   ec.register('control.control.automatic', FG3dControlAutomaticEffect);
   ec.register('general.color.control', FG3dControlAutomaticEffect);
   ec.register('general.color.automatic', FE3dGeneralColorAutomaticEffect);
   ec.register('general.color.skeleton', FG3dGeneralColorSkeletonEffect);
   ec.register('general.color.skeleton.4', FG3dGeneralColorSkeletonEffect);
   ec.register('shadow.depth.automatic', FG3dShadowDepthAutomaticEffect);
   ec.register('shadow.depth.skeleton', FG3dShadowDepthSkeletonEffect);
   ec.register('shadow.color.automatic', FG3dShadowColorAutomaticEffect);
   ec.register('shadow.color.skeleton', FG3dShadowColorSkeletonEffect);
}
function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
function SE3sMaterialInfo(){
   var o = this;
   SG3dMaterialInfo.call(o);
   o.unserialize = SE3sMaterialInfo_unserialize;
   o.saveConfig  = SE3sMaterialInfo_saveConfig;
   return o;
}
function SE3sMaterialInfo_unserialize(p){
   var o = this;
   o.effectCode = p.readString();
   o.optionDepth = p.readBoolean();
   o.optionDouble = p.readBoolean();
   o.optionNormalInvert = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   o.optionAlpha = p.readBoolean();
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.optionColor = p.readBoolean();
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   o.optionAmbient = p.readBoolean();
   o.ambientColor.unserialize(p);
   o.optionDiffuse = p.readBoolean();
   o.diffuseColor.unserialize(p);
   o.optionDiffuseView = p.readBoolean();
   o.diffuseViewColor.unserialize(p);
   o.optionSpecular = p.readBoolean();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularLevel = p.readFloat();
   o.optionSpecularView = p.readBoolean();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewLevel = p.readFloat();
   o.optionReflect = p.readBoolean();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.optionRefract = p.readBoolean();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   o.optionOpacity = p.readBoolean();
   o.opacityColor.unserialize(p);
   o.opacityRate = p.readFloat();
   o.opacityAlpha = p.readFloat();
   o.opacityDepth = p.readFloat();
   o.opacityTransmittance = p.readFloat();
   o.optionEmissive = p.readBoolean();
   o.emissiveColor.unserialize(p);
}
function SE3sMaterialInfo_saveConfig(p){
   var o = this;
   p.set('effect_code', o.effectCode);
   p.setBoolean('option_double', o.optionDouble);
   p.setBoolean('option_alpha', o.optionAlpha);
   p.setBoolean('option_normal_invert', o.optionNormalInvert);
   p.setBoolean('option_shadow', o.optionShadow);
   p.setBoolean('option_shadow_self', o.optionShadowSelf);
   var x = p.create('Alpha');
   x.setBoolean('valid', o.optionAlpha);
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   var x = p.create('Color');
   x.setBoolean('valid', o.optionColor);
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('rate', o.colorRate);
   x.setFloat('merge', o.colorMerge);
   var x = p.create('Ambient')
   x.setBoolean('valid', o.optionAmbient);
   o.ambientColor.savePower(x);
   var x = p.create('Diffuse');
   x.setBoolean('valid', o.optionDiffuse);
   o.diffuseColor.savePower(x);
   var x = p.create('DiffuseView');
   x.setBoolean('valid', o.optionDiffuseView);
   o.diffuseViewColor.savePower(x);
   var x = p.create('Specular');
   x.setBoolean('valid', o.optionSpecular);
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   var x = p.create('SpecularView');
   x.setBoolean('valid', o.optionSpecularView);
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   var x = p.create('Reflect');
   x.setBoolean('valid', o.optionReflect);
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   var x = p.create('Refract')
   x.setBoolean('valid', o.optionRefract);
   o.refractFrontColor.savePower(x.create('Front'));
   o.refractBackColor.savePower(x.create('Back'));
   var x = p.create('Opacity')
   x.setBoolean('valid', o.optionOpacity);
   o.opacityColor.savePower(x);
   x.setFloat('rate', o.opacityRate);
   x.setFloat('alpha', o.opacityAlpha);
   x.setFloat('depth', o.opacityDepth);
   x.setFloat('transmittance', o.opacityTransmittance);
   var x = p.create('Emissive')
   x.setBoolean('valid', o.optionEmissive);
   o.emissiveColor.savePower(x);
}
function SE3sSceneShadow(){
   var o = this;
   o.base        = null;
   o.rate        = null;
   o.level       = null;
   o.range       = null;
   o.unserialize = SE3sSceneShadow_unserialize;
   return o;
}
function SE3sSceneShadow_unserialize(p){
   var o = this;
   o.base = p.readFloat();
   o.rate = p.readFloat();
   o.level = p.readFloat();
   o.range = p.readFloat();
}
function FE3sAnimation(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._model        = null;
   o._skeletonGuid = null;
   o._skeleton     = null;
   o._frameCount   = 0;
   o._frameTick    = 0;
   o._frameSpan    = 0;
   o._tracks       = null;
   o.skeletonGuid  = FE3sAnimation_skeletonGuid;
   o.skeleton      = FE3sAnimation_skeleton;
   o.tracks        = FE3sAnimation_tracks;
   o.unserialize   = FE3sAnimation_unserialize;
   return o;
}
function FE3sAnimation_skeletonGuid(){
   return this._skeletonGuid;
}
function FE3sAnimation_skeleton(){
   var o = this;
   var r = o._skeleton;
   if(!r){
      var g = o._skeletonGuid;
      if(g){
         r = o._skeleton = RConsole.find(FE3sModelConsole).findSkeleton(g);
      }
   }
   return r;
}
function FE3sAnimation_tracks(){
   return this._tracks;
}
function FE3sAnimation_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p)
   o._skeletonGuid = p.readString();
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   var ts = null;
   var c = p.readUint16();
   if(c > 0){
      ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FE3sTrack);
         t.unserialize(p);
         ts.push(t);
         if(k){
            var bi = t.boneIndex();
            var b = k.findBone(bi);
            b.setTrack(t);
         }
      }
   }
   if(ts && o._skeletonGuid){
      var k = o.skeleton();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         var b = k.findBone(t.boneIndex());
         b.setTrack(t);
      }
      k.pushAnimation(o);
   }
}
function FE3sBone(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._track      = null;
   o._bones      = null;
   o.index       = FE3sBone_index;
   o.track       = FE3sBone_track;
   o.setTrack    = FE3sBone_setTrack;
   o.bones       = FE3sBone_bones;
   o.unserialize = FE3sBone_unserialize;
   return o;
}
function FE3sBone_index(){
   return this._index;
}
function FE3sBone_track(){
   return this._track;
}
function FE3sBone_setTrack(p){
   this._track = p;
}
function FE3sBone_bones(){
   return this._bones;
}
function FE3sBone_unserialize(p){
   var o = this;
   o._index = p.readUint8();
   var c = p.readUint8();
   if(c > 0){
      var s = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBone);
         b.unserialize(p);
         s.push(b);
      }
   }
}
function FE3sBoneRefer(o){
   o = RClass.inherits(this, o, FObject);
   o._index      = null;
   o._bone       = null;
   o._track      = null;
   o.index       = FE3sBoneRefer_index;
   o.bone        = FE3sBoneRefer_bone;
   o.setBone     = FE3sBoneRefer_setBone;
   o.track       = FE3sBoneRefer_track;
   o.setTrack    = FE3sBoneRefer_setTrack;
   o.unserialize = FE3sBoneRefer_unserialize;
   return o;
}
function FE3sBoneRefer_index(){
   return this._index;
}
function FE3sBoneRefer_bone(){
   return this._bone;
}
function FE3sBoneRefer_setBone(p){
   this._bone = p;
}
function FE3sBoneRefer_track(){
   return this._track;
}
function FE3sBoneRefer_setTrack(p){
   this._track = p;
}
function FE3sBoneRefer_unserialize(p){
   var o = this;
   o._index = p.readUint8();
}
function FE3sDisplay(o){
   o = RClass.inherits(this, o, FObject);
   o._template       = null;
   o._typeName       = null;
   o._modelGuid      = null;
   o._meshGuid       = null;
   o._matrix         = null;
   o._activeMaterial = null;
   o._materials      = null;
   o.construct       = FE3sDisplay_construct;
   o.typeName        = FE3sDisplay_typeName;
   o.modelGuid       = FE3sDisplay_modelGuid;
   o.model           = FE3sDisplay_model;
   o.meshGuid        = FE3sDisplay_meshGuid;
   o.mesh            = FE3sDisplay_mesh;
   o.matrix          = FE3sDisplay_matrix;
   o.materials       = FE3sDisplay_materials;
   o.unserialize     = FE3sDisplay_unserialize;
   return o;
}
function FE3sDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3sDisplay_typeName(){
   return this._typeName;
}
function FE3sDisplay_modelGuid(){
   return this._modelGuid;
}
function FE3sDisplay_model(){
   return RConsole.find(FE3sModelConsole).findModel(this._modelGuid);
}
function FE3sDisplay_meshGuid(){
   return this._meshGuid;
}
function FE3sDisplay_mesh(){
   return RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
}
function FE3sDisplay_matrix(){
   return this._matrix;
}
function FE3sDisplay_materials(){
   return this._materials;
}
function FE3sDisplay_unserialize(p){
   var o = this;
   o._typeName = p.readString();
   o._modelGuid = p.readString();
   o._meshGuid = p.readString();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sDisplayMaterial);
         m._template = o._template;
         m.unserialize(p);
         s.push(m);
         if(o._activeMaterial == null){
            o._activeMaterial = m;
         }
      }
   }
}
function FE3sDisplayMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._groupGuid  = null;
   o.groupGuid   = FE3sDisplayMaterial_groupGuid;
   o.unserialize = FE3sDisplayMaterial_unserialize;
   return o;
}
function FE3sDisplayMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sDisplayMaterial_unserialize(p){
   var o = this;
   o._groupGuid = p.readString();
   o._material = o._template._activeTheme.findMaterial(o._groupGuid);
}
function FE3sFrame(o){
   o = RClass.inherits(this, o, FObject);
   o._tick        = 0;
   o._translation = null;
   o._quaternion  = null;
   o._scale       = null;
   o.construct    = FE3sFrame_construct;
   o.tick         = FE3sFrame_tick;
   o.translation  = FE3sFrame_translation;
   o.quaternion   = FE3sFrame_quaternion;
   o.scale        = FE3sFrame_scale;
   o.unserialize  = FE3sFrame_unserialize;
   return o;
}
function FE3sFrame_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._translation = new SPoint3();
   o._quaternion = new SQuaternion();
   o._scale = new SVector3();
}
function FE3sFrame_tick(){
   return this._tick;
}
function FE3sFrame_translation(){
   return this._translation;
}
function FE3sFrame_quaternion(){
   return this._quaternion;
}
function FE3sFrame_scale(){
   return this._scale;
}
function FE3sFrame_unserialize(p){
   var o = this;
   o._tick = p.readUint16();
   o._translation.unserialize(p);
   o._quaternion.unserialize(p);
   o._scale.unserialize(p);
}
function FE3sMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._groupGuid  = null;
   o._info       = null;
   o._textures   = null;
   o.construct   = FE3sMaterial_construct;
   o.groupGuid   = FE3sMaterial_groupGuid;
   o.group       = FE3sMaterial_group;
   o.effectCode  = FE3sMaterial_effectCode;
   o.info        = FE3sMaterial_info;
   o.textures    = FE3sMaterial_textures;
   o.unserialize = FE3sMaterial_unserialize;
   o.saveConfig  = FE3sMaterial_saveConfig;
   return o;
}
function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}
function FE3sMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sMaterial_group(){
   return RConsole.find(FE3sMaterialConsole).findGroup(this._groupGuid);
}
function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}
function FE3sMaterial_info(){
   return this._info;
}
function FE3sMaterial_textures(){
   return this._textures;
}
function FE3sMaterial_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._groupGuid = p.readString();
   o._info.unserialize(p);
   var c = p.readInt16();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FE3sMaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
function FE3sMaterial_saveConfig(p){
   var o = this;
   var mi = o._info;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
   p.set('option_alpha', mi.optionAlpha);
   p.set('option_double', mi.optionDouble);
   p.set('alpha_base', mi.alphaBase);
   p.set('alpha_rate', mi.alphaRate);
   p.set('ambient_color', mi.ambientColor.toString());
   p.set('diffuse_color', mi.diffuseColor.toString());
   p.set('specular_color', mi.specularColor.toString());
   p.set('specular_base', mi.specularBase);
   p.set('specular_level', mi.specularLevel);
   p.set('reflect_color', mi.reflectColor.toString());
   p.set('reflect_merge', mi.reflectMerge);
   p.set('emissive_color', mi.emissiveColor.toString());
}
function FE3sMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._materialGroups  = null;
   o._materials       = null;
   o.construct        = FE3sMaterialConsole_construct;
   o.findGroup        = FE3sMaterialConsole_findGroup;
   o.find             = FE3sMaterialConsole_find;
   o.unserializeGroup = FE3sMaterialConsole_unserializeGroup;
   o.unserialize      = FE3sMaterialConsole_unserialize;
   return o;
}
function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._materialGroups = new TDictionary();
   o._materials = new TDictionary();
}
function FE3sMaterialConsole_findGroup(p){
   return this._materialGroups.get(p);
}
function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}
function FE3sMaterialConsole_unserializeGroup(p){
   var o = this;
   var r = RClass.create(FE3sMaterialGroup);
   r.unserialize(p);
   o._materialGroups.set(r.guid(), r);
   return r;
}
function FE3sMaterialConsole_unserialize(p){
   var o = this;
   var r = RClass.create(FE3sMaterial);
   r.unserialize(p);
   o._materials.set(r.guid(), r);
   return r;
}
function FE3sMaterialGroup(o){
   o = RClass.inherits(this, o, FE3sObject);
   return o;
}
function FE3sMaterialTexture(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._textureGuid = null;
   o._bitmapGuid  = null;
   o.textureGuid  = FE3sMaterialTexture_textureGuid;
   o.bitmapGuid   = FE3sMaterialTexture_bitmapGuid;
   o.unserialize  = FE3sMaterialTexture_unserialize;
   return o;
}
function FE3sMaterialTexture_textureGuid(){
   return this._textureGuid;
}
function FE3sMaterialTexture_bitmapGuid(){
   return this._bitmapGuid;
}
function FE3sMaterialTexture_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._textureGuid = p.readString();
   o._bitmapGuid = p.readString();
}
function FE3sMesh(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._outline    = null;
   o._streams    = null;
   o._tracks     = null;
   o.construct   = FE3sMesh_construct;
   o.outline     = FE3sMesh_outline;
   o.streams     = FE3sMesh_streams;
   o.tracks      = FE3sMesh_tracks;
   o.unserialize = FE3sMesh_unserialize;
   return o;
}
function FE3sMesh_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._outline = new SOutline3();
}
function FE3sMesh_outline(){
   return this._outline;
}
function FE3sMesh_streams(){
   return this._streams;
}
function FE3sMesh_tracks(){
   return this._tracks;
}
function FE3sMesh_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._outline.unserialize(p);
   var c = p.readInt8();
   if(c > 0){
      var ss = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3sStream);
         s.unserialize(p)
         ss.push(s);
      }
   }
}
function FE3sModel(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._meshes        = null;
   o._skeletons     = null;
   o._animations    = null;
   o.findMeshByCode = FE3sModel_findMeshByCode;
   o.meshes         = FE3sModel_meshes;
   o.skeletons      = FE3sModel_skeletons;
   o.animations     = FE3sModel_animations;
   o.unserialize    = FE3sModel_unserialize;
   return o;
}
function FE3sModel_findMeshByCode(p){
   var s = this._meshes;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._code == p){
         return m;
      }
   }
   return null;
}
function FE3sModel_meshes(){
   return this._meshes;
}
function FE3sModel_skeletons(){
   return this._skeletons;
}
function FE3sModel_animations(){
   return this._animations;
}
function FE3sModel_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var mc = RConsole.find(FE3sModelConsole);
   mc.models().set(o.guid(), o);
   var c = p.readInt16();
   if(c > 0){
      var s = o._meshes = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialMesh(p));
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._skeletons = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialSkeleton(p));
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._animations = new TObjects();
      for(var i = 0; i < c; i++){
         s.push(mc.unserialAnimation(o, p));
      }
   }
   RLogger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
}
function FE3sModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._models           = null;
   o._meshs            = null;
   o._skeletons        = null;
   o._animations       = null;
   o._dataUrl          = '/cloud.content.model.wv';
   o.construct         = FE3sModelConsole_construct;
   o.findModel         = FE3sModelConsole_findModel;
   o.models            = FE3sModelConsole_models;
   o.findMesh          = FE3sModelConsole_findMesh;
   o.meshs             = FE3sModelConsole_meshs;
   o.findSkeleton      = FE3sModelConsole_findSkeleton;
   o.skeletons         = FE3sModelConsole_skeletons;
   o.findAnimation     = FE3sModelConsole_findAnimation;
   o.animations        = FE3sModelConsole_animations;
   o.unserialMesh      = FE3sModelConsole_unserialMesh;
   o.unserialSkeleton  = FE3sModelConsole_unserialSkeleton;
   o.unserialAnimation = FE3sModelConsole_unserialAnimation;
   o.load              = FE3sModelConsole_load;
   o.dispose           = FE3sModelConsole_dispose;
   return o;
}
function FE3sModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._skeletons = new TDictionary();
   o._animations = new TDictionary();
}
function FE3sModelConsole_findModel(p){
   return this._models.get(p);
}
function FE3sModelConsole_models(){
   return this._models;
}
function FE3sModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3sModelConsole_meshs(){
   return this._meshs;
}
function FE3sModelConsole_findSkeleton(p){
   return this._skeletons.get(p);
}
function FE3sModelConsole_skeletons(){
   return this._skeletons;
}
function FE3sModelConsole_findAnimation(p){
   return this._animations.get(p);
}
function FE3sModelConsole_animations(){
   return this._animations;
}
function FE3sModelConsole_unserialMesh(p){
   var o = this;
   var r = RClass.create(FE3sMesh);
   r.unserialize(p);
   o._meshs.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_unserialSkeleton(p){
   var o = this;
   var r = RClass.create(FE3sSkeleton);
   r.unserialize(p);
   o._skeletons.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_unserialAnimation(m, p){
   var o = this;
   var r = RClass.create(FE3sAnimation);
   r._model = m;
   r.unserialize(p);
   o._animations.set(r.guid(), r);
   return r;
}
function FE3sModelConsole_load(p){
   var o = this;
   var s = o._models;
   var m = s.get(p);
   if(!m){
      var v = RConsole.find(FE3sVendorConsole).find('model');
      var u = v.makeUrl(p);
      m = RClass.create(FE3sModel);
      m.setVendor(v);
      m.load(u);
      s.set(p, m);
   }
   return m;
}
function FE3sModelConsole_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   o.__base.FConsole.dispose.call(o);
}
function FE3sObject(o){
   o = RClass.inherits(this, o, FObject);
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   o.guid        = FE3sObject_guid;
   o.code        = FE3sObject_code;
   o.label       = FE3sObject_label;
   o.setLabel    = FE3sObject_setLabel;
   o.unserialize = FE3sObject_unserialize;
   o.saveConfig  = FE3sObject_saveConfig;
   return o;
}
function FE3sObject_guid(){
   return this._guid;
}
function FE3sObject_code(){
   return this._code;
}
function FE3sObject_label(){
   return this._label;
}
function FE3sObject_setLabel(p){
   this._label = p;
}
function FE3sObject_unserialize(p){
   var o = this;
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}
function FE3sObject_saveConfig(p){
   var o = this;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
}
function FE3sResource(o){
   o = RClass.inherits(this, o, FResource);
   o._dataReady   = false;
   o._dataSize    = 0;
   o._lsnsLoad    = null;
   o._vendor      = null;
   o.onLoad       = FE3sResource_onLoad;
   o.vendor       = FE3sResource_vendor;
   o.setVendor    = FE3sResource_setVendor;
   o.loadListener = FE3sResource_loadListener;
   o.testReady    = FE3sResource_testReady;
   o.unserialize  = FE3sResource_unserialize;
   o.saveConfig   = FE3sResource_saveConfig;
   o.load         = FE3sResource_load;
   o.dispose      = FE3sResource_dispose;
   return o;
}
function FE3sResource_onLoad(p){
   var o = this;
   var v = RClass.create(FDataView);
   v.setEndianCd(true);
   v.link(p.outputData());
   o.unserialize(v);
   v.dispose();
   o._dataReady = true;
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}
function FE3sResource_vendor(){
   return this._vendor;
}
function FE3sResource_setVendor(p){
   this._vendor = p;
}
function FE3sResource_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}
function FE3sResource_testReady(){
   return this._dataReady;
}
function FE3sResource_unserialize(p){
   var o = this;
   var f = true;
   if(o._vendor){
      f = o._vendor._optionFlag;
   }
   if(f){
      var r = p.readInt32();
      if(r != EResult.Success){
         var s = p.readString();
         throw new TError('Unserial resource failure.\n{1}', s);
      }
   }
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}
function FE3sResource_saveConfig(p){
   var o = this;
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
}
function FE3sResource_load(u){
   var o = this;
   var hc = RConsole.find(FHttpConsole);
   var c = hc.send(u);
   c.lsnsLoad.register(o, o.onLoad);
}
function FE3sResource_dispose(){
   var o = this;
   o._lsnsLoad = null;
   o._vendor = null;
   o.__base.FConsole.dispose.call(o);
}
function FE3sScene(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._themeGuid  = null;
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._layers     = null;
   o.construct   = FE3sScene_construct;
   o.technique   = FE3sScene_technique;
   o.region      = FE3sScene_region;
   o.layers      = FE3sScene_layers;
   o.unserialize = FE3sScene_unserialize;
   o.saveConfig  = FE3sScene_saveConfig;
   return o;
}
function FE3sScene_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
   o._technique = RClass.create(FE3sSceneTechnique);
   o._region = RClass.create(FE3sSceneRegion);
   o._layers = new TDictionary();
}
function FE3sScene_technique(){
   return this._technique;
}
function FE3sScene_region(){
   return this._region;
}
function FE3sScene_layers(){
   return this._layers;
}
function FE3sScene_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   o._themeGuid = p.readString();
   o._themeCode = p.readString();
   o._technique.unserialize(p);
   o._region.unserialize(p);
   var c = p.readInt16();
   for(var i = 0; i < c; i++){
      var l = RClass.create(FE3sSceneLayer);
      l.unserialize(p);
      o._layers.set(l.code(), l);
   }
}
function FE3sScene_saveConfig(p){
   var o = this;
   o.__base.FE3sResource.saveConfig.call(o, p);
   p.setName('Scene');
   p.set('theme_guid', o._themeGuid);
   p.set('theme_code', o._themeCode);
   var xls = p.create('LayerCollection');
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      var l = ls.value(i);
      l.saveConfig(xls.create('Layer'));
   }
}
function FE3sSceneCamera(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName    = null;
   o._centerFront = null;
   o._centerBack  = null;
   o._position    = null;
   o._direction   = null;
   o._focalNear   = null;
   o._focalFar    = null;
   o._projection  = null;
   o.construct    = FE3sSceneCamera_construct;
   o.typeName     = FE3sSceneCamera_typeName;
   o.position     = FE3sSceneCamera_position;
   o.direction    = FE3sSceneCamera_direction;
   o.projection   = FE3sSceneCamera_projection;
   o.unserialize  = FE3sSceneCamera_unserialize;
   return o;
}
function FE3sSceneCamera_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._projection = RClass.create(FE3sSceneProjection);
}
function FE3sSceneCamera_typeName(){
   return this._typeName;
}
function FE3sSceneCamera_position(){
   return this._position;
}
function FE3sSceneCamera_direction(){
   return this._direction;
}
function FE3sSceneCamera_projection(){
   return this._projection;
}
function FE3sSceneCamera_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._position.unserialize(p);
   o._direction.unserialize(p);
   o._projection.unserialize(p);
}
function FE3sSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scenes     = null;
   o._venderCode = 'scene';
   o._serviceUrl = '/cloud.content.scene.ws'
   o._dataUrl    = '/cloud.content.scene.wv'
   o.construct   = FE3sSceneConsole_construct;
   o.load        = FE3sSceneConsole_load;
   o.update      = FE3sSceneConsole_update;
   return o;
}
function FE3sSceneConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._scenes = new TDictionary();
}
function FE3sSceneConsole_load(p){
   var o = this;
   var s = o._scenes;
   var r = s.get(p);
   if(r == null){
      var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
      var u = v.makeUrl(p);
      r = RClass.create(FE3sScene);
      r.setVendor(v);
      r.load(u);
      s.set(p, r);
   }
   return r;
}
function FE3sSceneConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=updateTheme&date=' + RDate.format());
   var xc = RConsole.find(FXmlConsole);
   var r = xc.send(u, p);
}
function FE3sSceneDisplay(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._templateGuid        = null;
   o._optionMergeVertex   = null;
   o._optionMergeMaterial = null;
   o._matrix              = null;
   o._movies              = null;
   o._materials           = null;
   o._renderables         = null;
   o.construct            = FE3sSceneDisplay_construct;
   o.templateGuid         = FE3sSceneDisplay_templateGuid;
   o.matrix               = FE3sSceneDisplay_matrix;
   o.movies               = FE3sSceneDisplay_movies;
   o.materials            = FE3sSceneDisplay_materials;
   o.renderables          = FE3sSceneDisplay_renderables;
   o.unserialize          = FE3sSceneDisplay_unserialize;
   o.saveConfig           = FE3sSceneDisplay_saveConfig;
   return o;
}
function FE3sSceneDisplay_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3sSceneDisplay_templateGuid(){
   return this._templateGuid;
}
function FE3sSceneDisplay_matrix(){
   return this._matrix;
}
function FE3sSceneDisplay_movies(){
   return this._movies;
}
function FE3sSceneDisplay_materials(){
   return this._materials;
}
function FE3sSceneDisplay_renderables(){
   return this._renderables;
}
function FE3sSceneDisplay_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._templateGuid = p.readString();
   o._matrix.unserialize(p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sSceneMovie);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._materials = new TObjects();
      for(var i = 0; i < c; i++){
         var m = RClass.create(FE3sSceneMaterial);
         m.unserialize(p);
         s.push(m);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var r = RClass.create(FE3sTemplateRenderable);
         r.unserialize(p);
         s.push(r);
      }
   }
}
function FE3sSceneDisplay_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   o._matrix.saveConfig(p.create('Matrix'));
   var xs = p.create('MaterialCollection');
   var s = o._materials;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xs.create('Material'));
      }
   }
}
function FE3sSceneLayer(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._displays   = null;
   o.displays    = FE3sSceneLayer_displays;
   o.unserialize = FE3sSceneLayer_unserialize;
   o.saveConfig  = FE3sSceneLayer_saveConfig;
   return o;
}
function FE3sSceneLayer_displays(){
   return this._displays;
}
function FE3sSceneLayer_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FE3sSceneDisplay);
         d.unserialize(p);
         s.push(d);
      }
   }
}
function FE3sSceneLayer_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   var xds = p.create('DisplayCollection');
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).saveConfig(xds.create('Display'));
      }
   }
}
function FE3sSceneLight(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._typeName           = null;
   o._optionTrack        = null;
   o._shadow1            = null;
   o._shadow2            = null;
   o._shadow3            = null;
   o._shadowAmbientMin   = null;
   o._shadowAmbientMax   = null;
   o._shadowAmbientThick = null;
   o._shadowAmbientRange = null;
   o._shadowMerge1Base   = null;
   o._shadowMerge1Rate   = null;
   o._shadowMerge2Base   = null;
   o._shadowMerge2Rate   = null;
   o._material           = null;
   o._camera             = null;
   o.construct           = FE3sSceneLight_construct;
   o.typeName            = FE3sSceneLight_typeName;
   o.material            = FE3sSceneLight_material;
   o.camera              = FE3sSceneLight_camera;
   o.unserialize         = FE3sSceneLight_unserialize;
   return o;
}
function FE3sSceneLight_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._shadow1 = new SE3sSceneShadow();
   o._shadow2 = new SE3sSceneShadow();
   o._shadow3 = new SE3sSceneShadow();
   o._material = RClass.create(FE3sSceneMaterial);
   o._camera = RClass.create(FE3sSceneCamera);
}
function FE3sSceneLight_typeName(){
   return this._typeName;
}
function FE3sSceneLight_material(){
   return this._material;
}
function FE3sSceneLight_camera(){
   return this._camera;
}
function FE3sSceneLight_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._material.unserialize(p);
   o._camera.unserialize(p);
}
function FE3sSceneMap(o){
   o = RClass.inherits(this, o, FE3sSceneSpace);
   return o;
}
function FE3sSceneMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._groupGuid          = null;
   o._info               = null;
   o._heightDepth        = null;
   o._surfaceRate        = null;
   o._surfaceReflect     = null;
   o._surfaceBright      = null;
   o._surfaceBrightLevel = null;
   o._surfaceCoarse      = null;
   o._surfaceCoarseLevel = null;
   o._surfaceMerge       = null;
   o._surfacePower       = null;
   o.construct           = FE3sSceneMaterial_construct;
   o.groupGuid           = FE3sSceneMaterial_groupGuid;
   o.info                = FE3sSceneMaterial_info;
   o.unserialize         = FE3sSceneMaterial_unserialize;
   o.saveConfig          = FE3sSceneMaterial_saveConfig;
   return o;
}
function FE3sSceneMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}
function FE3sSceneMaterial_groupGuid(){
   return this._groupGuid;
}
function FE3sSceneMaterial_info(){
   return this._info;
}
function FE3sSceneMaterial_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._groupGuid = p.readString();
   o._info.unserialize(p);
   o._textureCount = p.readInt16();
}
function FE3sSceneMaterial_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('group_guid', o._groupGuid);
   o._info.saveConfig(p);
}
function FE3sSceneMovie(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._interval   = null;
   o._rotation   = null;
   o.construct   = FE3sSceneMovie_construct;
   o.interval    = FE3sSceneMovie_interval;
   o.rotation    = FE3sSceneMovie_rotation;
   o.unserialize = FE3sSceneMovie_unserialize;
   return o;
}
function FE3sSceneMovie_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._rotation = new SVector3();
}
function FE3sSceneMovie_interval(){
   return this._interval;
}
function FE3sSceneMovie_rotation(){
   return this._rotation;
}
function FE3sSceneMovie_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._interval = p.readInt32();
   o._rotation.unserialize(p);
}
function FE3sSceneProjection(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._angle      = null;
   o._znear      = null;
   o._zfar       = null;
   o.angle       = FE3sSceneProjection_angle;
   o.znear       = FE3sSceneProjection_znear;
   o.zfar        = FE3sSceneProjection_zfar;
   o.unserialize = FE3sSceneProjection_unserialize;
   return o;
}
function FE3sSceneProjection_angle(){
   return this._angle;
}
function FE3sSceneProjection_znear(){
   return this._znear;
}
function FE3sSceneProjection_zfar(){
   return this._zfar;
}
function FE3sSceneProjection_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._angle = p.readFloat();
   o._znear = p.readFloat();
   o._zfar = p.readFloat();
}
function FE3sSceneRegion(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._optionBackground   = true;
   o._backgroundColor    = null;
   o._colorLevel         = null;
   o._fogNear            = null;
   o._fogFar             = null;
   o._fogRate            = null;
   o._fogAttenuation     = null;
   o._fogColor           = null;
   o._edgeRate           = null;
   o._edgeLevel          = null;
   o._edgeWidth          = null;
   o._edgeColor          = null;
   o._faceRange          = null;
   o._faceLimit          = null;
   o._faceRate           = null;
   o._camera             = null;
   o._light              = null;
   o.construct           = FE3sSceneRegion_construct;
   o.optionBackground    = FE3sSceneRegion_optionBackground;
   o.setOptionBackground = FE3sSceneRegion_setOptionBackground;
   o.backgroundColor     = FE3sSceneRegion_backgroundColor;
   o.camera              = FE3sSceneRegion_camera;
   o.light               = FE3sSceneRegion_light;
   o.unserialize         = FE3sSceneRegion_unserialize;
   return o;
}
function FE3sSceneRegion_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._backgroundColor = new SColor4();
   o._colorLevel = new SColor4();
   o._fogColor = new SColor4();
   o._edgeColor = new SColor4();
   o._camera = RClass.create(FE3sSceneCamera);
   o._light = RClass.create(FE3sSceneLight);
}
function FE3sSceneRegion_optionBackground(){
   return this._optionBackground;
}
function FE3sSceneRegion_setOptionBackground(p){
   this._optionBackground = p;
}
function FE3sSceneRegion_backgroundColor(){
   return this._backgroundColor;
}
function FE3sSceneRegion_camera(){
   return this._camera;
}
function FE3sSceneRegion_light(){
   return this._light;
}
function FE3sSceneRegion_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._backgroundColor.unserialize(p);
   o._camera.unserialize(p);
   o._light.unserialize(p);
}
function FE3sSceneRenderable(o){
   o = RClass.inherits(this, o, FE3sObject);
   o.unserialize = FE3sSceneRenderable_unserialize;
   return o;
}
function FE3sSceneRenderable_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
}
function FE3sSceneSky(o){
   o = RClass.inherits(this, o, FE3sSceneSpace);
   return o;
}
function FE3sSceneSpace(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._type       = null;
   o._displays   = null;
   o.displays    = FE3sSceneSpace_displays;
   o.unserialize = FE3sSceneSpace_unserialize;
   return o;
}
function FE3sSceneSpace_displays(){
   return this._displays;
}
function FE3sSceneSpace_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._type = p.readString();
   var c = p.readUint16();
   if(c > 0){
      var ds = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FE3sSceneDisplay);
         d.unserialize(p);
         ds.push(d);
      }
   }
}
function FE3sSceneTechnique(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._techniqueCode = null;
   o._passes        = null;
   o.passes         = FE3sSceneTechnique_passes;
   o.unserialize    = FE3sSceneTechnique_unserialize;
   o.saveConfig     = FE3sSceneTechnique_saveConfig;
   return o;
}
function FE3sSceneTechnique_passes(){
   return this._passes;
}
function FE3sSceneTechnique_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readInt16();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3sSceneTechniquePass);
         s.unserialize(p);
         ss.push(s);
      }
   }
}
function FE3sSceneTechnique_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   p.set('technique_code', o._techniqueCode);
}
function FE3sSceneTechniquePass(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._targetWidth  = null;
   o._targetHeight = null;
   o.targetWidth   = FE3sSceneTechniquePass_targetWidth;
   o.targetHeight  = FE3sSceneTechniquePass_targetHeight;
   o.unserialize   = FE3sSceneTechniquePass_unserialize;
   return o;
}
function FE3sSceneTechniquePass_targetWidth(){
   return this._targetWidth;
}
function FE3sSceneTechniquePass_targetHeight(){
   return this._targetHeight;
}
function FE3sSceneTechniquePass_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._targetWidth = p.readUint16();
   o._targetHeight = p.readUint16();
}
function FE3sSkeleton(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._bones        = null
   o._roots        = null
   o._skins        = null
   o._animations   = null
   o.findBone      = FE3sSkeleton_findBone;
   o.bones         = FE3sSkeleton_bones;
   o.roots         = FE3sSkeleton_roots;
   o.skins         = FE3sSkeleton_skins;
   o.animations    = FE3sSkeleton_animations;
   o.pushAnimation = FE3sSkeleton_pushAnimation;
   o.innerFilter   = FE3sSkeleton_innerFilter;
   o.unserialize   = FE3sSkeleton_unserialize;
   return o;
}
function FE3sSkeleton_findBone(p){
   return this._bones.get(p);
}
function FE3sSkeleton_bones(){
   return this._bones;
}
function FE3sSkeleton_roots(){
   return this._roots;
}
function FE3sSkeleton_skins(){
   return this._skins;
}
function FE3sSkeleton_animations(){
   return this._animations;
}
function FE3sSkeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TObjects();
   }
   r.push(p);
}
function FE3sSkeleton_innerFilter(p){
   var o = this;
   o._bones.set(p.index(), p);
   var bs = p.bones();
   if(bs){
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         o.innerFilter(b)
      }
   }
}
function FE3sSkeleton_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var s = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new TObjects();
      for(var i = 0; i < c; i++){
         var k = RClass.create(FE3sSkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
function FE3sSkeletonSkin(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._meshGuid    = null;
   o._streams     = null
   o._boneRefers  = null
   o.meshGuid    = FE3sSkeletonSkin_meshGuid;
   o.find        = FE3sSkeletonSkin_find;
   o.streams     = FE3sSkeletonSkin_streams;
   o.boneRefers  = FE3sSkeletonSkin_boneRefers;
   o.unserialize = FE3sSkeletonSkin_unserialize;
   return o;
}
function FE3sSkeletonSkin_meshGuid(){
   return this._meshGuid;
}
function FE3sSkeletonSkin_find(p){
   return this._streams.get(p);
}
function FE3sSkeletonSkin_streams(){
   return this._streams;
}
function FE3sSkeletonSkin_boneRefers(){
   return this._boneRefers;
}
function FE3sSkeletonSkin_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p)
   o._meshGuid = p.readString();
   var c = p.readUint8();
   if(c > 0){
      var s = o._streams = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FE3sStream);
         t.unserialize(p);
         s.push(t);
      }
   }
   var c = p.readUint8();
   if(c > 0){
      var s = o._boneRefers = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sBoneRefer);
         b.unserialize(p);
         s.push(b);
      }
   }
}
function FE3sStream(o){
   o = RClass.inherits(this, o, FObject);
   o._code             = null;
   o._elementDataCd    = 0;
   o._elementCount     = 0;
   o._elementNormalize = false;
   o._dataStride       = 0;
   o._dataCount        = 0;
   o._dataLength       = 0;
   o._data             = null;
   o._formatCd      = EG3dAttributeFormat.Unknown;
   o.name              = FE3sStream_name;
   o.formatCd          = FE3sStream_formatCd;
   o.unserialize       = FE3sStream_unserialize;
   o.dispose           = FE3sStream_dispose;
   return o;
}
function FE3sStream_name(){
   return this._name;
}
function FE3sStream_formatCd(){
   return this._formatCd;
}
function FE3sStream_unserialize(p){
   var o = this;
   o._code = p.readString();
   o._elementDataCd = p.readUint8();
   o._elementCount = p.readUint8();
   o._elementNormalize = p.readBoolean();
   var ds = o._dataStride = p.readUint8();
   var dc = o._dataCount = p.readInt32();
   var dl = o._dataLength = ds * dc;
   var d = o._data = new ArrayBuffer(dl);
   p.readBytes(d, 0, dl);
}
function FE3sStream_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
function FE3sTemplate(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._materialGroups = null;
   o._themes         = null;
   o._displays       = null;
   o._activeTheme    = null;
   o.materialGroups  = FE3sTemplate_materialGroups;
   o.themes          = FE3sTemplate_themes;
   o.displays        = FE3sTemplate_displays;
   o.unserialize     = FE3sTemplate_unserialize;
   return o;
}
function FE3sTemplate_materialGroups(){
   return this._materialGroups;
}
function FE3sTemplate_themes(){
   return this._themes;
}
function FE3sTemplate_displays(){
   return this._displays;
}
function FE3sTemplate_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var mc = RConsole.find(FE3sMaterialConsole);
   var c = p.readUint16();
   if(c > 0){
      var s = o._materialGroups = new TDictionary();
      for(var i = 0; i < c; i++){
         var g = mc.unserializeGroup(p);
         s.set(g.guid(), g);
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._themes = new TObjects();
      for(var i = 0; i < c; i++){
         var t = RClass.create(FE3sTemplateTheme);
         t.unserialize(p);
         s.push(t);
         if(o._activeTheme == null){
            o._activeTheme = t;
         }
      }
   }
   var c = p.readUint16();
   if(c > 0){
      var s = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FE3sDisplay);
         d._template = o;
         d.unserialize(p);
         s.push(d);
      }
   }
}
function FE3sTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templates  = null;
   o._serviceUrl = '/cloud.content.template.ws'
   o._dataUrl    = '/cloud.content.template.wv'
   o.construct   = FE3sTemplateConsole_construct;
   o.loadByGuid  = FE3sTemplateConsole_loadByGuid;
   o.loadByCode  = FE3sTemplateConsole_loadByCode;
   o.update      = FE3sTemplateConsole_update;
   return o;
}
function FE3sTemplateConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templates = new TDictionary();
}
function FE3sTemplateConsole_loadByGuid(p){
   var o = this;
   var s = o._templates;
   var t = s.get(p);
   if(t == null){
      var v = RConsole.find(FE3sVendorConsole).find('template');
      var u = v.makeUrl(p, '');
      t = RClass.create(FE3sTemplate);
      t.setVendor(v);
      t.load(u);
      s.set(p, t);
   }
   return t;
}
function FE3sTemplateConsole_loadByCode(p){
   var o = this;
   var s = o._templates;
   var t = s.get(p);
   if(t == null){
      var v = RConsole.find(FE3sVendorConsole).find('template');
      var u = v.makeUrl('', p);
      t = RClass.create(FE3sTemplate);
      t.load(u);
      s.set(p, t);
   }
   return t;
}
function FE3sTemplateConsole_update(p){
   var o = this;
   var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
   RConsole.find(FXmlConsole).send(u, p);
}
function FE3sTemplateTheme(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._materials   = null;
   o.findMaterial = FE3sTemplateTheme_findMaterial;
   o.materials    = FE3sTemplateTheme_materials;
   o.unserialize  = FE3sTemplateTheme_unserialize;
   return o;
}
function FE3sTemplateTheme_findMaterial(p){
   return this._materials.get(p);
}
function FE3sTemplateTheme_materials(){
   return this._materials;
}
function FE3sTemplateTheme_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   var c = p.readUint16();
   if(c > 0){
      var mc = RConsole.find(FE3sMaterialConsole);
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = mc.unserialize(p);
         s.set(m.groupGuid(), m);
      }
   }
}
function FE3sTexture(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._bitmaps     = null;
   o._bitmapPacks = null;
   o.construct    = FE3sTexture_construct;
   o.bitmaps      = FE3sTexture_bitmaps;
   o.bitmapPacks  = FE3sTexture_bitmapPacks;
   o.unserialize  = FE3sTexture_unserialize;
   o.dispose      = FE3sTexture_dispose;
   return o;
}
function FE3sTexture_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
}
function FE3sTexture_bitmaps(){
   return this._bitmaps;
}
function FE3sTexture_bitmapPacks(){
   return this._bitmapPacks;
}
function FE3sTexture_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmaps = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmap);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmapPacks = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmapPack);
         b._texture = o;
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
}
function FE3sTexture_dispose(){
   var o = this;
   o._bitmaps = RObject.free(o._bitmaps);
   o._bitmapPacks = RObject.free(o._bitmapPacks);
   o.__base.FE3sResource.dispose.call(o);
}
function FE3sTextureBitmap(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._packCode   = null;
   o.packCode    = FE3sTextureBitmap_packCode;
   o.unserialize = FE3sTextureBitmap_unserialize;
   return o;
}
function FE3sTextureBitmap_packCode(){
   return this._packCode;
}
function FE3sTextureBitmap_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._packCode = p.readString();
}
function FE3sTextureBitmapPack(o){
   o = RClass.inherits(this, o, FE3sObject);
   o._optionCompress = null;
   o._size           = null;
   o._data           = null;
   o._typeName       = null;
   o._formatName     = null;
   o.construct       = FE3sTextureBitmapPack_construct;
   o.optionCompress  = FE3sTextureBitmapPack_optionCompress;
   o.size            = FE3sTextureBitmapPack_size;
   o.data            = FE3sTextureBitmapPack_data;
   o.unserialize     = FE3sTextureBitmapPack_unserialize;
   o.dispose         = FE3sTextureBitmapPack_dispose;
   return o;
}
function FE3sTextureBitmapPack_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._size = new SSize2();
}
function FE3sTextureBitmapPack_optionCompress(){
   return this._optionCompress;
}
function FE3sTextureBitmapPack_size(){
   return this._size;
}
function FE3sTextureBitmapPack_data(){
   return this._data;
}
function FE3sTextureBitmapPack_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   o._typeName = p.readString();
   o._formatName = p.readString();
   o._size.width = p.readUint16();
   o._size.height = p.readUint16();
   if(o._typeName == 'flat'){
      var c = p.readInt32();
   }else if(o._typeName == 'cube'){
      o._data = new Array();
      for(var i = 0; i < 6; i++){
         var c = p.readInt32();
         var d = o._data[i] = new ArrayBuffer(c);
         p.readBytes(d, 0, c);
      }
   }else{
      throw new TError(o, 'Unserial texture failure ');
   }
}
function FE3sTextureBitmapPack_dispose(){
   var o = this;
   o._data = null;
   o.__base.FE3sObject.dispose.call(o);
}
function FE3sTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._textures  = null;
   o._dataUrl   = '/cloud.content.texture.wv';
   o.construct  = FE3sTextureConsole_construct;
   o.load       = FE3sTextureConsole_load;
   o.loadBitmap = FE3sTextureConsole_loadBitmap;
   o.dispose    = FE3sModelConsole_dispose;
   return o;
}
function FE3sTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._textures = new TDictionary();
}
function FE3sTextureConsole_load(p){
   var o = this;
   var s = o._textures;
   var t = s.get(p);
   if(!t){
      var v = RConsole.find(FE3sVendorConsole).find('texture');
      var u = v.makeUrl(p);
      t = RClass.create(FE3sTexture);
      t.setVendor(v);
      t.load(u);
      s.set(p, t);
   }
   return t;
}
function FE3sTextureConsole_loadBitmap(pg, pc, pf){
   var o = this;
   var v = RConsole.find(FE3sVendorConsole).find('texture.bitmap');
   var u = v.makeUrl(pg, pc, pf);
   var g = o._image = RClass.create(FImage);
   g.loadUrl(u);
   return g;
}
function FE3sTextureConsole_dispose(){
   var o = this;
   o._textures = RObject.free(o._textures);
   o.__base.FConsole.dispose.call(o);
}
function FE3sTheme(o){
   o = RClass.inherits(this, o, FE3sResource);
   o._materials  = null;
   o.materials   = FE3sTheme_materials;
   o.find        = FE3sTheme_find;
   o.unserialize = FE3sTheme_unserialize;
   return o;
}
function FE3sTheme_materials(){
   return this._materials;
}
function FE3sTheme_find(p){
   var ms = this._materials;
   return ms ? ms.get(p) : null;
}
function FE3sTheme_unserialize(p){
   var o = this;
   var c = p.readInt32();
   if(c > 0){
      var s = o._materials = new TDictionary();
      for(var n = 0; n < c; n++){
         var m = RClass.create(FE3sMaterial);
         m.unserialize(p);
         s.set(m.code(), m);
      }
   }
}
function FE3sThemeConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._path        = '/assets/theme/'
   o._activeTheme = null;
   o._themes      = null;
   o.construct    = FE3sThemeConsole_construct;
   o.activeTheme  = FE3sThemeConsole_activeTheme;
   o.find         = FE3sThemeConsole_find;
   o.select       = FE3sThemeConsole_select;
   return o;
}
function FE3sThemeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._themes = new TDictionary();
}
function FE3sThemeConsole_activeTheme(){
   return this._activeTheme;
}
function FE3sThemeConsole_find(p){
   var t = this._activeTheme;
   if(t == null){
      throw new TError('Active theme is empty.');
   }
   return t.find(p);
}
function FE3sThemeConsole_select(p){
   var o = this;
   var r = o._themes.get(p);
   if(r == null){
      var u = RBrowser.contentPath(o._path + p + '.ser');
      r = RClass.create(FE3sTheme);
      r.load(u);
      o._themes.set(p, r);
   }
   o._activeTheme = r;
   return r;
}
function FE3sTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._meshCode        = null;
   o._boneIndex       = 0;
   o._frameTick       = 0;
   o._matrix          = null;
   o._matrixInvert    = null;
   o._frameCount      = null;
   o._frames          = null;
   o.construct        = FE3sTrack_construct;
   o.boneIndex        = FE3sTrack_boneIndex;
   o.frameTick        = FE3sTrack_frameTick;
   o.matrix           = FE3sTrack_matrix;
   o.matrixInvert     = FE3sTrack_matrixInvert;
   o.frames           = FE3sTrack_frames;
   o.calculate        = FE3sTrack_calculate;
   o.unserialize      = FE3sTrack_unserialize;
   return o;
}
function FE3sTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._matrixInvert = new SMatrix3d();
}
function FE3sTrack_boneIndex(){
   return this._boneIndex;
}
function FE3sTrack_frameTick(){
   return this._frameTick;
}
function FE3sTrack_matrix(){
   return this._matrix;
}
function FE3sTrack_matrixInvert(){
   return this._matrixInvert;
}
function FE3sTrack_frames(){
   return this._frames;
}
function FE3sTrack_calculate(pi, pt){
   var o = this;
   var fc = o._frameCount;
   if(fc == 0){
      return false;
   }
   if(pt < 0){
      pt = -pt;
   }
   var ft = o._frameTick;
   var i = parseInt(pt / ft) % fc;
   var fs = o.frames();
   var cf = fs.get(i);
   var nf = null;
   if(i < fc -1){
      nf = fs.get(i + 1);
   }else{
      nf = fs.get(0);
   }
   pi.tick = pt;
   pi.rate = (pt % ft) / ft;
   pi.currentFrame = cf;
   pi.nextFrame = nf;
   return true;
}
function FE3sTrack_unserialize(p){
   var o = this;
   o._meshCode = p.readString();
   o._boneIndex = p.readUint8();
   o._frameTick = p.readUint16();
   o._matrix.unserialize(p);
   o._matrixInvert.assign(o._matrix);
   o._matrixInvert.invert();
   var c = p.readInt16();
   if(c > 0){
      o._frameCount = c;
      var fs = o._frames = new TObjects();
      for(var i = 0; i < c; i++){
         var f = RClass.create(FE3sFrame);
         f.unserialize(p)
         fs.push(f);
      }
   }
}
function FE3sVendor(o){
   o = RClass.inherits(this, o, FObject);
   o._optionFlag   = true;
   o._contentUrl   = null;
   o.optionFlag    = FE3sVendor_optionFlag;
   o.setOptionFlag = FE3sVendor_setOptionFlag;
   o.contentUrl    = FE3sVendor_contentUrl;
   o.setContentUrl = FE3sVendor_setContentUrl;
   o.makeUrl       = FE3sVendor_makeUrl;
   return o;
}
function FE3sVendor_optionFlag(p){
   return this._optionFlag;
}
function FE3sVendor_setOptionFlag(p){
   this._optionFlag = p;
}
function FE3sVendor_contentUrl(p){
   return this._contentUrl;
}
function FE3sVendor_setContentUrl(p){
   this._contentUrl = p;
}
function FE3sVendor_makeUrl(){
   var o = this;
   var u = o._contentUrl;
   var as = arguments;
   var ac = as.length;
   for(var i = 0; i < ac; i++){
      u = u.replace('{' + (i + 1) + '}', as[i]);
   }
   if(RRuntime.isDebug()){
      u += '&date=' + RDate.format();
   }
   return u;
}
function FE3sVendorConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._setuped     = false;
   o._vendors     = null;
   o.construct    = FE3sVendorConsole_construct;
   o.createVendor = FE3sVendorConsole_createVendor;
   o.register     = FE3sVendorConsole_register;
   o.find         = FE3sVendorConsole_find;
   o.setup        = FE3sVendorConsole_setup;
   return o;
}
function FE3sVendorConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._vendors = new TDictionary();
}
function FE3sVendorConsole_createVendor(f, u){
   var v = RClass.create(FE3sVendor);
   v.setOptionFlag(f);
   v.setContentUrl(u);
   return v;
}
function FE3sVendorConsole_register(n, p){
   this._vendors.set(n, p);
}
function FE3sVendorConsole_find(p){
   var o = this;
   if(!o._setuped){
      o.setup('net');
   }
   return this._vendors.get(p);
}
function FE3sVendorConsole_setup(p){
   var o = this;
   if(p == 'net'){
      o._vendors.set('texture.bitmap', o.createVendor(true, RBrowser.hostPath('/cloud.content.texture.bitmap.wv?guid={1}&code={2}')));
      o._vendors.set('texture', o.createVendor(true, RBrowser.hostPath('/cloud.content.texture.wv?guid={1}')));
      o._vendors.set('model', o.createVendor(true, RBrowser.hostPath('/cloud.content.model.wv?guid={1}')));
      o._vendors.set('template', o.createVendor(true, RBrowser.hostPath('/cloud.content.template.wv?guid={1}&code={2}')));
      o._vendors.set('scene', o.createVendor(true, RBrowser.hostPath('/cloud.content.scene.wv?code={1}')));
   }else if(p == 'local'){
      o._vendors.set('texture.bitmap', o.createVendor(false, RBrowser.contentPath('/ar3/texture/{1}/{2}.{3}')));
      o._vendors.set('texture', o.createVendor(false, RBrowser.contentPath('/ar3/texture/{1}.bin')));
      o._vendors.set('model', o.createVendor(false, RBrowser.contentPath('/ar3/model/{1}.bin')));
      o._vendors.set('template', o.createVendor(false, RBrowser.contentPath('/ar3/template/{1}.bin')));
      o._vendors.set('scene', o.createVendor(false, RBrowser.contentPath('/ar3/scene/{1}.bin')));
   }else{
      throw new TError(o, 'Unknown setup code. (code={1})', p);
   }
   o._setuped = true;
}
function SE3rPlayInfo(o){
   if(!o){o = this;}
   o.tick         = 0;
   o.playRate     = 1.0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
   o.matrix       = new SMatrix3d();
   o.update       = SE3rPlayInfo_update;
   return o;
}
function SE3rPlayInfo_update(){
   var o = this;
   var cf = o.currentFrame;
   if(cf == null){
      return false;
   }
   var nf = o.nextFrame;
   if(nf == null){
      return false;
   }
   var m = o.matrix;
   var ct = cf.translation();
   var cr = cf.quaternion();
   var cs = cf.scale();
   var r = o.rate;
   if((r > 0) && (r < 1)){
      o.translation.slerp(ct, nf.translation(), r);
      o.quaternion.slerp(cr, nf.quaternion(), r);
      o.scale.slerp(cs, nf.scale(), r);
      m.build(o.translation, o.quaternion, o.scale);
   }else{
      m.build(ct, cr, cs);
   }
   return true;
}
function FE3rAnimation(o){
   o = RClass.inherits(this, o, FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0;
   o._playRate    = 1.0;
   o._tracks      = null;
   o._resource    = null;
   o._playInfo    = null;
   o.construct    = FE3rAnimation_construct;
   o.findTrack    = FE3rAnimation_findTrack;
   o.tracks       = FE3rAnimation_tracks;
   o.resource     = FE3rAnimation_resource;
   o.loadResource = FE3rAnimation_loadResource;
   o.record       = FE3rAnimation_record;
   o.process      = RMethod.virtual(o, 'process');
   o.dispose      = FE3rAnimation_dispose;
   return o;
}
function FE3rAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._tracks = new TObjects();
   o._playInfo = new SE3rPlayInfo();
}
function FE3rAnimation_findTrack(p){
   var o = this;
   var ts = o._tracks;
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      if(t.boneIndex() == p){
         return t;
      }
   }
   return null;
}
function FE3rAnimation_tracks(){
   return this._tracks;
}
function FE3rAnimation_resource(){
   return this._resource;
}
function FE3rAnimation_loadResource(p){
   var o = this;
   o._resource = p;
   var rts = p.tracks();
   var c = rts.count();
   for(var i = 0; i < c; i++){
      var rt = rts.get(i);
      var t = RClass.create(FE3rTrack);
      t._animation = o;
      t.loadResource(rt);
      o._tracks.push(t);
   }
}
function FE3rAnimation_record(){
   var o = this;
   var t = RTimer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate * 3.0;
}
function FE3rAnimation_dispose(){
   var o = this;
   o._tracks = null;
   o._resource = null;
   o.__base.FObject.dispose.call(o);
}
function FE3rBitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.content.texture.bitmap.wv'
   o.construct = FE3rBitmapConsole_construct;
   o.bitmaps   = FE3rBitmapConsole_bitmaps;
   o.load      = FE3rBitmapConsole_load;
   return o;
}
function FE3rBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new TDictionary();
}
function FE3rBitmapConsole_bitmaps(){
   return this._bitmaps;
}
function FE3rBitmapConsole_load(pc, pg, pt){
   var o = this;
   var t = o._bitmaps.get(pg);
   if(t){
      return t;
   }
   var u = RBrowser.hostPath(o._dataUrl + '?code=' + pg);
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   if(RString.toLower(pt) == 'environment'){
      t = RClass.create(FE3rTextureCube);
   }else{
      t = RClass.create(FE3rTexture);
   }
   t._name = pg;
   t.linkGraphicContext(pc);
   t.load(u);
   o._bitmaps.set(pg, t);
   return t;
}
function FE3rBone(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix        = null
   o._boneResource  = null
   o._trackResource = null;
   o.construct      = FE3rBone_construct;
   o.matrix         = FE3rBone_matrix;
   o.trackResource  = FE3rBone_trackResource;
   o.loadResource   = FE3rBone_loadResource;
   o.update         = FE3rBone_update;
   o.dispose        = FE3rBone_dispose;
   return o;
}
function FE3rBone_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3rBone_matrix(){
   return this._matrix;
}
function FE3rBone_trackResource(){
   return this._trackResource;
}
function FE3rBone_loadResource(p){
   var o = this;
   o._boneResource = p;
   o._trackResource = p.track();
}
function FE3rBone_update(pi, pt){
   var o = this;
   var t = o._trackResource;
   t.calculate(pi, pt);
   pi.update();
   var m = o._matrix;
   m.assign(t.matrixInvert());
   m.append(pi.matrix);
}
function FE3rBone_dispose(){
   var o = this;
   o._boneResource = null;
   o._trackResource = null;
   o.__base.FG3dBone.dispose.call(o);
}
function FE3rDynamicMesh(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._optionMerge      = true;
   o._vertexPosition   = 0;
   o._vertexTotal      = 0;
   o._indexPosition    = 0;
   o._indexTotal       = 0;
   o._mergeRenderables = null;
   o.construct         = FE3rDynamicMesh_construct;
   o.mergeCount        = FE3rDynamicMesh_mergeCount;
   o.mergeRenderables  = FE3rDynamicMesh_mergeRenderables;
   o.syncVertexBuffer  = FE3rDynamicMesh_syncVertexBuffer;
   o.mergeRenderable   = FE3rDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer = FE3rDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer  = FE3rDynamicMesh_mergeIndexBuffer;
   o.build             = FE3rDynamicMesh_build;
   return o;
}
function FE3rDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._mergeRenderables = new TObjects();
}
function FE3rDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}
function FE3rDynamicMesh_mergeRenderables(){
   return this._mergeRenderables;
}
function FE3rDynamicMesh_syncVertexBuffer(p){
   var o = this;
   var r = p._resource;
   var rc = r._code;
   var b = o._vertexBuffers.get(rc);
   if(!b){
      var vt = o._vertexTotal;
      b = o._graphicContext.createVertexBuffer();
      b._name = rc;
      b._formatCd = p._formatCd;
      b._stride = p._stride;
      switch(p._formatCd){
         case EG3dAttributeFormat.Float2:
            b._data = new Float32Array(2 * vt);
            break;
         case EG3dAttributeFormat.Float3:
            b._data = new Float32Array(3 * vt);
            break;
         case EG3dAttributeFormat.Byte4:
         case EG3dAttributeFormat.Byte4Normal:
            b._data = new Uint8Array(4 * vt);
            break;
         default:
            throw new TError("Unknown code");
      }
      o._vertexBuffers.set(rc, b);
   }
   return b;
}
function FE3rDynamicMesh_mergeRenderable(p){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   var vc = p.vertexCount();
   var ic = p.indexBuffer().count();
   var mc = cp.mergeCount;
   if(o._mergeRenderables.count() >= mc){
      return false;
   }
   var vt = o._vertexTotal + vc;
   if(cp.optionIndex32){
      if(vt > RInteger.MAX_UINT32){
         return false;
      }
   }else{
      if(vt > RInteger.MAX_UINT16){
         return false;
      }
   }
   o._vertexTotal += vc;
   o._indexTotal += ic;
   o._mergeRenderables.push(p);
   return true;
}
function FE3rDynamicMesh_mergeVertexBuffer(r, bc, b, rs){
   var o = this;
   var vp = o._vertexPosition;
   var vd = b._data;
   var c = rs._dataCount;
   switch(bc){
      case 'position':
         var d = new Float32Array(rs._data);
         RFloat.copy(vd, 3 * vp, d, 0, 3 * c);
         break;
      case 'coord':
         var d = new Float32Array(rs._data);
         RFloat.copy(vd, 2 * vp, d, 0, 2 * c);
         break;
      case 'color':
      case "normal":
      case "binormal":
      case "tangent":
      case "bone_index":
      case "bone_weight":
         var d = new Uint8Array(rs._data);
         RByte.copy(vd, 4 * vp, d, 0, 4 * c);
         break;
      default:
         throw new TError("Unknown code");
   }
}
function FE3rDynamicMesh_mergeIndexBuffer(ir){
   var o = this;
   var vp = o._vertexPosition;
   var ip = o._indexPosition;
   var id = o._indexBuffer._data;
   var rd = new Uint16Array(ir._data);
   var rc = 3 * ir._dataCount;
   for(var i = 0; i < rc; i++){
      id[ip++] = vp + rd[i]
   }
}
function FE3rDynamicMesh_build(){
   var o = this;
   var gc = o._graphicContext;
   var gp = gc.capability();
   var vt = o._vertexTotal;
   var ft = o._indexTotal;
   var rs = o._mergeRenderables;
   var rc = rs.count();
   var rf = rs.first();
   o._material = rf._material;
   o._textures = rf._textures;
   var b = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
   b._name = 'instance';
   b._stride = 4;
   b._formatCd = EG3dAttributeFormat.Float1;
   var vdi = b._data = new Float32Array(vt);
   o._vertexBuffers.set(b._name, b);
   var b = o._indexBuffer = gc.createIndexBuffer();
   if(gp.optionIndex32){
      b._strideCd = EG3dIndexStride.Uint32;
      b._data = new Uint32Array(ft);
   }else{
      b._strideCd = EG3dIndexStride.Uint16;
      b._data = new Uint16Array(ft);
   }
   b._count = ft;
   for(var i = 0; i < rc; i++){
      var r = rs.getAt(i);
      var vc = r.vertexCount();
      var vbs = r.vertexBuffers();
      var vbc = vbs.count();
      for(var vbi = 0; vbi < vbc; vbi++){
         var vb = vbs.valueAt(vbi);
         var vbr = vb._resource;
         var vbrc = vbr._code
         var b = o.syncVertexBuffer(vb);
         o.mergeVertexBuffer(r, vbrc, b, vbr);
      }
      RFloat.fill(vdi, o._vertexPosition, vc, i);
      var ib = r.indexBuffer();
      var ic = ib.count();
      var ir = ib._resource;
      o.mergeIndexBuffer(ir);
      o._vertexPosition += vc;
      o._indexPosition += ic;
   }
   var vbs = o._vertexBuffers;
   var vbc = vbs.count();
   for(var vbi = 0; vbi < vbc; vbi++){
      var vb = vbs.valueAt(vbi);
      vb.upload(vb._data, vb._stride, vt);
      vb._data = null;
   }
   o._indexBuffer.upload(o._indexBuffer._data, ft);
   o._indexBuffer._data = null;
}
function FE3rDynamicModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._renderables      = null;
   o._meshes           = null;
   o._updateDate       = 0;
   o.construct         = FE3rDynamicModel_construct;
   o.createMesh        = FE3rDynamicModel_createMesh;
   o.renderables       = FE3rDynamicModel_renderables;
   o.meshes            = FE3rDynamicModel_meshes;
   o.pushRenderable    = FE3rDynamicModel_pushRenderable;
   o.build             = FE3rDynamicModel_build;
   o.update            = FE3rDynamicModel_update;
   return o;
}
function FE3rDynamicModel_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._renderables = new TObjects();
   o._meshes = new TObjects();
}
function FE3rDynamicModel_createMesh(){
   var o = this;
   var m = RClass.create(FE3rDynamicMesh);
   m.linkGraphicContext(o);
   o._meshes.push(m);
   return m;
}
function FE3rDynamicModel_renderables(){
   return this._renderables;
}
function FE3rDynamicModel_meshes(){
   return this._meshes;
}
function FE3rDynamicModel_pushRenderable(p){
   this._renderables.push(p);
}
function FE3rDynamicModel_build(){
   var o = this;
   var rs = o._renderables;
   var ms = o._meshes;
   var rc = rs.count();
   if(rc > 0){
      var mr = o.createMesh();
      for(var i = 0; i < rc; i++){
         var r = rs.getAt(i);
         if(!mr.mergeRenderable(r)){
            mr = o.createMesh();
            if(!mr.mergeRenderable(r)){
               throw new TError(o, 'Merge renderable failure.');
            }
         }
      }
   }
   var mc = ms.count();
   for(var i = 0; i < mc; i++){
      ms.getAt(i).build();
   }
}
function FE3rDynamicModel_update(p){
   var o = this;
   o._updateDate = RTimer.current();
}
function FE3rInstanceMesh(o){
   o = RClass.inherits(this, o, FE3rMesh);
   o._merges         = null;
   o.construct       = FE3rInstanceMesh_construct;
   o.mergeRenderable = FE3rInstanceMesh_mergeRenderable;
   o.build           = FE3rInstanceMesh_build;
   return o;
}
function FE3rInstanceMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._merges = new TObjects();
}
function FE3rInstanceMesh_mergeRenderable(p){
   this._merges.push(p);
}
function FE3rInstanceMesh_build(){
}
function FE3rMaterial(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._material        = null;
   o.construct        = FE3rMaterial_construct;
   o.findVertexBuffer = FE3rMaterial_findVertexBuffer;
   o.indexBuffer      = FE3rMaterial_indexBuffer;
   o.loadResource     = FE3rMaterial_loadResource;
   return o;
}
function FE3rMaterial_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rMaterial_findVertexBuffer(p){
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
function FE3rMaterial_indexBuffer(){
   return this._indexBuffer;
}
function FE3rMaterial_loadResource(p){
   var o = this;
   var c = o._context;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb._formatCd = rv.formatCd();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
   var materialCode = p.materialCode();
   var themeConsole = RConsole.find(FE3sThemeConsole);
   var material = o._material = themeConsole.find(materialCode);
   var textures = material.textures();
   var textureCount = textures.count();
   for(var n = 0; n < textureCount; n++){
      var texture = textures.get(n);
   }
}
function FE3rMesh(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._skins            = null;
   o._boneIds          = null;
   o._textures         = null;
   o.construct         = FE3rMesh_construct;
   o.testReady         = FE3rMesh_testReady;
   o.guid              = FE3rMesh_guid;
   o.vertexCount       = FE3rMesh_vertexCount;
   o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
   o.vertexBuffers     = FE3rMesh_vertexBuffers;
   o.indexBuffer       = FE3rMesh_indexBuffer;
   o.material          = FE3rMesh_material;
   o.skins             = FE3rMesh_skins;
   o.pushSkin          = FE3rMesh_pushSkin;
   o.findTexture       = FE3rMesh_findTexture;
   o.textures          = FE3rMesh_textures;
   o.boneIds           = FE3rMesh_boneIds;
   o.resource          = FE3rMesh_resource;
   o.loadResource      = FE3rMesh_loadResource;
   return o;
}
function FE3rMesh_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rMesh_testReady(){
   var o = this;
   if(!o._ready){
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
      o._ready = true;
   }
   return o._ready;
}
function FE3rMesh_guid(){
   return this._resource.guid();
}
function FE3rMesh_vertexCount(){
   return this._vertexCount;
}
function FE3rMesh_findVertexBuffer(p){
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
function FE3rMesh_vertexBuffers(){
   return this._vertexBuffers;
}
function FE3rMesh_indexBuffer(){
   return this._indexBuffer;
}
function FE3rMesh_material(){
   return this._material;
}
function FE3rMesh_skins(){
   return this._skins;
}
function FE3rMesh_pushSkin(p){
   var o = this;
   var r = o._skins;
   if(!r){
      r = o._skins = new TObjects();
   }
   r.push(p);
}
function FE3rMesh_findTexture(p){
   return this._textures.get(p);
}
function FE3rMesh_textures(){
   return this._textures;
}
function FE3rMesh_boneIds(p){
   return this._boneIds;
}
function FE3rMesh_resource(){
   return this._resource;
}
function FE3rMesh_loadResource(p){
   var o = this;
   var c = o._graphicContext;
   o._resource = p;
   var rss = p.streams();
   var rsc = rss.count();
   for(var i = 0; i < rsc; i++){
      var rs = rss.get(i);
      var rc = rs._code;
      if((rc == 'index16') || (rc == 'index32')){
         var b = o._indexBuffer = c.createIndexBuffer();
         b._resource = rs;
         b.upload(rs._data, 3 * rs._dataCount);
      }else{
         var b = c.createVertexBuffer();
         b._name = rc;
         b._resource = rs;
         o._vertexCount = rs._dataCount;
         var d = null;
         switch(rc){
            case "position":
               d = new Float32Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Float3;
               break;
            case "coord":
               d = new Float32Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "color":
               d = new Uint8Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               d = new Uint8Array(rs._data);
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError("Unknown code");
         }
         b.upload(d, rs._dataStride, rs._dataCount);
         o._vertexBuffers.push(b);
      }
   }
}
function FE3rMeshAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rMeshAnimation_process;
   return o;
}
function FE3rMeshAnimation_process(p){
   var o = this;
   var ct = o._currentTick;
   var r = p._resource;
   var pi = o._playInfo;
   r.calculate(pi, ct);
   pi.update();
   var m = p._matrix;
   m.assign(r.matrixInvert());
   m.append(pi.matrix);
}
function FE3rModel(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._name                = null;
   o._resource            = null;
   o._meshes              = null;
   o._skeletons           = null;
   o._dataReady           = false;
   o.name                 = FE3rModel_name;
   o.setName              = FE3rModel_setName;
   o.findMeshByGuid       = FE3rModel_findMeshByGuid;
   o.geometrys            = FE3rModel_geometrys;
   o.resource             = FE3rModel_resource;
   o.resource             = FE3rModel_resource;
   o.setResource          = FE3rModel_setResource;
   o.testReady            = FE3rModel_testReady;
   o.loadResource         = FE3rModel_loadResource;
   o.loadSkeletonResource = FE3rModel_loadSkeletonResource;
   o.processLoad          = FE3rModel_processLoad;
   o.dispose              = FE3rModel_dispose;
   return o;
}
function FE3rModel_name(){
   return this._name;
}
function FE3rModel_setName(p){
   this._name = p;
}
function FE3rModel_findMeshByGuid(p){
   var o = this;
   var s = o._meshes;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var m = s.get(i);
      if(m._guid == p){
         return m;
      }
   }
   return null;
}
function FE3rModel_geometrys(){
   return this._meshes;
}
function FE3rModel_resource(){
   return this._resource;
}
function FE3rModel_setResource(p){
   this._resource = p;
}
function FE3rModel_testReady(){
   return this._dataReady;
}
function FE3rModel_loadSkeletonResource(p){
   var o = this;
   var rmc = RConsole.find(FE3rModelConsole);
   var ss = p.skins();
   if(ss){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.get(i);
         var rs = RClass.create(FE3rSkin);
         rs.linkGraphicContext(o);
         rs.loadResource(s)
         var m = rmc.findMesh(s.meshGuid());
         m.pushSkin(rs);
      }
   }
}
function FE3rModel_loadResource(p){
   var o = this;
   var rmc = RConsole.find(FE3rModelConsole);
   var rgs = p.meshes();
   if(rgs){
      var gs = o._meshes = new TObjects();
      var c = rgs.count();
      for(var i = 0; i < c; i++){
         var rg = rgs.get(i);
         var g = RClass.create(FE3rMesh);
         g.linkGraphicContext(o);
         g.loadResource(rg);
         gs.push(g);
         rmc.meshs().set(g.guid(), g);
      }
   }
   var rks = p.skeletons();
   if(rks){
      var c = rks.count();
      for(var i = 0; i < c; i++){
         var rk = rks.get(i);
         o.loadSkeletonResource(rk);
      }
   }
   o._dataReady = true;
}
function FE3rModel_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}
function FE3rModel_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._meshes = RObject.dispose(o._meshes);
   o._skeletons = RObject.dispose(o._skeletons);
   o.__base.FObject.dispose.call(o);
}
function FE3rModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._loadModels   = null;
   o._models       = null;
   o._meshs        = null;
   o._dynamicMeshs = null;
   o._thread       = null;
   o._interval     = 200;
   o.onProcess     = FE3rModelConsole_onProcess;
   o.construct     = FE3rModelConsole_construct;
   o.findModel     = FE3rModelConsole_findModel;
   o.models        = FE3rModelConsole_models;
   o.findMesh      = FE3rModelConsole_findMesh;
   o.meshs         = FE3rModelConsole_meshs;
   o.load          = FE3rModelConsole_load;
   o.merge         = FE3rModelConsole_merge;
   return o;
}
function FE3rModelConsole_onProcess(){
   var o = this;
   var s = o._loadModels;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3rModelConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   o._meshs = new TDictionary();
   o._dynamicMeshs = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rModelConsole_findModel(p){
   return this._models.get(p);
}
function FE3rModelConsole_models(){
   return this._models;
}
function FE3rModelConsole_findMesh(p){
   return this._meshs.get(p);
}
function FE3rModelConsole_meshs(){
   return this._meshs;
}
function FE3rModelConsole_load(pc, pn){
   var o = this;
   if(pc == null){
      throw new TError('Graphics context is empty');
   }
   if(RString.isEmpty(pn)){
      throw new TError('Model name is empty');
   }
   var m = o._models.get(pn);
   if(m){
      return m;
   }
   var rmc = RConsole.find(FE3sModelConsole);
   var rm = rmc.load(pn);
   m = RClass.create(FE3rModel);
   m.linkGraphicContext(pc);
   m.setName(pn);
   m.setResource(rm);
   o._models.set(pn, m);
   if(rm.testReady()){
      m.loadResource(rm);
   }else{
      o._loadModels.push(m);
   }
   return m;
}
function FE3rModelConsole_merge(pe, pg, pi, pc){
   var o = this;
   var f = 'merge';
   var rs = pg.renderables();
   for(var i = 0; i < pc; i++){
      var r = rs.getAt(pi + i);
      f += '|' + r.hashCode();
   }
   var md = o._dynamicMeshs.get(f);
   if(!md){
      md = RClass.create(FE3rDynamicModel);
      for(var i = 0; i < pc; i++){
         var r = rs.getAt(pi + i);
         md.pushRenderable(r);
      }
      md.linkGraphicContext(pg);
      md.build();
      o._dynamicMeshs.set(f, md);
   }
   md.update();
   return md;
}
function FE3rObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   return o;
}
function FE3rPipeline(o){
   o = RClass.inherits(this, o, FObject);
   o._vertexBuffers = null;
   o._indexBuffer   = null;
   o.construct        = FE3rPipeline_construct;
   o.findVertexBuffer = FE3rPipeline_findVertexBuffer;
   o.loadResource     = FE3rPipeline_loadResource;
   return o;
}
function FE3rPipeline_construct(){
   var o = this;
   o.__base.FRenderable.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FE3rPipeline_findVertexBuffer(p){
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
function FE3rPipeline_loadResource(p){
   var o = this;
   var c = o._context;
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
}
function FE3rSkeleton(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._resource    = null;
   o._bones       = null;
   o._skins       = null;
   o.resource     = FE3rSkeleton_resource;
   o.bones        = FE3rSkeleton_bones;
   o.skins        = FE3rSkeleton_skins;
   o.loadResource = FE3rSkeleton_loadResource;
   return o;
}
function FE3rSkeleton_resource(){
   return this._resource;
}
function FE3rSkeleton_bones(){
   return this._bones;
}
function FE3rSkeleton_skins(){
   return this._skins;
}
function FE3rSkeleton_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p._bones;
   var c = rs.count();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.value(i);
         var b = RClass.create(FE3rBone);
         b.loadResource(r);
         bs.push(b);
      }
   }
}
function FE3rSkeletonAnimation(o){
   o = RClass.inherits(this, o, FE3rAnimation);
   o.process = FE3rSkeletonAnimation_process;
   return o;
}
function FE3rSkeletonAnimation_process(p){
   var o = this;
   var ct = o._currentTick;
   var bs = p.bones();
   var c = bs.count();
   for(var i = 0; i < c; i++){
      bs.get(i).update(o._playInfo, ct);
   }
}
function FE3rSkin(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._resource    = null;
   o._streams     = null;
   o.resource     = FE3rSkin_resource;
   o.streams      = FE3rSkin_streams;
   o.loadResource = FE3rSkin_loadResource;
   return o;
}
function FE3rSkin_resource(){
   return this._resource;
}
function FE3rSkin_streams(){
   return this._streams;
}
function FE3rSkin_loadResource(p){
   var o = this;
   o._resource = p;
   var rs = p.streams();
   if(rs){
      var ss = o._streams = new TObjects();
      var c = rs.count();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FE3rStream);
         s.linkGraphicContext(o);
         s.loadResource(rs.get(i));
         ss.push(s);
      }
   }
}
function FE3rStream(o){
   o = RClass.inherits(this, o, FE3rObject);
   o._buffer      = null;
   o._resource    = null;
   o.resource     = FE3rStream_resource;
   o.buffer       = FE3rStream_buffer;
   o.loadResource = FE3rStream_loadResource;
   return o;
}
function FE3rStream_resource(){
   return this._resource;
}
function FE3rStream_buffer(){
   return this._buffer;
}
function FE3rStream_loadResource(p){
   var o = this;
   var c = p._code;
   o._resource = p;
   o._vertexCount = p._dataCount;
   var b = o._buffer = o._graphicContext.createVertexBuffer();
   b._name = c;
   b._resource = p;
   switch(c){
      case "bone_index":
         b._formatCd = EG3dAttributeFormat.Byte4;
         break;
      case "bone_weight":
         b._formatCd = EG3dAttributeFormat.Byte4Normal;
         break;
      default:
         throw new TError("Unknown code");
   }
   b.upload(p._data, p._dataStride, p._dataCount);
}
function FE3rTexture(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._bitmaps     = null;
   o._bitmapPacks = null;
   o._ready       = false;
   o._dataReady   = false;
   o.construct    = FE3rTexture_construct;
   o.resource     = FE3rTexture_resource;
   o.setResource  = FE3rTexture_setResource;
   o.bitmaps      = FE3rTexture_bitmaps;
   o.testReady    = FE3rTexture_testReady;
   o.loadBitmap   = FE3rTexture_loadBitmap;
   o.loadResource = FE3rTexture_loadResource;
   o.load         = FE3rTexture_load;
   o.processLoad  = FE3rTexture_processLoad;
   o.dispose      = FE3rTexture_dispose;
   return o;
}
function FE3rTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bitmaps = new TDictionary();
}
function FE3rTexture_resource(){
   return this._resource;
}
function FE3rTexture_setResource(p){
   this._resource = p;
}
function FE3rTexture_bitmaps(){
   return this._bitmaps;
}
function FE3rTexture_testReady(){
   return this._ready;
}
function FE3rTexture_loadBitmap(p){
   var o = this;
   var s = o._bitmaps;
   var b = s.get(p);
   if(!b){
      b = RClass.create(FE3rTextureBitmap);
      s.set(p, b);
   }
   return b;
}
function FE3rTexture_loadResource(p){
   var o = this;
   var rbps = p.bitmapPacks();
   if(rbps){
      var bps = o._bitmapPacks = new TDictionary();
      var c = rbps.count();
      for(var i = 0; i < c; i++){
         var rbp = rbps.valueAt(i);
         var bp = null;
         if(rbp._typeName == 'flat'){
            bp = RClass.create(FE3rTextureBitmapFlatPack);
         }else if(rbp._typeName == 'cube'){
            bp = RClass.create(FE3rTextureBitmapCubePack);
         }else{
            throw new TError(o, 'Load resource failure.');
         }
         bp.linkGraphicContext(o);
         bp.loadResource(rbp);
         o._bitmapPacks.set(rbp.code(), bp);
      }
   }
   o._dataReady = true;
}
function FE3rTexture_load(){
   var o = this;
   var r = o._resource;
   var rbs = r.bitmaps();
   for(var i = rbs.count() - 1; i >= 0; i--){
      var rb = rbs.valueAt(i);
      var b = o.loadBitmap(rb.guid());
      var bp = o._bitmapPacks.get(rb.packCode());
      if(!bp){
         throw new TError('Link pack is not eists.');
      }
      b.load(bp);
   }
   o._ready = true;
}
function FE3rTexture_processLoad(){
   var o = this;
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
   }else{
      var s = o._bitmapPacks;
      for(var i = s.count() - 1; i >= 0; i--){
         var b = s.valueAt(i);
         if(!b.testReady()){
            return false;
         }
      }
      o.load();
   }
   return o._ready;
}
function FE3rTexture_dispose(){
   var o = this;
   o._ready = false;
   o._resource = null;
   o._bitmaps = RObject.dispose(o._bitmaps);
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureBitmap(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._ready      = false;
   o._bitmapPack = null;
   o.construct   = FE3rTextureBitmap_construct;
   o.texture     = FE3rTextureBitmap_texture;
   o.testReady   = FE3rTextureBitmap_testReady;
   o.load        = FE3rTextureBitmap_load;
   o.dispose     = FE3rTextureBitmap_dispose;
   return o;
}
function FE3rTextureBitmap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rTextureBitmap_texture(){
   return this._bitmapPack.texture();
}
function FE3rTextureBitmap_testReady(){
   return this._ready;
}
function FE3rTextureBitmap_load(p){
   var o = this;
   o._bitmapPack = p;
   o._ready = true;
}
function FE3rTextureBitmap_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._bitmapPack = null;
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureBitmapCubePack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   o._resource    = null;
   o._images      = null;
   o.onLoad       = FE3rTextureBitmapCubePack_onLoad;
   o.construct    = FE3rTextureBitmapCubePack_construct;
   o.loadResource = FE3rTextureBitmapCubePack_loadResource;
   o.dispose      = FE3rTextureBitmapCubePack_dispose;
   return o;
}
function FE3rTextureBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   for(var i = 0; i < 6; i++){
      if(!is[i].testReady()){
         return;
      }
   }
   var t = o._texture = c.createCubeTexture();
   t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
   for(var i = 0; i < 6; i++){
      var m = is[i];
      window.URL.revokeObjectURL(m.url());
      is[i] = RObject.dispose(m);
   }
   o._images = RObject.dispose(o._images);
   o._dataReady = true;
}
function FE3rTextureBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
function FE3rTextureBitmapCubePack_loadResource(p){
   var o = this;
   o._resource = p;
   var d = p.data();
   var t = p._formatName;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var b = new Blob([d[i]], {type: 'image/' + t});
      var u = window.URL.createObjectURL(b);
      var g = o._images[i] = RClass.create(FImage);
      g.setOptionAlpha(false);
      g.loadUrl(u);
      g.addLoadListener(o, o.onLoad);
   }
}
function FE3rTextureBitmapCubePack_dispose(){
   var o = this;
   o._images = RObject.dispose(o._images);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
function FE3rTextureBitmapFlatPack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   o._resource    = null;
   o._image       = null;
   o.onLoad       = FE3rTextureBitmapFlatPack_onLoad;
   o.construct    = FE3rTextureBitmapFlatPack_construct;
   o.loadResource = FE3rTextureBitmapFlatPack_loadResource;
   o.dispose      = FE3rTextureBitmapFlatPack_dispose;
   return o;
}
function FE3rTextureBitmapFlatPack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   o._image = RObject.dispose(o._image);
   o._dataReady = true;
}
function FE3rTextureBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}
function FE3rTextureBitmapFlatPack_loadResource(p){
   var o = this;
   o._resource = p;
   var rt = p._texture;
   var c = p.code();
   var g = o._image = RConsole.find(FE3sTextureConsole).loadBitmap(rt._guid, c, p._formatName);
   g.addLoadListener(o, o.onLoad);
}
function FE3rTextureBitmapFlatPack_dispose(){
   var o = this;
   o._image = RObject.dispose(o._image);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
function FE3rTextureBitmapPack(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._resource    = null;
   o._image       = null;
   o._texture     = null;
   o._ready       = false;
   o._dataReady   = false;
   o.onLoad       = RMethod.virtual(o, 'onLoad');
   o.construct    = FE3rTextureBitmapPack_construct;
   o.texture      = FE3rTextureBitmapPack_texture;
   o.testReady    = FE3rTextureBitmapPack_testReady;
   o.loadResource = RMethod.virtual(o, 'loadResource');
   o.dispose      = FE3rTextureBitmapPack_dispose;
   return o;
}
function FE3rTextureBitmapPack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FE3rTextureBitmapPack_texture(){
   return this._texture;
}
function FE3rTextureBitmapPack_testReady(){
   var o = this;
   if(o._dataReady){
      o._ready = o._texture.isValid();
   }
   return o._ready;
}
function FE3rTextureBitmapPack_dispose(){
   var o = this;
   o._ready = false;
   o._dataReady = false;
   o.__base.FObject.dispose.call(o);
}
function FE3rTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd      = EScope.Local;
   o._loadTextures = null;
   o._bitmaps      = null;
   o._textures     = null;
   o._thread       = null;
   o._interval     = 200;
   o.onProcess     = FE3rTextureConsole_onProcess;
   o.construct     = FE3rTextureConsole_construct;
   o.bitmaps       = FE3rTextureConsole_bitmaps;
   o.textures      = FE3rTextureConsole_textures;
   o.load          = FE3rTextureConsole_load;
   o.loadBitmap    = FE3rTextureConsole_loadBitmap;
   return o;
}
function FE3rTextureConsole_onProcess(){
   var o = this;
   var s = o._loadTextures;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3rTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._loadTextures = new TLooper();
   o._bitmaps = new TDictionary();
   o._textures = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3rTextureConsole_bitmaps(){
   return this._bitmaps;
}
function FE3rTextureConsole_textures(){
   return this._textures;
}
function FE3rTextureConsole_load(pc, pt){
   var o = this;
   var t = o._textures.get(pt);
   if(t){
      return t;
   }
   var rc = RConsole.find(FE3sTextureConsole);
   var r = rc.load(pt);
   t = RClass.create(FE3rTexture);
   t.linkGraphicContext(pc);
   t.setResource(r);
   o._textures.set(pt, t);
   o._loadTextures.push(t);
   return t;
}
function FE3rTextureConsole_loadBitmap(pc, pt, pb){
   var o = this;
   var b = o._bitmaps.get(pb);
   if(b){
      return b;
   }
   var t = o.load(pc, pt);
   return t.loadBitmap(pb);
}
function FE3rTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._matrix      = null
   o._resource    = null;
   o.construct    = FE3rTrack_construct;
   o.matrix       = FE3rTrack_matrix;
   o.resource     = FE3rTrack_resource;
   o.loadResource = FE3rTrack_loadResource;
   o.dispose      = FE3rTrack_dispose;
   return o;
}
function FE3rTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
}
function FE3rTrack_matrix(){
   return this._matrix;
}
function FE3rTrack_resource(){
   return this._resource;
}
function FE3rTrack_loadResource(p){
   var o = this;
   o._resource = p;
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}
function FE3rTrack_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FG3dTrack.dispose.call(o);
}
function FE3dGeneralColorAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._code          = 'general.color.automatic';
   o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
   o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
   o.drawGroup      = FE3dGeneralColorAutomaticEffect_drawGroup;
   return o;
}
function FE3dGeneralColorAutomaticEffect_buildMaterial(f, p){
   var o = this;
   var m = p.material();
   var d = f.material;
   if(!d){
      d = f.material = RClass.create(FFloatStream);
      d.setLength(40);
      m._dirty = true;
   }
   if(m._dirty){
      var mi = m.info();
      d.reset();
      d.writeFloat4(mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      if(mi.optionAlpha){
         d.writeFloat4(mi.alphaBase, mi.alphaRate, 0, 0);
      }else{
         d.writeFloat4(mi.alphaBase, 1, 0, 0);
      }
      d.writeColor4(mi.ambientColor);
      d.writeColor4(mi.diffuseColor);
      d.writeColor4(mi.specularColor);
      d.writeFloat4(mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      d.writeColor4(mi.reflectColor);
      d.writeFloat4(0, 0, 1 - mi.reflectMerge, mi.reflectMerge);
      d.writeColor4(mi.emissiveColor);
      m._dirty = false;
   }
}
function FE3dGeneralColorAutomaticEffect_drawRenderable(pg, pr){
   var o = this;
   var c = o._graphicContext;
   var p = o._program;
   var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
   var vld = pg.calculate(EG3dRegionParameter.LightDirection);
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   if(pr._optionMerge){
      var ms = pr.mergeRenderables();
      var mc = ms.count();
      var d = RTypeArray.findTemp(EDataType.Float, 16 * mc);
      for(var i = 0; i < mc; i++){
         var m = ms.getAt(i);
         m.currentMatrix().writeData(d, 16 * i);
      }
      p.setParameter('vc_model_matrix', d);
   }else{
      p.setParameter('vc_model_matrix', pr.currentMatrix());
   }
   p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter('vc_camera_position', vcp);
   p.setParameter('vc_light_direction', vld);
   p.setParameter('fc_camera_position', vcp);
   p.setParameter('fc_light_direction', vld);
   if(o._supportMaterialMap){
      var i = pr._materialId;
      p.setParameter4('fc_material', 1/32, i/512, 0, 0);
   }else{
      var f = pr.activeInfo();
      o.buildMaterial(f, pr);
      p.setParameter('fc_materials', f.material.memory());
   }
   o.__base.FG3dAutomaticEffect.drawRenderable.call(o, pg, pr);
}
function FE3dGeneralColorAutomaticEffect_drawGroup(pg, pr, pi, pc){
   var o = this;
   if(pc > 1){
      var mc = RConsole.find(FE3rModelConsole);
      var md = mc.merge(o, pg, pi, pc);
      if(md){
         var e = null;
         var gc = o._graphicContext;
         var rs = md.meshes();
         var c = rs.count();
         var sn = pg.spaceName();
         for(var i = 0; i < c; i++){
            var r = rs.getAt(i);
            var f = r.selectInfo(sn);
            e = f.effect;
            if(!e){
               e = f.effect = RConsole.find(FG3dEffectConsole).find(gc, pg, r);
            }
         }
         return e.drawGroup(pg, rs, 0, c)
      }
   }
   o.__base.FG3dAutomaticEffect.drawGroup.call(o, pg, pr, pi, pc)
}
var EE3dScene = new function EE3dScene(){
   var o = this;
   o.Scene      = 'scene';
   o.Layer      = 'layer';
   o.Display    = 'display';
   o.Material   = 'material';
   o.Renderable = 'renderable';
   return o;
}
function FE3dBoundBox(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._outline              = null;
   o._rate                 = 0.2;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FE3dBoundBox_construct;
   o.outline               = FE3dBoundBox_outline;
   o.setup                 = FE3dBoundBox_setup;
   o.upload                = FE3dBoundBox_upload;
   return o;
}
function FE3dBoundBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._outline = new SOutline3();
}
function FE3dBoundBox_outline(){
   return this._outline;
}
function FE3dBoundBox_setup(){
   var o = this;
   var c = o._graphicContext;
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   o._vertexBuffers.set(vb._name, vb);
   var vd = new Uint8Array(4 * 32);
   for(var n = 4 * 32 - 1; n >= 0; n--){
      vd[n] = 0xFF;
   }
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vd, 1 * 4, 32);
   o._vertexBuffers.set(vb._name, vb);
   o._vertexCount = 32;
   var id = [
      00, 01, 00, 04, 00, 12,
      03, 02, 03, 05, 03, 13,
      08, 06, 08, 09, 08, 14,
      11, 07, 11, 10, 11, 15,
      20, 16, 20, 21, 20, 24,
      23, 17, 23, 22, 23, 25,
      28, 18, 28, 26, 28, 29,
      31, 19, 31, 27, 31, 30 ];
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib._lineWidth = 1;
   ib.upload(id, 48);
   o.update();
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dBoundBox_upload(){
   var o = this;
   var l = o._outline;
   var a = l.max;
   var ax = a.x;
   var ay = a.y;
   var az = a.z;
   var i = l.min;
   var ix = i.x;
   var iy = i.y;
   var iz = i.z;
   var r = o._rate;
   var cx = (ax - ix) * r;
   var cy = (ay - iy) * r;
   var cz = (az - iz) * r;
   var vd = [
      ix,       ay,      iz,
      ix + cx,  ay,      iz,
      ax - cx,  ay,      iz,
      ax,       ay,      iz,
      ix,       ay - cy, iz,
      ax,       ay - cy, iz,
      ix,       iy + cy, iz,
      ax,       iy + cy, iz,
      ix,       iy,      iz,
      ix + cx,  iy,      iz,
      ax - cx,  iy,      iz,
      ax,       iy,      iz,
      ix,       ay,      iz + cz,
      ax,       ay,      iz + cz,
      ix,       iy,      iz + cz,
      ax,       iy,      iz + cz,
      ix,       ay,      az - cz,
      ax,       ay,      az - cz,
      ix,       iy,      az - cz,
      ax,       iy,      az - cz,
      ix,       ay,      az,
      ix + cx,  ay,      az,
      ax - cx,  ay,      az,
      ax,       ay,      az,
      ix,       ay - cy, az,
      ax,       ay - cy, az,
      ix,       iy + cy, az,
      ax,       iy + cy, az,
      ix,       iy,      az,
      ix + cx,  iy,      az,
      ax - cx,  iy,      az,
      ax,       iy,      az];
   o._vertexPositionBuffer.upload(vd, 4 * 3, 32);
}
function FE3dCamera(o){
   o = RClass.inherits(this, o, FG3dPerspectiveCamera);
   o._rotation       = null;
   o._rotationMatrix = null;
   o._quaternion     = null;
   o._quaternionX    = null;
   o._quaternionY    = null;
   o._quaternionZ    = null;
   o.construct       = FE3dCamera_construct;
   o.rotation        = FE3dCamera_rotation;
   o.doPitch         = FE3dCamera_doPitch;
   o.doYaw           = FE3dCamera_doYaw;
   o.doRoll          = FE3dCamera_doRoll;
   o.update          = FE3dCamera_update;
   return o;
}
function FE3dCamera_construct(){
   var o = this;
   o.__base.FG3dPerspectiveCamera.construct.call(o);
   o._rotation = new SVector3();
   o._rotationMatrix = new SMatrix3x3();
   o._quaternion = new SQuaternion();
   o._quaternionX = new SQuaternion();
   o._quaternionY = new SQuaternion();
   o._quaternionZ = new SQuaternion();
}
function FE3dCamera_rotation(){
   return this._rotation;
}
function FE3dCamera_doPitch(p){
   this._rotation.x += p;
}
function FE3dCamera_doYaw(p){
   this._rotation.y += p;
}
function FE3dCamera_doRoll(p){
   this._rotation.z += p;
}
function FE3dCamera_update(){
   var o = this;
   var r = o._rotation;
   o._quaternionX.fromAxisAngle(RMath.vectorAxisX, r.x);
   o._quaternionY.fromAxisAngle(RMath.vectorAxisY, r.y);
   o._quaternionZ.fromAxisAngle(RMath.vectorAxisZ, r.z);
   var q = o._quaternion.identity();
   q.mul(o._quaternionX);
   q.mul(o._quaternionY);
   q.mul(o._quaternionZ);
   var m = o._rotationMatrix;
   m.build(q);
   var d = o._direction;
   m.transformPoint3(o._directionTarget, d);
   d.normalize();
   o.__base.FG3dPerspectiveCamera.update.call(o);
}
function FE3dCube(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup                = FE3dCube_setup;
   return o;
}
function FE3dCube_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0 ];
   o.vertexPositionBuffer = p.createVertexBuffer();
   o.vertexPositionBuffer.upload(vp, 4 * 3, 8);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0 ];
   o.vertexColorBuffer = p.createVertexBuffer();
   o.vertexColorBuffer.upload(vc, 4 * 4, 8);
   var id = [
      0, 1, 2, 0, 2, 3,
      1, 5, 6, 1, 6, 2,
      5, 4, 7, 5, 7, 6,
      4, 0, 3, 4, 3, 7,
      0, 4, 5, 0, 5, 1,
      3, 2, 6, 3, 6, 7  ];
   o.indexBuffer = context.createIndexBuffer();
   o.indexBuffer.upload(id, 36);
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dDimensional(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = FE3dDimensional_construct;
   o.setup                 = FE3dDimensional_setup;
   return o;
}
function FE3dDimensional_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._cellSize = new SSize2();
   o._cellSize.set(1, 1);
   o._size = new SSize2();
   o._size.set(16, 16);
}
function FE3dDimensional_setup(){
   var o = this;
   var c = o._graphicContext;
   var cw = o._cellSize.width;
   var ch = o._cellSize.height;
   var sw = o._size.width;
   var sw2 = sw / 2;
   var sh = o._size.height;
   var sh2 = sh / 2;
   var vc = 2 * ((sw + 2) + (sh + 2));
   var v = 0;
   var vi = 0;
   var vd = new Float32Array(3 * vc);
   var vci = 0;
   var vcd = new Uint8Array(4 * vc);
   var i = 0;
   var it = vc;
   var id = new Uint16Array(it);
   for(var y = 0; y <= sh; y++){
      var r = 1;
      if(y - sh2 == 0){
         r = 0
      }
      vd[v++] = cw * -sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      vd[v++] = cw * sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = cw * -sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = cw * sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   for(var x = 0; x <= sw; x++){
      var r = 1;
      if(x - sw2 == 0){
         r = 0
      }
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * - sh2 * r;
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * sh2 * r;
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * -sh2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * sh2;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   o._vertexCount = vc;
   var vb = o._vertexPositionBuffer = c.createVertexBuffer();
   vb._name = 'position';
   vb._formatCd = EG3dAttributeFormat.Float3;
   vb.upload(vd, 4 * 3, vc);
   o._vertexBuffers.set(vb._name, vb);
   var vb = o._vertexColorBuffer = c.createVertexBuffer();
   vb._name = 'color';
   vb._formatCd = EG3dAttributeFormat.Byte4Normal;
   vb.upload(vcd, 4, vc);
   o._vertexBuffers.set(vb._name, vb);
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib._fillMode = EG3dFillMode.Line;
   ib.upload(id, it);
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
function FE3dMeshRenderable(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._renderable      = null;
   o._activeSkin      = null;
   o._activeTrack     = null;
   o._bones           = null;
   o.renderable       = FE3dMeshRenderable_renderable;
   o.vertexCount      = FE3dMeshRenderable_vertexCount;
   o.indexBuffer      = FE3dMeshRenderable_indexBuffer;
   o.findTexture      = FE3dMeshRenderable_findTexture;
   o.textures         = FE3dMeshRenderable_textures;
   o.bones            = FE3dMeshRenderable_bones;
   o.process          = FE3dMeshRenderable_process;
   o.processDelay     = FE3dMeshRenderable_processDelay;
   o.update           = FE3dMeshRenderable_update;
   o.dispose          = FE3dMeshRenderable_dispose;
   return o;
}
function FE3dMeshRenderable_renderable(){
   return this._renderable;
}
function FE3dMeshRenderable_vertexCount(){
   return this._renderable.vertexCount();
}
function FE3dMeshRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FE3dMeshRenderable_findTexture(p){
   return this._textures.get(p);
}
function FE3dMeshRenderable_textures(){
   return this._textures;
}
function FE3dMeshRenderable_bones(p){
   return this._bones;
}
function FE3dMeshRenderable_process(p){
   var o = this;
   o.__base.FE3dRenderable.process.call(p)
   var t = o._activeTrack;
   if(t){
      if(o._display._optionPlay){
         var a = t._animation;
         if(a){
            a.process(t);
         }
      }
   }
}
function FE3dMeshRenderable_processDelay(){
   var o = this;
}
function FE3dMeshRenderable_update(p){
   var o = this;
   var d = o._display;
   var mm = o._matrix;
   var t = o._activeTrack;
   var m = o._calculateMatrix;
   if(t){
      m.assign(t.matrix());
      m.append(mm);
   }else{
      m.assign(mm);
   }
   if(d){
      var dm = o._display.currentMatrix();
      m.append(dm);
   }
   var c = o._currentMatrix.attachData(m.data());
   if(c){
      p.change();
   }
}
function FE3dMeshRenderable_dispose(){
   var o = this;
   var v = o._modelMatrix;
   if(v){
      v.dispose();
      o._modelMatrix = null;
   }
   var v = o._vertexBuffers;
   if(v){
      v.dispose();
      o._vertexBuffers = null;
   }
   o.__base.FE3dRenderable.dispose.call(o);
}
function FE3dModel(o){
   o = RClass.inherits(this, o, FDisplay3d);
   o._dataReady     = false;
   o._renderables   = null;
   o._animation     = null;
   o._geometrys     = null;
   o._renderable    = null;
   o.testReady      = FE3dModel_testReady;
   o.loadRenderable = FE3dModel_loadRenderable;
   o.processLoad    = FE3dModel_processLoad;
   o.process        = FE3dModel_process;
   return o;
}
function FE3dModel_testReady(){
   return this._dataReady;
}
function FE3dModel_loadRenderable(p){
   var o = this;
   var c = o._context;
   var r = p.resource();
   var rgs = p.geometrys();
   if(rgs){
      var c = rgs.count();
      if(c > 0){
         var gs = o._geometrys = new TObjects();
         var rs = o.renderables();
         for(var i = 0; i < c; i++){
            var rg = rgs.get(i);
            var g = RClass.create(FModelRenderable3d);
            g._display = o;
            g.load(rg);
            gs.push(g);
            rs.push(g);
         }
      }
   }
   o._dataReady = true;
}
function FE3dModel_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._renderable.testReady()){
      return false;
   }
   o.loadRenderable(o._renderable);
   return true;
}
function FE3dModel_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   if(o._animation){
      o._animation.process();
   }
   return true;
}
function FE3dModelConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._loadModels = null;
   o._models     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FE3dModelConsole_onProcess;
   o.construct   = FE3dModelConsole_construct;
   o.models      = FE3dModelConsole_models;
   o.alloc       = FE3dModelConsole_alloc;
   o.free        = FE3dModelConsole_free;
   return o;
}
function FE3dModelConsole_onProcess(){
   var o = this;
   var ms = o._loadModels;
   ms.record();
   while(ms.next()){
      var m = ms.current();
      if(m.processLoad()){
         ms.removeCurrent();
      }
   }
}
function FE3dModelConsole_construct(){
   var o = this;
   o._loadModels = new TLooper();
   o._models = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dModelConsole_models(){
   return this._models;
}
function FE3dModelConsole_alloc(pc, pn){
   var o = this;
   var ms = o._models.get(pn);
   if(ms){
      if(!ms.isEmpty()){
         return ms.pop();
      }
   }
   var rmc = RConsole.find(FE3rModelConsole);
   var rm = rmc.load(pc, pn);
   var m = RClass.create(FModel3d);
   m._context = pc;
   m._name = pn;
   m._modelName = pn;
   m._renderable = rm;
      o._loadModels.push(m);
   return m;
}
function FE3dModelConsole_free(p){
   var o = this;
   p.remove();
   var n = p._modelName;
   var ms = o._models.get(n);
   if(ms == null){
      ms = new TObjects();
      o._models.set(n, ms);
   }
   ms.push(p);
}
function FE3dModelRenderable(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   o.construct         = FE3dModelRenderable_construct;
   o.testVisible       = FE3dModelRenderable_testVisible;
   o.vertexCount       = FE3dModelRenderable_vertexCount;
   o.findVertexBuffer  = FE3dModelRenderable_findVertexBuffer;
   o.vertexBuffers     = FE3dModelRenderable_vertexBuffers;
   o.indexBuffer       = FE3dModelRenderable_indexBuffer;
   o.findTexture       = FE3dModelRenderable_findTexture;
   o.textures          = FE3dModelRenderable_textures;
   o.bones             = FE3dModelRenderable_bones;
   o.load              = FE3dModelRenderable_load;
   o.build             = FE3dModelRenderable_build;
   o.update            = FE3dModelRenderable_update;
   return o;
}
function FE3dModelRenderable_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
}
function FE3dModelRenderable_testVisible(p){
   var o = this;
   var r = o._ready;
   if(!r){
      var d = o._renderable;
      if(d){
         r = o._ready = d.testReady();
      }
   }
   return r;
}
function FE3dModelRenderable_vertexCount(){
   return this._renderable.vertexCount();
}
function FE3dModelRenderable_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
function FE3dModelRenderable_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
function FE3dModelRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}
function FE3dModelRenderable_findTexture(p){
   return this._renderable.findTexture(p);
}
function FE3dModelRenderable_textures(){
   return this._renderable.textures();
}
function FE3dModelRenderable_bones(p){
   return this._bones;
}
function FE3dModelRenderable_load(p){
   var o = this;
   var m = o._material;
   var mr = o._materialResource = p.material();
   if(mr){
      m.assignInfo(mr.info());
   }
   o._effectCode = m.info().effectCode;
   o._renderable = p;
}
function FE3dModelRenderable_build(p){
   var o = this;
   var r = o._renderable;
   var rbs = r.boneIds();
   if(rbs){
      var bs = o._bones = new TObjects();
      var c = rbs.length();
      for(var i = 0; i < c; i++){
         var bi = rbs.get(i);
         var b = p.findBone(bi);
         if(b == null){
            throw new TError("Bone is not exists. (bone_id={1})", bi);
         }
         bs.push(b);
      }
   }
}
function FE3dModelRenderable_update(p){
   var o = this;
   var m = o._display.matrix();
   o._matrix.assign(m);
}
function FE3dPolygon(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   return o;
}
function FE3dRectangle(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = null;
   o.setup                 = FE3dRectangle_setup;
   return o;
}
function FE3dRectangle_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0, -1.0, 0.0 ];
   o._vertexPositionBuffer = p.createVertexBuffer();
   o._vertexPositionBuffer.upload(vp, 4 * 3, 4);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0 ];
   o._vertexColorBuffer = p.createVertexBuffer();
   o._vertexColorBuffer.upload(vc, 4 * 4, 4);
   var id = [0, 1, 2, 0, 2, 3];
   o._indexBuffer = context.createIndexBuffer();
   o._indexBuffer.upload(id, 6);
}
function FE3dScene(o){
   o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
   o._dataReady            = false;
   o._resource             = null;
   o.construct             = FE3dScene_construct;
   o.createRegion          = FE3dScene_createRegion;
   o.resource              = FE3dScene_resource;
   o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = FE3dScene_loadRegionResource;
   o.loadDisplayResource   = FE3dScene_loadDisplayResource;
   o.loadLayerResource     = FE3dScene_loadLayerResource;
   o.loadResource          = FE3dScene_loadResource;
   o.processLoad           = FE3dScene_processLoad;
   o.active                = FE3dScene_active;
   o.deactive              = FE3dScene_deactive;
   return o;
}
function FE3dScene_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
}
function FE3dScene_createRegion(){
   return RClass.create(FE3dSceneRegion);
}
function FE3dScene_resource(p){
   return this._resource;
}
function FE3dScene_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}
function FE3dScene_loadRegionResource(p){
   var o = this;
   o._region.loadResource(p);
   var rc = p.camera();
   var rcv = rc.projection();
   var c = o._camera;
   c._resource = rc;
   var cp = c._projection;
   c.position().assign(rc.position());
   c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
   c.update();
   cp.size().assign(o._graphicContext.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar();
   cp.update();
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.projection();
   var l = o._directionalLight
   l._resource = rl;
   var lc = l._camera;
   var lp = lc._projection;
   lc.position().set(1, 1, -1);
   lc.lookAt(0, 0, 0);
   lc.position().assign(rlc.position());
   lc.update();
   lp.size().set(1024, 1024);
   lp._angle = 60;
   lp._znear = rlv.znear();
   lp._zfar = rlv.zfar();
   lp.update();
}
function FE3dScene_loadDisplayResource(pl, pd){
   var o = this;
   var d3 = RConsole.find(FE3dSceneConsole).factory().create(EE3dScene.Display);
   d3.linkGraphicContext(o);
   d3.loadSceneResource(pd);
   RConsole.find(FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
   pl.pushDisplay(d3);
}
function FE3dScene_loadLayerResource(p){
   var o = this;
   var l = RConsole.find(FE3dSceneConsole).factory().create(EE3dScene.Layer);
   l.loadResource(p);
   var s = p.displays();
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         o.loadDisplayResource(l, d);
      }
   }
   o.registerLayer(p.code(), l)
}
function FE3dScene_loadResource(p){
   var o = this;
   o.loadTechniqueResource(p.technique());
   o.loadRegionResource(p.region());
   var ls = p.layers();
   var c = ls.count();
   for(var i = 0; i < c; i++){
      var l = ls.value(i);
      o.loadLayerResource(l);
   }
}
function FE3dScene_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   o.processLoadListener(o);
   return true;
}
function FE3dScene_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
function FE3dScene_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
function FE3dSceneCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeScene           = null;
   o._captureStatus         = false;
   o._capturePosition       = null;
   o._captureCameraPosition = null;
   o._captureCameraRotation = null;
   o._actionFullScreen      = false;
   o._actionPlay            = false;
   o._actionMovie           = false;
   o._actionUp              = false;
   o._actionDown            = false;
   o._actionForward         = false;
   o._actionBack            = false;
   o._cameraMoveRate        = 0.8;
   o._cameraKeyRotation     = 0.03;
   o._cameraMouseRotation   = 0.005;
   o.onEnterFrame           = FE3dSceneCanvas_onEnterFrame;
   o.onMouseCaptureStart    = FE3dSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture         = FE3dSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop     = FE3dSceneCanvas_onMouseCaptureStop;
   o.onTouchStart           = FE3dSceneCanvas_onTouchStart;
   o.onTouchMove            = FE3dSceneCanvas_onTouchMove;
   o.onTouchStop            = FE3dSceneCanvas_onTouchStop;
   o.onSceneLoad            = FE3dSceneCanvas_onSceneLoad;
   o.onResize               = FE3dSceneCanvas_onResize;
   o.construct              = FE3dSceneCanvas_construct;
   o.load                   = FE3dSceneCanvas_load;
   o.switchPlay             = FE3dSceneCanvas_switchPlay;
   o.switchMovie            = FE3dSceneCanvas_switchMovie;
   o.doAction               = FE3dSceneCanvas_doAction;
   o.dispose                = FE3dSceneCanvas_dispose;
   return o;
}
function FE3dSceneCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var c = s.camera();
   var d = o._cameraMoveRate;
   var r = o._cameraKeyRotation;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if((kw && !ks) || o._actionForward){
      c.doWalk(d);
   }
   if((!kw && ks) || o._actionBack){
      c.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if((kq && !ke) || o._actionUp){
      c.doFly(d);
   }
   if((!kq && ke) || o._actionDown){
      c.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
function FE3dSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var r = o._activeScene.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._context, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureCameraRotation.assign(s.camera()._rotation);
}
function FE3dSceneCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeScene.camera();
   var r = c.rotation();
   var cr = o._captureCameraRotation;
   r.x = cr.x + cy * o._cameraMouseRotation;
   r.y = cr.y + cx * o._cameraMouseRotation;
}
function FE3dSceneCanvas_onMouseCaptureStop(p){
}
function FE3dSceneCanvas_onTouchStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var r = o._activeScene.region();
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      o._captureStatus = true;
      o._capturePosition.set(t.clientX, t.clientY);
      o._captureCameraPosition.assign(s.camera().position());
      o._captureCameraRotation.assign(s.camera().rotation());
   }
}
function FE3dSceneCanvas_onTouchMove(p){
   var o = this;
   if(!o._captureStatus){
      return;
   }
   var ts = p.touches;
   var c = ts.length;
   if(c == 1){
      p.preventDefault();
      var t = ts[0];
      var cm = o._activeScene.camera();
      var cr = cm.rotation();
      var cx = t.clientX - o._capturePosition.x;
      var cy = t.clientY - o._capturePosition.y;
      cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
      cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
   }
}
function FE3dSceneCanvas_onTouchStop(p){
   var o = this;
   o._captureStatus = false;
}
function FE3dSceneCanvas_onSceneLoad(p){
   var o = this;
   var c = o._context;
   var s = o._activeScene;
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   o.processLoadListener(o, s);
}
function FE3dSceneCanvas_onResize(p){
   var o = this;
   o.__base.FE3dCanvas.onResize.call(o, p);
   var c = o._context;
   var cs = c.size();
   var s = o._activeScene;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
function FE3dSceneCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
   o._captureCameraRotation = new SVector3();
}
function FE3dSceneCanvas_load(p){
   var o = this;
   var c = o._context;
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeScene != null){
      sc.free(o._activeScene);
   }
   var s = sc.alloc(o._context, p);
   s.addLoadListener(o, o.onSceneLoad);
   s.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeScene = s;
   RStage.register('stage3d', s);
}
function FE3dSceneCanvas_switchPlay(p){
   var o = this;
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
   o._actionPlay = p;
}
function FE3dSceneCanvas_switchMovie(p){
   var o = this;
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
   o._actionMovie = p;
}
function FE3dSceneCanvas_doAction(e, p, f){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   e.preventDefault();
   o._actionUp = false;
   o._actionDown = false;
   o._actionForward = false;
   o._actionBack = false;
   switch(p){
      case 'fullscreen':
         var v = o._actionFullScreen = !o._actionFullScreen;
         RHtml.fullscreen(o._hPanel, v);
         break;
      case 'play':
         o.switchMovie(!o._actionMovie);
         o.switchPlay(o._actionMovie);
         break;
      case 'up':
         o._actionUp = f;
         break;
      case 'down':
         o._actionDown = f;
         break;
      case 'forward':
         o._actionForward = f;
         break;
      case 'back':
         o._actionBack = f;
         break;
   }
}
function FE3dSceneCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FE3dCanvas.dispose.call(o);
}
function FE3dSceneConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd    = EScope.Local;
   o._factory    = null;
   o._loadScenes = null;
   o._scenes     = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = FE3dSceneConsole_onProcess;
   o.construct   = FE3dSceneConsole_construct;
   o.factory     = FE3dSceneConsole_factory;
   o.scenes      = FE3dSceneConsole_scenes;
   o.alloc       = FE3dSceneConsole_alloc;
   return o;
}
function FE3dSceneConsole_onProcess(){
   var o = this;
   var s = o._loadScenes;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3dSceneConsole_construct(){
   var o = this;
   o._loadScenes = new TLooper();
   o._scenes = new TDictionary();
   var f = o._factory = RClass.create(FClassFactory);
   f.register(EE3dScene.Scene, FE3dScene);
   f.register(EE3dScene.Layer, FE3dSceneLayer);
   f.register(EE3dScene.Display, FE3dSceneDisplay);
   f.register(EE3dScene.Material, FE3dSceneMaterial);
   f.register(EE3dScene.Renderable, FE3dSceneDisplayRenderable);
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dSceneConsole_factory(){
   return this._factory;
}
function FE3dSceneConsole_scenes(){
   return this._scenes;
}
function FE3dSceneConsole_alloc(pc, pn){
   var o = this;
   var rsc = RConsole.find(FE3sSceneConsole);
   var rs = rsc.load(pn);
   var s = RClass.create(FE3dScene);
   s.linkGraphicContext(pc);
   s._name = pn;
   s._resource = rs;
   s.setup();
   if(rs.testReady()){
      s.load(rs);
   }else{
      o._loadScenes.push(s);
   }
   return s;
}
function FE3dSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dTemplate);
   o._dataReady        = false;
   o._optionPlay       = false;
   o._optionMovie      = false;
   o._movieMatrix      = null;
   o._resourceScene    = null;
   o._materials        = null;
   o._movies           = null;
   o.construct         = FE3dSceneDisplay_construct;
   o.resourceScene     = FE3dSceneDisplay_resourceScene;
   o.loadSceneResource = FE3dSceneDisplay_loadSceneResource;
   o.loadResource      = FE3dSceneDisplay_loadResource;
   o.updateMatrix      = FE3dSceneDisplay_updateMatrix;
   return o;
}
function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dTemplate.construct.call(o);
   o._movieMatrix = new SMatrix3d();
}
function FE3dSceneDisplay_resourceScene(){
   return this._resourceScene;
}
function FE3dSceneDisplay_loadSceneResource(p){
   var o = this;
   var cf = RConsole.find(FE3dSceneConsole).factory();
   o._resourceScene = p;
   o._matrix.assign(p.matrix());
   var rms = p.materials();
   if(rms){
      var c = rms.count();
      var ms = o._materials = new TDictionary();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = cf.create(EE3dScene.Material);
         m._display = o;
         m.loadSceneResource(rm);
         ms.set(rm.groupGuid(), m);
      }
   }
   var rms = p.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FE3dSceneDisplayMovie);
         m.loadResource(rm);
         ms.push(m);
      }
   }
}
function FE3dSceneDisplay_loadResource(p){
   var o = this;
   var cf = RConsole.find(FE3dSceneConsole).factory();
   var ms = o._materials;
   var rds = p.displays();
   var c = rds.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         var r = cf.create(EE3dScene.Renderable);
         r._display = o;
         r.linkGraphicContext(o);
         r.loadResource(rd);
         o._meshRenderables.push(r);
         o.pushRenderable(r);
         var rdm = rd.materials().first();
         var m = ms.get(rdm.groupGuid());
         if(m){
            r.loadMaterial(m);
         }
      }
   }
}
function FE3dSceneDisplay_updateMatrix(p){
   var o = this;
   var m = o._currentMatrix.identity();
   var ms = o._movies;
   if(ms){
      if(o._optionMovie){
         var c = ms.count();
         for(var i = 0; i < c; i++){
            ms.get(i).process(o._movieMatrix);
         }
      }
      m.append(o._movieMatrix);
   }
   m.append(o._matrix);
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
}
function FE3dSceneDisplayMovie(o){
   o = RClass.inherits(this, o, FObject);
   o._resource    = null;
   o._interval    = null;
   o._firstTick   = 0;
   o._lastTick    = 0;
   o._matrix      = new SMatrix3d();
   o.loadResource = FE3dSceneDisplayMovie_loadResource;
   o.process      = FE3dSceneDisplayMovie_process;
   return o;
}
function FE3dSceneDisplayMovie_loadResource(p){
   var o = this;
   o._resource = p;
   o._interval = p._interval;
   o._matrix.setRotation(p._rotation.x, p._rotation.y * Math.PI / 180, p._rotation.z);
   o._matrix.update();
}
function FE3dSceneDisplayMovie_process(p){
   var o = this;
   if(o._firstTick == 0){
      o._firstTick = RTimer.current();
   }
   if(o._lastTick == 0){
      o._lastTick = RTimer.current();
   }
   var ct = RTimer.current();
   var sp = ct - o._lastTick;
   if(sp > o._interval){
      var c = o._resource.code();
      if(c == 'rotation'){
         p.append(o._matrix);
      }
      o._lastTick = ct;
   }
}
function FE3dSceneDisplayRenderable(o){
   o = RClass.inherits(this, o, FE3dTemplateRenderable);
   o._materialReference = null;
   o.materialReference  = FE3dSceneDisplayRenderable_materialReference;
   o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
   o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
   return o;
}
function FE3dSceneDisplayRenderable_materialReference(p){
   return this._materialReference;
}
function FE3dSceneDisplayRenderable_loadMaterial(p){
   var o = this;
   o._materialReference = p;
   o._material.calculate(p);
}
function FE3dSceneDisplayRenderable_reloadResource(){
   var o = this;
   var m = o._material;
   m.calculate(o._materialReference);
   m.update();
}
function FE3dSceneLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   o._resource    = null;
   o.resource     = FE3dSceneLayer_resource;
   o.loadResource = FE3dSceneLayer_loadResource;
   return o;
}
function FE3dSceneLayer_resource(){
   return this._resource;
}
function FE3dSceneLayer_loadResource(p){
   var o = this;
   o._resource = p;
}
function FE3dSceneMaterial(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._display          = null;
   o._resource         = null;
   o.groupGuid         = FE3dSceneMaterial_groupGuid
   o.resource          = FE3dSceneMaterial_resource;
   o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
   o.reload            = FE3dSceneMaterial_reload;
   return o;
}
function FE3dSceneMaterial_groupGuid(p){
   return this._resource.groupGuid();
}
function FE3dSceneMaterial_resource(p){
   return this._resource;
}
function FE3dSceneMaterial_loadSceneResource(p){
   var o = this;
   o._resource = p;
   o._info.assign(p.info());
}
function FE3dSceneMaterial_reload(p){
   var o = this;
   o._info.assign(o._resource.info());
}
function FE3dSceneRegion(o){
   o = RClass.inherits(this, o, FE3dRegion);
   o._resource      = null;
   o.construct      = FE3dSceneRegion_construct;
   o.resource       = FE3dSceneRegion_resource;
   o.loadResource   = FE3dSceneRegion_loadResource;
   o.reloadResource = FE3dSceneRegion_reloadResource;
   o.dispose        = FE3dSceneRegion_dispose;
   return o;
}
function FE3dSceneRegion_construct(){
   var o = this;
   o.__base.FE3dRegion.construct.call(o);
}
function FE3dSceneRegion_resource(){
   return this._resource;
}
function FE3dSceneRegion_loadResource(p){
   var o = this;
   o._resource = p;
   o.reloadResource();
}
function FE3dSceneRegion_reloadResource(){
   var o = this;
   var r = o._resource;
   var f = r.optionBackground();
   if(f){
      o._backgroundColor.assignPower(r.backgroundColor());
      o._backgroundColor.alpha = 1;
   }else{
      o._backgroundColor.set(0, 0, 0, 0);
   }
}
function FE3dSceneRegion_dispose(){
   var o = this;
   o._resource = null;
   o.__base.FE3dRegion.dispose.call(o);
}
function FE3dTemplate(o){
   o = RClass.inherits(this, o, FE3dDisplay, MGraphicObject, MListenerLoad);
   o._dataReady       = false;
   o._ready           = false;
   o._resource        = null;
   o._meshRenderables = null;
   o._skeletons       = null;
   o._animations      = null;
   o._resource        = null;
   o.construct        = FE3dTemplate_construct;
   o.testReady        = FE3dTemplate_testReady;
   o.findMeshByCode   = FE3dTemplate_findMeshByCode;
   o.meshRenderables  = FE3dTemplate_meshRenderables;
   o.skeletons        = FE3dTemplate_skeletons;
   o.pushSkeleton     = FE3dTemplate_pushSkeleton;
   o.findAnimation    = FE3dTemplate_findAnimation;
   o.animations       = FE3dTemplate_animations;
   o.pushAnimation    = FE3dTemplate_pushAnimation;
   o.resource         = FE3dTemplate_resource;
   o.setResource      = FE3dTemplate_setResource;
   o.loadSkeletons    = FE3dTemplate_loadSkeletons;
   o.linkAnimation    = FE3dTemplate_linkAnimation;
   o.loadAnimations   = FE3dTemplate_loadAnimations;
   o.loadResource     = FE3dTemplate_loadResource;
   o.reloadResource   = FE3dTemplate_reloadResource;
   o.processLoad      = FE3dTemplate_processLoad;
   o.process          = FE3dTemplate_process;
   o.dispose          = FE3dTemplate_dispose;
   return o;
}
function FE3dTemplate_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._meshRenderables = new TObjects();
}
function FE3dTemplate_testReady(){
   return this._dataReady;
}
function FE3dTemplate_findMeshByCode(p){
   var s = this._meshRenderables;
   for(var i = s.count() - 1; i >= 0; i--){
      var m = s.getAt(i);
      if(m._renderable._resource._code == p){
         return m;
      }
   }
   return null;
}
function FE3dTemplate_meshRenderables(){
   return this._meshRenderables;
}
function FE3dTemplate_skeletons(){
   return this._skeletons;
}
function FE3dTemplate_pushSkeleton(p){
   var o = this;
   var r = o._skeletons;
   if(!r){
      r = o._skeletons = new TDictionary();
   }
   if(!o._activeSkeleton){
      o._activeSkeleton = p;
   }
   r.set(p._resource.guid(), p);
}
function FE3dTemplate_findAnimation(p){
   var s = this._animations;
   return s ? s.get(p) : null;
}
function FE3dTemplate_animations(){
   return this._animations;
}
function FE3dTemplate_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TDictionary();
   }
   var pr = p.resource();
   r.set(pr.guid(), p);
}
function FE3dTemplate_resource(p){
   return this._resource;
}
function FE3dTemplate_setResource(p){
   this._resource = p;
}
function FE3dTemplate_loadSkeletons(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      var ks = o.skeletons();
      for(var i = 0; i < c; i++){
         var r = p.get(i);
         var s = RClass.create(FE3rSkeleton);
         s.loadResource(r);
         o.pushSkeleton(s);
      }
   }
}
function FE3dTemplate_linkAnimation(p){
   var o = this;
   var ts = p.tracks();
   var c = ts.count();
   for(var i = 0; i < c; i++){
      var t = ts.get(i);
      var mc = t._resource._meshCode;
      if(mc){
         var m = o.findMeshByCode(mc);
         m._activeTrack = t;
      }
   }
}
function FE3dTemplate_loadAnimations(p){
   var o = this;
   var c = p.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var r = p.get(i);
         var a = o.findAnimation(r.guid());
         if(a){
            continue;
         }
         var a = null;
         if(r.skeleton()){
            a = RClass.create(FE3rSkeletonAnimation);
         }else{
            a = RClass.create(FE3rMeshAnimation);
         }
         a.loadResource(r);
         o.pushAnimation(a);
      }
   }
}
function FE3dTemplate_loadResource(p){
   var o = this;
   var ds = p.displays();
   var c = ds.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         var r = RClass.create(FE3dTemplateRenderable);
         r._display = o;
         r.linkGraphicContext(o);
         r.loadResource(d);
         o._meshRenderables.push(r);
         o.pushRenderable(r);
      }
   }
}
function FE3dTemplate_reloadResource(){
   var o = this;
   var s = o._meshRenderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).reloadResource();
      }
   }
}
function FE3dTemplate_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._dataReady = true;
   }
   var s = o._meshRenderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         if(!s.get(i).testReady()){
            return false;
         }
      }
      for(var i = 0; i < c; i++){
         s.get(i).load();
      }
   }
   var as = o._animations;
   if(as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         var a = as.value(i);
         if(a.resource().skeleton() == null){
            o.linkAnimation(a);
         }
      }
   }
   o._ready = true;
   o.processLoadListener(o);
   return o._ready;
}
function FE3dTemplate_process(){
   var o = this;
   var as = o._animations;
   if(as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.value(i).record();
      }
   }
   o.__base.FE3dDisplay.process.call(o);
   var k = o._activeSkeleton;
   if(k && as){
      var c = as.count();
      for(var i = 0; i < c; i++){
         as.value(i).process(k);
      }
   }
}
function FE3dTemplate_dispose(){
   var o = this;
   o._meshRenderables = RObject.dispose(o._meshRenderables);
   o.__base.FE3dDisplay.dispose.call(o);
}
function FE3dTemplateCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   o._activeTemplate     = null;
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = FDsSceneCanvas_onEnterFrame;
   o.onMouseCaptureStart = FE3dTemplateCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FE3dTemplateCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FE3dTemplateCanvas_onMouseCaptureStop;
   o.onResize            = FE3dTemplateCanvas_onResize;
   o.onTemplateLoad      = FE3dTemplateCanvas_onTemplateLoad;
   o.construct           = FE3dTemplateCanvas_construct;
   o.build               = FE3dTemplateCanvas_build;
   o.load                = FE3dTemplateCanvas_load;
   o.setPanel            = FE3dTemplateCanvas_setPanel;
   o.dispose             = FE3dTemplateCanvas_dispose;
   return o;
}
function FE3dTemplateCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var c = s.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
function FE3dTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var r = o._activeTemplate.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._context, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
}
function FE3dTemplateCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeTemplate.camera();
   var r = c.rotation();
   var cr = o._captureRotation;
   r.x = cr.x + cy * 0.003;
   r.y = cr.y + cx * 0.003;
}
function FE3dTemplateCanvas_onMouseCaptureStop(p){
}
function FE3dTemplateCanvas_onResize(){
   var o = this;
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var hc = o._hCanvas;
   hc.width = w;
   hc.height = h;
   var c = o._context;
   c.setViewport(0, 0, w, h);
}
function FE3dTemplateCanvas_onTemplateLoad(p){
   var o = this;
   var c = o._context;
   var s = o._activeTemplate;
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   o.processLoadListener(o, s);
}
function FE3dTemplateCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureRotation = new SVector3();
}
function FE3dTemplateCanvas_build(p){
   var o = this;
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   var c = o._context = REngine3d.createContext(FWglContext, h);
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(1000 / 60);
   RWindow.lsnsResize.register(o, o.onResize);
   RConsole.find(FMouseConsole).register(o);
}
function FE3dTemplateCanvas_load(p){
   var o = this;
   var c = o._context;
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeTemplate != null){
      sc.free(o._activeTemplate);
   }
   var s = sc.alloc(o._context, p);
   s.addLoadListener(o, o.onTemplateLoad);
   s.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeTemplate = s;
   RStage.register('stage3d', s);
}
function FE3dTemplateCanvas_setPanel(p){
   var o = this;
   var c = o._context;
   var hc = o._hCanvas;
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   o.onResize();
}
function FE3dTemplateCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FObject.dispose.call(o);
}
function FE3dTemplateConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._loadTemplates = null;
   o._templates     = null;
   o._thread        = null;
   o._interval      = 200;
   o.onProcess      = FE3dTemplateConsole_onProcess;
   o.construct      = FE3dTemplateConsole_construct;
   o.allocByGuid    = FE3dTemplateConsole_allocByGuid;
   o.allocByCode    = FE3dTemplateConsole_allocByCode;
   o.loadByGuid     = FE3dTemplateConsole_loadByGuid;
   o.loadByCode     = FE3dTemplateConsole_loadByCode;
   o.free           = FE3dTemplateConsole_free;
   return o;
}
function FE3dTemplateConsole_onProcess(){
   var o = this;
   var s = o._loadTemplates;
   s.record();
   while(s.next()){
      var t = s.current();
      if(t.processLoad()){
         s.removeCurrent();
      }
   }
}
function FE3dTemplateConsole_construct(){
   var o = this;
   o._loadTemplates = new TLooper();
   o._templates = new TDictionary();
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}
function FE3dTemplateConsole_allocByGuid(c, n){
   var o = this;
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByGuid(n);
   var t = RClass.create(FE3dTemplate);
   t.linkGraphicContext(c);
   t.setName(n);
   t._resourceGuid = n;
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_allocByCode(c, n){
   var o = this;
   var ts = o._templates.get(n);
   if(ts){
      if(!ts.isEmpty()){
         return ts.pop();
      }
   }
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByCode(n);
   var t = RClass.create(FE3dTemplate);
   t.linkGraphicContext(c);
   t.setName(n);
   t._resourceGuid = n;
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_loadByGuid(t, p){
   var o = this;
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByGuid(p);
   t._resourceGuid = p;
   t.setName(p);
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_loadByCode(t, p){
   var o = this;
   var rc = RConsole.find(FE3sTemplateConsole);
   var r = rc.loadByCode(g, p);
   t._resourceGuid = g;
   t.setName(c);
   t.setResource(r);
   o._loadTemplates.push(t);
   return t;
}
function FE3dTemplateConsole_free(p){
   var o = this;
   p.remove();
   var n = p._resourceGuid;
   var s = o._templates.get(n);
   if(!s){
      s = new TObjects();
      o._templates.set(n, s);
   }
   s.push(p);
}
function FE3dTemplateRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable);
   o._ready            = false;
   o._resource         = null;
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   o.construct         = FE3dTemplateRenderable_construct;
   o.testReady         = FE3dTemplateRenderable_testReady;
   o.testVisible       = FE3dTemplateRenderable_testVisible;
   o.resource          = FE3dTemplateRenderable_resource;
   o.loadResource      = FE3dTemplateRenderable_loadResource;
   o.reloadResource    = FE3dTemplateRenderable_reloadResource;
   o.load              = FE3dTemplateRenderable_load;
   o.dispose           = FE3dTemplateRenderable_dispose;
   return o;
}
function FE3dTemplateRenderable_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}
function FE3dTemplateRenderable_testReady(){
   var o = this;
   if(!o._model.testReady()){
      return false;
   }
   var ts = o._textures;
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.value(i);
         if(!t.testReady()){
            return false;
         }
      }
   }
   return true;
}
function FE3dTemplateRenderable_testVisible(p){
   var o = this;
   return o._visible && o._ready;
}
function FE3dTemplateRenderable_resource(p){
   return this._resource;
}
function FE3dTemplateRenderable_loadResource(p){
   var o = this;
   o._resource = p;
   o._matrix.assign(p.matrix());
   o._model = RConsole.find(FE3rModelConsole).load(o._graphicContext, p.modelGuid());
   var mr = o._materialResource = p._activeMaterial._material;
   o._effectCode = mr.info().effectCode;
   o._material.calculate(mr);
   var rs = mr.textures();
   if(rs){
      var tc = RConsole.find(FE3rTextureConsole)
      var ts = o._textures = new TDictionary();
      var c = rs.count();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var t = tc.loadBitmap(o._graphicContext, r.textureGuid(), r.bitmapGuid());
         ts.set(r.code(), t);
      }
   }
}
function FE3dTemplateRenderable_reloadResource(){
   var o = this;
   var m = o._material;
   m.calculate(o._materialResource);
   m.update();
}
function FE3dTemplateRenderable_load(){
   var o = this;
   var d = o._display;
   var r = o._resource;
   var rd = r.model();
   var rds = rd.skeletons();
   if(rds){
      d.loadSkeletons(rds);
   }
   var rda = rd.animations();
   if(rda){
      d.loadAnimations(rda);
   }
   var rm = r.mesh();
   var rd = o._renderable = RConsole.find(FE3rModelConsole).findMesh(r.meshGuid());
   var vbs = rd._vertexBuffers;
   var c = vbs.count();
   for(var i = 0; i < c; i++){
      var vb = vbs.get(i);
      o._vertexBuffers.set(vb._name, vb);
   }
   var ss = rd.skins();
   if(ss){
      var dk = d._activeSkeleton;
      var k = o._activeSkin = ss.first();
      var ss = k.streams();
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.get(i);
         var vb = s.buffer();
         o._vertexBuffers.set(vb._name, vb);
      }
      var kr = k.resource();
      var brs = kr.boneRefers();
      var c = brs.count();
      if(c > 0){
         var bs = o._bones = new TObjects();
         for(var i = 0; i < c; i++){
            var br = brs.get(i);
            var b = dk.bones().get(br.index());
            if(b == null){
               throw new TError(o, 'Bone is not exist.');
            }
            bs.push(b);
         }
      }
   }
   o._ready = true;
}
function FE3dTemplateRenderable_dispose(){
   var o = this;
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
