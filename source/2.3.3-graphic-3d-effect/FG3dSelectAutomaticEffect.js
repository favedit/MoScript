//==========================================================
// <T>通用自动渲染器。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.Graphic3d.FG3dSelectAutomaticEffect = function FG3dSelectAutomaticEffect(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'select.automatic';
   //..........................................................
   // @method
   o.drawRenderable = FG3dSelectAutomaticEffect_drawRenderable;
   return o;

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param pg:region:FG3dRegion 渲染区域
   // @param pr:renderable:FG3dRenderable 渲染对象
   // @param pi:index:Integer 索引位置
   //==========================================================
   function FG3dSelectAutomaticEffect_drawRenderable(pg, pr, pi){
      var o = this;
      var c = o._graphicContext;
      var s = c.size();
      var p = o._program;
      var sx = pg._selectX;
      var sy = pg._selectY;
      // 绑定材质
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      // 绑定所有属性流
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
      // 设置材质
      var i = pi + 1;
      var i1 = i  & 0xFF;
      var i2 = (i >> 8) & 0xFF;
      var i3 = (i >> 16) & 0xFF;
      p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
      // 绑定所有属性流
      o.bindAttributes(pr);
      // 绑定所有取样器
      o.bindSamplers(pr);
      // 绘制处理
      c.drawTriangles(pr.indexBuffer());
   }
}
