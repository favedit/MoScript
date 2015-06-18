MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   return o;
}
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   o.Group           = 'group';
   o.GroupReport     = 'group.report';
   o.Company         = 'company';
   o.Country         = 'country';
   o.ChartHistory    = 'chart.history';
   o.ChartIndustry   = 'chart.industry';
   o.ChartInvestment = 'chart.investment';
   o.ChartCustomer   = 'chart.customer';
   return o;
}
MO.EEaiStage = new function EEaiStage(){
   var o = this;
   o.Loading = 'loading';
   o.Login   = 'login';
   o.Scene   = 'scene';
   o.Chart   = 'chart';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
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
   MO.FEaiCityResource = function FEaiCityResource(o){
      o = RClass.inherits(this, o, FObject);
      o._provinceCode  = RClass.register(o, new AGetSet('_provinceCode'));
      o._provinceLabel = RClass.register(o, new AGetSet('_provinceLabel'));
      o._code          = RClass.register(o, new AGetSet('_code'));
      o._label         = RClass.register(o, new AGetSet('_label'));
      o._location      = RClass.register(o, new AGetter('_location'));
      o.construct      = FEaiCityResource_construct;
      o.unserialize    = FEaiCityResource_unserialize;
      o.dispose        = FEaiCityResource_dispose;
      return o;
   }
   MO.FEaiCityResource_construct = function FEaiCityResource_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._location = new SPoint3();
   }
   MO.FEaiCityResource_unserialize = function FEaiCityResource_unserialize(input){
      var o = this;
      o._provinceCode = input.readString();
      o._provinceLabel = input.readString();
      o._code = input.readString();
      o._label = input.readString();
      o._location.unserialize(input);
   }
   MO.FEaiCityResource_dispose = function FEaiCityResource_dispose(){
      var o = this;
      o._location = RObject.dispose(o._location);
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCityResourceConsole = function FEaiCityResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      o._citys      = RClass.register(o, new AGetter('_citys'));
      o.construct   = FEaiCityResourceConsole_construct;
      o.unserialize = FEaiCityResourceConsole_unserialize;
      o.dispose     = FEaiCityResourceConsole_dispose;
      return o;
   }
   MO.FEaiCityResourceConsole_construct = function FEaiCityResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._citys = new TDictionary();
   }
   MO.FEaiCityResourceConsole_unserialize = function FEaiCityResourceConsole_unserialize(input){
      var o = this;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var city = RClass.create(FEaiCityResource);
         city.unserialize(input);
         o._citys.set(city.code(), city);
      }
   }
   MO.FEaiCityResourceConsole_dispose = function FEaiCityResourceConsole_dispose(){
      var o = this;
      o._citys = RObject.dispose(o._citys);
      o.__base.FConsole.dispose.call(o);
   }
}
MO.FEaiResourceConsole = function FEaiResourceConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener);
   o._loadListeners = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o._cityConsole   = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o.onLoad         = MO.FEaiResourceConsole_onLoad;
   o.construct      = MO.FEaiResourceConsole_construct;
   o.unserialize    = MO.FEaiResourceConsole_unserialize;
   o.load           = MO.FEaiResourceConsole_load;
   o.dispose        = MO.FEaiResourceConsole_dispose;
   return o;
}
MO.FEaiResourceConsole_onLoad = function FEaiResourceConsole_onLoad(event){
   var o = this;
   var data = event.outputData();
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   o.unserialize(view);
   view.dispose();
   var event = new MO.SEvent();
   o.processLoadListener(event);
   event.dispose();
}
MO.FEaiResourceConsole_construct = function FEaiResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._cityConsole = MO.RClass.create(MO.FEaiCityResourceConsole);
}
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   o._cityConsole.unserialize(input);
}
MO.FEaiResourceConsole_load = function FEaiResourceConsole_load(){
   var o = this;
   var url = '/script/ars/eai/resource.dat';
   var connection = MO.RConsole.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}
