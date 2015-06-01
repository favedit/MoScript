// ============================================================
// FColumnCheck
// ============================================================
function FColumnCheck(o){
   o = RClass.inherits(this, o, FColumnEditControl, MDescCheck);
   // Property
   o.iconCheck   = 'ctl.radios'
   o.iconUncheck = 'ctl.radiou';
   // Attribute
   o.__cellClass = FCellCheck;
   // Method
   o.equalsValue = FColumnCheck_equalsValue;
   return o;
}
// ------------------------------------------------------------
function FColumnCheck_equalsValue(rv, cv){
   return RBool.isTrue(rv) == RBool.isTrue(cv);
}
// ------------------------------------------------------------
