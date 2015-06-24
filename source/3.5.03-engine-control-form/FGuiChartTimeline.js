with (MO) {
   //==========================================================
   // <T>时间轴控件。</T>
   //
   // @class
   // @author sunpeng
   // @version 150618
   //==========================================================
   MO.FGuiChartTimeline = function FGuiChartTimeline(o) {
      o = RClass.inherits(this, o, FGuiTimeline);
      //..........................................................
      // @method
      o.onPaintBegin = FGuiChartTimeline_onPaintBegin;
      return o;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiChartTimeline_onPaintBegin = function FGuiChartTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiTimeline.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;

      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;

      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      var dataLeft = rectangle.left + 5 + decoLineMargin + o.decoLineWidth();
      var dataRight = rectangle.left + rectangle.width - 5 - decoLineMargin - o.decoLineWidth();
      var dataBottom = bottom - 20;
      
      var startDate = o.startTime();
      var endDate = o.endTime();
      var degreeDate = o.degreeTime();

      var bakTime = startDate.date.getTime();
      var timeSpan = endDate.date.getTime() - startDate.date.getTime();
      //取最后一天为最大值
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var dateData = historyConsole.dates().get(endDate.format('YYYYMMDD'));
      var maxInves = dateData.investmentTotal();
      var pixPer10k = rectangle.height * 10000 / maxInves;
      //取第一天确定起始Y
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      var inves = dateData.investmentTotal();
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      while (!startDate.isAfter(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            var rate = 1 - (y / rectangle.height);
            var colorIdx = parseInt(rateConsole.count() * rate);
            var hexColor = RHex.format(rateConsole.find(colorIdx));
            var color = '#' + hexColor.substring(2);
            graphic.drawLine(lastX, lastY, x, y, color, 1);
            if (startDate.date.getDate() == 1)
            {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.drawCircle(lastX, lastY, 3, 0, color, color);
               graphic.drawText(text, lastX - text.length * 3, lastY - 12, '#FFFFFF');
            }
            lastX = x;
            lastY = y;
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
   }

}
