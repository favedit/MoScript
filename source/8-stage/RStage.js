//==========================================================
// <T>舞台管理器。</T>
//
// @author maocy
// @history 141231
//==========================================================
var RStage = new function RStage(){
   var o = this;
   //..........................................................
   // @attribute
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   //..........................................................
   // @event
   o.onProcess = RStage_onProcess;
   //..........................................................
   // @method
   o.construct = RStage_construct;
   o.process   = RStage_process;
   o.start     = RStage_start;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//==========================================================
function RStage_onProcess(){
   RStage.process();
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}

//==========================================================
// <T>启动处理。</T>
//==========================================================
function RStage_process(){
   var o = this;
   o.lsnsEnterFrame.process(o);
   o.lsnsLeaveFrame.process(o);
}

//==========================================================
// <T>启动处理。</T>
//==========================================================
function RStage_start(v){
   var o = this;
   if(v == null){
      v = 100;
   }
   RStage.process();
   setInterval('RStage_onProcess()', v);
}
