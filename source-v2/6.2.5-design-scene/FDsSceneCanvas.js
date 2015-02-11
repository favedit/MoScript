//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsSceneCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas);
   //..........................................................
   o._context             = null;
   o._canvasModeCd        = EDsCanvasMode.Drop;
   o._canvasMoveCd        = EDsCanvasDrag.Unknown;
   o._activeScene         = null;
   o._rotation            = null;
   o._optionRotation      = false;
   o._capturePosition     = null;
   o._captureMatrix       = null;
   o._captureRotation     = null;
   o._dimensional         = null;
   o._selectBoundBox      = null;
   o._selectRenderable    = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   //..........................................................
   // @event
   o.onBuild              = FDsSceneCanvas_onBuild;
   o.onMouseCaptureStart  = FDsSceneCanvas_onMouseCaptureStart;
   o.onMouseCapture       = FDsSceneCanvas_onMouseCapture;
   o.onMouseCaptureStop   = FDsSceneCanvas_onMouseCaptureStop;
   o.onEnterFrame         = FDsSceneCanvas_onEnterFrame;
   o.onSceneLoad          = FDsSceneCanvas_onSceneLoad;
   //..........................................................
   o.oeRefresh            = FDsSceneCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct            = FDsSceneCanvas_construct;
   // @method
   o.selectRenderable     = FDsSceneCanvas_selectRenderable;
   o.switchMode           = FDsSceneCanvas_switchMode;
   o.loadScene            = FDsSceneCanvas_loadScene;
   // @method
   o.dispose              = FDsSceneCanvas_dispose;
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
   // 创建界面控制器
   var c = o._context;
   var tc = RConsole.find(FE3dTemplateConsole);
   var t = o._templateTranslation = tc.alloc(c, 'com.design.translation');
   t._optionFace = true;
   t.hide();
   var t = o._templateRotation = tc.alloc(c, 'com.design.rotation');
   t._optionFace = true;
   t.hide();
   var t = o._templateScale = tc.alloc(c, 'com.design.scale');
   t._optionFace = true;
   t.hide();
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
   // 选取物件
   var r = o._activeScene.region();
   var st = RConsole.find(FG3dTechniqueConsole).find(o._context, FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o.selectRenderable(r);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
   if(r){
      var d = r.display();
      o._captureMatrix.assign(d.matrix());
   }
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
   var mc = o._canvasModeCd;
   var mv = o._canvasMoveCd;
   var cm = o._captureMatrix;
   var sm = null;
   var sr = o._selectRenderable;
   if(sr){
      var sd = sr.display();
      sm = sd.matrix();
   }
   switch(mc){
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
         if(sr){
            if(mv == EDsCanvasDrag.X){
               sm.tx = cm.tx + cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               sm.ty = cm.ty + -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               sm.tz = cm.tz + cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Rotation:
         if(sr){
            if(mv == EDsCanvasDrag.X){
               sm.rx = cm.rx + cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               sm.ry = cm.ry + -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               sm.rz = cm.rz + cx / 10;
            }
         }
         break;
      case EDsCanvasMode.Scale:
         if(sr){
            if(mv == EDsCanvasDrag.X){
               sm.sx = cm.sx + cx / 10;
            }else if(mv == EDsCanvasDrag.Y){
               sm.sy = cm.sy + -cy / 10;
            }else if(mv == EDsCanvasDrag.Z){
               sm.sz = cm.sz + cx / 10;
            }else if(mv == EDsCanvasDrag.All){
               sm.sx = cm.sx + cx / 10;
               sm.sy = cm.sy + cx / 10;
               sm.sz = cm.sz + cx / 10;
            }
         }
         break;
   }
   if(sm){
      sm.updateForce();
      if(o._templateFace){
         var tm = o._templateFace.matrix();
         tm.assign(sm);
         tm.setScaleAll(o._templateViewScale);
         tm.update();
      }
   }
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
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsSceneCanvas_onSceneLoad(p){
   var o = this;
   var c = o._context;
   var s = o._activeScene;
   // 创建界面层
   var l = RClass.create(FDisplayUiLayer);
   l.selectTechnique(c, FG3dControlTechnique);
   l.pushDisplay(o._templateTranslation);
   l.pushDisplay(o._templateRotation);
   l.pushDisplay(o._templateScale);
   s.registerLayer('ui', l);
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
// @param p:renderable:FG3dRenderable 渲染对象
//==========================================================
function FDsSceneCanvas_selectRenderable(p){
   var o = this;
   var sr = p;
   if(sr){
      var n = sr._renderable._resource._code;
      switch(n){
         case 'ms_translation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_translation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_rotation_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_x':
            o._canvasMoveCd = EDsCanvasDrag.X;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_y':
            o._canvasMoveCd = EDsCanvasDrag.Y;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_z':
            o._canvasMoveCd = EDsCanvasDrag.Z;
            o._templateRenderable = sr;
            return;
         case 'ms_scale_all':
            o._canvasMoveCd = EDsCanvasDrag.All;
            o._templateRenderable = sr;
            return;
         default:
            o._canvasMoveCd = EDsCanvasDrag.Unknown;
            o._templateRenderable = null;
      }
   }
   o._selectRenderable = p;
   // 设置变量
   var t = o._templateTranslation;
   var r = o._templateRotation;
   var s = o._templateScale;
   // 模式判定
   var mc = o._canvasModeCd;
   switch(mc){
      case EDsCanvasMode.Drop:
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         t.setVisible(sr != null);
         r.hide();
         s.hide();
         o._templateFace = t;
         break;
      case EDsCanvasMode.Rotation:
         t.hide();
         r.setVisible(sr != null);
         s.hide();
         o._templateFace = r;
         break;
      case EDsCanvasMode.Scale:
         t.hide();
         r.hide();
         s.setVisible(sr != null);
         o._templateFace = s;
         break;
   }
   o.__base.FDsCanvas.selectRenderable.call(o, sr);
   // 设置位置
   var st = o._templateFace;
   if(sr && st){
      var d = sr.display();
      var m = st.matrix();
      m.assign(d.matrix());
      m.setScaleAll(o._templateViewScale);
      m.update();
   }
}

//==========================================================
// <T>切换工作模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsSceneCanvas_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
   // 设置变量
   o.selectRenderable(o._selectRenderable);
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
   //RStage.register('stage3d', m);
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
