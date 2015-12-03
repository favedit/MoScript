//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogicCapitaSnapshot = function FEaiCockpitWarningLogicCapitaSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   //o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/warning/boybackground.png';
   o._contImage     = null;
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitWarningLogicCapitaSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitWarningLogicCapitaSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitWarningLogicCapitaSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitWarningLogicCapitaSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitWarningLogicCapitaSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitWarningLogicCapitaSnapshot_dispose;
   o._dataTicker    = null;
   o.onDataFetch    = MO.FEaiCockpitWarningLogicCapitaSnapshot_onDataFetch;
   o._data          = null;
   //播放数据 
   o._index         = 0;
   o._current       = 0;
   o.setChartData   = MO.FEaiCockpitWarningLogicCapitaSnapshot_setChartData;

   //..........................................................
   return o;
}
//设置柱状图数据
MO.FEaiCockpitWarningLogicCapitaSnapshot_setChartData = function FEaiCockpitWarningLogicCapitaSnapshot_setChartData(index){
   var o = this ; 
   var data = o._data;
   var dataset = o._chartDataset;
   var serieses = dataset.serieses();
   var series = serieses.get(0);
   series.values().clear();
   var chart = o._chart;
   chart.axisX().degrees().clear();
   var capita = data.capitas().at(index);
   var items = capita.items();
   var count = items.count();
   for (var i = 0; i < count; i++) {
      var item = items.at(i);
      var label = item.name();
      var value = item.count();
      series.values().push(value);
      var degree = MO.Class.create(MO.FUiChartAxisDegree);
      degree.setLabel(label);
      chart.axisX().pushDegree(degree);
   }
   var axisY = chart.axisY();
   axisY.createDegreesStandard(dataset.standardCor(7));
   axisY.formatLabels();
   o.dirty();
}
//读取数据
MO.FEaiCockpitWarningLogicCapitaSnapshot_onDataFetch = function FEaiCockpitWarningLogicCapitaSnapshot_onDataFetch(event){
   var o = this ;
   // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
   o._current = o._index%o._data.capitas()._count;
   o.setChartData(o._current);
   }
}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicCapitaSnapshot_onPaintBegin = function FEaiCockpitWarningLogicCapitaSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   if(!o._data._capitas){
      return;
   }
   graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //graphic.drawRectangle(left,top,width,height,'#ffffff');
   //graphic.drawImage(o._contImage, left, top);
   var data = o._data ;
   var capitas = data.capitas();
   var index = o._current;
   var showData = capitas.at(index);
   graphic.setFont('bold 24px Microsoft YaHei');
   graphic.drawText(showData._date,left+30,top+50,'#ffffff');
   graphic.setFont('bold 14px Microsoft YaHei');
   var textSpan = graphic.textWidth('高');
   graphic.drawTextRectangle(showData._text,left+30,top+90,width-60,height,textSpan+3,'#fee71f');
   graphic.setFont('blod 24px Microsoft YaHei');
   var titleWidth = graphic.textWidth(showData._title);
   graphic.drawText(showData._title,left+width/2-titleWidth/2,top+height-40,'#fee71f');
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicCapitaSnapshot_onPaintEnd = function FEaiCockpitWarningLogicCapitaSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicCapitaSnapshot_construct = function FEaiCockpitWarningLogicCapitaSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(2, 1, 0);
   o._cellSize.set(6, 4);
   o._data = MO.Class.create(MO.FEaiCockpitWarningMessageCapitas);
   o._dataTicker = new MO.TTicker(1000 * 15);
   o._showTicker = new MO.TTicker(1000 * 2);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicCapitaSnapshot_setup = function FEaiCockpitWarningLogicCapitaSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   //o._contImage = o.loadResourceImage('{eai.resource}/cockpit/forecast/logic1.png');

   //新建柱状图
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartBarPainter);
   chart.setLocation(50, 140);
   chart.setSize(720, 200);
   chart.paintRectangle().set(20, 0, 630, 180);
   chart.axisX().setOptionShowAxis(false);
   chart.axisX().setOptionShowFirstLine(true);
   chart.axisY().setOptionShowAxis(false);
   chart.axisY().setOptionShowFirstLine(true);
   chart.axisX().setOptionLabelVertical(true);
   chart.axisY().setLabel("(人数)");
   chart.axisX().font().parse("#ffffff 14px Microsoft YaHei");
   //chart.axisY().setDivisor(10000000);
   o.push(chart);
   var dataset = o._chartDataset = MO.Class.create(MO.FUiChartDataset);
   var series = MO.Class.create(MO.FUiChartDataSeries);
   series.setOptionShowBorder(false);
   series.setFillGradient([['0', '#20d3de'], ['0.5', '#237394'], ['1.0', '#252f62']]);
   series.setRectWidth(25);
   dataset.push(series);
   chart.setDataset(dataset);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicCapitaSnapshot_processLogic = function FEaiCockpitWarningLogicCapitaSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   o.dirty();
   if(o._dataTicker.process()){
      var warning = MO.Console.find(MO.FEaiLogicConsole).cockpit().warning();
      warning.fetchCapital(o, o.onDataFetch);
   }
   if(o._showTicker.process()){
         if(o._data.capitas()){
         o._current = o._index%o._data.capitas()._count;
         o._index ++;
         o.setChartData(o._current);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogicCapitaSnapshot_dispose = function FEaiCockpitWarningLogicCapitaSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
