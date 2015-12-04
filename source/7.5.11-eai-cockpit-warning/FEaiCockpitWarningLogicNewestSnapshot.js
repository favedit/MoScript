//==========================================================
// <T>预测目录预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicNewestSnapshot = function FEaiCockpitWarningLogicNewestSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/warning/newest.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitWarningLogicNewestSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitWarningLogicNewestSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitWarningLogicNewestSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitWarningLogicNewestSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitWarningLogicNewestSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitWarningLogicNewestSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewestSnapshot_onPaintBegin = function FEaiCockpitWarningLogicNewestSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewestSnapshot_onPaintEnd = function FEaiCockpitWarningLogicNewestSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewestSnapshot_construct = function FEaiCockpitWarningLogicNewestSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(14, 1, 0);
   o._cellSize.set(2, 8);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewestSnapshot_setup = function FEaiCockpitWarningLogicNewestSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewestSnapshot_processLogic = function FEaiCockpitWarningLogicNewestSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicNewestSnapshot_dispose = function FEaiCockpitWarningLogicNewestSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
