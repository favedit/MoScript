MO.FGuiCanvas = function FGuiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE2dCanvas);
   o.createContext = MO.FGuiCanvas_createContext;
   return o;
}
MO.FGuiCanvas_createContext = function FGuiCanvas_createContext(){
   return MO.Class.create(MO.FGuiCanvasContext);
}
MO.FGuiCanvasContext = function FGuiCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dCanvasContext);
   o.construct    = MO.FGuiCanvasContext_construct;
   o.drawFontText = MO.FGuiCanvasContext_drawFontText;
   o.dispose      = MO.FGuiCanvasContext_dispose;
   return o;
}
MO.FGuiCanvasContext_construct = function FGuiCanvasContext_construct() {
   var o = this;
   o.__base.FG2dCanvasContext.construct.call(o);
}
MO.FGuiCanvasContext_drawFontText = function FGuiCanvasContext_drawFontText(text, font, x, y, width, height, alignCd){
   var o = this;
   if(MO.Lang.String.isEmpty(text)){
      return;
   }
   var handle = o._handle;
   handle.font = font.toString();
   handle.fillStyle = font.color;
   var textWidth = o.textWidth(text);
   var cx = x + (width - textWidth) * 0.5;
   var cy = y + (height - font.size) * 0.5 + font.size;
   if(alignCd == MO.EUiAlign.Left){
      handle.fillText(text, x, cy);
   }else if(alignCd == MO.EUiAlign.Right){
      handle.fillText(text, x + (width - textWidth), cy);
   }else if(alignCd == MO.EUiAlign.Center){
      handle.fillText(text, cx, cy);
   }else{
      throw new MO.TError('Invalid align type.');
   }
}
MO.FGuiCanvasContext_dispose = function FGuiCanvasContext_dispose() {
   var o = this;
   o.__base.FG2dCanvasContext.dispose.call(o);
}
MO.FGuiCanvasManager = function FGuiCanvasManager(o){
   o = MO.Class.inherits(this, o, MO.FGuiManager);
   o._desktop          = MO.Class.register(o, new MO.AGetSet('_desktop'));
   o._canvas           = MO.Class.register(o, new MO.AGetSet('_canvas'));
   o._readyControls    = null;
   o._dirtyControls    = null;
   o._paintEvent       = null;
   o.onSortControl     = MO.FGuiCanvasManager_onSortControl;
   o.construct         = MO.FGuiCanvasManager_construct;
   o.filterByRectangle = MO.FGuiCanvasManager_filterByRectangle;
   o.doActionAlpha     = MO.FGuiCanvasManager_doActionAlpha;
   o.processResize     = MO.FGuiCanvasManager_processResize;
   o.processControl    = MO.FGuiCanvasManager_processControl;
   o.process           = MO.FGuiCanvasManager_process;
   o.dispose           = MO.FGuiCanvasManager_dispose;
   return o;
}
MO.FGuiCanvasManager_onSortControl = function FGuiCanvasManager_onSortControl(source, target){
   var o = this;
   var sourceOrder = source.displayOrder();
   var targetOrder = target.displayOrder();
   return sourceOrder - targetOrder;
}
MO.FGuiCanvasManager_construct = function FGuiCanvasManager_construct(){
   var o = this;
   o.__base.FGuiManager.construct.call(o);
   o._readyControls = new MO.TObjects();
   o._dirtyControls = new MO.TObjects();
   o._paintEvent = new MO.SGuiPaintEvent();
}
MO.FGuiCanvasManager_filterByRectangle = function FGuiCanvasManager_filterByRectangle(dirtyControls, rectangle){
   var o = this;
   var controls = o._readyControls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      var clientRectangle = control.clientRectangle();
      if(rectangle.testRectangle(clientRectangle)){
         if(!control._flagDirty){
            control._flagDirty = true;
            o.filterByRectangle(dirtyControls, clientRectangle);
         }
         control.dirty();
         dirtyControls.pushUnique(control);
      }
   }
}
MO.FGuiCanvasManager_doActionAlpha = function FGuiCanvasManager_doActionAlpha(alpha){
   var o = this;
   var context = o._canvas.graphicContext();
   context.setAlpha(alpha);
   o.dirty();
}
MO.FGuiCanvasManager_processResize = function FGuiCanvasManager_processResize(control){
}
MO.FGuiCanvasManager_processControl = function FGuiCanvasManager_processControl(control){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var graphic = o._canvas.graphicContext();
   var desktop = o._desktop;
   var calculateSize = desktop.calculateSize();
   var calculateRate = desktop.calculateRate()
   var event = o._paintEvent;
   event.optionContainer = true;
   event.graphic = graphic;
   event.parentRectangle.set(0, 0, calculateSize.width, calculateSize.height);
   event.calculateRate = calculateRate;
   event.rectangle.reset();
   control.paint(event);
}
MO.FGuiCanvasManager_process = function FGuiCanvasManager_process(){
   var o = this;
   o.__base.FGuiManager.process.call(o);
   var readyControls = o._readyControls;
   readyControls.clear();
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      if(control.processReady()){
         if(o._visible && control.visible()){
            control._flagDirty = false;
            readyControls.push(control)
         }
      }
   }
   var graphic = o._canvas.graphicContext();
   if(o._statusDirty){
      graphic.prepare();
      graphic.clear();
      readyControls.sort(o.onSortControl);
      var readyCount = readyControls.count();
      for(var i = 0; i < readyCount; i++){
         var control = readyControls.at(i);
         o.processControl(control);
      }
      o._statusDirty = false;
   }else{
      var dirtyControls = o._dirtyControls;
      dirtyControls.clear();
      var readCount = readyControls.count();
      for(var i = 0; i < readCount; i++){
         var control = readyControls.at(i);
         if(control.testDirty()){
            var controlRectangle = control.clientRectangle();
            dirtyControls.push(control);
            control._flagDirty = true;
            o.filterByRectangle(dirtyControls, controlRectangle)
         }
      }
      dirtyControls.sort(o.onSortControl);
      var dirtyCount = dirtyControls.count();
      if(dirtyCount){
         graphic.prepare();
         for(var i = 0; i < dirtyCount; i++){
            var control = dirtyControls.at(i);
            var clientRectangle = control.clientRectangle();
            if(!clientRectangle.isEmpty()){
               graphic.clearRectangle(clientRectangle);
            }
         }
         for(var i = 0; i < dirtyCount; i++){
            var control = dirtyControls.at(i);
            o.processControl(control);
         }
      }
   }
}
MO.FGuiCanvasManager_dispose = function FGuiCanvasManager_dispose(){
   var o = this;
   o._readyControls = MO.Lang.Object.dispose(o._readyControls);
   o._dirtyControls = MO.Lang.Object.dispose(o._dirtyControls);
   o._paintEvent = MO.Lang.Object.dispose(o._paintEvent);
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
MO.FGuiFrameConsole = function FGuiFrameConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._frames     = null;
   o.construct   = MO.FGuiFrameConsole_construct;
   o.createFrame = MO.FGuiFrameConsole_createFrame;
   o.create      = MO.FGuiFrameConsole_create;
   o.find        = MO.FGuiFrameConsole_find;
   o.get         = MO.FGuiFrameConsole_get;
   o.alloc       = MO.FGuiFrameConsole_alloc;
   o.free        = MO.FGuiFrameConsole_free;
   o.dispose     = MO.FGuiFrameConsole_dispose;
   return o;
}
MO.FGuiFrameConsole_construct = function FGuiFrameConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._frames = new MO.TDictionary();
}
MO.FGuiFrameConsole_createFrame = function FGuiFrameConsole_createFrame(context, control, name){
   var o = this;
   var describeConsole = MO.Console.find(MO.FGuiFrameDescribeConsole);
   var xframe = describeConsole.load(name);
   var frame = MO.RGuiControl.build(null, xframe, null, null);
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
   o._frames = MO.Lang.Object.dispose(o._frames, true);
   o.__base.FConsole.construct.call(o);
}
MO.FGuiFrameDescribeConsole = function FGuiFrameDescribeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd     = MO.EScope.Global;
   o._serviceCode = 'cloud.describe.frame';
   o._defines     = MO.Class.register(o, new MO.AGetter('_defines'));
   o.construct    = MO.FGuiFrameDescribeConsole_construct;
   o.load         = MO.FGuiFrameDescribeConsole_load;
   o.dispose      = MO.FGuiFrameDescribeConsole_dispose;
   return o;
}
MO.FGuiFrameDescribeConsole_construct = function FGuiFrameDescribeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._defines = new MO.TDictionary();
}
MO.FGuiFrameDescribeConsole_load = function FGuiFrameDescribeConsole_load(name){
   var o = this;
   var defines = o._defines;
   var xconfig = defines.get(name);
   if(xconfig){
      return xconfig;
   }
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'query');
   var xframe = xroot.create('Frame');
   xframe.set('name', name);
   var url = MO.Window.Browser.hostPath('/' + o._serviceCode + '.ws');
   var xresult = MO.Console.find(MO.FXmlConsole).sendSync(url, xdocument);
   var xframes = xresult.nodes();
   var count = xframes.count();
   for(var i = 0; i < count; i++){
      var xframe = xframes.at(i);
      var frameName = xframe.get('name');
      defines.set(frameName, xframe);
   }
   var xframe = defines.get(name);
   if(!xframe){
      throw new MO.TError(o, 'Unknown frame. (name={1})', name);
   }
   return xframe;
}
MO.FGuiFrameDescribeConsole_dispose = function FGuiFrameDescribeConsole_dispose(){
   var o = this;
   o._defines = MO.Lang.Object.dispose(o._defines, true);
   o.__base.FConsole.dispose.call(o);
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
MO.FGuiManager = function FGuiManager(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MEventDispatcher);
   o._visible          = MO.Class.register(o, new MO.AGetter('_visible'), true);
   o._controls         = MO.Class.register(o, new MO.AGetter('_controls'));
   o._mainTimeline     = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   o._transforms       = MO.Class.register(o, new MO.AGetter('_transforms'));
   o._statusDirty      = false;
   o._visibleControls  = null;
   o.construct         = MO.FGuiManager_construct;
   o.register          = MO.FGuiManager_register;
   o.unregister        = MO.FGuiManager_unregister;
   o.transformStart    = MO.FGuiManager_transformStart;
   o.setup             = MO.FGuiManager_setup;
   o.isDirty           = MO.FGuiManager_isDirty;
   o.setVisible        = MO.FGuiManager_setVisible;
   o.show              = MO.FGuiManager_show;
   o.hide              = MO.FGuiManager_hide;
   o.processResize     = MO.FGuiManager_processResize;
   o.processEvent      = MO.FGuiManager_processEvent;
   o.processTransforms = MO.FGuiManager_processTransforms;
   o.process           = MO.FGuiManager_process;
   o.dirty             = MO.FGuiManager_dirty;
   o.dispose           = MO.FGuiManager_dispose;
   return o;
}
MO.FGuiManager_construct = function FGuiManager_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._controls = new MO.TObjects();
   o._mainTimeline = MO.Class.create(MO.FMainTimeline);
   o._transforms = new MO.TLooper();
   o._visibleControls = new MO.TObjects();
}
MO.FGuiManager_register = function FGuiManager_register(control){
   var o = this;
   control.setManager(o);
   o._controls.push(control);
   o._statusDirty = true;
}
MO.FGuiManager_unregister = function FGuiManager_unregister(control){
   var o = this;
   control.setManager(null);
   o._controls.remove(control);
   o._statusDirty = true;
}
MO.FGuiManager_transformStart = function FGuiManager_transformStart(transform){
   var o = this;
   transform.start();
   o._transforms.pushUnique(transform);
}
MO.FGuiManager_setup = function FGuiManager_setup(){
   var o = this;
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('general.color.gui', MO.FGuiGeneralColorEffect);
}
MO.FGuiManager_isDirty = function FGuiManager_isDirty(){
   return this._statusDirty;
}
MO.FGuiManager_setVisible = function FGuiManager_setVisible(value){
   var o = this;
   o._visible = value;
   o._statusDirty = true;
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
   o._mainTimeline.process();
   o.processTransforms();
}
MO.FGuiManager_dirty = function FGuiManager_dirty(){
   this._statusDirty = true;
}
MO.FGuiManager_dispose = function FGuiManager_dispose(){
   var o = this;
   o._controls = MO.RObject.dispose(o._controls);
   o._mainTimeline = MO.RObject.dispose(o._mainTimeline);
   o._transforms = MO.RObject.dispose(o._transforms);
   o._visibleControls = MO.RObject.dispose(o._visibleControls);
   o.__base.FObject.dispose.call(o);
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
