//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartMktManageScene = function FEaiChartMktManageScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code                    = MO.EEaiScene.ChartWorld;
   o._optionMapCity3d         = true;
   // @attribute
   o._mapReady                = false;
   o._playing                 = false;
   // @attribute
   o._statusStart             = false;
   o._statusLayerCount        = 100;
   o._statusLayerLevel        = 100;
   // @attribute
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
   // hack
   o._showingMktInfo          = false;
   // @attribute
   o._countryTable            = null;
   o._provinceTable           = null;
   o._selectedProvinceCode    = 0;
   o._provinceUnits           = null;
   o._countryUnits            = null;
   // @attribute
   o._worldScale              = 300;
   o._startWorldScale         = 500;
   o._targetWorldScale        = 500;
   o._cameraFrom              = null;
   o._cameraTo                = null;
   o._cameraDirection         = null;
   o._ccDirection             = null;
   o._facePosition            = null;
   // @attribute
   o._organizationDataTicker  = null;
   o._organizationInfo        = null;
   //..........................................................
   // @event
   o.onOrganizationFetch      = MO.FEaiChartMktManageScene_onOrganizationFetch;
   // @event
   o.onOperationDown          = MO.FEaiChartMktManageScene_onOperationDown;
   o.onOperationMove          = MO.FEaiChartMktManageScene_onOperationMove;
   o.onOperationUp            = MO.FEaiChartMktManageScene_onOperationUp;
   o.onOperationWheel         = MO.FEaiChartMktManageScene_onOperationWheel;
   // @event
   o.onOperationVisibility    = MO.FEaiChartMktManageScene_onOperationVisibility;
   o.onProcessReady           = MO.FEaiChartMktManageScene_onProcessReady;
   o.onProcess                = MO.FEaiChartMktManageScene_onProcess;
   o.onSwitchProcess          = MO.FEaiChartMktManageScene_onSwitchProcess;
   o.onSwitchComplete         = MO.FEaiChartMktManageScene_onSwitchComplete;
   //..........................................................
   // @method
   o.construct                = MO.FEaiChartMktManageScene_construct;
   o.setup                    = MO.FEaiChartMktManageScene_setup;
   o.showFace                 = MO.FEaiChartMktManageScene_showFace;
   o.fixMatrix                = MO.FEaiChartMktManageScene_fixMatrix;
   // @method
   o.processResize            = MO.FEaiChartMktManageScene_processResize;
   return o;
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOrganizationFetch = function FEaiChartMktManageScene_onOrganizationFetch(event) {
   var o = this;
   var mapEntity = o._mapEntity;
   // 读取数据
   var info = o._organizationInfo;
   info.unserializeSignBuffer(event.sign, event.content, true);
   o._countryTable.setUnits(info._department2s);
   // 设置前20数据
   var countryUnits = o._countryUnits;
   var department4s = info._department4s;
   countryUnits.clear();
   for (var i = 0; i < 20; i++) {
      countryUnits.push(department4s.at(i));
   }
   // 设置城市数据
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

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOperationVisibility = function FEaiChartMktManageScene_onOperationVisibility(event) {
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

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_onProcessReady = function FEaiChartMktManageScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   // 显示地图
   o._mapEntity.showWorld();
   // 显示国家
   var countryEntity = o._countryEntity;
   countryEntity.start();
   o._mapEntity.showCountry(countryEntity);
   // 显示城市
   o._mapEntity.showCity();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_onProcess = function FEaiChartMktManageScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   // 检测首次播放
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
         // 加载完成
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   // 重复播放
   if (o._playing) {
      // 显示界面
      if (!o._mapReady) {
         o._guiManager.show();
         o._southSea.setVisible(false);
         // 淡出显示界面
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      //..........................................................
      // 刷新组织数据
      if (o._organizationDataTicker.process()) {
         MO.Console.find(MO.FEaiLogicConsole).statistics().department().doOrganization(o, o.onOrganizationFetch, 2);
      }
      //..........................................................
      // 计算形状
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity.cityRangeRenderable().matrix());
      o.fixMatrix(mapEntity.cityCenterRenderable().matrix());
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
      mapEntity.process();
   }
}

//==========================================================
// <T>操作落下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOperationDown = function FEaiChartMktManageScene_onOperationDown(event) {
   var o = this;
   o._opMouseDown = true;

   // hack
   if (o._showingMktInfo) {
      return;
   }

   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}

//==========================================================
// <T>操作移动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOperationMove = function FEaiChartMktManageScene_onOperationMove(event) {
   var o = this;
   if (o._opMouseDown) {
      var cx = event.x - o._operationPoint.x;
      if (Math.abs(cx) > o.__opMouseMoveThreshold) {
         o._autoRotate = false;
         o._operationMoved = true;
         var cx = event.x - o._operationPoint.x;
         //var cy = event.y - o._operationPoint.y;
         //o._rotationX = o._operationRotationX - cy * 0.001;
         o._rotationY = o._operationRotationY - cx * 0.002;
      }
   }
}

