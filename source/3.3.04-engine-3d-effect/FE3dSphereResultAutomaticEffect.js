//==========================================================
// <T>阴影颜色自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dSphereViewResultEffect = function FE3dSphereViewResultEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'sphere.view.result';
   //..........................................................
   // @method
   o.drawRenderable = MO.FE3dSphereViewResultEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dSphereViewResultEffect_drawRenderable = function FE3dSphereViewResultEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   // 计算位置
   var matrix = renderable.matrix();
   // 计算比率
   var size = context.size();
   var rateX = 1;
   var rateY = 1;
   if(size.width > size.height){
      rateX = size.height / size.width;
   }else if(size.width < size.height){
      rateY = size.width / size.height;
   }
   matrix.sx = rateX;
   matrix.sy = rateY;
   matrix.updateForce();
   program.setParameter('vc_matrix', matrix);
   program.setParameter4('vc_const', rateX, rateY, 0, 0);
   // 绑定材质
   var material = renderable.material();
   o.bindMaterial(material);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   // 绘制处理
   context.drawTriangles(renderable.indexBuffer());
}
