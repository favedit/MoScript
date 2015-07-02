with(MO){
   //==========================================================
   // <T>舞台对象。</T>
   //
   // @class
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FScene = function FScene(o){
      o = RClass.inherits(this, o, FObject, MListener, MGraphicObject, MEventDispatcher);
      //..........................................................
      // @attribute
      o._code                = RClass.register(o, new AGetSet('_code'));
      o._activeStage         = RClass.register(o, new AGetSet('_activeStage'));
      // @attribute
      o._statusSetup         = false;
      o._statusActive        = false;
      // @attribute
      o._eventEnterFrame     = null;
      o._enterFrameListeners = RClass.register(o, new AListener('_enterFrameListeners', EEvent.EnterFrame));
      o._eventLeaveFrame     = null;
      o._leaveFrameListeners = RClass.register(o, new AListener('_leaveFrameListeners', EEvent.LeaveFrame));
      //..........................................................
      // @event
      o.onProcess            = FScene_onProcess;
      //..........................................................
      // @method
      o.construct            = FScene_construct;
      // @method
      o.setup                = FScene_setup;
      o.active               = FScene_active;
      o.deactive             = FScene_deactive;
      // @method
      o.processEvent         = FScene_processEvent;
      o.process              = FScene_process;
      // @method
      o.dispose              = FScene_dispose;
      return o;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_onProcess = function FScene_onProcess(){
      var o = this;
      // 前处理
      o.processEnterFrameListener(o._eventEnterFrame);
      // 场景处理
      if(o._activeStage){
         o._activeStage.process();
      }
      // 后处理
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_construct = function FScene_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置变量
      o._eventEnterFrame = new SEvent();
      o._eventLeaveFrame = new SEvent();
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_setup = function FScene_setup(){
      var o = this;
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_active = function FScene_active(){
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
   MO.FScene_deactive = function FScene_deactive(){
      var o = this;
      // 设置状态
      o._statusActive = false;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_process = function FScene_process(){
      var o = this;
      if(o._statusActive){
         o.onProcess();
      }
   }

   //==========================================================
   // <T>事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FScene_processEvent = function FScene_processEvent(event){
      var o = this;
      // 处理事件
      o.dispatcherEvent(event);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_dispose = function FScene_dispose(){
      var o = this;
      o._eventEnterFrame = RObject.dispose(o._eventEnterFrame);
      o._eventLeaveFrame = RObject.dispose(o._eventLeaveFrame);
      // 父处理
      o.__base.MListener.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
