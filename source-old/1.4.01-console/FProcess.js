//==========================================================
// <T>进程。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
function FProcess(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._name     = null;
   o._source   = null;
   o._worker   = null;
   o._events   = null;
   //..........................................................
   // @event
   o.ohMessage = FProcess_ohMessage;
   o.onMessage = FProcess_onMessage;
   //..........................................................
   // @method
   o.construct = FProcess_construct;
   // @method
   o.name      = FProcess_name;
   // @method
   o.start     = FProcess_start;
   o.process   = FProcess_process;
   return o;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
function FProcess_ohMessage(){
   var o = this.__linker;
   o.onMessage(this);
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
function FProcess_onMessage(p){
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FProcess_name(){
   return this._name;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FProcess_construct(){
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
function FProcess_start(p){
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
// @param p:event:FProcessEvent 处理事件
//==========================================================
function FProcess_process(p){
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
