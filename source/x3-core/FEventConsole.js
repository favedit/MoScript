/**************************************************************
 * 后台事件服务线程组件
 *
 * @console
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FEventConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope      = EScope.Page;
   o.active     = null;
   o.allow      = true;
   o.allows     = new TMap();
   o.events     = new TList();
   o.listeners  = new TMap();
   // Method
   o.construct  = FEventConsole_construct;
   o.register   = FEventConsole_register;
   o.process    = FEventConsole_process;
   o.add        = FEventConsole_add;
   o.push       = FEventConsole_push;
   o.allowEvent = FEventConsole_allowEvent;
   o.skipEvent  = FEventConsole_skipEvent;
   o.allowAll   = FEventConsole_allowAll;
   o.skipAll    = FEventConsole_skipAll;
   o.onlyCall   = FEventConsole_onlyCall;
   o.clear      = FEventConsole_clear;
   return o;
}

/**************************************************************
 * 事件线程的构造函数，进行初始化操作
 *
 * @method
 **************************************************************/
function FEventConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   o.active = new TActive(o, o.process);
   o.active.interval = 1;
   RConsole.find(FActiveConsole).push(o.active);
   RLogger.debug(o, 'Add event active (active={0})', RClass.dump(o.active));
}

/**************************************************************
 * 处理事件服务线程组件的服务
 *
 * @method
 * @param o:object:Object 对象类型
 * @return String 对象类名称字符串
 **************************************************************/
function FEventConsole_register(owner, proc){
   this.events.push(new TEvent(owner, null, proc));
}
/**************************************************************
 * 处理事件服务线程组件的服务
 * 处理事件时，每处理一个事件，将当前位置的事件设置为空。
 * 循环检查事件队列，如果都为空的情况下，才退出。
 * 防止事件队列运行中，有新的事件被插入却没有被执行到。
 *
 * @method
 **************************************************************/
function FEventConsole_process(){
   var o = this;
   var es = o.events;
   if(es.count){
      var sp = new TSpeed(o, 'Process events (count={0})', es.count);
      while(true){
         var has = false;
         // 执行每一个事件
         for(var n=0; n<es.count; n++){
            var e = es.get(n);
            // 如果事件存在的情况下，进行事件处理
            if(e){
               has = true;
               e.process();
               // 如果有监听器监听这个事件的话，相应监听器处理
               var ls = o.listeners.get(RMethod.name(e));
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
      sp.record();
      // 清除运行队列
      es.clear();
   }
}

/**************************************************************
 * 添加一个事件到事件服务组件的事件链表里
 *
 * @method
 * @param owner:owner:Object 事件的控件对象
 * @param proc:process:Function 事件的处理函数
 **************************************************************/
function FEventConsole_add(owner, proc){
   this.events.push(new TEvent(owner, null, proc));
}

/**************************************************************
 * 添加一个事件到事件服务组件的事件链表里
 *
 * @method
 * @param e:event:TEvent 
 **************************************************************/
function FEventConsole_push(e){
   var o = this;
   var n = RClass.name(e)
   if(o.allow){
      var a = true;
      if(o.allows.contains(n)){
         a = RBool.isTrue(o.allows.get(n));
      }
      if(a){
         var c = o.events.count;
         for(var n=0; n<c; n++){
            if(o.events.get(n) == e){
               o.events.set(n, null);
            }
         }
         o.events.push(e);
      }
   }
}
// ------------------------------------------------------------
// class
function FEventConsole_allowEvent(c){
   this.allows.set(RMethod.name(c), EBool.True);
}
// ------------------------------------------------------------
function FEventConsole_skipEvent(c){
   this.allows.set(RMethod.name(c), EBool.False);
}
// ------------------------------------------------------------
function FEventConsole_allowAll(){
   this.allow = true;
}
// ------------------------------------------------------------
function FEventConsole_skipAll(){
   this.allow = false;
}
// ------------------------------------------------------------
// control, method
function FEventConsole_onlyCall(c, m){
   var o = this;
   o.allow = false;
   m.call(c);
   o.allow = true;
}
// ------------------------------------------------------------
function FEventConsole_clear(){
   this.events.clear();
}
