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
   o._active        = true;
   o._interval      = 1000 / 60;
   o._stages        = null;
   //..........................................................
   // @listener
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   //..........................................................
   // @event
   o.onProcess      = RStage_onProcess;
   //..........................................................
   // @method
   o.construct      = RStage_construct;
   o.register       = RStage_register;
   o.process        = RStage_process;
   o.start          = RStage_start;
   //..........................................................
   // @construct
   o.construct();
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function RStage_onProcess(){
   RStage.process();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}

//==========================================================
// <T>注册一个舞台。</T>
//
// @method
// @param n:name:String 名称
// @param s:stage:FStage 舞台
//==========================================================
function RStage_register(n , s){
   var o = this;
   var ss = o._stages;
   if(ss == null){
      ss = o._stages = new TDictionary();
   }
   ss.set(n , s);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function RStage_process(){
   var o = this;
   if(o._active){
      // 前处理
      o.lsnsEnterFrame.process(o);
      // 舞台处理
      var ss = o._stages;
      if(ss != null){
         var sc = ss.count();
         for(var n = 0; n < sc; n++){
            ss.value(n).process();
         }
      }
      // 后处理
      o.lsnsLeaveFrame.process(o);
      RTimer.update();
   }
}

//==========================================================
// <T>启动处理。</T>
//
// @method
//==========================================================
function RStage_start(v){
   var o = this;
   if(v == null){
      v = o._interval;
   }
   RTimer.setup();
   RStage.process();
   setInterval('RStage_onProcess()', v);
}
