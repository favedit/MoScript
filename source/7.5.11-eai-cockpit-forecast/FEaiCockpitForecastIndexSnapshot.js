//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot = function FEaiCockpitForecastIndexSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/index.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastIndexSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastIndexSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastIndexSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastIndexSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastIndexSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastIndexSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_onPaintBegin = function FEaiCockpitForecastIndexSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_onPaintEnd = function FEaiCockpitForecastIndexSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_construct = function FEaiCockpitForecastIndexSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(14, 4, 0);
   o._cellSize.set(2, 5);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_setup = function FEaiCockpitForecastIndexSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_processLogic = function FEaiCockpitForecastIndexSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_dispose = function FEaiCockpitForecastIndexSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
