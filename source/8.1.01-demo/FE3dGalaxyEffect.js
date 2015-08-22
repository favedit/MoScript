﻿with(MO){
   //==========================================================
   // <T>控件自动渲染器。</T>
   //
   // @author maocy
   // @history 150211
   //==========================================================
   MO.FE3dGalaxyEffect = function FE3dGalaxyEffect(o){
      o = MO.Class.inherits(this, o, FG3dAutomaticEffect);
      //..........................................................
      // @attribute
      o._code          = 'galaxy.automatic';
      //..........................................................
      // @method
      o.drawRenderable = FE3dGalaxyEffect_drawRenderable;
      return o;
   }

   //==========================================================
   // <T>绘制渲染对象。</T>
   //
   // @method
   // @param pg:region:FG3dRegion 渲染区域
   // @param pr:renderable:FG3dRenderable 渲染对象
   //==========================================================
   MO.FE3dGalaxyEffect_drawRenderable = function FE3dGalaxyEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var p = o._program;
      //g.disable(g.DEPTH_TEST);
      var vp = pg.calculate(EG3dRegionParameter.CameraPosition);
      // 绑定材质
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      // 绑定所有属性流
      p.setParameter4('vc_rotation', pr._seed, 0, 0, 0);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter('vc_camera_position', vp);
      // 设置材质
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      // 绑定所有属性流
      o.bindAttributes(pr);
      // 绑定所有取样器
      o.bindSamplers(pr);
      // 绘制处理
      c.drawTriangles(pr.indexBuffer());
   }
}
