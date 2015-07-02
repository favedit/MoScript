MO.FGuiCanvasManager = function FGuiCanvasManager(o){
   o = MO.Class.inherits(this, o, MO.FGuiManager);
   o._size             = MO.Class.register(o, new MO.AGetter('_size'));
   o._calculateRate    = MO.Class.register(o, new MO.AGetter('_calculateRate'));
   o._sizeRate         = MO.Class.register(o, new MO.AGetter('_sizeRate'));
   o._logicRate        = MO.Class.register(o, new MO.AGetter('_logicRate'));
   o._canvas           = MO.Class.register(o, new MO.AGetSet('_canvas'));
   o.onOperationResize = MO.FGuiCanvasManager_onOperationResize;
   o.construct         = MO.FGuiCanvasManager_construct;
   o.processResize     = MO.FGuiCanvasManager_processResize;
   o.processControl    = MO.FGuiCanvasManager_processControl;
   o.process           = MO.FGuiCanvasManager_process;
   o.dispose           = MO.FGuiCanvasManager_dispose;
   return o;
}
MO.FGuiCanvasManager_onOperationResize = function FGuiCanvasManager_onOperationResize(event){
   var o = this;
}
MO.FGuiCanvasManager_construct = function FGuiCanvasManager_construct(){
   var o = this;
   o.__base.FGuiManager.construct.call(o);
   o._size = new MO.SSize2();
   o._calculateRate = new MO.SSize2();
}
MO.FGuiCanvasManager_processResize = function FGuiCanvasManager_processResize(control){
}
MO.FGuiCanvasManager_processControl = function FGuiCanvasManager_processControl(control){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   if(!control.testReady()){
   }
   if(!control.testDirty()){
   }
   var graphic = o._canvas.context();
   var event = MO.Memory.alloc(MO.SGuiPaintEvent)
   event.optionContainer = true;
   event.graphic = graphic;
   event.parentRectangle.set(0, 0, o._size.width, o._size.height);
   event.calculateRate = o._calculateRate;
   event.clientRectangle.set(control.location().x, control.location().y, control.size().width, control.size().height);
   event.rectangle.reset();
   control.paint(event);
   MO.Memory.free(event);
   return true;
}
MO.FGuiCanvasManager_process = function FGuiCanvasManager_process(){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var desktop = MO.Desktop.activeDesktop();
   o._size.assign(desktop.logicSize());
   o._calculateRate.assign(desktop.calculateRate());
   var graphic = o._canvas.context();
   graphic.clear();
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      if(control.visible()){
         o.processControl(control);
      }
   }
}
MO.FGuiCanvasManager_dispose = function FGuiCanvasManager_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o.__base.FGuiManager.dispose.call(o);
}
MO.FGuiChangeTransform = function FGuiChangeTransform(o){
   o = MO.Class.inherits(this, o, MO.FGuiTransform);
   o._changeCd      = MO.Class.register(o, new MO.AGetSet('_changeCd'));
   o._interval      = MO.Class.register(o, new MO.AGetSet('_interval'));
   o._scale         = MO.Class.register(o, new MO.AGetSet('_scale'));
   o._sourceControl = MO.Class.register(o, new MO.AGetSet('_sourceControl'));
   o._targetControl = MO.Class.register(o, new MO.AGetSet('_targetControl'));
   o._sourceRectangle = null;
   o._targetRectangle = null;
   o._current         = 0;
   o._middleCount     = 100;
   o._endCount        = 200;
   o.construct      = MO.FGuiChangeTransform_construct;
   o.start          = MO.FGuiChangeTransform_start;
   o.process        = MO.FGuiChangeTransform_process;
   o.dispose        = MO.FGuiChangeTransform_dispose;
   return o;
}
MO.FGuiChangeTransform_construct = function FGuiChangeTransform_construct(){
   var o = this;
   o.__base.FGuiTransform.construct.call(o);
   o._sourceRectangle = new MO.SRectangle();
   o._targetRectangle = new MO.SRectangle();
}
MO.FGuiChangeTransform_start = function FGuiChangeTransform_start(){
   var o = this;
   o.__base.FGuiTransform.start.call(o);
   o._current = 0;
   var control = o._sourceControl;
   o._sourceRectangle.set(control.location().x, control.location().y, control.size().width, control.size().height);
   var control = o._targetControl;
   o._targetRectangle.set(control.location().x, control.location().y, control.size().width, control.size().height);
}
MO.FGuiChangeTransform_process = function FGuiChangeTransform_process(){
   var o = this;
   var sourceControl = o._sourceControl;
   var targetControl = o._targetControl;
   if(o._current < o._middleCount){
      var index = o._middleCount - o._current;
      var rate = index / o._middleCount;
      sourceControl.size().set(o._sourceRectangle.width * rate, o._sourceRectangle.height * rate);
   }else if(o._current == o._middleCount){
      sourceControl.setVisible(false);
      targetControl.setVisible(true);
   }else if(o._current > o._middleCount){
      var index = o._endCount - o._current;
      var rate = index / o._middleCount;
      targetControl.size().set(o._sourceRectangle.width * rate, o._sourceRectangle.height * rate);
   }else if(o._current == o._endCount){
      sourceControl.setLocation(o._targetRectangle.left, o._targetRectangle.top);
      sourceControl.setSize(o._targetRectangle.width, o._targetRectangle.height);
      targetControl.setLocation(o._sourceRectangle.left, o._sourceRectangle.top);
      targetControl.setSize(o._sourceRectangle.width, o._sourceRectangle.height);
      o._finish = true;
   }
   o._current++;
}
MO.FGuiChangeTransform_dispose = function FGuiChangeTransform_dispose(){
   var o = this;
   o.__base.FGuiTransform.dispose.call(o);
}
with(MO){
   MO.FGuiFrameConsole = function FGuiFrameConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd         = EScope.Local;
      o._frames          = null;
      o.construct        = FGuiFrameConsole_construct;
      o.createFrame      = FGuiFrameConsole_createFrame;
      o.create           = FGuiFrameConsole_create;
      o.find             = FGuiFrameConsole_find;
      o.get              = FGuiFrameConsole_get;
      o.alloc            = FGuiFrameConsole_alloc;
      o.free             = FGuiFrameConsole_free;
      o.dispose          = FGuiFrameConsole_dispose;
      return o;
   }
   MO.FGuiFrameConsole_construct = function FGuiFrameConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._frames = new TDictionary();
   }
   MO.FGuiFrameConsole_createFrame = function FGuiFrameConsole_createFrame(context, control, name){
      var o = this;
      var describeConsole = RConsole.find(FGuiFrameDescribeConsole);
      var xframe = describeConsole.load(name);
      var frame = RGuiControl.build(null, xframe, null, null);
      frame.linkGraphicContext(context);
      frame.psInitialize();
      frame.build();
      return frame;
   }
   MO.FGuiFrameConsole_create = function FGuiFrameConsole_create(context, name){
      var o = this;
      var frame = o.createFrame(context, null, name);
      return frame;
   }
   MO.FGuiFrameConsole_find = function FGuiFrameConsole_find(name){
      return this._frames.get(name);
   }
   MO.FGuiFrameConsole_get = function FGuiFrameConsole_get(context, name){
      var o = this;
      var frames = o._frames;
      var frame = frames.get(name);
      if(!frame){
         frame = o.createFrame(context, null, name);
         frames.set(name, frame);
      }
      return frame;
   }
   MO.FGuiFrameConsole_alloc = function FGuiFrameConsole_alloc(f){
   }
   MO.FGuiFrameConsole_free = function FGuiFrameConsole_free(f){
      f.setVisible(false);
      this._freeFrames.push(f);
   }
   MO.FGuiFrameConsole_dispose = function FGuiFrameConsole_dispose(){
      var o = this;
      o._frames = RObject.dispose(o._frames, true);
      o.__base.FConsole.construct.call(o);
   }
}
with(MO){
   MO.FGuiFrameDescribeConsole = function FGuiFrameDescribeConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._scopeCd     = EScope.Global;
      o._serviceCode = 'cloud.describe.frame';
      o._defines     = RClass.register(o, new AGetter('_defines'));
      o.construct    = FGuiFrameDescribeConsole_construct;
      o.load         = FGuiFrameDescribeConsole_load;
      o.dispose      = FGuiFrameDescribeConsole_dispose;
      return o;
   }
   MO.FGuiFrameDescribeConsole_construct = function FGuiFrameDescribeConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._defines = new TDictionary();
   }
   MO.FGuiFrameDescribeConsole_load = function FGuiFrameDescribeConsole_load(name){
      var o = this;
      var defines = o._defines;
      var xconfig = defines.get(name);
      if(xconfig){
         return xconfig;
      }
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'query');
      var xframe = xroot.create('Frame');
      xframe.set('name', name);
      var url = MO.Browser.hostPath('/' + o._serviceCode + '.ws');
      var xresult = RConsole.find(FXmlConsole).send(url, xdocument);
      var xframes = xresult.nodes();
      var count = xframes.count();
      for(var i = 0; i < count; i++){
         var xframe = xframes.at(i);
         var frameName = xframe.get('name');
         defines.set(frameName, xframe);
      }
      var xframe = defines.get(name);
      if(!xframe){
         throw new TError(o, 'Unknown frame. (name={1})', name);
      }
      return xframe;
   }
   MO.FGuiFrameDescribeConsole_dispose = function FGuiFrameDescribeConsole_dispose(){
      var o = this;
      o._defines = RObject.dispose(o._defines, true);
      o.__base.FConsole.dispose.call(o);
   }
}
MO.FGuiGeneralColorEffect = function FGuiGeneralColorEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   o._code          = 'general.color.gui';
   o.drawRenderable = MO.FGuiGeneralColorEffect_drawRenderable;
   return o;
}
MO.FGuiGeneralColorEffect_drawRenderable = function FGuiGeneralColorEffect_drawRenderable(region, renderable){
   var o = this;
   if(!MO.Class.isClass(renderable, MO.FGuiControlRenderable)){
      throw new MO.TError('Invalid renderable.');
   }
   var control = renderable.control();
   var adjustSize = renderable.adjustSize();
   var controlLocation = control.location();
   var controlSize = control.size();
   var dockCd = control.dockCd();
   var context = o._graphicContext;
   var logicSize = context.logicSize();
   var contextSize = context.size();
   var contextRatio = context.ratio();
   var contextSizeRatio = context.sizeRatio();
   var radioWidth = contextSize.width * contextRatio;
   var radioHeight = contextSize.height * contextRatio;
   var sizeWidth = contextSize.width * contextSizeRatio.width;
   var sizeHeight = contextSize.height * contextSizeRatio.height;
   var material = renderable.material();
   o.bindMaterial(material);
   var x = y = width = height = 0;
   if(renderable._optionFull){
      x = controlLocation.x / sizeWidth * 2 - 1;
      y = 1 - controlLocation.y / sizeHeight * 2;
      width = adjustSize.width / sizeWidth * 2;
      height = adjustSize.height / sizeHeight * 2;
   }else{
      var contextRatioX = (contextSizeRatio.width > contextSizeRatio.height) ? 1 : contextSizeRatio.height / contextSizeRatio.width;
      if((dockCd == MO.EGuiDock.LeftTop) || (dockCd == MO.EGuiDock.Left) || (dockCd == MO.EGuiDock.LeftBottom) || (dockCd == MO.EGuiDock.Fill)){
         x = controlLocation.x / sizeWidth * 2 - 1;
      }else if((dockCd == MO.EGuiDock.RightTop) || (dockCd == MO.EGuiDock.Right) || (dockCd == MO.EGuiDock.RightBottom)){
         x = (logicSize.width - controlLocation.x - controlSize.width / contextRatioX) / sizeWidth * 2 - 1;
      }else{
         throw new MO.TError(o, 'Invalid dock.');
      }
      var y = 0;
      var contextRatioY = (contextSizeRatio.width > contextSizeRatio.height) ? 1 : contextSizeRatio.height / contextSizeRatio.width;
      if((dockCd == MO.EGuiDock.LeftTop) || (dockCd == MO.EGuiDock.Top) || (dockCd == MO.EGuiDock.RightTop) || (dockCd == MO.EGuiDock.Fill)){
         y = 1 - controlLocation.y / sizeHeight * 2;
      }else if((dockCd == MO.EGuiDock.LeftBottom) || (dockCd == MO.EGuiDock.Bottom) || (dockCd == MO.EGuiDock.RightBottom)){
         y = 1 - (logicSize.height - controlLocation.y - controlSize.height / contextRatioY) / sizeHeight * 2;
      }else{
         throw new MO.TError(o, 'Invalid dock.');
      }
      if((dockCd == MO.EGuiDock.Fill)){
         var right = logicSize.width - controlLocation.x - controlSize.width;
         var x1 = controlLocation.x / sizeWidth * 2 - 1;
         var x2 = (logicSize.width - controlLocation.x - controlSize.width / contextRatioX) / sizeWidth * 2 - 1;
         width = x2 - x1;
         height = adjustSize.height / radioHeight * 2;
      }else{
         width = adjustSize.width / radioWidth * 2;
         height = adjustSize.height / radioHeight * 2;
      }
   }
   o._program.setParameter4('vc_position', x, y, width, height);
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
with(MO){
   MO.FGuiManager = function FGuiManager(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MEventDispatcher);
      o._controls         = RClass.register(o, new AGetter('_controls'));
      o._transforms       = RClass.register(o, new AGetter('_transforms'));
      o._visibleControls  = null;
      o.construct         = FGuiManager_construct;
      o.register          = FGuiManager_register;
      o.unregister        = FGuiManager_unregister;
      o.transformStart    = FGuiManager_transformStart;
      o.setup             = FGuiManager_setup;
      o.setVisible        = FGuiManager_setVisible;
      o.show              = FGuiManager_show;
      o.hide              = FGuiManager_hide;
      o.processResize     = FGuiManager_processResize;
      o.processEvent      = FGuiManager_processEvent;
      o.processTransforms = FGuiManager_processTransforms;
      o.process           = FGuiManager_process;
      o.dispose           = FGuiManager_dispose;
      return o;
   }
   MO.FGuiManager_construct = function FGuiManager_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._controls = new TObjects();
      o._transforms = new TLooper();
      o._visibleControls = new TObjects();
   }
   MO.FGuiManager_register = function FGuiManager_register(control){
      this._controls.push(control);
   }
   MO.FGuiManager_unregister = function FGuiManager_unregister(control){
      this._controls.remove(control);
   }
   MO.FGuiManager_transformStart = function FGuiManager_transformStart(transform){
      var o = this;
      transform.start();
      o._transforms.pushUnique(transform);
   }
   MO.FGuiManager_setup = function FGuiManager_setup(){
      var o = this;
      var effectConsole = RConsole.find(FG3dEffectConsole);
      effectConsole.register('general.color.gui', FGuiGeneralColorEffect);
   }
   MO.FGuiManager_setVisible = function FGuiManager_setVisible(value){
      var o = this;
      var controls = o._controls;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         control.setVisible(value);
      }
   }
   MO.FGuiManager_show = function FGuiManager_show(){
      this.setVisible(true);
   }
   MO.FGuiManager_hide = function FGuiManager_hide(){
      this.setVisible(false);
   }
   MO.FGuiManager_processResize = function FGuiManager_processResize(event){
      var o = this;
      var controls = o._controls;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         control.psResize();
      }
   }
   MO.FGuiManager_processEvent = function FGuiManager_processEvent(event){
      var o = this;
      o.dispatcherEvent(event);
      if((event.code == EEvent.MouseDown) || (event.code == EEvent.MouseMove) || (event.code == EEvent.MouseUp)){
         var context = o._graphicContext;
         var ratio = context.ratio();
         var locationX = event.clientX * ratio;
         var locationY = event.clientY * ratio;
         var visibleControls = o._visibleControls;
         visibleControls.clear();
         var controls = o._controls;
         var count = controls.count();
         for(var i = 0; i < count; i++){
            var control = controls.at(i);
            if(control.visible()){
               visibleControls.push(control);
            }
         }
         var count = visibleControls.count();
         for(var i = 0; i < count; i++){
            var control = visibleControls.at(i);
            var location = control.location();
            event.locationX = locationX - location.x;
            event.locationY = locationY - location.y;
            control.processEvent(event);
         }
      }
   }
   MO.FGuiManager_processTransforms = function FGuiManager_processTransforms(){
      var o = this;
      var transforms = o._transforms;
      transforms.record();
      while(transforms.next()){
         var transform = transforms.current();
         transform.process();
         if(transform.isFinish()){
            transforms.removeCurrent();
         }
      }
   }
   MO.FGuiManager_process = function FGuiManager_process(){
      var o = this;
      var controls = o._controls;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         control.psUpdate();
      }
      o.processTransforms();
   }
   MO.FGuiManager_dispose = function FGuiManager_dispose(){
      var o = this;
      o._controls = RObject.dispose(o._controls);
      o._transforms = RObject.dispose(o._transforms);
      o._visibleControls = RObject.dispose(o._visibleControls);
      o.__base.FObject.dispose.call(o);
   }
}
MO.FGuiTransform = function FGuiTransform(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._finish   = false;
   o.construct = MO.FGuiTransform_construct;
   o.isFinish  = MO.FGuiTransform_isFinish;
   o.start     = MO.FGuiTransform_start;
   o.process   = MO.FGuiTransform_process;
   o.dispose   = MO.FGuiTransform_dispose;
   return o;
}
MO.FGuiTransform_construct = function FGuiTransform_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FGuiTransform_isFinish = function FGuiTransform_isFinish(){
   return this._finish;
}
MO.FGuiTransform_start = function FGuiTransform_start(){
   var o = this;
   o._finish = false;
}
MO.FGuiTransform_process = function FGuiTransform_process(){
   var o = this;
}
MO.FGuiTransform_dispose = function FGuiTransform_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
