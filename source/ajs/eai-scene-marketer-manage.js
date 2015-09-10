MO.FEaiChartMktManageLivePop = function FEaiChartMktManageLivePop(o) {
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
   o.construct      = MO.FEaiChartMktManageLivePop_construct;
   o.setup          = MO.FEaiChartMktManageLivePop_setup;
   o.onPaintBegin   = MO.FEaiChartMktManageLivePop_onPaintBegin;
   o.onImageLoad    = MO.FEaiChartMktManageLivePop_onImageLoad;
   o.show           = MO.FEaiChartMktManageLivePop_show;
   o.dispose        = MO.FEaiChartMktManageLivePop_dispose;
   return o;
}
MO.FEaiChartMktManageLivePop_construct = function FEaiChartMktManageLivePop_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._date = new MO.TDate();
}
MO.FEaiChartMktManageLivePop_setup = function FEaiChartMktManageLivePop_setup() {
   var o = this;
   o.setWidth(o._fullWidth);
   o.setHeight(o._fullHeight);
   o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 3);
   o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight);
   o._bgImage = MO.Class.create(MO.FImage);
   o._bgImage.addLoadListener(o, o.onImageLoad);
   o._bgImage.loadUrl('{eai.resource}/invespop.png');
}
MO.FEaiChartMktManageLivePop_onImageLoad = function FEaiChartMktManageLivePop_onImageLoad() {
   this.dirty();
}
MO.FEaiChartMktManageLivePop_onPaintBegin = function FEaiChartMktManageLivePop_onPaintBegin(event) {
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
MO.FEaiChartMktManageLivePop_show = function FEaiChartMktManageLivePop_show() {
   o = this;
   o.setVisible(true);
   o._startTick = MO.Timer.current();
   o.dirty();
}
MO.FEaiChartMktManageLivePop_dispose = function FEaiChartMktManageLivePop_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FEaiChartMktManageLiveTable = function FEaiChartMktManageLiveTable(o) {
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
   o.onImageLoad           = MO.FEaiChartMktManageLiveTable_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartMktManageLiveTable_onPaintBegin;
   o.oeUpdate              = MO.FEaiChartMktManageLiveTable_oeUpdate;
   o.construct             = MO.FEaiChartMktManageLiveTable_construct;
   o.setup                 = MO.FEaiChartMktManageLiveTable_setup;
   o.pushEntity            = MO.FEaiChartMktManageLiveTable_pushEntity;
   o.drawRow               = MO.FEaiChartMktManageLiveTable_drawRow;
   o.dispose               = MO.FEaiChartMktManageLiveTable_dispose;
   return o;
}
MO.FEaiChartMktManageLiveTable_onImageLoad = function FEaiChartMktManageLiveTable_onImageLoad() {
   this.dirty();
}
MO.FEaiChartMktManageLiveTable_onPaintBegin = function FEaiChartMktManageLiveTable_onPaintBegin(event) {
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
MO.FEaiChartMktManageLiveTable_oeUpdate = function FEaiChartMktManageLiveTable_oeUpdate(event){
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
MO.FEaiChartMktManageLiveTable_construct = function FEaiChartMktManageLiveTable_construct() {
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
MO.FEaiChartMktManageLiveTable_setup = function FEaiChartMktManageLiveTable_setup() {
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
MO.FEaiChartMktManageLiveTable_pushEntity = function FEaiChartMktManageLiveTable_pushEntity(entity){
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
MO.FEaiChartMktManageLiveTable_drawRow = function FEaiChartMktManageLiveTable_drawRow(graphic, entity, flag, index, x, y, width){
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
MO.FEaiChartMktManageLiveTable_dispose = function FEaiChartMktManageLiveTable_dispose(){
   var o = this;
   o._entities = MO.Lang.Object.dispose(o._entities);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FEaiEntity.dispose.call(o);
}
MO.FEaiChartMktManageScene = function FEaiChartMktManageScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartWorld;
   o._investment             = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent      = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._24HLastTick            = 0;
   o._24HTrendInterval       = 1000 * 60 * 5;
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   o._livePop                = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._operationFlag          = false;
   o._operationPoint         = null;
   o._operationRotationX     = 0;
   o._operationRotationY     = 0;
   o._rotationX              = 0;
   o._rotationY              = 0;
   o._worldScale             = 500;
   o._groundAutioUrl         = '{eai.resource}/music/statistics.mp3';
   o.onInvestmentDataChanged = MO.FEaiChartMktManageScene_onInvestmentDataChanged;
   o.onProcessReady          = MO.FEaiChartMktManageScene_onProcessReady;
   o.onProcess               = MO.FEaiChartMktManageScene_onProcess;
   o.onOperationDown         = MO.FEaiChartMktManageScene_onOperationDown;
   o.onOperationMove         = MO.FEaiChartMktManageScene_onOperationMove;
   o.onOperationUp           = MO.FEaiChartMktManageScene_onOperationUp;
   o.onOperationWheel        = MO.FEaiChartMktManageScene_onOperationWheel;
   o.onSwitchProcess         = MO.FEaiChartMktManageScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartMktManageScene_onSwitchComplete;
   o.construct               = MO.FEaiChartMktManageScene_construct;
   o.setup                   = MO.FEaiChartMktManageScene_setup;
   o.testReady               = MO.FEaiChartMktManageScene_testReady;
   o.showParticle            = MO.FEaiChartMktManageScene_showParticle;
   o.showFace                = MO.FEaiChartMktManageScene_showFace;
   o.fixMatrix               = MO.FEaiChartMktManageScene_fixMatrix;
   o.processResize           = MO.FEaiChartMktManageScene_processResize;
   return o;
}
MO.FEaiChartMktManageScene_onInvestmentDataChanged = function FEaiChartMktManageScene_onInvestmentDataChanged(event) {
   var o = this;
   var entity = event.entity;
   var table = o._liveTable;
   table.setRank(event.rank);
   table.pushEntity(entity);
   table.dirty();
   if(entity){
      var pop = o._livePop;
      pop.setData(entity);
   }
}
MO.FEaiChartMktManageScene_onProcessReady = function FEaiChartMktManageScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showWorld();
}
MO.FEaiChartMktManageScene_onProcess = function FEaiChartMktManageScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if(!o._statusStart){
      if(o.testReady()){
         var hLoading = document.getElementById('id_loading');
         if(hLoading){
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if(o._statusLayerLevel <= 0){
            if(hLoading){
               document.body.removeChild(hLoading);
            }
            o.processLoaded();
            o._playing = true;
            o._statusStart = true;
         }
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
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      var logoBar = o._logoBar;
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._investment.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      if(o._nowTicker.process()){
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
   }
   if (o._livePop.visible()) {
      o._livePop.dirty();
   }
}
MO.FEaiChartMktManageScene_onOperationDown = function FEaiChartMktManageScene_onOperationDown(event){
   var o = this;
   o._operationFlag = true;
   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}
MO.FEaiChartMktManageScene_onOperationMove = function FEaiChartMktManageScene_onOperationMove(event){
   var o = this;
   if(o._operationFlag){
      var cx = event.x - o._operationPoint.x;
      var cy = event.y - o._operationPoint.y;
      o._rotationX = o._operationRotationX - cy * 0.001;
      o._rotationY = o._operationRotationY - cx * 0.002;
   }
}
MO.FEaiChartMktManageScene_onOperationUp = function FEaiChartMktManageScene_onOperationUp(event){
   var o = this;
   o._operationFlag = false;
}
MO.FEaiChartMktManageScene_onOperationWheel = function FEaiChartMktManageScene_onOperationWheel(event){
   var o = this;
   var delta = event.deltaY
   if(delta > 0){
      o._worldScale /= 1.05;
   }else if(delta < 0){
      o._worldScale *= 1.05;
   }
}
MO.FEaiChartMktManageScene_onSwitchProcess = function FEaiChartMktManageScene_onSwitchProcess(event){
   var o = this;
}
MO.FEaiChartMktManageScene_onSwitchComplete = function FEaiChartMktManageScene_onSwitchComplete(event){
   var o = this;
}
MO.FEaiChartMktManageScene_construct = function FEaiChartMktManageScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._operationPoint = new MO.SPoint2();
}
MO.FEaiChartMktManageScene_setup = function FEaiChartMktManageScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   o._guiManager.register(frame);
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMktManageTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMktManageLiveTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   var livePop = o._livePop = MO.Class.create(MO.FEaiChartMktManageLivePop);
   livePop.setName('LivePop');
   livePop.linkGraphicContext(o);
   livePop.setup();
   livePop.build();
   o._guiManager.register(livePop);
   o._guiManager.hide();
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -500);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(1000);
   projection.update();
   var region = o._activeStage.region();
   region.selectCamera(camera);
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
}
MO.FEaiChartMktManageScene_testReady = function FEaiChartMktManageScene_testReady(){
   return true;
}
MO.FEaiChartMktManageScene_showParticle = function FEaiChartMktManageScene_showParticle(provinceEntity, cityResource){
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   particle.color().set(1, 1, 0, 1);
   for(var i = 0; i < count; i++){
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      particle.setSpeed(4 + 0.4 * i);
      particle.setAcceleration(0);
      particle.setAttenuation(0.8);
      particle.start();
   }
}
MO.FEaiChartMktManageScene_showFace = function FEaiChartMktManageScene_showFace(){
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   o.processResize();
}
MO.FEaiChartMktManageScene_fixMatrix = function FEaiChartMktManageScene_fixMatrix(matrix){
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   }else{
      matrix.tx = -320;
      matrix.ty = 0;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);
   }
   matrix.update();
   o._rotationY += 0.001;
}
MO.FEaiChartMktManageScene_processResize = function FEaiChartMktManageScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._investment.display().matrix());
   var logoBar = o._logoBar;
   if(isVertical){
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   }else{
      logoBar.setLocation(5, 5);
      logoBar.setScale(1, 1);
   }
   var control = o._southSea;
   if(isVertical){
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   }else{
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(710);
      control.setBottom(260);
   }
   var timeline = o._timeline;
   if(isVertical){
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(680);
      timeline.setHeight(250);
   }
   var liveTable = o._liveTable;
   if(isVertical){
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   }else{
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(650);
   }
}
with (MO) {
   MO.FEaiChartMktManageTimeline = function FEaiChartMktManageTimeline(o) {
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
      o.oeUpdate          = FEaiChartMktManageTimeline_oeUpdate;
      o.construct         = FEaiChartMktManageTimeline_construct;
      o.sync              = FEaiChartMktManageTimeline_sync;
      o.onPaintBegin      = FEaiChartMktManageTimeline_onPaintBegin;
      o.on24HDataFetch    = FEaiChartMktManageTimeline_on24HDataFetch;
      return o;
   }
   MO.FEaiChartMktManageTimeline_construct = function FEaiChartMktManageTimeline_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._startTime = new TDate();
      o._endTime = new TDate();
   }
   MO.FEaiChartMktManageTimeline_sync = function FEaiChartMktManageTimeline_sync() {
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
   MO.FEaiChartMktManageTimeline_on24HDataFetch = function FEaiChartMktManageTimeline_on24HDataFetch(event) {
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
   MO.FEaiChartMktManageTimeline_oeUpdate = function FEaiChartMktManageTimeline_oeUpdate(event) {
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
   MO.FEaiChartMktManageTimeline_onPaintBegin = function FEaiChartMktManageTimeline_onPaintBegin(event) {
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
