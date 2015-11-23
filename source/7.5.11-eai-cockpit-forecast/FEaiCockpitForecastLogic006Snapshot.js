//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot = function FEaiCockpitForecastLogic006Snapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._gridImage            = null;
   o._listBox              = null;
   o._index                = 0;
   o._page                 = 0;
   o._pageItemsTotal       = 0;
   o._pageMax              = 0;
   o._pageItemsMax         = 8;
   o._rollDuration         = 5000;
   o._rollTicker           = null;
   o._lineChart            = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitForecastLogic006Snapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitForecastLogic006Snapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitForecastLogic006Snapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitForecastLogic006Snapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitForecastLogic006Snapshot_setup;
   o.setData               = MO.FEaiCockpitForecastLogic006Snapshot_setData;
   o.roll                  = MO.FEaiCockpitForecastLogic006Snapshot_roll;
   o.nextPage              = MO.FEaiCockpitForecastLogic006Snapshot_nextPage;
   o.processLogic          = MO.FEaiCockpitForecastLogic006Snapshot_processLogic;
   o.selectedIndex         = MO.FEaiCockpitForecastLogic006Snapshot_selectedIndex;
   o.showChart             = MO.FEaiCockpitForecastLogic006Snapshot_showChart;
   // @method
   o.dispose               = MO.FEaiCockpitForecastLogic006Snapshot_dispose;
   //..........................................................
   o._comingSoonImage      = null;
   //..........................................................
   return o;
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitForecastLogic006Snapshot_onDataFetch = function FEaiCockpitForecastLogic006Snapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      var items = data.items();
      var count = items._count;
      for (var i=0;i<count;i++){
         var item = items.at(i);
         var units = item.units();
         var len = units._count;
         for(var j=0;j<len;j++){
            var unit = units[j];
         }
      }
      o.setData();
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_onPaintBegin = function FEaiCockpitForecastLogic006Snapshot_onPaintBegin(event) {
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
   graphic.drawImage(o._gridImage, 540, 27, 400, 311);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_onPaintEnd = function FEaiCockpitForecastLogic006Snapshot_onPaintEnd(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   graphic.drawImage(o._comingSoonImage, 8 * 120 - 247 + 36, 3 * 120 - 217 + 56, 247, 217);
   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_construct = function FEaiCockpitForecastLogic006Snapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(8, 7, 0);
   o._cellSize.set(5, 2);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitForecastMessage);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_setup = function FEaiCockpitForecastLogic006Snapshot_setup(){
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

   var lineChart = o._lineChart = MO.Class.create(MO.FGuiLineChart);
   lineChart.setLocation(346, 32);
   lineChart.setSize(588, 300);
   o.push(lineChart);

   var chartData = o._chartData = MO.Class.create(MO.FGuiLineChartData);
   chartData.setLabels(["", "", "", "", ""]);

   var dataset = o._chartDataSet = MO.Class.create(MO.FGuiLineChartDataSet);
   chartData.setDatas(dataset);
   dataset.setStrokeColor("#51fff1");

   o._testDataPool = [[50, 356, 521, 586, 689], 
                     [-30, 60, 70, 88, 10], 
                     [586, 486, 889, 1024, 1895], 
                     [1324, 46542, 253362, 452148, 48657]];

   //..........................................................
   o._comingSoonImage = o.loadResourceImage('{eai.resource}/cockpit/coming_soon.png');
   //..........................................................
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_setData = function FEaiCockpitForecastLogic006Snapshot_setData(){
   var o = this;
   var data = o._data;
   var count = data.items().count();
   o._pageMax = Math.ceil(count / o._pageItemsMax);

   if(o._listBox.items().count() == 0) o.roll();
   return;
}

//==========================================================
// <T>执行滚动。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_roll = function FEaiCockpitForecastLogic006Snapshot_roll() {
   var o = this;
   if(o._data.items() == null) return;

   if(o._page == 0 || o._index >= o._pageItemsTotal) {
      o.nextPage();
   }else {
      var item = o._listBox.items().at(o._index-1);
      item.setIsSelected(false);
   }

   o._index ++;
   var item = o._listBox.items().at(o._index-1);
   item.setIsSelected(true);

   o.showChart();
   o.dirty();
}

//==========================================================
// <T>翻页。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_nextPage = function FEaiCockpitForecastLogic006Snapshot_nextPage() {
   var o = this;
   o._page ++;
   if(o._page > o._pageMax) {
      o._page = 1;
   }
   var data = o._data;
   var items = data.items();
   var count = items.count();
   o._pageItemsTotal = o._page == o._pageMax ? count % o._pageItemsMax : o._pageItemsMax;
   var startIndex = o._pageItemsMax * (o._page - 1) + 1;
   var endIndex = startIndex + o._pageItemsTotal - 1;

   var listBox = o._listBox;
   listBox.clear();
   for(var i=startIndex; i <= endIndex; ++i) {
      var item = items.at(i-1);
      var listItem = MO.Class.create(MO.FEaiCockpitForecastListBoxItem);
      listItem.setup(item);
      listItem.setSize(400, 40);
      listBox.push(listItem);
   }

   o._index = 0;
}

//==========================================================
// <T>当前选择数据索引。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_selectedIndex = function FEaiCockpitForecastLogic006Snapshot_selectedIndex() {
   var o = this;
   return (o._page - 1) * o._pageItemsMax + o._index - 1;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_processLogic = function FEaiCockpitForecastLogic006Snapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var forecast = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
      forecast.doFetch(o, o.onDataFetch);
   }
   if(o._rollTicker.process()) {
      o.roll();
   }
}

//==========================================================
// <T>显示线图。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_showChart = function FEaiCockpitForecastLogic006Snapshot_showChart() {
   var o = this;
   //var itemData = o._data.items().at(o.selectedIndex);
   var index = o.selectedIndex();
   var dataset = o._chartDataSet;
   //dataset.setData(o._testDataPool[index%4]);
   var data = o._data;
   var items = data.items();
   var count = items._count;
   var item = items.at(index);

   o._lineChart.setData(item);
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitForecastLogic006Snapshot_dispose = function FEaiCockpitForecastLogic006Snapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
