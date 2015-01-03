// ============================================================
// FConfigAction
// ============================================================
function FConfigAction(o){
   o = RClass.inherits(this, o, FComponent, MInvoke);
   // Property
   o.service   = RClass.register(o, new TPtyStr('service'));
   // Attribute
   o.isLoading = false;
   o.service   = null;
   o.valuable  = null;
   // Event
   o.onLoaded  = FConfigAction_onLoaded;
   // Method
   o.invoke    = FConfigAction_invoke;
   return o;
}
// ------------------------------------------------------------
function FConfigAction_onLoaded(e){
   var o = this;
   var r = RConsole.find(FResultConsole).checkService(e.document.root());
   if(r){
      RWindow.setEnable(true);
      var v = o.valuable;
      if(RClass.isClass(v, MFocus)){
         v.focus();
      }
   }
   o.isLoading = false;
}
// ------------------------------------------------------------
function FConfigAction_invoke(vo){
   var o = this;
   RClass.checkClass(vo, MConfig);
   var svc = RService.parse(this.service);
   if(!svc){
      return alert('Unknown service');
   }
   // Disable
   RWindow.setEnable(false);
   // Build values
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', svc.action);
   RConsole.find(FEnvConsole).build(root);
   var config = root.create('Data');
   if(RClass.isClass(vo, FContainer)){
      vo.storeConfig(config);
   }else{
      vo.saveConfig(config);
   }
   RLog.debug(this, doc.dump());
   // Build connection
   o.valuable = vo;
   o.isLoading = true;
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = svc.url;
   e.document = doc;
   RConsole.find(FXmlConsole).process(e);
}
// ------------------------------------------------------------
