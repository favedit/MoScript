//==========================================================
// <T>事件控制台。</T>
//
// @console
// @author maocy
// @version 150120
//==========================================================
function FEventConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = EScope.Local;
   // @attribute
   o._thread    = null;
   o._interval  = 10;
   // @attribute
   o._allow     = true;
   o._allows    = new TAttributes();
   o._events    = new TObjects();
   o._listeners = new TAttributes();
   //..........................................................
   // @event
   o.onProcess  = FEventConsole_onProcess;
   //..........................................................
   // @method
   o.construct  = FEventConsole_construct;
   // method
   o.register   = FEventConsole_register;
   o.push       = FEventConsole_push;
   o.clear      = FEventConsole_clear;

   //o.add        = FEventConsole_add;
   //o.allowEvent = FEventConsole_allowEvent;
   //o.skipEvent  = FEventConsole_skipEvent;
   //o.allowAll   = FEventConsole_allowAll;
   //o.skipAll    = FEventConsole_skipAll;
   //o.onlyCall   = FEventConsole_onlyCall;
   // method
   return o;
}

//==========================================================
// <T>事件处理。</T>
// <P>处理事件时，每处理一个事件，将当前位置的事件设置为空。</P>
// <P>循环检查事件队列，如果都为空的情况下，才退出。</P>
// <P>防止事件队列运行中，有新的事件被插入却没有被执行到。</P>
//
// @method
//==========================================================
function FEventConsole_onProcess(){
   var o = this;
   var es = o._events;
   var ec = es.count();
   if(ec > 0){
      //var sp = new TSpeed(o, 'Process events (count={1})', es.count);
      while(true){
         var has = false;
         // 执行每一个事件
         for(var n = 0; n < ec; n++){
            var e = es.get(n);
            // 如果事件存在的情况下，进行事件处理
            if(e){
               has = true;
               e.process();
               // 如果有监听器监听这个事件的话，相应监听器处理
               var ls = o._listeners.get(RMethod.name(e));
               if(ls){
                  ls.process(e);
               }
               // 执行事件后，将当前位置设置为空
               es.set(n, null)
            }
         }
         // 检查队列中是否为空
         if(!has){
            break;
         }
      }
      //sp.record();
      // 清除运行队列
      es.clear();
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.lsnsProcess.register(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
   RLogger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
}

//==========================================================
// <T>注册一个事件到事件列表。</T>
//
// @method
// @param po:owner:Object 对象
// @param pc:process:Function 处理
//==========================================================
function FEventConsole_register(po, pc){
   this._events.push(new TEvent(po, null, pc));
}

//==========================================================
// <T>添加一个事件到事件服务组件的事件链表里。</T>
//
// @method
// @param e:event:SEvent 事件对象
//==========================================================
function FEventConsole_push(e){
   var o = this;
   var n = RClass.name(e)
   if(o._allow){
      var a = true;
      if(o._allows.contains(n)){
         a = RBoolean.isTrue(o._allows.get(n));
      }
      if(a){
         var es = o._events;
         var c = es.count();
         for(var i = 0; i < c; i++){
            if(es.get(n) == e){
               es.set(n, null);
            }
         }
         es.push(e);
      }
   }
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
function FEventConsole_clear(){
   this._events.clear();
}




function FEventConsole_add(owner, proc){
   this._events.push(new TEvent(owner, null, proc));
}
function FEventConsole_allowEvent(c){
   this._allows.set(RMethod.name(c), EBool.True);
}
// ------------------------------------------------------------
function FEventConsole_skipEvent(c){
   this._allows.set(RMethod.name(c), EBool.False);
}
// ------------------------------------------------------------
function FEventConsole_allowAll(){
   this._allow = true;
}
// ------------------------------------------------------------
function FEventConsole_skipAll(){
   this._allow = false;
}
// ------------------------------------------------------------
// control, method
function FEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}