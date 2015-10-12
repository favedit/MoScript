//==========================================================
// <T>阴影颜色自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dSphereViewAutomaticEffect = function FE3dSphereViewAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'sphere.view.automatic';
   // @attribute
   o._modelMatrix   = null;
   o._vpMatrix      = null;
   o._pointOrigin   = null;
   o._pointCenter   = null;
   //..........................................................
   // @method
   o.construct      = MO.FE3dSphereViewAutomaticEffect_construct;
   // @method
   o.drawRenderable = MO.FE3dSphereViewAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dSphereViewAutomaticEffect_construct = function FE3dSphereViewAutomaticEffect_construct(){
   var o = this;
   o.__base.FG3dAutomaticEffect.construct.call(o);
   // 设置属性
   o._modelMatrix = new MO.SMatrix3d();
   o._vpMatrix = new MO.SMatrix3d();
   o._pointOrigin = new MO.SPoint3(0, 0, 0);
   o._pointCenter = new MO.SPoint3(0, 0, 0);
   o._scale = new MO.SVector4();
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dSphereViewAutomaticEffect_drawRenderable = function FE3dSphereViewAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var size = context.size();
   var rate = Math.min(size.width, size.height);
   // o._scale.set(rate / size.width, rate / size.height);
   // 计算视角投影矩阵
   var camera = region.camera();
   var projection = camera.projection();
   //projection.size().set(2048, 2048);
   //projection.update();
   // 计算显示矩阵
   var matrix = renderable.matrix();
   var modelMatrix = o._modelMatrix;
   modelMatrix.assign(matrix);
   //modelMatrix.addRotationX(-Math.PI* 0.5);
   //modelMatrix.addRotationAxis(MO.Lang.Math.vectorAxisX, Math.PI * 0.5);
   // 计算矩阵
   var vpMatrix = o._vpMatrix;
   vpMatrix.assign(camera.matrix());
   vpMatrix.append(projection.matrix());
   // 设置变量
   program.setParameter('vc_model_matrix', modelMatrix);
   program.setParameter('vc_vp_matrix', vpMatrix);
   program.setParameter4('vc_const', rate / size.width, rate / size.height, 0, 2 / Math.PI);
   // 绑定材质
   var material = renderable.material();
   o.bindMaterial(material);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   // 绘制处理
   context.drawTriangles(renderable.indexBuffer());
}
