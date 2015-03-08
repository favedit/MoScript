//==========================================================
// <T>场景控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3dStageConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd     = EScope.Local;
   // @attribute
   o._looper      = null;
   o._renderables = null;
   // @attribute
   o._thread      = null;
   o._interval    = 50;
   o._limit       = 16;
   //..........................................................
   // @event
   o.onProcess   = FE3dStageConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = FE3dStageConsole_construct;
   o.process     = FE3dStageConsole_process;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dStageConsole_onProcess(){
   var o = this;
   var s = o._looper;
   s.record();
   for(var i = o._limit - 1; i >= 0; i--){
      var r = s.next();
      if(r){
         r.processDelay();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dStageConsole_construct(){
   var o = this;
   // 设置属性
   o._looper = new TLooper();
   o._renderables = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dStageConsole_process(p){
   var o = this;
}
