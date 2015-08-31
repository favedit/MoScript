//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3dSceneCanvas = function FE3dSceneCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   //..........................................................
   // @attribute
   o._activeSpace           = null;
   // @attribute
   o._captureStatus         = false;
   o._capturePosition       = null;
   o._captureCameraPosition = null;
   o._captureCameraRotation = null;
   // @attribute
   o._actionFullScreen      = false;
   o._actionPlay            = false;
   o._actionMovie           = false;
   o._actionUp              = false;
   o._actionDown            = false;
   o._actionForward         = false;
   o._actionBack            = false;
   // @attribute
   o._cameraMoveRate        = 0.4;
   o._cameraKeyRotation     = 0.03;
   o._cameraMouseRotation   = 0.005;
   // @attribute
   o._touchTracker          = null;
   //..........................................................
   // @event
   o.onEnterFrame           = MO.FE3dSceneCanvas_onEnterFrame;
   // @event
   o.onMouseCaptureStart    = MO.FE3dSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture         = MO.FE3dSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop     = MO.FE3dSceneCanvas_onMouseCaptureStop;
   // @event
   o.onTouchStart           = MO.FE3dSceneCanvas_onTouchStart;
   o.onTouchMove            = MO.FE3dSceneCanvas_onTouchMove;
   o.onTouchStop            = MO.FE3dSceneCanvas_onTouchStop;
   o.onTouchZoom            = MO.FE3dSceneCanvas_onTouchZoom;
   // @event
   o.onDataLoaded           = MO.FE3dSceneCanvas_onDataLoaded;
   o.onResize               = MO.FE3dSceneCanvas_onResize;
   //..........................................................
   // @method
   o.construct              = MO.FE3dSceneCanvas_construct;
   // @method
   o.testPlay               = MO.FE3dSceneCanvas_testPlay;
   o.switchPlay             = MO.FE3dSceneCanvas_switchPlay;
   o.testMovie              = MO.FE3dSceneCanvas_testMovie;
   o.switchMovie            = MO.FE3dSceneCanvas_switchMovie;
   o.doAction               = MO.FE3dSceneCanvas_doAction;
   // @method
   o.loadByGuid             = MO.FE3dSceneCanvas_loadByGuid;
   o.loadByCode             = MO.FE3dSceneCanvas_loadByCode;
   // @method
   o.dispose                = MO.FE3dSceneCanvas_dispose;
   return o;
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FE3dSceneCanvas_onEnterFrame = function FE3dSceneCanvas_onEnterFrame(){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   var timer = space.timer();
   var span = timer.spanSecond();
   //..........................................................
   // 按键处理
   var camera = space.camera();
   var distance = o._cameraMoveRate * span;
   var rotation = o._cameraKeyRotation * span;
   // 按键前后移动
   var keyForward = RKeyboard.isPress(MO.EStageKey.Forward);
   var keyBack = RKeyboard.isPress(MO.EStageKey.Back);
   if((keyForward && !keyBack) || o._actionForward){
      camera.doWalk(distance);
   }
   if((!keyForward && keyBack) || o._actionBack){
      camera.doWalk(-distance);
   }
   // 按键上下移动
   var keyUp = RKeyboard.isPress(MO.EStageKey.Up);
   var keyDown = RKeyboard.isPress(MO.EStageKey.Down);
   if((keyUp && !keyDown) || o._actionUp){
      camera.doFly(distance);
   }
   if((!keyUp && keyDown) || o._actionDown){
      camera.doFly(-distance);
   }
   // 按键左右旋转
   var keyLeft = RKeyboard.isPress(MO.EStageKey.RotationLeft);
   var keyRight = RKeyboard.isPress(MO.EStageKey.RotationRight);
   if(keyLeft && !keyRight){
      camera.doYaw(rotation);
   }
   if(!keyLeft && keyRight){
      camera.doYaw(-rotation);
   }
   // 按键上下旋转
   var keyRotationUp = RKeyboard.isPress(MO.EStageKey.RotationUp);
   var keyRotationDown = RKeyboard.isPress(MO.EStageKey.RotationDown);
   if(keyRotationUp && !keyRotationDown){
      camera.doPitch(rotation);
   }
   if(!keyRotationUp && keyRotationDown){
      camera.doPitch(-rotation);
   }
   // 更新相机
   camera.update();
   //..........................................................
   // 旋转模型
   if(o._optionRotation){
      var rotation = o._rotation;
      // 旋转所有层
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
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FE3dSceneCanvas_onMouseCaptureStart = function FE3dSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   // 选取物件
   var r = o._activeSpace.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureCameraRotation.assign(s.camera()._rotation);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FE3dSceneCanvas_onMouseCapture = function FE3dSceneCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeSpace.camera();
   var r = c.rotation();
   var cr = o._captureCameraRotation;
   r.x = cr.x + cy * o._cameraMouseRotation;
   r.y = cr.y + cx * o._cameraMouseRotation;
}

//==========================================================
// <T>鼠标捕捉结束处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FE3dSceneCanvas_onMouseCaptureStop = function FE3dSceneCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>触摸事件开始处理。</T>
//
// @method
// @param event:TouchEvent 触摸事件
//==========================================================
MO.FE3dSceneCanvas_onTouchStart = function FE3dSceneCanvas_onTouchStart(event){
   var o = this;
   // 检查场景加载完成
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var r = o._activeSpace.region();
   // 获得事件
   var ts = event.touches;
   var c = ts.length;
   // 单个触点事件处理
   if(c == 1){
      event.preventDefault();
      // 处理事件
      var t = ts[0];
      o._captureStatus = true;
      o._capturePosition.set(t.clientX, t.clientY);
      o._captureCameraPosition.assign(s.camera().position());
      o._captureCameraRotation.assign(s.camera().rotation());
   }else{
      o._touchTracker.eventStart(event);
   }
}

//==========================================================
// <T>触摸事件移动处理。</T>
//
// @method
// @param event:TouchEvent 触摸事件
//==========================================================
MO.FE3dSceneCanvas_onTouchMove = function FE3dSceneCanvas_onTouchMove(event){
   var o = this;
   // 检查状态
   if(!o._captureStatus){
      return;
   }
   // 获得事件
   var touchs = event.touches;
   var touchCount = touchs.length;
   // 单个触点事件处理
   if(touchCount == 1){
      event.preventDefault();
      // 处理事件
      var t = touchs[0];
      var cm = o._activeSpace.camera();
      var cr = cm.rotation();
      // 计算偏移
      var cx = t.clientX - o._capturePosition.x;
      var cy = t.clientY - o._capturePosition.y;
      cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
      cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
   }else if(touchCount > 1){
      o._touchTracker.eventMove(event);
   }
}

//==========================================================
// <T>触摸事件结束处理。</T>
//
// @method
// @param event:TouchEvent 触摸事件
//==========================================================
MO.FE3dSceneCanvas_onTouchStop = function FE3dSceneCanvas_onTouchStop(event){
   var o = this;
   o._touchTracker.eventStop(event);
   o._captureStatus = false;
}

//==========================================================
// <T>触摸事件缩放处理。</T>
//
// @method
// @param event:TouchEvent 触摸事件
//==========================================================
MO.FE3dSceneCanvas_onTouchZoom = function FE3dSceneCanvas_onTouchZoom(event){
   var o = this;
   var delta = event.delta;
   // 获得空间
   var space = o._activeSpace;
   if(!space){
      return;
   }
   // 相机处理
   var camera = space.camera();
   camera.doForward(delta * 0.006);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FE3dSceneCanvas_onDataLoaded = function FE3dSceneCanvas_onDataLoaded(event){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeSpace;
   // 设置投影
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   // 设置移动
   var gr = s._region._resource;
   o._cameraMoveRate = gr.moveSpeed();
   o._cameraKeyRotation = gr.rotationKeySpeed();
   o._cameraMouseRotation = gr.rotationMouseSpeed();
   // 加载完成
   var event = new MO.SEvent(o);
   event.space = s;
   o.processLoadListener(event);
   event.dispose();
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FE3dSceneCanvas_onResize = function FE3dSceneCanvas_onResize(event){
   var o = this;
   o.__base.FE3dCanvas.onResize.call(o, event);
   // 获得相机信息
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeSpace;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSceneCanvas_construct = function FE3dSceneCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureCameraPosition = new MO.SPoint3();
   o._captureCameraRotation = new MO.SVector3();
   // 创建触摸跟踪器
   o._touchTracker = MO.Class.create(MO.FTouchTracker);
   o._touchTracker.addTouchZoomListener(o, o.onTouchZoom);
}

//==========================================================
// <T>测试是否是播放模式。</T>
//
// @method
// @return Boolean 播放模式
//==========================================================
MO.FE3dSceneCanvas_testPlay = function FE3dSceneCanvas_testPlay(){
   return this._actionPlay;
}

//==========================================================
// <T>切换播放模式。</T>
//
// @method
// @param flag:Boolean 模式
//==========================================================
MO.FE3dSceneCanvas_switchPlay = function FE3dSceneCanvas_switchPlay(flag){
   var o = this;
   var space = o._activeSpace;
   var displays = space.allDisplays();
   var count = displays.count();
   for(var i = 0; i < count; i++){
      var display = displays.at(i);
      if(MO.Class.isClass(display, FE3dSceneDisplay)){
         var sprite = display._sprite;
         if(sprite){
            sprite._optionPlay = flag;
         }
         display._optionPlay = flag;
      }
   }
   o._actionPlay = flag;
}

//==========================================================
// <T>测试是否是剪辑模式。</T>
//
// @method
// @return Boolean 剪辑模式
//==========================================================
MO.FE3dSceneCanvas_testMovie = function FE3dSceneCanvas_testMovie(){
   return this._actionMovie;
}

//==========================================================
// <T>切换动画模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
MO.FE3dSceneCanvas_switchMovie = function FE3dSceneCanvas_switchMovie(p){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
   o._actionMovie = p;
}

//==========================================================
// <T>切换动画模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
MO.FE3dSceneCanvas_doAction = function FE3dSceneCanvas_doAction(e, p, f){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   // 获得事件
   e.preventDefault();
   o._actionUp = false;
   o._actionDown = false;
   o._actionForward = false;
   o._actionBack = false;
   // 设置数据
   switch(p){
      case 'fullscreen':
         var v = o._actionFullScreen = !o._actionFullScreen;
         MO.RHtml.fullscreen(o._hPanel, v);
         break;
      case 'play':
         o.switchMovie(!o._actionMovie);
         o.switchPlay(o._actionMovie);
         break;
      case 'up':
         o._actionUp = f;
         break;
      case 'down':
         o._actionDown = f;
         break;
      case 'forward':
         o._actionForward = f;
         break;
      case 'back':
         o._actionBack = f;
         break;
   }
}

//==========================================================
// <T>加载场景处理。</T>
//
// @method
// @param guid:String 唯一编号
//==========================================================
MO.FE3dSceneCanvas_loadByGuid = function FE3dSceneCanvas_loadByGuid(guid){
   var o = this;
   // 收集场景
   var sceneConsole = MO.Console.find(MO.FE3dSceneConsole);
   if(o._activeSpace){
      sceneConsole.free(o._activeSpace);
   }
   // 监听加载完成
   var scene = o._activeSpace = sceneConsole.allocByGuid(o._graphicContext, guid);
   scene.addLoadListener(o, o.onDataLoaded);
   RStage.register('canvas.space', scene);
}

//==========================================================
// <T>加载场景处理。</T>
//
// @method
// @param code:String 代码
//==========================================================
MO.FE3dSceneCanvas_loadByCode = function FE3dSceneCanvas_loadByCode(code){
   var o = this;
   // 收集场景
   var sceneConsole = MO.Console.find(MO.FE3dSceneConsole);
   if(o._activeSpace){
      sceneConsole.free(o._activeSpace);
   }
   // 监听加载完成
   var scene = o._activeSpace = sceneConsole.allocByCode(o._graphicContext, code);
   scene.addLoadListener(o, o.onDataLoaded);
   RStage.register('canvas.space', scene);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dSceneCanvas_dispose = function FE3dSceneCanvas_dispose(){
   var o = this;
   // 释放旋转
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   // 父处理
   o.__base.FE3dCanvas.dispose.call(o);
}
