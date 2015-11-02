//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 150702
//==========================================================
MO.FEaiChartMktCustomerV2Table = function FEaiChartMktCustomerV2Table(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetter('_rank'));
   // @attribute
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   // @attibute
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiChartMktCustomerV2Table_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartMktCustomerV2Table_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartMktCustomerV2Table_construct;
   // @method
   o.setup                 = MO.FEaiChartMktCustomerV2Table_setup;
   o.setRankUnits          = MO.FEaiChartMktCustomerV2Table_setRankUnits;
   o.pushUnit              = MO.FEaiChartMktCustomerV2Table_pushUnit;
   o.drawRow               = MO.FEaiChartMktCustomerV2Table_drawRow;
   // @method
   o.dispose               = MO.FEaiChartMktCustomerV2Table_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Table_onImageLoad = function FEaiChartMktCustomerV2Table_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Table_onPaintBegin = function FEaiChartMktCustomerV2Table_onPaintBegin(event) {
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
   graphic.drawGridImage(o._backgroundImage, left, top+50, width, height-50, o._backgroundPadding);
   //..........................................................
   // 绘制标题
   // var titleText = '全球实时投资数据展示中心(中国)';
   // graphic.setFont(o._headFontStyle);
   // var titleWidth = graphic.textWidth(titleText);
   // var textLeft = left + (width - titleWidth) * 0.5;
   // graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');(tableTop + o._rankTitleStart-40)+(o._rankHeight+30)*1/7
   // drawPosition += 60
      //..........................................................
   graphic.setFont(o._rowFontStyle);
   // 绘制前3名
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart-45, width - 28, o._rankHeight+40, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 170) * 0.5, tableTop - 100, 198, 40);
   var rankUnits = o._rank;
   if (rankUnits) {
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for (var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i-50, drawWidth);
      }
   }
   var FontStyle = 'bold 18px Microsoft YaHei';
   graphic.setFont(FontStyle);

   var maxTitleText = '1000';
   var titleText = '1';
   var span = 2;
   var titleWidth = graphic.textWidth(maxTitleText);
   var spanWidth = graphic.textWidth(titleText);
   var pointX = titleWidth-spanWidth+left+span+30;
   var high =(tableTop + o._rankTitleStart)+(o._rankHeight+105)*1/2;
   var pointY = high;
   graphic.drawText(titleText,pointX,pointY,'#FDEF01');
   var beforeWidth =  graphic.textWidth(titleText);
   var titleFontText = '万元:';
   var span = 2;
   pointX += beforeWidth;
   graphic.drawText(titleFontText,pointX,pointY,'#59FDE9');

   var titleText = '100';
   pointY +=30 ; 
   var spanWidth = graphic.textWidth(titleText);
   var pointX = titleWidth-spanWidth+left+span+30;
   var pointY = high+30;
   graphic.drawText(titleText,pointX,pointY,'#FDEF01');
   var beforeWidth =  graphic.textWidth(titleText);
   pointX += beforeWidth;
   graphic.drawText(titleFontText,pointX,pointY,'#59FDE9');

   var titleText = '10';
   var span = 2;
   var titleWidth = graphic.textWidth(maxTitleText);
   var spanWidth = graphic.textWidth(titleText);
   var pointX = titleWidth-spanWidth+left+span+width*11/32;
   var high =(tableTop + o._rankTitleStart)+(o._rankHeight+105)*1/2;
   var pointY = high;
   graphic.drawText(titleText,pointX,pointY,'#FDEF01');
   var beforeWidth =  graphic.textWidth(titleText);
   var titleFontText = '万元:';
   var span = 2;
   pointX += beforeWidth;
   graphic.drawText(titleFontText,pointX,pointY,'#59FDE9');


   var titleText = '500';
   pointY +=30 ; 
   var spanWidth = graphic.textWidth(titleText);
   var pointX = titleWidth-spanWidth+left+span+width*11/32;
   var pointY = high+30;
   graphic.drawText(titleText,pointX,pointY,'#FDEF01');
   var beforeWidth =  graphic.textWidth(titleText);
   pointX += beforeWidth;
   graphic.drawText(titleFontText,pointX,pointY,'#59FDE9');

   var titleText = '50';
   var span = 2;
   var titleWidth = graphic.textWidth(maxTitleText);
   var spanWidth = graphic.textWidth(titleText);
   var pointX = titleWidth-spanWidth+left+span+width*11/16;
   var high =(tableTop + o._rankTitleStart)+(o._rankHeight+105)*1/2;
   var pointY = high;
   graphic.drawText(titleText,pointX,pointY,'#FDEF01');
   var beforeWidth =  graphic.textWidth(titleText);
   var titleFontText = '万元:';
   var span = 2;
   pointX += beforeWidth;
   graphic.drawText(titleFontText,pointX,pointY,'#59FDE9');


   var titleText = '1000';
   pointY +=30 ; 
   var spanWidth = graphic.textWidth(titleText);
   var pointX = titleWidth-spanWidth+left+span+width*11/16;
   var pointY = high+30;
   graphic.drawText(titleText,pointX,pointY,'#FDEF01');
   var beforeWidth =  graphic.textWidth(titleText);
   pointX += beforeWidth;
   graphic.drawText(titleFontText,pointX,pointY,'#59FDE9');




}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Table_construct = function FEaiChartMktCustomerV2Table_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 创建属性
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40,0, 40,0);
   o._backgroundPadding = new MO.SPadding(20, 100, 90, 200);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Table_setup = function FEaiChartMktCustomerV2Table_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/gridv2.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   // 创建图片
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank2.png');
   image.addLoadListener(o, o.onImageLoad);
   //..........................................................
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setDisplayHead(false);
   grid.setLocation(0,92);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(29);
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
   column.setName('customer_city');
   column.setLabel('');
   column.setDataName('customer_city');
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
   column.cellPadding().right = 40;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   //..........................................................
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(50, 332);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setTop(332);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(32);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 21;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnDate);
   column.setName('recordDate');
   column.setLabel('时间');
   column.setDataName('record_date');
   column.setDateFormat('HH24:MI:SS');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('customerCity');
   column.setLabel('城市');
   column.setDataName('customer_city');
   column.setWidth(120);
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
   column.setName('investmentAmount');
   column.setLabel('投资额');
   column.setDataName('investment_amount');
   column.cellPadding().right = 10;
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('modelLabel');
   column.setLabel('投资产品');
   column.setDataName('model_label');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentGain');
   column.setLabel('年化收益');
   column.setDataName('investment_gain');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(120);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('bankGain');
   column.setLabel('银行收益');
   column.setDataName('bank_gain');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
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
MO.FEaiChartMktCustomerV2Table_setRankUnits = function FEaiChartMktCustomerV2Table_setRankUnits(units) {
   var o = this;
   var grid = o._gridRank;
   grid.clearRows();
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.at(i);
      var row = grid.allocRow();
      // 获得客户城市
      var card = unit.card();
      var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
      var cityLabel = '';
      if (city) {
         cityLabel = city.label();
      }
      // 排行榜数据填充
      row.set('image', '{eai.resource}/live/' + (i + 1) + '.png');
      row.set('customer_city', cityLabel);
      row.set('label_phone', unit.label() + " - " + unit.phone());
      row.set('investment', unit.investment());
      grid.pushRow(row);
   }
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiChartMktCustomerV2Table_pushUnit = function FEaiChartMktCustomerV2Table_pushUnit(unit) {
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
MO.FEaiChartMktCustomerV2Table_dispose = function FEaiChartMktCustomerV2Table_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}