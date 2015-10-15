MO.SShowFloatingImageData = function SShowFloatingImageData(){
   var o                   = this;
   o.name               = '';
   o.displayImageUrl    = '';
   o.longitude          = 0;
   o.latitude           = 0;
   o.startX             = 0;
   o.startY             = 0;
   o.endX               = 0;
   o.endY               = 0;
   o.popDuration        = 500;
   o.showDuration       = 5000;
   o.closeDuration      = 500;
   return o;
}
MO.SShowFocusParameter = function SShowFocusParameter(r, t, s){
   var o                   = this;
   o.name       = '';
   o.rotateY    = MO.Runtime.nvl(r, 0);
   o.translateY = MO.Runtime.nvl(t, 0);
   o.scale      = MO.Runtime.nvl(s, 0);
   o.assign     = MO.SShowFocusParameter_assign;
   return o;
}
MO.SShowFocusParameter_assign = function SShowFocusParameter_assign(s) {
   var o = this;
   o.name = s.name;
   o.rotateY = s.rotateY;
   o.translateY = s.translateY;
   o.scale = s.scale;
}
MO.FEaiChartShow1019CustomerTable = function FEaiChartShow1019CustomerTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetter('_rank'));
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._tableCount           = 0;
   o._units                = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FEaiChartShow1019CustomerTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartShow1019CustomerTable_onPaintBegin;
   o.construct             = MO.FEaiChartShow1019CustomerTable_construct;
   o.setup                 = MO.FEaiChartShow1019CustomerTable_setup;
   o.setRankUnits          = MO.FEaiChartShow1019CustomerTable_setRankUnits;
   o.pushUnit              = MO.FEaiChartShow1019CustomerTable_pushUnit;
   o.drawRow               = MO.FEaiChartShow1019CustomerTable_drawRow;
   o.dispose               = MO.FEaiChartShow1019CustomerTable_dispose;
   return o;
}
MO.FEaiChartShow1019CustomerTable_onImageLoad = function FEaiChartShow1019CustomerTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartShow1019CustomerTable_onPaintBegin = function FEaiChartShow1019CustomerTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
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
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   var titleText = '全球实时投资数据展示中心(中国)';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   drawPosition += 60
   graphic.setFont(o._rowFontStyle);
   var tableTop = top + o._rankStart;
   graphic.drawGridImage(o._rankLineImage, left + 6, tableTop + o._rankTitleStart, width - 22, o._rankHeight, o._rankLinePadding);
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 198, 40);
   var rankUnits = o._rank;
   if (rankUnits) {
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankUnit.count();
      tableTop += 90;
      for (var i = 0; i < count; i++) {
         var unit = rankUnit.at(i);
         o.drawRow(graphic, unit, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
}
MO.FEaiChartShow1019CustomerTable_construct = function FEaiChartShow1019CustomerTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiChartShow1019CustomerTable_setup = function FEaiChartShow1019CustomerTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setDisplayHead(false);
   grid.setLocation(50, 170);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setHeadHeight(40);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 22;
   grid.rowFont().color = '#59FDE9';
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
   column.cellPadding().right = 10;
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
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
MO.FEaiChartShow1019CustomerTable_setRankUnits = function FEaiChartShow1019CustomerTable_setRankUnits(units) {
   var o = this;
   var grid = o._gridRank;
   grid.clearRows();
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.at(i);
      var row = grid.allocRow();
      var card = unit.card();
      var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
      var cityLabel = '';
      if (city) {
         cityLabel = city.label();
      }
      row.set('image', '{eai.resource}/live/' + (i + 1) + '.png');
      row.set('customer_city', cityLabel);
      row.set('label_phone', unit.label() + " - " + unit.phone());
      row.set('investment', unit.investment());
      grid.pushRow(row);
   }
}
MO.FEaiChartShow1019CustomerTable_pushUnit = function FEaiChartShow1019CustomerTable_pushUnit(unit) {
   var o = this;
   if (!unit) {
      return null;
   }
   var card = unit.card();
   var city = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(card);
   var cityLabel = '';
   if (city) {
      cityLabel = city.label();
   }
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
   var entities = o._units;
   entities.unshift(unit);
   o._lineScroll -= o._rowHeight;
   if (entities.count() > o._tableCount) {
      entities.pop();
   }
}
MO.FEaiChartShow1019CustomerTable_dispose = function FEaiChartShow1019CustomerTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartShow1019CustomerTimeline = function FEaiChartShow1019CustomerTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._ready = false;
   o._investmentTotal = 0;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.oeUpdate = MO.FEaiChartShow1019CustomerTimeline_oeUpdate;
   o.construct = MO.FEaiChartShow1019CustomerTimeline_construct;
   o.sync = MO.FEaiChartShow1019CustomerTimeline_sync;
   o.drawTrend = MO.FEaiChartShow1019CustomerTimeline_drawTrend;
   o.onPaintBegin = MO.FEaiChartShow1019CustomerTimeline_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartShow1019CustomerTimeline_on24HDataFetch;
   return o;
}
MO.FEaiChartShow1019CustomerTimeline_construct = function FEaiChartShow1019CustomerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiLogicInfoCustomerTrend);
}
MO.FEaiChartShow1019CustomerTimeline_oeUpdate = function FEaiChartShow1019CustomerTimeline_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
   }
   return MO.EEventStatus.Stop;
}
MO.FEaiChartShow1019CustomerTimeline_drawTrend = function FEaiChartShow1019CustomerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor) {
   var o = this;
   var startTime = o._startTime;
   var units = o._trendInfo.units();
   var count = units.count();
   var unitFirst = units.first();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   for (var i = 1; i < count; i++) {
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var bottomColor = '#' + hexColor.substring(2);
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var topColor = '#' + hexColor.substring(2);
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', topColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
   handle.fillStyle = opGradient;
   handle.lineTo(x, dataBottom);
   handle.lineTo(dataLeft, dataBottom);
   handle.lineTo(dataLeft, lastY);
   handle.fill();
}
MO.FEaiChartShow1019CustomerTimeline_onPaintBegin = function FEaiChartShow1019CustomerTimeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 50;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 90;
   var dataBottom = bottom - 50;
   var dataHeight = dataBottom - dataTop;
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
   var startTime = o.startTime();
   var endTime = o.endTime();
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   graphic.setFont('bold 20px Microsoft YaHei');
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:MI');
      startTime.addHour(1);
      startTime.truncHour();
      drawText = !drawText;
      if (drawText) {
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#173870');
      }
   }
   graphic.drawLine(dataRight, middle - o.degreeLineHeight(), dataRight, middle, '#FFFFFF', 1);
   var endText = endTime.format('HH24:MI');
   if (endText != text) {
      textWidth = graphic.textWidth(endText);
      graphic.drawText(endText, dataRight - textWidth / 2, middle + 40, '#173870');
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   var units = trendInfo.units();
   if (!units) {
      return;
   }
   if (units.isEmpty()) {
      return;
   }
   var unitFirst = units.first();
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
   var lastHour = -1;
   var hourInves = 0;
   var maxHourInves = 0;
   startTime.parseAuto(unitFirst.recordDate());
   startTime.refresh();
   lastHour = startTime.date.getHours();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var hour = startTime.date.getHours();
      if (lastHour == hour) {
         hourInves += unit.investment();
      } else {
         if (hourInves > maxHourInves) {
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   graphic.setFont('24px Microsoft YaHei');
   graphic.drawText("24H数据曲线", decoLeft, top + 30, '#173870');
   graphic.setFont('22px Microsoft YaHei');
   var rowStart = top + 60;
   var rowHeight = 22;
   var textWidth = graphic.textWidth('投资总计：');
   var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
   var investmentTotalWidth = graphic.textWidth(investmentTotalText);
   var investmentMaxText = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
   var investmentMaxWidth = graphic.textWidth(investmentMaxText);
   var investmentAvgText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal() / 24, 0, 0, 2, 0, 10000, '万');
   var investmentAvgWidth = graphic.textWidth(investmentAvgText);
   var maxWidth = investmentTotalWidth;
   graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#173870');
   graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#173870');
   graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#173870');
   graphic.drawText(investmentMaxText, decoLeft + textWidth + maxWidth - investmentMaxWidth, rowStart + rowHeight * 1 + 5, '#173870');
   graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#173870');
   graphic.drawText(investmentAvgText, decoLeft + textWidth + maxWidth - investmentAvgWidth, rowStart + rowHeight * 2 + 10, '#173870');
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FEaiChartShow1019Scene = function FEaiChartShow1019Scene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   o._optionBackground        = false;
   o._code                    = MO.EEaiScene.ChartWorld;
   o._optionMapCity3d         = true;
   o._mapReady                = false;
   o._playing                 = false;
   o._statusStart             = false;
   o._statusLayerCount        = 100;
   o._statusLayerLevel        = 100;
   o._operationPoint          = null;
   o._operationRotationX      = 0;
   o._operationRotationY      = 0;
   o._rotationX               = 0;
   o._rotationY               = 0;
   o._rotationZ               = 0;
   o._startRotateX            = 0;
   o._startRotateY            = 0;
   o._startRotateZ            = 0;
   o._targetRotateX           = 0;
   o._targetRotateY           = 0;
   o._targetRotateZ           = 0;
   o._translateY              = 0;
   o._startTranslateY         = 0;
   o._targetTranslateY        = 0;
   o._startTick               = 0;
   o._earthMoving             = false;
   o.__moveEarthDuration      = 500;
   o._opMouseDown             = false;
   o._opMouseMoved            = false;
   o.__opMouseMoveThreshold   = 4;
   o._autoRotate              = true;
   o._showChina               = false;
   o._showingMktInfo          = false;
   o._countryTable            = null;
   o._provinceTable           = null;
   o._selectedProvinceCode    = 0;
   o._provinceUnits           = null;
   o._countryUnits            = null;
   o._worldScale              = 300;
   o._startWorldScale         = 300;
   o._targetWorldScale        = 300;
   o._cameraFrom              = null;
   o._cameraTo                = null;
   o._cameraDirection         = null;
   o._ccDirection             = null;
   o._facePosition            = null;
   o._organizationDataTicker  = null;
   o._organizationInfo        = null;
   o._socket                  = null;
   o._focusParamManager       = null;
   o._remoteRotate            = null;
   o._displayPhase            = 0;
   o._videoDataList           = null;
   o._videoRenderables        = null;
   o._currentVideoData        = null;
   o._currentVideoRenderable  = null;
   o._videoCount              = 4;
   o._videoAnimeDuration      = 500;
   o._videoAnimeStartTick     = 0;
   o._lineManager             = null;
   o._locations               = null;
   o._floatingImageManager    = null;
   o._rotateVector            = null;
   o._rotateRadian            = 0;
   o._processor               = null;
   o._logoBar                 = null;
   o._timeline                = null;
   o._liveTable               = null;
   o._boardProcessor          = null;
   o._titlePic                = null;
   o._copyrightPic            = null;
   o._showVideoSE             = null;
   o.onSocketReceived         = MO.FEaiChartShow1019Scene_onSocketReceived;
   o.onOrganizationFetch      = MO.FEaiChartShow1019Scene_onOrganizationFetch;
   o.onOperationKeyDown       = MO.FEaiChartShow1019Scene_onOperationKeyDown;
   o.onOperationDown          = MO.FEaiChartShow1019Scene_onOperationDown;
   o.onOperationMove          = MO.FEaiChartShow1019Scene_onOperationMove;
   o.onOperationUp            = MO.FEaiChartShow1019Scene_onOperationUp;
   o.onOperationWheel         = MO.FEaiChartShow1019Scene_onOperationWheel;
   o.onInvestmentDataChanged  = MO.FEaiChartShow1019Scene_onInvestmentDataChanged;
   o.on24HDataChanged         = MO.FEaiChartShow1019Scene_on24HDataChanged;
   o.onOperationVisibility    = MO.FEaiChartShow1019Scene_onOperationVisibility;
   o.onProcessReady           = MO.FEaiChartShow1019Scene_onProcessReady;
   o.onProcess                = MO.FEaiChartShow1019Scene_onProcess;
   o.onSwitchProcess          = MO.FEaiChartShow1019Scene_onSwitchProcess;
   o.onSwitchComplete         = MO.FEaiChartShow1019Scene_onSwitchComplete;
   o.construct                = MO.FEaiChartShow1019Scene_construct;
   o.setup                    = MO.FEaiChartShow1019Scene_setup;
   o.showFace                 = MO.FEaiChartShow1019Scene_showFace;
   o.fixMatrix                = MO.FEaiChartShow1019Scene_fixMatrix;
   o.processResize            = MO.FEaiChartShow1019Scene_processResize;
   o.switchDisplayPhase       = MO.FEaiChartShow1019Scene_switchDisplayPhase;
   o.resetDisplayPhase        = MO.FEaiChartShow1019Scene_resetDisplayPhase;
   o.videoFullScreenAnime     = MO.FEaiChartShow1019Scene_videoFullScreenAnime;
   return o;
}
MO.FEaiChartShow1019Scene_on24HDataChanged = function FEaiChartShow1019Scene_on24HDataChanged(event) {
   var o = this;
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   timeline.dirty();
}
MO.FEaiChartShow1019Scene_onInvestmentDataChanged = function FEaiChartShow1019Scene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}
MO.FEaiChartShow1019Scene_onSocketReceived = function FEaiChartShow1019Scene_onSocketReceived(event) {
   var o = this;
   var message = event.message;
   if (o._displayPhase == 0 || o._displayPhase == 3) {
      var tagIndex = message.indexOf('tag');
      if (tagIndex != -1) {
         var tag = message.substr(tagIndex + 4);
         o._startTranslateY = o._translateY;
         o._startRotateY = o._rotationY;
         o._startWorldScale = o._worldScale;
         var focusParam = o._focusParamManager.getFocusParameter(tag);
         o._targetWorldScale = focusParam.scale;
         o._targetRotateY = focusParam.rotateY;
         o._targetTranslateY = focusParam.translateY;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = false;
      }
      var rotateIndex = message.indexOf('rotation');
      if (rotateIndex != -1) {
         var rotate = o._remoteRotate;
         rotate.parse(message.substr(rotateIndex + 9));
         o._rotationX = rotate.x;
         o._rotationY = rotate.y;
         o._rotationZ = rotate.z;
      }
      var areaIndex = message.indexOf('area');
      if (areaIndex != -1) {
         var areaId = message.substr(areaIndex + 5);
         o._boardProcessor.showArea(areaId);
      }
      var autoRotateIndex = message.indexOf('autoRotate');
      if (autoRotateIndex != -1) {
         o._autoRotate = new Boolean(parseInt(message.substr(autoRotateIndex + 11)));
      }
   }
   var nextIndex = message.indexOf('next');
   if (nextIndex != -1) {
      o.switchDisplayPhase(++o._displayPhase);
   }
   var restIndex = message.indexOf('reset');
   if (restIndex != -1) {
      o.resetDisplayPhase();
   }
}
MO.FEaiChartShow1019Scene_videoFullScreenAnime = function FEaiChartShow1019Scene_videoFullScreenAnime() {
   var o = this;
   var revert = false;
   switch (o._displayPhase) {
      case 0: // 待机画面
         break;
      case 1: // 播放视频1
         break;
      case 2: // 收起视频1
         revert = true;
         break;
      case 3: // 手控转动地球
         break;
      case 4: // 显示实时投资
         break;
      case 5: // 播放视频2
         break;
      case 6: // 收起视频2
         revert = true;
         break;
      case 7: // 播放视频3
         break;
      case 8: // 收起视频3
         revert = true;
         break;
      case 9: // 播放视频4
         break;
      case 10:// 收起视频4
         revert = true;
         break;
      default:
         break;
   }
   var currentTick = MO.Timer.current();
   var passedTick = currentTick - o._videoAnimeStartTick;
   var t = passedTick / o._videoAnimeDuration;
   if (revert) {
      t = 1 - t;
   }
   if (t < 0) {
      o._currentVideoData.hVideo().pause();
      o._currentVideoData.hVideo().currentTime = 0;
      o.switchDisplayPhase(++o._displayPhase);
      return;
   }
   if (t > 1) {
      t = 1;
   }
   var videoRenderable = o._currentVideoRenderable;
   var matrix = videoRenderable.matrix();
   matrix.sx = 1920 * t;
   matrix.sy = 1080 * t;
   matrix.sz = 1;
   matrix.tx = (1920 - 1920 * t) * 0.5;
   matrix.ty = (1080 - 1080 * t) * 0.5;;
   matrix.tz = 0;
   matrix.updateForce();
}
MO.FEaiChartShow1019Scene_onOrganizationFetch = function FEaiChartShow1019Scene_onOrganizationFetch(event) {
   var o = this;
}
MO.FEaiChartShow1019Scene_onOperationVisibility = function FEaiChartShow1019Scene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartShow1019Scene_onProcessReady = function FEaiChartShow1019Scene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showWorld();
   var countryEntity = o._countryEntity;
   countryEntity.start();
   o._mapEntity.showCountry(countryEntity);
   o._mapEntity.showCity();
}
MO.FEaiChartShow1019Scene_onProcess = function FEaiChartShow1019Scene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      if (!o._mapReady) {
         o._guiManager.show();
         o._southSea.setVisible(false);
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      o._socket.process();
      o._countryEntity.process();
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity.cityRangeRenderable().matrix());
      o.fixMatrix(mapEntity.cityCenterRenderable().matrix());
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
      mapEntity.process();
      var currentVideoData = o._currentVideoData;
      if (currentVideoData != null) {
         o.videoFullScreenAnime();
         currentVideoData.process();
      }
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if (processor.invementDayCurrent() > 0) {
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}
MO.FEaiChartShow1019Scene_onOperationKeyDown = function FEaiChartShow1019Scene_onOperationKeyDown(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationKeyDown.call(o, event);
   if (event.keyCode == MO.EKeyCode.Space) {
      o._displayPhase++;
      o.switchDisplayPhase(o._displayPhase);
   }
   else if (event.keyCode == MO.EKeyCode.R) {
      o.resetDisplayPhase();
   }
   else if (event.keyCode == MO.EKeyCode.F) {
      var videoData = o._currentVideoData;
      videoData.hVideo().currentTime = 5;
      videoData.hVideo().play();
   }
}
MO.FEaiChartShow1019Scene_resetDisplayPhase = function FEaiChartShow1019Scene_resetDisplayPhase(phase) {
   var o = this;
   o._videoRenderables.at(0).setVisible(false);
   o._videoRenderables.at(1).setVisible(false);
   o._videoRenderables.at(2).setVisible(false);
   o._videoRenderables.at(3).setVisible(false);
   if (o._currentVideoData) {
      o._currentVideoData.hVideo().pause();
      o._currentVideoData.hVideo().currentTime = 0;
      o._currentVideoData = null;
      o._currentVideoRenderable = null;
   }
   o._logoBar.setVisible(false);
   o._timeline.setVisible(false);
   o._liveTable.setVisible(false);
   o._countryEntity._borderShape.setVisible(false);
   o._countryEntity._faceShape.setVisible(false);
   o._startTranslateY = o._translateY;
   o._startRotateX = o._rotationX;
   o._startRotateY = o._rotationY;
   o._startRotateZ = o._rotationZ;
   o._startWorldScale = o._worldScale;
   o._targetTranslateY = 0;
   o._targetRotateX = o._rotationX;
   o._targetRotateY = o._rotationY;
   o._targetRotateZ = o._rotationZ;
   o._targetWorldScale = 300;
   o._startTick = MO.Timer.current();
   o._earthMoving = true;
   o._autoRotate = false;
   o._showChina = false;
   o._displayPhase = 0;
   o.switchDisplayPhase(o._displayPhase);
}
MO.FEaiChartShow1019Scene_switchDisplayPhase = function FEaiChartShow1019Scene_switchDisplayPhase(phase) {
   var o = this;
   if (phase == 0 || phase == 3) {
      o._titlePic.setVisible(true);
      o._copyrightPic.setVisible(true);
   }
   else {
      o._titlePic.setVisible(false);
      o._copyrightPic.setVisible(false);
   }
   o._videoRenderables.at(0).setVisible(false);
   o._videoRenderables.at(1).setVisible(false);
   o._videoRenderables.at(2).setVisible(false);
   o._videoRenderables.at(3).setVisible(false);
   o._videoAnimeStartTick = MO.Timer.current();
   o._boardProcessor.setAutoPlay(false);
   switch (phase) {
      case 0: // 待机画面
         o._boardProcessor.setAutoPlay(true);
         o._socket.send('phase=0');
         break;
      case 1: // 播放视频1
         o._socket.send('phase=1');
         o._currentVideoRenderable = o._videoRenderables.at(0);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(0);
         o._currentVideoData.hVideo().play();
         o._showVideoSE.play();
         break;
      case 2: // 收起视频1
         o._videoRenderables.at(0).setVisible(true);
         break;
      case 3: // 手控转动地球
         o._videoDataList.at(0).hVideo().pause();
         o._videoDataList.at(0).hVideo().currentTime = 0;
         break;
      case 4: // 显示实时投资
         o._logoBar.setVisible(true);
         o._timeline.setVisible(true);
         o._liveTable.setVisible(true);
         o._guiManager.hide();
         o._mapReady = false;
         o._startTranslateY = o._translateY;
         o._startRotateX = o._rotationX;
         o._startRotateY = o._rotationY;
         o._startRotateZ = o._rotationZ;
         o._startWorldScale = o._worldScale;
         var focusParam = o._focusParamManager.getFocusParameter('china');
         o._targetWorldScale = 1400;
         o._targetRotateX = 0;
         o._targetRotateY = focusParam.rotateY;
         o._targetRotateZ = 0;
         o._targetTranslateY = focusParam.translateY;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = false;
         o._showChina = true;
         break;
      case 5: // 播放视频2
         o._showVideoSE.play();
         o._logoBar.setVisible(false);
         o._timeline.setVisible(false);
         o._liveTable.setVisible(false);
         o._countryEntity._borderShape.setVisible(false);
         o._countryEntity._faceShape.setVisible(false);
         o._startTranslateY = o._translateY;
         o._startRotateX = o._rotationX;
         o._startRotateY = o._rotationY;
         o._startRotateZ = o._rotationZ;
         o._startWorldScale = o._worldScale;
         o._targetTranslateY = 0;
         o._targetRotateX = o._rotationX;
         o._targetRotateY = o._rotationY;
         o._targetRotateZ = o._rotationZ;
         o._targetWorldScale = 300;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = false;
         o._showChina = false;
         o._currentVideoRenderable = o._videoRenderables.at(1);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(1);
         o._currentVideoData.hVideo().play();
         break;
      case 6: // 收起视频2
         o._videoRenderables.at(1).setVisible(true);
         break;
      case 7: // 播放视频3
         o._showVideoSE.play();
         o._videoDataList.at(1).hVideo().pause();
         o._videoDataList.at(1).hVideo().currentTime = 0;
         o._currentVideoRenderable = o._videoRenderables.at(2);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(2);
         o._currentVideoData.hVideo().play();
         break;
      case 8: // 收起视频3
         o._videoRenderables.at(2).setVisible(true);
         break;
      case 9: // 播放视频4
         o._showVideoSE.play();
         o._videoDataList.at(2).hVideo().pause();
         o._videoDataList.at(2).hVideo().currentTime = 0;
         o._currentVideoRenderable = o._videoRenderables.at(3);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(3);
         o._currentVideoData.hVideo().play();
         break;
      case 10:// 收起视频4
         o._videoRenderables.at(3).setVisible(true);
         break;
      default:// 回到Phase 0
         o._displayPhase = 0;
         o.switchDisplayPhase(o._displayPhase);
         break;
   }
}
MO.FEaiChartShow1019Scene_onOperationDown = function FEaiChartShow1019Scene_onOperationDown(event) {
   var o = this;
   o._opMouseDown = true;
   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}
