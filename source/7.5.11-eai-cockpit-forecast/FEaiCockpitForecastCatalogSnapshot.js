//==========================================================
// <T>预测目录预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastCatalogSnapshot = function FEaiCockpitForecastCatalogSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/catalog.png';
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastCatalogSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastCatalogSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastCatalogSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastCatalogSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastCatalogSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastCatalogSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogSnapshot_onPaintBegin = function FEaiCockpitForecastCatalogSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogSnapshot_onPaintEnd = function FEaiCockpitForecastCatalogSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogSnapshot_construct = function FEaiCockpitForecastCatalogSnapshot_construct(){
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
MO.FEaiCockpitForecastCatalogSnapshot_setup = function FEaiCockpitForecastCatalogSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogSnapshot_processLogic = function FEaiCockpitForecastCatalogSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogSnapshot_dispose = function FEaiCockpitForecastCatalogSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
