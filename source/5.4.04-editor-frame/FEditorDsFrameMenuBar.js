//==========================================================
// <T>设计基础菜单。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsFrameMenuBar = function FEditorDsFrameMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsMenuBar);
   //..........................................................
   // @property
   o._frameName = 'editor.design.frame.MenuBar';
   //..........................................................
   // @event
   o.onBuilded  = MO.FEditorDsFrameMenuBar_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsFrameMenuBar_onBuilded = function FEditorDsFrameMenuBar_onBuilded(event){
   var o = this;
   o.__base.FEditorDsMenuBar.onBuilded.call(o, event);
   //..........................................................
   // 注册事件
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
