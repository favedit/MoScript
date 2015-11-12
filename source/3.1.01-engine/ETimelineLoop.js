//===========================================================
// <T>时间线循环枚举。</T>
//
// @enum
// @author maocy
// @version 151112
//===========================================================
MO.ETimelineLoop = new function ETimelineLoop(){
   var o = this;
   // @attribute 播放
   o.Play       = 'play';
   // @attribute 循环播放
   o.Loop       = 'loop';
   // @attribute 循环往复播放
   o.LoopRevert = 'loop.revert';
   return o;
}
