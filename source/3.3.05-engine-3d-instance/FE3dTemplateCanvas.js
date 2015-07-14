//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3dTemplateCanvas = function FE3dTemplateCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   //..........................................................
   // @attribute
   o._activeTemplate     = null;
   // @attribute
   o._capturePosition    = null;
   o._captureRotation    = null;
   //..........................................................
   // @event
   o.onEnterFrame        = MO.FE3dTemplateCanvas_onEnterFrame;
   // @event
   o.onMouseCaptureStart = MO.FE3dTemplateCanvas_onMouseCaptureStart;
   o.onMouseCapture      = MO.FE3dTemplateCanvas_onMouseCapture;
   o.onMouseCaptureStop  = MO.FE3dTemplateCanvas_onMouseCaptureStop;
   // @event
   o.onResize            = MO.FE3dTemplateCanvas_onResize;
   // @event
   o.onTemplateLoad      = MO.FE3dTemplateCanvas_onTemplateLoad;
   //..........................................................
   // @method
   o.construct           = MO.FE3dTemplateCanvas_construct;
   // @method
   o.loadByGuid          = MO.FE3dTemplateCanvas_loadByGuid;
   o.loadByCode          = MO.FE3dTemplateCanvas_loadByCode;
   // @method
   o.dispose             = MO.FE3dTemplateCanvas_dispose;
   return o;
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateCanvas_onEnterFrame = function FE3dTemplateCanvas_onEnterFrame(){
   var o = this;
   var s = o._activeTemplate;
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
MO.FE3dTemplateCanvas_onMouseCaptureStart = function FE3dTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   // 选取物件
   var r = o._activeTemplate.region();
   var st = MO.Console.find(MO.FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
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
MO.FE3dTemplateCanvas_onMouseCapture = function FE3dTemplateCanvas_onMouseCapture(p){
   var o = this;
   var s = o._activeTemplate;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeTemplate.camera();
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
MO.FE3dTemplateCanvas_onMouseCaptureStop = function FE3dTemplateCanvas_onMouseCaptureStop(p){
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
MO.FE3dTemplateCanvas_onResize = function FE3dTemplateCanvas_onResize(){
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
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
MO.FE3dTemplateCanvas_onTemplateLoad = function FE3dTemplateCanvas_onTemplateLoad(p){
   var o = this;
   var c = o._graphicContext;
   var s = o._activeTemplate;
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
MO.FE3dTemplateCanvas_construct = function FE3dTemplateCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateCanvas_loadByGuid = function FE3dTemplateCanvas_loadByGuid(p){
   var o = this;
   var c = o._graphicContext;
   // 收集场景
   var sc = MO.Console.find(MO.FE3dSceneConsole);
   if(o._activeTemplate != null){
      sc.free(o._activeTemplate);
   }
   // 监听加载完成
   var s = sc.alloc(o, p);
   s.addLoadListener(o, o.onTemplateLoad);
   s.selectTechnique(c, FG3dGeneralTechnique);
   o._stage = o._activeTemplate = s;
   RStage.register('stage3d', s);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param code:String 代码
//==========================================================
MO.FE3dTemplateCanvas_loadByCode = function FE3dTemplateCanvas_loadByCode(code){
   var o = this;
   var context = o._graphicContext;
   // 收集场景
   var templateConsole = MO.Console.find(MO.FE3dTemplateConsole);
   if(o._activeTemplate != null){
      templateConsole.free(o._activeTemplate);
   }
   // 监听加载完成
   var template = templateConsole.allocByCode(context, code);
   template.addLoadListener(o, o.onTemplateLoad);
   template.selectTechnique(context, FE3dGeneralTechnique);
   o._stage = o._activeTemplate = template;
   MO.RStage.register('stage.template', template);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateCanvas_dispose = function FE3dTemplateCanvas_dispose(){
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
