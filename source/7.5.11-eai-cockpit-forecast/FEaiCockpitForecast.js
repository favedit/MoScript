//==========================================================
// <T>业绩趋势模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitForecast = function FEaiCockpitForecast(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitLogicModule);
   //..........................................................
   // @attribute
   o._name      = 'forecast';
   o._typeCd    = MO.EEaiCockpitModule.Logic;
   o._slideshow = true;
   //..........................................................
   // @method
   o.construct  = MO.FEaiCockpitForecast_construct;
   // @method
   o.setup      = MO.FEaiCockpitForecast_setup;
   // @method
   o.process    = MO.FEaiCockpitForecast_process;
   // @method
   o.dispose    = MO.FEaiCockpitForecast_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecast_construct = function FEaiCockpitForecast_construct(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecast_setup = function FEaiCockpitForecast_setup(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.setup.call(o);
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastView);
   // 配置模块管理器
   o.setupModuleManager(MO.FEaiCockpitForecastModuleManager);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecast_process = function FEaiCockpitForecast_process(){
   var o = this;
   o.__base.FEaiCockpitLogicModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecast_dispose = function FEaiCockpitForecast_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitLogicModule.dispose.call(o);
}
