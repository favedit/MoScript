//==========================================================
// <T>控件自动渲染器。</T>
//
// @author maocy
// @history 150211
//==========================================================
MO.FEaiMapFaceEffect = function FEaiMapFaceEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'eai.map.face';
   //..........................................................
   // @method
   o.drawRenderable = MO.FEaiMapFaceEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FEaiMapFaceEffect_drawRenderable = function FEaiMapFaceEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var cameraVpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   // 绑定材质
   var material = renderable.material();
   var info = material.info();
   o.bindMaterial(material);
   // 设置数据集合(4x4浮点数组 + 4个浮点颜色)
   var mergeRenderables = renderable.mergeRenderables();
   var mergeCount = mergeRenderables.count();
   var stride = 16;
   var data = MO.Lang.TypeArray.findTemp(MO.EDataType.Float32, stride * mergeCount);
   for(var i = 0; i < mergeCount; i++){
      var index = stride * i;
      var mergeRenderable = mergeRenderables.at(i);
      // 写入矩阵
      var matrix = mergeRenderable.matrix();
      matrix.writeData(data, index);
      // 写入颜色
      var color = mergeRenderable.color();
      data[index + 12] = color.red;
      data[index + 13] = color.green;
      data[index + 14] = color.blue;
      // 写入法线缩放
      var shape = mergeRenderable._shape;
      if(shape){
         var entity = shape._entity;
         var normalScale = entity.normalScale();
         data[index + 15] = normalScale;
      }else{
         var matrix = mergeRenderable.matrix();
         data[index + 15] = color.alpha;
      }
   }
   program.setParameter('vc_data', data);
   // 设置矩阵
   var displayMatrix = renderable.display().currentMatrix();
   program.setParameter('vc_model_matrix', displayMatrix);
   program.setParameter('vc_vp_matrix', cameraVpMatrix);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   // 绘制处理
   var indexBuffer = renderable.indexBuffers().first();
   context.drawTriangles(indexBuffer);
}
