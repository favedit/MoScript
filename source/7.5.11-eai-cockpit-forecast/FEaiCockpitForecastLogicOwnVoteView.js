//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteView = function FEaiCockpitForecastLogicOwnVoteView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastLogicOwnVoteView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastLogicOwnVoteView_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastLogicOwnVoteView_setup;
   o.processLogic = MO.FEaiCockpitForecastLogicOwnVoteView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastLogicOwnVoteView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteView_onPaintBegin = function FEaiCockpitForecastLogicOwnVoteView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteView_construct = function FEaiCockpitForecastLogicOwnVoteView_construct() {
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
MO.FEaiCockpitForecastLogicOwnVoteView_setup = function FEaiCockpitForecastLogicOwnVoteView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteView_processLogic = function FEaiCockpitForecastLogicOwnVoteView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteView_dispose = function FEaiCockpitForecastLogicOwnVoteView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
