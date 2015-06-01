// ============================================================
// MEditor
// ============================================================
function MEditor(o){
   o = RClass.inherits(this, o);
   // Method
   o.onEdit       = RMethod.virtual(o, 'onEdit');
   o.onEditChange = RMethod.virtual(o, 'onEditChange');
   o.onEditBlur   = RMethod.virtual(o, 'onEditBlur');
   o.onEditFocus  = RMethod.virtual(o, 'onEditFocus');
   return o;
}
// ------------------------------------------------------------
