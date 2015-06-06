MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   return o;
}
MO.EEaiStage = new function EEaiStage(){
   var o = this;
   o.Country     = 1;
   o.Group       = 2;
   o.GroupReport = 3;
   o.Company     = 4;
   return o;
}
MO.FEaiStage = function FEaiStage(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   return o;
}
with(MO){
   MO.FEaiLogic = function FEaiLogic(o){
      o = RClass.inherits(this, o, FObject);
      o._code   = null;
      o.makeUrl = FEaiLogicOrganization_makeUrl;
      o.send    = FEaiLogicOrganization_send;
      return o;
   }
   MO.FEaiLogicOrganization_makeUrl = function FEaiLogicOrganization_makeUrl(method, parameters){
      var o = this;
      var serviceHost = MO.RConsole.find(MO.FEnvironmentConsole).findValue(MO.EEaiConstant.ServiceHost);
      var url = 'http://' + serviceHost + '/eai/' + o._code + '/' + method;
      return url;
   }
   MO.FEaiLogicOrganization_send = function FEaiLogicOrganization_send(method, parameters, owner, callback){
      var o = this;
      var url = o.makeUrl(method, parameters);
      var connection = RConsole.find(FJsonConsole).sendAsync(url);
      connection.addProcessListener(owner, callback);
      return connection;
   }
}
with(MO){
   MO.FEaiLogicAchievement = function FEaiLogicAchievement(o){
      o = RClass.inherits(this, o, FEaiLogic);
      o._code   = 'achievement';
      o.doGroup = FEaiLogicAchievement_doGroup;
      o.doSort  = FEaiLogicAchievement_doSort;
      o.doQuery = FEaiLogicAchievement_doQuery;
      return o;
   }
   MO.FEaiLogicAchievement_doGroup = function FEaiLogicAchievement_doGroup(owner, callback){
      return this.send('group', null, owner, callback);
   }
   MO.FEaiLogicAchievement_doSort = function FEaiLogicAchievement_doSort(owner, callback){
      return this.send('sort', null, owner, callback);
   }
   MO.FEaiLogicAchievement_doQuery = function FEaiLogicAchievement_doQuery(owner, callback){
      return this.send('query', null, owner, callback);
   }
}
MO.FEaiLogicConsole = function FEaiLogicConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole);
   o._organization = null;
   o._achievement  = null;
   o._schedule     = null;
   o.construct     = MO.FEaiLogicConsole_construct;
   o.organization  = MO.FEaiLogicConsole_organization;
   o.achievement   = MO.FEaiLogicConsole_achievement;
   o.schedule      = MO.FEaiLogicConsole_schedule;
   return o;
}
MO.FEaiLogicConsole_construct = function FEaiLogicConsole_construct(monitor){
   var o = this;
   o._organization = MO.RClass.create(MO.FEaiLogicOrganization);
   o._achievement = MO.RClass.create(MO.FEaiLogicAchievement);
   o._schedule = MO.RClass.create(MO.FEaiLogicSchedule);
}
MO.FEaiLogicConsole_organization = function FEaiLogicConsole_organization(){
   return this._organization;
}
MO.FEaiLogicConsole_achievement = function FEaiLogicConsole_achievement(){
   return this._achievement;
}
MO.FEaiLogicConsole_schedule = function FEaiLogicConsole_schedule(){
   return this._schedule;
}
with(MO){
   MO.FEaiLogicOrganization = function FEaiLogicOrganization(o){
      o = RClass.inherits(this, o, FEaiLogic);
      o._code   = 'organization';
      o.doFetch = FEaiLogicOrganization_doFetch;
      return o;
   }
   MO.FEaiLogicOrganization_doFetch = function FEaiLogicOrganization_doFetch(owner, callback){
      return this.send('fetch', null, owner, callback);
   }
}
with(MO){
   MO.FEaiLogicSchedule = function FEaiLogicSchedule(o){
      o = RClass.inherits(this, o, FEaiLogic);
      o._code   = 'schedule';
      o.doFetch = FEaiLogicSchedule_doFetch;
      return o;
   }
   MO.FEaiLogicSchedule_doFetch = function FEaiLogicSchedule_doFetch(owner, callback){
      return this.send('fetch', null, owner, callback);
   }
}
MO.FEaiCompanyStage = function FEaiCompanyStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiCountryStage = function FEaiCountryStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiGroupReportStage = function FEaiGroupReportStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiGroupStage = function FEaiGroupStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
with(MO){
   MO.FEaiStage = function FEaiStage(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._mapLayer    = null;
      o._spriteLayer = null;
      o._faceLayer   = null;
      o.construct    = FEaiStage_construct;
      o.mapLayer     = FEaiStage_mapLayer;
      o.spriteLayer  = FEaiStage_spriteLayer;
      o.faceLayer    = FEaiStage_faceLayer;
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
   MO.FEaiStage_mapLayer = function FEaiStage_mapLayer(){
      return this._mapLayer;
   }
   MO.FEaiStage_spriteLayer = function FEaiStage_spriteLayer(){
      return this._spriteLayer;
   }
   MO.FEaiStage_faceLayer = function FEaiStage_faceLayer(){
      return this._faceLayer;
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
      o.setPanel            = FEaiCanvas_setPanel;
      o.loadByGuid          = FEaiCanvas_loadByGuid;
      o.loadByCode          = FEaiCanvas_loadByCode;
      o.dispose             = FEaiCanvas_dispose;
      return o;
   }
   MO.FEaiCanvas_onEnterFrame = function FEaiCanvas_onEnterFrame(){
      var o = this;
      var stage = o._stage;
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
   MO.FEaiCanvas_setPanel = function FEaiCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FE3dCanvas.setPanel.call(o, hPanel);
      var stage = o._stage;
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
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
MO.REaiApplication = function REaiApplication(){
   var o = MO.RSingleton.call(this);
   o._stageCountry     = null;
   o._stageGroup       = null;
   o._stageGroupReport = null;
   o._stageCompany     = null;
   o._activeStage      = null;
   return o;
}
MO.REaiApplication.prototype.setup = function REaiApplication_setup(){
   var o = this;
   o._stageCountry = MO.RClass.create(MO.FEaiCountryStage);
   o._stageGroup = MO.RClass.create(MO.FEaiGroupStage);
   o._stageGroupReport = MO.RClass.create(MO.FEaiGroupReportStage);
   o._stageCompany = MO.RClass.create(MO.FEaiCompanyStage);
}
MO.REaiApplication.prototype.findStage = function REaiApplication_findStage(stageCd){
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
MO.REaiApplication.prototype.selectStage = function REaiApplication_selectStage(stageCd){
   var o = this;
   var stage = o.findStage(stageCd);
   return stage;
}
MO.REaiApplication.prototype.dispose = function REaiApplication_dispose(){
   var o = this;
   o._stageCountry = MO.RObject.dispose(o._stageCountry);
   o._stageGroup = MO.RObject.dispose(o._stageGroup);
   o._stageGroupReport = MO.RObject.dispose(o._stageGroupReport);
   o._stageCompany = MO.RObject.dispose(o._stageCompany);
   o._activeStage = null;
   o.__base.FUiControl.dispose.call(o);
}
MO.EaiApplication = new MO.REaiApplication();
