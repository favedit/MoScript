var RStage = new function RStage(){
   var o = this;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.onProcess = RStage_onProcess;
   o.construct = RStage_construct;
   o.process   = RStage_process;
   o.start     = RStage_start;
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
function RStage_process(){
   var o = this;
   o.lsnsEnterFrame.process(o);
   o.lsnsLeaveFrame.process(o);
}
function RStage_start(v){
   var o = this;
   if(v == null){
      v = 100;
   }
   RStage.process();
   setInterval('RStage_onProcess()', v);
}
