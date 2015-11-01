MO.SEaiEarthTouch = function SEaiEarthTouch(){
   var o = this;
   o.points        = new MO.TObjects();
   o.direction     = new MO.SVector3();
   o.testDisableRectangles = MO.SEaiEarthTouch_testDisableRectangles;
   o.setInfo       = MO.SEaiEarthTouch_setInfo;
   o.calculate     = MO.SEaiEarthTouch_calculate;
   o.calculateFlat = MO.SEaiEarthTouch_calculateFlat;
   o.toString      = MO.SEaiEarthTouch_toString;
   return o;
}
MO.SEaiEarthTouch_testDisableRectangles = function SEaiEarthTouch_testDisableRectangles(rectangles, x, y){
   var o = this;
   var count = rectangles.count();
   for(var i = 0; i < count; i++){
      var rectangle = rectangles.at(i);
      if(rectangle.testRange(x , y)){
         return true;
      }
   }
   return false;
}
MO.SEaiEarthTouch_setInfo = function SEaiEarthTouch_setInfo(info, rectangles){
   var o = this;
   var infoPoints = info.points();
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      MO.Memory.free(point);
   }
   points.clear();
   var count = infoPoints.count();
   for(var i = 0; i < count; i++){
      var infoPoint = infoPoints.at(i);
      if(rectangles && o.testDisableRectangles(rectangles, infoPoint.x(), infoPoint.y())){
         continue;
      }
      var point = MO.Memory.alloc(MO.SEaiEarthTouchPoint);
      point.setInfo(infoPoint);
      points.push(point);
   }
   if(!points.isEmpty()){
      var point = points.first();
      o.direction.assign(point.direction);
   }
}
MO.SEaiEarthTouch_calculate = function SEaiEarthTouch_calculate(matrix){
   var o = this;
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      point.calculate(matrix);
   }
}
MO.SEaiEarthTouch_calculateFlat = function SEaiEarthTouch_calculateFlat(matrix){
   var o = this;
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      var position = point.position;
      point.calculateFlat(matrix, position.x, position.y);
   }
}
MO.SEaiEarthTouch_toString = function SEaiEarthTouch_toString(){
   var o = this;
   var result = new MO.TString();
   var points = o.points;
   var count = points.count();
   for(var i = 0; i < count; i++){
      var point = points.at(i);
      result.append(point.toString());
   }
   return result.toString();
}
MO.SEaiEarthTouchPoint = function SEaiEarthTouchPoint(){
   var o = this;
   o.originPosition = new MO.SPoint2();
   o.originLength    = 0;
   o.position        = new MO.SPoint2();
   o.positionLength  = 0;
   o.direction       = new MO.SVector3();
   o.sphereLocation  = new MO.SVector3();
   o.mapLocation     = new MO.SPoint2();
   o.setInfo         = MO.SEaiEarthTouchPoint_setInfo;
   o.calculate       = MO.SEaiEarthTouchPoint_calculate;
   o.calculateFlat   = MO.SEaiEarthTouchPoint_calculateFlat;
   o.calculateSphere = MO.SEaiEarthTouchPoint_calculateSphere;
   o.toString        = MO.SEaiEarthTouchPoint_toString;
   return o;
}
MO.SEaiEarthTouchPoint_setInfo = function SEaiEarthTouchPoint_setInfo(info){
   var o = this;
   var x = (info.x() - 0.5) * 2;
   var y = -(info.y() - 0.5) * 2;
   o.originPosition.set(x, y);
   o.originLength = o.originPosition.absolute();
   x *= Math.PI / 2 * 1.02;
   var length2d = MO.Lang.Float.toRange(Math.sqrt(x * x + y * y), 0, 1);
   var radius2d = Math.sin(length2d * MO.Lang.Math.PI_2);
   o.position.set(x, y);
   o.positionLength = o.position.absolute();
   var direction = o.direction;
   direction.x = x;
   direction.y = y;
   direction.z = 0;
   direction.normalize();
   direction.mul(radius2d, radius2d, radius2d);
   var length = MO.Lang.Float.toRange(Math.sqrt(direction.x * direction.x + direction.y * direction.y), 0, 1);
   direction.z = -Math.sin(Math.acos(length));
   direction.normalize();
}
MO.SEaiEarthTouchPoint_calculate = function SEaiEarthTouchPoint_calculate(matrix){
   var o = this;
   var sphereLocation = o.sphereLocation;
   matrix.transformPoint3(o.direction, sphereLocation);
   sphereLocation.normalize();
   var mapLocation = o.mapLocation;
   mapLocation.x = Math.atan2(sphereLocation.x, -sphereLocation.z) / Math.PI / 2 + 0.5;
   mapLocation.y = 0.5 - Math.asin(sphereLocation.y) / Math.PI;
}
MO.SEaiEarthTouchPoint_calculateFlat = function SEaiEarthTouchPoint_calculateFlat(matrix, x, y){
   var o = this;
   var length2d = MO.Lang.Float.toRange(Math.sqrt(x * x + y * y), 0, 1);
   var radius2d = Math.sin(length2d * MO.Lang.Math.PI_2);
   var direction = o.direction;
   direction.x = x;
   direction.y = y;
   direction.z = 0;
   direction.normalize();
   direction.mul(radius2d, radius2d, radius2d);
   var sphereLocation = o.sphereLocation;
   var length = MO.Lang.Float.toRange(Math.sqrt(direction.x * direction.x + direction.y * direction.y), 0, 1);
   direction.z = -Math.sin(Math.acos(length));
   direction.normalize();
   matrix.transformPoint3(direction, sphereLocation);
   sphereLocation.normalize();
   var mapLocation = o.mapLocation;
   mapLocation.x = Math.atan2(sphereLocation.x, -sphereLocation.z) / Math.PI / 2 + 0.5;
   mapLocation.y = 0.5 - Math.asin(sphereLocation.y) / Math.PI;
   mapLocation.mul(0.5 / 0.29, 0.5 / 0.29);
}
MO.SEaiEarthTouchPoint_calculateSphere = function SEaiEarthTouchPoint_calculateSphere(x, y){
   var size = o._graphicContext.size();
   var cx = event.x - size.width / 2;
   var cy = event.y - size.height / 2;
   var range = Math.min(size.width, size.height) * 0.5;
   var x = MO.Lang.Float.toRange(cx / range, -1, 1);
   var y = -MO.Lang.Float.toRange(cy / range, -1, 1);
   var length = MO.Lang.Float.toRange(Math.sqrt(x * x + y * y), 0, 1);
   var direction = new MO.SVector3();
   direction.x = x;
   direction.y = y;
   direction.z = -Math.sin(Math.acos(length));
   direction.normalize();
   var rotationMatrix = o._rotationMatrix.assign(o._earthSphere.matrix());
   rotationMatrix.invert();
   var sphereLocation = rotationMatrix.transformPoint3(direction);
   sphereLocation.normalize();
   var fx = Math.atan2(sphereLocation.x, -sphereLocation.z) / Math.PI / 2 + 0.5;
   var fy = 0.5 - Math.asin(sphereLocation.y) / Math.PI;
   o._earthFlat.drawTouch(fx, fy);
}
MO.SEaiEarthTouchPoint_toString = function SEaiEarthTouchPoint_toString(){
   var o = this;
   return 'P(' + o.position.toDisplay() + ') D(' + o.direction.toDisplay() + ') L(' + o.sphereLocation.toDisplay() + ') M(' + o.mapLocation.toDisplay() + ')';
}
MO.FEaiChartCustomerSphereInfo = function FEaiChartCustomerSphereInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._typeCode = MO.Class.register(o, [new MO.AGetter('_typeCode'), new MO.APersistence('_typeCode', MO.EDataType.String)]);
   o._points   = MO.Class.register(o, [new MO.AGetter('_points'), new MO.APersistence('_points', MO.EDataType.Objects, MO.FEaiChartCustomerSphereInfoPoint)]);
   return o;
}
MO.FEaiChartCustomerSphereInfoPoint = function FEaiChartCustomerSphereInfoPoint(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MPersistence);
   o._x = MO.Class.register(o, [new MO.AGetter('_x'), new MO.APersistence('_x', MO.EDataType.Float)]);
   o._y = MO.Class.register(o, [new MO.AGetter('_y'), new MO.APersistence('_y', MO.EDataType.Float)]);
   return o;
}
MO.FEaiChartCustomerSphereOperation = function FEaiChartCustomerSphereOperation(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   o._imageButton   = null;
   o._buttonVisible = MO.Class.register(o, new MO.AGetter('_buttonVisible'), false);
   o.onImageLoad  = MO.FEaiChartCustomerSphereOperation_onImageLoad;
   o.onPaintBegin = MO.FEaiChartCustomerSphereOperation_onPaintBegin;
   o.construct    = MO.FEaiChartCustomerSphereOperation_construct;
   o.showButton   = MO.FEaiChartCustomerSphereOperation_showButton;
   o.setup        = MO.FEaiChartCustomerSphereOperation_setup;
   return o;
}
MO.FEaiChartCustomerSphereOperation_onImageLoad = function FEaiChartCustomerSphereOperation_onImageLoad() {
   this._ready = true;
   this.dirty();
}
MO.FEaiChartCustomerSphereOperation_onPaintBegin = function FEaiChartCustomerSphereOperation_onPaintBegin(event) {
   var o = this;
   if (!o._imageButton.testReady()){
      return;
   }
   if (!o._imageRange.testReady()){
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var virtualSize = event.virtualSize;
   var imageButton = o._imageButton;
   var imageSize = imageButton.size();
   var width = imageSize.width / 1.8;
   var height = imageSize.height / 1.8;
   var left = (virtualSize.width - width) * 0.5;
   var top = (virtualSize.height - height) * 0.5;
   if(o._buttonVisible){
      graphic.drawImage(o._imageButton, left, top, width, height);
   }else{
      graphic.drawImage(o._imageRange, left, top, width, height);
   }
}
MO.FEaiChartCustomerSphereOperation_construct = function FEaiChartCustomerSphereOperation_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}
MO.FEaiChartCustomerSphereOperation_showButton = function FEaiChartCustomerSphereOperation_showButton(visible){
   var o = this;
   o._buttonVisible = visible;
   o.dirty();
}
MO.FEaiChartCustomerSphereOperation_setup = function FEaiChartCustomerSphereOperation_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._imageButton = imageConsole.load('{eai.resource}/world/button.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._imageRange = imageConsole.load('{eai.resource}/world/button.range.png');
   image.addLoadListener(o, o.onImageLoad);
}
MO.FEaiChartCustomerSphereScene = function FEaiChartCustomerSphereScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   o._code                   = MO.EEaiScene.ChartCustomerSphere;
   o._optionMapCountry       = false;
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._controlOperation       = null;
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   o._earthSphere            = null;
   o._disableRectangles      = null;
   o.onSocketTouchReceived   = MO.FEaiChartCustomerSphereScene_onSocketTouchReceived;
   o.onSocketSphereReceived  = MO.FEaiChartCustomerSphereScene_onSocketSphereReceived;
   o.onOperationDown         = MO.FEaiChartCustomerSphereScene_onOperationDown;
   o.onOperationVisibility   = MO.FEaiChartCustomerSphereScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiChartCustomerSphereScene_onProcessReady;
   o.onProcessInput          = MO.FEaiChartCustomerSphereScene_onProcessInput;
   o.onProcess               = MO.FEaiChartCustomerSphereScene_onProcess;
   o.construct               = MO.FEaiChartCustomerSphereScene_construct;
   o.setup                   = MO.FEaiChartCustomerSphereScene_setup;
   o.testDisableRectangles   = MO.FEaiChartCustomerSphereScene_testDisableRectangles;
   o.showFace                = MO.FEaiChartCustomerSphereScene_showFace;
   o.fixMatrix               = MO.FEaiChartCustomerSphereScene_fixMatrix;
   o.processResize           = MO.FEaiChartCustomerSphereScene_processResize;
   o.dispose                 = MO.FEaiChartCustomerSphereScene_dispose;
   return o;
}
MO.FEaiChartCustomerSphereScene_onSocketTouchReceived = function FEaiChartCustomerSphereScene_onSocketTouchReceived(event) {
   var o = this;
   var guiManager = o._guiManager;
   var controlOperation = o._controlOperation;
   var context = o._graphicContext;
   var size = context.size();
   var info = o._info;
   info.unserializeBuffer(event.message, true);
   var earthSphere = o._earthSphere;
   var matrix = earthSphere.matrix();
   var socketSphere = o._socketSphere;
   var sourceTouch = earthSphere.sourceTouch();
   var targetTouch = earthSphere.targetTouch();
   var typeCode = info.typeCode();
   if(typeCode == 'D'){
      if(info.points().isEmpty()){
         return;
      }
      if(!earthSphere.setSource(info, o._disableRectangles)){
         return;
      }
      var rotationMatrix = o._rotationMatrix.assign(matrix);
      rotationMatrix.invert();
      sourceTouch.calculate(rotationMatrix);
      var sourceTouchPoint = sourceTouch.points.first();
      if(sourceTouchPoint.originLength < (190 / size.height)){
         if(controlOperation.buttonVisible()){
            if(sourceTouchPoint.originPosition.x < 0){
               earthSphere.reset();
               socketSphere.send('reset');
               controlOperation.showButton(false);
            }else{
               socketSphere.send('next');
            }
         }else{
            controlOperation.showButton(true);
         }
      }else{
         var id = o._earthFlat.pickIdentify(sourceTouchPoint.mapLocation.x, sourceTouchPoint.mapLocation.y);
         if(id > 0){
            var selectId = 0;
            switch(id){
               case 1:
                  selectId = 1;
                  break;
               case 2:
                  selectId = 8;
                  break;
               case 3:
                  selectId = 7;
                  break;
               case 4:
                  selectId = 6;
                  break;
               case 5:
                  selectId = 5;
                  break;
               case 6:
                  selectId = 4;
                  break;
               case 7:
                  selectId = 3;
                  break;
               case 8:
                  selectId = 2;
                  break;
            }
            socketSphere.send('area=' + selectId);
            return;
         }
         controlOperation.showButton(false);
         o._earthFlat.drawTouch(sourceTouchPoint.mapLocation.x, sourceTouchPoint.mapLocation.y);
         o._moving = true;
      }
      guiManager.dirty();
   }else if(typeCode == 'M' && o._moving){
      if(info.points().isEmpty()){
         return;
      }
      earthSphere.setTarget(info, o._disableRectangles);
      earthSphere.sendRotation();
   }else if(typeCode == 'U'){
      o._moving = false;
   }
}
MO.FEaiChartCustomerSphereScene_onSocketSphereReceived = function FEaiChartCustomerSphereScene_onSocketSphereReceived(event) {
   var o = this;
   var guiManager = o._guiManager;
   var message = event.message;
   var controlOperation = o._controlOperation;
   if(message == 'phase=0'){
      controlOperation.showButton(false);
   }else if(message == 'phase=1'){
      controlOperation.showButton(true);
   }
   guiManager.dirty();
}
MO.FEaiChartCustomerSphereScene_onOperationDown = function FEaiChartCustomerSphereScene_onOperationDown(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationDown.call(o, event);
   var earthSphere = o._earthSphere;
   var size = o._graphicContext.size();
   var cx = event.x - size.width / 2;
   var cy = event.y - size.height / 2;
   var range = Math.min(size.width, size.height) * 0.5;
   var x = MO.Lang.Float.toRange(cx / range, -1, 1);
   var y = -MO.Lang.Float.toRange(cy / range, -1, 1);
   var rotationMatrix = o._rotationMatrix.assign(earthSphere.matrix());
   rotationMatrix.invert();
   var sourcePoint = earthSphere.sourcePoint();
   sourcePoint.calculateFlat(rotationMatrix, x, y);
   var mapLocation = sourcePoint.mapLocation;
   o._earthFlat.drawTouch(mapLocation.x, mapLocation.y);
}
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
MO.FEaiChartCustomerSphereScene_onProcessReady = function FEaiChartCustomerSphereScene_onProcessReady(){
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   o._earthSphere.autoRotation(true);
}
MO.FEaiChartCustomerSphereScene_onProcessInput = function FEaiChartCustomerSphereScene_onProcessInput(){
   var o = this;
   var directionSpeed = 0.02;
   var earthSphere = o._earthSphere;
   var matrix = earthSphere.matrix();
   var matrix = o._earthSphere.matrix();
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.A)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.D)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, directionSpeed);
      matrix.parse();
   }
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.W)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisX, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.S)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisX, directionSpeed);
      matrix.parse();
   }
   if(MO.Window.Keyboard.isPress(MO.EKeyCode.Q)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisZ, -directionSpeed);
      matrix.parse();
   }else if(MO.Window.Keyboard.isPress(MO.EKeyCode.E)){
      matrix.addRotationAxis(MO.Lang.Math.vectorAxisZ, directionSpeed);
      matrix.parse();
   }
}
MO.FEaiChartCustomerSphereScene_onProcess = function FEaiChartCustomerSphereScene_onProcess(){
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
         var countryEntity = o._countryEntity;
         countryEntity.start();
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   if (o._playing){
      o._socketTouch.process();
      o._socketSphere.process();
      o._earthSphere.process();
      o.onProcessInput();
   }
}
MO.FEaiChartCustomerSphereScene_construct = function FEaiChartCustomerSphereScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   o._rotationMatrix = new MO.SMatrix3d();
   o._earthMatrix = new MO.SMatrix3d();
   o._info = MO.Class.create(MO.FEaiChartCustomerSphereInfo);
}
MO.FEaiChartCustomerSphereScene_setup = function FEaiChartCustomerSphereScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var application = o._application;
   var desktop = application.desktop();
   var canvas3d = desktop.canvas3d();
   var context3d = canvas3d.graphicContext();
   var stage = o._activeStage;
   var qualityCd = MO.Desktop.qualityCd();
   var rectangles = o._disableRectangles = new MO.TObjects();
   rectangles.push(new MO.SRectangle(0.7, 0.3, 0.1, 0.1));
   var earthFlat = o._earthFlat = MO.Class.create(MO.FEaiEarthFlat);
   earthFlat.linkGraphicContext(context3d);
   earthFlat.setup();
   var groundLayer = stage.groundLayer();
   groundLayer.push(earthFlat);
   var earthSphere = o._earthSphere = MO.Class.create(MO.FEaiEarthSphere);
   earthSphere._scene = o;
   earthSphere.linkGraphicContext(context3d);
   if(qualityCd == MO.EGraphicQuality.Highest){
      earthSphere.setSplitCount(128);
   }else{
      earthSphere.setSplitCount(64);
   }
   earthSphere.setup();
   earthSphere.matrix().setScaleAll(200);
   earthSphere.matrix().update();
   var technique = stage.selectTechnique(o, MO.FE3dSphereTechnique);
   var passView = technique.passView();
   passView.setSphere(earthSphere);
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -500);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.size().assign(context3d.size());
   projection.setZnear(-1000);
   projection.setZfar(1000);
   projection.update();
   stage.region().selectCamera(camera);
   var stage = o.activeStage();
   var operation = o._controlOperation = MO.Class.create(MO.FEaiChartCustomerSphereOperation);
   operation.setName('Operation');
   operation.linkGraphicContext(o);
   operation.setup();
   operation.build();
   o._guiManager.register(operation);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.cityModule().build(o);
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
   var socket = o._socketTouch = MO.Class.create(MO.FBinarySocket);
   socket.connect('{service.touch}/touch');
   socket.addReceiveListener(o, o.onSocketTouchReceived);
   var socket = o._socketSphere = MO.Class.create(MO.FSocket);
   socket.connect('{service.touch}/sphere');
   socket.addReceiveListener(o, o.onSocketSphereReceived);
   earthSphere._socket = socket;
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   var worldResource = o._worldResource = resourceConsole.mapModule().loadWorld();
   o._readyLoader.push(worldResource);
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var worldEntity = o._worldEntity = entityConsole.mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
}
MO.FEaiChartCustomerSphereScene_showFace = function FEaiChartCustomerSphereScene_showFace() {
   var o = this;
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   o._mapEntity.reset();
   var desktop = o._application.desktop();
   desktop.show();
   o.processResize();
}
MO.FEaiChartCustomerSphereScene_fixMatrix = function FEaiChartCustomerSphereScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.setScale(100, 100, 100);
   }
   matrix.update();
}
MO.FEaiChartCustomerSphereScene_processResize = function FEaiChartCustomerSphereScene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var context = o._graphicContext;
   var size = context.size();
   var operation = o._controlOperation;
   operation.setWidth(256);
   operation.setHeight(256);
}
MO.FEaiChartCustomerSphereScene_dispose = function FEaiChartCustomerSphereScene_dispose(){
   var o = this;
   o._rotationMatrix = MO.Lang.Object.dispose(o._rotationMatrix);
   o._earthMatrix = MO.Lang.Object.dispose(o._earthMatrix);
   o._info = MO.Lang.Object.dispose(o._info);
   o.__base.FEaiChartScene.dispose.call(o);
}
MO.FEaiEarthFlat = function FEaiEarthFlat(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MProcessReady);
   o._textureCloud  = MO.Class.register(o, new MO.AGetter('_textureCloud'));
   o._textureLand   = MO.Class.register(o, new MO.AGetter('_textureLand'));
   o._textureOcean  = MO.Class.register(o, new MO.AGetter('_textureOcean'));
   o._textureWater  = MO.Class.register(o, new MO.AGetter('_textureWater'));
   o.onProcessReady = MO.FEaiEarthFlat_onProcessReady;
   o.construct      = MO.FEaiEarthFlat_construct;
   o.setup          = MO.FEaiEarthFlat_setup;
   o.drawTouch      = MO.FEaiEarthFlat_drawTouch;
   o.drawBoundary   = MO.FEaiEarthFlat_drawBoundary;
   o.drawGrid       = MO.FEaiEarthFlat_drawGrid;
   o.pickIdentify   = MO.FEaiEarthFlat_pickIdentify;
   o.process        = MO.FEaiEarthFlat_process;
   o.dispose        = MO.FEaiEarthFlat_dispose;
   return o;
}
MO.FEaiEarthFlat_drawTouch = function FEaiEarthFlat_drawTouch(x, y){
   var o = this;
   return;
   if(!o._canvas){
      return;
   }
   var canvas = o._canvas;
   var context2d = canvas.graphicContext();
   var size = o._graphicContext.size();
   var cx = x * o._imageSize.width;
   var cy = y * o._imageSize.height;
   context2d.drawCircle(cx, cy, 4, 1, '#FFFFFF', '#FF0000')
   o._textureLand.upload(canvas);
}
MO.FEaiEarthFlat_drawBoundary = function FEaiEarthFlat_drawBoundary(handle, boundaryData, scaleX, scaleY, centerX, centerY, lineWidth, lineColor){
   var o = this;
   var positionCount = boundaryData.positionCount();
   var positions = boundaryData.positions();
   handle.beginPath();
   handle.moveTo(positions[0] * scaleX + centerX ,-positions[1] * scaleY + centerY);
   for(var n = 0; n < positionCount; n++){
      var x = positions[2 * n] * scaleX + centerX;
      var y = -positions[2 * n + 1] * scaleY + centerY;
      handle.lineTo(x,y);
   }
   handle.closePath();
   handle.lineWidth = lineWidth;
   handle.strokeStyle = lineColor;
   handle.stroke();
}
MO.FEaiEarthFlat_drawGrid = function FEaiEarthFlat_drawGrid(context2d, split){
   var o = this;
   var size = o._imageLand.size();
   var sizeWidth = size.width;
   var sizeHeight = size.height;
   var sx = split * 2;
   var sy = split;
   var cx = size.width / sx;
   var cy = size.height / sy;
   for(var i = 0; i < sy ; i++){
      var y = cy * i;
      context2d.drawLine(0, y, sizeWidth, y, '#FF75F3', 1);
   }
   for(var i = 0; i < sx ; i++){
      var x = cx * i;
      context2d.drawLine(x, 0, x, sizeHeight, '#FF75F3', 1);
   }
}
MO.FEaiEarthFlat_onProcessReady = function FEaiEarthFlat_onProcessReady(){
   var o = this;
   var loader = o._textureCloudLoader;
   o._textureCloud = loader.pickTexture();
   o._textureCloudLoader = MO.Lang.Object.dispose(loader);
   var image = o._imageLand;
   var context = o._graphicContext;
   var size = image.size();
   o._imageSize = new MO.SSize2(size.width, size.height);
   var sizeWidth = size.width;
   var sizeHeight = size.height;
   var canvas = o._canvas = MO.Class.create(MO.FE2dCanvas);
   canvas.size().assign(size);
   canvas.build(MO.Window._hDocument);
   var context2d = canvas.graphicContext();
   var handle = context2d._handle;
   context2d.drawImage(image, 0, 0, sizeWidth, size.height);
   handle.lineCap = 'round';
   var scaleX = sizeWidth / 360;
   var scaleY = sizeHeight / 180;
   var centerX = sizeWidth * 0.5;
   var centerY = sizeHeight * 0.5;
   var countries = o._worldResource.data().countries();
   var count = countries.count();
   for(var k = 0; k < count; k++){
      var country = countries.at(k);
      var lineWidth = 1;
      var lineColor = "#0085E6";
      if(country.code() == 'China'){
         lineWidth = 4;
         lineColor = "#004596";
      }
      var boundaries = country.boundaries();
      var boundaryCount = boundaries.count();
      for(var j = 0; j < boundaryCount; j++){
         var boundary = boundaries.at(j);
         if(MO.Class.isClass(boundary, MO.FEaiMapBoundaryData)){
            o.drawBoundary(handle, boundary, scaleX, scaleY, centerX, centerY, lineWidth, lineColor);
         }else{
            var boundaryDatas = boundary.items();
            var boundaryDataCount = boundaryDatas.count();
            for(var i = 0; i < boundaryDataCount; i++){
               var boundaryData = boundaryDatas.at(i);
               o.drawBoundary(handle, boundaryData, scaleX, scaleY, centerX, centerY, lineWidth, lineColor);
            }
         }
      }
   }
   context2d.drawImage(o._imageArea, 0, 0, sizeWidth, size.height);
   var texture = o._textureLand = context.createFlatTexture();
   texture.setCode('land');
   texture.upload(canvas);
   var image = o._imageIdentify;
   var size = image.size();
   var canvas = o._canvasIdentify = MO.Class.create(MO.FE2dCanvas);
   canvas.size().assign(size);
   canvas.build(MO.Window._hDocument);
   var context2d = canvas.graphicContext();
   var handle = context2d._handle;
   context2d.drawImage(image, 0, 0, sizeWidth, size.height);
   o._identityData = context2d._handle.getImageData(0, 0, sizeWidth, size.height);
   canvas.dispose();
   image.dispose();
   o._imageLand = null;
   var loader = o._textureOceanLoader;
   o._textureOcean = loader.pickTexture();
   o._textureOceanLoader = MO.Lang.Object.dispose(loader);
   var loader = o._textureWaterLoader;
   o._textureWater = loader.pickTexture();
   o._textureWaterLoader = MO.Lang.Object.dispose(loader);
   var loader = o._textureWaterNormalLoader;
   o._textureWaterNormal = loader.pickTexture();
   o._textureWaterNormalLoader = MO.Lang.Object.dispose(loader);
   var rectangle = o._rectangle;
   rectangle.pushTexture(o._textureCloud);
   rectangle.pushTexture(o._textureLand);
   rectangle.pushTexture(o._textureOcean);
   rectangle.pushTexture(o._textureWater);
   rectangle.pushTexture(o._textureWaterNormal);
   o.pushRenderable(rectangle);
}
MO.FEaiEarthFlat_construct = function FEaiEarthFlat_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o.__base.MProcessReady.construct.call(o);
}
MO.FEaiEarthFlat_setup = function FEaiEarthFlat_setup(){
   var o = this;
   var qualityCd = MO.Desktop.qualityCd();
   var resourceConsole = MO.Console.find(MO.FEaiResourceConsole);
   var worldResource = o._worldResource = resourceConsole.mapModule().loadWorld();
   o._readyLoader.push(worldResource);
   var loader = o._textureCloudLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'cloud');
   loader.loadUrl('{eai.resource}/world/cloud1024.jpg');
   o._readyLoader.push(loader);
   var image = o._imageLand = MO.Class.create(MO.FImage);
   if(qualityCd == MO.EGraphicQuality.Highest){
      image.loadUrl('{eai.resource}/world/land2048x2048.png');
   }else{
      image.loadUrl('{eai.resource}/world/land1024x1024.png');
   }
   o._readyLoader.push(image);
   var image = o._imageArea = MO.Class.create(MO.FImage);
   image.loadUrl('{eai.resource}/world/area.png');
   o._readyLoader.push(image);
   var image = o._imageIdentify = MO.Class.create(MO.FImage);
   image.loadUrl('{eai.resource}/world/identify.jpg');
   o._readyLoader.push(image);
   var loader = o._textureOceanLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'ocean');
   if(qualityCd == MO.EGraphicQuality.Highest){
      loader.loadUrl('{eai.resource}/world/ocean2048x2048.jpg');
   }else{
      loader.loadUrl('{eai.resource}/world/ocean1024x1024.jpg');
   }
   o._readyLoader.push(loader);
   var loader = o._textureWaterLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'water');
   loader.loadUrl('{eai.resource}/world/water.jpg');
   o._readyLoader.push(loader);
   var loader = o._textureWaterNormalLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'water_normal');
   loader.loadUrl('{eai.resource}/world/water-normal.png');
   o._readyLoader.push(loader);
   var rectangle = o._rectangle = MO.Class.create(MO.FE3dRectangleArea);
   rectangle.linkGraphicContext(o);
   rectangle.setup();
   rectangle.material().info().effectCode = 'eai.earth.flat';
}
MO.FEaiEarthFlat_pickIdentify = function FEaiEarthFlat_pickIdentify(x, y){
   var o = this;
   var identityData = o._identityData;
   var cx = parseInt(identityData.width * x);
   var cy = parseInt(identityData.height * y);
   var location = (identityData.width * cy + cx) << 2;
   var r = identityData.data[location];
   var g = identityData.data[location + 1];
   var b = identityData.data[location + 2];
   var a = identityData.data[location + 3];
   return r;
}
MO.FEaiEarthFlat_process = function FEaiEarthFlat_process(){
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
}
MO.MFrameProcessor_dispose = function MFrameProcessor_dispose(){
   var o = this;
   o.__base.MProcessReady.dispose.call(o);
   o.__base.FE3dDisplay.dispose.call(o);
}
MO.FEaiEarthSphere = function FEaiEarthSphere(o){
   o = MO.Class.inherits(this, o, MO.FE3dSphere, MO.MListener);
   o._optionRotation   = false;
   o._speed            = 1;
   o._speedOperate     = 1;
   o._currentTick      = 0;
   o._autoTick         = 0;
   o._startPosition    = null;
   o._currentPosition  = null;
   o._currentDirection = null;
   o._targetPosition   = null;
   o._rotationSpeed    = -0.001;
   o._rotationSpeed    = -0.001;
   o._sourcePoint      = MO.Class.register(o, new MO.AGetter('_sourcePoint'));
   o._sourceTouch      = MO.Class.register(o, new MO.AGetter('_sourceTouch'));
   o._targetTouch      = MO.Class.register(o, new MO.AGetter('_targetTouch'));
   o._sourceDirection  = MO.Class.register(o, new MO.AGetter('_sourceDirection'));
   o._targetDirection  = MO.Class.register(o, new MO.AGetter('_targetDirection'));
   o.construct         = MO.FEaiEarthSphere_construct;
   o.setSource         = MO.FEaiEarthSphere_setSource;
   o.setTarget         = MO.FEaiEarthSphere_setTarget;
   o.reset             = MO.FEaiEarthSphere_reset;
   o.autoRotation      = MO.FEaiEarthSphere_autoRotation;
   o.sendRotation      = MO.FEaiEarthSphere_sendRotation;
   o.process           = MO.FEaiEarthSphere_process;
   o.dispose           = MO.FEaiEarthSphere_dispose;
   return o;
}
MO.FEaiEarthSphere_construct = function FEaiEarthSphere_construct(){
   var o = this;
   o.__base.FE3dSphere.construct.call(o);
   o._sourcePoint = new MO.SEaiEarthTouchPoint();
   o._sourceTouch = new MO.SEaiEarthTouch();
   o._targetTouch = new MO.SEaiEarthTouch();
   o._sourceDirection = new MO.SVector3();
   o._currentDirection = new MO.SVector3();
   o._targetDirection = new MO.SVector3();
   o._sourceMatrix = new MO.SMatrix3d();
   o._currentMatrix = new MO.SMatrix3d();
   o._rotationAxis = new MO.SVector3();
   o._rotationMatrix = new MO.SMatrix3d();
   o._rotationMatrix3x3 = new MO.SMatrix3x3();
}
MO.FEaiEarthSphere_setSource = function FEaiEarthSphere_setSource(info, rectangles){
   var o = this;
   var touch = o._sourceTouch;
   touch.setInfo(info, rectangles);
   if(touch.points.isEmpty()){
      return false;
   }
   o._sourceDirection.assign(touch.direction);
   o._currentDirection.assign(touch.direction);
   o._sourceMatrix.assign(o._matrix);
   o._currentMatrix.assign(o._matrix);
   o._currentAngle = 0;
   o._rotationAngle = 0;
   o._autoTick = 0;
   return true;
}
MO.FEaiEarthSphere_setTarget = function FEaiEarthSphere_setTarget(info){
   var o = this;
   var touch = o._targetTouch;
   touch.setInfo(info);
   o._targetDirection.assign(touch.direction);
   var sourceTouchPoint = o._sourceTouch.points.first();
   var targetTouchPoint = o._targetTouch.points.first();
   var axis = o._rotationAxis;
   axis.assign(o._sourceDirection);
   axis.cross(o._targetDirection);
   axis.normalize();
   o._rotationAngle = Math.acos(o._sourceDirection.dotPoint3(o._targetDirection));
   o.autoRotation(false);
   o._autoTick = 0;
}
MO.FEaiEarthSphere_process = function FEaiEarthSphere_process(){
   var o = this;
   o.__base.FE3dSphere.process.call(o);
   var matrix = o._matrix;
   var currentTick = MO.Timer.current();
   if(o._currentTick != 0){
      if(o._currentAngle != o._rotationAngle){
         var rate = o._speed * (currentTick - o._currentTick) * 0.001;
         o._currentAngle += rate;
         if(o._currentAngle > o._rotationAngle){
            o._currentAngle = o._rotationAngle;
         }
         matrix.assign(o._sourceMatrix);
         matrix.addRotationAxis(o._rotationAxis, -o._currentAngle);
         matrix.parse();
         o.sendRotation();
      }else if(o._optionRotation){
         matrix.addRotationAxis(MO.Lang.Math.vectorAxisY, -o._rotationSpeed);
         matrix.parse();
         o.sendRotation();
      }else{
         if(o._autoTick == 0){
            o._autoTick = currentTick;
         }else if(currentTick - o._autoTick > 120000){
            o._scene._controlOperation.showButton(false);
            o._scene._guiManager.dirty();
            o.reset();
         }
      }
   }
   o._currentTick = currentTick;
}
MO.FEaiEarthSphere_reset = function FEaiEarthSphere_reset(){
   var o = this;
   o._targetDirection.set(0, 1, 0);
   o._matrix.transformPoint3(o._targetDirection, o._sourceDirection);
   o._sourceDirection.normalize();
   var axis = o._rotationAxis;
   axis.assign(o._sourceDirection);
   axis.cross(o._targetDirection);
   axis.normalize();
   o._rotationAngle = Math.acos(o._sourceDirection.dotPoint3(o._targetDirection));
   o.autoRotation(true);
}
MO.FEaiEarthSphere_autoRotation = function FEaiEarthSphere_autoRotation(value){
   var o = this;
   if(value && !o._optionRotation){
      o._optionRotation = true;
      o._currentRotation = 0;
      o._socket.send('autoRotate=1');
   }else if(!value && o._optionRotation){
      o._optionRotation = false;
      o._currentRotation = 0;
      o._socket.send('autoRotate=0');
   }
}
MO.FEaiEarthSphere_sendRotation = function FEaiEarthSphere_sendRotation(){
   var o = this;
   var matrix = o._matrix;
   o._scene._socketSphere.send('rotation=' + matrix.rx + ',' + matrix.ry + ',' + matrix.rz);
}
MO.FEaiEarthSphere_dispose = function FEaiEarthSphere_dispose(){
   var o = this;
   o._sourceDirection = MO.Lang.Object.dispose(o._sourceDirection);
   o._currentDirection = MO.Lang.Object.dispose(o._currentDirection);
   o._targetDirection = MO.Lang.Object.dispose(o._targetDirection);
   o.__base.FE3dSphere.dispose.call(o);
}
