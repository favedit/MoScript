// ============================================================
// TEvent
// ============================================================
function TEvent(owner, code, proc){
   var o = this;
   // Attribute
   o.owner     = owner;
   o.code      = code;
   o.type      = null;
   // Event
   o.onProcess = proc;
   // Method
   o.isBefore  = TEvent_isBefore;
   o.isAfter   = TEvent_isAfter;
   o.process   = TEvent_process;
   o.dump      = TEvent_dump;
   return o;
}
// ------------------------------------------------------------
function TEvent_isBefore(){
   return (EEventType.Before == this.type);
}
// ------------------------------------------------------------
function TEvent_isAfter(){
   return (EEventType.After == this.type);
}
// ------------------------------------------------------------
function TEvent_process(){
   var o = this;
   if(!o.onProcess){
      return RMessage.fatal(o, null, 'Process event is null. (owner={0})', RClass.dump(o.owner));
   }
   var sp = new TSpeed(o, 'Process event (owner={0}, process={1})', o.owner, RMethod.name(o.onProcess));
   if(o.owner){
      o.onProcess.call(o.owner, o);
   }else{
      o.onProcess();
   }
   sp.record();
}
// ------------------------------------------------------------
function TEvent_dump(){
   return RClass.typeOf(this) + ' [' + this.owner + ',' + this.type + '-' + this.code + ']';
}
// ------------------------------------------------------------
