// ============================================================
// MDescEdit
// ============================================================
function MDescProcessStatus(o){
   o = RClass.inherits(this, o);
   // Property
   o.levelColors      = RClass.register(o, new TPtyStr('levelColors'));
   o.levelImages      = RClass.register(o, new TPtyStr('levelImages'));
   o.stepStart        = RClass.register(o, new TPtyStr('stepStart'));
   o.stepWidth        = RClass.register(o, new TPtyStr('stepWidth'));
   o.stepCount        = RClass.register(o, new TPtyStr('stepCount'));
   return o;
}
// ------------------------------------------------------------
