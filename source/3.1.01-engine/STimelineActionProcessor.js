//==========================================================
// <T>时间线命令。</T>
//
// @class
// @author maocy
// @history 151112
//==========================================================
MO.STimelineActionProcessor = function STimelineActionProcessor(){
   var o = this;
   //..........................................................
   // @attribute
   o.loopCd    = null;
   o.loopCount = null;
   // @attribute
   o.action    = null;
   //..........................................................
   // @method
   o.stop      = MO.STimelineActionProcessor_stop;
   o.clear     = MO.STimelineActionProcessor_clear;
   return o;
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.STimelineActionProcessor_stop = function STimelineActionProcessor_stop(){
   var o = this;
   o.action.stop();
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.STimelineActionProcessor_clear = function STimelineActionProcessor_clear(){
   var o = this;
   o.loopCd = null;
   o.loopCount = null;
   o.action = null;
}
