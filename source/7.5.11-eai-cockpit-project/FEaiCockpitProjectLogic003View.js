//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectLogic003View = function FEaiCockpitProjectLogic003View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitProjectLogic003View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitProjectLogic003View_construct;
   // @method
   o.setup        = MO.FEaiCockpitProjectLogic003View_setup;
   o.processLogic = MO.FEaiCockpitProjectLogic003View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitProjectLogic003View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic003View_onPaintBegin = function FEaiCockpitProjectLogic003View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic003View_construct = function FEaiCockpitProjectLogic003View_construct() {
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
MO.FEaiCockpitProjectLogic003View_setup = function FEaiCockpitProjectLogic003View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic003View_processLogic = function FEaiCockpitProjectLogic003View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectLogic003View_dispose = function FEaiCockpitProjectLogic003View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
