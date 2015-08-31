//==========================================================
// <T>表格编辑列控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiColumnEditControl = function FDuiColumnEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumn);
   // @method
   //o.isEditAble = FDuiColumnEditControl_isEditAble;
   return o;
}

//==========================================================
// <T>是否允许编辑。</T>
//
// @method
//==========================================================
MO.FDuiColumnEditControl_isEditAble = function FDuiColumnEditControl_isEditAble(r){
   var o = this;
   if(r){
      return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
   }
}
