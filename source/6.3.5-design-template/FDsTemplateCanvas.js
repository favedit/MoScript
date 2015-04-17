//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsTemplateCanvas(o){
   o = RClass.inherits(this, o, FDsCanvas, MListenerLoad, MMouseCapture);
   //..........................................................
   o._toolbar            = null;
   o._context            = null;
   o._stage              = null;
   o._layer              = null;
   o._activeSpace     = null;
   o._rotation           = null;
   o._rotationAble       = false;
   o._capturePosition    = null;
   o._captureMatrix      = null;
   o._captureRotation    = null;
   o._dimensional        = null;
   o._selectBoundBox     = null;
   //..........................................................
   // @event
   o.onBuild             = FDsTemplateCanvas_onBuild;
   //o.onMouseCaptureStart = FDsTemplateCanvas_onMouseCaptureStart;
   //o.onMouseCapture      = FDsTemplateCanvas_onMouseCapture;
   //o.onMouseCaptureStop  = FDsTemplateCanvas_onMouseCaptureStop;
   o.onEnterFrame        = FDsTemplateCanvas_onEnterFrame;
   o.onDataLoaded      = FDsTemplateCanvas_onDataLoaded;
   //..........................................................
   o.oeRefresh           = FDsTemplateCanvas_oeRefresh;
   //..........................................................
   // @method
   o.construct           = FDsTemplateCanvas_construct;
   // @method
   o.selectRenderable    = FDsTemplateCanvas_selectRenderable;
   o.loadByGuid          = FDsTemplateCanvas_loadByGuid;
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
   o.__base.FDsCanvas.onBuild.call(o, p);
   // 创建简单舞台
   //var g = o._stage = RClass.create(FE3dSimpleStage);
   //g.region().backgroundColor().set(0.5, 0.5, 0.5, 1);
   //g.selectTechnique(o, FE3dGeneralTechnique);
   //var sl = o._layer = o._stage.spriteLayer();
   //RStage.register('stage3d', o._stage);
   // 设置相机
   //var rc = g.camera();
   //rc.setPosition(0, 3, -10);
   //rc.lookAt(0, 3, 0);
   //rc.update();
   // 设置投影
   //var h = o._hPanel;
   //var rp = rc.projection();
   //rp.size().set(h.width, h.height);
   //rp._angle = 45;
   //rp.update();
   // 设置光源
   //var l = g.directionalLight();
   //var lc = l.camera();
   //lc.setPosition(10, 10, 0);
   //lc.lookAt(0, 0, 0);
   //lc.update();
   // 设置坐标系
   //sl.pushRenderable(o._dimensional);
}

//==========================================================
// <T>鼠标捕捉开始处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvas_onMouseCaptureStart(p){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   //var d = t.renderables().get(0);
   //o._capturePosition.set(p.clientX, p.clientY);
   //o._captureMatrix.assign(d.matrix());
   var camera = space.camera();
   o._captureRotation.assign(camera._rotation);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateCanvas_onMouseCapture(p){
   var o = this;
   var space = o._activeSpace;
   if(!space){
      return;
   }
   return;
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var d = t.renderables().get(0);
   var m = d.matrix();
   var cm = o._captureMatrix;
   switch(o._toolbar._canvasModeCd){
      case EDsCanvasMode.Drop:
         var c = o._stage.camera();
         var r = c.rotation();
         var cr = o._captureRotation;
         r.x = cr.x + cy * 0.003;
         r.y = cr.y + cx * 0.003;
         break;
      case EDsCanvasMode.Select:
         break;
      case EDsCanvasMode.Translate:
         m.tx = cm.tx + cx / 360 * 3.14;
         m.ty = cm.ty + cy / 360 * 3.14;
         break;
      case EDsCanvasMode.Rotation:
         m.ry = cm.ry + cx * RConst.DEGREE_RATE;
         break;
      case EDsCanvasMode.Scale:
         m.sx = cm.sx + cx / 100;
         m.sy = cm.sy + cx / 100;
         m.sz = cm.sz + cx / 100;
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
function FDsTemplateCanvas_onEnterFrame(event){
   var o = this;
   o.__base.FDsCanvas.onEnterFrame.call(o, event);
   //..........................................................
   // 旋转模型
   //var m = o._activeSpace;
   //if(m){
      //var r = o._rotation;
      //m.location().set(0, -8.0, 0);
      //m.rotation().set(0, r.y, 0);
      //m.scale().set(3.0, 3.0, 3.0);
      //m.scale().set(0.002, 0.002, 0.002); // Car01
      //m.scale().set(0.05, 0.05, 0.05);
      //m.update();
      // 设置变量
      //if(o._rotationAble){
      //   r.y += 0.01;
      //}
   //}
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
// @param p:template:FTemplate3d 模板
//==========================================================
function FDsTemplateCanvas_onDataLoaded(p){
   var o = this;
   var m = o._activeSpace;
   //m.selectTechnique(o, FE3dGeneralTechnique);
   var g = m.region();
   // 设置相机
   var rc = g.camera();
   rc.setPosition(0, 3, -10);
   rc.lookAt(0, 3, 0);
   rc.update();
   // 设置投影
   var h = o._hPanel;
   var rp = rc.projection();
   rp.size().set(h.width, h.height);
   rp._angle = 45;
   rp.update();
   // 设置光源
   var l = g.directionalLight();
   var lc = l.camera();
   lc.setPosition(10, 10, 0);
   lc.lookAt(0, 0, 0);
   lc.update();
   //space._layers.at(0).pushRenderable(o._dimensional);
   // 加载完成
   o.processLoadListener(o);
   // 隐藏处理
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_oeRefresh(p){
   var o = this;
   var c = o._graphicContext;
   o.__base.FDsCanvas.oeRefresh.call(o, p);
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
function FDsTemplateCanvas_selectRenderable(p){
   var o = this;
   var r = p.resource();
   var rm = r.mesh();
   var rl = rm.outline();
   // 显示包围盒
   //var b = o._selectBoundBox;
   //b.outline().assign(rl);
   //b.upload();
   //b.remove();
   //p._display.pushRenderable(b);
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_loadByGuid(guid){
   var o = this;
   var space = o._activeSpace;
   var templateConsole = RConsole.find(FE3dTemplateConsole);
   if(space){
      RStage.unregister(space);
      templateConsole.free(space);
   }
   // 收集一个显示模板
   space = o._activeSpace = templateConsole.allocByGuid(o._graphicContext, guid);
   if(!space._linked){
      // 显示加载进度
      RConsole.find(FUiDesktopConsole).showLoading();
      // 设置坐标系
      space.addLoadListener(o, o.onDataLoaded);
      space._linked = true;
   } 
   // 启动舞台
   RStage.register('space', space);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateCanvas_dispose(){
   var o = this;
   // 释放旋转
  o._rotation = RObject.dispose(o._rotation);
x   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
