with (MO) {
   MO.FGui24HTimeline = function FGui24HTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._startTime        = RClass.register(o, new AGetSet('_startTime'));
      o._endTime          = RClass.register(o, new AGetSet('_endTime'));
      o._data             = null;
      o._ready            = false;
      o._investmentTotal  = 0;
      o._intervalMiniute  = 10;
      o._baseHeight = 5;
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth    = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight   = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap      = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth    = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      o.oeUpdate          = FGui24HTimeline_oeUpdate;
      o.construct         = FGui24HTimeline_construct;
      o.sync              = FGui24HTimeline_sync;
      o.onPaintBegin      = FGui24HTimeline_onPaintBegin;
      o.on24HDataFetch    = FGui24HTimeline_on24HDataFetch;
      return o;
   }
   MO.FGui24HTimeline_construct = function FGui24HTimeline_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._startTime = new TDate();
      o._endTime = new TDate();
   }
   MO.FGui24HTimeline_sync = function FGui24HTimeline_sync() {
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
      var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
      statisticsLogic.doInvestmentTrend(o, o.on24HDataFetch, startTime.format(), endTime.format(), 60 * o._intervalMiniute);
   }
   MO.FGui24HTimeline_on24HDataFetch = function FGui24HTimeline_on24HDataFetch(event) {
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
   MO.FGui24HTimeline_oeUpdate = function FGui24HTimeline_oeUpdate(event) {
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
   MO.FGui24HTimeline_onPaintBegin = function FGui24HTimeline_onPaintBegin(event) {
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
with (MO) {
   MO.FGuiHistoryMilestoneBar = function FGuiHistoryMilestoneBar(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._bgImage = null;
      o._wanBGImage = null;
      o._yiBGImage = null;
      o._numImages = null;
      o._wanImage = null;
      o._yiImage = null;
      o._data = RClass.register(o, new AGetSet('_data'));
      o._fullWidth = 0;
      o._fullHeight = 0;
      o.setup = FGuiHistoryMilestoneBar_setup;
      o.onPaintBegin = FGuiHistoryMilestoneBar_onPaintBegin;
      o.dispose = FGuiHistoryMilestoneBar_dispose;
      return o;
   }
   MO.FGuiHistoryMilestoneBar_setup = function FGuiHistoryMilestoneBar_setup(data) {
      var o = this;
      o._data = data;
      var imageConsole = MO.Console.find(MO.FImageConsole);
      o._wanBGImage = imageConsole.load('{eai.resource}/milestone/bar_wan.png');
      o._yiBGImage = imageConsole.load('{eai.resource}/milestone/bar_yi.png');
      o._wanImage = imageConsole.load('{eai.resource}/number_2/wan.png');
      o._yiImage = imageConsole.load('{eai.resource}/number_2/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         o._numImages[i] = imageConsole.load('{eai.resource}/number_2/' + i + '.png');
      }
      var milestoneInvestmentTotal = data.investmentTotal();
      if (milestoneInvestmentTotal >= 10000) {
         o._bgImage = o._yiBGImage;
         o.setWidth(371);
         o.setHeight(80);
      } else {
         o._bgImage = o._wanBGImage;
         o.setWidth(341);
         o.setHeight(76);
      }
   }
   MO.FGuiHistoryMilestoneBar_onPaintBegin = function FGuiHistoryMilestoneBar_onPaintBegin(event) {
      var o = this;
      if (!o._data) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, bgSize.width, bgSize.height);
      var textLeft = rectangle.left + 25;
      var textTop = rectangle.top + rectangle.height / 2;
      var drawFactor = 1;
      var invesText = o.data().investmentTotal().toString();
      if (invesText.length > 4) {
         drawFactor = 0.53;
         graphic.setFont('22px Microsoft YaHei');
         textTop += 10;
         invesText = invesText.substring(0, invesText.length - 4);
         var unitImage = o._yiImage;
      }
      else {
         drawFactor = 0.35;
         graphic.setFont('18px Microsoft YaHei');
         textTop += 6;
         var unitImage = o._wanImage;
      }
      var codeText = o.data().code();
      var dataText = codeText.substring(0, 4) + "年" + codeText.substring(4, 6) + "月" + codeText.substring(6, 8) + "日";
      var textWidth = graphic.textWidth(dataText);
      graphic.drawText(dataText, textLeft, textTop, '#FFEE78');
      var numImgSize = o._numImages[0]._size;
      var unitImgSize = o._yiImage._size;
      var numWidth = invesText.length * numImgSize.width * drawFactor + unitImgSize.width * drawFactor;
      var numLeft = rectangle.left + rectangle.width - numWidth - 55;
      var numTop = rectangle.top + (rectangle.height - numImgSize.height * drawFactor) / 2;
      for (var i = 0; i < invesText.length; i++) {
         graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width * drawFactor, numTop, numImgSize.width * drawFactor, numImgSize.height * drawFactor);
      }
      graphic.drawImage(unitImage, numLeft + invesText.length * numImgSize.width * drawFactor, numTop, unitImgSize.width * drawFactor, unitImgSize.height * drawFactor);
   }
   MO.FGuiHistoryMilestoneBar_dispose = function FGuiHistoryMilestoneBar_dispose() {
      var o = this;
      o.__base.FGuiControl.dispose.call(o);
   }
}
with (MO) {
   MO.FGuiHistoryMilestoneFrame = function FGuiHistoryMilestoneFrame(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._bgImage              = null;
      o._numImages            = null;
      o._wanImage             = null;
      o._yiImage              = null;
      o._data                 = RClass.register(o, new AGetSet('_data'));
      o._startTick            = 0;
      o._popDuration          = 400;
      o._showDuration         = 3000;
      o._closeDuration        = 400;
      o._fullWidth            = 953;
      o._fullHeight           = 896;
      o._popupSE              = null;
      o._100yiSE              = null;
      o._listenersDataChanged = RClass.register(o, new AListener('_listenersDataChanged', MO.EEvent.DataChanged));
      o.setup                 = FGuiHistoryMilestoneFrame_setup;
      o.onPaintBegin          = FGuiHistoryMilestoneFrame_onPaintBegin;
      o.onImageLoad           = FGuiHistoryMilestoneFrame_onImageLoad;
      o.show                  = FGuiHistoryMilestoneFrame_show;
      o.dispose               = FGuiHistoryMilestoneFrame_dispose;
      return o;
   }
   MO.FGuiHistoryMilestoneFrame_setup = function FGuiHistoryMilestoneFrame_setup() {
      var o = this;
      o.setWidth(o._fullWidth);
      o.setHeight(o._fullHeight);
      o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 2);
      o.setTop((MO.Eai.Canvas.logicSize().height));
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('{eai.resource}/milestone/bg.png');
      o._wanImage = MO.Class.create(MO.FImage);
      o._wanImage.addLoadListener(o, o.onImageLoad);
      o._wanImage.loadUrl('{eai.resource}/number/wan.png');
      o._yiImage = MO.Class.create(MO.FImage);
      o._yiImage.addLoadListener(o, o.onImageLoad);
      o._yiImage.loadUrl('{eai.resource}/number/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         var img = MO.Class.create(MO.FImage);
         img.addLoadListener(o, o.onImageLoad);
         img.loadUrl('{eai.resource}/number/' + i + '.png');
         o._numImages[i] = img;
      }
      var audioConsole = MO.Console.find(MO.FAudioConsole);
      o._popupSE = audioConsole.load('{eai.resource}/milestone/popup.mp3');
      o._100yiSE = audioConsole.load('{eai.resource}/milestone/100yi.mp3');
   }
   MO.FGuiHistoryMilestoneFrame_onImageLoad = function FGuiHistoryMilestoneFrame_onImageLoad() {
      this.dirty();
   }
   MO.FGuiHistoryMilestoneFrame_onPaintBegin = function FGuiHistoryMilestoneFrame_onPaintBegin(event) {
      var o = this;
      if (!o._data) {
         return;
      }
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      var hCenter = rectangle.left + rectangle.width / 2;
      var textLeft = hCenter - 135;
      var textTop = rectangle.top + 520;
      var passedTick = MO.Timer.current() - o._startTick;
      var showTick = passedTick - o._popDuration;
      var closeTick = passedTick - o._showDuration - o._popDuration;
      var slideDistance = (MO.Eai.Canvas.logicSize().height + o._fullHeight) / 2 + 50 - o._fullHeight;
      var p = 0;
      if (passedTick < o._popDuration) {
         p = passedTick / o._popDuration;
         p = 1 - (1 - p) * (1 - p);
         graphic._handle.globalAlpha = p;
         o.setTop(MO.Eai.Canvas.logicSize().height - o._fullHeight - slideDistance * p);
      }
      else if (showTick < o._showDuration) {
      }
      else if (closeTick < o._closeDuration) {
         p = closeTick / o._closeDuration;
         p = p * p;
         graphic._handle.globalAlpha = 1 - p;
         o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - 50 - slideDistance * p);
      }
      else {
         o._data = null;
         o.setVisible(false);
         o.setTop(MO.Eai.Canvas.logicSize().height - o._fullHeight)
         o.dirty();
         var dsEvent = MO.Memory.alloc(SEvent);
         dsEvent.sender = o;
         o.processDataChangedListener(dsEvent);
         return;
      }
      graphic.drawImage(o._bgImage, hCenter - bgSize.width / 2, rectangle.top, bgSize.width, bgSize.height);
      graphic.setFont('bold 28px Microsoft YaHei');
      graphic.drawText('达成日数：', textLeft, textTop + 50, '#FF9103');
      graphic.drawText('分公司数：', textLeft, textTop + 100, '#FF9103');
      graphic.drawText('理财师数：', textLeft, textTop + 150, '#FF9103');
      if (o.data()) {
         var invesText = o.data().investmentTotal().toString();
         if (invesText.length > 4) {
            invesText = invesText.substring(0, invesText.length - 4);
            var unitImage = o._yiImage;
         }
         else {
            var unitImage = o._wanImage;
         }
         var numImgSize = o._numImages[0]._size;
         var unitImgSize = o._yiImage._size;
         var numWidth = invesText.length * numImgSize.width + unitImgSize.width;
         var numLeft = hCenter - numWidth / 2;
         for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width, rectangle.top + 320, numImgSize.width, numImgSize.height);
         }
         graphic.drawImage(unitImage, numLeft + invesText.length * numImgSize.width, rectangle.top + 320, unitImgSize.width, unitImgSize.height);
         var dataText = '';
         var textWidth = 0;
         graphic.setFont('48px Microsoft YaHei');
         var dateTextTop = rectangle.top + 280;
         var codeText = o.data().code();
         dataText = codeText.substring(0, 4) + "年" + codeText.substring(4, 6) + "月" + codeText.substring(6, 8) + "日达成";
         textWidth = graphic.textWidth(dataText);
         var dateTextLeft = hCenter - textWidth / 2 - 10;
         dataText = codeText.substring(0, 4);
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FFEE78');
         dateTextLeft += textWidth;
         dataText = '年';
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FF9103');
         dateTextLeft += textWidth;
         dataText = codeText.substring(4, 6);
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FFEE78');
         dateTextLeft += textWidth;
         dataText = '月';
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FF9103');
         dateTextLeft += textWidth;
         dataText = codeText.substring(6, 8);
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FFEE78');
         dateTextLeft += textWidth;
         dataText = '日达成';
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, dateTextLeft, dateTextTop, '#FF9103');
         dateTextLeft += textWidth;
         graphic.setFont('bold 28px Microsoft YaHei');
         dataText = o.data().dayCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 50, '#FFEE78');
         dataText = o.data().companyCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 100, '#FFEE78');
         dataText = o.data().staffCount();
         textWidth = graphic.textWidth(dataText);
         graphic.drawText(dataText, textLeft + 250 - textWidth, textTop + 150, '#FFEE78');
      }
      graphic._handle.globalAlpha = 1;
   }
   MO.FGuiHistoryMilestoneFrame_show = function FGuiHistoryMilestoneFrame_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
      var inves = o.data().investmentTotal();
      if (inves == 1000000) {
         o._100yiSE.play(0);
      }
      o._popupSE.play(0);
   }
   MO.FGuiHistoryMilestoneFrame_dispose = function FGuiHistoryMilestoneFrame_dispose() {
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FGuiHistoryTimeline = function FGuiHistoryTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiTimeline);
   o._startHeight     = 30;
   o._lineWidth       = 5;
   o._circleRadius    = 5;
   o._timeFontColor   = '#00B5F6';
   o._cursorFontColor = '#59FDE9';
   o.onPaintBegin     = MO.FGuiHistoryTimeline_onPaintBegin;
   return o;
}
MO.FGuiHistoryTimeline_onPaintBegin = function FGuiHistoryTimeline_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiTimeline.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.bottom();
   var dataTop = top + 30 + o._startHeight;
   var dataBottom = bottom - 50;
   var dataHeight = dataBottom - dataTop;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   var dataLeft = rectangle.left + 5 + decoLineMargin + o.decoLineWidth();
   var dataRight = rectangle.left + rectangle.width - 5 - decoLineMargin - o.decoLineWidth();
   var startDate = o.startTime();
   var endDate = o.endTime();
   var degreeDate = o.degreeTime();
   var bakTime = startDate.date.getTime();
   var timeSpan = endDate.date.getTime() - startDate.date.getTime();
   var historyModule = MO.Console.find(MO.FEaiResourceConsole).historyModule();
   var investmentTotal = historyModule.investmentTotal();
   var dateData = historyModule.dates().get(endDate.format('YYYYMMDD'));
   var maxInves = dateData.investmentTotal();
   var degreeData = historyModule.dates().get(degreeDate.format('YYYYMMDD'));
   if (degreeData.investmentTotal() * 3 < investmentTotal) {
      maxInves *= (degreeData.investmentTotal() / investmentTotal) * 3;
   }
   var pixPer10k = dataHeight * 10000 / maxInves;
   var rateModule = MO.Console.find(MO.FEaiResourceConsole).rateModule();
   var rateResource = rateModule.find(MO.EEaiRate.Line);
   var ctx = graphic._handle;
   ctx.lineCap = 'round';
   ctx.beginPath();
   ctx.moveTo(lastX, lastY);
   var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
   var inves = dateData.investmentTotal();
   var lastX = dataLeft;
   var lastY = dataBottom - inves / 10000 * pixPer10k;
   lastY -= o._startHeight;
   while (startDate.isBefore(degreeDate)) {
      var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var dayInvestmentTotal = dateData.investmentTotal();
         var y = dataBottom - dayInvestmentTotal / 10000 * pixPer10k;
         y -= o._startHeight;
         ctx.lineTo(x, y);
         lastX = x;
         lastY = y;
         startDate.addDay(1);
      }else{
         break;
      }
   }
   var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
   if (dateData) {
      var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
      var inves = dateData.investmentTotal();
      var y = dataBottom - inves / 10000 * pixPer10k;
      y -= o._startHeight;
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(inves / investmentTotal));
      var color = '#' + hexColor.substring(2);
      var opColor = MO.GuiColor.makeRgbString(hexColor, 0.3);
      ctx.lineTo(x, lastY + (y - lastY) * o.progress());
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
   ctx.lineWidth = o._lineWidth;
   ctx.stroke();
   ctx.lineTo(x, dataBottom);
   ctx.lineTo(dataLeft, dataBottom);
   ctx.lineTo(dataLeft, lastY);
   ctx.fill();
   startDate.date.setTime(bakTime);
   startDate.refresh();
   while (startDate.isBefore(degreeDate)) {
      var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var dayInvestmentTotal = dateData.investmentTotal();
         var y = dataBottom - dayInvestmentTotal / 10000 * pixPer10k;
         y -= o._startHeight;
         var hexColor = MO.Lang.Hex.format(rateResource.findRate(dayInvestmentTotal / investmentTotal));
         var color = '#' + hexColor.substring(2);
         if (startDate.date.getDate() == 1) {
            graphic.drawCircle(x, y, o._circleRadius, 0, color, color);
            graphic.setFont('bold 22px Microsoft YaHei');
            if (dayInvestmentTotal > 100000000) {
               var text = MO.Lang.Float.unitFormat(dayInvestmentTotal, 0, 0, 2, 0, 100000000, '亿');
               var textWidth = graphic.textWidth(text);
               graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
            } else {
               var text = parseInt(dayInvestmentTotal / 10000) + '万';
               var textWidth = graphic.textWidth(text);
               graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
            }
         }
         lastX = x;
         lastY = y;
         startDate.addDay(1);
      } else {
         break;
      }
   }
   var dateData = historyModule.dates().get(startDate.format('YYYYMMDD'));
   if (dateData) {
      var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
      var inves = dateData.investmentTotal();
      var y = dataBottom - inves / 10000 * pixPer10k;
      y -= o._startHeight;
      var hexColor = MO.Lang.Hex.format(rateResource.findRate(inves / investmentTotal));
      var color = '#' + hexColor.substring(2);
      graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), o._circleRadius, 0, color, color);
      graphic.setFont('bold 22px Microsoft YaHei');
      if (inves > 100000000) {
         var text = MO.Lang.Float.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
         var textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
      } else {
         var text = parseInt(inves / 10000) + '万';
         var textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
      }
   }
   startDate.date.setTime(bakTime);
   startDate.refresh();
}
MO.FGuiLivePop = function FGuiLivePop(o) {
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
   o.construct      = MO.FGuiLivePop_construct;
   o.setup          = MO.FGuiLivePop_setup;
   o.onPaintBegin   = MO.FGuiLivePop_onPaintBegin;
   o.onImageLoad    = MO.FGuiLivePop_onImageLoad;
   o.show           = MO.FGuiLivePop_show;
   o.dispose        = MO.FGuiLivePop_dispose;
   return o;
}
MO.FGuiLivePop_construct = function FGuiLivePop_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._date = new MO.TDate();
}
MO.FGuiLivePop_setup = function FGuiLivePop_setup() {
   var o = this;
   o.setWidth(o._fullWidth);
   o.setHeight(o._fullHeight);
   o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 3);
   o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight);
   o._bgImage = MO.Class.create(MO.FImage);
   o._bgImage.addLoadListener(o, o.onImageLoad);
   o._bgImage.loadUrl('{eai.resource}/invespop.png');
}
MO.FGuiLivePop_onImageLoad = function FGuiLivePop_onImageLoad() {
   this.dirty();
}
MO.FGuiLivePop_onPaintBegin = function FGuiLivePop_onPaintBegin(event) {
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
MO.FGuiLivePop_show = function FGuiLivePop_show() {
   o = this;
   o.setVisible(true);
   o._startTick = MO.Timer.current();
   o.dirty();
}
MO.FGuiLivePop_dispose = function FGuiLivePop_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   o.__base.FGuiControl.dispose.call(o);
}
MO.FGuiLiveTable = function FGuiLiveTable(o) {
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
   o.onImageLoad           = MO.FGuiLiveTable_onImageLoad;
   o.onPaintBegin          = MO.FGuiLiveTable_onPaintBegin;
   o.oeUpdate              = MO.FGuiLiveTable_oeUpdate;
   o.construct             = MO.FGuiLiveTable_construct;
   o.setup                 = MO.FGuiLiveTable_setup;
   o.pushEntity            = MO.FGuiLiveTable_pushEntity;
   o.drawRow               = MO.FGuiLiveTable_drawRow;
   o.dispose               = MO.FGuiLiveTable_dispose;
   return o;
}
MO.FGuiLiveTable_onImageLoad = function FGuiLiveTable_onImageLoad() {
   this.dirty();
}
MO.FGuiLiveTable_onPaintBegin = function FGuiLiveTable_onPaintBegin(event) {
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
MO.FGuiLiveTable_oeUpdate = function FGuiLiveTable_oeUpdate(event){
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   if(event.isBefore()){
      if(o._lineScroll < 0){
         o._lineScroll++;
         if(o._lineScroll == 0){
            var entities = o._entities;
            if(entities.count() > o._tableCount){
               entities.pop();
            }
         }
         o.dirty();
      }
   }
}
MO.FGuiLiveTable_construct = function FGuiLiveTable_construct() {
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
MO.FGuiLiveTable_setup = function FGuiLiveTable_setup() {
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
MO.FGuiLiveTable_pushEntity = function FGuiLiveTable_pushEntity(entity){
   var o = this;
   if(!entity){
      return null;
   }
   var entities = o._entities;
   entities.unshift(entity);
   o._lineScroll -= o._rowHeight;
   if(entities.count() >= o._tableCount){
      entities.pop();
   }
}
MO.FGuiLiveTable_drawRow = function FGuiLiveTable_drawRow(graphic, entity, flag, index, x, y, width){
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
MO.FGuiLiveTable_dispose = function FGuiLiveTable_dispose(){
   var o = this;
   o._entities = MO.Lang.Object.dispose(o._entities);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   o.__base.FEaiEntity.dispose.call(o);
}
