MO.FEditorDsListCatalogContent = function FEditorDsListCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FUiDataTreeView, MO.MListenerSelected);
   o._activeFrame = null;
   o.onNodeClick  = MO.FEditorDsListCatalogContent_onNodeClick;
   o.construct    = MO.FEditorDsListCatalogContent_construct;
   o.selectObject = MO.FEditorDsListCatalogContent_selectObject;
   o.showObject   = MO.FEditorDsListCatalogContent_showObject;
   o.dispose      = MO.FEditorDsListCatalogContent_dispose;
   return o;
}
MO.FEditorDsListCatalogContent_onNodeClick = function FEditorDsListCatalogContent_onNodeClick(event){
   var o = this;
   var node = event.node;
   var parent = node;
   while(MO.Class.isClass(parent, MO.FDuiTreeNode)){
      if(parent.typeGroup() == MO.EDuiTreeNodeGroup.Container){
         break;
      }
      parent = parent.parent();
   }
   var containerName = parent.label();
   var typeGroup = node.typeGroup();
   var nodeType = node.type();
   var frameName = nodeType.get('property_frame');
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      o._frameSet.selectObject(typeGroup, frameName, containerName);
   }else if(typeGroup == MO.EDuiTreeNodeGroup.Item){
      o._frameSet.selectObject(typeGroup, frameName, containerName, node.guid());
   }
}
MO.FEditorDsListCatalogContent_construct = function FEditorDsListCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o.loadUrl('/content.define.tree.ws?action=query&code=editor.design.list');
}
MO.FEditorDsListCatalogContent_selectObject = function FEditorDsListCatalogContent_selectObject(item){
   var o = this;
   if(item){
      o.processSelectedListener(item, true);
   }
}
MO.FEditorDsListCatalogContent_showObject = function FEditorDsListCatalogContent_showObject(item){
   var o = this;
   if(MO.Class.isClass(item, MO.FDsSceneRenderable)){
      var renderableNodes = o._renderableNodes;
      var renderableCount = renderableNodes.count();
      for(var i = 0; i < renderableCount; i++){
         var renderableNode = renderableNodes.at(i);
         var renderable = renderableNode.dataPropertyGet('linker');
         if(renderable == item){
            o.processSelectedListener(item, false);
         }
      }
   }
}
MO.FEditorDsListCatalogContent_dispose = function FEditorDsListCatalogContent_dispose(){
   var o = this;
   o._activeFrame = null;
   o.__base.FUiDataTreeView.dispose.call(o);
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
   o._frameName   = 'editor.design.list.FrameSet';
   o.onBuilded    = MO.FEditorDsListFrameSet_onBuilded;
   o.construct    = MO.FEditorDsListFrameSet_construct;
   o.selectObject = MO.FEditorDsListFrameSet_selectObject;
   o.load         = MO.FEditorDsListFrameSet_load;
   o.dispose      = MO.FEditorDsListFrameSet_dispose;
   return o;
}
MO.FEditorDsListFrameSet_onBuilded = function FEditorDsListFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
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
}
MO.FEditorDsListFrameSet_construct = function FEditorDsListFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsListFrameSet_selectObject = function FEditorDsListFrameSet_selectObject(typeGroup, propertyFrame, containerName, controlName){
   var o = this;
   o.hidePropertyFrames();
   var frame = o.findPropertyFrame(propertyFrame);
   frame.show();
   frame.load(containerName, controlName);
}
MO.FEditorDsListFrameSet_load = function FEditorDsListFrameSet_load(name){
   var o = this;
}
MO.FEditorDsListFrameSet_dispose = function FEditorDsListFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsListItemProperty = function FEditorDsListItemProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   o._containerName = MO.Class.register(o, new MO.AGetter('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetter('_itemName'));
   o.onBuilded      = MO.FEditorDsListItemProperty_onBuilded;
   o.onLoad         = MO.FEditorDsListItemProperty_onLoad;
   o.onDataChanged  = MO.FEditorDsListItemProperty_onDataChanged;
   o.construct      = MO.FEditorDsListItemProperty_construct;
   o.load           = MO.FEditorDsListItemProperty_load;
   o.dispose        = MO.FEditorDsListItemProperty_dispose;
   return o;
}
MO.FEditorDsListItemProperty_onBuilded = function FEditorDsListItemProperty_onBuilded(p){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, p);
}
MO.FEditorDsListItemProperty_onLoad = function FEditorDsListItemProperty_onLoad(event){
   var o = this;
   var xcontent = event.content;
   var xconfig = xcontent.nodes().first();
   var isValid = xconfig.get('is_valid');
   var name = xconfig.get('name');
   var label = xconfig.get('label');
   o._controlName.set(name);
   o._controlLabel.set(label);
}
MO.FEditorDsListItemProperty_onDataChanged = function FEditorDsListItemProperty_onDataChanged(event){
   var o  = this;
   var frame = o._activeFrame;
   var control = o._activeControl;
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}
MO.FEditorDsListItemProperty_construct = function FEditorDsListItemProperty_construct(){
   var o = this;
   o.__base.FDuiForm.construct.call(o);
}
MO.FEditorDsListItemProperty_load = function FEditorDsListItemProperty_load(containerName, itemName){
   var o = this;
   var url = '/editor.design.list.ws?action=queryItem&container=' + containerName + '&item=' + itemName;
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEditorDsListItemProperty_dispose = function FEditorDsListItemProperty_dispose(){
   var o = this;
   o.__base.FDuiForm.dispose.call(o);
}
MO.FEditorDsListListProperty = function FEditorDsListListProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   o._containerName = MO.Class.register(o, new MO.AGetter('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetter('_itemName'));
   o.onBuilded      = MO.FEditorDsListListProperty_onBuilded;
   o.onLoad         = MO.FEditorDsListListProperty_onLoad;
   o.onDataChanged  = MO.FEditorDsListListProperty_onDataChanged;
   o.construct      = MO.FEditorDsListListProperty_construct;
   o.load           = MO.FEditorDsListListProperty_load;
   o.dispose        = MO.FEditorDsListListProperty_dispose;
   return o;
}
MO.FEditorDsListListProperty_onBuilded = function FEditorDsListListProperty_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
}
MO.FEditorDsListListProperty_onLoad = function FEditorDsListListProperty_onLoad(event){
   var o = this;
   var xcontent = event.content;
   var xconfig = xcontent.nodes().first();
   var isValid = xconfig.get('is_valid');
   var name = xconfig.get('name');
   var label = xconfig.get('label');
   o._controlName.set(name);
   o._controlLabel.set(label);
}
MO.FEditorDsListListProperty_onDataChanged = function FEditorDsListListProperty_onDataChanged(event){
   var o  = this;
   o.__base.FDuiForm.onDataChanged.call(o, event);
   var frame = o._activeFrame;
   var control = o._activeControl;
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}
MO.FEditorDsListListProperty_construct = function FEditorDsListListProperty_construct(){
   var o = this;
   o.__base.FDuiForm.construct.call(o);
}
MO.FEditorDsListListProperty_load = function FEditorDsListListProperty_load(containerName){
   var o = this;
   var url = '/editor.design.list.ws?action=queryContainer&container=' + containerName;
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEditorDsListListProperty_dispose = function FEditorDsListListProperty_dispose(){
   var o = this;
   o.__base.FDuiForm.dispose.call(o);
}
MO.FEditorDsListMenuBar = function FEditorDsListMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiMenuBar);
   o._frameName      = 'editor.design.frame.MenuBar';
   o._controlRefresh = null;
   o.onBuilded       = MO.FEditorDsListMenuBar_onBuilded;
   o.onCreateClick   = MO.FEditorDsListMenuBar_onCreateClick;
   o.onUpdateClick   = MO.FEditorDsListMenuBar_onUpdateClick;
   o.onDeleteClick   = MO.FEditorDsListMenuBar_onDeleteClick;
   return o;
}
MO.FEditorDsListMenuBar_onBuilded = function FEditorDsListMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDuiMenuBar.onBuilded.call(o, p);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
MO.FEditorDsListMenuBar_onCreateClick = function FEditorDsListMenuBar_onCreateClick(event){
   var o = this;
}
MO.FEditorDsListMenuBar_onUpdateClick = function FEditorDsListMenuBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet._spaceContent._activeFrame;
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   var xframe = xroot.create('Frame');
   MO.RGuiControl.saveConfig(frame, xframe);
   return MO.Console.find(MO.FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
}
MO.FEditorDsListMenuBar_onDeleteClick = function FEditorDsListMenuBar_onDeleteClick(event){
   var o = this;
}
MO.FEditorDsListPropertyToolBar = function FEditorDsListPropertyToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName           = 'system.design.frame.PropertyToolBar';
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
