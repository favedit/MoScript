// ============================================================
// EGridAction
// ============================================================
function EGridActionFace(){
   var o = this;
   // Attribute
   o.Insert      = 'I';
   o.Update      = 'U';
   o.Delete      = 'D';
   o.GoInsert    = 'GI';
   o.GoUpdate    = 'GU';
   o.GoDelete    = 'GD';
   o.RowClick    = 'RC';
   o.RowDblClick = 'RD';
   return o;
}
var EGridAction= new EGridActionFace();
// ------------------------------------------------------------
