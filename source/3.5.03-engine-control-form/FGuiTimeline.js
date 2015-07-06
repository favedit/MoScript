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
      o._progress = RClass.register(o, new AGetSet('_progress'));
      o._unitms = RClass.register(o, new AGetSet('_unitms'), 1000 * 60 * 60 * 24);
      // @attribute
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      //..........................................................
      // @method
      o.onPaintBegin = FGuiTimeline_onPaintBegin;
      o.onOperationDown = FGuiTimeline_onOperationDown;
      // @event
      o._dataChangedListeners = RClass.register(o, new AListener('_dataChangedListeners', EEvent.DataChanged));
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
      var rectangle = event.rectangle;

      var top = rectangle.top;
      var bottom = rectangle.top + rectangle.height;
      var middle = bottom - 50;

      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      //绘制左右三角及轴延长部分
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#FFFFFF', '#FFFFFF');

      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#25E8FF', 1);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#25E8FF', 1);

      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      //主轴
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#25E8FF', 3);
      //游标
      var startTime = o.startTime();
      var endTime = o.endTime();
      var degreeTime = o.degreeTime();
      var degreeText;
      var startText;
      switch (o.timeUnit()) {
         case EGuiTimeUnit.Second:
            startText = startTime.format('MI:SS.MISS');
            degreeText = degreeTime.format('MI:SS.MISS');
            break;
         case EGuiTimeUnit.Minute:
            startText = startTime.format('HH24:MI:SS');
            degreeText = degreeTime.format('HH24:MI:SS');
            break;
         case EGuiTimeUnit.Hour:
            startText = startTime.format('HH24:MI');
            degreeText = degreeTime.format('HH24:MI');
            break;
         case EGuiTimeUnit.Day:
            startText = startTime.format('MM-DD:HH24');
            degreeText = degreeTime.format('MM-DD:HH24');
            break;
         case EGuiTimeUnit.Week:
            startText = startTime.format('MM-DD');
            degreeText = degreeTime.format('MM-DD');
            break;
         case EGuiTimeUnit.Month:
            startText = startTime.format('YYYY-MM-DD');
            degreeText = degreeTime.format('YYYY-MM-DD');
            break;
         case EGuiTimeUnit.Year:
            startText = startTime.format('YYYY-MM');
            degreeText = degreeTime.format('YYYY-MM');
            break;
         default:
            return;
      }
      var timeSpan = endTime.date.getTime() - startTime.date.getTime();
      var degreeSpan = degreeTime.date.getTime() - startTime.date.getTime() + o.unitms() * o.progress();
      var degreeX = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      graphic.drawTriangle(degreeX, middle + 2, degreeX - o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), degreeX + o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), 1, '#FFFFFF', '#FFFFFF');
      graphic.setFont('bold 16px Microsoft YaHei');
      var degreeTextWidth = graphic.textWidth(degreeText);
      graphic.drawText(degreeText, degreeX - degreeTextWidth / 2, middle + 2 + o.triangleHeight() + 24, '#FFFFFF');
      //刻度
      var text;
      var bakTime = startTime.date.getTime();
      //开始刻度
      graphic.drawLine(dataLeft, middle - o.degreeLineHeight(), dataLeft, middle, '#FFFFFF', 1);
      var startTextWidth = graphic.textWidth(startText);
      graphic.drawText(startText, dataLeft - startTextWidth / 2, middle + 20, '#FFFFFF');
      switch (o.timeUnit()) {
         case EGuiTimeUnit.Second:
            startTime.addMseconds(1000);
            startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
            break;
         case EGuiTimeUnit.Minute:
            startTime.addMseconds(1000 * 60);
            startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
            break;
         case EGuiTimeUnit.Hour:
            startTime.addMseconds(1000 * 60 * 60);
            startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
            break;
         case EGuiTimeUnit.Day:
            startTime.addDay(1);
            startTime.parseAuto(startTime.format('YYYYMMDD'));
            break;
         case EGuiTimeUnit.Week:
            startTime.addDay(7);
            startTime.parseAuto(startTime.format('YYYYMMDD'));
            break;
         case EGuiTimeUnit.Month:
            startTime.addMonth(1);
            startTime.parseAuto(startTime.format('YYYYMM'));
            break;
         case EGuiTimeUnit.Year:
            startTime.addYear(1);
            startTime.parseAuto(startTime.format('YYYY'));
            break;
         default:
            return;
      }
      //中间刻度
      while (!startTime.isAfter(endTime)) {
         var span = startTime.date.getTime() - bakTime;
         var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
         graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
         switch (o.timeUnit()) {
            case EGuiTimeUnit.Second:
               text = startTime.format('MI:SS');
               startTime.addMseconds(1000);
               break;
            case EGuiTimeUnit.Minute:
               text = startTime.format('HH24:MI');
               startTime.addMseconds(1000 * 60);
               break;
            case EGuiTimeUnit.Hour:
               text = startTime.format('HH24:00');
               startTime.addMseconds(1000 * 60 * 60);
               break;
            case EGuiTimeUnit.Day:
               text = startTime.format('MM-DD');
               startTime.addDay(1);
               break;
            case EGuiTimeUnit.Week:
               text = startTime.format('MM-DD');
               startTime.addDay(7);
               break;
            case EGuiTimeUnit.Month:
               text = startTime.format('YYYY-MM');
               startTime.addMonth(1);
               break;
            case EGuiTimeUnit.Year:
               text = startTime.format('YYYY');
               startTime.addYear(1);
               break;
            default:
               return;
         }
         graphic.setFont('bold 16px Microsoft YaHei');
         var textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#FFFFFF');
      }
      //结束刻度
      var span = endTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);

      startTime.date.setTime(bakTime);
      startTime.refresh();
   }

   //==========================================================
   // <T>鼠标按下处理</T>
   //
   // @method
   //==========================================================
   MO.FGuiTimeline_onOperationDown = function FGuiTimeline_onOperationDown(event) {
      if (!event.flag) {
         return;
      }
      var o = this;
      o.__base.FGuiControl.onOperationDown.call(o, event);
      var rectangle = event.rectangle;
      var bottom = rectangle.top + rectangle.height;

      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();

      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();

      var x = event.locationX;
      if (event.locationY > bottom - 30) {
         if (x > dataLeft && x < dataRight) {
            var rate = (x - dataLeft) / (dataRight - dataLeft);
            var msDate = o.startTime().date.getTime() + (o.endTime().date.getTime() - o.startTime().date.getTime()) * rate;
            var dsEvent = MO.Memory.alloc(SEvent);
            dsEvent.sender = o;
            var selectedDate = MO.Memory.alloc(TDate);
            selectedDate.date.setTime(msDate);
            selectedDate.refresh();
            dsEvent.date = selectedDate.parseAuto(selectedDate.format('YYYYMMDD'));
            o.processDataChangedListener(dsEvent);
         }
      }

   }

}
