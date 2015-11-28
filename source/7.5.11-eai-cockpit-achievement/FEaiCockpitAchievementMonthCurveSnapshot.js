//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot = function FEaiCockpitAchievementMonthCurveSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/achievement/dayCurve.png';
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
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
   o._comingSoonImage      = null;
   o._dataset              = null;
   o._lineColors           = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitAchievementMonthCurveSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintEnd;
   o.setData               = MO.FEaiCockpitAchievementMonthCurveSnapshot_setData;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementMonthCurveSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementMonthCurveSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementMonthCurveSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementMonthCurveSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementMonthCurveSnapshot_dispose;
   //..........................................................


   //..........................................................
   return o;
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitAchievementMonthCurveSnapshot_onDataFetch = function FEaiCockpitAchievementMonthCurveSnapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   var monthData = o._data;
   monthData.unserializeSignBuffer(event.sign, event.content, true);
   var ss = monthData;
   // 读取数据
   o.setData(monthData);

}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintBegin = function FEaiCockpitAchievementMonthCurveSnapshot_onPaintBegin(event) {
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
MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintEnd = function FEaiCockpitAchievementMonthCurveSnapshot_onPaintEnd(event) {
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
   graphic.drawImage(o._redemptionImage,left+width-100,top+20,54,60);
   //graphic.draw
   var title = '当月业绩趋势（天）';
   var titleWidth = graphic.textWidth(title);
   graphic.setFont('bold 16px Microsoft YaHei');
   graphic.drawText(title,left+width/2-titleWidth/2,top+25,'#fee71f');
   //..........................................................

   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_construct = function FEaiCockpitAchievementMonthCurveSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 5, 0);
   o._cellSize.set(7, 2);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitAchievementMessageNextMonths);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_setup = function FEaiCockpitAchievementMonthCurveSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 加载图片
   o._redemptionImage = o.loadResourceImage('{eai.resource}/cockpit/achievement/redemption.png');
      //画日曲线
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartLinePainter);
   chart.setLocation(60,11);
   chart.setSize(720,150);
   chart.paintRectangle().set(50,30,580,150);
   chart.axisX().createDegrees(1, 31);
   chart.axisY().setLineWidth(1);
   chart.axisY().setLineColor('#758191');
   chart.axisX().setOptionShowAxis(false);
   chart.axisX().setOptionShowFirstLine(true);
   chart.axisX().findDegreeByValue(1).setLabel("1");
   chart.axisX().findDegreeByValue(1).setLineColor("#758191");
   chart.axisX().findDegreeByValue(6).setLabel("6");
   chart.axisX().findDegreeByValue(11).setLabel("11");
   chart.axisX().findDegreeByValue(16).setLabel("16");
   chart.axisX().findDegreeByValue(21).setLabel("21");
   chart.axisX().findDegreeByValue(26).setLabel("26");
   chart.axisX().findDegreeByValue(31).setLabel("31");
   chart.axisY().setDivisor(10000);
   chart.axisX().setLabel("(天)");
   chart.axisY().setLabel("(万)");
   chart.axisY().setDegreeLabelGap(6);
   chart.axisX().setDegreeLabelGap(6);

   o.push(chart);

   //..........................................................
   var lineColors = o._lineColors = ['#4b5e6f', '#80a861', '#2069a0', '#51c0db', '#68f34e', '#9b1933'];
   var dataset = o._dataset = MO.Class.create(MO.FUiChartDataset);
   for (var i=0;i<6;i++){
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
MO.FEaiCockpitAchievementMonthCurveSnapshot_setData = function FEaiCockpitAchievementMonthCurveSnapshot_setData(data) {
   var o = this;
   var data = o._data;
   var month = data.Month();
   var lastMonth = data.lastMonth();
   var dataset = o._dataset;
   var serieses = dataset.serieses();
   var monthCount = month.count();
   var lastMonthCount = lastMonth.count();
   var colors = o._lineColors;
   // 清空老数据
   for(var i = 0; i < 6; ++i) {
      var series = serieses.get(i);
      series.values().clear();
   }
   for(var i = 0; i < monthCount; ++i) {
      var day = month.get(i);
      if(day.investmentAmount() != 0) serieses.get(0).values().push(day.investmentAmount());
      if(day.redemptionAmount() != 0) serieses.get(1).values().push(day.redemptionAmount());
      if(day.netinvestmentAmount() != 0) serieses.get(2).values().push(day.netinvestmentAmount());
   }
   for (var i = 0; i <lastMonthCount; i++) {
      var day = lastMonth.get(i);
      if(day.investmentAmount() != 0) serieses.get(3).values().push(day.investmentAmount());
      if(day.redemptionAmount() != 0) serieses.get(4).values().push(day.redemptionAmount());
      if(day.netinvestmentAmount() != 0){
         serieses.get(5).setOptionShowDot(true);
         serieses.get(5).setDotColor(colors[i]);
         serieses.get(5).setDotSize(3);
         serieses.get(5).values().push(day.netinvestmentAmount());
      }
   };
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
MO.FEaiCockpitAchievementMonthCurveSnapshot_processLogic = function FEaiCockpitAchievementMonthCurveSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetchMonth(o, o.onDataFetch);
   }
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_dispose = function FEaiCockpitAchievementMonthCurveSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
