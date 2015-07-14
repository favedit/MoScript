//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3dSimpleCanvas = function FE3dSimpleCanvas(o){
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
   o._stage                 = MO.Class.register(o, new MO.AGetter('_stage'));
   //..........................................................
   // @event
   o.onEnterFrame           = MO.FE3dSimpleCanvas_onEnterFrame;
   // @event
   o.onMouseCaptureStart    = MO.FE3dSimpleCanvas_onMouseCaptureStart;
   o.onMouseCapture         = MO.FE3dSimpleCanvas_onMouseCapture;
   o.onMouseCaptureStop     = MO.FE3dSimpleCanvas_onMouseCaptureStop;
   // @event
   o.onTouchStart           = MO.FE3dSimpleCanvas_onTouchStart;
   o.onTouchMove            = MO.FE3dSimpleCanvas_onTouchMove;
   o.onTouchStop            = MO.FE3dSimpleCanvas_onTouchStop;
   // @event
   o.onSceneLoad            = MO.FE3dSimpleCanvas_onSceneLoad;
   o.onResize               = MO.FE3dSimpleCanvas_onResize;
   //..........................................................
   // @method
   o.construct              = MO.FE3dSimpleCanvas_construct;
   // @method
   o.build                  = MO.FE3dSimpleCanvas_build;
   o.setPanel               = MO.FE3dSimpleCanvas_setPanel;
   // @method
   o.switchPlay             = MO.FE3dSimpleCanvas_switchPlay;
   o.switchMovie            = MO.FE3dSimpleCanvas_switchMovie;
   o.doAction               = MO.FE3dSimpleCanvas_doAction;
   // @method
   o.dispose                = MO.FE3dSimpleCanvas_dispose;
   return o;
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleCanvas_onEnterFrame = function FE3dSimpleCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   //..........................................................
   // 按键处理
   var c = s.camera();
   var d = o._cameraMoveRate;
   var r = o._cameraKeyRotation;
   var kw = MO.Window.Keyboard.isPress(MO.EKeyCode.W);
   var ks = MO.Window.Keyboard.isPress(MO.EKeyCode.S);
   if((kw && !ks) || o._actionForward){
      c.doWalk(d);
   }
   if((!kw && ks) || o._actionBack){
      c.doWalk(-d);
   }
   var ka = MO.Window.Keyboard.isPress(MO.EKeyCode.A);
   var kd = MO.Window.Keyboard.isPress(MO.EKeyCode.D);
   if(ka && !kd){
      //c.doStrafe(r);
      c.doYaw(r);
   }
   if(!ka && kd){
      //c.doStrafe(-r);
      c.doYaw(-r);
   }
   var kq = MO.Window.Keyboard.isPress(MO.EKeyCode.Q);
   var ke = MO.Window.Keyboard.isPress(MO.EKeyCode.E);
   if((kq && !ke) || o._actionUp){
      c.doFly(d);
   }
   if((!kq && ke) || o._actionDown){
      c.doFly(-d);
   }
   var kz = MO.Window.Keyboard.isPress(MO.EKeyCode.Z);
   var kw = MO.Window.Keyboard.isPress(MO.EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   //..........................................................
   // 旋转模型
   if(o._optionRotation){
      var r = o._rotation;
      // 旋转所有层
      var ls = s.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      // 设置变量
      r.y += 0.01;
   }
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FE3dSimpleCanvas_onMouseCaptureStart = function FE3dSimpleCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeSpace;
   if(!s){
      return;
   }
   // 选取物件
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureCameraRotation.assign(s.camera()._rotation);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FE3dSimpleCanvas_onMouseCapture = function FE3dSimpleCanvas_onMouseCapture(p){
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
MO.FE3dSimpleCanvas_onMouseCaptureStop = function FE3dSimpleCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>触摸事件开始处理。</T>
//
// @method
// @param p:event:TouchEvent 触摸事件
//==========================================================
MO.FE3dSimpleCanvas_onTouchStart = function FE3dSimpleCanvas_onTouchStart(p){
   var o = this;
   // 检查场景加载完成
   var s = o._activeSpace;
   if(!s){
      return;
   }
   var r = o._activeSpace.region();
   // 获得事件
   var ts = p.touches;
   var c = ts.length;
   // 单个触点事件处理
   if(c == 1){
      p.preventDefault();
      // 处理事件
      var t = ts[0];
      o._captureStatus = true;
      o._capturePosition.set(t.clientX, t.clientY);
      o._captureCameraPosition.assign(s.camera().position());
      o._captureCameraRotation.assign(s.camera().rotation());
   }
}

//==========================================================
// <T>触摸事件移动处理。</T>
//
// @method
// @param p:event:TouchEvent 触摸事件
//==========================================================
MO.FE3dSimpleCanvas_onTouchMove = function FE3dSimpleCanvas_onTouchMove(p){
   var o = this;
   // 检查状态
   if(!o._captureStatus){
      return;
   }
   // 获得事件
   var ts = p.touches;
   var c = ts.length;
   // 单个触点事件处理
   if(c == 1){
      p.preventDefault();
      // 处理事件
      var t = ts[0];
      var cm = o._activeSpace.camera();
      var cr = cm.rotation();
      // 计算偏移
      var cx = t.clientX - o._capturePosition.x;
      var cy = t.clientY - o._capturePosition.y;
      cr.x = o._captureCameraRotation.x + (-cy * o._cameraMouseRotation);
      cr.y = o._captureCameraRotation.y + (-cx * o._cameraMouseRotation);
   }
}

//==========================================================
// <T>触摸事件结束处理。</T>
//
// @method
// @param p:event:TouchEvent 触摸事件
//==========================================================
MO.FE3dSimpleCanvas_onTouchStop = function FE3dSimpleCanvas_onTouchStop(p){
   var o = this;
   o._captureStatus = false;
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
MO.FE3dSimpleCanvas_onSceneLoad = function FE3dSimpleCanvas_onSceneLoad(p){
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
   o.processLoadListener(o, s);
}

//==========================================================
// <T>改变大小事件处理。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
MO.FE3dSimpleCanvas_onResize = function FE3dSimpleCanvas_onResize(p){
   var o = this;
   o.__base.FE3dCanvas.onResize.call(o, p);
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
MO.FE3dSimpleCanvas_construct = function FE3dSimpleCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureCameraPosition = new MO.SPoint3();
   o._captureCameraRotation = new MO.SVector3();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleCanvas_build = function FE3dSimpleCanvas_build(hPanel){
   var o = this;
   o.__base.FE3dCanvas.build.call(o, hPanel);
   // 创建舞台
   var stage = o._stage = o._activeSpace = MO.Class.create(MO.FE3dSimpleStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.selectTechnique(o, FE3dGeneralTechnique);
   //var faceLayer = stage.faceLayer();
   //faceLayer.selectTechnique(o, FE3dControlTechnique);
   // 注册舞台
   MO.RStage.register('simple.stage', stage);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleCanvas_setPanel = function FE3dSimpleCanvas_setPanel(hPanel){
   var o = this;
   o.__base.FE3dCanvas.setPanel.call(o, hPanel);
   // 设置相机投影
   var stage = o._stage;
   var camera = stage.region().camera();
   var projection = camera.projection();
   projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
   projection.update();
   camera.position().set(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
}

//==========================================================
// <T>切换播放模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
MO.FE3dSimpleCanvas_switchPlay = function FE3dSimpleCanvas_switchPlay(p){
   var o = this;
   var s = o._activeSpace;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
   o._actionPlay = p;
}

//==========================================================
// <T>切换动画模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
MO.FE3dSimpleCanvas_switchMovie = function FE3dSimpleCanvas_switchMovie(p){
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
MO.FE3dSimpleCanvas_doAction = function FE3dSimpleCanvas_doAction(e, p, f){
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
         RHtml.fullscreen(o._hPanel, v);
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dSimpleCanvas_dispose = function FE3dSimpleCanvas_dispose(){
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
