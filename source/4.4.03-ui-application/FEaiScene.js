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
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   //..........................................................
   // @event
   o.onOperationKeyDown     = MO.FEaiScene_onOperationKeyDown;
   o.onOperationResize      = MO.FEaiScene_onOperationResize;
   o.onOperationOrientation = MO.FEaiScene_onOperationOrientation;
   o.onProcessAfter         = MO.FEaiScene_onProcessAfter;
   //..........................................................
   // @method
   o.construct              = MO.FEaiScene_construct;
   // @method
   o.setup                  = MO.FEaiScene_setup;
   o.active                 = MO.FEaiScene_active;
   o.deactive               = MO.FEaiScene_deactive;
   // @method
   o.processLoaded          = MO.FEaiScene_processLoaded;
   o.processResize          = MO.FEaiScene_processResize;
   o.processEvent           = MO.FEaiScene_processEvent;
   // @method
   o.dispose                = MO.FEaiScene_dispose;
   return o;
}

//==========================================================
// <T>操作大小处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiScene_onOperationKeyDown = function FEaiScene_onOperationKeyDown(event){
   var o = this;
   o.__base.FScene.onOperationKeyDown.call(o, event);
   // 显示调试信息
   if(event.altKey && (event.keyCode == MO.EKeyCode.P)){
      var control = o._application.dynamicInfo();
      control.setVisible(!control.visible());
   }
}

//==========================================================
// <T>操作大小处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiScene_onOperationResize = function FEaiScene_onOperationResize(event){
   var o = this;
   o.__base.FScene.onOperationResize.call(o, event);
   // 改变大小处理
   o.processResize();
}

//==========================================================
// <T>操作方向处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiScene_onOperationOrientation = function FEaiScene_onOperationOrientation(event){
   var o = this;
   o.__base.FScene.onOperationOrientation.call(o, event);
   // 改变大小处理
   o.processResize();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiScene_onProcessAfter = function FEaiScene_onProcessAfter(){
   var o = this;
   o.__base.FScene.onProcessAfter.call(o);
   // 界面处理
   o._guiManager.process();
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
   // 隐藏画板
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
   desktop.hide();
   // 创建界面桌面
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(o);
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(canvas2d);
   guiManager.setup();
   // 创建控件
   var control = o._application.dynamicInfo();
   guiManager.register(control);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiScene_active = function FEaiScene_active(){
   var o = this;
   o.__base.FScene.active.call(o);
   // 创新信息
   var stage = o._activeStage;
   var control = o._application.dynamicInfo();
   control.setVisible(false);
   control.setDisplayOrder(10000);
   control.setStage(stage);
   control.setGuiManager(o._guiManager);
   // 设置舞台
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(stage);
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiScene_deactive = function FEaiScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
   // 清空舞台
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(null);
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiScene_processLoaded = function FEaiScene_processLoaded(){
   var o = this;
   // 加载完成
   var event = new MO.SEvent(o);
   MO.Window.lsnsLoaded.process(event);
   event.dispose();
   // 显示画板
   var desktop = o._application.desktop();
   desktop.show();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiScene_processResize = function FEaiScene_processResize(event){
   var o = this;
   // 界面重绘处理
   o._guiManager.dirty();
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
   o._guiManager.processEvent(event);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiScene_dispose = function FEaiScene_dispose(){
   var o = this;
   o._guiManager = MO.Lang.Object.dispose(o._guiManager);
   // 父处理
   o.__base.FScene.dispose.call(o);
}
