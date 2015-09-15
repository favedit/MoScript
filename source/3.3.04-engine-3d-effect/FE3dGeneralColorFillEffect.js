//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dGeneralColorFillEffect = function FE3dGeneralColorFillEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.flat';
   //..........................................................
   // @method
   o.drawRenderable = MO.FE3dGeneralColorFillEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dGeneralColorFillEffect_drawRenderable = function FE3dGeneralColorFillEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var contextSize = context.size();
   var program = o._program;
   // 绑定材质
   var material = renderable.material();
   o.bindMaterial(material);
   // 计算矩阵
   program.setParameter4('vc_position', 2, 2, -1, 1);
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
}
