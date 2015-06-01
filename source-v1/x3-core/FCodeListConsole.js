// ============================================================
// FEditConsole
// ============================================================
function FCodeListConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope        = EScope.Page;
   // Method
   o.fetch        = FCodeListConsole_fetch;
   return o;
}
// ------------------------------------------------------------
function FCodeListConsole_fetch(g){
   var o = this;
   // 构建XML结构对象
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('action', 'codelist');
   var f = root.create('CodeList');
   var nd = g.toNode();
   if(nd){
      f.push(nd);
   }
   f.set('name', g.name);
   var url = RService.url('logic.webform');
   var doc = RConsole.find(FXmlConsole).send(url, doc);
   var root = doc.root();
   var mc = RConsole.find(FMessageConsole);
   var r = mc.checkResult(root);
   if(r){
      return doc;
   }
}
// ------------------------------------------------------------
