MO.FEaiCstInvestment3dCountryTable = function FEaiCstInvestment3dCountryTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._backgroundImage = null;
   o._backgroundPadding = null;
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad = MO.FEaiCstInvestment3dCountryTable_onImageLoad;
   o.onPaintBegin = MO.FEaiCstInvestment3dCountryTable_onPaintBegin;
   o.construct = MO.FEaiCstInvestment3dCountryTable_construct;
   o.setup = MO.FEaiCstInvestment3dCountryTable_setup;
   o.setUnits = MO.FEaiCstInvestment3dCountryTable_setUnits;
   o.dispose = MO.FEaiCstInvestment3dCountryTable_dispose;
   return o;
}
MO.FEaiCstInvestment3dCountryTable_onImageLoad = function FEaiCstInvestment3dCountryTable_onImageLoad() {
   this.dirty();
}
MO.FEaiCstInvestment3dCountryTable_onPaintBegin = function FEaiCstInvestment3dCountryTable_onPaintBegin(event) {
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
   var titleText = '全球理财师数据展示中心';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   graphic.setFont(o._rowFontStyle);
}
MO.FEaiCstInvestment3dCountryTable_construct = function FEaiCstInvestment3dCountryTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiCstInvestment3dCountryTable_setup = function FEaiCstInvestment3dCountryTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid2.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridControl = MO.Class.create(MO.FGuiGridControl);
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
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(32);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 21;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('companyName');
   column.setLabel('公司名称');
   column.setDataName('companyName');
   column.setWidth(170);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerCount');
   column.setLabel('理财师数');
   column.setDataName('marketerCount');
   column.setTextAlign(MO.EUiAlign.Right);
   column.setWidth(100);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('investment');
   column.setLabel('投资总额(万)');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(140);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('redemption');
   column.setLabel('赎回总额(万)');
   column.setDataName('redemption');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(130);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('netinvestment');
   column.setLabel('净投总额(万)');
   column.setDataName('netinvestment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(130);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
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
MO.FEaiCstInvestment3dCountryTable_setUnits = function FEaiCstInvestment3dCountryTable_setUnits(units) {
   var o = this;
   if (!units) {
      return null;
   }
   var departmentModule = MO.Console.find(MO.FEaiResourceConsole).departmentModule();
   var grid = o._gridControl;
   grid.clearRows();
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.label();
      var department = departmentModule.findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set('companyName', departmentLabel);
      row.set('marketerCount', unit.marketerCount());
      row.set('investment', unit.investment());
      row.set('redemption', unit.redemption());
      row.set('netinvestment', unit.netinvestment());
      grid.pushRow(row);
   }
}
MO.FEaiCstInvestment3dCountryTable_dispose = function FEaiCstInvestment3dCountryTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiCstInvestment3dInfo = function FEaiCstInvestment3dInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._department2s = MO.Class.register(o, [new MO.AGetter('_department2s'), new MO.APersistence('_department2s', MO.EDataType.Objects, MO.FEaiCstInvestment3dInfoDepartment2)]);
   o._department4s = MO.Class.register(o, [new MO.AGetter('_department4s'), new MO.APersistence('_department4s', MO.EDataType.Objects, MO.FEaiCstInvestment3dInfoDepartment4)]);
   o._citys        = MO.Class.register(o, [new MO.AGetter('_citys'), new MO.APersistence('_citys', MO.EDataType.Objects, MO.FEaiCstInvestment3dInfoCity)]);
   return o;
}
MO.FEaiCstInvestment3dInfoCity = function FEaiCstInvestment3dInfoCity(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._card          = MO.Class.register(o, [new MO.AGetter('_card'), new MO.APersistence('_card', MO.EDataType.Uint32)]);
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Uint32)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
MO.FEaiCstInvestment3dInfoDepartment2 = function FEaiCstInvestment3dInfoDepartment2(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._id            = MO.Class.register(o, [new MO.AGetter('_id'), new MO.APersistence('_id', MO.EDataType.Uint32)]);
   o._label         = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Uint32)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
