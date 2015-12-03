//==========================================================
// <T>时间轴控件。</T>
//
// @class
// @author sunpeng
// @version 150630
//==========================================================
MO.FEaiChartMktCustomerV2Timeline = function FEaiChartMktCustomerV2Timeline(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._ready = false;
   o._investmentTotal = 0;
   // @attribute
   o._baseHeight = 5;
   o._backgroundImage= null;
   o._backgroundPadding=null;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 10);
   //..........................................................
   // @event
   o.oeUpdate = MO.FEaiChartMktCustomerV2Timeline_oeUpdate;
   //..........................................................
   // @method
   o.construct = MO.FEaiChartMktCustomerV2Timeline_construct;
   o.sync = MO.FEaiChartMktCustomerV2Timeline_sync;
   o.drawTrend = MO.FEaiChartMktCustomerV2Timeline_drawTrend;
   o.onPaintBegin = MO.FEaiChartMktCustomerV2Timeline_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartMktCustomerV2Timeline_on24HDataFetch;
   return o;
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Timeline_construct = function FEaiChartMktCustomerV2Timeline_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiLogicInfoCustomerTrend);
   var imageConsole = MO.Console.find(MO.FImageConsole);
   o._backgroundImage = imageConsole.load('{eai.resource}/live/timelineTextbg.png');
   o._backgroundPadding = new MO.SPadding(20, 20, 20, 20);
   this.dirty();

}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Timeline_oeUpdate = function FEaiChartMktCustomerV2Timeline_oeUpdate(event) {
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
MO.FEaiChartMktCustomerV2Timeline_drawTrend = function FEaiChartMktCustomerV2Timeline_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor) {
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
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Timeline_onPaintBegin = function FEaiChartMktCustomerV2Timeline_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var trendInfo = o._trendInfo;
   graphic.setFont('22px Microsoft YaHei');
   var textWidth = graphic.textWidth('投资总计：');
   var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
   var investmentTotalWidth = graphic.textWidth(investmentTotalText);
   var imageWidth = investmentTotalWidth + textWidth;
   var top = rectangle.top+20;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 50;
   var decoLeft = rectangle.left +imageWidth+20;
   var decoRight = rectangle.left + rectangle.width - 12;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   
   // 绘制左右三角及轴延长部分
   graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
   graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
   graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
   var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
   var dataTop = top + 90;
   var dataBottom = bottom - 50;
   var dataHeight = dataBottom - dataTop+80;
   // // 主轴
    graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
   // // 刻度
    var startTime = o.startTime();
    var endTime = o.endTime();
    var timeSpan = endTime.date.getTime() - startTime.date.getTime();
    var bakTime = startTime.date.getTime();

   // // 曲线
   var trendInfo = o._trendInfo;
   var units = trendInfo.units();
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
   // //曲线及填充
   // o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
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
   decoLeft = decoLeft - imageWidth  ;
   // 输出数据文本
   top = top + rectangle.height -220 ;
   graphic.setFont('24px Microsoft YaHei');
   graphic.drawText("24H数据曲线", decoLeft+20, top+5, '#54F0FF');
   // 输出数据文本
   graphic.setFont('17px Microsoft YaHei');
   var image = o._backgroundImage;
   var padding = o._backgroundPadding;
   var rowStart = top +30;
   var rowHeight = 25;
   // 计算宽度
   graphic.drawImage(image,decoLeft,top-30,226,207);
   var textWidth = graphic.textWidth('投资总计的：');
   var monthInvestmentTotal = MO.Lang.Float.unitFormat(trendInfo.monthInvestmentTotal(), 0, 0, 2, 0, 10000, '万');
   var monthInvestmentWidth = graphic.textWidth(monthInvestmentTotal);
   var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
   var investmentTotalWidth = graphic.textWidth(investmentTotalText);
   //24小时内，小时投资峰值
   var investmentMaxText = MO.Lang.Float.unitFormat(maxHourInves, 0, 0, 2, 0, 10000, '万');
   var investmentMaxWidth = graphic.textWidth(investmentMaxText);
   //24小时内，小时平均值
   var investmentAvgText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal() / 24, 0, 0, 2, 0, 10000, '万');
   var investmentAvgWidth = graphic.textWidth(investmentAvgText);
   var maxWidth = monthInvestmentWidth;
   decoLeft = decoLeft+10;
   // 绘制文字

            // var high = text.substring(textLength - 11, textLength - 7);
            // var low = text.substring(textLength - 7, textLength);
            // var highWidth = graphic.textWidth(high);
            // var lowWidth = graphic.textWidth(low);
            // numberFont.color = column.highestColor();
            // graphic.drawFontText(highest, numberFont, x, y, contentWidth - highWidth - lowWidth, height, MO.EUiAlign.Right);
            // numberFont.color = column.highColor();
            // graphic.drawFontText(high, numberFont, x, y, contentWidth - lowWidth, height, MO.EUiAlign.Right);
            // numberFont.color = column.normalColor();
            // graphic.drawFontText(low, numberFont, x, y, contentWidth, height, MO.EUiAlign.Right);
   graphic.drawText('24H总额：', decoLeft, rowStart + rowHeight * 0+ 5, '#00CFFF');
   if(investmentTotalText.length>4){
      var high = investmentTotalText.substring(0, investmentTotalText.length - 9);
      var middle = investmentTotalText.substring(investmentTotalText.length - 9, investmentTotalText.length - 4);
      var low = investmentTotalText.substring(investmentTotalText.length - 4, investmentTotalText.length);
      var highWidth = graphic.textWidth(high);
      var middleWidth = graphic.textWidth(middle);
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0+5, '#FDEF01');
      graphic.drawText(middle, decoLeft + textWidth + maxWidth - investmentTotalWidth+highWidth, rowStart + rowHeight * 0+5, '#ff8f39');
      graphic.drawText(low, decoLeft + textWidth + maxWidth - investmentTotalWidth+highWidth+middleWidth, rowStart + rowHeight * 0+5, '#00B5FF');

   }else{    
      graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0+5, '#00B5FF');
   }
   graphic.drawText('小时峰值：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
   if(investmentMaxText.length>4){
      var high = investmentMaxText.substring(0, investmentMaxText.length - 9);
      var middle = investmentMaxText.substring(investmentMaxText.length - 9, investmentMaxText.length - 4);
      var low = investmentMaxText.substring(investmentMaxText.length - 4, investmentMaxText.length);
      var highWidth = graphic.textWidth(high);
      var middleWidth = graphic.textWidth(middle);      
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high,  decoLeft + textWidth + maxWidth - investmentMaxWidth, rowStart + rowHeight * 1 + 5, '#FDEF01');
      graphic.drawText(middle, decoLeft + textWidth + maxWidth - investmentMaxWidth+highWidth, rowStart + rowHeight * 1+5, '#ff8f39');
      graphic.drawText(low, decoLeft + textWidth + maxWidth - investmentMaxWidth+highWidth+middleWidth, rowStart + rowHeight * 1 + 5, '#00B5FF');

   }else{  
      graphic.drawText(investmentMaxText, decoLeft + textWidth + maxWidth - investmentMaxWidth, rowStart + rowHeight * 1 + 5, '#00B5FF');
   }

   graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 5, '#00CFFF');

   if(investmentAvgText.length>4){

      var high = investmentAvgText.substring(0, investmentAvgText.length - 9);
      var middle = investmentAvgText.substring(investmentAvgText.length - 9, investmentAvgText.length - 4);
      var low = investmentAvgText.substring(investmentAvgText.length - 4, investmentAvgText.length);
      var highWidth = graphic.textWidth(high);
      var middleWidth = graphic.textWidth(middle);            
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high,   decoLeft + textWidth + maxWidth - investmentAvgWidth, rowStart + rowHeight * 2 + 5, '#FDEF01');
      graphic.drawText(middle, decoLeft + textWidth + maxWidth - investmentAvgWidth+highWidth, rowStart + rowHeight * 2+5, '#ff8f39');      
      graphic.drawText(low,  decoLeft + textWidth + maxWidth - investmentAvgWidth+highWidth+middleWidth, rowStart + rowHeight * 2 + 5, '#00B5FF');

   }else{  
      graphic.drawText('小时均值：', decoLeft, rowStart + rowHeight * 2 + 5, '#00CFFF');
      graphic.drawText(investmentAvgText, decoLeft + textWidth + maxWidth - investmentAvgWidth, rowStart + rowHeight * 2 + 5, '#00B5FF');
   }

   var weekInvestmentTotal = MO.Lang.Float.unitFormat(trendInfo.weekInvestmentTotal(), 0, 0, 2, 0, 10000, '万');
   var weekInvestmentWidth = graphic.textWidth(weekInvestmentTotal);
   graphic.drawText('本周总值：', decoLeft, rowStart + rowHeight * 3 + 5, '#00CFFF');
   if(weekInvestmentTotal.length>4){
      var high = weekInvestmentTotal.substring(0, weekInvestmentTotal.length - 9);
      var middle = weekInvestmentTotal.substring(weekInvestmentTotal.length - 9, weekInvestmentTotal.length - 4);   
      var low = weekInvestmentTotal.substring(weekInvestmentTotal.length - 4, weekInvestmentTotal.length);
      var highWidth = graphic.textWidth(high);
      var middleWidth = graphic.textWidth(middle);            
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high,   decoLeft + textWidth + maxWidth - weekInvestmentWidth, rowStart + rowHeight * 3 + 5, '#FDEF01');
      graphic.drawText(middle, decoLeft + textWidth + maxWidth - weekInvestmentWidth+highWidth, rowStart + rowHeight * 3+5, '#ff8f39');      
      graphic.drawText(low,  decoLeft + textWidth + maxWidth - weekInvestmentWidth+highWidth+middleWidth, rowStart + rowHeight * 3 + 5, '#00B5FF');

   }else{  
      graphic.drawText(weekInvestmentTotal, decoLeft + textWidth + maxWidth - weekInvestmentWidth, rowStart + rowHeight * 3 + 5, '#00B5FF');
   }
   var monthInvestmentTotal = MO.Lang.Float.unitFormat(trendInfo.monthInvestmentTotal(), 0, 0, 2, 0, 10000, '万');
   var monthInvestmentWidth = graphic.textWidth(monthInvestmentTotal);
   graphic.drawText('本月总额：', decoLeft, rowStart + rowHeight * 4+ 5, '#00CFFF');
   if(monthInvestmentTotal.length>4){
      var high = monthInvestmentTotal.substring(0, monthInvestmentTotal.length - 9);
      var low = monthInvestmentTotal.substring(monthInvestmentTotal.length - 4, monthInvestmentTotal.length);
      var middle = monthInvestmentTotal.substring(investmentTotalText.length - 9, investmentTotalText.length - 4);   
      var highWidth = graphic.textWidth(high);
      var middleWidth = graphic.textWidth(middle);            
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high,   decoLeft + textWidth + maxWidth - monthInvestmentWidth, rowStart + rowHeight * 4 + 5, '#FDEF01');
      graphic.drawText(middle, decoLeft + textWidth + maxWidth - monthInvestmentWidth+highWidth, rowStart + rowHeight * 4+5, '#ff8f39');            
      graphic.drawText(low,  decoLeft + textWidth + maxWidth - monthInvestmentWidth+highWidth+middleWidth, rowStart + rowHeight * 4 + 5, '#00B5FF');

   }else{                                                                                     
      graphic.drawText(monthInvestmentTotal, decoLeft + textWidth + maxWidth - monthInvestmentWidth, rowStart + rowHeight * 4 + 5, '#00B5FF');
   }


   // 设置时间
   startTime.date.setTime(bakTime);
   startTime.refresh();

   var text;
   var drawText = false;
   var textWidth = 0;
   graphic.setFont('bold 18px Microsoft YaHei');
   var middle = bottom - 50;
   while (!startTime.isAfter(endTime)) {
      var span = startTime.date.getTime() - bakTime;
      var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:MI');
      startTime.addHour(1);
      startTime.truncHour();
      drawText = !drawText;
      if (drawText) {
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   graphic.drawLine(dataRight, middle - o.degreeLineHeight(), dataRight, middle, '#FFFFFF', 1);
   var endText = endTime.format('HH24:MI');
   // if (endText != text) {
   //    textWidth = graphic.textWidth(endText);
   //    graphic.drawText(endText, dataRight - textWidth / 2, middle + 40, '#59FDE9');
   // },
   o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');

   startTime.date.setTime(bakTime);
   startTime.refresh();
}