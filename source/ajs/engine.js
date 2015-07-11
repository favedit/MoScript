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
MO.MEventDispatcher = function MEventDispatcher(o){
   o = MO.Class.inherits(this, o);
   o.onOperationDown        = MO.Method.empty;
   o.onOperationMove        = MO.Method.empty;
   o.onOperationUp          = MO.Method.empty;
   o.onOperationResize      = MO.Method.empty;
   o.onOperationOrientation = MO.Method.empty;
   o.dispatcherEvent        = MO.MEventDispatcher_dispatcherEvent;
   return o;
}
MO.MEventDispatcher_dispatcherEvent = function MEventDispatcher_dispatcherEvent(event, flag){
   var o = this;
   switch(event.code){
      case MO.EEvent.MouseDown:
         o.onOperationDown(event);
         break;
      case MO.EEvent.MouseMove:
         o.onOperationMove(event);
         break;
      case MO.EEvent.MouseUp:
         o.onOperationUp(event);
         break;
      case MO.EEvent.Resize:
         o.onOperationResize(event);
         break;
      case MO.EEvent.Orientation:
         o.onOperationOrientation(event);
         break;
      default:
         throw new MO.TError('Unknown event type.');
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
MO.MTimelineAction = function MTimelineAction(o){
   o = MO.Class.inherits(this, o);
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._interval    = MO.Class.register(o, new MO.AGetSet('_interval'));
   o._statusStart = MO.Class.register(o, new MO.AGetter('_statusStart'), false);
   o._statusStop  = MO.Class.register(o, new MO.AGetter('_statusStop'), false);
   o.construct    = MO.MTimelineAction_construct;
   o.setup        = MO.MTimelineAction_setup;
   o.start        = MO.MTimelineAction_start;
   o.process      = MO.MTimelineAction_process;
   o.dispose      = MO.MTimelineAction_dispose;
   return o;
}
MO.MTimelineAction_construct = function MTimelineAction_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.MTimelineAction_setup = function MTimelineAction_setup(){
   var o = this;
}
MO.MTimelineAction_start = function MTimelineAction_start(){
   var o = this;
   o._statusStart = true;
   o._statusStop = false;
}
MO.MTimelineAction_process = function MTimelineAction_process(){
   var o = this;
}
MO.MTimelineAction_dispose = function MTimelineAction_dispose(){
   var o = this;
}
MO.MTimelineActions = function MTimelineActions(o){
   o = MO.Class.inherits(this, o);
   o._actions   = MO.Class.register(o, new MO.AGetter('_actions'));
   o.construct  = MO.MTimelineActions_construct;
   o.setup      = MO.MTimelineActions_setup;
   o.pushAction = MO.MTimelineActions_pushAction;
   o.process    = MO.MTimelineActions_process;
   o.dispose    = MO.MTimelineActions_dispose;
   return o;
}
MO.MTimelineActions_construct = function MTimelineActions_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._actions = new MO.TObjects();
}
MO.MTimelineActions_setup = function MTimelineActions_setup(){
   var o = this;
}
MO.MTimelineActions_pushAction = function MTimelineActions_pushAction(action){
   this._actions.push(action);
}
MO.MTimelineActions_process = function MTimelineActions_process(context){
   var o = this;
   var actions = o._actions;
   var count = actions.count();
   for(var i = count - 1; i >= 0; i--){
      var action = actions.at(i);
      if(!action.statusStart()){
         action.start();
      }else if(action.statusStop()){
         actions.erase(i);
         action.dispose();
      }else{
         action.process(context);
      }
   }
}
MO.MTimelineActions_dispose = function MTimelineActions_dispose(){
   var o = this;
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   o.__base.FObject.dispose.call(o);
}
MO.STimelineContext = function STimelineContext(){
   var o = this;
   o._mainTimeline = null;
   o._timeline     = null;
   o._action       = null;
   return o;
}
MO.FCanvas = function FCanvas(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._desktop     = MO.Class.register(o, new MO.AGetSet('_desktop'));
   o._activeStage = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o.construct    = MO.FCanvas_construct;
   o.dispose      = MO.FCanvas_dispose;
   return o;
}
MO.FCanvas_construct = function FCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FCanvas_dispose = function FCanvas_dispose(){
   var o = this;
   o._desktop = null;
   o.__base.FObject.dispose.call(o);
}
MO.FDesktop = function FDesktop(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MEventDispatcher);
   o._size            = MO.Class.register(o, new MO.AGetter('_size'));
   o._sizeRate        = MO.Class.register(o, new MO.AGetter('_sizeRate'), 1);
   o._calculateSize   = MO.Class.register(o, new MO.AGetter('_calculateSize'));
   o._calculateRate   = MO.Class.register(o, new MO.AGetter('_calculateRate'));
   o._logicSize       = MO.Class.register(o, new MO.AGetter('_logicSize'));
   o._logicRate       = MO.Class.register(o, new MO.AGetter('_logicRate'));
   o._screenSize      = MO.Class.register(o, new MO.AGetter('_screenSize'));
   o._canvases        = MO.Class.register(o, new MO.AGetter('_canvases'));
   o.construct        = MO.FDesktop_construct;
   o.canvasRegister   = MO.FDesktop_canvasRegister;
   o.canvasUnregister = MO.FDesktop_canvasUnregister;
   o.setup            = MO.FDesktop_setup;
   o.build            = MO.FDesktop_build;
   o.resize           = MO.FDesktop_resize;
   o.processEvent     = MO.FDesktop_processEvent;
   o.process          = MO.FDesktop_process;
   o.dispose          = MO.FDesktop_dispose;
   return o;
}
MO.FDesktop_construct = function FDesktop_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
   o._calculateSize = new MO.SSize2(1280, 720);
   o._calculateRate = new MO.SSize2(1, 1);
   o._logicSize = new MO.SSize2(1280, 720);
   o._logicRate = new MO.SSize2(1, 1);
   o._screenSize = new MO.SSize2(1280, 720);
   o._canvases = new MO.TObjects();
}
MO.FDesktop_canvasRegister = function FDesktop_canvasRegister(canvas){
   var canvases = this._canvases;
   MO.Assert.debugFalse(canvases.contains(canvas));
   canvases.push(canvas);
}
MO.FDesktop_canvasUnregister = function FDesktop_canvasUnregister(canvas){
   var canvases = this._canvases;
   MO.Assert.debugTrue(canvases.contains(canvas));
   canvases.remove(canvas);
}
MO.FDesktop_setup = function FDesktop_setup(hPanel){
   var o = this;
}
MO.FDesktop_build = function FDesktop_build(hPanel){
   var o = this;
}
MO.FDesktop_resize = function FDesktop_resize(){
   var o = this;
}
MO.FDesktop_processEvent = function FDesktop_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
}
MO.FDesktop_process = function FDesktop_process(){
   var o = this;
}
MO.FDesktop_dispose = function FDesktop_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._calculateSize = RObject.dispose(o._calculateSize);
   o._logicSize = RObject.dispose(o._logicSize);
   o._logicRate = RObject.dispose(o._logicRate);
   o._screenSize = RObject.dispose(o._screenSize);
   o._canvases = RObject.dispose(o._canvases);
   o.__base.FObject.dispose.call(o);
}
with(MO){
   MO.FDisplay = function FDisplay(o){
      o = RClass.inherits(this, o, FComponent, MGraphicObject);
      o._currentMatrix    = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
      o._matrix           = MO.Class.register(o, new MO.AGetter('_matrix'));
      o._location         = MO.Class.register(o, new MO.AGetter('_location'));
      o._rotation         = MO.Class.register(o, new MO.AGetter('_rotation'));
      o._scale            = MO.Class.register(o, new MO.AGetter('_scale'));
      o._visible          = true;
      o._renderables      = null;
      o.construct         = FDisplay_construct;
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
MO.FDisplayLayer = function FDisplayLayer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayContainer);
   o._optionClearDepth   = MO.Class.register(o, new MO.AGetSet('_optionClearDepth'), false);
   o._statusActive       = false;
   o._technique          = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._visibleRenderables = MO.Class.register(o, new MO.AGetter('_visibleRenderables'));
   o.construct           = MO.FDisplayLayer_construct;
   o.selectTechnique     = MO.FDisplayLayer_selectTechnique;
   o.filterRenderables   = MO.FDisplayLayer_filterRenderables;
   o.active              = MO.FDisplayLayer_active;
   o.deactive            = MO.FDisplayLayer_deactive;
   return o;
}
MO.FDisplayLayer_construct = function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._visibleRenderables = new MO.TObjects();
}
MO.FDisplayLayer_selectTechnique = function FDisplayLayer_selectTechnique(context, name){
   var technique = MO.Console.find(MO.FG3dTechniqueConsole).find(context, name);
   this.selectTechnique(technique);
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
MO.FDisplayUiLayer = function FDisplayUiLayer(o){
   o = MO.Class.inherits(this, o, MO.FDisplayLayer);
   return o;
}
MO.FDrawable = function FDrawable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._visible    = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o.testVisible = MO.FDrawable_testVisible;
   o.process     = MO.Method.empty;
   return o;
}
MO.FDrawable_testVisible = function FDrawable_testVisible(){
   return this._visible;
}
MO.FMainTimeline = function FMainTimeline(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions);
   o._context   = null;
   o._timelines = MO.Class.register(o, new MO.AGetter('_timelines'));
   o._startTick = 0;
   o._lastTick  = 0;
   o._interval  = 0;
   o.construct  = MO.FMainTimeline_construct;
   o.setup      = MO.FMainTimeline_setup;
   o.start      = MO.FMainTimeline_start;
   o.process    = MO.FMainTimeline_process;
   o.dispose    = MO.FMainTimeline_dispose;
   return o;
}
MO.FMainTimeline_construct = function FMainTimeline_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineActions.construct.call(o);
   o._context = new MO.STimelineContext();
   o._timelines = new MO.TObjects();
}
MO.FMainTimeline_setup = function FMainTimeline_setup(){
   var o = this;
}
MO.FMainTimeline_start = function FMainTimeline_start(){
   var o = this;
}
MO.FMainTimeline_process = function FMainTimeline_process(){
   var o = this;
   var tick = MO.Timer.current();
   if(tick - o._lastTick < o._interval){
      return false;
   }
   o._lastTick = tick;
   if(o._startTick == 0){
      o._startTick = tick;
   }
   var span = o._startTick - tick;
   var context = o._context;
   context.span = span;
   o.__base.MTimelineActions.process.call(o, context);
   var timelines = o._timelines;
   var count = timelines.count();
   for(var i = 0; i < count; i++){
      var timeline = timelines.at(i);
      timeline.process(context);
   }
}
MO.FMainTimeline_dispose = function FMainTimeline_dispose(){
   var o = this;
   o._timelines = MO.Lang.Object.dispose(o._timelines);
   o._context = MO.Lang.Object.dispose(o._context);
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FRegion = function FRegion(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
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
      o = RClass.inherits(this, o, FComponent, MListener);
      o._code                = 'stage';
      o._statusActive        = false;
      o._size                = RClass.register(o, new AGetter('_size'));
      o._timer               = RClass.register(o, new AGetter('_timer'));
      o._layers              = RClass.register(o, new AGetter('_layers'));
      o._enterFrameListeners = RClass.register(o, new AListener('_enterFrameListeners', EEvent.EnterFrame));
      o._leaveFrameListeners = RClass.register(o, new AListener('_leaveFrameListeners', EEvent.LeaveFrame));
      o.onProcess            = FStage_onProcess;
      o.construct            = FStage_construct;
      o.registerLayer        = FStage_registerLayer;
      o.unregisterLayer      = FStage_unregisterLayer;
      o.active               = FStage_active;
      o.deactive             = FStage_deactive;
      o.process              = FStage_process;
      o.dispose              = FStage_dispose;
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
      o._size = new SSize2(1920, 1080);
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
      o.__base.MListener.dispose.call(o);
      o.__base.FComponent.dispose.call(o);
   }
}
MO.FTimeline = function FTimeline(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions);
   o._mainTimeline = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   o._actions      = MO.Class.register(o, new MO.AGetter('_actions'));
   o.construct     = MO.FTimeline_construct;
   o.setup         = MO.FTimeline_setup;
   o.process       = MO.FTimeline_process;
   o.dispose       = MO.FTimeline_dispose;
   return o;
}
MO.FTimeline_construct = function FTimeline_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineActions.construct.call(o);
   o._actions = new MO.TObejcts();
}
MO.FTimeline_setup = function FTimeline_setup(){
   var o = this;
}
MO.FTimeline_process = function FTimeline_process(context){
   var o = this;
   o.__base.MTimelineActions.process.call(o, context);
}
MO.FTimeline_dispose = function FTimeline_dispose(){
   var o = this;
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
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
