with(MO){
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      o._thread      = null;
      o._interval    = 10;
      o.construct    = FEaiApplication_construct;
      o.createCanvas = FEaiApplication_createCanvas;
      o.dispose      = FEaiApplication_dispose;
      return o;
   }
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.process);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FEaiApplication_createCanvas = function FEaiApplication_createCanvas(){
      return RClass.create(FEaiCanvas);
   }
   MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
      var o = this;
      o.__base.FApplication.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCanvas = function FEaiCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._scaleRate          = 1;
      o._optionAlpha        = true;
      o._activeStage        = RClass.register(o, new AGetter('_activeStage'));
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onResize            = FEaiCanvas_onResize;
      o.construct           = FEaiCanvas_construct;
      o.build               = FEaiCanvas_build;
      o.setPanel            = FEaiCanvas_setPanel;
      o.selectStage         = FEaiCanvas_selectStage;
      o.dispose             = FEaiCanvas_dispose;
      return o;
   }
   MO.FEaiCanvas_onResize = function FEaiCanvas_onResize(){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var context = o._graphicContext;
      var size = context.size();
      var stage = o._activeStage;
      if(stage){
         var projection = stage.camera().projection();
         projection.size().set(size.width, size.height);
         projection.update();
      }
   }
   MO.FEaiCanvas_construct = function FEaiCanvas_construct(){
      var o = this;
      o.__base.FE3dCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
   }
   MO.FEaiCanvas_build = function FEaiCanvas_build(hPanel){
      var o = this;
      o.__base.FE3dCanvas.build.call(o, hPanel);
   }
   MO.FEaiCanvas_setPanel = function FEaiCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FE3dCanvas.setPanel.call(o, hPanel);
   }
   MO.FEaiCanvas_selectStage = function FEaiCanvas_selectStage(stage){
      var o = this;
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
      o._activeStage = stage;
   }
   MO.FEaiCanvas_dispose = function FEaiCanvas_dispose(){
      var o = this;
      o._rotation = RObject.dispose(o._rotation);
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FEaiChartApplication = function FEaiChartApplication(o){
      o = RClass.inherits(this, o, FEaiApplication);
      o._sceneCode      = RClass.register(o, new AGetSet('_sceneCode'), MO.EEaiScene.ChartHistory);
      o._chapterLoading = RClass.register(o, new AGetter('_chapterLoading'));
      o._chapterChart   = RClass.register(o, new AGetter('_chapterChart'));
      o._thread         = null;
      o._interval       = 10;
      o.onLoadResource  = FEaiChartApplication_onLoadResource;
      o.construct       = FEaiChartApplication_construct;
      o.createCanvas    = FEaiChartApplication_createCanvas;
      o.setup           = FEaiChartApplication_setup;
      o.dispose         = FEaiChartApplication_dispose;
      return o;
   }
   MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(){
      var o = this;
      var chapter = o.selectChapterByCode(MO.EEaiChapter.Chart);
      var scene = chapter.selectSceneByCode(o._sceneCode);
   }
   MO.FEaiChartApplication_construct = function FEaiChartApplication_construct(){
      var o = this;
      o.__base.FEaiApplication.construct.call(o);
   }
   MO.FEaiChartApplication_createCanvas = function FEaiChartApplication_createCanvas(){
      return RClass.create(FEaiChartCanvas);
   }
   MO.FEaiChartApplication_setup = function FEaiChartApplication_setup(){
      var o = this;
      var chapter = o._chapterLoading = MO.RClass.create(MO.FEaiLoadingChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
      chapter.linkGraphicContext(o);
      o.registerChapter(chapter);
      var resourceConsole = MO.RConsole.find(MO.FEaiResourceConsole);
      resourceConsole.addLoadListener(o, o.onLoadResource);
      resourceConsole.load();
   }
   MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
      var o = this;
      o._chapterLoading = RObject.dispose(o._chapterLoading);
      o._chapterChart = RObject.dispose(o._chapterChart);
      o.__base.FEaiApplication.dispose.call(o);
   }
}
with(MO){
   MO.FEaiChartCanvas = function FEaiChartCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
      o._capturePosition    = null;
      o._cameraPosition     = null;
      o.onEnterFrame        = FEaiChartCanvas_onEnterFrame;
      o.onMouseCaptureStart = FEaiChartCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiChartCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiChartCanvas_onMouseCaptureStop;
      o.construct           = FEaiChartCanvas_construct;
      o.dispose             = FEaiChartCanvas_dispose;
      return o;
   }
   MO.FEaiChartCanvas_onEnterFrame = function FEaiChartCanvas_onEnterFrame(){
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
   MO.FEaiChartCanvas_onMouseCaptureStart = function FEaiChartCanvas_onMouseCaptureStart(event){
      var o = this;
      var stage = o._activeStage;
      if(!stage){
         return;
      }
      o._capturePosition.set(event.clientX, event.clientY);
      o._cameraPosition.assign(stage.camera().position());
   }
   MO.FEaiChartCanvas_onMouseCapture = function FEaiChartCanvas_onMouseCapture(event){
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
   MO.FEaiChartCanvas_onMouseCaptureStop = function FEaiChartCanvas_onMouseCaptureStop(p){
   }
   MO.FEaiChartCanvas_construct = function FEaiChartCanvas_construct(){
      var o = this;
      o.__base.FEaiCanvas.construct.call(o);
      o._cameraPosition = new SPoint3();
   }
   MO.FEaiChartCanvas_dispose = function FEaiChartCanvas_dispose(){
      var o = this;
      o._cameraPosition = RObject.dispose(o._cameraPosition);
      o.__base.FEaiCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FEaiPlatformApplication = function FEaiPlatformApplication(o){
      o = RClass.inherits(this, o, FEaiApplication);
      o._chapterLoading = RClass.register(o, new AGetter('_chapterLoading'));
      o._chapterLogin   = RClass.register(o, new AGetter('_chapterLogin'));
      o._chapterScene   = RClass.register(o, new AGetter('_chapterScene'));
      o._chapterChart   = RClass.register(o, new AGetter('_chapterChart'));
      o._thread         = null;
      o._interval       = 10;
      o.onLoadResource  = FEaiPlatformApplication_onLoadResource;
      o.construct       = FEaiPlatformApplication_construct;
      o.createCanvas    = FEaiPlatformApplication_createCanvas;
      o.setup           = FEaiPlatformApplication_setup;
      o.dispose         = FEaiPlatformApplication_dispose;
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
}
with(MO){
   MO.FEaiPlatformCanvas = function FEaiPlatformCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FEaiPlatformCanvas_onEnterFrame;
      o.onMouseCaptureStart = FEaiPlatformCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiPlatformCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiPlatformCanvas_onMouseCaptureStop;
      o.construct           = FEaiPlatformCanvas_construct;
      o.dispose             = FEaiPlatformCanvas_dispose;
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
}
