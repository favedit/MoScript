//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FDsMaterialCanvasContent(o){
   o = RClass.inherits(this, o, FDsCanvas);
   //..........................................................
   // @attribute
   o._activeResource      = null;
   o._activeMaterial      = null;
   // @attribute
   o._capturePosition     = null;
   o._captureCameraPosition = null;
   // @attribute
   o._templateMatrix      = null;
   o._templateRenderable  = null;
   o._templateFace        = null;
   o._templateTranslation = null;
   o._templateRotation    = null;
   o._templateScale       = null;
   o._templateViewScale   = 0.05;
   //..........................................................
   // @event
   o.onBuild              = FDsMaterialCanvasContent_onBuild;
   o.onLoaded             = FDsMaterialCanvasContent_onLoaded;
   //..........................................................
   o.oeResize             = FDsMaterialCanvasContent_oeResize;
   o.oeRefresh            = FDsMaterialCanvasContent_oeRefresh;
   //..........................................................
   // @method
   o.construct            = FDsMaterialCanvasContent_construct;
   // @method
   o.reloadRegion         = FDsMaterialCanvasContent_reloadRegion;
   o.loadByGuid           = FDsMaterialCanvasContent_loadByGuid;
   // @method
   o.dispose              = FDsMaterialCanvasContent_dispose;
   return o;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsMaterialCanvasContent_onBuild(p){
   var o = this;
   o.__base.FDsCanvas.onBuild.call(o, p);
   var hPanel = o._hPanel;
   // 创建简单舞台
   var space = o._activeSpace = RClass.create(FE3dSimpleStage);
   space.linkGraphicContext(o);
   space.selectTechnique(o, FE3dGeneralTechnique);
   space.region().backgroundColor().set(1, 1, 1, 1);
   space.region().linkGraphicContext(o);
   RStage.register('space.material', space);
   //g.addEnterFrameListener(o, o.onEnterFrame);
   //var sl = o._layer = o._activeSpace.spriteLayer();
   // 设置相机
   var camera = space.camera();
   camera.setPosition(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
   // 设置投影
   var projection = camera.projection();
   projection.size().set(hPanel.width, hPanel.height);
   projection._angle = 45;
   projection.update();
   // 创建位图
   //var bitmap = o._activeBitmap = RClass.create(FE3dBitmap)
   //bitmap.linkGraphicContext(o);
   //bitmap.setup();
   //space.spriteLayer().pushRenderable(bitmap);
   // 设置光源
   //var l = g.directionalLight();
   //var lc = l.camera();
   //lc.setPosition(10, 10, 0);
   //lc.lookAt(0, 0, 0);
   //lc.update();
   //var o = this;
   //o.__base.FDsCanvas.onBuild.call(o, p);
   // 创建界面控制器
   //var c = o._graphicContext;
   //var tc = RConsole.find(FE3dTemplateConsole);
   //var t = o._templateTranslation = tc.allocByCode(c, 'com.design.translation');
   //t._optionFace = true;
   //t.hide();
   //var t = o._templateRotation = tc.allocByCode(c, 'com.design.rotation');
   //t._optionFace = true;
   //t.hide();
   //var t = o._templateScale = tc.allocByCode(c, 'com.design.scale');
   //t._optionFace = true;
   //t.hide();
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
function FDsMaterialCanvasContent_onLoaded(event){
   var o = this;
   var material = o._activeMaterial = o._activeResource.material();
   //var space = o._activeSpace;
   //var bitmap = event.sender;
   //var matrix = bitmap.matrix();
   //matrix.tx = 0;
   //matrix.ty = 0;
   //matrix.tz = 0;
   //matrix.sx = 5;
   //matrix.sy = 5;
   //matrix.sz = 5;
   //matrix.updateForce();

   //var g = m.region();
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
   // 加载完成
   //o.processLoadListener(o);
   // 隐藏处理
   RConsole.find(FUiDesktopConsole).hide();
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsMaterialCanvasContent_oeResize(p){
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
// <T>刷新处理。</T>
//
// @method
//==========================================================
function FDsMaterialCanvasContent_oeRefresh(p){
   return EEventStatus.Stop;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMaterialCanvasContent_construct(){
   var o = this;
   o.__base.FDsCanvas.construct.call(o);
   o._capturePosition = new SPoint2();
   o._captureCameraPosition = new SPoint3();
}

//==========================================================
// <T>选中渲染显示对象处理。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDsMaterialCanvasContent_selectDisplay(p){
   var o = this;
   // 取消选中
   o.selectNone();
   // 选中对象
   o._selectObject = p;
   // 选中集合
   o.innerSelectDisplay(p);
}

//==========================================================
// <T>切换工作模式。</T>
//
// @method
// @param p:modeCd:Integer 
//==========================================================
function FDsMaterialCanvasContent_switchMode(p){
   var o = this;
   o._canvasModeCd = p;
}

//==========================================================
// <T>重新加载区域。</T>
//
// @method
// @param region:FE3dRegion 区域
//==========================================================
function FDsMaterialCanvasContent_reloadRegion(region){
   var o = this;
   var resource = region.resource();
   o._cameraMoveRate = resource.moveSpeed();
   o._cameraKeyRotation = resource.rotationKeySpeed();
   o._cameraMouseMove = resource.rotationMouseSpeed();
}

//==========================================================
// <T>加载模板处理。</T>
//
// @method
//==========================================================
function FDsMaterialCanvasContent_loadByGuid(guid){
   var o = this;
   // 显示加载进度
   RConsole.find(FUiDesktopConsole).showLoading();
   // 释放网格
   var resource = o._activeResource = RConsole.find(FE3sMaterialConsole).loadByGuid(guid);
   resource.addLoadListener(o, o.onLoaded);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMaterialCanvasContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsCanvas.dispose.call(o);
}
