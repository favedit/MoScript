//==========================================================
// <T>线程控制台。</T>
//
// @console
// @author maocy
// @version 150105
//==========================================================
function FThreadConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd     = EScope.Local;
   o._active      = true;
   o._interval    = 5;
   o._threads     = null;
   //..........................................................
   // @html
   o._hWindow     = null;
   o._hIntervalId = null;
   //..........................................................
   // @event
   o.ohInterval   = FThreadConsole_ohInterval;
   //..........................................................
   // @method
   o.construct    = FThreadConsole_construct;
   o.push         = FThreadConsole_push;
   o.start        = FThreadConsole_start;
   o.process      = FThreadConsole_process;
   o.processAll   = FThreadConsole_processAll;
   o.dispose      = FThreadConsole_dispose;
   return o;
}

//==========================================================
// <T>间隔回调处理。</T>
//
// @method
//==========================================================
function FThreadConsole_ohInterval(){
   var c = RConsole.get(FThreadConsole);
   c.processAll();
}

//==========================================================
// <T>增加一个新线程。</T>
//
// @method
// @param p:thread:FThread 线程
//==========================================================
function FThreadConsole_push(p){
   this._threads.push(p);
}

//==========================================================
// <T>启动一个新线程。</T>
//
// @method
// @param p:thread:FThread 线程
//==========================================================
function FThreadConsole_start(p){
   p.start();
   this._threads.push(p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FThreadConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._threads = new TObjects();
   o._hWindow = window;
   // 设置时钟
   o._hIntervalId = o._hWindow.setInterval(o.ohInterval, o._interval);
}

//==========================================================
// <T>处理一个线程,。</T>
//
// @method
// @param p:thread:FThread 线程
//==========================================================
function FThreadConsole_process(p){
   var o = this;
   if(p){
      switch(p.statusCd()){
         case EThreadStatus.Sleep:
            break;
         case EThreadStatus.Active:
            p.process(o._interval);
            break;
         case EThreadStatus.Finish:
            p.dispose();
            o._threads.remove(p);
            break;
      }
   }
}

//==========================================================
// <T>处理所有线程,。</T>
//
// @method
//==========================================================
function FThreadConsole_processAll(){
   var o = this;
   if(o._active){
      var ts = o._threads;
      var c = ts.count();
      for(var n = 0; n < c; n++){
         var t = ts.get(n);
         o.process(t);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FThreadConsole_dispose(){
   var o = this;
   var hw = o._hWindow;
   if(hw){
      var hi = o._hIntervalId;
      if(hi){
         hw.clearInterval(hi);
         o._hIntervalId = null;
      }
      o._hWindow = null;
   }
}
