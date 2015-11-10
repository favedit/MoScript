//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitForecastSnapshot = function FEaiCockpitForecastSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._gridImage            = null;
   o._listBox              = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitForecastSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitForecastSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitForecastSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitForecastSnapshot_setup;
   o.setData               = MO.FEaiCockpitForecastSnapshot_setData;
   o.processLogic          = MO.FEaiCockpitForecastSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitForecastSnapshot_dispose;
   return o;
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitForecastSnapshot_onDataFetch = function FEaiCockpitForecastSnapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   o.setData(data);
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_onPaintBegin = function FEaiCockpitForecastSnapshot_onPaintBegin(event) {
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
   graphic.drawImage(o._gridImage, 340, 27, 600, 311);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_construct = function FEaiCockpitForecastSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(3, 1, 0);
   o._cellSize.set(8, 3);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitMessageForecast);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_setup = function FEaiCockpitForecastSnapshot_setup(){
   var o = this;
   // 加载图片
   o._backgroundImage = o.loadResourceImage('{eai.resource}/cockpit/forecast/ground.png');
   o._gridImage = o.loadResourceImage('{eai.resource}/cockpit/forecast/grid.png');
   // 创建控件
   var listBox = o._listBox = MO.Class.create(MO.FGuiListBox);
   listBox.setDisplayCount(8);
   listBox.setPadding(10, 10, 10, 10);
   listBox.setLocation(30, 10);
   listBox.setSize(300, 240);
   o.push(listBox);
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_setData = function FEaiCockpitForecastSnapshot_setData(data){
   var o = this;
   // 读取数据
   var listBox = o._listBox;
   var items = data.items();
   var count = items.count();
   listBox.clear();
   for (var i = 0; i < count ; i++) {
      var item = items.at(i);
      var listItem = MO.Class.create(MO.FEaiCockpitForecastListBoxItem);
      listItem.setup(item);
      listItem.setSize(400, 40);
      listBox.push(listItem);
   }
   o.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_processLogic = function FEaiCockpitForecastSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var forecast = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
      forecast.doFetch(o, o.onDataFetch);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_dispose = function FEaiCockpitForecastSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
