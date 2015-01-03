// ============================================================
// FEventEngineConsole
// ============================================================
function FEventEngineConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Constant
   o.scope      = EScope.Page;
   o.events     = new TMap();
   // Method
   o.loadConfig = FEventEngineConsole_loadConfig;
   o.process    = FEventEngineConsole_process;
   return o;
}
// ------------------------------------------------------------
function FEventEngineConsole_loadConfig(cfg){
   var o = this;
   if(!(cfg && cfg.nodes)){
      return;
   }
   var ns = cfg.nodes;
   var l = ns.count;
   for(var n = 0; n < l; n++){
      var x = ns.get(n);
      if(x.isName('Event')){
         var c = RClass.create(FEvent);
         c.loadConfig(x);
         if(RString.isEmpty(c.name) || RString.isEmpty(c.source) || RString.isEmpty(c.form)){
            RMessage.fatel(o, null, "Event property is invalid. (event={0})", x.xml());
         }
         // onchange@editLength@design.webform.EditForm
         var s = c.name + '@' + c.source + '@' + c.form;
         o.events.set(s, c);
      }
   }
}
// ------------------------------------------------------------
function FEventEngineConsole_process(e){
   var o = this;
   var es = o.events;
   if(es.isEmpty()){
      return;
   }
   var se = e.source;
   if(RClass.isClass(se, FControl)){
      var p = se.topControl(MDataset);
      if(p){
         //var s = e.handle + '@' + se.name + '@' + p.name;
         var s = e.name + '@' + se.name + '@' + p.name;
         var c = es.get(s);
         if(c && c.code){
            if(c.event){
               c.event.call(se);
            }else{
               c.event = new Function(c.code);
               c.event.call(se);
            }
         }
      }
   }
}
