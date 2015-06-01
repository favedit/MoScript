// ============================================================
// FRemoteAction
// ============================================================
function FRemoteAction(o){
   o = RClass.inherits(this, o, FComponent);
   // Attribute
   o.isLoading     = false;
   o.service       = null;
   o.valuable      = null;
   // Event
   o.onLoaded      = FRemoteAction_onLoaded;
   // Method
   o.loadConfig    = FRemoteAction_loadConfig;
   o.saveConfig    = FRemoteAction_saveConfig;
   o.execute       = FRemoteAction_execute;
   return o;
}
// ------------------------------------------------------------
function FRemoteAction_onLoaded(e){
   // Disable
   var o = this;
   var doc = e.document;
   var rs = RConsole.find(FResultConsole).checkService(doc.root());
   if(rs){
      RWindow.setEnable(true);
   }
   o.isLoading = false;
}
// ------------------------------------------------------------
function FRemoteAction_loadConfig(config){
   var o = this;
   o.base.FComponent.loadConfig.call(o, config);
   o.service = config.get('service');
}
// ------------------------------------------------------------
function FRemoteAction_saveConfig(config){
   var o = this;
   o.base.FComponent.saveConfig.call(o, config)
   config.set('service',  this.service);
}
// ------------------------------------------------------------
function FRemoteAction_execute(service, config){
   var o = this;
   var svc = RService.parse(RString.nvl(service, this.service));
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
   root.push(config);
   RLog.debug(this, 'Execute (service={1})\n{2}', svc.url, doc.dump());
   // Build connection
   o.isLoading = true;
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = svc.url;
   e.document = doc;
   e.action = this;
   RConsole.find(FXmlConsole).process(e);
}
// ------------------------------------------------------------
