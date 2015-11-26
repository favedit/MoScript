//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitLogoSnapshot = function FEaiCockpitLogoSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._name          = 'cockpit.logo.snapshot';
   o._backgroundUri = '{eai.resource}/cockpit/logo/ground.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitLogoSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitLogoSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitLogoSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitLogoSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitLogoSnapshot_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoSnapshot_onPaintBegin = function FEaiCockpitLogoSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoSnapshot_construct = function FEaiCockpitLogoSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(3, 1);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoSnapshot_setup = function FEaiCockpitLogoSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoSnapshot_processLogic = function FEaiCockpitLogoSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoSnapshot_dispose = function FEaiCockpitLogoSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
