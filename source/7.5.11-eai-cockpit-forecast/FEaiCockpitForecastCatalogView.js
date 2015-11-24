//==========================================================
// <T>预测视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitForecastCatalogView = function FEaiCockpitForecastCatalogView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   //o._backgroundUri        = '{eai.resource}/cockpit/forecast/view.png';
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitForecastCatalogView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitForecastCatalogView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitForecastCatalogView_setup;
   o.processLogic          = MO.FEaiCockpitForecastCatalogView_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitForecastCatalogView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogView_onPaintBegin = function FEaiCockpitForecastCatalogView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogView_construct = function FEaiCockpitForecastCatalogView_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogView_setup = function FEaiCockpitForecastCatalogView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogView_processLogic = function FEaiCockpitForecastCatalogView_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastCatalogView_dispose = function FEaiCockpitForecastCatalogView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
