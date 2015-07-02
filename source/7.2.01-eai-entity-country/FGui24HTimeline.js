with (MO) {
   //==========================================================
   // <T>时间轴控件。</T>
   //
   // @class
   // @author sunpeng
   // @version 150630
   //==========================================================
   MO.FGui24HTimeline = function FGui24HTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._startTime = RClass.register(o, new AGetSet('_startTime'));
      o._endTime = RClass.register(o, new AGetSet('_endTime'));
      o._data = null;
      // @attribute
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      // @method
      o.construct = FGui24HTimeline_construct;
      o.sync = FGui24HTimeline_sync;
      o.onPaintBegin = FGui24HTimeline_onPaintBegin;
      o.on24HDataFetch = FGui24HTimeline_on24HDataFetch;
      return o;
   }

   //==========================================================
   // <T>更新时间。</T>
   //
   // @method
   //==========================================================
   MO.FGui24HTimeline_construct = function FGui24HTimeline_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._startTime = new TDate();
      o._endTime = new TDate();
   }

   //==========================================================
   // <T>更新时间。</T>
   //
   // @method
   //==========================================================
   MO.FGui24HTimeline_sync = function FGui24HTimeline_sync() {
      var o = this;
      var startTime = o._startTime;
      var endTime = o._endTime;
      var nowTick = MO.Timer.current();
      startTime.date.setTime(nowTick);
      startTime.refresh();
      startTime.setSecond(0);
      startTime.setMinute(0);
      startTime.addDay(-1);
      endTime.date.setTime(nowTick);
      endTime.setSecond(0);
      endTime.setMinute(parseInt(endTime.date.getMinutes() / 15) * 15);
      endTime.refresh();
      var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
      statisticsLogic.doInvestmentTrend(o, o.on24HDataFetch, o._startTime.format('YYYYMMDDHH24MISS'), o._endTime.format('YYYYMMDDHH24MISS'), 60 * 15);
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGui24HTimeline_on24HDataFetch = function FGui24HTimeline_on24HDataFetch(event) {
      var o = this;
      o._data = event.content.collection;
      o.dirty();
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGui24HTimeline_onPaintBegin = function FGui24HTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = event.rectangle;

      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 30;

      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      //绘制左右三角及轴延长部分
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#FFFFFF', 1);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#FFFFFF', 1);
      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      var dataTop = top + 30;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;
      //主轴
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#FFFFFF', 3);
      //刻度
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
         startTime.addMseconds(1000 * 60 * 60);
         drawText = !drawText;
         if (drawText) {
            graphic.setFont('bold 20px Microsoft YaHei');
            textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, middle + 20, '#FFFFFF');
         }

      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      //曲线
      var data = o._data;
      if (!data) {
         return;
      }
      //找到最大
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
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Investment);
      for (var i = 1; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var degreeSpan = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
         var y = dataBottom - data[i].investment / 10000 * pixPer10k;
         var rate = data[i].investment / maxInves;
         var colorIdx = parseInt((rateResource.count() - 1) * rate);
         var hexColor = RHex.format(rateResource.find(colorIdx));
         var color = '#' + hexColor.substring(2);
         var opColor = 'rgba(' + RHex.parse(hexColor.substring(2, 4)) + ',' + RHex.parse(hexColor.substring(4, 6)) + ',' + RHex.parse(hexColor.substring(6, 8)) + ',' + '0.6)';
         var lastRate = data[i - 1].investment / maxInves;
         var lastColorIdx = parseInt((rateResource.count() - 1) * lastRate);
         var lastHexColor = RHex.format(rateResource.find(lastColorIdx));
         var lastColor = '#' + lastHexColor.substring(2);
         var lastOpColor = 'rgba(' + RHex.parse(lastHexColor.substring(2, 4)) + ',' + RHex.parse(lastHexColor.substring(4, 6)) + ',' + RHex.parse(lastHexColor.substring(6, 8)) + ',' + '0.6)';
         var gradient = graphic.createLinearGradient(lastX, lastY, x, y);
         gradient.addColorStop('0', lastColor);
         gradient.addColorStop('1', color);
         var opGradient = graphic.createLinearGradient(lastX, 0, x, 0);
         opGradient.addColorStop('0', lastOpColor);
         opGradient.addColorStop('1', opColor);
         graphic.drawLine(lastX, lastY, x, y, gradient, 3);
         graphic.drawQuadrilateral(lastX, lastY, x, y, x, dataBottom, lastX, dataBottom, null, null, opGradient);
         lastX = x;
         lastY = y;
      }
      startTime.date.setTime(bakTime);
      startTime.refresh();
      //统计
      var lastHour = -1;
      var hourInves = 0;
      var maxHourInves = 0;
      var dayTotal = 0;
      startTime.parseAuto(data[0].date);
      startTime.refresh();
      lastHour = startTime.date.getHours();
      for (var i = 0; i < data.length; i++) {
         startTime.parseAuto(data[i].date);
         startTime.refresh();
         var hour = startTime.date.getHours();
         if (lastHour == hour) {
            hourInves += parseInt(data[i].investment);
         }
         else {
            if (hourInves > maxHourInves) {
               dayTotal += hourInves;
               maxHourInves = hourInves;
            }
            lastHour = hour;
         }
      }
      var textHourPeak = '峰值：' + maxHourInves;
      var textDayTotal = '总额：' + dayTotal;
      var textHourAvrg = '均值：' + (dayTotal / 24);
      graphic.setFont('bold 20px Microsoft YaHei');
      graphic.drawText(textHourPeak, decoLeft, top + 5, '#1DACE5');
      graphic.drawText(textDayTotal, decoLeft, top + 30, '#1DACE5');
      graphic.drawText(textHourAvrg, decoLeft, top + 55, '#1DACE5');
      startTime.date.setTime(bakTime);
      startTime.refresh();
   }

}
