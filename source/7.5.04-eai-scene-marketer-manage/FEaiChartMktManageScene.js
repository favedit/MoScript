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
   // @attribute
   o._mapReady                = false;
   o._playing                 = false;
   // @attribute
   o._statusStart             = false;
   o._statusLayerCount        = 100;
   o._statusLayerLevel        = 100;
   // @attribute
   o._operationFlag           = false;
   o._operationPoint          = null;
   o._operationRotationX      = 0;
   o._operationRotationY      = 0;
   o._rotationX               = 0;
   o._rotationY               = 0;
   o._worldScale              = 500;

   o._countryTable            = null;
   o._provinceTable           = null;

   o._cameraFrom              = MO.Class.register(o, new MO.AGetSet('_cameraFrom'));
   o._cameraTo                = MO.Class.register(o, new MO.AGetSet('_cameraTo'));

   o._opMouseDown             = false;
   o._opMouseMoved            = false;
   o.__opMouseMoveThreshold   = 4;
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
   // 读取数据
   debugger
   var info = o._organizationInfo;
   info.unserializeSignBuffer(event.sign, event.content, true);
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
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
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
      if (cx > o.__opMouseMoveThreshold) {
         o._operationMoved = true;
         var cx = event.x - o._operationPoint.x;
         var cy = event.y - o._operationPoint.y;
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
            var countryEntity = countryRenderable._shape._countryEntity;
            //console.log('Select countty: ' + countryEntity.code() + ' - ' + outline + ' - ' + countryOutline);
            //var outline = renderable._shape.calculateOutline();
            var countryOutline = countryRenderable.calculateOutline();
            var relativeOutline = new MO.SOutline3d();
            relativeOutline.calculateFrom(countryOutline, camera.matrix());
            var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
            var currentCenter = countryOutline.center;
            var cameraTo = new MO.SPoint3(currentCenter.x - distance * camera.direction().x, currentCenter.y - distance * camera.direction().y, currentCenter.z - distance * camera.direction().z);
            var cameraPosition = camera.position();
            //o.setStartTime(new Date());
            //o.cameraFrom().assign(cameraPosition);
            //o.cameraTo().assign(cameraTo);
            camera.setPosition(cameraTo.x, cameraTo.y, cameraTo.z);
            camera.lookAt(0, 0, 0);
            camera.update();
            //o.setCameraMoving(true);
         }
         else {
            camera.position().set(0, 0, -10);
            camera.lookAt(0, 0, 0);
            camera.update();
         }
      }
      else {
         camera.position().set(0, 0, -10);
         camera.lookAt(0, 0, 0);
         camera.update();
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
   countryTable.setName('CountryTable');
   countryTable.linkGraphicContext(o);
   countryTable.setup();
   countryTable.build();
   //o._guiManager.register(countryTable);
   // 省内各分公司、理财师数表
   var provinceTable = o._provinceTable = MO.Class.create(MO.FEaiChartMktManageProvinceTable);
   provinceTable.setName('CountryTable');
   provinceTable.linkGraphicContext(o);
   provinceTable.setup();
   provinceTable.build();
   //o._guiManager.register(provinceTable);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   // 创建相机
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -500);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(1000);
   projection.update();
   // 设置相机
   var region = o._activeStage.region();
   region.selectCamera(camera);
   //..........................................................
   // 加载世界数据
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
   //MO.Console.find(MO.FEaiEntityConsole).loadWorldData();
   //MO.Console.find(MO.FEaiEntityConsole).addLoadWorldListener(o, o.onLoadWorld);
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
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -320;
      matrix.ty = 0;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);
   }
   matrix.update();
   //..........................................................
   o._rotationY += 0.001;
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
   //var liveTable = o._liveTable;
   //if(isVertical){
   //   liveTable.setDockCd(MO.EUiDock.Bottom);
   //   liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
   //   liveTable.setLeft(10);
   //   liveTable.setRight(10);
   //   liveTable.setBottom(10);
   //   liveTable.setWidth(1060);
   //   liveTable.setHeight(900);
   //}else{
   //   liveTable.setDockCd(MO.EUiDock.Right);
   //   liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
   //   liveTable.setTop(10);
   //   liveTable.setRight(0);
   //   liveTable.setBottom(10);
   //   liveTable.setWidth(650);
   //}
}
