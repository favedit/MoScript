//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FGuiGeneralColorEffect = function FGuiGeneralColorEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.gui';
   //..........................................................
   // @method
   o.drawRenderable = MO.FGuiGeneralColorEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FGuiGeneralColorEffect_drawRenderable = function FGuiGeneralColorEffect_drawRenderable(region, renderable){
   var o = this;
   var program = o._program;
   // 获得参数
   var control = renderable.control();
   var adjustSize = renderable.adjustSize();
   var controlSize = control.size();
   var modelMatrix = renderable.currentMatrix();
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix)
   // 绑定材质
   var material = renderable.material();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', modelMatrix);
   program.setParameter('vc_vp_matrix', vpMatrix);
   program.setParameter4('fc_coord', controlSize.width / adjustSize.width, controlSize.height / adjustSize.height, 0, 0);
   //program.setParameter4('fc_coord', adjustSize.width / controlSize.width, adjustSize.height / controlSize.height, 0, 0);
   // 绘制处理
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
