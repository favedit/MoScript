//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerView = function FEaiCockpitForecastUniqueCustomerView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastUniqueCustomerView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastUniqueCustomerView_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastUniqueCustomerView_setup;
   o.processLogic = MO.FEaiCockpitForecastUniqueCustomerView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastUniqueCustomerView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerView_onPaintBegin = function FEaiCockpitForecastUniqueCustomerView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerView_construct = function FEaiCockpitForecastUniqueCustomerView_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerView_setup = function FEaiCockpitForecastUniqueCustomerView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerView_processLogic = function FEaiCockpitForecastUniqueCustomerView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerView_dispose = function FEaiCockpitForecastUniqueCustomerView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
