//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot = function FEaiCockpitWarningLogicRedemptionSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   //o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/warning/boybackground.png';
   o._contImage     = null;
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitWarningLogicRedemptionSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitWarningLogicRedemptionSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitWarningLogicRedemptionSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitWarningLogicRedemptionSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitWarningLogicRedemptionSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitWarningLogicRedemptionSnapshot_dispose;
   o._dataTicker    = null;
   o.onDataFetch    = MO.FEaiCockpitWarningLogicRedemptionSnapshot_onDataFetch;
   o._data          = null; 
   o._current       = 0;
   o._index         = 0;
   o.setData        = MO.FEaiCockpitWarningLogicRedemptionSnapshot_setData;
   //..........................................................
   return o;
}
//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_setData = function FEaiCockpitWarningLogicRedemptionSnapshot_setData() {
   var o = this;
   var data = o._data;
   var redemptions = data.redemptions();
   var current = o._current;
   var data  = redemptions.at(current);

   var items = data.items();
   var dataset = o._dataset;
   var serieses = dataset.serieses();
   var itemsCount = items.count();
   var colors = o._lineColors;
   // 清空老数据
   for(var i = 0; i < 2; ++i) {
      var series = serieses.get(i);
      series.values().clear();
   }
   for(var i = 0; i < itemsCount; ++i) {
      var item = items.get(i);
      if(item.invest() != 0) serieses.get(0).values().push(item.invest());
      if(item.redemp() != 0) serieses.get(1).values().push(item.redemp());
   }

   var yAxis = o._chart.axisY();
   yAxis.createDegreesStandard(dataset.standardCor(8));
   yAxis.formatLabels();
   var zero = yAxis.findDegreeByValue(0);
   if (zero) {
      zero.setLineWidth(2);
      zero.setLineColor("#fec334")
   }
   o.dirty();
}
//==========================================================
// <T>//读取数据</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_onDataFetch = function FEaiCockpitWarningLogicRedemptionSnapshot_onDataFetch(event){
   var o = this ;
   // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
   // o._current = o._index%o._data.capitas()._count;
   o.setData();
   o.dirty();
   }
}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_onPaintBegin = function FEaiCockpitWarningLogicRedemptionSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   if(!o._data._redemptions){
      return;
   }
   graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var data = o._data ;
   var capitas = data.redemptions();
   var index = o._current;
   var showData = capitas.at(index);
   graphic.setFont('bold 24px Microsoft YaHei');
   graphic.drawText(showData._date,left+30,top+50,'#ffffff');
   graphic.setFont('bold 14px Microsoft YaHei');
   var textSpan = graphic.textWidth('高');
   graphic.drawTextRectangle(showData._text,left+30,top+90,width-60,height,textSpan+3,'#fee71f');
   graphic.setFont('blod 24px Microsoft YaHei');
   var titleWidth = graphic.textWidth(showData._title);
   graphic.drawText(showData._title,left+width/2-titleWidth,top+height-40,'#fee71f');
   var span = 40;
   var lineWidth = 33;
   var textspan = 40;
   graphic.drawLine(left+width/2+span,top+height-45,left+width/2+span+lineWidth,top+height-45,'#27ee6f',2);
   var investTitle = '投资';
   graphic.drawText(investTitle,left+width/2+span+textspan,top+height-40,'#ffffff');
   span += 120;
   graphic.drawLine(left+width/2+span,top+height-45,left+width/2+span+lineWidth,top+height-45,'#51a9ff',2);
   var redempTitle = '赎回';
   graphic.drawText(redempTitle,left+width/2+span+textspan,top+height-40,'#ffffff');

}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_onPaintEnd = function FEaiCockpitWarningLogicRedemptionSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_construct = function FEaiCockpitWarningLogicRedemptionSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(2, 6, 0);
   o._cellSize.set(6, 4);
   o._dataTicker = new MO.TTicker(1000 * 10);
   o._refreshTicker = new MO.TTicker(1000 * 2);
   o._data = MO.Class.create(MO.FEaiCockpitWarningMessageRedemptions);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_setup = function FEaiCockpitWarningLogicRedemptionSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartLinePainter);
   chart.setLocation(30,120);
   chart.setSize(720,150);
   chart.paintRectangle().set(30,30,580,220);
   chart.axisX().createDegrees(1, 31);
   chart.axisY().setLineWidth(1);
   chart.axisY().setLineColor('#758191');
   chart.axisX().setOptionShowAxis(false);
   chart.axisX().setOptionShowFirstLine(true);
   // chart.axisX().findDegreeByValue(1).setLabel("1");
   // chart.axisX().findDegreeByValue(1).setLineColor("#758191");
   // chart.axisX().findDegreeByValue(6).setLabel("6");
   // chart.axisX().findDegreeByValue(11).setLabel("11");
   // chart.axisX().findDegreeByValue(16).setLabel("16");
   // chart.axisX().findDegreeByValue(21).setLabel("21");
   // chart.axisX().findDegreeByValue(26).setLabel("26");
   // chart.axisX().findDegreeByValue(31).setLabel("31");
   // chart.axisY().setDivisor(10000);
   chart.axisY().setLabel("(万)");
   chart.axisY().setDegreeLabelGap(6);
   chart.axisX().setDegreeLabelGap(6);
   o.push(chart);
   //..........................................................
   var lineColors = o._lineColors = ['#27ee6f', '#51a9ff'];
   var dataset = o._dataset = MO.Class.create(MO.FUiChartDataset);
   for (var i=0;i<2;i++){
      var series = MO.Class.create(MO.FUiChartDataSeries);
      series.setLineWidth(3);
      series.setLineColor(lineColors[i]);
      dataset.push(series);
   }
    chart.setDataset(dataset);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_processLogic = function FEaiCockpitWarningLogicRedemptionSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   var flag = o.visible();
   o.dirty();
   if(o._dataTicker.process()){
      var warning = MO.Console.find(MO.FEaiLogicConsole).cockpit().warning();
      warning.fetchRedemption(o, o.onDataFetch);
   }
   if(o._refreshTicker.process()){
      if(o._data.redemptions()){
         o._current = o._index%o._data.redemptions()._count;
         o._index ++;
         o.setData();
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicRedemptionSnapshot_dispose = function FEaiCockpitWarningLogicRedemptionSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
