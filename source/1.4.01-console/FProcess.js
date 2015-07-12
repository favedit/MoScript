//==========================================================
// <T>进程。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
MO.FProcess = function FProcess(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._name     = MO.Class.register(o, new MO.AGetter('_name'));
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   //..........................................................
   // @event
   o.ohMessage = MO.FProcess_ohMessage;
   o.onMessage = MO.FProcess_onMessage;
   //..........................................................
   // @method
   o.construct = MO.FProcess_construct;
   // @method
   o.name      = MO.FProcess_name;
   // @method
   o.start     = MO.FProcess_start;
   o.process   = MO.FProcess_process;
   return o;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
MO.FProcess_ohMessage = function FProcess_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
MO.FProcess_onMessage = function FProcess_onMessage(p){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FProcess_construct = function FProcess_construct(){
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
MO.FProcess_start = function FProcess_start(p){
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
// @param p:event:FProcessEvent 处理事件
//==========================================================
MO.FProcess_process = function FProcess_process(p){
   var o = this;
   // 增加事件
   var es = o._events;
   var c = es.count();
   es.push(p);
   // 发布处理
   var e = new MO.SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
