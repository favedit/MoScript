//==========================================================
// <T>时间轴控件。</T>
//
// @class
// @author sunpeng
// @version 150630
//==========================================================
MO.FEaiChartStatMarketerBarChart = function FEaiChartStatMarketerBarChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._infoProvince = MO.Class.register(o, new MO.AGetSet('_infoProvince'));
   o._ready = false;
   o._investmentTotal = 0;
   // @attribute
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   //..........................................................
   // @event
   o.oeUpdate = MO.FEaiChartStatMarketerBarChart_oeUpdate;
   //..........................................................
   // @method
   o.construct = MO.FEaiChartStatMarketerBarChart_construct;
   o.sync = MO.FEaiChartStatMarketerBarChart_sync;
   o.drawTrend = MO.FEaiChartStatMarketerBarChart_drawTrend;
   o.onPaintBegin = MO.FEaiChartStatMarketerBarChart_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartStatMarketerBarChart_on24HDataFetch;
   return o;
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerBarChart_construct = function FEaiChartStatMarketerBarChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartMktCustomerTrendInfo);
   o._infoProvince = MO.Class.create(MO.FEaiChartStatMarketerInfo);
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatMarketerBarChart_oeUpdate = function FEaiChartStatMarketerBarChart_oeUpdate(event) {
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
MO.FEaiChartStatMarketerBarChart_drawTrend = function FEaiChartStatMarketerBarChart_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor) {
   var o = this;
   var startTime = o._startTime;
   var units = o._trendInfo.units();
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
      var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
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
   gradient.addColorStop('0', bottomColor);
   gradient.addColorStop('1', topColor);
   var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
   opGradient.addColorStop('0', opBottomColor);
   opGradient.addColorStop('1', opTopColor);
   handle.strokeStyle = gradient;
   handle.lineWidth = 4;
   handle.stroke();
   handle.fillStyle = opGradient;
   handle.lineTo(x, dataBottom);
   handle.lineTo(dataLeft, dataBottom);
   handle.lineTo(dataLeft, lastY);
   handle.fill();
}

//==========================================================
// <T>绘制柱状图处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerBarChart_onPaintBegin = function FEaiChartStatMarketerBarChart_onPaintBegin(event) {
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
   var provinceCount = 10;
   var width  =  ( rectangle.right-rectangle.left)/provinceCount;
   var infoproo = o._infoProvince;
   var provincesarr = infoproo._provinces;
   var maxInverstment = 0 ;
   if (provincesarr){
     for (var i = 0 ; i<provincesarr.count();i++){
         var province = provincesarr.get(i);
         var code = province.code();
         var provincename = MO.Console.find(MO.FEaiResourceConsole).provinceModule().findByCode(code);
         var provinceLabel = '';
         var hight = 0;
         var color = '#F8CB3D'
         if(provincename&&provincename.label()){
            provinceLabel= provincename.label();
            if( maxInverstment<province.investmentTotal()){
               maxInverstment = province.investmentTotal();
            }
            switch (provincename.code()%7){
               case 0 :
               color = '#FF0000';
               break;
               case 1 :
               color = '#FF00FF';
               break;
               case 2 :
               color = '#ADFF2F';
               break;
               case 3 :
               color = '#9400D3';
               break;
               case 4 :
               color = '#8B0A50';
               break;
               case 5 :
               color = '#0000FF';
               break;
               case 6 :
               color = '#F8CB3D';
               break;

            }
            hight = 200*province.investmentTotal()/maxInverstment
            // var number = [];
            // for(var j=0; j<provinceLabel.length;j++){
            //    number.push(provinceLabel[j]);
            //    number.push('\n\t\r');
            // }
           // provinceLabel=number;
            graphic.setFont('9px Microsoft YaHei');
            graphic.drawText(provinceLabel,decoLeft+i*35-6, bottom, '#00B5F6');
            graphic.fillRectangle(decoLeft+i*35, bottom-30-hight, 16, hight, color, 10);
         }
        // graphic.drawText(provinceLabel,decoLeft+i*150, bottom-200+100+50, '#00B5F6');
      }
   //   var code = provinces.code();
   //   graphic.setFont('22px Microsoft YaHei');
    //  var city = MO.Console.find(MO.FEaiResourceConsole).provinceModule().findBycode(code);
     // var text = city.lable();
   //  graphic.drawText(text,decoLeft+i*150, bottom-260, '#00B5F6');
   }
  //  for (var i=0 ; i<provinceCount; i++){
  //    graphic.fillRectangle(decoLeft+i*150, bottom-260, 50, 200, '#F8CB3D', 10);
  //   // graphic.drawText(o._infoProvince.p,decoLeft+i*150, bottom-200+100+50, '#00B5F6');

  // }
}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
// MO.FEaiChartStatMarketerBarChart_onPaintBegin = function FEaiChartStatMarketerBarChart_onPaintBegin(event) {
//    var o = this;
//    if (!o._ready) {
//       return;
//    }
//    o.__base.FGuiControl.onPaintBegin.call(o, event);
//    var graphic = event.graphic;
//    var rectangle = event.rectangle;

