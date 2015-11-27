//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastInvestmentSelf = function FEaiCockpitForecastInvestmentSelf(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.logic.001';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecastInvestmentSelf_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecastInvestmentSelf_setup;
   // @method
   o.process     = MO.FEaiCockpitForecastInvestmentSelf_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecastInvestmentSelf_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelf_construct = function FEaiCockpitForecastInvestmentSelf_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelf_setup = function FEaiCockpitForecastInvestmentSelf_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastInvestmentSelfSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastInvestmentSelfView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastInvestmentSelf_process = function FEaiCockpitForecastInvestmentSelf_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelf_dispose = function FEaiCockpitForecastInvestmentSelf_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
