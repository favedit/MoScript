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
   o._startPoint           = null;
   o._endPoint             = null;
   // @attribute
   o._segmentLength        = MO.Class.register(o, new MO.AGetSet('_segmentLength'), 100);
   // @attribute
   o._startTick            = MO.Class.register(o, new MO.AGetSet('_startTick'));
   o._duration             = MO.Class.register(o, new MO.AGetSet('_duration'), 5000);
   o._finished             = MO.Class.register(o, new MO.AGetSet('_finished'), false);
   //..........................................................
   // @method
   o.construct = MO.FEaiChartMktCustomerV2TenderSegment_construct;
   // @method
   o.setup = MO.FEaiChartMktCustomerV2TenderSegment_setup;
   o.draw = MO.FEaiChartMktCustomerV2TenderSegment_draw;
   // @method
   o.dispose = MO.FEaiChartMktCustomerV2TenderSegment_dispose;
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
MO.FEaiChartMktCustomerV2TenderSegment_setup = function FEaiChartMktCustomerV2TenderSegment_setup(startX, startY, endX, endY) {
   var o = this;

   o._startPoint = new MO.SPoint2(startX, startY);
   o._endPoint = new MO.SPoint2(endX, endY);
   o._startTick = MO.Timer.current();
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
   var lengthX = segmentLength * (endX - startX) / ((endX - startX) + (endY - startY));
   var lengthY = segmentLength * (endY - startY) / ((endX - startX) + (endY - startY));

   var gradient = graphic._handle.createLinearGradient(drawX, drawY, drawX + lengthX, drawY + lengthY);
   gradient.addColorStop('0', 'rgba(0,198,237,' + opcity + ')');
   gradient.addColorStop('1.0', 'rgba(0,198,237,0.0)');
   graphic.drawLine(drawX, drawY, drawX + lengthX, drawY + lengthY, gradient, 4);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TenderSegment_dispose = function FEaiChartMktCustomerV2TenderSegment_dispose() {
   var o = this;
   o._curveStyle = MO.Lang.Object.dispose(o._curveStyle);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