MO.FEaiCstInvestment3dInfoDepartment4 = function FEaiCstInvestment3dInfoDepartment4(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._provinceCode  = MO.Class.register(o, [new MO.AGetter('_provinceCode'), new MO.APersistence('_provinceCode', MO.EDataType.Uint16)]);
   o._id            = MO.Class.register(o, [new MO.AGetter('_id'), new MO.APersistence('_id', MO.EDataType.Uint32)]);
   o._parentLabel   = MO.Class.register(o, [new MO.AGetter('_parentLabel'), new MO.APersistence('_parentLabel', MO.EDataType.String)]);
   o._label         = MO.Class.register(o, [new MO.AGetter('_label'), new MO.APersistence('_label', MO.EDataType.String)]);
   o._marketerCount = MO.Class.register(o, [new MO.AGetter('_marketerCount'), new MO.APersistence('_marketerCount', MO.EDataType.Uint32)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._performance   = MO.Class.register(o, [new MO.AGetter('_performance'), new MO.APersistence('_performance', MO.EDataType.Double)]);
   return o;
}
MO.FEaiCstInvestment3dLivePop = function FEaiCstInvestment3dLivePop(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._bgImage       = null;
   o._data          = MO.Class.register(o, new MO.AGetSet('_data'));
   o._startTick     = 0;
   o._popDuration   = 500;
   o._showDuration  = 2000;
   o._closeDuration = 500;
   o._fullWidth     = 910;
   o._fullHeight    = 140;
   o._riseHeight    = 50;
   o._date          = null;
   o.construct      = MO.FEaiCstInvestment3dLivePop_construct;
   o.setup          = MO.FEaiCstInvestment3dLivePop_setup;
   o.onPaintBegin   = MO.FEaiCstInvestment3dLivePop_onPaintBegin;
   o.onImageLoad    = MO.FEaiCstInvestment3dLivePop_onImageLoad;
   o.show           = MO.FEaiCstInvestment3dLivePop_show;
   o.dispose        = MO.FEaiCstInvestment3dLivePop_dispose;
   return o;
}
MO.FEaiCstInvestment3dLivePop_construct = function FEaiCstInvestment3dLivePop_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._date = new MO.TDate();
}
MO.FEaiCstInvestment3dLivePop_setup = function FEaiCstInvestment3dLivePop_setup() {
   var o = this;
   o.setWidth(o._fullWidth);
   o.setHeight(o._fullHeight);
   o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 3);
   o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight);
   o._bgImage = MO.Class.create(MO.FImage);
   o._bgImage.addLoadListener(o, o.onImageLoad);
   o._bgImage.loadUrl('{eai.resource}/invespop.png');
}
MO.FEaiCstInvestment3dLivePop_onImageLoad = function FEaiCstInvestment3dLivePop_onImageLoad() {
   this.dirty();
}
MO.FEaiCstInvestment3dLivePop_onPaintBegin = function FEaiCstInvestment3dLivePop_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if (!o._data) {
      return;
   }
   var graphic = event.graphic;
   var rectangle = o._clientRectangle;
   var entity = o._data;
   var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityModule();
   var cityEntity = cityConsole.findByCard(entity.card());
   var popText = '';
   o._date.parse(entity.date());
   popText += o._date.format('HH24:MI:SS');
   popText += '    ';
   if (cityEntity) {
      popText += cityEntity.data().label();
   }
   popText += '    ';
   popText += entity.customer() + ' - ' + entity.phone();
   popText += '    ';
   popText += MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   graphic.setFont('36px Microsoft YaHei');
   popTextWidth = graphic.textWidth(popText);
   var passedTick = MO.Timer.current() - o._startTick;
   var showTick = passedTick - o._popDuration;
   var closeTick = passedTick - o._showDuration - o._popDuration;
   var p = 0;
   if (passedTick < o._popDuration) {
      p = passedTick / o._popDuration;
      graphic._handle.globalAlpha = p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic._handle.globalAlpha = 1;
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight * (1 - p));
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + p + ')');
   }
   else if (showTick < o._showDuration) {
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, 1)');
   }
   else if (closeTick < o._closeDuration) {
      p = closeTick / o._closeDuration;
      graphic._handle.globalAlpha = 1 - p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic._handle.globalAlpha = 1;
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - o._riseHeight * p);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + (1 - p) + ')');
   }
   else {
      o._data = null;
      o.setVisible(false);
      o.dirty();
      return;
   }
}
MO.FEaiCstInvestment3dLivePop_show = function FEaiCstInvestment3dLivePop_show() {
   o = this;
   o.setVisible(true);
   o._startTick = MO.Timer.current();
   o.dirty();
}
MO.FEaiCstInvestment3dLivePop_dispose = function FEaiCstInvestment3dLivePop_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiCstInvestment3dLiveTable = function FEaiCstInvestment3dLiveTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   o._rankLogoImage        = null;
   o._rankTitleImage       = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._columnLabels         = null;
   o._columnDefines        = null;
   o._columnWidths         = null;
   o._tableCount           = 0;
   o._entities             = null;
   o._lineScroll           = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad           = MO.FEaiCstInvestment3dLiveTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiCstInvestment3dLiveTable_onPaintBegin;
   o.oeUpdate              = MO.FEaiCstInvestment3dLiveTable_oeUpdate;
   o.construct             = MO.FEaiCstInvestment3dLiveTable_construct;
   o.setup                 = MO.FEaiCstInvestment3dLiveTable_setup;
   o.pushEntity            = MO.FEaiCstInvestment3dLiveTable_pushEntity;
   o.drawRow               = MO.FEaiCstInvestment3dLiveTable_drawRow;
   o.dispose               = MO.FEaiCstInvestment3dLiveTable_dispose;
   return o;
}
MO.FEaiCstInvestment3dLiveTable_onImageLoad = function FEaiCstInvestment3dLiveTable_onImageLoad() {
   this.dirty();
}
MO.FEaiCstInvestment3dLiveTable_onPaintBegin = function FEaiCstInvestment3dLiveTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var calculateRate = event.calculateRate;
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
   var widthDefine = 0;
   for(var i = 0; i < 4; i++){
      widthDefine += o._columnDefines[i];
   }
   for(var i = 0; i < 4; i++){
      o._columnWidths[i] = (o._columnDefines[i] / widthDefine * drawWidth) - 7;
   }
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
   graphic.drawImage(o._rankTitleImage, left + (width - 167) * 0.5, tableTop + 3, 167, 40);
   var rankEntity = o._rank;
   if(rankEntity){
      var tableText = '';
      var tableTextWidth = 0;
      var count = rankEntity.count();
      tableTop += 90;
      for(var i = 0; i < count; i++) {
         var entity = rankEntity.at(i);
         o.drawRow(graphic, entity, true, i, drawLeft, tableTop + o._rankRowHeight * i, drawWidth);
      }
   }
   var headText = '';
   var headTextWidth = 0;
   var headLeft = drawLeft;
   var headTop = top + o._headStart;
   var headTextTop = headTop + o._headTextTop;
   for(var i = 0; i < 4; i++){
      var headText = o._columnLabels[i];
      var headTextWidth = graphic.textWidth(headText);
      graphic.fillRectangle(headLeft, headTop, o._columnWidths[i] - 4, o._headHeight, '#122A46');
      graphic.drawText(headText, headLeft + (o._columnWidths[i] - headTextWidth - 4) * 0.5, headTextTop, '#00B2F2');
      headLeft += o._columnWidths[i];
   }
   var entities = o._entities;
   if(!entities.isEmpty()){
      var tableTop = top + o._rowStart;
      var tableText = '';
      var tableTextWidth = 0;
      graphic.clip(drawLeft, tableTop, drawWidth - 38, o._rowHeight * (o._tableCount - 1));
      tableTop += 24;
      var count = entities.count();
      for(var i = 0; i < count; i++) {
         var entity = entities.at(i);
         o.drawRow(graphic, entity, false, i, drawLeft, tableTop + o._rowHeight * i + o._lineScroll, drawWidth);
      }
   }
}
MO.FEaiCstInvestment3dLiveTable_oeUpdate = function FEaiCstInvestment3dLiveTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if(event.isBefore()){
      if(o._lineScroll < 0){
         o._lineScroll += 1;
         if(o._lineScroll < -o._rowHeight){
            o._lineScroll = 0;
         }
         if(o._lineScroll >= 0){
            var entities = o._entities;
            if(entities.count() > o._tableCount){
               entities.pop();
            }
            o._lineScroll = 0;
         }
         o.dirty();
      }
   }
}
MO.FEaiCstInvestment3dLiveTable_construct = function FEaiCstInvestment3dLiveTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._entities = new MO.TObjects();
   o._currentDate = new MO.TDate();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
   o._columnLabels = new Array('时间', '城市', '用户-手机', '投资额(元)');
   if(MO.Runtime.isPlatformMobile()){
      o._columnDefines = new Array(130, 130, 180, 186);
   }else{
      o._columnDefines = new Array(110, 110, 160, 166);
   }
   o._columnWidths = new Array();
}
MO.FEaiCstInvestment3dLiveTable_setup = function FEaiCstInvestment3dLiveTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoImage = imageConsole.load('{eai.resource}/live/company.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankTitleImage = imageConsole.load('{eai.resource}/live/tank-title.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rankLineImage = imageConsole.load('{eai.resource}/live/rank.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank1Image = imageConsole.load('{eai.resource}/live/1.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank2Image = imageConsole.load('{eai.resource}/live/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._rank3Image = imageConsole.load('{eai.resource}/live/3.png');
   image.addLoadListener(o, o.onImageLoad);
   o._headFontStyle = 'bold 36px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
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
      o._rowHeight = 46;
   }else{
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
      o._rowFontStyle = '24px Microsoft YaHei';
      o._rowStart = 384;
      o._rowHeight = 36;
   }
}
MO.FEaiCstInvestment3dLiveTable_pushEntity = function FEaiCstInvestment3dLiveTable_pushEntity(entity){
   var o = this;
   if(!entity){
      return null;
   }
   var entities = o._entities;
   entities.unshift(entity);
   o._lineScroll -= o._rowHeight;
   if(entities.count() > o._tableCount){
      entities.pop();
   }
}
MO.FEaiCstInvestment3dLiveTable_drawRow = function FEaiCstInvestment3dLiveTable_drawRow(graphic, entity, flag, index, x, y, width){
   var o = this;
   var widths = o._columnWidths;
   var fontColor = null;
   if(flag){
      fontColor = '#E5BD1D';
   }else{
      fontColor = '#59FDE9';
   }
   if(flag){
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - o._rankIconStart;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX - 6, imageY - 28, 58, 65);
      }
      if((index == 1) && o._rank2Image.testReady()){
         graphic.drawImage(o._rank2Image, imageX, imageY, 46, 37);
      }
      if((index == 2) && o._rank3Image.testReady()){
         graphic.drawImage(o._rank3Image, imageX, imageY, 46, 37);
      }
   }
   y += o._rankTextStart;
   var textWidth = 0;
   if(!flag){
      o._currentDate.parse(entity.date());
      var text = o._currentDate.format('HH24:MI:SS');
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[0] * 0.5 - textWidth * 0.5, y, fontColor);
   }
   x += widths[0];
   var cityResource = MO.Console.find(MO.FEaiResourceConsole).cityModule().findByCard(entity.card());
   text = '';
   if(cityResource){
      text = cityResource.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[1];
   text = entity.customer() + ' - ' + entity.phone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] * 0.5 - textWidth * 0.5, y, fontColor);
   x += widths[2];
   var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   var investmentRight = x + widths[3] - 15;
   if (investment.length > 7) {
      var highColor = null;
      if(investment.length > 9){
         highColor = '#FDEF01';
      }else{
         highColor = '#EB6C03';
      }
      var high = investment.substring(0, investment.length - 7);
      var low = investment.substring(investment.length - 7, investment.length);
      var highWidth = graphic.textWidth(high);
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high, investmentRight - lowWidth - highWidth, y, highColor);
      graphic.drawText(low, investmentRight - lowWidth, y, '#59FDE9');
   } else {
      textWidth = graphic.textWidth(investment);
      graphic.drawText(investment, investmentRight - textWidth, y, fontColor);
   }
}
MO.FEaiCstInvestment3dLiveTable_dispose = function FEaiCstInvestment3dLiveTable_dispose(){
   var o = this;
   o._entities = MO.Lang.Object.dispose(o._entities);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiCstInvestment3dProvinceTable = function FEaiCstInvestment3dProvinceTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._title = MO.Class.register(o, new MO.AGetSet('_title'), '大陆地区公司列表');
   o._backgroundImage = null;
   o._backgroundPadding = null;
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o.onImageLoad = MO.FEaiCstInvestment3dProvinceTable_onImageLoad;
   o.onPaintBegin = MO.FEaiCstInvestment3dProvinceTable_onPaintBegin;
   o.construct = MO.FEaiCstInvestment3dProvinceTable_construct;
   o.setup = MO.FEaiCstInvestment3dProvinceTable_setup;
   o.setUnits = MO.FEaiCstInvestment3dProvinceTable_setUnits;
   o.dispose = MO.FEaiCstInvestment3dProvinceTable_dispose;
   return o;
}
MO.FEaiCstInvestment3dProvinceTable_onImageLoad = function FEaiCstInvestment3dProvinceTable_onImageLoad() {
   this.dirty();
}
MO.FEaiCstInvestment3dProvinceTable_onPaintBegin = function FEaiCstInvestment3dProvinceTable_onPaintBegin(event) {
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
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(o._title);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(o._title, textLeft, top + 76, '#59FDE9');
   graphic.setFont(o._rowFontStyle);
}
MO.FEaiCstInvestment3dProvinceTable_construct = function FEaiCstInvestment3dProvinceTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._units = new MO.TObjects();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}
MO.FEaiCstInvestment3dProvinceTable_setup = function FEaiCstInvestment3dProvinceTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid2.png');
   image.addLoadListener(o, o.onImageLoad);
   var grid = o._gridControl = MO.Class.create(MO.FGuiGridControl);
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
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('companyName');
   column.setLabel('父公司名称');
   column.setDataName('companyName');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('branchName');
   column.setLabel('子公司名称');
   column.setDataName('branchName');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerCount');
   column.setLabel('理财师数');
   column.setDataName('marketerCount');
   column.setTextAlign(MO.EUiAlign.Right);
   column.setWidth(90);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('investment');
   column.setLabel('投资(万)');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(120);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('redemption');
   column.setLabel('赎回(万)');
   column.setDataName('redemption');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(120);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('netinvestment');
   column.setLabel('净投(万)');
   column.setDataName('netinvestment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
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
MO.FEaiCstInvestment3dProvinceTable_setUnits = function FEaiCstInvestment3dProvinceTable_setUnits(units) {
   var o = this;
   if (!units) {
      return null;
   }
   var departmentModule = MO.Console.find(MO.FEaiResourceConsole).departmentModule();
   var grid = o._gridControl;
   grid.clearRows();
   var count = Math.min(units.count(), 40);
   for (var i = 0; i < count; i++) {
      var unit = units.at(i);
      var row = grid.allocRow();
      var departmentLabel = unit.parentLabel();
      var department = departmentModule.findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      row.set('companyName', departmentLabel);
      row.set('branchName', unit.label());
      row.set('marketerCount', unit.marketerCount());
      row.set('investment', unit.investment());
      row.set('redemption', unit.redemption());
      row.set('netinvestment', unit.netinvestment());
      grid.pushRow(row);
   }
}
MO.FEaiCstInvestment3dProvinceTable_dispose = function FEaiCstInvestment3dProvinceTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiCstInvestment3dScene = function FEaiCstInvestment3dScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   o._code                    = MO.EEaiScene.ChartCustomerInvestment3d;
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
   o._startRotateY            = 0;
   o._targetRotateY           = 0;
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
   o._startWorldScale         = 500;
   o._targetWorldScale        = 500;
   o._cameraFrom              = null;
   o._cameraTo                = null;
   o._cameraDirection         = null;
   o._ccDirection             = null;
   o._facePosition            = null;
   o._organizationDataTicker  = null;
   o._organizationInfo        = null;
   o.onOrganizationFetch      = MO.FEaiCstInvestment3dScene_onOrganizationFetch;
   o.onOperationDown          = MO.FEaiCstInvestment3dScene_onOperationDown;
   o.onOperationMove          = MO.FEaiCstInvestment3dScene_onOperationMove;
   o.onOperationUp            = MO.FEaiCstInvestment3dScene_onOperationUp;
   o.onOperationWheel         = MO.FEaiCstInvestment3dScene_onOperationWheel;
   o.onOperationVisibility    = MO.FEaiCstInvestment3dScene_onOperationVisibility;
   o.onProcessReady           = MO.FEaiCstInvestment3dScene_onProcessReady;
   o.onProcess                = MO.FEaiCstInvestment3dScene_onProcess;
   o.onSwitchProcess          = MO.FEaiCstInvestment3dScene_onSwitchProcess;
   o.onSwitchComplete         = MO.FEaiCstInvestment3dScene_onSwitchComplete;
   o.construct                = MO.FEaiCstInvestment3dScene_construct;
   o.setup                    = MO.FEaiCstInvestment3dScene_setup;
   o.showFace                 = MO.FEaiCstInvestment3dScene_showFace;
   o.fixMatrix                = MO.FEaiCstInvestment3dScene_fixMatrix;
   o.processResize            = MO.FEaiCstInvestment3dScene_processResize;
   return o;
}
MO.FEaiCstInvestment3dScene_onOrganizationFetch = function FEaiCstInvestment3dScene_onOrganizationFetch(event) {
   var o = this;
   var mapEntity = o._mapEntity;
   var info = o._organizationInfo;
   info.unserializeSignBuffer(event.sign, event.content, true);
   o._countryTable.setUnits(info._department2s);
   var countryUnits = o._countryUnits;
   var department4s = info._department4s;
   countryUnits.clear();
   for (var i = 0; i < 20; i++) {
      countryUnits.push(department4s.at(i));
   }
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var cityModule = entityConsole.cityModule();
   var citys = info.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var card = city.card();
      var cityEntity = cityModule.findByCard(card);
      if(cityEntity){
         cityEntity.update(city);
      }
   }
}
MO.FEaiCstInvestment3dScene_onOperationVisibility = function FEaiCstInvestment3dScene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiCstInvestment3dScene_onProcessReady = function FEaiCstInvestment3dScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showWorld();
   var countryEntity = o._countryEntity;
   countryEntity.start();
   o._mapEntity.showCountry(countryEntity);
   o._mapEntity.showCity();
}
MO.FEaiCstInvestment3dScene_onProcess = function FEaiCstInvestment3dScene_onProcess() {
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
      if (o._organizationDataTicker.process()) {
         MO.Console.find(MO.FEaiLogicConsole).statistics().department().doOrganization(o, o.onOrganizationFetch, 2);
      }
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity.cityRangeRenderable().matrix());
      o.fixMatrix(mapEntity.cityCenterRenderable().matrix());
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
      mapEntity.process();
   }
}
MO.FEaiCstInvestment3dScene_onOperationDown = function FEaiCstInvestment3dScene_onOperationDown(event) {
   var o = this;
   o._opMouseDown = true;
   if (o._showingMktInfo) {
      return;
   }
   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}
