//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FDsSystemFrameSpaceContent = function FDsSystemFrameSpaceContent(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._scaleRate          = 1;
   o._optionAlpha        = false;
   // @attribute
   o._desktop            = MO.Class.register(o, new MO.AGetter('_desktop'));
   o._guiManager         = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._activeFrame        = null;
   o._activeControls     = null;
   // @attribute
   o._capturePosition    = null;
   o._captureRotation    = null;
   //..........................................................
   // @event
   o.onEnterFrame        = MO.FDsSystemFrameSpaceContent_onEnterFrame;
   // @event
   o.onMouseCaptureStart = MO.FDsSystemFrameSpaceContent_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDsSystemFrameSpaceContent_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDsSystemFrameSpaceContent_onMouseCaptureStop;
   // @event
   o.onResize            = MO.FDsSystemFrameSpaceContent_onResize;
   // @event
   o.onProcess           = MO.FDsSystemFrameSpaceContent_onProcess;
   o.onKeyDown           = MO.FDsSystemFrameSpaceContent_onKeyDown;
   //..........................................................
   // @process
   o.oeResize            = MO.FDsSystemFrameSpaceContent_oeResize;
   o.oeFrame             = MO.FDsSystemFrameSpaceContent_oeFrame;
   //..........................................................
   // @method
   o.construct           = MO.FDsSystemFrameSpaceContent_construct;
   // @method
   o.build               = MO.FDsSystemFrameSpaceContent_build;
   o.controlAction       = MO.FDsSystemFrameSpaceContent_controlAction;
   o.selectControl       = MO.FDsSystemFrameSpaceContent_selectControl;
   o.loadFrame           = MO.FDsSystemFrameSpaceContent_loadFrame;
   // @method
   o.dispose             = MO.FDsSystemFrameSpaceContent_dispose;
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
   var kw = MO.RKeyboard.isPress(MO.EKeyCode.W);
   var ks = MO.RKeyboard.isPress(MO.EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = MO.RKeyboard.isPress(MO.EKeyCode.A);
   var kd = MO.RKeyboard.isPress(MO.EKeyCode.D);
   if(ka && !kd){
      //c.doStrafe(r);
      c.doYaw(r);
   }
   if(!ka && kd){
      //c.doStrafe(-r);
      c.doYaw(-r);
   }
   var kq = MO.RKeyboard.isPress(MO.EKeyCode.Q);
   var ke = MO.RKeyboard.isPress(MO.EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = MO.RKeyboard.isPress(MO.EKeyCode.Z);
   var kw = MO.RKeyboard.isPress(MO.EKeyCode.X);
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
   var st = MO.Console.find(MO.FG3dTechniqueConsole).find(o._graphicContext, MO.FG3dSelectTechnique);
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
   o.__base.FDuiControl.onResize.call(o, event);
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
// <T>按键按下处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDsSystemFrameSpaceContent_controlAction = function FDsSystemFrameSpaceContent_controlAction(keyCode, control){
   var o = this;
   var location = control.location();
   var size = control.size();
   switch(keyCode){
      case MO.EKeyCode.A:
         location.x--;
         return true;
      case MO.EKeyCode.W:
         location.y--;
         return true;
      case MO.EKeyCode.D:
         location.x++;
         return true;
      case MO.EKeyCode.S:
         location.y++;
         return true;
      case MO.EKeyCode.J:
         size.width--;
         return true;
      case MO.EKeyCode.I:
         size.height--;
         return true;
      case MO.EKeyCode.L:
         size.width++;
         return true;
      case MO.EKeyCode.K:
         size.height++;
         return true;
   }
   return false;
}

//==========================================================
// <T>按键按下处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDsSystemFrameSpaceContent_onKeyDown = function FDsSystemFrameSpaceContent_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   var controls = o._activeControls;
   if(!controls.isEmpty()){
      // 选中控件处理
      var changed = false;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         if(o.controlAction(keyCode, control)){
            changed = true;
         }
      }
      // 重绘处理
      if(changed){
         o._activeFrame.build();
      }
   }
}

//==========================================================
// <T>改变当前控件的显示大小。</T>
//
// @method
// @param p:event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FDsSystemFrameSpaceContent_oeResize = function FDsSystemFrameSpaceContent_oeResize(event){
   var o = this;
   o.__base.FDuiControl.oeResize.call(o, event);
   return;
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
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>刷新当前控件的逐帧内容。</T>
//
// @method
// @param event:MO.TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FDsSystemFrameSpaceContent_oeFrame = function FDsSystemFrameSpaceContent_oeFrame(event){
   var o = this;
   o.__base.FDuiControl.oeFrame.call(o, event);
   // 界面处理
   o._guiManager.process();
   // 设置范围
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDsSystemFrameSpaceContent_construct = function FDsSystemFrameSpaceContent_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o._rotation = new MO.SVector3();
   o._activeControls = new MO.TObjects();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
MO.FDsSystemFrameSpaceContent_build = function FDsSystemFrameSpaceContent_build(hPanel){
   var o = this;
   // 创建桌面
   var desktop = o._desktop = MO.Class.create(MO.FDssDesktop);
   desktop.build(hPanel);
   o.linkGraphicContext(desktop.canvas3d());
   // 创建界面桌面
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(desktop.canvas3d());
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(desktop.canvas2d());
   guiManager.setup();
   return;
   o.__base.FDuiControl.build.call(o, hPanel);
   // 设置显示
   o.setPanel(hPanel);
   // 创建舞台
   var stage = o._activeStage = MO.Class.create(MO.FDsStage);
   stage.linkGraphicContext(o);
   var region = stage.region();
   region.linkGraphicContext(o);
   region.backgroundColor().set(0.5, 0.5, 0.5, 1.0);
   stage.selectTechnique(o, MO.FE3dGeneralTechnique);
   var camera = region.camera();
   var projection = camera.projection();
   projection.size().set(hPanel.offsetWidth, hPanel.offsetHeight);
   projection.update();
   camera.position().set(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
   stage.addEnterFrameListener(o, o.onProcess);
   // 注册舞台
   MO.RStage.register('design.frame.stage', stage);
}

//==========================================================
// <T>选择控件。</T>
//
// @method
// @param control:FDuiControl 控件
//==========================================================
MO.FDsSystemFrameSpaceContent_selectControl = function FDsSystemFrameSpaceContent_selectControl(control){
   var o = this;
   var controls = o._activeControls;
   controls.clear();
   controls.push(control);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param code:String 代码
//==========================================================
MO.FDsSystemFrameSpaceContent_loadFrame = function FDsSystemFrameSpaceContent_loadFrame(code){
   var o = this;
   // 释放旧页面
   var frame = o._activeFrame;
   if(frame){
      o._guiManager.unregister(frame);
      o._activeFrame = null;
   }
   // 显示新页面
   var frameConsole = MO.Console.find(MO.FGuiFrameConsole);
   frame = o._activeFrame = frameConsole.get(o, code);
   frame.setLocation(0, 0);
   o._guiManager.register(frame);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDsSystemFrameSpaceContent_dispose = function FDsSystemFrameSpaceContent_dispose(){
   var o = this;
   // 释放旋转
   o._rotation = MO.Lang.Obejct.dispose(o._rotation)
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}
