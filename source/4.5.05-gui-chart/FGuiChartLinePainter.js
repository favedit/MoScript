//==========================================================
// <T>界面图表。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FGuiChartLinePainter = function FGuiChartLinePainter(o) {
   o = MO.Class.inherits(this, o, MO.FGuiChartPainter);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FGuiChartLinePainter_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FGuiChartLinePainter_construct;
   // @method
   o.drawAxis     = MO.FGuiChartLinePainter_drawAxis;
   o.drawLine     = MO.FGuiChartLinePainter_drawLine;
   o.drawTitle    = MO.FGuiChartLinePainter_drawTitle;
   o.draw         = MO.FGuiChartLinePainter_draw;
   // @method
   o.dispose      = MO.FGuiChartLinePainter_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChartLinePainter_construct = function FGuiChartLinePainter_construct() {
   var o = this;
   o.__base.FGuiChartPainter.construct.call(o);
}

//==========================================================
// <T>绘制title。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartLinePainter_drawTitle = function FGuiChartLinePainter_drawTitle(context) {
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var dataset = context.dataset;
   var paintRectangle = context.paintRectangle;
   var axisX = context.axisX;
   var axisY = context.axisY;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var pLeft = left + paintRectangle.left;
   var pTop = top + paintRectangle.top;
   var pWidth = paintRectangle.width;
   var pHeight = paintRectangle.height;
   var title = context.title;
   if(title == null || title == "") return;
   var titleFont = context.titleFont;
   var titleGap = context.titleGap;
   var titleWidth = graphic.textWidth(title);
   graphic.setFont(titleFont);
   graphic.drawText(title, pLeft + pWidth / 2 - titleWidth / 2, pTop - titleFont.size - titleGap, titleFont.color);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartLinePainter_drawAxis = function FGuiChartLinePainter_drawAxis(context){
   var o = this;
   // 绘制处理
   var graphic = context.graphic;
   var dataset = context.dataset;
   var rectangle = context.rectangle;
   var paintRectangle = context.paintRectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var pLeft = left + paintRectangle.left;
   var pTop = top + paintRectangle.top;
   var pWidth = paintRectangle.width;
   var pHeight = paintRectangle.height;
   //graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   //绘制坐标轴
   var xAxis = context.axisX;
   var yAxis = context.axisY;
   var xDegrees = xAxis.degrees();
   var yDegrees = yAxis.degrees();
   var yCorCount = yAxis.degrees().count();
   var xCorCount = xAxis.degrees().count();
   if(yCorCount == 0 || xCorCount == 0) return;
   var stepHeight = pHeight / (yCorCount - 1);
   var stepWidth = pWidth / (xCorCount - 1);
   var yGap = yAxis.degreeLabelGap();
   var xGap = xAxis.degreeLabelGap();
   var yFont = yAxis.font();
   var xFont = xAxis.font();
   var xShowFirstLine = xAxis.optionShowFirstLine();
   var yShowFirstLine = yAxis.optionShowFirstLine();
   var xLabelVertical = xAxis.optionLabelVertical();
   //绘制Y轴
   for( var i = 0; i < yCorCount; ++i) {
      var y = pTop + pHeight - stepHeight * i;
      var degree = yDegrees.get(i);
      var label = degree.label();
      var lineWidth = degree.lineWidth() == null ? yAxis.lineWidth() : degree.lineWidth();
      var lineColor = degree.lineColor() == null ? yAxis.lineColor() : degree.lineColor();
      //绘制刻度线
      if(yAxis.optionShowAxis() || (yShowFirstLine && i == 0)) {
         graphic.beginPath();
         graphic.moveTo(pLeft, y);
         graphic.lineTo(pLeft + pWidth, y);
         graphic.drawShape(lineWidth, lineColor);
      }
      //绘制刻度
      if(yAxis.optionShowLabel()) {
         graphic.setFont(yFont.toString());
         var textWidth = graphic.textWidth(label);
         graphic.drawText(label, pLeft - yGap - textWidth, y, yFont.color);
      }
   }
   //绘制Y轴单位
   var yLabel = yAxis.label();
   var yLabelFont = yAxis.labelFont();
   if(yLabel && yLabel != "") { 
      graphic.drawText(yLabel, pLeft, pTop - yLabelFont.size / 2, yLabelFont.color);
   }
   // 绘制X轴
   for( var i = 0; i < xCorCount; ++i) {
      var x = pLeft + stepWidth * i;
      var degree = xDegrees.get(i);
      var label = degree.label();
      var lineWidth = degree.lineWidth() == null ? xAxis.lineWidth() : degree.lineWidth();
      var lineColor = degree.lineColor() == null ? xAxis.lineColor() : degree.lineColor();
      //绘制刻度线
      if(xAxis.optionShowAxis() || (xShowFirstLine && i == 0)) {
         graphic.beginPath();
         graphic.moveTo(x, pTop);
         graphic.lineTo(x, pTop + pHeight);
         graphic.drawShape(lineWidth, lineColor);
      }
      //绘制刻度
      if(xAxis.optionShowLabel()) {
         var x = pLeft + stepWidth * i;
         var textWidth = graphic.textWidth(label);
         if(xLabelVertical) {
            graphic.drawTextVertical(label, x - xFont.size / 2, pTop + pHeight + xGap + xFont.size, xFont);
         }else {
            graphic.drawText(label, x - textWidth / 2, pTop + pHeight + xGap + xFont.size, xFont.color);
         }
      }
   }
   //绘制X轴单位
   var xLabel = xAxis.label();
   var xLabelFont = xAxis.labelFont();
   if(xLabel && xLabel != "") { 
      graphic.drawText(xLabel, pLeft + pWidth, pTop + pHeight, xLabelFont.color);
   }
}

