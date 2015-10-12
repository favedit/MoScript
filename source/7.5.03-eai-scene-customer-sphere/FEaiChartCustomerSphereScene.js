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
   o._controlOperation       = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._earthSphere            = null;
   //..........................................................
   // @event
   o.onSocketTouchReceived   = MO.FEaiChartCustomerSphereScene_onSocketTouchReceived;
   // @event
   o.onOperationDown         = MO.FEaiChartCustomerSphereScene_onOperationDown;
   o.onOperationVisibility   = MO.FEaiChartCustomerSphereScene_onOperationVisibility;
   // @event
   o.onProcessReady          = MO.FEaiChartCustomerSphereScene_onProcessReady;
   o.onProcessInput          = MO.FEaiChartCustomerSphereScene_onProcessInput;
   o.onProcess               = MO.FEaiChartCustomerSphereScene_onProcess;
   //..........................................................
   // @method
   o.construct               = MO.FEaiChartCustomerSphereScene_construct;
   // @method
   o.setup                   = MO.FEaiChartCustomerSphereScene_setup;
   o.showFace                = MO.FEaiChartCustomerSphereScene_showFace;
   o.fixMatrix               = MO.FEaiChartCustomerSphereScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartCustomerSphereScene_processResize;
   // @method
   o.dispose                 = MO.FEaiChartCustomerSphereScene_dispose;
   return o;
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
   var guiManager = o._guiManager;
   var context = o._graphicContext;
   var size = context.size();
   var info = o._info;
   info.unserializeBuffer(event.message, true);
   // 计算处理
   var earthSphere = o._earthSphere;
   var matrix = earthSphere.matrix();
   var socketSphere = o._socketSphere;
   var sourceTouch = earthSphere.sourceTouch();
   var targetTouch = earthSphere.targetTouch();
   // 判断类型
   var typeCode = info.typeCode();
   if(typeCode == 'D'){
      // 检查有效性
      if(info.points().isEmpty()){
         return;
      }
      // 设置点击信息
      earthSphere.setSource(info);
      // 计算原始位置
      var rotationMatrix = o._rotationMatrix.assign(matrix);
      rotationMatrix.invert();
      sourceTouch.calculate(rotationMatrix);
      MO.Logger.debug(o, 'Touch down. ({1})', sourceTouch);
      // 发送点击消息
      var sourceTouchPoint = sourceTouch.points.first();
      var id = o._earthFlat.pickIdentify(sourceTouchPoint.mapLocation.x, sourceTouchPoint.mapLocation.y);
      if(id > 0){
         socketSphere.send('area=' + id);
         MO.Logger.debug(o, 'Select area. (id={1})', id);
         return;
      }
      if(sourceTouchPoint.originLength < (128 / size.height)){
         if(guiManager.visible()){
            if(sourceTouchPoint.originPosition.x < 0){
               earthSphere.reset();
               socketSphere.send('reset');
               guiManager.setVisible(false);
            }else{
               socketSphere.send('next');
            }
         }else{
            guiManager.setVisible(true);
         }
      }else{
         guiManager.setVisible(false);
         o._earthFlat.drawTouch(sourceTouchPoint.mapLocation.x, sourceTouchPoint.mapLocation.y);
         o._moving = true;
      }
   }else if(typeCode == 'M' && o._moving){
      // 检查有效性
      if(info.points().isEmpty()){
         return;
      }
      // 设置点击信息
      earthSphere.setTarget(info);
      //MO.Logger.debug(o, 'Touch movie. ({1})', targetTouch);
      // 发送转动消息
      earthSphere.sendRotation();
   }else if(typeCode == 'U'){
      o._moving = false;
      MO.Logger.debug(o, 'Touch up.');
   }
}

//==========================================================
// <T>操作点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartCustomerSphereScene_onOperationDown = function FEaiChartCustomerSphereScene_onOperationDown(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationDown.call(o, event);
   var earthSphere = o._earthSphere;
   // 获得偏移坐标
   var size = o._graphicContext.size();
   var cx = event.x - size.width / 2;
   var cy = event.y - size.height / 2;
   var range = Math.min(size.width, size.height) * 0.5;
   var x = MO.Lang.Float.toRange(cx / range, -1, 1);
   var y = -MO.Lang.Float.toRange(cy / range, -1, 1);
   // 获得变换矩阵
   var rotationMatrix = o._rotationMatrix.assign(earthSphere.matrix());
   rotationMatrix.invert();
   // 计算坐标
   var sourcePoint = earthSphere.sourcePoint();
   sourcePoint.calculateFlat(rotationMatrix, x, y);
   var mapLocation = sourcePoint.mapLocation;
   o._earthFlat.drawTouch(mapLocation.x, mapLocation.y);
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
   // 自动旋转
   o._earthSphere.autoRotation(true);
   // 显示界面
   o._guiManager.hide();
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
   if (o._playing){
      // 球面处理
      o._earthSphere.process();
      // 键盘处理
      o.onProcessInput();
   }
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
   var qualityCd = MO.Desktop.qualityCd();
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
   if(qualityCd == MO.EGraphicQuality.Highest){
      earthSphere.setSplitCount(128);
   }else{
      earthSphere.setSplitCount(64);
   }
   earthSphere.setup();
   earthSphere.matrix().setScaleAll(200);
   earthSphere.matrix().update();
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
   earthSphere._socket = socket;
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
   o._info = MO.Lang.Object.dispose(o._info);
   // 父处理
   o.__base.FEaiChartScene.dispose.call(o);
}
