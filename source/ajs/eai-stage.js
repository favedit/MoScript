with(MO){
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      o._thread   = null;
      o._interval = 10;
      o.construct = FEaiApplication_construct;
      o.dispose   = FEaiApplication_dispose;
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
   MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
      var o = this;
      o.__base.FApplication.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCanvas = function FEaiCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._scaleRate          = 1;
      o._optionAlpha        = false;
      o._activeStage        = RClass.register(o, new AGetter('_activeStage'));
      o._capturePosition    = null;
      o._captureRotation    = null;
      o.onEnterFrame        = FEaiCanvas_onEnterFrame;
      o.onMouseCaptureStart = FEaiCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiCanvas_onMouseCaptureStop;
      o.onResize            = FEaiCanvas_onResize;
      o.construct           = FEaiCanvas_construct;
      o.build               = FEaiCanvas_build;
      o.setPanel            = FEaiCanvas_setPanel;
      o.selectStage         = FEaiCanvas_selectStage;
      o.dispose             = FEaiCanvas_dispose;
      return o;
   }
   MO.FEaiCanvas_onEnterFrame = function FEaiCanvas_onEnterFrame(){
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
   MO.FEaiCanvas_onMouseCaptureStart = function FEaiCanvas_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeStage;
      if(!s){
         return;
      }
      debugger
      var r = o._activeStage.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
   }
   MO.FEaiCanvas_onMouseCapture = function FEaiCanvas_onMouseCapture(p){
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
   MO.FEaiCanvas_onMouseCaptureStop = function FEaiCanvas_onMouseCaptureStop(p){
   }
   MO.FEaiCanvas_onResize = function FEaiCanvas_onResize(){
      var o = this;
      o.__base.FE3dCanvas.onResize.call(o, event);
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeStage;
      if(s){
         debugger
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
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
   MO.FEaiChapter = function FEaiChapter(o){
      o = RClass.inherits(this, o, FChapter);
      return o;
   }
}
with(MO){
   MO.FEaiChartApplication = function FEaiChartApplication(o){
      o = RClass.inherits(this, o, FEaiApplication);
      o._chapterLoading = RClass.register(o, new AGetter('_chapterLoading'));
      o._chapterChart   = RClass.register(o, new AGetter('_chapterChart'));
      o._thread         = null;
      o._interval       = 10;
      o.onLoadResource  = FEaiChartApplication_onLoadResource;
      o.construct       = FEaiChartApplication_construct;
      o.setup           = FEaiChartApplication_setup;
      o.dispose         = FEaiChartApplication_dispose;
      return o;
   }
   MO.FEaiChartApplication_onLoadResource = function FEaiChartApplication_onLoadResource(){
      var o = this;
      var chapter = MO.Eai.Application.selectChapterByCode(MO.EEaiChapter.Chart);
      var scene = chapter.selectSceneByCode(MO.EEaiScene.ChartHistory);
   }
   MO.FEaiChartApplication_construct = function FEaiChartApplication_construct(){
      var o = this;
      o.__base.FEaiApplication.construct.call(o);
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
      resourceConsole.addLoadListener(null, o.onLoadResource);
      resourceConsole.load();
   }
   MO.FEaiChartApplication_dispose = function FEaiChartApplication_dispose(){
      var o = this;
      o._chapterLoading = RObject.dispose(o._chapterLoading);
      o._chapterChart = RObject.dispose(o._chapterChart);
      o.__base.FEaiApplication.dispose.call(o);
   }
}
MO.FEaiChartChapter = function FEaiChartChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code             = MO.EEaiChapter.Chart;
   o._sceneHistory     = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneIndustry    = MO.Class.register(o, new MO.AGetter('_sceneIndustry'));
   o._sceneInvestment  = MO.Class.register(o, new MO.AGetter('_sceneInvestment'));
   o._sceneCustomer    = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o.construct         = MO.FEaiChartChapter_construct;
   o.setup             = MO.FEaiChartChapter_setup;
   o.process           = MO.FEaiChartChapter_process;
   o.dispose           = MO.FEaiChartChapter_dispose;
   return o;
}
MO.FEaiChartChapter_construct = function FEaiChartChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiChartChapter_setup = function FEaiChartChapter_setup(){
   var o = this;
   var scene = o._sceneHistory = MO.RClass.create(MO.FEaiChartHistoryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneIndustry = MO.RClass.create(MO.FEaiChartIndustryScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneInvestment = MO.RClass.create(MO.FEaiChartInvestmentScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
   var scene = o._sceneCustomer = MO.RClass.create(MO.FEaiChartCustomerScene);
   scene.linkGraphicContext(o);
   o.registerScene(scene);
}
MO.FEaiChartChapter_process = function FEaiChartChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}
MO.FEaiChartChapter_dispose = function FEaiChartChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
MO.FEaiLoadingChapter = function FEaiLoadingChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code = MO.EEaiChapter.Loading;
   return o;
}
MO.FEaiLoginChapter = function FEaiLoginChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code = MO.EEaiChapter.Login;
   return o;
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
      o.construct       = FEaiPlatformApplication_construct;
      o.setup           = FEaiPlatformApplication_setup;
      o.selectChapter   = FEaiPlatformApplication_selectChapter;
      o.dispose         = FEaiPlatformApplication_dispose;
      return o;
   }
   MO.FEaiPlatformApplication_construct = function FEaiPlatformApplication_construct(){
      var o = this;
      o.__base.FEaiApplication.construct.call(o);
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.process);
      RConsole.find(FThreadConsole).start(thread);
   }
   MO.FEaiPlatformApplication_setup = function FEaiPlatformApplication_setup(){
      var o = this;
      var chapter = o._chapterLoading = MO.RClass.create(MO.FEaiLoadingChapter);
      chapter.linkGraphicContext(o);
      chapter.setup();
      o.registerChapter(chapter);
      var chapter = o._chapterLogin = MO.RClass.create(MO.FEaiLoginChapter);
      chapter.linkGraphicContext(o);
      chapter.setup();
      o.registerChapter(chapter);
      var chapter = o._chapterScene = MO.RClass.create(MO.FEaiSceneChapter);
      chapter.linkGraphicContext(o);
      chapter.setup();
      o.registerChapter(chapter);
      var chapter = o._chapterChart = MO.RClass.create(MO.FEaiChartChapter);
      chapter.linkGraphicContext(o);
      chapter.setup();
      o.registerChapter(chapter);
   }
   MO.FEaiPlatformApplication_selectChapter = function FEaiPlatformApplication_selectChapter(code){
      var o = this;
      o.__base.FEaiApplication.selectChapter.call(o, code);
   }
   MO.FEaiPlatformApplication_dispose = function FEaiPlatformApplication_dispose(){
      var o = this;
      o.__base.FEaiApplication.dispose.call(o);
   }
}
MO.FEaiSceneChapter = function FEaiSceneChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   o._code             = MO.EEaiChapter.Scene;
   o._sceneCountry     = null;
   o._sceneGroup       = null;
   o._sceneGroupReport = null;
   o._sceneCompany     = null;
   o.construct         = MO.FEaiSceneChapter_construct;
   o.setup             = MO.FEaiSceneChapter_setup;
   o.process           = MO.FEaiSceneChapter_process;
   o.dispose           = MO.FEaiSceneChapter_dispose;
   return o;
}
MO.FEaiSceneChapter_construct = function FEaiSceneChapter_construct(){
   var o = this;
   o.__base.FEaiChapter.construct.call(o);
}
MO.FEaiSceneChapter_setup = function FEaiSceneChapter_setup(){
   var o = this;
   var scene = o._sceneCountry = MO.RClass.create(MO.FEaiCountryScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneGroup = MO.RClass.create(MO.FEaiGroupScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneGroupReport = MO.RClass.create(MO.FEaiGroupReportScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneCompany = MO.RClass.create(MO.FEaiCompanyScene);
   scene.linkGraphicContext(o);
   scene.setup();
   o.registerScene(scene);
}
MO.FEaiSceneChapter_process = function FEaiSceneChapter_process(){
   var o = this;
   o.__base.FEaiChapter.process.call(o);
}
MO.FEaiSceneChapter_dispose = function FEaiSceneChapter_dispose(){
   var o = this;
   o.__base.FEaiChapter.dispose.call(o);
}
