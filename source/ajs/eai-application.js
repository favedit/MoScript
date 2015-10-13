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
   effectConsole.register('select.select.eai.world.face', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.eai.map.face', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('eai.select.automatic', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('eai.select.control', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('eai.select.eai.world.face', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('eai.select.eai.map.face', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('general.color.eai.world.face', MO.FEaiWorldFaceEffect);
   effectConsole.register('general.color.eai.map.face', MO.FEaiMapFaceEffect);
   effectConsole.register('general.color.eai.citys', MO.FEaiCityEffect);
   effectConsole.register('general.color.eai.citys.range', MO.FEaiCityRangeEffect);
   effectConsole.register('general.color.eai.earth.flat', MO.FEaiEarthFlatEffect);
   effectConsole.register('general.view.automatic', MO.FE3dSphereViewAutomaticEffect);
   effectConsole.register('general.view.result.automatic', MO.FE3dSphereViewResultEffect);
   return true;
}
MO.FEaiApplication_processResize = function FEaiApplication_processResize(event){
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
MO.FEaiChartApplication = function FEaiChartApplication(o){
   o = MO.Class.inherits(this, o, MO.FEaiApplication);
   o._sceneCode      = MO.Class.register(o, new MO.AGetSet('_sceneCode'), MO.EEaiScene.ChartCustomer);
   o._backgroundUrl  = MO.Class.register(o, new MO.AGetSet('_backgroundUrl'), '{eai.resource}/background2.jpg');
   o._chapterChart   = MO.Class.register(o, new MO.AGetter('_chapterChart'));
   o._dynamicInfo    = MO.Class.register(o, new MO.AGetter('_dynamicInfo'));
   o.onLoadGround    = MO.FEaiChartApplication_onLoadGround;
   o.onLoadResource  = MO.FEaiChartApplication_onLoadResource;
   o.construct       = MO.FEaiChartApplication_construct;
   o.createChapter   = MO.FEaiChartApplication_createChapter;
   o.setup           = MO.FEaiChartApplication_setup;
   o.dispose         = MO.FEaiChartApplication_dispose;
   return o;
}
MO.FEaiChartApplication_onLoadGround = function FEaiChartApplication_onLoadGround(event){
   var o = this;
   var chapter = o.selectChapterByCode(MO.EEaiChapter.Chart);
   chapter.selectSceneByCode(o._sceneCode);
   o.processResize();
}
MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(event){
   var o = this;
   var canvas = o._desktop.canvas3d();
   if(o._backgroundUrl){
      var bitmap = o._groundBitmap = canvas.graphicContext().createObject(MO.FE3dBitmap);
      bitmap._optionSelect = false;
      bitmap.loadUrl(o._backgroundUrl);
      bitmap.material().info().effectCode = 'fill';
      bitmap._renderable.addImageLoadListener(o, o.onLoadGround);
   }else{
      o.onLoadGround(event);
   }
}
MO.FEaiChartApplication_construct = function FEaiChartApplication_construct(){
   var o = this;
   o.__base.FEaiApplication.construct.call(o);
}
MO.FEaiChartApplication_createChapter = function FEaiChartApplication_createChapter(code){
   var o = this;
   var chapter = null;
   switch(code){
      case MO.EEaiChapter.Chart:
         chapter = o._chapterChart = MO.Class.create(MO.FEaiChartChapter);
         break;
   }
   chapter.linkGraphicContext(o);
   return chapter;
}
MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(hPanel){
   var o = this;
   var result = o.__base.FEaiApplication.setup.call(o, hPanel);
   if(!result){
      return result;
   }
   o._hPanel = hPanel;
   var desktop = o._desktop = MO.Class.create(MO.FCanvasDesktop);
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
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   resourceConsole.addLoadListener(o, o.onLoadResource);
   resourceConsole.load('{eai.resource}/resource.dat');
   return true;
}
MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
   var o = this;
   o._dynamicInfo = MO.Lang.Object.dispose(o._dynamicInfo);
   o.__base.FEaiApplication.dispose.call(o);
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
   o._cameraPosition = MO.Lang.Object.dispose(o._cameraPosition);
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
