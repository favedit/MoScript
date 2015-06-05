with(MO){
   MO.FEaiCanvas = function FEaiCanvas(o){
      o = RClass.inherits(this, o, FE3dCanvas);
      o._scaleRate          = 1;
      o._optionAlpha        = false;
      o._activeTemplate     = null;
      o._capturePosition    = null;
      o._captureRotation    = null;
      o._stage              = null;
      o.onEnterFrame        = FEaiCanvas_onEnterFrame;
      o.onMouseCaptureStart = FEaiCanvas_onMouseCaptureStart;
      o.onMouseCapture      = FEaiCanvas_onMouseCapture;
      o.onMouseCaptureStop  = FEaiCanvas_onMouseCaptureStop;
      o.onResize            = FEaiCanvas_onResize;
      o.onTemplateLoad      = FEaiCanvas_onTemplateLoad;
      o.construct           = FEaiCanvas_construct;
      o.build               = FEaiCanvas_build;
      o.loadByGuid          = FEaiCanvas_loadByGuid;
      o.loadByCode          = FEaiCanvas_loadByCode;
      o.dispose             = FEaiCanvas_dispose;
      return o;
   }
   MO.FEaiCanvas_onEnterFrame = function FEaiCanvas_onEnterFrame(){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var c = s.camera();
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
         var ls = s.layers();
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
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var r = o._activeTemplate.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
   }
   MO.FEaiCanvas_onMouseCapture = function FEaiCanvas_onMouseCapture(p){
      var o = this;
      var s = o._activeTemplate;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeTemplate.camera();
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
      var s = o._activeSpace;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }
   MO.FEaiCanvas_onTemplateLoad = function FEaiCanvas_onTemplateLoad(p){
      var o = this;
      var c = o._graphicContext;
      var s = o._activeTemplate;
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
      var stage = o._stage = MO.RClass.create(MO.FEaiStage);
      stage.linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      RStage.register('eai.stage', stage);
   }
   MO.FEaiCanvas_loadByGuid = function FEaiCanvas_loadByGuid(p){
      var o = this;
      var c = o._graphicContext;
      var sc = RConsole.find(FE3dSceneConsole);
      if(o._activeTemplate != null){
         sc.free(o._activeTemplate);
      }
      var s = sc.alloc(o, p);
      s.addLoadListener(o, o.onTemplateLoad);
      s.selectTechnique(c, FG3dGeneralTechnique);
      o._stage = o._activeTemplate = s;
      RStage.register('stage3d', s);
   }
   MO.FEaiCanvas_loadByCode = function FEaiCanvas_loadByCode(code){
      var o = this;
      var context = o._graphicContext;
      var templateConsole = RConsole.find(FE3dTemplateConsole);
      if(o._activeTemplate != null){
         templateConsole.free(o._activeTemplate);
      }
      var template = templateConsole.allocByCode(context, code);
      template.addLoadListener(o, o.onTemplateLoad);
      template.selectTechnique(context, FE3dGeneralTechnique);
      o._stage = o._activeTemplate = template;
      RStage.register('stage.template', template);
   }
   MO.FEaiCanvas_dispose = function FEaiCanvas_dispose(){
      var o = this;
      var v = o._rotation;
      if(v){
         v.dispose();
         o._rotation = null;
      }
      o.__base.FE3dCanvas.dispose.call(o);
   }
}
Eai.REaiApplication = function REaiApplication(){
   var o = MO.RSingleton.call(this);
   o._stageCountry     = null;
   o._stageGroup       = null;
   o._stageGroupReport = null;
   o._stageCompany     = null;
   o._activeStage      = null;
   return o;
}
Eai.REaiApplication.prototype.setup = function REaiApplication_setup(){
   var o = this;
   o._stageCountry = MO.RClass.create(MO.FEaiCountryStage);
   o._stageGroup = MO.RClass.create(MO.FEaiGroupStage);
   o._stageGroupReport = MO.RClass.create(MO.FEaiGroupReportStage);
   o._stageCompany = MO.RClass.create(MO.FEaiCompanyStage);
}
Eai.REaiApplication.prototype.findStage = function REaiApplication_findStage(stageCd){
   var o = this;
   switch(stageCd){
      case MO.EEaiStage.Country:
         return o._stageCountry;
      case MO.EEaiStage.Group:
         return o._stageGroupReport;
      case MO.EEaiStage.GroupReport:
         return o._stageGroupReport;
      case MO.EEaiStage.Company:
         return o._stageCompany;
      default:
         throw new TError(o, 'Unknown stage type. (stage_cd={1})', stageCd);
   }
}
Eai.REaiApplication.prototype.selectStage = function REaiApplication_selectStage(stageCd){
   var o = this;
   var stage = o.findStage(stageCd);
   return stage;
}
Eai.REaiApplication.prototype.dispose = function REaiApplication_dispose(){
   var o = this;
   o._stageCountry = MO.RObject.dispose(o._stageCountry);
   o._stageGroup = MO.RObject.dispose(o._stageGroup);
   o._stageGroupReport = MO.RObject.dispose(o._stageGroupReport);
   o._stageCompany = MO.RObject.dispose(o._stageCompany);
   o._activeStage = null;
   o.__base.FUiControl.dispose.call(o);
}
Eai.Application = new Eai.REaiApplication();
