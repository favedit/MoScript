//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot = function FEaiCockpitStatusLogicDashboardSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri   = '{eai.resource}/cockpit/status/subpage_bg.png';
   o._dashboard       = null;
   o._gridRank        = null;
   o._colorTypeImage  = null;
   o._tableImage      = null;
   o._fontTopText     = null;
   o._fontMiddleText  = null;
   o._dataTicker      = null;
   o._data            = null;
   o._index           = 0;
   //..........................................................
   // @event
   o.onPaintBegin     = MO.FEaiCockpitStatusLogicDashboardSnapshot_onPaintBegin;
   o.onPaintEnd       = MO.FEaiCockpitStatusLogicDashboardSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitStatusLogicDashboardSnapshot_construct;
   o.setData          = MO.FEaiCockpitStatusLogicDashboardSnapshot_setData;
   o.drawText         = MO.FEaiCockpitStatusLogicDashboardSnapshot_drawText;
   o.pushUnit         = MO.FEaiCockpitStatusLogicDashboardSnapshot_pushUnit;
   // @method
   o.setup            = MO.FEaiCockpitStatusLogicDashboardSnapshot_setup;
   o.processLogic     = MO.FEaiCockpitStatusLogicDashboardSnapshot_processLogic;
   // @method
   o.dispose          = MO.FEaiCockpitStatusLogicDashboardSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_onPaintBegin = function FEaiCockpitStatusLogicDashboardSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o,event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawImage(o._colorTypeImage, left + 275,top + 20);
   graphic.drawImage(o._tableImage, left + 15,top + 275);
   graphic.setFont("23px Microsoft YaHei");
   graphic.drawText(o._fontTopText, left + 20, top + 50, "rgb(255,255,255)");
   graphic.setFont("17px Microsoft YaHei");
   graphic.drawText(o._fontMiddleText, left + 20, top + 270,"rgb(255,255,255)");
   var data = o._data;
   var dashboard = o._dashboard;
   if (data){
      dashboard.setData(data.finishRate()); 
      graphic.setFont("Microsoft YaHei");
      var text = data.monthData().last().monthLabel();
      graphic.drawText(text, left + 40, top + 445, "rgb(255,255,255)");
      var text = data.monthData().last().lastMonth();
      var textLenght = text.toString().length;
      graphic.drawText(text, left + 170 - textLenght/2*9 , top + 445,"rgb(255,255,255)");
      var text = data.monthData().last().thisMonth();
      var textLenght = text.toString().length;
      graphic.drawText(text, left + 325- textLenght/2*9, top + 445,"rgb(255,255,255)");
      var text = data.monthData().last().dayRatio();
      var textLenght = text.toString().length;
      graphic.drawText(text + "%", left + 425- textLenght/2*9, top + 445,"rgb(255,255,255)");
   }
   var grid = o._gridRank;
   grid.setOptionClip(true);
   grid.setLocation(10, 270);
   grid.setSize(400, 150);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(20);
   grid.setRight(20);
   grid.setHeadHeight(40);
   grid.setHeadBackColor('rgba(0,0,0,0)');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 18;
   grid.headFont().color = '#FFFFFF';
   grid.setRowHeight(35);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#FFFFFF';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('timeData');
   if (data) {
     column.setLabel(data.titleFirst()); 
   }
   column.setDataName('time_data');
   column.setWidth(70);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('lastMonth');
   if (data) {
     column.setLabel(data.titleSecond()); 
   }
   column.setDataName('last_month');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('thisMonth');
   if (data) {
     column.setLabel(data.titleThird()); 
   }
   column.setDataName('this_month');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('dayRatio');
   if (data) {
     column.setLabel(data.titleFourth()); 
   }
   column.setDataName('day_ratio');
   column.setWidth(50);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);

}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_onPaintEnd = function FEaiCockpitStatusLogicDashboardSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_construct = function FEaiCockpitStatusLogicDashboardSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(1, 1, 0);
   o._cellSize.set(4, 4);
   o._dataTicker = new MO.TTicker(1000 * 2 );

}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_setup = function FEaiCockpitStatusLogicDashboardSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   o._colorTypeImage = o.loadResourceImage('{eai.resource}/cockpit/status/color_type.png');
   o._tableImage = o.loadResourceImage('{eai.resource}/cockpit/status/table_title.png');
   var dashboard = o._dashboard = MO.Class.create(MO.FEaiCockpitStatusSnapshotDashboard);
   // dashboard.setDashboardImage('{eai.resource}/cockpit/status/dashboard_color.png');
   dashboard.setLocation(100, 80);
   dashboard.setTextVisible(true);
   o.push(dashboard);
   o._gridRank = MO.Class.create(MO.FGuiTable);
}

//==========================================================
// <T>表格处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_drawText = function FEaiCockpitStatusLogicDashboardSnapshot_drawText(topText,middleText){
   var o = this;
   o._fontTopText = topText;
   o._fontMiddleText = middleText;
}

//==========================================================
// <T>表格处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_setData = function FEaiCockpitStatusLogicDashboardSnapshot_setData(data){
   var o = this;
   o._data = data;
   o.dirty();
}

//==========================================================
// <T>表格处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_pushUnit = function FEaiCockpitStatusLogicDashboardSnapshot_pushUnit(index){
   var o = this;
   var grid = o._gridRank;
   var row = grid.allocRow();
   if (o._data) {
      var tableData = o._data.monthData();
      var index = index%(tableData.count()-1);
      var rowData = tableData.at(index);
      row.set('time_data', rowData.monthLabel());
      row.set('last_month', rowData.lastMonth());
      row.set('this_month', rowData.thisMonth());
      row.set('day_ratio', rowData.dayRatio() + "%");
      grid.insertRow(row);
   }

}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_processLogic = function FEaiCockpitStatusLogicDashboardSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   if (o._dataTicker.process()){
      o.pushUnit(o._index);
      o._index++;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusLogicDashboardSnapshot_dispose = function FEaiCockpitStatusLogicDashboardSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
