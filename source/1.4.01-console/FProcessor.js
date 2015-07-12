//==========================================================
// <T>进程。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
MO.FProcessor = function FProcessor(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   //..........................................................
   // @event
   o.ohMessage = MO.FProcessor_ohMessage;
   o.onMessage = MO.FProcessor_onMessage;
   //..........................................................
   // @method
   o.construct = MO.FProcessor_construct;
   // @method
   o.start     = MO.FProcessor_start;
   o.process   = MO.FProcessor_process;
   return o;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
MO.FProcessor_ohMessage = function FProcessor_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
MO.FProcessor_onMessage = function FProcessor_onMessage(p){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FProcessor_construct = function FProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._events = new MO.TObjects();
}

//==========================================================
// <T>启动处理。</T>
//
// @method
// @param p:file:String 脚本文件
//==========================================================
MO.FProcessor_start = function FProcessor_start(p){
   var o = this;
   // 检查状态
   if(o._worker){
      throw new MO.TError(o, 'Process is already start.');
   }
   // 启动进程
   o._source = p;
   var w = o._worker = new Worker(p);
   w.__linker = o;
   w.onmessage = o.ohMessage;
}

//==========================================================
// <T>启动处理。</T>
//
// @method
// @param p:event:FProcessorEvent 处理事件
//==========================================================
MO.FProcessor_process = function FProcessor_process(p){
   var o = this;
   // 增加事件
   var es = o._events;
   var c = es.count();
   es.push(p);
   // 发布处理
   var event = new MO.SProcessEvent();
   event.index = c;
   event.code = p.code();
   event.data = p.data();
   o._worker.postMessage(event);
}
