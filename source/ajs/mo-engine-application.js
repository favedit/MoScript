with(MO){
   MO.FApplication = function FApplication(o){
      o = RClass.inherits(this, o, FObject, MListener, MGraphicObject, MEventDispatcher);
      o._activeChapter       = RClass.register(o, new AGetter('_activeChapter'));
      o._chapters            = RClass.register(o, new AGetter('_chapters'));
      o._eventEnterFrame     = null;
      o._enterFrameListeners = RClass.register(o, new AListener('_enterFrameListeners', EEvent.EnterFrame));
      o._eventLeaveFrame     = null;
      o._leaveFrameListeners = RClass.register(o, new AListener('_leaveFrameListeners', EEvent.LeaveFrame));
      o.construct            = FApplication_construct;
      o.registerChapter      = FApplication_registerChapter;
      o.unregisterChapter    = FApplication_unregisterChapter;
      o.selectChapter        = FApplication_selectChapter;
      o.selectChapterByCode  = FApplication_selectChapterByCode;
      o.processResize        = FApplication_processResize;
      o.processEvent         = FApplication_processEvent;
      o.process              = FApplication_process;
      o.dispose              = FApplication_dispose;
      return o;
   }
   MO.FApplication_construct = function FApplication_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._chapters = new TDictionary();
      o._eventEnterFrame = new SEvent();
      o._eventLeaveFrame = new SEvent();
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
      if(o._activeChapter){
         o._activeChapter.process();
      }
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
   MO.FApplication_dispose = function FApplication_dispose(){
      var o = this;
      o._activeChapter = null;
      o._chapters = RObject.dispose(o._chapters, true);
      o._eventEnterFrame = RObject.dispose(o._eventEnterFrame);
      o._eventLeaveFrame = RObject.dispose(o._eventLeaveFrame);
      o.__base.MListener.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FChapter = function FChapter(o){
      o = RClass.inherits(this, o, FObject, MListener, MGraphicObject, MEventDispatcher);
      o._code                = RClass.register(o, new AGetSet('_code'));
      o._application         = RClass.register(o, new AGetSet('_application'));
      o._scenes              = RClass.register(o, new AGetter('_scenes'));
      o._activeScene         = RClass.register(o, new AGetter('_activeScene'));
      o._statusSetup         = false;
      o._statusActive        = false;
      o._eventEnterFrame     = null;
      o._enterFrameListeners = RClass.register(o, new AListener('_enterFrameListeners', EEvent.EnterFrame));
      o._eventLeaveFrame     = null;
      o._leaveFrameListeners = RClass.register(o, new AListener('_leaveFrameListeners', EEvent.LeaveFrame));
      o.construct            = FChapter_construct;
      o.registerScene        = FChapter_registerScene;
      o.unregisterScene      = FChapter_unregisterScene;
      o.selectScene          = FChapter_selectScene;
      o.selectSceneByCode    = FChapter_selectSceneByCode;
      o.setup                = FChapter_setup;
      o.active               = FChapter_active;
      o.deactive             = FChapter_deactive;
      o.processEvent         = FChapter_processEvent;
      o.process              = FChapter_process;
      o.dispose              = FChapter_dispose;
      return o;
   }
   MO.FChapter_construct = function FChapter_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._scenes = new TDictionary();
      o._eventEnterFrame = new SEvent();
      o._eventLeaveFrame = new SEvent();
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
      o.selectScene(scene);
      return scene;
   }
   MO.FChapter_setup = function FChapter_setup(){
      var o = this;
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
      if(o._activeScene){
         o._activeScene.process();
      }
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
   MO.FChapter_dispose = function FChapter_dispose(){
      var o = this;
      o._scenes = RObject.dispose(o._scenes);
      o._eventEnterFrame = RObject.dispose(o._eventEnterFrame);
      o._eventLeaveFrame = RObject.dispose(o._eventLeaveFrame);
      o.__base.MListener.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FScene = function FScene(o){
      o = RClass.inherits(this, o, FObject, MListener, MGraphicObject, MEventDispatcher);
      o._code                = RClass.register(o, new AGetSet('_code'));
      o._application         = RClass.register(o, new AGetSet('_application'));
      o._chapter             = RClass.register(o, new AGetSet('_chapter'));
      o._activeStage         = RClass.register(o, new AGetSet('_activeStage'));
      o._statusSetup         = false;
      o._statusActive        = false;
      o._eventEnterFrame     = null;
      o._enterFrameListeners = RClass.register(o, new AListener('_enterFrameListeners', EEvent.EnterFrame));
      o._eventLeaveFrame     = null;
      o._leaveFrameListeners = RClass.register(o, new AListener('_leaveFrameListeners', EEvent.LeaveFrame));
      o.onProcess            = FScene_onProcess;
      o.construct            = FScene_construct;
      o.setup                = FScene_setup;
      o.active               = FScene_active;
      o.deactive             = FScene_deactive;
      o.processEvent         = FScene_processEvent;
      o.process              = FScene_process;
      o.dispose              = FScene_dispose;
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
      o._eventEnterFrame = new SEvent();
      o._eventLeaveFrame = new SEvent();
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
         o.onProcess();
      }
   }
   MO.FScene_processEvent = function FScene_processEvent(event){
      var o = this;
      o.dispatcherEvent(event);
   }
   MO.FScene_dispose = function FScene_dispose(){
      var o = this;
      o._eventEnterFrame = RObject.dispose(o._eventEnterFrame);
      o._eventLeaveFrame = RObject.dispose(o._eventLeaveFrame);
      o.__base.MListener.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.RApplication = function RApplication(){
      var o = this;
      o._workspaces  = new TDictionary();
      return o;
   }
   MO.RApplication.prototype.initialize = function RApplication_initialize(){
      var o = this;
      RBrowser.construct();
      RWindow.connect(window);
      RKeyboard.construct();
   }
   MO.RApplication.prototype.findWorkspace = function RApplication_findWorkspace(clazz){
      var o = this;
      var name = RClass.name(clazz);
      var workspaces = o._workspaces;
      var workspace = workspaces.get(name);
      if(workspace == null){
         workspace = RClass.create(clazz);
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
   MO.RApplication = new RApplication();
}
MO.RDesktop = function RDesktop(){
   var o = this;
   o._application   = null;
   o._workspaces    = new MO.TDictionary();
   o._thread        = null;
   o._interval      = 10;
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
   MO.Browser.construct();
   MO.RWindow.connect(window);
   MO.RKeyboard.construct();
   MO.RWindow.lsnsMouseDown.register(o, o.onProcessEvent);
   MO.RWindow.lsnsMouseMove.register(o, o.onProcessEvent);
   MO.RWindow.lsnsMouseUp.register(o, o.onProcessEvent);
   MO.RWindow.lsnsResize.register(o, o.onProcessEvent);
   MO.RWindow.lsnsOrientation.register(o, o.onProcessEvent);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.process);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.RTimer.setup();
   var application = MO.Application = o._application = MO.Class.create(clazz);
   return application;
}
MO.RDesktop.prototype.findWorkspace = function RDesktop_findWorkspace(clazz){
   var o = this;
   var name = RClass.name(clazz);
   var workspaces = o._workspaces;
   var workspace = workspaces.get(name);
   if(workspace == null){
      workspace = RClass.create(clazz);
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
