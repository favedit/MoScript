with(MO){
   MO.FDsSystemListCatalogContent = function FDsSystemListCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemListCatalogContent_onNodeClick;
      o.construct    = FDsSystemListCatalogContent_construct;
      o.selectObject = FDsSystemListCatalogContent_selectObject;
      o.showObject   = FDsSystemListCatalogContent_showObject;
      o.dispose      = FDsSystemListCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemListCatalogContent_onNodeClick = function FDsSystemListCatalogContent_onNodeClick(event){
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
   MO.FDsSystemListCatalogContent_construct = function FDsSystemListCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.list');
   }
   MO.FDsSystemListCatalogContent_selectObject = function FDsSystemListCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemListCatalogContent_showObject = function FDsSystemListCatalogContent_showObject(item){
      var o = this;
      if(RClass.isClass(item, FDsSceneRenderable)){
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
   MO.FDsSystemListCatalogContent_dispose = function FDsSystemListCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListCatalogToolBar = function FDsSystemListCatalogToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemListCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemListCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemListCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemListCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemListCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemListCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemListCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemListCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemListCatalogToolBar_construct;
      o.dispose                      = FDsSystemListCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemListCatalogToolBar_onBuilded = function FDsSystemListCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemListCatalogToolBar_onFolderCreateClick = function FDsSystemListCatalogToolBar_onFolderCreateClick(event){
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
   MO.FDsSystemListCatalogToolBar_onFolderDeleteLoad = function FDsSystemListCatalogToolBar_onFolderDeleteLoad(event){
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
   MO.FDsSystemListCatalogToolBar_onFolderDeleteExcute = function FDsSystemListCatalogToolBar_onFolderDeleteExcute(event){
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
   MO.FDsSystemListCatalogToolBar_onFolderDeleteClick = function FDsSystemListCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemListCatalogToolBar_onFolderPropertyClick = function FDsSystemListCatalogToolBar_onFolderPropertyClick(event){
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
   MO.FDsSystemListCatalogToolBar_onFolderOpenClick = function FDsSystemListCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemListCatalogToolBar_onFolderCloseClick = function FDsSystemListCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemListCatalogToolBar_construct = function FDsSystemListCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemListCatalogToolBar_dispose = function FDsSystemListCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListFrameSet = function FDsSystemListFrameSet(o){
      o = RClass.inherits(this, o, FDsSystemDesignFrameSet);
      o._frameName   = 'system.design.list.FrameSet';
      o.onBuilded    = FDsSystemListFrameSet_onBuilded;
      o.construct    = FDsSystemListFrameSet_construct;
      o.selectObject = FDsSystemListFrameSet_selectObject;
      o.load         = FDsSystemListFrameSet_load;
      o.dispose      = FDsSystemListFrameSet_dispose;
      return o;
   }
   MO.FDsSystemListFrameSet_onBuilded = function FDsSystemListFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = RClass.create(FDsSystemListCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = RClass.create(FDsSystemListCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._propertyToolbar = RClass.create(FDsSystemListPropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }
   MO.FDsSystemListFrameSet_construct = function FDsSystemListFrameSet_construct(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.construct.call(o);
   }
   MO.FDsSystemListFrameSet_selectObject = function FDsSystemListFrameSet_selectObject(typeGroup, propertyFrame, controlName){
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
   MO.FDsSystemListFrameSet_load = function FDsSystemListFrameSet_load(name){
      var o = this;
      if(name){
         o._spaceContent.loadFrame(name);
      }
   }
   MO.FDsSystemListFrameSet_dispose = function FDsSystemListFrameSet_dispose(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListMenuBar = function FDsSystemListMenuBar(o){
      o = RClass.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemListMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemListMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemListMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemListMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemListMenuBar_onBuilded = function FDsSystemListMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemListMenuBar_onCreateClick = function FDsSystemListMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemListMenuBar_onUpdateClick = function FDsSystemListMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemListMenuBar_onDeleteClick = function FDsSystemListMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemListPropertyContent = function FDsSystemListPropertyContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemListPropertyContent_onBuild;
      o.onNodeClick    = FDsSystemListPropertyContent_onNodeClick;
      o.construct      = FDsSystemListPropertyContent_construct;
      o.buildTechnique = FDsSystemListPropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemListPropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemListPropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemListPropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemListPropertyContent_buildSpace;
      o.dispose        = FDsSystemListPropertyContent_dispose;
      return o;
   }
   MO.FDsSystemListPropertyContent_onBuild = function FDsSystemListPropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemListPropertyContent_onNodeClick = function FDsSystemListPropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemListPropertyContent_construct = function FDsSystemListPropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemListPropertyContent_buildTechnique = function FDsSystemListPropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemListPropertyContent_buildRegion = function FDsSystemListPropertyContent_buildRegion(n, p){
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
   MO.FDsSystemListPropertyContent_buildMaterial = function FDsSystemListPropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemListPropertyContent_buildDisplay = function FDsSystemListPropertyContent_buildDisplay(parentNode, display){
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
   MO.FDsSystemListPropertyContent_buildSpace = function FDsSystemListPropertyContent_buildSpace(space){
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
   MO.FDsSystemListPropertyContent_dispose = function FDsSystemListPropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemListPropertyToolBar = function FDsSystemListPropertyToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemListPropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemListPropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemListPropertyToolBar_construct;
      o.dispose              = FDsSystemListPropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemListPropertyToolBar_onBuilded = function FDsSystemListPropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemListPropertyToolBar_onUpdateClick = function FDsSystemListPropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemListPropertyToolBar_construct = function FDsSystemListPropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemListPropertyToolBar_dispose = function FDsSystemListPropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
