//==========================================================
// <T>预测目录预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicOptionsSnapshot = function FEaiCockpitWarningLogicOptionsSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/warning/options.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitWarningLogicOptionsSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitWarningLogicOptionsSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitWarningLogicOptionsSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitWarningLogicOptionsSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitWarningLogicOptionsSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitWarningLogicOptionsSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsSnapshot_onPaintBegin = function FEaiCockpitWarningLogicOptionsSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsSnapshot_onPaintEnd = function FEaiCockpitWarningLogicOptionsSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsSnapshot_construct = function FEaiCockpitWarningLogicOptionsSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 1, 0);
   o._cellSize.set(2, 8);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsSnapshot_setup = function FEaiCockpitWarningLogicOptionsSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsSnapshot_processLogic = function FEaiCockpitWarningLogicOptionsSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicOptionsSnapshot_dispose = function FEaiCockpitWarningLogicOptionsSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
