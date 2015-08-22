with(MO){
   MO.FDsSceneCanvasContent = function FDsSceneCanvasContent(o){
      o = MO.Class.inherits(this, o, FDsSpaceDesignCanvas);
      o._resourceTypeCd = EE3sResource.Scene;
      o.loadByGuid      = FDsSceneCanvasContent_loadByGuid;
      o.dispose         = FDsSceneCanvasContent_dispose;
      return o;
   }
   MO.FDsSceneCanvasContent_onDataLoaded = function FDsSceneCanvasContent_onDataLoaded(p){
      var o = this;
      o.reloadRegion()
      o.processLoadListener(o);
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsSceneCanvasContent_loadByGuid = function FDsSceneCanvasContent_loadByGuid(guid){
      var o = this;
      var space = o._activeSpace;
      var sceneConsole = MO.Console.find(FE3dSceneConsole);
      if(space){
         RStage.unregister(space);
         sceneConsole.free(space);
      }
      space = o._activeSpace = sceneConsole.allocByGuid(o, guid);
      if(!space._linked){
         MO.Console.find(FDuiDesktopConsole).showLoading();
         space.addLoadListener(o, o.onDataLoaded);
         space._linked = true;
      }
      RStage.register('space', space);
   }
   MO.FDsSceneCanvasContent_dispose = function FDsSceneCanvasContent_dispose(){
      var o = this;
      o.__base.FDsSpaceDesignCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneCanvasToolBar = function FDsSceneCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName         = 'resource.scene.CanvasToolBar';
      o._canvasModeCd      = EDsCanvasMode.Drop;
      o._controlModeDrop   = null;
      o._controlModeSelect = null;
      o._controlTranslate  = null;
      o._controlRotation   = null;
      o._controlScale      = null;
      o._controlLookFront  = null;
      o._controlLookUp     = null;
      o._controlLookLeft   = null;
      o._controlPlay       = null;
      o._controlView       = null;
      o.onBuilded         = FDsSceneCanvasToolBar_onBuilded;
      o.onModeClick       = FDsSceneCanvasToolBar_onModeClick;
      o.onLookClick       = FDsSceneCanvasToolBar_onLookClick;
      o.onPlayClick       = FDsSceneCanvasToolBar_onPlayClick;
      o.onRotationClick   = FDsSceneCanvasToolBar_onRotationClick;
      o.construct         = FDsSceneCanvasToolBar_construct;
      o.dispose           = FDsSceneCanvasToolBar_dispose;
      return o;
   }
   MO.FDsSceneCanvasToolBar_onBuilded = function FDsSceneCanvasToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      var button = o._controlModeDrop;
      button._canvasModeCd = EDsCanvasMode.Drop;
      button.addClickListener(o, o.onModeClick);
      button.check(true);
      var button = o._controlModeSelect;
      button._canvasModeCd = EDsCanvasMode.Select;
      button.addClickListener(o, o.onModeClick);
      var button = o._controlTranslate;
      button._canvasModeCd = EDsCanvasMode.Translate;
      button.addClickListener(o, o.onModeClick);
      var button = o._controlRotation;
      button._canvasModeCd = EDsCanvasMode.Rotation;
      button.addClickListener(o, o.onModeClick);
      var button = o._controlScale;
      button._canvasModeCd = EDsCanvasMode.Scale;
      button.addClickListener(o, o.onModeClick);
      o._controlLookFront.addClickListener(o, o.onLookClick);
      o._controlLookUp.addClickListener(o, o.onLookClick);
      o._controlLookLeft.addClickListener(o, o.onLookClick);
      o._controlPlay.addClickListener(o, o.onPlayClick);
      o._controlView.addClickListener(o, o.onRotationClick);
   }
   MO.FDsSceneCanvasToolBar_onModeClick = function FDsSceneCanvasToolBar_onModeClick(event){
      var o = this;
      var sender = event.sender;
      var modeCd = sender._canvasModeCd;
      o._canvasModeCd = modeCd;
      o._frameSet._canvasContent.switchMode(modeCd);
   }
   MO.FDsSceneCanvasToolBar_onLookClick = function FDsSceneCanvasToolBar_onLookClick(event){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsSceneCanvasToolBar_onPlayClick = function FDsSceneCanvasToolBar_onPlayClick(event){
      var o = this;
      o._frameSet._canvasContent.switchPlay(event.checked);
   }
   MO.FDsSceneCanvasToolBar_onRotationClick = function FDsSceneCanvasToolBar_onRotationClick(event){
      var o = this;
      o._frameSet._canvasContent.switchMovie(event.checked);
   }
   MO.FDsSceneCanvasToolBar_construct = function FDsSceneCanvasToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSceneCanvasToolBar_dispose = function FDsSceneCanvasToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneCatalogContent = function FDsSceneCatalogContent(o){
      o = MO.Class.inherits(this, o, FDsCatalog);
      o._catalogCode    = 'resource.scene';
      o.onBuild         = FDsSceneCatalogContent_onBuild;
      o.onLoadDisplay   = FDsSceneCatalogContent_onLoadDisplay;
      o.construct       = FDsSceneCatalogContent_construct;
      o.buildRenderable = FDsSceneCatalogContent_buildRenderable;
      o.buildDisplay    = FDsSceneCatalogContent_buildDisplay;
      o.buildLayer      = FDsSceneCatalogContent_buildLayer;
      o.buildSpace      = FDsSceneCatalogContent_buildSpace;
      o.dispose         = FDsSceneCatalogContent_dispose;
      return o;
   }
   MO.FDsSceneCatalogContent_onBuild = function FDsSceneCatalogContent_onBuild(event){
      var o = this;
      var column = MO.Class.create(FDuiTreeColumn);
      column.setName('view');
      o.push(column);
      o.__base.FDsCatalog.onBuild.call(o, event);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=' + o._catalogCode);
   }
   MO.FDsSceneCatalogContent_onLoadDisplay = function FDsSceneCatalogContent_onLoadDisplay(event){
      var o = this;
      var node = event._linkNode;
      o.buildRenderable(node, event);
   }
   MO.FDsSceneCatalogContent_construct = function FDsSceneCatalogContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSceneCatalogContent_buildRenderable = function FDsSceneCatalogContent_buildRenderable(parentNode, sprite){
      var o = this;
      var movies = sprite.movies();
      if(movies){
         var movieCount = movies.count();
         for(var i = 0; i < movieCount; i++){
            var movie = movies.at(i);
            var movieResource = movie.resource();
            var movieNode = o.createNode();
            movieNode.setTypeCode('Movie');
            movieNode.setLabel(movieResource.code());
            movieNode.setNote(movieResource.label());
            movieNode.dataPropertySet('linker', movie);
            parentNode.appendNode(movieNode);
         }
      }
      var materials = sprite.materials();
      if(materials){
         var materialCount = materials.count();
         for(var i = 0; i < materialCount; i++){
            var material = materials.at(i);
            var materialResource = material.resource();
            var materialNode = o.createNode();
            materialNode.setTypeCode('Material');
            materialNode.setLabel(materialResource.code());
            materialNode.setNote(materialResource.label());
            materialNode.dataPropertySet('linker', material);
            o.buildNodeView(materialNode, true);
            parentNode.appendNode(materialNode);
            o._materialNodes.push(materialNode);
         }
      }
      var animations = sprite.animations();
      if(animations){
         var animationCount = animations.count();
         for(var i = 0; i < animationCount; i++){
            var animation = animations.at(i);
            var animationResource = animation.resource();
            var animationNode = o.createNode();
            animationNode.setTypeCode('Animation');
            animationNode.setLabel(animationResource.code());
            animationNode.setNote(animationResource.label());
            animationNode.dataPropertySet('linker', animation);
            parentNode.appendNode(animationNode);
            o.buildNodeView(animationNode, true);
         }
      }
      var renderables = sprite.meshRenderables();
      if(renderables){
         var renderableCount = renderables.count();
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var modelResource = renderableResource.model();
            var meshResource = renderableResource.mesh();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(meshResource.code());
            renderableNode.dataPropertySet('linker', renderable);
            o.buildNodeView(renderableNode, true);
            parentNode.appendNode(renderableNode);
            o._renderableNodes.push(renderableNode);
         }
      }
   }
   MO.FDsSceneCatalogContent_buildDisplay = function FDsSceneCatalogContent_buildDisplay(parentNode, p){
      var o = this;
      var displays = p.displays();
      if(displays){
         var displayCount = displays.count();
         for(var i = 0; i < displayCount; i++){
            var display = displays.at(i);
            var resource = display.resource();
            var displayNode = o.createNode();
            displayNode.setTypeCode('display');
            displayNode.setLabel(resource.code());
            displayNode.setNote(resource.label());
            displayNode.dataPropertySet('linker', display);
            o.buildNodeView(displayNode, true);
            o._displayNodes.push(displayNode);
            parentNode.appendNode(displayNode);
            display.addLoadListener(o, o.onLoadDisplay);
            display._linkNode = displayNode;
         }
      }
   }
   MO.FDsSceneCatalogContent_buildLayer = function FDsSceneCatalogContent_buildLayer(parentNode, space){
      var o = this;
      var layersNode = o.createNode();
      layersNode.setTypeCode('Layers');
      layersNode.setLabel('Layers');
      layersNode.dataPropertySet('linker', 'layers');
      o.buildNodeView(layersNode, true);
      parentNode.appendNode(layersNode);
      var layers = space.layers();
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         if(MO.Class.isClass(layer, FDisplayUiLayer)){
            continue;
         }
         var layerResource = layer.resource();
         var layerNode = o.createNode();
         layerNode.setTypeCode('Layer');
         layerNode.setLabel('Layer:' + layerResource.code());
         layerNode.dataPropertySet('linker', layer);
         o.buildNodeView(layerNode, true);
         layersNode.appendNode(layerNode);
         o.buildDisplay(layerNode, layer)
      }
   }
   MO.FDsSceneCatalogContent_buildSpace = function FDsSceneCatalogContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Scene');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.push(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      o.buildLayer(spaceNode, space);
      spaceNode.click();
   }
   MO.FDsSceneCatalogContent_dispose = function FDsSceneCatalogContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneCatalogToolBar = function FDsSceneCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._activeNodeGuid        = null;
      o._controlCreateCamera   = null;
      o._controlCreateLayer    = null;
      o._controlCreateSprite   = null;
      o._controlCreateMovie    = null;
      o._controlDelete         = null;
      o._controlFolderOpen     = null;
      o._controlFolderClose    = null;
      o.onBuilded              = FDsSceneCatalogToolBar_onBuilded;
      o.onCreateCameraClick    = FDsSceneCatalogToolBar_onCreateCameraClick;
      o.onCreateLayerClick     = FDsSceneCatalogToolBar_onCreateLayerClick;
      o.onCreateSpriteClick    = FDsSceneCatalogToolBar_onCreateSpriteClick;
      o.onCreateMovieClick     = FDsSceneCatalogToolBar_onCreateMovieClick;
      o.onDeleteLoad           = FDsSceneCatalogToolBar_onDeleteLoad;
      o.onDeleteExecute        = FDsSceneCatalogToolBar_onDeleteExecute;
      o.onCopyLoad             = FDsSceneCatalogToolBar_onCopyLoad;
      o.onCopyExecute          = FDsSceneCatalogToolBar_onCopyExecute;
      o.onCopyClick            = FDsSceneCatalogToolBar_onCopyClick;
      o.onDeleteClick          = FDsSceneCatalogToolBar_onDeleteClick;
      o.onFolderOpenClick      = FDsSceneCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick     = FDsSceneCatalogToolBar_onFolderCloseClick;
      o.construct              = FDsSceneCatalogToolBar_construct;
      o.dispose                = FDsSceneCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSceneCatalogToolBar_onBuilded = function FDsSceneCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
      o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
      o._controlCreateSprite.addClickListener(o, o.onCreateSpriteClick);
      o._controlCreateMovie.addClickListener(o, o.onCreateMovieClick);
      o._controlCopy.addClickListener(o, o.onCopyClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsSceneCatalogToolBar_onCreateCameraClick = function FDsSceneCatalogToolBar_onCreateCameraClick(event){
      var o = this;
   }
   MO.FDsSceneCatalogToolBar_onCreateLayerClick = function FDsSceneCatalogToolBar_onCreateLayerClick(event){
      var o = this;
   }
   MO.FDsSceneCatalogToolBar_onCreateSpriteClick = function FDsSceneCatalogToolBar_onCreateSpriteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return alert('请选中目录节点。');
      }
      var linker = node.dataPropertyGet('linker');
      var layer = null;
      var sprite = null;
      if(MO.Class.isClass(linker, FDisplayLayer)){
         layer = linker;
      }else if(MO.Class.isClass(linker, FE3dSprite)){
         layer = linker.findParent(FDisplayLayer);
         sprite = linker;
      }else{
         return alert('请选中显示层或者精灵节点。');
      }
      var frameSet = o._frameSet;
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsCommonSpriteDialog);
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
   MO.FDsSceneCatalogToolBar_onCreateMovieClick = function FDsSceneCatalogToolBar_onCreateMovieClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return alert('请选中目录节点。');
      }
      var linker = node.dataPropertyGet('linker');
      var layer = null;
      var sprite = null;
      if(MO.Class.isClass(linker, FE3dSprite)){
         layer = linker.findParent(FDisplayLayer);
         sprite = linker;
      }else{
         return alert('请选中精灵节点。');
      }
      var frameSet = o._frameSet;
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsCommonMovieDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = frameSet._activeSpace.resource().guid();
      dialog._layerGuid = layer.resource().guid();
      dialog._displayGuid = sprite.resource().guid();
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
   MO.FDsSceneCatalogToolBar_onCopyLoad = function FDsSceneCatalogToolBar_onCopyLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsSceneCatalogToolBar_onCopyExecute = function FDsSceneCatalogToolBar_onCopyExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = MO.Console.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsSceneCatalogToolBar_onCopyClick = function FDsSceneCatalogToolBar_onCopyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(MO.Class.isClass(linker, FE3dSprite)){
         sprite = linker;
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能复制当前选中的节点.');
      }
      var resource = sprite.resource();
      var parentResource = resource.parent();
      var displayResource = resource.clone();
      parentResource.pushDisplay(displayResource);
      var display = MO.Console.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      MO.Console.find(FE3dSceneConsole).loadDisplay(display);
      var parent = sprite.parent();
      parent.pushDisplay(display);
   }
   MO.FDsSceneCatalogToolBar_onDeleteLoad = function FDsSceneCatalogToolBar_onDeleteLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSceneCatalogToolBar_onDeleteExecute = function FDsSceneCatalogToolBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = MO.Console.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsSceneCatalogToolBar_onDeleteClick = function FDsSceneCatalogToolBar_onDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      var linker = node.dataPropertyGet('linker');
      if(MO.Class.isClass(linker, FE3dSprite)){
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能删除当前选中的节点.');
      }
      var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsSceneCatalogToolBar_onFolderOpenClick = function FDsSceneCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSceneCatalogToolBar_onFolderCloseClick = function FDsSceneCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSceneCatalogToolBar_construct = function FDsSceneCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsSceneCatalogToolBar_dispose = function FDsSceneCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneFrameSet = function FDsSceneFrameSet(o){
      o = MO.Class.inherits(this, o, FDsFrameSet);
      o._frameCatalog         = null;
      o._frameCatalogToolBar  = null;
      o._frameCatalogContent  = null;
      o._frameCanvas          = null;
      o._frameCanvasToolBar   = null;
      o._frameCanvasContent   = null;
      o._frameProperty        = null;
      o._framePropertyToolBar = null;
      o._framePropertyContent = null;
      o.onBuilded             = FDsSceneFrameSet_onBuilded;
      o.onDataLoaded          = FDsSceneFrameSet_onDataLoaded;
      o.onCatalogSelected     = FDsSceneFrameSet_onCatalogSelected;
      o.construct             = FDsSceneFrameSet_construct;
      o.loadByGuid            = FDsSceneFrameSet_loadByGuid;
      o.loadByCode            = FDsSceneFrameSet_loadByCode;
      o.dispose               = FDsSceneFrameSet_dispose;
      return o;
   }
   MO.FDsSceneFrameSet_onBuilded = function FDsSceneFrameSet_onBuilded(event){
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
      var sceneConsole = MO.Console.find(FE3dInstanceConsole);
      sceneConsole.register(EE3dInstance.TemplateRenderable, FDsSceneRenderable);
      sceneConsole.register(EE3dInstance.SceneLayer, FDsSceneLayer);
      sceneConsole.register(EE3dInstance.SceneDisplay, FDsSceneDisplay);
      sceneConsole.register(EE3dInstance.SceneRenderable, FDsSceneRenderable);
   }
   MO.FDsSceneFrameSet_onDataLoaded = function FDsSceneFrameSet_onDataLoaded(canvas){
      var o = this;
      var space = o._activeSpace = canvas._activeSpace;
      o._catalogContent.buildSpace(space);
   }
   MO.FDsSceneFrameSet_onCatalogSelected = function FDsSceneFrameSet_onCatalogSelected(select, flag){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var canvas = o._canvasContent;
      o.hidePropertyFrames();
      if(MO.Class.isClass(select, FE3dScene)){
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dDirectionalLight)){
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(select == 'layers'){
         if(flag){
            canvas.selectLayers(select);
         }
      }else if(MO.Class.isClass(select, FE3dSceneLayer)){
         if(flag){
            canvas.selectLayer(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonLayerPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dSceneDisplay)){
         if(flag){
            canvas.selectDisplay(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dSceneMaterial)){
         if(flag){
            canvas.selectMaterial(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dAnimation)){
         var frame = o.findPropertyFrame(EDsFrame.CommonAnimationPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dMovie)){
         var frame = o.findPropertyFrame(EDsFrame.CommonMoviePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dRenderable)){
         if(flag){
            canvas.selectRenderable(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select type. (select={1})', select);
      }
   }
   MO.FDsSceneFrameSet_construct = function FDsSceneFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsSceneFrameSet_loadByGuid = function FDsSceneFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._canvasContent.loadByGuid(guid);
   }
   MO.FDsSceneFrameSet_loadByCode = function FDsSceneFrameSet_loadByCode(code){
      var o = this;
      o._avtiveCode = code;
      o._canvasContent.loadByCode(code);
   }
   MO.FDsSceneFrameSet_dispose = function FDsSceneFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneMenuBar = function FDsSceneMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._refreshButton        = null;
      o._saveButton           = null;
      o._runButton            = null;
      o.onBuilded             = FDsSceneMenuBar_onBuilded;
      o.onSaveLoad            = FDsSceneMenuBar_onSaveLoad;
      o.onSaveClick           = FDsSceneMenuBar_onSaveClick;
      o.onCaptureLoad         = FDsSceneMenuBar_onCaptureLoad;
      o.onCaptureClick        = FDsSceneMenuBar_onCaptureClick;
      o.onCreateLayerClick    = FDsSceneMenuBar_onCreateLayerClick;
      o.onImportTemplateClick = FDsSceneMenuBar_onImportTemplateClick;
      o.onExecuteClick        = FDsSceneMenuBar_onExecuteClick;
      o.construct             = FDsSceneMenuBar_construct;
      o.dispose               = FDsSceneMenuBar_dispose;
      return o;
   }
   MO.FDsSceneMenuBar_onBuilded = function FDsSceneMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
   }
   MO.FDsSceneMenuBar_onSaveLoad = function FDsSceneMenuBar_onSaveLoad(event){
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsSceneMenuBar_onSaveClick = function FDsSceneMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      space.commitResource();
      var resource = space.resource();
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      var connection = MO.Console.find(FDrSceneConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }
   MO.FDsSceneMenuBar_onCaptureLoad = function FDsSceneMenuBar_onCaptureLoad(event){
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsSceneMenuBar_onCaptureClick = function FDsSceneMenuBar_onCaptureClick(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var canvasContent = o._frameSet._canvasContent;
      var connection = canvasContent.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }
   MO.FDsSceneMenuBar_onCreateLayerClick = function FDsSceneMenuBar_onCreateLayerClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsCommonLayerDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSceneMenuBar_onImportTemplateClick = function FDsSceneMenuBar_onImportTemplateClick(){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsCommonTemplateDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSceneMenuBar_onExecuteClick = function FDsSceneMenuBar_onExecuteClick(event){
      var o = this;
      var url = 'Space.wa?do=run&guid=' + o._frameSet._activeGuid;
      window.location = url;
   }
   MO.FDsSceneMenuBar_construct = function FDsSceneMenuBar_construct(){
      var o = this;
      o.__base.FDuiMenuBar.construct.call(o);
   }
   MO.FDsSceneMenuBar_dispose = function FDsSceneMenuBar_dispose(){
      var o = this;
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsScenePropertyToolBar = function FDsScenePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName                   = 'resource.scene.PropertyToolBar';
      o._controlRefresh   = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsScenePropertyToolBar_onBuilded;
      o.onFolderCreateClick          = FDsScenePropertyToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsScenePropertyToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsScenePropertyToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsScenePropertyToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsScenePropertyToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsScenePropertyToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsScenePropertyToolBar_onFolderCloseClick;
      o.construct                    = FDsScenePropertyToolBar_construct;
      o.dispose                      = FDsScenePropertyToolBar_dispose;
      return o;
   }
   MO.FDsScenePropertyToolBar_onBuilded = function FDsScenePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
   }
   MO.FDsScenePropertyToolBar_onFolderCreateClick = function FDsScenePropertyToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsScenePropertyToolBar_onFolderDeleteLoad = function FDsScenePropertyToolBar_onFolderDeleteLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsScenePropertyToolBar_onFolderDeleteExcute = function FDsScenePropertyToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      MO.Console.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = MO.Console.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsScenePropertyToolBar_onFolderDeleteClick = function FDsScenePropertyToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsScenePropertyToolBar_onFolderPropertyClick = function FDsScenePropertyToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsScenePropertyToolBar_onFolderOpenClick = function FDsScenePropertyToolBar_onFolderOpenClick(event){
   }
   MO.FDsScenePropertyToolBar_onFolderCloseClick = function FDsScenePropertyToolBar_onFolderCloseClick(event){
   }
   MO.FDsScenePropertyToolBar_construct = function FDsScenePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsScenePropertyToolBar_dispose = function FDsScenePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSceneWorkspace = function FDsSceneWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace);
      o._frameName            = 'resource.share.scene.Workspace';
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = MO.Class.register(o, new MO.AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleWorkspaceGround = MO.Class.register(o, new MO.AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._stylePropertyGround  = MO.Class.register(o, new MO.AStyle('_stylePropertyGround', 'Property_Ground'));
      o._framesetMain         = null;
      o._framesetBody         = null;
      o._frameToolBar         = null;
      o._frameBody            = null;
      o._frameProperty        = null;
      o._frameCatalog         = null;
      o._frameWorkspace       = null;
      o._frameStatusBar       = null;
      o._propertyFrames       = null;
      o.onBuilded             = FDsSceneWorkspace_onBuilded;
      o.onSceneLoad           = FDsSceneWorkspace_onSceneLoad;
      o.onCatalogSelected     = FDsSceneWorkspace_onCatalogSelected;
      o.construct             = FDsSceneWorkspace_construct;
      o.findPropertyFrame     = FDsSceneWorkspace_findPropertyFrame;
      o.loadScene             = FDsSceneWorkspace_loadScene;
      o.dispose               = FDsSceneWorkspace_dispose;
      return o;
   }
   MO.FDsSceneWorkspace_onBuilded = function FDsSceneWorkspace_onBuilded(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
      var f = o._frameToolBar = o.searchControl('toolbarFrame');
      f._hPanel.className = o.styleName('Toolbar_Ground');
      var f = o._frameCatalog = o.searchControl('catalogFrame');
      f._hPanel.className = o.styleName('Catalog_Ground');
      var f = o._frameWorkspace = o.searchControl('spaceFrame');
      f._hPanel.className = o.styleName('Workspace_Ground');
      var f = o._frameProperty = o.searchControl('propertyFrame');
      f._hPanel.className = o.styleName('Property_Ground');
      var f = o._frameStatusBar = o.searchControl('statusFrame');
      f._hPanel.className = o.styleName('Statusbar_Ground');
      var f = o._catalogSplitter = o.searchControl('catalogSpliter');
      f.setAlignCd(EUiAlign.Left);
      f.setSizeHtml(o._frameCatalog._hPanel);
      var f = o._propertySpliter = o.searchControl('propertySpliter');
      f.setAlignCd(EUiAlign.Right);
      f.setSizeHtml(o._frameProperty._hPanel);
      var c = o._toolbar = MO.Class.create(FDsSceneMenuBar);
      c._workspace = o;
      c.buildDefine(p);
      o._frameToolBar.push(c);
      var c = o._catalog = MO.Class.create(FDsSceneCatalog);
      c._workspace = o;
      c.build(p);
      c.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalog.push(c);
      var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
      var c = o._canvasToolbar = MO.Class.create(FDsSceneCanvasToolBar);
      c._workspace = o;
      c.buildDefine(p);
      o._canvasToolbarFrame.push(c);
      var f = o._canvasFrame = o.searchControl('canvasFrame');
      var c = o._canvas = MO.Class.create(FDsSceneCanvas);
      c._workspace = o;
      c._toolbar = o._canvasToolbar;
      c.addLoadListener(o, o.onSceneLoad);
      c._hParent = f._hPanel;
      c._hParent.style.backgroundColor = '#000000';
      c.build(p);
      o._canvasFrame.push(c);
   }
   MO.FDsSceneWorkspace_onSceneLoad = function FDsSceneWorkspace_onSceneLoad(p){
      var o = this;
      var t = o._activeScene = p._activeScene;
      o._catalog.buildScene(t);
   }
   MO.FDsSceneWorkspace_onCatalogSelected = function FDsSceneWorkspace_onCatalogSelected(p, pc){
      var o = this;
      var s = o._activeScene;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(MO.Class.isClass(p, FE3dScene)){
         var f = o.findPropertyFrame(EDsFrame.SceneSpacePropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.SceneTechniquePropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.SceneRegionPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.SceneCameraPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.SceneLightPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(p == 'layers'){
         if(pc){
            o._canvas.selectLayers(p);
         }
      }else if(MO.Class.isClass(p, FE3dSceneLayer)){
         if(pc){
            o._canvas.selectLayer(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneLayerPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FE3dSceneDisplay)){
         if(pc){
            o._canvas.selectDisplay(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneDisplayPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FE3dSceneMaterial)){
         if(pc){
            o._canvas.selectMaterial(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneMaterialPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FE3rAnimation)){
         var f = o.findPropertyFrame(EDsFrame.SceneAnimationPropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else if(MO.Class.isClass(p, FE3dRenderable)){
         if(pc){
            o._canvas.selectRenderable(p);
         }
         var f = o.findPropertyFrame(EDsFrame.SceneRenderablePropertyFrame);
         f.show();
         f.loadObject(s, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsSceneWorkspace_construct = function FDsSceneWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsSceneWorkspace_findPropertyFrame = function FDsSceneWorkspace_findPropertyFrame(p){
      var o = this;
      var frame = o._propertyFrames.get(p);
      if(!frame){
         frame = MO.Console.find(FDuiFrameConsole).get(o, p, o._frameProperty._hContainer);
         frame._workspace = o;
         o._propertyFrames.set(p, frame);
      }
      return frame;
   }
   MO.FDsSceneWorkspace_loadScene = function FDsSceneWorkspace_loadScene(p){
      var o = this;
      o._sceneCode = p;
      o._canvas.loadScene(p);
   }
   MO.FDsSceneWorkspace_dispose = function FDsSceneWorkspace_dispose(){
      var o = this;
      o.__base.FDuiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
