//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementDayCurveSnapshot = function FEaiCockpitAchievementDayCurveSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/achievement/dayCurve.png';
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundTopImage   = null;
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
   o._redemptionImage      = null;
   //控件
   o._chart                = null;
   o._dataset              = null;
   o.setData               = MO.FEaiCockpitAchievementDayCurveSnapshot_setData;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onFetchData           = MO.FEaiCockpitAchievementDayCurveSnapshot_onFetchData;
   o.onPaintBegin          = MO.FEaiCockpitAchievementDayCurveSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementDayCurveSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementDayCurveSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementDayCurveSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementDayCurveSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementDayCurveSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementDayCurveSnapshot_dispose;
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
 MO.FEaiCockpitAchievementDayCurveSnapshot_onFetchData = function FEaiCockpitAchievementDayCurveSnapshot_onFetchData(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var daydata = o._dayData;
   daydata.unserializeSignBuffer(event.sign, event.content, true);
   o.setData(daydata);
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurveSnapshot_onPaintBegin = function FEaiCockpitAchievementDayCurveSnapshot_onPaintBegin(event) {
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
MO.FEaiCockpitAchievementDayCurveSnapshot_onPaintEnd = function FEaiCockpitAchievementDayCurveSnapshot_onPaintEnd(event) {
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
   var title = '当日业绩趋势（H）';
   var titleWidth = graphic.textWidth(title);
   graphic.setFont('bold 16px Microsoft YaHei');
   graphic.drawText(title,left+width/2-titleWidth/2,top+25,'#fee71f');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurveSnapshot_construct = function FEaiCockpitAchievementDayCurveSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 3, 0);
   o._cellSize.set(7, 2);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 10);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._dayData = MO.Class.create(MO.FEaiCockpitAchievementMessageNextDays);

}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurveSnapshot_setup = function FEaiCockpitAchievementDayCurveSnapshot_setup(){
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
   chart.axisX().createDegrees(0, 24);
   chart.axisY().setLineWidth(1);
   chart.axisY().setLineColor('#758191');
   chart.axisX().setOptionShowAxis(false);
   chart.axisX().setOptionShowFirstLine(true);
   chart.axisX().findDegreeByValue(0).setLineColor('#889395');
   chart.axisX().findDegreeByValue(0).setLabel("00:00");
   chart.axisX().findDegreeByValue(4).setLabel("04:00");
   chart.axisX().findDegreeByValue(8).setLabel("08:00");
   chart.axisX().findDegreeByValue(12).setLabel("12:00");
   chart.axisX().findDegreeByValue(16).setLabel("16:00");
   chart.axisX().findDegreeByValue(20).setLabel("20:00");
   chart.axisX().findDegreeByValue(24).setLabel("24:00");
   chart.axisX().setLabel("(h)");
   chart.axisY().setLabel("(万)");
   chart.axisY().setDivisor(10000);
   chart.axisY().setDegreeLabelGap(6);
   chart.axisX().setDegreeLabelGap(6);
   o.push(chart);

   //..........................................................
   var lineColors = ['#4b5e6f', '#80a861', '#2069a0', '#51c0db', '#68f34e', '#9b1933'];
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
MO.FEaiCockpitAchievementDayCurveSnapshot_setData = function FEaiCockpitAchievementDayCurveSnapshot_setData(data) {
   var o = this;
   var data = o._dayData;
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
   var arrDegree =  yAxis.degrees();
   yAxis.createDegreesStandard(dataset.standardCor(8));
   yAxis.formatLabels();
   var zero = yAxis.findDegreeByValue(0);
   if (zero) {
      zero.setLineWidth(3);
      zero.setLineColor("#ffe721")
   }
   o.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurveSnapshot_processLogic = function FEaiCockpitAchievementDayCurveSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
         var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
         achievement.doFetchDay(o, o.onFetchData);
   }
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementDayCurveSnapshot_dispose = function FEaiCockpitAchievementDayCurveSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
