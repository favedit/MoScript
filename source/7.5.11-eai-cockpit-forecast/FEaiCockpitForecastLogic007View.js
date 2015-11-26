//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic007View = function FEaiCockpitForecastLogic007View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastLogic007View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastLogic007View_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastLogic007View_setup;
   o.processLogic = MO.FEaiCockpitForecastLogic007View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastLogic007View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic007View_onPaintBegin = function FEaiCockpitForecastLogic007View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic007View_construct = function FEaiCockpitForecastLogic007View_construct() {
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
MO.FEaiCockpitForecastLogic007View_setup = function FEaiCockpitForecastLogic007View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic007View_processLogic = function FEaiCockpitForecastLogic007View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic007View_dispose = function FEaiCockpitForecastLogic007View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
