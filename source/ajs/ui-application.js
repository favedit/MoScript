MO.EApplicationConstant = new function EApplicationConstant(){
   var o = this;
   o.SessionCode = "mo-session-id";
   o.Resource    = "resource";
   return o;
}
MO.ECanvasChapter = new function ECanvasChapter(){
   var o = this;
   o.Simple = 'simple';
   return o;
}
MO.ECanvasScene = new function ECanvasScene(){
   var o = this;
   o.Simple = 'simple';
   return o;
}
MO.MFrameProcessor = function MFrameProcessor(o){
   o = MO.Class.inherits(this, o);
   o._readyLoader         = MO.Class.register(o, new MO.AGetter('_readyLoader'));
   o._eventEnterFrame     = null;
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._eventLeaveFrame     = null;
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   o.onProcessReady       = MO.Method.empty;
   o.construct            = MO.MFrameProcessor_construct;
   o.dispose              = MO.MFrameProcessor_dispose;
   return o;
}
MO.MFrameProcessor_construct = function MFrameProcessor_construct(){
   var o = this;
   var loader = o._readyLoader = MO.Class.create(MO.FReadyLoader);
   loader.addChangeListener(o, o.onProcessReady);
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}
MO.MFrameProcessor_dispose = function MFrameProcessor_dispose(){
   var o = this;
   o._readyLoader = MO.Lang.Object.dispose(o._readyLoader);
   o._eventEnterFrame = MO.Lang.Object.dispose(o._eventEnterFrame);
   o._eventLeaveFrame = MO.Lang.Object.dispose(o._eventLeaveFrame);
}
MO.FApplication = function FApplication(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   o._sessionId           = MO.Class.register(o, new MO.AGetSet('_sessionId'));
   o._activeChapter       = MO.Class.register(o, new MO.AGetter('_activeChapter'));
   o._chapters            = MO.Class.register(o, new MO.AGetter('_chapters'));
   o.onProcessReady       = MO.FApplication_onProcessReady;
   o.onProcess            = MO.FApplication_onProcess;
   o.construct            = MO.FApplication_construct;
   o.setup                = MO.Method.emptyTrue;
   o.findSessionId        = MO.FApplication_findSessionId;
   o.createChapter        = MO.Method.empty;
   o.registerChapter      = MO.FApplication_registerChapter;
   o.unregisterChapter    = MO.FApplication_unregisterChapter;
   o.selectChapter        = MO.FApplication_selectChapter;
   o.selectChapterByCode  = MO.FApplication_selectChapterByCode;
   o.processResize        = MO.FApplication_processResize;
   o.processEvent         = MO.FApplication_processEvent;
   o.process              = MO.FApplication_process;
   o.dispose              = MO.FApplication_dispose;
   return o;
}
MO.FApplication_onProcessReady = function FApplication_onProcessReady(event){
}
MO.FApplication_onProcess = function FApplication_onProcess(event){
   var o = this;
   var chapter = o._activeChapter;
   if(chapter){
      chapter.process();
   }
}
MO.FApplication_construct = function FApplication_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MFrameProcessor.construct.call(o);
   o._sessionId = MO.Window.cookie(MO.EApplicationConstant.SessionCode);
   o._chapters = new MO.TDictionary();
}
MO.FApplication_findSessionId = function FApplication_findSessionId(){
   var o = this;
   return o._sessionId;
}
MO.FApplication_registerChapter = function FApplication_registerChapter(chapter){
   var o = this;
   var code = chapter.code();
   chapter.setApplication(o);
   o._chapters.set(code, chapter);
}
MO.FApplication_unregisterChapter = function FApplication_unregisterChapter(chapter){
   var o = this;
   var code = chapter.code();
   o._chapters.set(code, null);
}
MO.FApplication_selectChapter = function FApplication_selectChapter(chapter){
   var o = this;
   if(o._activeChapter != chapter){
      var activeChapter = o._activeChapter;
      if(activeChapter){
         activeChapter.deactive();
         o._activeChapter = null;
      }
      if(chapter){
         chapter.active();
         o._activeChapter = chapter;
      }
   }
}
MO.FApplication_selectChapterByCode = function FApplication_selectChapterByCode(code){
   var o = this;
   var chapter = o._chapters.get(code);
   if(!chapter){
      chapter = o.createChapter(code);
      o.registerChapter(chapter);
   }
   o.selectChapter(chapter);
   return chapter;
}
MO.FApplication_processResize = function FApplication_processResize(){
   var o = this;
}
MO.FApplication_processEvent = function FApplication_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
   var chapter = o._activeChapter;
   if(chapter){
      chapter.processEvent(event);
   }
}
MO.FApplication_process = function FApplication_process(){
   var o = this;
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   o.processEnterFrameListener(o._eventEnterFrame);
   o.onProcess();
   o.processLeaveFrameListener(o._eventLeaveFrame);
}
MO.FApplication_dispose = function FApplication_dispose(){
   var o = this;
   o._activeChapter = null;
   o._chapters = MO.Lang.Object.dispose(o._chapters, true);
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FCanvas3d = function FCanvas3d(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   o._scaleRate          = 1;
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = false;
   o._optionAntialias    = false;
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._capturePosition    = null;
   o._captureRotation    = null;
   o._cameraPosition     = null;
   o.construct           = MO.FCanvas3d_construct;
   o.resize              = MO.FCanvas3d_resize;
   o.selectStage         = MO.FCanvas3d_selectStage;
   o.setPanel            = MO.FCanvas3d_setPanel;
   o.dispose             = MO.FCanvas3d_dispose;
   return o;
}
MO.FCanvas3d_construct = function FCanvas3d_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   o._logicSize.set(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}
MO.FCanvas3d_resize = function FCanvas3d_resize(width, height){
   var o = this;
   o.__base.FE3dCanvas.resize.call(o, width, height);
   var context = o._graphicContext;
   var size = context.size();
   var stage = o._activeStage;
   if(stage){
      var projection = stage.camera().projection();
      projection.size().set(size.width, size.height);
      projection.update();
   }
}
MO.FCanvas3d_selectStage = function FCanvas3d_selectStage(stage){
   var o = this;
   if(stage){
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      if(!stage.technique()){
         stage.selectTechnique(o, MO.FE3dGeneralTechnique);
      }
   }
   o._activeStage = stage;
}
MO.FCanvas3d_setPanel = function FCanvas3d_setPanel(hPanel){
   var o = this;
   hPanel.appendChild(o._hCanvas);
}
MO.FCanvas3d_dispose = function FCanvas3d_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o._cameraPosition = MO.Lang.Object.dispose(o._cameraPosition);
   o.__base.FE3dCanvas.dispose.call(o);
}
MO.FCanvasApplication = function FCanvasApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._desktop      = MO.Class.register(o, new MO.AGetter('_desktop'));
   o._dynamicInfo  = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o.construct     = MO.FCanvasApplication_construct;
   o.createChapter = MO.FCanvasApplication_createChapter;
   o.setup         = MO.FCanvasApplication_setup;
   o.processResize = MO.FCanvasApplication_processResize;
   o.processEvent  = MO.FCanvasApplication_processEvent;
   o.process       = MO.FCanvasApplication_process;
   o.dispose       = MO.FCanvasApplication_dispose;
   return o;
}
MO.FCanvasApplication_construct = function FCanvasApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
}
MO.FCanvasApplication_createChapter = function FCanvasApplication_createChapter(code){
   var o = this;
   var chapter = null;
   switch(code){
      case MO.ECanvasChapter.Simple:
         chapter = MO.Class.create(MO.FCanvasSimpleChapter);
         break;
   }
   chapter.linkGraphicContext(o);
   return chapter;
}
MO.FCanvasApplication_setup = function FCanvasApplication_setup(hPanel){
   var o = this;
   var result = o.__base.FApplication.setup.call(o, hPanel);
   if(!result){
      return result;
   }
   o._hPanel = hPanel;
   var desktop = o._desktop = MO.Class.create(MO.FCanvasDesktop);
   desktop.build(hPanel);
   var canvas = desktop.canvas3d();
   var context = canvas.graphicContext();
   if(!context.isValid()){
      return;
   }
   o.linkGraphicContext(canvas);
   var control = o._dynamicInfo = MO.Class.create(MO.FCanvasDynamicInfo);
   control.linkGraphicContext(canvas);
   control.setContext(canvas.graphicContext());
   control.location().set(10, 300);
   control.build();
   return true;
}
MO.FCanvasApplication_processResize = function FCanvasApplication_processResize(event){
   var o = this;
   o.__base.FApplication.processResize.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.resize();
   }
}
MO.FCanvasApplication_processEvent = function FCanvasApplication_processEvent(event){
   var o = this;
   o.__base.FApplication.processEvent.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.processEvent(event);
   }
}
MO.FCanvasApplication_process = function FCanvasApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   o._desktop.process();
}
MO.FCanvasApplication_dispose = function FCanvasApplication_dispose(){
   var o = this;
   o.__base.FApplication.dispose.call(o);
}
MO.FCanvasDesktop = function FCanvasDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._orientationCd         = null;
   o._visible               = MO.Class.register(o, new MO.AGetter('_visible'), true);
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o.onOperationResize      = MO.FCanvasDesktop_onOperationResize;
   o.onOperationOrientation = MO.FCanvasDesktop_onOperationOrientation;
   o.construct              = MO.FCanvasDesktop_construct;
   o.build                  = MO.FCanvasDesktop_build;
   o.resize                 = MO.FCanvasDesktop_resize;
   o.setVisible             = MO.FCanvasDesktop_setVisible;
   o.show                   = MO.FCanvasDesktop_show;
   o.hide                   = MO.FCanvasDesktop_hide;
   o.selectStage            = MO.FCanvasDesktop_selectStage;
   o.dispose                = MO.FCanvasDesktop_dispose;
   return o;
}
MO.FCanvasDesktop_onOperationResize = function FCanvasDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FCanvasDesktop_onOperationOrientation = function FCanvasDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FCanvasDesktop_construct = function FCanvasDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
}
MO.FCanvasDesktop_build = function FCanvasDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas3d = o._canvas3d = MO.Class.create(MO.FCanvas3d);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   o.canvasRegister(canvas3d);
   var canvas2d = o._canvas2d = MO.Class.create(MO.FGuiCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FCanvasDesktop_resize = function FCanvasDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var browser = MO.Window.Browser;
   var sourceWidth = (targetWidth != null) ? targetWidth : window.innerWidth;
   var sourceHeight = (targetHeight != null) ? targetHeight : window.innerHeight;
   var orientationCd = browser.orientationCd();
   if(o._screenSize.equalsData(sourceWidth, sourceHeight) && (o._orientationCd == orientationCd)){
      return;
   }
   o._screenSize.set(sourceWidth, sourceHeight);
   o._orientationCd = orientationCd;
   var pixelRatio = browser.capability().pixelRatio;
   var width = parseInt(sourceWidth * pixelRatio);
   var height = parseInt(sourceHeight * pixelRatio);
   o._size.set(width, height);
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   var isVertical = browser.isOrientationVertical()
   if(isVertical){
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }else{
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   var calculateRate = o._calculateRate;
   if(widthRate > heightRate){
      calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      calculateRate.set(1, heightRate / sizeRate);
   }else{
      calculateRate.set(1, 1);
   }
   var canvas3d = o._canvas3d;
   var context3d = canvas3d.graphicContext();
   context3d.size().set(width, height);
   if(browser.capability().canvasScale){
      canvas3d.resize(width, height);
   }else{
      canvas3d.resize(sourceWidth, sourceHeight);
   }
   context3d.setViewport(0, 0, width, height)
   if(isVertical){
      o._virtualSize.set(logicSize.height * calculateRate.width, logicSize.width * calculateRate.height);
   }else{
      o._virtualSize.set(logicSize.width * calculateRate.width, logicSize.height * calculateRate.height);
   }
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.graphicContext().setGlobalScale(sizeRate, sizeRate);
   var stage = o._canvas3d.activeStage();
   o.selectStage(stage);
}
MO.FCanvasDesktop_setVisible = function FCanvasDesktop_setVisible(visible){
   var o = this;
   o._visible = visible;
   o._canvas2d.setVisible(visible);
   o._canvas3d.setVisible(visible);
}
MO.FCanvasDesktop_show = function FCanvasDesktop_show(){
   this.setVisible(true);
}
MO.FCanvasDesktop_hide = function FCanvasDesktop_hide(){
   this.setVisible(false);
}
MO.FCanvasDesktop_selectStage = function FCanvasDesktop_selectStage(stage){
   var o = this;
   o._canvas3d.selectStage(stage);
   if(stage){
      var camera = stage.camera();
      var projection = camera.projection();
      projection.size().assign(o._size);
      projection.update();
   }
   o._activeStage = stage;
}
MO.FCanvasDesktop_dispose = function FCanvasDesktop_dispose(){
   var o = this;
   o._canvas2d = MO.Lang.Object.dispose(o._canvas2d);
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o.__base.FDesktop.dispose.call(o);
}
MO.FCanvasDynamicInfo = function FCanvasDynamicInfo(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._lastTick    = 0;
   o._name        = 'EngineInfo';
   o._stage       = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._guiManager  = MO.Class.register(o, new MO.AGetSet('_guiManager'));
   o._context     = MO.Class.register(o, new MO.AGetSet('_context'));
   o._ticker      = null;
   o.onPaintBegin = MO.FCanvasDynamicInfo_onPaintBegin;
   o.oeUpdate     = MO.FCanvasDynamicInfo_oeUpdate;
   o.construct    = MO.FCanvasDynamicInfo_construct;
   return o;
}
MO.FCanvasDynamicInfo_onPaintBegin = function FCanvasDynamicInfo_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if(o._stage == null){
      return;
   }
   if(o._context == null){
      return;
   }
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var timer = o._stage.timer();
   var stageStatistics = o._stage.statistics();
   var statistics = o._context.statistics();
   var line = 20;
   var locationX = 10;
   var locationY = rectangle.top + line;
   graphic.setFont('16px sans-serif');
   var browser = MO.Window.Browser;
   var browserCapability = browser.capability();
   graphic.drawText(MO.Lang.String.format('Agent         : {1}', browser.code), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Browser    : type={1}, orientation={2}, canvas_scale={3}', browser.typeCd(), browser.orientationCd(), browserCapability.canvasScale), locationX, locationY, '#FFFFFF');
   locationY += line;
   var desktop = o._guiManager.desktop();
   var canvas2d = desktop.canvas2d();
   var canvas3d = desktop.canvas3d();
   var pixelRatio = MO.Window.Browser.capability().pixelRatio;
   graphic.drawText(MO.Lang.String.format('Screen        : ratio={1}, screen_size={2}, size={3}', pixelRatio, desktop.screenSize().toDisplay(), desktop.size().toDisplay()), locationX, locationY, '#FFFFFF');
   locationY += line;
   var hCanvas2d = canvas2d._hCanvas;
   graphic.drawText(MO.Lang.String.format(' - Canvas2d   : size={1}x{2}, inner_size={3}x{4}', hCanvas2d.offsetWidth, hCanvas2d.offsetHeight, hCanvas2d.width, hCanvas2d.height), locationX, locationY, '#FFFFFF');
   locationY += line;
   var hCanvas3d = canvas3d._hCanvas;
   graphic.drawText(MO.Lang.String.format(' - Canvas3d   : size={1}x{2}, inner_size={3}x{4}', hCanvas3d.offsetWidth, hCanvas3d.offsetHeight, hCanvas3d.width, hCanvas3d.height), locationX, locationY, '#FFFFFF');
   locationY += line;
   var context3d = canvas3d.graphicContext();
   graphic.drawText(MO.Lang.String.format('   - Context  : {1}', context3d.size().toDisplay()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('   - Viewport : {1}', context3d.viewportRectangle()), locationX, locationY, '#FFFFFF');
   locationY += line;
   var camera = o._stage.camera();
   var projection = camera.projection();
   graphic.drawText(MO.Lang.String.format('Stage         :'), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Camera     : position={1}', camera.position()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Projection : size={1}, znear={2}, zfar={3}', projection.size(), projection.znear(), projection.zfar()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Frame         : rate={1}, span=[{2}]', MO.Timer.rate(), stageStatistics._frame), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Process    : {1}', stageStatistics._frameProcess), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Draw       : draw={1}, sort={2}', stageStatistics._frameDraw, stageStatistics._frameDrawSort), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Draw          : count={1}, triangle={2}', statistics.frameDrawCount(), statistics.frameTriangleCount()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Const      : count={1}, length={2}', statistics.frameConstCount(), statistics.frameConstLength()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Alloc      : buffer={1}, texture={2}', statistics.frameBufferCount(), statistics.frameTextureCount()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format(' - Total      : program={1}, layout={2}, vertex={3}, index={4}', statistics.programTotal(), statistics.layoutTotal(), statistics.vertexBufferTotal(), statistics.indexBufferTotal()), locationX, locationY, '#FFFFFF');
   locationY += line;
   graphic.drawText(MO.Lang.String.format('Investment    : entity={1}, table={2}, pool_item={3}, pool_free={4}', o._investmentEntityCount, o._investmentTableEntityCount, o._investmentPoolItemCount, o._investmentPoolFreeCount), locationX, locationY, '#FFFFFF');
   desktop.resize();
}
MO.FCanvasDynamicInfo_oeUpdate = function FCanvasDynamicInfo_oeUpdate(event){
   var o = this;
   if(o._ticker.process()){
      o.dirty();
   }
   return MO.EEventStatus.Stop;
}
MO.FCanvasDynamicInfo_construct = function FCanvasDynamicInfo_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._size.set(1024, 512);
   o._ticker = new MO.TTicker(1000);
}
MO.FCanvasScene = function FCanvasScene(o){
   o = MO.Class.inherits(this, o, MO.FScene);
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o.onOperationKeyDown     = MO.FCanvasScene_onOperationKeyDown;
   o.onOperationResize      = MO.FCanvasScene_onOperationResize;
   o.onOperationOrientation = MO.FCanvasScene_onOperationOrientation;
   o.onProcessAfter         = MO.FCanvasScene_onProcessAfter;
   o.construct              = MO.FCanvasScene_construct;
   o.setup                  = MO.FCanvasScene_setup;
   o.active                 = MO.FCanvasScene_active;
   o.deactive               = MO.FCanvasScene_deactive;
   o.processLoaded          = MO.FCanvasScene_processLoaded;
   o.processResize          = MO.FCanvasScene_processResize;
   o.processEvent           = MO.FCanvasScene_processEvent;
   o.dispose                = MO.FCanvasScene_dispose;
   return o;
}
MO.FCanvasScene_onOperationKeyDown = function FCanvasScene_onOperationKeyDown(event){
   var o = this;
   o.__base.FScene.onOperationKeyDown.call(o, event);
   if(event.altKey && (event.keyCode == MO.EKeyCode.P)){
      var control = o._application.dynamicInfo();
      control.setVisible(!control.visible());
   }
}
MO.FCanvasScene_onOperationResize = function FCanvasScene_onOperationResize(event){
   var o = this;
   o.__base.FScene.onOperationResize.call(o, event);
   o.processResize();
}
MO.FCanvasScene_onOperationOrientation = function FCanvasScene_onOperationOrientation(event){
   var o = this;
   o.__base.FScene.onOperationOrientation.call(o, event);
   o.processResize();
}
MO.FCanvasScene_onProcessAfter = function FCanvasScene_onProcessAfter(){
   var o = this;
   o.__base.FScene.onProcessAfter.call(o);
   o._guiManager.process();
}
MO.FCanvasScene_construct = function FCanvasScene_construct(){
   var o = this;
   o.__base.FScene.construct.call(o);
}
MO.FCanvasScene_setup = function FCanvasScene_setup(){
   var o = this;
   o.__base.FScene.setup.call(o);
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(o);
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(canvas2d);
   guiManager.setup();
   var control = o._application.dynamicInfo();
   guiManager.register(control);
}
MO.FCanvasScene_active = function FCanvasScene_active(){
   var o = this;
   o.__base.FScene.active.call(o);
   var stage = o._activeStage;
   var control = o._application.dynamicInfo();
   control.setVisible(false);
   control.setDisplayOrder(10000);
   control.setStage(stage);
   control.setGuiManager(o._guiManager);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(stage);
}
MO.FCanvasScene_deactive = function FCanvasScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(null);
}
MO.FCanvasScene_processLoaded = function FCanvasScene_processLoaded(){
   var o = this;
   var event = new MO.SEvent(o);
   MO.Window.lsnsLoaded.process(event);
   event.dispose();
   var desktop = o._application.desktop();
   desktop.show();
}
MO.FCanvasScene_processResize = function FCanvasScene_processResize(event){
   var o = this;
   o._guiManager.dirty();
}
MO.FCanvasScene_processEvent = function FCanvasScene_processEvent(event){
   var o = this;
   o.__base.FScene.processEvent.call(o, event);
   o._guiManager.processEvent(event);
}
MO.FCanvasScene_dispose = function FCanvasScene_dispose(){
   var o = this;
   o._guiManager = MO.Lang.Object.dispose(o._guiManager);
   o.__base.FScene.dispose.call(o);
}
MO.FCanvasSimpleChapter = function FCanvasSimpleChapter(o){
   o = MO.Class.inherits(this, o, MO.FChapter);
   o._code       = MO.ECanvasChapter.Simple;
   o.createScene = MO.FCanvasSimpleChapter_createScene;
   return o;
}
MO.FCanvasSimpleChapter_createScene = function FCanvasSimpleChapter_createScene(code){
   var o = this;
   var scene = null;
   switch(code){
      case MO.ECanvasScene.Simple:
         scene = o._sceneSimple = MO.Class.create(MO.FCanvasSimpleScene);
         break;
   }
   scene.linkGraphicContext(o);
   return scene;
}
MO.FCanvasSimpleScene = function FCanvasSimpleScene(o){
   o = MO.Class.inherits(this, o, MO.FCanvasScene);
   o._code = MO.ECanvasScene.Simple;
   o.setup = MO.FCanvasSimpleScene_setup;
   return o;
}
MO.FCanvasSimpleScene_setup = function FCanvasSimpleScene_setup(){
   var o = this;
   o.__base.FCanvasScene.setup.call(o);
   var stage = o._activeStage = MO.Class.create(MO.FE3dSimpleStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
}
MO.FChapter = function FChapter(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   o._code                = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application         = MO.Class.register(o, new MO.AGetSet('_application'));
   o._scenes              = MO.Class.register(o, new MO.AGetter('_scenes'));
   o._activeScene         = MO.Class.register(o, new MO.AGetter('_activeScene'));
   o._statusSetup         = false;
   o._statusActive        = false;
   o.onProcessReady       = MO.FChapter_onProcessReady;
   o.construct            = MO.FChapter_construct;
   o.createScene          = MO.Method.empty;
   o.registerScene        = MO.FChapter_registerScene;
   o.unregisterScene      = MO.FChapter_unregisterScene;
   o.selectScene          = MO.FChapter_selectScene;
   o.selectSceneByCode    = MO.FChapter_selectSceneByCode;
   o.setup                = MO.Method.empty;
   o.active               = MO.FChapter_active;
   o.deactive             = MO.FChapter_deactive;
   o.processEvent         = MO.FChapter_processEvent;
   o.process              = MO.FChapter_process;
   o.dispose              = MO.FChapter_dispose;
   return o;
}
MO.FChapter_onProcessReady = function FChapter_onProcessReady(event){
}
MO.FChapter_construct = function FChapter_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MFrameProcessor.construct.call(o);
   o._scenes = new MO.TDictionary();
}
MO.FChapter_registerScene = function FChapter_registerScene(scene){
   var o = this;
   var code = scene.code();
   scene.setApplication(o._application);
   scene.setChapter(o);
   o._scenes.set(code, scene);
}
MO.FChapter_unregisterScene = function FChapter_unregisterScene(scene){
   var code = scene.code();
   this._scenes.set(code, null);
}
MO.FChapter_selectScene = function FChapter_selectScene(scene){
   var o = this;
   if(o._activeScene != scene){
      var activeScene = o._activeScene;
      if(activeScene){
         activeScene.deactive();
         o._activeScene = null;
      }
      if(scene){
         scene.active();
         o._activeScene = scene;
      }
   }
}
MO.FChapter_selectSceneByCode = function FChapter_selectSceneByCode(code){
   var o = this;
   var scene = o._scenes.get(code);
   if(!scene){
      scene = o.createScene(code);
      o.registerScene(scene);
   }
   o.selectScene(scene);
   return scene;
}
MO.FChapter_active = function FChapter_active(){
   var o = this;
   if(!o._statusSetup){
      o.setup();
      o._statusSetup = true;
   }
   o._statusActive = true;
}
MO.FChapter_deactive = function FChapter_deactive(){
   var o = this;
   o._statusActive = false;
}
MO.FChapter_processEvent = function FChapter_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
   var scene = o._activeScene;
   if(scene){
      scene.processEvent(event);
   }
}
MO.FChapter_process = function FChapter_process(){
   var o = this;
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   if(o._statusActive){
      o.processEnterFrameListener(o._eventEnterFrame);
      var scene = o._activeScene;
      if(scene){
         if(scene.visible()){
            scene.process();
         }
      }
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
}
MO.FChapter_dispose = function FChapter_dispose(){
   var o = this;
   o._scenes = MO.Lang.Object.dispose(o._scenes);
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FEaiScene = function FEaiScene(o){
   o = MO.Class.inherits(this, o, MO.FScene);
   o._guiManager            = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o.onOperationKeyDown     = MO.FEaiScene_onOperationKeyDown;
   o.onOperationResize      = MO.FEaiScene_onOperationResize;
   o.onOperationOrientation = MO.FEaiScene_onOperationOrientation;
   o.onProcessAfter         = MO.FEaiScene_onProcessAfter;
   o.construct              = MO.FEaiScene_construct;
   o.setup                  = MO.FEaiScene_setup;
   o.active                 = MO.FEaiScene_active;
   o.deactive               = MO.FEaiScene_deactive;
   o.processLoaded          = MO.FEaiScene_processLoaded;
   o.processResize          = MO.FEaiScene_processResize;
   o.processEvent           = MO.FEaiScene_processEvent;
   o.dispose                = MO.FEaiScene_dispose;
   return o;
}
MO.FEaiScene_onOperationKeyDown = function FEaiScene_onOperationKeyDown(event){
   var o = this;
   o.__base.FScene.onOperationKeyDown.call(o, event);
   if(event.altKey && (event.keyCode == MO.EKeyCode.P)){
      var control = o._application.dynamicInfo();
      control.setVisible(!control.visible());
   }
}
MO.FEaiScene_onOperationResize = function FEaiScene_onOperationResize(event){
   var o = this;
   o.__base.FScene.onOperationResize.call(o, event);
   o.processResize();
}
MO.FEaiScene_onOperationOrientation = function FEaiScene_onOperationOrientation(event){
   var o = this;
   o.__base.FScene.onOperationOrientation.call(o, event);
   o.processResize();
}
MO.FEaiScene_onProcessAfter = function FEaiScene_onProcessAfter(){
   var o = this;
   o.__base.FScene.onProcessAfter.call(o);
   o._guiManager.process();
}
MO.FEaiScene_construct = function FEaiScene_construct(){
   var o = this;
   o.__base.FScene.construct.call(o);
}
MO.FEaiScene_setup = function FEaiScene_setup(){
   var o = this;
   o.__base.FScene.setup.call(o);
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
   desktop.hide();
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(o);
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(canvas2d);
   guiManager.setup();
   var control = o._application.dynamicInfo();
   guiManager.register(control);
}
MO.FEaiScene_active = function FEaiScene_active(){
   var o = this;
   o.__base.FScene.active.call(o);
   var stage = o._activeStage;
   var control = o._application.dynamicInfo();
   control.setVisible(false);
   control.setDisplayOrder(10000);
   control.setStage(stage);
   control.setGuiManager(o._guiManager);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(stage);
}
MO.FEaiScene_deactive = function FEaiScene_deactive(){
   var o = this;
   o.__base.FScene.deactive.call(o);
   var application = o._application;
   var desktop = application.desktop();
   desktop.selectStage(null);
}
MO.FEaiScene_processLoaded = function FEaiScene_processLoaded(){
   var o = this;
   var event = new MO.SEvent(o);
   MO.Window.lsnsLoaded.process(event);
   event.dispose();
   var desktop = o._application.desktop();
   desktop.show();
}
MO.FEaiScene_processResize = function FEaiScene_processResize(event){
   var o = this;
   o._guiManager.dirty();
}
MO.FEaiScene_processEvent = function FEaiScene_processEvent(event){
   var o = this;
   o.__base.FScene.processEvent.call(o, event);
   o._guiManager.processEvent(event);
}
MO.FEaiScene_dispose = function FEaiScene_dispose(){
   var o = this;
   o._guiManager = MO.Lang.Object.dispose(o._guiManager);
   o.__base.FScene.dispose.call(o);
}
MO.FGuiApplication = function FGuiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._canvas   = MO.Class.register(o, new MO.AGetter('_canvas'));
   o._manager  = MO.Class.register(o, new MO.AGetter('_manager'));
   o._desktop  = MO.Class.register(o, new MO.AGetter('_desktop'));
   o.construct = MO.FGuiApplication_construct;
   o.setup     = MO.FGuiApplication_setup;
   o.process   = MO.FGuiApplication_process;
   o.dispose   = MO.FGuiApplication_dispose;
   return o;
}
MO.FGuiApplication_construct = function FGuiApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
   o._chapters = new MO.TDictionary();
   o._eventEnterFrame = new MO.SEvent();
   o._eventLeaveFrame = new MO.SEvent();
}
MO.FGuiApplication_setup = function FGuiApplication_setup(hPanel){
   var o = this;
   var desktop = o._desktop = MO.Class.create(MO.FGuiDesktop);
   desktop.build(hPanel);
   var canvas = o._canvas = desktop.canvas();
   var manager = o._manager = MO.Class.create(MO.FGuiCanvasManager);
   manager.setDesktop(desktop);
   manager.setCanvas(canvas);
}
MO.FGuiApplication_process = function FGuiApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   o._manager.process();
}
MO.FGuiApplication_dispose = function FGuiApplication_dispose(){
   var o = this;
   o.__base.FApplication.dispose.call(o);
}
MO.FGuiDesktop = function FGuiDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._canvas                = MO.Class.register(o, new MO.AGetter('_canvas'));
   o.onOperationResize      = MO.FGuiDesktop_onOperationResize;
   o.onOperationOrientation = MO.FGuiDesktop_onOperationOrientation;
   o.construct              = MO.FGuiDesktop_construct;
   o.build                  = MO.FGuiDesktop_build;
   o.resize                 = MO.FGuiDesktop_resize;
   o.dispose                = MO.FGuiDesktop_dispose;
   return o;
}
MO.FGuiDesktop_onOperationResize = function FGuiDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FGuiDesktop_onOperationOrientation = function FGuiDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FGuiDesktop_construct = function FGuiDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
   o._screenSize.set(0, 0);
}
MO.FGuiDesktop_build = function FGuiDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas = o._canvas = MO.RClass.create(MO.FE2dCanvas);
   canvas.setDesktop(o);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   canvas._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas);
   MO.RE3dEngine.setup();
}
MO.FGuiDesktop_resize = function FGuiDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var width = (targetWidth != null) ? targetWidth : window.innerWidth;
   var height = (targetHeight != null) ? targetHeight : window.innerHeight;
   if(o._screenSize.equalsData(width, height)){
      return;
   }
   o._screenSize.set(width, height);
   var pixelRatio = MO.Browser.capability().pixelRatio;
   MO.Logger.info(o, 'Change screen size. (size={1}x{2}, pixel_ratio={3})', width, height, pixelRatio);
   width *= pixelRatio;
   height *= pixelRatio;
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   if(MO.Browser.isOrientationHorizontal()){
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }else{
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   o._canvas3d.resize(width, height);
   var canvas = o._canvas;
   canvas.resize(width, height);
   canvas.context().setGlobalScale(sizeRate, sizeRate);
}
MO.FGuiDesktop_dispose = function FGuiDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o._canvas = MO.Lang.Object.dispose(o._canvas);
   o.__base.FDesktop.dispose.call(o);
}
MO.FScene = function FScene(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   o._visible              = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o._code                 = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application          = MO.Class.register(o, new MO.AGetSet('_application'));
   o._chapter              = MO.Class.register(o, new MO.AGetSet('_chapter'));
   o._activeStage          = MO.Class.register(o, new MO.AGetSet('_activeStage'));
   o._statusSetup          = false;
   o._statusActive         = false;
   o.onOperationVisibility = MO.FScene_onOperationVisibility;
   o.onProcessReady        = MO.FScene_onProcessReady;
   o.onProcessBefore       = MO.Method.empty;
   o.onProcess             = MO.FScene_onProcess;
   o.onProcessAfter        = MO.Method.empty;
   o.construct             = MO.FScene_construct;
   o.setup                 = MO.Method.empty;
   o.active                = MO.FScene_active;
   o.deactive              = MO.FScene_deactive;
   o.processEvent          = MO.FScene_processEvent;
   o.process               = MO.FScene_process;
   o.dispose               = MO.FScene_dispose;
   return o;
}
MO.FScene_onOperationVisibility = function FScene_onOperationVisibility(event){
   var o = this;
   o.__base.MEventDispatcher.onOperationVisibility.call(o, event);
   o._visible = event.visibility;
}
MO.FScene_onProcessReady = function FScene_onProcessReady(event){
}
MO.FScene_onProcess = function FScene_onProcess(){
   var o = this;
   o.processEnterFrameListener(o._eventEnterFrame);
   if(o._activeStage){
      o._activeStage.process();
   }
   o.processLeaveFrameListener(o._eventLeaveFrame);
}
MO.FScene_construct = function FScene_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MFrameProcessor.construct.call(o);
}
MO.FScene_active = function FScene_active(){
   var o = this;
   if(!o._statusSetup){
      o.setup();
      o._statusSetup = true;
   }
   o._statusActive = true;
   o.processResize();
}
MO.FScene_deactive = function FScene_deactive(){
   var o = this;
   o._statusActive = false;
}
MO.FScene_process = function FScene_process(){
   var o = this;
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   if(o._statusActive){
      o.processEnterFrameListener(o._eventEnterFrame);
      o.onProcessBefore();
      o.onProcess();
      if(o._activeStage){
         o._activeStage.process();
      }
      o.onProcessAfter();
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
}
MO.FScene_processEvent = function FScene_processEvent(event){
   var o = this;
   o.dispatcherEvent(event);
}
MO.FScene_dispose = function FScene_dispose(){
   var o = this;
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FTestApplication = function FTestApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o.setup = MO.FTestApplication_setup;
   return o;
}
MO.FTestApplication_setup = function FTestApplication_setup(hPanel){
   var o = this;
   var xroot = new MO.TXmlNode('Configuration');
   var identityCode = MO.Window.Browser.agent();
   var xbrowser = xroot.create('Browser')
   MO.Window.Browser.saveConfig(xbrowser);
   var xdesktop = xbrowser.create('Desktop')
   var xcontext2d = xdesktop.create('Context2d');
   var xcontext3d = xdesktop.create('Context3d');
   var hCanvas = MO.Window.Builder.create(hPanel, 'CANVAS');
   var context3d = MO.Graphic.Context3d.createContext(MO.FWglContext, hCanvas);
   if(context3d){
      var parameter = context3d.parameter('VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('SHADING_LANGUAGE_VERSION');
      if(parameter){
         identityCode += '|' + parameter;
      }
      var parameter = context3d.parameter('UNMASKED_RENDERER_WEBGL');
      if(parameter){
         identityCode += '|' + parameter;
      }
      context3d.saveConfig(xcontext3d);
   }
   xroot.set('identity_code', identityCode);
   MO.Console.find(MO.FServiceConsole).send('cloud.info.device', 'access', xroot);
}
MO.RApplication = function RApplication(){
   var o = this;
   o._workspaces = new MO.TDictionary();
   return o;
}
MO.RApplication.prototype.initialize = function RApplication_initialize(){
   var o = this;
   MO.Window.Browser.construct();
   MO.Window.connect(window);
   MO.Window.Keyboard.construct();
}
MO.RApplication.prototype.findWorkspace = function RApplication_findWorkspace(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var workspaces = o._workspaces;
   var workspace = workspaces.get(name);
   if(workspace == null){
      workspace = MO.Class.create(clazz);
      workspaces.set(name, workspace);
   }
   return workspace;
}
MO.RApplication.prototype.release = function RApplication_release(){
   try{
      CollectGarbage();
   }catch(e){
     MO.Logger.error(e);
   }
}
MO.RApplication = new MO.RApplication();
MO.RDesktop = function RDesktop(){
   var o = this;
   o._application = null;
   o._workspaces  = new MO.TDictionary();
   o._thread      = null;
   o._interval    = 20;
   return o;
}
MO.RDesktop.prototype.onProcessEvent = function RDesktop_onProcessEvent(event){
   var o = this;
   var application = o._application;
   if(application){
      application.processEvent(event);
   }
}
MO.RDesktop.prototype.onProcess = function RDesktop_onProcess(event){
   var o = this;
   var application = o._application;
   if(application){
      application.process();
   }
}
MO.RDesktop.prototype.application = function RDesktop_application(){
   return this._application;
}
MO.RDesktop.prototype.initialize = function RDesktop_initialize(clazz){
   var o = this;
   MO.Window.Browser.construct();
   MO.Window.connect(window);
   MO.Window.Keyboard.construct();
   MO.Window.lsnsMouseDown.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseMove.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseUp.register(o, o.onProcessEvent);
   MO.Window.lsnsMouseWheel.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyDown.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyPress.register(o, o.onProcessEvent);
   MO.Window.lsnsKeyUp.register(o, o.onProcessEvent);
   MO.Window.lsnsResize.register(o, o.onProcessEvent);
   MO.Window.lsnsVisibility.register(o, o.onProcessEvent);
   MO.Window.lsnsOrientation.register(o, o.onProcessEvent);
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.process);
   MO.Console.find(MO.FThreadConsole).start(thread);
   MO.Timer.setup();
   var application = MO.Application = o._application = MO.Class.create(clazz);
   return application;
}
MO.RDesktop.prototype.findWorkspace = function RDesktop_findWorkspace(clazz){
   var o = this;
   var name = MO.Class.name(clazz);
   var workspaces = o._workspaces;
   var workspace = workspaces.get(name);
   if(workspace == null){
      workspace = MO.Class.create(clazz);
      workspaces.set(name, workspace);
   }
   return workspace;
}
MO.RDesktop.prototype.process = function RDesktop_process(){
   var o = this;
   o.onProcess();
   MO.Timer.update();
}
MO.RDesktop.prototype.release = function RDesktop_release(){
   try{
      CollectGarbage();
   }catch(e){
     MO.Logger.error(e);
   }
}
MO.Desktop = new MO.RDesktop();
