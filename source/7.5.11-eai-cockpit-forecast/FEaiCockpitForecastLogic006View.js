//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic006View = function FEaiCockpitForecastLogic006View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastLogic006View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastLogic006View_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastLogic006View_setup;
   o.processLogic = MO.FEaiCockpitForecastLogic006View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastLogic006View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006View_onPaintBegin = function FEaiCockpitForecastLogic006View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006View_construct = function FEaiCockpitForecastLogic006View_construct() {
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
MO.FEaiCockpitForecastLogic006View_setup = function FEaiCockpitForecastLogic006View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006View_processLogic = function FEaiCockpitForecastLogic006View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006View_dispose = function FEaiCockpitForecastLogic006View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
