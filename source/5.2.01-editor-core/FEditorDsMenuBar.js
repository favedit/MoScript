//==========================================================
// <T>设计基础菜单。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsMenuBar = function FEditorDsMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiMenuBar);
   // @event
   o.onCreateClick = MO.FEditorDsMenuBar_onCreateClick;
   o.onUpdateClick = MO.FEditorDsMenuBar_onUpdateClick;
   o.onDeleteClick = MO.FEditorDsMenuBar_onDeleteClick;
   return o;
}

//==========================================================
// <T>新建按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsMenuBar_onCreateClick = function FEditorDsMenuBar_onCreateClick(event){
   var o = this;
}

//==========================================================
// <T>更新按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsMenuBar_onUpdateClick = function FEditorDsMenuBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet.activePropertyFrame();
   if(frame){
      frame.save();
   }
}

//==========================================================
// <T>删除按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsMenuBar_onDeleteClick = function FEditorDsMenuBar_onDeleteClick(event){
   var o = this;
}
