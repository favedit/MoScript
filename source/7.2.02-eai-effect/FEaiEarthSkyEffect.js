//==========================================================
// <T>控件自动渲染器。</T>
//
// @author maocy
// @history 151008
//==========================================================
MO.FEaiEarthSkyEffect = function FEaiEarthSkyEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'eai.earth.sky';
   o._cloudPosition = 0;
   o._translateX    = 0;
   //..........................................................
   // @method
   o.construct      = MO.FEaiEarthSkyEffect_construct;
   // @method
   o.drawRenderable = MO.FEaiEarthSkyEffect_drawRenderable;
   // @method
   o.despose        = MO.FEaiEarthSkyEffect_despose;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiEarthSkyEffect_construct = function FEaiEarthSkyEffect_construct(){
   var o = this;
   o.__base.FG3dAutomaticEffect.construct.call(o);
   // 配置处理
   o._const = new MO.SVector4(0, 0, 0, 0);
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiEarthSkyEffect_drawRenderable = function FEaiEarthSkyEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   o._const.add(0.0001, 0.0001, 0.0001, 2 / Math.PI);
   // 绑定材质
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   // 设置矩阵
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('vc_const', o._const);
   program.setParameter('fc_const', o._const);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   // 绘制处理
   context.drawTriangles(renderable.indexBuffers().first());
}
//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiEarthSkyEffect_despose = function FEaiEarthSkyEffect_despose(){
   var o = this;
   // 释放属性
   o._const = MO.Lang.Object.despose(o._const);
   // 父处理
   o.__base.FG3dAutomaticEffect.despose.call(o);
}
