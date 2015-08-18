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
   o.onOperationWheel       = MO.Method.empty;
   o.onOperationKeyDown     = MO.Method.empty;
   o.onOperationKeyPress    = MO.Method.empty;
   o.onOperationKeyUp       = MO.Method.empty;
   o.onOperationResize      = MO.Method.empty;
   o.onOperationVisibility  = MO.Method.empty;
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
      case MO.EEvent.MouseWheel:
         o.onOperationWheel(event);
         break;
      case MO.EEvent.KeyDown:
         o.onOperationKeyDown(event);
         break;
      case MO.EEvent.KeyPress:
         o.onOperationKeyPress(event);
         break;
      case MO.EEvent.KeyUp:
         o.onOperationKeyUp(event);
         break;
      case MO.EEvent.Resize:
         o.onOperationResize(event);
         break;
      case MO.EEvent.Visibility:
         o.onOperationVisibility(event);
         break;
      case MO.EEvent.Orientation:
         o.onOperationOrientation(event);
         break;
      default:
         throw new MO.TError('Unknown event type.');
   }
}
MO.MReady = function MReady(o){
   o = MO.Class.inherits(this, o);
   o.testReady = MO.Method.virtual(o, 'testReady');
   return o;
}
MO.MRenderableLinker = function MRenderableLinker(o){
   o = MO.Class.inherits(this, o);
   o._renderable = MO.RClass.register(o, new MO.AGetter('_renderable'));
   o.dispose     = MO.MRenderableLinker_dispose;
   return o;
}
MO.MRenderableLinker_dispose = function MRenderableLinker_dispose(){
   var o = this;
   o._renderable = null;
}
MO.MResourceData = function MResourceData(o){
   o = MO.Class.inherits(this, o);
   o._ready          = false;
   o._guid           = null;
   o._index          = -1;
   o._compressData   = MO.Class.register(o, new MO.AGetSet('_compressData'));
   o._data           = null;
   o.testReady       = MO.MResourceData_testReady;
   o.completeData    = MO.MResourceData_completeData;
   o.dispose         = MO.MResourceData_dispose;
   return o;
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
MO.MTimeline = function MTimeline(o){
   o = MO.Class.inherits(this, o, MO.MTimelineWorker);
   return o;
}
MO.MTimelineAction = function MTimelineAction(o){
   o = MO.Class.inherits(this, o, MO.MTimelineWorker);
   return o;
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
   var tick = context.tick;
   var actions = o._actions;
   var count = actions.count();
   for(var i = count - 1; i >= 0; i--){
      var action = actions.at(i);
      var actionTick = tick - action.tick;
      if(actionTick < 0){
         continue;
      }
      if(!action.statusStart()){
         action.start();
      }else if(action.statusStop()){
         actions.erase(i);
         action.dispose();
      }else{
         var duration = action.duration();
         if(duration != 0){
            if(actionTick > duration){
               action.stop();
               continue;
            }
         }
         context.tick = actionTick;
         action.process(context);
      }
   }
   context.tick = tick;
}
MO.MTimelineActions_dispose = function MTimelineActions_dispose(){
   var o = this;
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   o.__base.FObject.dispose.call(o);
}
MO.MTimelines = function MTimelines(o){
   o = MO.Class.inherits(this, o);
   o._timelines   = MO.Class.register(o, new MO.AGetter('_timelines'));
   o.construct    = MO.MTimelines_construct;
   o.setup        = MO.MTimelines_setup;
   o.pushTimeline = MO.MTimelines_pushTimeline;
   o.process      = MO.MTimelines_process;
   o.dispose      = MO.MTimelines_dispose;
   return o;
}
MO.MTimelines_construct = function MTimelines_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._timelines = new MO.TObjects();
}
MO.MTimelines_setup = function MTimelines_setup(){
   var o = this;
}
MO.MTimelines_pushTimeline = function MTimelines_pushTimeline(timeline){
   this._timelines.push(timeline);
}
MO.MTimelines_process = function MTimelines_process(context){
   var o = this;
   var tick = context.tick;
   var timelines = o._timelines;
   var count = timelines.count();
   for(var i = count - 1; i >= 0; i--){
      var timeline = timelines.at(i);
      var timelineTick = tick - timeline.tick;
      if(timelineTick < 0){
         continue;
      }
      if(!timeline.statusStart()){
         timeline.start();
      }else if(timeline.statusStop()){
         timelines.erase(i);
         timeline.dispose();
      }else{
         var duration = timeline.duration();
         if(duration != 0){
            if(timelineTick > duration){
               timeline.stop();
               continue;
            }
         }
         context.tick = timelineTick;
         timeline.process(context);
      }
   }
   context.tick = tick;
}
MO.MTimelines_dispose = function MTimelines_dispose(){
   var o = this;
   o._timelines = MO.Lang.Obejct.dispose(o._timelines);
   o.__base.FObject.dispose.call(o);
}
MO.MTimelineWorker = function MTimelineWorker(o){
   o = MO.Class.inherits(this, o);
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._tick        = MO.Class.register(o, new MO.AGetSet('_tick'), 0);
   o._duration    = MO.Class.register(o, new MO.AGetSet('_duration'), 0);
   o._statusStart = MO.Class.register(o, new MO.AGetter('_statusStart'), false);
   o._statusStop  = MO.Class.register(o, new MO.AGetter('_statusStop'), false);
   o.onStart      = MO.MTimelineWorker_onStart;
   o.onStop       = MO.MTimelineWorker_onStop;
   o.construct    = MO.MTimelineWorker_construct;
   o.setup        = MO.MTimelineWorker_setup;
   o.start        = MO.MTimelineWorker_start;
   o.process      = MO.MTimelineWorker_process;
   o.stop         = MO.MTimelineWorker_stop;
   o.dispose      = MO.MTimelineWorker_dispose;
   return o;
}
MO.MTimelineWorker_onStart = function MTimelineWorker_onStart(){
   var o = this;
}
MO.MTimelineWorker_onStop = function MTimelineWorker_onStop(){
   var o = this;
}
MO.MTimelineWorker_construct = function MTimelineWorker_construct(){
   var o = this;
}
MO.MTimelineWorker_setup = function MTimelineWorker_setup(){
   var o = this;
   o._statusStart = false;
}
MO.MTimelineWorker_start = function MTimelineWorker_start(){
   var o = this;
   if(!o._statusStart){
      o.onStart();
      o._statusStart = true;
   }
   o._statusStop = false;
}
MO.MTimelineWorker_process = function MTimelineWorker_process(){
   var o = this;
}
MO.MTimelineWorker_stop = function MTimelineWorker_stop(){
   var o = this;
   if(!o._statusStop){
      o.onStop();
      o._statusStop = true;
   }
}
MO.MTimelineWorker_dispose = function MTimelineWorker_dispose(){
   var o = this;
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
   canvases.push(canvas);
}
MO.FDesktop_canvasUnregister = function FDesktop_canvasUnregister(canvas){
   var canvases = this._canvases;
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
   o._size = MO.Lang.Object.dispose(o._size);
   o._calculateSize = MO.Lang.Object.dispose(o._calculateSize);
   o._logicSize = MO.Lang.Object.dispose(o._logicSize);
   o._logicRate = MO.Lang.Object.dispose(o._logicRate);
   o._screenSize = MO.Lang.Object.dispose(o._screenSize);
   o._canvases = MO.Lang.Object.dispose(o._canvases);
   o.__base.FObject.dispose.call(o);
}
MO.FDisplay = function FDisplay(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MGraphicObject);
   o._currentMatrix    = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix           = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._location         = MO.Class.register(o, new MO.AGetter('_location'));
   o._rotation         = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale            = MO.Class.register(o, new MO.AGetter('_scale'));
   o._visible          = true;
   o._renderables      = null;
   o.construct         = MO.FDisplay_construct;
   o.hasRenderable     = MO.FDisplay_hasRenderable;
   o.renderables       = MO.FDisplay_renderables;
   o.pushRenderable    = MO.FDisplay_pushRenderable;
   o.removeRenderable  = MO.FDisplay_removeRenderable;
   o.clearRenderables  = MO.FDisplay_clearRenderables;
   o.push              = MO.FDisplay_push;
   o.remove            = MO.FDisplay_remove;
   o.filterDisplays    = MO.FDisplay_filterDisplays;
   o.filterRenderables = MO.FDisplay_filterRenderables;
   o.show              = MO.FDisplay_show;
   o.hide              = MO.FDisplay_hide;
   o.setVisible        = MO.FDisplay_setVisible;
   o.update            = MO.FDisplay_update;
   o.updateMatrix      = MO.FDisplay_updateMatrix;
   o.process           = MO.FDisplay_process;
   o.dispose           = MO.FDisplay_dispose;
   return o;
}
MO.FDisplay_construct = function FDisplay_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
   o._location = new MO.SPoint3();
   o._rotation = new MO.SVector3();
   o._scale = new MO.SVector3(1, 1, 1);
}
MO.FDisplay_hasRenderable = function FDisplay_hasRenderable(){
   var renderables = this._renderables;
   return renderables ? !renderables.isEmpty() : false;
}
MO.FDisplay_renderables = function FDisplay_renderables(){
   var o = this;
   var renderables = o._renderables;
   if(!renderables){
      renderables = o._renderables = new MO.TObjects();
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
   if(MO.Class.isClass(item, MO.FRenderable)){
      o.pushRenderable(item);
   }else if(MO.Class.isClass(item, MO.MRenderableLinker)){
      o.pushRenderable(item.renderable());
   }else if(MO.Class.isClass(item, MO.FDisplay)){
      o.pushDisplay(item);
   }else{
      throw new MO.TError(o, 'Unknown item type.');
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
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._direction = MO.Lang.Object.dispose(o._direction);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o._renderables = MO.Lang.Object.dispose(o._renderables);
   o.__base.FComponent.dispose.call(o);
}
MO.FDisplayContainer = function FDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FDisplay);
   o._displays         = null;
   o.hasDisplay        = MO.FDisplayContainer_hasDisplay;
   o.findDisplay       = MO.FDisplayContainer_findDisplay;
   o.searchDisplay     = MO.FDisplayContainer_searchDisplay;
   o.displays          = MO.FDisplayContainer_displays;
   o.pushDisplay       = MO.FDisplayContainer_pushDisplay;
   o.removeDisplay     = MO.FDisplayContainer_removeDisplay;
   o.filterDisplays    = MO.FDisplayContainer_filterDisplays;
   o.filterRenderables = MO.FDisplayContainer_filterRenderables;
   o.process           = MO.FDisplayContainer_process;
   o.dispose           = MO.FDisplayContainer_dispose;
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
      displays = o._displays = new MO.TObjects();
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
      o._displays = MO.Lang.Object.dispose(displays);
   }
   o.__base.FDisplay.dispose.call(o);
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
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions, MO.MTimeline, MO.MTimelines);
   o._context   = null;
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
   var context = o._context;
   context.tick = o._startTick - tick;
   o.__base.MTimelineActions.process.call(o, context);
   o.__base.MTimelines.process.call(o, context);
}
MO.FMainTimeline_dispose = function FMainTimeline_dispose(){
   var o = this;
   o._timelines = MO.Lang.Object.dispose(o._timelines);
   o._context = MO.Lang.Object.dispose(o._context);
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FReadyLoader = function FReadyLoader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   o._items           = MO.Class.register(o, new MO.AGetter('_items'));
   o._listenersChange = MO.Class.register(o, new MO.AListener('_listenersChange', MO.EEvent.Change));
   o._statusEvent     = null;
   o._statusReady     = false;
   o.construct        = MO.FReadyLoader_construct;
   o.testReady        = MO.FReadyLoader_testReady;
   o.push             = MO.FReadyLoader_push;
   o.clear            = MO.FReadyLoader_clear;
   o.dispose          = MO.FReadyLoader_dispose;
   return o;
}
MO.FReadyLoader_construct = function FReadyLoader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._items = new MO.TObjects();
   o._statusEvent = new MO.SEvent();
}
MO.FReadyLoader_testReady = function FReadyLoader_testReady(){
   var o = this;
   var ready = o._statusReady;
   if(!ready){
      var items = o._items;
      var count = items.count();
      for(var i = 0; i < count; i++){
         var item = items.at(i);
         if(!item.testReady()){
            return false;
         }
      }
      var event = o._statusEvent;
      event.ready = true;
      o.processChangeListener(event);
      ready = o._statusReady = true;
   }
   return ready;
}
MO.FReadyLoader_push = function FReadyLoader_push(item){
   var o = this;
   o._items.push(item);
   o._statusReady = false;
}
MO.FReadyLoader_clear = function FReadyLoader_clear(){
   var o = this;
   o._items.clear();
   o._statusReady = true;
}
MO.FReadyLoader_dispose = function FReadyLoader_dispose(){
   var o = this;
   o._items = MO.Lang.Object.dispose(o._items);
   o._statusEvent = MO.Lang.Object.dispose(o._statusEvent);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FRegion = function FRegion(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
MO.FRenderable = function FRenderable(o){
   o = MO.Class.inherits(this, o, MO.FDrawable);
   o._drawables      = null;
   o.hasDrawable     = MO.FRenderable_hasDrawable;
   o.drawables       = MO.FRenderable_drawables;
   o.pushDrawable    = MO.FRenderable_pushDrawable;
   o.removeDrawable  = MO.FRenderable_removeDrawable;
   o.filterDrawables = MO.FRenderable_filterDrawables;
   o.process         = MO.FRenderable_process;
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
      drawables = o._drawables = new MO.TObjects();
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
MO.FStage = function FStage(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MListener);
   o._code                = 'stage';
   o._statusActive        = false;
   o._size                = MO.Class.register(o, new MO.AGetter('_size'));
   o._timer               = MO.Class.register(o, new MO.AGetter('_timer'));
   o._layers              = MO.Class.register(o, new MO.AGetter('_layers'));
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   o.onProcess            = MO.FStage_onProcess;
   o.construct            = MO.FStage_construct;
   o.registerLayer        = MO.FStage_registerLayer;
   o.unregisterLayer      = MO.FStage_unregisterLayer;
   o.active               = MO.FStage_active;
   o.deactive             = MO.FStage_deactive;
   o.process              = MO.FStage_process;
   o.dispose              = MO.FStage_dispose;
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
   o._size = new MO.SSize2(1920, 1080);
   o._timer = MO.Class.create(MO.FTimer);
   o._layers = new MO.TDictionary();
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
      timer = MO.Class.create(MO.FTimer);
      timer.setup();
   }
   o.processEnterFrameListener(o);
   o.onProcess();
   o.processLeaveFrameListener(o);
   timer.update();
}
MO.FStage_dispose = function FStage_dispose(){
   var o = this;
   o._timer = MO.Lang.Object.dispose(o._timer);
   o._layers = MO.Lang.Object.dispose(o._layers);
   o.__base.MListener.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
MO.FTimeline = function FTimeline(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions, MO.MTimeline, MO.MTimelines);
   o._mainTimeline = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
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
   o.__base.MTimelines.process.call(o, context);
}
MO.FTimeline_dispose = function FTimeline_dispose(){
   var o = this;
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
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
      MO.Timer.update();
   }catch(e){
      alert(e);
   }
}
MO.RStage.prototype.construct = function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new MO.TListeners();
   o.lsnsLeaveFrame = new MO.TListeners();
}
MO.RStage.prototype.register = function RStage_register(name, stage){
   var o = this;
   var stages = o._stages;
   if(!stages){
      stages = o._stages = new MO.TDictionary();
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
   MO.RE3dEngine.setup();
   o.active();
   MO.Timer.setup();
   if(interval == null){
      interval = o._interval;
   }
   o._interval = parseInt(interval);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
   o._started = true;
}
MO.RStage = new MO.RStage();
