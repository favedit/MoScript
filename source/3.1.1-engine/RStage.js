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
   o._interval      = 1000 / 40;
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
   o.active         = RStage_active;
   o.deactive       = RStage_deactive;
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
// <T>激活处理。</T>
//
// @method
//==========================================================
function RStage_active(){
   var o = this;
   var ss = o._stages;
   if(ss != null){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         ss.value(i).active();
      }
   }
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function RStage_deactive(){
   var o = this;
   var ss = o._stages;
   if(ss != null){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         ss.value(i).deactive();
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function RStage_process(){
   var o = this;
   if(o._active){
      try{
         // 前处理
         o.lsnsEnterFrame.process(o);
         // 舞台处理
         var s = o._stages;
         if(s){
            var c = s.count();
            for(var i = 0; i < c; i++){
               s.valueAt(i).process();
            }
         }
         // 后处理
         o.lsnsLeaveFrame.process(o);
         RTimer.update();
      }catch(e){
         alert(e);
      }
   }
}

//==========================================================
// <T>启动处理。</T>
//
// @method
//==========================================================
function RStage_start(v){
   var o = this;
   // 引擎配置
   RE3dEngine.setup();
   // 激活舞台
   o.active();
   // 舞台处理
   o.process();
   // 启动时间处理
   if(v == null){
      v = o._interval;
   }
   RTimer.setup();
   setInterval('RStage_onProcess()', parseInt(v));
}
