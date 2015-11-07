//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModuleNotice = function FEaiCockpitModuleNotice(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name         = 'notice';
   o._dataTicker   = null;
   //..........................................................
   // @method
   o.construct     = MO.FEaiCockpitModuleNotice_construct;
   // @method
   o.setup         = MO.FEaiCockpitModuleNotice_setup;
   // @method
   o.processResize = MO.FEaiCockpitModuleNotice_processResize;
   o.process       = MO.FEaiCockpitModuleNotice_process;
   // @method
   o.dispose       = MO.FEaiCockpitModuleNotice_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNotice_construct = function FEaiCockpitModuleNotice_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
   // 定时获取数据
   o._dataTicker = new MO.TTicker(1000 * 60);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNotice_setup = function FEaiCockpitModuleNotice_setup(){
   var o = this;
   // 创建缩略
   var snapshot = o._controlSnapshot = MO.Class.create(MO.FEaiCockpitModuleNoticeSnapshot);
   snapshot.linkGraphicContext(o);
   snapshot.setModuleManager(o._moduleManager);
   snapshot.placeInCell();
   snapshot.size().set(512, 1024);
   snapshot.setup();
   // 创建视图
   var view = o._controlView = MO.Class.create(MO.FEaiCockpitModuleNoticeView);
   view.linkGraphicContext(o);
   view.setModuleManager(o._moduleManager);
   view.setModule(o);
   view.size().set(1920, 1080);
   view.setup();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitModuleNotice_processResize = function FEaiCockpitModuleNotice_processResize(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModuleNotice_process = function FEaiCockpitModuleNotice_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNotice_dispose = function FEaiCockpitModuleNotice_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
