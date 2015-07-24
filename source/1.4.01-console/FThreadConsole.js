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
   o._scopeCd     = MO.EScope.Local;
   o._active      = true;
   o._interval    = 5;
   o._threads     = MO.Class.register(o, new MO.AGetter('_threads'));
   //..........................................................
   // @html
   o._hWindow     = null;
   o._hIntervalId = null;
   //..........................................................
   // @event
   o.onInterval   = MO.FThreadConsole_onInterval;
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
MO.FThreadConsole_onInterval = function FThreadConsole_onInterval(){
   this.processAll();
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
   o._hWindow = window;
   // 设置回调
   var method = o.onInterval.bind(o);
   if(!MO.Window.requestAnimationFrame(method)){
      o._hIntervalId = o._hWindow.setInterval(method, o._interval);
   }
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
   if(o._active){
      var threads = o._threads;
      var count = threads.count();
      for(var n = 0; n < count; n++){
         var thread = threads.at(n);
         o.process(thread);
      }
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
   var hWindow = o._hWindow;
   if(hWindow){
      var hIntervalId = o._hIntervalId;
      if(hIntervalId){
         hWindow.clearInterval(hIntervalId);
         o._hIntervalId = null;
      }else{
         MO.Window.cancelRequestAnimationFrame(o.onInterval);
      }
      o._hWindow = null;
   }
   o._threads = MO.Lang.Object.dispose(o._threads);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
