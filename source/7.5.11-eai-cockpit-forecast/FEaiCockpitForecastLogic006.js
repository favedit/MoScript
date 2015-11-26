//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic006 = function FEaiCockpitForecastLogic006(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.logic.006';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecastLogic006_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecastLogic006_setup;
   // @method
   o.process     = MO.FEaiCockpitForecastLogic006_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecastLogic006_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006_construct = function FEaiCockpitForecastLogic006_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006_setup = function FEaiCockpitForecastLogic006_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastLogic006Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastLogic006View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastLogic006_process = function FEaiCockpitForecastLogic006_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006_dispose = function FEaiCockpitForecastLogic006_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
