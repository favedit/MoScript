//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic010Snapshot = function FEaiCockpitForecastLogic010Snapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/logic.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastLogic010Snapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastLogic010Snapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastLogic010Snapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastLogic010Snapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastLogic010Snapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastLogic010Snapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic010Snapshot_onPaintBegin = function FEaiCockpitForecastLogic010Snapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic010Snapshot_onPaintEnd = function FEaiCockpitForecastLogic010Snapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic010Snapshot_construct = function FEaiCockpitForecastLogic010Snapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(8, 17, 0);
   o._cellSize.set(6, 4);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic010Snapshot_setup = function FEaiCockpitForecastLogic010Snapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic010Snapshot_processLogic = function FEaiCockpitForecastLogic010Snapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic010Snapshot_dispose = function FEaiCockpitForecastLogic010Snapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
