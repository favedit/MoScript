MO.MFrameProcessor = function MFrameProcessor(o){
   o = MO.Class.inherits(this, o);
   o._readyLoader         = MO.Class.register(o, new MO.AGetter('_readyLoader'));
   o._eventEnterFrame     = null;
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._eventLeaveFrame     = null;
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   o.onProcessReady       = MO.Method.empty;
   o.construct            = MO.MFrameProcessor_construct;
   o.dispose              = MO.MFrameProcessor_dispose;
   return o;
}
MO.MFrameProcessor_construct = function MFrameProcessor_construct(){
   var o = this;
   var loader = o._readyLoader = MO.Class.create(MO.FReadyLoader);
   loader.addChangeListener(o, o.onProcessReady);
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}
MO.MFrameProcessor_dispose = function MFrameProcessor_dispose(){
   var o = this;
   o._readyLoader = MO.Lang.Object.dispose(o._readyLoader);
   o._eventEnterFrame = MO.Lang.Object.dispose(o._eventEnterFrame);
   o._eventLeaveFrame = MO.Lang.Object.dispose(o._eventLeaveFrame);
}
MO.FApplication = function FApplication(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   o._sessionId           = MO.Class.register(o, new MO.AGetSet('_sessionId'));
   o._activeChapter       = MO.Class.register(o, new MO.AGetter('_activeChapter'));
   o._chapters            = MO.Class.register(o, new MO.AGetter('_chapters'));
   o.onProcessReady       = MO.FApplication_onProcessReady;
   o.onProcess            = MO.FApplication_onProcess;
   o.construct            = MO.FApplication_construct;
   o.setup                = MO.Method.emptyTrue;
   o.findSessionId        = MO.FApplication_findSessionId;
   o.createChapter        = MO.Method.empty;
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
MO.FApplication_onProcessReady = function FApplication_onProcessReady(event){
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
   o.__base.MFrameProcessor.construct.call(o);
   o._sessionId = MO.Window.cookie(MO.EApplicationConstant.SessionCode);
   o._chapters = new MO.TDictionary();
}
MO.FApplication_findSessionId = function FApplication_findSessionId(){
   var o = this;
   return o._sessionId;
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
   if(!chapter){
      chapter = o.createChapter(code);
      o.registerChapter(chapter);
   }
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
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   o.processEnterFrameListener(o._eventEnterFrame);
   o.onProcess();
   o.processLeaveFrameListener(o._eventLeaveFrame);
}
MO.FApplication_dispose = function FApplication_dispose(){
   var o = this;
   o._activeChapter = null;
   o._chapters = MO.Lang.Object.dispose(o._chapters, true);
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FChapter = function FChapter(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   o._code                = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application         = MO.Class.register(o, new MO.AGetSet('_application'));
   o._scenes              = MO.Class.register(o, new MO.AGetter('_scenes'));
   o._activeScene         = MO.Class.register(o, new MO.AGetter('_activeScene'));
   o._statusSetup         = false;
   o._statusActive        = false;
   o.onProcessReady       = MO.FChapter_onProcessReady;
   o.construct            = MO.FChapter_construct;
   o.createScene          = MO.Method.empty;
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
MO.FChapter_onProcessReady = function FChapter_onProcessReady(event){
}
MO.FChapter_construct = function FChapter_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MFrameProcessor.construct.call(o);
   o._scenes = new MO.TDictionary();
}
MO.FChapter_registerScene = function FChapter_registerScene(scene){
   var o = this;
   var code = scene.code();
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
   if(!scene){
      scene = o.createScene(code);
      o.registerScene(scene);
   }
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
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   if(o._statusActive){
      o.processEnterFrameListener(o._eventEnterFrame);
      var scene = o._activeScene;
      if(scene){
         if(scene.visible()){
            scene.process();
         }
      }
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
}
MO.FChapter_dispose = function FChapter_dispose(){
   var o = this;
   o._scenes = MO.Lang.Object.dispose(o._scenes);
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FScene = function FScene(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   o._visible              = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o._code                 = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application          = MO.Class.register(o, new MO.AGetSet('_application'));
   o._chapter              = MO.Class.register(o, new MO.AGetSet('_chapter'));
   o._activeStage          = MO.Class.register(o, new MO.AGetSet('_activeStage'));
   o._statusSetup          = false;
   o._statusActive         = false;
   o.onOperationVisibility = MO.FScene_onOperationVisibility;
   o.onProcessReady        = MO.FScene_onProcessReady;
   o.onProcessBefore       = MO.Method.empty;
   o.onProcess             = MO.Method.empty;
   o.onProcessAfter        = MO.Method.empty;
   o.construct             = MO.FScene_construct;
   o.setup                 = MO.Method.empty;
   o.active                = MO.FScene_active;
   o.deactive              = MO.FScene_deactive;
   o.processEvent          = MO.FScene_processEvent;
   o.process               = MO.FScene_process;
   o.dispose               = MO.FScene_dispose;
   return o;
}
MO.FScene_onOperationVisibility = function FScene_onOperationVisibility(event){
   var o = this;
   o.__base.MEventDispatcher.onOperationVisibility.call(o, event);
   o._visible = event.visibility;
}
MO.FScene_onProcessReady = function FScene_onProcessReady(event){
}
MO.FScene_construct = function FScene_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MFrameProcessor.construct.call(o);
}
MO.FScene_active = function FScene_active(){
   var o = this;
   if(!o._statusSetup){
      o.setup();
      o._statusSetup = true;
   }
   o._statusActive = true;
   o.processResize();
}
MO.FScene_deactive = function FScene_deactive(){
   var o = this;
   o._statusActive = false;
}
MO.FScene_process = function FScene_process(){
   var o = this;
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
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
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.RDesktop = function RDesktop(){
   var o = this;
   o._qualityCd   = MO.EGraphicQuality.Middle;
   o._application = null;
   o._workspaces  = new MO.TDictionary();
   o._thread      = null;
   o._interval    = 15;
   return o;
}
MO.RDesktop.prototype.qualityCd = function RDesktop_qualityCd(){
   return this._qualityCd;
}
MO.RDesktop.prototype.setQualityCd = function RDesktop_setQualityCd(qualityCd){
   this._qualityCd = qualityCd;
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
