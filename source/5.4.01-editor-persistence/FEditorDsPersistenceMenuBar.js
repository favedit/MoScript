//==========================================================
// <T>设计基础菜单。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsPersistenceMenuBar = function FEditorDsPersistenceMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsMenuBar);
   //..........................................................
   // @property
   o._frameName    = 'editor.design.persistence.MenuBar';
   //..........................................................
   // @event
   // @event
   o.onBuilded     = MO.FEditorDsPersistenceMenuBar_onBuilded;
   o.onBuildFinish = MO.FEditorDsPersistenceMenuBar_onBuildFinish;
   o.onBuildClick  = MO.FEditorDsPersistenceMenuBar_onBuildClick;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsPersistenceMenuBar_onBuilded = function FEditorDsPersistenceMenuBar_onBuilded(event){
   var o = this;
   o.__base.FEditorDsMenuBar.onBuilded.call(o, event);
   //..........................................................
   // 注册事件
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
   o._controlBuild.addClickListener(o, o.onBuildClick);
}

//==========================================================
// <T>编译完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsPersistenceMenuBar_onBuildFinish = function FEditorDsPersistenceMenuBar_onBuildFinish(event){
   var o = this;
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>编译按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FEditorDsPersistenceMenuBar_onBuildClick = function FEditorDsPersistenceMenuBar_onBuildClick(event){
   var o = this;
   // 禁止处理
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   // 发送请求
   var url = MO.Lang.String.format('/editor.design.persistence.ws?action=build&type=all');
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onBuildFinish);
}
