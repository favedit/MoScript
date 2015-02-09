//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsCanvas(o){
   o = RClass.inherits(this, o, FUiCanvas, MListenerLoad, MMouseCapture);
   //..........................................................
   o._context            = null;
   o._stage              = null;
   o._rotation           = null;
   o._rotationAble       = false;
   o._capturePosition    = null;
   o._captureMatrix      = null;
   o._captureRotation    = null;
   o._dimensional        = null;
   o._selectBoundBox     = null;
   //..........................................................
   // @event
   o.onBuild             = FDsCanvas_onBuild;
   o.onMouseCaptureStart = FDsCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FDsCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FDsCanvas_onMouseCaptureStop;
   o.onEnterFrame        = FDsCanvas_onEnterFrame;
   //..........................................................
   o.oeRefresh           = FDsCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct           = FDsCanvas_construct;
   // @method
   o.selectRenderable    = FDsCanvas_selectRenderable;
   // @method
   o.dispose             = FDsCanvas_dispose;
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
   var c = o._context = REngine3d.createContext(FWglContext, h);
   // 创建坐标系
   //var dm = o._dimensional = RClass.create(FRd3Dimensional);
   //dm.linkGraphicContext(c);
   //dm.setup();
   // 创建选取包围盒
   //var bb = o._selectBoundBox = RClass.create(FRd3BoundBox);
   //bb.linkGraphicContext(o._context);
   //bb.setup();
   // 启动处理
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(20);
   // 注册鼠标捕捉监听
   RConsole.find(FMouseConsole).register(o);
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCanvas_onMouseCaptureStart(p){
   var o = this;
   //var d = t.renderables().get(0);
   //o._capturePosition.set(p.clientX, p.clientY);
   //o._captureMatrix.assign(d.matrix());
   //o._captureRotation.assign(s.camera()._rotation);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   //var d = t.renderables().get(0);
   //var m = d.matrix();
   //var cm = o._captureMatrix;
   switch(o._toolbar._canvasModeCd){
      case EDsCanvasMode.Drop:
         var c = o._activeScene.camera();
         var r = c.rotation();
         var cr = o._captureRotation;
         r.x = cr.x + cy * 0.003;
         r.y = cr.y + cx * 0.003;
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
   return;
   var s = o._activeScene;
   if(!s){
      return;
   }
   //..........................................................
   // 按键处理
   var c = s.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      //c.doStrafe(r);
      c.doYaw(r);
   }
   if(!ka && kd){
      //c.doStrafe(-r);
      c.doYaw(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = RKeyboard.isPress(EKeyCode.Z);
   var kw = RKeyboard.isPress(EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   //..........................................................
   // 旋转模型
   if(s){
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
   }
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsCanvas_oeRefresh(p){
   var o = this;
   var c = o._context;
   o.__base.FUiCanvas.oeRefresh.call(o, p);
   // 获得大小
   var w = o._hParent.offsetWidth;
   var h = o._hParent.offsetHeight;
   // 设置大小
   var hc = o._hPanel;
   hc.width = w;
   hc.height = h;
   // 设置投影
   //var rp = o._activeScene.camera().projection();
   //rp.size().set(w, h);
   //rp.update();
   // 设置范围
   c.setViewport(0, 0, w, h);
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
// <T>选中渲染对象处理。</T>
//
// @method
//==========================================================
function FDsCanvas_selectRenderable(p){
   var o = this;
   var r = p.resource();
   var rm = r.mesh();
   var rl = rm.outline();
   // 显示包围盒
   var b = o._selectBoundBox;
   b.outline().assign(rl);
   b.upload();
   b.remove();
   p._display.pushRenderable(b);
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
