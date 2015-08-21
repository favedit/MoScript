//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dFloodLightEffect = function FE3dFloodLightEffect(o){
   o = MO.Class.inherits(this, o, MO.FE3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'general.color.flood';
   //..........................................................
   // @method
   o.drawRenderable = MO.FE3dFloodLightEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dFloodLightEffect_drawRenderable = function FE3dFloodLightEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var contextSize = context.size();
   //var contextRatio = context.ratio();
   //var contextSizeRatio = context.sizeRatio();
   //var radioWidth = contextSize.width * contextRatio;
   //var radioHeight = contextSize.height * contextRatio;
   var sizeWidth = contextSize.width ;
   var sizeHeight = contextSize.height;
   var program = o._program;
   // 绑定材质
   var material = renderable.material();
   o.bindMaterial(material);
   // 计算矩阵
   var matrix = renderable.matrix();
   // 绘制处理（TODO：Clip未实现）
   //var size = renderable.size();
   //var clipX = matrix.tx;
   //var clipY = sizeHeight - matrix.ty - size.height;
   //context.setScissorRectangle(clipX, clipY, size.width, size.height);
   o.__base.FE3dAutomaticEffect.drawRenderable.call(o, region, renderable);
   //context.setScissorRectangle();
}
