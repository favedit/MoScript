//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot = function FEaiCockpitForecastLogic002Snapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri  = '{eai.resource}/cockpit/forecast/logic.png';
   o._titleImage     = null;
   o._gridTitle      = null;
   o._largeInvests   = null;
   o._chart          = null;
   o._chartDataset   = null;
   o._investmentDate = MO.Class.register(o, new MO.AGetter('_investmentDate'));
   //..........................................................
   // @event
   o.onPaintBegin    = MO.FEaiCockpitForecastLogic002Snapshot_onPaintBegin;
   o.onPaintEnd      = MO.FEaiCockpitForecastLogic002Snapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct       = MO.FEaiCockpitForecastLogic002Snapshot_construct;
   // @method
   o.setup           = MO.FEaiCockpitForecastLogic002Snapshot_setup;
   o.updateView      = MO.FEaiCockpitForecastLogic002Snapshot_updateView;
   o.processLogic    = MO.FEaiCockpitForecastLogic002Snapshot_processLogic;
   // @method
   o.dispose         = MO.FEaiCockpitForecastLogic002Snapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot_onPaintBegin = function FEaiCockpitForecastLogic002Snapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawImage(o._titleImage, left + 15,top + 6);
   graphic.drawImage(o._gridTitle, left + 15,top + 315);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot_onPaintEnd = function FEaiCockpitForecastLogic002Snapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot_construct = function FEaiCockpitForecastLogic002Snapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(8, 1, 0);
   o._cellSize.set(6, 4);
   o._investmentDate = MO.Class.create(MO.FEaiCockpitForecastLogic002Data);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot_setup = function FEaiCockpitForecastLogic002Snapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   o._titleImage = o.loadResourceImage('{eai.resource}/cockpit/forecast/investment_title.png');
   o._gridTitle = o.loadResourceImage('{eai.resource}/cockpit/forecast/grid_title.png');
   // 柱状图
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartBarPainter);
   chart.setLocation(10, 35);
   chart.setSize(600, 200);
   chart.paintRectangle().set(50, 44, 580, 160);
   chart.axisX().setOptionShowAxis(false);
   chart.axisX().setOptionShowFirstLine(true);
   chart.axisY().setOptionShowAxis(false);
   chart.axisY().setOptionShowFirstLine(true);
   chart.axisX().setOptionLabelVertical(true);
   chart.axisX().setLabel("(子公司)");
   chart.axisX().font().parse("#fee823 12px Microsoft YaHei");
   chart.axisY().setLabel("(人数)");
   // chart.axisY().setDivisor(10);
   o.push(chart);
   var dataset = o._chartDataset = MO.Class.create(MO.FUiChartDataset);
   var series = MO.Class.create(MO.FUiChartDataSeries);
   series.setOptionShowBorder(false);
   series.setFillColor('#245b82');
   series.setRectWidth(30);
   dataset.push(series);
   chart.setDataset(dataset);
   // 表格
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setLocation(20, 320);
   grid.setSize(100, 320);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(10);
   grid.setRight(7);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('rgba(255,255,255,0)');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(35);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   // grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('department');
   column.setLabel('所属公司');
   column.setDataName('department_data');
   column.setWidth(20);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('rmarketer');
   column.setLabel('理财师编号');
   column.setDataName('rmarketer_data');
   column.setWidth(20);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('investmentCount');
   column.setLabel('投资次数');
   column.setDataName('investment_ount');
   column.setWidth(20);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('investmentTotal');
   column.setLabel('投资额(万)');
   column.setDataName('investment_total');
   column.setWidth(20);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('redemptionTotal');
   column.setLabel('赎回额(万)');
   column.setDataName('redemption_total');
   column.setWidth(20);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('netinvestmentTotal');
   column.setLabel('净投额(万)');
   column.setDataName('netinvestment_total');
   column.setWidth(20);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   // 获取数据
   var statistics = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
   statistics.doFetch002(o, o.updateView);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot_updateView = function FEaiCockpitForecastLogic002Snapshot_updateView(event){
   var o = this;
   var content = event.content;
   var investmentDate = o._investmentDate;
   investmentDate.unserializeSignBuffer(event.sign, event.content, true);
   o._largeInvests = investmentDate.investmentSelf();
   var largeInvests = o._largeInvests;
   var grid = o._gridRank;
   grid.clearRows();

   var dataset = o._chartDataset;
   var serieses = dataset.serieses();
   var series = serieses.get(0);
   var chart = o._chart;
   series.values().clear();
   series.setFillGradient([['0', '#20d3de'], ['0.5', '#237394'], ['1.0', '#252f62']]);
   var count = largeInvests.count();
   if( count != null){
      for (var i = 0; i < largeInvests.count(); i++) {
         var largeInvest = largeInvests.at(i);
         if (i < 3) {
            // 表格只显示前三
            var row = grid.allocRow();
            row.set('department_data',largeInvest.department());
            row.set('rmarketer_data',largeInvest.rmarketerId());
            row.set('investment_ount',largeInvest.investmentCount());
            var investmentTotal = largeInvest.investmentTotal();
            row.set('investment_total',(investmentTotal / 10000 ).toFixed(1));
            var redemptionTotal = largeInvest.redemptionTotal();
            row.set('redemption_total',(redemptionTotal / 10000 ).toFixed(1));
            var netinvestmentTotal = largeInvest.netinvestmentTotal();
            row.set('netinvestment_total',(netinvestmentTotal / 10000 ).toFixed(1));
            grid.pushRow(row);
         }
         var label = largeInvest.department();
         var value = largeInvest.investmentCount();
         series.values().push(value);
         var degree = MO.Class.create(MO.FUiChartAxisDegree);
         degree.setLabel(label);
         chart.axisX().pushDegree(degree);

      }
   }
   var axisY = chart.axisY();
   axisY.createDegreesStandard(dataset.standardCor(5));
   axisY.formatLabels();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot_processLogic = function FEaiCockpitForecastLogic002Snapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogic002Snapshot_dispose = function FEaiCockpitForecastLogic002Snapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
