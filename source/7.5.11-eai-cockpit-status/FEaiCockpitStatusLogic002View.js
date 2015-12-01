//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitStatusLogic002View = function FEaiCockpitStatusLogic002View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitStatusLogic002View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitStatusLogic002View_construct;
   // @method
   o.setup        = MO.FEaiCockpitStatusLogic002View_setup;
   o.processLogic = MO.FEaiCockpitStatusLogic002View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitStatusLogic002View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic002View_onPaintBegin = function FEaiCockpitStatusLogic002View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic002View_construct = function FEaiCockpitStatusLogic002View_construct() {
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
MO.FEaiCockpitStatusLogic002View_setup = function FEaiCockpitStatusLogic002View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic002View_processLogic = function FEaiCockpitStatusLogic002View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic002View_dispose = function FEaiCockpitStatusLogic002View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
