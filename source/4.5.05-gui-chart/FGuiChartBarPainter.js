//==========================================================
// <T>界面图表。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FGuiChartBarPainter = function FGuiChartBarPainter(o) {
   o = MO.Class.inherits(this, o, MO.FGuiChartPainter);
   //..........................................................
   // @event
   o.onPaintBegin  = MO.FGuiChartBarPainter_onPaintBegin;
   //..........................................................
   // @method
   o.construct     = MO.FGuiChartBarPainter_construct;
   // @method
   o.draw          = MO.FGuiChartBarPainter_draw;
   o.drawAxis      = MO.FGuiChartBarPainter_drawAxis;
   o.drawLine      = MO.FGuiChartBarPainter_drawLine;
   o.drawTitle     = MO.FGuiChartBarPainter_drawTitle;
   // @method
   o.dispose       = MO.FGuiChartBarPainter_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChartBarPainter_construct = function FGuiChartBarPainter_construct() {
   var o = this;
   o.__base.FGuiChartPainter.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartBarPainter_draw = function FGuiChartBarPainter_draw(context){
   var o = this;
   o.__base.FGuiChartPainter.draw.call(o);
   var dataset = context.dataset;
   //绘制标题
   o.drawTitle(context);
   //绘制坐标轴
   o.drawAxis(context);
   //绘制数据
   if(dataset) {
      var serieses = dataset.serieses();
      var seriesCount = serieses.count();
      for(var i = 0; i < seriesCount; ++i) {
         var series = serieses.at(i);
         o.drawLine(context, series);
      }
   }
}

//==========================================================
// <T>绘制title。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartBarPainter_drawTitle = function FGuiChartBarPainter_drawTitle(context) {
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
// <T>绘制坐标轴。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartBarPainter_drawAxis = function FGuiChartBarPainter_drawAxis(context) {
   var o = this;
   //绘制处理
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
   //graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   var pLeft = left + paintRectangle.left;
   var pTop = top + paintRectangle.top;
   var pWidth = paintRectangle.width;
   var pHeight = paintRectangle.height;
   var xDegrees = axisX.degrees();
   var yDegrees = axisY.degrees();
   var xCount = xDegrees.count();
   var yCount = yDegrees.count();
   if(xCount == 0 || yCount == 0) return;
   var stepHeight = pHeight / (yCount - 1);
   var stepWidth = pWidth / (xCount + 1);
   var yGap = axisY.degreeLabelGap();
   var xGap = axisX.degreeLabelGap();
   var xFont = axisX.font();
   var yFont = axisY.font();
   var xShowFirstLine = axisX.optionShowFirstLine();
   var yShowFirstLine = axisY.optionShowFirstLine();
   var xLabelVertical = axisX.optionLabelVertical();
   //绘制Y轴
   for( var i = 0; i < yCount; ++i) {
      var y = pTop + pHeight - stepHeight * i;
      var degree = yDegrees.get(i);
      var label = degree.label();
      var lineWidth = degree.lineWidth() == null ? axisY.lineWidth() : degree.lineWidth();
      var lineColor = degree.lineColor() == null ? axisY.lineColor() : degree.lineColor();
      //绘制刻度线
      if(axisY.optionShowAxis() || (yShowFirstLine && i == 0)) {
         graphic.beginPath();
         graphic.moveTo(pLeft, y);
         graphic.lineTo(pLeft + pWidth, y);
         graphic.drawShape(lineWidth, lineColor);
      }
      //绘制刻度
      if(axisY.optionShowLabel()) {
         graphic.setFont(yFont.toString());
         var textWidth = graphic.textWidth(label);
         graphic.drawText(label, pLeft - yGap - textWidth, y, yFont.color);
      }
   }
   //绘制Y轴单位
   var yLabel = axisY.label();
   var yLabelFont = axisY.labelFont();
   if(yLabel && yLabel != "") { 
      graphic.drawText(yLabel, pLeft, pTop - yLabelFont.size / 2, yLabelFont.color);
   }
   // 绘制X轴
   for( var i = 0; i <= xCount + 1; ++i) {
      var x = pLeft + stepWidth * i;
      if(i == 0 || i > xCount) {
         var lineWidth = axisX.lineWidth();
         var lineColor = axisX.lineColor();
      }else {
         var degree = xDegrees.get(i-1);
         var lineWidth = degree.lineWidth() == null ? axisX.lineWidth() : degree.lineWidth();
         var lineColor = degree.lineColor() == null ? axisX.lineColor() : degree.lineColor();
      }
      
      //绘制刻度线
      if(axisX.optionShowAxis() || (xShowFirstLine && i == 0)) {
         graphic.beginPath();
         graphic.moveTo(x, pTop);
         graphic.lineTo(x, pTop + pHeight);
         graphic.drawShape(lineWidth, lineColor);
      }
      //绘制刻度
      if(i > 0 && i <= xCount && axisX.optionShowLabel()) {
         var label = degree.label();
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
   var xLabel = axisX.label();
   var xLabelFont = axisX.labelFont();
   if(xLabel && xLabel != "") { 
      graphic.setFont(xLabelFont);
      graphic.drawText(xLabel, pLeft + pWidth, pTop + pHeight, xLabelFont.color);
   }
}

//==========================================================
// <T>绘制数据。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartBarPainter_drawLine = function FGuiChartBarPainter_drawLine(context, series) {
   var o = this;
   //绘制处理
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
   var xDegrees = axisX.degrees();
   var yDegrees = axisY.degrees();
   var xCount = xDegrees.count();
   var yCount = yDegrees.count();
   if(xCount == 0 || yCount == 0) return;
   var maxValue = yDegrees.get(yCount - 1).value();
   var minValue = yDegrees.get(0).value();
   var stepHeight = pHeight / (maxValue - minValue);
   var stepWidth = pWidth / (xCount + 1);
   //绘制
   var lineWidth = series.lineWidth();
   var lineColor = series.lineColor();
   var rectWidth = series.rectWidth();
   var fillColor = series.fillColor();
   var fillType = fillColor;
   var fillGradient = series.fillGradient();
   var optionShowBorder = series.optionShowBorder();
   var values = series.values();
   var valueCount = values.count();
   //生成渐变
   if(fillGradient != null) {
      var len = fillGradient.length;
      var gradient = graphic.createLinearGradient(0, pTop, 0, pHeight);
      for( var i = 0; i < len; ++i) {
         var array = fillGradient[i];
         gradient.addColorStop(array[0], array[1]);
      }
      fillType = gradient;
   }
   for(var i = 0; i < valueCount; ++i) {
      var value = values.at(i);
      var x = pLeft + stepWidth * (i+1) - rectWidth / 2;
      var y = pTop + (maxValue - value) * stepHeight;
      var h = value * stepHeight - 1;
      //绘制填充
      graphic.fillRectangle(x, y, rectWidth, h, fillType);
      //绘制边界
      if(optionShowBorder) {
         graphic.beginPath();
         graphic.moveTo(x, pTop + pHeight);
         graphic.lineTo(x, y);
         graphic.lineTo(x + rectWidth, y);
         graphic.lineTo(x + rectWidth, pTop + pHeight);
         graphic.drawShape(lineWidth, lineColor);
         graphic.endPath();
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiChartBarPainter_dispose = function FGuiChartBarPainter_dispose() {
   var o = this;
   // 父处理
   o.__base.FGuiChartPainter.dispose.call(o);
}
