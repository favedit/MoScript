//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FCanvas);
   //..........................................................
   o._context   = null;
   o._stage     = null;
   o._layer     = null;
   o._activeTemplate = null;
   o._rotationX = 0;
   o._rotationY = 0;
   o._rotationZ = 0;
   //..........................................................
   // @event
   o.onBuild      = FDsTemplateCanvas_onBuild;
   o.onEnterFrame = FDsTemplateCanvas_onEnterFrame;
   //..........................................................
   o.oeRefresh    = FDsTemplateCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct    = FDsTemplateCanvas_construct;
   // @method
   o.loadTemplate = FDsTemplateCanvas_loadTemplate;
   // @method
   o.dispose      = FDsTemplateCanvas_dispose;
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
   o.__base.FCanvas.onBuild.call(o, p);
   // 创建渲染环境
   var h = o._hPanel;
   o._context = REngine3d.createContext(FWglContext, h);
   // 创建简单舞台
   var g = o._stage = RClass.create(FSimpleStage3d);
   g.backgroundColor().set(0.5, 0.5, 0.5, 1);
   g.selectTechnique(o._context, FG3dGeneralTechnique);
   o._layer = o._stage.spriteLayer();
   RStage.register('stage3d', o._stage);
   // 设置相机
   var rc = g.camera();
   rc.setPosition(0, 3, -20);
   rc.lookAt(0, 0, 0);
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
   // 启动处理
   RStage.lsnsEnterFrame.register(o, o.onEnterFrame);
   RStage.start();
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_onEnterFrame(){
   var o = this;
   // 旋转模型
   var m = o._activeTemplate;
   if(m){
      m.location().set(0, -6.0, 0);
      m.rotation().set(0, o._rotationY, 0);
      m.scale().set(2.0, 2.0, 2.0);
      m.update();
      // 设置变量
      o._rotationX += 0.01;
      o._rotationY += 0.01;
      o._rotationZ += 0.03;
   }
   // 设置帧速
   //var info = RTimer.rate() + ' f/s';
   //if(info != _info.innerText){
   //   _info.innerText = RTimer.rate() + ' f/s';
   //}
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_oeRefresh(p){
   var o = this;
   var c = o._context;
   o.__base.FCanvas.oeRefresh.call(o, p);
   // 获得大小
   var w = o._hParent.offsetWidth;
   var h = o._hParent.offsetHeight;
   // 设置大小
   var hc = o._hPanel;
   hc.width = w;
   hc.height = h;
   hc.style.width = w;
   hc.style.height = h;
   // 设置投影
   var rp = o._stage.camera().projection();
   rp.size().set(w, h);
   rp.update();
   // 设置范围
   c._size.set(w, h);
   c.setViewport(0, 0, w, h);
   c.setScissorRectangle(0, 0, w, h);
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_construct(){
   var o = this;
   o.__base.FCanvas.construct.call(o);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_loadTemplate(p){
   var o = this;
   var rmc = RConsole.find(FTemplate3dConsole);
   if(o._activeTemplate != null){
      rmc.free(o._activeTemplate);
   }
   var m = rmc.alloc(o._context, p);
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
   // 父处理
   o.__base.FCanvas.dispose.call(o);
}
