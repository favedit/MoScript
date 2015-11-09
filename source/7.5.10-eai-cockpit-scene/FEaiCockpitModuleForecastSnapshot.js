//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitModuleForecastSnapshot = function FEaiCockpitModuleForecastSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._gridImage            = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitModuleForecastSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleForecastSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleForecastSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleForecastSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitModuleForecastSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitModuleForecastSnapshot_dispose;
   o.onForecastFetch       = MO.FEaiCockpitModuleForecastSnapshot_onForecastFetch;
   return o;
}
//==========================================================
// <T>去预言数据</T>
//
// @method
//==========================================================
 MO.FEaiCockpitModuleForecastSnapshot_onForecastFetch = function FEaiCockpitModuleForecastSnapshot_onForecastFetch(){
   var o = this;
   var content = event.content;
   // 读取数据
   //var data = o._data;
   //data.unserializeSignBuffer(event.sign, event.content, true);
   //o.setData(data);
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleForecastSnapshot_onImageLoad = function FEaiCockpitModuleForecastSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleForecastSnapshot_onPaintBegin = function FEaiCockpitModuleForecastSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   // 绘制背景
   graphic.drawRectangleImage(o._backgroundImage, rectangle);
   graphic.drawImage(o._gridImage, 340, 20, 592, 199);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleForecastSnapshot_construct = function FEaiCockpitModuleForecastSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(3, 5, 0);
   o._cellSize.set(8, 2);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._currentDate = new MO.TDate();
   o._data = MO.Class.create(MO.FEaiCockpitMessageForecast);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleForecastSnapshot_setup = function FEaiCockpitModuleForecastSnapshot_setup(){
   var o = this;
   // 加载图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/forecast/ground.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._gridImage = imageConsole.load('{eai.resource}/cockpit/forecast/grid.png');
   image.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleForecastSnapshot_processLogic = function FEaiCockpitModuleForecastSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      //var forecast = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
      //forecast.doFetch(o, o.onForecastFetch);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleForecastSnapshot_dispose = function FEaiCockpitModuleForecastSnapshot_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
