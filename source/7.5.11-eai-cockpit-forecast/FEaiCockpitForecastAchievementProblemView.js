//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastAchievementProblemView = function FEaiCockpitForecastAchievementProblemView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastAchievementProblemView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastAchievementProblemView_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastAchievementProblemView_setup;
   o.processLogic = MO.FEaiCockpitForecastAchievementProblemView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastAchievementProblemView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastAchievementProblemView_onPaintBegin = function FEaiCockpitForecastAchievementProblemView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastAchievementProblemView_construct = function FEaiCockpitForecastAchievementProblemView_construct() {
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
MO.FEaiCockpitForecastAchievementProblemView_setup = function FEaiCockpitForecastAchievementProblemView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastAchievementProblemView_processLogic = function FEaiCockpitForecastAchievementProblemView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastAchievementProblemView_dispose = function FEaiCockpitForecastAchievementProblemView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
