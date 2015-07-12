//==========================================================
// <T>时间轴控件。</T>
//
// @class
// @author sunpeng
// @version 150618
//==========================================================
MO.FGuiTimeline = function FGuiTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._timeUnit             = MO.Class.register(o, new MO.AGetSet('_timeUnit'));
   o._startTime            = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime              = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._degreeTime           = MO.Class.register(o, new MO.AGetSet('_degreeTime'));
   o._progress             = MO.Class.register(o, new MO.AGetSet('_progress'));
   o._unitms               = MO.Class.register(o, new MO.AGetSet('_unitms'), 1000 * 60 * 60 * 24);
   // @attribute
   o._degreeLineHeight     = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 15);
   o._degreeLineWidth      = MO.Class.register(o, new MO.AGetSet('_degreeLineWidth'), 3);
   o._mainLineWidth        = MO.Class.register(o, new MO.AGetSet('_mainLineWidth'), 5);
   o._triangleWidth        = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight       = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap          = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth        = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 40);
   // @attribute
   o._timeFontColor        = '#FFFFFF';
   o._cursorFontColor      = '#FFFFFF';
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FGuiTimeline_onPaintBegin;
   o.onOperationDown       = MO.FGuiTimeline_onOperationDown;
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
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#25E8FF', o._mainLineWidth);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#25E8FF', o._mainLineWidth);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   //主轴
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#25E8FF', o._mainLineWidth);
   //游标
   var startTime = o.startTime();
   var endTime = o.endTime();
   var degreeTime = o.degreeTime();
   var degreeText;
   var startText;
   switch (o.timeUnit()) {
      case MO.EGuiTimeUnit.Second:
         startText = startTime.format('MI:SS.MISS');
         degreeText = degreeTime.format('MI:SS.MISS');
         break;
      case MO.EGuiTimeUnit.Minute:
         startText = startTime.format('HH24:MI:SS');
         degreeText = degreeTime.format('HH24:MI:SS');
         break;
      case MO.EGuiTimeUnit.Hour:
         startText = startTime.format('HH24:MI');
         degreeText = degreeTime.format('HH24:MI');
         break;
      case MO.EGuiTimeUnit.Day:
         startText = startTime.format('MM-DD:HH24');
         degreeText = degreeTime.format('MM-DD:HH24');
         break;
      case MO.EGuiTimeUnit.Week:
         startText = startTime.format('MM-DD');
         degreeText = degreeTime.format('MM-DD');
         break;
      case MO.EGuiTimeUnit.Month:
         startText = startTime.format('YYYY-MM-DD');
         degreeText = degreeTime.format('YYYY-MM-DD');
         break;
      case MO.EGuiTimeUnit.Year:
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
   graphic.setFont('bold 22px Microsoft YaHei');
   var degreeTextWidth = graphic.textWidth(degreeText);
   graphic.drawText(degreeText, degreeX - degreeTextWidth / 2, middle + 50, o._cursorFontColor);
   // 刻度
   var text;
   var bakTime = startTime.date.getTime();
   // 开始刻度
   graphic.drawLine(dataLeft, middle - o.degreeLineHeight(), dataLeft, middle, '#FFFFFF', o._degreeLineWidth);
   var startTextWidth = graphic.textWidth(startText);
   graphic.drawText(startText, dataLeft - startTextWidth / 2, middle + 50, o._cursorFontColor);
   switch (o.timeUnit()) {
      case MO.EGuiTimeUnit.Second:
         startTime.addMseconds(1000);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EGuiTimeUnit.Minute:
         startTime.addMseconds(1000 * 60);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EGuiTimeUnit.Hour:
         startTime.addMseconds(1000 * 60 * 60);
         startTime.parseAuto(startTime.format('YYYYMMDDHH24MISS'));
         break;
      case MO.EGuiTimeUnit.Day:
         startTime.addDay(1);
         startTime.parseAuto(startTime.format('YYYYMMDD'));
         break;
      case MO.EGuiTimeUnit.Week:
         startTime.addDay(7);
         startTime.parseAuto(startTime.format('YYYYMMDD'));
         break;
      case MO.EGuiTimeUnit.Month:
         startTime.addMonth(1);
         startTime.parseAuto(startTime.format('YYYYMM'));
         break;
      case MO.EGuiTimeUnit.Year:
         startTime.addYear(1);
         startTime.parseAuto(startTime.format('YYYY'));
         break;
      default:
         return;
   }
   // 中间刻度
   var alternate = true;
   var textBottom = 0;
   while (!startTime.isAfter(degreeTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', o._degreeLineWidth);
      switch (o.timeUnit()) {
         case MO.EGuiTimeUnit.Second:
            text = startTime.format('MI:SS');
            startTime.addMseconds(1000);
            break;
         case MO.EGuiTimeUnit.Minute:
            text = startTime.format('HH24:MI');
            startTime.addMseconds(1000 * 60);
            break;
         case MO.EGuiTimeUnit.Hour:
            text = startTime.format('HH24:00');
            startTime.addMseconds(1000 * 60 * 60);
            break;
         case MO.EGuiTimeUnit.Day:
            text = startTime.format('MM-DD');
            startTime.addDay(1);
            break;
         case MO.EGuiTimeUnit.Week:
            text = startTime.format('MM-DD');
            startTime.addDay(7);
            break;
         case MO.EGuiTimeUnit.Month:
            text = startTime.format('YYYY-MM');
            startTime.addMonth(1);
            break;
         case MO.EGuiTimeUnit.Year:
            text = startTime.format('YYYY');
            startTime.addYear(1);
            break;
         default:
            return;
      }
      graphic.setFont('bold 22px Microsoft YaHei');
      var textWidth = graphic.textWidth(text);
      textBottom = alternate ? middle + 26 : middle + 52;
      graphic.drawText(text, x - textWidth / 2, textBottom, o._timeFontColor);
      //alternate = !alternate;
   }
   // 结束刻度
   var span = endTime.date.getTime() - bakTime;
   var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
   graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, o._cursorFontColor, o._degreeLineWidth);
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
         MO.Memory.free(dsEvent);
      }
   }
}
