//==========================================================
// <T>单段三次贝塞尔曲线。</T>
//
// @struct
//==========================================================
MO.SBezierCurve = function SBezierCurve(){
   var o                   = this;
   //..........................................................
   // @attribute
   o.startPoint            = null;
   o.endPoint              = null;
   o.scp                   = null;
   o.ecp                   = null;
   // @attribute
   o.__ax                  = 0;
   o.__bx                  = 0;
   o.__cx                  = 0;
   o.__ay                  = 0;
   o.__by                  = 0;
   o.__cy                  = 0;
   //..........................................................
   // @method
   o.calcCoefficient       = MO.SBezierCurve_calcCoefficient;
   o.pointAt               = MO.SBezierCurve_pointAt;
   o.tangentAt             = MO.SBezierCurve_tangentAt;
   o.assign                = MO.SBezierCurve_assign;
   o.dispose               = MO.SBezierCurve_dispose;
   return o;
}

//===========================================================
// <T>计算多项式系数。<T>
//
// @method
//===========================================================
MO.SBezierCurve_calcCoefficient = function SBezierCurve_calcCoefficient() {
   var o = this;
   var cp0 = o.startPoint;
   var cp1 = o.scp;
   var cp2 = o.ecp;
   var cp3 = o.endPoint;
   
   var cx = 3.0 * (cp1.x - cp0.x);
   var bx = 3.0 * (cp2.x - cp1.x) - cx;
   var ax = cp3.x - cp0.x - cx - bx;

   var cy = 3.0 * (cp1.y - cp0.y);
   var by = 3.0 * (cp2.y - cp1.y) - cy;
   var ay = cp3.y - cp0.y - cy - by;

   o.__cx = cx;
   o.__bx = bx;
   o.__ax = ax;

   o.__cy = cy;
   o.__by = by;
   o.__ay = ay;
}

//===========================================================
// <T>计算百分比位置的点值。<T>
//
// @method
//===========================================================
MO.SBezierCurve_pointAt = function SBezierCurve_pointAt(t, result) {
   var o = this;

   var tSquared = t * t;
   var tCubed = tSquared * t;

   result.x = (o.__ax * tCubed) + (o.__bx * tSquared) + (o.__cx * t) + o.startPoint.x;
   result.y = (o.__ay * tCubed) + (o.__by * tSquared) + (o.__cy * t) + o.startPoint.y;
}

//===========================================================
// <T>计算百分比位置的切线。<T>
//
// @method
//===========================================================
MO.SBezierCurve_tangentAt = function SBezierCurve_tangentAt(t, sPoint, ePoint) {
   var o = this;

   var cp0 = o.startPoint;
   var cp1 = o.scp;
   var cp2 = o.ecp;
   var cp3 = o.endPoint;

   sPoint.x = cp0.x + (cp1.x - cp0.x) * t;
   sPoint.y = cp0.y + (cp1.y - cp0.y) * t;

   ePoint.x = cp2.x + (cp3.x - cp2.x) * t;
   ePoint.y = cp2.y + (cp3.y - cp2.y) * t;
}

//===========================================================
// <T>拷贝值。<T>
//
// @method
//===========================================================
MO.SBezierCurve_assign = function SBezierCurve_assign(s) {
   var o = this;
   o.startPoint.assign(s.startPoint);
   o.endPoint.assign(s.endPoint);
   o.scp.assign(s.scp);
   o.ecp.assign(s.ecp);
   o.calcCoefficient();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SBezierCurve_dispose = function SBezierCurve_dispose(){
   var o = this;
   // 释放属性
   o.startPoint = MO.Lang.Object.dispose(o.startPoint);
   o.endPoint = MO.Lang.Object.dispose(o.endPoint);
   o.scp = MO.Lang.Object.dispose(o.scp);
   o.ecp = MO.Lang.Object.dispose(o.ecp);
}
