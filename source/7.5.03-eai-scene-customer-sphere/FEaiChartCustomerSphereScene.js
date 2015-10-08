//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartCustomerSphereScene = function FEaiChartCustomerSphereScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code                   = MO.EEaiScene.ChartCustomerSphere;
   // @attribute
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   // @attribute
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   // @attribute
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._earthSphere            = null;
   o._mouseDownPosition      = new MO.SVector3();
   o._mouseMovePosition      = new MO.SVector3();
   //..........................................................
   // @event
   o.onSocketReceived        = MO.FEaiChartCustomerSphereScene_onSocketReceived;
   o.onInvestmentDataChanged = MO.FEaiChartCustomerSphereScene_onInvestmentDataChanged;
   o.on24HDataChanged        = MO.FEaiChartCustomerSphereScene_on24HDataChanged;
   o.onOperationVisibility   = MO.FEaiChartCustomerSphereScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartCustomerSphereScene_onProcessReady;
   o.onProcessInput          = MO.FEaiChartCustomerSphereScene_onProcessInput;
   o.onProcess               = MO.FEaiChartCustomerSphereScene_onProcess;
   o.onSwitchProcess         = MO.FEaiChartCustomerSphereScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartCustomerSphereScene_onSwitchComplete;
   //..........................................................
   // @method
   o.construct               = MO.FEaiChartCustomerSphereScene_construct;
   // @method
   o.setup                   = MO.FEaiChartCustomerSphereScene_setup;
   o.showFace                = MO.FEaiChartCustomerSphereScene_showFace;
   o.fixMatrix               = MO.FEaiChartCustomerSphereScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartCustomerSphereScene_processResize;
   return o;
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_onSocketReceived = function FEaiChartCustomerSphereScene_onSocketReceived(event) {
   var o = this;
   var message = event.message;
   var info = o._info;
   info.unserializeBuffer(message, true);
   var downPosition = o._mouseDownPosition;
   var movePosition = o._mouseMovePosition;
   var earthMatrix = o._earthMatrix;
   //var rotationMatrix = o._rotationMatrix.assign(o._earthSphere.matrix());
   //rotationMatrix.invert();
   // 判断类型
   var typeCode = info.typeCode();
   if(typeCode == 'D'){
      var position = info.points().first();
      var cx = (position.x() - 0.5) * 2;
      var cy = -(position.y() - 0.5) * 2;
      var length = o._lengthStart = Math.sqrt(cx * cx + cy * cy);
      downPosition.x = cx;
      downPosition.y = cy;
      downPosition.z = -Math.sin(Math.acos(Math.min(length, 1)));
      downPosition.normalize();
      console.log('Down: ' + length + ' - ' + cx + ',' + cy + ' - ' + downPosition.toDisplay());
      earthMatrix.assign(o._earthSphere.matrix());
      o._moving = true;
   }else if(typeCode == 'M' && o._moving){
      var position = info.points().first();
      var cx = (position.x() - 0.5) * 2;
      var cy = -(position.y() - 0.5) * 2;
      var length = Math.sqrt(cx * cx + cy * cy);
      movePosition.x = cx;
      movePosition.y = cy;
      movePosition.z = -Math.sin(Math.acos(Math.min(length, 1)));
      movePosition.normalize();
      var axis = new MO.SVector3();
      axis.assign(downPosition);
      axis.cross(movePosition);
      axis.normalize();
      var angle = Math.acos(downPosition.dotPoint3(movePosition)) * (0.5 / 0.29);
      var matrix = o._earthSphere.matrix();
      matrix.assign(earthMatrix);
      if(o._lengthStart > 10){
         axis.assign(MO.Lang.Math.vectorAxisZ);
         axis.cross(movePosition);
         axis.normalize();
         var cl = length - o._lengthStart;
         matrix.addRotationAxis(axis, cl);
         
         var p1 = new MO.SVector3(downPosition.x, downPosition.y, 0);
         p1.normalize();
         var p2 = new MO.SVector3(movePosition.x, movePosition.y, 0);
         p2.normalize();
         axis.assign(p1);
         axis.cross(p2);
         axis.normalize();
         matrix.addRotationAxis(axis, -angle);
         //axis = MO.Lang.Math.vectorAxisZ;
         //if(axis.x < 0){
         //   angle = -angle;
         //}
      }else{
         matrix.addRotationAxis(axis, -angle);
      }
      console.log('Move: ' + length + ' - ' + cx + ',' + cy + ' - ' + movePosition.toDisplay() + '(' + axis.toDisplay() + ')' + angle);
      matrix.parse();
   }else if(typeCode == 'U'){
      o._moving = false;
   }
}

