MO.EDisplayTransform = new function EDisplayTransform(){
   var o = this;
   o.CameraPosition     = 'camera.position';
   o.CameraDirection    = 'camera.direction';
   o.BilboardedSphere   = 'bilboarded.sphere';
   o.BilboardedCylinder = 'bilboarded.cylinder';
   return o;
}
MO.EResourceCompress = new function EResourceCompress(){
   var o = this;
   o.None    = 'none';
   o.Deflate = 'deflate';
   o.Lzma    = 'lzma';
   return o;
}
MO.EStageKey = new function EStageKey(){
   var o = this;
   o.Forward       = MO.EKeyCode.W;
   o.Back          = MO.EKeyCode.S;
   o.Up            = MO.EKeyCode.Q;
   o.Down          = MO.EKeyCode.E;
   o.RotationLeft  = MO.EKeyCode.A;
   o.RotationRight = MO.EKeyCode.D;
   o.RotationUp    = MO.EKeyCode.Z;
   o.RotationDown  = MO.EKeyCode.X;
   o.FocusForward  = MO.EKeyCode.I;
   o.FocusBack     = MO.EKeyCode.K;
   o.FocusLeft     = MO.EKeyCode.J;
   o.FocusRight    = MO.EKeyCode.L;
   return o;
}
with(MO){
   MO.MListenerEnterFrame = function MListenerEnterFrame(o){
      o = RClass.inherits(this, o, MListener);
      o.addEnterFrameListener     = MListenerEnterFrame_addEnterFrameListener;
      o.removeEnterFrameListener  = MListenerEnterFrame_removeEnterFrameListener;
      o.processEnterFrameListener = MListenerEnterFrame_processEnterFrameListener;
      return o;
   }
   MO.MListenerEnterFrame_addEnterFrameListener = function MListenerEnterFrame_addEnterFrameListener(w, m){
      return this.addListener(EEvent.EnterFrame, w, m);
   }
   MO.MListenerEnterFrame_removeEnterFrameListener = function MListenerEnterFrame_removeEnterFrameListener(w, m){
      this.removeListener(EEvent.EnterFrame, w, m);
   }
   MO.MListenerEnterFrame_processEnterFrameListener = function MListenerEnterFrame_processEnterFrameListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.EnterFrame, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MListenerLeaveFrame = function MListenerLeaveFrame(o){
      o = RClass.inherits(this, o, MListener);
      o.addLeaveFrameListener     = MListenerLeaveFrame_addLeaveFrameListener;
      o.removeLeaveFrameListener  = MListenerLeaveFrame_removeLeaveFrameListener;
      o.processLeaveFrameListener = MListenerLeaveFrame_processLeaveFrameListener;
      return o;
   }
   MO.MListenerLeaveFrame_addLeaveFrameListener = function MListenerLeaveFrame_addLeaveFrameListener(w, m){
      return this.addListener(EEvent.LeaveFrame, w, m);
   }
   MO.MListenerLeaveFrame_removeLeaveFrameListener = function MListenerLeaveFrame_removeLeaveFrameListener(w, m){
      this.removeListener(EEvent.LeaveFrame, w, m);
   }
   MO.MListenerLeaveFrame_processLeaveFrameListener = function MListenerLeaveFrame_processLeaveFrameListener(p1, p2, p3, p4, p5){
      this.processListener(EEvent.LeaveFrame, p1, p2, p3, p4, p5);
   }
}
with(MO){
   MO.MRenderableLinker = function MRenderableLinker(o){
      o = RClass.inherits(this, o);
      o._renderable = MO.RClass.register(o, new AGetter('_renderable'));
      o.dispose     = MRenderableLinker_dispose;
      return o;
   }
   MO.MRenderableLinker_dispose = function MRenderableLinker_dispose(){
      var o = this;
      o._renderable = null;
   }
}
with(MO){
   MO.MResourceData = function MResourceData(o){
      o = RClass.inherits(this, o);
      o._ready          = false;
      o._guid           = null;
      o._index          = -1;
      o._compressData   = null;
      o._data           = null;
      o.compressData    = MResourceData_compressData;
      o.setCompressData = MResourceData_setCompressData;
      o.testReady       = MResourceData_testReady;
      o.completeData    = MResourceData_completeData;
      o.dispose         = MResourceData_dispose;
      return o;
   }
   MO.MResourceData_compressData = function MResourceData_compressData(){
      return this._compressData;
   }
   MO.MResourceData_setCompressData = function MResourceData_setCompressData(data){
      this._compressData = data;
   }
   MO.MResourceData_testReady = function MResourceData_testReady(){
      return this._ready;
   }
   MO.MResourceData_completeData = function MResourceData_completeData(data){
      var o = this;
      o._data = data;
      o._ready = true;
   }
   MO.MResourceData_dispose = function MResourceData_dispose(){
      var o = this;
      o._compressData = null;
      o._data = null;
   }
}
with(MO){
   MO.FDisplay = function FDisplay(o){
      o = RClass.inherits(this, o, FComponent, MGraphicObject);
      o._currentMatrix    = null;
      o._matrix           = null;
      o._location         = null;
      o._rotation         = null;
      o._scale            = null;
      o._visible          = true;
      o._renderables      = null;
      o.construct         = FDisplay_construct;
      o.currentMatrix     = FDisplay_currentMatrix;
      o.matrix            = FDisplay_matrix;
      o.location          = FDisplay_location;
      o.rotation          = FDisplay_rotation;
      o.scale             = FDisplay_scale;
      o.hasRenderable     = FDisplay_hasRenderable;
      o.renderables       = FDisplay_renderables;
      o.pushRenderable    = FDisplay_pushRenderable;
      o.removeRenderable  = FDisplay_removeRenderable;
      o.clearRenderables  = FDisplay_clearRenderables;
      o.push              = FDisplay_push;
      o.remove            = FDisplay_remove;
      o.filterDisplays    = FDisplay_filterDisplays;
      o.filterRenderables = FDisplay_filterRenderables;
      o.show              = FDisplay_show;
      o.hide              = FDisplay_hide;
      o.setVisible        = FDisplay_setVisible;
      o.update            = FDisplay_update;
      o.updateMatrix      = FDisplay_updateMatrix;
      o.process           = FDisplay_process;
      o.dispose           = FDisplay_dispose;
      return o;
   }
   MO.FDisplay_construct = function FDisplay_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      o._currentMatrix = new SMatrix3d();
      o._matrix = new SMatrix3d();
      o._location = new SPoint3();
      o._rotation = new SVector3();
      o._scale = new SVector3();
      o._scale.set(1, 1, 1);
   }
   MO.FDisplay_currentMatrix = function FDisplay_currentMatrix(){
      return this._currentMatrix;
   }
   MO.FDisplay_matrix = function FDisplay_matrix(){
      return this._matrix;
   }
   MO.FDisplay_location = function FDisplay_location(){
      return this._location;
   }
   MO.FDisplay_rotation = function FDisplay_rotation(){
      return this._rotation;
   }
   MO.FDisplay_scale = function FDisplay_scale(){
      return this._scale;
   }
   MO.FDisplay_hasRenderable = function FDisplay_hasRenderable(){
      var renderables = this._renderables;
      return renderables ? !renderables.isEmpty() : false;
   }
   MO.FDisplay_renderables = function FDisplay_renderables(){
      var o = this;
      var renderables = o._renderables;
      if(!renderables){
         renderables = o._renderables = new TObjects();
      }
      return renderables;
   }
   MO.FDisplay_pushRenderable = function FDisplay_pushRenderable(renderable){
      var o = this;
      renderable._display = o;
      o.renderables().push(renderable);
   }
   MO.FDisplay_removeRenderable = function FDisplay_removeRenderable(renderable){
      var renderables = this._renderables;
      if(renderables){
         renderables.remove(renderable);
      }
   }
   MO.FDisplay_clearRenderables = function FDisplay_clearRenderables(){
      var renderables = this._renderables;
      if(renderables){
         renderables.clear();
      }
   }
   MO.FDisplay_push = function FDisplay_push(item){
      var o = this;
      if(RClass.isClass(item, FRenderable)){
         o.pushRenderable(item);
      }else if(RClass.isClass(item, MRenderableLinker)){
         o.pushRenderable(item.renderable());
      }else if(RClass.isClass(item, FDisplay)){
         o.pushDisplay(item);
      }else{
         throw new TError(o, 'Unknown item type.');
      }
   }
   MO.FDisplay_remove = function FDisplay_remove(){
      var o = this;
      var c = o._parent;
      if(c){
         c.removeDisplay(o);
         o._parent = null;
      }
   }
   MO.FDisplay_filterDisplays = function FDisplay_filterDisplays(p){
      var o = this;
      if(o._visible){
         p.push(o);
      }
   }
   MO.FDisplay_filterRenderables = function FDisplay_filterRenderables(p){
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
   MO.FDisplay_show = function FDisplay_show(){
      this.setVisible(true);
   }
   MO.FDisplay_hide = function FDisplay_hide(){
      this.setVisible(false);
   }
   MO.FDisplay_setVisible = function FDisplay_setVisible(p){
      this._visible = p;
   }
   MO.FDisplay_update = function FDisplay_update(){
      var o = this;
      var m = o._matrix;
      m.set(o._location, o._rotation, o._scale);
      m.update();
   }
   MO.FDisplay_updateMatrix = function FDisplay_updateMatrix(region){
      var o = this;
      o._currentMatrix.assign(o._matrix);
      var parent = o._parent;
      if(parent){
         o._currentMatrix.append(parent._currentMatrix);
      }
   }
   MO.FDisplay_process = function FDisplay_process(region){
      var o = this;
      o.updateMatrix(region);
      var renderables = o._renderables;
      if(renderables){
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            renderable.process(region);
         }
      }
   }
   MO.FDisplay_dispose = function FDisplay_dispose(){
      var o = this;
      RObject.dispose(o._currentMatrix);
      RObject.dispose(o._matrix);
      RObject.dispose(o._position);
      RObject.dispose(o._direction);
      RObject.dispose(o._scale);
      RObject.dispose(o._renderables)
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.FDisplayContainer = function FDisplayContainer(o){
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
   MO.FDisplayContainer_hasDisplay = function FDisplayContainer_hasDisplay(){
      var displays = this._displays;
      if(displays){
         return !displays.isEmpty();
      }
      return false;
   }
   MO.FDisplayContainer_findDisplay = function FDisplayContainer_findDisplay(code){
      var o = this;
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            if(display.code() == code){
               return display;
            }
         }
      }
      return null
   }
   MO.FDisplayContainer_searchDisplay = function FDisplayContainer_searchDisplay(p){
      var o = this;
      var displays = o._displays;
      if(displays){
         var c = displays.count();
         for(var i = 0; i < c; i++){
            var f = displays.at(i);
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
   MO.FDisplayContainer_displays = function FDisplayContainer_displays(){
      var o = this;
      var displays = o._displays;
      if(!displays){
         displays = o._displays = new TObjects();
      }
      return displays;
   }
   MO.FDisplayContainer_pushDisplay = function FDisplayContainer_pushDisplay(display){
      var o = this;
      display.setParent(o);
      o.displays().push(display);
   }
   MO.FDisplayContainer_removeDisplay = function FDisplayContainer_removeDisplay(display){
      var o = this;
      o.displays().remove(display);
      display.setParent(null);
   }
   MO.FDisplayContainer_filterDisplays = function FDisplayContainer_filterDisplays(region){
      var o = this;
      o.__base.FDisplay.filterDisplays.call(o, region);
      if(!o._visible){
         return false;
      }
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.filterDisplays(region);
         }
      }
   }
   MO.FDisplayContainer_filterRenderables = function FDisplayContainer_filterRenderables(region){
      var o = this;
      o.__base.FDisplay.filterRenderables.call(o, region);
      if(!o._visible){
         return false;
      }
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.filterRenderables(region);
         }
      }
      return true;
   }
   MO.FDisplayContainer_process = function FDisplayContainer_process(region){
      var o = this;
      o.__base.FDisplay.process.call(o, region);
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.process(region);
         }
      }
   }
   MO.FDisplayContainer_dispose = function FDisplayContainer_dispose(){
      var o = this;
      var displays = o._displays;
      if(displays){
         for(var i = v.count() - 1; i >= 0; i--){
            displays.at(i).dispose();
         }
         o._displays = RObject.dispose(displays);
      }
      o.__base.FDisplay.dispose.call(o);
   }
}
with(MO){
   MO.FDisplayLayer = function FDisplayLayer(o){
      o = RClass.inherits(this, o, FDisplayContainer);
      o._optionClearDepth   = RClass.register(o, new AGetSet('_optionClearDepth'), false);
      o._statusActive       = false;
      o._technique          = RClass.register(o, new AGetSet('_technique'));
      o._visibleRenderables = null;
      o.construct           = FDisplayLayer_construct;
      o.selectTechnique     = FDisplayLayer_selectTechnique;
      o.visibleRenderables  = FDisplayLayer_visibleRenderables;
      o.filterRenderables   = FDisplayLayer_filterRenderables;
      o.active              = FDisplayLayer_active;
      o.deactive            = FDisplayLayer_deactive;
      return o;
   }
   MO.FDisplayLayer_construct = function FDisplayLayer_construct(){
      var o = this;
      o.__base.FDisplayContainer.construct.call(o);
      o._visibleRenderables = new TObjects();
   }
   MO.FDisplayLayer_selectTechnique = function FDisplayLayer_selectTechnique(context, name){
      var technique = RConsole.find(FG3dTechniqueConsole).find(context, name);
      this.selectTechnique(technique);
   }
   MO.FDisplayLayer_visibleRenderables = function FDisplayLayer_visibleRenderables(){
      return this._visibleRenderables;
   }
   MO.FDisplayLayer_filterRenderables = function FDisplayLayer_filterRenderables(p){
      var o = this;
      o.__base.FDisplayContainer.filterRenderables.call(o, p);
      o._visibleRenderables.assign(p.renderables());
   }
   MO.FDisplayLayer_active = function FDisplayLayer_active(){
      this._statusActive = true;
   }
   MO.FDisplayLayer_deactive = function FDisplayLayer_deactive(){
      this._statusActive = false;
   }
}
with(MO){
   MO.FDisplayUiLayer = function FDisplayUiLayer(o){
      o = RClass.inherits(this, o, FDisplayLayer);
      return o;
   }
}
with(MO){
   MO.FDrawable = function FDrawable(o){
      o = RClass.inherits(this, o, FObject);
      o._visible    = true;
      o.testVisible = FDrawable_testVisible;
      o.visible     = FDrawable_visible;
      o.setVisible  = FDrawable_setVisible;
      o.process     = RMethod.empty;
      return o;
   }
   MO.FDrawable_testVisible = function FDrawable_testVisible(){
      return this._visible;
   }
   MO.FDrawable_visible = function FDrawable_visible(){
      return this._visible;
   }
   MO.FDrawable_setVisible = function FDrawable_setVisible(p){
      this._visible = p;
   }
}
with(MO){
   MO.FRegion = function FRegion(o){
      o = RClass.inherits(this, o, FObject);
      return o;
   }
}
with(MO){
   MO.FRenderable = function FRenderable(o){
      o = RClass.inherits(this, o, FDrawable);
      o._drawables      = null;
      o.hasDrawable     = FRenderable_hasDrawable;
      o.drawables       = FRenderable_drawables;
      o.pushDrawable    = FRenderable_pushDrawable;
      o.removeDrawable  = FRenderable_removeDrawable;
      o.filterDrawables = FRenderable_filterDrawables;
      o.process         = FRenderable_process;
      return o;
   }
   MO.FRenderable_hasDrawable = function FRenderable_hasDrawable(){
      var drawables = this._drawables;
      return drawables ? !drawables.isEmpty() : false;
   }
   MO.FRenderable_drawables = function FRenderable_drawables(){
      var o = this;
      var drawables = o._drawables;
      if(!drawables){
         drawables = o._drawables = new TObjects();
      }
      return drawables;
   }
   MO.FRenderable_pushDrawable = function FRenderable_pushDrawable(drawable){
      var o = this;
      drawable._drawable = o;
      drawable._parent = o;
      o.drawables().push(drawable);
   }
   MO.FRenderable_removeDrawable = function FRenderable_removeDrawable(drawable){
      this._drawables.remove(drawable);
   }
   MO.FRenderable_filterDrawables = function FRenderable_filterDrawables(region){
      var o = this;
      if(!o.testVisible()){
         return false;
      }
      region.pushRenderable(o);
      var drawables = o._drawables;
      if(drawables){
         var count = drawables.count();
         for(var i = 0; i < count; i++){
            var drawable = drawables.getAt(i);
            if(drawable.testVisible()){
               region.pushRenderable(drawable);
            }
         }
      }
      return true;
   }
   MO.FRenderable_process = function FRenderable_process(region){
      var o = this;
      o.__base.FDrawable.process.call(o, region);
      var drawables = o._drawables;
      if(drawables){
         var count = drawables.count();
         for(var i = 0; i < count; i++){
            var drawable = drawables.getAt(i);
            drawable.process(region);
         }
      }
   }
}
with(MO){
   MO.FStage = function FStage(o){
      o = RClass.inherits(this, o, FComponent, MListenerEnterFrame, MListenerLeaveFrame);
      o._code           = 'stage';
      o._statusActive   = false;
      o._timer          = RClass.register(o, new AGetter('_timer'));
      o._layers         = RClass.register(o, new AGetter('_layers'));
      o.onProcess       = FStage_onProcess;
      o.construct       = FStage_construct;
      o.registerLayer   = FStage_registerLayer;
      o.unregisterLayer = FStage_unregisterLayer;
      o.active          = FStage_active;
      o.deactive        = FStage_deactive;
      o.process         = FStage_process;
      o.dispose         = FStage_dispose;
      return o;
   }
   MO.FStage_onProcess = function FStage_onProcess(){
      var o = this;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.process();
      }
   }
   MO.FStage_construct = function FStage_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      o._timer = RClass.create(FTimer);
      o._layers = new TDictionary();
   }
   MO.FStage_registerLayer = function FStage_registerLayer(code, layer){
      layer.setCode(code);
      this._layers.set(code, layer);
   }
   MO.FStage_unregisterLayer = function FStage_unregisterLayer(code){
      this._layers.set(code, null);
   }
   MO.FStage_active = function FStage_active(){
      var o = this;
      o._statusActive = true;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.active();
      }
   }
   MO.FStage_deactive = function FStage_deactive(){
      var o = this;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.deactive();
      }
      o._statusActive = false;
   }
   MO.FStage_process = function FStage_process(){
      var o = this;
      var timer = o._timer;
      if(!timer){
         timer = RClass.create(FTimer);
         timer.setup();
      }
      o.processEnterFrameListener(o);
      o.onProcess();
      o.processLeaveFrameListener(o);
      timer.update();
   }
   MO.FStage_dispose = function FStage_dispose(){
      var o = this;
      o._timer = RObject.dispose(o._timer);
      o._layers = RObject.dispose(o._layers);
      o.__base.MListenerEnterFrame.dispose.call(o);
      o.__base.MListenerLeaveFrame.dispose.call(o);
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.RStage = function RStage(){
      var o = this;
      o._started       = false;
      o._thread        = null;
      o._active        = true;
      o._interval      = 10;
      o._stages        = null;
      o.lsnsEnterFrame = null;
      o.lsnsLeaveFrame = null;
      o.construct();
      return o;
   }
   MO.RStage.prototype.onProcess = function RStage_onProcess(event){
      var o = this;
      if(!o._active){
         return;
      }
      try{
         o.lsnsEnterFrame.process(o);
         var stages = o._stages;
         if(stages){
            var count = stages.count();
            for(var i = 0; i < count; i++){
               var stage = stages.at(i);
               stage.process();
            }
         }
         o.lsnsLeaveFrame.process(o);
         RTimer.update();
      }catch(e){
         alert(e);
      }
   }
   MO.RStage.prototype.construct = function RStage_construct(){
      var o = this;
      o.lsnsEnterFrame = new TListeners();
      o.lsnsLeaveFrame = new TListeners();
   }
   MO.RStage.prototype.register = function RStage_register(name, stage){
      var o = this;
      var stages = o._stages;
      if(!stages){
         stages = o._stages = new TDictionary();
      }
      stages.set(name , stage);
   }
   MO.RStage.prototype.unregister = function RStage_unregister(stage){
      this._stages.removeValue(stage);
   }
   MO.RStage.prototype.active = function RStage_active(){
      var o = this;
      var stages = o._stages;
      if(stages){
         var count = stages.count();
         for(var i = 0; i < count; i++){
            var stage = stages.at(i);
            stage.active();
         }
      }
   }
   MO.RStage.prototype.process = function RStage_process(){
      this.onProcess();
   }
   MO.RStage.prototype.deactive = function RStage_deactive(){
      var o = this;
      var stages = o._stages;
      if(stages){
         var count = stages.count();
         for(var i = 0; i < count; i++){
            var stage = stages.at(i);
            stage.deactive();
         }
      }
   }
   MO.RStage.prototype.start = function RStage_start(interval){
      var o = this;
      if(o._started){
         return;
      }
      RE3dEngine.setup();
      o.active();
      RTimer.setup();
      if(interval == null){
         interval = o._interval;
      }
      o._interval = parseInt(interval);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
      o._started = true;
   }
   MO.RStage = new RStage();
}
