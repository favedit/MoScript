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
   o._ready          = MO.Class.register(o, new MO.AGetter('_ready'), false);
   o._tenderUnits    = MO.Class.register(o, new MO.AGetter('_tenderUnits'));
   o._curveDict      = null;
   o._segmentLooper   = null;
   o._pCodeDrawYMap  = null;
   o._curveStyle     = null;
   o._curveDisplayDuration = 10000;
   //..........................................................
   // @method
   o.construct       = MO.FEaiChartMktCustomerV2CurvesCanvas_construct;
   // @method
   o.onPaintBegin    = MO.FEaiChartMktCustomerV2CurvesCanvas_onPaintBegin;
   o.oeUpdate        = MO.FEaiChartMktCustomerV2CurvesCanvas_oeUpdate;
   o.testAnimating   = MO.FEaiChartMktCustomerV2CurvesCanvas_testAnimating;
   // @method
   o.setTenderUnits  = MO.FEaiChartMktCustomerV2CurvesCanvas_setTenderUnits;
   o.pushUnit        = MO.FEaiChartMktCustomerV2CurvesCanvas_pushUnit;
   // @method
   o.dispose         = MO.FEaiChartMktCustomerV2CurvesCanvas_dispose;
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
   o._curveDict = new MO.TDictionary();
   o._segmentLooper = new MO.TLooper();
   o._pCodeDrawYMap = new MO.TMap();
   o._curveStyle = new MO.SEaiChartMktCustomerV2TransferCurveStyle();
}

//==========================================================
// <T>检查是否有动画在进行中。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_testAnimating = function FEaiChartMktCustomerV2CurvesCanvas_testAnimating() {
   var o = this;
   var segmentLooper = o._segmentLooper;
   segmentLooper.record();
   while (segmentLooper.next()) {
      if (segmentLooper.current().finished()) {
         segmentLooper.removeCurrent();
      }
   }
   if (segmentLooper.count() > 0) {
      o.dirty();
      return;
   }

   var curveDict = o._curveDict;
   var count = curveDict.count();
   for (var i = 0; i < count; i++) {
      var curve = curveDict.valueAt(i);
      if (curve.isActive()) {
         o.dirty();
         return;
      }
   }
}

//==========================================================
// <T>检查是否有动画在进行中。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_oeUpdate = function FEaiChartMktCustomerV2CurvesCanvas_oeUpdate() {
   var o = this;
   o.testAnimating();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_setTenderUnits = function FEaiChartMktCustomerV2CurvesCanvas_setTenderUnits(units) {
   var o = this;
   o._tenderUnits = units;
   var count = units.count();
   var pCodeDrawYMap = o._pCodeDrawYMap;
   if (!o._ready) {
      for (var i = 0; i < count; i++) {
         var unit = units.at(i);
         pCodeDrawYMap.set(unit.code(), 50 + (75 + 20) * i);
      }
      o._ready = true;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_pushUnit = function FEaiChartMktCustomerV2CurvesCanvas_pushUnit(unit) {
   var o = this;
   if (unit == undefined || unit == null) {
      return;
   }
   var currentPCode = unit.modelCode();
   var previousPCode = unit.modelPriorCode();
   var drawYMap = o._pCodeDrawYMap;
   var startY = drawYMap.get(previousPCode, 0);
   var endY = drawYMap.get(currentPCode, 500);

   var clientRectangle = o.clientRectangle();
   // 创建投向线
   var segment = MO.Class.create(MO.FEaiChartMktCustomerV2TenderSegment);
   segment.setup(unit.calculateX - clientRectangle.left, unit.calculateY - clientRectangle.top, 0, endY);
   //segment.setup(clientRectangle.width, 170, 0, endY);
   o._segmentLooper.push(segment);
   // 创建迁移曲线
   if (currentPCode == previousPCode || currentPCode == null || previousPCode == null || currentPCode == undefined || previousPCode == undefined) {
      return;
   }
   if (currentPCode.length > 0 && previousPCode.length > 0) {
      var curveDict = o._curveDict;
      var key = currentPCode + currentPCode;
      var curve = curveDict.get(key, null);
      if (curve == null) {
         curve = MO.Class.create(MO.FEaiChartMktCustomerV2TransferCurve);
         curve.setCurveStyle(o._curveStyle);
         curve.setup(0, startY, 0, endY);
         curveDict.set(key, curve);
      }
      else {
         curve.startTick = MO.Timer.current();
      }
      curve.setIsActive(true);
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2CurvesCanvas_onPaintBegin = function FEaiChartMktCustomerV2CurvesCanvas_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);

   var graphic = event.graphic;
   var rectangle = event.rectangle;

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

   var curveDict = o._curveDict;
   var count = curveDict.count();
   var currentTick = MO.Timer.current();
   var curveDisplayDuration = o._curveDisplayDuration;
   for (var i = 0; i < count; i++) {
      var curve = curveDict.valueAt(i);
      if (currentTick - curve._startTick <= curveDisplayDuration) {
         curve.draw(event);
      }
   }

   var segmentLooper = o._segmentLooper;
   segmentLooper.record();
   while (segmentLooper.next() != null) {
      var segment = segmentLooper.current();
      segment.draw(event);
   }
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
