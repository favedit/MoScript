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
   MO.FApplication = function FApplication(o){
      o = RClass.inherits(this, o, FComponent);
      o._activeStage      = RClass.register(o, new AGetter('_activeStage'));
      o._stages           = RClass.register(o, new AGetter('_stages'));
      o.construct         = FApplication_construct;
      o.registerStage     = FApplication_registerStage;
      o.unregisterStage   = FApplication_unregisterStage;
      o.selectStage       = FApplication_selectStage;
      o.selectStageByCode = FApplication_selectStageByCode;
      o.dispose           = FApplication_dispose;
      return o;
   }
   MO.FApplication_construct = function FApplication_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      o._stages = new TDictionary();
   }
   MO.FApplication_registerStage = function FApplication_registerStage(stage){
      var o = this;
      var code = stage.code();
      o._stages.set(code, stage);
   }
   MO.FApplication_unregisterStage = function FApplication_unregisterStage(stage){
      var o = this;
      var code = stage.code();
      o._stages.set(code, null);
   }
   MO.FApplication_selectStage = function FApplication_selectStage(stage){
      var o = this;
      if(o._activeStage != stage){
         var activeStage = o._activeStage;
         if(activeStage){
            RStage.unregister(activeStage);
            activeStage.deactive();
            o._activeStage = null;
         }
         if(stage){
            stage.active();
            RStage.register(stage.code(), stage);
            o._activeStage = stage;
         }
      }
   }
   MO.FApplication_selectStageByCode = function FApplication_selectStageByCode(code){
      var o = this;
      var stage = o._stages.get(code);
      o.selectStage(stage);
      return stage;
   }
   MO.FApplication_dispose = function FApplication_dispose(){
      var o = this;
      o._stages = RObject.dispose(o._stages, true);
      o._activeStage = null;
      o.__base.FComponent.dispose.call(o);
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
   MO.FDisplay_remove = function FDisplay_remove(){
      var o = this;
      var c = o._parent;
      if(c){
         c.removeDisplay(o);
         o._parent = null;
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
   MO.FDisplayLayer_construct = function FDisplayLayer_construct(){
      var o = this;
      o.__base.FDisplayContainer.construct.call(o);
      o._visibleRenderables = new TObjects();
   }
   MO.FDisplayLayer_technique = function FDisplayLayer_technique(){
      return this._technique;
   }
   MO.FDisplayLayer_setTechnique = function FDisplayLayer_setTechnique(p){
      this._technique = p;
   }
   MO.FDisplayLayer_selectTechnique = function FDisplayLayer_selectTechnique(context, name){
      this._technique = RConsole.find(FG3dTechniqueConsole).find(context, name);
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
   MO.FScene = function FScene(o){
      o = RClass.inherits(this, o, FComponent);
      o._statusSetup    = false;
      o._statusActive   = false;
      o._layers         = RClass.register(o, AGetter('_layers'));
      o.construct       = FScene_construct;
      o.registerLayer   = FScene_registerLayer;
      o.unregisterLayer = FScene_unregisterLayer;
      o.setup           = FScene_setup;
      o.active          = FScene_active;
      o.deactive        = FScene_deactive;
      o.process         = FScene_process;
      o.dispose         = FScene_dispose;
      return o;
   }
   MO.FScene_construct = function FScene_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      o._layers = new TDictionary();
   }
   MO.FScene_registerLayer = function FScene_registerLayer(code, layer){
      layer.setCode(code);
      this._layers.set(code, layer);
   }
   MO.FScene_unregisterLayer = function FScene_unregisterLayer(code){
      this._layers.set(code, null);
   }
   MO.FScene_setup = function FScene_setup(){
      var o = this;
   }
   MO.FScene_active = function FScene_active(){
      var o = this;
      if(!o._statusSetup){
         o.setup();
         o._statusSetup = true;
      }
      o._statusActive = true;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.active();
      }
   }
   MO.FScene_deactive = function FScene_deactive(){
      var o = this;
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.deactive();
      }
      o._statusActive = false;
   }
   MO.FScene_dispose = function FScene_dispose(){
      var o = this;
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.FStage = function FStage(o){
      o = RClass.inherits(this, o, FComponent, MListenerEnterFrame, MListenerLeaveFrame);
      o._code             = 'stage';
      o._statusActive     = false;
      o._timer            = RClass.register(o, new AGetter('_timer'));
      o._layers           = RClass.register(o, new AGetter('_layers'));
      o._scenes           = RClass.register(o, new AGetter('_scenes'));
      o._activeScene      = RClass.register(o, new AGetter('_activeScene'));
      o.onProcess         = FStage_onProcess;
      o.construct         = FStage_construct;
      o.registerLayer     = FStage_registerLayer;
      o.unregisterLayer   = FStage_unregisterLayer;
      o.active            = FStage_active;
      o.deactive          = FStage_deactive;
      o.registerScene     = FStage_registerScene;
      o.unregisterScene   = FStage_unregisterScene;
      o.selectScene       = FStage_selectScene;
      o.selectSceneByCode = FStage_selectSceneByCode;
      o.process           = FStage_process;
      o.dispose           = FStage_dispose;
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
      o._scenes = new TDictionary();
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
   MO.FStage_registerScene = function FStage_registerScene(scene){
      var code = scene.code();
      this._scenes.set(code, scene);
   }
   MO.FStage_unregisterScene = function FStage_unregisterScene(scene){
      var code = scene.code();
      this._scenes.set(code, null);
   }
   MO.FStage_selectScene = function FStage_selectScene(scene){
      var o = this;
      if(o._activeScene != scene){
         var activeScene = o._activeScene;
         if(activeScene){
            activeScene.deactive();
            o._activeScene = null;
         }
         if(scene){
            scene.active();
            o._activeScene = scene;
         }
      }
   }
   MO.FStage_selectSceneByCode = function FStage_selectSceneByCode(code){
      var o = this;
      var scene = o._scenes.get(code);
      o.selectScene(scene);
      return scene;
   }
   MO.FStage_process = function FStage_process(){
      var o = this;
      var timer = o._timer;
      if(!timer){
         timer = RClass.create(FTimer);
         timer.setup();
      }
      o.processEnterFrameListener(o);
      if(o._activeScene){
         o._activeScene.process();
      }
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
with(MO){
   MO.MLinkerResource = function MLinkerResource(o){
      o = RClass.inherits(this, o);
      o._resource      = null;
      o.resource       = MLinkerResource_resource;
      o.setResource    = MLinkerResource_setResource;
      o.loadResource   = MLinkerResource_loadResource;
      o.reloadResource = MLinkerResource_reloadResource;
      o.dispose        = MLinkerResource_dispose;
      return o;
   }
   MO.MLinkerResource_resource = function MLinkerResource_resource(){
      return this._resource;
   }
   MO.MLinkerResource_setResource = function MLinkerResource_setResource(resource){
      this._resource = resource;
   }
   MO.MLinkerResource_loadResource = function MLinkerResource_loadResource(resource){
      this._resource = resource;
   }
   MO.MLinkerResource_reloadResource = function MLinkerResource_reloadResource(resource){
      var o = this;
      o.loadResource(resource);
   }
   MO.MLinkerResource_dispose = function MLinkerResource_dispose(){
      var o = this;
      o._resource = null;
   }
}
with(MO){
   MO.FResource = function FResource(o){
      o = RClass.inherits(this, o, FObject);
      o._typeCode     = null;
      o._type         = null;
      o._dataCompress = false;
      o._dataBlock    = false;
      o._guid         = null;
      o._code         = null;
      o._label        = null;
      o._sourceUrl    = null;
      o.typeCode      = FResource_typeCode;
      o.type          = FResource_type;
      o.guid          = FResource_guid;
      o.setGuid       = FResource_setGuid;
      o.code          = FResource_code;
      o.setCode       = FResource_setCode;
      o.label         = FResource_label;
      o.setLabel      = FResource_setLabel;
      o.sourceUrl     = FResource_sourceUrl;
      o.setSourceUrl  = FResource_setSourceUrl;
      return o;
   }
   MO.FResource_typeCode = function FResource_typeCode(){
      return this._typeCode;
   }
   MO.FResource_type = function FResource_type(){
      return this._type;
   }
   MO.FResource_guid = function FResource_guid(){
      return this._guid;
   }
   MO.FResource_setGuid = function FResource_setGuid(p){
      this._guid = p;
   }
   MO.FResource_code = function FResource_code(){
      return this._code;
   }
   MO.FResource_setCode = function FResource_setCode(p){
      this._code = p;
   }
   MO.FResource_label = function FResource_label(){
      return this._label;
   }
   MO.FResource_setLabel = function FResource_setLabel(p){
      this._label = p;
   }
   MO.FResource_sourceUrl = function FResource_sourceUrl(){
      return this._sourceUrl;
   }
   MO.FResource_setSourceUrl = function FResource_setSourceUrl(p){
      this._sourceUrl = p;
   }
}
with(MO){
   MO.FResourceBlockStorage = function FResourceBlockStorage(o){
      o = RClass.inherits(this, o, FResourceStorage);
      o._ready      = false;
      o._dataLength = 0;
      o._blockSize  = 0;
      o._blockCount = 0;
      o._blocks     = null;
      o._resource   = null;
      o.construct   = FResourceBlockStorage_construct;
      o.testReady   = FResourceBlockStorage_testReady;
      o.blocks      = FResourceBlockStorage_blocks;
      o.load        = FResourceBlockStorage_load;
      o.complete    = FResourceBlockStorage_complete;
      o.dispose     = FResourceBlockStorage_dispose;
      return o;
   }
   MO.FResourceBlockStorage_construct = function FResourceBlockStorage_construct(){
      var o = this;
      o.__base.FResourceStorage.construct.call(o);
      o._blocks = new TObjects();
   }
   MO.FResourceBlockStorage_testReady = function FResourceBlockStorage_testReady(){
      var o = this;
      if(!o._ready){
         var blocks = o._blocks;
         var count = blocks.count();
         for(var i = 0; i < count; i++){
            var block = blocks.at(i);
            if(!block.testReady()){
               return false;
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FResourceBlockStorage_blocks = function FResourceBlockStorage_blocks(){
      return this._blocks;
   }
   MO.FResourceBlockStorage_load = function FResourceBlockStorage_load(buffer){
      var o = this;
      var resource = o._resource;
      o._compressLength = buffer.byteLength;
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      view.link(buffer);
      var compressCode = view.readString();
      var length = o._dataLength = view.readInt32();
      var blockSize = o._blockSize = view.readInt32();
      var blockCount = o._blockCount = view.readInt32();
      var blocks = o._blocks;
      for(var i = 0; i < blockCount; i++){
         var size = view.readInt32();
         var blockData = new ArrayBuffer(size);
         view.readBytes(blockData, 0, size);
         var block = RClass.create(FResourceBlockStorageData);
         block._guid = resource.guid();
         block._index = i;
         block.setCompressData(blockData);
         blocks.push(block)
      }
      view.dispose();
   }
   MO.FResourceBlockStorage_complete = function FResourceBlockStorage_complete(){
      var o = this;
      var resource = o._resource;
      var stream = RClass.create(FDataStream);
      stream.setEndianCd(true);
      stream.setLength(o._dataLength);
      var blocks = o._blocks;
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         var data = block._data;
         stream.writeBytes(data.buffer, 0, data.byteLength);
      }
      stream.flip();
      var span = RTimer.current() - resource._compressStartTick;
      MO.Logger.info(o, 'Process resource storage. (guid={1}, block_count={2}, length={3}, total={4}, tick={5})', resource.guid(), count, o._compressLength, o._dataLength, span);
      resource.onComplete(stream);
      stream.dispose();
   }
   MO.FResourceBlockStorage_dispose = function FResourceBlockStorage_dispose(){
      var o = this;
      o._resource = null;
      var blocks = o._blocks;
      if(blocks){
         var count = blocks.count();
         for(var i = 0; i < count; i++){
            var block = blocks.at(i);
            block.dispose();
         }
         o._blocks = RObject.dispose(blocks);
      }
      o.__base.FResourceStorage.dispose.call(o);
   }
}
with(MO){
   MO.FResourceBlockStorageData = function FResourceBlockStorageData(o){
      o = RClass.inherits(this, o, FObject, MResourceData);
      o.dispose = FResourceBlockStorageData_dispose;
      return o;
   }
   MO.FResourceBlockStorageData_dispose = function FResourceBlockStorageData_dispose(){
      var o = this;
      o.__base.MResourceData.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FResourceConsole = function FResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd          = EScope.Global;
      o._factory          = null;
      o._types            = null;
      o._resources        = null;
      o._loadResources    = null;
      o._loadingResources = null;
      o._processStorages  = null;
      o._thread           = null;
      o._loadLimit        = 8;
      o._interval         = 150;
      o.onComplete        = FResourceConsole_onComplete;
      o.onLoad            = FResourceConsole_onLoad;
      o.onBlockLoad       = FResourceConsole_onBlockLoad;
      o.onProcess         = FResourceConsole_onProcess;
      o.construct         = FResourceConsole_construct;
      o.registerType      = FResourceConsole_registerType;
      o.factory           = FResourceConsole_factory;
      o.load              = FResourceConsole_load;
      return o;
   }
   MO.FResourceConsole_onComplete = function FResourceConsole_onComplete(resource, data){
      var o = this;
      resource._data = null;
      o._loadingResources.remove(resource);
      resource.onComplete(data);
   }
   MO.FResourceConsole_onLoad = function FResourceConsole_onLoad(connection){
      var o = this;
      var data = connection.outputData();
      var resource = connection._resource;
      var storage = RClass.create(FResourceSingleStorage);
      storage.setResource(resource);
      storage.load(data);
      RConsole.find(FResourceDataConsole).load(storage);
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }
   MO.FResourceConsole_onBlockLoad = function FResourceConsole_onBlockLoad(connection){
      var o = this;
      var data = connection.outputData();
      var resource = connection._resource;
      resource._compressLength = data.byteLength;
      resource._compressStartTick = RTimer.current();
      var storage = RClass.create(FResourceBlockStorage);
      storage.setResource(resource);
      storage.load(data);
      var dataConsole = RConsole.find(FResourceDataConsole);
      var blocks = storage.blocks();
      var count = blocks.count();
      for(var i = 0; i < count; i++){
         var block = blocks.at(i);
         dataConsole.load(block);
      }
      o._loadingResources.remove(resource);
      o._processStorages.push(storage);
   }
   MO.FResourceConsole_onProcess = function FResourceConsole_onProcess(){
      var o = this;
      var httpConsole = RConsole.find(FHttpConsole);
      var loadResources = o._loadResources;
      var loadingResources = o._loadingResources;
      var pc = loadingResources.count();
      if(!loadResources.isEmpty()){
         for(var i = o._loadLimit - pc; i > 0; i--){
            var resource = loadResources.shift();
            var sourceUrl = resource.sourceUrl();
            var connection = httpConsole.send(sourceUrl);
            connection._resource = resource;
            if(resource._dataCompress){
               if(resource._dataBlock){
                  connection.addLoadListener(o, o.onBlockLoad);
               }else{
                  connection.addLoadListener(o, o.onLoad);
               }
            }else{
               connection.addLoadListener(o, o.onComplete);
            }
            resource._dataLoad = true;
            loadingResources.push(resource);
            if(loadResources.isEmpty()){
               break;
            }
         }
      }
      var storages = o._processStorages;
      storages.record();
      while(storages.next()){
         var storage = storages.current();
         if(storage.testReady()){
            storages.removeCurrent();
            storage.complete();
            storage.dispose();
         }
      }
   }
   MO.FResourceConsole_construct = function FResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._factory = RClass.create(FClassFactory);
      o._types = new TDictionary();
      o._resources = new TDictionary();
      o._loadResources  = new TObjects();
      o._loadingResources = new TObjects();
      o._processStorages = new TLooper();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FResourceConsole_registerType = function FResourceConsole_registerType(type){
      var o = this;
      var code = type.code();
      return o._types.set(code, type);
   }
   MO.FResourceConsole_factory = function FResourceConsole_factory(){
      return this._factory;
   }
   MO.FResourceConsole_load = function FResourceConsole_load(resource){
      var o = this;
      var guid = resource.guid();
      var resources = o._resources;
      if(resources.contains(guid)){
         throw new TError(o, 'Resource is already loaded. (guid={1})', guid);
      }
      resources.set(guid, resource);
      o._loadResources.push(resource);
      resource._dataLoad = true;
   }
}
with(MO){
   MO.FResourceDataConsole = function FResourceDataConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd           = EScope.Global;
      o._loadDatas         = null;
      o._processDatas      = null;
      o._pipeline          = null;
      o._pipelinePool      = null;
      o._thread            = null;
      o._processLimit      = 4;
      o._interval          = 200;
      o.onPipelineComplete = FResourceDataConsole_onPipelineComplete;
      o.onProcess          = FResourceDataConsole_onProcess;
      o.construct          = FResourceDataConsole_construct;
      o.allocPipeline      = FResourceDataConsole_allocPipeline;
      o.freePipeline       = FResourceDataConsole_freePipeline;
      o.load               = FResourceDataConsole_load;
      return o;
   }
   MO.FResourceDataConsole_onPipelineComplete = function FResourceDataConsole_onPipelineComplete(pipeline, data){
      var o = this;
      if(pipeline){
         o.freePipeline(pipeline);
      }
      o._processDatas.remove(data);
   }
   MO.FResourceDataConsole_onProcess = function FResourceDataConsole_onProcess(){
      var o = this;
      var loadDatas = o._loadDatas;
      var loadCount = loadDatas.count();
      if(loadCount == 0){
         return;
      }
      var pipeline = o._pipeline;
      if(pipeline){
         if(!pipeline.testBusy()){
            var data = loadDatas.shift();
            pipeline.decompress(data);
         }
      }else{
         var processDatas = o._processDatas;
         var processCount = processDatas.count();
         var idleCount = o._processLimit - processCount;
         if(idleCount <= 0){
            return;
         }
         var freeCount = Math.min(loadCount, idleCount);
         for(var i = 0; i < freeCount; i++){
            var data = loadDatas.shift();
            var pipeline = o.allocPipeline();
            pipeline.decompress(data);
            processDatas.push(data);
         }
      }
   }
   MO.FResourceDataConsole_construct = function FResourceDataConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._loadDatas  = new TObjects();
      o._processDatas = new TObjects();
      o._pipelinePool  = RClass.create(FObjectPool);
      var capability = RBrowser.capability();
      if(!capability.optionProcess){
         var pipeline = o._pipeline = RClass.create(FResourceSinglePipeline);
         pipeline.setConsole(o);
      }
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FResourceDataConsole_allocPipeline = function FResourceDataConsole_allocPipeline(){
      var o = this;
      var pool = o._pipelinePool;
      if(!pool.hasFree()){
         var pipeline = RClass.create(FResourceThreadPipeline);
         pipeline.setConsole(o);
         pool.push(pipeline);
      }
      return pool.alloc();
   }
   MO.FResourceDataConsole_freePipeline = function FResourceDataConsole_freePipeline(pipeline){
      this._pipelinePool.free(pipeline);
   }
   MO.FResourceDataConsole_load = function FResourceDataConsole_load(data){
      this._loadDatas.push(data);
   }
}
with(MO){
   MO.FResourceGroup = function FResourceGroup(o){
      o = RClass.inherits(this, o, FObject);
      o._code      = null;
      o._resources = null;
      o.code       = FResourceGroup_code;
      return o;
   }
   MO.FResourceGroup_code = function FResourceGroup_code(){
      return this._code;
   }
}
with(MO){
   MO.FResourcePipeline = function FResourcePipeline(o){
      o = RClass.inherits(this, o, FPipeline);
      o._console    = null;
      o._compressCd = null;
      o._resource   = null;
      o.console     = FResourcePipeline_console;
      o.setConsole  = FResourcePipeline_setConsole;
      o.compressCd  = FResourcePipeline_compressCd;
      o.resource    = FResourcePipeline_resource;
      o.setResource = FResourcePipeline_setResource;
      o.dispose     = FResourcePipeline_dispose;
      return o;
   }
   MO.FResourcePipeline_console = function FResourcePipeline_console(){
      return this._console;
   }
   MO.FResourcePipeline_setConsole = function FResourcePipeline_setConsole(p){
      this._console = p;
   }
   MO.FResourcePipeline_compressCd = function FResourcePipeline_compressCd(){
      return this._compressCd;
   }
   MO.FResourcePipeline_resource = function FResourcePipeline_resource(){
      return this._resource;
   }
   MO.FResourcePipeline_setResource = function FResourcePipeline_setResource(p){
      this._resource = p;
   }
   MO.FResourcePipeline_dispose = function FResourcePipeline_dispose(){
      var o = this;
      o._console = null;
      o._resource = null;
      o.__base.FPipeline.dispose.call(o);
   }
}
with(MO){
   MO.FResourceSinglePipeline = function FResourceSinglePipeline(o){
      o = RClass.inherits(this, o, FResourcePipeline);
      o._startTime  = 0;
      o._statusBusy = false;
      o._data       = 0;
      o._dataLength = 0;
      o._worker     = null;
      o.onComplete  = FResourceSinglePipeline_onComplete;
      o.construct   = FResourceSinglePipeline_construct;
      o.testBusy    = FResourceSinglePipeline_testBusy;
      o.decompress  = FResourceSinglePipeline_decompress;
      o.dispose     = FResourceSinglePipeline_dispose;
      return o;
   }
   MO.FResourceSinglePipeline_onComplete = function FResourceSinglePipeline_onComplete(buffer){
      var o = this;
      var data = o._data;
      var bufferData = null;
      if(buffer.constructor == Array){
         bufferData = new Uint8Array(buffer);
      }else if(buffer.constructor == ArrayBuffer){
         bufferData = buffer;
      }else{
         throw new TError(o, 'Unknown buffer type.');
      }
      data.completeData(bufferData);
      var span = RTimer.now() - o._startTime;
      MO.Logger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, bufferData.byteLength, span);
      o._console.onPipelineComplete(null, data);
      o._data = null;
      o._statusBusy = false;
   }
   MO.FResourceSinglePipeline_construct = function FResourceSinglePipeline_construct(){
      var o = this;
      o.__base.FResourcePipeline.construct.call(o);
   }
   MO.FResourceSinglePipeline_testBusy = function FResourceSinglePipeline_testBusy(){
      return this._statusBusy;
   }
   MO.FResourceSinglePipeline_decompress = function FResourceSinglePipeline_decompress(data){
      var o = this;
      o._statusBusy = true;
      o._startTime = RTimer.current();
      var compressData = data.compressData();
      o._data = data;
      o._dataLength = compressData.byteLength;
      var processData = null;
      if(compressData.constructor == ArrayBuffer){
         processData = new Uint8Array(compressData);
      }else if(compressData.constructor == Uint8Array){
         processData = compressData;
      }else{
         throw new TError(o, 'Unknown data type.');
      }
      LZMAD.decompress(processData, function(buffer){o.onComplete(buffer);}, null);
   }
   MO.FResourceSinglePipeline_dispose = function FResourceSinglePipeline_dispose(){
      var o = this;
      o._data = null;
      o._worker = null;
      o.__base.FPipeline.dispose.call(o);
   }
}
with(MO){
   MO.FResourceSingleStorage = function FResourceSingleStorage(o){
      o = RClass.inherits(this, o, FResourceStorage, MResourceData);
      o.construct   = FResourceSingleStorage_construct;
      o.load        = FResourceSingleStorage_load;
      o.complete    = FResourceSingleStorage_complete;
      o.dispose     = FResourceSingleStorage_dispose;
      return o;
   }
   MO.FResourceSingleStorage_construct = function FResourceSingleStorage_construct(){
      var o = this;
      o.__base.FResourceStorage.construct.call(o);
   }
   MO.FResourceSingleStorage_load = function FResourceSingleStorage_load(buffer){
      var o = this;
      var resource = o._resource;
      o._compressLength = buffer.byteLength;
      o._compressData = new Uint8Array(buffer);
   }
   MO.FResourceSingleStorage_complete = function FResourceSingleStorage_complete(){
      var o = this;
      var resource = o._resource;
      resource.onComplete(o._data);
   }
   MO.FResourceSingleStorage_dispose = function FResourceSingleStorage_dispose(){
      var o = this;
      o.__base.MResourceData.dispose.call(o);
      o.__base.FResourceStorage.dispose.call(o);
   }
}
with(MO){
   MO.FResourceStorage = function FResourceStorage(o){
      o = RClass.inherits(this, o, FObject);
      o._ready      = false;
      o._dataLength = 0;
      o._resource   = null;
      o.construct   = FResourceStorage_construct;
      o.testReady   = FResourceStorage_testReady;
      o.resource    = FResourceStorage_resource;
      o.setResource = FResourceStorage_setResource;
      o.load        = FResourceStorage_load;
      o.complete    = FResourceStorage_complete;
      o.dispose     = FResourceStorage_dispose;
      return o;
   }
   MO.FResourceStorage_construct = function FResourceStorage_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FResourceStorage_testReady = function FResourceStorage_testReady(){
      return this._ready;
   }
   MO.FResourceStorage_resource = function FResourceStorage_resource(){
      return this._resource;
   }
   MO.FResourceStorage_setResource = function FResourceStorage_setResource(resource){
      this._resource = resource;
   }
   MO.FResourceStorage_load = function FResourceStorage_load(buffer){
   }
   MO.FResourceStorage_complete = function FResourceStorage_complete(){
   }
   MO.FResourceStorage_dispose = function FResourceStorage_dispose(){
      var o = this;
      o._resource = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FResourceThreadPipeline = function FResourceThreadPipeline(o){
      o = RClass.inherits(this, o, FResourcePipeline);
      o._startTime  = 0;
      o._data       = 0;
      o._dataLength = 0;
      o._worker     = null;
      o.onComplete  = FResourceThreadPipeline_onComplete;
      o.construct   = FResourceThreadPipeline_construct;
      o.worker      = FResourceThreadPipeline_worker;
      o.decompress  = FResourceThreadPipeline_decompress;
      o.dispose     = FResourceThreadPipeline_dispose;
      return o;
   }
   MO.FResourceThreadPipeline_onComplete = function FResourceThreadPipeline_onComplete(buffer){
      var o = this;
      var bufferData = null;
      if(buffer.constructor == Array){
         bufferData = new Uint8Array(buffer);
      }else if(buffer.constructor == Uint8Array){
         bufferData = buffer;
      }else{
         throw new TError(o, 'Unknown buffer type.');
      }
      var data = o._data;
      data.completeData(bufferData);
      var span = RTimer.now() - o._startTime;
      MO.Logger.info(o, 'Process resource data decompress. (guid={1}, block={2}, length={3}, total={4}, tick={5})', data._guid, data._index, o._dataLength, buffer.byteLength, span);
      o._console.onPipelineComplete(o, data);
      o._data = null;
   }
   MO.FResourceThreadPipeline_construct = function FResourceThreadPipeline_construct(){
      var o = this;
      o.__base.FResourcePipeline.construct.call(o);
   }
   MO.FResourceThreadPipeline_worker = function FResourceThreadPipeline_worker(){
      var o = this;
      var worker = o._worker;
      if(!worker){
         var uri = RBrowser.contentPath('/ajs/lzma_worker.js');
         worker = o._worker = new LZMA_WORKER(uri);
      }
      return worker;
   }
   MO.FResourceThreadPipeline_decompress = function FResourceThreadPipeline_decompress(data){
      var o = this;
      o._startTime = RTimer.current();
      var compressData = data.compressData();
      o._data = data;
      o._dataLength = compressData.byteLength;
      var worker = o.worker();
      worker.decompress(compressData, function(buffer){o.onComplete(buffer);}, null);
   }
   MO.FResourceThreadPipeline_dispose = function FResourceThreadPipeline_dispose(){
      var o = this;
      o._data = null;
      o._worker = null;
      o.__base.FPipeline.dispose.call(o);
   }
}
with(MO){
   MO.FResourceType = function FResourceType(o){
      o = RClass.inherits(this, o, FObject);
      o._code        = null;
      o._pipeline    = null;
      o._resources   = null;
      o.construct    = FResourceType_construct;
      o.code         = FResourceType_code;
      o.setCode      = FResourceType_setCode;
      o.pipeline     = FResourceType_pipeline;
      o.setPipeline  = FResourceType_setPipeline;
      o.findResource = FResourceType_findResource;
      o.resources    = FResourceType_resources;
      return o;
   }
   MO.FResourceType_construct = function FResourceType_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._resources = new TDictionary();
   }
   MO.FResourceType_code = function FResourceType_code(){
      return this._code;
   }
   MO.FResourceType_setCode = function FResourceType_setCode(p){
      this._code = p;
   }
   MO.FResourceType_pipeline = function FResourceType_pipeline(){
      return this._pipeline;
   }
   MO.FResourceType_setPipeline = function FResourceType_setPipeline(p){
      this._pipeline = p;
   }
   MO.FResourceType_findResource = function FResourceType_findResource(p){
      return this._resources.get(p);
   }
   MO.FResourceType_resources = function FResourceType_resources(){
      return this._resources;
   }
}
with(MO){
   MO.FE2dCanvas = function FE2dCanvas(o){
      o = RClass.inherits(this, o, FObject, MCanvasObject);
      o._size      = null;
      o._context   = null;
      o._hCanvas   = null;
      o.onResize   = FE2dCanvas_onResize;
      o.construct  = FE2dCanvas_construct;
      o.htmlCanvas = FE2dCanvas_htmlCanvas;
      o.size       = FE2dCanvas_size;
      o.context    = FE2dCanvas_context;
      o.build      = FE2dCanvas_build;
      o.setPanel   = FE2dCanvas_setPanel;
      o.reset      = FE2dCanvas_reset;
      o.dispose    = FE2dCanvas_dispose;
      return o;
   }
   MO.FE2dCanvas_onResize = function FE2dCanvas_onResize(p){
      var o = this;
   }
   MO.FE2dCanvas_construct = function FE2dCanvas_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE2dCanvas_htmlCanvas = function FE2dCanvas_htmlCanvas(){
      return this._hCanvas;
   }
   MO.FE2dCanvas_size = function FE2dCanvas_size(){
      return this._size;
   }
   MO.FE2dCanvas_context = function FE2dCanvas_context(){
      return this._context;
   }
   MO.FE2dCanvas_build = function FE2dCanvas_build(hDocument){
      var o = this;
      var size = o._size;
      var width = size.width;
      var height = size.height;
      var hCanvas = o._hCanvas = RBuilder.create(hDocument, 'CANVAS');
      hCanvas.__linker = o;
      hCanvas.width = width;
      hCanvas.height = height;
      var style = hCanvas.style;
      style.width = width + 'px';
      style.height = height + 'px';
      var context = o._context = RClass.create(FG2dCanvasContext);
      context.linkCanvas(hCanvas);
   }
   MO.FE2dCanvas_setPanel = function FE2dCanvas_setPanel(hPanel){
      var o = this;
      var context = o._context;
      var hCanvas = o._hCanvas;
      o._hPanel = hPanel;
      hPanel.appendChild(hCanvas);
      o.onResize();
   }
   MO.FE2dCanvas_reset = function FE2dCanvas_reset(){
      var o = this;
      var context = o._context;
      context.clear();
   }
   MO.FE2dCanvas_dispose = function FE2dCanvas_dispose(){
      var o = this;
      o._context = RObject.dispose(o._context);
      o._hPanel = RHtml.free(o._hPanel);
      o._hCanvas = RHtml.free(o._hCanvas);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE2dCanvasConsole = function FE2dCanvasConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._pools      = null;
      o.construct   = FE2dCanvasConsole_construct;
      o.allocBySize = FE2dCanvasConsole_allocBySize;
      o.free        = FE2dCanvasConsole_free;
      return o;
   }
   MO.FE2dCanvasConsole_construct = function FE2dCanvasConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._pools = RClass.create(FObjectPools);
   }
   MO.FE2dCanvasConsole_allocBySize = function FE2dCanvasConsole_allocBySize(width, height){
      var o = this;
      var pools = o._pools;
      var code = width + 'x' + height;
      var canvas = pools.alloc(code);
      if(!canvas){
         canvas = RClass.create(FE2dCanvas);
         canvas.size().set(width, height);
         canvas.build(RWindow._hDocument);
      }
      canvas.reset();
      return canvas;
   }
   MO.FE2dCanvasConsole_free = function FE2dCanvasConsole_free(canvas){
      var o = this;
      var pools = o._pools;
      var size = canvas.size();
      var code = size.width + 'x' + size.height;
      pools.free(code, canvas);
   }
}
with(MO){
   MO.FE2dDrawable = function FE2dDrawable(o){
      o = RClass.inherits(this, o, FDrawable);
      return o;
   }
}
with(MO){
   MO.ME3dObject = function ME3dObject(o){
      o = RClass.inherits(this, o, MGraphicObject, MAttributeGuid, MAttributeCode);
      return o;
   }
}
with(MO){
   MO.FE3dCanvas = function FE3dCanvas(o){
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
   MO.FE3dCanvas_ohTouchStart = function FE3dCanvas_ohTouchStart(p){
      this.__linker.onTouchStart(p);
   }
   MO.FE3dCanvas_ohTouchMove = function FE3dCanvas_ohTouchMove(p){
      this.__linker.onTouchMove(p);
   }
   MO.FE3dCanvas_ohTouchStop = function FE3dCanvas_ohTouchStop(p){
      this.__linker.onTouchStop(p);
   }
   MO.FE3dCanvas_onResize = function FE3dCanvas_onResize(p){
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
   MO.FE3dCanvas_construct = function FE3dCanvas_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3dCanvas_build = function FE3dCanvas_build(p){
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
   MO.FE3dCanvas_resize = function FE3dCanvas_resize(){
      this.onResize();
   }
   MO.FE3dCanvas_setPanel = function FE3dCanvas_setPanel(p){
      var o = this;
      var c = o._graphicContext;
      var hc = o._hCanvas;
      o._hPanel = p;
      p.appendChild(o._hCanvas);
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
   MO.FE3dStage_setup = function FE3dStage_setup(){
      var o = this;
      o.__base.FStage.construct.call(o);
      o._region.linkGraphicContext(o);
      o._region.setup();
   }
   MO.FE3dStage_statistics = function FE3dStage_statistics(){
      return this._statistics;
   }
   MO.FE3dStage_camera = function FE3dStage_camera(){
      return this._region._camera;
   }
   MO.FE3dStage_projection = function FE3dStage_projection(){
      return this._region._camera._projection;
   }
   MO.FE3dStage_directionalLight = function FE3dStage_directionalLight(){
      return this._region._directionalLight;
   }
   MO.FE3dStage_technique = function FE3dStage_technique(){
      return this._technique;
   }
   MO.FE3dStage_selectTechnique = function FE3dStage_selectTechnique(context, clazz){
      var o = this;
      var techniqueConsole = RConsole.find(FG3dTechniqueConsole);
      var technique = o._technique = techniqueConsole.find(context, clazz);
      return technique;
   }
   MO.FE3dStage_region = function FE3dStage_region(){
      return this._region;
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
MO.EE3sResource = new function EE3sResource(){
   var o = this;
   o.Unknown  = 'Unknown';
   o.Bitmap   = 'Bitmap';
   o.Material = 'Material';
   o.Mesh     = 'Mesh';
   o.Model    = 'Model';
   o.Template = 'Template';
   o.Scene    = 'Scene';
   o.Project  = 'Project';
   o.All      = 'All';
   return o;
}
with(MO){
   MO.ME3sGeometry = function ME3sGeometry(o){
      o = RClass.inherits(this, o);
      o._outline         = null;
      o._streams         = null;
      o.construct        = ME3sGeometry_construct;
      o.outline          = ME3sGeometry_outline;
      o.findStream       = ME3sGeometry_findStream;
      o.streams          = ME3sGeometry_streams;
      o.calculateOutline = ME3sGeometry_calculateOutline;
      o.dispose          = ME3sGeometry_dispose;
      return o;
   }
   MO.ME3sGeometry_construct = function ME3sGeometry_construct(){
      var o = this;
      o._outline = new SOutline3d();
   }
   MO.ME3sGeometry_outline = function ME3sGeometry_outline(){
      return this._outline;
   }
   MO.ME3sGeometry_findStream = function ME3sGeometry_findStream(code){
      var o = this;
      var streams = o._streams;
      var count = streams.count();
      for(n = 0; n < count; n++){
         var stream = streams.getAt(n);
         if(stream.code() == code){
            return stream;
         }
      }
      return null;
   }
   MO.ME3sGeometry_streams = function ME3sGeometry_streams(){
      return this._streams;
   }
   MO.ME3sGeometry_calculateOutline = function ME3sGeometry_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         outline.setMin();
         var stream = o.findStream('position');
         var dataCount = stream.dataCount();
         var data = new Float32Array(stream.data())
         var index = 0;
         for(var i = 0; i < dataCount; i++){
            var x = data[index++];
            var y = data[index++];
            var z = data[index++];
            outline.mergePoint(x, y, z);
         }
         outline.update();
      }
      return outline;
   }
   MO.ME3sGeometry_dispose = function ME3sGeometry_dispose(){
      var o = this;
      o._outline = RObject.dispose(o._outline);
      o.__base.FE3sSpace.dispose.call(o);
   }
}
with(MO){
   MO.SE3sCompressEvent = function SE3sCompressEvent(w, f, d){
      var o = this;
      o.owner   = w;
      o.process = f;
      o.data    = d;
      return o;
   }
}
with(MO){
   MO.SE3sMaterialInfo = function SE3sMaterialInfo(){
      var o = this;
      SG3dMaterialInfo.call(o);
      o.unserialize = SE3sMaterialInfo_unserialize;
      o.saveConfig  = SE3sMaterialInfo_saveConfig;
      return o;
   }
   MO.SE3sMaterialInfo_unserialize = function SE3sMaterialInfo_unserialize(input){
      var o = this;
      o.effectCode = input.readString();
      o.optionDepth = input.readBoolean();
      o.optionDouble = input.readBoolean();
      o.optionNormalInvert = input.readBoolean();
      o.optionShadow = input.readBoolean();
      o.optionShadowSelf = input.readBoolean();
      o.optionAlpha = input.readBoolean();
      o.alphaBase = input.readFloat();
      o.alphaRate = input.readFloat();
      o.optionColor = input.readBoolean();
      o.colorMin = input.readFloat();
      o.colorMax = input.readFloat();
      o.colorBalance = input.readFloat();
      o.colorRate = input.readFloat();
      o.optionVertex = input.readBoolean();
      o.vertexColor.unserialize(input);
      o.optionAmbient = input.readBoolean();
      o.ambientColor.unserialize(input);
      o.optionDiffuse = input.readBoolean();
      o.diffuseColor.unserialize(input);
      o.optionDiffuseView = input.readBoolean();
      o.diffuseViewColor.unserialize(input);
      o.optionSpecular = input.readBoolean();
      o.specularColor.unserialize(input);
      o.specularBase = input.readFloat();
      o.specularLevel = input.readFloat();
      o.optionSpecularView = input.readBoolean();
      o.specularViewColor.unserialize(input);
      o.specularViewBase = input.readFloat();
      o.specularViewLevel = input.readFloat();
      o.optionReflect = input.readBoolean();
      o.reflectColor.unserialize(input);
      o.reflectMerge = input.readFloat();
      o.optionRefract = input.readBoolean();
      o.refractFrontColor.unserialize(input);
      o.refractBackColor.unserialize(input);
      o.optionOpacity = input.readBoolean();
      o.opacityColor.unserialize(input);
      o.opacityRate = input.readFloat();
      o.opacityAlpha = input.readFloat();
      o.opacityDepth = input.readFloat();
      o.opacityTransmittance = input.readFloat();
      o.optionEmissive = input.readBoolean();
      o.emissiveColor.unserialize(input);
   }
   MO.SE3sMaterialInfo_saveConfig = function SE3sMaterialInfo_saveConfig(xconfig){
      var o = this;
      xconfig.set('effect_code', o.effectCode);
      xconfig.setBoolean('option_double', o.optionDouble);
      xconfig.setBoolean('option_alpha', o.optionAlpha);
      xconfig.setBoolean('option_normal_invert', o.optionNormalInvert);
      xconfig.setBoolean('option_shadow', o.optionShadow);
      xconfig.setBoolean('option_shadow_self', o.optionShadowSelf);
      var x = xconfig.create('Alpha');
      x.setBoolean('valid', o.optionAlpha);
      x.setFloat('base', o.alphaBase);
      x.setFloat('rate', o.alphaRate);
      var x = xconfig.create('Color');
      x.setBoolean('valid', o.optionColor);
      x.setFloat('min', o.colorMin);
      x.setFloat('max', o.colorMax);
      x.setFloat('balance', o.colorBalance);
      x.setFloat('rate', o.colorRate);
      var x = xconfig.create('Vertex')
      x.setBoolean('valid', o.optionVertex);
      o.vertexColor.savePower(x);
      var x = xconfig.create('Ambient')
      x.setBoolean('valid', o.optionAmbient);
      o.ambientColor.savePower(x);
      var x = xconfig.create('Diffuse');
      x.setBoolean('valid', o.optionDiffuse);
      o.diffuseColor.savePower(x);
      var x = xconfig.create('DiffuseView');
      x.setBoolean('valid', o.optionDiffuseView);
      o.diffuseViewColor.savePower(x);
      var x = xconfig.create('Specular');
      x.setBoolean('valid', o.optionSpecular);
      o.specularColor.savePower(x);
      x.setFloat('base', o.specularBase);
      x.setFloat('level', o.specularLevel);
      var x = xconfig.create('SpecularView');
      x.setBoolean('valid', o.optionSpecularView);
      o.specularViewColor.savePower(x);
      x.setFloat('base', o.specularViewBase);
      x.setFloat('level', o.specularViewLevel);
      var x = xconfig.create('Reflect');
      x.setBoolean('valid', o.optionReflect);
      o.reflectColor.savePower(x);
      x.setFloat('merge', o.reflectMerge);
      var x = xconfig.create('Refract')
      x.setBoolean('valid', o.optionRefract);
      o.refractFrontColor.savePower(x.create('Front'));
      o.refractBackColor.savePower(x.create('Back'));
      var x = xconfig.create('Opacity')
      x.setBoolean('valid', o.optionOpacity);
      o.opacityColor.savePower(x);
      x.setFloat('rate', o.opacityRate);
      x.setFloat('alpha', o.opacityAlpha);
      x.setFloat('depth', o.opacityDepth);
      x.setFloat('transmittance', o.opacityTransmittance);
      var x = xconfig.create('Emissive')
      x.setBoolean('valid', o.optionEmissive);
      o.emissiveColor.savePower(x);
   }
}
with(MO){
   MO.SE3sSceneShadow = function SE3sSceneShadow(){
      var o = this;
      o.base        = null;
      o.rate        = null;
      o.level       = null;
      o.range       = null;
      o.unserialize = SE3sSceneShadow_unserialize;
      return o;
   }
   MO.SE3sSceneShadow_unserialize = function SE3sSceneShadow_unserialize(p){
      var o = this;
      o.base = p.readFloat();
      o.rate = p.readFloat();
      o.level = p.readFloat();
      o.range = p.readFloat();
   }
}
with(MO){
   MO.FE3sAnimation = function FE3sAnimation(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._model           = null;
      o._skeletonGuid    = null;
      o._skeleton        = null;
      o._frameCount      = 0;
      o._frameTick       = 0;
      o._frameSpan       = 0;
      o._frameTranslates = null;
      o._frameRotations  = null;
      o._frameScales     = null;
      o._tracks          = null;
      o.skeletonGuid     = FE3sAnimation_skeletonGuid;
      o.skeleton         = FE3sAnimation_skeleton;
      o.frameCount       = FE3sAnimation_frameCount;
      o.frameTick        = FE3sAnimation_frameTick;
      o.frameSpan        = FE3sAnimation_frameSpan;
      o.tracks           = FE3sAnimation_tracks;
      o.unserialize      = FE3sAnimation_unserialize;
      return o;
   }
   MO.FE3sAnimation_skeletonGuid = function FE3sAnimation_skeletonGuid(){
      return this._skeletonGuid;
   }
   MO.FE3sAnimation_skeleton = function FE3sAnimation_skeleton(){
      var o = this;
      var skeleton = o._skeleton;
      if(!skeleton){
         var guid = o._skeletonGuid;
         if(guid){
            skeleton = o._skeleton = RConsole.find(FE3sModelConsole).findSkeleton(guid);
         }
      }
      return skeleton;
   }
   MO.FE3sAnimation_frameCount = function FE3sAnimation_frameCount(){
      return this._frameCount;
   }
   MO.FE3sAnimation_frameTick = function FE3sAnimation_frameTick(){
      return this._frameTick;
   }
   MO.FE3sAnimation_frameSpan = function FE3sAnimation_frameSpan(){
      return this._frameSpan;
   }
   MO.FE3sAnimation_tracks = function FE3sAnimation_tracks(){
      return this._tracks;
   }
   MO.FE3sAnimation_unserialize = function FE3sAnimation_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input)
      o._skeletonGuid = input.readString();
      o._frameCount = input.readUint16();
      o._frameTick = input.readUint16();
      o._frameSpan = input.readUint32();
      var translateCount = input.readUint32();
      var translateBytes = RInteger.strideByte(translateCount);
      if(translateCount > 0){
         var translates = o._frameTranslates = new TObjects();
         for(var i = 0; i < translateCount; i++){
            var translate = new SPoint3();
            translate.unserialize(input);
            translates.push(translate);
         }
      }
      var rotationCount = input.readUint32();
      var rotationBytes = RInteger.strideByte(rotationCount);
      if(rotationCount > 0){
         var rotations = o._frameRotations = new TObjects();
         for(var i = 0; i < rotationCount; i++){
            var rotation = new SQuaternion();
            rotation.unserialize(input);
            rotations.push(rotation);
         }
      }
      var scaleCount = input.readUint32();
      var scaleBytes = RInteger.strideByte(scaleCount);
      if(scaleCount > 0){
         var scales = o._frameScales = new TObjects();
         for(var i = 0; i < scaleCount; i++){
            var scale = new SVector3();
            scale.unserialize(input);
            scales.push(scale);
         }
      }
      var tracks = null;
      var trackCount = input.readUint16();
      if(trackCount > 0){
         tracks = o._tracks = new TObjects();
         for(var n = 0; n < trackCount; n++){
            var track = RClass.create(FE3sTrack);
            track.unserialize(input);
            tracks.push(track);
            var frameCount = track._frameCount;
            var frames = track._frames;
            for(var i = 0; i < frameCount; i++){
               var frame = RClass.create(FE3sFrame);
               var translateIndex = 0;
               if(translateBytes == 4){
                  translateIndex = input.readUint32();
               }else if(translateBytes == 2){
                  translateIndex = input.readUint16();
               }else{
                  translateIndex = input.readUint8();
               }
               frame._translation = translates.at(translateIndex);
               var rotationIndex = 0;
               if(rotationBytes == 4){
                  rotationIndex = input.readUint32();
               }else if(rotationBytes == 2){
                  rotationIndex = input.readUint16();
               }else{
                  rotationIndex = input.readUint8();
               }
               frame._quaternion = rotations.at(rotationIndex);
               var scaleIndex = 0;
               if(scaleBytes == 4){
                  scaleIndex = input.readUint32();
               }else if(scaleBytes == 2){
                  scaleIndex = input.readUint16();
               }else{
                  scaleIndex = input.readUint8();
               }
               frame._scale = scales.at(scaleIndex);
               frames.push(frame);
            }
         }
      }
      if(tracks && o._skeletonGuid){
         var skeleton = o.skeleton();
         for(var i = 0; i < trackCount; i++){
            var track = tracks.at(i);
            var boneIndex = track.boneIndex();
            var bone = skeleton.findBone(boneIndex);
            bone.setTrack(track);
         }
         skeleton.pushAnimation(o);
      }
   }
}
with(MO){
   MO.FE3sBone = function FE3sBone(o){
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
   MO.FE3sBone_index = function FE3sBone_index(){
      return this._index;
   }
   MO.FE3sBone_track = function FE3sBone_track(){
      return this._track;
   }
   MO.FE3sBone_setTrack = function FE3sBone_setTrack(p){
      this._track = p;
   }
   MO.FE3sBone_bones = function FE3sBone_bones(){
      return this._bones;
   }
   MO.FE3sBone_unserialize = function FE3sBone_unserialize(p){
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
}
with(MO){
   MO.FE3sBoneRefer = function FE3sBoneRefer(o){
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
   MO.FE3sBoneRefer_index = function FE3sBoneRefer_index(){
      return this._index;
   }
   MO.FE3sBoneRefer_bone = function FE3sBoneRefer_bone(){
      return this._bone;
   }
   MO.FE3sBoneRefer_setBone = function FE3sBoneRefer_setBone(p){
      this._bone = p;
   }
   MO.FE3sBoneRefer_track = function FE3sBoneRefer_track(){
      return this._track;
   }
   MO.FE3sBoneRefer_setTrack = function FE3sBoneRefer_setTrack(p){
      this._track = p;
   }
   MO.FE3sBoneRefer_unserialize = function FE3sBoneRefer_unserialize(p){
      var o = this;
      o._index = p.readUint8();
   }
}
with(MO){
   MO.FE3sCamera = function FE3sCamera(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._typeCd     = null;
      o._position   = null;
      o._direction  = null;
      o._projection = null;
      o.construct   = FE3sCamera_construct;
      o.typeCd      = FE3sCamera_typeCd;
      o.position    = FE3sCamera_position;
      o.direction   = FE3sCamera_direction;
      o.projection  = FE3sCamera_projection;
      o.unserialize = FE3sCamera_unserialize;
      o.saveConfig  = FE3sCamera_saveConfig;
      return o;
   }
   MO.FE3sCamera_construct = function FE3sCamera_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._position = new SPoint3();
      o._direction = new SVector3();
      o._projection = RClass.create(FE3sProjection);
   }
   MO.FE3sCamera_typeCd = function FE3sCamera_typeCd(){
      return this._typeCd;
   }
   MO.FE3sCamera_position = function FE3sCamera_position(){
      return this._position;
   }
   MO.FE3sCamera_direction = function FE3sCamera_direction(){
      return this._direction;
   }
   MO.FE3sCamera_projection = function FE3sCamera_projection(){
      return this._projection;
   }
   MO.FE3sCamera_unserialize = function FE3sCamera_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._typeCd = p.readString();
      o._position.unserialize(p);
      o._direction.unserialize(p);
      o._projection.unserialize(p);
   }
   MO.FE3sCamera_saveConfig = function FE3sCamera_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('position', o._position.toString());
      xconfig.set('direction', o._direction.toString());
      o._projection.saveConfig(xconfig.create('Projection'));
   }
}
with(MO){
   MO.FE3sComponent = function FE3sComponent(o){
      o = RClass.inherits(this, o, FE3sObject);
      return o;
   }
}
with(MO){
   MO.FE3sDisplay = function FE3sDisplay(o){
      o = RClass.inherits(this, o, FE3sDrawable);
      o._outline         = null;
      o._renderables     = null;
      o.construct        = FE3sDisplay_construct;
      o.renderables      = FE3sDisplay_renderables;
      o.calculateOutline = FE3sDisplay_calculateOutline;
      o.unserialize      = FE3sDisplay_unserialize;
      o.saveConfig       = FE3sDisplay_saveConfig;
      o.clone            = FE3sDisplay_clone;
      return o;
   }
   MO.FE3sDisplay_construct = function FE3sDisplay_construct(){
      var o = this;
      o.__base.FE3sDrawable.construct.call(o);
      o._outline = new SOutline3d();
   }
   MO.FE3sDisplay_renderables = function FE3sDisplay_renderables(){
      return this._renderables;
   }
   MO.FE3sDisplay_calculateOutline = function FE3sDisplay_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         var renderabels = o._renderables;
         if(renderabels){
            outline.setMin();
            var count = renderabels.count();
            for(var i = 0; i < count; i++){
               var renderable = renderabels.getAt(i);
               var renderableOutline = renderable.calculateOutline();
               outline.mergeMax(renderableOutline);
            }
            outline.update();
         }
      }
      return outline;
   }
   MO.FE3sDisplay_unserialize = function FE3sDisplay_unserialize(input){
      var o = this;
      o.__base.FE3sDrawable.unserialize.call(o, input);
      var resourceConsole = RConsole.find(FE3sResourceConsole);
      var renderableCount = input.readUint16();
      if(renderableCount > 0){
         var renderables = o._renderables = new TObjects();
         for(var i = 0; i < renderableCount; i++){
            var renderable = resourceConsole.unserialize(input);
            renderables.push(renderable);
         }
      }
   }
   MO.FE3sDisplay_saveConfig = function FE3sDisplay_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
      var renderables = o._renderables;
      if(renderables){
         var xrenderables = xconfig.create('RenderableCollection');
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            renderable.saveConfig(xrenderables.create('Renderable'));
         }
      }
   }
   MO.FE3sDisplay_clone = function FE3sDisplay_clone(instance){
      var o = this;
      var result = o.__base.FE3sDrawable.clone.call(o, instance);
      result._outline.assign(o._outline)
      return result;
   }
}
with(MO){
   MO.FE3sDisplayContainer = function FE3sDisplayContainer(o){
      o = RClass.inherits(this, o, FE3sDisplay);
      o._displays        = null;
      o.construct        = FE3sDisplayContainer_construct;
      o.displays         = FE3sDisplayContainer_displays;
      o.pushDisplay      = FE3sDisplayContainer_pushDisplay;
      o.calculateOutline = FE3sDisplayContainer_calculateOutline;
      o.unserialize      = FE3sDisplayContainer_unserialize;
      o.saveConfig       = FE3sDisplayContainer_saveConfig;
      o.clone            = FE3sDisplayContainer_clone;
      return o;
   }
   MO.FE3sDisplayContainer_construct = function FE3sDisplayContainer_construct(){
      var o = this;
      o.__base.FE3sDisplay.construct.call(o);
   }
   MO.FE3sDisplayContainer_displays = function FE3sDisplayContainer_displays(){
      return this._displays;
   }
   MO.FE3sDisplayContainer_pushDisplay = function FE3sDisplayContainer_pushDisplay(display){
      var o = this;
      var displays = o._displays;
      if(!displays){
         displays = o._displays = new TObjects();
      }
      display.setParent(o);
      displays.push(display);
   }
   MO.FE3sDisplayContainer_calculateOutline = function FE3sDisplayContainer_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         var renderabels = o._renderables;
         if(renderabels){
            outline.setMin();
            var count = renderabels.count();
            for(var i = 0; i < count; i++){
               var renderable = renderabels.getAt(i);
               var renderableOutline = renderable.calculateOutline();
               outline.mergeMax(renderableOutline);
            }
            outline.update();
         }
      }
      return outline;
   }
   MO.FE3sDisplayContainer_unserialize = function FE3sDisplayContainer_unserialize(input){
      var o = this;
      o.__base.FE3sDisplay.unserialize.call(o, input);
      var displayCount = input.readUint16();
      if(displayCount > 0){
         var displays = o._displays = new TObjects();
         for(var i = 0; i < displayCount; i++){
            var display = RClass.create(FE3sSceneDisplay);
            display.unserialize(input);
            o.pushDisplay(display);
         }
      }
   }
   MO.FE3sDisplayContainer_saveConfig = function FE3sDisplayContainer_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDisplay.saveConfig.call(o, xconfig);
      var displays = o._displays;
      if(displays){
         var xdisplays = xconfig.create('DisplayCollection');
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.saveConfig(xdisplays.create('Display'));
         }
      }
   }
   MO.FE3sDisplayContainer_clone = function FE3sDisplayContainer_clone(instance){
      var o = this;
      var result = o.__base.FE3sDisplay.clone.call(o, instance);
      return result;
   }
}
with(MO){
   MO.FE3sDisplayLayer = function FE3sDisplayLayer(o){
      o = RClass.inherits(this, o, FE3sDisplayContainer);
      o._typeCd        = null;
      o._transformCd   = null;
      o.typeCd         = FE3sDisplayLayer_typeCd;
      o.setTypeCd      = FE3sDisplayLayer_setTypeCd;
      o.transformCd    = FE3sDisplayLayer_transformCd;
      o.setTransformCd = FE3sDisplayLayer_setTransformCd;
      o.unserialize    = FE3sDisplayLayer_unserialize;
      o.saveConfig     = FE3sDisplayLayer_saveConfig;
      return o;
   }
   MO.FE3sDisplayLayer_typeCd = function FE3sDisplayLayer_typeCd(){
      return this._typeCd;
   }
   MO.FE3sDisplayLayer_setTypeCd = function FE3sDisplayLayer_setTypeCd(p){
      this._typeCd = p;
   }
   MO.FE3sDisplayLayer_transformCd = function FE3sDisplayLayer_transformCd(){
      return this._transformCd;
   }
   MO.FE3sDisplayLayer_setTransformCd = function FE3sDisplayLayer_setTransformCd(p){
      this._transformCd = p;
   }
   MO.FE3sDisplayLayer_unserialize = function FE3sDisplayLayer_unserialize(input){
      var o = this;
      o.__base.FE3sDisplayContainer.unserialize.call(o, input);
      o._typeCd = input.readString();
      o._transformCd = input.readString();
   }
   MO.FE3sDisplayLayer_saveConfig = function FE3sDisplayLayer_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
      xconfig.set('type_cd', o._typeCd);
      xconfig.set('transform_cd', o._transformCd);
   }
}
with(MO){
   MO.FE3sDisplayMaterial = function FE3sDisplayMaterial(o){
      o = RClass.inherits(this, o, FObject);
      o._groupGuid  = null;
      o._material   = null;
      o.groupGuid   = FE3sDisplayMaterial_groupGuid;
      o.material    = FE3sDisplayMaterial_material;
      o.unserialize = FE3sDisplayMaterial_unserialize;
      return o;
   }
   MO.FE3sDisplayMaterial_groupGuid = function FE3sDisplayMaterial_groupGuid(){
      return this._groupGuid;
   }
   MO.FE3sDisplayMaterial_material = function FE3sDisplayMaterial_material(){
      return this._material;
   }
   MO.FE3sDisplayMaterial_unserialize = function FE3sDisplayMaterial_unserialize(p){
      var o = this;
      o._groupGuid = p.readString();
      o._material = o._template._activeTheme.findMaterial(o._groupGuid);
   }
}
with(MO){
   MO.FE3sDrawable = function FE3sDrawable(o){
      o = RClass.inherits(this, o, FE3sComponent);
      o._matrix     = null;
      o.construct   = FE3sDrawable_construct;
      o.matrix      = FE3sDrawable_matrix;
      o.unserialize = FE3sDrawable_unserialize;
      o.saveConfig  = FE3sDrawable_saveConfig;
      o.clone       = FE3sDrawable_clone;
      return o;
   }
   MO.FE3sDrawable_construct = function FE3sDrawable_construct(){
      var o = this;
      o.__base.FE3sComponent.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3sDrawable_matrix = function FE3sDrawable_matrix(){
      return this._matrix;
   }
   MO.FE3sDrawable_unserialize = function FE3sDrawable_unserialize(input){
      var o = this;
      o.__base.FE3sComponent.unserialize.call(o, input);
      o._matrix.unserialize(input);
   }
   MO.FE3sDrawable_saveConfig = function FE3sDrawable_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sComponent.saveConfig.call(o, xconfig);
      o._matrix.saveConfig(xconfig.create('Matrix'));
   }
   MO.FE3sDrawable_clone = function FE3sDrawable_clone(instance){
      var o = this;
      var result = o.__base.FE3sComponent.clone.call(o, instance);
      result._matrix.assign(o._matrix);
      return result;
   }
}
with(MO){
   MO.FE3sFrame = function FE3sFrame(o){
      o = RClass.inherits(this, o, FObject);
      o._translation = null;
      o._quaternion  = null;
      o._scale       = null;
      o.translation  = FE3sFrame_translation;
      o.quaternion   = FE3sFrame_quaternion;
      o.scale        = FE3sFrame_scale;
      return o;
   }
   MO.FE3sFrame_tick = function FE3sFrame_tick(){
      return this._tick;
   }
   MO.FE3sFrame_translation = function FE3sFrame_translation(){
      return this._translation;
   }
   MO.FE3sFrame_quaternion = function FE3sFrame_quaternion(){
      return this._quaternion;
   }
   MO.FE3sFrame_scale = function FE3sFrame_scale(){
      return this._scale;
   }
}
with(MO){
   MO.FE3sGeometry = function FE3sGeometry(o){
      o = RClass.inherits(this, o, FE3sRenderable, ME3sGeometry);
      o.construct     = FE3sGeometry_construct;
      o.unserialize   = FE3sGeometry_unserialize;
      o.dispose       = FE3sGeometry_dispose;
      return o;
   }
   MO.FE3sGeometry_construct = function FE3sGeometry_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
      o.__base.ME3sGeometry.construct.call(o);
   }
   MO.FE3sGeometry_unserialize = function FE3sGeometry_unserialize(input){
      var o = this;
      o.__base.FE3sRenderable.unserialize.call(o, input);
      var outline = o._outline;
      outline.unserialize(input);
      var streamCount = input.readInt8();
      if(streamCount > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input)
            streams.push(stream);
         }
      }
      if(outline.isEmpty()){
         o.calculateOutline();
      }
      outline.update();
   }
   MO.FE3sGeometry_dispose = function FE3sGeometry_dispose(){
      var o = this;
      o.__base.ME3sGeometry.dispose.call(o);
      o.__base.FE3sRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3sLight = function FE3sLight(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._typeName   = null;
      o._material   = null;
      o._camera     = null;
      o.construct   = FE3sLight_construct;
      o.typeName    = FE3sLight_typeName;
      o.material    = FE3sLight_material;
      o.camera      = FE3sLight_camera;
      o.unserialize = FE3sLight_unserialize;
      return o;
   }
   MO.FE3sLight_construct = function FE3sLight_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._material = RClass.create(FE3sMaterial);
      o._camera = RClass.create(FE3sCamera);
   }
   MO.FE3sLight_typeName = function FE3sLight_typeName(){
      return this._typeName;
   }
   MO.FE3sLight_material = function FE3sLight_material(){
      return this._material;
   }
   MO.FE3sLight_camera = function FE3sLight_camera(){
      return this._camera;
   }
   MO.FE3sLight_unserialize = function FE3sLight_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._typeName = p.readString();
      o._material.unserialize(p);
      o._camera.unserialize(p);
   }
}
with(MO){
   MO.FE3sMaterial = function FE3sMaterial(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._parentGuid  = null;
      o._info        = null;
      o._bitmaps     = null;
      o._bitmapPacks = null;
      o.construct    = FE3sMaterial_construct;
      o.parentGuid   = FE3sMaterial_parentGuid;
      o.effectCode   = FE3sMaterial_effectCode;
      o.info         = FE3sMaterial_info;
      o.bitmaps      = FE3sMaterial_bitmaps;
      o.bitmapPacks  = FE3sMaterial_bitmapPacks;
      o.unserialize  = FE3sMaterial_unserialize;
      o.saveConfig   = FE3sMaterial_saveConfig;
      o.clone        = FE3sMaterial_clone;
      return o;
   }
   MO.FE3sMaterial_construct = function FE3sMaterial_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._info = new SE3sMaterialInfo();
   }
   MO.FE3sMaterial_parentGuid = function FE3sMaterial_parentGuid(){
      return this._parentGuid;
   }
   MO.FE3sMaterial_effectCode = function FE3sMaterial_effectCode(){
      return this._info.effectCode;
   }
   MO.FE3sMaterial_info = function FE3sMaterial_info(){
      return this._info;
   }
   MO.FE3sMaterial_bitmaps = function FE3sMaterial_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3sMaterial_bitmapPacks = function FE3sMaterial_bitmapPacks(){
      return this._bitmapPacks;
   }
   MO.FE3sMaterial_unserialize = function FE3sMaterial_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._parentGuid = input.readString();
      o._info.unserialize(input);
      var packCount = input.readInt16();
      if(packCount > 0){
         var bitmapPacks = o._bitmapPacks = new TDictionary();
         for(var i = 0; i < packCount; i++){
            var bitmapPack = RClass.create(FE3sMaterialBitmapPack);
            bitmapPack.unserialize(input);
            bitmapPacks.set(bitmapPack.guid(), bitmapPack);
         }
      }
      var bitmapCount = input.readInt16();
      if(bitmapCount > 0){
         var bitmaps = o._bitmaps = new TObjects();
         for(var i = 0; i < bitmapCount; i++){
            var bitmap = RClass.create(FE3sMaterialBitmap);
            bitmap.unserialize(input);
            bitmaps.push(bitmap);
            var pack = bitmapPacks.get(bitmap.bitmapPackGuid());
            bitmap.setBitmapPack(pack);
         }
      }
   }
   MO.FE3sMaterial_saveConfig = function FE3sMaterial_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('parent_guid', o._parentGuid);
      o._info.saveConfig(xconfig);
   }
   MO.FE3sMaterial_clone = function FE3sMaterial_clone(instance){
      var o = this;
      var result = o.__base.FE3sObject.clone.call(o, instance);
      result._parentGuid = o._parentGuid;
      result._info.assign(o._info);
      return result;
   }
}
with(MO){
   MO.FE3sMaterialBitmap = function FE3sMaterialBitmap(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._bitmapPackGuid = null;
      o._bitmapPack     = null;
      o._bitmapGuid     = null;
      o._index          = 0;
      o.bitmapPackGuid  = FE3sMaterialBitmap_bitmapPackGuid;
      o.bitmapPack      = FE3sMaterialBitmap_bitmapPack;
      o.setBitmapPack   = FE3sMaterialBitmap_setBitmapPack;
      o.bitmapGuid      = FE3sMaterialBitmap_bitmapGuid;
      o.unserialize     = FE3sMaterialBitmap_unserialize;
      return o;
   }
   MO.FE3sMaterialBitmap_bitmapPackGuid = function FE3sMaterialBitmap_bitmapPackGuid(){
      return this._bitmapPackGuid;
   }
   MO.FE3sMaterialBitmap_bitmapPack = function FE3sMaterialBitmap_bitmapPack(){
      return this._bitmapPack;
   }
   MO.FE3sMaterialBitmap_setBitmapPack = function FE3sMaterialBitmap_setBitmapPack(bitmapPack){
      this._bitmapPack = bitmapPack;
   }
   MO.FE3sMaterialBitmap_bitmapGuid = function FE3sMaterialBitmap_bitmapGuid(){
      return this._bitmapGuid;
   }
   MO.FE3sMaterialBitmap_unserialize = function FE3sMaterialBitmap_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._bitmapPackGuid = input.readString();
      o._bitmapGuid = input.readString();
      o._index = input.readUint16();
   }
}
with(MO){
   MO.FE3sMaterialBitmapPack = function FE3sMaterialBitmapPack(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._typeName       = null;
      o._formatName     = null;
      o._size           = null;
      o.construct       = FE3sMaterialBitmapPack_construct;
      o.typeName        = FE3sMaterialBitmapPack_typeName;
      o.formatName      = FE3sMaterialBitmapPack_formatName;
      o.size            = FE3sMaterialBitmapPack_size;
      o.unserialize     = FE3sMaterialBitmapPack_unserialize;
      o.dispose         = FE3sMaterialBitmapPack_dispose;
      return o;
   }
   MO.FE3sMaterialBitmapPack_construct = function FE3sMaterialBitmapPack_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3sMaterialBitmapPack_typeName = function FE3sMaterialBitmapPack_typeName(){
      return this._typeName;
   }
   MO.FE3sMaterialBitmapPack_formatName = function FE3sMaterialBitmapPack_formatName(){
      return this._formatName;
   }
   MO.FE3sMaterialBitmapPack_size = function FE3sMaterialBitmapPack_size(){
      return this._size;
   }
   MO.FE3sMaterialBitmapPack_unserialize = function FE3sMaterialBitmapPack_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._typeName = input.readString();
      o._formatName = input.readString();
      o._size.unserialize(input, EDataType.Uint16);
   }
   MO.FE3sMaterialBitmapPack_dispose = function FE3sMaterialBitmapPack_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o.__base.FE3sObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMaterialConsole = function FE3sMaterialConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._resources  = null;
      o._materials  = null;
      o.construct   = FE3sMaterialConsole_construct;
      o.find        = FE3sMaterialConsole_find;
      o.unserialize = FE3sMaterialConsole_unserialize;
      o.loadByGuid  = FE3sMaterialConsole_loadByGuid;
      o.dispose     = FE3sMaterialConsole_dispose;
      return o;
   }
   MO.FE3sMaterialConsole_construct = function FE3sMaterialConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._resources = new TDictionary();
      o._materials = new TDictionary();
   }
   MO.FE3sMaterialConsole_find = function FE3sMaterialConsole_find(p){
      return this._materials.get(p);
   }
   MO.FE3sMaterialConsole_unserialize = function FE3sMaterialConsole_unserialize(input){
      var o = this;
      var material = RClass.create(FE3sMaterial);
      material.unserialize(input);
      var materialGuid = material.guid();
      if(o._materials.contains(materialGuid)){
         throw new TError(o, 'Material is already exists.');
      }
      o._materials.set(materialGuid, material);
      return material;
   }
   MO.FE3sMaterialConsole_loadByGuid = function FE3sMaterialConsole_loadByGuid(guid){
      var o = this;
      var resources = o._resources;
      var resource = resources.get(guid);
      if(resource){
         return resource;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('material');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      resource = RClass.create(FE3sMaterialResource);
      resource.setGuid(guid);
      resource.setVendor(vendor);
      resource.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(resource);
      resources.set(guid, resource);
      return resource;
   }
   MO.FE3sMaterialConsole_dispose = function FE3sMaterialConsole_dispose(){
      var o = this;
      o._resources = RObject.free(o._resources);
      o._materials = RObject.free(o._materials);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMaterialRefer = function FE3sMaterialRefer(o){
      o = RClass.inherits(this, o, FE3sObject);
      return o;
   }
}
with(MO){
   MO.FE3sMaterialResource = function FE3sMaterialResource(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._typeName     = 'Material';
      o._dataCompress = true;
      o._material     = null;
      o.material      = FE3sMaterialResource_material;
      o.unserialize   = FE3sMaterialResource_unserialize;
      return o;
   }
   MO.FE3sMaterialResource_material = function FE3sMaterialResource_material(){
      return this._material;
   }
   MO.FE3sMaterialResource_unserialize = function FE3sMaterialResource_unserialize(input){
      var o = this;
      o.__base.FE3sResource.unserialize.call(o, input);
      o._material = RConsole.find(FE3sMaterialConsole).unserialize(input);
      MO.Logger.info(o, "Unserialize material success. (guid={1}, code={2})", o._guid, o._code);
   }
}
with(MO){
   MO.FE3sMesh = function FE3sMesh(o){
      o = RClass.inherits(this, o, FE3sSpace, ME3sGeometry);
      o._dataCompress = true;
      o._typeName     = 'Mesh';
      o._display      = null;
      o._renderable   = null;
      o.construct     = FE3sMesh_construct;
      o.unserialize   = FE3sMesh_unserialize;
      o.saveConfig    = FE3sMesh_saveConfig;
      o.dispose       = FE3sMesh_dispose;
      return o;
   }
   MO.FE3sMesh_construct = function FE3sMesh_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
      o.__base.ME3sGeometry.construct.call(o);
      o._display = RClass.create(FE3sMeshDisplay);
   }
   MO.FE3sMesh_unserialize = function FE3sMesh_unserialize(input){
      var o = this;
      o.__base.FE3sSpace.unserialize.call(o, input);
      o._outline.unserialize(input);
      o._outline.update();
      var streamCount = input.readInt8();
      if(streamCount > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input)
            streams.push(stream);
         }
      }
      o._display.unserialize(input);
      o._renderable = o._display._renderable;
   }
   MO.FE3sMesh_saveConfig = function FE3sMesh_saveConfig(config){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, config);
      o._display.saveConfig(config.create('Display'));
   }
   MO.FE3sMesh_dispose = function FE3sMesh_dispose(){
      var o = this;
      o._outline = RObject.dispose(o._outline);
      o._display = RObject.dispose(o._display);
      o.__base.ME3sGeometry.dispose.call(o);
      o.__base.FE3sSpace.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMeshConsole = function FE3sMeshConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._venderCode = 'mesh';
      o._serviceUrl = '/cloud.content.mesh.ws'
      o._dataUrl    = '/cloud.content.mesh.wv'
      o._meshs      = null;
      o.construct   = FE3sMeshConsole_construct;
      o.find        = FE3sMeshConsole_find;
      o.meshs       = FE3sMeshConsole_meshs;
      o.loadByGuid  = FE3sMeshConsole_loadByGuid;
      o.loadByCode  = FE3sMeshConsole_loadByCode;
      o.dispose     = FE3sMeshConsole_dispose;
      return o;
   }
   MO.FE3sMeshConsole_construct = function FE3sMeshConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._meshs = new TDictionary();
   }
   MO.FE3sMeshConsole_find = function FE3sMeshConsole_find(p){
      return this._meshs.get(p);
   }
   MO.FE3sMeshConsole_meshs = function FE3sMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3sMeshConsole_loadByGuid = function FE3sMeshConsole_loadByGuid(p){
      var o = this;
      var s = o._meshs;
      var r = s.get(p);
      if(r){
         return r;
      }
      var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
      v.set('guid', p);
      var u = v.makeUrl();
      r = RClass.create(FE3sMesh);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
      return r;
   }
   MO.FE3sMeshConsole_loadByCode = function FE3sMeshConsole_loadByCode(p){
      var o = this;
      var s = o._meshs;
      var r = s.get(p);
      if(r){
         return r;
      }
      var v = RConsole.find(FE3sVendorConsole).find(o._venderCode);
      v.set('code', p);
      var u = v.makeUrl();
      r = RClass.create(FE3sMesh);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
      return r;
   }
   MO.FE3sMeshConsole_dispose = function FE3sMeshConsole_dispose(){
      var o = this;
      o._meshs = RObject.free(o._meshs);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sMeshDisplay = function FE3sMeshDisplay(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._matrix     = null;
      o._material   = null;
      o._renderable = null;
      o.construct   = FE3sMeshDisplay_construct;
      o.matrix      = FE3sMeshDisplay_matrix;
      o.material    = FE3sMeshDisplay_material;
      o.renderable  = FE3sMeshDisplay_renderable;
      o.unserialize = FE3sMeshDisplay_unserialize;
      o.saveConfig  = FE3sMeshDisplay_saveConfig;
      return o;
   }
   MO.FE3sMeshDisplay_construct = function FE3sMeshDisplay_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._material = RClass.create(FE3sMaterial);
      o._renderable = RClass.create(FE3sRenderable);
   }
   MO.FE3sMeshDisplay_matrix = function FE3sMeshDisplay_matrix(){
      return this._matrix;
   }
   MO.FE3sMeshDisplay_material = function FE3sMeshDisplay_material(){
      return this._material;
   }
   MO.FE3sMeshDisplay_renderable = function FE3sMeshDisplay_renderable(){
      return this._renderable;
   }
   MO.FE3sMeshDisplay_unserialize = function FE3sMeshDisplay_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._matrix.unserialize(p);
      o._material.unserialize(p);
      o._renderable.unserialize(p);
   }
   MO.FE3sMeshDisplay_saveConfig = function FE3sMeshDisplay_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      o._matrix.saveConfig(p.create('Matrix'));
      o._material.saveConfig(p.create('Material'));
      o._renderable.saveConfig(p.create('Renderable'));
   }
}
with(MO){
   MO.FE3sModel = function FE3sModel(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName      = 'Model';
      o._dataCompress  = true;
      o._dataBlock     = true;
      o._meshes        = null;
      o._skeletons     = null;
      o._animations    = null;
      o._display       = null;
      o.construct      = FE3sModel_construct;
      o.findMeshByCode = FE3sModel_findMeshByCode;
      o.meshes         = FE3sModel_meshes;
      o.skeletons      = FE3sModel_skeletons;
      o.animations     = FE3sModel_animations;
      o.display        = FE3sModel_display;
      o.unserialize    = FE3sModel_unserialize;
      o.saveConfig     = FE3sModel_saveConfig;
      return o;
   }
   MO.FE3sModel_construct = function FE3sModel_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
      var display = o._display = RClass.create(FE3sModelDisplay);
      display._model = o;
   }
   MO.FE3sModel_findMeshByCode = function FE3sModel_findMeshByCode(p){
      var s = this._meshes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3sModel_meshes = function FE3sModel_meshes(){
      return this._meshes;
   }
   MO.FE3sModel_skeletons = function FE3sModel_skeletons(){
      return this._skeletons;
   }
   MO.FE3sModel_animations = function FE3sModel_animations(){
      return this._animations;
   }
   MO.FE3sModel_display = function FE3sModel_display(){
      return this._display;
   }
   MO.FE3sModel_unserialize = function FE3sModel_unserialize(input){
      var o = this;
      o.__base.FE3sSpace.unserialize.call(o, input);
      var modelConsole = RConsole.find(FE3sModelConsole);
      modelConsole.models().set(o.guid(), o);
      var meshCount = input.readInt16();
      if(meshCount > 0){
         var meshes = o._meshes = new TDictionary();
         for(var i = 0; i < meshCount; i++){
            var mesh = modelConsole.unserialMesh(input)
            var meshGuid = mesh.guid();
            meshes.set(meshGuid, mesh);
         }
      }
      var skeletonCount = input.readInt16();
      if(skeletonCount > 0){
         var s = o._skeletons = new TObjects();
         for(var i = 0; i < skeletonCount; i++){
            var skeleton = modelConsole.unserialSkeleton(input)
            s.push(skeleton);
         }
      }
      var animationCount = input.readInt16();
      if(animationCount > 0){
         var animations = o._animations = new TObjects();
         for(var i = 0; i < animationCount; i++){
            var animation = modelConsole.unserialAnimation(o, input)
            animations.push(animation);
         }
      }
      var display = o._display;
      display.unserialize(input);
      var renderables = display.renderables();
      if(renderables){
         var renderableCount = renderables.count();
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.get(i);
            var meshGuid = renderable.meshGuid();
            var mesh = meshes.get(meshGuid);
            renderable.setMesh(mesh);
         }
      }
      MO.Logger.info(o, "Unserialize model success. (guid={1}, code={2})", o._guid, o._code);
   }
   MO.FE3sModel_saveConfig = function FE3sModel_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, xconfig);
      o._display.saveConfig(xconfig.create('Display'));
   }
}
with(MO){
   MO.FE3sModelConsole = function FE3sModelConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._models           = null;
      o._meshs            = null;
      o._skeletons        = null;
      o._animations       = null;
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
   MO.FE3sModelConsole_construct = function FE3sModelConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._models = new TDictionary();
      o._meshs = new TDictionary();
      o._skeletons = new TDictionary();
      o._animations = new TDictionary();
      var rc = RConsole.find(FResourceConsole);
      var rp = RClass.create(FResourcePipeline);
      var rt = RClass.create(FResourceType);
      rt.setCode('resource3d.model');
      rt._pipeline = rp;
      rc.registerType(rt);
   }
   MO.FE3sModelConsole_findModel = function FE3sModelConsole_findModel(p){
      return this._models.get(p);
   }
   MO.FE3sModelConsole_models = function FE3sModelConsole_models(){
      return this._models;
   }
   MO.FE3sModelConsole_findMesh = function FE3sModelConsole_findMesh(p){
      return this._meshs.get(p);
   }
   MO.FE3sModelConsole_meshs = function FE3sModelConsole_meshs(){
      return this._meshs;
   }
   MO.FE3sModelConsole_findSkeleton = function FE3sModelConsole_findSkeleton(p){
      return this._skeletons.get(p);
   }
   MO.FE3sModelConsole_skeletons = function FE3sModelConsole_skeletons(){
      return this._skeletons;
   }
   MO.FE3sModelConsole_findAnimation = function FE3sModelConsole_findAnimation(p){
      return this._animations.get(p);
   }
   MO.FE3sModelConsole_animations = function FE3sModelConsole_animations(){
      return this._animations;
   }
   MO.FE3sModelConsole_unserialMesh = function FE3sModelConsole_unserialMesh(p){
      var o = this;
      var r = RClass.create(FE3sModelMesh);
      r.unserialize(p);
      o._meshs.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_unserialSkeleton = function FE3sModelConsole_unserialSkeleton(p){
      var o = this;
      var r = RClass.create(FE3sSkeleton);
      r.unserialize(p);
      o._skeletons.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_unserialAnimation = function FE3sModelConsole_unserialAnimation(m, p){
      var o = this;
      var r = RClass.create(FE3sAnimation);
      r._model = m;
      r.unserialize(p);
      o._animations.set(r.guid(), r);
      return r;
   }
   MO.FE3sModelConsole_load = function FE3sModelConsole_load(guid){
      var o = this;
      var models = o._models;
      var model = models.get(guid);
      if(model){
         return model;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('model');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      model = RClass.create(FE3sModel);
      model.setGuid(guid);
      model.setVendor(vendor);
      model.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(model);
      models.set(guid, model);
      return model;
   }
   MO.FE3sModelConsole_dispose = function FE3sModelConsole_dispose(){
      var o = this;
      o._materials = RObject.free(o._materials);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sModelDisplay = function FE3sModelDisplay(o){
      o = RClass.inherits(this, o, FE3sDisplay);
      o._model           = null;
      o._material        = null;
      o.construct        = FE3sModelDisplay_construct;
      o.material         = FE3sModelDisplay_material;
      o.calculateOutline = FE3sModelDisplay_calculateOutline;
      o.unserialize      = FE3sModelDisplay_unserialize;
      o.saveConfig       = FE3sModelDisplay_saveConfig;
      return o;
   }
   MO.FE3sModelDisplay_construct = function FE3sModelDisplay_construct(){
      var o = this;
      o.__base.FE3sDisplay.construct.call(o);
      o._material = RClass.create(FE3sMaterial);
   }
   MO.FE3sModelDisplay_material = function FE3sModelDisplay_material(){
      return this._material;
   }
   MO.FE3sModelDisplay_calculateOutline = function FE3sModelDisplay_calculateOutline(){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty()){
         var meshes = o._model.meshes();
         if(meshes){
            outline.setMin();
            var count = meshes.count();
            for(var i = 0; i < count; i++){
               var mesh = meshes.at(i);
               var meshOutline = mesh.calculateOutline();
               outline.mergeMax(meshOutline);
            }
            outline.update();
         }
      }
      return outline;
   }
   MO.FE3sModelDisplay_unserialize = function FE3sModelDisplay_unserialize(p){
      var o = this;
      o.__base.FE3sDisplay.unserialize.call(o, p);
      o._material.unserialize(p);
   }
   MO.FE3sModelDisplay_saveConfig = function FE3sModelDisplay_saveConfig(p){
      var o = this;
      o.__base.FE3sDisplay.saveConfig.call(o, p);
      o._material.saveConfig(p.create('Material'));
   }
}
with(MO){
   MO.FE3sModelMesh = function FE3sModelMesh(o){
      o = RClass.inherits(this, o, FE3sGeometry);
      return o;
   }
}
with(MO){
   MO.FE3sModelRenderable = function FE3sModelRenderable(o){
      o = RClass.inherits(this, o, FE3sRenderable);
      o._meshGuid   = null;
      o._mesh       = null;
      o.construct   = FE3sModelRenderable_construct;
      o.meshGuid    = FE3sModelRenderable_meshGuid;
      o.mesh        = FE3sModelRenderable_mesh;
      o.setMesh     = FE3sModelRenderable_setMesh;
      o.unserialize = FE3sModelRenderable_unserialize;
      o.saveConfig  = FE3sModelRenderable_saveConfig;
      return o;
   }
   MO.FE3sModelRenderable_construct = function FE3sModelRenderable_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
   }
   MO.FE3sModelRenderable_meshGuid = function FE3sModelRenderable_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sModelRenderable_mesh = function FE3sModelRenderable_mesh(){
      return this._mesh;
   }
   MO.FE3sModelRenderable_setMesh = function FE3sModelRenderable_setMesh(mesh){
      this._mesh = mesh;
   }
   MO.FE3sModelRenderable_unserialize = function FE3sModelRenderable_unserialize(input){
      var o = this;
      o.__base.FE3sRenderable.unserialize.call(o, input);
      o._meshGuid = input.readString();
   }
   MO.FE3sModelRenderable_saveConfig = function FE3sModelRenderable_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sRenderable.saveConfig.call(o, xconfig);
      xconfig.set('mesh_guid', o._meshGuid);
   }
}
with(MO){
   MO.FE3sMovie = function FE3sMovie(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._interval   = null;
      o._rotation   = null;
      o.construct   = FE3sMovie_construct;
      o.interval    = FE3sMovie_interval;
      o.setInterval = FE3sMovie_setInterval;
      o.rotation    = FE3sMovie_rotation;
      o.unserialize = FE3sMovie_unserialize;
      o.saveConfig  = FE3sMovie_saveConfig;
      o.dispose     = FE3sMovie_dispose;
      return o;
   }
   MO.FE3sMovie_construct = function FE3sMovie_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._rotation = new SVector3();
   }
   MO.FE3sMovie_interval = function FE3sMovie_interval(){
      return this._interval;
   }
   MO.FE3sMovie_setInterval = function FE3sMovie_setInterval(interval){
      this._interval = interval;
   }
   MO.FE3sMovie_rotation = function FE3sMovie_rotation(){
      return this._rotation;
   }
   MO.FE3sMovie_unserialize = function FE3sMovie_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._interval = input.readInt32();
      o._rotation.unserialize(input);
   }
   MO.FE3sMovie_saveConfig = function FE3sMovie_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('interval', o._interval);
      xconfig.set('rotation', o._rotation);
   }
   MO.FE3sMovie_dispose = function FE3sMovie_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FE3sObject.disposet.call(o);
   }
}
with(MO){
   MO.FE3sObject = function FE3sObject(o){
      o = RClass.inherits(this, o, FObject, MAttributeParent, MAttributeGuid, MAttributeCode, MAttributeLabel);
      o._typeName   = null;
      o._isClone    = false;
      o.makeLabel   = FE3sObject_makeLabel;
      o.unserialize = FE3sObject_unserialize;
      o.saveConfig  = FE3sObject_saveConfig;
      o.clone       = FE3sObject_clone;
      o.dispose     = FE3sObject_dispose;
      return o;
   }
   MO.FE3sObject_makeLabel = function FE3sObject_makeLabel(){
      var o = this;
      var result = '';
      if(!RString.isEmpty(o._code)){
         result += o._code;
      }
      if(!RString.isEmpty(o._label)){
         result += ' [' + o._label + ']';
      }
      return result;
   }
   MO.FE3sObject_unserialize = function FE3sObject_unserialize(input){
      var o = this;
      o._typeName = input.readString();
      o._guid = input.readString();
      o._code = input.readString();
      o._label = input.readString();
   }
   MO.FE3sObject_saveConfig = function FE3sObject_saveConfig(xconfig){
      var o = this;
      if(!RString.isEmpty(o._typeName)){
         xconfig.setName(o._typeName);
      }
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
      if(o._isClone){
         xconfig.set('is_clone', 'Y');
      }
   }
   MO.FE3sObject_clone = function FE3sObject_clone(instance){
      var o = this;
      var result = null;
      if(instance){
         result = instance;
      }else{
         result = RClass.create(o.constructor);
      }
      result._isClone = true;
      result._typeName = o._typeName;
      result._guid = o._guid;
      result._code = o._code;
      result._label = o._label;
      return result;
   }
   MO.FE3sObject_dispose = function FE3sObject_dispose(){
      var o = this;
      o.__base.MAttributeParent.dispose.call(o);
      o.__base.FComponent.dispose.call(o);
   }
}
with(MO){
   MO.FE3sProjection = function FE3sProjection(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._angle      = null;
      o._znear      = null;
      o._zfar       = null;
      o.angle       = FE3sProjection_angle;
      o.znear       = FE3sProjection_znear;
      o.zfar        = FE3sProjection_zfar;
      o.unserialize = FE3sProjection_unserialize;
      o.saveConfig  = FE3sProjection_saveConfig;
      return o;
   }
   MO.FE3sProjection_angle = function FE3sProjection_angle(){
      return this._angle;
   }
   MO.FE3sProjection_znear = function FE3sProjection_znear(){
      return this._znear;
   }
   MO.FE3sProjection_zfar = function FE3sProjection_zfar(){
      return this._zfar;
   }
   MO.FE3sProjection_unserialize = function FE3sProjection_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._angle = p.readFloat();
      o._znear = p.readFloat();
      o._zfar = p.readFloat();
   }
   MO.FE3sProjection_saveConfig = function FE3sProjection_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.setFloat('angle', o._angle);
      xconfig.setFloat('znear', o._znear);
      xconfig.setFloat('zfar', o._zfar);
   }
}
with(MO){
   MO.FE3sRegion = function FE3sRegion(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._optionBackground     = true;
      o._backgroundColor      = null;
      o._moveSpeed            = 0.1;
      o._rotationKeySpeed     = 0.005;
      o._rotationMouseSpeed   = 0.003;
      o._material             = null;
      o._camera               = null;
      o._light                = null;
      o.construct             = FE3sRegion_construct;
      o.optionBackground      = FE3sRegion_optionBackground;
      o.setOptionBackground   = FE3sRegion_setOptionBackground;
      o.backgroundColor       = FE3sRegion_backgroundColor;
      o.moveSpeed             = FE3sRegion_moveSpeed;
      o.setMoveSpeed          = FE3sRegion_setMoveSpeed;
      o.rotationKeySpeed      = FE3sRegion_rotationKeySpeed;
      o.setRotationKeySpeed   = FE3sRegion_setRotationKeySpeed;
      o.rotationMouseSpeed    = FE3sRegion_rotationMouseSpeed;
      o.setRotationMouseSpeed = FE3sRegion_setRotationMouseSpeed;
      o.camera                = FE3sRegion_camera;
      o.light                 = FE3sRegion_light;
      o.unserialize           = FE3sRegion_unserialize;
      o.saveConfig            = FE3sRegion_saveConfig;
      return o;
   }
   MO.FE3sRegion_construct = function FE3sRegion_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._backgroundColor = new SColor4();
      o._material = RClass.create(FE3sMaterial);
      o._camera = RClass.create(FE3sCamera);
      o._light = RClass.create(FE3sLight);
   }
   MO.FE3sRegion_optionBackground = function FE3sRegion_optionBackground(){
      return this._optionBackground;
   }
   MO.FE3sRegion_setOptionBackground = function FE3sRegion_setOptionBackground(p){
      this._optionBackground = p;
   }
   MO.FE3sRegion_backgroundColor = function FE3sRegion_backgroundColor(){
      return this._backgroundColor;
   }
   MO.FE3sRegion_moveSpeed = function FE3sRegion_moveSpeed(){
      return this._moveSpeed;
   }
   MO.FE3sRegion_setMoveSpeed = function FE3sRegion_setMoveSpeed(p){
      this._moveSpeed = p;
   }
   MO.FE3sRegion_rotationKeySpeed = function FE3sRegion_rotationKeySpeed(){
      return this._rotationKeySpeed;
   }
   MO.FE3sRegion_setRotationKeySpeed = function FE3sRegion_setRotationKeySpeed(p){
      this._rotationKeySpeed = p;
   }
   MO.FE3sRegion_rotationMouseSpeed = function FE3sRegion_rotationMouseSpeed(){
      return this._rotationMouseSpeed;
   }
   MO.FE3sRegion_setRotationMouseSpeed = function FE3sRegion_setRotationMouseSpeed(p){
      this._rotationMouseSpeed = p;
   }
   MO.FE3sRegion_camera = function FE3sRegion_camera(){
      return this._camera;
   }
   MO.FE3sRegion_light = function FE3sRegion_light(){
      return this._light;
   }
   MO.FE3sRegion_unserialize = function FE3sRegion_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._backgroundColor.unserialize(input);
      o._moveSpeed = input.readFloat();
      o._rotationKeySpeed = input.readFloat();
      o._rotationMouseSpeed = input.readFloat();
      o._material.unserialize(input);
      o._camera.unserialize(input);
      o._light.unserialize(input);
   }
   MO.FE3sRegion_saveConfig = function FE3sRegion_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, xconfig);
      xconfig.set('color', o._backgroundColor.toString());
      xconfig.setFloat('move_speed', o._moveSpeed);
      xconfig.setFloat('rotation_key_speed', o._rotationKeySpeed);
      xconfig.setFloat('rotation_mouse_speed', o._rotationMouseSpeed);
      o._camera.saveConfig(xconfig.create('Camera'));
   }
}
with(MO){
   MO.FE3sRenderable = function FE3sRenderable(o){
      o = RClass.inherits(this, o, FE3sDrawable);
      o._materialRefers   = null;
      o.construct         = FE3sRenderable_construct;
      o.materialRefers    = FE3sRenderable_materialRefers;
      o.syncMaterialRefer = FE3sRenderable_syncMaterialRefer;
      o.pushMaterialRefer = FE3sRenderable_pushMaterialRefer;
      o.unserialize       = FE3sRenderable_unserialize;
      o.saveConfig        = FE3sRenderable_saveConfig;
      o.clone             = FE3sRenderable_clone;
      return o;
   }
   MO.FE3sRenderable_construct = function FE3sRenderable_construct(){
      var o = this;
      o.__base.FE3sDrawable.construct.call(o);
   }
   MO.FE3sRenderable_materialRefers = function FE3sRenderable_materialRefers(){
      return this._materialRefers;
   }
   MO.FE3sRenderable_syncMaterialRefer = function FE3sRenderable_syncMaterialRefer(index){
      var o = this;
      var materialRefers = o._materialRefers;
      if(!materialRefers){
         materialRefers = o._materialRefers = new TObjects();
      }
      for(var i = materialRefers.count(); i <= index; i++){
         materialRefers.push(RClass.create(FE3sMaterialRefer));
      }
      return materialRefers.at(index);
   }
   MO.FE3sRenderable_pushMaterialRefer = function FE3sRenderable_pushMaterialRefer(materialRefer){
      var o = this;
      var materialRefers = o._materialRefers;
      if(!materialRefers){
         materialRefers = o._materialRefers = new TObjects();
      }
      materialRefers.push(materialRefer);
   }
   MO.FE3sRenderable_unserialize = function FE3sRenderable_unserialize(input){
      var o = this;
      o.__base.FE3sDrawable.unserialize.call(o, input);
      var count = input.readUint16();
      if(count > 0){
         for(var i = 0; i < count; i++){
            var materialRefer = RClass.create(FE3sMaterialRefer);
            materialRefer.unserialize(input);
            o.pushMaterialRefer(materialRefer);
         }
      }
   }
   MO.FE3sRenderable_saveConfig = function FE3sRenderable_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDrawable.saveConfig.call(o, xconfig);
      var materialRefers = o._materialRefers;
      if(materialRefers){
         var count = materialRefers.count();
         var xmaterialRefers = xconfig.create('MaterialReferCollection');
         for(var i = 0; i < count; i++){
            materialRefers.at(i).saveConfig(xmaterialRefers.create('MaterialRefer'));
         }
      }
   }
   MO.FE3sRenderable_clone = function FE3sRenderable_clone(instance){
      var o = this;
      var result = o.__base.FE3sDrawable.clone.call(o, instance);
      var materialRefers = o._materialRefers;
      if(materialRefers){
         var count = materialRefers.count();
         for(var i = 0; i < count; i++){
            var materialRefer = materialRefers.at(i);
            result.pushMaterialRefer(materialRefer.clone());
         }
      }
      return result;
   }
}
with(MO){
   MO.FE3sResource = function FE3sResource(o){
      o = RClass.inherits(this, o, FResource, MListenerLoad);
      o._dataLoad   = false;
      o._dataReady  = false;
      o._dataSize   = 0;
      o._blockSize  = 0;
      o._blockCount = 0;
      o._vendor     = null;
      o.onComplete  = FE3sResource_onComplete;
      o.makeLabel   = FE3sResource_makeLabel;
      o.vendor      = FE3sResource_vendor;
      o.setVendor   = FE3sResource_setVendor;
      o.testReady   = FE3sResource_testReady;
      o.unserialize = FE3sResource_unserialize;
      o.saveConfig  = FE3sResource_saveConfig;
      o.dispose     = FE3sResource_dispose;
      return o;
   }
   MO.FE3sResource_onComplete = function FE3sResource_onComplete(input){
      var o = this;
      if(RClass.isClass(input, MDataStream)){
         o.unserialize(input);
      }else{
         var view = RClass.create(FDataView);
         view.setEndianCd(true);
         if(input.constructor == Array){
            var inputData = new Uint8Array(input);
            view.link(inputData.buffer);
         }else if(input.constructor == Uint8Array){
            view.link(input.buffer);
         }else{
            view.link(input.outputData());
         }
         o.unserialize(view);
         view.dispose();
      }
      o._dataReady = true;
      o.processLoadListener();
   }
   MO.FE3sResource_makeLabel = function FE3sResource_makeLabel(){
      var o = this;
      var result = '';
      if(!RString.isEmpty(o._code)){
         result += o._code;
      }
      if(!RString.isEmpty(o._label)){
         result += ' [' + o._label + ']';
      }
      return result;
   }
   MO.FE3sResource_vendor = function FE3sResource_vendor(){
      return this._vendor;
   }
   MO.FE3sResource_setVendor = function FE3sResource_setVendor(p){
      this._vendor = p;
   }
   MO.FE3sResource_testReady = function FE3sResource_testReady(){
      return this._dataReady;
   }
   MO.FE3sResource_unserialize = function FE3sResource_unserialize(input){
      var o = this;
      o._typeName = input.readString();
      o._guid = input.readString();
      o._code = input.readString();
      o._label = input.readString();
   }
   MO.FE3sResource_saveConfig = function FE3sResource_saveConfig(xconfig){
      var o = this;
      if(!RString.isEmpty(o._typeName)){
         xconfig.setName(o._typeName);
      }
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
   }
   MO.FE3sResource_dispose = function FE3sResource_dispose(){
      var o = this;
      o._vendor = null;
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sResourceConsole = function FE3sResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._factory            = null;
      o.construct           = FE3sResourceConsole_construct;
      o.factory             = FE3sResourceConsole_factory;
      o.create              = FE3sResourceConsole_create;
      o.unserializeResource = FE3sResourceConsole_unserializeResource;
      o.unserialize         = FE3sResourceConsole_unserialize;
      return o;
   }
   MO.FE3sResourceConsole_construct = function FE3sResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      var factory = o._factory = RClass.create(FClassFactory);
      factory.register('Shape', FE3sShape);
      factory.register('Sprite', FE3sSprite);
      factory.register('ModelMesh', FE3sModelMesh);
      factory.register('ModelRenderable', FE3sModelRenderable);
   }
   MO.FE3sResourceConsole_factory = function FE3sResourceConsole_factory(){
      return this._factory;
   }
   MO.FE3sResourceConsole_create = function FE3sResourceConsole_create(typeName){
      return this._factory.create(typeName);
   }
   MO.FE3sResourceConsole_unserializeResource = function FE3sResourceConsole_unserializeResource(resource, input){
      var o = this;
      resource.unserialize(input);
   }
   MO.FE3sResourceConsole_unserialize = function FE3sResourceConsole_unserialize(input){
      var o = this;
      var typeName = input.testString();
      var resource = o._factory.create(typeName);
      resource.unserialize(input);
      return resource;
   }
}
with(MO){
   MO.FE3sScene = function FE3sScene(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName     = 'Scene';
      o._dataCompress = true;
      o._templates    = null;
      o.construct     = FE3sScene_construct;
      o.unserialize   = FE3sScene_unserialize;
      o.saveConfig    = FE3sScene_saveConfig;
      return o;
   }
   MO.FE3sScene_construct = function FE3sScene_construct(){
      var o = this;
      o.__base.FE3sSpace.construct.call(o);
   }
   MO.FE3sScene_unserialize = function FE3sScene_unserialize(input){
      var o = this;
      o.__base.FE3sSpace.unserialize.call(o, input);
      var templateCount = input.readInt16();
      if(templateCount > 0){
         var templateConsole = RConsole.find(FE3sTemplateConsole);
         var templates = o._templates = new TDictionary();
         for(var i = 0; i < templateCount; i++){
            var template = templateConsole.unserialize(p);
            templates.set(ttemplate.guid(), template);
         }
      }
   }
   MO.FE3sScene_saveConfig = function FE3sScene_saveConfig(p){
      var o = this;
      o.__base.FE3sSpace.saveConfig.call(o, p);
   }
}
with(MO){
   MO.FE3sSceneAnimation = function FE3sSceneAnimation(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._playRate   = 1;
      o.construct   = FE3sSceneAnimation_construct;
      o.playRate    = FE3sSceneAnimation_playRate;
      o.setPlayRate = FE3sSceneAnimation_setPlayRate;
      o.unserialize = FE3sSceneAnimation_unserialize;
      o.saveConfig  = FE3sSceneAnimation_saveConfig;
      return o;
   }
   MO.FE3sSceneAnimation_construct = function FE3sSceneAnimation_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
   }
   MO.FE3sSceneAnimation_playRate = function FE3sSceneAnimation_playRate(){
      return this._playRate;
   }
   MO.FE3sSceneAnimation_setPlayRate = function FE3sSceneAnimation_setPlayRate(playRate){
      this._playRate = playRate;
   }
   MO.FE3sSceneAnimation_unserialize = function FE3sSceneAnimation_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._playRate = p.readFloat();
   }
   MO.FE3sSceneAnimation_saveConfig = function FE3sSceneAnimation_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      p.set('play_rate', o._playRate);
   }
}
with(MO){
   MO.FE3sSceneConsole = function FE3sSceneConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._vendorCode = 'scene';
      o._dataUrl    = '/cloud.content.scene.wv'
      o._scenes     = null;
      o.construct   = FE3sSceneConsole_construct;
      o.loadByGuid  = FE3sSceneConsole_loadByGuid;
      o.loadByCode  = FE3sSceneConsole_loadByCode;
      return o;
   }
   MO.FE3sSceneConsole_construct = function FE3sSceneConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._scenes = new TDictionary();
   }
   MO.FE3sSceneConsole_loadByGuid = function FE3sSceneConsole_loadByGuid(guid){
      var o = this;
      var scenes = o._scenes;
      var scene = scenes.get(guid);
      if(scene){
         return scene;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      scene = RClass.create(FE3sScene);
      scene.setGuid(guid);
      scene.setVendor(vendor);
      scene.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(scene);
      scenes.set(guid, scene);
      return scene;
   }
   MO.FE3sSceneConsole_loadByCode = function FE3sSceneConsole_loadByCode(code){
      var o = this;
      var scenes = o._scenes;
      var scene = scenes.get(code);
      if(scene){
         return scene;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find(o._vendorCode);
      vendor.set('code', code);
      var url = vendor.makeUrl();
      scene = RClass.create(FE3sScene);
      scene.setCode(code);
      scene.setVendor(vendor);
      scene.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(scene);
      scenes.set(code, scene);
      return scene;
   }
}
with(MO){
   MO.FE3sSceneDisplay = function FE3sSceneDisplay(o){
      o = RClass.inherits(this, o, FE3sSprite);
      o._templateGuid        = null;
      o._animations          = null;
      o._movies              = null;
      o._renderables         = null;
      o.construct            = FE3sSceneDisplay_construct;
      o.templateGuid         = FE3sSceneDisplay_templateGuid;
      o.findAnimation        = FE3sSceneDisplay_findAnimation;
      o.syncAnimation        = FE3sSceneDisplay_syncAnimation;
      o.animations           = FE3sSceneDisplay_animations;
      o.movies               = FE3sSceneDisplay_movies;
      o.renderables          = FE3sSceneDisplay_renderables;
      o.unserialize          = FE3sSceneDisplay_unserialize;
      o.saveConfig           = FE3sSceneDisplay_saveConfig;
      o.clone                = FE3sSceneDisplay_clone;
      return o;
   }
   MO.FE3sSceneDisplay_construct = function FE3sSceneDisplay_construct(){
      var o = this;
      o.__base.FE3sSprite.construct.call(o);
   }
   MO.FE3sSceneDisplay_templateGuid = function FE3sSceneDisplay_templateGuid(){
      return this._templateGuid;
   }
   MO.FE3sSceneDisplay_findAnimation = function FE3sSceneDisplay_findAnimation(guid){
      var o = this;
      var animations = o._animations;
      if(animations){
         return animations.get(guid);
      }
      return null;
   }
   MO.FE3sSceneDisplay_syncAnimation = function FE3sSceneDisplay_syncAnimation(guid){
      var o = this;
      var animations = o._animations;
      if(!animations){
         animations = o._animations = new TDictionary();
      }
      var animation = animations.get(guid);
      if(!animation){
         animation = RClass.create(FE3sSceneAnimation);
         animation._guid = guid;
         animations.set(guid, animation);
      }
      return animation;
   }
   MO.FE3sSceneDisplay_animations = function FE3sSceneDisplay_animations(){
      return this._animations;
   }
   MO.FE3sSceneDisplay_movies = function FE3sSceneDisplay_movies(){
      return this._movies;
   }
   MO.FE3sSceneDisplay_renderables = function FE3sSceneDisplay_renderables(){
      return this._renderables;
   }
   MO.FE3sSceneDisplay_unserialize = function FE3sSceneDisplay_unserialize(input){
      var o = this;
      o.__base.FE3sSprite.unserialize.call(o, input);
      o._templateGuid = input.readString();
      var animationCount = input.readUint16();
      if(animationCount > 0){
         var animations = o._animations = new TDictionary();
         for(var i = 0; i < animationCount; i++){
            var animation = RClass.create(FE3sSceneAnimation);
            animation.unserialize(input);
            animations.set(animation.guid(), animation);
         }
      }
      var movieCount = input.readUint16();
      if(movieCount > 0){
         var movies = o._movies = new TObjects();
         for(var i = 0; i < movieCount; i++){
            var movie = RClass.create(FE3sMovie);
            movie.unserialize(input);
            movies.push(movie);
         }
      }
   }
   MO.FE3sSceneDisplay_saveConfig = function FE3sSceneDisplay_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sSprite.saveConfig.call(o, xconfig);
      xconfig.set('template_guid', o._templateGuid);
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         var xanimations = xconfig.create('AnimationCollection');
         for(var i = 0; i < count; i++){
            animations.at(i).saveConfig(xanimations.create('Animation'));
         }
      }
   }
   MO.FE3sSceneDisplay_clone = function FE3sSceneDisplay_clone(instance){
      var o = this;
      var result = o.__base.FE3sSprite.clone.call(o, instance);
      result._templateGuid = o._templateGuid;
      return result;
   }
}
with(MO){
   MO.FE3sSceneLayer = function FE3sSceneLayer(o){
      o = RClass.inherits(this, o, FE3sDisplayLayer);
      return o;
   }
}
with(MO){
   MO.FE3sSceneRenderable = function FE3sSceneRenderable(o){
      o = RClass.inherits(this, o, FE3sObject);
      o.unserialize = FE3sSceneRenderable_unserialize;
      return o;
   }
   MO.FE3sSceneRenderable_unserialize = function FE3sSceneRenderable_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
   }
}
with(MO){
   MO.FE3sShape = function FE3sShape(o){
      o = RClass.inherits(this, o, FE3sRenderable);
      o._modelGuid    = null;
      o._model        = null;
      o._meshGuid     = null;
      o._mesh         = null;
      o._materialGuid = null;
      o._material     = null;
      o.construct     = FE3sShape_construct;
      o.modelGuid     = FE3sShape_modelGuid;
      o.model         = FE3sShape_model;
      o.meshGuid      = FE3sShape_meshGuid;
      o.mesh          = FE3sShape_mesh;
      o.materialGuid  = FE3sShape_materialGuid;
      o.material      = FE3sShape_material;
      o.unserialize   = FE3sShape_unserialize;
      return o;
   }
   MO.FE3sShape_construct = function FE3sShape_construct(){
      var o = this;
      o.__base.FE3sRenderable.construct.call(o);
   }
   MO.FE3sShape_modelGuid = function FE3sShape_modelGuid(){
      return this._modelGuid;
   }
   MO.FE3sShape_model = function FE3sShape_model(){
      var o = this;
      var model = o._model;
      if(!model){
         model = o._model = RConsole.find(FE3sModelConsole).findModel(o._modelGuid);
      }
      return model;
   }
   MO.FE3sShape_meshGuid = function FE3sShape_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sShape_mesh = function FE3sShape_mesh(){
      var o = this;
      var mesh = o._mesh;
      if(!mesh){
         mesh = o._mesh = RConsole.find(FE3sModelConsole).findMesh(this._meshGuid);
      }
      return mesh;
   }
   MO.FE3sShape_materialGuid = function FE3sShape_materialGuid(){
      return this._materialGuid;
   }
   MO.FE3sShape_material = function FE3sShape_material(){
      var o = this;
      var material = o._material;
      if(!material){
         material = o._material = RConsole.find(FE3sMaterialConsole).find(this._materialGuid);
      }
      return material;
   }
   MO.FE3sShape_unserialize = function FE3sShape_unserialize(input){
      var o = this;
      o.__base.FE3sRenderable.unserialize.call(o, input);
      o._modelGuid = input.readString();
      o._meshGuid = input.readString();
      o._materialGuid = input.readString();
   }
}
with(MO){
   MO.FE3sSkeleton = function FE3sSkeleton(o){
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
   MO.FE3sSkeleton_findBone = function FE3sSkeleton_findBone(p){
      return this._bones.get(p);
   }
   MO.FE3sSkeleton_bones = function FE3sSkeleton_bones(){
      return this._bones;
   }
   MO.FE3sSkeleton_roots = function FE3sSkeleton_roots(){
      return this._roots;
   }
   MO.FE3sSkeleton_skins = function FE3sSkeleton_skins(){
      return this._skins;
   }
   MO.FE3sSkeleton_animations = function FE3sSkeleton_animations(){
      return this._animations;
   }
   MO.FE3sSkeleton_pushAnimation = function FE3sSkeleton_pushAnimation(p){
      var o = this;
      var r = o._animations;
      if(!r){
         r = o._animations = new TObjects();
      }
      r.push(p);
   }
   MO.FE3sSkeleton_innerFilter = function FE3sSkeleton_innerFilter(p){
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
   MO.FE3sSkeleton_unserialize = function FE3sSkeleton_unserialize(p){
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
}
with(MO){
   MO.FE3sSkeletonSkin = function FE3sSkeletonSkin(o){
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
   MO.FE3sSkeletonSkin_meshGuid = function FE3sSkeletonSkin_meshGuid(){
      return this._meshGuid;
   }
   MO.FE3sSkeletonSkin_find = function FE3sSkeletonSkin_find(p){
      return this._streams.get(p);
   }
   MO.FE3sSkeletonSkin_streams = function FE3sSkeletonSkin_streams(){
      return this._streams;
   }
   MO.FE3sSkeletonSkin_boneRefers = function FE3sSkeletonSkin_boneRefers(){
      return this._boneRefers;
   }
   MO.FE3sSkeletonSkin_unserialize = function FE3sSkeletonSkin_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input)
      o._meshGuid = input.readString();
      var streamCount = input.readUint8();
      if(streamCount > 0){
         var streams = o._streams = new TObjects();
         for(var i = 0; i < streamCount; i++){
            var stream = RClass.create(FE3sStream);
            stream.unserialize(input);
            streams.push(stream);
         }
      }
      var boneReferCount = input.readUint8();
      if(boneReferCount > 0){
         var boneRefers = o._boneRefers = new TObjects();
         for(var i = 0; i < boneReferCount; i++){
            var boneRefer = RClass.create(FE3sBoneRefer);
            boneRefer.unserialize(input);
            boneRefers.push(boneRefer);
         }
      }
   }
}
with(MO){
   MO.FE3sSpace = function FE3sSpace(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._typeName   = null;
      o._technique  = null;
      o._region     = null;
      o._materials  = null;
      o._displays   = null;
      o._layers     = null;
      o.construct   = FE3sSpace_construct;
      o.technique   = FE3sSpace_technique;
      o.region      = FE3sSpace_region;
      o.materials   = FE3sSpace_materials;
      o.displays    = FE3sSpace_displays;
      o.layers      = FE3sSpace_layers;
      o.unserialize = FE3sSpace_unserialize;
      o.saveConfig  = FE3sSpace_saveConfig;
      return o;
   }
   MO.FE3sSpace_construct = function FE3sSpace_construct(){
      var o = this;
      o.__base.FE3sResource.construct.call(o);
      o._technique = RClass.create(FE3sTechnique);
      o._region = RClass.create(FE3sRegion);
   }
   MO.FE3sSpace_technique = function FE3sSpace_technique(){
      return this._technique;
   }
   MO.FE3sSpace_region = function FE3sSpace_region(){
      return this._region;
   }
   MO.FE3sSpace_materials = function FE3sSpace_materials(){
      return this._materials;
   }
   MO.FE3sSpace_displays = function FE3sSpace_displays(){
      return this._displays;
   }
   MO.FE3sSpace_layers = function FE3sSpace_layers(){
      return this._layers;
   }
   MO.FE3sSpace_unserialize = function FE3sSpace_unserialize(input){
      var o = this;
      o.__base.FE3sResource.unserialize.call(o, input);
      var resourceConsole = RConsole.find(FE3sResourceConsole);
      var materialConsole = RConsole.find(FE3sMaterialConsole);
      o._technique.unserialize(input);
      o._region.unserialize(input);
      var materialCount = input.readInt16();
      if(materialCount > 0){
         var materials = o._materials = new TDictionary();
         for(var i = 0; i < materialCount; i++){
            var material = materialConsole.unserialize(input)
            materials.set(material.guid(), material);
         }
      }
      var displayCount = input.readInt16();
      if(displayCount > 0){
         var displays = o._displays = new TObjects();
         for(var i = 0; i < displayCount; i++){
            var display = resourceConsole.unserialize(input);
            displays.push(display);
         }
      }
      var layerCount = input.readInt16();
      if(layerCount > 0){
         var layers = o._layers = new TDictionary();
         for(var i = 0; i < layerCount; i++){
            var layer = RClass.create(FE3sDisplayLayer);
            layer.unserialize(input);
            layers.set(layer.code(), layer);
         }
      }
   }
   MO.FE3sSpace_saveConfig = function FE3sSpace_saveConfig(p){
      var o = this;
      o.__base.FE3sResource.saveConfig.call(o, p);
      o._technique.saveConfig(p.create('Technique'));
      o._region.saveConfig(p.create('Region'));
      var materials = o._materials;
      if(materials){
         var xmaterials = p.create('MaterialCollection');
         var materialCount = materials.count();
         for(var i = 0; i < materialCount; i++){
            var material = materials.at(i);
            material.saveConfig(xmaterials.create('Material'));
         }
      }
      var displays = o._displays;
      if(displays){
         var xdisplays = p.create('DisplayCollection');
         var displayCount = displays.count();
         for(var i = 0; i < displayCount; i++){
            var display = displays.at(i);
            display.saveConfig(xdisplays.create('Display'));
         }
      }
      var layers = o._layers;
      if(layers){
         var xlayers = p.create('LayerCollection');
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.valueAt(i);
            layer.saveConfig(xlayers.create('Layer'));
         }
      }
   }
}
with(MO){
   MO.FE3sSprite = function FE3sSprite(o){
      o = RClass.inherits(this, o, FE3sDisplayContainer);
      o._materials   = null;
      o.construct    = FE3sSprite_construct;
      o.materials    = FE3sSprite_materials;
      o.pushMaterial = FE3sSprite_pushMaterial;
      o.unserialize  = FE3sSprite_unserialize;
      o.saveConfig   = FE3sSprite_saveConfig;
      o.clone        = FE3sSprite_clone;
      return o;
   }
   MO.FE3sSprite_construct = function FE3sSprite_construct(){
      var o = this;
      o.__base.FE3sDisplayContainer.construct.call(o);
   }
   MO.FE3sSprite_materials = function FE3sSprite_materials(){
      return this._materials;
   }
   MO.FE3sSprite_pushMaterial = function FE3sSprite_pushMaterial(material){
      var o = this;
      var materials = o._materials;
      if(!materials){
         materials = o._materials = new TDictionary();
      }
      materials.set(material.guid(), material);
   }
   MO.FE3sSprite_unserialize = function FE3sSprite_unserialize(input){
      var o = this;
      o.__base.FE3sDisplayContainer.unserialize.call(o, input);
      var materialCount = input.readUint16();
      if(materialCount > 0){
         var materialConsole = RConsole.find(FE3sMaterialConsole);
         for(var i = 0; i < materialCount; i++){
            var material = materialConsole.unserialize(input)
            o.pushMaterial(material);
         }
      }
   }
   MO.FE3sSprite_saveConfig = function FE3sSprite_saveConfig(xconfig){
      var o = this;
      o.__base.FE3sDisplayContainer.saveConfig.call(o, xconfig);
      var materials = o._materials;
      if(materials){
         var count = materials.count();
         var xmaterials = xconfig.create('MaterialCollection');
         for(var i = 0; i < count; i++){
            var material = materials.at(i);
            material.saveConfig(xmaterials.create('Material'));
         }
      }
      var movies = o._movies;
      if(movies){
         var count = movies.count();
         var xmovies = xconfig.create('MovieCollection');
         for(var i = 0; i < count; i++){
            var movie = movies.at(i);
            movie.saveConfig(xmovies.create('Movie'));
         }
      }
   }
   MO.FE3sSprite_clone = function FE3sSprite_clone(instance){
      var o = this;
      var result = o.__base.FE3sDisplayContainer.clone.call(o, instance);
      var materials = o._materials;
      if(materials){
         var count = materials.count();
         for(var i = 0; i < count; i++){
            var material = materials.at(i);
            result.pushMaterial(material.clone());
         }
      }
      return result;
   }
}
with(MO){
   MO.FE3sStream = function FE3sStream(o){
      o = RClass.inherits(this, o, FObject, MAttributeCode);
      o._elementDataCd    = 0;
      o._elementCount     = 0;
      o._elementNormalize = false;
      o._dataStride       = 0;
      o._dataCount        = 0;
      o._dataLength       = 0;
      o._data             = null;
      o._formatCd         = EG3dAttributeFormat.Unknown;
      o.elementDataCd     = FE3sStream_elementDataCd;
      o.formatCd          = FE3sStream_formatCd;
      o.dataStride        = FE3sStream_dataStride;
      o.dataCount         = FE3sStream_dataCount;
      o.data              = FE3sStream_data;
      o.unserialize       = FE3sStream_unserialize;
      o.dispose           = FE3sStream_dispose;
      return o;
   }
   MO.FE3sStream_elementDataCd = function FE3sStream_elementDataCd(){
      return this._elementDataCd;
   }
   MO.FE3sStream_formatCd = function FE3sStream_formatCd(){
      return this._formatCd;
   }
   MO.FE3sStream_dataStride = function FE3sStream_dataStride(){
      return this._dataStride;
   }
   MO.FE3sStream_dataCount = function FE3sStream_dataCount(){
      return this._dataCount;
   }
   MO.FE3sStream_data = function FE3sStream_data(){
      return this._data;
   }
   MO.FE3sStream_unserialize = function FE3sStream_unserialize(input){
      var o = this;
      o._code = input.readString();
      o._elementDataCd = input.readUint8();
      o._elementCount = input.readUint8();
      o._elementNormalize = input.readBoolean();
      var dataStride = o._dataStride = input.readUint8();
      var dataCount = o._dataCount = input.readInt32();
      var dataLength = o._dataLength = dataStride * dataCount;
      var data = o._data = new ArrayBuffer(dataLength);
      input.readBytes(data, 0, dataLength);
   }
   MO.FE3sStream_dispose = function FE3sStream_dispose(){
      var o = this;
      o.data = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTechnique = function FE3sTechnique(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._techniqueCode = null;
      o._passes        = null;
      o.passes         = FE3sTechnique_passes;
      o.unserialize    = FE3sTechnique_unserialize;
      o.saveConfig     = FE3sTechnique_saveConfig;
      return o;
   }
   MO.FE3sTechnique_passes = function FE3sTechnique_passes(){
      return this._passes;
   }
   MO.FE3sTechnique_unserialize = function FE3sTechnique_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      var passCount = input.readInt16();
      if(passCount > 0){
         var passes = o._passes = new TObjects();
         for(var i = 0; i < passCount; i++){
            var pass = RClass.create(FE3sTechniquePass);
            pass.unserialize(input);
            passes.push(pass);
         }
      }
   }
   MO.FE3sTechnique_saveConfig = function FE3sTechnique_saveConfig(p){
      var o = this;
      o.__base.FE3sObject.saveConfig.call(o, p);
      p.set('technique_code', o._techniqueCode);
   }
}
with(MO){
   MO.FE3sTechniquePass = function FE3sTechniquePass(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._targetWidth  = null;
      o._targetHeight = null;
      o.targetWidth   = FE3sTechniquePass_targetWidth;
      o.targetHeight  = FE3sTechniquePass_targetHeight;
      o.unserialize   = FE3sTechniquePass_unserialize;
      return o;
   }
   MO.FE3sTechniquePass_targetWidth = function FE3sTechniquePass_targetWidth(){
      return this._targetWidth;
   }
   MO.FE3sTechniquePass_targetHeight = function FE3sTechniquePass_targetHeight(){
      return this._targetHeight;
   }
   MO.FE3sTechniquePass_unserialize = function FE3sTechniquePass_unserialize(input){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, input);
      o._targetWidth = input.readUint16();
      o._targetHeight = input.readUint16();
   }
}
with(MO){
   MO.FE3sTemplate = function FE3sTemplate(o){
      o = RClass.inherits(this, o, FE3sSpace);
      o._typeName     = 'Template';
      o._dataCompress = true;
      return o;
   }
}
with(MO){
   MO.FE3sTemplateConsole = function FE3sTemplateConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._templates  = null;
      o._serviceUrl = '/cloud.content.template.ws'
      o.construct   = FE3sTemplateConsole_construct;
      o.unserialize = FE3sTemplateConsole_unserialize;
      o.loadByGuid  = FE3sTemplateConsole_loadByGuid;
      o.loadByCode  = FE3sTemplateConsole_loadByCode;
      o.update      = FE3sTemplateConsole_update;
      return o;
   }
   MO.FE3sTemplateConsole_construct = function FE3sTemplateConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._templates = new TDictionary();
   }
   MO.FE3sTemplateConsole_unserialize = function FE3sTemplateConsole_unserialize(p){
      var o = this;
      var r = RClass.create(FE3sTemplate);
      r._dataReady = true;
      r.unserialize(p);
      o._templates.set(r.guid(), r);
      return r;
   }
   MO.FE3sTemplateConsole_loadByGuid = function FE3sTemplateConsole_loadByGuid(guid){
      var o = this;
      var templates = o._templates;
      var template = templates.get(guid);
      if(template){
         return template;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('template');
      vendor.set('guid', guid);
      var url = vendor.makeUrl();
      template = RClass.create(FE3sTemplate);
      template.setGuid(guid);
      template.setVendor(vendor);
      template.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(template);
      templates.set(guid, template);
      return template;
   }
   MO.FE3sTemplateConsole_loadByCode = function FE3sTemplateConsole_loadByCode(code){
      var o = this;
      var templates = o._templates;
      var template = templates.get(code);
      if(template){
         return template;
      }
      var vendor = RConsole.find(FE3sVendorConsole).find('template');
      vendor.set('code', code);
      var url = vendor.makeUrl();
      template = RClass.create(FE3sTemplate);
      template.setCode(code);
      template.setVendor(vendor);
      template.setSourceUrl(url);
      RConsole.find(FResourceConsole).load(template);
      templates.set(code, template);
      return template;
   }
   MO.FE3sTemplateConsole_update = function FE3sTemplateConsole_update(p){
      var o = this;
      var u = RBrowser.hostPath(o._serviceUrl + '?action=update');
      RConsole.find(FXmlConsole).send(u, p);
   }
}
with(MO){
   MO.FE3sTemplateTheme = function FE3sTemplateTheme(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._materials   = null;
      o.findMaterial = FE3sTemplateTheme_findMaterial;
      o.materials    = FE3sTemplateTheme_materials;
      o.unserialize  = FE3sTemplateTheme_unserialize;
      return o;
   }
   MO.FE3sTemplateTheme_findMaterial = function FE3sTemplateTheme_findMaterial(p){
      return this._materials.get(p);
   }
   MO.FE3sTemplateTheme_materials = function FE3sTemplateTheme_materials(){
      return this._materials;
   }
   MO.FE3sTemplateTheme_unserialize = function FE3sTemplateTheme_unserialize(p){
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
}
with(MO){
   MO.FE3sTexture = function FE3sTexture(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._dataCompress = true;
      o._bitmaps      = null;
      o._bitmapPacks  = null;
      o.construct     = FE3sTexture_construct;
      o.bitmaps       = FE3sTexture_bitmaps;
      o.bitmapPacks   = FE3sTexture_bitmapPacks;
      o.unserialize   = FE3sTexture_unserialize;
      o.dispose       = FE3sTexture_dispose;
      return o;
   }
   MO.FE3sTexture_construct = function FE3sTexture_construct(){
      var o = this;
      o.__base.FE3sResource.construct.call(o);
   }
   MO.FE3sTexture_bitmaps = function FE3sTexture_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3sTexture_bitmapPacks = function FE3sTexture_bitmapPacks(){
      return this._bitmapPacks;
   }
   MO.FE3sTexture_unserialize = function FE3sTexture_unserialize(p){
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
   MO.FE3sTexture_dispose = function FE3sTexture_dispose(){
      var o = this;
      o._bitmaps = RObject.free(o._bitmaps);
      o._bitmapPacks = RObject.free(o._bitmapPacks);
      o.__base.FE3sResource.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTextureBitmap = function FE3sTextureBitmap(o){
      o = RClass.inherits(this, o, FE3sObject);
      o._packCode   = null;
      o.packCode    = FE3sTextureBitmap_packCode;
      o.unserialize = FE3sTextureBitmap_unserialize;
      return o;
   }
   MO.FE3sTextureBitmap_packCode = function FE3sTextureBitmap_packCode(){
      return this._packCode;
   }
   MO.FE3sTextureBitmap_unserialize = function FE3sTextureBitmap_unserialize(p){
      var o = this;
      o.__base.FE3sObject.unserialize.call(o, p);
      o._packCode = p.readString();
   }
}
with(MO){
   MO.FE3sTextureBitmapPack = function FE3sTextureBitmapPack(o){
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
   MO.FE3sTextureBitmapPack_construct = function FE3sTextureBitmapPack_construct(){
      var o = this;
      o.__base.FE3sObject.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3sTextureBitmapPack_optionCompress = function FE3sTextureBitmapPack_optionCompress(){
      return this._optionCompress;
   }
   MO.FE3sTextureBitmapPack_size = function FE3sTextureBitmapPack_size(){
      return this._size;
   }
   MO.FE3sTextureBitmapPack_data = function FE3sTextureBitmapPack_data(){
      return this._data;
   }
   MO.FE3sTextureBitmapPack_unserialize = function FE3sTextureBitmapPack_unserialize(p){
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
   MO.FE3sTextureBitmapPack_dispose = function FE3sTextureBitmapPack_dispose(){
      var o = this;
      o._data = null;
      o.__base.FE3sObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTextureConsole = function FE3sTextureConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._textures   = null;
      o.construct   = FE3sTextureConsole_construct;
      o.unserialize = FE3sTextureConsole_unserialize;
      o.load        = FE3sTextureConsole_load;
      o.loadBitmap  = FE3sTextureConsole_loadBitmap;
      o.dispose     = FE3sModelConsole_dispose;
      return o;
   }
   MO.FE3sTextureConsole_construct = function FE3sTextureConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._textures = new TDictionary();
   }
   MO.FE3sTextureConsole_unserialize = function FE3sTextureConsole_unserialize(p){
      var o = this;
      var r = RClass.create(FE3sTexture);
      r._dataReady = true;
      r.unserialize(p);
      o._textures.set(r.guid(), r);
      return r;
   }
   MO.FE3sTextureConsole_load = function FE3sTextureConsole_load(p){
      var o = this;
      var s = o._textures;
      var r = s.get(p);
      if(r){
         return r;
      }
      var v = RConsole.find(FE3sVendorConsole).find('texture');
      var u = v.makeUrl(p);
      r = RClass.create(FE3sTexture);
      r.setGuid(p);
      r.setVendor(v);
      r.setSourceUrl(u);
      RConsole.find(FResourceConsole).load(r);
      s.set(p, r);
      return r;
   }
   MO.FE3sTextureConsole_loadBitmap = function FE3sTextureConsole_loadBitmap(pg, pc, pf){
      var o = this;
      var v = RConsole.find(FE3sVendorConsole).find('texture.bitmap');
      v.set('guid', pg);
      v.set('code', pc);
      v.set('format', pf);
      var u = v.makeUrl();
      var g = o._image = RClass.create(FImage);
      g.loadUrl(u);
      return g;
   }
   MO.FE3sTextureConsole_dispose = function FE3sTextureConsole_dispose(){
      var o = this;
      o._textures = RObject.free(o._textures);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3sTheme = function FE3sTheme(o){
      o = RClass.inherits(this, o, FE3sResource);
      o._materials  = null;
      o.materials   = FE3sTheme_materials;
      o.find        = FE3sTheme_find;
      o.unserialize = FE3sTheme_unserialize;
      return o;
   }
   MO.FE3sTheme_materials = function FE3sTheme_materials(){
      return this._materials;
   }
   MO.FE3sTheme_find = function FE3sTheme_find(p){
      var ms = this._materials;
      return ms ? ms.get(p) : null;
   }
   MO.FE3sTheme_unserialize = function FE3sTheme_unserialize(p){
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
}
with(MO){
   MO.FE3sThemeConsole = function FE3sThemeConsole(o){
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
   MO.FE3sThemeConsole_construct = function FE3sThemeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._themes = new TDictionary();
   }
   MO.FE3sThemeConsole_activeTheme = function FE3sThemeConsole_activeTheme(){
      return this._activeTheme;
   }
   MO.FE3sThemeConsole_find = function FE3sThemeConsole_find(p){
      var t = this._activeTheme;
      if(t == null){
         throw new TError('Active theme is empty.');
      }
      return t.find(p);
   }
   MO.FE3sThemeConsole_select = function FE3sThemeConsole_select(p){
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
}
with(MO){
   MO.FE3sTrack = function FE3sTrack(o){
      o = RClass.inherits(this, o, FObject);
      o._meshCode     = null;
      o._boneIndex    = 0;
      o._frameTick    = 0;
      o._matrix       = null;
      o._matrixInvert = null;
      o._frameCount   = null;
      o._frames       = null;
      o.construct     = FE3sTrack_construct;
      o.boneIndex     = FE3sTrack_boneIndex;
      o.frameTick     = FE3sTrack_frameTick;
      o.matrix        = FE3sTrack_matrix;
      o.matrixInvert  = FE3sTrack_matrixInvert;
      o.frames        = FE3sTrack_frames;
      o.calculate     = FE3sTrack_calculate;
      o.unserialize   = FE3sTrack_unserialize;
      return o;
   }
   MO.FE3sTrack_construct = function FE3sTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
      o._matrixInvert = new SMatrix3d();
   }
   MO.FE3sTrack_boneIndex = function FE3sTrack_boneIndex(){
      return this._boneIndex;
   }
   MO.FE3sTrack_frameTick = function FE3sTrack_frameTick(){
      return this._frameTick;
   }
   MO.FE3sTrack_matrix = function FE3sTrack_matrix(){
      return this._matrix;
   }
   MO.FE3sTrack_matrixInvert = function FE3sTrack_matrixInvert(){
      return this._matrixInvert;
   }
   MO.FE3sTrack_frames = function FE3sTrack_frames(){
      return this._frames;
   }
   MO.FE3sTrack_calculate = function FE3sTrack_calculate(info, tick){
      var o = this;
      var frameCount = info.frameCount;
      if(frameCount == 0){
         throw new TError('Frame count is invalid.');
      }
      var beginIndex = info.beginIndex;
      var frameTick = o._frameTick;
      var index = parseInt(tick / frameTick) % frameCount;
      var frames = o._frames;
      var currentFrame = frames.get(beginIndex + index);
      var nextFrame = null;
      if(index < frameCount - 1){
         nextFrame = frames.get(beginIndex + index + 1);
      }else{
         nextFrame = frames.get(beginIndex);
      }
      info.tick = tick;
      info.rate = (tick % frameTick) / frameTick;
      info.currentFrame = currentFrame;
      info.nextFrame = nextFrame;
      return true;
   }
   MO.FE3sTrack_unserialize = function FE3sTrack_unserialize(input){
      var o = this;
      o._meshCode = input.readString();
      o._boneIndex = input.readUint16();
      o._frameTick = input.readUint16();
      o._matrix.unserialize(input);
      o._matrixInvert.assign(o._matrix);
      o._matrixInvert.invert();
      o._frameCount = input.readInt16();
      o._frames = new TObjects();
   }
}
with(MO){
   MO.FE3sVendor = function FE3sVendor(o){
      o = RClass.inherits(this, o, FObject);
      o._contentUrl   = null;
      o._parameters   = null;
      o.construct     = FE3sVendor_construct;
      o.contentUrl    = FE3sVendor_contentUrl;
      o.setContentUrl = FE3sVendor_setContentUrl;
      o.get           = FE3sVendor_get;
      o.set           = FE3sVendor_set;
      o.makeSource    = RMethod.virtual(o, 'makeSource');
      o.makeUrl       = FE3sVendor_makeUrl;
      o.reset         = FE3sVendor_reset;
      o.dispose       = FE3sVendor_dispose;
      return o;
   }
   MO.FE3sVendor_construct = function FE3sVendor_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._parameters = new TAttributes();
   }
   MO.FE3sVendor_contentUrl = function FE3sVendor_contentUrl(p){
      return this._contentUrl;
   }
   MO.FE3sVendor_setContentUrl = function FE3sVendor_setContentUrl(p){
      this._contentUrl = p;
   }
   MO.FE3sVendor_get = function FE3sVendor_get(n){
      return this._parameters.get(n);
   }
   MO.FE3sVendor_set = function FE3sVendor_set(n, v){
      this._parameters.set(n, v);
   }
   MO.FE3sVendor_makeUrl = function FE3sVendor_makeUrl(){
      var o = this;
      var r = o.makeSource();
      if(MO.Runtime.isDebug()){
         if(r.indexOf('?') == -1){
            r += '?';
         }else{
            r += '&';
         }
         r += 'date=' + RDate.format();
      }
      return r;
   }
   MO.FE3sVendor_reset = function FE3sVendor_reset(){
      this._parameters.clear();
   }
   MO.FE3sVendor_dispose = function FE3sVendor_dispose(){
      var o = this;
      o._parameters = RObject.dispose(o._parameters);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3sVendorConsole = function FE3sVendorConsole(o){
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
   MO.FE3sVendorConsole_construct = function FE3sVendorConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._vendors = new TDictionary();
   }
   MO.FE3sVendorConsole_createVendor = function FE3sVendorConsole_createVendor(c, u){
      var v = RClass.create(c);
      v.setContentUrl(u);
      return v;
   }
   MO.FE3sVendorConsole_register = function FE3sVendorConsole_register(n, p){
      this._vendors.set(n, p);
   }
   MO.FE3sVendorConsole_find = function FE3sVendorConsole_find(p){
      var o = this;
      if(!o._setuped){
         o.setup('net');
      }
      var v = o._vendors.get(p);
      v.reset();
      return v;
   }
   MO.FE3sVendorConsole_setup = function FE3sVendorConsole_setup(p){
      var o = this;
      if(p == 'net'){
         o._vendors.set('bitmap', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.bitmap.wv'), 'guid'));
         o._vendors.set('material', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.material.wv?do=data'), 'guid'));
         o._vendors.set('mesh', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.mesh.wv'), 'guid'));
         o._vendors.set('model', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.model.wv'), 'guid'));
         o._vendors.set('template', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.template.wv'), 'guid'));
         o._vendors.set('scene', o.createVendor(FE3sVendorNet, RBrowser.hostPath('/cloud.resource.scene.wv'), 'guid|code'));
      }else if(p == 'local'){
         o._vendors.set('bitmap', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/bitmap/{guid}.bin')));
         o._vendors.set('material', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/material/{guid}.bin')));
         o._vendors.set('mesh', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/mesh/{guid}.bin')));
         o._vendors.set('model', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/model/{guid}.bin')));
         o._vendors.set('template', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/template/{guid}.bin')));
         o._vendors.set('scene', o.createVendor(FE3sVendorLocal, RBrowser.contentPath('/ar3/scene/{guid}.bin')));
      }else{
         throw new TError(o, 'Unknown setup code. (code={1})', p);
      }
      o._setuped = true;
   }
}
with(MO){
   MO.FE3sVendorLocal = function FE3sVendorLocal(o){
      o = RClass.inherits(this, o, FE3sVendor);
      o.makeSource = FE3sVendorLocal_makeSource;
      return o;
   }
   MO.FE3sVendorLocal_makeSource = function FE3sVendorLocal_makeSource(){
      var o = this;
      var u = o._contentUrl;
      var s = o._parameters;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var n = s.name(i);
         var v = s.value(i);
         u = RString.replace(u, '{' + n + '}', v);
      }
      return u;
   }
}
with(MO){
   MO.FE3sVendorNet = function FE3sVendorNet(o){
      o = RClass.inherits(this, o, FE3sVendor);
      o.makeSource = FE3sVendorNet_makeSource;
      return o;
   }
   MO.FE3sVendorNet_makeSource = function FE3sVendorNet_makeSource(){
      var o = this;
      var url = o._contentUrl;
      if(url.indexOf('?') == -1){
         url += '?';
      }else{
         url += '&';
      }
      var parameters = o._parameters;
      var count = parameters.count();
      var first = false;
      for(var i = 0; i < count; i++){
         var name = parameters.name(i);
         var value = parameters.value(i);
         if(!RString.isEmpty(value)){
            if(first){
               url += '&';
            }else{
               first = true;
            }
            url += name + '=' + value;
         }
      }
      return url;
   }
}
with(MO){
   MO.SE3rPlayInfo = function SE3rPlayInfo(){
      var o = this;
      o.tick         = 0;
      o.playRate     = 1.0;
      o.beginIndex   = 0;
      o.endIndex     = 0;
      o.frameCount   = 0;
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
   MO.SE3rPlayInfo_update = function SE3rPlayInfo_update(){
      var o = this;
      var currentFrame = o.currentFrame;
      if(!currentFrame){
         return false;
      }
      var nextFrame = o.nextFrame;
      if(!nextFrame){
         return false;
      }
      var matrix = o.matrix;
      var currentTranslation = currentFrame.translation();
      var currentQuaternion = currentFrame.quaternion();
      var currentScale = currentFrame.scale();
      var rate = o.rate;
      if((rate > 0) && (rate < 1)){
         o.translation.slerp(currentTranslation, nextFrame.translation(), rate);
         o.quaternion.slerp(currentQuaternion, nextFrame.quaternion(), rate);
         o.scale.slerp(currentScale, nextFrame.scale(), rate);
         matrix.build(o.translation, o.quaternion, o.scale);
      }else{
         matrix.build(currentTranslation, currentQuaternion, currentScale);
      }
      return true;
   }
}
with(MO){
   MO.FE3rAnimation = function FE3rAnimation(o){
      o = RClass.inherits(this, o, FObject);
      o._valid       = false;
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
   MO.FE3rAnimation_construct = function FE3rAnimation_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._playInfo = new SE3rPlayInfo();
   }
   MO.FE3rAnimation_findTrack = function FE3rAnimation_findTrack(p){
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
   MO.FE3rAnimation_tracks = function FE3rAnimation_tracks(){
      return this._tracks;
   }
   MO.FE3rAnimation_resource = function FE3rAnimation_resource(){
      return this._resource;
   }
   MO.FE3rAnimation_loadResource = function FE3rAnimation_loadResource(resource){
      var o = this;
      var frameCount = resource.frameCount();
      o._resource = resource;
      var trackResources = resource.tracks();
      if(trackResources){
         var tracks = o._tracks = new TObjects();
         var count = trackResources.count();
         for(var i = 0; i < count; i++){
            var trackResource = trackResources.at(i);
            var track = RClass.create(FE3rTrack);
            track._animation = o;
            track.loadResource(trackResource);
            tracks.push(track);
         }
      }
      if(frameCount > 0){
         var info = o._playInfo;
         info.beginIndex = 0;
         info.endIndex = (frameCount > 0) ? frameCount - 1 : 0;
         info.frameCount = frameCount;
         o._valid = true;
      }
   }
   MO.FE3rAnimation_record = function FE3rAnimation_record(){
      var o = this;
      var t = RTimer.current();
      if(o._lastTick == 0){
         o._lastTick = t;
      }
      o._currentTick = (t - o._lastTick + o._baseTick) * o._playRate;
   }
   MO.FE3rAnimation_dispose = function FE3rAnimation_dispose(){
      var o = this;
      o._tracks = null;
      o._resource = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmap = function FE3rBitmap(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._pack        = null;
      o.construct    = FE3rBitmap_construct;
      o.testReady    = FE3rBitmap_testReady;
      o.texture      = FE3rBitmap_texture;
      o.loadResource = FE3rBitmap_loadResource;
      o.dispose      = FE3rBitmap_dispose;
      return o;
   }
   MO.FE3rBitmap_construct = function FE3rBitmap_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
   }
   MO.FE3rBitmap_testReady = function FE3rBitmap_testReady(){
      return this._pack.testReady();
   }
   MO.FE3rBitmap_texture = function FE3rBitmap_texture(){
      return this._pack.texture();
   }
   MO.FE3rBitmap_loadResource = function FE3rBitmap_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._guid = resource.guid();
      o._code = resource.code();
   }
   MO.FE3rBitmap_dispose = function FE3rBitmap_dispose(){
      var o = this;
      o.__base.FE3rObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmapConsole = function FE3rBitmapConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._bitmaps  = null;
      o._dataUrl  = '/cloud.resource.material.wv'
      o.construct = FE3rBitmapConsole_construct;
      o.bitmaps   = FE3rBitmapConsole_bitmaps;
      o.load      = FE3rBitmapConsole_load;
      o.loadUrl   = FE3rBitmapConsole_loadUrl;
      return o;
   }
   MO.FE3rBitmapConsole_construct = function FE3rBitmapConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._bitmaps = new TDictionary();
   }
   MO.FE3rBitmapConsole_bitmaps = function FE3rBitmapConsole_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3rBitmapConsole_load = function FE3rBitmapConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var bitmap = o._bitmaps.get(flag);
      if(bitmap){
         return bitmap;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._bitmaps.set(flag, bitmap);
      return bitmap;
   }
   MO.FE3rBitmapConsole_loadUrl = function FE3rBitmapConsole_loadUrl(context, url){
      var o = this;
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3rBitmap);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
}
with(MO){
   MO.FE3rBitmapCubePack = function FE3rBitmapCubePack(o){
      o = RClass.inherits(this, o, FE3rBitmapPack);
      o._resource    = null;
      o._images      = null;
      o.onLoad       = FE3rBitmapCubePack_onLoad;
      o.construct    = FE3rBitmapCubePack_construct;
      o.loadUrl      = FE3rBitmapCubePack_loadUrl;
      o.dispose      = FE3rBitmapCubePack_dispose;
      return o;
   }
   MO.FE3rBitmapCubePack_onLoad = function FE3rBitmapCubePack_onLoad(p){
      var o = this;
      var context = o._graphicContext;
      var images = o._images;
      var capability = RBrowser.capability();
      for(var i = 0; i < 6; i++){
         if(!images.at(i).testReady()){
            return;
         }
      }
      var texture = o._texture = context.createCubeTexture();
      texture.upload(images.at(0), images.at(1), images.at(2), images.at(3), images.at(4), images.at(5));
      for(var i = 0; i < 6; i++){
         var image = images.at(i);
         image.dispose();
      }
      o._images = RObject.dispose(o._images);
      o._dataReady = true;
      o._ready = true;
   }
   MO.FE3rBitmapCubePack_construct = function FE3rBitmapCubePack_construct(){
      var o = this;
      o.__base.FE3rBitmapPack.construct.call(o);
   }
   MO.FE3rBitmapCubePack_loadUrl = function FE3rBitmapCubePack_loadUrl(url){
      var o = this;
      o._images = new TObjects();
      for(var i = 0; i < 6; i++){
         var image = RClass.create(FImage);
         image._index = i;
         image.setOptionAlpha(false);
         image.loadUrl(url + "&index=" + i);
         image.addLoadListener(o, o.onLoad);
         o._images.push(image);
      }
   }
   MO.FE3rBitmapCubePack_dispose = function FE3rBitmapCubePack_dispose(){
      var o = this;
      o._images = RObject.dispose(o._images);
      o.__base.FE3rBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmapFlatPack = function FE3rBitmapFlatPack(o){
      o = RClass.inherits(this, o, FE3rBitmapPack);
      o._resource    = null;
      o._image       = null;
      o.onLoad       = FE3rBitmapFlatPack_onLoad;
      o.construct    = FE3rBitmapFlatPack_construct;
      o.loadUrl      = FE3rBitmapFlatPack_loadUrl;
      o.dispose      = FE3rBitmapFlatPack_dispose;
      return o;
   }
   MO.FE3rBitmapFlatPack_onLoad = function FE3rBitmapFlatPack_onLoad(event){
      var o = this;
      var context = o._graphicContext;
      var texture = o._texture = context.createFlatTexture();
      texture.upload(o._image);
      texture.makeMipmap();
      o._image = RObject.dispose(o._image);
      o._dataReady = true;
   }
   MO.FE3rBitmapFlatPack_construct = function FE3rBitmapFlatPack_construct(){
      var o = this;
      o.__base.FE3rBitmapPack.construct.call(o);
   }
   MO.FE3rBitmapFlatPack_loadUrl = function FE3rBitmapFlatPack_loadUrl(url){
      var o = this;
      var image = o._image = RClass.create(FImage);
      image.addLoadListener(o, o.onLoad);
      image.loadUrl(url);
   }
   MO.FE3rBitmapFlatPack_dispose = function FE3rBitmapFlatPack_dispose(){
      var o = this;
      o._image = RObject.dispose(o._image);
      o.__base.FE3rBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBitmapPack = function FE3rBitmapPack(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      o._resource    = null;
      o._image       = null;
      o._texture     = null;
      o._ready       = false;
      o._dataReady   = false;
      o.onLoad       = RMethod.virtual(o, 'onLoad');
      o.construct    = FE3rBitmapPack_construct;
      o.texture      = FE3rBitmapPack_texture;
      o.testReady    = FE3rBitmapPack_testReady;
      o.loadUrl      = RMethod.virtual(o, 'loadUrl');
      o.dispose      = FE3rBitmapPack_dispose;
      return o;
   }
   MO.FE3rBitmapPack_construct = function FE3rBitmapPack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FE3rBitmapPack_texture = function FE3rBitmapPack_texture(){
      return this._texture;
   }
   MO.FE3rBitmapPack_testReady = function FE3rBitmapPack_testReady(){
      var o = this;
      if(o._dataReady){
         o._ready = o._texture.isValid();
      }
      return o._ready;
   }
   MO.FE3rBitmapPack_dispose = function FE3rBitmapPack_dispose(){
      var o = this;
      o._ready = false;
      o._dataReady = false;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rBone = function FE3rBone(o){
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
   MO.FE3rBone_construct = function FE3rBone_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3rBone_matrix = function FE3rBone_matrix(){
      return this._matrix;
   }
   MO.FE3rBone_trackResource = function FE3rBone_trackResource(){
      return this._trackResource;
   }
   MO.FE3rBone_loadResource = function FE3rBone_loadResource(p){
      var o = this;
      o._boneResource = p;
      o._trackResource = p.track();
   }
   MO.FE3rBone_update = function FE3rBone_update(info, tick){
      var o = this;
      var resource = o._trackResource;
      resource.calculate(info, tick);
      info.update();
      var matrix = o._matrix;
      matrix.assign(resource.matrixInvert());
      matrix.append(info.matrix);
   }
   MO.FE3rBone_dispose = function FE3rBone_dispose(){
      var o = this;
      o._boneResource = null;
      o._trackResource = null;
      o.__base.FG3dBone.dispose.call(o);
   }
}
with(MO){
   MO.FE3rDynamicMesh = function FE3rDynamicMesh(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._model            = null;
      o._optionMerge      = true;
      o._vertexPosition   = 0;
      o._vertexTotal      = 0;
      o._indexPosition    = 0;
      o._indexTotal       = 0;
      o._mergeRenderables = null;
      o.construct         = FE3rDynamicMesh_construct;
      o.mergeCount        = FE3rDynamicMesh_mergeCount;
      o.mergeMaxCount     = FE3rDynamicMesh_mergeMaxCount;
      o.mergeRenderables  = FE3rDynamicMesh_mergeRenderables;
      o.syncVertexBuffer  = FE3rDynamicMesh_syncVertexBuffer;
      o.mergeRenderable   = FE3rDynamicMesh_mergeRenderable;
      o.mergeVertexBuffer = FE3rDynamicMesh_mergeVertexBuffer;
      o.mergeIndexBuffer  = FE3rDynamicMesh_mergeIndexBuffer;
      o.build             = FE3rDynamicMesh_build;
      return o;
   }
   MO.FE3rDynamicMesh_construct = function FE3rDynamicMesh_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._mergeRenderables = new TObjects();
   }
   MO.FE3rDynamicMesh_mergeCount = function FE3rDynamicMesh_mergeCount(){
      return this._mergeRenderables.count();
   }
   MO.FE3rDynamicMesh_mergeMaxCount = function FE3rDynamicMesh_mergeMaxCount(){
      return this._model._mergeMaxCount;
   }
   MO.FE3rDynamicMesh_mergeRenderables = function FE3rDynamicMesh_mergeRenderables(){
      return this._mergeRenderables;
   }
   MO.FE3rDynamicMesh_syncVertexBuffer = function FE3rDynamicMesh_syncVertexBuffer(renderableBuffer){
      var o = this;
      var resource = renderableBuffer._resource;
      var code = resource.code();
      var buffer = o._vertexBuffers.get(code);
      if(!buffer){
         var formatCd = renderableBuffer.formatCd();
         var vertexTotal = o._vertexTotal;
         buffer = o._graphicContext.createVertexBuffer();
         buffer.setCode(code);
         buffer.setFormatCd(formatCd);
         buffer.setStride(renderableBuffer.stride());
         switch(formatCd){
            case EG3dAttributeFormat.Float1:
               buffer._data = new Float32Array(1 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float2:
               buffer._data = new Float32Array(2 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float3:
               buffer._data = new Float32Array(3 * vertexTotal);
               break;
            case EG3dAttributeFormat.Float4:
               buffer._data = new Float32Array(4 * vertexTotal);
               break;
            case EG3dAttributeFormat.Byte4:
            case EG3dAttributeFormat.Byte4Normal:
               buffer._data = new Uint8Array(4 * vertexTotal);
               break;
            default:
               throw new TError("Unknown code");
         }
         o._vertexBuffers.set(code, buffer);
      }
      return buffer;
   }
   MO.FE3rDynamicMesh_mergeRenderable = function FE3rDynamicMesh_mergeRenderable(renderable){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var vertexCount = renderable.vertexCount();
      var indexBuffer = renderable.indexBuffers().first();
      var indexCount = indexBuffer.count();
      var mc = capability.mergeCount;
      if(o._mergeRenderables.count() >= mc){
         return false;
      }
      var vt = o._vertexTotal + vertexCount;
      if(capability.optionIndex32){
         if(vt > RInteger.MAX_UINT32){
            return false;
         }
      }else{
         if(vt > RInteger.MAX_UINT16){
            return false;
         }
      }
      o._vertexTotal += vertexCount;
      o._indexTotal += indexCount;
      o._mergeRenderables.push(renderable);
      return true;
   }
   MO.FE3rDynamicMesh_mergeVertexBuffer = function FE3rDynamicMesh_mergeVertexBuffer(renderable, code, vertexBuffer, resource){
      var o = this;
      var position = o._vertexPosition;
      var data = vertexBuffer._data;
      var dataCount = resource._dataCount;
      switch(code){
         case 'position':
            var d = new Float32Array(resource._data);
            RFloat.copy(data, 3 * position, d, 0, 3 * dataCount);
            break;
         case 'coord':
            var d = new Float32Array(resource._data);
            RFloat.copy(data, 2 * position, d, 0, 2 * dataCount);
            break;
         case 'color':
         case "normal":
         case "binormal":
         case "tangent":
         case "bone_index":
         case "bone_weight":
            var d = new Uint8Array(resource._data);
            RByte.copy(data, 4 * position, d, 0, 4 * dataCount);
            break;
         default:
            throw new TError("Unknown code");
      }
   }
   MO.FE3rDynamicMesh_mergeIndexBuffer = function FE3rDynamicMesh_mergeIndexBuffer(resource){
      var o = this;
      var vp = o._vertexPosition;
      var ip = o._indexPosition;
      var id = o._indexBuffer._data;
      var rd = new Uint16Array(resource._data);
      var rc = 3 * resource._dataCount;
      for(var i = 0; i < rc; i++){
         id[ip++] = vp + rd[i]
      }
   }
   MO.FE3rDynamicMesh_build = function FE3rDynamicMesh_build(){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var vertexTotal = o._vertexTotal;
      var indexTotal = o._indexTotal;
      var rs = o._mergeRenderables;
      var rc = rs.count();
      var rf = rs.first();
      o._material = rf.material();
      o._textures = rf.textures();
      var instanceVertexBuffer = o._instanceVertexBuffer = o._graphicContext.createVertexBuffer();
      instanceVertexBuffer.setCode('instance');
      instanceVertexBuffer.setStride(4);
      instanceVertexBuffer.setFormatCd(EG3dAttributeFormat.Float1);
      var vdi = instanceVertexBuffer._data = new Float32Array(vertexTotal);
      o._vertexBuffers.set(instanceVertexBuffer.code(), instanceVertexBuffer);
      var indexBuffer = o._indexBuffer = context.createIndexBuffer(FE3rIndexBuffer);
      if(capability.optionIndex32){
         indexBuffer.setStrideCd(EG3dIndexStride.Uint32);
         indexBuffer._data = new Uint32Array(indexTotal);
      }else{
         indexBuffer.setSstrideCd(EG3dIndexStride.Uint16);
         indexBuffer._data = new Uint16Array(indexTotal);
      }
      indexBuffer._count = indexTotal;
      o.pushIndexBuffer(indexBuffer);
      for(var i = 0; i < rc; i++){
         var renderable = rs.getAt(i);
         var vc = renderable.vertexCount();
         var vertexBuffers = renderable.vertexBuffers();
         var vertexBufferCount = vertexBuffers.count();
         for(var vbi = 0; vbi < vertexBufferCount; vbi++){
            var vb = vertexBuffers.at(vbi);
            var vertexBufferResource = vb._resource;
            var vbrc = vertexBufferResource.code();
            var vertexBuffer = o.syncVertexBuffer(vb);
            o.mergeVertexBuffer(renderable, vbrc, vertexBuffer, vertexBufferResource);
         }
         RFloat.fill(vdi, o._vertexPosition, vc, i);
         var indexBuffer = renderable.indexBuffers().first();
         var ic = indexBuffer.count();
         var indexBufferResource = indexBuffer._resource;
         o.mergeIndexBuffer(indexBufferResource);
         o._vertexPosition += vc;
         o._indexPosition += ic;
      }
      var vertexBuffers = o._vertexBuffers;
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         vertexBuffer.upload(vertexBuffer._data, vertexBuffer.stride(), vertexTotal);
         vertexBuffer._data = null;
      }
      o._indexBuffer.upload(o._indexBuffer._data, indexTotal);
      o._indexBuffer._data = null;
   }
}
with(MO){
   MO.FE3rDynamicModel = function FE3rDynamicModel(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._renderables      = null;
      o._mergeMaxCount    = 0;
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
   MO.FE3rDynamicModel_construct = function FE3rDynamicModel_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
      o._renderables = new TObjects();
      o._meshes = new TObjects();
   }
   MO.FE3rDynamicModel_createMesh = function FE3rDynamicModel_createMesh(){
      var o = this;
      var m = RClass.create(FE3rDynamicMesh);
      m._model = o;
      m.linkGraphicContext(o);
      o._meshes.push(m);
      return m;
   }
   MO.FE3rDynamicModel_renderables = function FE3rDynamicModel_renderables(){
      return this._renderables;
   }
   MO.FE3rDynamicModel_meshes = function FE3rDynamicModel_meshes(){
      return this._meshes;
   }
   MO.FE3rDynamicModel_pushRenderable = function FE3rDynamicModel_pushRenderable(p){
      this._renderables.push(p);
   }
   MO.FE3rDynamicModel_build = function FE3rDynamicModel_build(){
      var o = this;
      var renderables = o._renderables;
      var meshes = o._meshes;
      var count = renderables.count();
      if(count > 0){
         var mesh = o.createMesh();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            if(!mesh.mergeRenderable(renderable)){
               mesh = o.createMesh();
               if(!mesh.mergeRenderable(renderable)){
                  throw new TError(o, 'Merge renderable failure.');
               }
            }
         }
      }
      var mergeMax = 0;
      var count = meshes.count();
      for(var i = 0; i < count; i++){
         var mesh = meshes.at(i);
         mesh.build();
         mergeMax = Math.max(mergeMax, mesh.mergeCount());
      }
      o._mergeMaxCount = mergeMax;
   }
   MO.FE3rDynamicModel_update = function FE3rDynamicModel_update(p){
      var o = this;
      o._updateDate = RTimer.current();
   }
}
with(MO){
   MO.FE3rGeometry = function FE3rGeometry(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._ready            = false;
      o._resource         = null;
      o._vertexCount      = 0;
      o._vertexBuffers    = null;
      o._indexBuffer      = null;
      o._indexBuffers     = null;
      o._resourceMaterial = null;
      o._material         = null;
      o._textures         = null;
      o.construct         = FE3rGeometry_construct;
      o.testReady         = FE3rGeometry_testReady;
      o.resource          = FE3rGeometry_resource;
      o.setResource       = FE3rGeometry_setResource;
      o.vertexCount       = FE3rGeometry_vertexCount;
      o.findVertexBuffer  = FE3rGeometry_findVertexBuffer;
      o.vertexBuffers     = FE3rGeometry_vertexBuffers;
      o.indexBuffer       = FE3rGeometry_indexBuffer;
      o.indexBuffers      = FE3rGeometry_indexBuffers;
      o.material          = FE3rGeometry_material;
      o.findTexture       = FE3rGeometry_findTexture;
      o.textures          = FE3rGeometry_textures;
      o.resource          = FE3rGeometry_resource;
      o.loadResource      = FE3rGeometry_loadResource;
      o.processLoad       = FE3rGeometry_processLoad;
      return o;
   }
   MO.FE3rGeometry_construct = function FE3rGeometry_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
      o._vertexBuffers = new TDictionary();
      o._indexBuffers = new TObjects();
   }
   MO.FE3rGeometry_testReady = function FE3rGeometry_testReady(){
      var o = this;
      if(!o._ready){
         if(!o._resource.testReady()){
            return false;
         }
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
      }
      return o._ready;
   }
   MO.FE3rGeometry_guid = function FE3rGeometry_guid(){
      return this._resource.guid();
   }
   MO.FE3rGeometry_resource = function FE3rGeometry_resource(){
      return this._resource;
   }
   MO.FE3rGeometry_setResource = function FE3rGeometry_setResource(p){
      this._resource = p;
   }
   MO.FE3rGeometry_vertexCount = function FE3rGeometry_vertexCount(){
      return this._vertexCount;
   }
   MO.FE3rGeometry_findVertexBuffer = function FE3rGeometry_findVertexBuffer(code){
      return this._vertexBuffers.get(code);
   }
   MO.FE3rGeometry_vertexBuffers = function FE3rGeometry_vertexBuffers(){
      return this._vertexBuffers;
   }
   MO.FE3rGeometry_indexBuffer = function FE3rGeometry_indexBuffer(){
      return this._indexBuffer;
   }
   MO.FE3rGeometry_indexBuffers = function FE3rGeometry_indexBuffers(){
      return this._indexBuffers;
   }
   MO.FE3rGeometry_material = function FE3rGeometry_material(){
      return this._material;
   }
   MO.FE3rGeometry_findTexture = function FE3rGeometry_findTexture(p){
      return this._textures.get(p);
   }
   MO.FE3rGeometry_textures = function FE3rGeometry_textures(){
      return this._textures;
   }
   MO.FE3rGeometry_resource = function FE3rGeometry_resource(){
      return this._resource;
   }
   MO.FE3rGeometry_loadResource = function FE3rGeometry_loadResource(resource){
      var o = this;
      var context = o._graphicContext;
      o._resource = resource;
      var streamResources = resource.streams();
      var streamCount = streamResources.count();
      for(var i = 0; i < streamCount; i++){
         var streamResource = streamResources.at(i);
         var code = streamResource.code();
         var dataCount = streamResource.dataCount();
         var data = streamResource.data();
         if((code == 'index16') || (code == 'index32')){
            var buffer = o._indexBuffer = context.createIndexBuffer(FE3rIndexBuffer);
            buffer._resource = streamResource;
            var dataCd = streamResource.elementDataCd();
            if(dataCd == EDataType.Uint16){
               buffer.setStrideCd(EG3dIndexStride.Uint16);
            }else if(dataCd == EDataType.Uint32){
               buffer.setStrideCd(EG3dIndexStride.Uint32);
            }else{
               throw new TError(o, "Unknown data type.");
            }
            buffer.upload(data, 3 * dataCount);
            o._indexBuffers.push(buffer);
         }else{
            var buffer = context.createVertexBuffer(FE3rVertexBuffer);
            buffer.setCode(code);
            buffer._resource = streamResource;
            buffer._vertexCount = dataCount;
            var pixels = null;
            switch(code){
               case "position":
                  pixels = new Float32Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Float3);
                  o._vertexCount = dataCount;
                  break;
               case "coord":
                  pixels = new Float32Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Float2);
                  break;
               case "color":
                  pixels = new Uint8Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
                  break;
               case "normal":
               case "binormal":
               case "tangent":
                  pixels = new Uint8Array(data);
                  buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
                  break;
               default:
                  throw new TError(o, "Unknown code");
            }
            buffer.upload(pixels, streamResource._dataStride, dataCount);
            o._vertexBuffers.set(code, buffer);
         }
      }
      o._ready = true;
   }
   MO.FE3rGeometry_processLoad = function FE3rGeometry_processLoad(){
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
}
with(MO){
   MO.FE3rIndexBuffer = function FE3rIndexBuffer(o){
      o = RClass.inherits(this, o, FWglIndexBuffer, MLinkerResource);
      o.dispose = FE3rIndexBuffer_dispose;
      return o;
   }
   MO.FE3rIndexBuffer_dispose = function FE3rIndexBuffer_dispose(){
      var o = this;
      o.__base.MLinkerResource.dispose.call(o);
      o.__base.FWglIndexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FE3rInstanceMesh = function FE3rInstanceMesh(o){
      o = RClass.inherits(this, o, FE3rMesh);
      o._merges         = null;
      o.construct       = FE3rInstanceMesh_construct;
      o.mergeRenderable = FE3rInstanceMesh_mergeRenderable;
      o.build           = FE3rInstanceMesh_build;
      return o;
   }
   MO.FE3rInstanceMesh_construct = function FE3rInstanceMesh_construct(){
      var o = this;
      o.__base.FE3rMesh.construct.call(o);
      o._merges = new TObjects();
   }
   MO.FE3rInstanceMesh_mergeRenderable = function FE3rInstanceMesh_mergeRenderable(p){
      this._merges.push(p);
   }
   MO.FE3rInstanceMesh_build = function FE3rInstanceMesh_build(){
   }
}
with(MO){
   MO.FE3rMaterial = function FE3rMaterial(o){
      o = RClass.inherits(this, o, FG3dMaterial, MAttributeGuid, MGraphicObject, MLinkerResource);
      o._ready         = false;
      o._visible       = true;
      o._bitmaps       = null;
      o._reference     = null;
      o.visible        = FE3rMaterial_visible;
      o.setVisible     = FE3rMaterial_setVisible;
      o.findBitmap     = FE3rMaterial_findBitmap;
      o.bitmaps        = FE3rMaterial_bitmaps;
      o.reference      = FE3rMaterial_reference;
      o.testReady      = FE3rMaterial_testReady;
      o.testVisible    = FE3rMaterial_testVisible;
      o.loadResource   = FE3rMaterial_loadResource;
      o.reloadResource = FE3rMaterial_reloadResource;
      o.load           = FE3rMaterial_load;
      return o;
   }
   MO.FE3rMaterial_visible = function FE3rMaterial_visible(){
      return this._visible;
   }
   MO.FE3rMaterial_setVisible = function FE3rMaterial_setVisible(visible){
      this._visible = visible;
   }
   MO.FE3rMaterial_findBitmap = function FE3rMaterial_findBitmap(code){
      return this._bitmaps.get(code);
   }
   MO.FE3rMaterial_bitmaps = function FE3rMaterial_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3rMaterial_reference = function FE3rMaterial_reference(){
      return this._reference;
   }
   MO.FE3rMaterial_testReady = function FE3rMaterial_testReady(){
      var o = this;
      if(!o._ready){
         var bitmaps = o._bitmaps;
         if(bitmaps){
            var count = bitmaps.count();
            for(var i = 0; i < count; i++){
               var bitmap = bitmaps.at(i);
               if(!bitmap.testReady()){
                  return false;
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FE3rMaterial_testVisible = function FE3rMaterial_testVisible(){
      var o = this;
      var visible = o._visible;
      if(visible && o._reference){
         visible = o._reference.testVisible();
      }
      return visible;
   }
   MO.FE3rMaterial_loadResource = function FE3rMaterial_loadResource(resource){
      var o = this;
      o._guid = resource.guid();
      o._resource = resource;
      o._info.calculate(resource.info());
      o._dirty = true;
   }
   MO.FE3rMaterial_reloadResource = function FE3rMaterial_reloadResource(){
      var o = this;
      o._info.calculate(o._resource.info());
      o._dirty = true;
   }
   MO.FE3rMaterial_load= function FE3rMaterial_load(){
      var o = this;
      var resource = o._resource;
      var bitmapResources = resource.bitmaps();
      if(bitmapResources){
         var bitmapConsole = RConsole.find(FE3rBitmapConsole)
         var bitmaps = o._bitmaps = new TDictionary();
         var count = bitmapResources.count();
         for(var i = 0; i < count; i++){
            var bitmapResource = bitmapResources.at(i);
            var bitmapCode = bitmapResource.code();
            var bitmapPackResource = bitmapResource.bitmapPack();
            var packCode = bitmapPackResource.code();
            var bitmapPack = bitmapConsole.load(o, o._guid, packCode);
            var bitmap = RClass.create(FE3rBitmap);
            bitmap._pack  = bitmapPack;
            bitmap.loadResource(bitmapResource);
            bitmaps.set(bitmapCode, bitmap);
         }
      }
   }
}
with(MO){
   MO.FE3rMaterialConsole = function FE3rMaterialConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._materials = null;
      o.construct  = FE3rMaterialConsole_construct;
      o.load       = FE3rMaterialConsole_load;
      return o;
   }
   MO.FE3rMaterialConsole_construct = function FE3rMaterialConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._materials = new TDictionary();
   }
   MO.FE3rMaterialConsole_load = function FE3rMaterialConsole_load(context, guid){
      var o = this;
      if(!context){
         throw new TError('Graphics context is empty');
      }
      if(!guid){
         throw new TError('Material guid is empty');
      }
      var material = o._materials.get(guid);
      if(material){
         return material;
      }
      var resource = RConsole.find(FE3sMaterialConsole).find(guid);
      material = RClass.create(FE3rMaterial);
      material.linkGraphicContext(context);
      material.loadResource(resource);
      material.load();
      o._materials.set(guid, material);
      return material;
   }
}
with(MO){
   MO.FE3rMesh = function FE3rMesh(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._ready            = false;
      o._resource         = null;
      o._vertexCount      = 0;
      o._vertexBuffers    = null;
      o._indexBuffer      = null;
      o._resourceMaterial = null;
      o._material         = null;
      o._textures         = null;
      o.construct         = FE3rMesh_construct;
      o.testReady         = FE3rMesh_testReady;
      o.resource          = FE3rMesh_resource;
      o.setResource       = FE3rMesh_setResource;
      o.vertexCount       = FE3rMesh_vertexCount;
      o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
      o.vertexBuffers     = FE3rMesh_vertexBuffers;
      o.indexBuffer       = FE3rMesh_indexBuffer;
      o.material          = FE3rMesh_material;
      o.findTexture       = FE3rMesh_findTexture;
      o.textures          = FE3rMesh_textures;
      o.resource          = FE3rMesh_resource;
      o.loadResource      = FE3rMesh_loadResource;
      o.processLoad       = FE3rMesh_processLoad;
      return o;
   }
   MO.FE3rMesh_construct = function FE3rMesh_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
      o._vertexBuffers = new TObjects();
   }
   MO.FE3rMesh_testReady = function FE3rMesh_testReady(){
      var o = this;
      if(!o._ready){
         if(!o._resource.testReady()){
            return false;
         }
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
      }
      return o._ready;
   }
   MO.FE3rMesh_guid = function FE3rMesh_guid(){
      return this._resource.guid();
   }
   MO.FE3rMesh_resource = function FE3rMesh_resource(){
      return this._resource;
   }
   MO.FE3rMesh_setResource = function FE3rMesh_setResource(p){
      this._resource = p;
   }
   MO.FE3rMesh_vertexCount = function FE3rMesh_vertexCount(){
      return this._vertexCount;
   }
   MO.FE3rMesh_findVertexBuffer = function FE3rMesh_findVertexBuffer(p){
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
   MO.FE3rMesh_vertexBuffers = function FE3rMesh_vertexBuffers(){
      return this._vertexBuffers;
   }
   MO.FE3rMesh_indexBuffer = function FE3rMesh_indexBuffer(){
      return this._indexBuffer;
   }
   MO.FE3rMesh_material = function FE3rMesh_material(){
      return this._material;
   }
   MO.FE3rMesh_findTexture = function FE3rMesh_findTexture(p){
      return this._textures.get(p);
   }
   MO.FE3rMesh_textures = function FE3rMesh_textures(){
      return this._textures;
   }
   MO.FE3rMesh_resource = function FE3rMesh_resource(){
      return this._resource;
   }
   MO.FE3rMesh_loadResource = function FE3rMesh_loadResource(resource){
      var o = this;
      var context = o._graphicContext;
      o._resource = resource;
      var streamResources = resource.streams();
      var streamCount = streamResources.count();
      for(var i = 0; i < streamCount; i++){
         var streamResource = streamResources.get(i);
         var code = streamResource._code;
         var dataCount = streamResource._dataCount;
         var data = streamResource._data;
         if((code == 'index16') || (code == 'index32')){
            var buffer = o._indexBuffer = context.createIndexBuffer();
            buffer._resource = streamResource;
            var dataCd = streamResource.elementDataCd();
            if(dataCd == EDataType.Uint16){
               buffer._strideCd = EG3dIndexStride.Uint16;
            }else if(dataCd == EDataType.Uint32){
               buffer._strideCd = EG3dIndexStride.Uint32;
            }else{
               throw new TError(o, "Unknown data type.");
            }
            buffer.upload(data, 3 * dataCount);
         }else{
            var buffer = context.createVertexBuffer();
            buffer._name = code;
            buffer._resource = streamResource;
            buffer._vertexCount = dataCount;
            var pixels = null;
            switch(code){
               case "position":
                  pixels = new Float32Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Float3;
                  break;
               case "coord":
                  pixels = new Float32Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Float2;
                  break;
               case "color":
                  pixels = new Uint8Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
                  break;
               case "normal":
               case "binormal":
               case "tangent":
                  pixels = new Uint8Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
                  break;
               default:
                  throw new TError(o, "Unknown code");
            }
            buffer.upload(pixels, streamResource._dataStride, dataCount);
            o._vertexBuffers.push(buffer);
         }
      }
      o._ready = true;
   }
   MO.FE3rMesh_processLoad = function FE3rMesh_processLoad(){
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
}
with(MO){
   MO.FE3rMeshAnimation = function FE3rMeshAnimation(o){
      o = RClass.inherits(this, o, FE3rAnimation);
      o.process = FE3rMeshAnimation_process;
      return o;
   }
   MO.FE3rMeshAnimation_process = function FE3rMeshAnimation_process(track){
      var o = this;
      if(!o._valid){
         return;
      }
      var tick = Math.abs(o._currentTick);
      var resource = track._resource;
      var playInfo = o._playInfo;
      resource.calculate(playInfo, tick);
      playInfo.update();
      var matrix = track._matrix;
      matrix.assign(resource.matrixInvert());
      matrix.append(playInfo.matrix);
   }
}
with(MO){
   MO.FE3rMeshConsole = function FE3rMeshConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._loadMeshs = null;
      o._meshs     = null;
      o._thread    = null;
      o._interval  = 200;
      o.onProcess  = FE3rMeshConsole_onProcess;
      o.construct  = FE3rMeshConsole_construct;
      o.findMesh   = FE3rMeshConsole_findMesh;
      o.meshs      = FE3rMeshConsole_meshs;
      o.loadByGuid = FE3rMeshConsole_loadByGuid;
      o.loadByCode = FE3rMeshConsole_loadByCode;
      return o;
   }
   MO.FE3rMeshConsole_onProcess = function FE3rMeshConsole_onProcess(){
      var o = this;
      var s = o._loadMeshs;
      s.record();
      while(s.next()){
         var m = s.current();
         if(m.processLoad()){
            s.removeCurrent();
         }
      }
   }
   MO.FE3rMeshConsole_construct = function FE3rMeshConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._loadMeshs = new TLooper();
      o._meshs = new TDictionary();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3rMeshConsole_findMesh = function FE3rMeshConsole_findMesh(p){
      return this._meshs.get(p);
   }
   MO.FE3rMeshConsole_meshs = function FE3rMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3rMeshConsole_loadByGuid = function FE3rMeshConsole_loadByGuid(pc, pg){
      var o = this;
      if(!RClass.isClass(pc, MGraphicObject)){
         throw new TError('Graphics context is empty');
      }
      if(RString.isEmpty(pg)){
         throw new TError('Mesh guid is empty');
      }
      var m = o._meshs.get(pg);
      if(m){
         return m;
      }
      var rmc = RConsole.find(FE3sMeshConsole);
      var rm = rmc.loadByGuid(pg);
      m = RClass.create(FE3rMesh);
      m.linkGraphicContext(pc);
      m.setCode(pg);
      m.setResource(rm);
      o._meshs.set(pg, m);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadMeshs.push(m);
      }
      return m;
   }
   MO.FE3rMeshConsole_loadByCode = function FE3rMeshConsole_loadByCode(pc, pg){
      var o = this;
      if(!RClass.isClass(pc, MGraphicObject)){
         throw new TError('Graphics context is empty');
      }
      if(RString.isEmpty(pg)){
         throw new TError('Mesh code is empty');
      }
      var m = o._meshs.get(pg);
      if(m){
         return m;
      }
      var rmc = RConsole.find(FE3sMeshConsole);
      var rm = rmc.loadByCode(pg);
      m = RClass.create(FE3rMesh);
      m.linkGraphicContext(pc);
      m.setCode(pg);
      m.setResource(rm);
      o._meshs.set(pg, m);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadMeshs.push(m);
      }
      return m;
   }
}
with(MO){
   MO.FE3rModel = function FE3rModel(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._resource            = null;
      o._meshes              = null;
      o._skeletons           = null;
      o._dataReady           = false;
      o.findMeshByGuid       = FE3rModel_findMeshByGuid;
      o.geometrys            = FE3rModel_geometrys;
      o.resource             = FE3rModel_resource;
      o.setResource          = FE3rModel_setResource;
      o.testReady            = FE3rModel_testReady;
      o.loadResource         = FE3rModel_loadResource;
      o.loadSkeletonResource = FE3rModel_loadSkeletonResource;
      o.processLoad          = FE3rModel_processLoad;
      o.dispose              = FE3rModel_dispose;
      return o;
   }
   MO.FE3rModel_findMeshByGuid = function FE3rModel_findMeshByGuid(p){
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
   MO.FE3rModel_geometrys = function FE3rModel_geometrys(){
      return this._meshes;
   }
   MO.FE3rModel_resource = function FE3rModel_resource(){
      return this._resource;
   }
   MO.FE3rModel_setResource = function FE3rModel_setResource(p){
      this._resource = p;
   }
   MO.FE3rModel_testReady = function FE3rModel_testReady(){
      return this._dataReady;
   }
   MO.FE3rModel_loadSkeletonResource = function FE3rModel_loadSkeletonResource(resource){
      var o = this;
      var modelConsole = RConsole.find(FE3rModelConsole);
      var skinResources = resource.skins();
      if(skinResources){
         var skinCount = skinResources.count();
         for(var i = 0; i < skinCount; i++){
            var skinResource = skinResources.at(i);
            var skin = RClass.create(FE3rSkin);
            skin.linkGraphicContext(o);
            skin.loadResource(skinResource)
            var meshGuid = skinResource.meshGuid();
            var mesh = modelConsole.findMesh(meshGuid);
            mesh.pushSkin(skin);
         }
      }
   }
   MO.FE3rModel_loadResource = function FE3rModel_loadResource(resource){
      var o = this;
      var modelConsole = RConsole.find(FE3rModelConsole);
      var meshResources = resource.meshes();
      if(meshResources){
         var meshes = o._meshes = new TObjects();
         var meshCount = meshResources.count();
         for(var i = 0; i < meshCount; i++){
            var meshResource = meshResources.valueAt(i);
            var mesh = RClass.create(FE3rModelMesh);
            mesh.linkGraphicContext(o);
            mesh.loadResource(meshResource);
            meshes.push(mesh);
            modelConsole.meshs().set(mesh.guid(), mesh);
         }
      }
      var skeletonResources = resource.skeletons();
      if(skeletonResources){
         var skeletonCount = skeletonResources.count();
         for(var i = 0; i < skeletonCount; i++){
            var skeletonResource = skeletonResources.get(i);
            o.loadSkeletonResource(skeletonResource);
         }
      }
      o._dataReady = true;
   }
   MO.FE3rModel_processLoad = function FE3rModel_processLoad(){
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
   MO.FE3rModel_dispose = function FE3rModel_dispose(){
      var o = this;
      o._ready = false;
      o._resource = null;
      o._meshes = RObject.dispose(o._meshes);
      o._skeletons = RObject.dispose(o._skeletons);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rModelConsole = function FE3rModelConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._loadModels    = null;
      o._models        = null;
      o._meshs         = null;
      o._dynamicMeshs  = null;
      o._thread        = null;
      o._interval      = 200;
      o.onProcess      = FE3rModelConsole_onProcess;
      o.construct      = FE3rModelConsole_construct;
      o.findModel      = FE3rModelConsole_findModel;
      o.models         = FE3rModelConsole_models;
      o.findMesh       = FE3rModelConsole_findMesh;
      o.meshs          = FE3rModelConsole_meshs;
      o.load           = FE3rModelConsole_load;
      o.loadMeshByGuid = FE3rModelConsole_loadMeshByGuid;
      o.loadMeshByCode = FE3rModelConsole_loadMeshByCode;
      o.merge          = FE3rModelConsole_merge;
      return o;
   }
   MO.FE3rModelConsole_onProcess = function FE3rModelConsole_onProcess(){
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
   MO.FE3rModelConsole_construct = function FE3rModelConsole_construct(){
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
   MO.FE3rModelConsole_findModel = function FE3rModelConsole_findModel(p){
      return this._models.get(p);
   }
   MO.FE3rModelConsole_models = function FE3rModelConsole_models(){
      return this._models;
   }
   MO.FE3rModelConsole_findMesh = function FE3rModelConsole_findMesh(p){
      return this._meshs.get(p);
   }
   MO.FE3rModelConsole_meshs = function FE3rModelConsole_meshs(){
      return this._meshs;
   }
   MO.FE3rModelConsole_load = function FE3rModelConsole_load(context, guid){
      var o = this;
      if(!context){
         throw new TError('Graphics context is empty');
      }
      if(!guid){
         throw new TError('Model guid is empty');
      }
      var model = o._models.get(guid);
      if(model){
         return model;
      }
      var resource = RConsole.find(FE3sModelConsole).load(guid);
      model = RClass.create(FE3rModel);
      model.linkGraphicContext(context);
      model.setCode(guid);
      model.setResource(resource);
      o._models.set(guid, model);
      o._loadModels.push(model);
      return model;
   }
   MO.FE3rModelConsole_loadMeshByGuid = function FE3rModelConsole_loadMeshByGuid(context, pg){
      var o = this;
      if(!context){
         throw new TError('Graphics context is empty');
      }
      if(!guid){
         throw new TError('Model guid is empty');
      }
      var m = o._models.get(pg);
      if(m){
         return m;
      }
      var resource = RConsole.find(FE3sModelConsole).load(guid);
      m = RClass.create(FE3rModel);
      m.linkGraphicContext(pc);
      m.setCode(pg);
      m.setResource(rm);
      o._models.set(pg, m);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadModels.push(m);
      }
      return m;
   }
   MO.FE3rModelConsole_loadMeshByCode = function FE3rModelConsole_loadMeshByCode(context, pg){
      var o = this;
      if(!RClass.isClass(context, MGraphicObject)){
         throw new TError('Graphics context is empty');
      }
      if(RString.isEmpty(pg)){
         throw new TError('Model guid is empty');
      }
      var model = o._models.get(pg);
      if(model){
         return model;
      }
      var resource = RConsole.find(FE3sModelConsole).load(guid);
      model = RClass.create(FE3rModel);
      model.linkGraphicContext(pc);
      model.setCode(pg);
      model.setResource(resource);
      o._models.set(pg, model);
      if(rm.testReady()){
         m.loadResource(rm);
      }else{
         o._loadModels.push(m);
      }
      return m;
   }
   MO.FE3rModelConsole_merge = function FE3rModelConsole_merge(effect, region, offset, count){
      var o = this;
      var flag = 'merge';
      var renderables = region.renderables();
      for(var i = 0; i < count; i++){
         var renderable = renderables.getAt(offset + i);
         flag += '|' + renderable.hashCode();
      }
      var model = o._dynamicMeshs.get(flag);
      if(!model){
         model = RClass.create(FE3rDynamicModel);
         model.linkGraphicContext(region);
         for(var i = 0; i < count; i++){
            var renderable = renderables.getAt(offset + i);
            model.pushRenderable(renderable);
         }
         model.build();
         o._dynamicMeshs.set(flag, model);
         MO.Logger.info(o, 'Create merge model. (mesh={1}, renderables={2})', model.meshes().count(), model.renderables().count());
      }
      model.update();
      return model;
   }
}
with(MO){
   MO.FE3rModelMesh = function FE3rModelMesh(o){
      o = RClass.inherits(this, o, FE3rGeometry);
      o._ready            = false;
      o._resourceMaterial = null;
      o._skins            = null;
      o._boneIds          = null;
      o.construct         = FE3rModelMesh_construct;
      o.testReady         = FE3rModelMesh_testReady;
      o.guid              = FE3rModelMesh_guid;
      o.skins             = FE3rModelMesh_skins;
      o.pushSkin          = FE3rModelMesh_pushSkin;
      o.boneIds           = FE3rModelMesh_boneIds;
      return o;
   }
   MO.FE3rModelMesh_construct = function FE3rModelMesh_construct(){
      var o = this;
      o.__base.FE3rGeometry.construct.call(o);
   }
   MO.FE3rModelMesh_testReady = function FE3rModelMesh_testReady(){
      var o = this;
      if(!o._ready){
         var textures = o._textures;
         if(textures){
            var count = textures.count();
            for(var i = 0; i < count; i++){
               var texture = textures.at(i);
               if(!texture.testReady()){
                  return false;
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FE3rModelMesh_guid = function FE3rModelMesh_guid(){
      return this._resource.guid();
   }
   MO.FE3rModelMesh_skins = function FE3rModelMesh_skins(){
      return this._skins;
   }
   MO.FE3rModelMesh_pushSkin = function FE3rModelMesh_pushSkin(skin){
      var o = this;
      var skins = o._skins;
      if(!skins){
         skins = o._skins = new TObjects();
      }
      skins.push(skin);
   }
   MO.FE3rModelMesh_boneIds = function FE3rModelMesh_boneIds(){
      return this._boneIds;
   }
}
with(MO){
   MO.FE3rObject = function FE3rObject(o){
      o = RClass.inherits(this, o, FObject, MAttributeGuid, MAttributeCode, MGraphicObject);
      return o;
   }
}
with(MO){
   MO.FE3rPipeline = function FE3rPipeline(o){
      o = RClass.inherits(this, o, FObject);
      o._vertexBuffers = null;
      o._indexBuffer   = null;
      o.construct        = FE3rPipeline_construct;
      o.findVertexBuffer = FE3rPipeline_findVertexBuffer;
      o.loadResource     = FE3rPipeline_loadResource;
      return o;
   }
   MO.FE3rPipeline_construct = function FE3rPipeline_construct(){
      var o = this;
      o.__base.FRenderable.construct.call(o);
      o._vertexBuffers = new TObjects();
   }
   MO.FE3rPipeline_findVertexBuffer = function FE3rPipeline_findVertexBuffer(p){
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
   MO.FE3rPipeline_loadResource = function FE3rPipeline_loadResource(p){
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
}
with(MO){
   MO.FE3rSkeleton = function FE3rSkeleton(o){
      o = RClass.inherits(this, o, FE3rObject, MLinkerResource);
      o._bones       = null;
      o._skins       = null;
      o.bones        = FE3rSkeleton_bones;
      o.skins        = FE3rSkeleton_skins;
      o.loadResource = FE3rSkeleton_loadResource;
      return o;
   }
   MO.FE3rSkeleton_bones = function FE3rSkeleton_bones(){
      return this._bones;
   }
   MO.FE3rSkeleton_skins = function FE3rSkeleton_skins(){
      return this._skins;
   }
   MO.FE3rSkeleton_loadResource = function FE3rSkeleton_loadResource(resource){
      var o = this;
      o._resource = resource;
      var boneResources = resource._bones;
      var count = boneResources.count();
      if(count > 0){
         var bones = o._bones = new TObjects();
         for(var i = 0; i < count; i++){
            var boneResource = boneResources.at(i);
            var bone = RClass.create(FE3rBone);
            bone.loadResource(boneResource);
            bones.push(bone);
         }
      }
   }
}
with(MO){
   MO.FE3rSkeletonAnimation = function FE3rSkeletonAnimation(o){
      o = RClass.inherits(this, o, FE3rAnimation);
      o.process = FE3rSkeletonAnimation_process;
      return o;
   }
   MO.FE3rSkeletonAnimation_process = function FE3rSkeletonAnimation_process(skeleton){
      var o = this;
      if(!o._valid){
         return;
      }
      var tick = Math.abs(o._currentTick);
      var bones = skeleton.bones();
      var count = bones.count();
      for(var i = 0; i < count; i++){
         var bone = bones.at(i);
         bone.update(o._playInfo, tick);
      }
   }
}
with(MO){
   MO.FE3rSkin = function FE3rSkin(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._resource    = null;
      o._streams     = null;
      o.resource     = FE3rSkin_resource;
      o.streams      = FE3rSkin_streams;
      o.loadResource = FE3rSkin_loadResource;
      return o;
   }
   MO.FE3rSkin_resource = function FE3rSkin_resource(){
      return this._resource;
   }
   MO.FE3rSkin_streams = function FE3rSkin_streams(){
      return this._streams;
   }
   MO.FE3rSkin_loadResource = function FE3rSkin_loadResource(resource){
      var o = this;
      o._resource = resource;
      var streamResources = resource.streams();
      if(streamResources){
         var count = streamResources.count();
         if(count > 0){
            var streams = o._streams = new TObjects();
            for(var i = 0; i < count; i++){
               var streamResource = streamResources.at(i);
               var stream = RClass.create(FE3rStream);
               stream.linkGraphicContext(o);
               stream.loadResource(streamResource);
               streams.push(stream);
            }
         }
      }
   }
}
with(MO){
   MO.FE3rStream = function FE3rStream(o){
      o = RClass.inherits(this, o, FE3rObject);
      o._buffer      = null;
      o._resource    = null;
      o.resource     = FE3rStream_resource;
      o.buffer       = FE3rStream_buffer;
      o.loadResource = FE3rStream_loadResource;
      return o;
   }
   MO.FE3rStream_resource = function FE3rStream_resource(){
      return this._resource;
   }
   MO.FE3rStream_buffer = function FE3rStream_buffer(){
      return this._buffer;
   }
   MO.FE3rStream_loadResource = function FE3rStream_loadResource(resource){
      var o = this;
      var code = resource.code();
      var dataCount = resource._dataCount;
      o._resource = resource;
      o._vertexCount = dataCount;
      var buffer = o._buffer = o._graphicContext.createVertexBuffer(FE3rVertexBuffer);
      buffer.setCode(code);
      buffer.setResource(resource);
      switch(code){
         case "bone_index":
            buffer.setFormatCd(EG3dAttributeFormat.Byte4);
            break;
         case "bone_weight":
            buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
            break;
         default:
            throw new TError("Unknown code");
      }
      buffer.upload(resource._data, resource._dataStride, dataCount);
   }
}
with(MO){
   MO.FE3rTexture = function FE3rTexture(o){
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
   MO.FE3rTexture_construct = function FE3rTexture_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._bitmaps = new TDictionary();
   }
   MO.FE3rTexture_resource = function FE3rTexture_resource(){
      return this._resource;
   }
   MO.FE3rTexture_setResource = function FE3rTexture_setResource(p){
      this._resource = p;
   }
   MO.FE3rTexture_bitmaps = function FE3rTexture_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3rTexture_testReady = function FE3rTexture_testReady(){
      return this._ready;
   }
   MO.FE3rTexture_loadBitmap = function FE3rTexture_loadBitmap(p){
      var o = this;
      var s = o._bitmaps;
      var b = s.get(p);
      if(!b){
         b = RClass.create(FE3rTextureBitmap);
         s.set(p, b);
      }
      return b;
   }
   MO.FE3rTexture_loadResource = function FE3rTexture_loadResource(p){
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
   MO.FE3rTexture_load = function FE3rTexture_load(){
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
   MO.FE3rTexture_processLoad = function FE3rTexture_processLoad(){
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
   MO.FE3rTexture_dispose = function FE3rTexture_dispose(){
      var o = this;
      o._ready = false;
      o._resource = null;
      o._bitmaps = RObject.dispose(o._bitmaps);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmap = function FE3rTextureBitmap(o){
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
   MO.FE3rTextureBitmap_construct = function FE3rTextureBitmap_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FE3rTextureBitmap_texture = function FE3rTextureBitmap_texture(){
      return this._bitmapPack.texture();
   }
   MO.FE3rTextureBitmap_testReady = function FE3rTextureBitmap_testReady(){
      return this._ready;
   }
   MO.FE3rTextureBitmap_load = function FE3rTextureBitmap_load(p){
      var o = this;
      o._bitmapPack = p;
      o._ready = true;
   }
   MO.FE3rTextureBitmap_dispose = function FE3rTextureBitmap_dispose(){
      var o = this;
      o._context = null;
      o._ready = false;
      o._bitmapPack = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmapCubePack = function FE3rTextureBitmapCubePack(o){
      o = RClass.inherits(this, o, FE3rTextureBitmapPack);
      o._resource    = null;
      o._images      = null;
      o.onLoad       = FE3rTextureBitmapCubePack_onLoad;
      o.construct    = FE3rTextureBitmapCubePack_construct;
      o.loadResource = FE3rTextureBitmapCubePack_loadResource;
      o.dispose      = FE3rTextureBitmapCubePack_dispose;
      return o;
   }
   MO.FE3rTextureBitmapCubePack_onLoad = function FE3rTextureBitmapCubePack_onLoad(p){
      var o = this;
      var c = o._graphicContext;
      var is = o._images;
      var capability = RBrowser.capability();
      for(var i = 0; i < 6; i++){
         if(!is[i].testReady()){
            return;
         }
      }
      var t = o._texture = c.createCubeTexture();
      t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
      if(capability.blobCreate){
         for(var i = 0; i < 6; i++){
            var m = is[i];
            window.URL.revokeObjectURL(m.url());
            is[i] = RObject.dispose(m);
         }
      }
      o._images = RObject.dispose(o._images);
      o._dataReady = true;
   }
   MO.FE3rTextureBitmapCubePack_construct = function FE3rTextureBitmapCubePack_construct(){
      var o = this;
      o.__base.FE3rTextureBitmapPack.construct.call(o);
   }
   MO.FE3rTextureBitmapCubePack_loadResource = function FE3rTextureBitmapCubePack_loadResource(p){
      var o = this;
      o._resource = p;
      var texture = p._texture;
      var capability = RBrowser.capability();
      var d = p.data();
      var t = p._formatName;
      o._images = new TObjects();
      for(var i = 0; i < 6; i++){
         var g = o._images[i] = RClass.create(FImage);
         g._index = i;
         g.setOptionAlpha(false);
         if(capability.blobCreate){
            var blob = new Blob([d[i]], {'type' : 'image/' + t});
            var url = window.URL.createObjectURL(blob);
            g.loadUrl(url);
         }else{
            var url = RBrowser.hostPath('/cloud.content.texture.bitmap.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
            g.loadUrl(url);
         }
         g.addLoadListener(o, o.onLoad);
      }
   }
   MO.FE3rTextureBitmapCubePack_dispose = function FE3rTextureBitmapCubePack_dispose(){
      var o = this;
      o._images = RObject.dispose(o._images);
      o.__base.FE3rTextureBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmapFlatPack = function FE3rTextureBitmapFlatPack(o){
      o = RClass.inherits(this, o, FE3rTextureBitmapPack);
      o._resource    = null;
      o._image       = null;
      o.onLoad       = FE3rTextureBitmapFlatPack_onLoad;
      o.construct    = FE3rTextureBitmapFlatPack_construct;
      o.loadResource = FE3rTextureBitmapFlatPack_loadResource;
      o.dispose      = FE3rTextureBitmapFlatPack_dispose;
      return o;
   }
   MO.FE3rTextureBitmapFlatPack_onLoad = function FE3rTextureBitmapFlatPack_onLoad(p){
      var o = this;
      var c = o._graphicContext;
      var t = o._texture = c.createFlatTexture();
      t.upload(o._image);
      t.makeMipmap();
      o._image = RObject.dispose(o._image);
      o._dataReady = true;
   }
   MO.FE3rTextureBitmapFlatPack_construct = function FE3rTextureBitmapFlatPack_construct(){
      var o = this;
      o.__base.FE3rTextureBitmapPack.construct.call(o);
   }
   MO.FE3rTextureBitmapFlatPack_loadResource = function FE3rTextureBitmapFlatPack_loadResource(p){
      var o = this;
      o._resource = p;
      var rt = p._texture;
      var c = p.code();
      var g = o._image = RConsole.find(FE3sTextureConsole).loadBitmap(rt._guid, c, p._formatName);
      g.addLoadListener(o, o.onLoad);
   }
   MO.FE3rTextureBitmapFlatPack_dispose = function FE3rTextureBitmapFlatPack_dispose(){
      var o = this;
      o._image = RObject.dispose(o._image);
      o.__base.FE3rTextureBitmapPack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureBitmapPack = function FE3rTextureBitmapPack(o){
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
   MO.FE3rTextureBitmapPack_construct = function FE3rTextureBitmapPack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }
   MO.FE3rTextureBitmapPack_texture = function FE3rTextureBitmapPack_texture(){
      return this._texture;
   }
   MO.FE3rTextureBitmapPack_testReady = function FE3rTextureBitmapPack_testReady(){
      var o = this;
      if(o._dataReady){
         o._ready = o._texture.isValid();
      }
      return o._ready;
   }
   MO.FE3rTextureBitmapPack_dispose = function FE3rTextureBitmapPack_dispose(){
      var o = this;
      o._ready = false;
      o._dataReady = false;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FE3rTextureConsole = function FE3rTextureConsole(o){
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
   MO.FE3rTextureConsole_onProcess = function FE3rTextureConsole_onProcess(){
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
   MO.FE3rTextureConsole_construct = function FE3rTextureConsole_construct(){
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
   MO.FE3rTextureConsole_bitmaps = function FE3rTextureConsole_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3rTextureConsole_textures = function FE3rTextureConsole_textures(){
      return this._textures;
   }
   MO.FE3rTextureConsole_load = function FE3rTextureConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var texture = o._textures.get(flag);
      if(texture){
         return texture;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rTextureCube);
      }else{
         bitmap = RClass.create(FE3rTexture);
      }
      t._name = pg;
      t.linkGraphicContext(pc);
      t.load(u);
      o._bitmaps.set(pg, t);
      return t;
   }
   MO.FE3rTextureConsole_load2 = function FE3rTextureConsole_load2(pc, pt){
      var o = this;
      var s = o._textures;
      var t = s.get(pt);
      if(t){
         return t;
      }
      var rc = RConsole.find(FE3sTextureConsole);
      var r = rc.load(pt);
      t = RClass.create(FE3rTexture);
      t.linkGraphicContext(pc);
      t.setResource(r);
      s.set(pt, t);
      o._loadTextures.push(t);
      return t;
   }
   MO.FE3rTextureConsole_loadBitmap = function FE3rTextureConsole_loadBitmap(pc, pt, pb){
      var o = this;
      var b = o._bitmaps.get(pb);
      if(b){
         return b;
      }
      var t = o.load(pc, pt);
      return t.loadBitmap(pb);
   }
}
with(MO){
   MO.FE3rTrack = function FE3rTrack(o){
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
   MO.FE3rTrack_construct = function FE3rTrack_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3rTrack_matrix = function FE3rTrack_matrix(){
      return this._matrix;
   }
   MO.FE3rTrack_resource = function FE3rTrack_resource(){
      return this._resource;
   }
   MO.FE3rTrack_loadResource = function FE3rTrack_loadResource(p){
      var o = this;
      o._resource = p;
      var fs = p.frames();
      if(fs != null){
         o._frameCount = fs.count();
      }
      o._frameTick = p.frameTick();
   }
   MO.FE3rTrack_dispose = function FE3rTrack_dispose(){
      var o = this;
      o._resource = null;
      o.__base.FG3dTrack.dispose.call(o);
   }
}
with(MO){
   MO.FE3rVertexBuffer = function FE3rVertexBuffer(o){
      o = RClass.inherits(this, o, FWglVertexBuffer, MLinkerResource);
      o.dispose = FE3rVertexBuffer_dispose;
      return o;
   }
   MO.FE3rVertexBuffer_dispose = function FE3rVertexBuffer_dispose(){
      var o = this;
      o.__base.MLinkerResource.dispose.call(o);
      o.__base.FWglVertexBuffer.dispose.call(o);
   }
}
with(MO){
   MO.FE3dAutomaticEffect = function FE3dAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o.drawGroup = FE3dAutomaticEffect_drawGroup;
      return o;
   }
   MO.FE3dAutomaticEffect_drawGroup = function FE3dAutomaticEffect_drawGroup(region, renderables, offset, count){
      var o = this;
      if(count > 1){
         var modelConsole = RConsole.find(FE3rModelConsole);
         var model = modelConsole.merge(o, region, offset, count);
         if(model){
            var context = o._graphicContext;
            var meshes = model.meshes();
            var meshCount = meshes.count();
            var spaceName = region.spaceName();
            var mesh = meshes.first();
            var info = mesh.selectInfo(spaceName);
            var effect = info.effect;
            if(!effect){
               effect = info.effect = RConsole.find(FG3dEffectConsole).find(context, region, mesh);
            }
            for(var i = 1; i < meshCount; i++){
               var mesh = meshes.getAt(i);
               var info = mesh.selectInfo(spaceName);
               info.effect = effect;
            }
            return effect.drawRenderables(region, meshes, 0, meshCount);
         }
      }
      o.drawRenderables(region, renderables, offset, count);
   }
}
with(MO){
   MO.FE3dControlAutomaticEffect = function FE3dControlAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'control.automatic';
      o.drawRenderable = FE3dControlAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dControlAutomaticEffect_drawRenderable = function FE3dControlAutomaticEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var program = o._program;
      var matrix = renderable.currentMatrix();
      var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var material = renderable.material();
      var info = material.info();
      o.bindMaterial(material);
      program.setParameter('vc_model_matrix', matrix);
      program.setParameter('vc_vp_matrix', cameraVpMatrix);
      program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
      program.setParameter('fc_ambient_color', info.ambientColor);
      o.bindAttributes(renderable);
      o.bindSamplers(renderable);
      var indexBuffer = renderable.indexBuffers().first();
      context.drawTriangles(indexBuffer);
   }
}
with(MO){
   MO.FE3dControlFrameEffect = function FE3dControlFrameEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'control.frame';
      o.drawRenderable = FE3dControlFrameEffect_drawRenderable;
      return o;
   }
   MO.FE3dControlFrameEffect_drawRenderable = function FE3dControlFrameEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
      var vld = pg.calculate(EG3dRegionParameter.LightDirection);
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter('vc_camera_position', vcp);
      p.setParameter('vc_light_direction', vld);
      p.setParameter('fc_camera_position', vcp);
      p.setParameter('fc_light_direction', vld);
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      p.setParameter4('fc_reflect', 0, 0, 1.0 - mi.reflectMerge, mi.reflectMerge);
      p.setParameter('fc_emissive_color', mi.emissiveColor);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dControlPass = function FE3dControlPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code = 'control';
      return o;
   }
}
with(MO){
   MO.FE3dControlTechnique = function FE3dControlTechnique(o){
      o = RClass.inherits(this, o, FG3dTechnique);
      o._code        = 'control';
      o._passControl = null;
      o.setup       = FE3dControlTechnique_setup;
      o.passControl = FE3dControlTechnique_passControl;
      o.drawRegion  = FE3dControlTechnique_drawRegion;
      return o;
   }
   MO.FE3dControlTechnique_setup = function FE3dControlTechnique_setup(){
      var o = this;
      o.__base.FG3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Result);
      var pd = o._passControl = RClass.create(FE3dControlPass);
      pd.linkGraphicContext(o);
      pd.setup();
      o._passes.push(pd);
   }
   MO.FE3dControlTechnique_passControl = function FE3dControlTechnique_passControl(){
      return this._passControl;
   }
   MO.FE3dControlTechnique_drawRegion = function FE3dControlTechnique_drawRegion(p){
      var o = this;
      if(p.renderables().isEmpty()){
         return;
      }
      o._graphicContext.clearDepth(1);
      o.__base.FG3dTechnique.drawRegion.call(o, p);
   }
}
with(MO){
   MO.FE3dGeneralColorAutomaticEffect = function FE3dGeneralColorAutomaticEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code          = 'general.color.automatic';
      o.buildMaterial  = FE3dGeneralColorAutomaticEffect_buildMaterial;
      o.drawRenderable = FE3dGeneralColorAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorAutomaticEffect_buildMaterial = function FE3dGeneralColorAutomaticEffect_buildMaterial(effectInfo, renderable){
      var o = this;
      var material = renderable.material();
      var data = effectInfo.material;
      if(!data){
         data = effectInfo.material = RClass.create(FFloatStream);
         data.setLength(40);
         material._dirty = true;
      }
      if(material._dirty){
         var info = material.info();
         data.reset();
         if(info.optionAlpha){
            data.writeFloat4(info.alphaBase, info.alphaRate, 0, 0);
         }else{
            data.writeFloat4(info.alphaBase, 1, 0, 0);
         }
         data.writeFloat4(info.colorMin, info.colorMax, info.colorBalance, info.colorRate);
         data.writeColor4(info.vertexColor);
         data.writeColor4(info.ambientColor);
         data.writeColor4(info.diffuseColor);
         data.writeColor4(info.specularColor);
         data.writeFloat4(info.specularBase, info.specularLevel, info.specularAverage, info.specularShadow);
         data.writeColor4(info.reflectColor);
         data.writeFloat4(0, 0, 1 - info.reflectMerge, info.reflectMerge);
         data.writeColor4(info.emissiveColor);
         material._dirty = false;
      }
   }
   MO.FE3dGeneralColorAutomaticEffect_drawRenderable = function FE3dGeneralColorAutomaticEffect_drawRenderable(region, renderable){
      var o = this;
      var program = o._program;
      var cameraPosition = region.calculate(EG3dRegionParameter.CameraPosition);
      var lightDirection = region.calculate(EG3dRegionParameter.LightDirection);
      var vpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix)
      var material = renderable.material();
      o.bindMaterial(material);
      if(renderable._optionMerge){
         var mergeRenderables = renderable.mergeRenderables();
         var mergeCount = mergeRenderables.count();
         var data = RTypeArray.findTemp(EDataType.Float32, 16 * mergeCount);
         for(var i = 0; i < mergeCount; i++){
            var mergeRenderable = mergeRenderables.at(i);
            var matrix = mergeRenderable.currentMatrix();
            matrix.writeData(data, 16 * i);
         }
         program.setParameter('vc_model_matrix', data);
      }else{
         var matrix = renderable.currentMatrix();
         program.setParameter('vc_model_matrix', matrix);
      }
      program.setParameter('vc_vp_matrix', vpMatrix);
      program.setParameter('vc_camera_position', cameraPosition);
      program.setParameter('vc_light_direction', lightDirection);
      program.setParameter('fc_camera_position', cameraPosition);
      program.setParameter('fc_light_direction', lightDirection);
      if(o._supportMaterialMap){
         var materialId = renderable._materialId;
         program.setParameter4('fc_material', 1 / 32, materialId / 512, 0, 0);
      }else{
         var info = renderable.activeInfo();
         o.buildMaterial(info, renderable);
         program.setParameter('fc_materials', info.material.memory());
      }
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }
}
with(MO){
   MO.FE3dGeneralColorFlatEffect = function FE3dGeneralColorFlatEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code          = 'general.color.flat';
      o.drawRenderable = FE3dGeneralColorFlatEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorFlatEffect_drawRenderable = function FE3dGeneralColorFlatEffect_drawRenderable(region, renderable){
      var o = this;
      var context = o._graphicContext;
      var contextSize = context.size();
      var contextWidth = contextSize.width;
      var contextHeight = contextSize.height;
      var program = o._program;
      var material = renderable.material();
      o.bindMaterial(material);
      if(renderable._optionMerge){
         var meshs = renderable.mergeRenderables();
         var meshCount = meshs.count();
         var data = RTypeArray.findTemp(EDataType.Float32, 4 * meshCount);
         var index = 0;
         for(var i = 0; i < meshCount; i++){
            var mesh = meshs.at(i);
            var matrix = mesh.matrix();
            data[index++] = matrix.sx / contextWidth * 2;
            data[index++] = matrix.sy / contextHeight * 2;
            data[index++] = matrix.tx / contextWidth * 2 - 1;
            data[index++] = 1 - matrix.ty / contextHeight * 2;
            mesh.currentMatrix().writeData(data, 4 * i);
         }
         program.setParameter('vc_position', data);
         o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
      }else{
         var matrix = renderable.matrix();
         var cx = matrix.sx / contextWidth * 2;
         var cy = matrix.sy / contextHeight * 2;
         var tx = matrix.tx / contextWidth * 2 - 1;
         var ty = 1 - matrix.ty / contextHeight * 2;
         program.setParameter4('vc_position', cx, cy, tx, ty);
         var size = renderable.size();
         var clipX = matrix.tx;
         var clipY = contextHeight - matrix.ty - size.height;
         context.setScissorRectangle(clipX, clipY, size.width, size.height);
         o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
         context.setScissorRectangle();
      }
   }
}
with(MO){
   MO.FE3dGeneralColorPass = function FE3dGeneralColorPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code = 'color';
      return o;
   }
}
with(MO){
   MO.FE3dGeneralColorSkeletonEffect = function FE3dGeneralColorSkeletonEffect(o){
      o = RClass.inherits(this, o, FE3dAutomaticEffect);
      o._code            = 'general.color.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dGeneralColorSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FE3dGeneralColorSkeletonEffect_drawRenderable = function FE3dGeneralColorSkeletonEffect_drawRenderable(region, renderable){
      var o = this;
      var c = o._graphicContext;
      var program = o._program;
      var vcp = region.calculate(EG3dRegionParameter.CameraPosition);
      var vld = region.calculate(EG3dRegionParameter.LightDirection);
      var m = renderable.material();
      var mi = m.info();
      o.bindMaterial(m);
      program.setParameter('vc_model_matrix', renderable.currentMatrix());
      program.setParameter('vc_vp_matrix', region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      program.setParameter('vc_camera_position', vcp);
      program.setParameter('vc_light_direction', vld);
      program.setParameter('fc_camera_position', vcp);
      program.setParameter('fc_light_direction', vld);
      program.setParameter('fc_color', mi.ambientColor);
      program.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      program.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      program.setParameter('fc_ambient_color', mi.ambientColor);
      program.setParameter('fc_diffuse_color', mi.diffuseColor);
      program.setParameter('fc_specular_color', mi.specularColor);
      program.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      program.setParameter('fc_specular_view_color', mi.specularViewColor);
      program.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      program.setParameter('fc_reflect_color', mi.reflectColor);
      var bones = renderable.bones();
      if(bones){
         var boneCount = renderable._boneLimit;
         var data = RTypeArray.findTemp(EDataType.Float32, 12 * boneCount);
         for(var i = 0; i < boneCount; i++){
            var bone = bones.at(i);
            var boneMatrix = bone.matrix();
            boneMatrix.writeData4x3(data, 12 * i);
         }
         program.setParameter('vc_bone_matrix', data);
      }
      o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   }
}
with(MO){
   MO.FE3dGeneralTechnique = function FE3dGeneralTechnique(o){
      o = RClass.inherits(this, o, FE3dTechnique);
      o._code      = 'general';
      o._passColor = null;
      o.setup      = FE3dGeneralTechnique_setup;
      o.passColor  = FE3dGeneralTechnique_passColor;
      return o;
   }
   MO.FE3dGeneralTechnique_setup = function FE3dGeneralTechnique_setup(){
      var o = this;
      o.__base.FE3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Ambient);
      o.registerMode(EG3dTechniqueMode.DiffuseLevel);
      o.registerMode(EG3dTechniqueMode.DiffuseColor);
      o.registerMode(EG3dTechniqueMode.SpecularLevel);
      o.registerMode(EG3dTechniqueMode.SpecularColor);
      o.registerMode(EG3dTechniqueMode.Result);
      var p = o._passColor = RClass.create(FE3dGeneralColorPass);
      p.linkGraphicContext(o);
      p.setup();
      o._passes.push(p);
   }
   MO.FE3dGeneralTechnique_passColor = function FE3dGeneralTechnique_passColor(){
      return this._passColor;
   }
}
with(MO){
   MO.FE3dShadowColorAutomaticEffect = function FE3dShadowColorAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'shadow.color.automatic';
      o.drawRenderable = FE3dShadowColorAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowColorAutomaticEffect_drawRenderable = function FE3dShadowColorAutomaticEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var vcp = pg.calculate(EG3dRegionParameter.CameraPosition);
      var vcvpm = pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var vld = pg.calculate(EG3dRegionParameter.LightDirection);
      var vlvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
      var vlvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
      var vlci = pg.calculate(EG3dRegionParameter.LightInfo);
      var tp = pg.techniquePass();
      var m = pr.material();
      o.bindMaterial(m);
      p.setParameter('vc_light_depth', vlci);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', vcvpm);
      p.setParameter('vc_camera_position', vcp);
      p.setParameter('vc_light_direction', vld);
      p.setParameter('vc_light_view_matrix', vlvm);
      p.setParameter('vc_light_vp_matrix', vlvpm);
      p.setParameter('fc_camera_position', vcp);
      p.setParameter('fc_light_direction', vld);
      p.setParameter4('fc_light_depth', 1.0 / 4096.0, 0.0, -1.0 / 4096.0, vlci.w);
      var mi = m.info();
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      o.bindAttributes(pr);
      p.setSampler('fs_light_depth', tp.textureDepth());
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dShadowColorPass = function FE3dShadowColorPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code           = 'color';
      o._textureDepth   = null;
      o.textureDepth    = FE3dShadowColorPass_textureDepth;
      o.setTextureDepth = FE3dShadowColorPass_setTextureDepth;
      o.drawRegion      = FE3dShadowColorPass_drawRegion;
      return o;
   }
   MO.FE3dShadowColorPass_textureDepth = function FE3dShadowColorPass_textureDepth(){
      return this._textureDepth;
   }
   MO.FE3dShadowColorPass_setTextureDepth = function FE3dShadowColorPass_setTextureDepth(p){
      this._textureDepth = p;
   }
   MO.FE3dShadowColorPass_drawRegion = function FE3dShadowColorPass_drawRegion(p){
      var o = this;
      var c = o._graphicContext;
      c.setRenderTarget(null);
      var bc = p._backgroundColor;
      c.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
      o.__base.FG3dTechniquePass.drawRegion.call(o, p)
   }
}
with(MO){
   MO.FE3dShadowColorSkeletonEffect = function FE3dShadowColorSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code            = 'shadow.color.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dShadowColorSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowColorSkeletonEffect_drawRenderable = function FE3dShadowColorSkeletonEffect_drawRenderable(pr, r){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var prvp = pr.matrixViewProjection();
      var prcp = pr.cameraPosition();
      var prld = pr.lightDirection();
      if(p.hasAttribute()){
         var as = p.attributes();
         var ac = as.count();
         for(var n = 0; n < ac; n++){
            var a = as.value(n);
            if(a._statusUsed){
               var vb = r.findVertexBuffer(a._linker);
               if(vb == null){
                  throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
               }
               p.setAttribute(a._name, vb, vb._formatCd);
            }
         }
      }
      if(p.hasSampler()){
         var ss = p.samplers();
         var sc = ss.count();
         for(var n = 0; n < sc; n++){
            var s = ss.value(n);
            if(s._statusUsed){
               var ln = s.linker();
               var sp = r.findTexture(ln);
               if(sp != null){
                  p.setSampler(s.name(), sp.texture());
               }else{
                  throw new TError("Can't find sampler. (linker={1})", ln);
               }
            }
         }
      }
      p.setParameter('vc_model_matrix', r.currentMatrix());
      p.setParameter('vc_vp_matrix', prvp);
      p.setParameter('vc_camera_position', prcp);
      p.setParameter('vc_light_direction', prld);
      p.setParameter('fc_camera_position', prcp);
      p.setParameter('fc_light_direction', prld);
      var m = r.material();
      var mi = m.info();
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularLevel, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      var bs = r.bones();
      if(bs){
         var bc = bs.count();
         if(bc > 32){
            bc = 32;
         }
         var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
         for(var i = 0; i < bc; i++){
            var b = bs.get(i);
            var m = b.matrix();
            m.writeData(d, 16 * i);
         }
         p.setParameter('vc_bone_matrix', d);
      }
      var ib = r.indexBuffer();
      c.drawTriangles(ib, 0, ib._count);
   }
}
with(MO){
   MO.FE3dShadowDepthAutomaticEffect = function FE3dShadowDepthAutomaticEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'shadow.depth.automatic';
      o.drawRenderable = FE3dShadowDepthAutomaticEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowDepthAutomaticEffect_drawRenderable = function FE3dShadowDepthAutomaticEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      var lvm = pg.calculate(EG3dRegionParameter.LightViewMatrix);
      var lvpm = pg.calculate(EG3dRegionParameter.LightViewProjectionMatrix);
      var lci = pg.calculate(EG3dRegionParameter.LightInfo);
      c.setBlendFactors(false);
      p.setParameter('vc_camera', lci);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_view_matrix', lvm);
      p.setParameter('vc_vp_matrix', lvpm);
      p.setParameter('fc_camera', lci);
      p.setParameter4('fc_alpha', 0, 0, 0, 0.1);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dShadowDepthPass = function FE3dShadowDepthPass(o){
      o = RClass.inherits(this, o, FG3dTechniquePass);
      o._code         = 'depth';
      o._renderTarget = null;
      o._textureDepth = null;
      o._renderTarget = null;
      o.setup         = FE3dShadowDepthPass_setup;
      o.textureDepth  = FE3dShadowDepthPass_textureDepth;
      o.drawRegion    = FE3dShadowDepthPass_drawRegion;
      return o;
   }
   MO.FE3dShadowDepthPass_setup = function FE3dShadowDepthPass_setup(){
      var o = this;
      o.__base.FG3dTechniquePass.setup.call(o);
      var c = o._graphicContext;
      var d = o._textureDepth = c.createFlatTexture();
      d.setFilter(EG3dSamplerFilter.Linear, EG3dSamplerFilter.Linear);
      d.setWrap(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      var t = o._renderTarget = c.createRenderTarget();
      t.size().set(2048, 2048);
      t.textures().push(d);
      t.build();
   }
   MO.FE3dShadowDepthPass_textureDepth = function FE3dShadowDepthPass_textureDepth(){
      return this._textureDepth;
   }
   MO.FE3dShadowDepthPass_drawRegion = function FE3dShadowDepthPass_drawRegion(p){
      var o = this;
      var c = o._graphicContext;
      if(o._finish){
         c.setRenderTarget(null);
         var bc = p._backgroundColor;
         o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
      }else{
         c.setRenderTarget(o._renderTarget);
         c.clear(0.0, 0.0, 0.0, 1.0, 1.0, 1.0);
      }
      p._textureDepth = o._textureDepth;
      o.__base.FG3dTechniquePass.drawRegion.call(o, p)
   }
}
with(MO){
   MO.FE3dShadowDepthSkeletonEffect = function FE3dShadowDepthSkeletonEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code            = 'shadow.depth.skeleton';
      o._supportSkeleton = true;
      o.drawRenderable   = FE3dShadowDepthSkeletonEffect_drawRenderable;
      return o;
   }
   MO.FE3dShadowDepthSkeletonEffect_drawRenderable = function FE3dShadowDepthSkeletonEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var p = o._program;
      p.setParameter('vc_model_matrix', r.currentMatrix());
      p.setParameter('vc_vp_matrix', prvp);
      p.setParameter('vc_camera_position', prcp);
      p.setParameter('vc_light_direction', prld);
      p.setParameter('fc_camera_position', prcp);
      p.setParameter('fc_light_direction', prld);
      var m = r.material();
      var mi = m.info();
      p.setParameter('fc_color', mi.ambientColor);
      p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      p.setParameter('fc_diffuse_color', mi.diffuseColor);
      p.setParameter('fc_specular_color', mi.specularColor);
      p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
      p.setParameter('fc_specular_view_color', mi.specularViewColor);
      p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
      p.setParameter('fc_reflect_color', mi.reflectColor);
      var bs = pr.bones();
      if(bs){
         var bc = bs.count();
         if(bc > 32){
            bc = 32;
         }
         var d = RTypeArray.findTemp(EDataType.Float32, 16 * bc);
         for(var i = 0; i < bc; i++){
            var b = bs.get(i);
            var m = b.matrix();
            m.writeData(d, 16 * i);
         }
         p.setParameter('vc_bone_matrix', d);
      }
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.FE3dShadowTechnique = function FE3dShadowTechnique(o){
      o = RClass.inherits(this, o, FE3dTechnique);
      o._code        = 'shadow';
      o._passDepth   = null;
      o._passColor   = null;
      o.setup        = FE3dShadowTechnique_setup;
      o.passDepth    = FE3dShadowTechnique_passDepth;
      o.passColor    = FE3dShadowTechnique_passColor;
      o.updateRegion = FE3dShadowTechnique_updateRegion;
      return o;
   }
   MO.FE3dShadowTechnique_setup = function FE3dShadowTechnique_setup(){
      var o = this;
      o.__base.FE3dTechnique.setup.call(o);
      o.registerMode(EG3dTechniqueMode.Ambient);
      o.registerMode(EG3dTechniqueMode.DiffuseLevel);
      o.registerMode(EG3dTechniqueMode.DiffuseColor);
      o.registerMode(EG3dTechniqueMode.SpecularLevel);
      o.registerMode(EG3dTechniqueMode.SpecularColor);
      o.registerMode(EG3dTechniqueMode.Result);
      var ps = o._passes;
      var pd = o._passDepth = RClass.create(FE3dShadowDepthPass);
      pd.linkGraphicContext(o);
      pd.setup();
      var pc = o._passColor = RClass.create(FE3dShadowColorPass);
      pc.linkGraphicContext(o);
      pc.setup();
      ps.push(pc);
      pc.setTextureDepth(pd.textureDepth());
   }
   MO.FE3dShadowTechnique_passDepth = function FE3dShadowTechnique_passDepth(){
      return this._passDepth;
   }
   MO.FE3dShadowTechnique_passColor = function FE3dShadowTechnique_passColor(){
      return this._passColor;
   }
   MO.FE3dShadowTechnique_updateRegion = function FE3dShadowTechnique_updateRegion(p){
      var o = this;
      o.__base.FE3dTechnique.updateRegion.call(o, p);
      var g = o._graphicContext;
      var gs = g.size();
      var c = p.camera();
      var l = p.directionalLight();
      var lc = l.camera();
   }
}
MO.EE3dInstance = new function EE3dInstance(){
   var o = this;
   o.ModelRenderable    = 'model.renderable';
   o.TemplateRenderable = 'template.renderable';
   o.Scene              = 'scene';
   o.SceneLayer         = 'scene.layer';
   o.SceneDisplay       = 'scene.display';
   o.SceneMaterial      = 'scene.material';
   o.SceneMovie         = 'scene.movie';
   o.SceneRenderable    = 'scene.renderable';
   return o;
}
with(MO){
   MO.FE3dAnimation = function FE3dAnimation(o){
      o = RClass.inherits(this, o, FObject, ME3dObject, MLinkerResource);
      return o;
   }
}
with(MO){
   MO.FE3dCamera = function FE3dCamera(o){
      o = RClass.inherits(this, o, FG3dPerspectiveCamera, MLinkerResource);
      o._rotation       = null;
      o._rotationMatrix = null;
      o._quaternion     = null;
      o._quaternionX    = null;
      o._quaternionY    = null;
      o._quaternionZ    = null;
      o.construct       = FE3dCamera_construct;
      o.rotation        = FE3dCamera_rotation;
      o.doForward       = FE3dCamera_doForward;
      o.doPitch         = FE3dCamera_doPitch;
      o.doYaw           = FE3dCamera_doYaw;
      o.doRoll          = FE3dCamera_doRoll;
      o.loadResource    = FE3dCamera_loadResource;
      o.commitResource  = FE3dCamera_commitResource;
      o.update          = FE3dCamera_update;
      return o;
   }
   MO.FE3dCamera_construct = function FE3dCamera_construct(){
      var o = this;
      o.__base.FG3dPerspectiveCamera.construct.call(o);
      o._rotation = new SVector3();
      o._rotationMatrix = new SMatrix3x3();
      o._quaternion = new SQuaternion();
      o._quaternionX = new SQuaternion();
      o._quaternionY = new SQuaternion();
      o._quaternionZ = new SQuaternion();
   }
   MO.FE3dCamera_rotation = function FE3dCamera_rotation(){
      return this._rotation;
   }
   MO.FE3dCamera_doForward = function FE3dCamera_doForward(value){
      var o = this;
      o._position.x += o._direction.x * value;
      o._position.y += o._direction.y * value;
      o._position.z += o._direction.z * value;
   }
   MO.FE3dCamera_doPitch = function FE3dCamera_doPitch(p){
      this._rotation.x += p;
   }
   MO.FE3dCamera_doYaw = function FE3dCamera_doYaw(p){
      this._rotation.y += p;
   }
   MO.FE3dCamera_doRoll = function FE3dCamera_doRoll(p){
      this._rotation.z += p;
   }
   MO.FE3dCamera_loadResource = function FE3dCamera_loadResource(resource){
      var o = this;
      var resourceProjection = resource.projection();
      o._resource = resource;
      o.position().assign(resource.position());
      o.setDirection(resource.direction().x, resource.direction().y, resource.direction().z);
      o.update();
      var projection = o.projection();
      projection._angle = resourceProjection.angle();
      projection._znear = resourceProjection.znear();
      projection._zfar = resourceProjection.zfar();
      projection.update();
   }
   MO.FE3dCamera_commitResource = function FE3dCamera_commitResource(){
      var o = this;
      var resource = o._resource;
      resource._position.assign(o._position);
      resource._direction.assign(o._direction);
   }
   MO.FE3dCamera_update = function FE3dCamera_update(){
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
}
with(MO){
   MO.FE3dDirectionalLight = function FE3dDirectionalLight(o){
      o = RClass.inherits(this, o, FG3dDirectionalLight, MLinkerResource);
      o._material    = null;
      o.construct    = FE3dDirectionalLight_construct;
      o.material     = FE3dDirectionalLight_material;
      o.loadResource = FE3dDirectionalLight_loadResource;
      o.dispose      = FE3dDirectionalLight_dispose;
      return o;
   }
   MO.FE3dDirectionalLight_construct = function FE3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dDirectionalLight.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dDirectionalLight_material = function FE3dDirectionalLight_material(){
      return this._material;
   }
   MO.FE3dDirectionalLight_loadResource = function FE3dDirectionalLight_loadResource(resource){
      var o = this;
      o.__base.MLinkerResource.loadResource.call(o, resource);
      o._material.loadResource(resource.material());
   }
   MO.FE3dDirectionalLight_dispose = function FE3dDirectionalLight_dispose(){
      var o = this;
      o._material = RObject.dispose(o._material);
      o.__base.FG3dDirectionalLight.dispose.call(o);
   }
}
with(MO){
   MO.FE3dFlatStage = function FE3dFlatStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._layer    = null;
      o.construct = FE3dFlatStage_construct;
      o.layer     = FE3dFlatStage_layer;
      return o;
   }
   MO.FE3dFlatStage_construct = function FE3dFlatStage_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', layer);
   }
   MO.FE3dFlatStage_layer = function FE3dFlatStage_layer(){
      return this._layer;
   }
}
with(MO){
   MO.FE3dInstanceConsole = function FE3dInstanceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd   = EScope.Local;
      o._factory   = null;
      o.construct  = FE3dInstanceConsole_construct;
      o.factory    = FE3dInstanceConsole_factory;
      o.register   = FE3dInstanceConsole_register;
      o.unregister = FE3dInstanceConsole_unregister;
      o.create     = FE3dInstanceConsole_create;
      return o;
   }
   MO.FE3dInstanceConsole_construct = function FE3dInstanceConsole_construct(){
      var o = this;
      var factory = o._factory = RClass.create(FClassFactory);
      factory.register(EE3dInstance.ModelRenderable, FE3dModelRenderable);
      factory.register(EE3dInstance.TemplateRenderable, FE3dTemplateRenderable);
      factory.register(EE3dInstance.Scene, FE3dScene);
      factory.register(EE3dInstance.SceneLayer, FE3dSceneLayer);
      factory.register(EE3dInstance.SceneDisplay, FE3dSceneDisplay);
      factory.register(EE3dInstance.SceneMaterial, FE3dSceneMaterial);
      factory.register(EE3dInstance.SceneMovie, FE3dMovie);
      factory.register(EE3dInstance.SceneRenderable, FE3dSceneDisplayRenderable);
   }
   MO.FE3dInstanceConsole_factory = function FE3dInstanceConsole_factory(){
      return this._factory;
   }
   MO.FE3dInstanceConsole_register = function FE3dInstanceConsole_register(code, clazz){
      this._factory.register(code, clazz);
   }
   MO.FE3dInstanceConsole_unregister = function FE3dInstanceConsole_unregister(code){
      this._factory.unregister(code, clazz);
   }
   MO.FE3dInstanceConsole_create = function FE3dInstanceConsole_create(code){
      return this._factory.create(code);
   }
}
with(MO){
   MO.FE3dMaterial = function FE3dMaterial(o){
      o = RClass.inherits(this, o, FE3rMaterial);
      o._parent    = null;
      o.loadParent = FE3dRenderable_loadParent;
      return o;
   }
   MO.FE3dRenderable_loadParent = function FE3dRenderable_loadParent(material){
      var o = this;
      o._parent = material;
   }
}
with(MO){
   MO.FE3dMesh = function FE3dMesh(o){
      o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
      o._ready         = false;
      o._display       = null;
      o._renderable    = null;
      o._layer         = null;
      o.construct      = FE3dMesh_construct;
      o.testReady      = FE3dMesh_testReady;
      o.loadRenderable = FE3dMesh_loadRenderable;
      o.processLoad    = FE3dMesh_processLoad;
      o.process        = FE3dMesh_process;
      return o;
   }
   MO.FE3dMesh_construct = function FE3dMesh_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var l = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', l);
   }
   MO.FE3dMesh_testReady = function FE3dMesh_testReady(){
      return this._ready;
   }
   MO.FE3dMesh_loadRenderable = function FE3dMesh_loadRenderable(p){
      var o = this;
      var resource = p.resource();
      var technique = o.selectTechnique(o, FE3dGeneralTechnique);
      technique.setResource(resource.technique());
      o.loadResource(resource);
      var m = RClass.create(FE3dMeshRenderable);
      m.setResource(resource._renderable);
      m._material.loadResource(resource._display._material);
      m._renderable = p;
      var vbs = p._vertexBuffers;
      var vbc = vbs.count();
      for(var i = 0; i < vbc; i++){
         var vb = vbs.getAt(i);
         m._vertexBuffers.set(vb._name, vb);
      }
      m._indexBuffer = p._indexBuffer;
      m.matrix().assign(m.resource().matrix());
      var display = o._display = RClass.create(FE3dMeshDisplay);
      display._renderable = m;
      display.load(resource._display);
      display.pushRenderable(m);
      o._layer.pushDisplay(display);
      o._ready = true;
      o.processLoadListener(o);
   }
   MO.FE3dMesh_processLoad = function FE3dMesh_processLoad(){
      var o = this;
      if(!o._renderable.testReady()){
         return false;
      }
      o.loadRenderable(o._renderable);
      return true;
   }
   MO.FE3dMesh_process = function FE3dMesh_process(){
      var o = this;
      o.__base.FE3dSpace.process.call(o);
   }
}
with(MO){
   MO.FE3dMeshConsole = function FE3dMeshConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._loadMeshs  = null;
      o._meshs      = null;
      o._thread     = null;
      o._interval   = 100;
      o.onProcess   = FE3dMeshConsole_onProcess;
      o.construct   = FE3dMeshConsole_construct;
      o.meshs       = FE3dMeshConsole_meshs;
      o.allocByGuid = FE3dMeshConsole_allocByGuid;
      o.allocByCode = FE3dMeshConsole_allocByCode;
      o.free        = FE3dMeshConsole_free;
      return o;
   }
   MO.FE3dMeshConsole_onProcess = function FE3dMeshConsole_onProcess(){
      var o = this;
      var ms = o._loadMeshs;
      ms.record();
      while(ms.next()){
         var m = ms.current();
         if(m.processLoad()){
            ms.removeCurrent();
         }
      }
   }
   MO.FE3dMeshConsole_construct = function FE3dMeshConsole_construct(){
      var o = this;
      o._loadMeshs = new TLooper();
      o._meshs = new TDictionary();
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3dMeshConsole_meshs = function FE3dMeshConsole_meshs(){
      return this._meshs;
   }
   MO.FE3dMeshConsole_allocByGuid = function FE3dMeshConsole_allocByGuid(pc, pn){
      var o = this;
      var ms = o._meshs.get(pn);
      if(ms){
         if(!ms.isEmpty()){
            return ms.pop();
         }
      }
      var rmc = RConsole.find(FE3rMeshConsole);
      var rm = rmc.loadByGuid(pc, pn);
      var m = RClass.create(FE3dMesh);
      m.linkGraphicContext(pc);
      m._name = pn;
      m._renderable = rm;
      o._loadMeshs.push(m);
      return m;
   }
   MO.FE3dMeshConsole_allocByCode = function FE3dMeshConsole_allocByCode(pc, pn){
      var o = this;
      var ms = o._meshs.get(pn);
      if(ms){
         if(!ms.isEmpty()){
            return ms.pop();
         }
      }
      var rmc = RConsole.find(FE3rMeshConsole);
      var rm = rmc.loadByCode(pc, pn);
      var m = RClass.create(FE3dMesh);
      m.linkGraphicContext(pc);
      m._name = pn;
      m._renderable = rm;
      o._loadMeshs.push(m);
      return m;
   }
   MO.FE3dMeshConsole_free = function FE3dMeshConsole_free(p){
      var o = this;
      p._display.remove();
   }
}
with(MO){
   MO.FE3dMeshDisplay = function FE3dMeshDisplay(o){
      o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
      o._material      = null;
      o._renderable    = null;
      o.renderable     = FE3dMeshDisplay_renderable;
      o.load           = FE3dMeshDisplay_load;
      o.reloadResource = FE3dMeshDisplay_reloadResource;
      return o;
   }
   MO.FE3dMeshDisplay_renderable = function FE3dMeshDisplay_renderable(){
      return this._renderable;
   }
   MO.FE3dMeshDisplay_load = function FE3dMeshDisplay_load(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
   }
   MO.FE3dMeshDisplay_reloadResource = function FE3dMeshDisplay_reloadResource(){
      var o = this;
      o._matrix.assign(o._resource.matrix());
   }
}
with(MO){
   MO.FE3dMeshRenderable = function FE3dMeshRenderable(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._renderable      = RClass.register(o, AGetSet('_renderable'));
      o._activeTrack     = null;
      o.vertexCount      = FE3dMeshRenderable_vertexCount;
      o.findVertexBuffer = FE3dMeshRenderable_findVertexBuffer;
      o.vertexBuffers    = FE3dMeshRenderable_vertexBuffers;
      o.indexBuffers     = FE3dMeshRenderable_indexBuffers;
      o.findTexture      = FE3dMeshRenderable_findTexture;
      o.textures         = FE3dMeshRenderable_textures;
      o.reloadResource   = FE3dMeshRenderable_reloadResource;
      o.process          = FE3dMeshRenderable_process;
      o.processDelay     = FE3dMeshRenderable_processDelay;
      o.update           = FE3dMeshRenderable_update;
      o.dispose          = FE3dMeshRenderable_dispose;
      return o;
   }
   MO.FE3dMeshRenderable_vertexCount = function FE3dMeshRenderable_vertexCount(){
      return this._renderable.vertexCount();
   }
   MO.FE3dMeshRenderable_findVertexBuffer = function FE3dMeshRenderable_findVertexBuffer(code){
      var o = this;
      var buffer = o._vertexBuffers.get(code);
      if(buffer){
         return buffer;
      }
      return o._renderable.findVertexBuffer(code);
   }
   MO.FE3dMeshRenderable_vertexBuffers = function FE3dMeshRenderable_vertexBuffers(){
      return this._renderable.vertexBuffers();
   }
   MO.FE3dMeshRenderable_indexBuffers = function FE3dMeshRenderable_indexBuffers(){
      return this._renderable.indexBuffers();
   }
   MO.FE3dMeshRenderable_findTexture = function FE3dMeshRenderable_findTexture(code){
      var o = this;
      var textures = o._textures.get(code);
      if(textures){
         return textures;
      }
      return o._renderable.findTexture(p);
   }
   MO.FE3dMeshRenderable_textures = function FE3dMeshRenderable_textures(){
      var o = this;
      var textures = o._textures;
      if(textures){
         return textures;
      }
      return o._renderable.textures();
   }
   MO.FE3dMeshRenderable_reloadResource = function FE3dMeshRenderable_reloadResource(){
      var o = this;
      o._matrix.assign(o._resource.matrix());
   }
   MO.FE3dMeshRenderable_process = function FE3dMeshRenderable_process(region){
      var o = this;
      o.__base.FE3dRenderable.process.call(o, region);
      var track = o._activeTrack;
      if(track){
         if(o._display._optionPlay){
            var animation = track._animation;
            if(animation){
               animation.process(track);
            }
         }
      }
   }
   MO.FE3dMeshRenderable_processDelay = function FE3dMeshRenderable_processDelay(p){
      var o = this;
      o.__base.FE3dRenderable.processDelay.call(o, p);
   }
   MO.FE3dMeshRenderable_update = function FE3dMeshRenderable_update(region){
      var o = this;
      var display = o._display;
      var matrix = o._matrix;
      var track = o._activeTrack;
      var calculateMatrix = o._calculateMatrix;
      if(track){
         calculateMatrix.assign(track.matrix());
         calculateMatrix.append(matrix);
      }else{
         calculateMatrix.assign(matrix);
      }
      if(display){
         var displayMatrix = o._display.currentMatrix();
         calculateMatrix.append(displayMatrix);
      }
      var changed = o._currentMatrix.attachData(calculateMatrix.data());
      if(changed){
         region.change();
      }
   }
   MO.FE3dMeshRenderable_dispose = function FE3dMeshRenderable_dispose(){
      var o = this;
      o._modelMatrix = RObject.dispose(o._modelMatrix);
      o._vertexBuffers = RObject.dispose(o._vertexBuffers);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3dModel = function FE3dModel(o){
      o = RClass.inherits(this, o, FE3dSpace, MPoolAble, MLinkerResource, MListenerLoad);
      o._dataReady     = false;
      o._renderable    = null;
      o._display       = null;
      o.construct      = FE3dModel_construct;
      o.display        = FE3dModel_display;
      o.testReady      = FE3dModel_testReady;
      o.renderable     = FE3dModel_renderable;
      o.setRenderable  = FE3dModel_setRenderable;
      o.loadRenderable = FE3dModel_loadRenderable;
      o.processLoad    = FE3dModel_processLoad;
      return o;
   }
   MO.FE3dModel_construct = function FE3dModel_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('sprite', layer);
      var display = o._display = RClass.create(FE3dModelDisplay);
      layer.pushDisplay(display);
   }
   MO.FE3dModel_display = function FE3dModel_display(){
      return this._display;
   }
   MO.FE3dModel_testReady = function FE3dModel_testReady(){
      return this._dataReady;
   }
   MO.FE3dModel_renderable = function FE3dModel_renderable(){
      return this._renderable;
   }
   MO.FE3dModel_setRenderable = function FE3dModel_setRenderable(renderable){
      this._renderable = renderable;
   }
   MO.FE3dModel_loadRenderable = function FE3dModel_loadRenderable(renderable){
      var o = this;
      o._renderable = renderable;
      var resource = renderable.resource();
      o.selectTechnique(o, FE3dGeneralTechnique);
      o.loadResource(resource);
      o._display.load(renderable);
      o._dataReady = true;
   }
   MO.FE3dModel_processLoad = function FE3dModel_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      var renderable = o._renderable;
      if(!renderable.testReady()){
         return false;
      }
      o.loadRenderable(renderable);
      o.processLoadListener(o);
      return true;
   }
}
with(MO){
   MO.FE3dModelConsole = function FE3dModelConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._looper     = null;
      o._pools      = null;
      o._thread     = null;
      o._interval   = 100;
      o.onProcess   = FE3dModelConsole_onProcess;
      o.construct   = FE3dModelConsole_construct;
      o.pools       = FE3dModelConsole_pools;
      o.allocByGuid = FE3dModelConsole_allocByGuid;
      o.allocByCode = FE3dModelConsole_allocByCode;
      o.free        = FE3dModelConsole_free;
      return o;
   }
   MO.FE3dModelConsole_onProcess = function FE3dModelConsole_onProcess(){
      var o = this;
      var looper = o._looper;
      looper.record();
      while(looper.next()){
         var item = looper.current();
         if(item.processLoad()){
            looper.removeCurrent();
         }
      }
   }
   MO.FE3dModelConsole_construct = function FE3dModelConsole_construct(){
      var o = this;
      o._looper = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3dModelConsole_pools = function FE3dModelConsole_pools(){
      return this._pools;
   }
   MO.FE3dModelConsole_allocByGuid = function FE3dModelConsole_allocByGuid(context, guid){
      var o = this;
      var model = o._pools.alloc(guid);
      if(model){
         return model;
      }
      var renderable = RConsole.find(FE3rModelConsole).load(context, guid);
      var model = RClass.create(FE3dModel);
      model.linkGraphicContext(context);
      model.setPoolCode(guid);
      model.setRenderable(renderable);
      o._looper.push(model);
      return model;
   }
   MO.FE3dModelConsole_allocByCode = function FE3dModelConsole_allocByCode(context, code){
      var o = this;
      var model = o._pools.alloc(code);
      if(model){
         return model;
      }
      return model;
   }
   MO.FE3dModelConsole_free = function FE3dModelConsole_free(model){
      var o = this;
      var code = model.poolCode();
      o._pools.free(code, model);
   }
}
with(MO){
   MO.FE3dModelDisplay = function FE3dModelDisplay(o){
      o = RClass.inherits(this, o, FE3dDisplay, MLinkerResource);
      o._material      = null;
      o._shapes        = null;
      o.construct      = FE3dModelDisplay_construct;
      o.material       = FE3dModelDisplay_material;
      o.shapes         = FE3dModelDisplay_shapes;
      o.load           = FE3dModelDisplay_load;
      o.reloadResource = FE3dModelDisplay_reloadResource;
      o.dispose        = FE3dModelDisplay_dispose;
      return o;
   }
   MO.FE3dModelDisplay_construct = function FE3dModelDisplay_construct(){
      var o = this;
      o.__base.FE3dDisplay.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dModelDisplay_material = function FE3dModelDisplay_material(){
      return this._material;
   }
   MO.FE3dModelDisplay_shapes = function FE3dModelDisplay_shapes(){
      return this._shapes;
   }
   MO.FE3dModelDisplay_load = function FE3dModelDisplay_load(renderable){
      var o = this;
      var material = o._material;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      var modelResource = renderable.resource();
      var resource = o._resource = modelResource.display();
      o._matrix.assign(resource.matrix());
      material.loadResource(resource.material());
      var geometryRenderables = renderable.geometrys();
      if(geometryRenderables){
         var geometryCount = geometryRenderables.count();
         var shapes = o._shapes = new TObjects();
         for(var i = 0; i < geometryCount; i++){
            var geometryRenderable = geometryRenderables.get(i);
            var shape = instanceConsole.create(EE3dInstance.ModelRenderable);
            shape.setDisplay(o);
            shape.setMaterial(material);
            shape.load(geometryRenderable);
            shapes.push(shape);
            o.pushRenderable(shape);
         }
      }
   }
   MO.FE3dModelDisplay_reloadResource = function FE3dModelDisplay_reloadResource(){
      var o = this;
      var resource = o._resource;
      o._matrix.assign(resource.matrix());
      o._material.loadResource(resource.material());
   }
   MO.FE3dModelDisplay_dispose = function FE3dModelDisplay_dispose(){
      var o = this;
      o._material = RObject.dispose(o._material);
      o.__base.FE3dDisplay.dispose.call(o);
   }
}
with(MO){
   MO.FE3dModelRenderable = function FE3dModelRenderable(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable);
      o._ready            = false;
      o._materialResource = null;
      o.testVisible       = FE3dModelRenderable_testVisible;
      o.load              = FE3dModelRenderable_load;
      return o;
   }
   MO.FE3dModelRenderable_testVisible = function FE3dModelRenderable_testVisible(p){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            o._ready = renderable.testReady();
         }
      }
      return o._ready;
   }
   MO.FE3dModelRenderable_load = function FE3dModelRenderable_load(renderable){
      var o = this;
      var material = o._material;
      var materialResource = o._materialResource = renderable.material();
      if(materialResource){
         material.assignInfo(materialResource.info());
      }
      o._effectCode = material.info().effectCode;
      o._renderable = renderable;
   }
}
with(MO){
   MO.FE3dMovie = function FE3dMovie(o){
      o = RClass.inherits(this, o, FObject, MLinkerResource);
      o._interval      = null;
      o._firstTick     = 0;
      o._lastTick      = 0;
      o._matrix        = null;
      o.construct      = FE3dMovie_construct;
      o.loadResource   = FE3dMovie_loadResource;
      o.reloadResource = FE3dMovie_reloadResource;
      o.process        = FE3dMovie_process;
      return o;
   }
   MO.FE3dMovie_construct = function FE3dMovie_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._matrix = new SMatrix3d();
   }
   MO.FE3dMovie_loadResource = function FE3dMovie_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._interval = resource._interval;
      o._matrix.setRotation(resource._rotation.x, resource._rotation.y * Math.PI / 180, resource._rotation.z);
      o._matrix.update();
   }
   MO.FE3dMovie_reloadResource = function FE3dMovie_reloadResource(){
      var o = this;
      var resource = o._resource;
      o.loadResource(resource);
   }
   MO.FE3dMovie_process = function FE3dMovie_process(matrix){
      var o = this;
      if(o._firstTick == 0){
         o._firstTick = RTimer.current();
      }
      if(o._lastTick == 0){
         o._lastTick = RTimer.current();
      }
      var tick = RTimer.current();
      var span = tick - o._lastTick;
      if(span > o._interval){
         var resource = o._resource;
         var speed = span / 1000;
         var code = o._resource.code();
         if(code == 'rotation'){
            matrix.ry += resource._rotation.y * speed;
            matrix.updateForce();
         }
         o._lastTick = tick;
      }
   }
}
with(MO){
   MO.FE3dRegion = function FE3dRegion(o){
      o = RClass.inherits(this, o, FRegion, MGraphicObject, MG3dRegion, MLinkerResource);
      o._backgroundColor = null;
      o.construct       = FE3dRegion_construct;
      o.backgroundColor = FE3dRegion_backgroundColor;
      o.loadResource    = FE3dRegion_loadResource;
      o.reloadResource  = FE3dRegion_reloadResource;
      o.prepare         = FE3dRegion_prepare;
      o.dispose         = FE3dRegion_dispose;
      return o;
   }
   MO.FE3dRegion_construct = function FE3dRegion_construct(){
      var o = this;
      o.__base.FRegion.construct.call(o);
      o.__base.MG3dRegion.construct.call(o);
      var camera = o._camera = RClass.create(FE3dCamera);
      camera.position().set(0, 0, -100);
      camera.lookAt(0, 0, 0);
      camera.update();
      camera.projection().update();
      var light = o._directionalLight = RClass.create(FE3dDirectionalLight);
      light.direction().set(0, -1, 0);
      var lightCamera = light.camera();
      lightCamera.position().set(10, 10, -10);
      lightCamera.lookAt(0, 0, 0);
      var backgroundColor = o._backgroundColor = new SColor4();
      backgroundColor.set(0, 0, 0, 1);
      o._calculateCameraMatrix = new SMatrix3d();
   }
   MO.FE3dRegion_backgroundColor = function FE3dRegion_backgroundColor(){
      return this._backgroundColor;
   }
   MO.FE3dRegion_loadResource = function FE3dRegion_loadResource(p){
      var o = this;
      o._resource = p;
      o._camera.loadResource(p.camera());
      o._directionalLight.loadResource(p.light());
      o.reloadResource();
   }
   MO.FE3dRegion_reloadResource = function FE3dRegion_reloadResource(){
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
   MO.FE3dRegion_prepare = function FE3dRegion_prepare(){
      var o = this;
      o.__base.MG3dRegion.prepare.call(o);
      var r = o._calculateCameraMatrix.attach(o._camera.matrix());
      if(r){
         o._changed = true;
      }
   }
   MO.FE3dRegion_dispose = function FE3dRegion_dispose(){
      var o = this;
      o.__base.FRegion.dispose.call(o);
      o.__base.MG3dRegion.dispose.call(o);
   }
}
with(MO){
   MO.FE3dScene = function FE3dScene(o){
      o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
      o._ready                = false;
      o._dataReady            = false;
      o._resource             = null;
      o._dirty                = false;
      o.onProcess             = FE3dScene_onProcess;
      o.construct             = FE3dScene_construct;
      o.createRegion          = FE3dScene_createRegion;
      o.resource              = FE3dScene_resource;
      o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
      o.loadRegionResource    = FE3dScene_loadRegionResource;
      o.loadDisplayResource   = FE3dScene_loadDisplayResource;
      o.loadLayerResource     = FE3dScene_loadLayerResource;
      o.loadResource          = FE3dScene_loadResource;
      o.testReady             = FE3dScene_testReady;
      o.dirty                 = FE3dScene_dirty;
      o.processLoad           = FE3dScene_processLoad;
      o.active                = FE3dScene_active;
      o.deactive              = FE3dScene_deactive;
      return o;
   }
   MO.FE3dScene_onProcess = function FE3dScene_onProcess(){
      var o = this;
      o.__base.FE3dSpace.onProcess.call(o);
      if(o._dirty){
         var s = o._region.allRenderables();
         for(var i = s.count() - 1; i >= 0; i--){
            var r = s.getAt(i);
            r.resetInfos();
         }
         o._dirty = false;
      }
   }
   MO.FE3dScene_construct = function FE3dScene_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
   }
   MO.FE3dScene_createRegion = function FE3dScene_createRegion(){
      return RClass.create(FE3dSceneRegion);
   }
   MO.FE3dScene_resource = function FE3dScene_resource(p){
      return this._resource;
   }
   MO.FE3dScene_loadTechniqueResource = function FE3dScene_loadTechniqueResource(p){
      var o = this;
      o._technique._resource = p;
   }
   MO.FE3dScene_loadRegionResource = function FE3dScene_loadRegionResource(p){
      var o = this;
      o._region.loadResource(p);
      var rc = p.camera();
      var rcv = rc.projection();
      var c = o.camera();
      c._resource = rc;
      var cp = c.projection();
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
      var l = o.directionalLight();
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
   MO.FE3dScene_loadDisplayResource = function FE3dScene_loadDisplayResource(layer, resource){
      var o = this;
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(o);
      display.loadResource(resource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      layer.pushDisplay(display);
   }
   MO.FE3dScene_loadLayerResource = function FE3dScene_loadLayerResource(resource){
      var o = this;
      var layer = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneLayer);
      layer.loadResource(resource);
      var displays = resource.displays();
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            o.loadDisplayResource(layer, display);
         }
      }
      o.registerLayer(resource.code(), layer)
   }
   MO.FE3dScene_loadResource = function FE3dScene_loadResource(p){
      var o = this;
      o.selectTechnique(o, FE3dGeneralTechnique);
      o.loadTechniqueResource(p.technique());
      o.loadRegionResource(p.region());
      var layers = p.layers();
      if(layers){
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            o.loadLayerResource(layer);
         }
      }
   }
   MO.FE3dScene_testReady = function FE3dScene_testReady(){
      return this._ready;
   }
   MO.FE3dScene_dirty = function FE3dScene_dirty(){
      this._dirty = true;
   }
   MO.FE3dScene_processLoad = function FE3dScene_processLoad(){
      var o = this;
      if(o._dataReady){
         return true;
      }
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._ready = true;
      o.processLoadListener(o);
      return true;
   }
   MO.FE3dScene_active = function FE3dScene_active(){
      var o = this;
      o.__base.FE3dSpace.active.call(o);
   }
   MO.FE3dScene_deactive = function FE3dScene_deactive(){
      var o = this;
      o.__base.FE3dSpace.deactive.call(o);
   }
}
with(MO){
   MO.FE3dSceneAnimation = function FE3dSceneAnimation(o){
      o = RClass.inherits(this, o, FE3dAnimation);
      o._animation        = null;
      o._activeClip       = null;
      o._clips            = null;
      o.clips             = FE3dSceneAnimation_clips;
      o.pushClip          = FE3dSceneAnimation_pushClip;
      o.record            = RMethod.empty;
      o.process           = RMethod.empty;
      o.selectClip        = FE3dSceneAnimation_selectClip;
      o.loadAnimation     = FE3dSceneAnimation_loadAnimation;
      o.loadSceneResource = FE3dSceneAnimation_loadSceneResource;
      o.reloadResource    = FE3dSceneAnimation_reloadResource;
      return o;
   }
   MO.FE3dSceneAnimation_clips = function FE3dSceneAnimation_clips(){
      return this._clips;
   }
   MO.FE3dSceneAnimation_pushClip = function FE3dSceneAnimation_pushClip(clip){
      var o = this;
      var clips = o._clips;
      if(!clips){
         clips = o._clips = new TDictionary();
      }
      clips.set(clip.code(), clip);
   }
   MO.FE3dSceneAnimation_selectClip = function FE3dSceneAnimation_selectClip(code){
      var o = this;
      var clip = o._clips.get(code);
      if(o._activeClip == clip){
         return;
      }
      var info = o._animation._playInfo;
      info.beginIndex = clip.beginIndex();
      info.endIndex = clip.endIndex();
      info.frameCount = info.endIndex - info.beginIndex + 1;
      o._animation._playRate = clip.playRate();
      o._activeClip = clip;
   }
   MO.FE3dSceneAnimation_loadAnimation = function FE3dSceneAnimation_loadAnimation(animation){
      var o = this;
      o._animation = animation;
   }
   MO.FE3dSceneAnimation_loadSceneResource = function FE3dSceneAnimation_loadSceneResource(resource){
      var o = this;
      o._resource = resource;
   }
   MO.FE3dSceneAnimation_reloadResource = function FE3dSceneAnimation_reloadResource(){
      var o = this;
      var resource = o._resource;
      var animation = o._animation;
      animation._playRate = resource._playRate;
   }
}
with(MO){
   MO.FE3dSceneAnimationClip = function FE3dSceneAnimationClip(o){
      o = RClass.inherits(this, o, FObject, MAttributeCode);
      o._animation  = null;
      o._beginIndex = 0;
      o._endIndex   = 0;
      o._playRate   = 1;
      o.beginIndex  = FE3dSceneAnimationClip_beginIndex;
      o.endIndex    = FE3dSceneAnimationClip_endIndex;
      o.setRange    = FE3dSceneAnimationClip_setRange;
      o.playRate    = FE3dSceneAnimationClip_playRate;
      o.setPlayRate = FE3dSceneAnimationClip_setPlayRate;
      return o;
   }
   MO.FE3dSceneAnimationClip_beginIndex = function FE3dSceneAnimationClip_beginIndex(){
      return this._beginIndex;
   }
   MO.FE3dSceneAnimationClip_endIndex = function FE3dSceneAnimationClip_endIndex(){
      return this._endIndex;
   }
   MO.FE3dSceneAnimationClip_setRange = function FE3dSceneAnimationClip_setRange(beginIndex, endIndex){
      var o = this;
      o._beginIndex = beginIndex;
      o._endIndex = endIndex;
   }
   MO.FE3dSceneAnimationClip_playRate = function FE3dSceneAnimationClip_playRate(){
      return this._playRate;
   }
   MO.FE3dSceneAnimationClip_setPlayRate = function FE3dSceneAnimationClip_setPlayRate(rate){
      this._playRate = rate;
   }
}
with(MO){
   MO.FE3dSceneCanvas = function FE3dSceneCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeSpace           = null;
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
      o._cameraMoveRate        = 0.4;
      o._cameraKeyRotation     = 0.03;
      o._cameraMouseRotation   = 0.005;
      o._touchTracker          = null;
      o.onEnterFrame           = FE3dSceneCanvas_onEnterFrame;
      o.onMouseCaptureStart    = FE3dSceneCanvas_onMouseCaptureStart;
      o.onMouseCapture         = FE3dSceneCanvas_onMouseCapture;
      o.onMouseCaptureStop     = FE3dSceneCanvas_onMouseCaptureStop;
      o.onTouchStart           = FE3dSceneCanvas_onTouchStart;
      o.onTouchMove            = FE3dSceneCanvas_onTouchMove;
      o.onTouchStop            = FE3dSceneCanvas_onTouchStop;
      o.onTouchZoom            = FE3dSceneCanvas_onTouchZoom;
      o.onDataLoaded           = FE3dSceneCanvas_onDataLoaded;
      o.onResize               = FE3dSceneCanvas_onResize;
      o.construct              = FE3dSceneCanvas_construct;
      o.testPlay               = FE3dSceneCanvas_testPlay;
      o.switchPlay             = FE3dSceneCanvas_switchPlay;
      o.testMovie              = FE3dSceneCanvas_testMovie;
      o.switchMovie            = FE3dSceneCanvas_switchMovie;
      o.doAction               = FE3dSceneCanvas_doAction;
      o.loadByGuid             = FE3dSceneCanvas_loadByGuid;
      o.loadByCode             = FE3dSceneCanvas_loadByCode;
      o.dispose                = FE3dSceneCanvas_dispose;
      return o;
   }
   MO.FE3dSceneCanvas_onEnterFrame = function FE3dSceneCanvas_onEnterFrame(){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var timer = space.timer();
      var span = timer.spanSecond();
      var camera = space.camera();
      var distance = o._cameraMoveRate * span;
      var rotation = o._cameraKeyRotation * span;
      var keyForward = RKeyboard.isPress(EStageKey.Forward);
      var keyBack = RKeyboard.isPress(EStageKey.Back);
      if((keyForward && !keyBack) || o._actionForward){
         camera.doWalk(distance);
      }
      if((!keyForward && keyBack) || o._actionBack){
         camera.doWalk(-distance);
      }
      var keyUp = RKeyboard.isPress(EStageKey.Up);
      var keyDown = RKeyboard.isPress(EStageKey.Down);
      if((keyUp && !keyDown) || o._actionUp){
         camera.doFly(distance);
      }
      if((!keyUp && keyDown) || o._actionDown){
         camera.doFly(-distance);
      }
      var keyLeft = RKeyboard.isPress(EStageKey.RotationLeft);
      var keyRight = RKeyboard.isPress(EStageKey.RotationRight);
      if(keyLeft && !keyRight){
         camera.doYaw(rotation);
      }
      if(!keyLeft && keyRight){
         camera.doYaw(-rotation);
      }
      var keyRotationUp = RKeyboard.isPress(EStageKey.RotationUp);
      var keyRotationDown = RKeyboard.isPress(EStageKey.RotationDown);
      if(keyRotationUp && !keyRotationDown){
         camera.doPitch(rotation);
      }
      if(!keyRotationUp && keyRotationDown){
         camera.doPitch(-rotation);
      }
      camera.update();
      if(o._optionRotation){
         var rotation = o._rotation;
         var layers = space.layers();
         var count = layers.count();
         for(var i = 0; i < count; i++){
            var layer = layers.at(i);
            var matrix = layer.matrix();
            matrix.setRotation(0, rotation.y, 0);
            matrix.update();
         }
         rotation.y += 0.01;
      }
   }
   MO.FE3dSceneCanvas_onMouseCaptureStart = function FE3dSceneCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureCameraRotation.assign(s.camera()._rotation);
   }
   MO.FE3dSceneCanvas_onMouseCapture = function FE3dSceneCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeSpace.camera();
      var r = c.rotation();
      var cr = o._captureCameraRotation;
      r.x = cr.x + cy * o._cameraMouseRotation;
      r.y = cr.y + cx * o._cameraMouseRotation;
   }
   MO.FE3dSceneCanvas_onMouseCaptureStop = function FE3dSceneCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dSceneCanvas_onTouchStart = function FE3dSceneCanvas_onTouchStart(event){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var ts = event.touches;
      var c = ts.length;
      if(c == 1){
         event.preventDefault();
         var t = ts[0];
         o._captureStatus = true;
         o._capturePosition.set(t.clientX, t.clientY);
         o._captureCameraPosition.assign(s.camera().position());
         o._captureCameraRotation.assign(s.camera().rotation());
      }else{
         o._touchTracker.eventStart(event);
      }
   }
   MO.FE3dSceneCanvas_onTouchMove = function FE3dSceneCanvas_onTouchMove(event){
      var o = this;
      if(!o._captureStatus){
         return;
      }
      var touchs = event.touches;
      var touchCount = touchs.length;
      if(touchCount == 1){
         event.preventDefault();
         var t = touchs[0];
         var cm = o._activeSpace.camera();
         var cr = cm.rotation();
         var cx = t.clientX - o._capturePosition.x;
         var cy = t.clientY - o._capturePosition.y;
         cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
         cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
      }else if(touchCount > 1){
         o._touchTracker.eventMove(event);
      }
   }
   MO.FE3dSceneCanvas_onTouchStop = function FE3dSceneCanvas_onTouchStop(event){
      var o = this;
      o._touchTracker.eventStop(event);
      o._captureStatus = false;
   }
   MO.FE3dSceneCanvas_onTouchZoom = function FE3dSceneCanvas_onTouchZoom(event){
      var o = this;
      var delta = event.delta;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var camera = space.camera();
      camera.doForward(delta * 0.006);
   }
   MO.FE3dSceneCanvas_onDataLoaded = function FE3dSceneCanvas_onDataLoaded(event){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeSpace;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      var gr = s._region._resource;
      o._cameraMoveRate = gr.moveSpeed();
      o._cameraKeyRotation = gr.rotationKeySpeed();
      o._cameraMouseRotation = gr.rotationMouseSpeed();
      var event = new SEvent(o);
      event.space = s;
      o.processLoadListener(event);
      event.dispose();
   }
   MO.FE3dSceneCanvas_onResize = function FE3dSceneCanvas_onResize(event){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dSceneCanvas_construct = function FE3dSceneCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureCameraPosition = new SPoint3();
      o._captureCameraRotation = new SVector3();
      o._touchTracker = RClass.create(FTouchTracker);
      o._touchTracker.addTouchZoomListener(o, o.onTouchZoom);
   }
   MO.FE3dSceneCanvas_testPlay = function FE3dSceneCanvas_testPlay(){
      return this._actionPlay;
   }
   MO.FE3dSceneCanvas_switchPlay = function FE3dSceneCanvas_switchPlay(flag){
      var o = this;
      var space = o._activeSpace;
      var displays = space.allDisplays();
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(RClass.isClass(display, FE3dSceneDisplay)){
            var sprite = display._sprite;
            if(sprite){
               sprite._optionPlay = flag;
            }
            display._optionPlay = flag;
         }
      }
      o._actionPlay = flag;
   }
   MO.FE3dSceneCanvas_testMovie = function FE3dSceneCanvas_testMovie(){
      return this._actionMovie;
   }
   MO.FE3dSceneCanvas_switchMovie = function FE3dSceneCanvas_switchMovie(p){
      var o = this;
      var s = o._activeSpace;
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
   MO.FE3dSceneCanvas_doAction = function FE3dSceneCanvas_doAction(e, p, f){
      var o = this;
      var s = o._activeSpace;
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
   MO.FE3dSceneCanvas_loadByGuid = function FE3dSceneCanvas_loadByGuid(guid){
      var o = this;
      var sceneConsole = RConsole.find(FE3dSceneConsole);
      if(o._activeSpace){
         sceneConsole.free(o._activeSpace);
      }
      var scene = o._activeSpace = sceneConsole.allocByGuid(o._graphicContext, guid);
      scene.addLoadListener(o, o.onDataLoaded);
      RStage.register('canvas.space', scene);
   }
   MO.FE3dSceneCanvas_loadByCode = function FE3dSceneCanvas_loadByCode(code){
      var o = this;
      var sceneConsole = RConsole.find(FE3dSceneConsole);
      if(o._activeSpace){
         sceneConsole.free(o._activeSpace);
      }
      var scene = o._activeSpace = sceneConsole.allocByCode(o._graphicContext, code);
      scene.addLoadListener(o, o.onDataLoaded);
      RStage.register('canvas.space', scene);
   }
   MO.FE3dSceneCanvas_dispose = function FE3dSceneCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSceneConsole = function FE3dSceneConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd      = EScope.Local;
      o._loadDisplays = null;
      o._loadScenes   = null;
      o._pools        = null;
      o._thread       = null;
      o._interval     = 100;
      o.onProcess     = FE3dSceneConsole_onProcess;
      o.construct     = FE3dSceneConsole_construct;
      o.scenes        = FE3dSceneConsole_scenes;
      o.loadDisplay   = FE3dSceneConsole_loadDisplay;
      o.allocByGuid   = FE3dSceneConsole_allocByGuid;
      o.allocByCode   = FE3dSceneConsole_allocByCode;
      o.free          = FE3dSceneConsole_free;
      return o;
   }
   MO.FE3dSceneConsole_onProcess = function FE3dSceneConsole_onProcess(){
      var o = this;
      var displays = o._loadDisplays;
      displays.record();
      while(displays.next()){
         var display = displays.current();
         if(display.processLoad()){
            displays.removeCurrent();
         }
      }
      var scenes = o._loadScenes;
      scenes.record();
      while(scenes.next()){
         var scene = scenes.current();
         if(scene.processLoad()){
            scenes.removeCurrent();
         }
      }
   }
   MO.FE3dSceneConsole_construct = function FE3dSceneConsole_construct(){
      var o = this;
      o._loadDisplays = new TLooper();
      o._loadScenes = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FE3dSceneConsole_scenes = function FE3dSceneConsole_scenes(){
      return this._scenes;
   }
   MO.FE3dSceneConsole_loadDisplay = function FE3dSceneConsole_loadDisplay(display){
      this._loadDisplays.push(display);
   }
   MO.FE3dSceneConsole_allocByGuid = function FE3dSceneConsole_allocByGuid(context, guid){
      var o = this;
      var scene = o._pools.alloc(guid);
      if(scene){
         return scene;
      }
      var resource = RConsole.find(FE3sSceneConsole).loadByGuid(guid);
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = guid;
      scene.setup();
      o._loadScenes.push(scene);
      return scene;
   }
   MO.FE3dSceneConsole_allocByCode = function FE3dSceneConsole_allocByCode(context, code){
      var o = this;
      var scene = o._pools.alloc(code);
      if(scene){
         return scene;
      }
      var resource = RConsole.find(FE3sSceneConsole).loadByCode(code);
      scene = RClass.create(FE3dScene);
      scene.linkGraphicContext(context);
      scene.setResource(resource);
      scene._poolCode = code;
      scene.setup();
      o._loadScenes.push(scene);
      return scene;
   }
   MO.FE3dSceneConsole_free = function FE3dSceneConsole_free(scene){
      var o = this;
      var code = scene._poolCode;
      o._pools.free(code, scene);
   }
}
with(MO){
   MO.FE3dSceneDisplay = function FE3dSceneDisplay(o){
      o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
      o._dataReady        = false;
      o._optionPlay       = false;
      o._optionMovie      = false;
      o._movieMatrix      = null;
      o._resource         = null;
      o._materials        = null;
      o._parentMaterials  = null;
      o._template         = null;
      o._sprite           = null;
      o.construct         = FE3dSceneDisplay_construct;
      o.calculateOutline  = FE3dSceneDisplay_calculateOutline;
      o.meshRenderables   = FE3dSceneDisplay_meshRenderables;
      o.loadResource      = FE3dSceneDisplay_loadResource;
      o.loadTemplate      = FE3dSceneDisplay_loadTemplate;
      o.processLoad       = FE3dSceneDisplay_processLoad;
      o.clone             = FE3dSceneDisplay_clone;
      return o;
   }
   MO.FE3dSceneDisplay_construct = function FE3dSceneDisplay_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._movieMatrix = new SMatrix3d();
   }
   MO.FE3dSceneDisplay_calculateOutline = function FE3dSceneDisplay_calculateOutline(){
      return this._sprite.calculateOutline();
   }
   MO.FE3dSceneDisplay_meshRenderables = function FE3dSceneDisplay_meshRenderables(){
      var o = this;
      var sprite = o._template.sprite();
      return sprite.meshRenderables();
   }
   MO.FE3dSceneDisplay_loadResource = function FE3dSceneDisplay_loadResource(resource){
      var o = this;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      o._resource = resource;
      o._code = resource.code();
      o._matrix.assign(resource.matrix());
      var movieResources = resource.movies();
      if(movieResources){
         var movieCount = movieResources.count();
         for(var i = 0; i < movieCount; i++){
            var movieResource = movieResources.at(i);
            var movie = instanceConsole.create(EE3dInstance.SceneMovie);
            movie.loadResource(movieResource);
            o.pushMovie(movie);
         }
      }
      var materialResources = resource.materials();
      if(materialResources){
         var materialCount = materialResources.count();
         var materials = o._materials = new TDictionary();
         var parentMaterials = o._parentMaterials = new TDictionary();
         for(var i = 0; i < materialCount; i++){
            var materialResource = materialResources.at(i);
            var material = instanceConsole.create(EE3dInstance.SceneMaterial);
            material._display = o;
            material.loadSceneResource(materialResource);
            materials.set(materialResource.guid(), material);
            parentMaterials.set(materialResource.parentGuid(), material);
         }
      }
      var templateGuid = resource.templateGuid();
      o._template = RConsole.find(FE3dTemplateConsole).allocByGuid(o, templateGuid);
   }
   MO.FE3dSceneDisplay_loadTemplate = function FE3dSceneDisplay_loadTemplate(template){
      var o = this;
      var resource = o._resource;
      var sprites = template._sprites;
      if(sprites){
         var optionPlay = o._optionPlay;
         var count = sprites.count();
         for(var i = 0; i < count; i++){
            var sprite = sprites.at(i);
            sprite._optionPlay = optionPlay;
            sprite.matrix().identity();
         }
      }
      var materials = o._materials;
      var parentMaterials = o._parentMaterials;
      var sprite = o._sprite = template.sprite();
      var renderables = sprite.renderables();
      var count = renderables.count();
      for(var n = 0; n < count; n++){
         var renderable = renderables.at(n);
         var material = renderable.material();
         var materialGuid = material.guid();
         if(parentMaterials){
            var displayMaterial = parentMaterials.get(materialGuid);
            if(displayMaterial){
               displayMaterial.loadParent(material);
               displayMaterial.reloadResource();
               renderable.setMaterial(displayMaterial);
            }
         }
      }
      o.pushDisplay(sprite);
      var animations = sprite.animations();
      if(animations){
         var animationCount = animations.count();
         for(var n = 0; n < animationCount; n++){
            var animation = animations.at(n);
            var animationResource = animation.resource();
            var animationGuid = animationResource.guid();
            var sceneAnimationResource = resource.findAnimation(animationGuid);
            if(!sceneAnimationResource){
               sceneAnimationResource = resource.syncAnimation(animationGuid);
               sceneAnimationResource._guid = animationResource._guid;
               sceneAnimationResource._code = animationResource._code;
               sceneAnimationResource._label = animationResource._label;
            }
            var sceneAnimation = RClass.create(FE3dSceneAnimation);
            sceneAnimation.loadAnimation(animation);
            sceneAnimation.loadSceneResource(sceneAnimationResource);
            sceneAnimation.reloadResource();
            o.pushAnimation(sceneAnimation);
         }
      }
   }
   MO.FE3dSceneDisplay_processLoad = function FE3dSceneDisplay_processLoad(){
      var o = this;
      if(o._ready){
         return true;
      }
      var template = o._template;
      if(!template.testReady()){
         return false;
      }
      o.loadTemplate(template);
      o._ready = true;
      o.processLoadListener(o);
      return true;
   }
   MO.FE3dSceneDisplay_clone = function FE3dSceneDisplay_clone(){
   }
}
with(MO){
   MO.FE3dSceneDisplayRenderable = function FE3dSceneDisplayRenderable(o){
      o = RClass.inherits(this, o, FE3dTemplateRenderable);
      o.loadMaterial       = FE3dSceneDisplayRenderable_loadMaterial;
      o.reloadResource     = FE3dSceneDisplayRenderable_reloadResource;
      return o;
   }
   MO.FE3dSceneDisplayRenderable_loadMaterial = function FE3dSceneDisplayRenderable_loadMaterial(material){
      var o = this;
      o._materialReference = material;
      o._material.calculate(material);
   }
   MO.FE3dSceneDisplayRenderable_reloadResource = function FE3dSceneDisplayRenderable_reloadResource(){
      var o = this;
      var material = o._material;
      material.calculate(o._materialReference);
      material.update();
   }
}
with(MO){
   MO.FE3dSceneLayer = function FE3dSceneLayer(o){
      o = RClass.inherits(this, o, FDisplayLayer, MLinkerResource);
      o.makeLabel    = FE3dSceneLayer_makeLabel;
      o.loadResource = FE3dSceneLayer_loadResource;
      o.process      = FE3dSceneLayer_process;
      return o;
   }
   MO.FE3dSceneLayer_makeLabel = function FE3dSceneLayer_makeLabel(){
      var o = this;
      var resource = o.resource();
      var code = resource.code();
      var label = resource.label();
      if(label){
         return code + '[' + label + ']';
      }
      return code;
   }
   MO.FE3dSceneLayer_loadResource = function FE3dSceneLayer_loadResource(p){
      var o = this;
      o._resource = p;
   }
   MO.FE3dSceneLayer_process = function FE3dSceneLayer_process(p){
      var o = this;
      o.__base.FDisplayLayer.process.call(o, p)
      var c = o._resource.transformCd();
      if(c){
         if(c == EDisplayTransform.CameraPosition){
            var cp = p.camera().position();
            o._matrix.setTranslate(cp.x, cp.y, cp.z);
            o._matrix.update();
         }
      }
   }
}
with(MO){
   MO.FE3dSceneMaterial = function FE3dSceneMaterial(o){
      o = RClass.inherits(this, o, FE3dMaterial);
      o._display          = null;
      o._parentMaterial   = null;
      o.loadSceneResource = FE3dSceneMaterial_loadSceneResource;
      o.reloadResource    = FE3dSceneMaterial_reloadResource;
      return o;
   }
   MO.FE3dSceneMaterial_loadSceneResource = function FE3dSceneMaterial_loadSceneResource(resource){
      var o = this;
      o._resource = resource;
      o.reloadResource();
   }
   MO.FE3dSceneMaterial_reloadResource = function FE3dSceneMaterial_reloadResource(){
      var o = this;
      o.calculate(o._resource);
      o.update();
   }
}
with(MO){
   MO.FE3dSceneRegion = function FE3dSceneRegion(o){
      o = RClass.inherits(this, o, FE3dRegion);
      o._resource      = null;
      o.construct      = FE3dSceneRegion_construct;
      o.resource       = FE3dSceneRegion_resource;
      o.loadResource   = FE3dSceneRegion_loadResource;
      o.reloadResource = FE3dSceneRegion_reloadResource;
      o.dispose        = FE3dSceneRegion_dispose;
      return o;
   }
   MO.FE3dSceneRegion_construct = function FE3dSceneRegion_construct(){
      var o = this;
      o.__base.FE3dRegion.construct.call(o);
   }
   MO.FE3dSceneRegion_resource = function FE3dSceneRegion_resource(){
      return this._resource;
   }
   MO.FE3dSceneRegion_loadResource = function FE3dSceneRegion_loadResource(p){
      var o = this;
      o._resource = p;
      o.reloadResource();
   }
   MO.FE3dSceneRegion_reloadResource = function FE3dSceneRegion_reloadResource(){
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
   MO.FE3dSceneRegion_dispose = function FE3dSceneRegion_dispose(){
      var o = this;
      o._resource = null;
      o.__base.FE3dRegion.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSimpleCanvas = function FE3dSimpleCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeSpace           = null;
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
      o._cameraMoveRate        = 0.4;
      o._cameraKeyRotation     = 0.03;
      o._cameraMouseRotation   = 0.005;
      o._stage                 = RClass.register(o, new AGetter('_stage'));
      o.onEnterFrame           = FE3dSimpleCanvas_onEnterFrame;
      o.onMouseCaptureStart    = FE3dSimpleCanvas_onMouseCaptureStart;
      o.onMouseCapture         = FE3dSimpleCanvas_onMouseCapture;
      o.onMouseCaptureStop     = FE3dSimpleCanvas_onMouseCaptureStop;
      o.onTouchStart           = FE3dSimpleCanvas_onTouchStart;
      o.onTouchMove            = FE3dSimpleCanvas_onTouchMove;
      o.onTouchStop            = FE3dSimpleCanvas_onTouchStop;
      o.onSceneLoad            = FE3dSimpleCanvas_onSceneLoad;
      o.onResize               = FE3dSimpleCanvas_onResize;
      o.construct              = FE3dSimpleCanvas_construct;
      o.build                  = FE3dSimpleCanvas_build;
      o.setPanel               = FE3dSimpleCanvas_setPanel;
      o.switchPlay             = FE3dSimpleCanvas_switchPlay;
      o.switchMovie            = FE3dSimpleCanvas_switchMovie;
      o.doAction               = FE3dSimpleCanvas_doAction;
      o.dispose                = FE3dSimpleCanvas_dispose;
      return o;
   }
   MO.FE3dSimpleCanvas_onEnterFrame = function FE3dSimpleCanvas_onEnterFrame(){
      var o = this;
      var s = o._activeSpace;
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
   MO.FE3dSimpleCanvas_onMouseCaptureStart = function FE3dSimpleCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureCameraRotation.assign(s.camera()._rotation);
   }
   MO.FE3dSimpleCanvas_onMouseCapture = function FE3dSimpleCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeSpace.camera();
      var r = c.rotation();
      var cr = o._captureCameraRotation;
      r.x = cr.x + cy * o._cameraMouseRotation;
      r.y = cr.y + cx * o._cameraMouseRotation;
   }
   MO.FE3dSimpleCanvas_onMouseCaptureStop = function FE3dSimpleCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dSimpleCanvas_onTouchStart = function FE3dSimpleCanvas_onTouchStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
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
   MO.FE3dSimpleCanvas_onTouchMove = function FE3dSimpleCanvas_onTouchMove(p){
      var o = this;
      if(!o._captureStatus){
         return;
      }
      var ts = p.touches;
      var c = ts.length;
      if(c == 1){
         p.preventDefault();
         var t = ts[0];
         var cm = o._activeSpace.camera();
         var cr = cm.rotation();
         var cx = t.clientX - o._capturePosition.x;
         var cy = t.clientY - o._capturePosition.y;
         cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
         cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
      }
   }
   MO.FE3dSimpleCanvas_onTouchStop = function FE3dSimpleCanvas_onTouchStop(p){
      var o = this;
      o._captureStatus = false;
   }
   MO.FE3dSimpleCanvas_onSceneLoad = function FE3dSimpleCanvas_onSceneLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeSpace;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      var gr = s._region._resource;
      o._cameraMoveRate = gr.moveSpeed();
      o._cameraKeyRotation = gr.rotationKeySpeed();
      o._cameraMouseRotation = gr.rotationMouseSpeed();
      o.processLoadListener(o, s);
   }
   MO.FE3dSimpleCanvas_onResize = function FE3dSimpleCanvas_onResize(p){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, p);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dSimpleCanvas_construct = function FE3dSimpleCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureCameraPosition = new SPoint3();
      o._captureCameraRotation = new SVector3();
   }
   MO.FE3dSimpleCanvas_build = function FE3dSimpleCanvas_build(hPanel){
      var o = this;
      o.__base.FE3dCanvas.build.call(o, hPanel);
      var stage = o._stage = o._activeSpace = MO.RClass.create(MO.FE3dSimpleStage);
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      RStage.register('simple.stage', stage);
   }
   MO.FE3dSimpleCanvas_setPanel = function FE3dSimpleCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FE3dCanvas.setPanel.call(o, hPanel);
      var stage = o._stage;
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   MO.FE3dSimpleCanvas_switchPlay = function FE3dSimpleCanvas_switchPlay(p){
      var o = this;
      var s = o._activeSpace;
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
   MO.FE3dSimpleCanvas_switchMovie = function FE3dSimpleCanvas_switchMovie(p){
      var o = this;
      var s = o._activeSpace;
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
   MO.FE3dSimpleCanvas_doAction = function FE3dSimpleCanvas_doAction(e, p, f){
      var o = this;
      var s = o._activeSpace;
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
   MO.FE3dSimpleCanvas_dispose = function FE3dSimpleCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
MO.FE3dSimpleStage = function FE3dSimpleStage(o){
   o = MO.RClass.inherits(this, o, MO.FE3dStage);
   o._optionKeyboard = true;
   o._skyLayer       = MO.RClass.register(o, new MO.AGetter('_skyLayer'));
   o._mapLayer       = MO.RClass.register(o, new MO.AGetter('_mapLayer'));
   o._spriteLayer    = MO.RClass.register(o, new MO.AGetter('_spriteLayer'));
   o._faceLayer      = MO.RClass.register(o, new MO.AGetter('_faceLayer'));
   o.construct       = MO.FE3dSimpleStage_construct;
   o.active          = MO.FE3dSimpleStage_active;
   o.deactive        = MO.FE3dSimpleStage_deactive;
   return o;
}
MO.FE3dSimpleStage_construct = function FE3dSimpleStage_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   var layer = o._skyLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('SkyLayer', layer);
   var layer = o._mapLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('MapLayer', layer);
   var layer = o._spriteLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('SpriteLayer', layer);
   var layer = o._faceLayer = MO.RClass.create(MO.FDisplayLayer);
   o.registerLayer('FaceLayer', layer);
}
MO.FE3dSimpleStage_active = function FE3dSimpleStage_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}
MO.FE3dSimpleStage_deactive = function FE3dSimpleStage_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
with(MO){
   MO.FE3dSpace = function FE3dSpace(o){
      o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
      o._dataReady            = false;
      o._resource             = null;
      o._materials            = null;
      o._dirty                = false;
      o.onProcess             = FE3dSpace_onProcess;
      o.construct             = FE3dSpace_construct;
      o.linkGraphicContext    = FE3dSpace_linkGraphicContext;
      o.createRegion          = FE3dSpace_createRegion;
      o.resource              = FE3dSpace_resource;
      o.findMaterial          = FE3dSpace_findMaterial;
      o.materials             = FE3dSpace_materials;
      o.loadTechniqueResource = FE3dSpace_loadTechniqueResource;
      o.loadRegionResource    = FE3dSpace_loadRegionResource;
      o.loadDisplayResource   = FE3dSpace_loadDisplayResource;
      o.loadLayerResource     = FE3dSpace_loadLayerResource;
      o.loadResource          = FE3dSpace_loadResource;
      o.commitResource        = FE3dSpace_commitResource;
      o.dirty                 = FE3dSpace_dirty;
      o.processLoad           = FE3dSpace_processLoad;
      o.active                = FE3dSpace_active;
      o.deactive              = FE3dSpace_deactive;
      return o;
   }
   MO.FE3dSpace_onProcess = function FE3dSpace_onProcess(){
      var o = this;
      o.__base.FE3dStage.onProcess.call(o);
      if(o._dirty){
         var s = o._region.allRenderables();
         for(var i = s.count() - 1; i >= 0; i--){
            var r = s.getAt(i);
            r.resetInfos();
         }
         o._dirty = false;
      }
   }
   MO.FE3dSpace_construct = function FE3dSpace_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      o._materials = new TDictionary();
   }
   MO.FE3dSpace_linkGraphicContext = function FE3dSpace_linkGraphicContext(context){
      var o = this;
      o.__base.FE3dStage.linkGraphicContext.call(o, context);
      o._region.linkGraphicContext(context);
   }
   MO.FE3dSpace_createRegion = function FE3dSpace_createRegion(){
      return RClass.create(FE3dRegion);
   }
   MO.FE3dSpace_resource = function FE3dSpace_resource(p){
      return this._resource;
   }
   MO.FE3dSpace_findMaterial = function FE3dSpace_findMaterial(guid){
      return this._materials.get(guid);
   }
   MO.FE3dSpace_materials = function FE3dSpace_materials(p){
      return this._materials;
   }
   MO.FE3dSpace_loadTechniqueResource = function FE3dSpace_loadTechniqueResource(p){
      var o = this;
      o._technique._resource = p;
   }
   MO.FE3dSpace_loadRegionResource = function FE3dSpace_loadRegionResource(p){
      var o = this;
      o._region.loadResource(p);
      var rc = p.camera();
      var rcv = rc.projection();
      var camera = o.camera();
      camera.projection().size().assign(o._graphicContext.size());
      camera.loadResource(rc);
      var rl = p.light();
      var rlc = rl.camera();
      var rlv = rlc.projection();
      var l = o.directionalLight();
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
   MO.FE3dSpace_loadDisplayResource = function FE3dSpace_loadDisplayResource(pl, pd){
      var o = this;
      var d3 = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Display);
      d3.linkGraphicContext(o);
      d3.loadSceneResource(pd);
      RConsole.find(FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
      pl.pushDisplay(d3);
   }
   MO.FE3dSpace_loadLayerResource = function FE3dSpace_loadLayerResource(p){
      var o = this;
      var l = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Layer);
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
   MO.FE3dSpace_loadResource = function FE3dSpace_loadResource(resource){
      var o = this;
      o._resource = resource;
      o.loadTechniqueResource(resource.technique());
      o.loadRegionResource(resource.region());
      var materialResources = resource.materials();
      if(materialResources){
         var materialCount = materialResources.count();
         var materialConsole = RConsole.find(FE3rMaterialConsole);
         for(var i = 0; i < materialCount; i++){
            var materialResource = materialResources.at(i);
            var materialGuid = materialResource.guid();
            var material = materialConsole.load(o, materialGuid);
            o._materials.set(materialGuid, material);
         }
      }
      var layers = resource.layers();
      if(layers){
         var layerCount = layers.count();
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            o.loadLayerResource(layer);
         }
      }
   }
   MO.FE3dSpace_commitResource = function FE3dSpace_commitResource(){
      var o = this;
      var camera = o._region.camera();
      camera.commitResource();
   }
   MO.FE3dSpace_dirty = function FE3dSpace_dirty(){
      this._dirty = true;
   }
   MO.FE3dSpace_processLoad = function FE3dSpace_processLoad(){
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
   MO.FE3dSpace_active = function FE3dSpace_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FE3dSpace_deactive = function FE3dSpace_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
with(MO){
   MO.FE3dSprite = function FE3dSprite(o){
      o = RClass.inherits(this, o, FE3dDisplayContainer, MGraphicObject, MLinkerResource);
      o._dataReady       = false;
      o._ready           = false;
      o._shapes          = null;
      o._skeletons       = null;
      o._animations      = null;
      o._movies          = null;
      o._resource        = null;
      o.construct        = FE3dSprite_construct;
      o.testReady        = FE3dSprite_testReady;
      o.makeLabel        = FE3dSprite_makeLabel;
      o.findMeshByCode   = FE3dSprite_findMeshByCode;
      o.meshRenderables  = FE3dSprite_shapes;
      o.skeletons        = FE3dSprite_skeletons;
      o.pushSkeleton     = FE3dSprite_pushSkeleton;
      o.findAnimation    = FE3dSprite_findAnimation;
      o.animations       = FE3dSprite_animations;
      o.pushAnimation    = FE3dSprite_pushAnimation;
      o.movies           = FE3dSprite_movies;
      o.pushMovie        = FE3dSprite_pushMovie;
      o.loadSkeletons    = FE3dSprite_loadSkeletons;
      o.linkAnimation    = FE3dSprite_linkAnimation;
      o.loadAnimations   = FE3dSprite_loadAnimations;
      o.loadResource     = FE3dSprite_loadResource;
      o.reloadResource   = FE3dSprite_reloadResource;
      o.load             = FE3dSprite_load;
      o.updateMatrix     = FE3dSprite_updateMatrix;
      o.selectClip       = FE3dSprite_selectClip;
      o.process          = FE3dSprite_process;
      o.dispose          = FE3dSprite_dispose;
      return o;
   }
   MO.FE3dSprite_construct = function FE3dSprite_construct(){
      var o = this;
      o.__base.FE3dDisplayContainer.construct.call(o);
      o._shapes = new TObjects();
   }
   MO.FE3dSprite_testReady = function FE3dSprite_testReady(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            if(!shape.testReady()){
               return false;
            }
         }
      }
      return true;
   }
   MO.FE3dSprite_makeLabel = function FE3dSprite_makeLabel(){
      var o = this;
      var resource = o.resource();
      var code = resource.code();
      var label = resource.label();
      if(label){
         return code + '[' + label + ']';
      }
      return code;
   }
   MO.FE3dSprite_findMeshByCode = function FE3dSprite_findMeshByCode(p){
      var s = this._shapes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dSprite_shapes = function FE3dSprite_shapes(){
      return this._shapes;
   }
   MO.FE3dSprite_skeletons = function FE3dSprite_skeletons(){
      return this._skeletons;
   }
   MO.FE3dSprite_pushSkeleton = function FE3dSprite_pushSkeleton(p){
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
   MO.FE3dSprite_findAnimation = function FE3dSprite_findAnimation(guid){
      var animations = this._animations;
      return animations ? animations.get(guid) : null;
   }
   MO.FE3dSprite_animations = function FE3dSprite_animations(){
      return this._animations;
   }
   MO.FE3dSprite_pushAnimation = function FE3dSprite_pushAnimation(animation){
      var o = this;
      var animations = o._animations;
      if(!animations){
         animations = o._animations = new TDictionary();
      }
      var animationResource = animation.resource();
      animations.set(animationResource.guid(), animation);
   }
   MO.FE3dSprite_movies = function FE3dSprite_movies(){
      return this._movies;
   }
   MO.FE3dSprite_pushMovie = function FE3dSprite_pushMovie(movie){
      var o = this;
      var movies = o._movies;
      if(!movies){
         movies = o._movies = new TObjects();
      }
      movies.push(movie);
   }
   MO.FE3dSprite_loadSkeletons = function FE3dSprite_loadSkeletons(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         var ks = o.skeletons();
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var s = RClass.create(FE3rSkeleton);
            s.loadResource(r);
            o.pushSkeleton(s);
         }
      }
   }
   MO.FE3dSprite_linkAnimation = function FE3dSprite_linkAnimation(p){
      var o = this;
      var ts = p.tracks();
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.getAt(i);
         var mc = t._resource._meshCode;
         if(mc){
            var m = o.findMeshByCode(mc);
            m._activeTrack = t;
         }
      }
   }
   MO.FE3dSprite_loadAnimations = function FE3dSprite_loadAnimations(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
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
            a._display = o;
            a.loadResource(r);
            o.pushAnimation(a);
         }
      }
   }
   MO.FE3dSprite_loadResource = function FE3dSprite_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
      var renderableResources = resource.renderables();
      var renderableCount = renderableResources.count();
      if(renderableCount > 0){
         var shapes = o._shapes;
         for(var i = 0; i < renderableCount; i++){
            var renderableResource = renderableResources.at(i);
            var renderable = RClass.create(FE3dTemplateRenderable);
            renderable._display = o;
            renderable.linkGraphicContext(o);
            renderable.loadResource(renderableResource);
            shapes.push(renderable);
            o.pushRenderable(renderable);
         }
      }
   }
   MO.FE3dSprite_reloadResource = function FE3dSprite_reloadResource(){
      var o = this;
      var s = o._shapes;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.getAt(i).reloadResource();
         }
      }
   }
   MO.FE3dSprite_load = function FE3dSprite_load(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            shapes.at(i).load();
         }
      }
   }
   MO.FE3dSprite_updateMatrix = function FE3dSprite_updateMatrix(region){
      var o = this;
      var matrix = o._currentMatrix.identity();
      var movies = o._movies;
      if(movies){
         if(o._optionMovie){
            var c = movies.count();
            for(var i = 0; i < c; i++){
               var movie = movies.at(i);
               movie.process(o._movieMatrix);
            }
         }
         matrix.append(o._movieMatrix);
      }
      matrix.append(o._matrix);
      var parent = o._parent;
      if(parent){
         o._currentMatrix.append(parent._currentMatrix);
      }
   }
   MO.FE3dSprite_selectClip = function FE3dSprite_selectClip(code){
      var o = this;
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.selectClip(code);
         }
      }
   }
   MO.FE3dSprite_process = function FE3dSprite_process(region){
      var o = this;
      var animations = o._animations;
      if(animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.record();
         }
      }
      o.__base.FE3dDisplayContainer.process.call(o, region);
      var skeleton = o._activeSkeleton;
      if(skeleton && animations){
         var count = animations.count();
         for(var i = 0; i < count; i++){
            var animation = animations.at(i);
            animation.process(skeleton);
         }
      }
   }
   MO.FE3dSprite_dispose = function FE3dSprite_dispose(){
      var o = this;
      o._shapes = RObject.dispose(o._shapes);
      o.__base.FE3dDisplayContainer.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplate = function FE3dTemplate(o){
      o = RClass.inherits(this, o, FE3dSpace, MGraphicObject, MListenerLoad);
      o._dataReady       = false;
      o._ready           = false;
      o._resource        = null;
      o._sprites         = null;
      o._skeletons       = null;
      o._animations      = null;
      o._resource        = null;
      o.construct        = FE3dTemplate_construct;
      o.testReady        = FE3dTemplate_testReady;
      o.sprite           = FE3dTemplate_sprite;
      o.findMeshByCode   = FE3dTemplate_findMeshByCode;
      o.meshRenderables  = FE3dTemplate_sprites;
      o.skeletons        = FE3dTemplate_skeletons;
      o.pushSkeleton     = FE3dTemplate_pushSkeleton;
      o.findAnimation    = FE3dTemplate_findAnimation;
      o.animations       = FE3dTemplate_animations;
      o.pushAnimation    = FE3dTemplate_pushAnimation;
      o.visible          = FE3dTemplate_visible;
      o.setVisible       = FE3dTemplate_setVisible;
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
   MO.FE3dTemplate_construct = function FE3dTemplate_construct(){
      var o = this;
      o.__base.FE3dSpace.construct.call(o);
      var layer = o._layer = RClass.create(FDisplayLayer);
      o.registerLayer('Layer', layer);
      o._sprites = new TObjects();
   }
   MO.FE3dTemplate_testReady = function FE3dTemplate_testReady(){
      return this._ready;
   }
   MO.FE3dTemplate_sprite = function FE3dTemplate_sprite(){
      return this._sprites.first();
   }
   MO.FE3dTemplate_findMeshByCode = function FE3dTemplate_findMeshByCode(p){
      var s = this._sprites;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dTemplate_sprites = function FE3dTemplate_sprites(){
      return this._sprites;
   }
   MO.FE3dTemplate_skeletons = function FE3dTemplate_skeletons(){
      return this._skeletons;
   }
   MO.FE3dTemplate_pushSkeleton = function FE3dTemplate_pushSkeleton(p){
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
   MO.FE3dTemplate_findAnimation = function FE3dTemplate_findAnimation(p){
      var s = this._animations;
      return s ? s.get(p) : null;
   }
   MO.FE3dTemplate_animations = function FE3dTemplate_animations(){
      return this._animations;
   }
   MO.FE3dTemplate_pushAnimation = function FE3dTemplate_pushAnimation(p){
      var o = this;
      var r = o._animations;
      if(!r){
         r = o._animations = new TDictionary();
      }
      var pr = p.resource();
      r.set(pr.guid(), p);
   }
   MO.FE3dTemplate_visible = function FE3dTemplate_visible(){
      return this.sprite().visible();
   }
   MO.FE3dTemplate_setVisible = function FE3dTemplate_setVisible(visible){
      this.sprite().setVisible(visible);
   }
   MO.FE3dTemplate_resource = function FE3dTemplate_resource(p){
      return this._resource;
   }
   MO.FE3dTemplate_setResource = function FE3dTemplate_setResource(p){
      this._resource = p;
   }
   MO.FE3dTemplate_loadSkeletons = function FE3dTemplate_loadSkeletons(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         var ks = o.skeletons();
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
            var s = RClass.create(FE3rSkeleton);
            s.loadResource(r);
            o.pushSkeleton(s);
         }
      }
   }
   MO.FE3dTemplate_linkAnimation = function FE3dTemplate_linkAnimation(p){
      var o = this;
      var ts = p.tracks();
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.getAt(i);
         var mc = t._resource._meshCode;
         if(mc){
            var m = o.findMeshByCode(mc);
            m._activeTrack = t;
         }
      }
   }
   MO.FE3dTemplate_loadAnimations = function FE3dTemplate_loadAnimations(p){
      var o = this;
      var c = p.count();
      if(c > 0){
         for(var i = 0; i < c; i++){
            var r = p.getAt(i);
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
            a._display = o;
            a.loadResource(r);
            o.pushAnimation(a);
         }
      }
   }
   MO.FE3dTemplate_loadResource = function FE3dTemplate_loadResource(resource){
      var o = this;
      var technique = o.selectTechnique(o, FE3dGeneralTechnique);
      technique.setResource(resource.technique());
      o.__base.FE3dSpace.loadResource.call(o, resource);
      var displayResources = resource.displays();
      if(displayResources){
         var displayCount = displayResources.count();
         if(displayCount > 0){
            for(var i = 0; i < displayCount; i++){
               var displayResource = displayResources.at(i);
               var display = RClass.create(FE3dTemplateDisplay);
               display._parent = o;
               display.linkGraphicContext(o);
               display.loadResource(displayResource);
               o._sprites.push(display);
            }
         }
      }
   }
   MO.FE3dTemplate_reloadResource = function FE3dTemplate_reloadResource(){
      var o = this;
      var s = o._sprites;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.getAt(i).reloadResource();
         }
      }
   }
   MO.FE3dTemplate_processLoad = function FE3dTemplate_processLoad(){
      var o = this;
      if(o._ready){
         return true;
      }
      if(!o._dataReady){
         var resource = o._resource;
         if(!resource.testReady()){
            return false;
         }
         o.loadResource(resource);
         o._dataReady = true;
      }
      var sprites = o._sprites;
      if(sprites){
         var spriteCount = sprites.count();
         for(var i = 0; i < spriteCount; i++){
            var sprite = sprites.at(i);
            if(!sprite.testReady()){
               return false;
            }
         }
         for(var i = 0; i < spriteCount; i++){
            var sprite = sprites.at(i);
            sprite.load();
            o._layer.pushDisplay(sprite);
         }
      }
      var animations = o._animations;
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            if(animation.resource().skeleton() == null){
               o.linkAnimation(animation);
            }
         }
      }
      o._ready = true;
      o.processLoadListener(o);
      return o._ready;
   }
   MO.FE3dTemplate_process = function FE3dTemplate_process(event){
      var o = this;
      o.__base.FE3dSpace.process.call(o);
   }
   MO.FE3dTemplate_dispose = function FE3dTemplate_dispose(){
      var o = this;
      o._sprites = RObject.dispose(o._sprites);
      o.__base.FE3dSpace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateCanvas = function FE3dTemplateCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._activeTemplate     = null;
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FE3dTemplateCanvas_onEnterFrame;
      o.onMouseCaptureStart = FE3dTemplateCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FE3dTemplateCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FE3dTemplateCanvas_onMouseCaptureStop;
      o.onResize            = FE3dTemplateCanvas_onResize;
      o.onTemplateLoad      = FE3dTemplateCanvas_onTemplateLoad;
      o.construct           = FE3dTemplateCanvas_construct;
      o.loadByGuid          = FE3dTemplateCanvas_loadByGuid;
      o.loadByCode          = FE3dTemplateCanvas_loadByCode;
      o.dispose             = FE3dTemplateCanvas_dispose;
      return o;
   }
   MO.FE3dTemplateCanvas_onEnterFrame = function FE3dTemplateCanvas_onEnterFrame(){
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
   MO.FE3dTemplateCanvas_onMouseCaptureStart = function FE3dTemplateCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var r = o._activeTemplate.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
   }
   MO.FE3dTemplateCanvas_onMouseCapture = function FE3dTemplateCanvas_onMouseCapture(p){
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
   MO.FE3dTemplateCanvas_onMouseCaptureStop = function FE3dTemplateCanvas_onMouseCaptureStop(p){
   }
   MO.FE3dTemplateCanvas_onResize = function FE3dTemplateCanvas_onResize(){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FE3dTemplateCanvas_onTemplateLoad = function FE3dTemplateCanvas_onTemplateLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeTemplate;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      o.processLoadListener(o, s);
   }
   MO.FE3dTemplateCanvas_construct = function FE3dTemplateCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
   }
   MO.FE3dTemplateCanvas_loadByGuid = function FE3dTemplateCanvas_loadByGuid(p){
      var o = this;
      var c = o._graphicContext;
      var sc = RConsole.find(FE3dSceneConsole);
      if(o._activeTemplate != null){
         sc.free(o._activeTemplate);
      }
      var s = sc.alloc(o, p);
      s.addLoadListener(o, o.onTemplateLoad);
      s.selectTechnique(c, FG3dGeneralTechnique);
      o._stage = o._activeTemplate = s;
      RStage.register('stage3d', s);
   }
   MO.FE3dTemplateCanvas_loadByCode = function FE3dTemplateCanvas_loadByCode(code){
      var o = this;
      var context = o._graphicContext;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(o._activeTemplate != null){
         templateConsole.free(o._activeTemplate);
      }
      var template = templateConsole.allocByCode(context, code);
      template.addLoadListener(o, o.onTemplateLoad);
      template.selectTechnique(context, FE3dGeneralTechnique);
      o._stage = o._activeTemplate = template;
      RStage.register('stage.template', template);
   }
   MO.FE3dTemplateCanvas_dispose = function FE3dTemplateCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateConsole = function FE3dTemplateConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd    = EScope.Local;
      o._loadQueue  = null;
      o._pools      = null;
      o._thread     = null;
      o._interval   = 200;
      o.onProcess   = FE3dTemplateConsole_onProcess;
      o.construct   = FE3dTemplateConsole_construct;
      o.allocByGuid = FE3dTemplateConsole_allocByGuid;
      o.allocByCode = FE3dTemplateConsole_allocByCode;
      o.free        = FE3dTemplateConsole_free;
      return o;
   }
   MO.FE3dTemplateConsole_onProcess = function FE3dTemplateConsole_onProcess(){
      var o = this;
      var looper = o._loadQueue;
      looper.record();
      while(looper.next()){
         var template = looper.current();
         if(template.processLoad()){
            looper.removeCurrent();
         }
      }
   }
   MO.FE3dTemplateConsole_construct = function FE3dTemplateConsole_construct(){
      var o = this;
      o._loadQueue = new TLooper();
      o._pools = RClass.create(FObjectPools);
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }
   MO.FE3dTemplateConsole_allocByGuid = function FE3dTemplateConsole_allocByGuid(context, guid){
      var o = this;
      var template = o._pools.alloc(guid);
      if(template){
         return template;
      }
      var resource = RConsole.find(FE3sTemplateConsole).loadByGuid(guid);
      template = RClass.create(FE3dTemplate);
      template.linkGraphicContext(context);
      template.setResource(resource);
      template._poolCode = guid;
      o._loadQueue.push(template);
      return template;
   }
   MO.FE3dTemplateConsole_allocByCode = function FE3dTemplateConsole_allocByCode(context, code){
      var o = this;
      var template = o._pools.alloc(code);
      if(template){
         return template;
      }
      var resource = RConsole.find(FE3sTemplateConsole).loadByCode(code);
      template = RClass.create(FE3dTemplate);
      template.linkGraphicContext(context);
      template.setResource(resource);
      template._poolCode = code;
      o._loadQueue.push(template);
      return template;
   }
   MO.FE3dTemplateConsole_free = function FE3dTemplateConsole_free(template){
      var o = this;
      var code = template._poolCode;
      o._pools.free(code, template);
   }
}
with(MO){
   MO.FE3dTemplateDisplay = function FE3dTemplateDisplay(o){
      o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
      o._dataReady       = false;
      o._ready           = false;
      o._shapes          = null;
      o._skeletons       = null;
      o.construct        = FE3dTemplateDisplay_construct;
      o.testReady        = FE3dTemplateDisplay_testReady;
      o.findMeshByCode   = FE3dTemplateDisplay_findMeshByCode;
      o.meshRenderables  = FE3dTemplateDisplay_shapes;
      o.skeletons        = FE3dTemplateDisplay_skeletons;
      o.pushSkeleton     = FE3dTemplateDisplay_pushSkeleton;
      o.loadSkeletons    = FE3dTemplateDisplay_loadSkeletons;
      o.linkAnimation    = FE3dTemplateDisplay_linkAnimation;
      o.loadAnimations   = FE3dTemplateDisplay_loadAnimations;
      o.loadResource     = FE3dTemplateDisplay_loadResource;
      o.reloadResource   = FE3dTemplateDisplay_reloadResource;
      o.load             = FE3dTemplateDisplay_load;
      o.dispose          = FE3dTemplateDisplay_dispose;
      return o;
   }
   MO.FE3dTemplateDisplay_construct = function FE3dTemplateDisplay_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._shapes = new TObjects();
   }
   MO.FE3dTemplateDisplay_testReady = function FE3dTemplateDisplay_testReady(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            if(!shape.testReady()){
               return false;
            }
         }
      }
      return true;
   }
   MO.FE3dTemplateDisplay_findMeshByCode = function FE3dTemplateDisplay_findMeshByCode(p){
      var s = this._shapes;
      for(var i = s.count() - 1; i >= 0; i--){
         var m = s.getAt(i);
         if(m._renderable._resource._code == p){
            return m;
         }
      }
      return null;
   }
   MO.FE3dTemplateDisplay_shapes = function FE3dTemplateDisplay_shapes(){
      return this._shapes;
   }
   MO.FE3dTemplateDisplay_skeletons = function FE3dTemplateDisplay_skeletons(){
      return this._skeletons;
   }
   MO.FE3dTemplateDisplay_pushSkeleton = function FE3dTemplateDisplay_pushSkeleton(skeleton){
      var o = this;
      var resource = skeleton.resource();
      var skeletonGuid = resource.guid();
      var skeletons = o._skeletons;
      if(!skeletons){
         skeletons = o._skeletons = new TDictionary();
      }
      if(!o._activeSkeleton){
         o._activeSkeleton = skeleton;
      }
      skeletons.set(skeletonGuid, skeleton);
   }
   MO.FE3dTemplateDisplay_loadSkeletons = function FE3dTemplateDisplay_loadSkeletons(skeletonResources){
      var o = this;
      var count = skeletonResources.count();
      if(count > 0){
         for(var i = 0; i < count; i++){
            var skeletonResource = skeletonResources.at(i);
            var skeleton = RClass.create(FE3rSkeleton);
            skeleton.loadResource(skeletonResource);
            o.pushSkeleton(skeleton);
         }
      }
   }
   MO.FE3dTemplateDisplay_linkAnimation = function FE3dTemplateDisplay_linkAnimation(animation){
      var o = this;
      var tracks = animation.tracks();
      var count = tracks.count();
      for(var i = 0; i < count; i++){
         var track = tracks.at(i);
         var meshCode = track._resource._meshCode;
         if(meshCode){
            var mesh = o.findMeshByCode(meshCode);
            mesh._activeTrack = track;
         }
      }
   }
   MO.FE3dTemplateDisplay_loadAnimations = function FE3dTemplateDisplay_loadAnimations(animationResources){
      var o = this;
      var animationCount = animationResources.count();
      for(var i = 0; i < animationCount; i++){
         var animationResource = animationResources.at(i);
         var guid = animationResource.guid();
         var animation = o.findAnimation(guid);
         if(animation){
            continue;
         }
         if(animationResource.skeleton()){
            animation = RClass.create(FE3rSkeletonAnimation);
         }else{
            animation = RClass.create(FE3rMeshAnimation);
         }
         animation._display = o;
         animation.loadResource(animationResource);
         o.pushAnimation(animation);
      }
   }
   MO.FE3dTemplateDisplay_loadResource = function FE3dTemplateDisplay_loadResource(resource){
      var o = this;
      o._resource = resource;
      var instanceConsole = RConsole.find(FE3dInstanceConsole);
      o._matrix.assign(resource.matrix());
      var renderableResources = resource.renderables();
      if(renderableResources){
         var shapes = o._shapes;
         var renderableCount = renderableResources.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableResource = renderableResources.at(i);
            var renderable = instanceConsole.create(EE3dInstance.TemplateRenderable);
            renderable._display = o;
            renderable.linkGraphicContext(o);
            renderable.loadResource(renderableResource);
            shapes.push(renderable);
            o.pushRenderable(renderable);
         }
      }
   }
   MO.FE3dTemplateDisplay_reloadResource = function FE3dTemplateDisplay_reloadResource(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var count = shapes.count();
         for(var i = 0; i < count; i++){
            var shape = shapes.at(i);
            shape.reloadResource();
         }
      }
   }
   MO.FE3dTemplateDisplay_load = function FE3dTemplateDisplay_load(){
      var o = this;
      var shapes = o._shapes;
      if(shapes){
         var shapeCount = shapes.count();
         for(var i = 0; i < shapeCount; i++){
            var shape = shapes.at(i);
            shape.load();
         }
      }
      var animations = o._animations;
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            if(animation.resource().skeleton() == null){
               o.linkAnimation(animation);
            }
         }
      }
   }
   MO.FE3dTemplateDisplay_dispose = function FE3dTemplateDisplay_dispose(){
      var o = this;
      o._shapes = RObject.dispose(o._shapes);
      o.__base.FE3dSprite.dispose.call(o);
   }
}
with(MO){
   MO.FE3dTemplateRenderable = function FE3dTemplateRenderable(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable, MLinkerResource);
      o._ready            = false;
      o._model            = null;
      o._materialCode     = null;
      o._materialResource = null;
      o.construct         = FE3dTemplateRenderable_construct;
      o.testReady         = FE3dTemplateRenderable_testReady;
      o.testVisible       = FE3dTemplateRenderable_testVisible;
      o.calculateOutline  = FE3dTemplateRenderable_calculateOutline;
      o.loadResource      = FE3dTemplateRenderable_loadResource;
      o.reloadResource    = FE3dTemplateRenderable_reloadResource;
      o.load              = FE3dTemplateRenderable_load;
      o.dispose           = FE3dTemplateRenderable_dispose;
      return o;
   }
   MO.FE3dTemplateRenderable_construct = function FE3dTemplateRenderable_construct(){
      var o = this;
      o.__base.FE3dMeshRenderable.construct.call(o);
   }
   MO.FE3dTemplateRenderable_testReady = function FE3dTemplateRenderable_testReady(){
      var o = this;
      if(!o._ready){
         if(!o._model.testReady()){
            return false;
         }
         var materials = o._materials;
         if(materials){
            var count = materials.count();
            for(var i = 0; i < count; i++){
               var material = materials.at(i);
               if(material){
                  if(!material.testReady()){
                     return false;
                  }
               }
            }
         }
         o._ready = true;
      }
      return o._ready;
   }
   MO.FE3dTemplateRenderable_testVisible = function FE3dTemplateRenderable_testVisible(p){
      var o = this;
      var result = false;
      if(o._ready){
         result = o.__base.FE3dMeshRenderable.testVisible.call(o);
      }
      return result;
   }
   MO.FE3dTemplateRenderable_calculateOutline = function FE3dTemplateRenderable_calculateOutline(flag){
      var o = this;
      var outline = o._outline;
      if(outline.isEmpty() || flag){
         var resource = o._resource
         var meshResource = resource.mesh();
         var meshOutline = meshResource.outline();
         outline.calculateFrom(meshOutline, o._currentMatrix);
      }
      return outline;
   }
   MO.FE3dTemplateRenderable_loadResource = function FE3dTemplateRenderable_loadResource(resource){
      var o = this;
      o._resource = resource;
      o._matrix.assign(resource.matrix());
      var modelGuid = resource.modelGuid();
      o._model = RConsole.find(FE3rModelConsole).load(o, modelGuid);
      var materialGuid = resource.materialGuid();
      if(!RString.isEmpty(materialGuid)){
         var material = o._material = o._materialReference = RConsole.find(FE3rMaterialConsole).load(o, materialGuid);
         o._materialResource = material.resource();
         o.pushMaterial(material);
      }
      var template = o._display._parent;
      var materialRefers = resource.materialRefers();
      if(materialRefers){
         var count = materialRefers.count();
         for(var i = 0; i < count; i++){
            var materialRefer = materialRefers.at(i);
            var materialGuid = materialRefer.guid();
            var material = template.findMaterial(materialGuid);
            o.pushMaterial(material);
            o._material = material;
         }
      }
      if(!o._material){
         o._material = o._materialReference = RClass.create(FE3dMaterial);
      }
   }
   MO.FE3dTemplateRenderable_reloadResource = function FE3dTemplateRenderable_reloadResource(){
      var o = this;
      var material = o._material;
      material.calculate(o._materialResource);
      material.update();
   }
   MO.FE3dTemplateRenderable_load = function FE3dTemplateRenderable_load(){
      var o = this;
      var display = o._display;
      var resource = o._resource;
      var modelResource = resource.model();
      var bitmaps = o._material.bitmaps();
      if(bitmaps){
         var count = bitmaps.count();
         for(var i = 0; i < count; i++){
            var bitmap = bitmaps.at(i);
            o.pushTexture(bitmap);
         }
      }
      var skeletonResources = modelResource.skeletons();
      if(skeletonResources){
         display.loadSkeletons(skeletonResources);
      }
      var animationResources = modelResource.animations();
      if(animationResources){
         display.loadAnimations(animationResources);
      }
      var meshResource = resource.mesh();
      var meshGuid = resource.meshGuid();
      var renderable = o._renderable = RConsole.find(FE3rModelConsole).findMesh(meshGuid);
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         o._vertexBuffers.set(vertexBuffer.code(), vertexBuffer);
      }
      var skins = renderable.skins();
      if(skins){
         var displaySkeleton = display._activeSkeleton;
         var skin = o._activeSkin = skins.first();
         var streams = skin.streams();
         var streamCount = streams.count();
         for(var i = 0; i < streamCount; i++){
            var stream = streams.at(i);
            var buffer = stream.buffer();
            o._vertexBuffers.set(buffer.code(), buffer);
         }
         var skinResource = skin.resource();
         var boneReferResources = skinResource.boneRefers();
         var c = boneReferResources.count();
         if(c > 0){
            var bones = o._bones = new TObjects();
            for(var i = 0; i < c; i++){
               var boneReferResource = boneReferResources.at(i);
               var boneReferIndex = boneReferResource.index();
               var bone = displaySkeleton.bones().get(boneReferIndex);
               if(!bone){
                  throw new TError(o, 'Bone is not exist.');
               }
               bones.push(bone);
            }
         }
      }
      o._ready = true;
   }
   MO.FE3dTemplateRenderable_dispose = function FE3dTemplateRenderable_dispose(){
      var o = this;
      o.__base.FE3dMeshRenderable.dispose.call(o);
   }
}
with(MO){
   MO.SE3dRulerPrecision = function SE3dRulerPrecision(o){
      var o = this;
      o.interval = 1;
      o.length   = 0.5;
      o.color    = new SColor4(255, 255, 255, 255);
      return o;
   }
   MO.SE3dRulerPrecision_assign = function SE3dRulerPrecision_assign(info){
      var o = this;
      o.interval.assign(info.interval);
      o.color.assign(info.color);
   }
}
with(MO){
   MO.SE3dRulerStyle = function SE3dRulerStyle(o){
      var o = this;
      o.lineColor    = new SColor4(255, 255, 255, 255);
      o.bothLength   = 0.5;
      o.bothColor    = new SColor4(255, 255, 255, 255);
      o.tickInterval = 1;
      o.tickLength   = 0.3;
      o.tickColor    = new SColor4(255, 255, 255, 255);
      o.precisions   = new TObjects();
      o.assign       = SE3dRulerStyle_assign;
      return o;
   }
   MO.SE3dRulerStyle = function SE3dRulerStyle_assign(info){
      var o = this;
      o.lineColor.assign(info.lineColor);
      o.bothLength = info.bothLength;
      o.bothColor.assign(info.lineColor);
      o.tickInterval = info.tickInterval;
      o.tickLength = info.tickLength;
      o.tickColor.assign(info.lineColor);
      o.precisions.assign(info.precisions);
   }
}
with(MO){
   MO.FE3dBitmap = function FE3dBitmap(o){
      o = RClass.inherits(this, o, FE3dFace);
      o.construct = FE3dBitmap_construct;
      o.testReady = FE3dBitmap_testReady;
      o.loadUrl   = FE3dBitmap_loadUrl;
      o.dispose   = FE3dBitmap_dispose;
      return o;
   }
   MO.FE3dBitmap_construct = function FE3dBitmap_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }
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
               matrix.sz = adjustSize.height / size.height;
               matrix.updateForce();
               var event = new SEvent(o);
               o.processLoadListener(event);
               event.dispose();
            }
            o._materialReference = renderable;
         }
      }
      return o._ready;
   }
   MO.FE3dBitmap_loadUrl = function FE3dBitmap_loadUrl(url){
      var o = this;
      o._renderable = RConsole.find(FE3dBitmapConsole).loadDataByUrl(o, url);
      o._ready = false;
   }
   MO.FE3dBitmap_dispose = function FE3dBitmap_dispose(){
      var o = this;
      o.__base.FE3dFace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dBitmapConsole = function FE3dBitmapConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd       = EScope.Local;
      o._bitmaps       = RClass.register(o, new AGetter('_bitmaps'));
      o._bitmapDatas   = RClass.register(o, new AGetter('_bitmapDatas'));
      o._dataUrl       = '/cloud.resource.bitmap.wv'
      o.construct      = FE3dBitmapConsole_construct;
      o.loadByUrl      = FE3dBitmapConsole_loadByUrl;
      o.loadByGuid     = FE3dBitmapConsole_loadByGuid;
      o.loadDataByUrl  = FE3dBitmapConsole_loadDataByUrl;
      o.loadDataByGuid = FE3dBitmapConsole_loadDataByGuid;
      o.dispose        = FE3dBitmapConsole_dispose;
      return o;
   }
   MO.FE3dBitmapConsole_construct = function FE3dBitmapConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._bitmaps = new TDictionary();
      o._bitmapDatas = new TDictionary();
   }
   MO.FE3dBitmapConsole_loadByUrl = function FE3dBitmapConsole_loadByUrl(context, url){
      var o = this;
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3dBitmap);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
   MO.FE3dBitmapConsole_loadByGuid = function FE3dBitmapConsole_loadByGuid(context, guid){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(guid);
      var url = RBrowser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
      return o.loadByUrl(context, url);
   }
   MO.FE3dBitmapConsole_loadDataByUrl = function FE3dBitmapConsole_loadDataByUrl(context, url){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(url);
      var dataUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap data from url. (url={1})', dataUrl);
      var data = o._bitmapDatas.get(url);
      if(!data){
         data = RClass.create(FE3dBitmapData);
         data.linkGraphicContext(context);
         data.setup();
         data.loadUrl(url);
         o._bitmapDatas.set(url, data);
      }
      return data;
   }
   MO.FE3dBitmapConsole_loadDataByGuid = function FE3dBitmapConsole_loadDataByGuid(context, guid){
      var o = this;
      MO.Assert.debugNotNull(context);
      MO.Assert.debugNotNull(guid);
      var url = RBrowser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
      return o.loadDataByUrl(context, url);
   }
   MO.FE3dBitmapConsole_dispose = function FE3dBitmapConsole_dispose(){
      var o = this;
      o._bitmaps = RObject.dispose(o._bitmaps);
      o._bitmapDatas = RObject.dispose(o._bitmapDatas);
      o.__base.FConsole.dispose.call(o);
   }
}
with(MO){
   MO.FE3dBitmapData = function FE3dBitmapData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._image      = null;
      o.onImageLoad = FE3dBitmapData_onImageLoad;
      o.construct   = FE3dBitmapData_construct;
      o.loadUrl     = FE3dBitmapData_loadUrl;
      o.dispose     = FE3dBitmapData_dispose;
      return o;
   }
   MO.FE3dBitmapData_onImageLoad = function FE3dBitmapData_onImageLoad(event){
      var o = this;
      var context = o._graphicContext;
      var image = event.sender;
      var size = image.size();
      var width = size.width;
      var height = size.height;
      o._size.set(width, height);
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0);
      o._texture.upload(canvas);
      canvasConsole.free(canvas);
      image.dispose();
      o._ready = true;
   }
   MO.FE3dBitmapData_construct = function FE3dBitmapData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FE3dBitmapData_loadUrl = function FE3dBitmapData_loadUrl(url){
      var o = this;
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      o._ready = false;
   }
   MO.FE3dBitmapData_dispose = function FE3dBitmapData_dispose(){
      var o = this;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
with(MO){
   MO.FE3dBoundBox = function FE3dBoundBox(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._outline              = RClass.create(o, new AGetter('_outline'));
      o._rate                 = 0.2;
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o.construct             = FE3dBoundBox_construct;
      o.setup                 = FE3dBoundBox_setup;
      o.upload                = FE3dBoundBox_upload;
      return o;
   }
   MO.FE3dBoundBox_construct = function FE3dBoundBox_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._outline = new SOutline3();
   }
   MO.FE3dBoundBox_setup = function FE3dBoundBox_setup(){
      var o = this;
      var c = o._graphicContext;
      var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var vertexData = new Uint8Array(4 * 32);
      for(var n = 4 * 32 - 1; n >= 0; n--){
         vertexData[n] = 0xFF;
      }
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(vertexData, 1 * 4, 32);
      o.pushVertexBuffer(buffer);
      o._vertexCount = 32;
      var indexData = [
          0,  1,  0,  4,  0, 12,
          3,  2,  3,  5,  3, 13,
          8,  6,  8,  9,  8, 14,
         11,  7, 11, 10, 11, 15,
         20, 16, 20, 21, 20, 24,
         23, 17, 23, 22, 23, 25,
         28, 18, 28, 26, 28, 29,
         31, 19, 31, 27, 31, 30 ];
      var buffer = o._indexBuffer = c.createIndexBuffer();
      buffer.setDrawModeCd(EG3dDrawMode.Lines);
      buffer.setLineWidth(1);
      buffer.upload(indexData, 48);
      o.pushIndexBuffer(buffer);
      o.update();
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }
   MO.FE3dBoundBox_upload = function FE3dBoundBox_upload(){
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
      var data = [
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
      o._vertexPositionBuffer.upload(data, 4 * 3, 32);
   }
}
with(MO){
   MO.FE3dCube = function FE3dCube(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o.vertexPositionBuffer = null;
      o.vertexColorBuffer    = null;
      o.indexBuffer          = null;
      o.setup                = FE3dCube_setup;
      return o;
   }
   MO.FE3dCube_setup = function FE3dCube_setup(p){
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
      var buffer = o.vertexPositionBuffer = p.createVertexBuffer();
      buffer.upload(vp, 4 * 3, 8);
      o.pushVertexBuffer(buffer);
      var vc = [
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         0.0, 0.0, 0.0, 1.0,
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 1.0, 1.0,
         1.0, 0.0, 1.0, 1.0,
         0.0, 0.0, 1.0, 1.0 ];
      var buffer = o.vertexColorBuffer = p.createVertexBuffer();
      buffer.upload(vc, 4 * 4, 8);
      o.pushVertexBuffer(buffer);
      var id = [
         0, 1, 2, 0, 2, 3,
         1, 5, 6, 1, 6, 2,
         5, 4, 7, 5, 7, 6,
         4, 0, 3, 4, 3, 7,
         0, 4, 5, 0, 5, 1,
         3, 2, 6, 3, 6, 7  ];
      var buffer = context.createIndexBuffer();
      buffer.upload(id, 36);
      o.pushIndexBuffer(buffer);
      var mi = o.material().info();
      mi.effectCode = 'control';
      mi.ambientColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.FE3dDataBox = function FE3dDataBox(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o.construct             = FE3dDataBox_construct;
      o.setup                 = FE3dDataBox_setup;
      return o;
   }
   MO.FE3dDataBox_construct = function FE3dDataBox_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dDataBox_setup = function FE3dDataBox_setup(vd, vc, id){
      var o = this;
      var c = o._graphicContext;
      var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
      var buffer = o._indexBuffer = c.createIndexBuffer();
      o.pushIndexBuffer(buffer);
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.FE3dDimensional = function FE3dDimensional(o){
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
   MO.FE3dDimensional_construct = function FE3dDimensional_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._cellSize = new SSize2();
      o._cellSize.set(1, 1);
      o._size = new SSize2();
      o._size.set(16, 16);
   }
   MO.FE3dDimensional_setup = function FE3dDimensional_setup(){
      var o = this;
      var context = o._graphicContext;
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
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(vd, 4 * 3, vc);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      buffer.upload(vcd, 4, vc);
      o.pushVertexBuffer(buffer);
      var buffer = context.createIndexBuffer();
      buffer.setDrawModeCd(EG3dDrawMode.Lines);
      buffer.upload(id, it);
      o.pushIndexBuffer(buffer);
      var materialInfo = o.material().info();
      materialInfo.effectCode = 'control';
      materialInfo.ambientColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.FE3dFace = function FE3dFace(o){
      o = RClass.inherits(this, o, FE3dMeshRenderable, MListener);
      o._ready           = false;
      o._size            = RClass.register(o, new AGetter('_size'));
      o._loadListeners   = RClass.register(o, new AListener('_loadListeners', EEvent.Load));
      o.construct        = FE3dFace_construct;
      o.setSize          = FE3dFace_setSize;
      o.setData          = FE3dFace_setData;
      o.findVertexBuffer = FE3dFace_findVertexBuffer;
      o.vertexBuffers    = FE3dFace_vertexBuffers;
      o.findTexture      = FE3dFace_findTexture;
      o.textures         = FE3dFace_textures;
      o.material         = FE3dFace_material;
      o.processLoad      = FE3dFace_processLoad;
      o.process          = FE3dFace_process;
      o.dispose          = FE3dFace_dispose;
      return o;
   }
   MO.FE3dFace_construct = function FE3dFace_construct(){
      var o = this;
      o.__base.FE3dMeshRenderable.construct.call(o);
      o._size = new SSize2();
   }
   MO.FE3dFace_setSize = function FE3dFace_setSize(width, height){
      var o = this;
      o._size.set(width, height);
      o._matrix.setScale(width, height, 1);
   }
   MO.FE3dFace_setData = function FE3dFace_setData(data){
      var o = this;
      o._renderable = data;
   }
   MO.FE3dFace_findVertexBuffer = function FE3dFace_findVertexBuffer(p){
      return this._renderable.findVertexBuffer(p);
   }
   MO.FE3dFace_vertexBuffers = function FE3dFace_vertexBuffers(){
      return this._renderable.vertexBuffers();
   }
   MO.FE3dFace_findTexture = function FE3dFace_findTexture(p){
      return this._renderable.findTexture(p);
   }
   MO.FE3dFace_textures = function FE3dFace_textures(){
      return this._renderable.textures();
   }
   MO.FE3dFace_material = function FE3dFace_material(){
      return this._renderable.material();
   }
   MO.FE3dFace_processLoad = function FE3dFace_processLoad(){
      var o = this;
      return true;
   }
   MO.FE3dFace_process = function FE3dFace_process(){
      var o = this;
      o.__base.FE3dMeshRenderable.process.call(o);
   }
   MO.FE3dFace_dispose = function FE3dFace_dispose(){
      var o = this;
      o._material = RObject.dispoe(o._material);
      o.__base.FE3dMeshRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3dFaceData = function FE3dFaceData(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._ready                = false;
      o._size                 = RClass.register(o, new AGetter('_size'));
      o._adjustSize           = RClass.register(o, new AGetter('_adjustSize'));
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._indexBuffer          = null;
      o._texture              = null;
      o.construct             = FE3dFaceData_construct;
      o.testReady             = FE3dFaceData_testReady;
      o.setup                 = FE3dFaceData_setup;
      o.dispose               = FE3dFaceData_dispose;
      return o;
   }
   MO.FE3dFaceData_construct = function FE3dFaceData_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._size = new SSize2();
      o._adjustSize = new SSize2();
      o._material = RClass.create(FE3dMaterial);
   }
   MO.FE3dFaceData_testReady = function FE3dFaceData_testReady(){
      return this._ready;
   }
   MO.FE3dFaceData_setup = function FE3dFaceData_setup(){
      var o = this;
      var context = o._graphicContext;
      o._vertexCount = 4;
      var data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(data, 4 * 3, 4);
      var stream = RClass.create(FE3sStream);
      stream.setCode('position');
      stream._dataCount = 4;
      stream._data = data;
      buffer._resource = stream;
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 1, 1, 1, 0, 0, 0];
      var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(EG3dAttributeFormat.Float2);
      buffer.upload(data, 4 * 2, 4);
      var stream = RClass.create(FE3sStream);
      stream.setCode('coord');
      stream._dataCount = 4;
      stream._data = data;
      buffer._resource = stream;
      o.pushVertexBuffer(buffer);
      var data = [0, 1, 2, 0, 2, 3];
      var buffer = o._indexBuffer = context.createIndexBuffer();
      buffer.upload(data, 6);
      var stream = RClass.create(FE3sStream);
      stream.setCode('index16');
      stream._dataCount = 2;
      stream._data = data;
      buffer._resource = stream;
      o.pushIndexBuffer(buffer);
      var texture = o._texture = context.createFlatTexture();
      texture.setOptionFlipY(true);
      texture.setWrapCd(EG3dSamplerFilter.ClampToEdge, EG3dSamplerFilter.ClampToEdge);
      o.pushTexture(texture, 'diffuse');
      o._material.info().optionDouble = true;
      o._material._textures = o._textures;
   }
   MO.FE3dFaceData_dispose = function FE3dFaceData_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._adjustSize = RObject.dispose(o._adjustSize);
      o._texture = RObject.dispose(o._texture);
      o._vertexPositionBuffer = RObject.dispose(o._vertexPositionBuffer);
      o._vertexCoordBuffer = RObject.dispose(o._vertexCoordBuffer);
      o._indexBuffer = RObject.dispose(o._indexBuffer);
      o.__base.FE3dRenderable.dispose.call(o);
   }
}
with(MO){
   MO.FE3dPolygon = function FE3dPolygon(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      return o;
   }
}
with(MO){
   MO.FE3dRectangle = function FE3dRectangle(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o._indexBuffer          = null;
      o.setup                 = FE3dRectangle_setup;
      return o;
   }
   MO.FE3dRectangle_setup = function FE3dRectangle_setup(p){
      var o = this;
      var vp = [
         -1.0,  1.0, 0.0,
          1.0,  1.0, 0.0,
          1.0, -1.0, 0.0,
         -1.0, -1.0, 0.0 ];
      var buffer = o._vertexPositionBuffer = p.createVertexBuffer();
      buffer.upload(vp, 4 * 3, 4);
      o.pushVertexBuffer(buffer);
      var vc = [
         0.0, 1.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         1.0, 0.0, 0.0, 1.0,
         0.0, 0.0, 0.0, 1.0 ];
      var buffer = o._vertexColorBuffer = p.createVertexBuffer();
      buffer.upload(vc, 4 * 4, 4);
      o.pushVertexBuffer(buffer);
      var id = [0, 1, 2, 0, 2, 3];
      var buffer = context.createIndexBuffer();
      buffer.upload(id, 6);
      o.pushIndexBuffer(buffer);
   }
}
with(MO){
   MO.FE3dRuler = function FE3dRuler(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._style                = null;
      o._beginPoint           = null;
      o._endPoint             = null;
      o._direction            = null;
      o._directionLine        = null;
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o._vertexPositionData   = null;
      o._vertexColorData      = null;
      o._indexData            = null;
      o.construct             = FE3dRuler_construct;
      o.style                 = FE3dRuler_style;
      o.beginPoint            = FE3dRuler_beginPoint;
      o.endPoint              = FE3dRuler_endPoint;
      o.direction             = FE3dRuler_direction;
      o.setup                 = FE3dRuler_setup;
      o.upload                = FE3dRuler_upload;
      return o;
   }
   MO.FE3dRuler_construct = function FE3dRuler_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._style = new SE3dRulerStyle();
      o._beginPoint = new SPoint3(0, 0, 0);
      o._endPoint = new SPoint3(0, 10, 0);
      o._direction = new SVector3(1, 0, 0);
      o._directionLine = new SVector3();
      o._vertexPositionData = new TArray();
      o._vertexColorData = new TArray();
      o._indexData = new TArray();
   }
   MO.FE3dRuler_style = function FE3dRuler_style(){
      return this._style;
   }
   MO.FE3dRuler_beginPoint = function FE3dRuler_beginPoint(){
      return this._beginPoint;
   }
   MO.FE3dRuler_endPoint = function FE3dRuler_endPoint(){
      return this._endPoint;
   }
   MO.FE3dRuler_direction = function FE3dRuler_direction(){
      return this._direction;
   }
   MO.FE3dRuler_setup = function FE3dRuler_setup(){
      var o = this;
      var context = o._graphicContext;
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
      var indexBuffer = o._indexBuffer = context.createIndexBuffer();
      indexBuffer.setFillModeCd(EG3dFillMode.Line);
      indexBuffer.setLineWidth(1);
      o.pushIndexBuffer(indexBuffer);
      o.upload();
      o.update();
      var info = o.material().info();
      info.effectCode = 'control';
      info.ambientColor.set(1, 1, 1, 1);
   }
   MO.FE3dRuler_upload = function FE3dRuler_upload(){
      var o = this;
      var vertexCount = 0;
      var style = o._style;
      var positions = o._vertexPositionData;
      positions.clear();
      var colors = o._vertexColorData;
      colors.clear();
      var indexs = o._indexData;
      indexs.clear();
      var beginPoint = o._beginPoint;
      var endPoint = o._endPoint;
      positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
      colors.push(255, 255, 255, 255);
      vertexCount++;
      positions.push(endPoint.x, endPoint.y, endPoint.z);
      colors.push(255, 255, 255, 255);
      vertexCount++;
      indexs.push(0, 1);
      var bothLength = style.bothLength;
      var bothColor = style.bothColor;
      var direction = o._direction;
      var tickBeginPoint = new SPoint3();
      var tickEndPoint = new SPoint3();
      positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      tickEndPoint.x = direction.x * bothLength + beginPoint.x;
      tickEndPoint.y = direction.y * bothLength + beginPoint.y;
      tickEndPoint.z = direction.z * bothLength + beginPoint.z;
      positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      indexs.push(vertexCount, vertexCount + 1);
      vertexCount += 2;
      positions.push(endPoint.x, endPoint.y, endPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      tickEndPoint.x = direction.x * bothLength + endPoint.x;
      tickEndPoint.y = direction.y * bothLength + endPoint.y;
      tickEndPoint.z = direction.z * bothLength + endPoint.z;
      positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
      colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
      indexs.push(vertexCount, vertexCount + 1);
      vertexCount += 2;
      var lineDirection = o._directionLine.direction(beginPoint, o._endPoint);
      var length = lineDirection.length();
      lineDirection.normalize();
      var precisions = style.precisions;
      var count = precisions.count();
      for(var n = 0; n < count; n++){
         var precision = precisions.at(n);
         var tickInterval = precision.interval;
         var tickLength = precision.length;
         var tickColor = precision.color;
         for(var i = tickInterval; i < length; i += tickInterval){
            tickBeginPoint.x = lineDirection.x * i + beginPoint.x;
            tickBeginPoint.y = lineDirection.y * i + beginPoint.y;
            tickBeginPoint.z = lineDirection.z * i + beginPoint.z;
            positions.push(tickBeginPoint.x, tickBeginPoint.y, tickBeginPoint.z);
            colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
            tickEndPoint.x = direction.x * tickLength + tickBeginPoint.x;
            tickEndPoint.y = direction.y * tickLength + tickBeginPoint.y;
            tickEndPoint.z = direction.z * tickLength + tickBeginPoint.z;
            positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
            colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
            indexs.push(vertexCount, vertexCount + 1);
            vertexCount += 2;
         }
      }
      o._vertexPositionBuffer.upload(positions.memory(), 4 * 3, vertexCount);
      o._vertexColorBuffer.upload(colors.memory(), 1 * 4, vertexCount);
      indexBuffer.upload(indexs.memory(), indexs.length());
   }
}
with(MO){
   MO.FE3dRulerBox = function FE3dRulerBox(o){
      o = RClass.inherits(this, o, FE3dSprite);
      o._outline  = null;
      o._style    = null;
      o._rulerX   = null;
      o._rulerY   = null;
      o._rulerZ   = null;
      o.construct = FE3dRulerBox_construct;
      o.style     = FE3dRulerBox_style;
      o.outline   = FE3dRulerBox_outline;
      o.setup     = FE3dRulerBox_setup;
      o.upload    = FE3dRulerBox_upload;
      return o;
   }
   MO.FE3dRulerBox_construct = function FE3dRulerBox_construct(){
      var o = this;
      o.__base.FE3dSprite.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._style = new SE3dRulerStyle();
      o._outline = new SOutline3();
      var ruler = o._rulerX = RClass.create(FE3dRuler);
      o.pushRenderable(ruler);
      var ruler = o._rulerY = RClass.create(FE3dRuler);
      o.pushRenderable(ruler);
      var ruler = o._rulerZ = RClass.create(FE3dRuler);
      o.pushRenderable(ruler);
   }
   MO.FE3dRulerBox_style = function FE3dRulerBox_style(){
      return this._style;
   }
   MO.FE3dRulerBox_outline = function FE3dRulerBox_outline(){
      return this._outline;
   }
   MO.FE3dRulerBox_setup = function FE3dRulerBox_setup(){
      var o = this;
      var context = o._graphicContext;
      var style = o._style;
      o.matrix().setScaleAll(0.1);
      o.matrix().update();
      var outline = o._outline;
      var min = outline.min;
      var max = outline.max;
      var ruler = o._rulerX;
      ruler.linkGraphicContext(context);
      ruler.style().assign(style);
      ruler.beginPoint().assign(min);
      ruler.endPoint().set(max.x, min.y, min.z);
      ruler.direction().set(0, 0, -1);
      ruler.setup();
      var ruler = o._rulerY;
      ruler.linkGraphicContext(context);
      ruler.style().assign(style);
      ruler.beginPoint().assign(min);
      ruler.endPoint().set(min.x, max.y, min.z);
      ruler.direction().set(-1, 0, 0);
      ruler.setup();
      var ruler = o._rulerZ;
      ruler.linkGraphicContext(context);
      ruler.style().assign(style);
      ruler.beginPoint().assign(min);
      ruler.endPoint().set(min.x, min.y, max.z);
      ruler.direction().set(-1, 0, 0);
      ruler.setup();
   }
   MO.FE3dRulerBox_upload = function FE3dRulerBox_upload(){
      var o = this;
      o._rulerX.upload();
      o._rulerY.upload();
      o._rulerZ.upload();
   }
}
with(MO){
   MO.FE3dShape = function FE3dShape(o){
      o = RClass.inherits(this, o, FE3dFace);
      o.construct = FE3dShape_construct;
      o.testReady = FE3dShape_testReady;
      o.loadUrl   = FE3dShape_loadUrl;
      o.dispose   = FE3dShape_dispose;
      return o;
   }
   MO.FE3dShape_construct = function FE3dShape_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }
   MO.FE3dShape_testReady = function FE3dShape_testReady(){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            o._ready = renderable.testReady();
            if(o._ready){
               var size = renderable.size();
               var adjustSize = renderable.adjustSize();
               var matrix = o.matrix();
               matrix.sz = adjustSize.height / size.height;
               matrix.updateForce();
               var event = new SEvent(o);
               o.processLoadListener(event);
               event.dispose();
            }
            o._materialReference = renderable;
         }
      }
      return o._ready;
   }
   MO.FE3dShape_loadUrl = function FE3dShape_loadUrl(url){
      var o = this;
      var context = o._graphicContext;
      o._renderable = RConsole.find(FE3dShapeConsole).loadUrl(context, url);
      o._ready = false;
   }
   MO.FE3dShape_dispose = function FE3dShape_dispose(){
      var o = this;
      o.__base.FE3dFace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dShapeConsole = function FE3dShapeConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._bitmaps  = null;
      o.construct = FE3dShapeConsole_construct;
      o.bitmaps   = FE3dShapeConsole_bitmaps;
      o.load      = FE3dShapeConsole_load;
      o.loadUrl   = FE3dShapeConsole_loadUrl;
      return o;
   }
   MO.FE3dShapeConsole_construct = function FE3dShapeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._bitmaps = new TDictionary();
   }
   MO.FE3dShapeConsole_bitmaps = function FE3dShapeConsole_bitmaps(){
      return this._bitmaps;
   }
   MO.FE3dShapeConsole_load = function FE3dShapeConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var bitmap = o._bitmaps.get(flag);
      if(bitmap){
         return bitmap;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._bitmaps.set(flag, bitmap);
      return bitmap;
   }
   MO.FE3dShapeConsole_loadUrl = function FE3dShapeConsole_loadUrl(context, url){
      var o = this;
      var bitmap = o._bitmaps.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3dBitmapData);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._bitmaps.set(url, bitmap);
      return bitmap;
   }
}
with(MO){
   MO.FE3dShapeData = function FE3dShapeData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._graphic      = null;
      o._texture = null;
      o.construct     = FE3dShapeData_construct;
      o.beginDraw     = FE3dShapeData_beginDraw;
      o.endDraw       = FE3dShapeData_endDraw;
      o.dispose       = FE3dShapeData_dispose;
      return o;
   }
   MO.FE3dShapeData_construct = function FE3dShapeData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FE3dShapeData_beginDraw = function FE3dShapeData_beginDraw(url){
      var o = this;
      var size = o._size;
      var adjustWidth = RInteger.pow2(size.width);
      var adjustHeight = RInteger.pow2(size.height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var graphic = o._graphic = canvas.context();
      return graphic;
   }
   MO.FE3dShapeData_endDraw = function FE3dShapeData_endDraw(){
      var o = this;
      var graphic = o._graphic;
      MO.Assert.debugNotNull(graphic);
      o._texture.upload(o._canvas);
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      canvasConsole.free(graphic);
      o._graphic = null;
      o._ready = true;
   }
   MO.FE3dShapeData_dispose = function FE3dShapeData_dispose(){
      var o = this;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
with(MO){
   MO.FE3dSphere = function FE3dSphere(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._outline              = null;
      o._splitCount           = 8;
      o._vertexPositionBuffer = null;
      o._vertexColorBuffer    = null;
      o.construct             = FE3dSphere_construct;
      o.splitCount            = FE3dSphere_splitCount;
      o.setSplitCount         = FE3dSphere_setSplitCount;
      o.setup                 = FE3dSphere_setup;
      return o;
   }
   MO.FE3dSphere_construct = function FE3dSphere_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._outline = new SOutline3();
   }
   MO.FE3dSphere_splitCount = function FE3dSphere_splitCount(){
      return this._splitCount;
   }
   MO.FE3dSphere_setSplitCount = function FE3dSphere_setSplitCount(count){
      this._splitCount = count;
   }
   MO.FE3dSphere_setup = function FE3dSphere_setup(){
      var o = this;
      var context = o._graphicContext;
      var positions = new TArray();
      var normals = new TArray();
      var cr = o._splitCount * 2;
      var cz = o._splitCount;
      var stepr = Math.PI * 2 / cr;
      var stepz = Math.PI / cz;
      var count = 0;
      for(var rz = 0; rz <= cz; rz++){
         for(var r = 0; r < cr; r++){
            var radius = stepr * r - Math.PI;
            var radiusZ = stepz * rz - RConst.PI_2;
            var x = Math.sin(radius) * Math.cos(radiusZ);
            var y = Math.sin(radiusZ);
            var z = -Math.cos(radius) * Math.cos(radiusZ);
            positions.push(x, y, z);
            normals.push(x, y, z);
            count++;
         }
      }
      o._vertexCount = count;
      var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
      buffer.setCode('position');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(new Float32Array(positions.memory()), 4 * 3, count);
      o.pushVertexBuffer(buffer);
      var buffer = o._vertexColorBuffer = context.createVertexBuffer();
      buffer.setCode('normal');
      buffer.setFormatCd(EG3dAttributeFormat.Float3);
      buffer.upload(new Float32Array(normals.memory()), 4 * 3, count);
      o.pushVertexBuffer(buffer);
      var indexes = new TArray();
      for(var rz = 0; rz < cz; rz++){
         for(var r = 0; r < cr; r++){
            var i = cr * rz;
            var ci = i + r;
            var ni = i + r + cr;
            if(r == cr - 1){
               indexes.push(ci, ni, i);
               indexes.push(ni, i + cr, i);
            }else{
               indexes.push(ci, ni, ci + 1);
               indexes.push(ni, ni + 1, ci + 1);
            }
         }
      }
      var buffer = context.createIndexBuffer();
      buffer.upload(new Uint16Array(indexes.memory()), indexes.length());
      o.pushIndexBuffer(buffer);
      o.update();
      var info = o.material().info();
      info.ambientColor.set(0.2, 0.2, 0.2, 1);
      info.diffuseColor.set(0.8, 0.8, 0.8, 1);
      info.specularColor.set(0.8, 0.8, 0.8, 1);
      info.specularLevel = 64;
   }
}
with(MO){
   MO.FE3dVideo = function FE3dVideo(o){
      o = RClass.inherits(this, o, FE3dFace);
      o.construct = FE3dVideo_construct;
      o.testReady = FE3dVideo_testReady;
      o.loadUrl   = FE3dVideo_loadUrl;
      o.dispose   = FE3dVideo_dispose;
      return o;
   }
   MO.FE3dVideo_construct = function FE3dVideo_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }
   MO.FE3dVideo_testReady = function FE3dVideo_testReady(){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            o._ready = renderable.testReady();
            if(o._ready){
               var event = new SEvent(o);
               o.processLoadListener(event);
               event.dispose();
            }
            o._materialReference = renderable;
         }
      }
      return o._ready;
   }
   MO.FE3dVideo_loadUrl = function FE3dVideo_loadUrl(url){
      var o = this;
      var context = o._graphicContext;
      o._renderable = RConsole.find(FE3dVideoConsole).loadUrl(context, url);
      o._ready = false;
   }
   MO.FE3dVideo_dispose = function FE3dVideo_dispose(){
      var o = this;
      o.__base.FE3dFace.dispose.call(o);
   }
}
with(MO){
   MO.FE3dVideoConsole = function FE3dVideoConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd  = EScope.Local;
      o._videos   = null;
      o._dataUrl  = '/cloud.resource.bitmap.wv'
      o.construct = FE3dVideoConsole_construct;
      o.videos    = FE3dVideoConsole_videos;
      o.load      = FE3dVideoConsole_load;
      o.loadUrl   = FE3dVideoConsole_loadUrl;
      return o;
   }
   MO.FE3dVideoConsole_construct = function FE3dVideoConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._videos = new TDictionary();
   }
   MO.FE3dVideoConsole_videos = function FE3dVideoConsole_videos(){
      return this._videos;
   }
   MO.FE3dVideoConsole_load = function FE3dVideoConsole_load(context, guid, code){
      var o = this;
      var flag = guid + '|' + code;
      var bitmap = o._videos.get(flag);
      if(bitmap){
         return bitmap;
      }
      var url = RBrowser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
      MO.Logger.info(o, 'Load bitmap. (url={1})', url);
      if(code == 'environment'){
         bitmap = RClass.create(FE3rBitmapCubePack);
      }else{
         bitmap = RClass.create(FE3rBitmapFlatPack);
      }
      bitmap.linkGraphicContext(context);
      bitmap.loadUrl(url);
      o._videos.set(flag, bitmap);
      return bitmap;
   }
   MO.FE3dVideoConsole_loadUrl = function FE3dVideoConsole_loadUrl(context, url){
      var o = this;
      var bitmap = o._videos.get(url);
      if(bitmap){
         return bitmap;
      }
      var loadUrl = RBrowser.contentPath(url);
      MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
      var bitmap = RClass.create(FE3dVideoData);
      bitmap.linkGraphicContext(context);
      bitmap.setup();
      bitmap.loadUrl(url);
      o._videos.set(url, bitmap);
      return bitmap;
   }
}
with(MO){
   MO.FE3dVideoData = function FE3dVideoData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      o._hVideo      = null;
      o.ohVideoLoad  = FE3dVideoData_ohVideoLoad;
      o.ohVideoEnded = FE3dVideoData_ohVideoEnded;
      o.construct    = FE3dVideoData_construct;
      o.loadUrl      = FE3dVideoData_loadUrl;
      o.process      = FE3dVideoData_process;
      o.dispose      = FE3dVideoData_dispose;
      return o;
   }
   MO.FE3dVideoData_ohVideoLoad = function FE3dVideoData_ohVideoLoad(event){
      var o = this.__linker;
      var hVideo = o._hVideo;
      o._ready = true;
   }
   MO.FE3dVideoData_ohVideoEnded = function FE3dVideoData_ohVideoEnded(){
      var o = this.__linker;
      var hVideo = o._hVideo;
   }
   MO.FE3dVideoData_construct = function FE3dVideoData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }
   MO.FE3dVideoData_loadUrl = function FE3dVideoData_loadUrl(url){
      var o = this;
      var video = o._hVideo = document.createElement('VIDEO');
      video.__linker = o;
      video.autoplay = true;
      video.loop = true;
      video.src = url;
      video.addEventListener('canplay', o.ohVideoLoad);
      video.load();
      o._ready = false;
   }
   MO.FE3dVideoData_process = function FE3dVideoData_process(){
      var o = this;
      if(o._ready){
         o._texture.upload(o._hVideo);
      }
   }
   MO.FE3dVideoData_dispose = function FE3dVideoData_dispose(){
      var o = this;
      o._hVideo = null;
      o.__base.FE3dFaceData.dispose.call(o);
   }
}
