//==========================================================
// <T>通用颜色视频渲染器。</T>
//
// @author maocy
// @history 151013
//==========================================================
MO.FE3dGeneralColorVideoMaskEffect = function FE3dGeneralColorVideoMaskEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.video.mask';
   //..........................................................
   // @method
   o.buildMaterial  = MO.FE3dGeneralColorVideoMaskEffect_buildMaterial;
   o.drawRenderable = MO.FE3dGeneralColorVideoMaskEffect_drawRenderable;
   return o;
}
//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dGeneralColorVideoMaskEffect_drawRenderable = function FE3dGeneralColorVideoMaskEffect_drawRenderable(region, renderable){
   var o = this;
   var textureMask = renderable._textureMask;
   if(!textureMask){
      return true;
   }
   var program = o._program;
   // 获得参数
   var cameraPosition = region.calculate(MO.EG3dRegionParameter.CameraPosition);
   var lightDirection = region.calculate(MO.EG3dRegionParameter.LightDirection);
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix)
   // 绑定材质
   var material = renderable.material();
   o.bindMaterial(material);
   // 设置矩阵
   var matrix = renderable.currentMatrix();
   program.setParameter('vc_model_matrix', matrix);
   program.setParameter('vc_vp_matrix', vpMatrix);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   // 绘制处理
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
