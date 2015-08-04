//==========================================================
// <T>时间轴控件。</T>
//
// @class
// @author sunpeng
// @version 150630
//==========================================================
MO.FEaiChartMarketerTimeline = function FEaiChartMarketerTimeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._startTime        = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime          = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._ready            = false;
   o._investmentTotal  = 0;
   o._intervalMiniute  = 10;
   // @attribute
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth    = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight   = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap      = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth    = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   //..........................................................
   // @event
   o.oeUpdate          = MO.FEaiChartMarketerTimeline_oeUpdate;
   //..........................................................
   // @method
   o.construct         = MO.FEaiChartMarketerTimeline_construct;
   o.sync              = MO.FEaiChartMarketerTimeline_sync;
   o.drawTrend         = MO.FEaiChartMarketerTimeline_drawTrend;
   o.onPaintBegin      = MO.FEaiChartMarketerTimeline_onPaintBegin;
   o.on24HDataFetch    = MO.FEaiChartMarketerTimeline_on24HDataFetch;
   return o;
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTimeline_construct = function FEaiChartMarketerTimeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMarketerTrendInfo);
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTimeline_sync = function FEaiChartMarketerTimeline_sync() {
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
   // 设置开始时间
   var startTime = o._startTime;
   startTime.assign(currentDate);
   startTime.addDay(-1);
   // 设置结束时间
   var endTime = o._endTime;
   endTime.assign(currentDate);
   // 发送数据
   var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
   statisticsLogic.doMarketerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTimeline_on24HDataFetch = function FEaiChartMarketerTimeline_on24HDataFetch(event) {
   var o = this;   var content = event.content;
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(event.content);
   // 读取数据
   var trendInfo = o._trendInfo;
   trendInfo.unserialize(view);
   // 释放数据
   view.dispose();
   o.dirty();
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMarketerTimeline_oeUpdate = function FEaiChartMarketerTimeline_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   // 更新内容
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

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTimeline_drawTrend = function FEaiChartMarketerTimeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, lineColor){
   var o = this;
   var startTime = o._startTime;
   var trendInfo = o._trendInfo;
   var units = trendInfo.trendUints();
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
   for(var i = 1; i < count; i++){
      var unit = units.get(i);
      var value = unit[propertyName];
      startTime.parseAuto(unit.recordDate());
      startTime.refresh();
      var degreeSpan = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
      var y = dataBottom - value / 10000 * pixPer10k;
      y -= o._baseHeight;
      handle.lineTo(x, y);
   }
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
   var bottomColor = '#' + hexColor.substring(2);
   var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
   //var topColor = '#' + hexColor.substring(2);
   var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
   var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   gradient.addColorStop('0', bottomColor);
   //gradient.addColorStop('1', topColor);
   gradient.addColorStop('1', lineColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
   //handle.fillStyle = opGradient;
   //handle.lineTo(x, dataBottom);
   //handle.lineTo(dataLeft, dataBottom);
   //handle.lineTo(dataLeft, lastY);
   //handle.fill();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTimeline_onPaintBegin = function FEaiChartMarketerTimeline_onPaintBegin(event) {
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
   // 绘制左右三角及轴延长部分
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 60;
   var dataBottom = bottom - 30;
   var dataHeight = dataBottom - dataTop;
   // 主轴
   graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
   // 刻度
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
   // 曲线
   var trendInfo = o._trendInfo;
   var units = trendInfo.trendUints();
   if (units.isEmpty()){
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
      var redemption = unit.redemption();
      if (redemption > maxAmount) {
         maxAmount = redemption;
      }
   }
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF0000');
   o.drawTrend(graphic, '_redemption', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#0000FF');
   // 完成
   startTime.date.setTime(bakTime);
   startTime.refresh();
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
         hourInves += unit.redemption();
      }else{
         if(hourInves > maxHourInves){
            maxHourInves = hourInves;
            hourInves = 0;
         }
         lastHour = hour;
      }
   }
   // 输出数据文本
   graphic.setFont('bold 24px Microsoft YaHei');
   graphic.drawText("24小时投资曲线", decoLeft, top, '#54F0FF');
   // 输出数据文本
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
   // 设置时间
   startTime.date.setTime(bakTime);
   startTime.refresh();
}
