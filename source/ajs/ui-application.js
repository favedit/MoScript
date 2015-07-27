MO.EApplicationConstant = new function EApplicationConstant(){
   var o = this;
   o.Resource = "resource";
   return o;
}
MO.FApplication = function FApplication(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher);
   o._activeChapter       = MO.Class.register(o, new MO.AGetter('_activeChapter'));
   o._chapters            = MO.Class.register(o, new MO.AGetter('_chapters'));
   o._eventEnterFrame     = null;
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._eventLeaveFrame     = null;
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   o.onProcess            = MO.FApplication_onProcess;
   o.construct            = MO.FApplication_construct;
   o.registerChapter      = MO.FApplication_registerChapter;
   o.unregisterChapter    = MO.FApplication_unregisterChapter;
   o.selectChapter        = MO.FApplication_selectChapter;
   o.selectChapterByCode  = MO.FApplication_selectChapterByCode;
   o.processResize        = MO.FApplication_processResize;
   o.processEvent         = MO.FApplication_processEvent;
   o.process              = MO.FApplication_process;
   o.dispose              = MO.FApplication_dispose;
   return o;
}
MO.FApplication_onProcess = function FApplication_onProcess(event){
   var o = this;
   var chapter = o._activeChapter;
   if(chapter){
      chapter.process();
   }
}
MO.FApplication_construct = function FApplication_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._chapters = new MO.TDictionary();
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}
MO.FApplication_registerChapter = function FApplication_registerChapter(chapter){
   var o = this;
   var code = chapter.code();
   chapter.setApplication(o);
   o._chapters.set(code, chapter);
}
MO.FApplication_unregisterChapter = function FApplication_unregisterChapter(chapter){
   var o = this;
   var code = chapter.code();
   o._chapters.set(code, null);
}
MO.FApplication_selectChapter = function FApplication_selectChapter(chapter){
   var o = this;
   if(o._activeChapter != chapter){
      var activeChapter = o._activeChapter;
      if(activeChapter){
         activeChapter.deactive();
         o._activeChapter = null;
      }
      if(chapter){
         chapter.active();
         o._activeChapter = chapter;
      }
   }
}
MO.FApplication_selectChapterByCode = function FApplication_selectChapterByCode(code){
   var o = this;
   var chapter = o._chapters.get(code);
   o.selectChapter(chapter);
   return chapter;
}
MO.FApplication_processResize = function FApplication_processResize(){
   var o = this;
}
MO.FApplication_processEvent = function FApplication_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
   var chapter = o._activeChapter;
   if(chapter){
      chapter.processEvent(event);
   }
}
MO.FApplication_process = function FApplication_process(){
   var o = this;
   o.processEnterFrameListener(o._eventEnterFrame);
   o.onProcess();
   o.processLeaveFrameListener(o._eventLeaveFrame);
}
MO.FApplication_dispose = function FApplication_dispose(){
   var o = this;
   o._activeChapter = null;
   o._chapters = MO.Lang.Object.dispose(o._chapters, true);
   o._eventEnterFrame = MO.Lang.Object.dispose(o._eventEnterFrame);
   o._eventLeaveFrame = MO.Lang.Object.dispose(o._eventLeaveFrame);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FChapter = function FChapter(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher);
   o._code                = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application         = MO.Class.register(o, new MO.AGetSet('_application'));
   o._scenes              = MO.Class.register(o, new MO.AGetter('_scenes'));
   o._activeScene         = MO.Class.register(o, new MO.AGetter('_activeScene'));
   o._statusSetup         = false;
   o._statusActive        = false;
   o._eventEnterFrame     = null;
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._eventLeaveFrame     = null;
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   o.construct            = MO.FChapter_construct;
   o.registerScene        = MO.FChapter_registerScene;
   o.unregisterScene      = MO.FChapter_unregisterScene;
   o.selectScene          = MO.FChapter_selectScene;
   o.selectSceneByCode    = MO.FChapter_selectSceneByCode;
   o.setup                = MO.Method.empty;
   o.active               = MO.FChapter_active;
   o.deactive             = MO.FChapter_deactive;
   o.processEvent         = MO.FChapter_processEvent;
   o.process              = MO.FChapter_process;
   o.dispose              = MO.FChapter_dispose;
   return o;
}
MO.FChapter_construct = function FChapter_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._scenes = new MO.TDictionary();
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}
MO.FChapter_registerScene = function FChapter_registerScene(scene){
   var o = this;
   var code = scene.code();
   MO.Assert.debugNotEmpty(code);
   scene.setApplication(o._application);
   scene.setChapter(o);
   o._scenes.set(code, scene);
}
MO.FChapter_unregisterScene = function FChapter_unregisterScene(scene){
   var code = scene.code();
   this._scenes.set(code, null);
}
MO.FChapter_selectScene = function FChapter_selectScene(scene){
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
MO.FChapter_selectSceneByCode = function FChapter_selectSceneByCode(code){
   var o = this;
   var scene = o._scenes.get(code);
   MO.Assert.debugNotNull(scene);
   o.selectScene(scene);
   return scene;
}
MO.FChapter_active = function FChapter_active(){
   var o = this;
   if(!o._statusSetup){
      o.setup();
      o._statusSetup = true;
   }
   o._statusActive = true;
}
MO.FChapter_deactive = function FChapter_deactive(){
   var o = this;
   o._statusActive = false;
}
MO.FChapter_processEvent = function FChapter_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
   var scene = o._activeScene;
   if(scene){
      scene.processEvent(event);
   }
}
MO.FChapter_process = function FChapter_process(){
   var o = this;
   o.processEnterFrameListener(o._eventEnterFrame);
   var scene = o._activeScene;
   if(scene){
      if(scene.visible()){
         scene.process();
      }
   }
   o.processLeaveFrameListener(o._eventLeaveFrame);
}
MO.FChapter_dispose = function FChapter_dispose(){
   var o = this;
   o._scenes = MO.Lang.Object.dispose(o._scenes);
   o._eventEnterFrame = MO.Lang.Object.dispose(o._eventEnterFrame);
   o._eventLeaveFrame = MO.Lang.Object.dispose(o._eventLeaveFrame);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FGuiApplication = function FGuiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._canvas   = MO.Class.register(o, new MO.AGetter('_canvas'));
   o._manager  = MO.Class.register(o, new MO.AGetter('_manager'));
   o._desktop  = MO.Class.register(o, new MO.AGetter('_desktop'));
   o.construct = MO.FGuiApplication_construct;
   o.setup     = MO.FGuiApplication_setup;
   o.process   = MO.FGuiApplication_process;
   o.dispose   = MO.FGuiApplication_dispose;
   return o;
}
MO.FGuiApplication_construct = function FGuiApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
   o._chapters = new MO.TDictionary();
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}
MO.FGuiApplication_setup = function FGuiApplication_setup(hPanel){
   var o = this;
   var desktop = o._desktop = MO.Class.create(MO.FGuiDesktop);
   desktop.build(hPanel);
   var canvas = o._canvas = desktop.canvas();
   var manager = o._manager = MO.Class.create(MO.FGuiCanvasManager);
   manager.setDesktop(desktop);
   manager.setCanvas(canvas);
}
MO.FGuiApplication_process = function FGuiApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   o._manager.process();
}
MO.FGuiApplication_dispose = function FGuiApplication_dispose(){
   var o = this;
   o.__base.FApplication.dispose.call(o);
}
MO.FGuiDesktop = function FGuiDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._canvas                = MO.Class.register(o, new MO.AGetter('_canvas'));
   o.onOperationResize      = MO.FGuiDesktop_onOperationResize;
   o.onOperationOrientation = MO.FGuiDesktop_onOperationOrientation;
   o.construct              = MO.FGuiDesktop_construct;
   o.build                  = MO.FGuiDesktop_build;
   o.resize                 = MO.FGuiDesktop_resize;
   o.dispose                = MO.FGuiDesktop_dispose;
   return o;
}
MO.FGuiDesktop_onOperationResize = function FGuiDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FGuiDesktop_onOperationOrientation = function FGuiDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FGuiDesktop_construct = function FGuiDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
   o._screenSize.set(0, 0);
}
MO.FGuiDesktop_build = function FGuiDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas = o._canvas = MO.RClass.create(MO.FE2dCanvas);
   canvas.setDesktop(o);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   canvas._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas);
   MO.RE3dEngine.setup();
}
MO.FGuiDesktop_resize = function FGuiDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var width = (targetWidth != null) ? targetWidth : window.innerWidth;
   var height = (targetHeight != null) ? targetHeight : window.innerHeight;
   if(o._screenSize.equalsData(width, height)){
      return;
   }
   o._screenSize.set(width, height);
   var pixelRatio = MO.Browser.capability().pixelRatio;
   MO.Logger.info(o, 'Change screen size. (size={1}x{2}, pixel_ratio={3})', width, height, pixelRatio);
   width *= pixelRatio;
   height *= pixelRatio;
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   if(MO.Browser.isOrientationHorizontal()){
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }else{
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   o._canvas3d.resize(width, height);
   var canvas = o._canvas;
   canvas.resize(width, height);
   canvas.context().setGlobalScale(sizeRate, sizeRate);
}
MO.FGuiDesktop_dispose = function FGuiDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.RObject.dispose(o._canvas3d);
   o._canvas = MO.RObject.dispose(o._canvas);
   o.__base.FDesktop.dispose.call(o);
}
MO.FScene = function FScene(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher);
   o._visible             = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o._code                = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application         = MO.Class.register(o, new MO.AGetSet('_application'));
   o._chapter             = MO.Class.register(o, new MO.AGetSet('_chapter'));
   o._activeStage         = MO.Class.register(o, new MO.AGetSet('_activeStage'));
   o._statusSetup         = false;
   o._statusActive        = false;
   o._eventEnterFrame     = null;
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._eventLeaveFrame     = null;
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   o.onProcessBefore      = MO.Method.empty;
   o.onProcess            = MO.FScene_onProcess;
   o.onProcessAfter       = MO.Method.empty;
   o.construct            = MO.FScene_construct;
   o.setup                = MO.FScene_setup;
   o.active               = MO.FScene_active;
   o.deactive             = MO.FScene_deactive;
   o.processEvent         = MO.FScene_processEvent;
   o.process              = MO.FScene_process;
   o.dispose              = MO.FScene_dispose;
   return o;
}
MO.FScene_onProcess = function FScene_onProcess(){
   var o = this;
   o.processEnterFrameListener(o._eventEnterFrame);
   if(o._activeStage){
      o._activeStage.process();
   }
   o.processLeaveFrameListener(o._eventLeaveFrame);
}
MO.FScene_construct = function FScene_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
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
}
MO.FScene_deactive = function FScene_deactive(){
   var o = this;
   o._statusActive = false;
}
MO.FScene_process = function FScene_process(){
   var o = this;
   if(o._statusActive){
      o.processEnterFrameListener(o._eventEnterFrame);
      o.onProcessBefore();
      o.onProcess();
      if(o._activeStage){
         o._activeStage.process();
      }
      o.onProcessAfter();
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
}
MO.FScene_processEvent = function FScene_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
}
MO.FScene_dispose = function FScene_dispose(){
   var o = this;
   o._eventEnterFrame = MO.Lang.Object.dispose(o._eventEnterFrame);
   o._eventLeaveFrame = MO.Lang.Object.dispose(o._eventLeaveFrame);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FTestApplication = function FTestApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o.setup = MO.FTestApplication_setup;
   return o;
}
MO.FTestApplication_setup = function FTestApplication_setup(hPanel){
   var o = this;
   var xroot = new MO.TXmlNode('Configuration');
   var identityCode = MO.Window.Browser.agent();
   var xbrowser = xroot.create('Browser')
   var xdesktop = xbrowser.create('Desktop')
   var xcontext2d = xdesktop.create('Context2d');
   var xcontext3d = xdesktop.create('Context3d');
   MO.Window.Browser.saveConfig(xbrowser);
   var hCanvas = MO.Window.Builder.create(hPanel, 'CANVAS');
   var context3d = MO.REngine3d.createContext(MO.FWglContext, hCanvas);
   if(context3d){
      var parameter = context3d.parameter('VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('SHADING_LANGUAGE_VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('UNMASKED_RENDERER_WEBGL');
      if(parameter){
         identityCode += '|' + parameter;
      }
      context3d.saveConfig(xcontext3d);
   }
   xroot.set('identity_code', identityCode);
   MO.Console.find(MO.FServiceConsole).send('cloud.info.device', 'access', xroot)
}
MO.RApplication = function RApplication(){
   var o = this;
   o._workspaces = new MO.TDictionary();
   return o;
}
MO.RApplication.prototype.initialize = function RApplication_initialize(){
   var o = this;
   MO.Window.Browser.construct();
   MO.Window.connect(window);
   MO.Window.Keyboard.construct();
}
MO.RApplication.prototype.findWorkspace = function RApplication_findWorkspace(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var workspaces = o._workspaces;
   var workspace = workspaces.get(name);
   if(workspace == null){
      workspace = MO.Class.create(clazz);
      workspaces.set(name, workspace);
   }
   return workspace;
}
MO.RApplication.prototype.release = function RApplication_release(){
   try{
      CollectGarbage();
   }catch(e){
     MO.Logger.error(e);
   }
}
MO.RApplication = new MO.RApplication();
MO.RDesktop = function RDesktop(){
   var o = this;
   o._application = null;
   o._workspaces  = new MO.TDictionary();
   o._thread      = null;
   o._interval    = 20;
   return o;
}
MO.RDesktop.prototype.onProcessEvent = function RDesktop_onProcessEvent(event){
   var o = this;
   var application = o._application;
   if(application){
      application.processEvent(event);
   }
}
MO.RDesktop.prototype.onProcess = function RDesktop_onProcess(event){
   var o = this;
   var application = o._application;
   if(application){
      application.process();
   }
}
MO.RDesktop.prototype.application = function RDesktop_application(){
   return this._application;
}
MO.RDesktop.prototype.initialize = function RDesktop_initialize(clazz){
   var o = this;
   MO.Window.Browser.construct();
   MO.Window.connect(window);
   MO.Window.Keyboard.construct();
   MO.Window.lsnsMouseDown.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseMove.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseUp.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseWheel.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyDown.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyPress.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyUp.register(o, o.onProcessEvent);
   MO.Window.lsnsResize.register(o, o.onProcessEvent);
   MO.Window.lsnsVisibility.register(o, o.onProcessEvent);
   MO.Window.lsnsOrientation.register(o, o.onProcessEvent);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.process);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.Timer.setup();
   var application = MO.Application = o._application = MO.Class.create(clazz);
   return application;
}
MO.RDesktop.prototype.findWorkspace = function RDesktop_findWorkspace(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var workspaces = o._workspaces;
   var workspace = workspaces.get(name);
   if(workspace == null){
      workspace = MO.Class.create(clazz);
      workspaces.set(name, workspace);
   }
   return workspace;
}
MO.RDesktop.prototype.process = function RDesktop_process(){
   var o = this;
   o.onProcess();
   MO.Timer.update();
}
MO.RDesktop.prototype.release = function RDesktop_release(){
   try{
      CollectGarbage();
   }catch(e){
     MO.Logger.error(e);
   }
}
MO.Desktop = new MO.RDesktop();
