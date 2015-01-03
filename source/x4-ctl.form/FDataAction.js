// ============================================================
// FDataAction
// ============================================================
function FDataAction(o){
   o = RClass.inherits(this, o, FComponent, MInvoke);
   // Property
   o.service           = RClass.register(o, new TPtyStr('service'));
   o.invokeFunction    = RClass.register(o, new TPtyStr('invokeFunction'));
   // Attribute
   o.isLoading = false;
   o.service   = null;
   o.valuable  = null;
   // Event
   o.onLoaded  = FDataAction_onLoaded;
   // Method
   o.invoke    = FDataAction_invoke;
   return o;
}
// ------------------------------------------------------------
function FDataAction_onLoaded(e){
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
function FDataAction_invoke(vo){
   var o = this;
   RClass.checkClass(vo, MValue);
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
   vo.saveValue(config);
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
