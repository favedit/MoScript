//==========================================================
// <T>设计画板。</T>
//
// @class
// @author maocy
// @history 150130
//==========================================================
MO.FDsCanvas = function FDsCanvas(o){
   o = MO.Class.inherits(this, o, MO.FDuiCanvas, MO.MGraphicObject, MO.MListenerLoad, MO.MMouseCapture);
   //..........................................................
   // @property
   o._servicePreview      = 'cloud.resource.preview';
   o._resourceTypeCd      = null;
   //..........................................................
   // @attribute
   o._optionRotation      = false;
   // @attribute
   o._activeSpace         = null;
   // @attribute
   o._canvasModeCd        = MO.EDsCanvasMode.Drop;
   o._canvasMoveCd        = MO.EDsCanvasDrag.Unknown;
   // @attribute
   o._switchWidth         = '*';
   o._switchHeight        = '*';
   // @attribute
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   // @attribute
   o._cameraMoveRate      = 8;
   o._cameraKeyRotation   = 3;
   o._cameraMouseRotation = 0.005;
   // @attribute
   o._dimensional         = null;
   o._rotation            = null;
   //..........................................................
   // @event
   o.onBuild              = MO.FDsCanvas_onBuild;
   o.onMouseCaptureStart  = MO.FDsCanvas_onMouseCaptureStart;
   o.onMouseCapture       = MO.FDsCanvas_onMouseCapture;
   o.onMouseCaptureStop   = MO.FDsCanvas_onMouseCaptureStop;
   o.onEnterFrame         = MO.FDsCanvas_onEnterFrame;
   //..........................................................
   o.oeResize             = MO.FDsCanvas_oeResize;
   o.oeRefresh            = MO.FDsCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct            = MO.FDsCanvas_construct;
   // @method
   o.activeSpace          = MO.FDsCanvas_activeSpace;
   // @method
   o.switchSize           = MO.FDsCanvas_switchSize;
   o.switchRotation       = MO.FDsCanvas_switchRotation;
   o.reloadRegion         = MO.FDsCanvas_reloadRegion;
   o.capture              = MO.FDsCanvas_capture;
   // @method
   o.dispose              = MO.FDsCanvas_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
MO.FDsCanvas_onBuild = function FDsCanvas_onBuild(event){
   var o = this;
   o.__base.FDuiCanvas.onBuild.call(o, event);
   // 创建渲染环境
   var hPanel = o._hPanel;
   hPanel.__linker = o;
   hPanel.style.width = '100%';
   hPanel.style.height = '100%';
   // 创建渲染环境
   var parameters = new Object();
   parameters.alpha = false;
   parameters.antialias = true;
   var context = o._graphicContext = MO.REngine3d.createContext(MO.FWglContext, hPanel, parameters);
   // 创建坐标系
   var dimensional = o._dimensional = MO.Class.create(MO.FE3dDimensional);
   dimensional.linkGraphicContext(context);
   dimensional.setup();
   // 启动处理
   MO.RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   MO.RStage.start(1000 / 60);
   // 注册鼠标捕捉监听
   MO.Console.find(MO.FMouseConsole).register(o);
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FDsCanvas_onMouseCaptureStart = function FDsCanvas_onMouseCaptureStart(event){
   var o = this;
   // 获得参数
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var camera = space.camera();
   // 获得位置
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureRotation.assign(camera._rotation);
   //var d = t.renderables().get(0);
   //o._capturePosition.set(p.clientX, p.clientY);
   //o._captureMatrix.assign(d.matrix());
   //o._captureRotation.assign(s.camera()._rotation);
   // 设置鼠标
   MO.RHtml.cursorSet(o._hPanel, MO.EUiCursor.Pointer);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDsCanvas_onMouseCapture = function FDsCanvas_onMouseCapture(event){
   var o = this;
   // 获得参数
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var camera = space.camera();
   // 获得位移
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var mc = o._canvasModeCd;
   //var d = t.renderables().get(0);
   //var m = d.matrix();
   //var cm = o._captureMatrix;
   // 鼠标处理
   var toolbar = o._frameSet._canvasToolBar;
   switch(toolbar._canvasModeCd){
      case EDsCanvasMode.Drop:
         var rotation = camera.rotation();
         var captureRotation = o._captureRotation;
         rotation.x = captureRotation.x - cy * o._cameraMouseRotation;
         rotation.y = captureRotation.y - cx * o._cameraMouseRotation;
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         //m.tx = cm.tx + cx / 360 * 3.14;
         //m.ty = cm.ty + cy / 360 * 3.14;
         break;
      case EDsCanvasMode.Rotation:
         //m.ry = cm.ry + cx * RMath.DEGREE_RATE;
         break;
      case EDsCanvasMode.Scale:
         //m.sx = cm.sx + cx / 100;
         //m.sy = cm.sy + cx / 100;
         //m.sz = cm.sz + cx / 100;
         break;
   }
   //m.updateForce();
}

//==========================================================
// <T>鼠标捕捉结束处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDsCanvas_onMouseCaptureStop = function FDsCanvas_onMouseCaptureStop(event){
   var o = this;
   // 设置鼠标
   MO.RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FDsCanvas_onEnterFrame = function FDsCanvas_onEnterFrame(){
   var o = this;
   // 检查参数
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var camera = space.camera();
   //..........................................................
   // 计算间隔
   var timer = space.timer();
   var span = timer.spanSecond();
   var moveRate = o._cameraMoveRate * span;
   var rotationRate = o._cameraKeyRotation * span;
   //..........................................................
   // 按键前后移动
   var keyForward = MO.Window.Keyboard.isPress(MO.EStageKey.Forward);
   var keyBack = MO.Window.Keyboard.isPress(MO.EStageKey.Back);
   if(keyForward && !keyBack){
      camera.doWalk(moveRate);
   }
   if(!keyForward && keyBack){
      camera.doWalk(-moveRate);
   }
   // 按键上下移动
   var keyUp = MO.Window.Keyboard.isPress(MO.EStageKey.Up);
   var keyDown = MO.Window.Keyboard.isPress(MO.EStageKey.Down);
   if(keyUp && !keyDown){
      camera.doFly(moveRate);
   }
   if(!keyUp && keyDown){
      camera.doFly(-moveRate);
   }
   // 按键左右旋转
   var keyRleft = MO.Window.Keyboard.isPress(MO.EStageKey.RotationLeft);
   var keyRright = MO.Window.Keyboard.isPress(MO.EStageKey.RotationRight);
   if(keyRleft && !keyRright){
      camera.doYaw(rotationRate);
   }
   if(!keyRleft && keyRright){
      camera.doYaw(-rotationRate);
   }
   // 按键上下旋转
   var keyRup = MO.Window.Keyboard.isPress(MO.EStageKey.RotationUp);
   var keyDown = MO.Window.Keyboard.isPress(MO.EStageKey.RotationDown);
   if(keyRup && !keyDown){
      camera.doPitch(rotationRate);
   }
   if(!keyRup && keyDown){
      camera.doPitch(-rotationRate);
   }
   // 更新相机
   camera.update();
   //..........................................................
   // 旋转处理
   if(o._optionRotation){
      var rotation = o._rotation;
      var layers = space.layers();
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         var matrix = layer.matrix();
         matrix.setRotation(0, rotation.y, 0);
         matrix.update();
      }
      // 设置变量
      rotation.y += 0.01;
   }
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
MO.FDsCanvas_oeResize = function FDsCanvas_oeResize(p){
   var o = this;
   o.__base.FDuiCanvas.oeResize.call(o, p);
   // 获得大小
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight - 6;
   // 设置大小
   hp.width = w;
   hp.height = h;
   // 设置投影
   o._graphicContext.setViewport(0, 0, w, h);
   // 设置范围
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
MO.FDsCanvas_oeRefresh = function FDsCanvas_oeRefresh(p){
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDsCanvas_construct = function FDsCanvas_construct(){
   var o = this;
   o.__base.FDuiCanvas.construct.call(o);
   o._capturePosition = new MO.SPoint2();
   o._captureMatrix = new MO.SMatrix3d();
   o._rotation = new MO.SVector3();
   o._captureRotation = new MO.SVector3();
}

//==========================================================
// <T>获得激活的空间。</T>
//
// @method
// @return FE3dSpace 空间
//==========================================================
MO.FDsCanvas_activeSpace = function FDsCanvas_activeSpace(){
   return this._activeSpace;
}

//==========================================================
// <T>切换画板大小。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
MO.FDsCanvas_switchSize = function FDsCanvas_switchSize(width, height){
   var o = this;
   o._switchWidth = width;
   o._switchHeight = height;
   // 获得大小
   var hCanvas = o._hPanel;
   var hParent = o._hParent;
   if(width == '*'){
      width = hParent.offsetWidth;
   }
   if(height == '*'){
      height = hParent.offsetHeight;
   }
   // 设置大小
   hCanvas.width = width;
   hCanvas.style.width = width + 'px';
   hCanvas.height = height;
   hCanvas.style.height = height + 'px';
   // 设置投影
   o._graphicContext.setViewport(0, 0, width, height);
   // 设置投影
   var space = o._activeSpace;
   if(space){
      var projection = space.camera().projection();
      projection.size().set(width, height);
      projection.update();
   }
}

//==========================================================
// <T>切换旋转方式。</T>
//
// @method
// @param flag:Boolean 标志
//==========================================================
MO.FDsCanvas_switchRotation = function FDsCanvas_switchRotation(flag){
   this._optionRotation = flag;
}

//==========================================================
// <T>重新加载区域。</T>
//
// @method
// @param region:FE3dRegion 区域
//==========================================================
MO.FDsCanvas_reloadRegion = function FDsCanvas_reloadRegion(){
   var o = this;
   var space = o._activeSpace;
   var region = space.region();
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseRotation = resource.rotationMouseSpeed();
}

//==========================================================
// <T>捕捉当前画板。</T>
//
// @method
//==========================================================
MO.FDsCanvas_capture = function FDsCanvas_capture(){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   var guid = resource.guid();
   // 缩小到缩略图
   var switchWidth = o._switchWidth;
   var switchHeight = o._switchHeight;
   o.switchSize(200, 150);
   MO.RStage.process();
   // 获得像素数据
   var context = o._graphicContext;
   var size = context.size();
   var width = size.width;
   var height = size.height;
   var data = context.readPixels(0, 0, width, height);
   // 切回原来大小
   o.switchSize(switchWidth, switchHeight);
   MO.RStage.process();
   // 上传缩略图
   var url = '/' + o._servicePreview + '.wv?do=upload&type_cd=' + o._resourceTypeCd + '&guid=' + guid + '&width=' + width + '&height=' + height;
   return MO.Console.find(MO.FHttpConsole).send(url, data.buffer);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDsCanvas_dispose = function FDsCanvas_dispose(){
   var o = this;
   // 释放旋转
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   // 父处理
   o.__base.FDuiCanvas.dispose.call(o);
}
