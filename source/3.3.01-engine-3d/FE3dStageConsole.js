//==========================================================
// <T>场景控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
MO.FE3dStageConsole = function FE3dStageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Local;
   // @attribute
   o._looper   = null;
   // @attribute
   o._thread   = null;
   o._interval = 25;
   o._limit    = 8;
   //..........................................................
   // @event
   o.onProcess = MO.FE3dStageConsole_onProcess;
   //..........................................................
   // @method
   o.construct = MO.FE3dStageConsole_construct;
   o.process   = MO.FE3dStageConsole_process;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dStageConsole_onProcess = function FE3dStageConsole_onProcess(){
   var o = this;
   var looper = o._looper;
   looper.record();
   for(var i = o._limit - 1; i >= 0; i--){
      var renderable = looper.next();
      if(renderable){
         renderable.processDelay(renderable._linkRegion);
      }else{
         break;
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dStageConsole_construct = function FE3dStageConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._looper = new MO.TLooper();
   o._renderables = new MO.TDictionary();
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param region:FG3dRegion 区域
//==========================================================
MO.FE3dStageConsole_process = function FE3dStageConsole_process(region){
   var o = this;
   // 放入处理队列中
   var renderables = region.allRenderables();
   for(var i = renderables.count() - 1; i >= 0; i--){
      var renderable = renderables.at(i);
      if(!renderable._linkStageLooper){
         renderable._linkRegion = region;
         renderable._linkStageLooper = o._looper;
         o._looper.push(renderable);
      }
   }
}
