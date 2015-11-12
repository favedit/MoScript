//==========================================================
// <T>时间线环境。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.STimelineContext = function STimelineContext(){
   var o = this;
   //..........................................................
   // @attribute
   o.mainTimeline = null;
   o.timeline     = null;
   o.action       = null;
   //..........................................................
   // @attribute 主时间轴开始到现在的时刻
   o.tick         = null;
   // @attribute 当前对象开始到现在的时刻
   o.currentTick  = null;
   // @attribute 当前帧执行的间隔
   o.frameSpan    = null;
   return o;
}
