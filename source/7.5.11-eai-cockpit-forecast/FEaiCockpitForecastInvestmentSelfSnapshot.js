//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot = function FEaiCockpitForecastInvestmentSelfSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/logic.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastInvestmentSelfSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastInvestmentSelfSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastInvestmentSelfSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastInvestmentSelfSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastInvestmentSelfSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastInvestmentSelfSnapshot_dispose;
   o._dataTicker    = null;
   o.onFetchData    = MO.FEaiCockpitForecastInvestmentSelfSnapshot_onFetchData;
   //..........................................................
   return o;
}
//==========================================================
// <T>数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot_onFetchData = function FEaiCockpitForecastInvestmentSelfSnapshot_onFetchData(event){
   var o = this;
}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot_onPaintBegin = function FEaiCockpitForecastInvestmentSelfSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot_onPaintEnd = function FEaiCockpitForecastInvestmentSelfSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot_construct = function FEaiCockpitForecastInvestmentSelfSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(2, 1, 0);
   o._cellSize.set(6, 3);
   o._dataTicker = new MO.TTicker(1000 * 10);

}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot_setup = function FEaiCockpitForecastInvestmentSelfSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot_processLogic = function FEaiCockpitForecastInvestmentSelfSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   if(o._dataTicker.process()){
      var forecast = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
      forecast.doFetchTitle(o, o.onFetchData);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastInvestmentSelfSnapshot_dispose = function FEaiCockpitForecastInvestmentSelfSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
