//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitStatusLogic003View = function FEaiCockpitStatusLogic003View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitStatusLogic003View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitStatusLogic003View_construct;
   // @method
   o.setup        = MO.FEaiCockpitStatusLogic003View_setup;
   o.processLogic = MO.FEaiCockpitStatusLogic003View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitStatusLogic003View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic003View_onPaintBegin = function FEaiCockpitStatusLogic003View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic003View_construct = function FEaiCockpitStatusLogic003View_construct() {
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
MO.FEaiCockpitStatusLogic003View_setup = function FEaiCockpitStatusLogic003View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic003View_processLogic = function FEaiCockpitStatusLogic003View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogic003View_dispose = function FEaiCockpitStatusLogic003View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
