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
      // @attribute
      o._startHeight = 20;
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
      //取最后一天为最大值
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var investmentTotal = historyConsole.investmentTotal();
      var dateData = historyConsole.dates().get(endDate.format('YYYYMMDD'));
      var maxInves = dateData.investmentTotal();

      var degreeData = historyConsole.dates().get(degreeDate.format('YYYYMMDD'));
      if (degreeData.investmentTotal() * 3 < investmentTotal) {
         maxInves *= (degreeData.investmentTotal() / investmentTotal) * 3;
      }
            
      var pixPer10k = dataHeight * 10000 / maxInves;

      //取第一天确定起始Y
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      var inves = dateData.investmentTotal();
      var lastX = dataLeft;
      var lastY = dataBottom - inves / 10000 * pixPer10k;
      lastY -= o._startHeight;
      //画线及多边形
      var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
      var rateResource = rateConsole.find(EEaiRate.Line);
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var dayInvestmentTotal = dateData.investmentTotal();
            var y = dataBottom - dayInvestmentTotal / 10000 * pixPer10k;
            y -= o._startHeight;
            var hexColor = RHex.format(rateResource.findRate(dayInvestmentTotal / investmentTotal));
            var color = '#' + hexColor.substring(2);
            var opColor = 'rgba(' + RHex.parse(hexColor.substring(2, 4)) + ',' + RHex.parse(hexColor.substring(4, 6)) + ',' + RHex.parse(hexColor.substring(6, 8)) + ',' + '0.3)';
            graphic.drawLine(lastX, lastY, x, y, color, 3);
            var opGradient = graphic.createLinearGradient(0, dataBottom, 0, y);
            var bottomHexColor = RHex.format(rateResource.find(0));
            var bottomOpColor = 'rgba(' + RHex.parse(bottomHexColor.substring(2, 4)) + ',' + RHex.parse(bottomHexColor.substring(4, 6)) + ',' + RHex.parse(bottomHexColor.substring(6, 8)) + ',' + '0.3)';
            opGradient.addColorStop('0', bottomOpColor);
            opGradient.addColorStop('1', opColor);
            graphic.drawQuadrilateral(lastX, lastY, x, y, x, dataBottom, lastX, dataBottom, null, null, opGradient);
            if (startDate.date.getDate() == 1) {
               var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
               graphic.drawCircle(x, y, 3, 0, color, color);
            }
            lastX = x;
            lastY = y;
            startDate.addDay(1);
         }else{
            break;
         }
      }
      // 后写字
      startDate.date.setTime(bakTime);
      startDate.refresh();
      while (startDate.isBefore(degreeDate)) {
         var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
         if (dateData) {
            var degreeSpan = startDate.date.getTime() - bakTime;
            var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
            var inves = dateData.investmentTotal();
            var y = dataBottom - inves / 10000 * pixPer10k;
            y -= o._startHeight;
            if (startDate.date.getDate() == 1) {
               graphic.setFont('bold 16px Microsoft YaHei');
               if(inves > 100000000){
                  var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
                  var textWidth = graphic.textWidth(text);
                  graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
               }else{
                  var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
                  var textWidth = graphic.textWidth(text);
                  graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
               }
            }
            startDate.addDay(1);
         }
         else {
            break;
         }
      }
      // 画下一天的一部分
      var dateData = historyConsole.dates().get(startDate.format('YYYYMMDD'));
      if (dateData) {
         var degreeSpan = startDate.date.getTime() - bakTime + o.unitms() * o.progress();
         var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
         var inves = dateData.investmentTotal();
         var y = dataBottom - inves / 10000 * pixPer10k;
         y -= o._startHeight;
         var hexColor = RHex.format(rateResource.findRate(inves / investmentTotal));
         var color = '#' + hexColor.substring(2);
         var opColor = 'rgba(' + RHex.parse(hexColor.substring(2, 4)) + ',' + RHex.parse(hexColor.substring(4, 6)) + ',' + RHex.parse(hexColor.substring(6, 8)) + ',' + '0.3)';
         graphic.drawLine(lastX, lastY, x, lastY + (y - lastY) * o.progress(), color, 3);
         var opGradient = graphic.createLinearGradient(0, dataBottom, 0, y);
         var bottomHexColor = RHex.format(rateResource.find(0));
         var bottomOpColor = 'rgba(' + RHex.parse(bottomHexColor.substring(2, 4)) + ',' + RHex.parse(bottomHexColor.substring(4, 6)) + ',' + RHex.parse(bottomHexColor.substring(6, 8)) + ',' + '0.3)';
         opGradient.addColorStop('0', bottomOpColor);
         opGradient.addColorStop('1', opColor);
         graphic.drawQuadrilateral(lastX, lastY, x, y, x, dataBottom, lastX, dataBottom, null, null, opGradient);
         graphic.drawCircle(x, lastY + (y - lastY) * o.progress(), 3, 0, color, color);
         graphic.setFont('bold 16px Microsoft YaHei');
         if(inves > 100000000){
            var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 100000000, '亿');
            var textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, y - 16, '#FFE849');
         }else{
            var text = MO.RFloat.unitFormat(inves, 0, 0, 2, 0, 10000, '万');
            var textWidth = graphic.textWidth(text);
            graphic.drawText(text, x - textWidth / 2, y - 16, '#FF7200');
         }
      }
      startDate.date.setTime(bakTime);
      startDate.refresh();
   }

}
