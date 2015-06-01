// ============================================================
// FListenerConsole
// ============================================================
function FListenerConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Constant
   o.scope     = EScope.Page;
   // Attribute
   o.listeners = null;
   // Method
   o.contains  = FListenerConsole_contains;
   o.register  = FListenerConsole_register;
   o.process   = FListenerConsole_process;
   return o;
}
// ------------------------------------------------------------
function FListenerConsole_contains(clazz, action){
   var o = this;
   if(!o.listeners){
      return false;
   }
   var name = RClass.name(clazz) + '@' + action;
   var lsns = o.listeners[name];
   if(!lsns){
      return false;
   }
   return lsns.isEmpty();
}
// ------------------------------------------------------------
// class, action owner, method
function FListenerConsole_register(clazz, action, owner, method){
   var o = this;
   if(!o.listeners){
      o.listeners = new Array();
   }
   var l = new TListener(owner, method);
   var name = RClass.name(clazz) + '@' + action;
   var lsns = o.listeners[name];
   if(!lsns){
      lsns = o.listeners[name] = new TListeners();
   }
   lsns.push(l);
   return l;
}
// ------------------------------------------------------------
function FListenerConsole_process(clazz, action, sender, params){
   var o = this;
   if(o.listeners){
      var name = RClass.name(clazz) + '@' + action;
      var lsns = o.listeners[name];
      if(lsns){
         lsns.process(sender, params);
      }
   }
}
// ------------------------------------------------------------
