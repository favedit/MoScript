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
   o._comingSoon           = false;
   //..........................................................
   // @attribute
   o._name                 = 'cockpit.forecast.snapshot';
   o._backgroundUri        = '{eai.resource}/cockpit/forecast/ground.png';
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
   o._rollTicker = null;
   o._switchDuration       = 5000;
   o._switchTicker         = null;
   o._lineChart            = null;
   o._switchCounter           = 0;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitForecastSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitForecastSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitForecastSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitForecastSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitForecastSnapshot_setup;
   o.setData               = MO.FEaiCockpitForecastSnapshot_setData;
   o.roll                  = MO.FEaiCockpitForecastSnapshot_roll;
   o.nextPage              = MO.FEaiCockpitForecastSnapshot_nextPage;
   o.processLogic          = MO.FEaiCockpitForecastSnapshot_processLogic;
   o.selectedIndex         = MO.FEaiCockpitForecastSnapshot_selectedIndex;
   o.showChart             = MO.FEaiCockpitForecastSnapshot_showChart;
   o.switch                = MO.FEaiCockpitForecastSnapshot_switch;
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
   var parentModule = o.parentModule();
   var moduleManager = parentModule.moduleManager();
   var switchVector = moduleManager.switchVector();
   var showSnapshot = switchVector.at(o._switchCounter % switchVector.count());
   if (showSnapshot) {
      if (showSnapshot.comingSoon()) {
         showSnapshot.paintGraphic(graphic, 120, 5, 720,480);
      } else {
         showSnapshot.setOptionBackground(false);
         showSnapshot.paintGraphic(graphic, 120, 5, 720,480);
         showSnapshot.setOptionBackground(true);
      }
   }
   
}

//==========================================================
// <T>切换显示处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_switch = function FEaiCockpitForecastSnapshot_switch() {
   var o = this;
   o._switchCounter += 1;
   o.dirty();
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
   o._cellSize.set(8, 4);
   // 设置属性
   o._switchTicker = new MO.TTicker(o._switchDuration);
 //  o._data = MO.Class.create(MO.FEaiCockpitForecastMessage);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_setup = function FEaiCockpitForecastSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   /*
   // 加载图片
   o._gridImage = o.loadResourceImage('{eai.resource}/cockpit/forecast/grid.png');
   // 创建控件
   var listBox = o._listBox = MO.Class.create(MO.FGuiListBox);
   listBox.setDisplayCount(11);
   listBox.setPadding(10, 10, 10, 10);
   listBox.setLocation(30, 10);
   listBox.setSize(300, 360); 
   o.push(listBox);

   var lineChart = o._lineChart = MO.Class.create(MO.FGuiLineChart);
   lineChart.setLocation(346, 32);
   lineChart.setSize(588, 300);
   o.push(lineChart);

  // var chartData = o._chartData = MO.Class.create(MO.FGuiLineChartData);
  // chartData.setLabels(["", "", "", "", ""]);

 //  var dataset = o._chartDataSet = MO.Class.create(MO.FGuiLineChartDataSet);
 //  chartData.setDatas(dataset);
  // dataset.setStrokeColor("#51fff1");

   o._testDataPool = [[50, 356, 521, 586, 689], 
                     [-30, 60, 70, 88, 10], 
                     [586, 486, 889, 1024, 1895], 
                     [1324, 46542, 253362, 452148, 48657]];
   */
}

//==========================================================
// <T>设置数据内容。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_setData = function FEaiCockpitForecastSnapshot_setData(){
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
MO.FEaiCockpitForecastSnapshot_roll = function FEaiCockpitForecastSnapshot_roll() {
   /*
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
   */
}

//==========================================================
// <T>翻页。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_nextPage = function FEaiCockpitForecastSnapshot_nextPage() {
   /*
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
   */
}

//==========================================================
// <T>当前选择数据索引。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_selectedIndex = function FEaiCockpitForecastSnapshot_selectedIndex() {
   var o = this;
   return (o._page - 1) * o._pageItemsMax + o._index - 1;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_processLogic = function FEaiCockpitForecastSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
    /*
   if(o._dataTicker.process()){
     // var forecast = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
     // forecast.doFetch(o, o.onDataFetch);
   }
   if(o._rollTicker.process()) {
      o.roll();
   }*/
   if (o._switchTicker.process()) {
       o.switch();
   }
}

//==========================================================
// <T>显示线图。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastSnapshot_showChart = function FEaiCockpitForecastSnapshot_showChart() {
   var o = this;
   //var itemData = o._data.items().at(o.selectedIndex);
   var index = o.selectedIndex();
   //var dataset = o._chartDataSet;
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
MO.FEaiCockpitForecastSnapshot_dispose = function FEaiCockpitForecastSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