//==========================================================
// <T>绘制单线处理。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartLinePainter_drawLine = function FGuiChartLinePainter_drawLine(context, series){
   var o = this;
   var graphic = context.graphic;
   var dataset = context.dataset;
   var rectangle = context.rectangle;
   var paintRectangle = context.paintRectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var pLeft = left + paintRectangle.left;
   var pTop = top + paintRectangle.top;
   var pWidth = paintRectangle.width;
   var pHeight = paintRectangle.height;
   var yAxis = context.axisY;
   var xAxis = context.axisX;
   var yDegrees = yAxis.degrees();
   var xDegrees = xAxis.degrees();
   var yCount = yDegrees.count();
   var xCount = xDegrees.count();
   if(xCount == 0 || yCount == 0) return;
   var maxValue = yDegrees.get(yCount - 1).value();
   var minValue = yDegrees.get(0).value();

   var lineColor = series.lineColor();
   var lineWidth = series.lineWidth();
   //graphic.drawRectangle(pLeft, pTop, pWidth, pHeight);
   graphic.beginPath();
   graphic.setLineJoin("round");
   // 计算步宽
   var values = series.values();
   var optionShowDot = series.optionShowDot();
   var dotSize = series.dotSize();
   var dotColor = series.dotColor();
   var count = values.count();
   var stepWidth = pWidth / (xCount - 1);
   var stepHeight = pHeight / (maxValue - minValue);
   for(var n = 0; n < count; ++n){
      var value = values.at(n);
      var x = pLeft + stepWidth * n;
      var y = pTop + (maxValue - value) * stepHeight;
      if(n == 0){
         graphic.moveTo(x, y);
      }else{
         graphic.lineTo(x, y);
      }
   }
   graphic.drawShape(lineWidth, lineColor);
   //画点
   if(optionShowDot) {
      for( var n = 0; n < count; ++n) {
         var value = values.at(n);
         var x = pLeft + stepWidth * n;
         var y = pTop + (maxValue - value) * stepHeight;
         graphic.drawCircle(x, y, dotSize, 1, dotColor, dotColor);
      }
   }
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartLinePainter_draw = function FGuiChartLinePainter_draw(context){
   var o = this;
   o.__base.FGuiChartPainter.draw.call(o);
   var dataset = context.dataset;
   //绘制title
   o.drawTitle(context);
   // 绘制坐标轴
   o.drawAxis(context);
   // 绘制数据线
   if(dataset){
      var serieses = dataset.serieses();
      var seriesCount = serieses.count();
      for(var i = 0; i < seriesCount; i++){
         var series = serieses.at(i);
         o.drawLine(context, series);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiChartLinePainter_dispose = function FGuiChartLinePainter_dispose() {
   var o = this;
   // 父处理
   o.__base.FGuiChartPainter.dispose.call(o);
}
