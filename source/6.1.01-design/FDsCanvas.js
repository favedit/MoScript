//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsCanvas(o){
   o = RClass.inherits(this, o, FUiCanvas, MGraphicObject, MListenerLoad, MMouseCapture);
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
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
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
   o.onBuild              = FDsCanvas_onBuild;
   o.onMouseCaptureStart  = FDsCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsCanvas_onEnterFrame;
   //..........................................................
   o.oeResize             = FDsCanvas_oeResize;
   o.oeRefresh            = FDsCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct            = FDsCanvas_construct;
   // @method
   o.activeSpace          = FDsCanvas_activeSpace;
   // @method
   o.switchSize           = FDsCanvas_switchSize;
   o.switchRotation       = FDsCanvas_switchRotation;
   o.reloadRegion         = FDsCanvas_reloadRegion;
   o.capture              = FDsCanvas_capture;
   // @method
   o.dispose              = FDsCanvas_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
function FDsCanvas_onBuild(event){
   var o = this;
   o.__base.FUiCanvas.onBuild.call(o, event);
   // 创建渲染环境
   var hPanel = o._hPanel;
   hPanel.__linker = o;
   hPanel.style.width = '100%';
   hPanel.style.height = '100%';
   // 创建渲染环境
   var parameters = new Object();
   parameters.alpha = false;
   parameters.antialias = true;
   var context = o._graphicContext = REngine3d.createContext(FWglContext, hPanel, parameters);
   // 创建坐标系
   var dimensional = o._dimensional = RClass.create(FE3dDimensional);
   dimensional.linkGraphicContext(context);
   dimensional.setup();
   // 启动处理
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(1000 / 60);
   // 注册鼠标捕捉监听
   RConsole.find(FMouseConsole).register(o);
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCanvas_onMouseCaptureStart(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   o._capturePosition.set(event.clientX, event.clientY);
   o._captureRotation.assign(space.camera()._rotation);
   //var d = t.renderables().get(0);
   //o._capturePosition.set(p.clientX, p.clientY);
   //o._captureMatrix.assign(d.matrix());
   //o._captureRotation.assign(s.camera()._rotation);
   // 设置鼠标
   RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FDsCanvas_onMouseCapture(event){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var cx = event.clientX - o._capturePosition.x;
   var cy = event.clientY - o._capturePosition.y;
   var mc = o._canvasModeCd;
   //var d = t.renderables().get(0);
   //var m = d.matrix();
   //var cm = o._captureMatrix;
   switch(o._toolbar._canvasModeCd){
      case EDsCanvasMode.Drop:
         var camera = space.camera();
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
function FDsCanvas_onMouseCaptureStop(event){
   var o = this;
   // 设置鼠标
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsCanvas_onEnterFrame(){
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
   var keyForward = RKeyboard.isPress(EStageKey.Forward);
   var keyBack = RKeyboard.isPress(EStageKey.Back);
   if(keyForward && !keyBack){
      camera.doWalk(moveRate);
   }
   if(!keyForward && keyBack){
      camera.doWalk(-moveRate);
   }
   // 按键上下移动
   var keyUp = RKeyboard.isPress(EStageKey.Up);
   var keyDown = RKeyboard.isPress(EStageKey.Down);
   if(keyUp && !keyDown){
      camera.doFly(moveRate);
   }
   if(!keyUp && keyDown){
      camera.doFly(-moveRate);
   }
   // 按键左右旋转
   var keyRleft = RKeyboard.isPress(EStageKey.RotationLeft);
   var keyRright = RKeyboard.isPress(EStageKey.RotationRight);
   if(keyRleft && !keyRright){
      camera.doYaw(rotationRate);
   }
   if(!keyRleft && keyRright){
      camera.doYaw(-rotationRate);
   }
   // 按键上下旋转
   var keyRup = RKeyboard.isPress(EStageKey.RotationUp);
   var keyDown = RKeyboard.isPress(EStageKey.RotationDown);
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
function FDsCanvas_oeResize(p){
   var o = this;
   o.__base.FUiCanvas.oeResize.call(o, p);
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
   return EEventStatus.Stop;
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsCanvas_oeRefresh(p){
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsCanvas_construct(){
   var o = this;
   o.__base.FUiCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureMatrix = new SMatrix3d();
   o._rotation = new SVector3();
   o._captureRotation = new SVector3();
}

//==========================================================
// <T>获得激活的空间。</T>
//
// @method
// @return FE3dSpace 空间
//==========================================================
function FDsCanvas_activeSpace(){
   return this._activeSpace;
}

//==========================================================
// <T>切换画板大小。</T>
//
// @method
// @param width:Integer 宽度
// @param height:Integer 高度
//==========================================================
function FDsCanvas_switchSize(width, height){
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
function FDsCanvas_switchRotation(flag){
   this._optionRotation = flag;
}

//==========================================================
// <T>重新加载区域。</T>
//
// @method
// @param region:FE3dRegion 区域
//==========================================================
function FDsCanvas_reloadRegion(){
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
function FDsCanvas_capture(){
   var o = this;
   var space = o._activeSpace;
   var resource = space.resource();
   var guid = resource.guid();
   // 缩小到缩略图
   var switchWidth = o._switchWidth;
   var switchHeight = o._switchHeight;
   o.switchSize(200, 150);
   RStage.process();
   // 获得像素数据
   var context = o._graphicContext;
   var size = context.size();
   var width = size.width;
   var height = size.height;
   var data = context.readPixels(0, 0, width, height);
   // 切回原来大小
   o.switchSize(switchWidth, switchHeight);
   RStage.process();
   // 上传缩略图
   var url = '/' + o._servicePreview + '.wv?do=upload&type_cd=' + o._resourceTypeCd + '&guid=' + guid + '&width=' + width + '&height=' + height;
   return RConsole.find(FHttpConsole).send(url, data.buffer);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCanvas_dispose(){
   var o = this;
   // 释放旋转
   o._rotation = RObject.dispose(o._rotation);
   // 父处理
   o.__base.FUiCanvas.dispose.call(o);
}
