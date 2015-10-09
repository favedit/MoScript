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
   o._optionMapCountry       = false;
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
   o._mouseDownPosition      = null;
   o._mouseDownDirection     = null;
   o._mouseDownLocation      = null;
   o._mouseMovePosition      = null;
   o._mouseMoveDirection     = null;
   o._mouseMoveLocation      = null;
   //..........................................................
   // @event
   o.onSocketTouchReceived   = MO.FEaiChartCustomerSphereScene_onSocketTouchReceived;
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
   o.calculateDirection      = MO.FEaiChartCustomerSphereScene_calculateDirection;
   o.fixMatrix               = MO.FEaiChartCustomerSphereScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartCustomerSphereScene_processResize;
   // @method
   o.dispose                 = MO.FEaiChartCustomerSphereScene_dispose;
   return o;
}

//==========================================================
// <T>计算点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_calculateDirection = function FEaiChartCustomerSphereScene_calculateDirection(position, direction, location) {
   // 计算数据
   var cx = (location.x() - 0.5) * 2;
   var cy = -(location.y() - 0.5) * 2;
   var length = Math.min(Math.sqrt(cx * cx + cy * cy), 1);
   // 设置位置
   position.x = cx;
   position.y = cy;
   // 设置方向
   direction.x = cx;
   direction.y = cy;
   direction.z = -Math.sin(Math.acos(Math.min(length, 1)));
   direction.normalize();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_onSocketTouchReceived = function FEaiChartCustomerSphereScene_onSocketTouchReceived(event) {
   var o = this;
   // 获得信息
   var context = o._graphicContext;
   var size = context.size();
   var message = event.message;
   var info = o._info;
   info.unserializeBuffer(message, true);
   // 计算处理
   var downPosition = o._mouseDownPosition;
   var downDirection = o._mouseDownDirection;
   var downLocation = o._mouseDownLocation;
   var movePosition = o._mouseMovePosition;
   var moveDirection = o._mouseMoveDirection;
   var moveLocation = o._mouseMoveLocation;
   var earthSphere = o._earthSphere;
   var earthMatrix = o._earthMatrix;
   var matrix = earthSphere.matrix();
   // 判断类型
   var typeCode = info.typeCode();
   if(typeCode == 'D'){
      // 获得点击位置
      var location = info.points().first();
      o.calculateDirection(downPosition, downDirection, location);
      var length = o._lengthStart = downPosition.absolute();
      earthMatrix.assign(matrix);
      // 计算原始位置
      var rotationMatrix = o._rotationMatrix.assign(matrix);
      rotationMatrix.invert();
      rotationMatrix.transformPoint3(downDirection, downLocation);
      MO.Logger.debug(o, 'Touch down. (down={1}, direction={2}, flat={3})', downPosition.toDisplay(), downDirection.toDisplay(), downLocation.toDisplay());
      // 发送点击消息
      if(length < 128 / size.height){
         o._socketSphere.send('next');
      }
      o._moving = true;
   }else if(typeCode == 'M' && o._moving){
      // 获得点击位置
      var location = info.points().first();
      o.calculateDirection(movePosition, moveDirection, location);
      // 计算旋转轴
      var axis = new MO.SVector3();
      axis.assign(downDirection);
      axis.cross(moveDirection);
      axis.normalize();
      // 计算旋转角
      var angle = Math.acos(downDirection.dotPoint3(moveDirection)) * (0.5 / 0.29);
      matrix.assign(earthMatrix);
      if(o._lengthStart > 10){
         axis.assign(MO.Lang.Math.vectorAxisZ);
         axis.cross(moveDirection);
         axis.normalize();
         var cl = length - o._lengthStart;
         matrix.addRotationAxis(axis, cl);

         var p1 = new MO.SVector3(downDirection.x, downDirection.y, 0);
         p1.normalize();
         var p2 = new MO.SVector3(moveDirection.x, moveDirection.y, 0);
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
      matrix.parse();
      // 计算原始位置
      var rotationMatrix = o._rotationMatrix.assign(matrix);
      rotationMatrix.invert();
      rotationMatrix.transformPoint3(moveDirection, moveLocation);
      MO.Logger.debug(o, 'Touch move. (down={1}, direction={2}, flat={3})', movePosition.toDisplay(), moveDirection.toDisplay(), moveLocation.toDisplay());
      // 发送转动消息
      o._socketSphere.send('rotation=' + matrix.rx + ',' + matrix.ry + ',' + matrix.rz);
   }else if(typeCode == 'U'){
      o._moving = false;
      MO.Logger.debug(o, 'Touch up.');
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
   context2d.fillRectangle(100, 100, 200, 200, '#FFFFFF');
   // 显示界面
   o._guiManager.show();
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
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.D)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, directionSpeed);
      matrix.parse();
   }
   // 纵向旋转
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.W)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisX, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.S)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisX, directionSpeed);
      matrix.parse();
   }
   // 纵向旋转
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.Q)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisZ, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.E)){
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
   o._mouseDownPosition = new MO.SPoint2();
   o._mouseDownDirection = new MO.SVector3();
   o._mouseDownLocation = new MO.SPoint3();
   o._mouseMovePosition = new MO.SPoint2();
   o._mouseMoveDirection = new MO.SVector3();
   o._mouseMoveLocation = new MO.SPoint3();
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
   //context3d.enableDrawBuffers();
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
   earthSphere.setSplitCount(128);
   //earthSphere.setDrawModeCd(MO.EG3dDrawMode.Lines);
   earthSphere.setup();
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
   // 创建时间轴
   var stage = o.activeStage();
   var operation = o._controlOperation = MO.Class.create(MO.FEaiChartCustomerSphereOperation);
   operation.setName('Operation');
   operation.linkGraphicContext(o);
   operation.setup();
   operation.build();
   o._guiManager.register(operation);
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
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 建立城市实体
   entityConsole.cityModule().build(o);
   // 加载世界数据
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
   //..........................................................
   // 注册触摸监听
   var socket = o._socketTouch = MO.Class.create(MO.FBinarySocket);
   socket.connect('{service.touch}/touch');
   socket.addReceiveListener(o, o.onSocketTouchReceived);
   // 注册发送监听
   var socket = o._socketSphere = MO.Class.create(MO.FSocket);
   socket.connect('{service.touch}/sphere');
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
   var context = o._graphicContext;
   var size = context.size();
   // 设置时间轴
   var operation = o._controlOperation;
   operation.setWidth(256);
   operation.setHeight(256);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereScene_dispose = function FEaiChartCustomerSphereScene_dispose(){
   var o = this;
   o._rotationMatrix = MO.Lang.Object.dispose(o._rotationMatrix);
   o._earthMatrix = MO.Lang.Object.dispose(o._earthMatrix);
   o._mouseDownPosition = MO.Lang.Object.dispose(o._mouseDownPosition);
   o._mouseDownDirection = MO.Lang.Object.dispose(o._mouseDownDirection);
   o._mouseDownLocation = MO.Lang.Object.dispose(o._mouseDownLocation);
   o._mouseMovePosition = MO.Lang.Object.dispose(o._mouseMovePosition);
   o._mouseMoveDirection = MO.Lang.Object.dispose(o._mouseMoveDirection);
   o._mouseMoveLocation = MO.Lang.Object.dispose(o._mouseMoveLocation);
   o._info = MO.Lang.Object.dispose(o._info);
   // 父处理
   o.__base.FEaiChartScene.dispose.call(o);
}
