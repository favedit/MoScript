//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
MO.FChapter = function FChapter(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   //..........................................................
   // @attribute
   o._code                = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application         = MO.Class.register(o, new MO.AGetSet('_application'));
   o._scenes              = MO.Class.register(o, new MO.AGetter('_scenes'));
   // @attribute
   o._activeScene         = MO.Class.register(o, new MO.AGetter('_activeScene'));
   // @attribute
   o._statusSetup         = false;
   o._statusActive        = false;
   //..........................................................
   // @event
   o.onProcessReady       = MO.Method.empty;
   //..........................................................
   // @method
   o.construct            = MO.FChapter_construct;
   // @method
   o.registerScene        = MO.FChapter_registerScene;
   o.unregisterScene      = MO.FChapter_unregisterScene;
   o.selectScene          = MO.FChapter_selectScene;
   o.selectSceneByCode    = MO.FChapter_selectSceneByCode;
   // @method
   o.setup                = MO.Method.empty;
   o.active               = MO.FChapter_active;
   o.deactive             = MO.FChapter_deactive;
   // @method
   o.processEvent         = MO.FChapter_processEvent;
   o.process              = MO.FChapter_process;
   // @method
   o.dispose              = MO.FChapter_dispose;
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
   o.__base.MFrameProcessor.construct.call(o);
   // 设置变量
   o._scenes = new MO.TDictionary();
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
   MO.Assert.debugNotNull(scene);
   o.selectScene(scene);
   return scene;
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
   // 测试状态
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   //..........................................................
   // 检查激活状态
   if(o._statusActive){
      // 前处理
      o.processEnterFrameListener(o._eventEnterFrame);
      // 场景处理
      var scene = o._activeScene;
      if(scene){
         if(scene.visible()){
            scene.process();
         }
      }
      // 后处理
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FChapter_dispose = function FChapter_dispose(){
   var o = this;
   // 释放变量
   o._scenes = MO.Lang.Object.dispose(o._scenes);
   // 父处理
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
