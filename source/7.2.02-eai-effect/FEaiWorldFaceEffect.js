//==========================================================
// <T>控件自动渲染器。</T>
//
// @author maocy
// @history 150211
//==========================================================
MO.FEaiWorldFaceEffect = function FEaiWorldFaceEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'eai.world.face';
   //..........................................................
   // @method
   o.drawRenderable = MO.FEaiWorldFaceEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiWorldFaceEffect_drawRenderable = function FEaiWorldFaceEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   // 绑定材质
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   context.setCullingMode(false);
   // 设置数据集合(4x4浮点数组 + 4个浮点颜色)
   var mergeRenderables = renderable.mergeRenderables();
   var mergeCount = mergeRenderables.count();
   var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, 16 * mergeCount);
   for(var i = 0; i < mergeCount; i++){
      var index = 16 * i;
      var mergeRenderable = mergeRenderables.at(i);
      var matrix = mergeRenderable.matrix();
      var color = mergeRenderable.color();
      matrix.writeData(data, index);
      data[index + 12] = color.red;
      data[index + 13] = color.green;
      data[index + 14] = color.blue;
      data[index + 15] = color.alpha;
   }
   program.setParameter('vc_data', data);
   // 设置矩阵
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('vc_model_matrix', displayMatrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   program.setSampler('fs_diffuse', renderable.material().textures().get('diffuse'));
   // 绘制处理
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
