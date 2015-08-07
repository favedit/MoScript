MO.FEditorDsPersistenceCatalogContent = function FEditorDsPersistenceCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FUiDataTreeView, MO.MListenerSelected);
   o._activeFrame = null;
   o.onNodeClick  = MO.FEditorDsPersistenceCatalogContent_onNodeClick;
   o.construct    = MO.FEditorDsPersistenceCatalogContent_construct;
   o.selectObject = MO.FEditorDsPersistenceCatalogContent_selectObject;
   o.showObject   = MO.FEditorDsPersistenceCatalogContent_showObject;
   o.dispose      = MO.FEditorDsPersistenceCatalogContent_dispose;
   return o;
}
MO.FEditorDsPersistenceCatalogContent_onNodeClick = function FEditorDsPersistenceCatalogContent_onNodeClick(event){
   var o = this;
   var node = event.node;
   var typeGroup = node.typeGroup();
   var nodeType = node.type();
   var typeCode = node.typeCode();
   var frameName = nodeType.get('property_frame');
   var label = node.label();
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      o._frameSet.load(label);
      o._frameSet.selectObject(typeGroup, frameName, null);
   }else if(typeGroup == MO.EDuiTreeNodeGroup.Item){
      o._frameSet.selectObject(typeGroup, frameName, label);
   }
}
MO.FEditorDsPersistenceCatalogContent_construct = function FEditorDsPersistenceCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.persistence');
}
MO.FEditorDsPersistenceCatalogContent_selectObject = function FEditorDsPersistenceCatalogContent_selectObject(item){
   var o = this;
   if(item){
      o.processSelectedListener(item, true);
   }
}
MO.FEditorDsPersistenceCatalogContent_showObject = function FEditorDsPersistenceCatalogContent_showObject(item){
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
MO.FEditorDsPersistenceCatalogContent_dispose = function FEditorDsPersistenceCatalogContent_dispose(){
   var o = this;
   o._activeFrame = null;
   o.__base.FUiDataTreeView.dispose.call(o);
}
MO.FEditorDsPersistenceCatalogToolBar = function FEditorDsPersistenceCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName = 'editor.design.frame.CatalogToolBar';
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
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
MO.FEditorDsPersistenceCatalogToolBar_onBuilded = function FEditorDsPersistenceCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
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
   o._frameName   = 'editor.design.persistence.FrameSet';
   o.onBuilded    = MO.FEditorDsPersistenceFrameSet_onBuilded;
   o.construct    = MO.FEditorDsPersistenceFrameSet_construct;
   o.selectObject = MO.FEditorDsPersistenceFrameSet_selectObject;
   o.load         = MO.FEditorDsPersistenceFrameSet_load;
   o.dispose      = MO.FEditorDsPersistenceFrameSet_dispose;
   return o;
}
MO.FEditorDsPersistenceFrameSet_onBuilded = function FEditorDsPersistenceFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
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
   var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsPersistencePropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
}
MO.FEditorDsPersistenceFrameSet_construct = function FEditorDsPersistenceFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsPersistenceFrameSet_selectObject = function FEditorDsPersistenceFrameSet_selectObject(typeGroup, propertyFrame, controlName){
   var o = this;
   var activeFrame = o._spaceContent._activeFrame;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
   var frame = o.findPropertyFrame(propertyFrame);
   frame.show();
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      frame.loadObject(activeFrame, activeFrame);
   }else{
      var activeControl = activeFrame.findComponent(controlName);
      frame.loadObject(activeFrame, activeControl);
      o._spaceContent.selectControl(activeControl);
   }
}
MO.FEditorDsPersistenceFrameSet_load = function FEditorDsPersistenceFrameSet_load(name){
   var o = this;
   if(name){
      o._spaceContent.loadFrame(name);
   }
}
MO.FEditorDsPersistenceFrameSet_dispose = function FEditorDsPersistenceFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsPersistenceMenuBar = function FEditorDsPersistenceMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiMenuBar);
   o._frameName      = 'editor.design.frame.MenuBar';
   o._controlRefresh = null;
   o.onBuilded       = MO.FEditorDsPersistenceMenuBar_onBuilded;
   o.onCreateClick   = MO.FEditorDsPersistenceMenuBar_onCreateClick;
   o.onUpdateClick   = MO.FEditorDsPersistenceMenuBar_onUpdateClick;
   o.onDeleteClick   = MO.FEditorDsPersistenceMenuBar_onDeleteClick;
   return o;
}
MO.FEditorDsPersistenceMenuBar_onBuilded = function FEditorDsPersistenceMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDuiMenuBar.onBuilded.call(o, p);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
MO.FEditorDsPersistenceMenuBar_onCreateClick = function FEditorDsPersistenceMenuBar_onCreateClick(event){
   var o = this;
}
MO.FEditorDsPersistenceMenuBar_onUpdateClick = function FEditorDsPersistenceMenuBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet._spaceContent._activeFrame;
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   var xframe = xroot.create('Frame');
   MO.RGuiControl.saveConfig(frame, xframe);
   return MO.Console.find(MO.FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
}
MO.FEditorDsPersistenceMenuBar_onDeleteClick = function FEditorDsPersistenceMenuBar_onDeleteClick(event){
   var o = this;
}
MO.FEditorDsPersistencePropertyContent = function FEditorDsPersistencePropertyContent(o){
   o = MO.Class.inherits(this, o, MO.FDsCatalog);
   o.onBuild        = MO.FEditorDsPersistencePropertyContent_onBuild;
   o.onNodeClick    = MO.FEditorDsPersistencePropertyContent_onNodeClick;
   o.construct      = MO.FEditorDsPersistencePropertyContent_construct;
   o.buildTechnique = MO.FEditorDsPersistencePropertyContent_buildTechnique;
   o.buildRegion    = MO.FEditorDsPersistencePropertyContent_buildRegion;
   o.buildMaterial  = MO.FEditorDsPersistencePropertyContent_buildMaterial;
   o.buildDisplay   = MO.FEditorDsPersistencePropertyContent_buildDisplay;
   o.buildSpace     = MO.FEditorDsPersistencePropertyContent_buildSpace;
   o.dispose        = MO.FEditorDsPersistencePropertyContent_dispose;
   return o;
}
MO.FEditorDsPersistencePropertyContent_onBuild = function FEditorDsPersistencePropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCatalog.onBuild.call(o, p);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
}
MO.FEditorDsPersistencePropertyContent_onNodeClick = function FEditorDsPersistencePropertyContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
MO.FEditorDsPersistencePropertyContent_construct = function FEditorDsPersistencePropertyContent_construct(){
   var o = this;
   o.__base.FDsCatalog.construct.call(o);
}
MO.FEditorDsPersistencePropertyContent_buildTechnique = function FEditorDsPersistencePropertyContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
MO.FEditorDsPersistencePropertyContent_buildRegion = function FEditorDsPersistencePropertyContent_buildRegion(n, p){
   var o = this;
   var nr = o.createNode();
   nr.setLabel('Region');
   nr.setTypeCode('region');
   nr.dataPropertySet('linker', p);
   n.appendNode(nr);
   var nc = o.createNode();
   nc.setLabel('Camera');
   nc.setTypeCode('camera');
   nc.dataPropertySet('linker', p.camera());
   nr.appendNode(nc);
   var nl = o.createNode();
   nl.setLabel('Light');
   nl.setTypeCode('light');
   nl.dataPropertySet('linker', p.directionalLight());
   nr.appendNode(nl);
}
MO.FEditorDsPersistencePropertyContent_buildMaterial = function FEditorDsPersistencePropertyContent_buildMaterial(parentNode, material){
   var o = this;
   var resource = material.resource();
   var node = o.createNode();
   node.setTypeCode('Material');
   node.setLabel(resource.code());
   node.setNote(resource.label());
   node.dataPropertySet('linker', material);
   parentNode.appendNode(node);
}
MO.FEditorDsPersistencePropertyContent_buildDisplay = function FEditorDsPersistencePropertyContent_buildDisplay(parentNode, display){
   var o = this;
   var resource = display.resource();
   var node = o.createNode();
   node.setTypeCode('Display');
   node.setLabel(MO.Lang.String.nvl(resource.code(), 'Display'));
   node.setNote(resource.label());
   node.dataPropertySet('linker', display);
   parentNode.appendNode(node);
   var renderables = display.renderables();
   var renderableCount = renderables.count();
   if(renderableCount > 0){
      for(var i = 0; i < renderableCount; i++){
         var renderable = renderables.at(i);
         var renderableResource = renderable.resource();
         var renderableNode = o.createNode();
         renderableNode.setTypeCode('Renderable');
         renderableNode.setLabel(renderableResource.code());
         renderableNode.setNote(renderableResource.label());
         renderableNode.dataPropertySet('linker', renderable);
         node.appendNode(renderableNode);
      }
   }
}
MO.FEditorDsPersistencePropertyContent_buildSpace = function FEditorDsPersistencePropertyContent_buildSpace(space){
   var o = this;
   o.clearAllNodes();
   var resource = space.resource();
   var spaceNode = o.createNode();
   spaceNode.setTypeCode('Space');
   spaceNode.setLabel(resource.code());
   spaceNode.setNote(resource.label());
   spaceNode.dataPropertySet('linker', space);
   o.appendNode(spaceNode);
   o.buildTechnique(spaceNode, space.technique())
   o.buildRegion(spaceNode, space.region());
   var materialsNode = o.createNode();
   materialsNode.setTypeCode('Region');
   materialsNode.setLabel('Materials');
   spaceNode.appendNode(materialsNode);
   var materials = space.materials();
   var materialCount = materials.count();
   for(var i = 0; i < materialCount; i++){
      var material = materials.at(i);
      o.buildMaterial(materialsNode, material);
   }
   var displaysNode = o.createNode();
   displaysNode.setTypeCode('Region');
   displaysNode.setLabel('Displays');
   spaceNode.appendNode(displaysNode);
   var displays = space._sprites;
   var displayCount = displays.count();
   for(var i = 0; i < displayCount; i++){
      var display = displays.at(i);
      o.buildDisplay(displaysNode, display);
   }
   spaceNode.click();
}
MO.FEditorDsPersistencePropertyContent_dispose = function FEditorDsPersistencePropertyContent_dispose(){
   var o = this;
   o.__base.FDsCatalog.dispose.call(o);
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
