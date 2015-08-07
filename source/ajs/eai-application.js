MO.FEaiApplication = function FEaiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   o._desktop      = MO.Class.register(o, new MO.AGetter('_desktop'));
   o.setup         = MO.FEaiApplication_setup;
   o.processResize = MO.FEaiApplication_processResize;
   o.processEvent  = MO.FEaiApplication_processEvent;
   return o;
}
MO.FEaiApplication_setup = function FEaiApplication_setup(hPanel){
   var o = this;
   if(!MO.Window.Browser.supportHtml5()){
      var event = new MO.SEvent();
      MO.Window.processDeviceError(event);
      event.dispose();
      return false;
   }
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('general.color.eai.world.face', MO.FEaiWorldFaceEffect);
   effectConsole.register('general.color.eai.map.face', MO.FEaiMapFaceEffect);
   effectConsole.register('general.color.eai.citys', MO.FEaiCityEffect);
   effectConsole.register('general.color.eai.citys.range', MO.FEaiCityRangeEffect);
   return true;
}
MO.FEaiApplication_processResize = function FEaiApplication_processResize(){
   var o = this;
   o.__base.FApplication.processResize.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.resize();
   }
}
MO.FEaiApplication_processEvent = function FEaiApplication_processEvent(event){
   var o = this;
   o.__base.FApplication.processEvent.call(o, event);
   var desktop = o._desktop;
   if(desktop){
      desktop.processEvent(event);
   }
}
MO.FEaiCanvas = function FEaiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   o._scaleRate       = 1;
   o._optionAlpha     = false;
   o._optionAntialias = false;
   o._activeStage     = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._capturePosition = null;
   o._captureRotation = null;
   o.construct        = MO.FEaiCanvas_construct;
   o.resize           = MO.FEaiCanvas_resize;
   o.selectStage      = MO.FEaiCanvas_selectStage;
   o.dispose          = MO.FEaiCanvas_dispose;
   return o;
}
MO.FEaiCanvas_construct = function FEaiCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
}
MO.FEaiCanvas_resize = function FEaiCanvas_resize(width, height){
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
MO.FEaiCanvas_selectStage = function FEaiCanvas_selectStage(stage){
   var o = this;
   if(stage){
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, MO.FE3dGeneralTechnique);
   }
   o._activeStage = stage;
}
MO.FEaiCanvas_dispose = function FEaiCanvas_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o.__base.FE3dCanvas.dispose.call(o);
}
MO.FEaiChartApplication = function FEaiChartApplication(o){
   o = MO.Class.inherits(this, o, MO.FEaiApplication);
   o._sceneCode      = MO.Class.register(o, new MO.AGetSet('_sceneCode'), MO.EEaiScene.ChartHistory);
   o._chapterLoading = MO.Class.register(o, new MO.AGetter('_chapterLoading'));
   o._chapterChart   = MO.Class.register(o, new MO.AGetter('_chapterChart'));
   o._dynamicInfo    = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o.onLoadResource  = MO.FEaiChartApplication_onLoadResource;
   o.construct       = MO.FEaiChartApplication_construct;
   o.setup           = MO.FEaiChartApplication_setup;
   o.dispose         = MO.FEaiChartApplication_dispose;
   return o;
}
MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(){
   var o = this;
   var chapter = o.selectChapterByCode(MO.EEaiChapter.Chart);
   chapter.selectSceneByCode(o._sceneCode);
   o.processResize();
}
MO.FEaiChartApplication_construct = function FEaiChartApplication_construct(){
   var o = this;
   o.__base.FEaiApplication.construct.call(o);
}
MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(hPanel){
   var o = this;
   var result = o.__base.FEaiApplication.setup.call(o, hPanel);
   if(!result){
      return result;
   }
   o._hPanel = hPanel;
   var desktop = o._desktop = MO.Class.create(MO.FEaiChartDesktop);
   desktop.build(hPanel);
   var canvas = MO.Eai.Canvas = desktop.canvas3d();
   var context = canvas.graphicContext();
   if(!context.isValid()){
      return;
   }
   o.linkGraphicContext(canvas);
   var control = o._dynamicInfo = MO.Class.create(MO.FEaiDynamicInfo);
   control.linkGraphicContext(canvas);
   control.setContext(canvas.graphicContext());
   control.location().set(10, 300);
   control.build();
   var chapter = o._chapterChart = MO.Class.create(MO.FEaiChartChapter);
   chapter.linkGraphicContext(o);
   o.registerChapter(chapter);
   var system = MO.Console.find(MO.FEaiLogicConsole).system();
   system.doDeviceAccess();
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   resourceConsole.addLoadListener(o, o.onLoadResource);
   resourceConsole.load('{eai.resource}/resource.dat');
   return true;
}
MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
   var o = this;
   o._chapterLoading = MO.Lang.Object.dispose(o._chapterLoading);
   o._chapterChart = MO.Lang.Object.dispose(o._chapterChart);
   o._dynamicInfo = MO.Lang.Object.dispose(o._dynamicInfo);
   o.__base.FEaiApplication.dispose.call(o);
}
MO.FEaiChartCanvas = function FEaiChartCanvas(o){
   o = MO.Class.inherits(this, o, MO.FEaiCanvas);
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._capturePosition    = null;
   o._cameraPosition     = null;
   o.construct           = MO.FEaiChartCanvas_construct;
   o.setPanel            = MO.FEaiChartCanvas_setPanel;
   o.dispose             = MO.FEaiChartCanvas_dispose;
   return o;
}
MO.FEaiChartCanvas_construct = function FEaiChartCanvas_construct(){
   var o = this;
   o.__base.FEaiCanvas.construct.call(o);
   o._logicSize.set(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}
MO.FEaiChartCanvas_setPanel = function FEaiChartCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
}
MO.FEaiChartCanvas_dispose = function FEaiChartCanvas_dispose(){
   var o = this;
   o._cameraPosition = MO.Lang.Object.dispose(o._cameraPosition);
   o.__base.FEaiCanvas.dispose.call(o);
}
MO.FEaiChartDesktop = function FEaiChartDesktop(o){
   o = MO.Class.inherits(this, o, MO.FEaiDesktop);
   o._orientationCd         = null;
   o._visible               = MO.Class.register(o, new MO.AGetter('_visible'), true);
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o.onOperationResize      = MO.FEaiChartDesktop_onOperationResize;
   o.onOperationOrientation = MO.FEaiChartDesktop_onOperationOrientation;
   o.construct              = MO.FEaiChartDesktop_construct;
   o.build                  = MO.FEaiChartDesktop_build;
   o.resize                 = MO.FEaiChartDesktop_resize;
   o.show                   = MO.FEaiChartDesktop_show;
   o.hide                   = MO.FEaiChartDesktop_hide;
   o.setVisible             = MO.FEaiChartDesktop_setVisible;
   o.selectStage            = MO.FEaiChartDesktop_selectStage;
   o.dispose                = MO.FEaiChartDesktop_dispose;
   return o;
}
MO.FEaiChartDesktop_onOperationResize = function FEaiChartDesktop_onOperationResize(event){
   var o = this;
   o.__base.FEaiDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FEaiChartDesktop_onOperationOrientation = function FEaiChartDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FEaiDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FEaiChartDesktop_construct = function FEaiChartDesktop_construct(){
   var o = this;
   o.__base.FEaiDesktop.construct.call(o);
}
MO.FEaiChartDesktop_build = function FEaiChartDesktop_build(hPanel){
   var o = this;
   o.__base.FEaiDesktop.build.call(o, hPanel);
   var canvas3d = o._canvas3d = MO.RClass.create(MO.FEaiChartCanvas);
   canvas3d.setDesktop(o);
   canvas3d.build(hPanel);
   canvas3d.setPanel(hPanel);
   o.canvasRegister(canvas3d);
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FUiCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FEaiChartDesktop_resize = function FEaiChartDesktop_resize(targetWidth, targetHeight){
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
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   var canvas3d = o._canvas3d;
   if(browser.capability().canvasScale){
      canvas3d.resize(width, height);
   }else{
      canvas3d.resize(sourceWidth, sourceHeight);
   }
   var context3d = canvas3d.graphicContext();
   context3d.setViewport(0, 0, width, height)
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.graphicContext().setGlobalScale(sizeRate, sizeRate);
   var stage = o._canvas3d.activeStage();
   o.selectStage(stage);
}
MO.FEaiChartDesktop_show = function FEaiChartDesktop_show(){
   this.setVisible(true);
}
MO.FEaiChartDesktop_hide = function FEaiChartDesktop_hide(){
   this.setVisible(false);
}
MO.FEaiChartDesktop_setVisible = function FEaiChartDesktop_setVisible(visible){
   var o = this;
   o._visible = visible;
   o._canvas2d.setVisible(visible);
   o._canvas3d.setVisible(visible);
}
MO.FEaiChartDesktop_selectStage = function FEaiChartDesktop_selectStage(stage){
   var o = this;
   o._canvas3d.selectStage(stage);
   if(stage){
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
      projection.size().assign(o._size);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   o._activeStage = stage;
}
MO.FEaiChartDesktop_dispose = function FEaiChartDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.Lang.Object.dispose(o._canvas3d);
   o._canvas2d = MO.Lang.Object.dispose(o._canvas2d);
   o.__base.FEaiDesktop.dispose.call(o);
}
MO.FEaiDesktop = function FEaiDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o.construct = MO.FEaiDesktop_construct;
   o.dispose   = MO.FEaiDesktop_dispose;
   return o;
}
MO.FEaiDesktop_construct = function FEaiDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
   o._size.set(1920, 1080);
   o._logicSize.set(1920, 1080);
}
MO.FEaiDesktop_dispose = function FEaiDesktop_dispose(){
   var o = this;
   o.__base.FDesktop.dispose.call(o);
}
MO.FEaiFlatCanvas = function FEaiFlatCanvas(o){
   o = MO.Class.inherits(this, o, MO.FEaiCanvas);
   o._capturePosition    = null;
   o._cameraPosition     = null;
   o.onEnterFrame        = MO.FEaiFlatCanvas_onEnterFrame;
   o.onMouseCaptureStart = MO.FEaiFlatCanvas_onMouseCaptureStart;
   o.onMouseCapture      = MO.FEaiFlatCanvas_onMouseCapture;
   o.onMouseCaptureStop  = MO.FEaiFlatCanvas_onMouseCaptureStop;
   o.construct           = MO.FEaiFlatCanvas_construct;
   o.setPanel            = MO.FEaiFlatCanvas_setPanel;
   o.dispose             = MO.FEaiFlatCanvas_dispose;
   return o;
}
MO.FEaiFlatCanvas_onEnterFrame = function FEaiFlatCanvas_onEnterFrame(){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   var camera = stage.camera();
   var distance = 0.5;
   var r = 0.05;
   var keyW = RKeyboard.isPress(EKeyCode.W);
   var keyS = RKeyboard.isPress(EKeyCode.S);
   if(keyW && !keyS){
      camera.doMoveY(distance);
   }
   if(!keyW && keyS){
      camera.doMoveY(-distance);
   }
   var keyA = RKeyboard.isPress(EKeyCode.A);
   var keyD = RKeyboard.isPress(EKeyCode.D);
   if(keyA && !keyD){
      camera.doMoveX(-distance);
   }
   if(!keyA && keyD){
      camera.doMoveX(distance);
   }
   camera.update();
}
MO.FEaiFlatCanvas_onMouseCaptureStart = function FEaiFlatCanvas_onMouseCaptureStart(event){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._cameraPosition.assign(stage.camera().position());
}
MO.FEaiFlatCanvas_onMouseCapture = function FEaiFlatCanvas_onMouseCapture(event){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var camera = stage.camera();
   var position = camera.position();
   position.x = o._cameraPosition.x - cx * 0.03;
   position.y = o._cameraPosition.y + cy * 0.03;
}
MO.FEaiFlatCanvas_onMouseCaptureStop = function FEaiFlatCanvas_onMouseCaptureStop(p){
}
MO.FEaiFlatCanvas_construct = function FEaiFlatCanvas_construct(){
   var o = this;
   o.__base.FEaiCanvas.construct.call(o);
   o._logicSize = new SSize2(1920, 1080);
   o._cameraPosition = new SPoint3();
}
MO.FEaiFlatCanvas_setPanel = function FEaiFlatCanvas_setPanel(hPanel){
   var o = this;
   o.__base.FEaiCanvas.setPanel.call(o, hPanel);
}
MO.FEaiFlatCanvas_dispose = function FEaiFlatCanvas_dispose(){
   var o = this;
   o._cameraPosition = RObject.dispose(o._cameraPosition);
   o.__base.FEaiCanvas.dispose.call(o);
}
MO.FEaiPlatformApplication = function FEaiPlatformApplication(o){
   o = MO.Class.inherits(this, o, MO.FEaiApplication);
   o._chapterLoading = MO.Class.register(o, new MO.AGetter('_chapterLoading'));
   o._chapterLogin   = MO.Class.register(o, new MO.AGetter('_chapterLogin'));
   o._chapterScene   = MO.Class.register(o, new MO.AGetter('_chapterScene'));
   o._chapterChart   = MO.Class.register(o, new MO.AGetter('_chapterChart'));
   o._thread         = null;
   o._interval       = 10;
   o.onLoadResource  = MO.FEaiPlatformApplication_onLoadResource;
   o.construct       = MO.FEaiPlatformApplication_construct;
   o.createCanvas    = MO.FEaiPlatformApplication_createCanvas;
   o.setup           = MO.FEaiPlatformApplication_setup;
   o.dispose         = MO.FEaiPlatformApplication_dispose;
   return o;
}
MO.FEaiPlatformApplication_onLoadResource = function FEaiPlatformApplication_onLoadResource(){
   var o = this;
   var chapter = o.selectChapterByCode(MO.EEaiChapter.Scene);
   var scene = chapter.selectSceneByCode(MO.EEaiScene.Country);
}
MO.FEaiPlatformApplication_construct = function FEaiPlatformApplication_construct(){
   var o = this;
   o.__base.FEaiApplication.construct.call(o);
}
MO.FEaiPlatformApplication_createCanvas = function FEaiPlatformApplication_createCanvas(){
   return RClass.create(FEaiPlatformCanvas);
}
MO.FEaiPlatformApplication_setup = function FEaiPlatformApplication_setup(){
   var o = this;
   var chapter = o._chapterLoading = MO.RClass.create(MO.FEaiLoadingChapter);
   chapter.linkGraphicContext(o);
   o.registerChapter(chapter);
   var chapter = o._chapterLogin = MO.RClass.create(MO.FEaiLoginChapter);
   chapter.linkGraphicContext(o);
   o.registerChapter(chapter);
   var chapter = o._chapterScene = MO.RClass.create(MO.FEaiSceneChapter);
   chapter.linkGraphicContext(o);
   o.registerChapter(chapter);
   var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
   chapter.linkGraphicContext(o);
   o.registerChapter(chapter);
   var resourceConsole = MO.RConsole.find(MO.FEaiResourceConsole);
   resourceConsole.addLoadListener(o, o.onLoadResource);
   resourceConsole.load();
}
MO.FEaiPlatformApplication_dispose = function FEaiPlatformApplication_dispose(){
   var o = this;
   o.__base.FEaiApplication.dispose.call(o);
}
MO.FEaiPlatformCanvas = function FEaiPlatformCanvas(o){
   o = MO.Class.inherits(this, o, MO.FEaiCanvas);
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = MO.FEaiPlatformCanvas_onEnterFrame;
   o.onMouseCaptureStart = MO.FEaiPlatformCanvas_onMouseCaptureStart;
   o.onMouseCapture      = MO.FEaiPlatformCanvas_onMouseCapture;
   o.onMouseCaptureStop  = MO.FEaiPlatformCanvas_onMouseCaptureStop;
   o.construct           = MO.FEaiPlatformCanvas_construct;
   o.dispose             = MO.FEaiPlatformCanvas_dispose;
   return o;
}
MO.FEaiPlatformCanvas_onEnterFrame = function FEaiPlatformCanvas_onEnterFrame(){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   var c = stage.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = stage.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
MO.FEaiPlatformCanvas_onMouseCaptureStart = function FEaiPlatformCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var r = o._activeStage.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
}
MO.FEaiPlatformCanvas_onMouseCapture = function FEaiPlatformCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeStage.camera();
   var r = c.rotation();
   var cr = o._captureRotation;
   r.x = cr.x + cy * 0.003;
   r.y = cr.y + cx * 0.003;
}
MO.FEaiPlatformCanvas_onMouseCaptureStop = function FEaiPlatformCanvas_onMouseCaptureStop(p){
}
MO.FEaiPlatformCanvas_construct = function FEaiPlatformCanvas_construct(){
   var o = this;
   o.__base.FEaiCanvas.construct.call(o);
}
MO.FEaiPlatformCanvas_dispose = function FEaiPlatformCanvas_dispose(){
   var o = this;
   o.__base.FEaiCanvas.dispose.call(o);
}
