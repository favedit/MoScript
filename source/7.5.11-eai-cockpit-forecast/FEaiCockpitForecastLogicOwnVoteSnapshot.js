//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot = function FEaiCockpitForecastLogicOwnVoteSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri  = '{eai.resource}/cockpit/forecast/logic.png';
   o._titleImage     = null;
   o._gridTitle      = null;
   o._dataTicker     = null;
   o._largeInvests   = null;
   o._chart          = null;
   o._chartDataset   = null;
   o._investmentDate = MO.Class.register(o, new MO.AGetter('_investmentDate'));
   o._histogram      = MO.Class.register(o, new MO.AGetter('_histogram'));
   //..........................................................
   // @event
   o.onPaintBegin    = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_onPaintBegin;
   o.onPaintEnd      = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct       = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_construct;
   // @method
   o.setup           = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_setup;
   o.updateView      = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_updateView;
   o.updateHistogram = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_updateHistogram;
   o.processLogic    = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_processLogic;
   // @method
   o.dispose         = MO.FEaiCockpitForecastLogicOwnVoteSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_onPaintBegin = function FEaiCockpitForecastLogicOwnVoteSnapshot_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawImage(o._titleImage, left + 15,top + 6);
   graphic.drawImage(o._gridTitle, left + 17,top + 315);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_onPaintEnd = function FEaiCockpitForecastLogicOwnVoteSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_construct = function FEaiCockpitForecastLogicOwnVoteSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(8, 1, 0);
   o._cellSize.set(6, 4);
   o._investmentDate = MO.Class.create(MO.FEaiCockpitForecastLogicOwnVoteData);
   o._histogram = MO.Class.create(MO.FEaiCockpitForecastLogicOwnVoteHistogramData);
   o._dataTicker = new MO.TTicker(1000 * 60 );
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_setup = function FEaiCockpitForecastLogicOwnVoteSnapshot_setup(){
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
   column.setWidth(31);
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
   column.setWidth(15);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('investmentTotal');
   column.setLabel('投资额(万)');
   column.setDataName('investment_total');
   column.setWidth(18);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('redemptionTotal');
   column.setLabel('赎回额(万)');
   column.setDataName('redemption_total');
   column.setWidth(18);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('netinvestmentTotal');
   column.setLabel('净投额(万)');
   column.setDataName('netinvestment_total');
   column.setWidth(19);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   // 获取数据
   var statistics = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
   if (o._dataTicker.process()){
      statistics.doFetchOwnVote(o, o.updateView);
      statistics.doFetchUniqueCustomer(o, o.updateHistogram);
   }

}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_updateView = function FEaiCockpitForecastLogicOwnVoteSnapshot_updateView(event){
   var o = this;
   var content = event.content;
   var investmentDate = o._investmentDate;
   investmentDate.unserializeSignBuffer(event.sign, event.content, true);
   o._largeInvests = investmentDate.investmentSelf();
   var largeInvests = o._largeInvests;
   var grid = o._gridRank;
   grid.clearRows();
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
      }
   }
}

//==========================================================
// <T>刷新柱状图。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_updateHistogram = function FEaiCockpitForecastLogicOwnVoteSnapshot_updateHistogram(event){
   var o = this;
   var content = event.content;
   var histogramDate = o._histogram;
   histogramDate.unserializeSignBuffer(event.sign, event.content, true);
   var histograms = histogramDate.histogram();
   var count = histograms.count();
   var dataset = o._chartDataset;
   var serieses = dataset.serieses();
   var series = serieses.get(0);
   var chart = o._chart;
   series.values().clear();
   series.setFillGradient([['0', '#20d3de'], ['0.5', '#237394'], ['1.0', '#252f62']]);
   for (var i = 0; i < count; i++) {
         var histogram = histograms.at(i);
         var value = histogram.marketerCount();
         series.values().push(value);
         var label = histogram.department();
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
         var degree = MO.Class.create(MO.FUiChartAxisDegree);
         degree.setLabel(label);
         chart.axisX().pushDegree(degree);
         var axisY = chart.axisY();
         axisY.createDegreesStandard(dataset.standardCor(5));
         axisY.formatLabels();
   };
}
//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_processLogic = function FEaiCockpitForecastLogicOwnVoteSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastLogicOwnVoteSnapshot_dispose = function FEaiCockpitForecastLogicOwnVoteSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
}
