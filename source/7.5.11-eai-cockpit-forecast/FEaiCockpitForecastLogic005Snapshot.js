//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic005Snapshot = function FEaiCockpitForecastLogic005Snapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/logic5.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastLogic005Snapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastLogic005Snapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastLogic005Snapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastLogic005Snapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastLogic005Snapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastLogic005Snapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic005Snapshot_onPaintBegin = function FEaiCockpitForecastLogic005Snapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic005Snapshot_onPaintEnd = function FEaiCockpitForecastLogic005Snapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic005Snapshot_construct = function FEaiCockpitForecastLogic005Snapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(2, 9, 0);
   o._cellSize.set(6, 4);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic005Snapshot_setup = function FEaiCockpitForecastLogic005Snapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic005Snapshot_processLogic = function FEaiCockpitForecastLogic005Snapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic005Snapshot_dispose = function FEaiCockpitForecastLogic005Snapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
