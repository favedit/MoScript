//==========================================================
// <T>预测提示预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastTipSnapshot = function FEaiCockpitForecastTipSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/tip.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastTipSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastTipSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastTipSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastTipSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastTipSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastTipSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipSnapshot_onPaintBegin = function FEaiCockpitForecastTipSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipSnapshot_onPaintEnd = function FEaiCockpitForecastTipSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipSnapshot_construct = function FEaiCockpitForecastTipSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(14, 1, 0);
   o._cellSize.set(2, 3);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipSnapshot_setup = function FEaiCockpitForecastTipSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipSnapshot_processLogic = function FEaiCockpitForecastTipSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastTipSnapshot_dispose = function FEaiCockpitForecastTipSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
