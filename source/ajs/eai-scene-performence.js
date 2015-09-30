MO.FEaiChartPerfMarketerChart = function FEaiChartPerfMarketerChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._backgroundImage      = null;
   o._dayImage             = null;
   o._monthImage           = null;
   o._cumulativeImage      = null;
   o.__chartBackgroundImage= null;
   o._rankLinePadding      = null;
   o._backgroundPadding    = null;
   o._logoPadding          = null;
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._monthStart = MO.Class.register(o, new MO.AGetSet('_monthStart'));
   o._monthEnd = MO.Class.register(o, new MO.AGetSet('_monthEnd'));
   o._yearStart = MO.Class.register(o, new MO.AGetSet('_yearStart'));
   o._yearEnd = MO.Class.register(o, new MO.AGetSet('_yearEnd'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._ready = false;
   o._investmentTotal = 0;
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.setup  = MO.FEaiChartPerfMarketerChart_setup;
   o.onImageLoad           = MO.FEaiChartPerfMarketerChart_onImageLoad;
   o.oeUpdate = MO.FEaiChartPerfMarketerChart_oeUpdate;
   o.construct = MO.FEaiChartPerfMarketerChart_construct;
   o.sync = MO.FEaiChartPerfMarketerChart_sync;
   o.drawTrend = MO.FEaiChartPerfMarketerChart_drawTrend;
   o.onPaintBegin = MO.FEaiChartPerfMarketerChart_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartPerfMarketerChart_on24HDataFetch;
   o.onCalculate = MO.FEaiChartPerfMarketerChart_onCalculate;
   return o;
}
MO.FEaiChartPerfMarketerChart_construct = function FEaiChartPerfMarketerChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._logoPadding = new MO.SPadding(0, 0, 0, 0);
   o._monthStart = new MO.TDate();
   o._monthEnd = new MO.TDate();
   o._yearStart = new MO.TDate();
   o._yearEnd = new MO.TDate();
}
MO.FEaiChartPerfMarketerChart_onImageLoad = function FEaiChartPerfMarketerChart_onImageLoad(){
   this.dirty();
}
MO.FEaiChartPerfMarketerChart_setup = function FEaiChartPerfMarketerChart_setup(){
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/performence_marketer/bg2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._chartBackgroundImage = imageConsole.load('{eai.resource}/performence_marketer/right.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._dayImage = imageConsole.load('{eai.resource}/performence_marketer/3.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._monthImage = imageConsole.load('{eai.resource}/performence_marketer/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._cumulativeImage = imageConsole.load('{eai.resource}/performence_marketer/1.png');
   image.addLoadListener(o, o.onImageLoad);
}
MO.FEaiChartPerfMarketerChart_oeUpdate = function FEaiChartPerfMarketerChart_oeUpdate(event) {
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
MO.FEaiChartPerfMarketerChart_drawTrend = function FEaiChartPerfMarketerChart_drawTrend(graphic, times, units, proportion, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount,  bottomColors, topColors, roundHeartColor, roundEdgeColor) {
   var o = this;
   var count = units.count();
   var unitFirst = units.first();
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;
   times.parseAuto(unitFirst.recordDate());
   times.refresh();
   bakTime = times.date.getTime();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var value = unit[propertyName];
      times.parseAuto(unit.recordDate());
      times.refresh();
      var degreeSpan = times.date.getTime() - bakTime;
       var x = dataLeft + (dataRight - dataLeft)  * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var bottomColor = '#' + hexColor.substring(2);
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   var topColor = '#' + hexColor.substring(2);
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColors);
   gradient.addColorStop('1', topColors);
   handle.strokeStyle = gradient;
   handle.lineWidth = 2;
   handle.stroke();
   for (var j = 0; j < count; j++) {
      var unit = units.get(j);
      var value = unit[propertyName];
      times.parseAuto(unit.recordDate());
      times.refresh();
      var degreeSpans = times.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft)  * (degreeSpans / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
     graphic.drawCircle(x, y,5,2,roundEdgeColor ,roundHeartColor);
   }
}
MO.FEaiChartPerfMarketerChart_onCalculate = function FEaiChartPerfMarketerChart_onCalculate(){
}
MO.FEaiChartPerfMarketerChart_onPaintBegin = function FEaiChartPerfMarketerChart_onPaintBegin(event) {
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
   var left = rectangle.left;
   var width = rectangle.width;
   var height = rectangle.height;
   var decoLeft = rectangle.left + 433;
   var decoRight = rectangle.left + rectangle.width -20;
   var curveW = width - decoLeft;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._logoPadding);
   var imgL = left+20;
   var paddingT = 41;
   var imgH = (height-(paddingT*4)) / 3;
   graphic.drawGridImage(o._dayImage, imgL, top+paddingT, 82, imgH, o._logoPadding);
   graphic.drawGridImage(o._dayImage, imgL, top+41, 82, imgH, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, decoLeft, top+41, curveW, imgH, o._logoPadding);
   graphic.drawGridImage(o._monthImage, imgL, top + imgH + paddingT*2, 82, imgH, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, decoLeft, top + imgH + paddingT*2, curveW, imgH, o._logoPadding);
   graphic.drawGridImage(o._cumulativeImage, imgL, top+(imgH*2)+(paddingT*3), 82, imgH, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, decoLeft, top+(imgH*2)+(paddingT*3), curveW, imgH, o._logoPadding);
   var dataLeft = decoLeft + o.decoLineWidth();
   var dataRight = decoRight - o.decoLineWidth();
   var dataTop = top + 41;
   var dataBottom = dataTop + imgH-75;
   var dataHeight = 155;
   var startTime = o.startTime();
   var endTime = o.endTime();
   var hour = 24;
   var proportion = endTime.hour / hour;
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   var title = 38;
   var dayHour = dataTop+imgH -15;
   graphic.setFont('20px Microsoft YaHei');
   var span = startTime.date.getTime() - bakTime;
   var x = ( dataRight - dataLeft ) / hour;
   for(var i = 0; i <= hour; i++){
      text = i;
      if( i != 0){
         text = i < 10 ? '0' + i : i;
      }
      text += "h";
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, dataLeft + (x * i) - (textWidth / 2), dayHour, '#eeb92f');
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();
   var trendInfo = o._trendInfo;
   if( trendInfo == null ){
      return;
   }
   var units = trendInfo._day._ticks;
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
   o.drawTrend(graphic, startTime, units, proportion, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, 1000*60*60*24, maxAmount, '#fb2509', '#fb2509',"#fff",'#fb2509');
   o.drawTrend(graphic, startTime, units, proportion, '_redemption', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, 1000 * 60 * 60 * 24, maxAmount, '#457eff', '#457eff', "#fff", '#457eff');
   o.drawTrend(graphic, startTime, units, proportion, '_netinvestment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, 1000 * 60 * 60 * 24, maxAmount, '#02fb49', '#02fb49', "#fff", '#02fb49');
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
   var monthStart = o.monthStart();
   var monthEnd = o.monthEnd();
   var monthDay = monthStart.day;
   var monthProportion = monthEnd.day/monthDay;
   var timeSpan = monthEnd.date.getTime() - monthStart.date.getTime();
   var endTimeS = monthStart.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   graphic.setFont('20px Microsoft YaHei');
   var day = monthDay;
   var x = (dataRight - dataLeft ) / (monthDay -1);
   for(var i = 1; i <= day; i++){
      text = i;
      if( i != 0 ){
         text = i < 10 ? '0' + i : i;
         textWidth = graphic.textWidth(i);
      }
      graphic.drawText(text, dataLeft + (x * (i - 1)) - (textWidth / 2), dayHour + imgH + title, '#eeb92f');
   }
   var units = trendInfo._month._ticks;
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
   var yH = 280;
   var monthDataTop = dataTop + yH;
   var monthdataBottom = dataBottom+yH;
   o.drawTrend(graphic, monthStart, units, monthProportion, '_redemption', dataLeft, monthDataTop, dataRight, monthdataBottom, dataHeight, endTimeS, 1000 * 60 * 60 * 24 * (monthDay - 1), maxAmount, '#457eff', '#457eff', "#fff", '#457eff');
   o.drawTrend(graphic, monthStart, units, monthProportion, '_investment', dataLeft, monthDataTop, dataRight, monthdataBottom, dataHeight, endTimeS, 1000 * 60 * 60 * 24 * (monthDay - 1), maxAmount, '#fb2509', '#fb2509', "#fff", '#fb2509');
   o.drawTrend(graphic, monthStart, units, monthProportion, '_netinvestment', dataLeft, monthDataTop, dataRight, monthdataBottom, dataHeight, endTimeS, 1000 * 60 * 60 * 24 * (monthDay - 1), maxAmount, '#02fb49', '#02fb49', "#fff", '#02fb49');
   var lastday = -1;
   var dayInves = 0;
   var maxdayInves = 0;
   monthStart.parseAuto(unitFirst.recordDate());
   monthStart.refresh();
   lastday = monthStart.date.getDay();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      monthStart.parseAuto(unit.recordDate());
      monthStart.refresh();
      var day = monthStart.date.getDay();
      if (lastday == day) {
         dayInves += unit.investment();
      } else {
         if (dayInves > maxdayInves) {
            maxdayInves = dayInves;
            dayInves = 0;
         }
         lastday = day;
      }
   }
   var yearStart = o.yearStart();
   var yearEnd = o.yearEnd();
   var yearMonth = yearStart.month;
   var yearProportion = yearEnd.month / yearMonth;
   var timeSpan = yearEnd.date.getTime() - yearStart.date.getTime();
   var endTimeA = yearStart.date.getTime();
   var texts;
   var drawText = false;
   var textWidth = 0;
   graphic.setFont('20px Microsoft YaHei');
   var year = yearMonth;
   yearStart.date.setTime(endTimeA);
   yearStart.refresh();
   var x = (dataRight - dataLeft) / 12;
   for(var i = 1; i <= 12 ; i++){
      texts = i < 10 ? '0' + i : i;
      textWidth = graphic.textWidth(texts);
      yearStart.addMonth(1);
      graphic.drawText(texts, dataLeft + (x * (i - 1) - (textWidth / 2)), dayHour + (imgH + title + 1) * 2, '#eeb92f');
   }
   yearStart.date.setTime(endTimeA);
   yearStart.refresh();
   var year = o._trendInfo._year._ticks;
   if (!year) {
      return;
   }
   if (year.isEmpty()) {
      return;
   }
   var unitFirst = year.first();
   var maxAmount = 0;
   var count = year.count();
   for (var i = 0; i < count; i++) {
      var unit = year.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
   var lastMonth = -1;
   var MonthInves = 0;
   var maxMonthInves = 0;
   yearStart.parseAuto(unitFirst.recordDate());
   yearStart.refresh();
   lastMonth = yearStart.date.getMonth();
   for (var i = 0; i < count; i++) {
      var unit = year.get(i);
      yearStart.parseAuto(unit.recordDate());
      yearStart.refresh();
      var Month = yearStart.date.getMonth();
      if (lastMonth == Month) {
        MonthInves += unit.investment();
      } else {
         if (MonthInves > maxMonthInves) {
            maxMonthInves = MonthInves;
            MonthInves = 0;
         }
         lastMonth = Month;
      }
   }
   yH = yH * 2 ;
   var yearDataTop = dataTop + yH;
   var yeardataBottom = dataBottom +yH;
   o.drawTrend(graphic, yearStart, year, yearProportion, '_redemption', dataLeft, yearDataTop, dataRight, yeardataBottom, dataHeight, endTimeA, timeSpan, maxAmount,'#457eff', '#457eff',"#fff","#457eff");
   o.drawTrend(graphic, yearStart, year, yearProportion, '_investment', dataLeft, yearDataTop, dataRight, yeardataBottom, dataHeight, endTimeA, timeSpan, maxAmount, '#fb2509', '#fb2509',"#fff","#fb2509");
   o.drawTrend(graphic, yearStart, year, yearProportion, '_netinvestment', dataLeft, yearDataTop, dataRight, yeardataBottom, dataHeight, endTimeA, timeSpan, maxAmount, '#02fb49', '#02fb49',"#fff","#02fb49");
   yearStart.date.setTime(endTimeA);
   yearStart.refresh();
   monthStart.date.setTime(endTimeS);
   monthStart.refresh();
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
MO.FEaiChartPerfMarketerHead = function FEaiChartPerfMarketerHead(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._logoimg              = null;
   o._backgroundImage      = null;
   o._titleImage           = null;
   o._rankLinePadding      = null;
   o._backgroundPadding    = null;
   o._logoPadding          = null;
   o.onImageLoad           = MO.FEaiChartPerfMarketerHead_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartPerfMarketerHead_onPaintBegin;
   o.construct             = MO.FEaiChartPerfMarketerHead_construct;
   o.setup                 = MO.FEaiChartPerfMarketerHead_setup;
   o.dispose               = MO.FEaiChartPerfMarketerHead_dispose;
   return o;
}
MO.FEaiChartPerfMarketerHead_setup = function FEaiChartPerfMarketerHead_setup(){
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._logoimg = imageConsole.load('{eai.resource}/performence_marketer/logo.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._titleImage = imageConsole.load('{eai.resource}/performence_marketer/telte.png');
   image.addLoadListener(o, o.onImageLoad);
}
MO.FEaiChartPerfMarketerHead_construct = function FEaiChartPerfMarketerHead_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(0, 0, 0, 0);
   o._logoPadding = new MO.SPadding(0, 0, 0, 0);
}
MO.FEaiChartPerfMarketerHead_onImageLoad = function FEaiChartPerfMarketerHead_onImageLoad(){
   this.dirty();
}
MO.FEaiChartPerfMarketerHead_onPaintBegin = function FEaiChartPerfMarketerHead_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawGridImage(o._logoimg, left, top, 202, 176, o._logoPadding);
   var titleL =  width / 2 - 728 / 2;
   graphic.drawGridImage(o._titleImage, titleL, 70, 728, 67, o._logoPadding);
   graphic.setFont('bold 24px Microsoft YaHei');
   graphic.drawCircle(width-565 , 176, 10, 0,"#fb2509","#fb2509");
   graphic.drawText("投资", width-550 , 184, "#fb2509");
   graphic.drawCircle(width-435 , 176, 10, 0,"#457eff","#457eff");
   graphic.drawText("赎回", width-420 , 184, "#457eff");
   graphic.drawCircle(width-305 , 176, 10, 0,"#02fb49","#02fb49");
   graphic.drawText("净投", width-290 , 184, "#02fb49");
}
MO.FEaiChartPerfMarketerHead_dispose = function FEaiChartPerfMarketerHead_dispose(){
   var o = this;
}
MO.FEaiChartPerfMarketerInfo = function FEaiChartPerfMarketerInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._day   = MO.Class.register(o, [new MO.AGetter('_day'), new MO.APersistence('_day', MO.EDataType.Object, MO.FEaiChartPerfMarketerInfoSpan)]);
   o._month = MO.Class.register(o, [new MO.AGetter('_month'), new MO.APersistence('_month', MO.EDataType.Object, MO.FEaiChartPerfMarketerInfoSpan)]);
   o._year  = MO.Class.register(o, [new MO.AGetter('_year'), new MO.APersistence('_year', MO.EDataType.Object, MO.FEaiChartPerfMarketerInfoSpan)]);
   return o;
}
MO.FEaiChartPerfMarketerInfoSpan = function FEaiChartPerfMarketerInfoSpan(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._investment       = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption       = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment    = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   o._memberRegister   = MO.Class.register(o, [new MO.AGetter('_memberRegister'), new MO.APersistence('_memberRegister', MO.EDataType.Uint32)]);
   o._customerRegister = MO.Class.register(o, [new MO.AGetter('_customerRegister'), new MO.APersistence('_customerRegister', MO.EDataType.Uint32)]);
   o._ticks            = MO.Class.register(o, [new MO.AGetter('_ticks'), new MO.APersistence('_ticks', MO.EDataType.Objects, MO.FEaiChartPerfMarketerInfoTick)]);
   return o;
}
MO.FEaiChartPerfMarketerInfoTick = function FEaiChartPerfMarketerInfoTick(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._recordDate    = MO.Class.register(o, [new MO.AGetter('_recordDate'), new MO.APersistence('_recordDate', MO.EDataType.String)]);
   o._investment    = MO.Class.register(o, [new MO.AGetter('_investment'), new MO.APersistence('_investment', MO.EDataType.Double)]);
   o._redemption    = MO.Class.register(o, [new MO.AGetter('_redemption'), new MO.APersistence('_redemption', MO.EDataType.Double)]);
   o._netinvestment = MO.Class.register(o, [new MO.AGetter('_netinvestment'), new MO.APersistence('_netinvestment', MO.EDataType.Double)]);
   return o;
}
MO.FEaiChartPerfMarketerProcessor = function FEaiChartPerfMarketerProcessor(o){
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
   o._performanceDate         = MO.Class.register(o, new MO.AGetter('_performanceDate'));
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
   o._eventPerformanceDateChanged = null;
   o._listenersPerformanceDateChanged = MO.Class.register(o, new MO.AListener('_listenersPerformanceDateChanged','PerformanceDataChanged'));
   o.onDynamicData            = MO.FEaiChartPerfMarketerProcessor_onDynamicData;
   o.on24HDataFetch           = MO.FEaiChartPerfMarketerProcessor_on24HDataFetch;
   o.onPerformanceDate        = MO.FEaiChartPerfMarketerProcessor_onPerformanceDate;
   o.construct                = MO.FEaiChartPerfMarketerProcessor_construct;
   o.allocUnit                = MO.FEaiChartPerfMarketerProcessor_allocUnit;
   o.allocShape               = MO.FEaiChartPerfMarketerProcessor_allocShape;
   o.setup                    = MO.FEaiChartPerfMarketerProcessor_setup;
   o.calculateCurrent         = MO.FEaiChartPerfMarketerProcessor_calculateCurrent;
   o.focusEntity              = MO.FEaiChartPerfMarketerProcessor_focusEntity;
   o.process                  = MO.FEaiChartPerfMarketerProcessor_process;
   o.dispose                  = MO.FEaiChartPerfMarketerProcessor_dispose;
   o._eventDayDataChanged     = null;
   o._monthStartTime          = MO.Class.register(o, new MO.AGetter('_monthStartTime'));
   o._monthEndTime            = MO.Class.register(o, new MO.AGetter('_monthEndTime'));
   o._yearStartTime          = MO.Class.register(o, new MO.AGetter('_yearStartTime'));
   o._yearEndTime            = MO.Class.register(o, new MO.AGetter('_yearEndTime'));
   return o;
}
MO.FEaiChartPerfMarketerProcessor_onPerformanceDate = function FEaiChartPerfMarketerProcessor_onPerformanceDate(event){
   var o = this;
   var performanceDate = o._performanceDate;
   var dayData =  o._eventDayDataChanged;
   performanceDate.beginDate = o._24HBeginDate;
   performanceDate.endDate = o._24HEndDate;
   performanceDate.unserializeSignBuffer(event.sign, event.content, true);
   performanceDate.monthStarDate = o._monthStartTime;
   performanceDate.monthEndDate = o._monthEndTime;
   performanceDate.yearStarDate = o._yearStartTime;
   performanceDate.yearEndDate = o._yearEndTime;
   o.processPerformanceDataChangedListener(performanceDate);
}
MO.FEaiChartPerfMarketerProcessor_on24HDataFetch = function FEaiChartPerfMarketerProcessor_on24HDataFetch(event) {
   var o = this;
   event.beginDate = o._24HBeginDate;
   event.endDate = o._24HEndDate;
   o.process24HDataChangedListener(event);
}
MO.FEaiChartPerfMarketerProcessor_onDynamicData = function FEaiChartPerfMarketerProcessor_onDynamicData(event){
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
MO.FEaiChartPerfMarketerProcessor_construct = function FEaiChartPerfMarketerProcessor_construct(){
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
   o._performanceDate = MO.Class.create(MO.FEaiChartPerfMarketerInfo);
   o._dynamicInfo = MO.Class.create(MO.FEaiLogicInfoCustomerDynamic);
   o._rankUnits = new MO.TObjects();
   o._unitPool = MO.Class.create(MO.FObjectPool);
   o._eventDataChanged = new MO.SEvent(o);
   o._event24HDataChanged = new MO.SEvent(o);
   o._listenersPerformanceDateChanged =  new MO.SEvent(o);
   o._monthStartTime = new MO.TDate();
   o._monthEndTime = new MO.TDate();
   o._yearStartTime = new MO.TDate();
   o._yearEndTime  = new MO.TDate();
}
MO.FEaiChartPerfMarketerProcessor_allocUnit = function FEaiChartPerfMarketerProcessor_allocUnit(){
   var o = this;
   var unit = o._unitPool.alloc();
   if(!unit){
      unit = MO.Class.create(MO.FEaiChartMktCustomerDynamicUnit);
   }
   return unit;
}
MO.FEaiChartPerfMarketerProcessor_setup = function FEaiChartPerfMarketerProcessor_setup(){
   var o = this;
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   for(var i = 1; i <= 5; i++){
      o._autios[i] = audioConsole.load('{eai.resource}/currency/' + i + '.mp3');
   }
   var display = o._display = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
}
MO.FEaiChartPerfMarketerProcessor_calculateCurrent = function FEaiChartPerfMarketerProcessor_calculateCurrent(){
   var o = this;
   var info = o._performanceDate;
   var year = info._year;
   var month = info._month;
   var day = info._day;
      if( year && month && day ){
         var dayInvestment = day.investment();
         var dayNetinvestment = day.netinvestment();
         var dayRedemption = day.redemption();
         var dayCustomerRegister = day.customerRegister();
         var dayMemberRegister = day.memberRegister();
         var monthInvestment = month.investment();
         var monthNetinvestment = month.netinvestment();
         var monthRedemption = month.redemption();
         var monthCustomerRegister = month.customerRegister();
         var monthMemberRegister = month.memberRegister();
         var yearInvestment = year.investment();
         var yearNetinvestment = year.netinvestment();
         var yearRedemption = year.redemption();
         var yearCustomerRegister = year.customerRegister();
         var yearhMemberRegister = year.memberRegister();
         var units = o._units;
         var count = units.count();
         console.log(count+"...............................");
         for(var i = 0; i < count; i++){
            var unit = units.at(i);
            var actionCd = unit.customerActionCd();
            var amount = unit.customerActionAmount();
            var interest = unit.customerActionInterest();
         }
         o._dayInvestment = dayInvestment;
         o._dayNetinvestment = dayNetinvestment;
         o._dayRedemption = dayRedemption;
         o._dayCustomerRegister = dayCustomerRegister;
         o._dayMemberRegister = dayMemberRegister;
         o._monthInvestment = monthInvestment;
         o._monthNetinvestment = monthNetinvestment;
         o._monthRedemption = monthRedemption;
         o._monthCustomerRegister = monthCustomerRegister;
         o._monthMemberRegister = monthMemberRegister;
         o._yearInvestment = yearInvestment;
         o._yearNetinvestment = yearNetinvestment;
         o._yearRedemption = yearRedemption;
         o._yearCustomerRegister = yearCustomerRegister;
         o._yearhMemberRegister = yearhMemberRegister;
      }
}
MO.FEaiChartPerfMarketerProcessor_focusEntity = function FEaiChartPerfMarketerProcessor_focusEntity(unit){
   var o = this;
   var mapEntity = o._mapEntity;
   var card = unit.card();
   var cityEntity = MO.Console.find(MO.FEaiEntityConsole).cityModule().findByCard(card);
   if(cityEntity){
      var investment = unit.investment();
      var level = MO.Console.find(MO.FEaiLogicConsole).statistics().calculateAmountLevel(investment);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = MO.Console.find(MO.FEaiEntityConsole).provinceModule().findByCode(provinceCode);
      if(provinceEntity){
         provinceEntity.doInvestment(level, investment);
      }
      cityEntity.addInvestmentTotal(level, investment);
      o._mapEntity.upload();
      var autio = o._autios[level];
      if(autio){
         autio.play(0);
      }
   }
   var changedEvent = o._eventDataChanged;
   changedEvent.rankUnits = o._rankUnits;
   changedEvent.unit = unit;
   o.processDataChangedListener(changedEvent);
}
MO.FEaiChartPerfMarketerProcessor_process = function FEaiChartPerfMarketerProcessor_process(){
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
      beginDate.assign(endDate);
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncHour();
      beginDate24H.addHour(-systemDate.hour);
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      var beginDate30D = o._monthStartTime;
      beginDate30D.assign(systemDate);
      beginDate30D.addDay(-systemDate.day);
      var  endDate30D = o._monthEndTime;
      endDate30D.assign(systemDate);
      var beginDate12Y = o._yearStartTime;
      beginDate12Y.assign(systemDate);
      beginDate12Y.truncDay();
      beginDate12Y.setDay(1);
      beginDate12Y.setMonth(1);
      beginDate12Y.refresh();
      var  endDate12Y = o._yearEndTime;
      endDate12Y.assign(beginDate12Y);
      endDate12Y.addYear(1);
      statistics.achievement().doDynamic(o, o.onPerformanceDate, beginDate24H.format(), endDate.format(), beginDate30D.format(), endDate30D.format(), beginDate12Y.format(), endDate12Y.format());
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
   o._mapEntity.process();
   var dynamicInfo = MO.Desktop.application().dynamicInfo();
   dynamicInfo._investmentEntityCount = o._units.count();
   dynamicInfo._investmentPoolItemCount = o._unitPool.items().count();
   dynamicInfo._investmentPoolFreeCount = o._unitPool.frees().count();
}
MO.FEaiChartPerfMarketerProcessor_dispose = function FEaiChartPerfMarketerProcessor_dispose(){
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   o._eventDataChanged = MO.Lang.Object.dispose(o._eventDataChanged);
   o._eventDayDataChanged = MO.Lang.Object.dispose(o._eventDayDataChanged);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiChartPerfMarketerScene = function FEaiChartPerfMarketerScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartCustomer;
   o._optionMapCountry       = false;
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._logoBar                = null;
   o._timeline               = null;
   o._head                   = null;
   o._charts                 = null;
   o._calculate              = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o.on24HDataChanged        = MO.FEaiChartPerfMarketerScene_on24HDataChanged;
   o.onProcessReady          = MO.FEaiChartPerfMarketerScene_onProcessReady;
   o.onProcess               = MO.FEaiChartPerfMarketerScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartPerfMarketerScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartPerfMarketerScene_onSwitchComplete;
   o.setup                   = MO.FEaiChartPerfMarketerScene_setup;
   o.showFace                = MO.FEaiChartPerfMarketerScene_showFace;
   o.fixMatrix               = MO.FEaiChartPerfMarketerScene_fixMatrix;
   o.processResize           = MO.FEaiChartPerfMarketerScene_processResize;
   o.onPerformanceDataChangedListener = MO.FEaiChartPerfMarketerScene_onPerformanceDataChangedListener;
   return o;
}
MO.FEaiChartPerfMarketerScene_onPerformanceDataChangedListener = function FEaiChartPerfMarketerScene_onPerformanceDataChangedListener(event){
   var o = this;
   var charts = o._charts;
   charts.setStartTime(event.beginDate);
   charts.setEndTime(event.endDate);
   charts.setMonthStart(event.monthStarDate);
   charts.setMonthEnd(event.monthEndDate);
   charts.setYearStart(event.yearStarDate);
   charts.setYearEnd(event.yearEndDate);
   charts.setTrendInfo(event);
   charts.dirty();
}
MO.FEaiChartPerfMarketerScene_on24HDataChanged = function FEaiChartPerfMarketerScene_on24HDataChanged(event) {
   var o = this;
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   timeline.dirty();
}
MO.FEaiChartPerfMarketerScene_onProcessReady = function FEaiChartPerfMarketerScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showCity();
}
MO.FEaiChartPerfMarketerScene_onProcess = function FEaiChartPerfMarketerScene_onProcess() {
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
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      o._processor.process();
      var logoBar = o._logoBar;
      var processor = o._processor;
      if(processor._yearInvestment > 0){
         var dayInvestment = logoBar.findComponent('dayInvestment');
         dayInvestment.setValue(parseInt(processor._dayInvestment).toString());
         var dayNetinvestment = logoBar.findComponent('dayNetinvestment');
         dayNetinvestment.setValue(parseInt(processor._dayNetinvestment).toString());
         var dayRedemption = logoBar.findComponent('dayRedemption');
         dayRedemption.setValue(parseInt(processor._dayRedemption).toString());
         var dayCustomerRegister = logoBar.findComponent('dayCustomerRegister');
         dayCustomerRegister.setValue(parseInt(processor._dayCustomerRegister).toString());
         var dayMemberRegister = logoBar.findComponent('dayMemberRegister');
         dayMemberRegister.setValue(parseInt(processor._dayMemberRegister).toString());
         var monthInvestment = logoBar.findComponent('monthInvestment');
         monthInvestment.setValue(parseInt(processor._monthInvestment).toString());
         var monthNetinvestment = logoBar.findComponent('monthNetinvestment');
         monthNetinvestment.setValue(parseInt(processor._monthNetinvestment).toString());
         var monthRedemption = logoBar.findComponent('monthRedemption');
         monthRedemption.setValue(parseInt(processor._monthRedemption).toString());
         var monthCustomerRegister = logoBar.findComponent('monthCustomerRegister');
         monthCustomerRegister.setValue(parseInt(processor._monthCustomerRegister).toString());
         var monthMemberRegister = logoBar.findComponent('monthMemberRegister');
         monthMemberRegister.setValue(parseInt(processor._monthMemberRegister).toString());
         var yearInvestment = logoBar.findComponent('yearInvestment');
         yearInvestment.setValue(parseInt(processor._yearInvestment).toString());
         var yearNetinvestment = logoBar.findComponent('yearNetinvestment');
         yearNetinvestment.setValue(parseInt(processor._yearNetinvestment).toString());
         var yearRedemption = logoBar.findComponent('yearRedemption');
         yearRedemption.setValue(parseInt(processor._yearRedemption).toString());
         var yearCustomerRegister = logoBar.findComponent('yearCustomerRegister');
         yearCustomerRegister.setValue(parseInt(processor._yearCustomerRegister).toString());
         var yearhMemberRegister = logoBar.findComponent('yearhMemberRegister');
         yearhMemberRegister.setValue(parseInt(processor._yearhMemberRegister).toString());
      }
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
      }
   }
}
MO.FEaiChartPerfMarketerScene_onSwitchProcess = function FEaiChartPerfMarketerScene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartPerfMarketerScene_onSwitchComplete = function FEaiChartPerfMarketerScene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartPerfMarketerScene_setup = function FEaiChartPerfMarketerScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.performence-marketer.LogoBar');
   frame.setDisplayOrder(10);
   var dayCustomerRegister = frame.findComponent('dayCustomerRegister');
   dayCustomerRegister.setBasicUnitText('人');
   var dayMemberRegister = frame.findComponent('dayMemberRegister');
   dayMemberRegister.setBasicUnitText('人');
   var monthCustomerRegister = frame.findComponent('monthCustomerRegister');
   monthCustomerRegister.setBasicUnitText('人');
   var monthMemberRegister = frame.findComponent('monthMemberRegister');
   monthMemberRegister.setBasicUnitText('人');
   var yearCustomerRegister = frame.findComponent('yearCustomerRegister');
   yearCustomerRegister.setBasicUnitText('人');
   var yearhMemberRegister = frame.findComponent('yearhMemberRegister');
   yearhMemberRegister.setBasicUnitText('人');
   o._guiManager.register(frame);
   var invement = o._processor = MO.Class.create(MO.FEaiChartPerfMarketerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   invement.addPerformanceDataChangedListener(o, o.onPerformanceDataChangedListener);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   var head = o._head = MO.Class.create(MO.FEaiChartPerfMarketerHead);
   head.linkGraphicContext(o);
   head.setup();
   head.build();
   o._guiManager.register(head);
   var charts = o._charts = MO.Class.create(MO.FEaiChartPerfMarketerChart);
   charts.linkGraphicContext(o);
   charts.setup();
   charts.build();
   o._guiManager.register(charts);
   o._guiManager.hide();
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
}
MO.FEaiChartPerfMarketerScene_showFace = function FEaiChartPerfMarketerScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartPerfMarketerScene_fixMatrix = function FEaiChartPerfMarketerScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -34.9;
      matrix.ty = -10.9;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}
MO.FEaiChartPerfMarketerScene_processResize = function FEaiChartPerfMarketerScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   o.fixMatrix(o._processor.display().matrix());
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   var heads = o._head;
   if (isVertical) {
      heads.setDockCd(MO.EUiDock.RightTop);
      heads.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      heads.setLeft(10);
      heads.setRight(10);
      heads.setBottom(10);
      heads.setWidth(1060);
      heads.setHeight(900);
   } else {
      heads.setDockCd(MO.EUiDock.Right);
      heads.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      heads.setTop(26);
      heads.setRight(0);
      heads.setLeft(11);
      heads.setBottom(0);
      heads.setHeight(176);
      heads.setWidth(1894);
   }
   var charts = o._charts;
   if (isVertical) {
      charts.setDockCd(MO.EUiDock.Bottom);
      charts.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      charts.setLeft(10);
      charts.setRight(10);
      charts.setBottom(10);
      charts.setWidth(1060);
      charts.setHeight(900);
   } else {
      charts.setDockCd(MO.EUiDock.Bottom);
      charts.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      charts.setTop(0);
      charts.setRight(24);
      charts.setLeft(24);
      charts.setBottom(20);
      charts.setHeight(862);
      charts.setWidth(1876);
   }
}