MO.FEaiChartShow1019Scene_onOperationMove = function FEaiChartShow1019Scene_onOperationMove(event) {
   var o = this;
   if (o._opMouseDown) {
      var cx = event.x - o._operationPoint.x;
      if (Math.abs(cx) > o.__opMouseMoveThreshold) {
         o._autoRotate = false;
         o._operationMoved = true;
         var cx = event.x - o._operationPoint.x;
         o._rotationY = o._operationRotationY - cx * 0.002;
      }
   }
}
MO.FEaiChartShow1019Scene_onOperationUp = function FEaiChartShow1019Scene_onOperationUp(event) {
   var o = this;
   o._opMouseDown = false;
   if (!o._operationMoved) {
      var canvas3d = o.application().desktop().canvas3d();
      var region = o.activeStage().region();
      var camera = region.camera();
      var selectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FG3dSelectTechnique);
      var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
      if (renderable) {
         var eaiSelectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FEaiSelectTechnique);
         var countryRenderable = eaiSelectTechnique.test(region, renderable, event.offsetX, event.offsetY);
         if (countryRenderable) {
            o._startTranslateY = o._translateY;
            o._startRotateY = o._rotationY;
            o._startWorldScale = o._worldScale;
            var entity = countryRenderable._shape._entity;
            if(MO.Class.isClass(entity, MO.FEaiCountry3dEntity)){
               var countryEntity = entity;
               o._targetWorldScale = 1400;
               if (countryEntity.code() == 'China') {
                  o._showChina = true;
               }
               else {
                  o._countryEntity._borderShape.setVisible(false);
                  o._countryEntity._faceShape.setVisible(false);
               }
            }
            else {
            }
            var outline2d = entity.outline2();
            o._targetRotateY = Math.PI - outline2d.center.x / 180 * Math.PI;
            o._targetTranslateY = -o._targetWorldScale * 1.5 * (outline2d.center.y / 90);
            o._startTick = MO.Timer.current();
            o._earthMoving = true;
            o._autoRotate = false;
         }
      }
      else {
         o._startTranslateY = o._translateY;
         o._startRotateY = o._rotationY;
         o._startWorldScale = o._worldScale;
         o._targetTranslateY = 0
         o._targetRotateY = o._rotationY;
         o._targetWorldScale = 300;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = true;
         o._countryEntity._borderShape.setVisible(false);
         o._countryEntity._faceShape.setVisible(false);
      }
   }
   o._operationMoved = false;
}
MO.FEaiChartShow1019Scene_onOperationWheel = function FEaiChartShow1019Scene_onOperationWheel(event) {
   var o = this;
   var delta = event.deltaY
   if (delta > 0) {
      o._worldScale /= 1.05;
   } else if (delta < 0) {
      o._worldScale *= 1.05;
   }
}
MO.FEaiChartShow1019Scene_onSwitchProcess = function FEaiChartShow1019Scene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartShow1019Scene_onSwitchComplete = function FEaiChartShow1019Scene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartShow1019Scene_construct = function FEaiChartShow1019Scene_construct() {
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._operationPoint = new MO.SPoint2();
   o._organizationDataTicker = new MO.TTicker(1000 * 60);
   o._organizationInfo = MO.Class.create(MO.FEaiChartMktManageInfo);
   o._cameraFrom = new MO.SPoint3();
   o._cameraTo = new MO.SPoint3();
   o._ccDirection = new MO.SVector3();
   o._facePosition = new MO.SPoint3();
   o._provinceUnits = new MO.TObjects();
   o._countryUnits = new MO.TObjects();
   o._remoteRotate = new MO.SValue3();
   o._videoDataList = new MO.TObjects();
   o._videoRenderables = new MO.TObjects();
   o._rotateVector = new MO.SPoint3();
}
MO.FEaiChartShow1019Scene_setup = function FEaiChartShow1019Scene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var stage = o._activeStage;
   var dataLayer = stage.dataLayer();
   var backgroundImage = o._application._groundBitmap;
   var rectangle = MO.Class.create(MO.FE3dRectangleArea);
   rectangle.linkGraphicContext(o);
   rectangle.setOptionSelect(false);
   rectangle.setup();
   rectangle.material().info().effectCode = 'eai.earth.sky';
   rectangle._textures = backgroundImage._renderable._textures;
   stage.groundLayer().push(rectangle);
   var processor = o._boardProcessor = MO.Class.create(MO.FEaiShowBoardProcessor);
   processor.linkGraphicContext(o);
   processor.setup();
   o._activeStage.mapLayer().push(processor);
   o._guiManager.hide();
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -5000);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(10000);
   projection.update();
   var region = o._activeStage.region();
   region.selectCamera(camera);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var worldEntity = o._worldEntity = entityConsole.mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
   entityConsole.cityModule().build(o, MO.FEaiCity3dEntity);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry, MO.FEaiCountry3dEntity);
   countryEntity._borderShape.setVisible(false);
   countryEntity._faceShape.setVisible(false);
   o._readyLoader.push(countryEntity);
   var socket = o._socket = MO.Class.create(MO.FSocket);
   socket.connect('{service.earth}/earth');
   socket.addReceiveListener(o, o.onSocketReceived);
   var focusParamManager = o._focusParamManager = MO.Class.create(MO.FEaiShowFocusParameterManager);
   focusParamManager.setup();
   var context3d = o.application().desktop().canvas3d().graphicContext();
   var stage = o.activeStage();
   var layer = stage.spriteLayer();
   var videoDataList = o._videoDataList;
   var videoRenderables = o._videoRenderables;
   var videoCount = o._videoCount;
   for (var i = 0; i < videoCount; i++) {
      var videoData = context3d.createObject(MO.FE3dVideoData);
      videoData.loadUrl('../ars/eai/show1019/video' + i + '.mp4');
      videoDataList.push(videoData);
      var videoRenderable = context3d.createObject(MO.FE3dVideo);
      videoRenderable.setOptionSelect(false);
      videoRenderable.setData(videoData);
      videoRenderable.material().info().effectCode = 'flat';
      videoRenderable.setVisible(false);
      o._videoRenderables.push(videoRenderable);
      layer.pushRenderable(videoRenderable);
      var matrix = videoRenderable.matrix();
      matrix.sx = 1920;
      matrix.sy = 1080;
      matrix.sz = 1;
      matrix.tx = 0;
      matrix.ty = 0;
      matrix.tz = 0;
      matrix.updateForce();
   }
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartShowProcessor);
   invement.linkGraphicContext(o);
   invement.setup();
   invement._countryEntity = countryEntity;
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   frame.setVisible(false);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartShow1019CustomerTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   timeline.setVisible(false);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartShow1019CustomerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   liveTable.setVisible(false);
   o._guiManager.hide();
   o._groundAutio.muted = true;
   var titlePic = o._titlePic = MO.Class.create(MO.FGuiPicture);
   titlePic.setBackResource('url:{eai.resource}/show1019/title.png');
   titlePic.setSize(459, 52);
   titlePic.setLocation((1920 - 459) / 2, 10);
   titlePic.linkGraphicContext(o);
   titlePic.build();
   titlePic.psInitialize();
   o._guiManager.register(titlePic);
   var crPic = o._copyrightPic = MO.Class.create(MO.FGuiPicture);
   crPic.setBackResource('url:{eai.resource}/show1019/copyright.png');
   crPic.setSize(247, 52);
   crPic.setLocation(1920 - 247, 1080 - 52 - 10);
   crPic.linkGraphicContext(o);
   crPic.build();
   crPic.psInitialize();
   o._guiManager.register(crPic);
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   o._showVideoSE = audioConsole.load('{eai.resource}/show1019/show_video.wav');
}
MO.FEaiChartShow1019Scene_showFace = function FEaiChartShow1019Scene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   o.processResize();
}
MO.FEaiChartShow1019Scene_fixMatrix = function FEaiChartShow1019Scene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical();
   if (o._earthMoving) {
      var tickPassed = MO.Timer.current() - o._startTick;
      var rate = tickPassed / o.__moveEarthDuration;
      if (rate > 1) {
         rate = 1;
         o._earthMoving = false;
         if (o._showChina) {
            o._countryEntity._borderShape.setVisible(true);
            o._countryEntity._faceShape.setVisible(true);
            o._showChina = false;
         }
      }
      o._translateY = o._startTranslateY + (o._targetTranslateY - o._startTranslateY) * rate;
      o._rotationX = o._startRotateX + (o._targetRotateX - o._startRotateX) * rate;
      o._rotationY = o._startRotateY + (o._targetRotateY - o._startRotateY) * rate;
      o._rotationZ = o._startRotateZ + (o._targetRotateZ - o._startRotateZ) * rate;
      o._worldScale = o._startWorldScale + (o._targetWorldScale - o._startWorldScale) * rate;
   }
   if (isVertical) {
   } else {
      matrix.tx = 0;
      matrix.ty = o._translateY;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.rz = o._rotationZ;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);
      var rotateVector = o._rotateVector;
      matrix.transformPoint3(MO.RMath.vectorBackward, rotateVector);
      rotateVector.normalize();
      o._rotateRadian = Math.atan2(rotateVector.x, rotateVector.z);
   }
   matrix.update();
}
MO.FEaiChartShow1019Scene_processResize = function FEaiChartShow1019Scene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var control = o._southSea;
   if (isVertical) {
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(80);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(280);
   }
   var timeline = o._timeline;
   if (isVertical) {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   } else {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(10);
      timeline.setRight(780);
      timeline.setHeight(300);
   }
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.All);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(760);
   }
}
MO.FEaiChartShowProcessor = function FEaiChartShowProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   o._dateSetup               = false;
   o._beginDate               = MO.Class.register(o, new MO.AGetter('_beginDate'));
   o._endDate                 = MO.Class.register(o, new MO.AGetter('_endDate'));
   o._24HBeginDate            = MO.Class.register(o, new MO.AGetter('_24HBeginDate'));
   o._24HEndDate              = MO.Class.register(o, new MO.AGetter('_24HEndDate'));
   o._invementDayCurrent      = MO.Class.register(o, new MO.AGetter('_invementDayCurrent'), 0);
   o._redemptionDayCurrent    = MO.Class.register(o, new MO.AGetter('_redemptionDayCurrent'), 0);
   o._netinvestmentDayCurrent = MO.Class.register(o, new MO.AGetter('_netinvestmentDayCurrent'), 0);
   o._interestDayCurrent      = MO.Class.register(o, new MO.AGetter('_interestDayCurrent'), 0);
   o._performanceDayCurrent   = MO.Class.register(o, new MO.AGetter('_performanceDayCurrent'), 0);
   o._customerDayCurrent      = MO.Class.register(o, new MO.AGetter('_customerDayCurrent'), 0);
   o._invementDay             = MO.Class.register(o, new MO.AGetter('_invementDay'), 0);
   o._invementTotalCurrent    = MO.Class.register(o, new MO.AGetter('_invementTotalCurrent'), 0);
   o._invementTotal           = MO.Class.register(o, new MO.AGetter('_invementTotal'), 0);
   o._dynamicInfo             = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o._intervalMinute          = 1;
   o._mapEntity               = MO.Class.register(o, new MO.AGetSet('_mapEntity'));
   o._display                 = MO.Class.register(o, new MO.AGetter('_display'));
   o._rankUnits               = MO.Class.register(o, new MO.AGetter('_rankUnits'));
   o._units                   = MO.Class.register(o, new MO.AGetter('_units'));
   o._tableCount              = 40;
   o._tableInterval           = 1000;
   o._tableTick               = 1;
   o._dataTicker              = null;
   o._unitPool                = null;
   o._autios                  = null;
   o._eventDataChanged        = null;
   o._listenersDataChanged    = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._event24HDataChanged     = null;
   o._listeners24HDataChanged = MO.Class.register(o, new MO.AListener('_listeners24HDataChanged', '24H' + MO.EEvent.DataChanged));
   o.onDynamicData            = MO.FEaiChartShowProcessor_onDynamicData;
   o.on24HDataFetch           = MO.FEaiChartShowProcessor_on24HDataFetch;
   o.construct                = MO.FEaiChartShowProcessor_construct;
   o.allocUnit                = MO.FEaiChartShowProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartShowProcessor_allocShape;
   o.setup                    = MO.FEaiChartShowProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartShowProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartShowProcessor_focusEntity;
   o.process                  = MO.FEaiChartShowProcessor_process;
   o.dispose                  = MO.FEaiChartShowProcessor_dispose;
   return o;
}
MO.FEaiChartShowProcessor_on24HDataFetch = function FEaiChartShowProcessor_on24HDataFetch(event) {
   var o = this;
   event.beginDate = o._24HBeginDate;
   event.endDate = o._24HEndDate;
   o.process24HDataChangedListener(event);
}
MO.FEaiChartShowProcessor_onDynamicData = function FEaiChartShowProcessor_onDynamicData(event){
   var o = this;
   var content = event.content;
   var dynamicInfo = o._dynamicInfo;
   dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   var rankUnits = o._rankUnits;
   rankUnits.assign(dynamicInfo.rankUnits());
   var units = o._units;
   units.append(dynamicInfo.units());
   var unitCount = units.count();
   if(unitCount){
      o._tableInterval = 1000 * 60 * o._intervalMinute / unitCount;
   }else{
      o._tableInterval = 1000 * 60 * o._intervalMinute;
   }
   o._tableTick = 0;
   var changeEvent = o._eventDataChanged;
   changeEvent.rankUnits = rankUnits;
   changeEvent.unit = null;
   o.processDataChangedListener(changeEvent);
}
MO.FEaiChartShowProcessor_construct = function FEaiChartShowProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._beginDate = new MO.TDate();
   o._endDate = new MO.TDate();
   o._24HBeginDate = new MO.TDate();
   o._24HEndDate = new MO.TDate();
   o._units = new MO.TObjects();
   o._tableTicker = new MO.TTicker(1000 * o._tableInterval);
   o._autios = new Object();
   o._dataTicker = new MO.TTicker(1000 * 60 * o._intervalMinute);
   o._dynamicInfo = MO.Class.create(MO.FEaiLogicInfoCustomerDynamic);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
}
MO.FEaiChartShowProcessor_allocUnit = function FEaiChartShowProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktCustomerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartShowProcessor_setup = function FEaiChartShowProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartShowProcessor_calculateCurrent = function FEaiChartShowProcessor_calculateCurrent(){
   var o = this;
   var info = o._dynamicInfo;
   var investmentCurrent = info.investmentCount();
   var investmentTotalCurrent = info.investmentTotal();
   var units = o._units;
   var count = units.count();
   for(var i = 0; i < count; i++){
      var unit = units.at(i);
      investmentCurrent -= unit.investment();
      investmentTotalCurrent -= unit.investment();
   }
   o._invementTotalCurrent = investmentTotalCurrent;
   o._invementDayCurrent = investmentCurrent;
}
MO.FEaiChartShowProcessor_focusEntity = function FEaiChartShowProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var countryEntity = o._countryEntity;
   var card = unit.card();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      var investment = unit.investment();
      var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = countryEntity.findProvince(provinceCode);
      if(provinceEntity){
         provinceEntity.doFocus(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
      if (o._mapEntity) {
         o._mapEntity.upload();
      }
      var autio = o._autios[level];
      if(autio){
      }
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartShowProcessor_process = function FEaiChartShowProcessor_process(){
   var o = this;
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   if(!system.testReady()){
      return;
   }
   var systemDate = system.currentDate();
   systemDate.truncMinute();
   if(!o._dateSetup){
      o._endDate.assign(systemDate);
      o._endDate.addMinute(-o._intervalMinute);
      o._dateSetup = true;
   }
   if(o._dataTicker.process()){
      var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.marketer().doCustomerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      beginDate.assign(endDate);
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncMinute(15);
      beginDate24H.addDay(-1);
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      endDate24H.truncMinute(15);
      statistics.marketer().doCustomerTrend(o, o.on24HDataFetch, beginDate24H.format(), endDate24H.format());
   }
   var currentTick = MO.Timer.current();
   if(currentTick - o._tableTick > o._tableInterval){
      var units = o._units;
      if(!units.isEmpty()){
         var unit = units.shift();
         o.focusEntity(unit);
      }
      o.calculateCurrent();
      o._tableTick = currentTick;
   }
   if (o._mapEntity != null) {
      o._mapEntity.process();
   }
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartShowProcessor_dispose = function FEaiChartShowProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiShowBoard = function FEaiShowBoard(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MProcessReady);
   o._radius          = MO.Class.register(o, new MO.AGetSet('_radius'));
   o._url             = MO.Class.register(o, new MO.AGetSet('_url'));
   o._maskUrl         = MO.Class.register(o, new MO.AGetSet('_maskUrl'));
   o._line            = null;
   o._video           = null;
   o._videoData       = null;
   o._currentPosition = null;
   o._targetRotation  = 0;
   o._targetDirection = null;
   o._targetPosition  = null;
   o._moveStartTick   = 0;
   o._moveSpeed       = 1000;
   o._startTick       = 0;
   o._playeing        = false;
   o.onProcessReady   = MO.FEaiShowBoard_onProcessReady;
   o.construct        = MO.FEaiShowBoard_construct;
   o.setup            = MO.FEaiShowBoard_setup;
   o.play             = MO.FEaiShowBoard_play;
   o.setCurrent       = MO.FEaiShowBoard_setCurrent;
   o.setTarget        = MO.FEaiShowBoard_setTarget;
   o.process          = MO.FEaiShowBoard_process;
   o.dispose          = MO.FEaiShowBoard_dispose;
   return o;
}
MO.FEaiShowBoard_onProcessReady = function FEaiShowBoard_onProcessReady(){
   var o = this;
   var loader = o._textureMaskLoader;
   o._textureMask = loader.pickTexture();
   o._textureMaskLoader = MO.Lang.Object.dispose(loader);
   o._video._textureMask = o._textureMask;
   o._videoData.pushTexture(o._textureMask, 'mask');
}
MO.FEaiShowBoard_construct = function FEaiShowBoard_construct() {
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o.__base.MProcessReady.construct.call(o);
   o._currentPosition = new MO.SPoint3();
   o._targetDirection = new MO.SVector3();
   o._targetPosition = new MO.SPoint3();
}
MO.FEaiShowBoard_setup = function FEaiShowBoard_setup(data) {
   var o = this;
   var context = o._graphicContext;
   var videoData = o._videoData = MO.Class.create(MO.FE3dVideoData);
   videoData.linkGraphicContext(o);
   videoData.setOptionCenter(true);
   videoData.setup();
   videoData.loadUrl(o._url);
   videoData.setLoop(true);
   videoData.play(true);
   videoData.material().info().effectCode = 'video.mask';
   videoData.material().info().optionAlpha = true;
   o._readyLoader.push(videoData);
   var video = o._video = context.createObject(MO.FE3dVideo);
   video.setOptionSelect(false);
   video.setData(videoData);
   var matrix = video.matrix();
   matrix.sx = 256;
   matrix.sy = 160;
   matrix.updateForce();
   o.pushRenderable(video);
   var loader = o._textureMaskLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'mask');
   loader.loadUrl(o._maskUrl);
   o._readyLoader.push(loader);
   o._startTick = MO.Timer.current();
}
MO.FEaiShowBoard_play = function FEaiShowBoard_play(flag){
   var o = this;
   if(o._playeing != flag){
      o._videoData.play(flag);
   }
   o._playeing = flag;
}
MO.FEaiShowBoard_setCurrent = function FEaiShowBoard_setCurrent(x, y, z){
   var o = this;
   o._currentPosition.set(x, y, z);
}
MO.FEaiShowBoard_setTarget = function FEaiShowBoard_setTarget(x, y, z){
   var o = this;
   o._moveStartTick = MO.Timer.current();
   o._targetPosition.set(x, y, z);
}
MO.FEaiShowBoard_process = function FEaiShowBoard_process() {
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   var matrix = o._matrix;
   var currentTick = MO.Timer.current();
   var span = MO.Timer.current() - o._startTick;
   if(o._playeing){
      o._videoData.process();
   }
   var currentPosition = o._currentPosition;
   var targetPosition = o._targetPosition;
   if(!currentPosition.equals(targetPosition)){
      if(o._moveStartTick != 0){
         var moveLength = (currentTick - o._moveStartTick) * 0.001 * o._moveSpeed;
         var direction = o._targetDirection.direction(currentPosition, targetPosition);
         var length = direction.absolute();
         currentPosition.assign(targetPosition);
         var angle = Math.atan2(-currentPosition.z, currentPosition.x);
         var scale = Math.min(Math.max(Math.sin(angle) + 1, 0) * 0.5 + 0.1, 1.0);
         var scaleScale = scale * scale;
         matrix.tx = currentPosition.x;
         matrix.ty = -600 * scale + 300;
         matrix.tz = currentPosition.z;
         matrix.sx = scaleScale;
         matrix.sy = scaleScale;
         matrix.updateForce();
      }
      o._moveStartTick = currentTick;
   }
}
MO.FEaiShowBoard_dispose = function FEaiShowBoard_dispose() {
   var o = this;
   o.__base.FE3dDisplay.dispose.call(o);
}
MO.FEaiShowBoardProcessor = function FEaiShowBoardProcessor(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplayContainer);
   o._optionRotation = true;
   o._optionArea     = false;
   o._selectBoard    = null;
   o._selectSpeed    = 0.01;
   o._boardCount     = 8;
   o._boardRotation  = 0;
   o._boardRadius    = 700;
   o._autoPlay       = MO.Class.register(o, new MO.AGetter('_autoPlay'));
   o._boards         = MO.Class.register(o, new MO.AGetSet('_boards'));
   o.construct       = MO.FEaiShowBoardProcessor_construct;
   o.setup           = MO.FEaiShowBoardProcessor_setup;
   o.setAutoPlay     = MO.FEaiShowBoardProcessor_setAutoPlay;
   o.setAutoRotation = MO.FEaiShowBoardProcessor_setAutoRotation;
   o.showArea        = MO.FEaiShowBoardProcessor_showArea;
   o.process         = MO.FEaiShowBoardProcessor_process;
   o.dispose         = MO.FEaiShowBoardProcessor_dispose;
   return o;
}
MO.FEaiShowBoardProcessor_construct = function FEaiShowBoardProcessor_construct() {
   var o = this;
   o.__base.FE3dDisplayContainer.construct.call(o);
   o._boards = new MO.TObjects();
}
MO.FEaiShowBoardProcessor_setup = function FEaiShowBoardProcessor_setup() {
   var o = this;
   var boards = o._boards;
   for(var i = 1; i <= o._boardCount; i++){
      var board = MO.Class.create(MO.FEaiShowBoard);
      board.linkGraphicContext(o);
      board.setUrl('{eai.resource}/show1019/center/' + i + '.mp4');
      board.setMaskUrl('{eai.resource}/show1019/center/' + i + '.jpg');
      board.setup();
      boards.push(board);
      o.pushDisplay(board);
   }
   var count = boards.count();
   var angle = Math.PI * 2 / count;
   var radius = o._boardRadius;
   var rotation = o._boardRotation;
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      var boardAngle = angle * i;
      board.setRadius(boardAngle);
      board.setCurrent(Math.cos(boardAngle) * radius, 0, -Math.sin(boardAngle) * radius);
   }
}
MO.FEaiShowBoardProcessor_setAutoPlay = function FEaiShowBoardProcessor_setAutoPlay(flag){
   var o = this;
   var boards = o._boards;
   var count = boards.count();
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      board.play(flag);
   }
   o.setVisible(flag);
}
MO.FEaiShowBoardProcessor_setAutoRotation = function FEaiShowBoardProcessor_setAutoRotation(flag){
   var o = this;
}
MO.FEaiShowBoardProcessor_showArea = function FEaiShowBoardProcessor_showArea(areaId){
   var o = this;
   var id = parseInt(areaId);
   if(id){
      o._optionArea = true;
      var selectBoard = o._boards.get(id - 1);
      MO.Assert.debugNotNull(selectBoard);
      o._selectBoard = selectBoard;
      var radius = selectBoard.radius();
      o._stopRadius = MO.Lang.Math.PI_2 + radius;
      o._boardRotation = o._boardRotation % MO.Lang.Math.PI2
   }else{
      o._optionArea = false;
   }
}
MO.FEaiShowBoardProcessor_process = function FEaiShowBoardProcessor_process() {
   var o = this;
   var rotation = o._boardRotation;
   if(o._optionArea){
      var radius = o._stopRadius;
      if(rotation > radius){
         rotation -= o._selectSpeed;
         if(rotation <= radius){
            rotation = radius;
         }
      }else if(rotation < radius){
         rotation += o._selectSpeed;
         if(rotation >= radius){
            rotation = radius;
         }
      }
   }else if(o._optionRotation){
      rotation += 0.001;
   }
   var matrix = o._matrix;
   o._boardRotation = rotation;
   var radius = o._boardRadius;
   var startAngle = 0;
   var endAngle = Math.PI;
   var boards = o._boards;
   var count = boards.count();
   for(var i = 0; i < count; i++){
      var board = boards.at(i);
      var boardAngle = rotation + board.radius();
      boardAngle %= MO.Lang.Math.PI2;
      if((boardAngle >= startAngle) && (boardAngle < endAngle)){
         board.play(true);
      }else{
         board.play(false);
      }
      board.setTarget(Math.cos(boardAngle) * radius, 0, -Math.sin(boardAngle) * radius);
   }
   o.__base.FE3dDisplayContainer.process.call(o);
}
MO.FEaiShowBoardProcessor_dispose = function FEaiShowBoardProcessor_dispose() {
   var o = this;
   o._boards = MO.Lang.Object.dispose(o._boards);
   o.__base.FE3dDisplayContainer.construct.call(o);
}
MO.FEaiShowFloatingImageManager = function FEaiShowFloatingImageManager(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   o._floatingImages = MO.Class.register(o, new MO.AGetSet('_floatingImages'));
   o._deltaX = 0;
   o._imgWidth = 510;
   o._imgHeight = 371;
   o._startTick = 0;
   o._slideDuration = 1000;
   o._showDuration = 5000;
   o._awayDuration = 6000;
   o._showIndex = -1;
   o._autoIndex = 0;
   o._autoShow = MO.Class.register(o, new MO.AGetSet('_autoShow'), true);
   o.showLocation = MO.FEaiShowFloatingImageManager_showLocation;
   o.setVisibleAll = MO.FEaiShowFloatingImageManager_setVisibleAll;
   o.process = MO.FEaiShowFloatingImageManager_process;
   o.construct = MO.FEaiShowFloatingImageManager_construct;
   o.setup = MO.FEaiShowFloatingImageManager_setup;
   o.dispose = MO.FEaiShowFloatingImageManager_dispose;
   return o;
}
MO.FEaiShowFloatingImageManager_construct = function FEaiShowFloatingImageManager_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._floatingImages = new MO.TObjects();
}
MO.FEaiShowFloatingImageManager_setup = function FEaiShowFloatingImageManager_setup() {
   var o = this;
   var floatingImages = o._floatingImages;
   var fiData = new MO.SShowFloatingImageData();
   fiData.name = 'bengbu';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/bengbu.jpg';
   fiData.longitude = 32.54;
   fiData.latitude = 117.23;
   fiData.startX = 0;
   fiData.startY = 100;
   fiData.endX = 1980;
   fiData.endY = 100;
   var frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/beijing.jpg';
   fiData.longitude = 39.54;
   fiData.latitude = 116.24;
   fiData.startX = 0;
   fiData.startY = 200;
   fiData.endX = 1980;
   fiData.endY = 200;
   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'seasian';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/seasian.jpg';
   fiData.longitude = 21.31;
   fiData.latitude = 96.6;
   fiData.startX = 0;
   fiData.startY = 300;
   fiData.endX = 1980;
   fiData.endY = 300;
   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'hefei';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/hefei.jpg';
   fiData.longitude = 31.49;
   fiData.latitude = 117.13;
   fiData.startX = 0;
   fiData.startY = 400;
   fiData.endX = 1980;
   fiData.endY = 400;
   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'lanzhou';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/lanzhou.jpg';
   fiData.longitude = 36.3;
   fiData.latitude = 103.50;
   fiData.startX = 0;
   fiData.startY = 500;
   fiData.endX = 1980;
   fiData.endY = 500;
   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'newyork';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/newyork.jpg';
   fiData.longitude = 40.42;
   fiData.latitude = -74.0;
   fiData.startX = 0;
   fiData.startY = 600;
   fiData.endX = 1980;
   fiData.endY = 600;
   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'shanghai';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/shanghai.jpg';
   fiData.longitude = 31.13;
   fiData.latitude = 121.28;
   fiData.startX = 0;
   fiData.startY = 700;
   fiData.endX = 1980;
   fiData.endY = 700;
   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'hongkong';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/hongkong.jpg';
   fiData.longitude = 22.23;
   fiData.latitude = 114.6;
   fiData.startX = 0;
   fiData.startY = 800;
   fiData.endX = 1980;
   fiData.endY = 800;
   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   var gap = o._imgWidth + 30;
   var count = floatingImages.count();
   for (var i = 0; i < count; i++) {
      var fi = floatingImages.at(i);
      var x = -gap * 8 + gap * i;
      fi.setLocation(x, 910);
   }
}
MO.FEaiShowFloatingImageManager_process = function FEaiShowFloatingImageManager_process() {
   var o = this;
   o.setVisibleAll(false);
   var floatingImages = o._floatingImages;
   var imgHeight = o._imgHeight;
   var showIndex = o._showIndex;
   if (showIndex > -1) {
      var fi = floatingImages.at(showIndex);
      var passedTick = MO.Timer.current() - o._startTick;
      if (passedTick < o._slideDuration) {
         var t = passedTick / o._slideDuration;
         fi.location().x = 50;
         fi.location().y = -imgHeight + (1080 + imgHeight) * 0.5 * t;
         fi.dirty();
      }
      else if (passedTick < o._showDuration) {
         fi.setLocation(50, (1080 - imgHeight) * 0.5);
         fi.dirty();
      }
      else if (passedTick < o._awayDuration) {
         var t = (passedTick - o._showDuration) / (o._awayDuration - o._showDuration);
         fi.location().x = 50;
         fi.location().y = (1080 - imgHeight) * 0.5 + (1080 + imgHeight) * 0.5 * t;
         fi.dirty();
      }
      else {
         o._showIndex = -1;
         fi.setVisible(false);
      }
   }
   else {
      var autoIndex = o._autoIndex;
      var fil = floatingImages.at(autoIndex);
      var fir = floatingImages.at(7 - autoIndex);
      var passedTick = MO.Timer.current() - o._startTick;
      if (passedTick < o._slideDuration) {
         var t = passedTick / o._slideDuration;
         fil.location().x = 50;
         fil.location().y = -imgHeight + (1080 + imgHeight) * 0.5 * t;
         fir.location().x = 1360;
         fir.location().y = 1080 - (1080 + imgHeight) * 0.5 * t;
         fil.dirty();
         fir.dirty();
      }
      else if (passedTick < o._showDuration) {
         fil.setLocation(50, (1080 - imgHeight) * 0.5);
         fir.setLocation(1360, (1080 - imgHeight) * 0.5);
         fil.dirty();
         fir.dirty();
      }
      else if (passedTick < o._awayDuration) {
         var t = (passedTick - o._showDuration) / (o._awayDuration - o._showDuration);
         fil.location().x = 50;
         fil.location().y = (1080 - imgHeight) * 0.5 + (1080 + imgHeight) * 0.5 * t;
         fir.location().x = 1360;
         fir.location().y = (1080 - imgHeight) * 0.5 - (1080 + imgHeight) * 0.5 * t;
         fil.dirty();
         fir.dirty();
      }
      else {
         o._autoIndex++;
         if (o._autoIndex > 7) {
            o._autoIndex = 0;
         }
         o._startTick = MO.Timer.current();
         fil.setVisible(false);
         fir.setVisible(false);
      }
   }
}
MO.FEaiShowFloatingImageManager_setVisibleAll = function FEaiShowFloatingImageManager_setVisibleAll(visible) {
   var o = this;
   var floatingImages = o._floatingImages;
   var count = floatingImages.count();
   for (var i = 0; i < count; i++) {
      var fi = floatingImages.at(i);
      fi.setVisible(false);
   }
}
MO.FEaiShowFloatingImageManager_showLocation = function FEaiShowFloatingImageManager_showLocation(locationId) {
   var o = this;
   o._showIndex = locationId - 1;
   o._startTick = MO.Timer.current();
}
MO.FEaiShowFloatingImageManager_dispose = function FEaiShowFloatingImageManager_dispose() {
   var o = this;
   o._floatingImages = MO.Lang.Object.dispose(o._floatingImages);
}
MO.FEaiShowFocusParameterManager = function FEaiShowFocusParameterManager(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   o._dict = null;
   o.getFocusParameter = MO.FEaiShowFocusParameterManager_getFocusParameter;
   o.construct = MO.FEaiShowFocusParameterManager_construct;
   o.setup = MO.FEaiShowFocusParameterManager_setup;
   o.dispose = MO.FEaiShowFocusParameterManager_dispose;
   return o;
}
MO.FEaiShowFocusParameterManager_construct = function FEaiShowFocusParameterManager_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._dict = new MO.TDictionary();
}
MO.FEaiShowFocusParameterManager_setup = function FEaiShowFocusParameterManager_setup() {
   var o = this;
   var dict = o._dict;
   dict.set('china', new MO.SShowFocusParameter(2.15, -750, 1400));
   dict.set('area.0', new MO.SShowFocusParameter(0, 0, 300));
   dict.set('area.1', new MO.SShowFocusParameter(1.98, 0, 400));
   dict.set('area.2', new MO.SShowFocusParameter(1.98, 0, 400));
   dict.set('area.3', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.4', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.5', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.6', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.7', new MO.SShowFocusParameter(0, 0, 400));
   dict.set('area.8', new MO.SShowFocusParameter(0, 0, 400));
}
MO.FEaiShowFocusParameterManager_getFocusParameter = function FEaiShowFocusParameterManager_getFocusParameter(key) {
   var o = this;
   return o._dict.get(key);
}
MO.FEaiShowFocusParameterManager_dispose = function FEaiShowFocusParameterManager_dispose() {
   var o = this;
   o._dict = MO.Lang.Object.dispose(o._dict);
}
MO.FGuiFloatingFrame = function FGuiFloatingFrame(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._frameImage = null;
   o._displayImage = null;
   o._ready = false;
   o._imageCount = 2;
   o._startRotateY = 0;
   o._endRotateY = 0;
   o._data = MO.Class.register(o, new MO.AGetSet('_data'));
   o.setup = MO.FGuiFloatingFrame_setup;
   o.onPaintBegin = MO.FGuiFloatingFrame_onPaintBegin;
   o.onImageLoad = MO.FGuiFloatingFrame_onImageLoad;
   o.floatingAnime = MO.FGuiFloatingFrame_floatingAnime;
   o.dispose = MO.FGuiFloatingFrame_dispose;
   return o;
}
MO.FGuiFloatingFrame_setup = function FGuiFloatingFrame_setup(data) {
   var o = this;
   o._data = data;
   o._frameImage = MO.Class.create(MO.FImage);
   o._frameImage.addLoadListener(o, o.onImageLoad);
   o._frameImage.loadUrl('{eai.resource}/show1019/frame.png');
   o._displayImage = MO.Class.create(MO.FImage);
   o._displayImage.addLoadListener(o, o.onImageLoad);
   o._displayImage.loadUrl(data.displayImageUrl);
   o._startRotateY = data.latitude * (Math.PI / 180);
}
MO.FGuiFloatingFrame_onImageLoad = function FGuiFloatingFrame_onImageLoad() {
   var o = this;
   if (--o._imageCount == 0) {
      o._ready = true;
   }
}
MO.FGuiFloatingFrame_onPaintBegin = function FGuiFloatingFrame_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = o._clientRectangle;
   var hCenter = rectangle.left + rectangle.width / 2;
   var displaySize = o._displayImage.size();
   var frameSize = o._frameImage.size();
   graphic.drawImage(o._displayImage, rectangle.left + 75, rectangle.top + 60, rectangle.width - 140, rectangle.height - 125);
   graphic.drawImage(o._frameImage, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FGuiFloatingFrame_floatingAnime = function FGuiFloatingFrame_floatingAnime(radianY) {
   o = this;
}
MO.FGuiFloatingFrame_dispose = function FGuiFloatingFrame_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}
