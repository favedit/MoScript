//==========================================================
// <T>简单三维舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
MO.FCanvasScene = function FCanvasScene(o){
   o = MO.Class.inherits(this, o, MO.FScene);
   //..........................................................
   // @attribute
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   //..........................................................
   // @event
   o.onOperationKeyDown     = MO.FCanvasScene_onOperationKeyDown;
   o.onOperationResize      = MO.FCanvasScene_onOperationResize;
   o.onOperationOrientation = MO.FCanvasScene_onOperationOrientation;
   o.onProcessAfter         = MO.FCanvasScene_onProcessAfter;
   //..........................................................
   // @method
   o.construct              = MO.FCanvasScene_construct;
   // @method
   o.setup                  = MO.FCanvasScene_setup;
   o.active                 = MO.FCanvasScene_active;
   o.deactive               = MO.FCanvasScene_deactive;
   // @method
   o.processLoaded          = MO.FCanvasScene_processLoaded;
   o.processResize          = MO.FCanvasScene_processResize;
   o.processEvent           = MO.FCanvasScene_processEvent;
   // @method
   o.dispose                = MO.FCanvasScene_dispose;
   return o;
}

//==========================================================
// <T>操作大小处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FCanvasScene_onOperationKeyDown = function FCanvasScene_onOperationKeyDown(event){
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
MO.FCanvasScene_onOperationResize = function FCanvasScene_onOperationResize(event){
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
MO.FCanvasScene_onOperationOrientation = function FCanvasScene_onOperationOrientation(event){
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
MO.FCanvasScene_onProcessAfter = function FCanvasScene_onProcessAfter(){
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
MO.FCanvasScene_construct = function FCanvasScene_construct(){
   var o = this;
   o.__base.FScene.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FCanvasScene_setup = function FCanvasScene_setup(){
   var o = this;
   o.__base.FScene.setup.call(o);
   // 隐藏画板
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
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
MO.FCanvasScene_active = function FCanvasScene_active(){
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
MO.FCanvasScene_deactive = function FCanvasScene_deactive(){
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
MO.FCanvasScene_processLoaded = function FCanvasScene_processLoaded(){
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
MO.FCanvasScene_processResize = function FCanvasScene_processResize(event){
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
MO.FCanvasScene_processEvent = function FCanvasScene_processEvent(event){
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
MO.FCanvasScene_dispose = function FCanvasScene_dispose(){
   var o = this;
   o._guiManager = MO.Lang.Object.dispose(o._guiManager);
   // 父处理
   o.__base.FScene.dispose.call(o);
}
