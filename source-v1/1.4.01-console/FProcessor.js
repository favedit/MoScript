//==========================================================
// <T>进程。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
function FProcessor(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._name     = null;
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   //..........................................................
   // @event
   o.ohMessage = FProcessor_ohMessage;
   o.onMessage = FProcessor_onMessage;
   //..........................................................
   // @method
   o.construct = FProcessor_construct;
   // @method
   o.name      = FProcessor_name;
   // @method
   o.start     = FProcessor_start;
   o.process   = FProcessor_process;
   return o;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
function FProcessor_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
function FProcessor_onMessage(p){
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FProcessor_name(){
   return this._name;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FProcessor_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._events = new TObjects();
}

//==========================================================
// <T>启动处理。</T>
//
// @method
// @param p:file:String 脚本文件
//==========================================================
function FProcessor_start(p){
   var o = this;
   // 检查状态
   if(o._worker){
      throw new TError(o, 'Process is already start.');
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
function FProcessor_process(p){
   var o = this;
   // 增加事件
   var es = o._events;
   var c = es.count();
   es.push(p);
   // 发布处理
   var e = new SProcessEvent();
   e.index = c;
   e.code = p.code();
   e.data = p.data();
   o._worker.postMessage(e);
}
