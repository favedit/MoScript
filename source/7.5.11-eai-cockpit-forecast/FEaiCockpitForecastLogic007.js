//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic007 = function FEaiCockpitForecastLogic007(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.logic.007';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecastLogic007_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecastLogic007_setup;
   // @method
   o.process     = MO.FEaiCockpitForecastLogic007_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecastLogic007_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic007_construct = function FEaiCockpitForecastLogic007_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic007_setup = function FEaiCockpitForecastLogic007_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastLogic007Snapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastLogic007View);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastLogic007_process = function FEaiCockpitForecastLogic007_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic007_dispose = function FEaiCockpitForecastLogic007_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
