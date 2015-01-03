// name
function TControl(n){
   var o = this;
   // Attribute
   o.name         = n;
   o.events       = new Array();
   o.template     = null;
   // Html Event
   o.ohProcess    = TControl_ohProcess;
   // Method
   o.register     = TControl_register;
   o.findEvent    = TControl_findEvent;
   o.attachEvent  = TControl_attachEvent;
   o.newInstance  = TControl_newInstance;
   return o;
}

//------------------------------------------------------------
function TControl_newInstance(n){
   var o = this;
   var t = o.template;
   var r = null;
   if(!t){
	  t = o.template = RClass.create(n);
	  t.build();
   }
   return t.clone();
}

// ------------------------------------------------------------
function TControl_ohProcess(){
   var es = this.linkEvents;
   if(es){
      var e = es[event.type];
      if(e && e.process){
         if(e.attach){
            e.attach(event);
         }
         RConsole.find(FEventConsole).push(e);
      }
   }
}
// ------------------------------------------------------------
// event
function TControl_register(e){
   var o = this;
   var n = e.name;
   if(o.events[n]){
      RMsg.fatal(o, null, "Duplicate event [{0}] in control [{1}]", n, o.name);
   }
   o.events[n] = e;
   return e;
}
// ------------------------------------------------------------
function TControl_findEvent(n){
   var o = this;
   var e = o.events[n];
   if(!e){
      var p = RClass.find(o.name).parent;
      if(p){
         var c = RControl.find(p.name);
         if(c){
            return c.findEvent(n);
         }
      }
   }
   return e;
}
// ------------------------------------------------------------
// control, name, html
function TControl_attachEvent(c, n, h){
   var o = this;
   var e = o.findEvent(n);
   if(!e){
      RMsg.fatal(o, null, "Not register event [{0}] in control [{1}]", n, o.name);
   }
   var es = h.linkEvents;
   if(!es){
      es = h.linkEvents = new Object();
   }
   var l = es[e.type] = new e.constructor();
   l.name = e.name;
   l.source = c;
   l.hSource = h;
   h[l.handle] = o.ohProcess;
   return l;
}
// ------------------------------------------------------------