//==========================================================
// <T>24小时曲线数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_on24HDataChanged = function FEaiChartCustomerSphereScene_on24HDataChanged(event) {
   var o = this;
   // 设置表格数据
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   timeline.dirty();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_onInvestmentDataChanged = function FEaiChartCustomerSphereScene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   // 设置表格数据
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_onOperationVisibility = function FEaiChartCustomerSphereScene_onOperationVisibility(event) {
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
MO.FEaiChartCustomerSphereScene_onProcessReady = function FEaiChartCustomerSphereScene_onProcessReady(){
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   // 显示地图
   //o._mapEntity.showWorld();
   // 显示城市
   var desktop = o._application.desktop();
   var canvas2d = desktop.canvas2d();
   var context2d = canvas2d.graphicContext();
   var worldResource = o._worldResource;
   //o._guiManager.setValid(false);
   context2d.fillRectangle(100, 100, 200, 200, '#FFFFFF');
   //o._mapEntity.showCity();
}

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereScene_onProcessInput = function FEaiChartCustomerSphereScene_onProcessInput(){
   var o = this;
   var directionSpeed = 0.02;
   var earthSphere = o._earthSphere;
   var matrix = earthSphere.matrix();
   // 横向旋转
   var matrix = o._earthSphere.matrix();
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.A)){
      //matrix.ry += directionSpeed;
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.D)){
      //matrix.ry -= directionSpeed;
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, directionSpeed);
      matrix.parse();
   }
   // 纵向旋转
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.W)){
      //matrix.rz += directionSpeed;
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisX, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.S)){
      //matrix.rz -= directionSpeed;
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisX, directionSpeed);
      matrix.parse();
   }
   // 纵向旋转
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.Q)){
      //matrix.rz += directionSpeed;
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisZ, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.E)){
      //matrix.rz -= directionSpeed;
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisZ, directionSpeed);
      matrix.parse();
   }
   //matrix.updateForce();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereScene_onProcess = function FEaiChartCustomerSphereScene_onProcess(){
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
         var countryEntity = o._countryEntity;
         countryEntity.start();
         //o._mapEntity.showCountry(countryEntity);
         //o._guiManager.show();
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   // 重复播放
   if (o._playing) {
      // 播放地图
      var countryEntity = o._countryEntity;
      if (!countryEntity.introAnimeDone()) {
         countryEntity.process();
         //return;
      }
      // 显示界面
      if (!o._mapReady) {
         //o._guiManager.show();
         // 淡出显示界面
         //var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         //alphaAction.setAlphaBegin(0);
         //alphaAction.setAlphaEnd(1);
         //alphaAction.setAlphaInterval(0.01);
         //alphaAction.push(o._guiManager);
         //o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      //..........................................................
      // 键盘处理
      o.onProcessInput();
      //..........................................................
      // 投资处理
      // o._processor.process();
      //..........................................................
      // 设置数据
      var logoBar = o._logoBar;
      // 获取所有信息
      var processor = o._processor;
      if(processor.invementDayCurrent() > 0){
         // 投资总金额
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
         // 日投资金额
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      //..........................................................
      // 更新时间
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
   }
}

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_onSwitchProcess = function FEaiChartCustomerSphereScene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_onSwitchComplete = function FEaiChartCustomerSphereScene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereScene_construct = function FEaiChartCustomerSphereScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   // 设置属性
   o._rotationMatrix = new MO.SMatrix3d();
   o._earthMatrix = new MO.SMatrix3d();
   o._info = MO.Class.create(MO.FEaiChartCustomerSphereInfo);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereScene_setup = function FEaiChartCustomerSphereScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var application = o._application;
   var desktop = application.desktop();
   var canvas3d = desktop.canvas3d();
   var context3d = canvas3d.graphicContext();
   var stage = o._activeStage;
   //..........................................................
   // 创建地球平面
   var earthFlat = o._earthFlat = MO.Class.create(MO.FEaiEarthFlat);
   earthFlat.linkGraphicContext(context3d);
   earthFlat.setup();
   var groundLayer = stage.groundLayer();
   groundLayer.push(earthFlat);
   //..........................................................
   // 创建地球
   var earthSphere = o._earthSphere = MO.Class.create(MO.FEaiEarthSphere);
   earthSphere.linkGraphicContext(context3d);
   earthSphere.setSplitCount(64);
   //sphere.setDrawModeCd(MO.EG3dDrawMode.Lines);
   earthSphere.setup();
   //earthSphere.matrix().rx = Math.PI / 2;
   earthSphere.matrix().setScaleAll(200);
   earthSphere.matrix().update();
   //earthSphere.material().info().optionDouble = true;
   // 设置技术
   var technique = stage.selectTechnique(o, MO.FE3dSphereTechnique);
   var passView = technique.passView();
   passView.setSphere(earthSphere);
   //..........................................................
   // 创建相机
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -500);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.size().assign(context3d.size());
   projection.setZnear(-1000);
   projection.setZfar(1000);
   projection.update();
   // 设置相机
   stage.region().selectCamera(camera);
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   //..........................................................
   var dataLayer = stage.dataLayer();
   // 创建投资数据
   var invement = o._processor = MO.Class.create(MO.FEaiChartMktCustomerProcessor);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   //..........................................................
   // 创建时间轴
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartCustomerSphereTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartCustomerSphereTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 建立城市实体
   entityConsole.cityModule().build(o);
   // 加载世界数据
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
   // 注册socket监听
   var socket = o._socket;
   socket = MO.Class.create(MO.FBinarySocket);
   //socket.connect('ws://10.21.1.171:9080/earth');
   socket.connect('ws://127.0.0.1:9080/earth');
   socket.addReceiveListener(o, o.onSocketReceived);
   //..........................................................
   // 加载资源
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   var worldResource = o._worldResource = resourceConsole.mapModule().loadWorld();
   o._readyLoader.push(worldResource);
   //..........................................................
   // 加载实体
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var worldEntity = o._worldEntity = entityConsole.mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
}

//==========================================================
// <T>显示表面处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereScene_showFace = function FEaiChartCustomerSphereScene_showFace() {
   var o = this;
   // 设置状态
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   // 重置数据
   o._mapEntity.reset();
   // 显示画板
   var desktop = o._application.desktop();
   desktop.show();
   // 改变大小
   o.processResize();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereScene_fixMatrix = function FEaiChartCustomerSphereScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      //matrix.tx = -34.9;
      //matrix.ty = -10.9;
      //matrix.tz = 0;
      //matrix.setScale(0.28, 0.31, 0.28);
      matrix.setScale(100, 100, 100);
   }
   matrix.update();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_processResize = function FEaiChartCustomerSphereScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
      // 重新设置矩阵
   o.fixMatrix(o._processor.display().matrix());
   //..........................................................
   // 设置大小
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   //..........................................................
   // 设置南海
   var control = o._southSea;
   if (isVertical) {
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(280);
   }
   //..........................................................
   // 设置时间轴
   var timeline = o._timeline;
   if (isVertical) {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   } else {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(780);
      timeline.setHeight(250);
   }
   //..........................................................
   // 设置表格
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(760);
   }
}