// ============================================================
// FPrepareAction
// ============================================================
function FPrepareAction(o){
   o = RClass.inherits(this, o, FDataAction);
   // Event
   o.onLoaded      = FPrepareAction_onLoaded;
   return o;
}
// ------------------------------------------------------------
function FPrepareAction_onLoaded(doc){
   var controls = this.parent.controls;
   // Build values
   var node = doc.root().find('Dataset');
   if(node){
      this.valuable.loadValue(node);
   }
}
// ------------------------------------------------------------
