//==========================================================
// <T>三维舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dStage(o){
   o = RClass.inherits(this, o, FStage);
   //..........................................................
   // @attribute
   o._backgroundColor  = null;
   o._camera           = null;
   o._directionalLight = null
   o._technique        = null;
   // @attribute
   o._region           = null;
   //..........................................................
   // @method
   o.construct         = FE3dStage_construct;
   // @method
   o.backgroundColor   = FE3dStage_backgroundColor;
   o.camera            = FE3dStage_camera;
   o.projection        = FE3dStage_projection;
   o.directionalLight  = FE3dStage_directionalLight;
   o.technique         = FE3dStage_technique;
   o.selectTechnique   = FE3dStage_selectTechnique;
   o.region            = FE3dStage_region;
   o.process           = FE3dStage_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   // 创建背景色
   o._backgroundColor = new SColor4();
   o._backgroundColor.set(0, 0, 0, 1);
   // 创建相机
   var c = o._camera = RClass.create(FE3dCamera);
   c.position().set(0, 0, -100);
   c.lookAt(0, 0, 0);
   c.update();
   c._projection.update();
   // 创建方向光源
   var l = o._directionalLight = RClass.create(FG3dDirectionalLight);
   l.direction().set(0, -1, 0);
   // 创建区域
   var r = o._region = RClass.create(FG3dRegion);
   r._camera = c;
   r._directionalLight = l;
}

//==========================================================
// <T>获得背景色。</T>
//
// @method
// @return SColor4 背景色
//==========================================================
function FE3dStage_backgroundColor(){
   return this._backgroundColor;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FG3dCamera 相机
//==========================================================
function FE3dStage_camera(){
   return this._camera;
}

//==========================================================
// <T>获得投影。</T>
//
// @method
// @return FG3dProjection 投影
//==========================================================
function FE3dStage_projection(){
   return this._projection;
}

//==========================================================
// <T>获得方向光。</T>
//
// @method
// @return FG3dDirectionalLight 方向光
//==========================================================
function FE3dStage_directionalLight(){
   return this._directionalLight;
}

//==========================================================
// <T>获得渲染技术。</T>
//
// @method
// @return FG3dTechnique 渲染技术
//==========================================================
function FE3dStage_technique(){
   return this._technique;
}

//==========================================================
// <T>选择渲染技术。</T>
//
// @method
// @param c:context:FG3dContext 环境
// @param p:technique:FG3dTechnique 渲染技术
//==========================================================
function FE3dStage_selectTechnique(c, p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(c, p);
}

//==========================================================
// <T>获得渲染区域。</T>
//
// @method
// @return FG3dRegion 区域
//==========================================================
function FE3dStage_region(){
   return this._region;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dStage_process(){
   var o = this;
   var r = o._region;
   o.__base.FStage.process.call(o);
   // 设置颜色
   r._backgroundColor = o._backgroundColor;
   // 更新区域
   o._technique.updateRegion(r);
   // 获取所有层的渲染集合
   r.prepare();
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).filterRenderables(r);
      }
   }
   r.update();
   // 绘制处理
   o._technique.drawRegion(r);
}
