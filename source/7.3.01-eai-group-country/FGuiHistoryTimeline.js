with (MO) {
   //==========================================================
   // <T>时间轴控件。</T>
   //
   // @class
   // @author sunpeng
   // @version 150618
   //==========================================================
   MO.FGuiHistoryTimeline = function FGuiHistoryTimeline(o) {
      o = RClass.inherits(this, o, FGuiTimeline);
      //..........................................................
      // @method
      o.onPaintBegin = FGuiHistoryTimeline_onPaintBegin;
      return o;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryTimeline_onPaintBegin = function FGuiHistoryTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiTimeline.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;

      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;

      var dataTop = top + 30;
      var dataBottom = bottom - 30;
      var dataHeight = dataBottom - dataTop;

      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      var dataLeft = rectangle.left + 5 + decoLineMargin + o.decoLineWidth();
      var dataRight = rectangle.left + rectangle.width - 5 - decoLineMargin - o.decoLineWidth();

      var startDate = o.startTime();
      var endDate = o.endTime();
      var degreeDate = o.degreeTime();

      var bakTime = startDate.date.getTime();
      var timeSpan = endDate.date.getTime() - startDate.date.getTime();
      //取最后一天为最大值
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var dateData = historyConsole.dates().get(endDate.format('YYYYMMDD'));
      var maxInves = dateData.investmentTotal();
      var pixPer10k = dataHeight * 10000 / maxInves;
      //取第一天确定起始Y
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      var inves = dateData.investmentTotal();
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Line);
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            var rate = 1 - (y / dataHeight);
            var colorIdx = parseInt(rateResource.count() * rate);
            var hexColor = RHex.format(rateResource.find(colorIdx));
            var color = '#' + hexColor.substring(2);
            graphic.drawLine(lastX, lastY, x, y, color, 3);
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.drawCircle(x, y, 3, 0, color, color);
            }
            lastX = x;
            lastY = y;
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      //后写字
      startDate.date.setTime(bakTime);
      startDate.refresh();
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.setFont('bold 16px Microsoft YaHei');
               graphic.drawText(text, x - text.length * 3, y - 16, '#FFFFFF');
            }
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      //画下一天的一部分
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var inves = dateData.investmentTotal();
         var y = dataBottom - inves / 10000 * pixPer10k;
         var rate = 1 - (y / dataHeight);
         var colorIdx = parseInt(rateResource.count() * rate);
         var hexColor = RHex.format(rateResource.find(colorIdx));
         var color = '#' + hexColor.substring(2);
         graphic.drawLine(lastX, lastY, x, lastY + (y - lastY) * o.progress(), color, 3);
         var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
         graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), 3, 0, color, color);
         graphic.setFont('bold 16px Microsoft YaHei');
         graphic.drawText(text, x - text.length * 3, y - 16, '#FFFFFF');
      }

      startDate.date.setTime(bakTime);
      startDate.refresh();
   }

}
