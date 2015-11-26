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
   var maxValue = dataset.standardMax();
   var minValue = dataset.standardMin();
   var corNumber = dataset.standardCorCount();
   var xDivide = dataset.xDivide();
   var xLabels = dataset.xLabels();
   var xLableCount = xLabels.length;
   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   //绘制坐标轴
   var stepHeight = pHeight / corNumber;
   var stepYValue = ((maxValue - minValue) / corNumber).toFixed();
   var stepWidth = pWidth / (xLableCount - 1);
   //绘制Y轴刻度线
   if(dataset.optionDrawAxisY()) {
      for( var i = 0; i <= corNumber; ++i) {
         var y = pTop + stepHeight * i;
         var value = maxValue - stepYValue * i;
         graphic.beginPath();
         graphic.moveTo(pLeft, y);
         graphic.lineTo(pLeft + pWidth, y);
         if (value == 0) {
            graphic.drawShape(2, '#edfc2d');
         }else {
            graphic.drawShape(1, '#697293');
         }
      }
   }
   //绘制Y轴刻度
   if(dataset.optionDrawAxisLabelY()) {
   
   }
   //绘制X轴刻度线
   if(dataset.optionDrawAxisY) {
      
   }
   //绘制X轴刻度
   if(dataset.optionDrawAxisLabelX()) {
   
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
   var maxValue = dataset.standardMax();
   var minValue = dataset.standardMin();
   var corNumber = dataset.standardCorCount();
   var xDivide = dataset.xDivide();

   var lineColor = series.lineColor();
   var lineWidth = series.lineWidth();
   //graphic.drawRectangle(pLeft, pTop, pWidth, pHeight);
   graphic.beginPath();
   // 计算步宽
   var values = series.values();
   var count = values.count();
   var stepWidth = pWidth / (xDivide - 1);
   var stepHeight = pHeight / (maxValue - minValue);
   for(var n = 0; n < count; n++){
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
   graphic.endPath();
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
   if(dataset.standarded == false) return;
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
