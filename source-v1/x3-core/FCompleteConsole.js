// ============================================================
// FCompleteConsole
// ============================================================
function FCompleteConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope       = EScope.Page;
   o.serviceName = 'logic.dataset';
   // Event
   o.onLoaded    = FCompleteConsole_onLoaded;
   // Method
   o.search      = FCompleteConsole_search;
   return o;
}
// ------------------------------------------------------------
function FCompleteConsole_onLoaded(e){
   var o = this;
   var xr = e.document.root();
   var r = RConsole.find(FMessageConsole).checkResult(xr);
   if(r){
      e.control.onComplete(xr);
   }
}
// ------------------------------------------------------------
function FCompleteConsole_search(c){
   // Check attributes
   var o = this;
   o.activeControl = c;
   // Build values
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', EDataAction.Complete);
   var node = root.create('Control');
   node.set('form', c.formName);
   node.set('control', c.controlName);
   node.set('value', c.controlValue);
   // Build connection
   var e = new TEvent(o, EXmlEvent.Send, o.onLoaded);
   e.url = RService.url(o.serviceName);
   e.document = doc;
   e.control = c;
   RConsole.find(FXmlConsole).process(e);
}
// ------------------------------------------------------------
