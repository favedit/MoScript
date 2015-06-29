//==========================================================
// <T>计时类。</T>
//
// @tool
// @param interval:Integer 毫秒间隔
// @author maocy
// @version 150529
//==========================================================
MO.TTicker = function TTicker(interval){
   var o = this;
   //..........................................................
   // @attribute String 代码
   o.interval = interval;
   o.lastTick = 0;
   //..........................................................
   // @method
   o.process  = MO.TTicker_process;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @return Boolean 是否处理
//==========================================================
MO.TTicker_process = function TTicker_process(){
   var o = this;
   var tick = MO.Timer.current();
   var span = tick - o.lastTick;
   if(span > o.interval){
      o.lastTick = tick;
      return true;
   }
   return false;
}
