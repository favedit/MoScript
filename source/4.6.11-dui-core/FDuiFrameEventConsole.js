//==========================================================
// <T>事件控制台。</T>
//
// @console
// @author maocy
// @version 150120
//==========================================================
MO.FDuiFrameEventConsole = function FDuiFrameEventConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd   = MO.EScope.Local;
   // @attribute
   o._thread    = null;
   o._interval  = 20;
   // @attribute
   o._allow     = true;
   o._allows    = new MO.TAttributes();
   o._events    = new MO.TObjects();
   o._listeners = new MO.TAttributes();
   //..........................................................
   // @event
   o.onProcess  = MO.FDuiFrameEventConsole_onProcess;
   //..........................................................
   // @method
   o.construct  = MO.FDuiFrameEventConsole_construct;
   // method
   o.register   = MO.FDuiFrameEventConsole_register;
   o.push       = MO.FDuiFrameEventConsole_push;
   o.clear      = MO.FDuiFrameEventConsole_clear;



   //o.add        = FDuiFrameEventConsole_add;
   //o.allowEvent = FDuiFrameEventConsole_allowEvent;
   //o.skipEvent  = FDuiFrameEventConsole_skipEvent;
   //o.allowAll   = FDuiFrameEventConsole_allowAll;
   //o.skipAll    = FDuiFrameEventConsole_skipAll;
   //o.onlyCall   = FDuiFrameEventConsole_onlyCall;
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
MO.FDuiFrameEventConsole_onProcess = function FDuiFrameEventConsole_onProcess(){
   var o = this;
   // 检查是否为空
   var events = o._events;
   if(events.isEmpty()){
      return;
   }
   // 循环执行是防止事件中产生新事件处理
   while(true){
      var processed = false;
      // 执行每一个事件
      var eventCount = events.count();
      for(var i = 0; i < eventCount; i++){
         var event = events.at(i);
         // 如果事件存在的情况下，进行事件处理
         if(event){
            processed = true;
            // 事件处理
            event.process();
            // 如果有监听器监听这个事件的话，相应监听器处理
            var className = MO.Method.name(event);
            var listeners = o._listeners.get(className);
            if(listeners){
               listeners.process(event);
            }
            // 执行事件后，将当前位置设置为空
            events.set(i, null)
         }
      }
      // 检查队列中是否为空
      if(!processed){
         break;
      }
   }
   // 清除运行队列
   events.clear();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiFrameEventConsole_construct = function FDuiFrameEventConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建线程
   var t = o._thread = MO.Class.create(MO.FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(t);
   MO.Logger.debug(o, 'Add event thread. (thread={1})', MO.Class.dump(t));
}

//==========================================================
// <T>注册一个事件到事件列表。</T>
//
// @method
// @param po:owner:Object 对象
// @param pc:process:Function 处理
//==========================================================
MO.FDuiFrameEventConsole_register = function FDuiFrameEventConsole_register(po, pc){
   this._events.push(new MO.TEvent(po, null, pc));
}

//==========================================================
// <T>添加一个事件到事件服务组件的事件链表里。</T>
//
// @method
// @param e:event:SEvent 事件对象
//==========================================================
MO.FDuiFrameEventConsole_push = function FDuiFrameEventConsole_push(e){
   var o = this;
   var n = MO.Class.name(e)
   if(o._allow){
      var a = true;
      if(o._allows.contains(n)){
         a = MO.Lang.Boolean.isTrue(o._allows.get(n));
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
MO.FDuiFrameEventConsole_clear = function FDuiFrameEventConsole_clear(){
   this._events.clear();
}




MO.FDuiFrameEventConsole_add = function FDuiFrameEventConsole_add(owner, proc){
   this._events.push(new MO.TEvent(owner, null, proc));
}
MO.FDuiFrameEventConsole_allowEvent = function FDuiFrameEventConsole_allowEvent(c){
   this._allows.set(MO.Method.name(c), EBool.True);
}
// ------------------------------------------------------------
MO.FDuiFrameEventConsole_skipEvent = function FDuiFrameEventConsole_skipEvent(c){
   this._allows.set(MO.Method.name(c), EBool.False);
}
// ------------------------------------------------------------
MO.FDuiFrameEventConsole_allowAll = function FDuiFrameEventConsole_allowAll(){
   this._allow = true;
}
// ------------------------------------------------------------
MO.FDuiFrameEventConsole_skipAll = function FDuiFrameEventConsole_skipAll(){
   this._allow = false;
}
// ------------------------------------------------------------
// control, method
MO.FDuiFrameEventConsole_onlyCall = function FDuiFrameEventConsole_onlyCall(c, m){
   var o = this;
   o._allow = false;
   m.call(c);
   o._allow = true;
}
