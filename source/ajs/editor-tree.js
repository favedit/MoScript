MO.FEditorDsTreeCatalogContent = function FEditorDsTreeCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FUiDataTreeView, MO.MListenerSelected);
   o._activeFrame = null;
   o.onNodeClick  = MO.FEditorDsTreeCatalogContent_onNodeClick;
   o.construct    = MO.FEditorDsTreeCatalogContent_construct;
   o.selectObject = MO.FEditorDsTreeCatalogContent_selectObject;
   o.showObject   = MO.FEditorDsTreeCatalogContent_showObject;
   o.dispose      = MO.FEditorDsTreeCatalogContent_dispose;
   return o;
}
MO.FEditorDsTreeCatalogContent_onNodeClick = function FEditorDsTreeCatalogContent_onNodeClick(event){
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
MO.FEditorDsTreeCatalogContent_construct = function FEditorDsTreeCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.tree');
}
MO.FEditorDsTreeCatalogContent_selectObject = function FEditorDsTreeCatalogContent_selectObject(item){
   var o = this;
   if(item){
      o.processSelectedListener(item, true);
   }
}
MO.FEditorDsTreeCatalogContent_showObject = function FEditorDsTreeCatalogContent_showObject(item){
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
MO.FEditorDsTreeCatalogContent_dispose = function FEditorDsTreeCatalogContent_dispose(){
   var o = this;
   o._activeFrame = null;
   o.__base.FUiDataTreeView.dispose.call(o);
}
MO.FEditorDsTreeCatalogToolBar = function FEditorDsTreeCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName                   = 'editor.design.frame.CatalogToolBar';
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onBuilded                    = MO.FEditorDsTreeCatalogToolBar_onBuilded;
   o.onFolderCreateClick          = MO.FEditorDsTreeCatalogToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = MO.FEditorDsTreeCatalogToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = MO.FEditorDsTreeCatalogToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = MO.FEditorDsTreeCatalogToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = MO.FEditorDsTreeCatalogToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = MO.FEditorDsTreeCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = MO.FEditorDsTreeCatalogToolBar_onFolderCloseClick;
   o.construct                    = MO.FEditorDsTreeCatalogToolBar_construct;
   o.dispose                      = MO.FEditorDsTreeCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsTreeCatalogToolBar_onBuilded = function FEditorDsTreeCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsTreeCatalogToolBar_onFolderCreateClick = function FEditorDsTreeCatalogToolBar_onFolderCreateClick(event){
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
MO.FEditorDsTreeCatalogToolBar_onFolderDeleteLoad = function FEditorDsTreeCatalogToolBar_onFolderDeleteLoad(event){
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
MO.FEditorDsTreeCatalogToolBar_onFolderDeleteExcute = function FEditorDsTreeCatalogToolBar_onFolderDeleteExcute(event){
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
MO.FEditorDsTreeCatalogToolBar_onFolderDeleteClick = function FEditorDsTreeCatalogToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = MO.Console.find(MO.FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
MO.FEditorDsTreeCatalogToolBar_onFolderPropertyClick = function FEditorDsTreeCatalogToolBar_onFolderPropertyClick(event){
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
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._nodeGuid = node._guid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel(node.label());
   dialog.switchDataMode(MO.EUiDataMode.Update);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsTreeCatalogToolBar_onFolderOpenClick = function FEditorDsTreeCatalogToolBar_onFolderOpenClick(event){
}
MO.FEditorDsTreeCatalogToolBar_onFolderCloseClick = function FEditorDsTreeCatalogToolBar_onFolderCloseClick(event){
}
MO.FEditorDsTreeCatalogToolBar_construct = function FEditorDsTreeCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsTreeCatalogToolBar_dispose = function FEditorDsTreeCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsTreeFrameSet = function FEditorDsTreeFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName   = 'editor.design.tree.FrameSet';
   o.onBuilded    = MO.FEditorDsTreeFrameSet_onBuilded;
   o.construct    = MO.FEditorDsTreeFrameSet_construct;
   o.selectObject = MO.FEditorDsTreeFrameSet_selectObject;
   o.load         = MO.FEditorDsTreeFrameSet_load;
   o.dispose      = MO.FEditorDsTreeFrameSet_dispose;
   return o;
}
MO.FEditorDsTreeFrameSet_onBuilded = function FEditorDsTreeFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsTreeCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsTreeCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsTreePropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
}
MO.FEditorDsTreeFrameSet_construct = function FEditorDsTreeFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsTreeFrameSet_selectObject = function FEditorDsTreeFrameSet_selectObject(typeGroup, propertyFrame, controlName){
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
MO.FEditorDsTreeFrameSet_load = function FEditorDsTreeFrameSet_load(name){
   var o = this;
   if(name){
      o._spaceContent.loadFrame(name);
   }
}
MO.FEditorDsTreeFrameSet_dispose = function FEditorDsTreeFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsTreeMenuBar = function FEditorDsTreeMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiMenuBar);
   o._frameName      = 'editor.design.frame.MenuBar';
   o._controlRefresh = null;
   o.onBuilded       = MO.FEditorDsTreeMenuBar_onBuilded;
   o.onCreateClick   = MO.FEditorDsTreeMenuBar_onCreateClick;
   o.onUpdateClick   = MO.FEditorDsTreeMenuBar_onUpdateClick;
   o.onDeleteClick   = MO.FEditorDsTreeMenuBar_onDeleteClick;
   return o;
}
MO.FEditorDsTreeMenuBar_onBuilded = function FEditorDsTreeMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDuiMenuBar.onBuilded.call(o, p);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
MO.FEditorDsTreeMenuBar_onCreateClick = function FEditorDsTreeMenuBar_onCreateClick(event){
   var o = this;
}
MO.FEditorDsTreeMenuBar_onUpdateClick = function FEditorDsTreeMenuBar_onUpdateClick(event){
   var o = this;
   var frame = o._frameSet._spaceContent._activeFrame;
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   var xframe = xroot.create('Frame');
   MO.RGuiControl.saveConfig(frame, xframe);
   return MO.Console.find(MO.FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
}
MO.FEditorDsTreeMenuBar_onDeleteClick = function FEditorDsTreeMenuBar_onDeleteClick(event){
   var o = this;
}
MO.FEditorDsTreePropertyContent = function FEditorDsTreePropertyContent(o){
   o = MO.Class.inherits(this, o, MO.FDsCatalog);
   o.onBuild        = MO.FEditorDsTreePropertyContent_onBuild;
   o.onNodeClick    = MO.FEditorDsTreePropertyContent_onNodeClick;
   o.construct      = MO.FEditorDsTreePropertyContent_construct;
   o.buildTechnique = MO.FEditorDsTreePropertyContent_buildTechnique;
   o.buildRegion    = MO.FEditorDsTreePropertyContent_buildRegion;
   o.buildMaterial  = MO.FEditorDsTreePropertyContent_buildMaterial;
   o.buildDisplay   = MO.FEditorDsTreePropertyContent_buildDisplay;
   o.buildSpace     = MO.FEditorDsTreePropertyContent_buildSpace;
   o.dispose        = MO.FEditorDsTreePropertyContent_dispose;
   return o;
}
MO.FEditorDsTreePropertyContent_onBuild = function FEditorDsTreePropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCatalog.onBuild.call(o, p);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
}
MO.FEditorDsTreePropertyContent_onNodeClick = function FEditorDsTreePropertyContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
MO.FEditorDsTreePropertyContent_construct = function FEditorDsTreePropertyContent_construct(){
   var o = this;
   o.__base.FDsCatalog.construct.call(o);
}
MO.FEditorDsTreePropertyContent_buildTechnique = function FEditorDsTreePropertyContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
MO.FEditorDsTreePropertyContent_buildRegion = function FEditorDsTreePropertyContent_buildRegion(n, p){
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
MO.FEditorDsTreePropertyContent_buildMaterial = function FEditorDsTreePropertyContent_buildMaterial(parentNode, material){
   var o = this;
   var resource = material.resource();
   var node = o.createNode();
   node.setTypeCode('Material');
   node.setLabel(resource.code());
   node.setNote(resource.label());
   node.dataPropertySet('linker', material);
   parentNode.appendNode(node);
}
MO.FEditorDsTreePropertyContent_buildDisplay = function FEditorDsTreePropertyContent_buildDisplay(parentNode, display){
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
MO.FEditorDsTreePropertyContent_buildSpace = function FEditorDsTreePropertyContent_buildSpace(space){
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
MO.FEditorDsTreePropertyContent_dispose = function FEditorDsTreePropertyContent_dispose(){
   var o = this;
   o.__base.FDsCatalog.dispose.call(o);
}
MO.FEditorDsTreePropertyToolBar = function FEditorDsTreePropertyToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName           = 'system.design.frame.PropertyToolBar';
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   o.onBuilded            = MO.FEditorDsTreePropertyToolBar_onBuilded;
   o.onUpdateClick        = MO.FEditorDsTreePropertyToolBar_onUpdateClick;
   o.construct            = MO.FEditorDsTreePropertyToolBar_construct;
   o.dispose              = MO.FEditorDsTreePropertyToolBar_dispose;
   return o;
}
MO.FEditorDsTreePropertyToolBar_onBuilded = function FEditorDsTreePropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsTreePropertyToolBar_onUpdateClick = function FEditorDsTreePropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}
MO.FEditorDsTreePropertyToolBar_construct = function FEditorDsTreePropertyToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsTreePropertyToolBar_dispose = function FEditorDsTreePropertyToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
