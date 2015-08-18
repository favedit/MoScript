//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 150702
//==========================================================
MO.FEaiChartPerformenceTable = function FEaiChartPerformenceTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._currentDate = null;
   o._rank = MO.Class.register(o, new MO.AGetter('_rank'));
   // @attribute
   o._rankLogoImage = null;
   o._rankTitleImage = null;
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
   o.onImageLoad = MO.FEaiChartPerformenceTable_onImageLoad;
   o.onPaintBegin = MO.FEaiChartPerformenceTable_onPaintBegin;
   //..........................................................
   // @method
   o.construct = MO.FEaiChartPerformenceTable_construct;
   // @method
   o.setup = MO.FEaiChartPerformenceTable_setup;
   o.setRankUnits = MO.FEaiChartPerformenceTable_setRankUnits;
   o.pushUnit = MO.FEaiChartPerformenceTable_pushUnit;
   o.drawRow = MO.FEaiChartPerformenceTable_drawRow;
   // @method
   o.dispose = MO.FEaiChartPerformenceTable_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerformenceTable_onImageLoad = function FEaiChartPerformenceTable_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerformenceTable_onPaintBegin = function FEaiChartPerformenceTable_onPaintBegin(event) {
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
//   var titleText = '全球实时投资数据展示中心(中国)';
//   graphic.setFont(o._headFontStyle);
//   var titleWidth = graphic.textWidth(titleText);
//   var textLeft = left + (width - titleWidth) * 0.5;
//   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
//   drawPosition += 60
//      //..........................................................
//   graphic.setFont(o._rowFontStyle);
//   // 绘制前3名
//   var tableTop = top + o._rankStart;
//   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
//   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 198, 40);
//   var rankUnits = o._rank;
//   if (rankUnits) {
//      var tableText = '';
//      var tableTextWidth = 0;
//      var count = rankUnit.count();
//      tableTop += 90;
//      for (var i = 0; i < count; i++) {
//         var unit = rankUnit.at(i);
//         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
//      }
//   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerformenceTable_construct = function FEaiChartPerformenceTable_construct() {
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
MO.FEaiChartPerformenceTable_setup = function FEaiChartPerformenceTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
   var image = o._logoImage = imageConsole.load('{eai.resource}/performence/logo.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/performence/grid.png');
   image.addLoadListener(o, o.onImageLoad);
//   // 创建图片
//   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
//   image.addLoadListener(o, o.onImageLoad);
//   // 创建图片
//   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
//   image.addLoadListener(o, o.onImageLoad);
   //..........................................................
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setDisplayHead(false);
   grid.setLocation(50, 170);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(40);
//   grid.headPadding().set(0,20,0,20);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 22;
   grid.rowFont().color = '#59FDE9';

   //现在图片为默认居中
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('rank');
   column.setLabel();
   column.setDataName('image');
   column.setWidth(110);
   column.setPadding(1, 1, 1, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('card');
   column.setLabel('');
   column.setDataName('card');
   column.setWidth(100);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('label_phone');
   column.setLabel('');
   column.setDataName('label_phone');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investment');
   column.setLabel('');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.cellPadding().right = 10;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   //..........................................................
   // 设置数据
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = -5;
      o._rankHeight = 249;
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
   } else {
      o._tableCount = 19;
      o._rankStart = 110;
      o._rankTitleStart = 0;
      o._rankHeight = 219;
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
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartPerformenceTable_setRankUnits = function FEaiChartPerformenceTable_setRankUnits(units) {
//   var o = this;
//   var grid = o._gridRank;
//   grid.clearRows();
//   var count = units.count();
//   for (var i = 0; i < count; i++) {
//      var unit = units.at(i);
//      var row = grid.allocRow();
//      // 排行榜数据填充
//      row.set('image', '{eai.resource}/live/' + (i + 1) + '.png');
//      row.set('card', unit.card());
//      row.set('label_phone', unit.label() + " - " + unit.phone());
//      row.set('investment', unit.investment());
//      grid.pushRow(row);
//   }
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartPerformenceTable_pushUnit = function FEaiChartPerformenceTable_pushUnit(unit) {
//   var o = this;
//   // 检查参数
//   if (!unit) {
//      return null;
//   }
//   // 获得客户城市
//   var card = unit.card();
//   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
//   var cityLabel = '';
//   if (city) {
//      cityLabel = city.label();
//   }
//   // 增加行
//   var grid = o._gridControl;
//   var row = grid.allocRow();
//   row.set('record_date', unit.recordDate());
//   row.set('customer_city', cityLabel);
//   row.set('customer_info', unit.label() + ' - ' + unit.phone());
//   row.set('customer_amount', unit.investment());
//   grid.insertRow(row);
//   // 放入队列
//   var entities = o._units;
//   entities.unshift(unit);
//   o._lineScroll -= o._rowHeight;
//   // 大于个数从尾部弹出
//   if (entities.count() > o._tableCount) {
//      entities.pop();
//   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerformenceTable_dispose = function FEaiChartPerformenceTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}