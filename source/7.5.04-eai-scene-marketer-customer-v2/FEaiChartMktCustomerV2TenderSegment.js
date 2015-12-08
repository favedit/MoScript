//==========================================================
// <T>实时投资产品投向线。</T>
//
// @class
// @author sunpeng
// @history 151124
//==========================================================
MO.FEaiChartMktCustomerV2TenderSegment = function FEaiChartMktCustomerV2TenderSegment(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGuiSize);
   //..........................................................
   // @attribute
   o._unit              = MO.Class.register(o, new MO.AGetSet('_unit'));
   // @attribute
   o._startPoint        = null;
   o._endPoint          = null;
   o._segmentColorRed   = 0;
   o._segmentColorGreen = 0;
   o._segmentColorBlue  = 0;
   // @attribute
   o._segmentLength     = MO.Class.register(o, new MO.AGetSet('_segmentLength'), 200);
   // @attribute
   o._startTick         = MO.Class.register(o, new MO.AGetSet('_startTick'));
   o._duration          = MO.Class.register(o, new MO.AGetSet('_duration'), 5000);
   o._finished          = MO.Class.register(o, new MO.AGetSet('_finished'), false);
   //..........................................................
   // @method
   o.construct          = MO.FEaiChartMktCustomerV2TenderSegment_construct;
   // @method
   o.setup              = MO.FEaiChartMktCustomerV2TenderSegment_setup;
   o.draw               = MO.FEaiChartMktCustomerV2TenderSegment_draw;
   // @method
   o.dispose            = MO.FEaiChartMktCustomerV2TenderSegment_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TenderSegment_construct = function FEaiChartMktCustomerV2TenderSegment_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
   // 设置变量
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TenderSegment_setup = function FEaiChartMktCustomerV2TenderSegment_setup(startX, startY, endX, endY, color) {
   var o = this;
   var startPoint = o._startPoint;
   var endPoint = o._endPoint;
   if (!startPoint || !endPoint) {
      startPoint = o._startPoint = new MO.SPoint2(startX, startY);
      endPoint = o._endPoint = new MO.SPoint2(endX, endY);
   }
   else {
      startPoint.set(startX, startY);
      endPoint.set(endX, endY);
   }
   o._segmentColorRed = parseInt(255 * color.red);
   o._segmentColorGreen = parseInt(255 * color.green);
   o._segmentColorBlue = parseInt(255 * color.blue);
   o._startTick = MO.Timer.current();
   o._finished = false;
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TenderSegment_draw = function FEaiChartMktCustomerV2TenderSegment_draw(context) {
   var o = this;
   if (o._finished) {
      return;
   }

   var graphic = context.graphic;
   var rectangle = context.rectangle;

   var startPoint = o._startPoint;
   var endPoint = o._endPoint;

   var startX = rectangle.left + startPoint.x;
   var startY = rectangle.top + startPoint.y;
   var endX = rectangle.left + endPoint.x;
   var endY = rectangle.top + endPoint.y;

   var currentTick = MO.Timer.current() - o._startTick;
   var rate = currentTick / o._duration;
   var opcity = 1;
   if (rate > 1) {
      opcity = 1 - (rate - 1) * 20;
   }
   if (rate > 1.05) {
      o._finished = true;
   }

   var drawX = startX + (endX - startX) * rate;
   var drawY = startY + (endY - startY) * rate;

   var segmentLength = o._segmentLength;
   var lengthX = segmentLength * (startX - endX) / (Math.abs(endX - startX) + Math.abs(endY - startY));
   var lengthY = segmentLength * (startY - endY) / (Math.abs(endX - startX) + Math.abs(endY - startY));

   var drawToX = drawX + lengthX;
   var drawToY = drawY + lengthY;

   if(!o._unit.calculateColor){
      return;
   }
   var red = o._segmentColorRed;
   var green = o._segmentColorGreen;
   var blue = o._segmentColorBlue;
   var gradient = graphic._handle.createLinearGradient(drawX, drawY, drawToX, drawToY);
   gradient.addColorStop('0', 'rgba(' + red + ',' + green + ',' + blue + ',' + opcity + ')');
   gradient.addColorStop('1.0', 'rgba(' + red + ',' + green + ',' + blue + ',' + '0)');


   drawX = drawX < endX ? endX : drawX;
   drawToX = drawToX > startX ? startX : drawToX;
   if (startY > endY) {
      drawY = drawY < endY ? endY : drawY;
      drawToY = drawToY > startY ? startY : drawToY;
   }
   else {
      drawY = drawY > endY ? endY : drawY;
      drawToY = drawToY < startY ? startY : drawToY;
   }


   graphic.drawLine(drawX, drawY, drawToX, drawToY, gradient, 4);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TenderSegment_dispose = function FEaiChartMktCustomerV2TenderSegment_dispose() {
   var o = this;
   o._unit.calculateColor = null;
   o._unit = MO.Lang.Object.dispose(o._unit);
   o._startPoint = MO.Lang.Object.dispose(o._startPoint);
   o._endPoint = MO.Lang.Object.dispose(o._endPoint);
   // 父处理
   o.__base.MGuiSize.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
