//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FUiCanvas, MListenerLoad);
   //..........................................................
   o._context        = null;
   o._stage          = null;
   o._layer          = null;
   o._activeTemplate = null;
   o._rotation       = null;
   o._rotationAble   = false;
   //..........................................................
   // @event
   o.onBuild         = FDsTemplateCanvas_onBuild;
   o.onEnterFrame    = FDsTemplateCanvas_onEnterFrame;
   o.onTemplateLoad  = FDsTemplateCanvas_onTemplateLoad;
   //..........................................................
   o.oeRefresh       = FDsTemplateCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct       = FDsTemplateCanvas_construct;
   // @method
   o.loadTemplate    = FDsTemplateCanvas_loadTemplate;
   // @method
   o.dispose         = FDsTemplateCanvas_dispose;
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
      var r = o._rotation;
      m.location().set(0, -8.0, 0);
      m.rotation().set(0, r.y, 0);
      //m.scale().set(3.0, 3.0, 3.0);
      m.scale().set(0.5, 0.5, 0.5);
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
