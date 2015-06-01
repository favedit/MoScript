/**************************************************************
 * 监听器的接口类
 *
 * @manger
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MListener(o){
   o = RClass.inherits(this, o);
   // Attribute
   o.listeners        = null;
   // Method
   o.registerListener = MListener_registerListener;
   o.processListener  = MListener_processListener;
   return o;
}
// ------------------------------------------------------------
// method
// owner, method
function MListener_registerListener(name, owner, method){
   var l = null;
   var ln = arguments.length;
   if(ln == 2){
      // method
      l = new TListener(this, owner);
   }else if(ln == 3){
      // owner, method
      l = new TListener(owner, method);
   }else{
      RMsg.fatal(o, null, 'Paramter error');
   }
   // 
   var o = this;
   if(!o.listeners){
      o.listeners = new Array();
   }
   var lsns = o.listeners[name];
   if(!lsns){
      lsns = o.listeners[name] = new TListeners();
   }
   lsns.push(l);
   return l;
}
// ------------------------------------------------------------
function MListener_processListener(name, params){
   var o = this;
   if(o.listeners){
      var lsns = o.listeners[name];
      if(lsns){
         lsns.process(this, params);
      }
   }
}
// ------------------------------------------------------------
