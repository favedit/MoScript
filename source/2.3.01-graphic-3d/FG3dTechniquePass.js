//==========================================================
// <T>渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dTechniquePass = function FG3dTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._technique      = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._fullCode       = MO.Class.register(o, new MO.AGetSet('_fullCode'));
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._index          = null;
   o._finish         = false;
   // @attribute
   o._materialMap    = null;
   //..........................................................
   // @method
   o.setup           = MO.FG3dTechniquePass_setup;
   o.activeEffects   = MO.FG3dTechniquePass_activeEffects;
   o.sortRenderables = MO.FG3dTechniquePass_sortRenderables;
   // @method
   o.drawBegin       = MO.FG3dTechniquePass_drawBegin;
   o.drawRegion      = MO.FG3dTechniquePass_drawRegion;
   o.drawEnd         = MO.FG3dTechniquePass_drawEnd;
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
   var map = o._materialMap = MO.Class.create(MO.FG3dMaterialMap);
   map.linkGraphicContext(o);
   map.setup(MO.EG3dMaterialMap.Count, 32);
}

//==========================================================
// <T>排序渲染对象处理。</T>
//
// @method
// @param source:FG3dRenderable 区域
// @param target:FG3dRenderable 目标
//==========================================================
MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(source, target){
   var sourceMaterial = source.material().info();
   var targetMaterial = target.material().info();
   // 按照效果排序
   if(sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         // 按照材质排序
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }else if(sourceMaterial.optionAlpha && !targetMaterial.optionAlpha){
      return 1;
   }else if(!sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      return -1;
   }else{
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         // 按照材质排序
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }
}

//==========================================================
// <T>激活效果器。</T>
//
// @method
// @param region:FG3dRetion 区域
// @param renderables:TObjects 渲染集合
//==========================================================
MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(region, renderables){
   var o = this;
   var spaceName = region.spaceName();
   // 关联渲染器
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      var info = renderable.selectInfo(spaceName);
      if(!info.effect){
         info.effect = MO.Console.find(MO.FG3dEffectConsole).find(o._graphicContext, region, renderable);
      }
   }
}

//==========================================================
// <T>开始绘制处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FG3dTechniquePass_drawBegin = function FG3dTechniquePass_drawBegin(region){
   var o = this;
   o._technique.clear(region.backgroundColor());
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
   var statistics = region._statistics;
   statistics._frameDrawSort.begin();
   // 激活效果器
   o.activeEffects(region, renderables);
   // 控件排序
   renderables.sort(o.sortRenderables);
   statistics._frameDrawSort.end();
   //..........................................................
   // 材质映射
   var capability = o._graphicContext.capability();
   if(capability.optionMaterialMap){
      var mm = o._materialMap;
      mm.resize(MO.EG3dMaterialMap.Count, count);
      //var mm = region.materialMap();
      for(var i = 0; i < count; i++){
         var r = renderables.get(i);
         r._materialId = i;
         var m = r.material();
         var mi = m.info();
         mm.setUint8(i, MO.EG3dMaterialMap.AmbientColor, mi.ambientColor);
         mm.setUint8(i, MO.EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
         mm.setUint8(i, MO.EG3dMaterialMap.SpecularColor, mi.specularColor);
         mm.setUint8(i, MO.EG3dMaterialMap.ReflectColor, mi.reflectColor);
         mm.setUint8(i, MO.EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
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

//==========================================================
// <T>结束绘制处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FG3dTechniquePass_drawEnd = function FG3dTechniquePass_drawEnd(region){
}
