//============================================================
// TMessages
//============================================================
MO.TMessages = function TMessages(){
   var o = this;
   //..........................................................
   // @property
   o._items     = new MO.TObjects();
   //..........................................................
   // @method
   o.hasMessage = MO.TMessages_hasMessage;
   o.message    = MO.TMessages_message;
   o.messages   = MO.TMessages_messages;
   o.type       = MO.TMessages_type;
   o.push       = MO.TMessages_push;
   return o;
}

//============================================================
//TMessages
//============================================================
MO.TMessages_hasMessage = function TMessages_hasMessage(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return true;
      }
   }
   return false;
}

//============================================================
//TMessages
//============================================================
MO.TMessages_message = function TMessages_message(type){
   for(var n=0; n<this._items.count; n++){
      var m = this._items.get(n);
      if(m && m.type == type){
         return m;
      }
   }
   return null;
}
// ------------------------------------------------------------
MO.TMessages_messages = function TMessages_messages(type){
   var rs = null;
   for(var n=0; n<this._items.count; n++){
      var msg = this._items.get(n);
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
MO.TMessages_type = function TMessages_type(){
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
MO.TMessages_push = function TMessages_push(msg){
   if(msg){
      this._items.push(msg);
   }
}
