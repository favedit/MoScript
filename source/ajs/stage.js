var RStage = new function RStage(){
   var o = this;
   o._active        = true;
   o._stages        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.onProcess      = RStage_onProcess;
   o.construct      = RStage_construct;
   o.register       = RStage_register;
   o.process        = RStage_process;
   o.start          = RStage_start;
   o.construct();
   return o;
}
function RStage_onProcess(){
   RStage.process();
}
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_register(n , s){
   var o = this;
   var ss = o._stages;
   if(ss == null){
      ss = o._stages = new TDictionary();
   }
   ss.set(n , s);
}
function RStage_process(){
   var o = this;
   if(o._active){
      o.lsnsEnterFrame.process(o);
      var ss = o._stages;
      if(ss != null){
         var sc = ss.count();
         for(var n = 0; n < sc; n++){
            ss.value(n).process();
         }
      }
      o.lsnsLeaveFrame.process(o);
   }
}
function RStage_start(v){
   var o = this;
   if(v == null){
      v = 100;
   }
   RStage.process();
   setInterval('RStage_onProcess()', v);
}
