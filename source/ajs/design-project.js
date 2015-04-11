function FDsProjectCanvasContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsProjectCanvasContent_onBuilded;
   o.onServiceLoad  = FDsProjectCanvasContent_onServiceLoad;
   o.construct      = FDsProjectCanvasContent_construct;
   o.clickItem      = FDsProjectCanvasContent_clickItem;
   o.serviceSearch  = FDsProjectCanvasContent_serviceSearch;
   o.dispose        = FDsProjectCanvasContent_dispose;
   return o;
}
function FDsProjectCanvasContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsProjectCanvasContent_onServiceLoad(p){
   var o = this;
   var xprojects = p.root.findNode('ProjectCollection');
   var pageSize = xprojects.getInteger('page_size');
   var pageCount = xprojects.getInteger('page_count');
   var page = xprojects.getInteger('page');
   o._workspace._searchToolbar.setNavigator(pageSize, pageCount, page);
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Project')){
         var item = o.createItem(FDsProjectSearchItem);
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
function FDsProjectCanvasContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsProjectCanvasContent_clickItem(p){
   var o = this;
   var frame = o._workspace._previewContent;
   frame._activeItem = p;
   frame.loadMeshByGuid(p._guid);
}
function FDsProjectCanvasContent_serviceSearch(typeCd, serach, pageSize, page){
   var o = this;
   RWindow.disable();
   var connection = RConsole.find(FDrResourceConsole).fetch(typeCd, serach, null, pageSize, page);
   connection.addLoadListener(o, o.onServiceLoad);
}
function FDsProjectCanvasContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsProjectCanvasPreviewToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.project.CanvasPreviewToolBar';
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
   o.onBuilded        = FDsProjectCanvasPreviewToolBar_onBuilded;
   o.onSearchClick    = FDsProjectCanvasPreviewToolBar_onSearchClick;
   o.onNavigatorClick = FDsProjectCanvasPreviewToolBar_onNavigatorClick;
   o.construct        = FDsProjectCanvasPreviewToolBar_construct;
   o.setNavigator     = FDsProjectCanvasPreviewToolBar_setNavigator;
   o.doNavigator      = FDsProjectCanvasPreviewToolBar_doNavigator;
   o.dispose          = FDsProjectCanvasPreviewToolBar_dispose;
   return o;
}
function FDsProjectCanvasPreviewToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsProjectCanvasPreviewToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsProjectCanvasPreviewToolBar_onNavigatorClick(event){
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
function FDsProjectCanvasPreviewToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectCanvasPreviewToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsProjectCanvasPreviewToolBar_doNavigator(page){
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
function FDsProjectCanvasPreviewToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectCanvasSpaceToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.project.CanvasSpaceToolBar';
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
   o.onBuilded        = FDsProjectCanvasSpaceToolBar_onBuilded;
   o.onSearchClick    = FDsProjectCanvasSpaceToolBar_onSearchClick;
   o.onNavigatorClick = FDsProjectCanvasSpaceToolBar_onNavigatorClick;
   o.construct        = FDsProjectCanvasSpaceToolBar_construct;
   o.setNavigator     = FDsProjectCanvasSpaceToolBar_setNavigator;
   o.doNavigator      = FDsProjectCanvasSpaceToolBar_doNavigator;
   o.dispose          = FDsProjectCanvasSpaceToolBar_dispose;
   return o;
}
function FDsProjectCanvasSpaceToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsProjectCanvasSpaceToolBar_onSearchClick(p){
   this.doNavigator(0);
}
function FDsProjectCanvasSpaceToolBar_onNavigatorClick(event){
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
function FDsProjectCanvasSpaceToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectCanvasSpaceToolBar_setNavigator(pageSize, pageCount, page){
   var o = this;
   o._pageSize = pageSize;
   o._pageCount = pageCount;
   o._page = page;
   o._controlPageEdit.setText(page);
   if(page == 0){
   }
}
function FDsProjectCanvasSpaceToolBar_doNavigator(page){
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
function FDsProjectCanvasSpaceToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsProjectCatalogContent_onBuild;
   o.onLoadDisplay         = FDsProjectCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsProjectCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsProjectCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsProjectCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsProjectCatalogContent_construct;
   o.buildTechnique        = FDsProjectCatalogContent_buildTechnique;
   o.buildRegion           = FDsProjectCatalogContent_buildRegion;
   o.buildRenderable       = FDsProjectCatalogContent_buildRenderable;
   o.buildDisplay          = FDsProjectCatalogContent_buildDisplay;
   o.buildSpace            = FDsProjectCatalogContent_buildSpace;
   o.selectObject          = FDsProjectCatalogContent_selectObject;
   o.showObject            = FDsProjectCatalogContent_showObject;
   o.dispose               = FDsProjectCatalogContent_dispose;
   return o;
}
function FDsProjectCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.resource');
}
function FDsProjectCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsProjectCatalogContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsProjectCatalogContent_onNodeViewClick(p){
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
function FDsProjectCatalogContent_onNodeViewDoubleClick(p){
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
function FDsProjectCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsProjectCatalogContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsProjectCatalogContent_buildRegion(n, p){
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
function FDsProjectCatalogContent_buildRenderable(n, p){
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
function FDsProjectCatalogContent_buildDisplay(n, p){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('display');
   node.setLabel('Mesh');
   node.dataPropertySet('linker', p);
   n.appendNode(node);
   o.buildRenderable(node, p);
}
function FDsProjectCatalogContent_buildSpace(space){
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
function FDsProjectCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsProjectCatalogContent_showObject(p){
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
function FDsProjectCatalogContent_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsProjectCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.project.CatalogToolBar';
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
   o.onBuilded        = FDsProjectCatalogToolBar_onBuilded;
   o.onModeClick      = FDsProjectCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsProjectCatalogToolBar_onRotationClick;
   o.construct        = FDsProjectCatalogToolBar_construct;
   o.dispose          = FDsProjectCatalogToolBar_dispose;
   return o;
}
function FDsProjectCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsProjectCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsProjectCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsProjectCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   o._frameName            = 'design3d.project.FrameSet';
   o._stylePageControl     = RClass.register(o, new AStyle('_stylePageControl', 'PageControl'));
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasGround    = RClass.register(o, new AStyle('_styleCanvasGround', 'Canvas_Ground'));
   o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   o._activeSpace          = null;
   o._activeMesh           = null;
   o._framesetMain         = null;
   o._framesetBody         = null;
   o._frameToolBar         = null;
   o._frameBody            = null;
   o._frameProperty        = null;
   o._frameCatalog         = null;
   o._frameCanvas          = null;
   o._frameStatusBar       = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsProjectFrameSet_onBuilded;
   o.onMeshLoad            = FDsProjectFrameSet_onMeshLoad;
   o.onCatalogSelected     = FDsProjectFrameSet_onCatalogSelected;
   o.construct             = FDsProjectFrameSet_construct;
   o.findPropertyFrame     = FDsProjectFrameSet_findPropertyFrame;
   o.loadByGuid            = FDsProjectFrameSet_loadByGuid;
   o.dispose               = FDsProjectFrameSet_dispose;
   return o;
}
function FDsProjectFrameSet_onBuilded(event){
   var o = this;
   o.__base.FUiFrameSet.onBuilded.call(o, event);
   var frame = o._frameCatalog = o.searchControl('catalogFrame');
   frame._hPanel.className = o.styleName('Catalog_Ground');
   var control = o._frameCatalogPageControl = o.searchControl('catalogPageControl');
   control._hPanel.className = o.styleName('PageControl');
   var frame = o._frameSceneListToolBar = o.searchControl('sceneListToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameSceneListContent = o.searchControl('sceneListContentFrame');
   frame._hPanel.className = o.styleName('Catalog_Content');
   var frame = o._frameSceneCatalogToolBar = o.searchControl('sceneCatalogToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameSceneCatalogContent = o.searchControl('sceneCatalogContentFrame');
   frame._hPanel.className = o.styleName('Catalog_Content');
   var frame = o._frameCanvas = o.searchControl('canvasFrame');
   frame._hPanel.className = o.styleName('Canvas_Ground');
   var control = o._frameCanvasPageControl = o.searchControl('canvasPageControl');
   control._hPanel.className = o.styleName('PageControl');
   var frame = o._frameCanvasSpaceToolBar = o.searchControl('canvasSpaceToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameCanvasSpaceContent = o.searchControl('canvasSpaceContentFrame');
   frame._hPanel.className = o.styleName('Canvas_Content');
   var frame = o._frameCanvasPreviewToolBar = o.searchControl('canvasPreviewToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._frameCanvasPreviewContent = o.searchControl('canvasPreviewContentFrame');
   frame._hPanel.className = o.styleName('Canvas_Content');
   var frame = o._frameProperty = o.searchControl('propertyFrame');
   frame._hPanel.className = o.styleName('Property_Ground');
   var control = o._framePropertyPageControl = o.searchControl('propertyPageControl');
   control._hPanel.className = o.styleName('PageControl');
   var frame = o._framePropertyAttributeToolBar = o.searchControl('propertyAttributeToolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   var frame = o._framePropertyAttributeContent = o.searchControl('propertyAttributeContentFrame');
   frame._hPanel.className = o.styleName('Property_Content');
   var f = o._catalogSplitter = o.searchControl('catalogSpliter');
   f.setAlignCd(EUiAlign.Left);
   f.setSizeHtml(o._frameCatalog._hPanel);
   var f = o._propertySpliter = o.searchControl('propertySpliter');
   f.setAlignCd(EUiAlign.Right);
   f.setSizeHtml(o._frameProperty._hPanel);
   var control = o._sceneListToolbar = RClass.create(FDsProjectSceneListToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSceneListToolBar.push(control);
   var control = o._sceneListContent = RClass.create(FDsProjectSceneListContent);
   control._frameSet = o;
   control.build(event);
   o._frameSceneListContent.push(control);
   var control = o._sceneCatalogToolbar = RClass.create(FDsProjectSceneCatalogToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSceneCatalogToolBar.push(control);
   var control = o._sceneCatalogContent = RClass.create(FDsProjectSceneCatalogContent);
   control._frameSet = o;
   control.build(event);
   o._frameSceneCatalogContent.push(control);
   var control = o._canvasSpaceToolbar = RClass.create(FDsProjectCanvasSpaceToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCanvasSpaceToolBar.push(control);
   var control = o._canvasPreviewToolbar = RClass.create(FDsProjectCanvasPreviewToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCanvasPreviewToolBar.push(control);
   var control = o._propertyToolbar = RClass.create(FDsProjectPropertyToolBar);
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyAttributeToolBar.push(control);
}
function FDsProjectFrameSet_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsProjectFrameSet_onCatalogSelected(p, pc){
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
function FDsProjectFrameSet_construct(){
   var o = this;
   o.__base.FUiFrameSet.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsProjectFrameSet_findPropertyFrame(p){
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
function FDsProjectFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._sceneListContent.serviceList(guid);
}
function FDsProjectFrameSet_dispose(){
   var o = this;
   o.__base.FUiFrameSet.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
function FDsProjectMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName     = 'design3d.project.MenuBar';
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsProjectMenuBar_onBuilded;
   o.onSaveClick    = FDsProjectMenuBar_onSaveClick;
   o.construct      = FDsProjectMenuBar_construct;
   o.dispose        = FDsProjectMenuBar_dispose;
   return o;
}
function FDsProjectMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
}
function FDsProjectMenuBar_onSaveClick(p){
   var o = this;
   var space = o._workspace._activeSpace;
   var resource = space.resource();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   RConsole.find(FE3sMeshConsole).update(xconfig);
}
function FDsProjectMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsProjectMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsProjectPropertyContent(o){
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
   o.onBuild              = FDsProjectPropertyContent_onBuild;
   o.onMouseCaptureStart  = FDsProjectPropertyContent_onMouseCaptureStart;
   o.onMouseCapture       = FDsProjectPropertyContent_onMouseCapture;
   o.onMouseCaptureStop   = FDsProjectPropertyContent_onMouseCaptureStop;
   o.onEnterFrame         = FDsProjectPropertyContent_onEnterFrame;
   o.onMeshLoad           = FDsProjectPropertyContent_onMeshLoad;
   o.oeResize             = FDsProjectPropertyContent_oeResize;
   o.oeRefresh            = FDsProjectPropertyContent_oeRefresh;
   o.construct            = FDsProjectPropertyContent_construct;
   o.innerSelectDisplay   = FDsProjectPropertyContent_innerSelectDisplay;
   o.innerSelectLayer     = FDsProjectPropertyContent_innerSelectLayer;
   o.selectNone           = FDsProjectPropertyContent_selectNone;
   o.selectDisplay        = FDsProjectPropertyContent_selectDisplay;
   o.selectMaterial       = FDsProjectPropertyContent_selectMaterial;
   o.selectRenderable     = FDsProjectPropertyContent_selectRenderable;
   o.switchRotation       = FDsProjectPropertyContent_switchRotation;
   o.reloadRegion         = FDsProjectPropertyContent_reloadRegion;
   o.loadMeshByGuid       = FDsProjectPropertyContent_loadMeshByGuid;
   o.loadMeshByCode       = FDsProjectPropertyContent_loadMeshByCode;
   o.dispose              = FDsProjectPropertyContent_dispose;
   return o;
}
function FDsProjectPropertyContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsProjectPropertyContent_onMouseCaptureStart(p){
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
function FDsProjectPropertyContent_onMouseCapture(p){
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
function FDsProjectPropertyContent_onMouseCaptureStop(p){
   var o = this;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FDsProjectPropertyContent_onEnterFrame(){
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
function FDsProjectPropertyContent_onMeshLoad(p){
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
function FDsProjectPropertyContent_oeResize(p){
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
function FDsProjectPropertyContent_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsProjectPropertyContent_construct(){
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
function FDsProjectPropertyContent_innerSelectDisplay(p){
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
function FDsProjectPropertyContent_innerSelectLayer(p){
   var o = this;
   var s = p.displays();
   var c = s.count();
   for(var i = 0; i < c; i++){
      var d = s.getAt(i);
      o.innerSelectDisplay(d)
   }
}
function FDsProjectPropertyContent_selectNone(){
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
function FDsProjectPropertyContent_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsProjectPropertyContent_selectMaterial(p){
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
function FDsProjectPropertyContent_selectRenderable(p){
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
function FDsProjectPropertyContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsProjectPropertyContent_switchRotation(p){
   this._optionRotation = p;
}
function FDsProjectPropertyContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}
function FDsProjectPropertyContent_loadMeshByGuid(p){
   var o = this;
   var rmc = RConsole.find(FE3dMeshConsole);
   if(o._activeSpace != null){
   }
   var space = o._activeSpace = rmc.allocByGuid(o, p);
   space.addLoadListener(o, o.onMeshLoad);
   space._layer.pushRenderable(o._dimensional);
   RStage.register('mesh3d', space);
}
function FDsProjectPropertyContent_loadMeshByCode(p){
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
function FDsProjectPropertyContent_dispose(){
   var o = this;
   o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsProjectPropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'design3d.project.PropertyToolBar';
   o._controlInsertButton   = null;
   o._controlUpdateButton   = null;
   o._controlDeleteButton   = null;
   o._controlRotationButton = null;
   o.onBuilded              = FDsProjectPropertyToolBar_onBuilded;
   o.onInsertClick          = FDsProjectPropertyToolBar_onInsertClick;
   o.onUpdateClick          = FDsProjectPropertyToolBar_onUpdateClick;
   o.onDeleteClick          = FDsProjectPropertyToolBar_onDeleteClick;
   o.onRotationClick        = FDsProjectPropertyToolBar_onRotationClick;
   o.construct              = FDsProjectPropertyToolBar_construct;
   o.dispose                = FDsProjectPropertyToolBar_dispose;
   return o;
}
function FDsProjectPropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsProjectPropertyToolBar_onInsertClick(event){
}
function FDsProjectPropertyToolBar_onUpdateClick(event){
   var o = this;
   var frame = o._workspace._previewContent;
   var item = frame._activeItem;
   var url = '/script/design/mesh.html?guid=' + item._guid;
   window.open(url, '_blank', '');
}
function FDsProjectPropertyToolBar_onDeleteClick(event){
}
function FDsProjectPropertyToolBar_onRotationClick(event){
   var o = this;
   var previewContent = o._workspace._previewContent;
   previewContent.switchRotation(event.checked);
}
function FDsProjectPropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectPropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectSceneCatalogContent(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   o._activeSpace          = null;
   o._materials            = null;
   o.onBuild               = FDsProjectSceneCatalogContent_onBuild;
   o.onLoadDisplay         = FDsProjectSceneCatalogContent_onLoadDisplay;
   o.onNodeClick           = FDsProjectSceneCatalogContent_onNodeClick;
   o.onNodeViewClick       = FDsProjectSceneCatalogContent_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsProjectSceneCatalogContent_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsProjectSceneCatalogContent_construct;
   o.buildTechnique        = FDsProjectSceneCatalogContent_buildTechnique;
   o.buildRegion           = FDsProjectSceneCatalogContent_buildRegion;
   o.buildRenderable       = FDsProjectSceneCatalogContent_buildRenderable;
   o.buildDisplay          = FDsProjectSceneCatalogContent_buildDisplay;
   o.buildSpace            = FDsProjectSceneCatalogContent_buildSpace;
   o.selectObject          = FDsProjectSceneCatalogContent_selectObject;
   o.showObject            = FDsProjectSceneCatalogContent_showObject;
   o.dispose               = FDsProjectSceneCatalogContent_dispose;
   return o;
}
function FDsProjectSceneCatalogContent_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.resource');
}
function FDsProjectSceneCatalogContent_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   o.buildRenderable(n, p);
}
function FDsProjectSceneCatalogContent_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsProjectSceneCatalogContent_onNodeViewClick(p){
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
function FDsProjectSceneCatalogContent_onNodeViewDoubleClick(p){
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
function FDsProjectSceneCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsProjectSceneCatalogContent_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsProjectSceneCatalogContent_buildRegion(n, p){
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
function FDsProjectSceneCatalogContent_buildRenderable(n, p){
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
function FDsProjectSceneCatalogContent_buildDisplay(n, p){
   var o = this;
   var node = o.createNode();
   node.setTypeCode('display');
   node.setLabel('Mesh');
   node.dataPropertySet('linker', p);
   n.appendNode(node);
   o.buildRenderable(node, p);
}
function FDsProjectSceneCatalogContent_buildSpace(space){
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
function FDsProjectSceneCatalogContent_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}
function FDsProjectSceneCatalogContent_showObject(p){
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
function FDsProjectSceneCatalogContent_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsProjectSceneCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.project.SceneCatalogToolBar';
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
   o.onBuilded        = FDsProjectSceneCatalogToolBar_onBuilded;
   o.onModeClick      = FDsProjectSceneCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsProjectSceneCatalogToolBar_onRotationClick;
   o.construct        = FDsProjectSceneCatalogToolBar_construct;
   o.dispose          = FDsProjectSceneCatalogToolBar_dispose;
   return o;
}
function FDsProjectSceneCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsProjectSceneCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsProjectSceneCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsProjectSceneCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectSceneCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName       = 'design3d.project.CatalogToolBar';
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
   o.onBuilded        = FDsProjectCatalogToolBar_onBuilded;
   o.onModeClick      = FDsProjectCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsProjectCatalogToolBar_onRotationClick;
   o.construct        = FDsProjectCatalogToolBar_construct;
   o.dispose          = FDsProjectCatalogToolBar_dispose;
   return o;
}
function FDsProjectCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsProjectCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}
function FDsProjectCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}
function FDsProjectCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectSceneDialog(o){
   o = RClass.inherits(this, o, FUiDialog);
   o._frameName            = 'design3d.project.SceneDialog';
   o._dataModeCd           = null;
   o._controlParentLabel   = null;
   o._controlLabel         = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   o.onBuilded             = FDsProjectSceneDialog_onBuilded;
   o.onConfirmLoad         = FDsProjectSceneDialog_onConfirmLoad;
   o.onConfirmClick        = FDsProjectSceneDialog_onConfirmClick;
   o.onCancelClick         = FDsProjectSceneDialog_onCancelClick;
   o.construct             = FDsProjectSceneDialog_construct;
   o.setDataCode           = FDsProjectSceneDialog_setDataCode;
   o.setDataLabel          = FDsProjectSceneDialog_setDataLabel;
   o.switchDataMode        = FDsProjectSceneDialog_switchDataMode;
   o.dispose               = FDsProjectSceneDialog_dispose;
   return o;
}
function FDsProjectSceneDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}
function FDsProjectSceneDialog_onConfirmLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   o.hide();
   var listContent = o._frameSet._sceneListContent;
   listContent.serviceRelist();
}
function FDsProjectSceneDialog_onConfirmClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var code = o._controlCode.get();
   var label = o._controlLabel.get();
   var sceneConsole = RConsole.find(FDrSceneConsole);
   var connection = null;
   if(o._dataModeCd == EUiDataMode.Insert){
      var scene = RClass.create(FDrScene);
      scene._projectGuid = o._projectGuid;
      scene._code = code;
      scene._label = label;
      connection = sceneConsole.doCreate(scene);
      scene.dispose();
   }else{
      throw new TError(o, 'Unknown mode.');
   }
   connection.addLoadListener(o, o.onConfirmLoad);
}
function FDsProjectSceneDialog_onCancelClick(event){
   this.hide();
}
function FDsProjectSceneDialog_construct(){
   var o = this;
   o.__base.FUiDialog.construct.call(o);
}
function FDsProjectSceneDialog_setDataCode(code){
   this._controlCode.set(code);
}
function FDsProjectSceneDialog_setDataLabel(label){
   this._controlLabel.set(label);
}
function FDsProjectSceneDialog_switchDataMode(modeCd){
   var o = this;
   o._dataModeCd = modeCd;
   if(modeCd == EUiDataMode.Insert){
      o.setLabel('新建场景');
   }else if(modeCd == EUiDataMode.Update){
      o.setLabel('场景属性');
   }
}
function FDsProjectSceneDialog_dispose(){
   var o = this;
   o.__base.FUiDialog.dispose.call(o);
}
function FDsProjectSceneListContent(o){
   o = RClass.inherits(this, o, FUiListView);
   o._activeItem       = null;
   o._activeGuid       = null;
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   o.onBuilded         = FDsProjectSceneListContent_onBuilded;
   o.onServiceLoad     = FDsProjectSceneListContent_onServiceLoad;
   o.construct         = FDsProjectSceneListContent_construct;
   o.doClickItem       = FDsProjectSceneListContent_doClickItem;
   o.doDoubleClickItem = FDsProjectSceneListContent_doDoubleClickItem;
   o.serviceList       = FDsProjectSceneListContent_serviceList;
   o.serviceRelist     = FDsProjectSceneListContent_serviceRelist;
   o.dispose           = FDsProjectSceneListContent_dispose;
   return o;
}
function FDsProjectSceneListContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
}
function FDsProjectSceneListContent_onServiceLoad(event){
   var o = this;
   var xitems = event.root.findNode('SceneCollection');
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Scene')){
         var item = o.createItem(FDsProjectSceneListItem);
         item.propertyLoad(xnode);
         item._guid = xnode.get('guid');
         item._code = xnode.get('code');
         item._updateDate = xnode.get('update_date');
         item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
         item.refreshStyle();
         o.push(item);
      }
   }
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsProjectSceneListContent_construct(){
   var o = this;
   o.__base.FUiListView.construct.call(o);
}
function FDsProjectSceneListContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   var guid = control._guid;
   o._activeItem = control;
}
function FDsProjectSceneListContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
}
function FDsProjectSceneListContent_serviceList(guid){
   var o = this;
   o._activeGuid = guid;
   RConsole.find(FUiDesktopConsole).showLoading();
   var url = '/cloud.content.scene.ws?action=list&project_guid=' + guid;
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onServiceLoad);
   return connection;
}
function FDsProjectSceneListContent_serviceRelist(){
   var o = this;
   return o.serviceList(o._activeGuid);
}
function FDsProjectSceneListContent_dispose(){
   var o = this;
   o.__base.FUiListView.dispose.call(o);
}
function FDsProjectSceneListItem(o){
   o = RClass.inherits(this, o, FUiListViewItem);
   o.onBuild      = FDsProjectSceneListItem_onBuild;
   o.refreshStyle = FDsProjectSceneListItem_refreshStyle;
   return o;
}
function FDsProjectSceneListItem_onBuild(p){
   var o = this;
   o.__base.FUiListViewItem.onBuild.call(o, p);
   var h = o._hPanel;
   h.style.width = '260px';
   h.style.height = '150px';
}
function FDsProjectSceneListItem_refreshStyle(){
   var o = this;
   var url = '/cloud.content.scene.wv?do=preview&guid=' + o._guid;
   o._hForm.style.backgroundImage = 'url("' + url + '")';
}
function FDsProjectSceneListToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName           = 'design3d.project.SceneListToolBar';
   o._controlSceneCreate  = null;
   o._controlSceneDelete  = null;
   o.onBuilded            = FDsProjectSceneListToolBar_onBuilded;
   o.onSceneCreateClick   = FDsProjectSceneListToolBar_onSceneCreateClick;
   o.onSceneDeleteLoad    = FDsProjectSceneListToolBar_onSceneDeleteLoad;
   o.onSceneDeleteExecute = FDsProjectSceneListToolBar_onSceneDeleteExecute;
   o.onSceneDeleteClick   = FDsProjectSceneListToolBar_onSceneDeleteClick;
   o.construct            = FDsProjectSceneListToolBar_construct;
   o.dispose              = FDsProjectSceneListToolBar_dispose;
   return o;
}
function FDsProjectSceneListToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlSceneCreate.addClickListener(o, o.onSceneCreateClick);
   o._controlSceneDelete.addClickListener(o, o.onSceneDeleteClick);
}
function FDsProjectSceneListToolBar_onSceneCreateClick(event){
   var o = this;
   var projectGuid = o._frameSet._activeGuid;
   if(RString.isEmpty(projectGuid)){
      throw new TError(o, 'Project guid is empty.');
   }
   var dialog = RConsole.find(FUiWindowConsole).find(FDsProjectSceneDialog);
   dialog._frameSet = o._frameSet;
   dialog._projectGuid = projectGuid;
   dialog.setDataCode('');
   dialog.setDataLabel('');
   dialog.switchDataMode(EUiDataMode.Insert);
   dialog.showPosition(EUiPosition.Center);
}
function FDsProjectSceneListToolBar_onSceneDeleteLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
   var listContent = o._frameSet._sceneListContent;
   listContent.serviceRelist();
}
function FDsProjectSceneListToolBar_onSceneDeleteExecute(event){
   var o = this;
   if(event.resultCd != EResult.Success){
      return;
   }
   var listContent = o._frameSet._sceneListContent;
   var item = listContent.focusItem();
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = RConsole.find(FDrSceneConsole).doDelete(item._guid);
   connection.addLoadListener(o, o.onSceneDeleteLoad);
}
function FDsProjectSceneListToolBar_onSceneDeleteClick(event){
   var o = this;
   var listContent = o._frameSet._sceneListContent;
   var item = listContent.focusItem();
   if(!item){
      return RConsole.find(FUiMessageConsole).showInfo('请选中场景后，再点击操作。');
   }
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前场景？');
   dialog.addResultListener(o, o.onSceneDeleteExecute);
}
function FDsProjectSceneListToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsProjectSceneListToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsProjectTabBar(o){
   o = RClass.inherits(this, o, FUiTabBar);
   o._frameName             = 'design3d.project.TabBar';
   o._resourceTypeCd        = 'mesh';
   o._controlProjectButton  = null;
   o._controlResourceButton = null;
   o.onBuilded              = FDsProjectTabBar_onBuilded;
   o.onButtonClick          = FDsProjectTabBar_onButtonClick;
   o.construct              = FDsProjectTabBar_construct;
   o.dispose                = FDsProjectTabBar_dispose;
   return o;
}
function FDsProjectTabBar_onBuilded(p){
   var o = this;
   o.__base.FUiTabBar.onBuilded.call(o, p);
   o._controlProjectButton.addClickListener(o, o.onButtonClick);
   o._controlResourceButton.addClickListener(o, o.onButtonClick);
}
function FDsProjectTabBar_onButtonClick(event){
   var o = this;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'project'){
      o._workspace.selectFrameSet(EDsFrameSet.ProjectFrameSet);
   }else if(name == 'resource'){
      o._workspace.selectFrameSet(EDsFrameSet.ResourceFrameSet);
   }
}
function FDsProjectTabBar_construct(){
   var o = this;
   o.__base.FUiTabBar.construct.call(o);
}
function FDsProjectTabBar_dispose(){
   var o = this;
   o.__base.FUiTabBar.dispose.call(o);
}
function FDsProjectWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'design3d.project.Workspace';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleCatalogToolbar  = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
   o._styleSearchGround    = RClass.register(o, new AStyle('_styleSearchGround', 'Search_Ground'));
   o._styleSearchToolbar   = RClass.register(o, new AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
   o._stylePropertyToolbar = RClass.register(o, new AStyle('_stylePropertyToolbar', 'Property_Toolbar'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._resourceTypeCd       = 'project';
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
   o._activeFrameSet       = null;
   o._frameSets            = null;
   o._propertyFrames       = null;
   o.onBuilded             = FDsProjectWorkspace_onBuilded;
   o.onMeshLoad            = FDsProjectWorkspace_onMeshLoad;
   o.onCatalogSelected     = FDsProjectWorkspace_onCatalogSelected;
   o.construct             = FDsProjectWorkspace_construct;
   o.selectFrameSet        = FDsProjectWorkspace_selectFrameSet;
   o.findPropertyFrame     = FDsProjectWorkspace_findPropertyFrame;
   o.switchContent         = FDsProjectWorkspace_switchContent;
   o.load                  = FDsProjectWorkspace_load;
   o.dispose               = FDsProjectWorkspace_dispose;
   return o;
}
function FDsProjectWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
   var frame = o._frameToolBar = o.searchControl('toolbarFrame');
   frame._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameBody = o.searchControl('bodyFrame');
   var frame = o._frameStatusBar = o.searchControl('statusFrame');
   frame._hPanel.className = o.styleName('Statusbar_Ground');
   var hTable = RBuilder.createTable(p);
   hTable.width = '100%';
   var hRow = RBuilder.appendTableRow(hTable);
   o._hMenuPanel = RBuilder.appendTableCell(hRow);
   var c = o._tabBar = RClass.create(FDsProjectTabBar);
   c._workspace = o;
   c.buildDefine(p);
   var hCell = RBuilder.appendTableCell(hRow);
   hCell.width = '150px';
   hCell.align = 'right';
   hCell.vAlign = 'bottom';
   hCell.appendChild(c._hPanel);
   o._frameToolBar._hPanel.appendChild(hTable);
   o.selectFrameSet(EDsFrameSet.ProjectFrameSet);
}
function FDsProjectWorkspace_onMeshLoad(p){
   var o = this;
   o._activeSpace = p._activeSpace;
   o._catalog.buildSpace(o._activeSpace);
}
function FDsProjectWorkspace_onCatalogSelected(p, pc){
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
function FDsProjectWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._frameSets = new TDictionary();
   o._propertyFrames = new TDictionary();
}
function FDsProjectWorkspace_selectFrameSet(name, guid){
   var o = this;
   var frameSet = o._frameSets.get(name);
   if(!frameSet){
      if(name == EDsFrameSet.ProjectFrameSet){
         var menuBar = RClass.create(FDsProjectMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsProjectFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.ResourceFrameSet){
         var menuBar = RClass.create(FDsResourceMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsResourceFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else if(name == EDsFrameSet.MeshFrameSet){
         var menuBar = RClass.create(FDsMeshMenuBar);
         menuBar._workspace = o;
         menuBar.buildDefine(o._hPanel);
         frameSet = RConsole.find(FFrameConsole).findByClass(o, FDsMeshFrameSet);
         frameSet._workspace = o;
         frameSet._menuBar = menuBar;
         menuBar._frameSet = frameSet;
      }else{
         throw new TError('Unknown frameset. (name={1})', name);
      }
      o._frameSets.set(name, frameSet);
   }
   var activeFrameSet = o._activeFrameSet;
   if(activeFrameSet != frameSet){
      if(activeFrameSet){
         o._hMenuPanel.removeChild(activeFrameSet._menuBar._hPanel);
         o._frameBody.remove(activeFrameSet);
      }
      o._hMenuPanel.appendChild(frameSet._menuBar._hPanel);
      o._frameBody.push(frameSet);
      frameSet.psResize();
   }
   o._activeFrameSet = frameSet;
   if(name == EDsFrameSet.ProjectFrameSet){
   }else if(name == EDsFrameSet.ResourceFrameSet){
      frameSet.load();
   }else if(name == EDsFrameSet.MeshFrameSet){
      frameSet.loadByGuid(guid);
   }else{
      throw new TError('Unknown frameset. (name={1})', name);
   }
   return frameSet;
}
function FDsProjectWorkspace_findPropertyFrame(p){
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
function FDsProjectWorkspace_switchContent(typeCd){
   var o = this;
   o._resourceTypeCd = typeCd;
   o._searchContent.serviceSearch(typeCd, '', 40, 0);
}
function FDsProjectWorkspace_load(){
   var o = this;
}
function FDsProjectWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
