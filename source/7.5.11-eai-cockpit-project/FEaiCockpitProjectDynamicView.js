//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectDynamicView = function FEaiCockpitProjectDynamicView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitProjectDynamicView_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitProjectDynamicView_construct;
   // @method
   o.setup        = MO.FEaiCockpitProjectDynamicView_setup;
   o.processLogic = MO.FEaiCockpitProjectDynamicView_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitProjectDynamicView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicView_onPaintBegin = function FEaiCockpitProjectDynamicView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicView_construct = function FEaiCockpitProjectDynamicView_construct() {
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
MO.FEaiCockpitProjectDynamicView_setup = function FEaiCockpitProjectDynamicView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicView_processLogic = function FEaiCockpitProjectDynamicView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectDynamicView_dispose = function FEaiCockpitProjectDynamicView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
