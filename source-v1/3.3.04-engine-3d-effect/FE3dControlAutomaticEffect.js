﻿//==========================================================
// <T>控件自动渲染器。</T>
//
// @author maocy
// @history 150211
//==========================================================
function FE3dControlAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'control.automatic';
   //..........................................................
   // @method
   o.drawRenderable = FE3dControlAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
function FE3dControlAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var matrix = renderable.currentMatrix();
   var cameraVpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
   // 绑定材质
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   // 绑定所有属性流
   program.setParameter('vc_model_matrix', matrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   // 设置材质
   program.setParameter4('fc_alpha', info.alphaBase, info.alphaRate, info.alphaLevel, info.alphaMerge);
   program.setParameter('fc_ambient_color', info.ambientColor);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   // 绑定所有取样器
   o.bindSamplers(renderable);
   // 绘制处理
   context.drawTriangles(renderable.indexBuffer());
}
