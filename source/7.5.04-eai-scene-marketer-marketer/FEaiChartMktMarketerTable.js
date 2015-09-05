//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 150702
//==========================================================
MO.FEaiChartMktMarketerTable = function FEaiChartMktMarketerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetter('_rank'));
   // @attribute
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineMonthImage   = null;
   o._rankLineWeeksImage   = null;
   o._rankLineDayImage     = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._dayImage             = null;
   o._weeksImage           = null;
   o._monthImage           = null;

   // @attibute
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiChartMktMarketerTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartMktMarketerTable_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartMktMarketerTable_construct;
   // @method
   o.setup                 = MO.FEaiChartMktMarketerTable_setup;
   o.pushUnit              = MO.FEaiChartMktMarketerTable_pushUnit;

   o.setRankDayUnits       = MO.FEaiChartMktMarketerTable_setRankDayUnits;
   o.setRankWeekUnits      = MO.FEaiChartMktMarketerTable_setRankWeekUnits;
   o.setRankMonthUnits     = MO.FEaiChartMktMarketerTable_setRankMonthUnits;

   o.drawRow               = MO.FEaiChartMktMarketerTable_drawRow;
   // @method
   o.dispose               = MO.FEaiChartMktMarketerTable_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktMarketerTable_onImageLoad = function FEaiChartMktMarketerTable_onImageLoad(){
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktMarketerTable_onPaintBegin = function FEaiChartMktMarketerTable_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   //..........................................................
   // 绘制背景
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);

   //..........................................................
   var titleText = '理财师业绩展示中心';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   //..........................................................
   graphic.setFont(o._rowFontStyle);
   // 绘制前3名
   var tableTop = top + o._rankStart;
   var timeX = left + 6;

   // graphic.drawGridImage(o._rankLineImage, timeX, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawGridImage(o._rankLineMonthImage, timeX, tableTop + o._rankTitleStart, width - 22, o._rankWeeksHeight, o._rankLinePadding);
   graphic.drawGridImage(o._rankLineWeeksImage, timeX, tableTop + o._rankTitleStart + 174, width - 22, 139, o._rankLinePadding);
   graphic.drawGridImage(o._rankLineDayImage, timeX, tableTop + o._rankTitleStart + 175 + 139, width - 22, 137, o._rankLinePadding);

   graphic.drawImage(o._dayImage, timeX, tableTop + 44, 56, 130);
   graphic.drawImage(o._weeksImage, timeX, tableTop + 177, 56, 137);
   graphic.drawImage(o._monthImage, timeX, tableTop + 317, 56, 130);

   var rankUnits = o._rank;
   if(rankUnits){
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for(var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktMarketerTable_construct = function FEaiChartMktMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 创建属性
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktMarketerTable_setup = function FEaiChartMktMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片 /live/grid.png
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/marketer/right.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/marketer/title.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._rankLineMonthImage = imageConsole.load('{eai.resource}/marketer/rank2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineWeeksImage = imageConsole.load('{eai.resource}/marketer/rank3.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineDayImage = imageConsole.load('{eai.resource}/marketer/rank4.png');
   image.addLoadListener(o, o.onImageLoad);


   // 创建图片
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);

   var image = o._dayImage = imageConsole.load('{eai.resource}/marketer/day.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._weeksImage = imageConsole.load('{eai.resource}/marketer/weeks.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._monthImage = imageConsole.load('{eai.resource}/marketer/month.png');
   image.addLoadListener(o, o.onImageLoad);
   // ........................................................
   // 当月
   // ........................................................
   var grid = o._gridMonthRank = MO.Class.create(MO.FGuiGridControl);
   // grid.setDisplayHead(false);
   grid.setLocation(50, 112);
   grid.setSize(800, 200);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.headPadding().set(0,0,0,10);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   // 排名
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('month_images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthDepartmentLabel');
   column.setLabel('公司');
   column.setDataName('month_department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthMarketerLabel');
   column.setLabel('理财师');
   column.setDataName('month_marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('monthInvestmentTotal');
   column.setLabel('投资');
   column.setDataName('month_investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('monthCustomerCount');
   column.setLabel('客户数');
   column.setDataName('month_customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 0, 1);
   grid.pushColumn(column);
   o.push(grid);


   // 当周
   //..........................................................
   var grid = o._gridWeeksRank = MO.Class.create(MO.FGuiGridControl);
   grid.setDisplayHead(false);
   grid.setLocation(50, 290)
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';

   // 当月当周当日
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   // 排名
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('weeksRank');
   column.setLabel();
   column.setDataName('weeks_images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksDepartmentLabel');
   column.setLabel('公司');
   column.setDataName('weeks_department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksMarketerLabel');
   column.setLabel('理财师');
   column.setDataName('weeks_marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('weeksInvestmentTotal');
   column.setLabel('投资');
   column.setDataName('weeks_investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
  
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('weeksCustomerCount');
   column.setLabel('客户数');
   column.setDataName('weeks_customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);

   // 当日
   //..........................................................
   var grid = o._gridDayRank = MO.Class.create(MO.FGuiGridControl);
   grid.setDisplayHead(false);
   grid.setLocation(50, 430)
   grid.setSize(800, 130);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   // grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';

   // 当月当周当日
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('');
   column.setLabel('');
   column.setDataName('');
   column.setWidth(56);
   column.setPadding(0, 1, 0, 1);
   grid.pushColumn(column);
   // 排名
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('images');
   column.setWidth(40);
   column.setPadding(0, 1, 0, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.setWidth(100);
   column.setPadding(0, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.setWidth(98);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentTotal');
   column.setLabel('投资');
   column.setDataName('investment_total');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(123);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCount');
   column.setLabel('客户数');
   column.setDataName('customer_count');
   column.setWidth(80);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);

   // 动态数据
   //..........................................................
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setLocation(50,570);
   grid.setSize(800, 430);
   grid.setPadding(0,0,0,10);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(32);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(30);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnDate);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.setDateFormat('HH24:MI:SS');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('departmentLabel');
   column.setLabel('公司');
   column.setDataName('department_label');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerLabel');
   column.setLabel('理财师');
   column.setDataName('marketer_label');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCard');
   column.setLabel('城市');
   column.setDataName('customer_city');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerInfo');
   column.setLabel('用户-手机');
   column.setDataName('customer_info');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('customerAmount');
   column.setLabel('投资额(元)');
   column.setDataName('customer_amount');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   //..........................................................
   // 设置数据
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = 5;
      o._rankHeight = 174;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   }else{
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 174;
      o._rankWeeksHeight = 174;
      o._rankMonthHeight = 139;
      o._rankDayHeight = 137;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}

//==========================================================
// <T>增加一个数据实体。当日</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartMktMarketerTable_setRankDayUnits = function FEaiChartMktMarketerTable_setRankDayUnits(units){
   var o = this;
   var grid = o._gridDayRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      // 获得部门名称
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('department_label', departmentLabel);
      row.set('marketer_label', unit.marketerLabel());
      row.set('investment_total', unit.investmentTotal());
      //row.set('customer_count', unit.customerRegister() + '/' + unit.customerTotal());
      row.set('customer_count', unit.customerTotal());
      grid.pushRow(row);
   }

}
//==========================================================
// <T>增加一个数据实体。当周</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartMktMarketerTable_setRankWeekUnits = function FEaiChartMktMarketerTable_setRankWeekUnits(units){
   var o = this;
   var grid = o._gridWeeksRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      // 获得部门名称
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("weeks_images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('weeks_department_label', departmentLabel);
      row.set('weeks_marketer_label', unit.marketerLabel());
      row.set('weeks_investment_total', unit.investmentTotal());
      //row.set('customer_count', unit.customerRegister() + '/' + unit.customerTotal());
      row.set('weeks_customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}
//==========================================================
// <T>增加一个数据实体。当月</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartMktMarketerTable_setRankMonthUnits = function FEaiChartMktMarketerTable_setRankMonthUnits(units){
   var o = this;
   var grid = o._gridMonthRank;
   grid.clearRows();
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      var row = grid.allocRow();
      // 获得部门名称
      var departmentLabel = unit.departmentLabel();
      var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set("month_images","{eai.resource}/marketer/" + ( i + 1 ) + ".png")
      row.set('month_department_label', departmentLabel);
      row.set('month_marketer_label', unit.marketerLabel());
      row.set('month_investment_total', unit.investmentTotal());
      //row.set('customer_count', unit.customerRegister() + '/' + unit.customerTotal());
      row.set('month_customer_count', unit.customerTotal());
      grid.pushRow(row);
   }
}


//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartMktMarketerTable_pushUnit = function FEaiChartMktMarketerTable_pushUnit(unit){
   var o = this;
   // 检查参数
   if(!unit){
      return null;
   }
   // 获得部门名称
   var departmentLabel = unit.departmentLabel();
   var department = MO.Console.find(MO.FEaiResourceConsole).departmentModule().findByFullLabel(departmentLabel);
   if(department){
      departmentLabel = department.label();
   }
   // 获得客户城市
   var card = unit.customerCard();
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if(city){
      cityLabel = city.label();
   }
   // 增加行
   var grid = o._gridControl;
   var row = grid.allocRow();
   row.set('record_date', unit.recordDate());
   row.set('department_label', departmentLabel);
   row.set('marketer_label', unit.marketerLabel());
   row.set('customer_city', cityLabel);
   row.set('customer_info', unit.customerLabel() + ' - ' + unit.customerPhone());
   row.set('customer_amount', unit.customerActionAmount());
  
   grid.insertRow(row);
   // 放入队列
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   // 大于个数从尾部弹出
   if(entities.count() > o._tableCount){
      entities.pop();
   }
}


//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktMarketerTable_dispose = function FEaiChartMktMarketerTable_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
