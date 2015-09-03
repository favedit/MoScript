//==========================================================
// <T>可编辑接口。</T>
//
// @face
// @author maocy
// @version 150903
//==========================================================
MO.MUiEditable = function MUiEditable(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._editView       = MO.Class.register(o, new MO.APtySet('_editView', 'edit_mode', MO.EUiMode.View, false));
   o._editInsert     = MO.Class.register(o, new MO.APtySet('_editInsert', 'edit_mode', MO.EUiMode.Insert, false));
   o._editUpdate     = MO.Class.register(o, new MO.APtySet('_editUpdate', 'edit_mode', MO.EUiMode.Update, false));
   o._editDelete     = MO.Class.register(o, new MO.APtySet('_editDelete', 'edit_mode', MO.EUiMode.Delete, false));
   //..........................................................
   // @attribute
   o._statusEditable = MO.Class.register(o, new MO.AGetter('_statusEditable', 'isEditable'), true);
   //..........................................................
   // @process
   o.oeMode          = MO.MUiEditable_oeMode;
   //..........................................................
   // @method
   o.testEditable    = MO.MUiEditable_testEditable;
   o.setEditable     = MO.Class.register(o, new MO.AVirtual('setEditable'));
   return o;
}

//==========================================================
// <T>根据工作模式改变当前控件的显示状态。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.MUiEditable_oeMode = function MUiEditable_oeMode(event){
   var o = this;
   if(event.isBefore()){
      var modeCd = event.modeCd;
      var editable = o._statusEditable = o.testEditable(modeCd);
      o.setEditable(editable);
   }
}

//==========================================================
// <T>测试在指定模式下的可见性。</T>
//
// @method
// @param modeCd:EUiMode 模式
//==========================================================
MO.MUiEditable_testEditable = function MUiEditable_testEditable(modeCd){
   var o = this;
   switch(modeCd){
      case MO.EUiMode.View:
         return o._editView;
      case MO.EUiMode.Insert:
         return o._editInsert;
      case MO.EUiMode.Update:
         return o._editUpdate;
      case MO.EUiMode.Delete:
         return o._editDelete;
   }
   return false;
}
