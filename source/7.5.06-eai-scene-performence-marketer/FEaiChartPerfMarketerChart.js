//==========================================================
// <T>时间轴控件。</T>
//
// @class
// @author sunpeng
// @version 150630
//==========================================================
MO.FEaiChartPerfMarketerChart = function FEaiChartPerfMarketerChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   // @attribute
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
   // @attribute
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o.setup  = MO.FEaiChartPerfMarketerChart_setup;
   //..........................................................
   // @event
   // @event
   o.onImageLoad           = MO.FEaiChartPerfMarketerChart_onImageLoad;
   o.oeUpdate = MO.FEaiChartPerfMarketerChart_oeUpdate;
   //..........................................................
   // @method
   o.construct = MO.FEaiChartPerfMarketerChart_construct;
   o.sync = MO.FEaiChartPerfMarketerChart_sync;
   o.drawTrend = MO.FEaiChartPerfMarketerChart_drawTrend;
   o.onPaintBegin = MO.FEaiChartPerfMarketerChart_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartPerfMarketerChart_on24HDataFetch;
   o.onCalculate = MO.FEaiChartPerfMarketerChart_onCalculate;
   return o;
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
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

   // o._performanceDate = MO.Class.create(MO.FEaiChartPerfMarketerInfo);
   // o._trendInfo = MO.Class.create(MO.FEaiChartMktCustomerTrendInfo);
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerChart_onImageLoad = function FEaiChartPerfMarketerChart_onImageLoad(){
   this.dirty();
}
//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerChart_setup = function FEaiChartPerfMarketerChart_setup(){
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
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
//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartPerfMarketerChart_oeUpdate = function FEaiChartPerfMarketerChart_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   // 更新内容
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerChart_drawTrend = function FEaiChartPerfMarketerChart_drawTrend(graphic, units, proportion, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, color, bottomColor, topColor) {
   var o = this;
   var startTime = o._startTime;
   // var units = interface;o._trendInfo.+interface+._ticks;
   // var units = o._trendInfo.units();
   var count = units.count();
   var unitFirst = units.first();
   var handle = graphic._handle;
   handle.lineCap = 'round';
   // 找到最大
   var pixPer10k = dataHeight * 10000 / maxAmount;
   var amount = unitFirst[propertyName];
   var lastX = dataLeft;
   var lastY = dataBottom - amount / 10000 * pixPer10k;

   // 绘制曲线
   handle.beginPath();
   handle.moveTo(lastX, lastY);
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
   for (var i = 1; i < count; i++) {
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      //  总的宽 
      var x = dataLeft + ((dataRight - dataLeft) * proportion)  * (degreeSpan / timeSpan);

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
   // gradient.addColorStop('0', bottomColor);
   // gradient.addColorStop('1', topColor);
   gradient.addColorStop('0', color);
   gradient.addColorStop('1', color);
   // var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   // opGradient.addColorStop('0', opBottomColor);
   // opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
   // handle.fillStyle = opGradient;
   // handle.lineTo(x, dataBottom);
   // handle.lineTo(dataLeft, dataBottom);
   // handle.lineTo(dataLeft, lastY);
   // handle.fill();
}
MO.FEaiChartPerfMarketerChart_onCalculate = function FEaiChartPerfMarketerChart_onCalculate(){
   
}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
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
   // var decoLeft = rectangle.left + 5;
   var decoLeft = rectangle.left + 433;
   var decoRight = rectangle.left + rectangle.width -20;
   // var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   var curveW = width - decoLeft;
   
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._logoPadding);
   // 当日
   graphic.drawGridImage(o._dayImage, left+20, top+41, 82, 236, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, decoLeft, top+41, curveW, 236, o._logoPadding);
   // 当月
   graphic.drawGridImage(o._monthImage, left+20, top+310, 82, 236, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, left+433, top+310, curveW, 236, o._logoPadding);
   // 累计
   graphic.drawGridImage(o._cumulativeImage, left+20, top+578, 82, 236, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, left+433, top+578, curveW, 236, o._logoPadding);

   // var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   // var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataLeft = decoLeft + o.decoLineWidth();
   var dataRight = decoRight - o.decoLineWidth();
   var dataTop = top + 41;
   var dataBottom = top + 159;
   var dataHeight = 60;
   // 主轴
   // graphic.drawLine(dataLeft, dataBottom, dataRight, dataBottom, '#F8CB3D', 3);
   // 刻度
   var startTime = o.startTime();
   var endTime = o.endTime();
   var hour = 24;
   var proportion = endTime.hour / hour;
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   graphic.setFont('18px Microsoft YaHei');
   var span = startTime.date.getTime() - bakTime;
   // var decoLeft = rectangle.left + 433;
   // var decoRight = rectangle.left + rectangle.width -20;
   var x = (decoRight - decoLeft -80 ) / hour;
   for(var i = 0; i <= hour; i++){
      text = i ; 
      if(i != 0){
          text = i < 10 ? '0' + i : i;
          textWidth = graphic.textWidth(i);
      }
      graphic.drawText( text+"h", decoLeft + 8 + (x * i), 445, '#eeb92f');
   }
   startTime.date.setTime(bakTime);
   startTime.refresh();

   // 曲线
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
   // 找到最大数值
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
   //曲线及填充
   // 当日
   o.drawTrend(graphic, units, proportion, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#fb2509', '#fb2509');
   o.drawTrend(graphic, units, proportion, '_redemption', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#457eff', '#457eff');
   o.drawTrend(graphic, units, proportion, '_netinvestment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#02fb49', '#02fb49');
   // ........................................................
   // 统计   
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
   // 设置时间
   // startTime.date.setTime(bakTime);
   // startTime.refresh();
   var monthStart = o.monthStart();
   var monthEnd = o.monthEnd();

   var monthDay = monthStart.day;
   var monthProportion = monthEnd.day/monthDay;
   // monthStart.day;
   var timeSpan = monthEnd.date.getTime() - monthStart.date.getTime();
   var endTimeS = monthStart.date.getTime();
   var text;
   var drawText = false;
   var textWidth = 0;
   graphic.setFont('20px Microsoft YaHei');
   var day = monthDay;
   var x = (decoRight - decoLeft -80 ) / monthDay;
   for(var i = 0; i <= day; i++){
      text = i;
      if( i != 0 ){
         text = i < 10 ? '0' + i : i;
         textWidth = graphic.textWidth(i);
      }
      graphic.drawText( text, decoLeft + 8 + (x * i), 714, '#eeb92f');
   }

   var units = trendInfo._month._ticks;
   if (!units) {
      return;
   }
   if (units.isEmpty()) {
      return;
   }
   var unitFirst = units.first();
   // 找到最大数值
   var maxAmount = 0;
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
    // ........................................................
   // 统计   
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
   // 当月
   var yH = 280;
   var monthDataTop = dataTop + yH;
   var monthdataBottom = dataBottom+yH;
   o.drawTrend(graphic, units, monthProportion, '_redemption', dataLeft, monthDataTop, dataRight, monthdataBottom, dataHeight, endTimeS, timeSpan, maxAmount, '#457eff', '#457eff');
   o.drawTrend(graphic, units, monthProportion, '_investment', dataLeft, monthDataTop, dataRight, monthdataBottom, dataHeight, endTimeS, timeSpan, maxAmount, '#fb2509', '#fb2509');
   o.drawTrend(graphic, units, monthProportion, '_netinvestment', dataLeft, monthDataTop, dataRight, monthdataBottom, dataHeight, endTimeS, timeSpan, maxAmount, '#02fb49', '#02fb49');

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
   // while (!yearStart.isAfter(yearEnd)) {
   //    var span = yearStart.date.getTime() - endTimeA;
   //    //    var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
   //    //    graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
   //    var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
   //    // texts = yearStart.format('MM');
   //    texts = year++;
   //    texts = texts < 10 ? '0' + texts: texts;
   //    // text = day++;
   //    // text = text < 10 ? '0' + text: text;
   //    yearStart.addMonth(1);
   //    yearStart.truncSecond();
   //    // drawText = !drawText;
   //    // if (drawText) {
   //       textWidth = graphic.textWidth(text);
   //       graphic.drawText(texts, x - textWidth / 2, 980, '#eeb92f');
   //    // }
   // }
   var x = (decoRight - decoLeft -80 ) / yearMonth;
   for(var i = 0; i <= year ; i++){
       texts = i;
      if( i != 0 ){
         texts = i < 10 ? '0' + i : i;
         textWidth = graphic.textWidth(i);
      }
      graphic.drawText(texts, decoLeft + 8 + (x * i), 980, '#eeb92f');
   }
   // graphic.drawLine(dataRight, middle - o.degreeLineHeight(), dataRight, middle, '#FFFFFF', 1);
   // text = yearEnd.format('MM');
   // textWidth = graphic.textWidth(text);
   // graphic.drawText(text, dataRight - textWidth, 1000, '#eeb92f');
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
   // 找到最大数值
   var maxAmount = 0;
   var count = year.count();
   for (var i = 0; i < count; i++) {
      var unit = year.get(i);
      var investment = unit.investment();
      if (investment > maxAmount) {
         maxAmount = investment;
      }
   }
   // ........................................................
   // 统计   
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
   // 当月
   // var month = trendInfo._month._ticks;
   // var year = trendInfo._year._ticks;
   yH = yH * 2 ;
   var yearDataTop = dataTop + yH;
   var yeardataBottom = dataBottom +yH;

   o.drawTrend(graphic, year, yearProportion, '_redemption', dataLeft, yearDataTop, dataRight, yeardataBottom, dataHeight, endTimeA, timeSpan, maxAmount,'#457eff', '#457eff');
   o.drawTrend(graphic, year, yearProportion, '_investment', dataLeft, yearDataTop, dataRight, yeardataBottom, dataHeight, endTimeA, timeSpan, maxAmount, '#fb2509', '#fb2509');
   o.drawTrend(graphic, year, yearProportion, '_netinvestment', dataLeft, yearDataTop, dataRight, yeardataBottom, dataHeight, endTimeA, timeSpan, maxAmount, '#02fb49', '#02fb49');
  
   yearStart.date.setTime(endTimeA);
   yearStart.refresh();

   monthStart.date.setTime(endTimeS);
   monthStart.refresh();

   startTime.date.setTime(bakTime);
   startTime.refresh();




}