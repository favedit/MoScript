//==========================================================
// <T>三维舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FStage3d(o){
   o = RClass.inherits(this, o, FStage);
   //..........................................................
   // @attribute
   o._backgroundColor  = null;
   o._camera           = null;
   o._projection       = null;
   o._directionalLight = null
   o._technique        = null;
   // @attribute
   o._region           = null;
   //..........................................................
   // @method
   o.construct         = FStage3d_construct;
   // @method
   o.backgroundColor   = FStage3d_backgroundColor;
   o.camera            = FStage3d_camera;
   o.projection        = FStage3d_projection;
   o.directionalLight  = FStage3d_directionalLight;
   o.technique         = FStage3d_technique;
   o.selectTechnique   = FStage3d_selectTechnique;
   o.process           = FStage3d_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FStage3d_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   // 创建背景色
   o._backgroundColor = new SColor4();
   o._backgroundColor.set(0, 0, 0, 1);
   // 创建相机
   var rc = o._camera = RClass.create(FG3dCamera);
   rc.position().set(0, 0, -100);
   rc.lookAt(0, 0, 0);
   rc.update();
   // 创建投影
   var rp = o._projection = RClass.create(FG3dProjection);
   rp.update();
   rc._projection = rp;
   // 创建方向光源
   var dl = o._directionalLight = RClass.create(FG3dDirectionalLight);
   dl.direction().set(0, -1, 0);
   // 创建区域
   var r = o._region = RClass.create(FG3dRegion);
   r._camera = rc;
   r._projection = rp;
   r._directionalLight = dl;
}

//==========================================================
// <T>获得背景色。</T>
//
// @method
// @return SColor4 背景色
//==========================================================
function FStage3d_backgroundColor(){
   return this._backgroundColor;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FG3dCamera 相机
//==========================================================
function FStage3d_camera(){
   return this._camera;
}

//==========================================================
// <T>获得投影。</T>
//
// @method
// @return FG3dProjection 投影
//==========================================================
function FStage3d_projection(){
   return this._projection;
}

//==========================================================
// <T>获得方向光。</T>
//
// @method
// @return FG3dDirectionalLight 方向光
//==========================================================
function FStage3d_directionalLight(){
   return this._directionalLight;
}

//==========================================================
// <T>获得渲染技术。</T>
//
// @method
// @return FG3dTechnique 渲染技术
//==========================================================
function FStage3d_technique(){
   return this._technique;
}

//==========================================================
// <T>选择渲染技术。</T>
//
// @method
// @param c:context:FG3dContext 环境
// @param p:technique:FG3dTechnique 渲染技术
//==========================================================
function FStage3d_selectTechnique(c, p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(c, p);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FStage3d_process(){
   var o = this;
   var r = o._region;
   o.__base.FStage.process.call(o);
   // 绘制处理
   r.prepare();
   layer.filterRenderables(r);
   r.update();
   // 绘制处理
   var bc = o._backgroundColor;
   o._technique._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   o._technique.drawRegion(r);
}
