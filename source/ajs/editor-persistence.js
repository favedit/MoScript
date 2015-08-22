MO.FEditorDsPersistenceCatalogContent = function FEditorDsPersistenceCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.persistence';
   return o;
}
MO.FEditorDsPersistenceCatalogToolBar = function FEditorDsPersistenceCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName                   = 'editor.design.persistence.CatalogToolBar';
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onListClick                  = MO.FEditorDsPersistenceCatalogToolBar_onListClick;
   o.onBuilded                    = MO.FEditorDsPersistenceCatalogToolBar_onBuilded;
   o.onFolderCreateClick          = MO.FEditorDsPersistenceCatalogToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = MO.FEditorDsPersistenceCatalogToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = MO.FEditorDsPersistenceCatalogToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = MO.FEditorDsPersistenceCatalogToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = MO.FEditorDsPersistenceCatalogToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = MO.FEditorDsPersistenceCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = MO.FEditorDsPersistenceCatalogToolBar_onFolderCloseClick;
   o.construct                    = MO.FEditorDsPersistenceCatalogToolBar_construct;
   o.dispose                      = MO.FEditorDsPersistenceCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsPersistenceCatalogToolBar_onListClick = function FEditorDsPersistenceCatalogToolBar_onListClick(event){
   var o = this;
   o._frameSet.selectObject('list', 'editor.design.persistence.ListForm', null, null);
}
MO.FEditorDsPersistenceCatalogToolBar_onBuilded = function FEditorDsPersistenceCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
   o._controlList.addClickListener(o, o.onListClick);
}
MO.FEditorDsPersistenceCatalogToolBar_onFolderCreateClick = function FEditorDsPersistenceCatalogToolBar_onFolderCreateClick(event){
   var o = this;
   var parentGuid = null;
   var parentLabel = null;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(node){
      parentGuid = node.guid();
      parentLabel = node.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._parentGuid = parentGuid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel('');
   dialog.switchDataMode(MO.EUiDataMode.Insert);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsPersistenceCatalogToolBar_onFolderDeleteLoad = function FEditorDsPersistenceCatalogToolBar_onFolderDeleteLoad(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
   var catalog = o._frameSet._catalogContent;
   var guid = o._activeNodeGuid;
   if(guid){
      var node = catalog.findByGuid(guid);
      node.removeSelf();
   }
   o._activeNodeGuid = null;
}
MO.FEditorDsPersistenceCatalogToolBar_onFolderDeleteExcute = function FEditorDsPersistenceCatalogToolBar_onFolderDeleteExcute(event){
   var o = this;
   if(event.resultCd != MO.EResult.Success){
      return;
   }
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   MO.Console.find(MO.FDuiDesktopConsole).showUploading();
   o._activeNodeGuid = node._guid;
   var connection = MO.Console.find(MO.FDrResourceConsole).doFolderDelete(node._guid);
   connection.addLoadListener(o, o.onFolderDeleteLoad);
}
MO.FEditorDsPersistenceCatalogToolBar_onFolderDeleteClick = function FEditorDsPersistenceCatalogToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = MO.Console.find(MO.FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
MO.FEditorDsPersistenceCatalogToolBar_onFolderPropertyClick = function FEditorDsPersistenceCatalogToolBar_onFolderPropertyClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var parentLabel = null;
   if(node._parent){
      parentLabel = node._parent.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._nodeGuid = node._guid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel(node.label());
   dialog.switchDataMode(MO.EUiDataMode.Update);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsPersistenceCatalogToolBar_onFolderOpenClick = function FEditorDsPersistenceCatalogToolBar_onFolderOpenClick(event){
}
MO.FEditorDsPersistenceCatalogToolBar_onFolderCloseClick = function FEditorDsPersistenceCatalogToolBar_onFolderCloseClick(event){
}
MO.FEditorDsPersistenceCatalogToolBar_construct = function FEditorDsPersistenceCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsPersistenceCatalogToolBar_dispose = function FEditorDsPersistenceCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsPersistenceFrameSet = function FEditorDsPersistenceFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.persistence.FrameSet';
   o.onBuilded  = MO.FEditorDsPersistenceFrameSet_onBuilded;
   o.construct  = MO.FEditorDsPersistenceFrameSet_construct;
   o.dispose    = MO.FEditorDsPersistenceFrameSet_dispose;
   return o;
}
MO.FEditorDsPersistenceFrameSet_onBuilded = function FEditorDsPersistenceFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsPersistenceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsPersistenceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '持久化目录');
}
MO.FEditorDsPersistenceFrameSet_construct = function FEditorDsPersistenceFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsPersistenceFrameSet_dispose = function FEditorDsPersistenceFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsPersistenceMenuBar = function FEditorDsPersistenceMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsMenuBar);
   o._frameName    = 'editor.design.persistence.MenuBar';
   o.onBuilded     = MO.FEditorDsPersistenceMenuBar_onBuilded;
   o.onBuildFinish = MO.FEditorDsPersistenceMenuBar_onBuildFinish;
   o.onBuildClick  = MO.FEditorDsPersistenceMenuBar_onBuildClick;
   return o;
}
MO.FEditorDsPersistenceMenuBar_onBuilded = function FEditorDsPersistenceMenuBar_onBuilded(event){
   var o = this;
   o.__base.FEditorDsMenuBar.onBuilded.call(o, event);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
   o._controlBuild.addClickListener(o, o.onBuildClick);
}
MO.FEditorDsPersistenceMenuBar_onBuildFinish = function FEditorDsPersistenceMenuBar_onBuildFinish(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}
MO.FEditorDsPersistenceMenuBar_onBuildClick = function FEditorDsPersistenceMenuBar_onBuildClick(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   var url = MO.Lang.String.format('/editor.design.persistence.ws?action=build&type=all');
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onBuildFinish);
}
MO.FEditorDsPersistencePropertyListForm = function FEditorDsPersistencePropertyListForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   o._activeFrame     = null;
   o._activeComponent = null;
   o.onBuilded        = MO.FEditorDsFrameComponentProperty_onBuilded;
   o.onDataChanged    = MO.FEditorDsFrameComponentProperty_onDataChanged;
   o.construct        = MO.FEditorDsFrameComponentProperty_construct;
   o.loadObject       = MO.FEditorDsFrameComponentProperty_loadObject;
   o.dispose          = MO.FEditorDsFrameComponentProperty_dispose;
   return o;
}
MO.FEditorDsFrameComponentProperty_onBuilded = function FEditorDsFrameComponentProperty_onBuilded(p){
   var o = this;
   o.__base.FEditorDsPropertyForm.onBuilded.call(o, p);
}
MO.FEditorDsFrameComponentProperty_onDataChanged = function FEditorDsFrameComponentProperty_onDataChanged(event){
   var o  = this;
   var frame = o._activeFrame;
   var control = o._activeControl;
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}
MO.FEditorDsFrameComponentProperty_construct = function FEditorDsFrameComponentProperty_construct(){
   var o = this;
   o.__base.FEditorDsPropertyForm.construct.call(o);
}
MO.FEditorDsFrameComponentProperty_loadObject = function FEditorDsFrameComponentProperty_loadObject(frame, component){
   var o = this;
   o._activeFrame = frame;
   o._activeComponent = component;
   o._controlType.set(RClass.name(component));
   o._controlName.set(component.name());
   o._controlLabel.set(component.label());
}
MO.FEditorDsFrameComponentProperty_dispose = function FEditorDsFrameComponentProperty_dispose(){
   var o = this;
   o.__base.FEditorDsPropertyForm.dispose.call(o);
}
MO.FEditorDsPersistencePropertyToolBar = function FEditorDsPersistencePropertyToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName           = 'editor.design.frame.PropertyToolBar';
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   o.onBuilded            = MO.FEditorDsPersistencePropertyToolBar_onBuilded;
   o.onUpdateClick        = MO.FEditorDsPersistencePropertyToolBar_onUpdateClick;
   o.construct            = MO.FEditorDsPersistencePropertyToolBar_construct;
   o.dispose              = MO.FEditorDsPersistencePropertyToolBar_dispose;
   return o;
}
MO.FEditorDsPersistencePropertyToolBar_onBuilded = function FEditorDsPersistencePropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsPersistencePropertyToolBar_onUpdateClick = function FEditorDsPersistencePropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}
MO.FEditorDsPersistencePropertyToolBar_construct = function FEditorDsPersistencePropertyToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsPersistencePropertyToolBar_dispose = function FEditorDsPersistencePropertyToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
