//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitForecastModule = function FEaiCockpitForecastModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name         = 'forecast';
   o._typeCd       = MO.EEaiCockpitModule.Logic;
   o._dataTicker   = null;
   //..........................................................
   // @method
   o.construct     = MO.FEaiCockpitForecastModule_construct;
   // @method
   o.setup         = MO.FEaiCockpitForecastModule_setup;
   // @method
   o.processResize = MO.FEaiCockpitForecastModule_processResize;
   o.process       = MO.FEaiCockpitForecastModule_process;
   // @method
   o.dispose       = MO.FEaiCockpitForecastModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModule_construct = function FEaiCockpitForecastModule_construct(){
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
MO.FEaiCockpitForecastModule_setup = function FEaiCockpitForecastModule_setup(){
   var o = this;
   // 创建缩略
   var snapshot = o._controlSnapshot = MO.Class.create(MO.FEaiCockpitForecastSnapshot);
   snapshot.linkGraphicContext(o);
   snapshot.setModuleManager(o._moduleManager);
   snapshot.setModule(o);
   snapshot.setup();
   // 创建视图
   var view = o._controlView = MO.Class.create(MO.FEaiCockpitForecastView);
   view.linkGraphicContext(o);
   view.setModuleManager(o._moduleManager);
   view.setModule(o);
   view.setup();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitForecastModule_processResize = function FEaiCockpitForecastModule_processResize(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastModule_process = function FEaiCockpitForecastModule_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModule_dispose = function FEaiCockpitForecastModule_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
