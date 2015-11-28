//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic001Snapshot = function FEaiCockpitForecastLogic001Snapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/logic1.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastLogic001Snapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastLogic001Snapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastLogic001Snapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastLogic001Snapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastLogic001Snapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastLogic001Snapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic001Snapshot_onPaintBegin = function FEaiCockpitForecastLogic001Snapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic001Snapshot_onPaintEnd = function FEaiCockpitForecastLogic001Snapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic001Snapshot_construct = function FEaiCockpitForecastLogic001Snapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(2, 1, 0);
   o._cellSize.set(6, 4);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic001Snapshot_setup = function FEaiCockpitForecastLogic001Snapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic001Snapshot_processLogic = function FEaiCockpitForecastLogic001Snapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic001Snapshot_dispose = function FEaiCockpitForecastLogic001Snapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
