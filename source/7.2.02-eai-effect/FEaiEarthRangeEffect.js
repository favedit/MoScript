//==========================================================
// <T>控件自动渲染器。</T>
//
// @author maocy
// @history 151008
//==========================================================
MO.FEaiEarthRangeEffect = function FEaiEarthRangeEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'eai.earth.flat';
   o._cloudPosition = 0;
   o._translateX    = 0;
   //..........................................................
   // @method
   o.construct      = MO.FEaiEarthRangeEffect_construct;
   // @method
   o.drawRenderable = MO.FEaiEarthRangeEffect_drawRenderable;
   // @method
   o.despose        = MO.FEaiEarthRangeEffect_despose;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiEarthRangeEffect_construct = function FEaiEarthRangeEffect_construct(){
   var o = this;
   o.__base.FG3dAutomaticEffect.construct.call(o);
   // 配置处理
   o._speedCloud = new MO.SVector4(0, 0, 0, 0);
   o._speedWater = new MO.SVector4(0, 0, 0, 0);
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiEarthRangeEffect_drawRenderable = function FEaiEarthRangeEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   o._speedCloud.add(-0.00004, -0.00003, -0.00002, 1.0);
   o._speedWater.add(0.000024, 0.000015, 0.00001, 1.0);
   // 绑定材质
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   // 设置矩阵
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('fc_cloud', o._speedCloud);
   program.setParameter4('fc_land', 0, 0, 0, 0);
   program.setParameter4('fc_ocean', 0, 0, 0, 0);
   program.setParameter('fc_water', o._speedWater);
   //program.setParameter('vc_model_matrix', displayMatrix);
   //program.setParameter('vc_vp_matrix', cameraVpMatrix);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   // 绘制处理
   context.drawTriangles(renderable.indexBuffer());
}
//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiEarthRangeEffect_despose = function FEaiEarthRangeEffect_despose(){
   var o = this;
   // 释放属性
   o._speedCloud = MO.Lang.Object.despose(o._speedCloud);
   o._speedWater = MO.Lang.Object.despose(o._speedWater);
   // 父处理
   o.__base.FG3dAutomaticEffect.despose.call(o);
}