MO.FEaiResourceConsole_dispose = function FEaiResourceConsole_dispose(monitor){
   var o = this;
   o._cityConsole = RObject.dispose(o._cityConsole);
   o.__base.FConsole.dispose.call(o);
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
      o._provinceColors = RClass.register(o, new AGetter('_provinceColors'));
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
      var colors = o._provinceColors = new TObjects();
      colors.push(new SColor4(0.25, 0.50, 0.60));
      colors.push(new SColor4(0.30, 0.60, 0.75));
      colors.push(new SColor4(0.35, 0.70, 0.80));
      colors.push(new SColor4(0.40, 0.75, 0.85));
      colors.push(new SColor4(0.45, 0.85, 1.00));
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
   MO.FEaiBoundaryData = function FEaiBoundaryData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._positionCount = RClass.register(o, new AGetter('_positionCount'));
      o._positions     = RClass.register(o, new AGetter('_positions'));
      o._indexes       = RClass.register(o, new AGetter('_indexes'));
      o.construct      = FEaiBoundaryData_construct;
      o.unserialize    = FEaiBoundaryData_unserialize;
      o.dispose        = FEaiBoundaryData_dispose;
      return o;
   }
   MO.FEaiBoundaryData_construct = function FEaiBoundaryData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
   }
   MO.FEaiBoundaryData_unserialize = function FEaiBoundaryData_unserialize(input){
      var o = this;
      var index = 0;
      var vertexCount = o._positionCount = input.readInt32();
      o._positions = new Float32Array(3 * vertexCount);
      for(var i = 0; i < vertexCount; i++){
         o._positions[index++] = input.readFloat();
         o._positions[index++] = input.readFloat();
         o._positions[index++] = input.readFloat();
      }
      var indexCount = input.readInt32();
      o._indexes = new Uint16Array(indexCount);
      for(var i = 0; i < indexCount; i++){
         o._indexes[i] = input.readUint16();
      }
   }
   MO.FEaiBoundaryData_dispose = function FEaiBoundaryData_dispose(){
      var o = this;
      o._positions = RObject.dispose(o._positions);
      o._indexes = null;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCountryData = function FEaiCountryData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._provinces  = RClass.register(o, new AGetter('_provinces'));
      o.onLoaded    = FEaiCountryData_onLoaded;
      o.construct   = FEaiCountryData_construct;
      o.unserialize = FEaiCountryData_unserialize;
      o.load        = FEaiCountryData_load;
      o.dispose     = FEaiCountryData_dispose;
      return o;
   }
   MO.FEaiCountryData_construct = function FEaiCountryData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o._provinces = new TDictionary();
   }
   MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
      var o = this;
      var data = event.outputData();
      var view = RClass.create(FDataView);
      view.setEndianCd(true);
      view.link(data);
      o.unserialize(view);
      view.dispose();
   }
   MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
      var o = this;
      var stage = MO.Eai.Canvas.activeStage();
      var mapLayer = stage.mapLayer();
      var spriteLayer = stage.spriteLayer();
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiProvinceData);
         province.unserialize(input);
         province.build(MO.Eai.Canvas);
         mapLayer.pushRenderable(province.faceRenderable());
         spriteLayer.pushRenderable(province.borderRenderable());
         o._provinces.set(province.name(), province);
      }
      var context = MO.Eai.Canvas.graphicContext();
      var bitmapData = context.createObject(MO.FE3dBitmapData);
      bitmapData.loadUrl('../ars/eai/dot.png');
      var cityConsole = RConsole.find(FEaiResourceConsole).cityConsole();
      var citys = cityConsole.citys();
      var count = citys.count();
      for(var i = 0; i < count; i++){
         var city = citys.at(i);
         var bitmap = context.createObject(MO.FE3dBitmap);
         bitmap.setData(bitmapData);
         var material = bitmap.material();
         material.info().optionAlpha = true;
         material.info().ambientColor.set(1, 0, 1, 1);
         var matrix = bitmap.matrix();
         matrix.tx = city.location().x * 0.2 - 20.2;
         matrix.ty = city.location().y * 0.25 - 7.9;
         matrix.sx = 0.4;
         matrix.sy = 0.4;
         matrix.sz = 0.4;
         matrix.update();
         spriteLayer.pushRenderable(bitmap);
      }
   }
   MO.FEaiCountryData_load = function FEaiCountryData_load(){
      var o = this;
      var url = '/script/ars/eai/country.dat';
      var connection = RConsole.find(FHttpConsole).send(url);
      connection.addLoadListener(o, o.onLoaded);
   }
   MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
      var o = this;
      o._provinces = RObject.dispose(o._provinces);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
