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
   o.__base.FGuiChartPainter.draw.call(o);
   // 绘制处理
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   // 绘制坐标轴
   // 绘制数据线
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context 内容
//==========================================================
MO.FGuiChartLinePainter_drawLine = function FGuiChartLinePainter_drawLine(context, series){
   var o = this;
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   graphic.beginPath();
   // 计算步宽
   var values = series.values();
   var count = values.count();
   var width = width - 80;
   var height = dataheigt;
   var stepWidth = width / count;
   var stepHeight = dataheigt / maxValue;
   for(var n = 0; n < count; n++){
      var day = values.at(n);
      var x = left + stepWidth * n;
      var y = top + height - stepHeight * day[code] + 35;
      if(n == 0){
         graphic.moveTo(x, y);
      }else{
         if(day[code]!=0)
         graphic.lineTo(x, y);
      }
   }
   graphic.drawShape(lineWidth, color);
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
   // 绘制处理
   var graphic = context.graphic;
   var rectangle = context.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
   // 绘制坐标轴
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
