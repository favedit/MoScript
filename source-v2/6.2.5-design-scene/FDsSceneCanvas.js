//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsSceneCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   //..........................................................
   o._context            = null;
   o._canvasModeCd       = EDsCanvasMode.Drop;
   o._activeScene        = null;
   o._rotation           = null;
   o._rotationAble       = false;
   o._capturePosition    = null;
   o._captureMatrix      = null;
   o._captureRotation    = null;
   o._dimensional        = null;
   o._selectBoundBox     = null;
   //..........................................................
   // @event
   o.onBuild             = FDsSceneCanvas_onBuild;
   o.onMouseCaptureStart = FDsSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FDsSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FDsSceneCanvas_onMouseCaptureStop;
   o.onEnterFrame        = FDsSceneCanvas_onEnterFrame;
   o.onSceneLoad         = FDsSceneCanvas_onSceneLoad;
   //..........................................................
   o.oeRefresh           = FDsSceneCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct           = FDsSceneCanvas_construct;
   // @method
   o.selectRenderable    = FDsSceneCanvas_selectRenderable;
   o.loadScene           = FDsSceneCanvas_loadScene;
   // @method
   o.dispose             = FDsSceneCanvas_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsSceneCanvas_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   //var d = t.renderables().get(0);
   o._capturePosition.set(p.clientX, p.clientY);
   //o._captureMatrix.assign(d.matrix());
   o._captureRotation.assign(s.camera()._rotation);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneCanvas_onMouseCapture(p){
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
   switch(o._canvasModeCd){
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
function FDsSceneCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_onEnterFrame(){
   var o = this;
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
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsSceneCanvas_onSceneLoad(p){
   var o = this;
   // 加载完成
   o.processLoadListener(o);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_oeRefresh(p){
   var o = this;
   var c = o._context;
   o.__base.FDsCanvas.oeRefresh.call(o, p);
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
function FDsSceneCanvas_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
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
function FDsSceneCanvas_selectRenderable(p){
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
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_loadScene(p){
   var o = this;
   var c = o._context;
   // 收集场景
   var rmc = RConsole.find(FE3dSceneConsole);
   if(o._activeScene != null){
      rmc.free(o._activeScene);
   }
   // 监听加载完成
   var m = rmc.alloc(o._context, p);
   m.addLoadListener(o, o.onSceneLoad);
   m.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeScene = m;
   RStage.register('stage3d', m);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneCanvas_dispose(){
   var o = this;
   // 释放旋转
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
