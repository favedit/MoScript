function FDsShareTemplateCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas, MListenerLoad, MMouseCapture);
   o._toolbar            = null;
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
   o.onBuild             = FDsShareTemplateCanvas_onBuild;
   o.onEnterFrame        = FDsShareTemplateCanvas_onEnterFrame;
   o.onDataLoaded        = FDsShareTemplateCanvas_onDataLoaded;
   o.oeRefresh           = FDsShareTemplateCanvas_oeRefresh;
   o.construct           = FDsShareTemplateCanvas_construct;
   o.selectRenderable    = FDsShareTemplateCanvas_selectRenderable;
   o.capture             = FDsShareTemplateCanvas_capture;
   o.loadByGuid          = FDsShareTemplateCanvas_loadByGuid;
   o.dispose             = FDsShareTemplateCanvas_dispose;
   return o;
}
function FDsShareTemplateCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsShareTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var camera = space.camera();
   o._captureRotation.assign(camera._rotation);
}
function FDsShareTemplateCanvas_onMouseCapture(p){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   return;
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
function FDsShareTemplateCanvas_onMouseCaptureStop(p){
}
function FDsShareTemplateCanvas_onEnterFrame(event){
   var o = this;
   o.__base.FDsCanvas.onEnterFrame.call(o, event);
}
function FDsShareTemplateCanvas_onDataLoaded(p){
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
function FDsShareTemplateCanvas_oeRefresh(p){
   var o = this;
   var c = o._graphicContext;
   o.__base.FDsCanvas.oeRefresh.call(o, p);
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
function FDsShareTemplateCanvas_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
}
function FDsShareTemplateCanvas_selectRenderable(p){
   var o = this;
   var r = p.resource();
   var rm = r.mesh();
   var rl = rm.outline();
}
function FDsShareTemplateCanvas_capture(){
   var o = this;
   var space = o._activeSpace;
   var guid = space._resource._guid;
   var switchWidth = o._switchWidth;
   var switchHeight = o._switchHeight;
   o.switchSize(200, 150);
   RStage.process();
   var context = o._graphicContext;
   var size = context.size();
   var native = context._native;
   var width = size.width;
   var height = size.height;
   var data = new Uint8Array(4 * width * height);
   native.readPixels(0, 0, width, height, native.RGBA, native.UNSIGNED_BYTE, data);
   o.switchSize(switchWidth, switchHeight);
   RStage.process();
   var url = '/cloud.resource.preview.wv?do=upload&type_cd=' + EE3sResource.Template + '&guid=' + guid + '&width=' + width + '&height=' + height;
   return RConsole.find(FHttpConsole).send(url, data.buffer);
}
function FDsShareTemplateCanvas_loadByGuid(guid){
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
      space.addLoadListener(o, o.onDataLoaded);
      space._linked = true;
   }
   RStage.register('space', space);
}
function FDsShareTemplateCanvas_dispose(){
   var o = this;
  o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsShareTemplateCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName      = 'resource.share.template.CanvasToolBar';
   o._refreshButton  = null;
   o._saveButton     = null;
   o._canvasModeCd   = EDsCanvasMode.Drop;
   o.onBuilded       = FDsShareTemplateCanvasToolBar_onBuilded;
   o.onModeClick     = FDsShareTemplateCanvasToolBar_onModeClick;
   o.onLookClick     = FDsShareTemplateCanvasToolBar_onLookClick;
   o.onPlayClick     = FDsShareTemplateCanvasToolBar_onPlayClick;
   o.onViewClick     = FDsShareTemplateCanvasToolBar_onViewClick;
   o.construct       = FDsShareTemplateCanvasToolBar_construct;
   o.dispose         = FDsShareTemplateCanvasToolBar_dispose;
   return o;
}
function FDsShareTemplateCanvasToolBar_onBuilded(event){
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
function FDsShareTemplateCanvasToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsShareTemplateCanvasToolBar_onLookClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsShareTemplateCanvasToolBar_onPlayClick(p, v){
   var o = this;
   var c = o._frameSet._canvasContent;
   c._rotationAble = v;
}
function FDsShareTemplateCanvasToolBar_onViewClick(p, v){
   var o = this;
   var c = o._frameSet._canvasContent;
   c._rotationAble = v;
}
function FDsShareTemplateCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareTemplateCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareTemplateCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   o.onBuild        = FDsShareTemplateCatalog_onBuild;
   o.onNodeClick    = FDsShareTemplateCatalog_onNodeClick;
   o.construct      = FDsShareTemplateCatalog_construct;
   o.buildTechnique = FDsShareTemplateCatalog_buildTechnique;
   o.buildRegion    = FDsShareTemplateCatalog_buildRegion;
   o.buildMaterial  = FDsShareTemplateCatalog_buildMaterial;
   o.buildDisplay   = FDsShareTemplateCatalog_buildDisplay;
   o.buildSpace     = FDsShareTemplateCatalog_buildSpace;
   o.selectObject   = FDsShareTemplateCatalog_selectObject;
   o.dispose        = FDsShareTemplateCatalog_dispose;
   return o;
}
function FDsShareTemplateCatalog_onBuild(p){
   var o = this;
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   o.lsnsClick.register(o, o.onNodeClick);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
}
function FDsShareTemplateCatalog_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}
function FDsShareTemplateCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
}
function FDsShareTemplateCatalog_buildTechnique(n, p){
   var o = this;
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeCode('technique');
   nt.dataPropertySet('linker', p);
   n.appendNode(nt);
}
function FDsShareTemplateCatalog_buildRegion(n, p){
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
function FDsShareTemplateCatalog_buildMaterial(parentNode, material){
   var o = this;
   var resource = material.resource();
   var node = o.createNode();
   node.setTypeCode('Material');
   node.setLabel(resource.code());
   node.setNote(resource.label());
   node.dataPropertySet('linker', material);
   parentNode.appendNode(node);
}
function FDsShareTemplateCatalog_buildDisplay(parentNode, display){
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
function FDsShareTemplateCatalog_buildSpace(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
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
function FDsShareTemplateCatalog_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p)
   }
}
function FDsShareTemplateCatalog_dispose(){
   var o = this;
   o.__base.FUiDataTreeView.dispose.call(o);
}
function FDsShareTemplateCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'resource.share.template.CatalogToolBar';
   o._activeNodeGuid        = null;
   o._controlCreateCamera   = null;
   o._controlCreateLayer    = null;
   o._controlCreateSprite   = null;
   o._controlDelete         = null;
   o._controlFolderOpen     = null;
   o._controlFolderClose    = null;
   o.onBuilded              = FDsShareTemplateCatalogToolBar_onBuilded;
   o.onCreateCameraClick    = FDsShareTemplateCatalogToolBar_onCreateCameraClick;
   o.onCreateLayerClick     = FDsShareTemplateCatalogToolBar_onCreateLayerClick;
   o.onCreateSpriteClick    = FDsShareTemplateCatalogToolBar_onCreateSpriteClick;
   o.onDeleteLoad           = FDsShareTemplateCatalogToolBar_onDeleteLoad;
   o.onDeleteExecute        = FDsShareTemplateCatalogToolBar_onDeleteExecute;
   o.onCopyLoad             = FDsShareTemplateCatalogToolBar_onCopyLoad;
   o.onCopyExecute          = FDsShareTemplateCatalogToolBar_onCopyExecute;
   o.onCopyClick            = FDsShareTemplateCatalogToolBar_onCopyClick;
   o.onDeleteClick          = FDsShareTemplateCatalogToolBar_onDeleteClick;
   o.onFolderOpenClick      = FDsShareTemplateCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick     = FDsShareTemplateCatalogToolBar_onFolderCloseClick;
   o.construct              = FDsShareTemplateCatalogToolBar_construct;
   o.dispose                = FDsShareTemplateCatalogToolBar_dispose;
   return o;
}
function FDsShareTemplateCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
   o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
   o._controlCreateSprite.addClickListener(o, o.onCreateSpriteClick);
   o._controlCopy.addClickListener(o, o.onCopyClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
   o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
   o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
}
function FDsShareTemplateCatalogToolBar_onCreateCameraClick(event){
   var o = this;
}
function FDsShareTemplateCatalogToolBar_onCreateLayerClick(event){
   var o = this;
}
function FDsShareTemplateCatalogToolBar_onCreateSpriteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return alert('请选中目录节点。');
   }
   var linker = node.dataPropertyGet('linker');
   var layer = null;
   var sprite = null;
   if(RClass.isClass(linker, FDisplayLayer)){
      layer = linker;
   }else if(RClass.isClass(linker, FE3dSprite)){
      layer = linker.findParent(FDisplayLayer);
      sprite = linker;
   }else{
      return alert('请选中显示层或者精灵节点。');
   }
   var frameSet = o._frameSet;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonSpriteDialog);
   dialog._frameSet = frameSet;
   dialog._spaceGuid = frameSet._activeSpace.resource().guid();
   dialog._layerGuid = layer.resource().guid();
   if(sprite){
      dialog._displayGuid = sprite.resource().guid();
   }else{
      dialog._displayGuid = null;
   }
   if(layer){
      dialog.setLayerLabel(layer.makeLabel());
   }
   if(sprite){
      dialog.setDisplayLabel(sprite.makeLabel());
   }
   dialog.setContentCode('');
   dialog.setContentLabel('');
   dialog.showPosition(EUiPosition.Center);
}
function FDsShareTemplateCatalogToolBar_onCopyLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsShareTemplateCatalogToolBar_onCopyExecute(event){
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
function FDsShareTemplateCatalogToolBar_onCopyClick(event){
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
function FDsShareTemplateCatalogToolBar_onDeleteLoad(event){
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
function FDsShareTemplateCatalogToolBar_onDeleteExecute(event){
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
function FDsShareTemplateCatalogToolBar_onDeleteClick(event){
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
function FDsShareTemplateCatalogToolBar_onFolderOpenClick(event){
}
function FDsShareTemplateCatalogToolBar_onFolderCloseClick(event){
}
function FDsShareTemplateCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareTemplateCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareTemplateFrameSet(o){
   o = RClass.inherits(this, o, FDsFrameSet);
   o._frameName            = 'resource.share.template.FrameSet';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   o._framesetMain         = null;
   o._framesetBody         = null;
   o._frameToolBar         = null;
   o._frameBody            = null;
   o._frameProperty        = null;
   o._frameCatalog         = null;
   o._frameWorkspace       = null;
   o._frameStatusBar       = null;
   o.onBuilded             = FDsShareTemplateFrameSet_onBuilded;
   o.onDataLoaded          = FDsShareTemplateFrameSet_onDataLoaded;
   o.onCatalogSelected     = FDsShareTemplateFrameSet_onCatalogSelected;
   o.construct             = FDsShareTemplateFrameSet_construct;
   o.loadByGuid            = FDsShareTemplateFrameSet_loadByGuid;
   o.loadByCode            = FDsShareTemplateFrameSet_loadByCode;
   o.dispose               = FDsShareTemplateFrameSet_dispose;
   return o;
}
function FDsShareTemplateFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameCanvasToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._spliterCatalog;
   spliter.setAlignCd(EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var spliter = o._spliterProperty;
   spliter.setAlignCd(EUiAlign.Right);
   spliter.setSizeHtml(o._frameProperty._hPanel);
   var toolbar = o._catalogToolbar = RClass.create(FDsShareTemplateCatalogToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCatalogToolBar.push(toolbar);
   var catalog = o._catalogContent = RClass.create(FDsShareTemplateCatalog);
   catalog._frameSet = o;
   catalog.build(event);
   catalog.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalogContent.push(catalog);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareTemplateCanvasToolBar);
   toolbar._frameSet = o;
   toolbar._workspace = o._worksapce;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareTemplateCanvas);
   canvas._frameSet = o;
   canvas._toolbar = o._canvasToolbar;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.addLoadListener(o, o.onDataLoaded);
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
}
function FDsShareTemplateFrameSet_onDataLoaded(event){
   var o = this;
   var canvas = event.sender;
   var space = o._activeSpace = canvas.activeSpace();
   o._catalogContent.buildSpace(space);
}
function FDsShareTemplateFrameSet_onCatalogSelected(select, flag){
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
function FDsShareTemplateFrameSet_construct(){
   var o = this;
   o.__base.FDsFrameSet.construct.call(o);
}
function FDsShareTemplateFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._canvasContent.loadByGuid(guid);
}
function FDsShareTemplateFrameSet_loadByCode(code){
   var o = this;
   o._activeCode = code;
   o._canvasContent.loadByCode(code);
}
function FDsShareTemplateFrameSet_dispose(){
   var o = this;
   o.__base.FDsFrameSet.dispose.call(o);
}
function FDsShareTemplateMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._frameName            = 'resource.share.template.MenuBar';
   o._controlSaveButton    = null;
   o._controlCaptureButton = null;
   o.onBuilded             = FDsShareTemplateMenuBar_onBuilded;
   o.onSaveLoad            = FDsShareTemplateMenuBar_onSaveLoad;
   o.onSaveClick           = FDsShareTemplateMenuBar_onSaveClick;
   o.onCaptureLoad         = FDsShareTemplateMenuBar_onCaptureLoad;
   o.onCaptureClick        = FDsShareTemplateMenuBar_onCaptureClick;
   o.construct             = FDsShareTemplateMenuBar_construct;
   o.dispose               = FDsShareTemplateMenuBar_dispose;
   return o;
}
function FDsShareTemplateMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   o._controlSaveButton.addClickListener(o, o.onSaveClick);
   o._controlCaptureButton.addClickListener(o, o.onCaptureClick);
}
function FDsShareTemplateMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsShareTemplateMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FDrTemplateConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsShareTemplateMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsShareTemplateMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var connection = o._frameSet._canvas.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsShareTemplateMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsShareTemplateMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsShareTemplateToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._refreshButton = null;
   o._saveButton    = null;
   o.onBuild        = FDsShareTemplateToolBar_onBuild;
   o.onRefreshClick = FDsShareTemplateToolBar_onRefreshClick;
   o.onSaveClick    = FDsShareTemplateToolBar_onSaveClick;
   o.construct      = FDsShareTemplateToolBar_construct;
   o.dispose        = FDsShareTemplateToolBar_dispose;
   return o;
}
function FDsShareTemplateToolBar_onBuild(p){
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
function FDsShareTemplateToolBar_onRefreshClick(p){
   var o = this;
}
function FDsShareTemplateToolBar_onSaveClick(p){
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
function FDsShareTemplateToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsShareTemplateToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsShareTemplateWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
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
   o.onBuild                = FDsShareTemplateWorkspace_onBuild;
   o.onTemplateLoad         = FDsShareTemplateWorkspace_onTemplateLoad;
   o.onCatalogSelected      = FDsShareTemplateWorkspace_onCatalogSelected;
   o.construct              = FDsShareTemplateWorkspace_construct;
   o.templatePropertyFrame  = FDsShareTemplateWorkspace_templatePropertyFrame;
   o.themePropertyFrame     = FDsShareTemplateWorkspace_themePropertyFrame;
   o.materialPropertyFrame  = FDsShareTemplateWorkspace_materialPropertyFrame;
   o.displayPropertyFrame   = FDsShareTemplateWorkspace_displayPropertyFrame;
   o.loadTemplate           = FDsShareTemplateWorkspace_loadTemplate;
   o.dispose                = FDsShareTemplateWorkspace_dispose;
   return o;
}
function FDsShareTemplateWorkspace_onBuild(p){
   var o = this;
   o.__base.FUiWorkspace.onBuild.call(o, p);
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
   var c = o._catalog = RClass.create(FDsShareTemplateCatalog);
   c._workspace = o;
   c.build(p);
   c.setPanel(o._frameCatalog._hPanel);
   c.addSelectedListener(o, o.onCatalogSelected);
   o.push(c);
   var c = o._toolbar = RClass.create(FDsShareTemplateToolBar);
   c._workspace = o;
   c.build(p);
   c.setPanel(o._frameToolBar._hPanel);
   o.push(c);
   var hf = RBuilder.appendTable(o._frameWorkspace._hPanel);
   hf.style.width = '100%';
   hf.style.height = '100%';
   var hc = RBuilder.appendTableRowCell(hf);
   hc.height = 20;
   var c = o._canvasToolbar = RClass.create(FDsShareTemplateCanvasToolBar);
   c._workspace = o;
   c.build(p);
   c.setPanel(hc);
   o.push(c);
   var hc = RBuilder.appendTableRowCell(hf);
   hc.vAlign = 'top';
   var c = o._canvas = RClass.create(FDsShareTemplateCanvas);
   c.addLoadListener(o, o.onTemplateLoad);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.build(p);
   c.setPanel(hc);
   o.push(c);
}
function FDsShareTemplateWorkspace_onTemplateLoad(p){
   var o = this;
   var t = o._activeTemplate = p._activeTemplate;
   o._catalog.buildTemplate(t);
   o.onCatalogSelected(t);
}
function FDsShareTemplateWorkspace_onCatalogSelected(p){
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
function FDsShareTemplateWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
}
function FDsShareTemplateWorkspace_templatePropertyFrame(){
   var o = this;
   var f = o._templatePropertyFrame;
   if(!f){
      f = o._templatePropertyFrame = RClass.create(FDsShareTemplatePropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}
function FDsShareTemplateWorkspace_themePropertyFrame(){
   var o = this;
   var f = o._themePropertyFrame;
   if(!f){
      var f = o._themePropertyFrame = RClass.create(FDsShareTemplateThemePropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}
function FDsShareTemplateWorkspace_materialPropertyFrame(){
   var o = this;
   var f = o._materialPropertyFrame;
   if(!f){
      f = o._materialPropertyFrame = RClass.create(FDsShareTemplateMaterialPropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}
function FDsShareTemplateWorkspace_displayPropertyFrame(){
   var o = this;
   var f = o._displayPropertyFrame;
   if(!f){
      f = o._displayPropertyFrame = RClass.create(FDsShareTemplateDisplayPropertyFrame);
      f._workspace = o;
      f.buildDefine(o._hPanel);
      f.setPanel(o._frameProperty._hPanel);
   }
   return f;
}
function FDsShareTemplateWorkspace_loadTemplate(p){
   var o = this;
   o._canvas.loadTemplate(p);
}
function FDsShareTemplateWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
}
