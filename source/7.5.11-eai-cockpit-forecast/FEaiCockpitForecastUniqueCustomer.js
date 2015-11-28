//==========================================================
// <T>预测指数模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastUniqueCustomer = function FEaiCockpitForecastUniqueCustomer(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.uniqueCustomer.01';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecastUniqueCustomer_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecastUniqueCustomer_setup;
   // @method
   o.process     = MO.FEaiCockpitForecastUniqueCustomer_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecastUniqueCustomer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomer_construct = function FEaiCockpitForecastUniqueCustomer_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomer_setup = function FEaiCockpitForecastUniqueCustomer_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastUniqueCustomerSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastUniqueCustomerView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastUniqueCustomer_process = function FEaiCockpitForecastUniqueCustomer_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomer_dispose = function FEaiCockpitForecastUniqueCustomer_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
