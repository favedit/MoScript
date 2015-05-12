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
function SE3dRulerStyle(o){
   var o = this;
   //..........................................................
   o.lineColor    = new SColor4(255, 255, 255, 255);
   // @attribute
   o.bothLength   = 0.5;
   o.bothColor    = new SColor4(255, 255, 255, 255);
   // @attribute
   o.tickInterval = 1;
   o.tickLength   = 0.3;
   o.tickColor    = new SColor4(255, 255, 255, 255);
   // @attribute
   o.precisions   = new TObjects();
   //..........................................................
   // @method
   o.assign       = SE3dRulerStyle_assign;
   return o;
}

//==========================================================
// <T>接收信息。</T>
//
// @method
// @param ruler:SE3dRulerStyle 信息
//==========================================================
function SE3dRulerStyle_assign(info){
   var o = this;
   o.lineColor.assign(info.lineColor);
   o.bothLength = info.bothLength;
   o.bothColor.assign(info.lineColor);
   o.tickInterval = info.tickInterval;
   o.tickLength = info.tickLength;
   o.tickColor.assign(info.lineColor);
   o.precisions.assign(info.precisions);
}
