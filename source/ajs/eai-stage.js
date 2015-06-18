with(MO){
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      o._stageLoading = RClass.register(o, new AGetter('_stageLoading'));
      o._stageLogin   = RClass.register(o, new AGetter('_stageLogin'));
      o._stageScene   = RClass.register(o, new AGetter('_stageScene'));
      o._stageChart   = RClass.register(o, new AGetter('_stageChart'));
      o.onProcess     = FEaiApplication_onProcess;
      o.construct     = FEaiApplication_construct;
      o.setup         = FEaiApplication_setup;
      o.selectStage   = FEaiApplication_selectStage;
      o.dispose       = FEaiApplication_dispose;
      return o;
   }
   MO.FEaiApplication_onProcess = function FEaiApplication_onProcess(){
      var o = this;
   }
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
   }
   MO.FEaiApplication_setup = function FEaiApplication_setup(){
      var o = this;
      var stage = o._stageLoading = MO.RClass.create(MO.FEaiLoadingStage);
      stage.setup();
      o.registerStage(stage);
      var stage = o._stageLogin = MO.RClass.create(MO.FEaiLoginStage);
      stage.setup();
      o.registerStage(stage);
      var stage = o._stageScene = MO.RClass.create(MO.FEaiSceneStage);
      stage.setup();
      o.registerStage(stage);
      var stage = o._stageChart = MO.RClass.create(MO.FEaiChartStage);
      stage.setup();
      o.registerStage(stage);
      RStage.lsnsEnterFrame.register(o, o.onProcess);
   }
   MO.FEaiApplication_selectStage = function FEaiApplication_selectStage(code){
      var o = this;
      o.__base.FApplication.selectStage.call(o, code);
      MO.Eai.Canvas.selectStage(o._activeStage);
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
      o.onTemplateLoad      = FEaiCanvas_onTemplateLoad;
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
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FEaiCanvas_onTemplateLoad = function FEaiCanvas_onTemplateLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeStage;
      var cs = c.size();
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
      o.processLoadListener(o, s);
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
MO.FEaiChartStage = function FEaiChartStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   o._code             = MO.EEaiStage.Chart;
   o._sceneHistory     = MO.Class.register(o, new MO.AGetter('_sceneHistory'));
   o._sceneIndustry    = MO.Class.register(o, new MO.AGetter('_sceneIndustry'));
   o._sceneInvestment  = MO.Class.register(o, new MO.AGetter('_sceneInvestment'));
   o._sceneCustomer    = MO.Class.register(o, new MO.AGetter('_sceneCustomer'));
   o.construct         = MO.FEaiChartStage_construct;
   o.setup             = MO.FEaiChartStage_setup;
   o.process           = MO.FEaiChartStage_process;
   o.dispose           = MO.FEaiChartStage_dispose;
   return o;
}
MO.FEaiChartStage_construct = function FEaiChartStage_construct(){
   var o = this;
   o.__base.FEaiStage.construct.call(o);
}
MO.FEaiChartStage_setup = function FEaiChartStage_setup(){
   var o = this;
   var scene = o._sceneHistory = MO.RClass.create(MO.FEaiChartHistoryScene);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneIndustry = MO.RClass.create(MO.FEaiChartIndustryScene);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneInvestment = MO.RClass.create(MO.FEaiChartInvestmentScene);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneCustomer = MO.RClass.create(MO.FEaiChartCustomerScene);
   scene.setup();
   o.registerScene(scene);
}
MO.FEaiChartStage_process = function FEaiChartStage_process(){
   var o = this;
   o.__base.FEaiStage.process.call(o);
}
MO.FEaiChartStage_dispose = function FEaiChartStage_dispose(){
   var o = this;
   o.__base.FEaiStage.dispose.call(o);
}
MO.FEaiLoadingStage = function FEaiLoadingStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   o._code = MO.EEaiStage.Loading;
   return o;
}
MO.FEaiLoginStage = function FEaiLoginStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   o._code = MO.EEaiStage.Login;
   return o;
}
MO.FEaiSceneStage = function FEaiSceneStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   o._code             = MO.EEaiStage.Scene;
   o._sceneCountry     = null;
   o._sceneGroup       = null;
   o._sceneGroupReport = null;
   o._sceneCompany     = null;
   o.construct         = MO.FEaiSceneStage_construct;
   o.setup             = MO.FEaiSceneStage_setup;
   o.process           = MO.FEaiSceneStage_process;
   o.dispose           = MO.FEaiSceneStage_dispose;
   return o;
}
MO.FEaiSceneStage_construct = function FEaiSceneStage_construct(){
   var o = this;
   o.__base.FEaiStage.construct.call(o);
}
MO.FEaiSceneStage_setup = function FEaiSceneStage_setup(){
   var o = this;
   var scene = o._sceneCountry = MO.RClass.create(MO.FEaiCountryScene);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneGroup = MO.RClass.create(MO.FEaiGroupScene);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneGroupReport = MO.RClass.create(MO.FEaiGroupReportScene);
   scene.setup();
   o.registerScene(scene);
   var scene = o._sceneCompany = MO.RClass.create(MO.FEaiCompanyScene);
   scene.setup();
   o.registerScene(scene);
}
MO.FEaiSceneStage_process = function FEaiSceneStage_process(){
   var o = this;
   o.__base.FEaiStage.process.call(o);
}
MO.FEaiSceneStage_dispose = function FEaiSceneStage_dispose(){
   var o = this;
   o.__base.FEaiStage.dispose.call(o);
}
with(MO){
   MO.FEaiStage = function FEaiStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._mapLayer    = RClass.register(o, new AGetter('_mapLayer'));
      o._spriteLayer = RClass.register(o, new AGetter('_spriteLayer'));
      o._faceLayer   = RClass.register(o, new AGetter('_faceLayer'));
      o.construct    = FEaiStage_construct;
      o.active       = FEaiStage_active;
      o.deactive     = FEaiStage_deactive;
      return o;
   }
   MO.FEaiStage_construct = function FEaiStage_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._mapLayer = RClass.create(FDisplayLayer);
      o.registerLayer('MapLayer', layer);
      var layer = o._spriteLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SpriteLayer', layer);
      var layer = o._faceLayer = RClass.create(FDisplayLayer);
      o.registerLayer('FaceLayer', layer);
   }
   MO.FEaiStage_active = function FEaiStage_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FEaiStage_deactive = function FEaiStage_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
