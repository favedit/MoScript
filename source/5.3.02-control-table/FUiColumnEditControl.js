with(MO){
   //==========================================================
   // <T>表格编辑列控件。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FUiColumnEditControl = function FUiColumnEditControl(o){
      o = RClass.inherits(this, o, FColumn);
      // @method
      o.isEditAble = FUiColumnEditControl_isEditAble;
      return o;
   }

   //==========================================================
   // <T>是否允许编辑。</T>
   //
   // @method
   //==========================================================
   MO.FUiColumnEditControl_isEditAble = function FUiColumnEditControl_isEditAble(r){
      var o = this;
      if(r){
         return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
      }
   }
}
