with(MO){
   MO.FDsSystemTreeCatalogContent = function FDsSystemTreeCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemTreeCatalogContent_onNodeClick;
      o.construct    = FDsSystemTreeCatalogContent_construct;
      o.selectObject = FDsSystemTreeCatalogContent_selectObject;
      o.showObject   = FDsSystemTreeCatalogContent_showObject;
      o.dispose      = FDsSystemTreeCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemTreeCatalogContent_onNodeClick = function FDsSystemTreeCatalogContent_onNodeClick(event){
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
   MO.FDsSystemTreeCatalogContent_construct = function FDsSystemTreeCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.tree');
   }
   MO.FDsSystemTreeCatalogContent_selectObject = function FDsSystemTreeCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemTreeCatalogContent_showObject = function FDsSystemTreeCatalogContent_showObject(item){
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
   MO.FDsSystemTreeCatalogContent_dispose = function FDsSystemTreeCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreeCatalogToolBar = function FDsSystemTreeCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemTreeCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemTreeCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemTreeCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemTreeCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemTreeCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemTreeCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemTreeCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemTreeCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemTreeCatalogToolBar_construct;
      o.dispose                      = FDsSystemTreeCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemTreeCatalogToolBar_onBuilded = function FDsSystemTreeCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderCreateClick = function FDsSystemTreeCatalogToolBar_onFolderCreateClick(event){
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
   MO.FDsSystemTreeCatalogToolBar_onFolderDeleteLoad = function FDsSystemTreeCatalogToolBar_onFolderDeleteLoad(event){
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
   MO.FDsSystemTreeCatalogToolBar_onFolderDeleteExcute = function FDsSystemTreeCatalogToolBar_onFolderDeleteExcute(event){
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
   MO.FDsSystemTreeCatalogToolBar_onFolderDeleteClick = function FDsSystemTreeCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderPropertyClick = function FDsSystemTreeCatalogToolBar_onFolderPropertyClick(event){
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
   MO.FDsSystemTreeCatalogToolBar_onFolderOpenClick = function FDsSystemTreeCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemTreeCatalogToolBar_onFolderCloseClick = function FDsSystemTreeCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemTreeCatalogToolBar_construct = function FDsSystemTreeCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemTreeCatalogToolBar_dispose = function FDsSystemTreeCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreeFrameSet = function FDsSystemTreeFrameSet(o){
      o = MO.Class.inherits(this, o, FDsSystemDesignFrameSet);
      o._frameName   = 'system.design.tree.FrameSet';
      o.onBuilded    = FDsSystemTreeFrameSet_onBuilded;
      o.construct    = FDsSystemTreeFrameSet_construct;
      o.selectObject = FDsSystemTreeFrameSet_selectObject;
      o.load         = FDsSystemTreeFrameSet_load;
      o.dispose      = FDsSystemTreeFrameSet_dispose;
      return o;
   }
   MO.FDsSystemTreeFrameSet_onBuilded = function FDsSystemTreeFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsSystemTreeCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsSystemTreeCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._propertyToolbar = MO.Class.create(FDsSystemTreePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
   }
   MO.FDsSystemTreeFrameSet_construct = function FDsSystemTreeFrameSet_construct(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.construct.call(o);
   }
   MO.FDsSystemTreeFrameSet_selectObject = function FDsSystemTreeFrameSet_selectObject(typeGroup, propertyFrame, controlName){
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
   MO.FDsSystemTreeFrameSet_load = function FDsSystemTreeFrameSet_load(name){
      var o = this;
      if(name){
         o._spaceContent.loadFrame(name);
      }
   }
   MO.FDsSystemTreeFrameSet_dispose = function FDsSystemTreeFrameSet_dispose(){
      var o = this;
      o.__base.FDsSystemDesignFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreeMenuBar = function FDsSystemTreeMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemTreeMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemTreeMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemTreeMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemTreeMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemTreeMenuBar_onBuilded = function FDsSystemTreeMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemTreeMenuBar_onCreateClick = function FDsSystemTreeMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemTreeMenuBar_onUpdateClick = function FDsSystemTreeMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemTreeMenuBar_onDeleteClick = function FDsSystemTreeMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemTreePropertyContent = function FDsSystemTreePropertyContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemTreePropertyContent_onBuild;
      o.onNodeClick    = FDsSystemTreePropertyContent_onNodeClick;
      o.construct      = FDsSystemTreePropertyContent_construct;
      o.buildTechnique = FDsSystemTreePropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemTreePropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemTreePropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemTreePropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemTreePropertyContent_buildSpace;
      o.dispose        = FDsSystemTreePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemTreePropertyContent_onBuild = function FDsSystemTreePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemTreePropertyContent_onNodeClick = function FDsSystemTreePropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemTreePropertyContent_construct = function FDsSystemTreePropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemTreePropertyContent_buildTechnique = function FDsSystemTreePropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemTreePropertyContent_buildRegion = function FDsSystemTreePropertyContent_buildRegion(n, p){
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
   MO.FDsSystemTreePropertyContent_buildMaterial = function FDsSystemTreePropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemTreePropertyContent_buildDisplay = function FDsSystemTreePropertyContent_buildDisplay(parentNode, display){
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
   MO.FDsSystemTreePropertyContent_buildSpace = function FDsSystemTreePropertyContent_buildSpace(space){
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
   MO.FDsSystemTreePropertyContent_dispose = function FDsSystemTreePropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemTreePropertyToolBar = function FDsSystemTreePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemTreePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemTreePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemTreePropertyToolBar_construct;
      o.dispose              = FDsSystemTreePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemTreePropertyToolBar_onBuilded = function FDsSystemTreePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemTreePropertyToolBar_onUpdateClick = function FDsSystemTreePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemTreePropertyToolBar_construct = function FDsSystemTreePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSystemTreePropertyToolBar_dispose = function FDsSystemTreePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
