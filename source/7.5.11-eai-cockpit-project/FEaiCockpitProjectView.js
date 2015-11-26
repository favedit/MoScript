//==========================================================
// <T>项目视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitProjectView = function FEaiCockpitProjectView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._name          = 'cockpit.project.view';
   o._backgroundUri = '{eai.resource}/cockpit/project/view.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitProjectView_onPaintBegin;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitProjectView_construct;
   // @method
   o.setup          = MO.FEaiCockpitProjectView_setup;
   o.processLogic   = MO.FEaiCockpitProjectView_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitProjectView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectView_onPaintBegin = function FEaiCockpitProjectView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectView_construct = function FEaiCockpitProjectView_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectView_setup = function FEaiCockpitProjectView_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectView_processLogic = function FEaiCockpitProjectView_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectView_dispose = function FEaiCockpitProjectView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
