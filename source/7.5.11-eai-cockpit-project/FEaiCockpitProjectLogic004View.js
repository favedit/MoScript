//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectLogic004View = function FEaiCockpitProjectLogic004View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitProjectLogic004View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitProjectLogic004View_construct;
   // @method
   o.setup        = MO.FEaiCockpitProjectLogic004View_setup;
   o.processLogic = MO.FEaiCockpitProjectLogic004View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitProjectLogic004View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic004View_onPaintBegin = function FEaiCockpitProjectLogic004View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic004View_construct = function FEaiCockpitProjectLogic004View_construct() {
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
MO.FEaiCockpitProjectLogic004View_setup = function FEaiCockpitProjectLogic004View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic004View_processLogic = function FEaiCockpitProjectLogic004View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic004View_dispose = function FEaiCockpitProjectLogic004View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