MO.FEaiCstInvestment3dScene_onOperationMove = function FEaiCstInvestment3dScene_onOperationMove(event) {
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
MO.FEaiCstInvestment3dScene_onOperationUp = function FEaiCstInvestment3dScene_onOperationUp(event) {
   var o = this;
   o._opMouseDown = false;
   if (o._showingMktInfo) {
      o._showingMktInfo = false;
      var mktInfoDiv = document.getElementById('id_marketer_info');
      mktInfoDiv.style.display = 'none';
      return;
   }
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
               o._targetWorldScale = 1200;
               if (countryEntity.code() == 'China') {
                  o._showChina = true;
               }
               else {
                  o._countryEntity._borderShape.setVisible(false);
                  o._countryEntity._faceShape.setVisible(false);
                  var provinceTable = o._provinceTable;
                  provinceTable.setTitle('大陆地区公司列表');
                  provinceTable.setUnits(o._countryUnits);
                  provinceTable.dirty();
                  provinceTable.setVisible(false);
                  o._countryTable.setVisible(true);
               }
            }else if(MO.Class.isClass(entity, MO.FEaiProvince3dEntity)){
               var provinceEntity = entity;
               o._targetWorldScale = 3000;
               var res = provinceEntity.resource();
               var pCode = res.code();
               if (pCode == o._selectedProvinceCode) {
                  var mktInfoDiv = document.getElementById('id_marketer_info');
                  mktInfoDiv.style.display = '';
                  o._showingMktInfo = true;
               }
               else {
                  o._selectedProvinceCode = pCode;
               }
               var provinceTable = o._provinceTable;
               provinceTable.setTitle(res.label() + '地区分公司列表');
               var department4s =  o._organizationInfo._department4s;
               var count = department4s.count();
               var provinceUnits = o._provinceUnits;
               provinceUnits.clear();
               for (var i = 0; i < count ; i++) {
                  var unit = department4s.at(i);
                  if (unit.provinceCode() == pCode) {
                     provinceUnits.push(unit);
                     if (provinceUnits.count() > 26) {
                        break;
                     }
                  }
               }
               provinceTable.setUnits(provinceUnits);
               provinceTable.dirty();
            }else{
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
         o._startRotateY = o._rotationY % (Math.PI * 2);
         o._startWorldScale = o._worldScale;
         o._targetTranslateY = 0
         o._targetRotateY = o._rotationY;
         o._targetWorldScale = 500;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = true;
         o._countryEntity._borderShape.setVisible(false);
         o._countryEntity._faceShape.setVisible(false);
         var provinceTable = o._provinceTable;
         provinceTable.setTitle('大陆地区公司列表');
         provinceTable.setUnits(o._countryUnits);
         provinceTable.dirty();
         provinceTable.setVisible(false);
         o._countryTable.setVisible(true);
      }
   }
   o._operationMoved = false;
}
MO.FEaiCstInvestment3dScene_onOperationWheel = function FEaiCstInvestment3dScene_onOperationWheel(event) {
   var o = this;
   var delta = event.deltaY
   if (delta > 0) {
      o._worldScale /= 1.05;
   } else if (delta < 0) {
      o._worldScale *= 1.05;
   }
}
MO.FEaiCstInvestment3dScene_onSwitchProcess = function FEaiCstInvestment3dScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiCstInvestment3dScene_onSwitchComplete = function FEaiCstInvestment3dScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiCstInvestment3dScene_construct = function FEaiCstInvestment3dScene_construct() {
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._operationPoint = new MO.SPoint2();
   o._organizationDataTicker = new MO.TTicker(1000 * 60);
   o._organizationInfo = MO.Class.create(MO.FEaiCstInvestment3dInfo);
   o._cameraFrom = new MO.SPoint3();
   o._cameraTo = new MO.SPoint3();
   o._ccDirection = new MO.SVector3();
   o._facePosition = new MO.SPoint3();
   o._provinceUnits = new MO.TObjects();
   o._countryUnits = new MO.TObjects();
}
MO.FEaiCstInvestment3dScene_setup = function FEaiCstInvestment3dScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var countryTable = o._countryTable = MO.Class.create(MO.FEaiCstInvestment3dCountryTable);
   countryTable.setName('countryTable');
   countryTable.linkGraphicContext(o);
   countryTable.setup();
   countryTable.build();
   o._guiManager.register(countryTable);
   var provinceTable = o._provinceTable = MO.Class.create(MO.FEaiCstInvestment3dProvinceTable);
   provinceTable.setName('provinceTable');
   provinceTable.linkGraphicContext(o);
   provinceTable.setup();
   provinceTable.build();
   provinceTable.setVisible(false);
   o._guiManager.register(provinceTable);
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
}
MO.FEaiCstInvestment3dScene_showFace = function FEaiCstInvestment3dScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   o.processResize();
}
MO.FEaiCstInvestment3dScene_fixMatrix = function FEaiCstInvestment3dScene_fixMatrix(matrix) {
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
            o._provinceTable.setVisible(true);
            o._countryTable.setVisible(false);
            o._provinceTable.dirty();
            o._showChina = false;
         }
      }
      o._translateY = o._startTranslateY + (o._targetTranslateY - o._startTranslateY) * rate;
      o._rotationY = o._startRotateY + (o._targetRotateY - o._startRotateY) * rate;
      o._worldScale = o._startWorldScale + (o._targetWorldScale - o._startWorldScale) * rate;
   }
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -320;
      matrix.ty = o._translateY;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);
   }
   matrix.update();
   if (o._autoRotate) {
      o._rotationY += 0.001;
   }
}
MO.FEaiCstInvestment3dScene_processResize = function FEaiCstInvestment3dScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   var countryTable = o._countryTable;
   if(isVertical){
      countryTable.setDockCd(MO.EUiDock.Bottom);
      countryTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      countryTable.setLeft(10);
      countryTable.setRight(10);
      countryTable.setBottom(10);
      countryTable.setWidth(1060);
      countryTable.setHeight(900);
   }else{
      countryTable.setDockCd(MO.EUiDock.Right);
      countryTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      countryTable.setTop(10);
      countryTable.setRight(0);
      countryTable.setBottom(10);
      countryTable.setWidth(750);
   }
   var provinceTable = o._provinceTable;
   if (isVertical) {
      provinceTable.setDockCd(MO.EUiDock.Bottom);
      provinceTable.setAnchorCd(MO.EUiAnchor.All);
      provinceTable.setLeft(10);
      provinceTable.setRight(10);
      provinceTable.setBottom(10);
      provinceTable.setWidth(1060);
      provinceTable.setHeight(900);
   } else {
      provinceTable.setDockCd(MO.EUiDock.Right);
      provinceTable.setAnchorCd(MO.EUiAnchor.All);
      provinceTable.setTop(10);
      provinceTable.setRight(0);
      provinceTable.setBottom(10);
      provinceTable.setWidth(750);
   }
}
with (MO) {
   MO.FEaiCstInvestment3dTimeline = function FEaiCstInvestment3dTimeline(o) {
      o = MO.Class.inherits(this, o, FGuiControl);
      o._startTime        = MO.Class.register(o, new AGetSet('_startTime'));
      o._endTime          = MO.Class.register(o, new AGetSet('_endTime'));
      o._data             = null;
      o._ready            = false;
      o._investmentTotal  = 0;
      o._intervalMiniute  = 10;
      o._baseHeight = 5;
      o._degreeLineHeight = MO.Class.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth    = MO.Class.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight   = MO.Class.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap      = MO.Class.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth    = MO.Class.register(o, new AGetSet('_decoLineWidth'), 30);
      o.oeUpdate          = FEaiCstInvestment3dTimeline_oeUpdate;
      o.construct         = FEaiCstInvestment3dTimeline_construct;
      o.sync              = FEaiCstInvestment3dTimeline_sync;
      o.onPaintBegin      = FEaiCstInvestment3dTimeline_onPaintBegin;
      o.on24HDataFetch    = FEaiCstInvestment3dTimeline_on24HDataFetch;
      return o;
   }
   MO.FEaiCstInvestment3dTimeline_construct = function FEaiCstInvestment3dTimeline_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._startTime = new TDate();
      o._endTime = new TDate();
   }
   MO.FEaiCstInvestment3dTimeline_sync = function FEaiCstInvestment3dTimeline_sync() {
      var o = this;
      if (!o._ready) {
         return;
      }
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      if(!systemLogic.testReady()){
         return;
      }
      var currentDate = systemLogic.currentDate();
      currentDate.truncMinute(o._intervalMiniute);
      var startTime = o._startTime;
      startTime.assign(currentDate);
      startTime.addDay(-1);
      var endTime = o._endTime;
      endTime.assign(currentDate);
   }
   MO.FEaiCstInvestment3dTimeline_on24HDataFetch = function FEaiCstInvestment3dTimeline_on24HDataFetch(event) {
      var o = this;
      o._investmentTotal  = 0;
      var data = o._data = event.content.collection;
      if(data){
         var count = data.length;
         for(var i = 0; i < count; i++){
            var row = data[i];
            o._investmentTotal += parseFloat(row.investment);
         }
      }
      o.dirty();
   }
   MO.FEaiCstInvestment3dTimeline_oeUpdate = function FEaiCstInvestment3dTimeline_oeUpdate(event) {
      var o = this;
      o.__base.FGuiControl.oeUpdate.call(o, event);
      if (o._ready) {
         return;
      }
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      if (systemLogic.testReady()) {
         o._ready = true;
         o.sync();
      }
      return MO.EEventStatus.Stop;
   }
   MO.FEaiCstInvestment3dTimeline_onPaintBegin = function FEaiCstInvestment3dTimeline_onPaintBegin(event) {
      var o = this;
      if (!o._ready) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;
      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 30;
      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      var dataTop = top + 60;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
      var startTime = o.startTime();
      var endTime = o.endTime();
      var timeSpan = endTime.date.getTime() - startTime.date.getTime();
      var bakTime = startTime.date.getTime();
      var text;
      var drawText = false;
      var textWidth = 0;
      while (!startTime.isAfter(endTime)) {
         var span = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
         graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
         text = startTime.format('HH24:00');
         startTime.addHour(1);
         drawText = !drawText;
         if (drawText) {
            graphic.setFont('bold 20px Microsoft YaHei');
            textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
         }
      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var data = o._data;
      if (!data || data.length < 1) {
         return;
      }
      var maxInves = 0;
      for (var i = 0; i < data.length; i++) {
         var inves = parseInt(data[i].investment);
         if (inves > maxInves) {
            maxInves = inves;
         }
      }
      var pixPer10k = dataHeight * 10000 / maxInves;
      var inves = parseInt(data[0].investment);
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var ctx = graphic._handle;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(EEaiRate.Investment);
      for (var i = 1; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var degreeSpan = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
         var y = dataBottom - data[i].investment / 10000 * pixPer10k;
         y -= o._baseHeight;
         ctx.lineTo(x, y);
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
      ctx.strokeStyle = gradient;
      ctx.fillStyle = opGradient;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.lineTo(x, dataBottom);
      ctx.lineTo(dataLeft, dataBottom);
      ctx.lineTo(dataLeft, lastY);
      ctx.fill();
      startTime.date.setTime(bakTime);
      startTime.refresh();
      var lastHour = -1;
      var hourInves = 0;
      var maxHourInves = 0;
      startTime.parseAuto(data[0].date);
      startTime.refresh();
      lastHour = startTime.date.getHours();
      for (var i = 0; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var hour = startTime.date.getHours();
         if (lastHour == hour) {
            hourInves += parseInt(data[i].investment);
         }else{
            if(hourInves > maxHourInves){
               maxHourInves = hourInves;
               hourInves = 0;
            }
            lastHour = hour;
         }
      }
      graphic.setFont('bold 24px Microsoft YaHei');
      graphic.drawText("24小时投资曲线", decoLeft, top, '#54F0FF');
      graphic.setFont('22px Microsoft YaHei');
      var rowStart = top + 30;
      var rowHeight = 22;
      var textWidth = graphic.textWidth('小时峰值：');
      var textHourPeakValue = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
      var textHourPeakWidth = graphic.textWidth(textHourPeakValue);
      var textDayTotalValue = MO.Lang.Float.unitFormat(o._investmentTotal, 0, 0, 2, 0, 10000, '万');
      var textDayTotalWidth = graphic.textWidth(textDayTotalValue);
      var textHourAvrgValue = MO.Lang.Float.unitFormat(o._investmentTotal / 24, 0, 0, 2, 0, 10000, '万');
      var textHourAvrgWidth = graphic.textWidth(textHourAvrgValue);
      var textValueWidth = Math.max(Math.max(textHourPeakWidth, textDayTotalWidth), textHourAvrgWidth);
      graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
      graphic.drawText(textDayTotalValue, decoLeft + textWidth + textValueWidth - textDayTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
      graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
      graphic.drawText(textHourPeakValue, decoLeft + textWidth + textValueWidth - textHourPeakWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
      graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
      graphic.drawText(textHourAvrgValue, decoLeft + textWidth + textValueWidth - textHourAvrgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
      startTime.date.setTime(bakTime);
      startTime.refresh();
   }
}
