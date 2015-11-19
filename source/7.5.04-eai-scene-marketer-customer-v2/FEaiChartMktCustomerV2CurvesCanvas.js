//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas = function FEaiChartMktCustomerV2CurvesCanvas(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._gap            = MO.Class.register(o, new MO.AGetter('_gap'), 20);
   // @attribute
   o._ready          = MO.Class.register(o, new MO.AGetter('_ready'), false);
   o._tenderUnits    = MO.Class.register(o, new MO.AGetter('_tenderUnits'), false);
   o._bubbles        = MO.Class.register(o, new MO.AGetSet('_bubbles'));
   o._curves         = MO.Class.register(o, new MO.AGetter('_curves'));
   //..........................................................
   // @method
   o.construct       = MO.FEaiChartMktCustomerV2CurvesCanvas_construct;
   // @method
   o.onPaintBegin    = MO.FEaiChartMktCustomerV2CurvesCanvas_onPaintBegin;

   o.setTenderUnits  = MO.FEaiChartMktCustomerV2CurvesCanvas_setTenderUnits;
   // @method
   o.dispose         = MO.FEaiChartMktCustomerV2CurvesCanvas_dispose;
   o._sx             = MO.Class.register(o, new MO.AGetter('_sx'), 600);
   o._sy             = MO.Class.register(o, new MO.AGetter('_sy'), 200);
   o._ex             = MO.Class.register(o, new MO.AGetter('_ex'), 500);
   o._ey             = MO.Class.register(o, new MO.AGetter('_ey'), 700);
   o.__backgroundPadding = MO.Class.register(o, new MO.AGetter('__backgroundPadding'));
   _backgroundImage = null;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_construct = function FEaiChartMktCustomerV2CurvesCanvas_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 设置变量
   o._bubbles = new MO.TObjects();
   o._curves = new MO.TObjects();
   o._curve = MO.Class.create(MO.FEaiChartMktCustomerV2TransferCurve);
   o._backgroundPadding = new MO.SPadding(20, 20, 20, 20);
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/doughnutbg.png');
    this.dirty();
   //o._curve.setup(600,1000,500,500);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_setTenderUnits = function FEaiChartMktCustomerV2CurvesCanvas_setTenderUnits(units) {
   var o = this;
   o._tenderUnits = units;
   if (!_ready) {
      // TODO: 创建bubbles
   }

   //var bubbles = o._bubbles;
   //var count = bubbles.count();
   //for (var i = 0; i < count; i++) {
   //   var bubble = bubbles.at(i);
   //   bubble.setUnit(units.at(i));
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_showTransferCurve = function FEaiChartMktCustomerV2CurvesCanvas_showTransferCurve(unit) {
   var o = this;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_onPaintBegin = function FEaiChartMktCustomerV2CurvesCanvas_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   //if (!o._data) {
   //   return;
   //}
   var graphic = event.graphic;
   var rectangle = o._clientRectangle;

   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   //graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, 'red', 2);

   var hCenter = rectangle.left + rectangle.width / 2;
   var vCenter = rectangle.top + rectangle.height / 2;
  // graphic.drawGridImage(o._backgroundImage, left, top+50, width, height-50, o._backgroundPadding);


   // var bubbles = o._bubbles;
   // var bubbleCount = bubbles.count();
   // for (var i = 0; i < bubbleCount; i++) {
   //    var bubble = bubbles.at(i);
   //    bubble.draw(event);
   // // }

   // var curves = o._curves;
   // // o._curve.setup(o._sx,o._sy,o._ex,o._ey);

   //  var sx = 0;
   //  var sy = 0;
   //  var ex = 0;
   //  var ey = 0;

   // //o._curve.setup(sx,sy,ex,ey);
   // var curves = o._curves;
   // var curveCount = curves.count();
   // for (var i = 0; i < curveCount; i++) {
   //    var curve = curves.at(i);
   //    sx = curve._sx;
   //    sy = curve._sy;
   //    ex = curve._ex;
   //    ey = curve._ey;
   //    curve.setup(sx,sy,ex,ey);
   //    curve.draw(event);

   // }

}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_dispose = function FEaiChartMktCustomerV2CurvesCanvas_dispose(){
   var o = this;
   o._bubbles = MO.Lang.Object.dispose(o._bubbles);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
