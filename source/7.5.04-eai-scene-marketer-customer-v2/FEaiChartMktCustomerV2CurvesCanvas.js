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
   o._ready                = MO.Class.register(o, new MO.AGetter('_ready'), false);
   o._tenderInfo           = MO.Class.register(o, new MO.AGetter('_tenderInfo'));
   o._ringDict             = null;
   o._curveDict            = null;
   o._segmentLooper        = null;
   o._segmentPool          = null;
   o._pCodeDrawYMap        = null;
   o._curveStyle           = null;
   o._curveDisplayDuration = 10000;
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartMktCustomerV2CurvesCanvas_construct;
   // @method
   o.onPaintBegin          = MO.FEaiChartMktCustomerV2CurvesCanvas_onPaintBegin;
   o.oeUpdate              = MO.FEaiChartMktCustomerV2CurvesCanvas_oeUpdate;
   o.testAnimating         = MO.FEaiChartMktCustomerV2CurvesCanvas_testAnimating;
   // @method
   o.updateTenderUnits     = MO.FEaiChartMktCustomerV2CurvesCanvas_updateTenderUnits;
   o.pushUnit              = MO.FEaiChartMktCustomerV2CurvesCanvas_pushUnit;
   // @method
   o.dispose               = MO.FEaiChartMktCustomerV2CurvesCanvas_dispose;
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
   o._tenderInfo = MO.Class.create(MO.FEaiLogicInfoTender);
   o._ringDict = new MO.TDictionary();
   o._curveDict = new MO.TDictionary();
   o._segmentLooper = new MO.TLooper();
   o._segmentPool = MO.Class.create(MO.FObjectPool);
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
   var currenSegment = null;
   var segmentLooper = o._segmentLooper;
   segmentLooper.record();
   while (segmentLooper.next()) {
      var currenSegment = segmentLooper.current();
      if (currenSegment.finished()) {
         var currenUnit = currenSegment.unit();
         var ring = o._ringDict.get(currenUnit.modelCode());
         var tenderUnit = ring.tenderUnit();
         tenderUnit._invesmentDay += currenUnit.investment();
         tenderUnit._invesmentTotal += currenUnit.investment();
         tenderUnit._tenderInvesment += currenUnit.investment();
         if (tenderUnit.tenderInvesment() > tenderUnit.tenderTotal()) {
            tenderUnit._tenderInvesment = tenderUnit.tenderTotal();
         }
         ring.setStartTick(MO.Timer.current());
         segmentLooper.removeCurrent();
         o._segmentPool.free(currenSegment);
         //currenSegment.dispose();
         //currenSegment = null;
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
MO.FEaiChartMktCustomerV2CurvesCanvas_updateTenderUnits = function FEaiChartMktCustomerV2CurvesCanvas_updateTenderUnits() {
   var o = this;
   var units = o._tenderInfo.units();
   var count = units.count();
   var ringDict = o._ringDict;
   var pCodeDrawYMap = o._pCodeDrawYMap;
   if (!o._ready) {
      for (var i = 0; i < count; i++) {
         var unit = units.at(i);
         var ring = MO.Class.create(MO.FEaiChartMktCustomerV2Ring);
         ring.setSize(200, 80);
         ring.setLocation(10, 10 + i * (80 + 15));
         ring.setTenderUnit(unit);
         ringDict.set(unit.code(), ring);
         o.push(ring);
         pCodeDrawYMap.set(unit.code(), 10 + i * (80 + 15) + ring.outerRadius());
      }
      o._ready = true;
   }
   else {
      for (var i = 0; i < count; i++) {
         var unit = units.at(i);
         var ring = ringDict.valueAt(i);
         ring.updateTenderUnit(unit);
      }
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
   var startY = drawYMap.get(previousPCode, null);
   var endY = drawYMap.get(currentPCode, null);

   if (!endY) {
      return;
   }

   var clientRectangle = o.clientRectangle();
   // 创建投向线
   var segment = null;
   var segmentPool = o._segmentPool;
   if (segmentPool.hasFree()) {
      segment = segmentPool.alloc();
   } else {
      segment = MO.Class.create(MO.FEaiChartMktCustomerV2TenderSegment);
   }
   segment.setup(unit.calculateX - clientRectangle.left, unit.calculateY - clientRectangle.top, 200, endY, unit.calculateColor);
   segment.setUnit(unit);
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
   o._ringArray = MO.Lang.Object.dispose(o._ringArray);
   o._curveDict = MO.Lang.Object.dispose(o._curveDict);
   o._segmentLooper = MO.Lang.Object.dispose(o._segmentLooper);
   o._pCodeDrawYMap = MO.Lang.Object.dispose(o._pCodeDrawYMap);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