//==========================================================
// <T>操作抬起处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOperationUp = function FEaiChartMktManageScene_onOperationUp(event) {
   var o = this;
   o._opMouseDown = false;
   // hack
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
      //得到当前鼠标指向的对象
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
               // hack
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
            

            //var mapEntity = o._mapEntity;
            //var faceMatrix = mapEntity.countryFaceDisplay().matrix();
            //var borderMatrix = mapEntity.countryBorderDisplay().matrix();
            //faceMatrix.ty = -o._worldScale * (outline2d.center.y / 90);
            //faceMatrix.updateForce();
            //borderMatrix.ty = 
            //borderMatrix.updateForce();


            //console.log('Select countty: ' + countryEntity.code() + ' - ' + outline + ' - ' + countryOutline);
            //var outline = renderable._shape.calculateOutline();
            //var countryOutline = countryEntity.calculateOutline();
            //var ccDirection = o._ccDirection;
            //ccDirection.assign(countryRenderable.center);
            //ccDirection.normalize();


            //var rotationAxis = new MO.SVector3(0,1,0);
            //rotationAxis.cross(ccDirection);
            //rotationAngle = Math.Acos(DotProduct(vectorBefore, ccDirection) / Normalize(vectorBefore) / Normalize(ccDirection));
            //rotationMatrix = RotationMatrix(rotationAngle, rotationAxis);


            //var cc = ccDirection.conjugate();
            //faceMatrix.rx = cc.x;
            //faceMatrix.ry = cc.y;
            //faceMatrix.rz = cc.z;
            //faceMatrix.updateForce();
            //borderMatrix.rx = cc.x;
            //borderMatrix.ry = cc.y;
            //borderMatrix.rz = cc.z;
            //borderMatrix.updateForce();
            ////var mapEntity = o._mapEntity;
            ////o._optionRotation = false;
            ////o._rotationY = 0;
            ////var faceMatrix = mapEntity.countryFaceDisplay().matrix()
            ////var borderMatrix = mapEntity.countryBorderDisplay().matrix()
            ////var facePosition = o._facePosition;
            ////facePosition.set(faceMatrix.tx, faceMatrix.ty, faceMatrix.tz);
            ////// 计算摄像机目标位置
            ////var cameraTo = o._cameraTo;
            //////var relativeOutline = new MO.SOutline3d();
            //////relativeOutline.calculateFrom(countryOutline, camera.matrix());
            //////var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
            ////o._worldScale = 800;
            ////var distance = 100;
            ////cameraTo.x = facePosition.x + ccDirection.x * distance;
            ////cameraTo.y = facePosition.y + ccDirection.y * distance;
            ////cameraTo.z = facePosition.z + ccDirection.z * distance;
            ////// 记录摄像机起始位置
            ////o._cameraFrom.assign(camera.position());

            ////camera.setPosition(cameraTo.x, cameraTo.y, cameraTo.z);
            ////camera.lookAt(facePosition.x, facePosition.y, facePosition.z);
            ////camera.update();
         }
      }
      else {
         o._startTranslateY = o._translateY;
         o._startRotateY = o._rotationY % (Math.PI * 2);
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

//==========================================================
// <T>操作卷动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOperationWheel = function FEaiChartMktManageScene_onOperationWheel(event) {
   var o = this;
   var delta = event.deltaY
   if (delta > 0) {
      o._worldScale /= 1.05;
   } else if (delta < 0) {
      o._worldScale *= 1.05;
   }
}

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onSwitchProcess = function FEaiChartMktManageScene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onSwitchComplete = function FEaiChartMktManageScene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_construct = function FEaiChartMktManageScene_construct() {
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   // 设置属性
   o._operationPoint = new MO.SPoint2();
   // 定时获取数据
   o._organizationDataTicker = new MO.TTicker(1000 * 60);
   o._organizationInfo = MO.Class.create(MO.FEaiChartMktManageInfo);

   o._cameraFrom = new MO.SPoint3();
   o._cameraTo = new MO.SPoint3();
   o._ccDirection = new MO.SVector3();
   o._facePosition = new MO.SPoint3();

   o._provinceUnits = new MO.TObjects();
   o._countryUnits = new MO.TObjects();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_setup = function FEaiChartMktManageScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 全国各省分公司数、理财师数表
   var countryTable = o._countryTable = MO.Class.create(MO.FEaiChartMktManageCountryTable);
   countryTable.setName('countryTable');
   countryTable.linkGraphicContext(o);
   countryTable.setup();
   countryTable.build();
   o._guiManager.register(countryTable);
   // 省内各分公司、理财师数表
   var provinceTable = o._provinceTable = MO.Class.create(MO.FEaiChartMktManageProvinceTable);
   provinceTable.setName('provinceTable');
   provinceTable.linkGraphicContext(o);
   provinceTable.setup();
   provinceTable.build();
   provinceTable.setVisible(false);
   o._guiManager.register(provinceTable);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   // 创建相机
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -5000);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(10000);
   projection.update();
   // 设置相机
   var region = o._activeStage.region();
   region.selectCamera(camera);
   //..........................................................
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 加载世界数据
   var worldEntity = o._worldEntity = entityConsole.mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
   // 建立城市实体
   entityConsole.cityModule().build(o, MO.FEaiCity3dEntity);
   // 加载国家数据
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry, MO.FEaiCountry3dEntity);
   countryEntity._borderShape.setVisible(false);
   countryEntity._faceShape.setVisible(false);
   o._readyLoader.push(countryEntity);
}

//==========================================================
// <T>显示表面处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_showFace = function FEaiChartMktManageScene_showFace() {
   var o = this;
   // 设置状态
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   // 重置数据
   o._mapEntity.reset();
   // 改变大小
   o.processResize();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_fixMatrix = function FEaiChartMktManageScene_fixMatrix(matrix) {
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
      //matrix.setScale(2, 2, 2);
   }
   matrix.update();
   //..........................................................
   if (o._autoRotate) {
      o._rotationY += 0.001;
   }
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_processResize = function FEaiChartMktManageScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   //..........................................................
   // 设置表格
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
