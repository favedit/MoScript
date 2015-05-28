/**************************************************************
 * 活动线程的管理分发执行类
 *
 * @class extends FConsole
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FActiveConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope        = EScope.Page;
   o.active       = true;
   o.working      = false;
   o.interval     = 10;
   o.intervalId   = null;
   o.actives      = new TList();
   o.activeMemory = null;
   // Html
   o.hWindow      = null;
   // Event
   o.ohInterval   = FActiveConsole_ohInterval;
   // Event
   o.onMemory     = FActiveConsole_onMemory;
   // Method
   o.construct    = FActiveConsole_construct;
   o.push         = FActiveConsole_push;
   o.process      = FActiveConsole_process;
   o.processAll   = FActiveConsole_processAll;
   o.wait         = FActiveConsole_wait;
   o.release      = FActiveConsole_release;
   o.dispose      = FActiveConsole_dispose;
   return o;
}

var g_activeConsole = null;

function FActiveConsole_dispose(){
   var o = this;
   o.release();
   o.hWindow = null;
}
function FActiveConsole_onMemory(){
   RMemory.refresh();
}

/**************************************************************
 * 构造函数，使当前线程成为window的活动线程
 *
 * @method
 **************************************************************/
function FActiveConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   o.hWindow = window;
   g_activeConsole = o;
   // 创建内存刷新线程
   var a = o.activeMemory = new TActive(o, o.onMemory);
   a.interval = 10000;
   o.push(a);
   // 设置时钟
   o.intervalId = o.hWindow.setInterval(o.ohInterval, o.interval);
}

/**************************************************************
 * 把一个线程放到链表里，并给一个线程ID
 *
 * @method
 * @param a:active:TActive 要处理的线程
 * @see TList.sync
 * @see RString.lpad
 **************************************************************/
function FActiveConsole_push(a){
   if(a){
      var o = this;
      if(!o.actives.contains(a)){
         a.id = o.actives.push(a);
         a.name = 'T:' + RString.lpad(a.id, 4, '0');
      }
   }
}

/**************************************************************
 * 根据线程的状态来处理一个线程,
 *
 * @method
 * @param active:active:Object 要处理的线程
 * @see TList.removeItem
 **************************************************************/
function FActiveConsole_process(active){
   if(active){
      switch(active.status){
         case EActive.Sleep:
            break;
         case EActive.Active:
            active.process(this.interval);
            break;
         case EActive.Cancel:
            this.actives.removeItem(active);
            break;
      }
   }
}

/**************************************************************
 * 遍历处理所有线程,
 *
 * @method
 * @param active:active:Object 要处理的线程
 * @see FActiveConsole_process
 **************************************************************/
function FActiveConsole_processAll(){
   var o = this;
   if(o.active){
      o.working = true;
      var as = o.actives;
      //try{
         for(var n=0; n<as.count; n++){
            o.process(as.get(n));
         }
      //}catch(e){
         //o.active = false;
         //alert('Stop active console.');
         //throw e;
      //}
      o.working = false;
   }
}

/**************************************************************
 * 相应间隔回调处理函数
 *
 * @method
 * @see activeConsole.processAll
 **************************************************************/
function FActiveConsole_ohInterval(){
   var ac = g_activeConsole;
   if(ac && !ac.working){
      ac.processAll();
   }
}
// ------------------------------------------------------------
function FActiveConsole_wait(request){
   // while(request.status != EActive.Finish){}
}

/**************************************************************
 * 释放回调计数器
 *
 * @method
 * @see window.clearInterval
 **************************************************************/
function FActiveConsole_release(){
   if(this.hWindow && this.intervalId){
      this.hWindow.clearInterval(this.intervalId);
   }
}
