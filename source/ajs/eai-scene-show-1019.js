MO.SShowFocusParameter = function SShowFocusParameter(r ,t){
   var o                   = this;
   o.name               = '';
   o.rotateY            = MO.Runtime.nvl(r, 0);
   o.translateY         = MO.Runtime.nvl(t, 0);
   o.assign             = MO.SShowFocusParameter_assign;
   return o;
}
MO.SShowFocusParameter_assign = function SShowFocusParameter_assign(s) {
   var o = this;
   o.name = s.name;
   o.rotateY = s.rotateY;
   o.translateY = s.translateY;
}
MO.FEaiChartShow1019Scene = function FEaiChartShow1019Scene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   o._code                    = MO.EEaiScene.ChartWorld;
   o._optionMapCity3d         = true;
   o._mapReady                = false;
   o._playing                 = false;
   o._statusStart             = false;
   o._statusLayerCount        = 100;
   o._statusLayerLevel        = 100;
   o._operationPoint          = null;
   o._operationRotationX      = 0;
   o._operationRotationY      = 0;
   o._rotationX               = 0;
   o._rotationY               = 0;
   o._startRotateY            = 0;
   o._targetRotateY           = 0;
   o._translateY              = 0;
   o._startTranslateY         = 0;
   o._targetTranslateY        = 0;
   o._startTick               = 0;
   o._earthMoving             = false;
   o.__moveEarthDuration      = 500;
   o._opMouseDown             = false;
   o._opMouseMoved            = false;
   o.__opMouseMoveThreshold   = 4;
   o._autoRotate              = true;
   o._showChina               = false;
   o._showingMktInfo          = false;
   o._countryTable            = null;
   o._provinceTable           = null;
   o._selectedProvinceCode    = 0;
   o._provinceUnits           = null;
   o._countryUnits            = null;
   o._worldScale              = 300;
   o._startWorldScale         = 500;
   o._targetWorldScale        = 500;
   o._cameraFrom              = null;
   o._cameraTo                = null;
   o._cameraDirection         = null;
   o._ccDirection             = null;
   o._facePosition            = null;
   o._organizationDataTicker  = null;
   o._organizationInfo        = null;
   o._socket                  = null;
   o._focusParamManager       = null;
   o._remoteRotate            = null;
   o.onSocketReceived         = MO.FEaiChartShow1019Scene_onSocketReceived;
   o.onOrganizationFetch      = MO.FEaiChartShow1019Scene_onOrganizationFetch;
   o.onOperationDown          = MO.FEaiChartShow1019Scene_onOperationDown;
   o.onOperationMove          = MO.FEaiChartShow1019Scene_onOperationMove;
   o.onOperationUp            = MO.FEaiChartShow1019Scene_onOperationUp;
   o.onOperationWheel         = MO.FEaiChartShow1019Scene_onOperationWheel;
   o.onOperationVisibility    = MO.FEaiChartShow1019Scene_onOperationVisibility;
   o.onProcessReady           = MO.FEaiChartShow1019Scene_onProcessReady;
   o.onProcess                = MO.FEaiChartShow1019Scene_onProcess;
   o.onSwitchProcess          = MO.FEaiChartShow1019Scene_onSwitchProcess;
   o.onSwitchComplete         = MO.FEaiChartShow1019Scene_onSwitchComplete;
   o.construct                = MO.FEaiChartShow1019Scene_construct;
   o.setup                    = MO.FEaiChartShow1019Scene_setup;
   o.showFace                 = MO.FEaiChartShow1019Scene_showFace;
   o.fixMatrix                = MO.FEaiChartShow1019Scene_fixMatrix;
   o.processResize            = MO.FEaiChartShow1019Scene_processResize;
   return o;
}
MO.FEaiChartShow1019Scene_onSocketReceived = function FEaiChartShow1019Scene_onSocketReceived(event) {
   var o = this;
   var message = event.message;
   var tagIndex = message.indexOf('tag');
   if (tagIndex != -1) {
      var tag = message.substr(tagIndex + 4);
      o._startTranslateY = o._translateY;
      o._startRotateY = o._rotationY;
      o._startWorldScale = o._worldScale;
      var focusParam = o._focusParamManager.getFocusParameter(tag);
      o._targetWorldScale = 1200;
      o._targetRotateY = focusParam.rotateY;
      o._targetTranslateY = focusParam.translateY;
      o._startTick = MO.Timer.current();
      o._earthMoving = true;
      o._autoRotate = false;
   }
   var rotateIndex = message.indexOf('rotate');
   if (rotateIndex != -1) {
      var rotate = o._remoteRotate;
      rotate.parse(message.substr(rotateIndex + 7));
      o._rotationX = rotate.x;
      o._rotationY = rotate.y;
   }
}
MO.FEaiChartShow1019Scene_onOrganizationFetch = function FEaiChartShow1019Scene_onOrganizationFetch(event) {
   var o = this;
   var mapEntity = o._mapEntity;
   var info = o._organizationInfo;
   info.unserializeSignBuffer(event.sign, event.content, true);
   o._countryTable.setUnits(info._department2s);
   var countryUnits = o._countryUnits;
   var department4s = info._department4s;
   countryUnits.clear();
   for (var i = 0; i < 20; i++) {
      countryUnits.push(department4s.at(i));
   }
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var cityModule = entityConsole.cityModule();
   var citys = info.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var card = city.card();
      var cityEntity = cityModule.findByCard(card);
      if(cityEntity){
         cityEntity.update(city);
      }
   }
   mapEntity.upload();
}
MO.FEaiChartShow1019Scene_onOperationVisibility = function FEaiChartShow1019Scene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}
MO.FEaiChartShow1019Scene_onProcessReady = function FEaiChartShow1019Scene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._mapEntity.showWorld();
   var countryEntity = o._countryEntity;
   countryEntity.start();
   o._mapEntity.showCountry(countryEntity);
   o._mapEntity.showCity();
}
MO.FEaiChartShow1019Scene_onProcess = function FEaiChartShow1019Scene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing) {
      if (!o._mapReady) {
         o._guiManager.show();
         o._southSea.setVisible(false);
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      if (o._organizationDataTicker.process()) {
         MO.Console.find(MO.FEaiLogicConsole).statistics().department().doOrganization(o, o.onOrganizationFetch, 2);
      }
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity.cityRangeRenderable().matrix());
      o.fixMatrix(mapEntity.cityCenterRenderable().matrix());
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
      mapEntity.process();
   }
}
MO.FEaiChartShow1019Scene_onOperationDown = function FEaiChartShow1019Scene_onOperationDown(event) {
   var o = this;
   o._opMouseDown = true;
   if (o._showingMktInfo) {
      return;
   }
   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}
