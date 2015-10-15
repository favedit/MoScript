//==========================================================
// <T>线程控制台。</T>
//
// @console
// @author maocy
// @version 150105
//==========================================================
MO.FThreadConsole = function FThreadConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd     = MO.EScope.Global;
   // @attribute
   o._active      = true;
   o._requestFlag = false;
   o._interval    = 5;
   o._threads     = MO.Class.register(o, new MO.AGetter('_threads'));
   //..........................................................
   // @html
   o._hIntervalId = null;
   //..........................................................
   // @event
   o.ohInterval   = MO.FThreadConsole_ohInterval;
   //..........................................................
   // @method
   o.construct    = MO.FThreadConsole_construct;
   // @method
   o.push         = MO.FThreadConsole_push;
   o.start        = MO.FThreadConsole_start;
   o.process      = MO.FThreadConsole_process;
   o.processAll   = MO.FThreadConsole_processAll;
   // @method
   o.dispose      = MO.FThreadConsole_dispose;
   return o;
}

//==========================================================
// <T>间隔回调处理。</T>
//
// @method
//==========================================================
MO.FThreadConsole_ohInterval = function FThreadConsole_ohInterval(){
   var threadConsole = MO.Console.find(MO.FThreadConsole);
   // MO.Logger.debug(threadConsole, 'Frame start ----------------------------');
   threadConsole.processAll();
}

//==========================================================
// <T>增加一个新线程。</T>
//
// @method
// @param thread:FThread 线程
//==========================================================
MO.FThreadConsole_push = function FThreadConsole_push(thread){
   this._threads.push(thread);
}

//==========================================================
// <T>启动一个新线程。</T>
//
// @method
// @param thread:FThread 线程
//==========================================================
MO.FThreadConsole_start = function FThreadConsole_start(thread){
   thread.start();
   this._threads.push(thread);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FThreadConsole_construct = function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._threads = new MO.TObjects();
   // 设置回调
   //var flag = o._requestFlag = MO.Window.requestAnimationFrame(o.ohInterval);
   //if(!flag){
      o._hIntervalId = MO.Window.htmlWindow().setInterval(o.ohInterval, o._interval);
   //}
}

//==========================================================
// <T>处理一个线程,。</T>
//
// @method
// @param thread:FThread 线程
//==========================================================
MO.FThreadConsole_process = function FThreadConsole_process(thread){
   var o = this;
   if(thread){
      var statusCd = thread.statusCd();
      switch(statusCd){
         case MO.EThreadStatus.Sleep:
            break;
         case MO.EThreadStatus.Active:
            thread.process(o._interval);
            break;
         case MO.EThreadStatus.Finish:
            o._threads.remove(thread);
            thread.dispose();
            break;
      }
   }
}

//==========================================================
// <T>处理所有线程,。</T>
//
// @method
//==========================================================
MO.FThreadConsole_processAll = function FThreadConsole_processAll(){
   var o = this;
   // 激活处理
   if(o._active){
      var threads = o._threads;
      var count = threads.count();
      try{
         for(var i = 0; i < count; i++){
            var thread = threads.at(i);
            o.process(thread);
         }
      }catch(error){
         MO.Logger.fatal(o, error, 'Thread process failure. (thread_count={1})', count);
      }
   }
   // 安装下一帧处理
   if(o._requestFlag){
      MO.Window.requestAnimationFrame(o.ohInterval);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FThreadConsole_dispose = function FThreadConsole_dispose(){
   var o = this;
   // 释放属性
   if(o._requestFlag){
      MO.Window.cancelRequestAnimationFrame(o.ohInterval);
   }else{
      var hIntervalId = o._hIntervalId;
      if(hIntervalId){
         MO.Window.htmlWindow().clearInterval(hIntervalId);
         o._hIntervalId = null;
      }
   }
   o._threads = MO.Lang.Object.dispose(o._threads);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
