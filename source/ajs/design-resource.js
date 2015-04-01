function FDsResourceCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsResourceCatalogContent_onBuild;
   o.onLoadDisplay         = FDsResourceCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsResourceCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsResourceCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsResourceCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsResourceCatalogContent_construct;
   o.buildTechnique        = FDsResourceCatalogContent_buildTechnique;
   o.buildRegion           = FDsResourceCatalogContent_buildRegion;
   o.buildRenderable       = FDsResourceCatalogContent_buildRenderable;
   o.buildDisplay          = FDsResourceCatalogContent_buildDisplay;
   o.buildSpace            = FDsResourceCatalogContent_buildSpace;
   o.selectObject          = FDsResourceCatalogContent_selectObject;
   o.showObject            = FDsResourceCatalogContent_showObject;
   o.dispose               = FDsResourceCatalogContent_dispose;
   return o;
}
function FDsResourceCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.resource');
}
function FDsResourceCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsResourceCatalogContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsResourceCatalogContent_onNodeViewClick(p){
   var o = this;
   var c = p.treeNodeCell;
   var s = p.treeNode.dataPropertyGet('linker');
   if(RClass.isClass(s, FDisplay)){
      if(p.ctrlKey){
         var ds = o._displays;
         for(var i = ds.count() - 1; i >= 0; i--){
            var nd = ds.get(i);
            var d = nd.dataPropertyGet('linker');
            d._visible = false;
            nd.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
   if(RClass.isClass(s, FDrawable)){
      if(p.ctrlKey){
         var rs = o._renderables;
         for(var i = rs.count() - 1; i >= 0; i--){
            var nr = rs.get(i);
            var r = nr.dataPropertyGet('linker');
            r._visible = false;
            nr.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
   if(RClass.isClass(s, FG3dMaterial)){
      if(p.ctrlKey){
         var ms = o._materials;
         for(var i = ms.count() - 1; i >= 0; i--){
            var nm = ms.get(i);
            var m = nm.dataPropertyGet('linker');
            m._visible = false;
            nm.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
}
function FDsResourceCatalogContent_onNodeViewDoubleClick(p){
   var o = this;
   var n = p.treeNode;
   var c = p.treeNodeCell;
   var s = n.dataPropertyGet('linker');
   if(RClass.isClass(s, FDisplay)){
      var s = o._displays;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var d = n.dataPropertyGet('linker');
         d._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
   if(RClass.isClass(s, FDrawable)){
      var s = o._renderables;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var r = n.dataPropertyGet('linker');
         r._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
   if(RClass.isClass(s, FG3dMaterial)){
      var s = o._materials;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var m = n.dataPropertyGet('linker');
         m._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
}
function FDsResourceCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsResourceCatalogContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsResourceCatalogContent_buildRegion(n, p){
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
function FDsResourceCatalogContent_buildRenderable(n, p){
   var o = this;
   var m = p._renderable._material;
   var dn = o.createNode();
   dn.setTypeCode('material');
   dn.setLabel('Material');
   dn.dataPropertySet('linker', m);
   o._materials.push(dn);
   n.appendNode(dn);
   var r = p._renderable;
   var dn = o.createNode();
   dn.setTypeCode('renderable');
   dn.setLabel('Renderable');
   dn.dataPropertySet('linker', r);
   o._renderables.push(dn);
   n.appendNode(dn);
}
function FDsResourceCatalogContent_buildDisplay(n, p){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('display');
   node.setLabel('Mesh');
   node.dataPropertySet('linker', p);
   n.appendNode(node);
   o.buildRenderable(node, p);
}
function FDsResourceCatalogContent_buildSpace(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel(resource.code());
   node.setNote(resource.label());
   node.dataPropertySet('linker', space);
   o.appendNode(node);
   o.buildTechnique(node, space.technique())
   o.buildRegion(node, space.region());
   o.buildDisplay(node, space._display);
   node.click();
}
function FDsResourceCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsResourceCatalogContent_showObject(p){
   var o = this;
   if(RClass.isClass(p, FDsSceneRenderable)){
      var s = o._renderables;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var nr = s.getAt(i);
         var r = nr.dataPropertyGet('linker');
         if(r == p){
            o.processSelectedListener(p, false);
         }
      }
   }
}
function FDsResourceCatalogContent_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsResourceCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.resource.CatalogToolBar';
   o._canvasModeCd    = EDsCanvasMode.Drop;
   o._dropButton      = null;
   o._selectButton    = null;
   o._translateButton = null;
   o._rotationButton  = null;
   o._scaleButton     = null;
   o._lookFrontButton = null;
   o._lookUpButton    = null;
   o._lookLeftButton  = null;
   o._playButton      = null;
   o._viewButton      = null;
   o.onBuilded        = FDsResourceCatalogToolBar_onBuilded;
   o.onModeClick      = FDsResourceCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsResourceCatalogToolBar_onRotationClick;
   o.construct        = FDsResourceCatalogToolBar_construct;
   o.dispose          = FDsResourceCatalogToolBar_dispose;
   return o;
}
function FDsResourceCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsResourceCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsResourceCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsResourceCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourceCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design3d.resource.FrameSet';
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Preview_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._resourceTypeCd       = 'picture';
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsResourceFrameSet_onBuilded;
   o.onMeshLoad            = FDsResourceFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsResourceFrameSet_onCatalogSelected;
   o.construct             = FDsResourceFrameSet_construct;
   o.findPropertyFrame     = FDsResourceFrameSet_findPropertyFrame;
   o.switchContent         = FDsResourceFrameSet_switchContent;
   o.load                  = FDsResourceFrameSet_load;
   o.dispose               = FDsResourceFrameSet_dispose;
   return o;
}
function FDsResourceFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var frame = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   frame._hPanel.className = o.styleName('Catalog_Toolbar');
   o._frameCatalogContent = o.searchControl('catalogContentFrame');
   var frame = o._frameSearch = o.searchControl('searchFrame');
   frame._hPanel.className = o.styleName('Search_Ground');
   var frame = o._frameSearchToolbar = o.searchControl('searchToolbarFrame');
   frame._hPanel.className = o.styleName('Search_Toolbar');
   o._frameSearchContent = o.searchControl('searchContentFrame');
   var frame = o._framePreview = o.searchControl('previewFrame');
   frame._hPanel.className = o.styleName('Preview_Ground');
   var frame = o._framePreviewToolbar = o.searchControl('previewToolbarFrame');
   frame._hPanel.className = o.styleName('Preview_Toolbar');
   o._framePreviewContent = o.searchControl('previewContentFrame');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._previewSpliter = o.searchControl('previewSpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._framePreview._hPanel);
   var control = o._catalogToolbar = RClass.create(FDsResourceCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   o._frameCatalogContent.push(control);
   var control = o._searchToolbar = RClass.create(FDsResourceSearchToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._frameSearchToolbar.push(control);
   var control = o._searchContent = RClass.create(FDsResourceSearchContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(p);
   o._frameSearchContent.push(control);
   var control = o._previewToolbar = RClass.create(FDsResourcePreviewToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(p);
   o._framePreviewToolbar.push(control);
   var control = o._previewContent = RClass.create(FDsResourcePreviewContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control._toolbar = o._previewToolbar;
   control._hParent = f._hPanel;
   control.build(p);
   o._framePreviewContent.push(control);
}
function FDsResourceFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsResourceFrameSet_onCatalogSelected(p, pc){
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
function FDsResourceFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreview._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsResourceFrameSet_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._searchContent.serviceSearch(typeCd, '', 40, 0);
}
function FDsResourceFrameSet_load(){
   var o = this;
   o.switchContent('mesh');
}
function FDsResourceFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsResourceImportDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'design3d.resource.ImportDialog';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = FDsResourceImportDialog_onBuilded;
   o.onFileLoaded          = FDsResourceImportDialog_onFileLoaded;
   o.onConfirmLoad         = FDsResourceImportDialog_onConfirmLoad;
   o.onConfirmClick        = FDsResourceImportDialog_onConfirmClick;
   o.onCancelClick         = FDsResourceImportDialog_onCancelClick;
   o.construct             = FDsResourceImportDialog_construct;
   o.dispose               = FDsResourceImportDialog_dispose;
   return o;
}
function FDsResourceImportDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsResourceImportDialog_onFileLoaded(event){
   var o = this;
   var reader = o._fileReader;
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   var url = '/cloud.content.mesh.wv?do=importData&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
   var connection = RConsole.find(FHttpConsole).send(url, reader.data());
   connection.addLoadListener(o, o.onConfirmLoad);
   o._fileReader = RObject.dispose(reader);
}
function FDsResourceImportDialog_onConfirmLoad(event){
   var o = this;
   o.hide();
   RWindow.enable();
}
function FDsResourceImportDialog_onConfirmClick(event){
   var o = this;
   RWindow.disable();
   var file = o._controlFile._hInput.files[0];
   var reader = o._fileReader = RClass.create(FFileReader);
   reader.addLoadListener(o, o.onFileLoaded);
   reader.loadFile(file);
}
function FDsResourceImportDialog_onCancelClick(event){
   this.hide();
}
function FDsResourceImportDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsResourceImportDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsResourceMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName               = 'design3d.resource.MenuBar';
   o._controlImportMeshButton = null;
   o.onBuilded                = FDsResourceMenuBar_onBuilded;
   o.onImportMeshClick        = FDsResourceMenuBar_onImportMeshClick;
   o.construct                = FDsResourceMenuBar_construct;
   o.dispose                  = FDsResourceMenuBar_dispose;
   return o;
}
function FDsResourceMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlImportMeshButton.addClickListener(o, o.onImportMeshClick);
}
function FDsResourceMenuBar_onImportMeshClick(p){
   var o = this;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceImportDialog);
   dialog._workspace = o._workspace;
   dialog.showPosition(EUiPosition.Center);
}
function FDsResourceMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsResourceMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsResourceMeshFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design3d.mesh.FrameSet';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._activeSpace          = null;
   o._activeMesh           = null;
   o._framesetMain         = null;
   o._framesetBody         = null;
   o._frameToolBar         = null;
   o._frameBody            = null;
   o._frameProperty        = null;
   o._frameCatalog         = null;
   o._frameWorkspace       = null;
   o._frameStatusBar       = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsResourceMeshFrameSet_onBuilded;
   o.onMeshLoad            = FDsResourceMeshFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsResourceMeshFrameSet_onCatalogSelected;
   o.construct             = FDsResourceMeshFrameSet_construct;
   o.findPropertyFrame     = FDsResourceMeshFrameSet_findPropertyFrame;
   o.loadMeshByGuid        = FDsResourceMeshFrameSet_loadMeshByGuid;
   o.loadMeshByCode        = FDsResourceMeshFrameSet_loadMeshByCode;
   o.dispose               = FDsResourceMeshFrameSet_dispose;
   return o;
}
function FDsResourceMeshFrameSet_onBuilded(p){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, p);
   var f = o._frameCatalog = o.searchControl('catalogFrame');
   f._hPanel.className = o.styleName('Catalog_Ground');
   var f = o._frameWorkspace = o.searchControl('spaceFrame');
   f._hPanel.className = o.styleName('Workspace_Ground');
   var f = o._frameProperty = o.searchControl('propertyFrame');
   f._hPanel.className = o.styleName('Property_Ground');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._propertySpliter = o.searchControl('propertySpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._frameProperty._hPanel);
   var c = o._catalog = RClass.create(FDsMeshCatalog);
   c._workspace = o;
   c.build(p);
   c.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(c);
   var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var c = o._canvasToolbar = RClass.create(FDsMeshCanvasToolBar);
   c._workspace = o;
   c.buildDefine(p);
   o._canvasToolbarFrame.push(c);
   var f = o._canvasFrame = o.searchControl('canvasFrame');
   var c = o._canvas = RClass.create(FDsMeshCanvas);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.addLoadListener(o, o.onMeshLoad);
   c._hParent = f._hPanel;
   c._hParent.style.backgroundColor = '#000000';
   c.build(p);
   o._canvasFrame.push(c);
}
function FDsResourceMeshFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsResourceMeshFrameSet_onCatalogSelected(p, pc){
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
function FDsResourceMeshFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceMeshFrameSet_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._frameProperty._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsResourceMeshFrameSet_loadMeshByGuid(p){
   var o = this;
   o._meshGuid = p;
   o._canvas.loadMeshByGuid(p);
}
function FDsResourceMeshFrameSet_loadMeshByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvas.loadMeshByCode(p);
}
function FDsResourceMeshFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsResourcePreviewContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._activeSpace         = null;
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._optionRotation      = false;
   o._rotation            = null;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectObject        = null;
   o._selectBoundBox      = null;
   o._selectRenderables   = null;
   o._cameraMoveRate      = 8;
   o._cameraKeyRotation   = 3;
   o._cameraMouseRotation = 0.005;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsResourcePreviewContent_onBuild;
   o.onMouseCaptureStart  = FDsResourcePreviewContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsResourcePreviewContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsResourcePreviewContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsResourcePreviewContent_onEnterFrame;
   o.onMeshLoad           = FDsResourcePreviewContent_onMeshLoad;
   o.oeResize             = FDsResourcePreviewContent_oeResize;
   o.oeRefresh            = FDsResourcePreviewContent_oeRefresh;
   o.construct            = FDsResourcePreviewContent_construct;
   o.innerSelectDisplay   = FDsResourcePreviewContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsResourcePreviewContent_innerSelectLayer;
   o.selectNone           = FDsResourcePreviewContent_selectNone;
   o.selectDisplay        = FDsResourcePreviewContent_selectDisplay;
   o.selectMaterial       = FDsResourcePreviewContent_selectMaterial;
   o.selectRenderable     = FDsResourcePreviewContent_selectRenderable;
   o.switchRotation       = FDsResourcePreviewContent_switchRotation;
   o.reloadRegion         = FDsResourcePreviewContent_reloadRegion;
   o.loadMeshByGuid       = FDsResourcePreviewContent_loadMeshByGuid;
   o.loadMeshByCode       = FDsResourcePreviewContent_loadMeshByCode;
   o.dispose              = FDsResourcePreviewContent_dispose;
   return o;
}
function FDsResourcePreviewContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsResourcePreviewContent_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var r = o._activeSpace.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o.selectRenderable(r);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
   if(r){
      var d = r.display();
      o._captureMatrix.assign(d.matrix());
   }
   o._templateMatrix.identity();
   if(o._templateFace){
      o._templateFaceMatrix.assign(o._templateFace.matrix());
      var rs = o._selectRenderables;
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.getAt(i);
         if(!r._dragMatrix){
            r._dragMatrix = new SMatrix3d();
         }
         r._dragMatrix.assign(r.matrix());
      }
   }
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}
function FDsResourcePreviewContent_onMouseCapture(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var mc = o._canvasModeCd;
   var mv = o._canvasMoveCd;
   var cm = o._captureMatrix;
   var sm = null;
   var tf = o._templateFace;
   var tm = o._templateMatrix;
   switch(mc){
      case EDsCanvasMode.Drop:
         var c = o._activeSpace.camera();
         var r = c.rotation();
         var cr = o._captureRotation;
         r.x = cr.x - cy * o._cameraMouseRotation;
         r.y = cr.y - cx * o._cameraMouseRotation;
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.tx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.ty = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.tz = cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Rotation:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.rx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.ry = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.rz = cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Scale:
         if(tf){
            if(mv == EDsCanvasDrag.X){
               tm.sx = cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               tm.sy = -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               tm.sz = cx / 10;
            }else if(mv == EDsCanvasDrag.All){
               tm.sx = cx / 10;
               tm.sy = cx / 10;
               tm.sz = cx / 10;
            }
         }
         break;
   }
   if(tf){
      tf.matrix().merge(o._templateFaceMatrix, tm);
      var rs = o._selectRenderables;
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.getAt(i);
         r._matrix.merge(r._dragMatrix, tm);
      }
   }
}
function FDsResourcePreviewContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsResourcePreviewContent_onEnterFrame(){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var st = s.timer();
   var ss = st.spanSecond();
   var c = s.camera();
   var d = o._cameraMoveRate * ss;
   var r = o._cameraKeyRotation * ss;
   var kf = RKeyboard.isPress(EStageKey.Forward);
   var kb = RKeyboard.isPress(EStageKey.Back);
   if(kf && !kb){
      c.doWalk(d);
   }
   if(!kf && kb){
      c.doWalk(-d);
   }
   var kq = RKeyboard.isPress(EStageKey.Up);
   var ke = RKeyboard.isPress(EStageKey.Down);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var ka = RKeyboard.isPress(EStageKey.RotationLeft);
   var kd = RKeyboard.isPress(EStageKey.RotationRight);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kz = RKeyboard.isPress(EStageKey.RotationUp);
   var kw = RKeyboard.isPress(EStageKey.RotationDown);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var display = o._activeSpace._display;
      var matrix = display.matrix();
      matrix.setRotation(matrix.rx, matrix.ry + r.y, matrix.rz);
      matrix.update();
      r.y = 0.01;
   }
}
function FDsResourcePreviewContent_onMeshLoad(p){
   var o = this;
   var m = o._activeSpace;
   var g = m.region();
   var rc = g.camera();
   rc.setPosition(0, 3, -10);
   rc.lookAt(0, 3, 0);
   rc.update();
   var h = o._hPanel;
   var rp = rc.projection();
   rp.size().set(h.width, h.height);
   rp._angle = 45;
   rp.update();
   var l = g.directionalLight();
   var lc = l.camera();
   lc.setPosition(10, 10, 0);
   lc.lookAt(0, 0, 0);
   lc.update();
   o.processLoadListener(o);
}
function FDsResourcePreviewContent_oeResize(p){
   var o = this;
   o.__base.FDsCanvas.oeResize.call(o, p);
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var s = o._activeSpace;
   if(s){
      var cp = s.camera().projection();
      cp.size().set(w, h);
      cp.update();
   }
   return EEventStatus.Stop;
}
function FDsResourcePreviewContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsResourcePreviewContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._templateMatrix = new SMatrix3d();
   o._templateFaceMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
   o._selectRenderables = new TObjects();
}
function FDsResourcePreviewContent_innerSelectDisplay(p){
   var o = this;
   var s = p.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.getAt(i);
      if(RClass.isClass(r, FDsSceneRenderable)){
         o._selectRenderables.push(r);
         r.showBoundBox();
      }
   }
}
function FDsResourcePreviewContent_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsResourcePreviewContent_selectNone(){
   var o = this;
   o._selectObject = null;
   var s = o._selectRenderables;
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      r.hideBoundBox();
   }
   o._selectRenderables.clear();
}
function FDsResourcePreviewContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsResourcePreviewContent_selectMaterial(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   var d = p._display;
   var s = d.renderables();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var r = s.get(i);
      if(r._materialReference == p){
         o._selectRenderables.push(r);
         r._optionSelected = true;
         r.showBoundBox();
      }
   }
}
function FDsResourcePreviewContent_selectRenderable(p){
   var o = this;
   return;
   var sr = p;
   if(sr){
      var n = sr._renderable._resource._code;
      switch(n){
         case 'ms_translation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_all':
            o._canvasMoveCd = EDsCanvasDrag.All;
            o._templateRenderable = sr;
            return;
         default:
            o._canvasMoveCd = EDsCanvasDrag.Unknown;
            o._templateRenderable = null;
      }
   }
   o.selectNone();
   if(p){
      o._selectRenderables.push(p);
      p._optionSelected = true;
      p.showBoundBox();
      o._workspace._catalog.showObject(p);
   }
   var t = o._templateTranslation;
   var r = o._templateRotation;
   var s = o._templateScale;
   var mc = o._canvasModeCd;
   switch(mc){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         t.setVisible(sr != null);
         r.hide();
         s.hide();
         o._templateFace = t;
         break;
      case EDsCanvasMode.Rotation:
         t.hide();
         r.setVisible(sr != null);
         s.hide();
         o._templateFace = r;
         break;
      case EDsCanvasMode.Scale:
         t.hide();
         r.hide();
         s.setVisible(sr != null);
         o._templateFace = s;
         break;
   }
   var st = o._templateFace;
   if(sr && st){
      var d = sr.display();
      var m = st.matrix();
      m.assign(d.matrix());
      m.setScaleAll(o._templateViewScale);
      m.update();
   }
}
function FDsResourcePreviewContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsResourcePreviewContent_switchRotation(p){
   this._optionRotation = p;
}
function FDsResourcePreviewContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsResourcePreviewContent_loadMeshByGuid(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
   }
   var space = o._activeSpace = rmc.allocByGuid(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsResourcePreviewContent_loadMeshByCode(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
      rmc.free(o._activeSpace);
   }
   var space = o._activeSpace = rmc.allocByCode(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsResourcePreviewContent_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsResourcePreviewToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'design3d.resource.PreviewToolBar';
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   o._controlRotationButton = null;
   o.onBuilded              = FDsResourcePreviewToolBar_onBuilded;
   o.onInsertClick          = FDsResourcePreviewToolBar_onInsertClick;
   o.onUpdateClick          = FDsResourcePreviewToolBar_onUpdateClick;
   o.onDeleteClick          = FDsResourcePreviewToolBar_onDeleteClick;
   o.onRotationClick        = FDsResourcePreviewToolBar_onRotationClick;
   o.construct              = FDsResourcePreviewToolBar_construct;
   o.dispose                = FDsResourcePreviewToolBar_dispose;
   return o;
}
function FDsResourcePreviewToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlInsertButton.addClickListener(o, o.onInsertClick);
   o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
   o._controlRotationButton.addClickListener(o, o.onRotationClick);
}
function FDsResourcePreviewToolBar_onInsertClick(event){
}
function FDsResourcePreviewToolBar_onUpdateClick(event){
   var o = this;
   var frame = o._workspace._previewContent;
   var item = frame._activeItem;
   var url = '/script/design/mesh.html?guid=' + item._guid;
   window.open(url, '_blank', '');
}
function FDsResourcePreviewToolBar_onDeleteClick(event){
}
function FDsResourcePreviewToolBar_onRotationClick(event){
   var o = this;
   var previewContent = o._workspace._previewContent;
   previewContent.switchRotation(event.checked);
}
function FDsResourcePreviewToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourcePreviewToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceSearchContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsResourceSearchContent_onBuilded;
   o.onServiceLoad     = FDsResourceSearchContent_onServiceLoad;
   o.construct         = FDsResourceSearchContent_construct;
   o.doClickItem       = FDsResourceSearchContent_doClickItem;
   o.doDoubleClickItem = FDsResourceSearchContent_doDoubleClickItem;
   o.serviceSearch     = FDsResourceSearchContent_serviceSearch;
   o.dispose           = FDsResourceSearchContent_dispose;
   return o;
}
function FDsResourceSearchContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsResourceSearchContent_onServiceLoad(p){
   var o = this;
   var xitems = p.root.findNode('ResourceCollection');
   var pageSize = xitems.getInteger('page_size');
   var pageCount = xitems.getInteger('page_count');
   var page = xitems.getInteger('page');
   o._frameSet._searchToolbar.setNavigator(pageSize, pageCount, page);
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Resource')){
         var item = o.createItem(FDsResourceSearchItem);
         item.propertyLoad(xnode);
         item._typeCd = xnode.get('type');
         item._guid = xnode.get('guid');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RWindow.enable();
}
function FDsResourceSearchContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsResourceSearchContent_doClickItem(p){
   var o = this;
}
function FDsResourceSearchContent_doDoubleClickItem(item){
   var o = this;
   var guid = item._guid;
   o._workspace.selectFrameSet(EDsFrameSet.MeshFrameSet, guid);
}
function FDsResourceSearchContent_serviceSearch(typeCd, serach, pageSize, page){
   var o = this;
   RWindow.disable();
   var url = '/cloud.content3d.resource.ws?action=list&type_cd=' + typeCd + '&serach=' + serach + '&page_size=' + pageSize + '&page=' + page;
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsResourceSearchContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsResourceSearchItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o.onBuild      = FDsResourceSearchItem_onBuild;
   o.refreshStyle = FDsResourceSearchItem_refreshStyle;
   return o;
}
function FDsResourceSearchItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '200px';
   h.style.height = '150px';
}
function FDsResourceSearchItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsResourceSearchToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.resource.SearchToolBar';
   o._pageCount       = 0;
   o._page            = 0;
   o._serach          = null;
   o._resourceTypeCd  = null;
   o._dropButton      = null;
   o._selectButton    = null;
   o._translateButton = null;
   o._rotationButton  = null;
   o._scaleButton     = null;
   o._lookFrontButton = null;
   o._lookUpButton    = null;
   o._lookLeftButton  = null;
   o._playButton      = null;
   o._viewButton      = null;
   o.onBuilded        = FDsResourceSearchToolBar_onBuilded;
   o.onSearchClick    = FDsResourceSearchToolBar_onSearchClick;
   o.onNavigatorClick = FDsResourceSearchToolBar_onNavigatorClick;
   o.construct        = FDsResourceSearchToolBar_construct;
   o.setNavigator     = FDsResourceSearchToolBar_setNavigator;
   o.doNavigator      = FDsResourceSearchToolBar_doNavigator;
   o.dispose          = FDsResourceSearchToolBar_dispose;
   return o;
}
function FDsResourceSearchToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSearchEdit.addClickListener(o, o.onSearchClick);
   o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
   o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
   o._controlNextButton.addClickListener(o, o.onNavigatorClick);
   o._controlLastButton.addClickListener(o, o.onNavigatorClick);
}
function FDsResourceSearchToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsResourceSearchToolBar_onNavigatorClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   var page = o._page;
   switch(name){
      case 'firstButton':
         page = 0;
         break;
      case 'priorButton':
         page--;
         break;
      case 'nextButton':
         page++;
         break;
      case 'lastButton':
         page = o._pageCount;
         break;
   }
   o.doNavigator(page);
}
function FDsResourceSearchToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsResourceSearchToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsResourceSearchToolBar_doNavigator(page){
   var o = this;
   page = RInteger.toRange(page, 0, o._pageCount);
   var search = o._controlSearchEdit.text();
   var typeCd = o._workspace._resourceTypeCd;
   if((o._resourceTypeCd != typeCd) || (o._serach != search) || (o._page != page)){
      o._workspace._searchContent.serviceSearch(typeCd, search, o._pageSize, page)
   }
   o._resourceTypeCd = typeCd;
   o._serach = search;
}
function FDsResourceSearchToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsResourceTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName             = 'design3d.resource.TabBar';
   o._resourceTypeCd        = 'mesh';
   o._controlPictureButton  = null;
   o._controlSoundButton    = null;
   o._controlVidioButton    = null;
   o._controlTextureButton  = null;
   o._controlMaterialButton = null;
   o._controlMeshButton     = null;
   o._controlModelButton    = null;
   o._controlTemplateButton = null;
   o._controlSceneButton    = null;
   o.onBuilded              = FDsResourceTabBar_onBuilded;
   o.onButtonClick          = FDsResourceTabBar_onButtonClick;
   o.construct              = FDsResourceTabBar_construct;
   o.dispose                = FDsResourceTabBar_dispose;
   return o;
}
function FDsResourceTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlPictureButton.addClickListener(o, o.onButtonClick);
   o._controlSoundButton.addClickListener(o, o.onButtonClick);
   o._controlVidioButton.addClickListener(o, o.onButtonClick);
   o._controlTextureButton.addClickListener(o, o.onButtonClick);
   o._controlMaterialButton.addClickListener(o, o.onButtonClick);
   o._controlMeshButton.addClickListener(o, o.onButtonClick);
   o._controlModelButton.addClickListener(o, o.onButtonClick);
   o._controlTemplateButton.addClickListener(o, o.onButtonClick);
   o._controlSceneButton.addClickListener(o, o.onButtonClick);
}
function FDsResourceTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   o._resourceTypeCd = name;
   o._workspace.switchContent(name);
}
function FDsResourceTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsResourceTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsResourceWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design3d.resource.Workspace';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
   o._stylePreviewGround   = RClass.register(o, new AStyle('_stylePreviewGround', 'Preview_Ground'));
   o._stylePreviewToolbar  = RClass.register(o, new AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._resourceTypeCd       = 'picture';
   o._frameToolBar         = null;
   o._frameStatusBar       = null;
   o._frameCatalog         = null;
   o._frameCatalogToolbar  = null;
   o._frameCatalogContent  = null;
   o._frameSearch          = null;
   o._frameSearchToolbar   = null;
   o._frameSearchContent   = null;
   o._framePreview         = null;
   o._framePreviewToolbar  = null;
   o._framePreviewContent  = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsResourceWorkspace_onBuilded;
   o.onMeshLoad            = FDsResourceWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsResourceWorkspace_onCatalogSelected;
   o.construct             = FDsResourceWorkspace_construct;
   o.findPropertyFrame     = FDsResourceWorkspace_findPropertyFrame;
   o.switchContent         = FDsResourceWorkspace_switchContent;
   o.load                  = FDsResourceWorkspace_load;
   o.dispose               = FDsResourceWorkspace_dispose;
   return o;
}
function FDsResourceWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var f = o._frameToolBar = o.searchControl('toolbarFrame');
   f._hPanel.className = o.styleName('Toolbar_Ground');
   var f = o._frameCatalog = o.searchControl('catalogFrame');
   f._hPanel.className = o.styleName('Catalog_Ground');
   var f = o._frameCatalogToolbar = o.searchControl('catalogToolbarFrame');
   f._hPanel.className = o.styleName('Catalog_Toolbar');
   var f = o._frameCatalogContent = o.searchControl('catalogContentFrame');
   var f = o._frameSearch = o.searchControl('searchFrame');
   f._hPanel.className = o.styleName('Search_Ground');
   var f = o._frameSearchToolbar = o.searchControl('searchToolbarFrame');
   f._hPanel.className = o.styleName('Search_Toolbar');
   var f = o._frameSearchContent = o.searchControl('searchContentFrame');
   var f = o._framePreview = o.searchControl('previewFrame');
   f._hPanel.className = o.styleName('Preview_Ground');
   var f = o._framePreviewToolbar = o.searchControl('previewToolbarFrame');
   f._hPanel.className = o.styleName('Preview_Toolbar');
   var f = o._framePreviewContent = o.searchControl('previewContentFrame');
   var f = o._frameStatusBar = o.searchControl('statusFrame');
   f._hPanel.className = o.styleName('Statusbar_Ground');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._previewSpliter = o.searchControl('previewSpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._framePreview._hPanel);
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   var c = o._toolbar = RClass.create(FDsResourceMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.appendChild(c._hPanel);
   var c = o._tabBar = RClass.create(FDsResourceTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '450px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
   var control = o._catalogToolbar = RClass.create(FDsResourceCatalogToolBar);
   control._workspace = o;
   control.buildDefine(p);
   o._frameCatalogToolbar.push(control);
   var control = o._catalogContent = RClass.create(FDsResourceCatalogContent);
   control._workspace = o;
   control.build(p);
   o._frameCatalogContent.push(control);
   var control = o._searchToolbar = RClass.create(FDsResourceSearchToolBar);
   control._workspace = o;
   control.buildDefine(p);
   o._frameSearchToolbar.push(control);
   var control = o._searchContent = RClass.create(FDsResourceSearchContent);
   control._workspace = o;
   control.build(p);
   o._frameSearchContent.push(control);
   var control = o._previewToolbar = RClass.create(FDsResourcePreviewToolBar);
   control._workspace = o;
   control.buildDefine(p);
   o._framePreviewToolbar.push(control);
   var control = o._previewContent = RClass.create(FDsResourcePreviewContent);
   control._workspace = o;
   control._toolbar = o._previewToolbar;
   control._hParent = f._hPanel;
   control.build(p);
   o._framePreviewContent.push(control);
   o.switchContent(o._resourceTypeCd);
}
function FDsResourceWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsResourceWorkspace_onCatalogSelected(p, pc){
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
function FDsResourceWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsResourceWorkspace_findPropertyFrame(p){
   var o = this;
   var f = o._propertyFrames.get(p);
   if(!f){
      var fc = RConsole.find(FFrameConsole);
      f = fc.get(o, p, o._framePreview._hContainer);
      f._workspace = o;
      o._propertyFrames.set(p, f);
   }
   return f;
}
function FDsResourceWorkspace_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._searchContent.serviceSearch(typeCd, '', 40, 0);
}
function FDsResourceWorkspace_load(){
   var o = this;
}
function FDsResourceWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
