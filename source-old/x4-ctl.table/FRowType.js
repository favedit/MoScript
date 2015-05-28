// ============================================================
// FDataAction
// ============================================================
function FRowType(o){
   o = RClass.inherits(this, o, FComponent);
   // Property
   o.service         = RClass.register(o, new TPtyStr('service'));
   o.action          = RClass.register(o, new TPtyStr('action'));
   o.formName        = RClass.register(o, new TPtyStr('formName'));
   o.formWhere       = RClass.register(o, new TPtyStr('formWhere'));
   o.formOrder       = RClass.register(o, new TPtyStr('formOrder'));
   o.formResearch    = RClass.register(o, new TPtyStr('formResearch'));
   return o;
}
// ------------------------------------------------------------
