//==========================================================
// <T>简单三维舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
MO.FEaiScene = function FEaiScene(o){
   o = MO.Class.inherits(this, o, MO.FScene);
   //..........................................................
   // @attribute
   o._optionDebug      = false;
   // @attribute
   o._desktop          = MO.Class.register(o, new MO.AGetter('_desktop'));
   // @attribute
   o._engineInfo       = null;
   //..........................................................
   // @event
   o.onOperationResize = MO.FEaiScene_onOperationResize;
   o.onProcess         = MO.FEaiScene_onProcess;
   //..........................................................
   // @method
   o.construct         = MO.FEaiScene_construct;
   // @method
   o.setup             = MO.FEaiScene_setup;
   o.active            = MO.FEaiScene_active;
   o.deactive          = MO.FEaiScene_deactive;
   // @method
   o.processEvent      = MO.FEaiScene_processEvent;
   // @method
   o.dispose           = MO.FEaiScene_dispose;
   return o;
}

//==========================================================
// <T>操作大小处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiScene_onOperationResize = function FEaiScene_onOperationResize(event){
   this._desktop.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiScene_onProcess = function FEaiScene_onProcess(){
   var o = this;
   o.__base.FScene.onProcess.call(o);
   // 界面处理
   o._desktop.process();
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
   var activeDesktop = MO.Desktop.activeDesktop();
   var canvas2d = activeDesktop.canvas2d();
   // 创建界面桌面
   var desktop = o._desktop = MO.Class.create(MO.FGuiCanvasManager);
   desktop.linkGraphicContext(o);
   desktop.setCanvas(canvas2d);
   desktop.setup();
   // 创建控件
   if(o._optionDebug){
      var control = o._engineInfo = MO.Class.create(MO.FGuiEngineInfo);
      control.linkGraphicContext(o);
      control.setContext(o.graphicContext());
      control.location().set(10, 300);
      control.build();
      desktop.register(control);
   }
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
   if(o._optionDebug){
      o._engineInfo.setStage(stage);
   }
   MO.Eai.Canvas.selectStage(stage);
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiScene_deactive = function FEaiScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
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
   o.__base.FScene.processEvent.call(o, event);
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
   o._desktop = MO.RObject.dispose(o._desktop);
   // 父处理
   o.__base.FScene.dispose.call(o);
}
