//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FUiCanvas, MListenerLoad, MMouseCapture);
   //..........................................................
   o._toolbar            = null;
   o._context            = null;
   o._stage              = null;
   o._layer              = null;
   o._activeTemplate     = null;
   o._rotation           = null;
   o._rotationAble       = false;
   o._capturePosition    = null;
   o._dimensional        = null;
   //..........................................................
   // @event
   o.onBuild             = FDsTemplateCanvas_onBuild;
   o.onMouseCaptureStart = FDsTemplateCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FDsTemplateCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FDsTemplateCanvas_onMouseCaptureStop;
   o.onEnterFrame        = FDsTemplateCanvas_onEnterFrame;
   o.onTemplateLoad      = FDsTemplateCanvas_onTemplateLoad;
   //..........................................................
   o.oeRefresh           = FDsTemplateCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct           = FDsTemplateCanvas_construct;
   // @method
   o.loadTemplate        = FDsTemplateCanvas_loadTemplate;
   // @method
   o.dispose             = FDsTemplateCanvas_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsTemplateCanvas_onBuild(p){
   var o = this;
   o.__base.FUiCanvas.onBuild.call(o, p);
   // 创建渲染环境
   var h = o._hPanel;
   h.__linker = o;
   var c = o._context = REngine3d.createContext(FWglContext, h);
   // 创建简单舞台
   var g = o._stage = RClass.create(FSimpleStage3d);
   g._optionKeyboard = false;
   g.backgroundColor().set(0.5, 0.5, 0.5, 1);
   g.selectTechnique(c, FG3dGeneralTechnique);
   o._layer = o._stage.spriteLayer();
   RStage.register('stage3d', o._stage);
   // 设置相机
   var rc = g.camera();
   rc.setPosition(0, 6, -20);
   rc.lookAt(0, 3, 0);
   rc.update();
   // 设置投影
   var rp = rc.projection();
   rp.size().set(h.width, h.height);
   rp.update();
   // 设置光源
   var l = g.directionalLight();
   var lc = l.camera();
   lc.setPosition(10, 10, 0);
   lc.lookAt(0, 0, 0);
   lc.update();
   // 创建坐标系
   var dm = o._dimensional = RClass.create(FRd3Dimensional);
   dm.setup(c);
   o._layer.pushRenderable(dm);
   // 启动处理
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(100);
   RConsole.find(FMouseConsole).register(o);
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   o._capturePosition.set(p.clientX, p.clientY);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvas_onMouseCapture(p){
   var o = this;
   var t = o._activeTemplate;
   if(!t){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var d = t.displays().get(0);
   var m = d.modelMatrix();
   switch(o._toolbar._canvasModeCd){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         m.tx += cx / 360 * 3.14;
         m.ty += cy / 360 * 3.14;
         break;
      case EDsCanvasMode.Rotation:
         m.ry += cx * RMath.DEGREE_RATE;
         break;
      case EDsCanvasMode.Scale:
         m.sx += cx / 100;
         m.sy += cy / 100;
         m.sz += cy / 100;
         break;
   }
   m.updateForce();
}

//==========================================================
// <T>鼠标捕捉结束处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_onEnterFrame(){
   var o = this;
   //..........................................................
   // 按键处理
   var c = o._stage.camera();
   var r = 0.3;
   var kw = RKeyboard.isPress(EKeyCode.W);
   var ks = RKeyboard.isPress(EKeyCode.S);
   if(kw && !ks){
      c.doWalk(r);
   }
   if(!kw && ks){
      c.doWalk(-r);
   }
   var ka = RKeyboard.isPress(EKeyCode.A);
   var kd = RKeyboard.isPress(EKeyCode.D);
   if(ka && !kd){
      c.doStrafe(r);
   }
   if(!ka && kd){
      c.doStrafe(-r);
   }
   var kq = RKeyboard.isPress(EKeyCode.Q);
   var ke = RKeyboard.isPress(EKeyCode.E);
   if(kq && !ke){
      c.doFly(r);
   }
   if(!kq && ke){
      c.doFly(-r);
   }
   c.update();
   //..........................................................
   // 旋转模型
   var m = o._activeTemplate;
   if(m){
      var r = o._rotation;
      //m.location().set(0, -8.0, 0);
      m.rotation().set(0, r.y, 0);
      //m.scale().set(3.0, 3.0, 3.0);
      //m.scale().set(0.003, 0.003, 0.003);
      m.scale().set(0.2, 0.2, 0.2);
      m.update();
      // 设置变量
      if(o._rotationAble){
         r.y += 0.01;
      }
   }
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsTemplateCanvas_onTemplateLoad(p){
   var o = this;
   // 加载完成
   o.processLoadListener(o);
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_oeRefresh(p){
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
   var rp = o._stage.camera().projection();
   rp.size().set(w, h);
   rp.update();
   // 设置范围
   c.setViewport(0, 0, w, h);
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_construct(){
   var o = this;
   o.__base.FUiCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._rotation = new SVector3();
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_loadTemplate(p){
   var o = this;
   var rmc = RConsole.find(FE3dTemplateConsole);
   if(o._activeTemplate != null){
      rmc.free(o._activeTemplate);
   }
   // 收集一个显示模板
   var m = rmc.alloc(o._context, p);
   m.addLoadListener(o, o.onTemplateLoad);
   o._layer.pushDisplay(m);
   o._activeTemplate = m;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_dispose(){
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
