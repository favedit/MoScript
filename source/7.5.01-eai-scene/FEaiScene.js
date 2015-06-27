with(MO){
   //==========================================================
   // <T>简单三维舞台对象。</T>
   //
   // @class
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FScene);
      //..........................................................
      // @attribute
      o._desktop        = RClass.register(o, new AGetter('_desktop'));
      // @attribute
      o._engineInfo     = null;
      //..........................................................
      // @event
      o.onProcess       = MO.FEaiScene_onProcess;
      //..........................................................
      // @method
      o.construct       = MO.FEaiScene_construct;
      // @method
      o.setup           = MO.FEaiScene_setup;
      o.active          = MO.FEaiScene_active;
      o.deactive        = MO.FEaiScene_deactive;
      // @method
      o.processEvent    = FEaiScene_processEvent;
      // @method
      o.dispose         = MO.FEaiScene_dispose;
      return o;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_onProcess = function FEaiScene_onProcess(){
      var o = this;
      // 界面处理
      o._desktop.process();
      // 父处理
      o.__base.FScene.onProcess.call(o);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FScene.construct.call(o);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_setup = function FEaiScene_setup(){
      var o = this;
      o.__base.FScene.setup.call(o);
      // 创建控件
      var control = o._engineInfo = MO.Class.create(MO.FGuiEngineInfo);
      control.linkGraphicContext(o);
      control.setContext(o.graphicContext());
      control.location().set(10, 300);
      control.build();
      // 创建界面桌面
      var desktop = o._desktop = RClass.create(FGuiDesktop);
      desktop.linkGraphicContext(o);
      desktop.setup();
      desktop.register(control);
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FScene.active.call(o);
      var stage = o._activeStage;
      MO.Eai.Canvas.selectStage(stage);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      faceLayer.push(o._engineInfo);
      o._engineInfo.setStage(stage);
   }

   //==========================================================
   // <T>注销处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FScene.deactive.call(o);
      var stage = o._activeStage;
      var faceLayer = stage.faceLayer();
      faceLayer.remove(o._engineInfo.renderable());
      MO.Eai.Canvas.selectStage(null);
   }

   //==========================================================
   // <T>事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FEaiScene_processEvent = function FEaiScene_processEvent(event){
      var o = this;
      o.__base.FScene.processEvent();
      // 处理界面事件
      o._desktop.processEvent(event);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiScene_dispose = function FEaiScene_dispose(){
      var o = this;
      o._desktop = RObject.dispose(o._desktop);
      // 父处理
      o.__base.FScene.dispose.call(o);
   }
}
