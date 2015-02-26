//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3dSceneCanvas(o){
   o = RClass.inherits(this, o, FE3dCanvas);
   //..........................................................
   // @attribute
   o._activeScene        = null;
   // @attribute
   o._capturePosition    = null;
   o._captureRotation    = null;
   //..........................................................
   // @event
   o.onEnterFrame        = FE3dSceneCanvas_onEnterFrame;
   // @event
   o.onMouseCaptureStart = FE3dSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture      = FE3dSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop  = FE3dSceneCanvas_onMouseCaptureStop;
   // @event
   o.onResize            = FE3dSceneCanvas_onResize;
   // @event
   o.onSceneLoad         = FE3dSceneCanvas_onSceneLoad;
   //..........................................................
   // @method
   o.construct           = FE3dSceneCanvas_construct;
   // @method
   o.build               = FE3dSceneCanvas_build;
   o.load                = FE3dSceneCanvas_load;
   o.setPanel            = FE3dSceneCanvas_setPanel;
   o.switchPlay          = FE3dSceneCanvas_switchPlay;
   o.switchMovie         = FE3dSceneCanvas_switchMovie;
   // @method
   o.dispose             = FE3dSceneCanvas_dispose;
   return o;
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FE3dSceneCanvas_onEnterFrame(){
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
function FE3dSceneCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   // 选取物件
   var r = o._activeScene.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._context, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FE3dSceneCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeScene;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeScene.camera();
   var r = c.rotation();
   var cr = o._captureRotation;
   r.x = cr.x + cy * 0.003;
   r.y = cr.y + cx * 0.003;
}

//==========================================================
// <T>鼠标捕捉结束处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FE3dSceneCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FE3dSceneCanvas_onResize(){
   var o = this;
   // 获得大小
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   // 设置大小
   var hc = o._hCanvas;
   hc.width = w;
   hc.height = h;
   // 设置范围
   var c = o._context;
   c.setViewport(0, 0, w, h);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FE3dSceneCanvas_onSceneLoad(p){
   var o = this;
   var c = o._context;
   var s = o._activeScene;
   // 设置投影
   var cs = c.size();
   var rp = s.camera().projection();
   rp.size().set(cs.width, cs.height);
   rp.update();
   // 加载完成
   o.processLoadListener(o, s);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneCanvas_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._rotation = new SVector3();
   o._capturePosition = new SPoint2();
   o._captureRotation = new SVector3();
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:document:HtmlTag 页面元素
//==========================================================
function FE3dSceneCanvas_build(p){
   var o = this;
   // 创建画板
   var h = o._hCanvas = RBuilder.create(p, 'CANVAS');
   h.__linker = o;
   // 创建渲染环境
   var c = o._context = REngine3d.createContext(FWglContext, h);
   // 启动处理
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start(1000 / 60);
   // 监听大小改变
   RWindow.lsnsResize.register(o, o.onResize);
   // 注册鼠标捕捉监听
   RConsole.find(FMouseConsole).register(o);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FE3dSceneCanvas_load(p){
   var o = this;
   var c = o._context;
   // 收集场景
   var sc = RConsole.find(FE3dSceneConsole);
   if(o._activeScene != null){
      sc.free(o._activeScene);
   }
   // 监听加载完成
   var s = sc.alloc(o._context, p);
   s.addLoadListener(o, o.onSceneLoad);
   s.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeScene = s;
   RStage.register('stage3d', s);
}

//==========================================================
// <T>设置面板处理。</T>
//
// @method
//==========================================================
function FE3dSceneCanvas_setPanel(p){
   var o = this;
   var c = o._context;
   var hc = o._hCanvas;
   // 放入父容器
   o._hPanel = p;
   p.appendChild(o._hCanvas);
   // 改变大小
   o.onResize();
}

//==========================================================
// <T>切换播放模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FE3dSceneCanvas_switchPlay(p){
   var o = this;
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionPlay = p;
      }
   }
}

//==========================================================
// <T>切换动画模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FE3dSceneCanvas_switchMovie(p){
   var o = this;
   var s = o._activeScene;
   var ds = s.allDisplays();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(d._movies){
         d._optionMovie = p;
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dSceneCanvas_dispose(){
   var o = this;
   // 释放旋转
   var v = o._rotation;
   if(v){
      v.dispose();
      o._rotation = null;
   }
   // 父处理
   o.__base.FObject.dispose.call(o);
}
