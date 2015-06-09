with(MO){
   //==========================================================
   // <T>渲染过程。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dTechniquePass = function FG3dTechniquePass(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._fullCode       = RClass.register(o, new AGetSet('_fullCode'));
      o._code           = RClass.register(o, new AGetter('_code'));
      o._index          = null;
      o._finish         = false;
      // @attribute
      o._materialMap    = null;
      //..........................................................
      // @method
      o.setup           = FG3dTechniquePass_setup;
      o.activeEffects   = FG3dTechniquePass_activeEffects;
      o.sortRenderables = FG3dTechniquePass_sortRenderables;
      o.drawRegion      = FG3dTechniquePass_drawRegion;
      return o;
   }

   //==========================================================
   // <T>获得全代码。</T>
   //
   // @method
   // @return String 全代码
   //==========================================================
   MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
      var o = this;
      var m = o._materialMap = RClass.create(FG3dMaterialMap);
      m.linkGraphicContext(o);
      m.setup(EG3dMaterialMap.Count, 32);
   }

   //==========================================================
   // <T>排序渲染对象处理。</T>
   //
   // @method
   // @param s:source:FG3dRenderable 区域
   // @param t:target:FG3dRenderable 目标
   //==========================================================
   MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(s, t){
      var ms = s.material().info();
      var mt = t.material().info();
      // 按照效果排序
      if(ms.optionAlpha && mt.optionAlpha){
         var se = s.activeEffect();
         var te = t.activeEffect();
         if(se == te){
            // 按照材质排序
            sm = s._materialReference;
            tm = t._materialReference;
            if(sm && tm){
               return sm.hashCode() - tm.hashCode();
            }
         }
         return se.hashCode() - te.hashCode();
      }else if(ms.optionAlpha && !mt.optionAlpha){
         return 1;
      }else if(!ms.optionAlpha && mt.optionAlpha){
         return -1;
      }else{
         var se = s.activeEffect();
         var te = t.activeEffect();
         if(se == te){
            // 按照材质排序
            sm = s._materialReference;
            tm = t._materialReference;
            if(sm && tm){
               return sm.hashCode() - tm.hashCode();
            }
         }
         return se.hashCode() - te.hashCode();
      }
   }

   //==========================================================
   // <T>激活效果器。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(p, rs){
      var o = this;
      var sn = p.spaceName();
      // 关联渲染器
      for(var i = rs.count() - 1; i >= 0; i--){
         var r = rs.get(i);
         var f = r.selectInfo(sn);
         if(!f.effect){
            f.effect = RConsole.find(FG3dEffectConsole).find(o._graphicContext, p, r);
         }
      }
   }

   //==========================================================
   // <T>绘制区域处理。</T>
   //
   // @method
   // @param region:FG3dRetion 区域
   //==========================================================
   MO.FG3dTechniquePass_drawRegion = function FG3dTechniquePass_drawRegion(region){
      var o = this;
      // 获得渲染集合
      var renderables = region.renderables();
      var count = renderables.count();
      if(count == 0){
         return;
      }
      //..........................................................
      region._statistics._frameDrawSort.begin();
      // 激活效果器
      o.activeEffects(region, renderables);
      // 控件排序
      renderables.sort(o.sortRenderables);
      region._statistics._frameDrawSort.end();
      //..........................................................
      // 材质映射
      var capability = o._graphicContext.capability();
      if(capability.optionMaterialMap){
         var mm = o._materialMap;
         mm.resize(EG3dMaterialMap.Count, count);
         //var mm = region.materialMap();
         for(var i = 0; i < count; i++){
            var r = renderables.get(i);
            r._materialId = i;
            var m = r.material();
            var mi = m.info();
            mm.setUint8(i, EG3dMaterialMap.AmbientColor, mi.ambientColor);
            mm.setUint8(i, EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
            mm.setUint8(i, EG3dMaterialMap.SpecularColor, mi.specularColor);
            mm.setUint8(i, EG3dMaterialMap.ReflectColor, mi.reflectColor);
            mm.setUint8(i, EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
         }
         mm.update();
         region._materialMap = mm;
      }
      //..........................................................
      // 根据效果类型进行分组
      for(var n = 0; n < count; ){
         // 获得分组
         var groupBegin = n;
         var groupEnd = count;
         var effect = renderables.at(groupBegin).activeEffect();
         for(var i = n; i < count; i++){
            var activeEffect = renderables.at(i).activeEffect();
            if(effect != activeEffect){
               groupEnd = i;
               break;
            }
            n++;
         }
         // 绘制当前渲染组
         effect.drawRegion(region, groupBegin, groupEnd - groupBegin);
      }
   }
}
