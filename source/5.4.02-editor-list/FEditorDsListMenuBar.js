//==========================================================
// <T>私有资源菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FEditorDsListMenuBar = function FEditorDsListMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiMenuBar);
   //..........................................................
   // @property
   o._frameName      = 'editor.design.frame.MenuBar';
   //..........................................................
   // @attribute
   o._controlRefresh = null;
   //..........................................................
   // @event
   o.onBuilded       = MO.FEditorDsListMenuBar_onBuilded;
   // @event
   o.onCreateClick   = MO.FEditorDsListMenuBar_onCreateClick;
   o.onUpdateClick   = MO.FEditorDsListMenuBar_onUpdateClick;
   o.onDeleteClick   = MO.FEditorDsListMenuBar_onDeleteClick;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsListMenuBar_onBuilded = function FEditorDsListMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDuiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsListMenuBar_onCreateClick = function FEditorDsListMenuBar_onCreateClick(event){
   var o = this;
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsListMenuBar_onUpdateClick = function FEditorDsListMenuBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet.activePropertyFrame();
   if(frame){
      frame.save();
   }
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsListMenuBar_onDeleteClick = function FEditorDsListMenuBar_onDeleteClick(event){
   var o = this;
}