with(MO){
   MO.FEaiCountryEntity = function FEaiCountryEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._cameraDirection     = RClass.register(o, new AGetSet('_cameraDirection'));
      o._startDelay          = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration        = RClass.register(o, new AGetSet('_riseDuration'), 1200);
      o._riseDistance        = RClass.register(o, new AGetSet('_riseDistance'), 2050);
      o._fallDuration        = RClass.register(o, new AGetSet('_fallDuration'), 400);
      o._fallDistance        = RClass.register(o, new AGetSet('_fallDistance'), 50);
      o._blockInterval       = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 10);
      o._mouseMoveCheckInterval = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._cameraMoveDuration  = RClass.register(o, new AGetSet('_cameraMoveDuration'), 500);
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o._cameraMoving            = RClass.register(o, new AGetSet('_cameraMoving'), false);
      o._cameraFrom              = RClass.register(o, new AGetSet('_cameraFrom'));
      o._cameraTo                = RClass.register(o, new AGetSet('_cameraTo'));
      o.initialize = FEaiCountryEntity_initialize;
      o.introAnime = FEaiCountryEntity_introAnime;
      o.onMouseMove = FEaiCountryEntity_onMouseMove;
      o.onMouseDown = FEaiCountryEntity_onMouseDown;
      o.mouseOverFallAnime = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch = FEaiCountryEntity_onOrganizationFetch;
      o.cameraMoveAnime = FEaiCountryEntity_cameraMoveAnime;
      return o;
   }
   MO.FEaiCountryEntity_initialize = function FEaiCountryEntity_initialize(template){
      var o = this;
      o.setCameraDirection(new SVector3(0.02, -0.9, 0.5));
      o.setCameraFrom(new SPoint3());
      o.setCameraTo(new SPoint3());
      o.setMouseOverFallArray(new TObjects());
      o.setTemplate(template);
      o.setMouseMoveLastCheck(new Date());
      o.template().addEnterFrameListener(o, FEaiCountryEntity_onEnterFrame);
      var region = o.template().region();
      region.backgroundColor().set(0.2, 0.2, 0.2, 1);
      var camera = region.camera();
      camera.setPosition(3, 24, -0.5);
      camera.setDirection(o.cameraDirection().x, o.cameraDirection().y, o.cameraDirection().z);
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         renderable.material().info().optionAlpha = true;
      }
      o.setStartTime(new Date());
   }
   MO.FEaiCountryEntity_onEnterFrame = function FEaiCountryEntity_onEnterFrame(){
      var o = this;
      if (!o.introAnimeDone()) {
         o.introAnime();
      }
      else if(o.cameraMoving()) {
         o.cameraMoveAnime();
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
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseDown;
            RWindow.lsnsMouseDown.push(listener);
            RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
            var logicConsole = MO.RConsole.find(FEaiLogicConsole);
            logicConsole.organization().doFetch(o, o.onOrganizationFetch);
         }
      }
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < sprite.renderables().count() && i < idxCap; i++){
         var renderable = sprite.renderables().at(i);
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
      var dict = logicConsole.organization().dict();
      var colors = logicConsole.organization().provinceColors();
      for(var i = 0; i < dict.count(); i++){
         var bc = branchCount[dict.name(i)];
         if (!bc) {
            bc = 0;
         }
         var meshIdx = dict.valueAt(i);
         if (meshIdx < 0) {
            continue;
         }
         var renderable = o.template().sprite().renderables().at(meshIdx);
         var ambientColor = renderable.material().info().ambientColor;
         var diffuseColor = renderable.material().info().diffuseColor;
         var colorLv = bc == 0 ? 0 : Math.floor(bc / 5 + 1) > 4 ? 4 : Math.floor(bc / 5 + 1);
		 ambientColor.assign(colors.at(colorLv));
         renderable.material().update();
      }
   }
   MO.FEaiCountryEntity_onMouseDown = function FEaiCountryEntity_onMouseDown(event){
      var o = this;
      var region = o.template().region();
      var camera = region.camera();
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (!renderable) {
         camera.setPosition(3, 24, -0.5);
         camera.update();
         return;
      }
      var outline = renderable.calculateOutline();
      var relativeOutline = new SOutline3d();
      relativeOutline.calculateFrom(outline, camera.matrix());
      var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
      var currentCenter = outline.center;
      var cameraTo = new SPoint3(currentCenter.x - distance * o.cameraDirection().x, currentCenter.y - distance * o.cameraDirection().y, currentCenter.z - distance * o.cameraDirection().z);
      var cameraPosition = camera.position();
      o.setStartTime(new Date());
      o.cameraFrom().assign(cameraPosition);
      o.cameraTo().assign(cameraTo);
      o.setCameraMoving(true);
   }
   MO.FEaiCountryEntity_cameraMoveAnime = function FEaiCountryEntity_cameraMoveAnime() {
      var o = this;
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      var p = timePassed / o.cameraMoveDuration();
      if (p >= 1) {
         p = 1;
         o.setCameraMoving(false);
      }
      p = 1-(1-p)*(1-p);
      var movingPosition = new SPoint3();
      movingPosition.slerp(o.cameraFrom(), o.cameraTo(), p);
      var camera = o.template().region().camera();
      camera.position().assign(movingPosition);
      camera.update();
      var sprite = o.template().sprite();
      for (var i = 0; i < sprite.renderables().count(); i++){
         var renderable = sprite.renderables().at(i);
         if (renderable != o.mouseOverRiseRenderable()) {
            renderable.material().info().alphaRate = 1.5 - p;
            renderable.material().update();
         }
      }
   }
}
with(MO){
   MO.FEaiProvinceData = function FEaiProvinceData(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._name             = RClass.register(o, new AGetSet('_name'));
      o._color            = RClass.register(o, new AGetSet('_color'));
      o._boundaries       = RClass.register(o, new AGetter('_boundaries'));
      o._faceRenderable   = RClass.register(o, new AGetter('_faceRenderable'));
      o._borderRenderable = RClass.register(o, new AGetter('_borderRenderable'));
      o.construct         = FEaiProvinceData_construct;
      o.unserialize       = FEaiProvinceData_unserialize;
      o.build             = FEaiProvinceData_build;
      o.dispose           = FEaiProvinceData_dispose;
      return o;
   }
   MO.FEaiProvinceData_construct = function FEaiProvinceData_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o._boundaries = new TObjects();
   }
   MO.FEaiProvinceData_unserialize = function FEaiProvinceData_unserialize(input){
      var o = this;
      o._name = input.readString();
      o._color = input.readUint32();
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var boundary = RClass.create(FEaiBoundaryData);
         boundary.unserialize(input);
         o._boundaries.push(boundary);
      }
   }
   MO.FEaiProvinceData_build = function FEaiProvinceData_build(context){
      var o = this;
      var color = o._color;
      var vertexTotal = 0;
      var indexTotal = 0;
      var boundaries = o._boundaries;
      var count = boundaries.count();
      for(var i = 0; i < count; i++){
         var boundary = boundaries.at(i);
         vertexTotal += boundary.positionCount();
         indexTotal += boundary.indexes().length;
      }
      var vertexStart = 0;
      var vertexIndex = 0;
      var faceIndex = 0;
      var vertexData = new Float32Array(3 * vertexTotal);
      var faceData = new Uint16Array(indexTotal);
      var borderIndex = 0;
      var borderData = new Uint16Array(2 * vertexTotal);
      for(var n = 0; n < count; n++){
         var boundary = boundaries.at(n);
         var positionCount = boundary.positionCount();
         var positionTotal = 3 * positionCount;
         var positions = boundary.positions();
         for(var i = 0; i < positionTotal; i++){
            vertexData[vertexIndex++] = positions[i];
         }
         var indexes = boundary.indexes();
         var indexCount = indexes.length;
         for(var i = 0; i < indexCount; i++){
            faceData[faceIndex++] = vertexStart + indexes[i];
         }
         for(var i = 0; i < positionCount; i++){
            borderData[borderIndex++] = vertexStart + i;
            if(i == positionCount - 1){
               borderData[borderIndex++] = vertexStart;
            }else{
               borderData[borderIndex++] = vertexStart + i + 1;
            }
         }
         vertexStart += positionCount;
      }
      var colorIndex = 0;
      var colors = new Uint8Array(4 * vertexTotal);
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = (color >> 16) & 0xFF;
         colors[colorIndex++] = (color >>  8) & 0xFF;
         colors[colorIndex++] = (color      ) & 0xFF;
         colors[colorIndex++] = 255;
      }
      var renderable = o._faceRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal);
      renderable._indexBuffer.upload(faceData, faceIndex);
      renderable.material().info().optionDouble = true;
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.25, 0.2);
      matrix.update();
      var colorIndex = 0;
      for(var i = 0; i < vertexTotal; i++){
         colors[colorIndex++] = 0x4B;
         colors[colorIndex++] = 0x59;
         colors[colorIndex++] = 0x64;
         colors[colorIndex++] = 255;
      }
      var renderable = o._borderRenderable = MO.RClass.create(MO.FE3dDataBox);
      renderable.linkGraphicContext(context);
      renderable.setup();
      renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal);
      renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal);
      renderable._indexBuffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
      renderable._indexBuffer.setLineWidth(1);
      renderable._indexBuffer.upload(borderData, borderIndex);
      var matrix = renderable.matrix();
      matrix.tx = -20;
      matrix.ty = -8;
      matrix.setScale(0.2, 0.25, 0.2);
      matrix.update();
   }
   MO.FEaiProvinceData_dispose = function FEaiProvinceData_dispose(){
      var o = this;
      o._boundaries = RObject.dispose(o._boundaries);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
MO.FEaiChartCustomerScene = function FEaiChartCustomerScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.ChartCustomer;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiChartCustomerScene_onTemplateLoad;
   o.setup            = MO.FEaiChartCustomerScene_setup;
   o.active           = MO.FEaiChartCustomerScene_active;
   o.deactive         = MO.FEaiChartCustomerScene_deactive;
   return o;
}
MO.FEaiChartCustomerScene_onTemplateLoad = function FEaiChartCustomerScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiChartCustomerScene_setup = function FEaiChartCustomerScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiChartCustomerScene_active = function FEaiChartCustomerScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiChartCustomerScene_deactive = function FEaiChartCustomerScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.ChartHistory;
   o._countryTemplate = null;
   o._country         = null;
   o.onTemplateLoad   = MO.FEaiChartHistoryScene_onTemplateLoad;
   o.setup            = MO.FEaiChartHistoryScene_setup;
   o.active           = MO.FEaiChartHistoryScene_active;
   o.deactive         = MO.FEaiChartHistoryScene_deactive;
   return o;
}
MO.FEaiChartHistoryScene_onTemplateLoad = function FEaiChartHistoryScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var country = o._country = MO.Class.create(MO.FEaiCountryData);
   country.load();
}
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   stage.region().backgroundColor().set(0, 0, 0.1, 1);
}
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
}
MO.FEaiChartIndustryScene = function FEaiChartIndustryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.ChartIndustry;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiChartIndustryScene_onTemplateLoad;
   o.setup            = MO.FEaiChartIndustryScene_setup;
   o.active           = MO.FEaiChartIndustryScene_active;
   o.deactive         = MO.FEaiChartIndustryScene_deactive;
   return o;
}
MO.FEaiChartIndustryScene_onTemplateLoad = function FEaiChartIndustryScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiChartIndustryScene_setup = function FEaiChartIndustryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiChartIndustryScene_active = function FEaiChartIndustryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiChartIndustryScene_deactive = function FEaiChartIndustryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiChartInvestmentScene = function FEaiChartInvestmentScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.ChartInvestment;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiChartInvestmentScene_onTemplateLoad;
   o.setup            = MO.FEaiChartInvestmentScene_setup;
   o.active           = MO.FEaiChartInvestmentScene_active;
   o.deactive         = MO.FEaiChartInvestmentScene_deactive;
   return o;
}
MO.FEaiChartInvestmentScene_onTemplateLoad = function FEaiChartInvestmentScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiChartInvestmentScene_setup = function FEaiChartInvestmentScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiChartInvestmentScene_active = function FEaiChartInvestmentScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiChartInvestmentScene_deactive = function FEaiChartInvestmentScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiCompanyScene = function FEaiCompanyScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Company;
   return o;
}
MO.FEaiCountryScene = function FEaiCountryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code            = MO.EEaiScene.Country;
   o._countryTemplate = null;
   o._countryLogoBar  = null;
   o.onTemplateLoad   = MO.FEaiCountryScene_onTemplateLoad;
   o.setup            = MO.FEaiCountryScene_setup;
   o.active           = MO.FEaiCountryScene_active;
   o.deactive         = MO.FEaiCountryScene_deactive;
   return o;
}
MO.FEaiCountryScene_onTemplateLoad = function FEaiCountryScene_onTemplateLoad(event){
   var o = this;
   var sprite = o._countryTemplate.sprite();
   var matrix = sprite.matrix();
   matrix.tx = -4;
   matrix.ty = -3;
   matrix.rx = -Math.PI / 2;
   matrix.updateForce();
   var stage = MO.Eai.Canvas.activeStage();
}
MO.FEaiCountryScene_setup = function FEaiCountryScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
   var frame = o._countryLogoBar = frameConsole.get(MO.Eai.Canvas, 'eai.country.LogoBar');
   o.registerFrame(frame);
}
MO.FEaiCountryScene_active = function FEaiCountryScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   var renderable = frame.renderable();
   renderable.setLocation(10, 10);
   layer.pushRenderable(frame.renderable());
}
MO.FEaiCountryScene_deactive = function FEaiCountryScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
   var stage = MO.Eai.Canvas.activeStage();
   var layer = stage.faceLayer();
   var frame = o._countryLogoBar
   layer.removeRenderable(frame.renderable());
}
MO.FEaiGroupReportScene = function FEaiGroupReportScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.GroupReport;
   return o;
}
MO.FEaiGroupScene = function FEaiGroupScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   o._code = MO.EEaiScene.Group;
   return o;
}
with(MO){
   MO.FEaiScene = function FEaiScene(o){
      o = RClass.inherits(this, o, FE3dStage);
      o._mapLayer       = null;
      o._spriteLayer    = null;
      o._faceLayer      = null;
      o._frames         = null;
      o.construct       = FEaiScene_construct;
      o.mapLayer        = FEaiScene_mapLayer;
      o.spriteLayer     = FEaiScene_spriteLayer;
      o.faceLayer       = FEaiScene_faceLayer;
      o.registerFrame   = FEaiScene_registerFrame;
      o.unregisterFrame = FEaiScene_unregisterFrame;
      o.active          = FEaiScene_active;
      o.deactive        = FEaiScene_deactive;
      o.process         = FEaiScene_process;
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
      o._frames = new TObjects();
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
   MO.FEaiScene_registerFrame = function FEaiScene_registerFrame(frame){
      this._frames.push(frame);
   }
   MO.FEaiScene_unregisterFrame = function FEaiScene_unregisterFrame(frame){
      this._frames.remove(frame);
   }
   MO.FEaiScene_process = function FEaiScene_process(){
      var o = this;
      var count = o._frames.count();
      for(var i = 0; i < count; i++){
         var frame = o._frames.at(i);
         frame.psUpdate();
      }
   }
}
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
MO.Eai.setup = function Eai_setup(hPanel){
   var o = this;
   o._hPanel = hPanel;
   var application = o.Application = MO.RClass.create(MO.FEaiApplication);
   var canvas = o.Canvas = MO.RClass.create(MO.FEaiCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
   o.Application.setup();
}
