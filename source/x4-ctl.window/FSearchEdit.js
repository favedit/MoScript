// ============================================================
// FSearchEdit
// ============================================================
function FSearchEdit(o){
   o = RClass.inherits(this, o, FEdit, MDisplayAble, MSearch);
   // Property
   o.labelType     = ELabel.All;
   // Attibute
   o.searchBox     = null;
   // Process
   o.oeBuild       = FSearchEdit_oeBuild;
   // Event
   o.onDataKeyDown = FSearchEdit_onDataKeyDown;
   // Method
   o.assign        = FSearchEdit_assign;
   o.setEditStyle  = FSearchEdit_setEditStyle;
   return o;
}
// ------------------------------------------------------------
function FSearchEdit_oeBuild(e){
   var o = this;
   var r = o.base.FEdit.oeBuild.call(o, e);
   o.base.MSearch.oeBuild.call(o, e);
   return r;
}
// ------------------------------------------------------------
function FSearchEdit_onDataKeyDown(s, e){
   var o = this;
   o.base.FEdit.onDataKeyDown.call(o, s, e);
   if(e.keyCode == EKey.Enter){
      o.blur();
      o.searchBox.onSearch();
   }
}
// ------------------------------------------------------------
function FSearchEdit_assign(edit, type){
   var o = this;
   o.base.FEdit.assign.call(o, edit, type);
   o.base.MSearch.assign.call(o, edit, type);
}
// ------------------------------------------------------------
function FSearchEdit_setEditStyle(style){
   var o = this;
   o.base.FEdit.setEditStyle.call(o, style);
   o.base.MSearch.setEditStyle.call(o, style);
}
// ------------------------------------------------------------
