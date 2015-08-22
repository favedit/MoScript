MO.FEditorDsListCatalogContent = function FEditorDsListCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.list';
   return o;
}
MO.FEditorDsListCatalogToolBar = function FEditorDsListCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName = 'editor.design.frame.CatalogToolBar';
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onBuilded                    = MO.FEditorDsListCatalogToolBar_onBuilded;
   o.onFolderCreateClick          = MO.FEditorDsListCatalogToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = MO.FEditorDsListCatalogToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = MO.FEditorDsListCatalogToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = MO.FEditorDsListCatalogToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = MO.FEditorDsListCatalogToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = MO.FEditorDsListCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = MO.FEditorDsListCatalogToolBar_onFolderCloseClick;
   o.construct                    = MO.FEditorDsListCatalogToolBar_construct;
   o.dispose                      = MO.FEditorDsListCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsListCatalogToolBar_onBuilded = function FEditorDsListCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsListCatalogToolBar_onFolderCreateClick = function FEditorDsListCatalogToolBar_onFolderCreateClick(event){
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
MO.FEditorDsListCatalogToolBar_onFolderDeleteLoad = function FEditorDsListCatalogToolBar_onFolderDeleteLoad(event){
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
MO.FEditorDsListCatalogToolBar_onFolderDeleteExcute = function FEditorDsListCatalogToolBar_onFolderDeleteExcute(event){
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
MO.FEditorDsListCatalogToolBar_onFolderDeleteClick = function FEditorDsListCatalogToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = MO.Console.find(MO.FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
MO.FEditorDsListCatalogToolBar_onFolderPropertyClick = function FEditorDsListCatalogToolBar_onFolderPropertyClick(event){
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
MO.FEditorDsListCatalogToolBar_onFolderOpenClick = function FEditorDsListCatalogToolBar_onFolderOpenClick(event){
}
MO.FEditorDsListCatalogToolBar_onFolderCloseClick = function FEditorDsListCatalogToolBar_onFolderCloseClick(event){
}
MO.FEditorDsListCatalogToolBar_construct = function FEditorDsListCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsListCatalogToolBar_dispose = function FEditorDsListCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsListFrameSet = function FEditorDsListFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName = 'editor.design.list.FrameSet';
   o.onBuilded  = MO.FEditorDsListFrameSet_onBuilded;
   o.construct  = MO.FEditorDsListFrameSet_construct;
   o.dispose    = MO.FEditorDsListFrameSet_dispose;
   return o;
}
MO.FEditorDsListFrameSet_onBuilded = function FEditorDsListFrameSet_onBuilded(event){
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
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsListCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsListCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsListPropertyToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '列表目录');
}
MO.FEditorDsListFrameSet_construct = function FEditorDsListFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsListFrameSet_dispose = function FEditorDsListFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsListMenuBar = function FEditorDsListMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsMenuBar);
   o._frameName = 'editor.design.list.MenuBar';
   o.onBuilded  = MO.FEditorDsListMenuBar_onBuilded;
   return o;
}
MO.FEditorDsListMenuBar_onBuilded = function FEditorDsListMenuBar_onBuilded(event){
   var o = this;
   o.__base.FEditorDsMenuBar.onBuilded.call(o, event);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
MO.FEditorDsListPropertyToolBar = function FEditorDsListPropertyToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName           = 'editor.design.frame.PropertyToolBar';
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   o.onBuilded            = MO.FEditorDsListPropertyToolBar_onBuilded;
   o.onUpdateClick        = MO.FEditorDsListPropertyToolBar_onUpdateClick;
   o.construct            = MO.FEditorDsListPropertyToolBar_construct;
   o.dispose              = MO.FEditorDsListPropertyToolBar_dispose;
   return o;
}
MO.FEditorDsListPropertyToolBar_onBuilded = function FEditorDsListPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsListPropertyToolBar_onUpdateClick = function FEditorDsListPropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}
MO.FEditorDsListPropertyToolBar_construct = function FEditorDsListPropertyToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsListPropertyToolBar_dispose = function FEditorDsListPropertyToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
