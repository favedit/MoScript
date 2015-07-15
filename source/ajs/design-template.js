with(MO){
   MO.FDsTemplateCanvasContent = function FDsTemplateCanvasContent(o){
      o = RClass.inherits(this, o, FDsSpaceCanvas);
      o._resourceTypeCd     = EE3sResource.Template;
      o._context            = null;
      o._stage              = null;
      o._layer              = null;
      o._rotation           = null;
      o._rotationAble       = false;
      o._capturePosition    = null;
      o._captureMatrix      = null;
      o._captureRotation    = null;
      o._dimensional        = null;
      o._selectBoundBox     = null;
      o.onBuild             = FDsTemplateCanvasContent_onBuild;
      o.onDataLoaded        = FDsTemplateCanvasContent_onDataLoaded;
      o.oeRefresh           = FDsTemplateCanvasContent_oeRefresh;
      o.construct           = FDsTemplateCanvasContent_construct;
      o.loadByGuid          = FDsTemplateCanvasContent_loadByGuid;
      o.loadByCode          = FDsTemplateCanvasContent_loadByCode;
      o.dispose             = FDsTemplateCanvasContent_dispose;
      return o;
   }
   MO.FDsTemplateCanvasContent_onBuild = function FDsTemplateCanvasContent_onBuild(p){
      var o = this;
      o.__base.FDsSpaceCanvas.onBuild.call(o, p);
   }
   MO.FDsTemplateCanvasContent_onMouseCaptureStart = function FDsTemplateCanvasContent_onMouseCaptureStart(p){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var camera = space.camera();
      o._captureRotation.assign(camera._rotation);
   }
   MO.FDsTemplateCanvasContent_onMouseCapture = function FDsTemplateCanvasContent_onMouseCapture(p){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var d = t.renderables().get(0);
      var m = d.matrix();
      var cm = o._captureMatrix;
      switch(o._toolbar._canvasModeCd){
         case EDsCanvasMode.Drop:
            var c = o._stage.camera();
            var r = c.rotation();
            var cr = o._captureRotation;
            r.x = cr.x + cy * 0.003;
            r.y = cr.y + cx * 0.003;
            break;
         case EDsCanvasMode.Select:
            break;
         case EDsCanvasMode.Translate:
            m.tx = cm.tx + cx / 360 * 3.14;
            m.ty = cm.ty + cy / 360 * 3.14;
            break;
         case EDsCanvasMode.Rotation:
            m.ry = cm.ry + cx * RConst.DEGREE_RATE;
            break;
         case EDsCanvasMode.Scale:
            m.sx = cm.sx + cx / 100;
            m.sy = cm.sy + cx / 100;
            m.sz = cm.sz + cx / 100;
            break;
      }
      m.updateForce();
   }
   MO.FDsTemplateCanvasContent_onMouseCaptureStop = function FDsTemplateCanvasContent_onMouseCaptureStop(event){
   }
   MO.FDsTemplateCanvasContent_onDataLoaded = function FDsTemplateCanvasContent_onDataLoaded(event){
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
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateCanvasContent_oeRefresh = function FDsTemplateCanvasContent_oeRefresh(p){
      var o = this;
      var c = o._graphicContext;
      o.__base.FDsSpaceCanvas.oeRefresh.call(o, p);
      var w = o._hParent.offsetWidth;
      var h = o._hParent.offsetHeight;
      var hc = o._hPanel;
      hc.width = w;
      hc.height = h;
      var rp = o._stage.camera().projection();
      rp.size().set(w, h);
      rp.update();
      c.setViewport(0, 0, w, h);
      return EEventStatus.Stop;
   }
   MO.FDsTemplateCanvasContent_construct = function FDsTemplateCanvasContent_construct(){
      var o = this;
      o.__base.FDsSpaceCanvas.construct.call(o);
      o._capturePosition = new SPoint2();
      o._captureMatrix = new SMatrix3d();
      o._rotation = new SVector3();
      o._captureRotation = new SVector3();
   }
   MO.FDsTemplateCanvasContent_loadByGuid = function FDsTemplateCanvasContent_loadByGuid(guid){
      var o = this;
      var space = o._activeSpace;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(space){
         RStage.unregister(space);
         templateConsole.free(space);
      }
      space = o._activeSpace = templateConsole.allocByGuid(o, guid);
      if(!space._linked){
         RConsole.find(FUiDesktopConsole).showLoading();
         space._layer.pushRenderable(o._dimensional);
         space._linked = true;
         space.addLoadListener(o, o.onDataLoaded);
      }
      RStage.register('space', space);
   }
   MO.FDsTemplateCanvasContent_loadByCode = function FDsTemplateCanvasContent_loadByCode(code){
      var o = this;
      var space = o._activeSpace;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(space){
         RStage.unregister(space);
         templateConsole.free(space);
      }
      space = o._activeSpace = templateConsole.allocByGuid(o, guid);
      if(!space._linked){
         RConsole.find(FUiDesktopConsole).showLoading();
         space._layer.pushRenderable(o._dimensional);
         space.addLoadListener(o, o.onDataLoaded);
         space._linked = true;
      }
      RStage.register('space', space);
   }
   MO.FDsTemplateCanvasContent_dispose = function FDsTemplateCanvasContent_dispose(){
      var o = this;
     o._rotation = RObject.dispose(o._rotation);
      o.__base.FDsSpaceCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateCanvasToolBar = function FDsTemplateCanvasToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._refreshButton  = null;
      o._saveButton     = null;
      o._canvasModeCd   = EDsCanvasMode.Drop;
      o.onBuilded       = FDsTemplateCanvasToolBar_onBuilded;
      o.onModeClick     = FDsTemplateCanvasToolBar_onModeClick;
      o.onLookClick     = FDsTemplateCanvasToolBar_onLookClick;
      o.onPlayClick     = FDsTemplateCanvasToolBar_onPlayClick;
      o.onViewClick     = FDsTemplateCanvasToolBar_onViewClick;
      o.construct       = FDsTemplateCanvasToolBar_construct;
      o.dispose         = FDsTemplateCanvasToolBar_dispose;
      return o;
   }
   MO.FDsTemplateCanvasToolBar_onBuilded = function FDsTemplateCanvasToolBar_onBuilded(event){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, event);
      o._controlModeDrop.addClickListener(o, o.onModeClick);
      o._controlModeSelect.addClickListener(o, o.onModeClick);
      o._controlTranslate.addClickListener(o, o.onModeClick);
      o._controlRotation.addClickListener(o, o.onModeClick);
      o._controlScale.addClickListener(o, o.onModeClick);
      o._controlLookFront.addClickListener(o, o.onLookClick);
      o._controlLookUp.addClickListener(o, o.onLookClick);
      o._controlLookLeft.addClickListener(o, o.onLookClick);
      o._controlPlay.addClickListener(o, o.onPlayClick);
      o._controlView.addClickListener(o, o.onViewClick);
   }
   MO.FDsTemplateCanvasToolBar_onModeClick = function FDsTemplateCanvasToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsTemplateCanvasToolBar_onLookClick = function FDsTemplateCanvasToolBar_onLookClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsTemplateCanvasToolBar_onPlayClick = function FDsTemplateCanvasToolBar_onPlayClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }
   MO.FDsTemplateCanvasToolBar_onViewClick = function FDsTemplateCanvasToolBar_onViewClick(event){
      var o = this;
      var checked = event.checked;
      var canvas = o._frameSet._canvasContent;
      canvas.switchRotation(checked);
   }
   MO.FDsTemplateCanvasToolBar_construct = function FDsTemplateCanvasToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsTemplateCanvasToolBar_dispose = function FDsTemplateCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateCatalogContent = function FDsTemplateCatalogContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsTemplateCatalogContent_onBuild;
      o.onNodeClick    = FDsTemplateCatalogContent_onNodeClick;
      o.construct      = FDsTemplateCatalogContent_construct;
      o.buildTechnique = FDsTemplateCatalogContent_buildTechnique;
      o.buildRegion    = FDsTemplateCatalogContent_buildRegion;
      o.buildMaterial  = FDsTemplateCatalogContent_buildMaterial;
      o.buildDisplay   = FDsTemplateCatalogContent_buildDisplay;
      o.buildSpace     = FDsTemplateCatalogContent_buildSpace;
      o.dispose        = FDsTemplateCatalogContent_dispose;
      return o;
   }
   MO.FDsTemplateCatalogContent_onBuild = function FDsTemplateCatalogContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsTemplateCatalogContent_onNodeClick = function FDsTemplateCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var linker = node.dataPropertyGet('linker');
      o.selectObject(linker);
   }
   MO.FDsTemplateCatalogContent_construct = function FDsTemplateCatalogContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsTemplateCatalogContent_buildTechnique = function FDsTemplateCatalogContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsTemplateCatalogContent_buildRegion = function FDsTemplateCatalogContent_buildRegion(n, p){
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
   MO.FDsTemplateCatalogContent_buildMaterial = function FDsTemplateCatalogContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsTemplateCatalogContent_buildDisplay = function FDsTemplateCatalogContent_buildDisplay(parentNode, display){
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
   MO.FDsTemplateCatalogContent_buildSpace = function FDsTemplateCatalogContent_buildSpace(space){
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
   MO.FDsTemplateCatalogContent_dispose = function FDsTemplateCatalogContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateCatalogToolBar = function FDsTemplateCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName             = 'resource.template.CatalogToolBar';
      o._activeNodeGuid        = null;
      o._controlCreateCamera   = null;
      o._controlCreateLayer    = null;
      o._controlCreateSprite   = null;
      o._controlDelete         = null;
      o._controlFolderOpen     = null;
      o._controlFolderClose    = null;
      o.onBuilded              = FDsTemplateCatalogToolBar_onBuilded;
      o.onCreateCameraClick    = FDsTemplateCatalogToolBar_onCreateCameraClick;
      o.onCreateDisplayClick   = FDsTemplateCatalogToolBar_onCreateDisplayClick;
      o.onDeleteLoad           = FDsTemplateCatalogToolBar_onDeleteLoad;
      o.onDeleteExecute        = FDsTemplateCatalogToolBar_onDeleteExecute;
      o.onCopyLoad             = FDsTemplateCatalogToolBar_onCopyLoad;
      o.onCopyExecute          = FDsTemplateCatalogToolBar_onCopyExecute;
      o.onCopyClick            = FDsTemplateCatalogToolBar_onCopyClick;
      o.onDeleteClick          = FDsTemplateCatalogToolBar_onDeleteClick;
      o.onFolderOpenClick      = FDsTemplateCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick     = FDsTemplateCatalogToolBar_onFolderCloseClick;
      o.construct              = FDsTemplateCatalogToolBar_construct;
      o.dispose                = FDsTemplateCatalogToolBar_dispose;
      return o;
   }
   MO.FDsTemplateCatalogToolBar_onBuilded = function FDsTemplateCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
      o._controlCreateDisplay.addClickListener(o, o.onCreateDisplayClick);
      o._controlCopy.addClickListener(o, o.onCopyClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsTemplateCatalogToolBar_onCreateCameraClick = function FDsTemplateCatalogToolBar_onCreateCameraClick(event){
      var o = this;
   }
   MO.FDsTemplateCatalogToolBar_onCreateDisplayClick = function FDsTemplateCatalogToolBar_onCreateDisplayClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonSpriteDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateCatalogToolBar_onCopyLoad = function FDsTemplateCatalogToolBar_onCopyLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateCatalogToolBar_onCopyExecute = function FDsTemplateCatalogToolBar_onCopyExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsTemplateCatalogToolBar_onCopyClick = function FDsTemplateCatalogToolBar_onCopyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         sprite = linker;
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能复制当前选中的节点.');
      }
      var resource = sprite.resource();
      var parentResource = resource.parent();
      var displayResource = resource.clone();
      parentResource.pushDisplay(displayResource);
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      var parent = sprite.parent();
      parent.pushDisplay(display);
   }
   MO.FDsTemplateCatalogToolBar_onDeleteLoad = function FDsTemplateCatalogToolBar_onDeleteLoad(event){
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
   MO.FDsTemplateCatalogToolBar_onDeleteExecute = function FDsTemplateCatalogToolBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      RConsole.find(FUiDesktopConsole).showUploading();
      var connection = RConsole.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsTemplateCatalogToolBar_onDeleteClick = function FDsTemplateCatalogToolBar_onDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能删除当前选中的节点.');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsTemplateCatalogToolBar_onFolderOpenClick = function FDsTemplateCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsTemplateCatalogToolBar_onFolderCloseClick = function FDsTemplateCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsTemplateCatalogToolBar_construct = function FDsTemplateCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsTemplateCatalogToolBar_dispose = function FDsTemplateCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateFrameSet = function FDsTemplateFrameSet(o){
      o = RClass.inherits(this, o, FDsFrameSet);
      o._frameCatalog         = null;
      o._frameCatalogToolBar  = null;
      o._frameCatalogContent  = null;
      o._frameCanvas          = null;
      o._frameCanvasToolBar   = null;
      o._frameCanvasContent   = null;
      o._frameProperty        = null;
      o._framePropertyToolBar = null;
      o._framePropertyContent = null;
      o.onBuilded             = FDsTemplateFrameSet_onBuilded;
      o.onDataLoaded          = FDsTemplateFrameSet_onDataLoaded;
      o.onCatalogSelected     = FDsTemplateFrameSet_onCatalogSelected;
      o.construct             = FDsTemplateFrameSet_construct;
      o.loadByGuid            = FDsTemplateFrameSet_loadByGuid;
      o.loadByCode            = FDsTemplateFrameSet_loadByCode;
      o.dispose               = FDsTemplateFrameSet_dispose;
      return o;
   }
   MO.FDsTemplateFrameSet_onBuilded = function FDsTemplateFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      var spliter = o._spliterCatalog;
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._spliterProperty;
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
   }
   MO.FDsTemplateFrameSet_onDataLoaded = function FDsTemplateFrameSet_onDataLoaded(event){
      var o = this;
      var canvas = event.sender;
      var space = o._activeSpace = canvas.activeSpace();
      o._catalogContent.buildSpace(space);
   }
   MO.FDsTemplateFrameSet_onCatalogSelected = function FDsTemplateFrameSet_onCatalogSelected(select, flag){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      o.hidePropertyFrames();
      if(RClass.isClass(select, FE3dSpace)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dDirectionalLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dTemplateDisplay)){
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FG3dMaterial)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(RClass.isClass(select, FE3dRenderable)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select object type. (select={1})', select);
      }
   }
   MO.FDsTemplateFrameSet_construct = function FDsTemplateFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsTemplateFrameSet_loadByGuid = function FDsTemplateFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._canvasContent.loadByGuid(guid);
   }
   MO.FDsTemplateFrameSet_loadByCode = function FDsTemplateFrameSet_loadByCode(code){
      var o = this;
      o._activeCode = code;
      o._canvasContent.loadByCode(code);
   }
   MO.FDsTemplateFrameSet_dispose = function FDsTemplateFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateMenuBar = function FDsTemplateMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._controlSave           = null;
      o._controlCapture        = null;
      o._controlSelectMaterial = null;
      o._controlCreateDisplay  = null;
      o._controlDelete         = null;
      o.onSaveLoad            = FDsTemplateMenuBar_onSaveLoad;
      o.onSaveClick           = FDsTemplateMenuBar_onSaveClick;
      o.onCaptureLoad         = FDsTemplateMenuBar_onCaptureLoad;
      o.onCaptureClick        = FDsTemplateMenuBar_onCaptureClick;
      o.onSelectMaterialClick = FDsTemplateMenuBar_onSelectMaterialClick;
      o.onCreateDisplayClick  = FDsTemplateMenuBar_onCreateDisplayClick;
      o.onDeleteClick         = FDsTemplateMenuBar_onDeleteClick;
      o.construct             = FDsTemplateMenuBar_construct;
      o.dispose               = FDsTemplateMenuBar_dispose;
      return o;
   }
   MO.FDsTemplateMenuBar_onSaveLoad = function FDsTemplateMenuBar_onSaveLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateMenuBar_onSaveClick = function FDsTemplateMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      var resource = space.resource();
      RConsole.find(FUiDesktopConsole).showUploading();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      var connection = RConsole.find(FDrTemplateConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsTemplateMenuBar_onCaptureLoad = function FDsTemplateMenuBar_onCaptureLoad(event){
      RConsole.find(FUiDesktopConsole).hide();
   }
   MO.FDsTemplateMenuBar_onCaptureClick = function FDsTemplateMenuBar_onCaptureClick(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).showUploading();
      var canvas = o._frameSet._canvasContent;
      var connection = canvas.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }
   MO.FDsTemplateMenuBar_onSelectMaterialClick = function FDsTemplateMenuBar_onSelectMaterialClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonMaterialDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateMenuBar_onCreateDisplayClick = function FDsTemplateMenuBar_onCreateDisplayClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonDisplayDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateMenuBar_onDeleteClick = function FDsTemplateMenuBar_onDeleteClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonDisplayDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsTemplateMenuBar_construct = function FDsTemplateMenuBar_construct(){
      var o = this;
      o.__base.FUiMenuBar.construct.call(o);
   }
   MO.FDsTemplateMenuBar_dispose = function FDsTemplateMenuBar_dispose(){
      var o = this;
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateToolBar = function FDsTemplateToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._refreshButton = null;
      o._saveButton    = null;
      o.onBuild        = FDsTemplateToolBar_onBuild;
      o.onRefreshClick = FDsTemplateToolBar_onRefreshClick;
      o.onSaveClick    = FDsTemplateToolBar_onSaveClick;
      o.construct      = FDsTemplateToolBar_construct;
      o.dispose        = FDsTemplateToolBar_dispose;
      return o;
   }
   MO.FDsTemplateToolBar_onBuild = function FDsTemplateToolBar_onBuild(p){
      var o = this;
      o.__base.FUiToolBar.onBuild.call(o, p);
      var b = o._refreshButton  = RClass.create(FUiToolButton);
      b.setLabel('刷新');
      b.setIcon('design3d.tools.refresh');
      b.build(p);
      b.addClickListener(o, o.onRefreshClick);
      o.push(b);
      var b = o._saveButton = RClass.create(FUiToolButton);
      b.setLabel('保存');
      b.setIcon('design3d.tools.save');
      b.build(p);
      b.addClickListener(o, o.onSaveClick);
      o.push(b);
   }
   MO.FDsTemplateToolBar_onRefreshClick = function FDsTemplateToolBar_onRefreshClick(p){
      var o = this;
   }
   MO.FDsTemplateToolBar_onSaveClick = function FDsTemplateToolBar_onSaveClick(p){
      var o = this;
      var t = o._workspace._activeTemplate;
      var rt = t._resource;
      var ts = rt.themes();
      var tc = ts.count();
      var xr = new TXmlNode();
      for(var ti = 0; ti < tc; ti++){
         var t = ts.get(ti);
         var ms = t.materials();
         var mc = ms.count();
         for(var mi = 0; mi < mc; mi++){
            var m = ms.value(mi);
            m.saveConfig(xr.create('Material'));
         }
      }
      RConsole.find(FE3sTemplateConsole).update(xr);
   }
   MO.FDsTemplateToolBar_construct = function FDsTemplateToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsTemplateToolBar_dispose = function FDsTemplateToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsTemplateWorkspace = function FDsTemplateWorkspace(o){
      o = RClass.inherits(this, o, FDuiWorkspace);
      o._styleToolbarGround    = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround  = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround    = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleWorkspaceGround  = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._stylePropertyGround   = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
      o._framesetMain          = null;
      o._framesetBody          = null;
      o._frameToolBar          = null;
      o._frameBody             = null;
      o._frameProperty         = null;
      o._frameCatalog          = null;
      o._frameWorkspace        = null;
      o._frameStatusBar        = null;
      o._templatePropertyFrame = null;
      o._themePropertyFrame    = null;
      o._materialPropertyFrame = null;
      o._displayPropertyFrame  = null;
      o.onBuild                = FDsTemplateWorkspace_onBuild;
      o.onTemplateLoad         = FDsTemplateWorkspace_onTemplateLoad;
      o.onCatalogSelected      = FDsTemplateWorkspace_onCatalogSelected;
      o.construct              = FDsTemplateWorkspace_construct;
      o.templatePropertyFrame  = FDsTemplateWorkspace_templatePropertyFrame;
      o.themePropertyFrame     = FDsTemplateWorkspace_themePropertyFrame;
      o.materialPropertyFrame  = FDsTemplateWorkspace_materialPropertyFrame;
      o.displayPropertyFrame   = FDsTemplateWorkspace_displayPropertyFrame;
      o.loadTemplate           = FDsTemplateWorkspace_loadTemplate;
      o.dispose                = FDsTemplateWorkspace_dispose;
      return o;
   }
   MO.FDsTemplateWorkspace_onBuild = function FDsTemplateWorkspace_onBuild(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuild.call(o, p);
      o._hPanel.style.width = '100%';
      o._hPanel.style.height = '100%';
      var fs = o._framesetMain = RClass.create(FUiFrameSet);
      fs.build(p);
      var f = o._frameToolBar = RClass.create(FUiFramePage);
      f.setHeight(26);
      f.build(p);
      f._hPanel.className = o.styleName('Toolbar_Ground');
      fs.appendFrame(f);
      var f = o._frameBody = RClass.create(FUiFramePage);
      f.build(p);
      fs.appendFrame(f);
      var f = o._frameStatusBar = RClass.create(FUiFramePage);
      f.setHeight(18);
      f.build(p);
      f._hPanel.className = o.styleName('Statusbar_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._hPanel);
      var fs = RClass.create(FUiFrameSet);
      fs._directionCd = EUiDirection.Horizontal;
      fs.build(p);
      var f = o._frameCatalog = RClass.create(FUiFramePage);
      f.setWidth(400);
      f.build(p);
      f._hPanel.className = o.styleName('Catalog_Ground');
      fs.appendFrame(f);
      var sp1 = fs.appendSpliter();
      var f = o._frameWorkspace = RClass.create(FUiFramePage);
      f.build(p);
      f._hPanel.className = o.styleName('Workspace_Ground');
      fs.appendFrame(f);
      var sp2 = fs.appendSpliter();
      var f = o._frameProperty = RClass.create(FUiFramePage);
      f.setWidth(240);
      f.build(p);
      f._hPanel.className = o.styleName('Property_Ground');
      fs.appendFrame(f);
      fs.setPanel(o._frameBody._hPanel);
      sp1._alignCd = EUiAlign.Left;
      sp1._hSize = o._frameCatalog._hPanel;
      sp2._alignCd = EUiAlign.Right;
      sp2._hSize = o._frameStatusBar._hPanel;
      var c = o._catalog = RClass.create(FDsTemplateCatalog);
      c._workspace = o;
      c.build(p);
      c.setPanel(o._frameCatalog._hPanel);
      c.addSelectedListener(o, o.onCatalogSelected);
      o.push(c);
      var c = o._toolbar = RClass.create(FDsTemplateToolBar);
      c._workspace = o;
      c.build(p);
      c.setPanel(o._frameToolBar._hPanel);
      o.push(c);
      var hf = RBuilder.appendTable(o._frameWorkspace._hPanel);
      hf.style.width = '100%';
      hf.style.height = '100%';
      var hc = RBuilder.appendTableRowCell(hf);
      hc.height = 20;
      var c = o._canvasToolbar = RClass.create(FDsTemplateCanvasToolBar);
      c._workspace = o;
      c.build(p);
      c.setPanel(hc);
      o.push(c);
      var hc = RBuilder.appendTableRowCell(hf);
      hc.vAlign = 'top';
      var c = o._canvas = RClass.create(FDsTemplateCanvas);
      c.addLoadListener(o, o.onTemplateLoad);
      c._workspace = o;
      c._toolbar = o._canvasToolbar;
      c.build(p);
      c.setPanel(hc);
      o.push(c);
   }
   MO.FDsTemplateWorkspace_onTemplateLoad = function FDsTemplateWorkspace_onTemplateLoad(p){
      var o = this;
      var t = o._activeTemplate = p._activeTemplate;
      o._catalog.buildTemplate(t);
      o.onCatalogSelected(t);
   }
   MO.FDsTemplateWorkspace_onCatalogSelected = function FDsTemplateWorkspace_onCatalogSelected(p){
      var o = this;
      var t = o._activeTemplate;
      if(o._templatePropertyFrame){
         o._templatePropertyFrame.hide();
      }
      if(o._themePropertyFrame){
         o._themePropertyFrame.hide();
      }
      if(o._materialPropertyFrame){
         o._materialPropertyFrame.hide();
      }
      if(o._displayPropertyFrame){
         o._displayPropertyFrame.hide();
      }
      if(RClass.isClass(p, FE3dTemplate)){
         var f = o.templatePropertyFrame();
         f.show();
         f.loadObject(t);
      }else if(RClass.isClass(p, FE3sTemplateTheme)){
         var f = o.themePropertyFrame();
         f.show();
         f.loadObject(t, p);
      }else if(RClass.isClass(p, FE3sMaterial)){
         var f = o.materialPropertyFrame();
         f.show();
         f.loadObject(t, p);
      }else if(RClass.isClass(p, MG3dRenderable)){
         var f = o.displayPropertyFrame();
         f.show();
         f.loadObject(t, p);
         o._canvas.selectRenderable(p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsTemplateWorkspace_construct = function FDsTemplateWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
   }
   MO.FDsTemplateWorkspace_templatePropertyFrame = function FDsTemplateWorkspace_templatePropertyFrame(){
      var o = this;
      var f = o._templatePropertyFrame;
      if(!f){
         f = o._templatePropertyFrame = RClass.create(FDsTemplatePropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_themePropertyFrame = function FDsTemplateWorkspace_themePropertyFrame(){
      var o = this;
      var f = o._themePropertyFrame;
      if(!f){
         var f = o._themePropertyFrame = RClass.create(FDsTemplateThemePropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_materialPropertyFrame = function FDsTemplateWorkspace_materialPropertyFrame(){
      var o = this;
      var f = o._materialPropertyFrame;
      if(!f){
         f = o._materialPropertyFrame = RClass.create(FDsTemplateMaterialPropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_displayPropertyFrame = function FDsTemplateWorkspace_displayPropertyFrame(){
      var o = this;
      var f = o._displayPropertyFrame;
      if(!f){
         f = o._displayPropertyFrame = RClass.create(FDsTemplateDisplayPropertyFrame);
         f._workspace = o;
         f.buildDefine(o._hPanel);
         f.setPanel(o._frameProperty._hPanel);
      }
      return f;
   }
   MO.FDsTemplateWorkspace_loadTemplate = function FDsTemplateWorkspace_loadTemplate(p){
      var o = this;
      o._canvas.loadTemplate(p);
   }
   MO.FDsTemplateWorkspace_dispose = function FDsTemplateWorkspace_dispose(){
      var o = this;
      o.__base.FDuiWorkspace.dispose.call(o);
   }
}
