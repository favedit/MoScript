MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   return o;
}
MO.EEaiStage = new function EEaiStage(){
   var o = this;
   o.Loading = 1;
   o.Login   = 2;
   o.Scene   = 3;
   return o;
}
with(MO){
   MO.FEaiEntity = function FEaiEntity(o){
      o = RClass.inherits(this, o, FObject);
      return o;
   }
   MO.FEaiEntity_dispose = function FEaiEntity_dispose(){
      var o = this;
      o.__base.FObject.dispose.call(o);
   }
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
      o._dict   = RClass.register(o, new AGetter('_dict'));
      o.doFetch = FEaiLogicOrganization_doFetch;
      o.getMeshIndex = FEaiLogicOrganization_getMeshIndex;
      o.construct = FEaiLogicOrganization_construct;
      return o;
   }
   MO.FEaiLogicOrganization_construct = function FEaiLogicOrganization_construct(){
      var o = this;
      o.__base.FEaiLogic.construct.call(o);
      var dict = o._dict = new TDictionary();
      dict.set(11, 6);
      dict.set(12, 7);
      dict.set(13, 5);
      dict.set(14, 8);
      dict.set(15, 2);
      dict.set(21, 4);
      dict.set(22, 3);
      dict.set(23, 1);
      dict.set(31, -1);
      dict.set(32, 21);
      dict.set(33, 22);
      dict.set(34, 20);
      dict.set(35, 30);
      dict.set(36, 23);
      dict.set(37, 9);
      dict.set(41, 10);
      dict.set(42, 19);
      dict.set(43, 29);
      dict.set(44, 24);
      dict.set(45, 25);
      dict.set(46, 0);
      dict.set(50, 18);
      dict.set(51, 17);
      dict.set(52, 26);
      dict.set(53, 27);
      dict.set(54, 16);
      dict.set(61, 12);
      dict.set(62, 13);
      dict.set(63, 15);
      dict.set(64, 11);
      dict.set(65, 14);
      dict.set(71, 28);
      dict.set(81, -1);
      dict.set(82, -1);
   }
   MO.FEaiLogicOrganization_doFetch = function FEaiLogicOrganization_doFetch(owner, callback){
      return this.send('fetch', null, owner, callback);
   }
   MO.FEaiLogicOrganization_getMeshIndex = function FEaiLogicOrganization_getMeshIndex(provinceId){
      return this._dict.value(provinceId);
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
with(MO){
   MO.FEaiCountryEntity = function FEaiCountryEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._startDelay          = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration        = RClass.register(o, new AGetSet('_riseDuration'), 1200);
      o._riseDistance        = RClass.register(o, new AGetSet('_riseDistance'), 2050);
      o._fallDuration        = RClass.register(o, new AGetSet('_fallDuration'), 400);
      o._fallDistance        = RClass.register(o, new AGetSet('_fallDistance'), 50);
      o._blockInterval       = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 10);
      o._mouseMoveCheckInterval = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o.initialize = FEaiCountryEntity_initialize;
      o.introAnime = FEaiCountryEntity_introAnime;
      o.onMouseMove = FEaiCountryEntity_onMouseMove;
      o.mouseOverFallAnime = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch = FEaiCountryEntity_onOrganizationFetch;
      return o;
   }
   MO.FEaiCountryEntity_initialize = function FEaiCountryEntity_initialize(template){
      var o = this;
      o.setMouseOverFallArray(new TObjects());
      o.setTemplate(template);
      o.setMouseMoveLastCheck(new Date());
      o.template().addEnterFrameListener(o, FEaiCountryEntity_onEnterFrame);
      var region = o.template().region();
      region.backgroundColor().set(0.2, 0.2, 0.2, 1);
      var camera = region.camera();
      camera.setPosition(3, 24, -0.5);
      camera.setDirection(0.02, -0.9, 0.5);
      o.setStartTime(new Date());
   }
   MO.FEaiCountryEntity_onEnterFrame = function FEaiCountryEntity_onEnterFrame(){
      var o = this;
      if (!o.introAnimeDone()) {
         o.introAnime();
      }
      else{
         o.mouseOverFallAnime();
      }
   }
   MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime(){
      var o = this;
      var sprite = o.template().sprite();
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      if (timePassed < o.startDelay()) {
         return;
      }
      else{
         timePassed -= o.startDelay();
         if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * sprite.renderables().count()) {
            o.setIntroAnimeDone(true);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseMove;
            RWindow.lsnsMouseMove.push(listener);
            RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
            var logicConsole = MO.RConsole.find(FEaiLogicConsole);
            logicConsole.organization().doFetch(o, o.onOrganizationFetch);
         }
      }
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < sprite.renderables().count() && i < idxCap; i++){
         var renderable = sprite.renderables().at(i);
         var tt = renderable._resource._code;
         var matrix = renderable.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
			risePercentage = 1;
			fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
			if (fallPercentage > 1) {
				fallPercentage = 1;
			}
         }
         matrix.ty = o.riseDistance() * risePercentage - o.fallDistance() * fallPercentage;
         matrix.updateForce();
      }
   }
   MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
      var o = this;
      var now = new Date();
      if (now.getDate() - o.mouseMoveLastCheck() < o.mouseMoveCheckInterval) {
         return;
      }
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (o.mouseOverRiseRenderable() != renderable) {
         if (o.mouseOverRiseRenderable()) {
            o.mouseOverFallArray().push(o.mouseOverRiseRenderable());
         }
         o.setMouseOverRiseRenderable(renderable);
         if (o.mouseOverFallArray().contains(o.mouseOverRiseRenderable())) {
         	o.mouseOverFallArray().remove(o.mouseOverRiseRenderable());
         }
      }
   }
   MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
      var o = this;
      for (var i = o.mouseOverFallArray().count() - 1; i >= 0; i--) {
         var renderable = o.mouseOverFallArray().at(i);
         var matrix = renderable.matrix();
         if (matrix.ty > o.riseDistance() - o.fallDistance()) {
         	matrix.ty -= 1;
         }
         else {
         	matrix.ty = o.riseDistance() - o.fallDistance();
         	o.mouseOverFallArray().erase(i);
         }
         matrix.updateForce();
      }
      if (o.mouseOverRiseRenderable()) {
         var riseMatrix = o.mouseOverRiseRenderable().matrix();
         if (riseMatrix.ty < o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight()) {
         	riseMatrix.ty = o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight();
         	riseMatrix.updateForce();
         }
      }
   }
   MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
      var o = this;
      var content = event.content;
      var branchCount = new Object();
      for (var i = 0; i < content.collection.length; i++) {
         if(!branchCount[content.collection[i].province_id]){
            if(content.collection[i].province_id == null)
            {
            }
            branchCount[content.collection[i].province_id] = 1;
         }
         else{
            branchCount[content.collection[i].province_id]++;
            if (content.collection[i].province_id == null) {
               content.collection[i].label;
            }
         }
      }
      var logicConsole = MO.RConsole.find(FEaiLogicConsole);
      var aa = logicConsole.organization();
      var dict = logicConsole.organization().dict();
      for(var i = 0; i < dict.count(); i++){
         var bc = branchCount[dict.name(i)];
         var meshIdx = dict.valueAt(i);
         if (meshIdx < 0) {
            continue;
         }
         var renderable = o.template().sprite().renderables().at(meshIdx);
         var ambientColor = renderable.material().info().ambientColor;
         var diffuseColor = renderable.material().info().diffuseColor;
		 ambientColor.red = 1 - bc * 0.1;
		 ambientColor.green = 1 - bc * 0.1;
         ambientColor.blue = 1;
         diffuseColor.red = 1 - bc * 0.1;
		 diffuseColor.green = 1 - bc * 0.1;
		 diffuseColor.blue = 1;
         renderable.material().update();
      }
   }
}
MO.FEaiCompanyScene = function FEaiCompanyScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   return o;
}
MO.FEaiCountryScene = function FEaiCountryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   return o;
}
MO.FEaiGroupReportScene = function FEaiGroupReportScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   return o;
}
MO.FEaiGroupScene = function FEaiGroupScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   return o;
}
with(MO){
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._mapLayer    = null;
      o._spriteLayer = null;
      o._faceLayer   = null;
      o.construct    = FEaiScene_construct;
      o.mapLayer     = FEaiScene_mapLayer;
      o.spriteLayer  = FEaiScene_spriteLayer;
      o.faceLayer    = FEaiScene_faceLayer;
      o.active       = FEaiScene_active;
      o.deactive     = FEaiScene_deactive;
      return o;
   }
   MO.FEaiScene_construct = function FEaiScene_construct(){
      var o = this;
      o.__base.FE3dStage.construct.call(o);
      var layer = o._mapLayer = RClass.create(FDisplayLayer);
      o.registerLayer('MapLayer', layer);
      var layer = o._spriteLayer = RClass.create(FDisplayLayer);
      o.registerLayer('SpriteLayer', layer);
      var layer = o._faceLayer = RClass.create(FDisplayLayer);
      o.registerLayer('FaceLayer', layer);
   }
   MO.FEaiScene_mapLayer = function FEaiScene_mapLayer(){
      return this._mapLayer;
   }
   MO.FEaiScene_spriteLayer = function FEaiScene_spriteLayer(){
      return this._spriteLayer;
   }
   MO.FEaiScene_faceLayer = function FEaiScene_faceLayer(){
      return this._faceLayer;
   }
   MO.FEaiScene_active = function FEaiScene_active(){
      var o = this;
      o.__base.FE3dStage.active.call(o);
   }
   MO.FEaiScene_deactive = function FEaiScene_deactive(){
      var o = this;
      o.__base.FE3dStage.deactive.call(o);
   }
}
with(MO){
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      o._stageLoading = RClass.register(o, new AGetter('_stageLoading'));
      o._stageLogin   = RClass.register(o, new AGetter('_stageLogin'));
      o._stageScene   = RClass.register(o, new AGetter('_stageScene'));
      o.construct     = FEaiApplication_construct;
      o.setup         = FEaiApplication_setup;
      o.dispose       = FEaiApplication_dispose;
      return o;
   }
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
      o._stageLoading = MO.RClass.create(MO.FEaiLoadingStage);
      o._stageLogin = MO.RClass.create(MO.FEaiLoginStage);
      o._stageScene = MO.RClass.create(MO.FEaiSceneStage);
   }
   MO.FEaiApplication_setup = function FEaiApplication_setup(){
      var o = this;
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
      stage.region().linkGraphicContext(o);
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
MO.FEaiLoadingStage = function FEaiLoadingStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiLoginStage = function FEaiLoginStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
}
MO.FEaiSceneStage = function FEaiSceneStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   return o;
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
MO.Eai = new function FEai(){
}
MO.Eai.setup = function Eai_setup(){
   MO.Eai.Application = MO.RClass.create(MO.FEaiApplication);
   MO.Eai.Application.setup();
}
