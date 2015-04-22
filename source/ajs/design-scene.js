function FDsSceneCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   o._rotation            = null;
   o._optionRotation      = false;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectObject        = null;
   o._selectRenderables   = null;
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   o.onBuild              = FDsSceneCanvas_onBuild;
   o.onMouseCaptureStart  = FDsSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsSceneCanvas_onMouseCaptureStop;
   o.onDataLoaded         = FDsSceneCanvas_onDataLoaded;
   o.oeResize             = FDsSceneCanvas_oeResize;
   o.oeRefresh            = FDsSceneCanvas_oeRefresh;
   o.construct            = FDsSceneCanvas_construct;
   o.innerSelectDisplay   = FDsSceneCanvas_innerSelectDisplay;
   o.innerSelectLayer     = FDsSceneCanvas_innerSelectLayer;
   o.selectNone           = FDsSceneCanvas_selectNone;
   o.selectLayers         = FDsSceneCanvas_selectLayers;
   o.selectLayer          = FDsSceneCanvas_selectLayer;
   o.selectDisplay        = FDsSceneCanvas_selectDisplay;
   o.selectMaterial       = FDsSceneCanvas_selectMaterial;
   o.selectRenderable     = FDsSceneCanvas_selectRenderable;
   o.switchMode           = FDsSceneCanvas_switchMode;
   o.switchPlay           = FDsSceneCanvas_switchPlay;
   o.switchMovie          = FDsSceneCanvas_switchMovie;
   o.capture              = FDsSceneCanvas_capture;
   o.loadByGuid           = FDsSceneCanvas_loadByGuid;
   o.dispose              = FDsSceneCanvas_dispose;
   return o;
}
function FDsSceneCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}
function FDsSceneCanvas_onMouseCaptureStart(p){
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
}
function FDsSceneCanvas_onMouseCapture(p){
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
function FDsSceneCanvas_onMouseCaptureStop(p){
}
function FDsSceneCanvas_onDataLoaded(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeSpace;
   o.reloadRegion()
   o.processLoadListener(o);
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsSceneCanvas_oeResize(p){
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
function FDsSceneCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}
function FDsSceneCanvas_construct(){
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
function FDsSceneCanvas_innerSelectDisplay(select){
   var o = this;
   var displays = select.displays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      o.innerSelectDisplay(display);
   }
   var renderables = select.renderables();
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      if(RClass.isClass(renderable, FDsSceneRenderable)){
         o._selectRenderables.push(renderable);
         renderable.showBoundBox();
      }
   }
}
function FDsSceneCanvas_innerSelectLayer(layer){
   var o = this;
   var displays = layer.displays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      o.innerSelectDisplay(display)
   }
}
function FDsSceneCanvas_selectNone(){
   var o = this;
   o._selectObject = null;
   var renderables = o._selectRenderables;
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      renderable.hideBoundBox();
   }
   o._selectRenderables.clear();
}
function FDsSceneCanvas_selectLayers(p){
   var o = this;
   o.selectNone();
   var s = o._activeSpace.layers();
   for(var i = s.count() - 1; i >= 0; i--){
      o.innerSelectLayer(s.valueAt(i));
   }
}
function FDsSceneCanvas_selectLayer(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectLayer(p);
}
function FDsSceneCanvas_selectDisplay(p){
   var o = this;
   o.selectNone();
   o._selectObject = p;
   o.innerSelectDisplay(p);
}
function FDsSceneCanvas_selectMaterial(material){
   var o = this;
   o.selectNone();
   o._selectObject = material;
   var display = material._display;
   var sprite = display._sprite;
   var renderables = sprite.renderables();
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      if(renderable._materialReference == material._parentMaterial){
         o._selectRenderables.push(renderable);
         renderable._optionSelected = true;
         renderable.showBoundBox();
      }
   }
}
function FDsSceneCanvas_selectRenderable(renderable){
   var o = this;
   if(renderable){
      var n = renderable._renderable._resource._code;
      switch(n){
         case 'ms_translation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = renderable;
            return;
         case 'ms_translation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = renderable;
            return;
         case 'ms_translation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = renderable;
            return;
         case 'ms_rotation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = renderable;
            return;
         case 'ms_rotation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = renderable;
            return;
         case 'ms_rotation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = renderable;
            return;
         case 'ms_scale_all':
            o._canvasMoveCd = EDsCanvasDrag.All;
            o._templateRenderable = renderable;
            return;
         default:
            o._canvasMoveCd = EDsCanvasDrag.Unknown;
            o._templateRenderable = null;
      }
   }
   o.selectNone();
   if(renderable){
      renderable._optionSelected = true;
      renderable.showBoundBox();
      o._selectRenderables.push(renderable);
      o._frameSet._catalogContent.showObject(renderable);
   }
   return;
   var templateTranslation = o._templateTranslation;
   var templateRotation = o._templateRotation;
   var templateScale = o._templateScale;
   var modeCd = o._canvasModeCd;
   switch(modeCd){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         templateTranslation.setVisible(renderable != null);
         templateRotation.setVisible(false);
         templateScale.setVisible(false);
         o._templateFace = templateTranslation;
         break;
      case EDsCanvasMode.Rotation:
         templateTranslation.setVisible(false);
         templateRotation.setVisible(renderable != null);
         templateScale.setVisible(false);
         o._templateFace = templateScale;
         break;
      case EDsCanvasMode.Scale:
         templateTranslation.setVisible(false);
         templateRotation.setVisible(false);
         templateScale.setVisible(renderable != null);
         o._templateFace = templateScale;
         break;
   }
   var templateFace = o._templateFace;
   if(renderable && templateFace){
      var display = renderable.display();
      var matrix = templateFace.matrix();
      matrix.assign(display.matrix());
      matrix.setScaleAll(o._templateViewScale);
      matrix.update();
   }
}
function FDsSceneCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   o.selectRenderable(o._selectRenderable);
}
function FDsSceneCanvas_switchPlay(flag){
   var o = this;
   var space = o._activeSpace;
   var displays = space.allDisplays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      if(RClass.isClass(display, FE3dSceneDisplay)){
         var sprite = display._sprite;
         sprite._optionPlay = flag;
         display._optionPlay = flag;
      }
   }
}
function FDsSceneCanvas_switchMovie(flag){
   var o = this;
   var space = o._activeSpace;
   var displays = space.allDisplays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      if(RClass.isClass(display, FE3dSceneDisplay)){
         var sprite = display._sprite;
         if(sprite){
            sprite._optionMovie = flag;
         }
         display._optionMovie = flag;
      }
   }
}
function FDsSceneCanvas_capture(){
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
   var url = '/cloud.resource.preview.wv?do=upload&type_cd=' + EE3sResource.Scene + '&guid=' + guid + '&width=' + width + '&height=' + height;
   return RConsole.find(FHttpConsole).send(url, data.buffer);
}
function FDsSceneCanvas_loadByGuid(guid){
   var o = this;
   var sceneConsole = RConsole.find(FE3dInstanceConsole);
   sceneConsole.register(EE3dInstance.TemplateRenderable, FDsSceneRenderable);
   sceneConsole.register(EE3dInstance.SceneLayer, FDsSceneLayer);
   sceneConsole.register(EE3dInstance.SceneDisplay, FDsSceneDisplay);
   sceneConsole.register(EE3dInstance.SceneRenderable, FDsSceneRenderable);
   var space = o._activeSpace;
   var sceneConsole = RConsole.find(FE3dSceneConsole);
   if(space){
      RStage.unregister(space);
      sceneConsole.free(space);
   }
   space = o._activeSpace = sceneConsole.allocByGuid(o, guid);
   if(!space._linked){
      RConsole.find(FUiDesktopConsole).showLoading();
      space.addLoadListener(o, o.onDataLoaded);
      space._linked = true;
   }
   RStage.register('space', space);
}
function FDsSceneCanvas_dispose(){
   var o = this;
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   o.__base.FDsCanvas.dispose.call(o);
}
function FDsSceneCanvasToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
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
function FDsSceneCanvasToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
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
function FDsSceneCanvasToolBar_onModeClick(event){
   var o = this;
   var sender = event.sender;
   var modeCd = sender._canvasModeCd;
   o._canvasModeCd = modeCd;
   o._frameSet._canvasContent.switchMode(modeCd);
}
function FDsSceneCanvasToolBar_onLookClick(event){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
}
function FDsSceneCanvasToolBar_onPlayClick(event){
   var o = this;
   o._frameSet._canvasContent.switchPlay(event.checked);
}
function FDsSceneCanvasToolBar_onRotationClick(event){
   var o = this;
   o._frameSet._canvasContent.switchMovie(event.checked);
}
function FDsSceneCanvasToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSceneCanvasToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSceneCatalog(o){
   o = RClass.inherits(this, o, FDsCatalog);
   o._iconView             = 'resource.scene.view';
   o._iconViewNot          = 'resource.scene.viewno';
   o._displays             = null;
   o._renderables          = null;
   o._materials            = null;
   o.onBuild               = FDsSceneCatalog_onBuild;
   o.onLoadDisplay         = FDsSceneCatalog_onLoadDisplay;
   o.onNodeViewClick       = FDsSceneCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsSceneCatalog_onNodeViewDoubleClick;
   o.lsnsSelect            = null;
   o.construct             = FDsSceneCatalog_construct;
   o.buildNodeView         = FDsSceneCatalog_buildNodeView;
   o.buildRenderable       = FDsSceneCatalog_buildRenderable;
   o.buildDisplay          = FDsSceneCatalog_buildDisplay;
   o.buildLayer            = FDsSceneCatalog_buildLayer;
   o.buildSpace            = FDsSceneCatalog_buildSpace;
   o.selectObject          = FDsSceneCatalog_selectObject;
   o.showObject            = FDsSceneCatalog_showObject;
   o.dispose               = FDsSceneCatalog_dispose;
   return o;
}
function FDsSceneCatalog_onBuild(p){
   var o = this;
   var c = RClass.create(FUiTreeColumn);
   c.setName('view');
   o.push(c);
   o.__base.FDsCatalog.onBuild.call(o, p);
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.scene');
}
function FDsSceneCatalog_onLoadDisplay(event){
   var o = this;
   var node = event._linkNode;
   o.buildRenderable(node, event);
}
function FDsSceneCatalog_onNodeViewClick(p){
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
function FDsSceneCatalog_onNodeViewDoubleClick(p){
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
function FDsSceneCatalog_construct(){
   var o = this;
   o.__base.FDsCatalog.construct.call(o);
   o._displays = new TObjects();
   o._renderables = new TObjects();
   o._materials = new TObjects();
}
function FDsSceneCatalog_buildNodeView(node, view){
   var o = this;
   var cell = node.cell('view');
   cell.setIcon(o._iconView);
   cell.setClickListener(o, o.onNodeViewClick);
   cell.setDoubleClickListener(o, o.onNodeViewDoubleClick);
}
function FDsSceneCatalog_buildRenderable(parentNode, sprite){
   var o = this;
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
         o._materials.push(material);
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
         o._renderables.push(renderableNode);
      }
   }
}
function FDsSceneCatalog_buildDisplay(parentNode, p){
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
         o._displays.push(displayNode);
         parentNode.appendNode(displayNode);
         display.addLoadListener(o, o.onLoadDisplay);
         display._linkNode = displayNode;
      }
   }
}
function FDsSceneCatalog_buildLayer(parentNode, space){
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
      if(RClass.isClass(layer, FDisplayUiLayer)){
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
function FDsSceneCatalog_buildSpace(space){
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
function FDsSceneCatalog_selectObject(item){
   var o = this;
   if(item){
      o.processSelectedListener(item, true);
   }
}
function FDsSceneCatalog_showObject(select){
   var o = this;
   if(RClass.isClass(select, FDsSceneRenderable)){
      var renderables = o._renderables;
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         var r = renderable.dataPropertyGet('linker');
         if(r == select){
            o.processSelectedListener(select, false);
         }
      }
   }
}
function FDsSceneCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   o.__base.FDsCatalog.dispose.call(o);
}
function FDsSceneCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName             = 'resource.share.scene.CatalogToolBar';
   o._activeNodeGuid        = null;
   o._controlCreateCamera   = null;
   o._controlCreateLayer    = null;
   o._controlCreateSprite   = null;
   o._controlDelete         = null;
   o._controlFolderOpen     = null;
   o._controlFolderClose    = null;
   o.onBuilded              = FDsSceneCatalogToolBar_onBuilded;
   o.onCreateCameraClick    = FDsSceneCatalogToolBar_onCreateCameraClick;
   o.onCreateLayerClick     = FDsSceneCatalogToolBar_onCreateLayerClick;
   o.onCreateSpriteClick    = FDsSceneCatalogToolBar_onCreateSpriteClick;
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
function FDsSceneCatalogToolBar_onBuilded(p){
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
function FDsSceneCatalogToolBar_onCreateCameraClick(event){
   var o = this;
}
function FDsSceneCatalogToolBar_onCreateLayerClick(event){
   var o = this;
}
function FDsSceneCatalogToolBar_onCreateSpriteClick(event){
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
function FDsSceneCatalogToolBar_onCopyLoad(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsSceneCatalogToolBar_onCopyExecute(event){
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
function FDsSceneCatalogToolBar_onCopyClick(event){
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
function FDsSceneCatalogToolBar_onDeleteLoad(event){
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
function FDsSceneCatalogToolBar_onDeleteExecute(event){
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
function FDsSceneCatalogToolBar_onDeleteClick(event){
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
function FDsSceneCatalogToolBar_onFolderOpenClick(event){
}
function FDsSceneCatalogToolBar_onFolderCloseClick(event){
}
function FDsSceneCatalogToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsSceneCatalogToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSceneFrameSet(o){
   o = RClass.inherits(this, o, FDsFrameSet);
   o._frameName            = 'resource.scene.FrameSet';
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
   o.onBuilded             = FDsSceneFrameSet_onBuilded;
   o.onDataLoaded          = FDsSceneFrameSet_onDataLoaded;
   o.onCatalogSelected     = FDsSceneFrameSet_onCatalogSelected;
   o.construct             = FDsSceneFrameSet_construct;
   o.loadByGuid            = FDsSceneFrameSet_loadByGuid;
   o.loadByCode            = FDsSceneFrameSet_loadByCode;
   o.dispose               = FDsSceneFrameSet_dispose;
   return o;
}
function FDsSceneFrameSet_onBuilded(event){
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
}
function FDsSceneFrameSet_onDataLoaded(canvas){
   var o = this;
   var space = o._activeSpace = canvas._activeSpace;
   o._catalogContent.buildSpace(space);
}
function FDsSceneFrameSet_onCatalogSelected(select, flag){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var canvas = o._canvasContent;
   o.hidePropertyFrames();
   if(RClass.isClass(select, FE3dScene)){
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
   }else if(select == 'layers'){
      if(flag){
         canvas.selectLayers(select);
      }
   }else if(RClass.isClass(select, FE3dSceneLayer)){
      if(flag){
         canvas.selectLayer(select);
      }
      var frame = o.findPropertyFrame(EDsFrame.CommonLayerPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dSceneDisplay)){
      if(flag){
         canvas.selectDisplay(select);
      }
      var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dSceneMaterial)){
      if(flag){
         canvas.selectMaterial(select);
      }
      var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dAnimation)){
      var frame = o.findPropertyFrame(EDsFrame.CommonAnimationPropertyFrame);
      frame.show();
      frame.loadObject(space, select);
   }else if(RClass.isClass(select, FE3dRenderable)){
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
function FDsSceneFrameSet_construct(){
   var o = this;
   o.__base.FDsFrameSet.construct.call(o);
}
function FDsSceneFrameSet_loadByGuid(guid){
   var o = this;
   o._activeGuid = guid;
   o._canvasContent.loadByGuid(guid);
}
function FDsSceneFrameSet_loadByCode(p){
   var o = this;
   o._meshCode = p;
   o._canvasContent.loadByCode(p);
}
function FDsSceneFrameSet_dispose(){
   var o = this;
   o.__base.FDsFrameSet.dispose.call(o);
}
function FDsSceneMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   o.onBuilded      = FDsSceneMenuBar_onBuilded;
   o.onSaveLoad     = FDsSceneMenuBar_onSaveLoad;
   o.onSaveClick    = FDsSceneMenuBar_onSaveClick;
   o.onCaptureLoad  = FDsSceneMenuBar_onCaptureLoad;
   o.onCaptureClick = FDsSceneMenuBar_onCaptureClick;
   o.onExecuteClick = FDsSceneMenuBar_onExecuteClick;
   o.construct      = FDsSceneMenuBar_construct;
   o.dispose        = FDsSceneMenuBar_dispose;
   return o;
}
function FDsSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
}
function FDsSceneMenuBar_onSaveLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsSceneMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   RConsole.find(FUiDesktopConsole).showUploading();
   var xconfig = new TXmlNode();
   resource.saveConfig(xconfig);
   var connection = RConsole.find(FDrSceneConsole).update(xconfig);
   connection.addLoadListener(o, o.onSaveLoad);
}
function FDsSceneMenuBar_onCaptureLoad(event){
   RConsole.find(FUiDesktopConsole).hide();
}
function FDsSceneMenuBar_onCaptureClick(event){
   var o = this;
   RConsole.find(FUiDesktopConsole).showUploading();
   var canvasContent = o._frameSet._canvasContent;
   var connection = canvasContent.capture();
   connection.addLoadListener(o, o.onCaptureLoad);
}
function FDsSceneMenuBar_onExecuteClick(p){
   var o = this;
   var u = '../design/view.html?code=' + o._frameSet._sceneCode;
   window.location = u;
}
function FDsSceneMenuBar_construct(){
   var o = this;
   o.__base.FUiMenuBar.construct.call(o);
}
function FDsSceneMenuBar_dispose(){
   var o = this;
   o.__base.FUiMenuBar.dispose.call(o);
}
function FDsScenePropertyToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   o._frameName                   = 'resource.share.scene.PropertyToolBar';
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
function FDsScenePropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
}
function FDsScenePropertyToolBar_onFolderCreateClick(event){
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
function FDsScenePropertyToolBar_onFolderDeleteLoad(event){
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
function FDsScenePropertyToolBar_onFolderDeleteExcute(event){
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
function FDsScenePropertyToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
function FDsScenePropertyToolBar_onFolderPropertyClick(event){
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
function FDsScenePropertyToolBar_onFolderOpenClick(event){
}
function FDsScenePropertyToolBar_onFolderCloseClick(event){
}
function FDsScenePropertyToolBar_construct(){
   var o = this;
   o.__base.FUiToolBar.construct.call(o);
}
function FDsScenePropertyToolBar_dispose(){
   var o = this;
   o.__base.FUiToolBar.dispose.call(o);
}
function FDsSceneWorkspace(o){
   o = RClass.inherits(this, o, FUiWorkspace);
   o._frameName            = 'resource.share.scene.Workspace';
   o._styleToolbarGround   = RClass.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
   o._styleStatusbarGround = RClass.register(o, new AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
   o._styleCatalogGround   = RClass.register(o, new AStyle('_styleCatalogGround', 'Catalog_Ground'));
   o._styleWorkspaceGround = RClass.register(o, new AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
   o._stylePropertyGround  = RClass.register(o, new AStyle('_stylePropertyGround', 'Property_Ground'));
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
function FDsSceneWorkspace_onBuilded(p){
   var o = this;
   o.__base.FUiWorkspace.onBuilded.call(o, p);
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
   var c = o._toolbar = RClass.create(FDsSceneMenuBar);
   c._workspace = o;
   c.buildDefine(p);
   o._frameToolBar.push(c);
   var c = o._catalog = RClass.create(FDsSceneCatalog);
   c._workspace = o;
   c.build(p);
   c.addSelectedListener(o, o.onCatalogSelected);
   o._frameCatalog.push(c);
   var f = o._canvasToolbarFrame = o.searchControl('canvasToolbarFrame');
   var c = o._canvasToolbar = RClass.create(FDsSceneCanvasToolBar);
   c._workspace = o;
   c.buildDefine(p);
   o._canvasToolbarFrame.push(c);
   var f = o._canvasFrame = o.searchControl('canvasFrame');
   var c = o._canvas = RClass.create(FDsSceneCanvas);
   c._workspace = o;
   c._toolbar = o._canvasToolbar;
   c.addLoadListener(o, o.onSceneLoad);
   c._hParent = f._hPanel;
   c._hParent.style.backgroundColor = '#000000';
   c.build(p);
   o._canvasFrame.push(c);
}
function FDsSceneWorkspace_onSceneLoad(p){
   var o = this;
   var t = o._activeScene = p._activeScene;
   o._catalog.buildScene(t);
}
function FDsSceneWorkspace_onCatalogSelected(p, pc){
   var o = this;
   var s = o._activeScene;
   var fs = o._propertyFrames;
   var c = fs.count();
   for(var i = 0; i < c; i++){
      var f = fs.value(i);
      f.hide();
   }
   if(RClass.isClass(p, FE3dScene)){
      var f = o.findPropertyFrame(EDsFrame.SceneSpacePropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FG3dTechnique)){
      var f = o.findPropertyFrame(EDsFrame.SceneTechniquePropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dRegion)){
      var f = o.findPropertyFrame(EDsFrame.SceneRegionPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dCamera)){
      var f = o.findPropertyFrame(EDsFrame.SceneCameraPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FG3dDirectionalLight)){
      var f = o.findPropertyFrame(EDsFrame.SceneLightPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(p == 'layers'){
      if(pc){
         o._canvas.selectLayers(p);
      }
   }else if(RClass.isClass(p, FE3dSceneLayer)){
      if(pc){
         o._canvas.selectLayer(p);
      }
      var f = o.findPropertyFrame(EDsFrame.SceneLayerPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneDisplay)){
      if(pc){
         o._canvas.selectDisplay(p);
      }
      var f = o.findPropertyFrame(EDsFrame.SceneDisplayPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dSceneMaterial)){
      if(pc){
         o._canvas.selectMaterial(p);
      }
      var f = o.findPropertyFrame(EDsFrame.SceneMaterialPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3rAnimation)){
      var f = o.findPropertyFrame(EDsFrame.SceneAnimationPropertyFrame);
      f.show();
      f.loadObject(s, p);
   }else if(RClass.isClass(p, FE3dRenderable)){
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
function FDsSceneWorkspace_construct(){
   var o = this;
   o.__base.FUiWorkspace.construct.call(o);
   o._propertyFrames = new TDictionary();
}
function FDsSceneWorkspace_findPropertyFrame(p){
   var o = this;
   var frame = o._propertyFrames.get(p);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, p, o._frameProperty._hContainer);
      frame._workspace = o;
      o._propertyFrames.set(p, frame);
   }
   return frame;
}
function FDsSceneWorkspace_loadScene(p){
   var o = this;
   o._sceneCode = p;
   o._canvas.loadScene(p);
}
function FDsSceneWorkspace_dispose(){
   var o = this;
   o.__base.FUiWorkspace.dispose.call(o);
   o._propertyFrames.dispose();
   o._propertyFrames = null;
}
