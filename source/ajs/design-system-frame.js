with(MO){
   MO.FDsSystemFrameCatalogContent = function FDsSystemFrameCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      o._iconView             = 'resource.scene.view';
      o._iconViewNot          = 'resource.scene.viewno';
      o._displayNodes         = null;
      o._renderableNodes      = null;
      o._materialNodes        = null;
      o.onBuild               = FDsSystemFrameCatalogContent_onBuild;
      o.onLoadDisplay         = FDsSystemFrameCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsSystemFrameCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsSystemFrameCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsSystemFrameCatalogContent_onNodeViewDoubleClick;
      o.construct             = FDsSystemFrameCatalogContent_construct;
      o.buildNodeView         = FDsSystemFrameCatalogContent_buildNodeView;
      o.buildTechnique        = FDsSystemFrameCatalogContent_buildTechnique;
      o.buildRegion           = FDsSystemFrameCatalogContent_buildRegion;
      o.buildRenderable       = FDsSystemFrameCatalogContent_buildRenderable;
      o.buildDisplay          = FDsSystemFrameCatalogContent_buildDisplay;
      o.buildLayer            = FDsSystemFrameCatalogContent_buildLayer;
      o.buildSpace            = FDsSystemFrameCatalogContent_buildSpace;
      o.selectObject          = FDsSystemFrameCatalogContent_selectObject;
      o.showObject            = FDsSystemFrameCatalogContent_showObject;
      o.dispose               = FDsSystemFrameCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemFrameCatalogContent_onBuild = function FDsSystemFrameCatalogContent_onBuild(p){
      var o = this;
      o.__base.FUiDataTreeView.onBuild.call(o, p);
   }
   MO.FDsSystemFrameCatalogContent_onLoadDisplay = function FDsSystemFrameCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsSystemFrameCatalogContent_onNodeClick = function FDsSystemFrameCatalogContent_onNodeClick(tree, node){
      var o = this;
      var linker = node.dataPropertyGet('linker');
      if(linker){
         o.selectObject(linker);
      }
   }
   MO.FDsSystemFrameCatalogContent_onNodeViewClick = function FDsSystemFrameCatalogContent_onNodeViewClick(event){
      var o = this;
      var cell = event.treeNodeCell;
      var linker = event.treeNode.dataPropertyGet('linker');
      if(RClass.isClass(linker, FDisplay)){
         if(event.ctrlKey){
            var displayNodes = o._displayNodes;
            var displayCount = displayNodes.count()
            for(var i = 0; i < displayCount; i++){
               var displayNode = displayNodes.at(i);
               var display = displayNode.dataPropertyGet('linker');
               display._visible = false;
               displayNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
      if(RClass.isClass(linker, FDrawable)){
         if(event.ctrlKey){
            var renderableNodes = o._renderableNodes;
            var renderableCount = renderableNodes.count();
            for(var i = 0; i < renderableCount; i++){
               var renderableNode = renderableNodes.at(i);
               var renderable = renderableNode.dataPropertyGet('linker');
               renderable._visible = false;
               renderableNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
      if(RClass.isClass(linker, FG3dMaterial)){
         if(event.ctrlKey){
            var materialNodes = o._materialNodes;
            var materialCount = materialNodes.count();
            for(var i = 0; i < materialCount; i++){
               var materialNode = materialNodes.at(i);
               var material = materialNode.dataPropertyGet('linker');
               material.setVisible(false);
               materialNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
   }
   MO.FDsSystemFrameCatalogContent_onNodeViewDoubleClick = function FDsSystemFrameCatalogContent_onNodeViewDoubleClick(event){
      var o = this;
      var node = event.treeNode;
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FDisplay)){
         var displayNodes = o._displayNodes;
         var displayCount = displayNodes.count()
         for(var i = 0; i < displayCount; i++){
            var displayNode = displayNodes.at(i);
            var display = displayNode.dataPropertyGet('linker');
            display.setVisible(true);
            displayNode.cell('view').setIcon(o._iconView);
         }
      }
      if(RClass.isClass(linker, FDrawable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            renderable.setVisible(true);
            renderableNode.cell('view').setIcon(o._iconView);
         }
      }
      if(RClass.isClass(linker, FG3dMaterial)){
         var materialNodes = o._materialNodes;
         var materialCount = materialNodes.count();
         for(var i = 0; i < materialCount; i++){
            var materialNode = materialNodes.at(i);
            var material = materialNode.dataPropertyGet('linker');
            material.setVisible(true);
            materialNode.cell('view').setIcon(o._iconView);
         }
      }
   }
   MO.FDsSystemFrameCatalogContent_construct = function FDsSystemFrameCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o._displayNodes = new TObjects();
      o._renderableNodes = new TObjects();
      o._materialNodes = new TObjects();
      o.lsnsClick.register(o, o.onNodeClick);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.frame');
   }
   MO.FDsSystemFrameCatalogContent_buildNodeView = function FDsSystemFrameCatalogContent_buildNodeView(pn, pv){
      var o = this;
      var c = pn.cell('view');
      c.setIcon(o._iconView);
      c.addClickListener(o, o.onNodeViewClick);
      c.addDoubleClickListener(o, o.onNodeViewDoubleClick);
   }
   MO.FDsSystemFrameCatalogContent_buildTechnique = function FDsSystemFrameCatalogContent_buildTechnique(parentNode, technique){
      var o = this;
      var node = o.createNode();
      node.setTypeCode('technique');
      node.setLabel('Technique');
      node.dataPropertySet('linker', technique);
      parentNode.appendNode(node);
   }
   MO.FDsSystemFrameCatalogContent_buildRegion = function FDsSystemFrameCatalogContent_buildRegion(parentNode, region){
      var o = this;
      var regionNode = o.createNode();
      regionNode.setTypeCode('Region');
      regionNode.setLabel('Region');
      regionNode.dataPropertySet('linker', region);
      parentNode.appendNode(regionNode);
      var cameraNode = o.createNode();
      cameraNode.setTypeCode('Camera');
      cameraNode.setLabel('Camera');
      cameraNode.dataPropertySet('linker', region.camera());
      regionNode.appendNode(cameraNode);
      var lightNode = o.createNode();
      lightNode.setTypeCode('Light');
      lightNode.setLabel('Light');
      lightNode.dataPropertySet('linker', region.directionalLight());
      regionNode.appendNode(lightNode);
   }
   MO.FDsSystemFrameCatalogContent_buildRenderable = function FDsSystemFrameCatalogContent_buildRenderable(n, p){
      var o = this;
      var s = p.materials();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var m = s.value(i);
            var mr = m.resource();
            var dn = o.createNode();
            dn.setLabel(mr.code());
            dn.setNote(mr.label());
            dn.setTypeCode('material');
            dn.dataPropertySet('linker', m);
            o.buildNodeView(dn, true);
            o._materialNodes.push(dn);
            n.appendNode(dn);
         }
      }
      var s = p.animations();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var m = s.value(i);
            var mr = m.resource();
            var dn = o.createNode();
            dn.setLabel(mr.code());
            dn.setNote(mr.label());
            dn.setTypeCode('animation');
            dn.dataPropertySet('linker', m);
            o.buildNodeView(dn, true);
            n.appendNode(dn);
         }
      }
      var s = p.meshRenderables();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var r = s.get(i);
            var rr = r.resource();
            var rd = rr.model();
            var rm = rr.mesh();
            var dn = o.createNode();
            dn.setLabel(rm.code());
            dn.setTypeCode('renderable');
            dn.dataPropertySet('linker', r);
            o.buildNodeView(dn, true);
            o._renderableNodes.push(dn);
            n.appendNode(dn);
         }
      }
   }
   MO.FDsSystemFrameCatalogContent_buildDisplay = function FDsSystemFrameCatalogContent_buildDisplay(n, p){
      var o = this;
      var s = p.displays();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var d = s.get(i);
            var dr = d.resourceScene();
            var dn = o.createNode();
            dn.setLabel(dr.code());
            dn.setNote(dr.label());
            dn.setTypeCode('display');
            dn.dataPropertySet('linker', d);
            o.buildNodeView(dn, true);
            o._displayNodes.push(dn);
            n.appendNode(dn);
            d.addLoadListener(o, o.onLoadDisplay);
            d._linkNode = dn;
         }
      }
   }
   MO.FDsSystemFrameCatalogContent_buildLayer = function FDsSystemFrameCatalogContent_buildLayer(n, p){
      var o = this;
      var ns = o.createNode();
      ns.setLabel('Layers');
      ns.setTypeCode('layers');
      ns.dataPropertySet('linker', 'layers');
      o.buildNodeView(ns, true);
      n.appendNode(ns);
      var ds = p.layers();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var l = ds.value(i);
         if(RClass.isClass(l, FDisplayUiLayer)){
            continue;
         }
         var lr = l.resource();
         var nl = o.createNode();
         nl.setLabel('Layer:' + lr.code());
         nl.setTypeCode('layer');
         nl.dataPropertySet('linker', l);
         o.buildNodeView(nl, true);
         ns.appendNode(nl);
         o.buildDisplay(nl, l)
      }
   }
   MO.FDsSystemFrameCatalogContent_buildSpace = function FDsSystemFrameCatalogContent_buildSpace(p){
      var o = this;
      var r = p._resource;
      var nr = o.createNode();
      nr.setLabel(r.code());
      nr.setNote(r.label());
      nr.setTypeCode('scene');
      nr.dataPropertySet('linker', p);
      o.appendNode(nr);
      o.buildTechnique(nr, p.technique())
      o.buildRegion(nr, p.region());
      o.buildLayer(nr, p);
      nr.click();
   }
   MO.FDsSystemFrameCatalogContent_selectObject = function FDsSystemFrameCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemFrameCatalogContent_showObject = function FDsSystemFrameCatalogContent_showObject(item){
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
   MO.FDsSystemFrameCatalogContent_dispose = function FDsSystemFrameCatalogContent_dispose(){
      var o = this;
      o._displayNodes = RObject.dispose(o._displayNodes);
      o._renderableNodes = RObject.dispose(o._renderableNodes);
      o._materialNodes = RObject.dispose(o._materialNodes);
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameCatalogToolBar = function FDsSystemFrameCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemFrameCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemFrameCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemFrameCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemFrameCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemFrameCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemFrameCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemFrameCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemFrameCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemFrameCatalogToolBar_construct;
      o.dispose                      = FDsSystemFrameCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemFrameCatalogToolBar_onBuilded = function FDsSystemFrameCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderCreateClick = function FDsSystemFrameCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteLoad = function FDsSystemFrameCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteExcute = function FDsSystemFrameCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FUiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteClick = function FDsSystemFrameCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderPropertyClick = function FDsSystemFrameCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderOpenClick = function FDsSystemFrameCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderCloseClick = function FDsSystemFrameCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemFrameCatalogToolBar_construct = function FDsSystemFrameCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameCatalogToolBar_dispose = function FDsSystemFrameCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameFrameSet = function FDsSystemFrameFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleSpaceContent     = RClass.register(o, new AStyle('_styleSpaceContent', 'Space_Content'));
      o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
      o._frameName            = 'system.design.frame.FrameSet';
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSearch          = null;
      o._frameSearchToolbar   = null;
      o._frameSearchContent   = null;
      o._framePreview         = null;
      o._framePreviewToolbar  = null;
      o._framePreviewContent  = null;
      o.onBuilded             = FDsSystemFrameFrameSet_onBuilded;
      o.onCatalogSelected     = FDsSystemFrameFrameSet_onCatalogSelected;
      o.construct             = FDsSystemFrameFrameSet_construct;
      o.load                  = FDsSystemFrameFrameSet_load;
      o.dispose               = FDsSystemFrameFrameSet_dispose;
      return o;
   }
   MO.FDsSystemFrameFrameSet_onBuilded = function FDsSystemFrameFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._propertySpliter = o.searchControl('propertySpliter');
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
      var control = o._catalogToolbar = RClass.create(FDsSystemFrameCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = RClass.create(FDsSystemFrameCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._spaceToolBar = RClass.create(FDsSystemFrameSpaceToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSpaceToolBar.push(control);
      var control = o._spaceContent = RClass.create(FDsSystemFrameSpaceContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameSpaceContent.push(control);
      var control = o._propertyToolbar = RClass.create(FDsSystemFramePropertyToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyToolBar.push(control);
      var control = o._propertyContent = RClass.create(FDsSystemFramePropertyContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control._toolbar = o._propertyToolbar;
      control.build(event);
      o._framePropertyContent.push(control);
   }
   MO.FDsSystemFrameFrameSet_onCatalogSelected = function FDsSystemFrameFrameSet_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(RClass.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(RClass.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(RClass.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsSystemFrameFrameSet_construct = function FDsSystemFrameFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsSystemFrameFrameSet_load = function FDsSystemFrameFrameSet_load(){
      var o = this;
   }
   MO.FDsSystemFrameFrameSet_dispose = function FDsSystemFrameFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameMenuBar = function FDsSystemFrameMenuBar(o){
      o = RClass.inherits(this, o, FDsResourceMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemFrameMenuBar_onBuilded;
      o.onRefreshClick  = FDsSystemFrameMenuBar_onRefreshClick;
      return o;
   }
   MO.FDsSystemFrameMenuBar_onBuilded = function FDsSystemFrameMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsResourceMenuBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameMenuBar_onRefreshClick = function FDsSystemFrameMenuBar_onRefreshClick(event){
   }
}
with(MO){
   MO.FDsSystemFramePropertyContent = function FDsSystemFramePropertyContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemFramePropertyContent_onBuild;
      o.onNodeClick    = FDsSystemFramePropertyContent_onNodeClick;
      o.construct      = FDsSystemFramePropertyContent_construct;
      o.buildTechnique = FDsSystemFramePropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemFramePropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemFramePropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemFramePropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemFramePropertyContent_buildSpace;
      o.dispose        = FDsSystemFramePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyContent_onBuild = function FDsSystemFramePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemFramePropertyContent_onNodeClick = function FDsSystemFramePropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemFramePropertyContent_construct = function FDsSystemFramePropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemFramePropertyContent_buildTechnique = function FDsSystemFramePropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemFramePropertyContent_buildRegion = function FDsSystemFramePropertyContent_buildRegion(n, p){
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
   MO.FDsSystemFramePropertyContent_buildMaterial = function FDsSystemFramePropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemFramePropertyContent_buildDisplay = function FDsSystemFramePropertyContent_buildDisplay(parentNode, display){
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
   MO.FDsSystemFramePropertyContent_buildSpace = function FDsSystemFramePropertyContent_buildSpace(space){
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
   MO.FDsSystemFramePropertyContent_dispose = function FDsSystemFramePropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFramePropertyToolBar = function FDsSystemFramePropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemFramePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemFramePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemFramePropertyToolBar_construct;
      o.dispose              = FDsSystemFramePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyToolBar_onBuilded = function FDsSystemFramePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFramePropertyToolBar_onUpdateClick = function FDsSystemFramePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemFramePropertyToolBar_construct = function FDsSystemFramePropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFramePropertyToolBar_dispose = function FDsSystemFramePropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameSpaceContent = function FDsSystemFrameSpaceContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemFrameSpaceContent_onBuild;
      o.onNodeClick    = FDsSystemFrameSpaceContent_onNodeClick;
      o.construct      = FDsSystemFrameSpaceContent_construct;
      o.buildTechnique = FDsSystemFrameSpaceContent_buildTechnique;
      o.buildRegion    = FDsSystemFrameSpaceContent_buildRegion;
      o.buildMaterial  = FDsSystemFrameSpaceContent_buildMaterial;
      o.buildDisplay   = FDsSystemFrameSpaceContent_buildDisplay;
      o.buildSpace     = FDsSystemFrameSpaceContent_buildSpace;
      o.dispose        = FDsSystemFrameSpaceContent_dispose;
      return o;
   }
   MO.FDsSystemFrameSpaceContent_onBuild = function FDsSystemFrameSpaceContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemFrameSpaceContent_onNodeClick = function FDsSystemFrameSpaceContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemFrameSpaceContent_construct = function FDsSystemFrameSpaceContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemFrameSpaceContent_buildTechnique = function FDsSystemFrameSpaceContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemFrameSpaceContent_buildRegion = function FDsSystemFrameSpaceContent_buildRegion(n, p){
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
   MO.FDsSystemFrameSpaceContent_buildMaterial = function FDsSystemFrameSpaceContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemFrameSpaceContent_buildDisplay = function FDsSystemFrameSpaceContent_buildDisplay(parentNode, display){
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
   MO.FDsSystemFrameSpaceContent_buildSpace = function FDsSystemFrameSpaceContent_buildSpace(space){
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
   MO.FDsSystemFrameSpaceContent_dispose = function FDsSystemFrameSpaceContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameSpaceToolBar = function FDsSystemFrameSpaceToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName   = 'system.design.frame.SpaceToolBar';
      o._storageCode = o._frameName;
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemFrameSpaceToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemFrameSpaceToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemFrameSpaceToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemFrameSpaceToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemFrameSpaceToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemFrameSpaceToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemFrameSpaceToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemFrameSpaceToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemFrameSpaceToolBar_construct;
      o.dispose                      = FDsSystemFrameSpaceToolBar_dispose;
      return o;
   }
   MO.FDsSystemFrameSpaceToolBar_onBuilded = function FDsSystemFrameSpaceToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderCreateClick = function FDsSystemFrameSpaceToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteLoad = function FDsSystemFrameSpaceToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteExcute = function FDsSystemFrameSpaceToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FUiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteClick = function FDsSystemFrameSpaceToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderPropertyClick = function FDsSystemFrameSpaceToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderOpenClick = function FDsSystemFrameSpaceToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderCloseClick = function FDsSystemFrameSpaceToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemFrameSpaceToolBar_construct = function FDsSystemFrameSpaceToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameSpaceToolBar_dispose = function FDsSystemFrameSpaceToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