//    var top = rectangle.top;
//    var bottom = rectangle.top + rectangle.height;
//    var middle = bottom - 30;
//    var decoLeft = rectangle.left + 5;
//    var decoRight = rectangle.left + rectangle.width - 5;
//    var decoLineMargin = o.triangleWidth() + o.decoLineGap();
//    // 绘制左右三角及轴延长部分
//    graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
//    graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
//    graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
//    graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
//    var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
//    var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
//    var dataTop = top + 60;
//    var dataBottom = bottom - 30;
//    var dataHeight = dataBottom - dataTop;
//    // 主轴
//    graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
//    // 刻度
//    var startTime = o.startTime();
//    var endTime = o.endTime();
//    var timeSpan = endTime.date.getTime() - startTime.date.getTime();
//    var bakTime = startTime.date.getTime();
//    var text;
//    var drawText = false;
//    var textWidth = 0;
//    graphic.setFont('bold 20px Microsoft YaHei');
//    while (!startTime.isAfter(endTime)) {
//       var span = startTime.date.getTime() - bakTime;
//       var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
//       graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
//       text = startTime.format('HH24:MI');
//       startTime.addHour(1);
//       startTime.truncHour();
//       drawText = !drawText;
//       if (drawText) {
//          textWidth = graphic.textWidth(text);
//          graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
//       }
//    }
//    graphic.drawLine(dataRight, middle - o.degreeLineHeight(), dataRight, middle, '#FFFFFF', 1);
//    text = endTime.format('HH24:MI');
//    textWidth = graphic.textWidth(text);
//    graphic.drawText(text, dataRight - textWidth / 2, middle + 40, '#59FDE9');

//    startTime.date.setTime(bakTime);
//    startTime.refresh();
//    // 曲线
//    var trendInfo = o._trendInfo;
//    var units = trendInfo.units();
//    if (!units) {
//       return;
//    }
//    if (units.isEmpty()) {
//       return;
//    }
//    var unitFirst = units.first();
//    // 找到最大数值
//    var maxAmount = 0;
//    var count = units.count();
//    for (var i = 0; i < count; i++) {
//       var unit = units.get(i);
//       var investment = unit.investment();
//       if (investment > maxAmount) {
//          maxAmount = investment;
//       }
//    }
//    //曲线及填充
//    o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
//    // ........................................................
//    // 统计   
//    var lastHour = -1;
//    var hourInves = 0;
//    var maxHourInves = 0;
//    startTime.parseAuto(unitFirst.recordDate());
//    startTime.refresh();
//    lastHour = startTime.date.getHours();
//    for (var i = 0; i < count; i++) {
//       var unit = units.get(i);
//       startTime.parseAuto(unit.recordDate());
//       startTime.refresh();
//       var hour = startTime.date.getHours();
//       if (lastHour == hour) {
//          hourInves += unit.investment();
//       } else {
//          if (hourInves > maxHourInves) {
//             maxHourInves = hourInves;
//             hourInves = 0;
//          }
//          lastHour = hour;
//       }
//    }
//    // 输出数据文本
//    graphic.setFont('24px Microsoft YaHei');
//    graphic.drawText("24H数据曲线", decoLeft, top, '#54F0FF');
//    // 输出数据文本
//    graphic.setFont('22px Microsoft YaHei');
//    var rowStart = top + 30;
//    var rowHeight = 22;
//    // 计算宽度
//    var textWidth = graphic.textWidth('投资总计：');
//    var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
//    var investmentTotalWidth = graphic.textWidth(investmentTotalText);
//    //24小时内，小时投资峰值
//    var investmentMaxText = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
//    var investmentMaxWidth = graphic.textWidth(investmentMaxText);
//    //24小时内，小时平均值
//    var investmentAvgText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal() / 24, 0, 0, 2, 0, 10000, '万');
//    var investmentAvgWidth = graphic.textWidth(investmentAvgText);
//    var maxWidth = investmentTotalWidth;
//    // 绘制文字
//    graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
//    graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#00B5F6');

//    graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
//    graphic.drawText(investmentMaxText, decoLeft + textWidth + maxWidth - investmentMaxWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');

//    graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
//    graphic.drawText(investmentAvgText, decoLeft + textWidth + maxWidth - investmentAvgWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
//    // 设置时间
//    startTime.date.setTime(bakTime);
//    startTime.refresh();
// }