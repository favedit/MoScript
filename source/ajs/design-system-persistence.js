with(MO){
   MO.FDsSystemPersistenceCatalogContent = function FDsSystemPersistenceCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemPersistenceCatalogContent_onNodeClick;
      o.construct    = FDsSystemPersistenceCatalogContent_construct;
      o.selectObject = FDsSystemPersistenceCatalogContent_selectObject;
      o.showObject   = FDsSystemPersistenceCatalogContent_showObject;
      o.dispose      = FDsSystemPersistenceCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemPersistenceCatalogContent_onNodeClick = function FDsSystemPersistenceCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EDuiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }
   MO.FDsSystemPersistenceCatalogContent_construct = function FDsSystemPersistenceCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.persistence');
   }
   MO.FDsSystemPersistenceCatalogContent_selectObject = function FDsSystemPersistenceCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemPersistenceCatalogContent_showObject = function FDsSystemPersistenceCatalogContent_showObject(item){
      var o = this;
      if(MO.Class.isClass(item, FDsSceneRenderable)){
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
   MO.FDsSystemPersistenceCatalogContent_dispose = function FDsSystemPersistenceCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistenceCatalogToolBar = function FDsSystemPersistenceCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemPersistenceCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemPersistenceCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemPersistenceCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemPersistenceCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemPersistenceCatalogToolBar_construct;
      o.dispose                      = FDsSystemPersistenceCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemPersistenceCatalogToolBar_onBuilded = function FDsSystemPersistenceCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderCreateClick = function FDsSystemPersistenceCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick = function FDsSystemPersistenceCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick = function FDsSystemPersistenceCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderOpenClick = function FDsSystemPersistenceCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemPersistenceCatalogToolBar_onFolderCloseClick = function FDsSystemPersistenceCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemPersistenceCatalogToolBar_construct = function FDsSystemPersistenceCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemPersistenceCatalogToolBar_dispose = function FDsSystemPersistenceCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistenceFrameSet = function FDsSystemPersistenceFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSystemDesignFrameSet);
      o._frameName   = 'system.design.persistence.FrameSet';
      o.onBuilded    = FDsSystemPersistenceFrameSet_onBuilded;
      o.construct    = FDsSystemPersistenceFrameSet_construct;
      o.selectObject = FDsSystemPersistenceFrameSet_selectObject;
      o.load         = FDsSystemPersistenceFrameSet_load;
      o.dispose      = FDsSystemPersistenceFrameSet_dispose;
      return o;
   }
   MO.FDsSystemPersistenceFrameSet_onBuilded = function FDsSystemPersistenceFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsSystemPersistenceCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsSystemPersistenceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._propertyToolbar = MO.Class.create(FDsSystemPersistencePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }
   MO.FDsSystemPersistenceFrameSet_construct = function FDsSystemPersistenceFrameSet_construct(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.construct.call(o);
   }
   MO.FDsSystemPersistenceFrameSet_selectObject = function FDsSystemPersistenceFrameSet_selectObject(typeGroup, propertyFrame, controlName){
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
      if(typeGroup == EDuiTreeNodeGroup.Container){
         frame.loadObject(activeFrame, activeFrame);
      }else{
         var activeControl = activeFrame.findComponent(controlName);
         frame.loadObject(activeFrame, activeControl);
         o._spaceContent.selectControl(activeControl);
      }
   }
   MO.FDsSystemPersistenceFrameSet_load = function FDsSystemPersistenceFrameSet_load(name){
      var o = this;
      if(name){
         o._spaceContent.loadFrame(name);
      }
   }
   MO.FDsSystemPersistenceFrameSet_dispose = function FDsSystemPersistenceFrameSet_dispose(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistenceMenuBar = function FDsSystemPersistenceMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemPersistenceMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemPersistenceMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemPersistenceMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemPersistenceMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemPersistenceMenuBar_onBuilded = function FDsSystemPersistenceMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemPersistenceMenuBar_onCreateClick = function FDsSystemPersistenceMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemPersistenceMenuBar_onUpdateClick = function FDsSystemPersistenceMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemPersistenceMenuBar_onDeleteClick = function FDsSystemPersistenceMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemPersistencePropertyContent = function FDsSystemPersistencePropertyContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemPersistencePropertyContent_onBuild;
      o.onNodeClick    = FDsSystemPersistencePropertyContent_onNodeClick;
      o.construct      = FDsSystemPersistencePropertyContent_construct;
      o.buildTechnique = FDsSystemPersistencePropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemPersistencePropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemPersistencePropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemPersistencePropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemPersistencePropertyContent_buildSpace;
      o.dispose        = FDsSystemPersistencePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemPersistencePropertyContent_onBuild = function FDsSystemPersistencePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemPersistencePropertyContent_onNodeClick = function FDsSystemPersistencePropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemPersistencePropertyContent_construct = function FDsSystemPersistencePropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemPersistencePropertyContent_buildTechnique = function FDsSystemPersistencePropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemPersistencePropertyContent_buildRegion = function FDsSystemPersistencePropertyContent_buildRegion(n, p){
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
   MO.FDsSystemPersistencePropertyContent_buildMaterial = function FDsSystemPersistencePropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemPersistencePropertyContent_buildDisplay = function FDsSystemPersistencePropertyContent_buildDisplay(parentNode, display){
      var o = this;
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
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
   MO.FDsSystemPersistencePropertyContent_buildSpace = function FDsSystemPersistencePropertyContent_buildSpace(space){
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
   MO.FDsSystemPersistencePropertyContent_dispose = function FDsSystemPersistencePropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemPersistencePropertyToolBar = function FDsSystemPersistencePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemPersistencePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemPersistencePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemPersistencePropertyToolBar_construct;
      o.dispose              = FDsSystemPersistencePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemPersistencePropertyToolBar_onBuilded = function FDsSystemPersistencePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemPersistencePropertyToolBar_onUpdateClick = function FDsSystemPersistencePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemPersistencePropertyToolBar_construct = function FDsSystemPersistencePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemPersistencePropertyToolBar_dispose = function FDsSystemPersistencePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
