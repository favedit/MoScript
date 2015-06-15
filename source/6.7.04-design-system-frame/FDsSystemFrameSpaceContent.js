with(MO){
   //==========================================================
   // <T>模板画板。</T>
   //
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FDsSystemFrameSpaceContent = function FDsSystemFrameSpaceContent(o){
      o = RClass.inherits(this, o, FDsCanvas);
      //..........................................................
      // @attribute
      o._scaleRate          = 1;
      o._optionAlpha        = false;
      // @attribute
      o._activeFrame        = null;
      o._activeStage        = RClass.register(o, new AGetter('_activeStage'));
      // @attribute
      o._capturePosition    = null;
      o._captureRotation    = null;
      //..........................................................
      // @event
      o.onEnterFrame        = FDsSystemFrameSpaceContent_onEnterFrame;
      // @event
      o.onMouseCaptureStart = FDsSystemFrameSpaceContent_onMouseCaptureStart;
      o.onMouseCapture      = FDsSystemFrameSpaceContent_onMouseCapture;
      o.onMouseCaptureStop  = FDsSystemFrameSpaceContent_onMouseCaptureStop;
      // @event
      o.onResize            = FDsSystemFrameSpaceContent_onResize;
      // @event
      o.onProcess           = FDsSystemFrameSpaceContent_onProcess;
      //..........................................................
      o.oeResize            = FDsSystemFrameSpaceContent_oeResize;
      //..........................................................
      // @method
      o.construct           = FDsSystemFrameSpaceContent_construct;
      // @method
      o.build               = FDsSystemFrameSpaceContent_build;
      o.loadFrame           = FDsSystemFrameSpaceContent_loadFrame;
      // @method
      o.dispose             = FDsSystemFrameSpaceContent_dispose;
      return o;
   }

   //==========================================================
   // <T>每帧处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameSpaceContent_onEnterFrame = function FDsSystemFrameSpaceContent_onEnterFrame(){
      var o = this;
      var stage = o._activeStage;
      if(!stage){
         return;
      }
      //..........................................................
      // 按键处理
      var c = stage.camera();
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
         var ls = stage.layers();
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
   MO.FDsSystemFrameSpaceContent_onMouseCaptureStart = function FDsSystemFrameSpaceContent_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeStage;
      if(!s){
         return;
      }
      // 选取物件
      var r = o._activeStage.region();
      var st = RConsole.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
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
   MO.FDsSystemFrameSpaceContent_onMouseCapture = function FDsSystemFrameSpaceContent_onMouseCapture(p){
      var o = this;
      var s = o._activeStage;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var c = o._activeStage.camera();
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
   MO.FDsSystemFrameSpaceContent_onMouseCaptureStop = function FDsSystemFrameSpaceContent_onMouseCaptureStop(p){
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FDsSystemFrameSpaceContent_onResize = function FDsSystemFrameSpaceContent_onResize(){
      var o = this;
      o.__base.FDsCanvas.onResize.call(o, event);
      // 获得相机信息
      var c = o._graphicContext;
      var cs = c.size();
      var s = o._activeStage;
      if(s){
         var rp = s.camera().projection();
         rp.size().set(cs.width, cs.height);
         rp.update();
      }
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FDsSystemFrameSpaceContent_onProcess = function FDsSystemFrameSpaceContent_onProcess(event){
      var o = this;
      var frame = o._activeFrame;
      if(frame){
         frame.psUpdate();
      }
   }

   //==========================================================
   // <T>刷新处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameSpaceContent_oeResize = function FDsSystemFrameSpaceContent_oeResize(p){
      var o = this;
      o.__base.FDsCanvas.oeResize.call(o, p);
      // 获得大小
      var hp = o._hPanel;
      var w = hp.offsetWidth;
      var h = hp.offsetHeight;
      // 设置投影
      var s = o._activeSpace;
      if(s){
         var cp = s.camera().projection();
         cp.size().set(w, h);
         cp.update();
      }
      // 设置范围
      return EEventStatus.Stop;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameSpaceContent_construct = function FDsSystemFrameSpaceContent_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._rotation = new SVector3();
      o._capturePosition = new SPoint2();
      o._captureRotation = new SVector3();
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameSpaceContent_build = function FDsSystemFrameSpaceContent_build(hPanel){
      var o = this;
      o.__base.FDsCanvas.build.call(o, hPanel);
      // 设置显示
      o.setPanel(hPanel);
      // 创建舞台
      var stage = o._activeStage = MO.RClass.create(MO.FDsStage);
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, FE3dGeneralTechnique);
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.size().set(hPanel.offsetWidth, hPanel.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
      stage.addEnterFrameListener(o, o.onProcess);
      // 注册舞台
      RStage.register('design.frame.stage', stage);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsSystemFrameSpaceContent_loadFrame = function FDsSystemFrameSpaceContent_loadFrame(code){
      var o = this;
      var context = o._graphicContext;
      var stage = o._activeStage;
      var layer = stage.faceLayer();
      var frame = o._activeFrame;
      // 释放旧数据
      if(frame){
         var renderable = frame.renderable();
         layer.removeRenderable(renderable);
         o._activeFrame = null;
      }
      var frameConsole = MO.RConsole.find(MO.FGuiFrameConsole);
      var frame = o._activeFrame = frameConsole.get(context, code);
      // 创建标志栏
      var renderable = frame.renderable();
      renderable.setLocation(10, 10);
      layer.pushRenderable(renderable);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameSpaceContent_dispose = function FDsSystemFrameSpaceContent_dispose(){
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
}
