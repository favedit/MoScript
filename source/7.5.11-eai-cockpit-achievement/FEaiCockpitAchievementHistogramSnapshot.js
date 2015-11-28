//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot = function FEaiCockpitAchievementHistogramSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/achievement/histogram.png';
   o._data                 = null;
   o._chart                = null;
   o._chartDataset         = null;
   o._dataTicker           = null;
   // @attribute
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
   o.onDataFetch           = MO.FEaiCockpitAchievementHistogramSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementHistogramSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementHistogramSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementHistogramSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementHistogramSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementHistogramSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementHistogramSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementHistogramSnapshot_dispose;
   o.setData               = MO.FEaiCockpitAchievementHistogramSnapshot_setData
   //..........................................................
   o._comingSoonImage      = null;
   //..........................................................
   return o;
}
//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot_setData = function FEaiCockpitAchievementHistogramSnapshot_setData(data) {
   var o = this;
   var dataset = o._chartDataset;
   var serieses = dataset.serieses();
   var series = serieses.get(0);
   series.values().clear();
   var chart = o._chart;
   chart.axisX().degrees().clear();
   var items = data.items();
   var count = items.count();
   for (var i = 0; i < count; i++) {
      var item = items.at(i);
      var label = item.label();
      var value = item.amount();
         switch(label){
         case '合作—德聚公司':
         label = '合作—德';
         break;
         case "上海聚汇通":
         label = '上海聚汇';
         break;
         case "上海仁立网络科技有限公司":
         label = '上海仁立';
         break;
         case "卓信至诚公司":
         label = '卓信至诚';
         break;
         case "深圳钰诚财富":
         label = '深圳钰诚';
         break;  
         case "多元营销事业部":
         label = '多元营销';
         break;  
         case "深圳钰诚财富":
         label = '深圳钰诚';
         break;  
         case "金易融(上海)网络科技有限公司":
         label = '金易融';
         break;  
         case "赛杰思公司":
         label = '赛杰思';
         break;  
         case "安信普华财富投资管理（北京）有限公司":
         label = '安信普华';
         break;  
         case "在线营销事业部":
         label = '在线营销';
         break;  
         case "深圳前海志赢商务信息咨询有限公司":
         label = '深圳前海';
         break;  
         case "深圳钰诚财富":
         label = '深圳钰诚';
         break;  
         case "融泰公司（安徽）":
         label = '融泰公司';
         break;  
         case "汇仕达金融渠道部":
         label = '汇仕达';
         break;  
         case "深圳前海智赢商务信息咨询有限公司":
         label = '深圳前海';
         break;
         default:
         break;                                                  
      }
      series.values().push(value);
      var degree = MO.Class.create(MO.FUiChartAxisDegree);
      degree.setLabel(label);
      chart.axisX().pushDegree(degree);
   }
   var axisY = chart.axisY();
   axisY.createDegreesStandard(dataset.standardCor(5));
   axisY.formatLabels();

   o.dirty();
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitAchievementHistogramSnapshot_onDataFetch = function FEaiCockpitAchievementHistogramSnapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
      o.setData(data);
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot_onPaintBegin = function FEaiCockpitAchievementHistogramSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;


}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot_onPaintEnd = function FEaiCockpitAchievementHistogramSnapshot_onPaintEnd(event) {
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
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot_construct = function FEaiCockpitAchievementHistogramSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(7, 6, 0);
   o._cellSize.set(9, 3);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitAchievementMessageHistograms);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot_setup = function FEaiCockpitAchievementHistogramSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 加载图片
   //..........................................................
   //初始化柱状图
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartBarPainter);
   chart.setLocation(30, 30);
   chart.setSize(1030, 320);
   chart.paintRectangle().set(68, 44, 900, 180);
   chart.setTitle("财富端各子公司当月业绩情况");
   chart.titleFont().parse("#fde720 20px Microsoft YaHei");
   chart.axisX().setOptionShowAxis(false);
   chart.axisX().setOptionShowFirstLine(true);
   chart.axisY().setOptionShowAxis(false);
   chart.axisY().setOptionShowFirstLine(true);
   chart.axisX().setOptionLabelVertical(true);
   chart.axisX().setLabel("(子公司)");
   chart.axisX().font().parse("#fee823 12px Microsoft YaHei");
   chart.axisY().setLabel("(千万)");
   chart.axisY().setDivisor(10000000);
   o.push(chart);

   var dataset = o._chartDataset = MO.Class.create(MO.FUiChartDataset);
   var series = MO.Class.create(MO.FUiChartDataSeries);
   series.setOptionShowBorder(false);
   //series.setFillColor('#245b82');
   series.setFillGradient([['0', '#20d3de'], ['0.5', '#237394'], ['1.0', '#252f62']]);
   series.setRectWidth(20);
   dataset.push(series);
   chart.setDataset(dataset);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot_processLogic = function FEaiCockpitAchievementHistogramSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetchHistogram(o, o.onDataFetch);
   }
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementHistogramSnapshot_dispose = function FEaiCockpitAchievementHistogramSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
