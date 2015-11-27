//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 151101
//==========================================================
MO.FEaiCockpitTrendSnapshot = function FEaiCockpitTrendSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/trend/ground.png';
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   o._dataset              = null;
   // @attribute
   o._backgroundImage      = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitTrendSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitTrendSnapshot_onPaintBegin;
   o.onFetch               = MO.FEaiCockpitTrendSnapshot_onFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitTrendSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitTrendSnapshot_setup;
   o.setData               = MO.FEaiCockpitTrendSnapshot_setData;
   o.processLogic          = MO.FEaiCockpitTrendSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitTrendSnapshot_dispose;
   o._dateTextFont         = MO.Class.register(o, new MO.AGetSet('_dateTextFont'));
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_onImageLoad = function FEaiCockpitTrendSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_onPaintBegin = function FEaiCockpitTrendSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
}

//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_onFetch = function FEaiCockpitTrendSnapshot_onFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   o.setData(data);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_construct = function FEaiCockpitTrendSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 配置属性
   o._cellLocation.set(11, 2, 0);
   o._cellSize.set(5, 2);
   // 配置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitTrendMessage);
   o._dateTextFont = new MO.SUiFont();
   o._dateTextFont.size = 4;
   o._dateTextFont.bold = false;
   o._dateTextFont.color = '#ffffff';
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_setup = function FEaiCockpitTrendSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 创建图表
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartLinePainter);
   chart.setLocation(60, 11);
   chart.setSize(520, 218);
   chart.paintRectangle().set(68, 24, 424, 166);
   chart.axisX().createDegrees(1, 31);
   chart.axisX().findDegreeByValue(1).setLabel("1");
   chart.axisX().findDegreeByValue(6).setLabel("6");
   chart.axisX().findDegreeByValue(11).setLabel("11");
   chart.axisX().findDegreeByValue(16).setLabel("16");
   chart.axisX().findDegreeByValue(21).setLabel("21");
   chart.axisX().findDegreeByValue(26).setLabel("26");
   chart.axisX().findDegreeByValue(31).setLabel("31");
   chart.axisY().setDivisor(10000);
   o.push(chart);

   var lineColors = ['#4b5e6f', '#80a861', '#2069a0', '#51c0db', '#68f34e', '#9b1933'];
   var dataset = o._dataset = MO.Class.create(MO.FUiChartDataset);
   for ( var i = 0; i < 6; ++i) {
      var series = MO.Class.create(MO.FUiChartDataSeries);
      series.setLineWidth(3);
      series.setLineColor(lineColors[i]);
      dataset.push(series);
   }
   chart.setDataset(dataset);
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCockpitTrendSnapshot_setData = function FEaiCockpitTrendSnapshot_setData(data) {
   var o = this;
   var data = o._data;
   var days = data.days();
   var dataset = o._dataset;
   var serieses = dataset.serieses();
   var dayCount = days.count();
   // 清空老数据
   for(var i = 0; i < 6; ++i) {
      var series = serieses.get(i);
      series.values().clear();
   }
   for(var i = 0; i < dayCount; ++i) {
      var day = days.get(i);
      if(day.priorInvestmentAmount() != 0) serieses.get(0).values().push(day.priorInvestmentAmount());
      if(day.priorRedemptionAmount() != 0) serieses.get(1).values().push(day.priorRedemptionAmount());
      if(day.priorNetinvestmentAmount() != 0) serieses.get(2).values().push(day.priorNetinvestmentAmount());
      if(day.investmentAmount() != 0) serieses.get(3).values().push(day.investmentAmount());
      if(day.redemptionAmount() != 0) serieses.get(4).values().push(day.redemptionAmount());
      if(day.netinvestmentAmount() != 0) serieses.get(5).values().push(day.netinvestmentAmount());
   }
   var yAxis = o._chart.axisY();
   yAxis.createDegreesStandard(dataset.standardCor(8));
   yAxis.formatLabels();
   var zero = yAxis.findDegreeByValue(0);
   zero.setLineWidth(2);
   zero.setLineColor("#fec334")
   o.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_processLogic = function FEaiCockpitTrendSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var trend = MO.Console.find(MO.FEaiLogicConsole).cockpit().trend();
      trend.doFetch(o, o.onFetch);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTrendSnapshot_dispose = function FEaiCockpitTrendSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
