//==========================================================
// <T>渲染立方体。</T>
//
// BeginPoint           Text Unit            EndPoint
//  o──────────────────────o
//  │TickInterval│        │        │         │BothLength
//  │          TickLength                       │BothColor
//              TickColor
//
//
// @class
// @author maocy
// @history 150509
//==========================================================
MO.SE3dRulerPrecision = function SE3dRulerPrecision(o){
   var o = this;
   //..........................................................
   o.interval = 1;
   o.length   = 0.5;
   o.color    = new MO.SColor4(255, 255, 255, 255);
   return o;
}

//==========================================================
// <T>接收信息。</T>
//
// @method
// @param ruler:SE3dRulerPrecision 信息
//==========================================================
MO.SE3dRulerPrecision_assign = function SE3dRulerPrecision_assign(info){
   var o = this;
   o.interval.assign(info.interval);
   o.color.assign(info.color);
}
