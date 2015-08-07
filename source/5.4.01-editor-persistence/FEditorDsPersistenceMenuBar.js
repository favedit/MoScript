//==========================================================
// <T>私有资源菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FEditorDsPersistenceMenuBar = function FEditorDsPersistenceMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiMenuBar);
   //..........................................................
   // @property
   o._frameName      = 'editor.design.frame.MenuBar';
   //..........................................................
   // @attribute
   o._controlRefresh = null;
   //..........................................................
   // @event
   o.onBuilded       = MO.FEditorDsPersistenceMenuBar_onBuilded;
   // @event
   o.onCreateClick   = MO.FEditorDsPersistenceMenuBar_onCreateClick;
   o.onUpdateClick   = MO.FEditorDsPersistenceMenuBar_onUpdateClick;
   o.onDeleteClick   = MO.FEditorDsPersistenceMenuBar_onDeleteClick;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsPersistenceMenuBar_onBuilded = function FEditorDsPersistenceMenuBar_onBuilded(p){
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
MO.FEditorDsPersistenceMenuBar_onCreateClick = function FEditorDsPersistenceMenuBar_onCreateClick(event){
   var o = this;
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsPersistenceMenuBar_onUpdateClick = function FEditorDsPersistenceMenuBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet._spaceContent._activeFrame;
   // 设置数据
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   // 设置资源数据
   var xframe = xroot.create('Frame');
   MO.RGuiControl.saveConfig(frame, xframe);
   // 发送数据
   return MO.Console.find(MO.FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
}

//==========================================================
// <T>导入模型按键处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsPersistenceMenuBar_onDeleteClick = function FEditorDsPersistenceMenuBar_onDeleteClick(event){
   var o = this;
}
