//==========================================================
// <T>界面应用对象。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FGuiApplication = function FGuiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @attribute
   o._canvas   = MO.Class.register(o, new MO.AGetter('_canvas'));
   o._manager  = MO.Class.register(o, new MO.AGetter('_manager'));
   o._desktop  = MO.Class.register(o, new MO.AGetter('_desktop'));
   //..........................................................
   // @method
   o.construct = MO.FGuiApplication_construct;
   o.setup     = MO.FGuiApplication_setup;
   // @method
   o.process   = MO.FGuiApplication_process;
   // @method
   o.dispose   = MO.FGuiApplication_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiApplication_construct = function FGuiApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
   // 设置变量
   o._chapters = new MO.TDictionary();
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}

//==========================================================
// <T>注册一个舞台。</T>
//
// @method
// @param chapter:FChapter 舞台
//==========================================================
MO.FGuiApplication_setup = function FGuiApplication_setup(hPanel){
   var o = this;
   // 创建桌面
   var desktop = o._desktop = MO.Class.create(MO.FGuiDesktop);
   desktop.build(hPanel);
   // 设置画板
   var canvas = o._canvas = desktop.canvas();
   // 创建管理器
   var manager = o._manager = MO.Class.create(MO.FGuiCanvasManager);
   manager.setDesktop(desktop);
   manager.setCanvas(canvas);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiApplication_process = function FGuiApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   // 画面处理
   o._manager.process();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiApplication_dispose = function FGuiApplication_dispose(){
   var o = this;
   // 父处理
   o.__base.FApplication.dispose.call(o);
}
