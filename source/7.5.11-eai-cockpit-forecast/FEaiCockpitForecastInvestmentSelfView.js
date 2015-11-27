//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfView = function FEaiCockpitForecastInvestmentSelfView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastInvestmentSelfView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastInvestmentSelfView_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastInvestmentSelfView_setup;
   o.processLogic = MO.FEaiCockpitForecastInvestmentSelfView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastInvestmentSelfView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfView_onPaintBegin = function FEaiCockpitForecastInvestmentSelfView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfView_construct = function FEaiCockpitForecastInvestmentSelfView_construct() {
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
MO.FEaiCockpitForecastInvestmentSelfView_setup = function FEaiCockpitForecastInvestmentSelfView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfView_processLogic = function FEaiCockpitForecastInvestmentSelfView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfView_dispose = function FEaiCockpitForecastInvestmentSelfView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
