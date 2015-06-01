// ============================================================
// MDescCheckPicker
// ============================================================
function MDescCheckPicker(o){
   o = RClass.inherits(this, o);
   // Property
   o.dataEmpty = RClass.register(o, new TPtyBool('dataEmpty', true));
   o.editRefer = RClass.register(o, new TPtyStr('editRefer', null));
   // 是否允许可以输入  Y:可以输入.N,NULL不可输入默认为N
   o.editCheck = RClass.register(o, new TPtyStr('editCheck', null));
   return o;
}
// ------------------------------------------------------------
