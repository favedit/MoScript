with (MO) {
   //==========================================================
   // <T>时间轴控件。</T>
   //
   // @class
   // @author sunpeng
   // @version 150618
   //==========================================================
   MO.FGuiTimeline = function FGuiTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._timeUnit = RClass.register(o, new AGetSet('_timeUnit'));
      o._startTime = RClass.register(o, new AGetSet('_startTime'));
      o._endTime = RClass.register(o, new AGetSet('_endTime'));
      o._degreeTime = RClass.register(o, new AGetSet('_degreeTime'));
      // @attribute
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      //..........................................................
      // @method
      o.onPaintBegin = FGuiTimeline_onPaintBegin;
      return o;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiTimeline_onPaintBegin = function FGuiTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;

      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 20;

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
      //主轴
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#FFFFFF', 1.5);
      //游标
      var startTime = o.startTime().date;
      var endTime = o.endTime().date;
      var degreeTime = o.degreeTime().date;
      var timeSpan = endTime.getTime() - startTime.getTime();
      var degreeSpan = degreeTime.getTime() - startTime.getTime();
      var degreeX = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
      graphic.drawTriangle(degreeX, middle + 2, degreeX - o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), degreeX + o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), 1, '#FFFFFF', '#FFFFFF');
      //刻度
      var degreeCount = 0;
      switch (o.timeUnit()) {
         case EGuiTimeUnit.Second:
            degreeCount = timeSpan / 1000;
            break;
         case EGuiTimeUnit.Minute:
            degreeCount = timeSpan / (1000 * 60);
            break;
         case EGuiTimeUnit.Hour:
            degreeCount = timeSpan / (1000 * 60 * 60);
            break;
         case EGuiTimeUnit.Day:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24);
            break;
         case EGuiTimeUnit.Week:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24 * 7);
            break;
         case EGuiTimeUnit.Month:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24 * 30);
            break;
         case EGuiTimeUnit.Year:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24 * 365);
            break;
         default:
            return;
      }
      var degreeGap = (dataRight - dataLeft) / degreeCount;
      var text;
      var dtVar;
      var bakTime = startTime.getTime();
      for (var i = 0; i <= degreeCount; i++) {
         graphic.drawLine(dataLeft + i * degreeGap, middle - o.degreeLineHeight(), dataLeft + i * degreeGap, middle, '#FFFFFF', 1);
         switch (o.timeUnit()) {
            case EGuiTimeUnit.Second:
               text = startTime.getMinutes() + ":" + startTime.getSeconds();
               dtVar = startTime.getSeconds();
               startTime.setSeconds(++dtVar);
               break;
            case EGuiTimeUnit.Minute:
               text = startTime.getHours() + ":" + startTime.getMinutes();
               dtVar = startTime.getMinutes();
               startTime.setMinutes(++dtVar);
               break;
            case EGuiTimeUnit.Hour:
               text = startTime.getHours() + ":00";
               dtVar = startTime.getHours();
               startTime.setHours(++dtVar);
               break;
            case EGuiTimeUnit.Day:
               text = (startTime.getMonth() + 1) + "-" + startTime.getDate();
               dtVar = startTime.getDate();
               startTime.setDate(++dtVar);
               break;
            case EGuiTimeUnit.Week:
               text = (startTime.getMonth() + 1) + "-" + startTime.getDate();
               dtVar = startTime.getDate();
               startTime.setDate(dtVar += 7);
               break;
            case EGuiTimeUnit.Month:
               text = startTime.getFullYear() + "-" + (startTime.getMonth() + 1);
               dtVar = startTime.getMonth();
               startTime.setMonth(++dtVar);
               break;
            case EGuiTimeUnit.Year:
               text = startTime.getFullYear();
               dtVar = startTime.getFullYear();
               startTime.setFullYear(++dtVar);
               break;
            default:
               return;
         }
         graphic.drawText(text, dataLeft + i * degreeGap - text.length * 3, middle + 12, '#FFFFFF');
      }
      startTime.setTime(bakTime);
   }

}
