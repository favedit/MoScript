//==========================================================
// <T>预测目录模块。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastCatalog = function FEaiCockpitForecastCatalog(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._name       = 'forecast.catalog';
   o._typeCd     = MO.EEaiCockpitModule.Logic;
   o._dataTicker = null;
   o._slideshow  = true;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitForecastCatalog_construct;
   // @method
   o.setup       = MO.FEaiCockpitForecastCatalog_setup;
   // @method
   o.process     = MO.FEaiCockpitForecastCatalog_process;
   // @method
   o.dispose     = MO.FEaiCockpitForecastCatalog_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalog_construct = function FEaiCockpitForecastCatalog_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalog_setup = function FEaiCockpitForecastCatalog_setup(){
   var o = this;
   // 创建控件
   o._controlSnapshot = o.createControl(MO.FEaiCockpitForecastCatalogSnapshot);
   o._controlView = o.createControl(MO.FEaiCockpitForecastCatalogView);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastCatalog_process = function FEaiCockpitForecastCatalog_process(){
   var o = this;
   // 创建缩略
   o.__base.FEaiCockpitModule.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalog_dispose = function FEaiCockpitForecastCatalog_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
