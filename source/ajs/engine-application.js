with(MO){
   MO.FApplication = function FApplication(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerEnterFrame, MListenerLeaveFrame);
      o._activeChapter      = RClass.register(o, new AGetter('_activeChapter'));
      o._chapters           = RClass.register(o, new AGetter('_chapters'));
      o._eventEnterFrame    = null;
      o._eventLeaveFrame    = null;
      o.construct           = FApplication_construct;
      o.registerChapter     = FApplication_registerChapter;
      o.unregisterChapter   = FApplication_unregisterChapter;
      o.selectChapter       = FApplication_selectChapter;
      o.selectChapterByCode = FApplication_selectChapterByCode;
      o.process             = FApplication_process;
      o.dispose             = FApplication_dispose;
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
      o.__base.MListenerEnterFrame.dispose.call(o);
      o.__base.MListenerLeaveFrame.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FChapter = function FChapter(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerEnterFrame, MListenerLeaveFrame);
      o._code             = RClass.register(o, new AGetSet('_code'));
      o._scenes           = RClass.register(o, new AGetter('_scenes'));
      o._activeScene      = RClass.register(o, new AGetter('_activeScene'));
      o._statusSetup      = false;
      o._statusActive     = false;
      o._eventEnterFrame  = null;
      o._eventLeaveFrame  = null;
      o.construct         = FChapter_construct;
      o.registerScene     = FChapter_registerScene;
      o.unregisterScene   = FChapter_unregisterScene;
      o.selectScene       = FChapter_selectScene;
      o.selectSceneByCode = FChapter_selectSceneByCode;
      o.setup             = FChapter_setup;
      o.active            = FChapter_active;
      o.deactive          = FChapter_deactive;
      o.process           = FChapter_process;
      o.dispose           = FChapter_dispose;
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
      var code = scene.code();
      this._scenes.set(code, scene);
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
      o.__base.MListenerEnterFrame.dispose.call(o);
      o.__base.MListenerLeaveFrame.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FScene = function FScene(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MListenerEnterFrame, MListenerLeaveFrame);
      o._code            = RClass.register(o, new AGetSet('_code'));
      o._activeStage     = RClass.register(o, new AGetSet('_activeStage'));
      o._statusSetup     = false;
      o._statusActive    = false;
      o._eventEnterFrame = null;
      o._eventLeaveFrame = null;
      o.construct        = FScene_construct;
      o.setup            = FScene_setup;
      o.active           = FScene_active;
      o.deactive         = FScene_deactive;
      o.process          = FScene_process;
      o.dispose          = FScene_dispose;
      return o;
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
      o.processEnterFrameListener(o._eventEnterFrame);
      if(o._activeStage){
         o._activeStage.process();
      }
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
   MO.FScene_dispose = function FScene_dispose(){
      var o = this;
      o._eventEnterFrame = RObject.dispose(o._eventEnterFrame);
      o._eventLeaveFrame = RObject.dispose(o._eventLeaveFrame);
      o.__base.FObject.dispose.call(o);
   }
}
