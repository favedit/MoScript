//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogic005View = function FEaiCockpitWarningLogic005View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitWarningLogic005View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitWarningLogic005View_construct;
   // @method
   o.setup        = MO.FEaiCockpitWarningLogic005View_setup;
   o.processLogic = MO.FEaiCockpitWarningLogic005View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitWarningLogic005View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic005View_onPaintBegin = function FEaiCockpitWarningLogic005View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic005View_construct = function FEaiCockpitWarningLogic005View_construct() {
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
MO.FEaiCockpitWarningLogic005View_setup = function FEaiCockpitWarningLogic005View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic005View_processLogic = function FEaiCockpitWarningLogic005View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic005View_dispose = function FEaiCockpitWarningLogic005View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
