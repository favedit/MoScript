//==========================================================
// <T>预测提示视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastTipView = function FEaiCockpitForecastTipView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitForecastTipView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastTipView_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastTipView_setup;
   o.processLogic = MO.FEaiCockpitForecastTipView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitForecastTipView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipView_onPaintBegin = function FEaiCockpitForecastTipView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipView_construct = function FEaiCockpitForecastTipView_construct() {
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
MO.FEaiCockpitForecastTipView_setup = function FEaiCockpitForecastTipView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipView_processLogic = function FEaiCockpitForecastTipView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipView_dispose = function FEaiCockpitForecastTipView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
