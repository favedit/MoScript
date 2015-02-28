//============================================================
// TMessages
//============================================================
function TMessages(){
   var o = this;
   // Property
   o.items      = new TList();
   // Attribute
   // Method
   o.hasMessage = TMessages_hasMessage;
   o.message    = TMessages_message;
   o.messages   = TMessages_messages;
   o.type       = TMessages_type;
   o.push       = TMessages_push;
   return o;
}

//============================================================
//TMessages
//============================================================
function TMessages_hasMessage(type){
   for(var n=0; n<this.items.count; n++){
      var m = this.items.get(n);
      if(m && m.type == type){
         return true;
      }
   }
   return false;
}

//============================================================
//TMessages
//============================================================
function TMessages_message(type){
   for(var n=0; n<this.items.count; n++){
      var m = this.items.get(n);
      if(m && m.type == type){
         return m;
      }
   }
   return null;
}
// ------------------------------------------------------------
function TMessages_messages(type){
   var rs = null;
   for(var n=0; n<this.items.count; n++){
      var msg = this.items.get(n);
      if(msg && msg.type == type){
         if(!rs){
            rs = new TList();
         }
         rs.push(msg);
      }
   }
   return rs;
}
// ------------------------------------------------------------
function TMessages_type(){
   if(this.hasMessage(EMessage.Fatal)){
      return EMessage.Fatal;
   }
   if(this.hasMessage(EMessage.Error)){
      return EMessage.Error;
   }
   if(this.hasMessage(EMessage.Warn)){
      return EMessage.Warn;
   }
   if(this.hasMessage(EMessage.Valid)){
      return EMessage.Valid;
   }
   if(this.hasMessage(EMessage.Info)){
      return EMessage.Info;
   }
   return EMessage.None;
}
// ------------------------------------------------------------
function TMessages_push(msg){
   if(msg){
      this.items.push(msg);
   }
}
// ------------------------------------------------------------
