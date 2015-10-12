//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FGuiBubbleCanvas = function FGuiBubbleCanvas(o) {
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
   o.construct       = MO.FGuiBubbleCanvas_construct;
   // @method
   o.onPaintBegin    = MO.FGuiBubbleCanvas_onPaintBegin;

   o.setTenderUnits  = MO.FGuiBubbleCanvas_setTenderUnits;
   // @method
   o.dispose         = MO.FGuiBubbleCanvas_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiBubbleCanvas_construct = function FGuiBubbleCanvas_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 设置变量
   o._bubbles = new MO.TObjects();
   o._curves = new MO.TDictionary();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiBubbleCanvas_setTenderUnits = function FGuiBubbleCanvas_setTenderUnits(units) {
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
MO.FGuiBubbleCanvas_showTransferCurve = function FGuiBubbleCanvas_showTransferCurve(unit) {
   var o = this;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiBubbleCanvas_onPaintBegin = function FGuiBubbleCanvas_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   //if (!o._data) {
   //   return;
   //}

   var graphic = event.graphic;
   var rectangle = o._clientRectangle;

   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, 'red', 2);

   var hCenter = rectangle.left + rectangle.width / 2;
   var vCenter = rectangle.top + rectangle.height / 2;

   var bubbles = o._bubbles;
   var bubbleCount = bubbles.count();
   for (var i = 0; i < bubbleCount; i++) {
      var bubble = bubbles.at(i);
      bubble.draw(event);
   }

   var curves = o._curves;
   var curveCount = curves.count();
   for (var i = 0; i < curveCount; i++) {
      var curve = curves.at(i);
      curve.draw(event);
   }

   //graphic._handle.beginPath();
   //graphic._handle.moveTo(100, 100);
   //graphic._handle.bezierCurveTo(150, 50, 150, 150, 200, 100);
   //graphic._handle.lineWidth = "3";
   //graphic._handle.strokeStyle = "blue";
   //graphic._handle.stroke();
   
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiBubbleCanvas_dispose = function FGuiBubbleCanvas_dispose(){
   var o = this;
   o._bubbles = MO.Lang.Object.dispose(o._bubbles);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
