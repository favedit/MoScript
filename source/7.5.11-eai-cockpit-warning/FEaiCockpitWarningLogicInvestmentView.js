//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicInvestmentView = function FEaiCockpitWarningLogicInvestmentView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitWarningLogicInvestmentView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitWarningLogicInvestmentView_construct;
   // @method
   o.setup        = MO.FEaiCockpitWarningLogicInvestmentView_setup;
   o.processLogic = MO.FEaiCockpitWarningLogicInvestmentView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitWarningLogicInvestmentView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicInvestmentView_onPaintBegin = function FEaiCockpitWarningLogicInvestmentView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicInvestmentView_construct = function FEaiCockpitWarningLogicInvestmentView_construct() {
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
MO.FEaiCockpitWarningLogicInvestmentView_setup = function FEaiCockpitWarningLogicInvestmentView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicInvestmentView_processLogic = function FEaiCockpitWarningLogicInvestmentView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicInvestmentView_dispose = function FEaiCockpitWarningLogicInvestmentView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
