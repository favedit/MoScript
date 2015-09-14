//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 150702
//==========================================================
MO.FEaiChartStatMarketerTable = function FEaiChartStatMarketerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._currentDate = null;
   o._rank = MO.Class.register(o, new MO.AGetter('_rank'));
   // @attribute
   o._rankLogoImage = null;
   o._rankTitleImage = null;
   o._rankLineImage = null;
   o._rankLinePadding = null;
   o._rank1Image = null;
   o._rank2Image = null;
   o._rank3Image = null;
   o._backgroundImage = null;
   o._backgroundPadding = null;
   // @attibute
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad = MO.FEaiChartStatMarketerTable_onImageLoad;
   o.onPaintBegin = MO.FEaiChartStatMarketerTable_onPaintBegin;
   //..........................................................
   // @method
   o.construct = MO.FEaiChartStatMarketerTable_construct;
   // @method
   o.setup = MO.FEaiChartStatMarketerTable_setup;
   o.setRankUnits = MO.FEaiChartStatMarketerTable_setRankUnits;
   o.pushUnit = MO.FEaiChartStatMarketerTable_pushUnit;
   o.drawRow = MO.FEaiChartStatMarketerTable_drawRow;
   // @method
   o.dispose = MO.FEaiChartStatMarketerTable_dispose;
   o._infoProvince = MO.Class.register(o, new MO.AGetSet('_infoProvince'));
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerTable_onImageLoad = function FEaiChartStatMarketerTable_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerTable_onPaintBegin = function FEaiChartStatMarketerTable_onPaintBegin(event) {
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
   // 绘制标题
   var titleText = '全国各省投资总额展示中心';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   //..........................................................
   graphic.setFont(o._rowFontStyle);
   // 绘制前3名
   // var tableTop = top + o._rankStart;
   // graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   // graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 198, 40);
   // var rankUnits = o._rank;
   // if (rankUnits) {
   //    var tableText = '';
   //    var tableTextWidth = 0;
   //    var count = rankUnit.count();
   //    tableTop += 90;
   //    for (var i = 0; i < count; i++) {
   //       var unit = rankUnit.at(i);
   //       o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
   //    }
   // }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerTable_construct = function FEaiChartStatMarketerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 创建属性
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
   o._infoProvince = MO.Class.create(MO.FEaiChartStatMarketerInfo);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerTable_setup = function FEaiChartStatMarketerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   //..........................................................
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(50, 120);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 20;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(32);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 20;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('provinceName');
   column.setLabel('省份');
   column.setDataName('provinceName');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investment');
   column.setLabel('总投资额（元）');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(160);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCount');
   column.setLabel('人数');
   column.setDataName('customerCount');
   column.setTextAlign(MO.EUiAlign.Right);
   column.setWidth(100);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentAvg');
   column.setLabel('平均投资额（元）');
   column.setDataName('investmentAvg');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(120);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);

   o.push(grid);
   //..........................................................
   // 设置数据
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      o._tableCount = 11;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   } else {
      o._tableCount = 19;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartStatMarketerTable_setRankUnits = function FEaiChartStatMarketerTable_setRankUnits(units) {
   var o = this;
   var grid = o._gridControl;
   grid.clearRows();
   var pronvinceDate = o._infoProvince;
   var pronvinceDatearr = pronvinceDate._provinces;
   var realityCount = 0;

   if (pronvinceDatearr) {
      for (var i = 0; i < pronvinceDatearr.count(); i++) {
         var province = pronvinceDatearr.get(i);
         var code = province.code();
         var row = grid.allocRow();
         var provincename = MO.Console.find(MO.FEaiResourceConsole).provinceModule().findByCode(code);
         var provinceLabel = '' ;
         if(provincename&&provincename.label()){
             provinceLabel= provincename.label();
            // row.set('image', '{eai.resource}/live/' + (i + 1) + '.png');
             row.set('provinceName', provincename.label());
             row.set('investment', province.investmentTotal().toFixed(2));
             row.set('customerCount', province.customerCount());
             row.set('investmentAvg', province.investmentAvg().toFixed(2));
             grid.pushRow(row);
         }

      }
   }
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartStatMarketerTable_pushUnit = function FEaiChartStatMarketerTable_pushUnit(unit) {
   var o = this;
   // 检查参数
   if (!unit) {
      return null;
   }
   // 获得客户城市
   var card = unit.card();
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if (city) {
      cityLabel = city.label();
   }
   // 增加行
   var grid = o._gridControl;
   var row = grid.allocRow();
   row.set('record_date', unit.recordDate());
   row.set('customer_city', cityLabel);
   row.set('customer_info', unit.label() + ' - ' + unit.phone());
   row.set('model_label', unit.modelLabel());
   row.set('investment_amount', unit.investment());
   row.set('investment_gain', unit.gain());
   row.set('bank_gain', unit.bankGain());
   
   grid.insertRow(row);
   // 放入队列
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   // 大于个数从尾部弹出
   if (entities.count() > o._tableCount) {
      entities.pop();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerTable_dispose = function FEaiChartStatMarketerTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}