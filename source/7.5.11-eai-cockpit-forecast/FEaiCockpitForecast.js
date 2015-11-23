//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitForecast = function FEaiCockpitForecast(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecast_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecast_setup;
   // @method
   o.process     = MO.FEaiCockpitForecast_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecast_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecast_construct = function FEaiCockpitForecast_construct(){
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
MO.FEaiCockpitForecast_setup = function FEaiCockpitForecast_setup(){
   var o = this;
   o.__base.FEaiCockpitModule.setup.call(o);
   // 创建缩略
   var snapshot = o._controlSnapshot = MO.Class.create(MO.FEaiCockpitForecastSnapshot);
   snapshot.linkGraphicContext(o);
   snapshot.setParentModule(o);
   snapshot.setup();
   // 创建视图
   var view = o._controlView = MO.Class.create(MO.FEaiCockpitForecastView);
   view.linkGraphicContext(o);
   view.setParentModule(o);
   view.setup();
   // 增加显示图
   o._viewDisplay.push(view._moduleManager.display());
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecast_process = function FEaiCockpitForecast_process(){
   var o = this;
   o.__base.FEaiCockpitModule.process.call(o);
   // 创建缩略
   var view = o._controlView;
   view._moduleManager.process();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecast_dispose = function FEaiCockpitForecast_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
