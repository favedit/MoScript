// ============================================================
// FColumnRadio
// ============================================================
function FColumnRadio(o){
   o = RClass.inherits(this, o, FColumn, MDescCheck);
   // Attribute
   o.cellClass   = FCellCheck;
   // Method
   o.equalsValue = FColumnRadio_equalsValue;
   return o;
}
// ------------------------------------------------------------
function FColumnRadio_equalsValue(rv, cv){
   return RBool.isTrue(rv) == RBool.isTrue(cv);
}
// ------------------------------------------------------------
