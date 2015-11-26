//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastIndexView = function FEaiCockpitForecastIndexView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastIndexView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastIndexView_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastIndexView_setup;
   o.processLogic = MO.FEaiCockpitForecastIndexView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastIndexView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexView_onPaintBegin = function FEaiCockpitForecastIndexView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexView_construct = function FEaiCockpitForecastIndexView_construct() {
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
MO.FEaiCockpitForecastIndexView_setup = function FEaiCockpitForecastIndexView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexView_processLogic = function FEaiCockpitForecastIndexView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexView_dispose = function FEaiCockpitForecastIndexView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
