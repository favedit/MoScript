// ============================================================
// MCellDropable
// ============================================================
function MCellDropable(o){
   o = RClass.inherits(this, o);
   //..........................................................
   o.testBlur = MCellDropable_testBlur;
   return o;
}
// ------------------------------------------------------------
function MCellDropable_testBlur(c){
   var o = this;
   if(o.editor && RClass.isClass(c, FEditor)){
      return o.editor != c;
   }
   return true;
}
