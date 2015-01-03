// ============================================================
// MProgress
// ============================================================
function MProgress(o){
   o = RClass.inherits(this, o);
   // @method
   o.oeProgress = RMethod.virtual(o, 'oeProgress');
   return o;
}
