//==========================================================
// <T>界面格子样式。</T>
//
// @struct
//==========================================================
MO.SEaiChartMktCustomerV2TransferCurveStyle = function SEaiChartMktCustomerV2TransferCurveStyle(){
   var o             = this;
   //..........................................................
   // @attribute
   o.lineWidth       = 5;
   o.pointFillStyle  = '#45adbd';
   o.flarePointStyle = '#16a6fd';
   o.arcStepHeight   = 200;
   o.arcDirection    = MO.EUiDock.Right;
   o.flowPeriod      = 2000;
   o.showDuration    = 10000;
   // 曲线开合的角度，由两控制点间的距离决定
   // 默认为1，两控制点距离与两端点相等
   // 为0时两控制点在中点重合变为2次贝塞尔曲线
   o.arcAngle        = 1;
   //..........................................................
   // @method
   o.assign          = MO.SEaiChartMktCustomerV2TransferCurveStyle_assign;
   o.dispose         = MO.SEaiChartMktCustomerV2TransferCurveStyle_dispose;
   return o;
}

//===========================================================
// <T>拷贝值。<T>
//
// @method
//===========================================================
MO.SEaiChartMktCustomerV2TransferCurveStyle_assign = function SEaiChartMktCustomerV2TransferCurveStyle_assign(s) {
   var o = this;
   o.lineWidth = s.lineWidth;
   o.flareColor = s.flareColor;
   o.lineColor = s.lineColor;
   o.arcStepHeight = s.arcStepHeight;
   o.arcDirection = s.arcDirection;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SEaiChartMktCustomerV2TransferCurveStyle_dispose = function SEaiChartMktCustomerV2TransferCurveStyle_dispose(){
   var o = this;
   // 释放属性
}