MO.FEaiChartShow1019Scene_onOperationMove = function FEaiChartShow1019Scene_onOperationMove(event) {
   var o = this;
   if (o._opMouseDown) {
      var cx = event.x - o._operationPoint.x;
      if (Math.abs(cx) > o.__opMouseMoveThreshold) {
         o._autoRotate = false;
         o._operationMoved = true;
         var cx = event.x - o._operationPoint.x;
         o._rotationY = o._operationRotationY - cx * 0.002;
      }
   }
}
MO.FEaiChartShow1019Scene_onOperationUp = function FEaiChartShow1019Scene_onOperationUp(event) {
   var o = this;
   o._opMouseDown = false;
   if (o._showingMktInfo) {
      o._showingMktInfo = false;
      var mktInfoDiv = document.getElementById('id_marketer_info');
      mktInfoDiv.style.display = 'none';
      return;
   }
   if (!o._operationMoved) {
      var canvas3d = o.application().desktop().canvas3d();
      var region = o.activeStage().region();
      var camera = region.camera();
      var selectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FG3dSelectTechnique);
      var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
      if (renderable) {
         var eaiSelectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FEaiSelectTechnique);
         var countryRenderable = eaiSelectTechnique.test(region, renderable, event.offsetX, event.offsetY);
         if (countryRenderable) {
            o._startTranslateY = o._translateY;
            o._startRotateY = o._rotationY;
            o._startWorldScale = o._worldScale;
            var entity = countryRenderable._shape._entity;
            if(MO.Class.isClass(entity, MO.FEaiCountry3dEntity)){
               var countryEntity = entity;
               o._targetWorldScale = 1200;
               if (countryEntity.code() == 'China') {
                  o._showChina = true;
               }
               else {
                  o._countryEntity._borderShape.setVisible(false);
                  o._countryEntity._faceShape.setVisible(false);
                  var provinceTable = o._provinceTable;
                  provinceTable.setTitle('大陆地区公司列表');
                  provinceTable.setUnits(o._countryUnits);
                  provinceTable.dirty();
                  provinceTable.setVisible(false);
                  o._countryTable.setVisible(true);
               }
            }else if(MO.Class.isClass(entity, MO.FEaiProvince3dEntity)){
               var provinceEntity = entity;
               o._targetWorldScale = 3000;
               var res = provinceEntity.resource();
               var pCode = res.code();
               if (pCode == o._selectedProvinceCode) {
                  var mktInfoDiv = document.getElementById('id_marketer_info');
                  mktInfoDiv.style.display = '';
                  o._showingMktInfo = true;
               }
               else {
                  o._selectedProvinceCode = pCode;
               }
               var provinceTable = o._provinceTable;
               provinceTable.setTitle(res.label() + '地区分公司列表');
               var department4s =  o._organizationInfo._department4s;
               var count = department4s.count();
               var provinceUnits = o._provinceUnits;
               provinceUnits.clear();
               for (var i = 0; i < count ; i++) {
                  var unit = department4s.at(i);
                  if (unit.provinceCode() == pCode) {
                     provinceUnits.push(unit);
                     if (provinceUnits.count() > 26) {
                        break;
                     }
                  }
               }
               provinceTable.setUnits(provinceUnits);
               provinceTable.dirty();
            }else{
            }
            var outline2d = entity.outline2();
            o._targetRotateY = Math.PI - outline2d.center.x / 180 * Math.PI;
            o._targetTranslateY = -o._targetWorldScale * 1.5 * (outline2d.center.y / 90);
            o._startTick = MO.Timer.current();
            o._earthMoving = true;
            o._autoRotate = false;
         }
      }
      else {
         o._startTranslateY = o._translateY;
         o._startRotateY = o._rotationY;
         o._startWorldScale = o._worldScale;
         o._targetTranslateY = 0
         o._targetRotateY = o._rotationY;
         o._targetWorldScale = 500;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = true;
         o._countryEntity._borderShape.setVisible(false);
         o._countryEntity._faceShape.setVisible(false);
         var provinceTable = o._provinceTable;
         provinceTable.setTitle('大陆地区公司列表');
         provinceTable.setUnits(o._countryUnits);
         provinceTable.dirty();
         provinceTable.setVisible(false);
         o._countryTable.setVisible(true);
      }
   }
   o._operationMoved = false;
}
MO.FEaiChartShow1019Scene_onOperationWheel = function FEaiChartShow1019Scene_onOperationWheel(event) {
   var o = this;
   var delta = event.deltaY
   if (delta > 0) {
      o._worldScale /= 1.05;
   } else if (delta < 0) {
      o._worldScale *= 1.05;
   }
}
MO.FEaiChartShow1019Scene_onSwitchProcess = function FEaiChartShow1019Scene_onSwitchProcess(event) {
   var o = this;
}
MO.FEaiChartShow1019Scene_onSwitchComplete = function FEaiChartShow1019Scene_onSwitchComplete(event) {
   var o = this;
}
MO.FEaiChartShow1019Scene_construct = function FEaiChartShow1019Scene_construct() {
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._operationPoint = new MO.SPoint2();
   o._organizationDataTicker = new MO.TTicker(1000 * 60);
   o._organizationInfo = MO.Class.create(MO.FEaiChartMktManageInfo);
   o._cameraFrom = new MO.SPoint3();
   o._cameraTo = new MO.SPoint3();
   o._ccDirection = new MO.SVector3();
   o._facePosition = new MO.SPoint3();
   o._provinceUnits = new MO.TObjects();
   o._countryUnits = new MO.TObjects();
   o._remoteRotate = new MO.SValue2();
}
MO.FEaiChartShow1019Scene_setup = function FEaiChartShow1019Scene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   var countryTable = o._countryTable = MO.Class.create(MO.FEaiChartMktManageCountryTable);
   countryTable.setName('countryTable');
   countryTable.linkGraphicContext(o);
   countryTable.setup();
   countryTable.build();
   o._guiManager.register(countryTable);
   var provinceTable = o._provinceTable = MO.Class.create(MO.FEaiChartMktManageProvinceTable);
   provinceTable.setName('provinceTable');
   provinceTable.linkGraphicContext(o);
   provinceTable.setup();
   provinceTable.build();
   provinceTable.setVisible(false);
   o._guiManager.register(provinceTable);
   o._guiManager.hide();
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -5000);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(10000);
   projection.update();
   var region = o._activeStage.region();
   region.selectCamera(camera);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var worldEntity = o._worldEntity = entityConsole.mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
   entityConsole.cityModule().build(o, MO.FEaiCity3dEntity);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry, MO.FEaiCountry3dEntity);
   countryEntity._borderShape.setVisible(false);
   countryEntity._faceShape.setVisible(false);
   o._readyLoader.push(countryEntity);
   var socket = o._socket;
   socket = MO.Class.create(MO.FSocket);
   socket.connect('ws://127.0.0.1:9080/earth');
   socket.addReceiveListener(o, o.onSocketReceived);
   var focusParamManager = o._focusParamManager = MO.Class.create(MO.FEaiShowFocusParameterManager);
   focusParamManager.setup();
}
MO.FEaiChartShow1019Scene_showFace = function FEaiChartShow1019Scene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   o.processResize();
}
MO.FEaiChartShow1019Scene_fixMatrix = function FEaiChartShow1019Scene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical();
   if (o._earthMoving) {
      var tickPassed = MO.Timer.current() - o._startTick;
      var rate = tickPassed / o.__moveEarthDuration;
      if (rate > 1) {
         rate = 1;
         o._earthMoving = false;
         if (o._showChina) {
            o._countryEntity._borderShape.setVisible(true);
            o._countryEntity._faceShape.setVisible(true);
            o._provinceTable.setVisible(true);
            o._countryTable.setVisible(false);
            o._provinceTable.dirty();
            o._showChina = false;
         }
      }
      o._translateY = o._startTranslateY + (o._targetTranslateY - o._startTranslateY) * rate;
      o._rotationY = o._startRotateY + (o._targetRotateY - o._startRotateY) * rate;
      o._worldScale = o._startWorldScale + (o._targetWorldScale - o._startWorldScale) * rate;
   }
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -320;
      matrix.ty = o._translateY;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);
   }
   matrix.update();
   if (o._autoRotate) {
      o._rotationY += 0.001;
      if (o._rotationY > Math.PI * 2) {
         o._rotationY = 0;
      }
   }
}
MO.FEaiChartShow1019Scene_processResize = function FEaiChartShow1019Scene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   var countryTable = o._countryTable;
   if(isVertical){
      countryTable.setDockCd(MO.EUiDock.Bottom);
      countryTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      countryTable.setLeft(10);
      countryTable.setRight(10);
      countryTable.setBottom(10);
      countryTable.setWidth(1060);
      countryTable.setHeight(900);
   }else{
      countryTable.setDockCd(MO.EUiDock.Right);
      countryTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      countryTable.setTop(10);
      countryTable.setRight(0);
      countryTable.setBottom(10);
      countryTable.setWidth(750);
   }
   var provinceTable = o._provinceTable;
   if (isVertical) {
      provinceTable.setDockCd(MO.EUiDock.Bottom);
      provinceTable.setAnchorCd(MO.EUiAnchor.All);
      provinceTable.setLeft(10);
      provinceTable.setRight(10);
      provinceTable.setBottom(10);
      provinceTable.setWidth(1060);
      provinceTable.setHeight(900);
   } else {
      provinceTable.setDockCd(MO.EUiDock.Right);
      provinceTable.setAnchorCd(MO.EUiAnchor.All);
      provinceTable.setTop(10);
      provinceTable.setRight(0);
      provinceTable.setBottom(10);
      provinceTable.setWidth(750);
   }
}
MO.FEaiShowFocusParameterManager = function FEaiShowFocusParameterManager(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   o._dict = null;
   o.getFocusParameter = MO.FEaiShowFocusParameterManager_getFocusParameter;
   o.construct = MO.FEaiShowFocusParameterManager_construct;
   o.setup = MO.FEaiShowFocusParameterManager_setup;
   o.dispose = MO.FEaiShowFocusParameterManager_dispose;
   return o;
}
MO.FEaiShowFocusParameterManager_construct = function FEaiShowFocusParameterManager_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o._dict = new MO.TDictionary();
}
MO.FEaiShowFocusParameterManager_setup = function FEaiShowFocusParameterManager_setup() {
   var o = this;
   var dict = o._dict;
   dict.set('china', new MO.SShowFocusParameter(1.8182811571558428, -717.7387619018555));
}
MO.FEaiShowFocusParameterManager_getFocusParameter = function FEaiShowFocusParameterManager_getFocusParameter(key) {
   var o = this;
   return o._dict.get(key);
}
MO.FEaiShowFocusParameterManager_dispose = function FEaiShowFocusParameterManager_dispose() {
   var o = this;
   o._dict = MO.Lang.Object.dispose(o._dict);
}
