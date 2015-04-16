//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsCanvas(o){
   o = RClass.inherits(this, o, FUiCanvas, MGraphicObject, MListenerLoad, MMouseCapture);
   //..........................................................
   // @attribute
   o._activeSpace         = null;
   // @attribute
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
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
   o._rotationAble        = false;
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
   o.dispose              = FDsCanvas_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsCanvas_onBuild(p){
   var o = this;
   o.__base.FUiCanvas.onBuild.call(o, p);
   // 创建渲染环境
   var h = o._hPanel;
   h.__linker = o;
   h.style.width = '100%';
   h.style.height = '100%';
   // 创建渲染环境
   var a = new Object();
   a.alpha = false;
   a.antialias = true;
   var c = o._graphicContext = REngine3d.createContext(FWglContext, h, a);
   // 创建坐标系
   var dm = o._dimensional = RClass.create(FE3dDimensional);
   dm.linkGraphicContext(c);
   dm.setup();
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
// @param p:event:SEvent 事件
//==========================================================
function FDsCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsCanvas_onEnterFrame(){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   //..........................................................
   // 按键处理
   var camera = space.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if(kw && !ks){
      camera.doWalk(d);
   }
   if(!kw && ks){
      camera.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      //c.doStrafe(r);
      camera.doYaw(r);
   }
   if(!ka && kd){
      //c.doStrafe(-r);
      camera.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if(kq && !ke){
      camera.doFly(d);
   }
   if(!kq && ke){
      camera.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      camera.doPitch(r);
   }
   if(!kz && kw){
      camera.doPitch(-r);
   }
   camera.update();
   //..........................................................
   // 旋转模型
   //if(s){
      //var r = o._rotation;
      //m.location().set(0, -8.0, 0);
      //m.rotation().set(0, r.y, 0);
      //m.scale().set(3.0, 3.0, 3.0);
      //m.scale().set(0.002, 0.002, 0.002);
      //m.scale().set(0.2, 0.2, 0.2);
      //m.update();
      // 设置变量
      //if(o._rotationAble){
      //   r.y += 0.01;
      //}
   //}
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
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCanvas_dispose(){
   var o = this;
   // 释放旋转
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   // 父处理
   o.__base.FUiCanvas.dispose.call(o);
}
