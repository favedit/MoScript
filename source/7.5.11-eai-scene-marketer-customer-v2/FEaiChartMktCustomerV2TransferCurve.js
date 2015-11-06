//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FEaiChartMktCustomerV2TransferCurve = function FEaiChartMktCustomerV2TransferCurve(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGuiSize);
   //..........................................................
   // @attribute
   o._curveStyle     = MO.Class.register(o, new MO.AGetSet('_curveStyle'));
   // @attribute
   o._curveData      = MO.Class.register(o, new MO.AGetSet('_curveData'));

   o._arcLevel       = 1;

   o._startTick      = 0;
   o._drawPoint      = null;
   o._sTangentPoint  = null;
   o._eTangentPoint  = null;
   o._tangentVector  = null;
   //..........................................................
   // @method
   o.construct       = MO.FEaiChartMktCustomerV2TransferCurve_construct;
   // @method
   o.setup           = MO.FEaiChartMktCustomerV2TransferCurve_setup;
   o.draw            = MO.FEaiChartMktCustomerV2TransferCurve_draw;
   // @method
   o.dispose         = MO.FEaiChartMktCustomerV2TransferCurve_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TransferCurve_construct = function FEaiChartMktCustomerV2TransferCurve_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
   // 设置变量
   o._drawPoint = new MO.SPoint2(0, 0);
   o._sTangentPoint = new MO.SPoint2(0, 0);
   o._eTangentPoint = new MO.SPoint2(0, 0);
   o._stPoint3 = new MO.SPoint3(0, 0, 0);
   o._etPoint3 = new MO.SPoint3(0, 0, 0);
   o._tangentVector = new MO.SVector3(0, 0, 0);
   o._curveStyle = new MO.SGuiTransferCurveStyle();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TransferCurve_setup = function FEaiChartMktCustomerV2TransferCurve_setup(startX, startY, endX, endY) {
   var o = this;

   var startPoint = new MO.SPoint2(startX, startY);
   var endPoint = new MO.SPoint2(endX, endY);

   var distX = (endPoint.x - startPoint.x) * 0.5;
   var distY = (endPoint.y - startPoint.y) * 0.5;
   var cpXC = (startPoint.x + endPoint.x) * 0.5;
   var cpYC = (startPoint.y + endPoint.y) * 0.5;
   var cpX1;
   var cpX2;
   var cpY1;
   var cpY2;
   var style = o._curveStyle;
   switch (style.arcDirection) {
      case MO.EGuiArcDirection.Left:
         cpXC -= style.arcStepHeight * o._arcLevel;
         cpX1 = cpX2 = cpXC;
         cpY1 = cpY2 = cpYC;
         cpY1 -= distY * style.arcAngle;
         cpY2 += distY * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Top:
         cpYC -= style.arcStepHeight * o._arcLevel;
         cpY1 = cpY2 = cpYC;
         cpX1 = cpX2 = cpXC;
         cpX1 -= distX * style.arcAngle;
         cpX2 += distX * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Right:
         cpXC += style.arcStepHeight * o._arcLevel;
         cpX1 = cpX2 = cpXC;
         cpY1 = cpY2 = cpYC;
         cpY1 -= distY * style.arcAngle;
         cpY2 += distY * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Bottom:
         cpYC += style.arcStepHeight * o._arcLevel;
         cpY1 = cpY2 = cpYC;
         cpX1 = cpX2 = cpXC;
         cpX1 -= distX * style.arcAngle;
         cpX2 += distX * style.arcAngle;
         break;
      case MO.EGuiArcDirection.Liner:
      default:
         break;
   }

   var curveData = o._curveData = new MO.SBezierCurve();
   curveData.startPoint = startPoint;
   curveData.endPoint = endPoint;
   curveData.scp = new MO.SPoint2(cpX1, cpY1);
   curveData.ecp = new MO.SPoint2(cpX2, cpY2);
   curveData.calcCoefficient();

   o._startTick = MO.Timer.current();
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TransferCurve_draw = function FEaiChartMktCustomerV2TransferCurve_draw(context) {
   var o = this;

   //if (!o._data) {
   //   return;
   //}

   var graphic = context.graphic;
   var style = o._curveStyle; 

   var curveData = o._curveData;
   var startPoint = curveData.startPoint;
   var endPoint = curveData.endPoint;
   var scp = curveData.scp;
   var ecp = curveData.ecp;
   // 绘制底曲线
   //graphic.clear();
   graphic._handle.beginPath();
   graphic._handle.moveTo(startPoint.x, startPoint.y);
   graphic._handle.bezierCurveTo(scp.x, scp.y, ecp.x, ecp.y, endPoint.x, endPoint.y);
   graphic._handle.lineWidth = style.lineWidth;
   graphic._handle.strokeStyle = style.flarePointStyle;
   graphic._handle.stroke();
   // 绘制光点
   // 绘制光点
   var currentTick = MO.Timer.current() - o._startTick;
   var round = currentTick / style.flowPeriod;
   var t = round - parseInt(round);
   var drawPoint = o._drawPoint;
   curveData.pointAt(t, drawPoint);

   var pointFillStyle = graphic._handle.createLinearGradient(drawPoint.x, drawPoint.y, 0, drawPoint.x, drawPoint.y, 10);
   pointFillStyle.addColorStop("0", 'rgba(255, 0, 0, 1.0');
   pointFillStyle.addColorStop("1", 'rgba(255, 0, 0, 0');

   //graphic.drawCircle(drawPoint.x, drawPoint.y, 10, 0, '', pointFillStyle);

   var stPoint = o._sTangentPoint;
   var etPoint = o._eTangentPoint;
   curveData.tangentAt(t, stPoint, etPoint);

   var stPoint3 = o._stPoint3;
   var etPoint3 = o._etPoint3;
   stPoint3.set(stPoint.x, stPoint.y, 0);
   etPoint3.set(etPoint.x, etPoint.y, 0);

   var tangentVector = o._tangentVector.direction(stPoint3, etPoint3);
   tangentVector.normalize();

   var tailPoint = new MO.SPoint2();
   curveData.pointAt(t - 0.1, tailPoint);

   var flareFillStyle = graphic._handle.createLinearGradient(drawPoint.x, drawPoint.y, 0, tailPoint.x, tailPoint.y, 50);
   flareFillStyle.addColorStop("0", 'rgba(255, 156, 0, 1.0');
   flareFillStyle.addColorStop("1", 'rgba(251, 107, 0, 0');

   graphic._handle.save();
   graphic._handle.beginPath();
   graphic._handle.moveTo(startPoint.x - 2, startPoint.y);
   graphic._handle.bezierCurveTo(scp.x - 2, scp.y, ecp.x - 2, ecp.y, endPoint.x - 2, endPoint.y);
   graphic._handle.lineTo(endPoint.x + 2, endPoint.y);
   graphic._handle.bezierCurveTo(ecp.x + 2, ecp.y, scp.x + 2, scp.y, startPoint.x + 2, startPoint.y);
   //graphic._handle.lineTo(startPoint.x + 2, endPoint.y);
   graphic._handle.closePath();
   graphic._handle.clip();
   //graphic._handle.stroke();

   graphic.drawCircle(drawPoint.x, drawPoint.y, 50, 0, '', flareFillStyle);

   graphic._handle.restore();
 //graphic._handle.clearRect(startPoint.x,startPoint.y,1000,1000);
   //var hCenter = o.left() + o.width() / 2;
   //var vCenter = o.top() + o.height() / 2;

   //// 绘制背景圆圈
   //graphic.drawCircle(hCenter, vCenter, o._radius, o._lineWidth, o._strokeColor, o._backFillColor);
   //// 设置剪裁区
   //var handle = graphic._handle;
   //handle.save();
   //handle.beginPath();
   //handle.arc(hCenter, vCenter, o._radius, 0, 2 * Math.PI, false);
   //handle.clip();
   //// 绘制数值前景填充
   //var fillY = o.top() + o.height() * (1 - 0.618);
   //graphic.fillRectangle(o.left(), fillY, o.width(), o.height(), o._foreFillColor);
   //// 绘制外边框
   //graphic.drawCircle(hCenter, vCenter, o._radius, o._lineWidth, o._strokeColor, '');
   //handle.restore();

}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2TransferCurve_dispose = function FEaiChartMktCustomerV2TransferCurve_dispose(){
   var o = this;
   o._curveStyle = MO.Lang.Object.dispose(o._curveStyle);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
