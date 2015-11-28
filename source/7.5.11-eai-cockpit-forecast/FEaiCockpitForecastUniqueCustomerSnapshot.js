//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot = function FEaiCockpitForecastUniqueCustomerSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/logic.png';
   //..........................................................
   //定时器
   o._dataTicker    = null;
   o._titleImage    = null;
   o._tableImage    = null;
   o._chart         = null;
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastUniqueCustomerSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastUniqueCustomerSnapshot_onPaintEnd;
   o.onDataFetch    = MO.FEaiCockpitForecastUniqueCustomerSnapshot_onDataFetch;
   o._data          = MO.Class.register(o, new MO.AGetSet('_data'));;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastUniqueCustomerSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastUniqueCustomerSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastUniqueCustomerSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastUniqueCustomerSnapshot_dispose;
   o.refreshData    = MO.FEaiCockpitForecastUniqueCustomerSnapshot_refreshData;
   o.refreshChartData   = MO.FEaiCockpitForecastUniqueCustomerSnapshot_refreshChartData;   
   //..........................................................
   return o;
}
//==========================================================
// <T>设置数据内容。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_refreshChartData = function FEaiCockpitForecastUniqueCustomerSnapshot_refreshChartData(event){
   var o = this;
   var data = o._data;
   var dataset = o._chartDataset;
   var serieses = dataset.serieses();
   var series = serieses.get(0);
   series.values().clear();
   var chart = o._chart;
   chart.axisX().degrees().clear();
   var items = data.datas();
   var count = items.count();
   for (var i = 0; i < count; i++) {
      var item = items.at(i);
      var label = item.departmentLable();
      var value = item.averageAchievement();
      series.values().push(value);
      var degree = MO.Class.create(MO.FUiChartAxisDegree);
      degree.setLabel(label);
      chart.axisX().pushDegree(degree);
   }
   var axisY = chart.axisY();
   axisY.createDegreesStandard(dataset.standardCor(3));
   axisY.formatLabels();
   o.dirty();
}
//==========================================================
// <T>序列化</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_onDataFetch = function FEaiCockpitForecastUniqueCustomerSnapshot_onDataFetch(event){
   var o = this;
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   if(data){
    o.refreshData(data);
    o.refreshChartData(data);
   }
}
 //==========================================================
 // <T>设置数据重新显示</T>
 //
 // @method
 // @param unit:
 //==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_refreshData = function FEaiCockpitForecastUniqueCustomerSnapshot_refreshData(data) {
    var o = this;
    var datas = data.datas();
    if (!datas) {
       return;
    }
    var grid = o._gridControl;
    grid.clearRows();
    for(var i=0;i<3;i++){
    row = grid.allocRow();
    row.set('departmentLable', datas.at(i).departmentLable().toString());
    row.set('averageTime',  parseInt(datas.at(i).averageTime()).toString());
    row.set('markerterCount',  parseInt(datas.at(i).marketerCount()).toString());
    row.set('rate',  parseInt((datas.at(i).Rate()*100)).toString());
    row.set('customerInvestment',  parseInt(datas.at(i).customerInvestment()).toString());
    row.set('averageAchievement',  parseInt(datas.at(i).averageAchievement()).toString());
    grid.pushRow(row);
    }
    o.dirty();
}
//====================
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_onPaintBegin = function FEaiCockpitForecastUniqueCustomerSnapshot_onPaintBegin(event){
   var o = this;
   var data  = o._data ;
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
   //graphic.drawRectangle(left,top,width,height,'#ffffff',3);
   graphic.setFont('24px Microsoft YaHei');
   var lable = '只有一个理财师的客户';
   //graphic.drawText(lable，left,top,'#ffffff');
   graphic.drawText(lable, 60, 35, '#ffffff');
   graphic.drawImage(o._titleImage,left+12,top+5,687,46);
   graphic.drawImage(o._tableImage,left+12,top+280,687,46);

}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_onPaintEnd = function FEaiCockpitForecastUniqueCustomerSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_construct = function FEaiCockpitForecastUniqueCustomerSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(2, 5, 0);
   o._cellSize.set(6, 4);
   o._dataTicker = new MO.TTicker(1000 * 10);
   o._data = MO.Class.create(MO.FEaiCockpitForecastMessageUniqueDataDatas);

}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_setup = function FEaiCockpitForecastUniqueCustomerSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   o._titleImage = o.loadResourceImage('{eai.resource}/cockpit/forecast/title.png');
   o._tableImage = o.loadResourceImage('{eai.resource}/cockpit/forecast/grid_title.png');
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(20, 280);
   grid.setSize(680, 180);
   grid.setHeadHeight(50);
   grid.setHeadBackColor('rgba(255,0,0,0)');

   grid.headFont().font = 'blod Microsoft YaHei';
   grid.headFont().size =  26;
   grid.headFont().color = '#21c1d1';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 24;
   grid.rowFont().color = '#ffffff';
   //公司名
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLable');
   column.setLabel('公司');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setDataName('departmentLable');
   column.setWidth(50);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   //理财师人数
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('averageTime');
   column.setLabel('在职时间');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(60);
   column.setDataName('averageTime');
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('markerterCount');
   column.setLabel('人数');
   column.setDataName('markerterCount');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(30);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('rate');
   column.setLabel('占比');
   column.setDataName('rate');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(30);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInvestment');
   column.setLabel('客户总投资');
   column.setDataName('customerInvestment');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(65);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('averageAchievement');
   column.setLabel('人均业绩');
   column.setDataName('averageAchievement');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(65);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   //..........................................................
   o.push(grid);

   //新建柱状图
   var chart = o._chart = MO.Class.create(MO.FGuiChart);
   chart.selectPainter(MO.FGuiChartBarPainter);
   chart.setLocation(30, 30);
   chart.setSize(720, 200);
   chart.paintRectangle().set(20, 0, 600, 180);
   chart.axisX().setOptionShowAxis(false);
   //chart.axisX().setOptionShowFirstLine(true);
   chart.axisY().setOptionShowAxis(false);
   chart.axisY().setOptionShowLabel(false);
   chart.axisY().setOptionShowFirstLine(true);
   chart.axisX().setOptionLabelVertical(true);
   chart.axisX().font().parse("#fee823 16px Microsoft YaHei");
   chart.axisY().setDivisor(10000000);
   o.push(chart);

   var dataset = o._chartDataset = MO.Class.create(MO.FUiChartDataset);
   var series = MO.Class.create(MO.FUiChartDataSeries);
   series.setOptionShowBorder(false);
   series.setFillColor('#245b82');
   series.setRectWidth(25);
   dataset.push(series);
   chart.setDataset(dataset);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_processLogic = function FEaiCockpitForecastUniqueCustomerSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   if(o._dataTicker.process()){
      var forecast = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
      forecast.doFetchUniqueCustomer(o, o.onDataFetch);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastUniqueCustomerSnapshot_dispose = function FEaiCockpitForecastUniqueCustomerSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
