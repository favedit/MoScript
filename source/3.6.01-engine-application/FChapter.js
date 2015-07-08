with(MO){
   //==========================================================
   // <T>舞台对象。</T>
   //
   // @class
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FChapter = function FChapter(o){
      o = RClass.inherits(this, o, FObject, MListener, MGraphicObject, MEventDispatcher);
      //..........................................................
      // @attribute
      o._code                = RClass.register(o, new AGetSet('_code'));
      o._application         = RClass.register(o, new AGetSet('_application'));
      o._scenes              = RClass.register(o, new AGetter('_scenes'));
      // @attribute
      o._activeScene         = RClass.register(o, new AGetter('_activeScene'));
      o._statusSetup         = false;
      o._statusActive        = false;
      // @attribute
      o._eventEnterFrame     = null;
      o._enterFrameListeners = RClass.register(o, new AListener('_enterFrameListeners', EEvent.EnterFrame));
      o._eventLeaveFrame     = null;
      o._leaveFrameListeners = RClass.register(o, new AListener('_leaveFrameListeners', EEvent.LeaveFrame));
      //..........................................................
      // @method
      o.construct            = FChapter_construct;
      // @method
      o.registerScene        = FChapter_registerScene;
      o.unregisterScene      = FChapter_unregisterScene;
      o.selectScene          = FChapter_selectScene;
      o.selectSceneByCode    = FChapter_selectSceneByCode;
      // @method
      o.setup                = FChapter_setup;
      o.active               = FChapter_active;
      o.deactive             = FChapter_deactive;
      // @method
      o.processEvent         = FChapter_processEvent;
      o.process              = FChapter_process;
      // @method
      o.dispose              = FChapter_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FChapter_construct = function FChapter_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置变量
      o._scenes = new TDictionary();
      o._eventEnterFrame = new SEvent();
      o._eventLeaveFrame = new SEvent();
   }

   //==========================================================
   // <T>注册一个场景。</T>
   //
   // @method
   // @param scene:FScene 场景
   //==========================================================
   MO.FChapter_registerScene = function FChapter_registerScene(scene){
      var o = this;
      var code = scene.code();
      MO.Assert.debugNotEmpty(code);
      scene.setApplication(o._application);
      scene.setChapter(o);
      o._scenes.set(code, scene);
   }

   //==========================================================
   // <T>注销一个场景。</T>
   //
   // @method
   // @param scene:FScene 场景
   //==========================================================
   MO.FChapter_unregisterScene = function FChapter_unregisterScene(scene){
      var code = scene.code();
      this._scenes.set(code, null);
   }

   //==========================================================
   // <T>选择场景。</T>
   //
   // @method
   // @param scene:String 代码
   //==========================================================
   MO.FChapter_selectScene = function FChapter_selectScene(scene){
      var o = this;
      if(o._activeScene != scene){
         // 注销场景
         var activeScene = o._activeScene;
         if(activeScene){
            activeScene.deactive();
            o._activeScene = null;
         }
         // 激活场景
         if(scene){
            scene.active();
            o._activeScene = scene;
         }
      }
   }

   //==========================================================
   // <T>选择场景。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FChapter_selectSceneByCode = function FChapter_selectSceneByCode(code){
      var o = this;
      var scene = o._scenes.get(code);
      o.selectScene(scene);
      return scene;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FChapter_setup = function FChapter_setup(){
      var o = this;
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FChapter_active = function FChapter_active(){
      var o = this;
      // 配置处理
      if(!o._statusSetup){
         o.setup();
         o._statusSetup = true;
      }
      // 设置状态
      o._statusActive = true;
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FChapter_deactive = function FChapter_deactive(){
      var o = this;
      // 设置状态
      o._statusActive = false;
   }

   //==========================================================
   // <T>事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FChapter_processEvent = function FChapter_processEvent(event){
      var o = this;
      // 处理事件
      o.dispatcherEvent(event);
      // 激活场景处理事件
      var scene = o._activeScene;
      if(scene){
         scene.processEvent(event);
      }
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FChapter_process = function FChapter_process(){
      var o = this;
      // 前处理
      o.processEnterFrameListener(o._eventEnterFrame);
      // 场景处理
      if(o._activeScene){
         o._activeScene.process();
      }
      // 后处理
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FChapter_dispose = function FChapter_dispose(){
      var o = this;
      o._scenes = RObject.dispose(o._scenes);
      o._eventEnterFrame = RObject.dispose(o._eventEnterFrame);
      o._eventLeaveFrame = RObject.dispose(o._eventLeaveFrame);
      // 父处理
      o.__base.MListener.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
