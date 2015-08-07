//==========================================================
// <T>事件对象</T>
//
// @class
// @author maocy
// @history 150319
//==========================================================
MO.TEvent = function TEvent(owner, code, proc){
   var o = this;
   //..........................................................
   // @attribute
   o.owner     = owner;
   o.code      = code;
   o.type      = null;
   //..........................................................
   // @event
   o.onProcess = proc;
   //..........................................................
   // @method
   o.isBefore  = MO.TEvent_isBefore;
   o.isAfter   = MO.TEvent_isAfter;
   o.process   = MO.TEvent_process;
   o.dump      = MO.TEvent_dump;
   return o;
}

//==========================================================
// <T>测试是否是事件前处理。</T>
// 
// @return Boolean 事件前处理
//==========================================================
MO.TEvent_isBefore = function TEvent_isBefore(){
   return (EEventType.Before == this.type);
}

//==========================================================
// <T>测试是否是事件后处理。</T>
// 
// @return Boolean 事件后处理
//==========================================================
MO.TEvent_isAfter = function TEvent_isAfter(){
   return (EEventType.After == this.type);
}

//==========================================================
// <T>逻辑处理。</T>
// 
// @method
//==========================================================
MO.TEvent_process = function TEvent_process(){
   var o = this;
   if(!o.onProcess){
      return RMessage.fatal(o, null, 'Process event is null. (owner={1})', RClass.dump(o.owner));
   }
   var sp = new TSpeed(o, 'Process event (owner={0}, process={1})', o.owner, RMethod.name(o.onProcess));
   if(o.owner){
      o.onProcess.call(o.owner, o);
   }else{
      o.onProcess();
   }
   sp.record();
}

//==========================================================
// <T>获取事件对象的运行信息。</T>
// 
// @method
// @return String 运行信息
//==========================================================
MO.TEvent_dump = function TEvent_dump(){
   return RClass.typeOf(this) + ' [' + this.owner + ',' + this.type + '-' + this.code + ']';
}
