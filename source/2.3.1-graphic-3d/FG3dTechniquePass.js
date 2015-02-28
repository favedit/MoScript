//==========================================================
// <T>渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.Graphic3d.FG3dTechniquePass = function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dObject);
   //..........................................................
   // @attribute
   o._fullCode       = null;
   o._code           = null;
   o._index          = null;
   o._finish         = false;
   // @attribute
   o._materialMap    = null;
   //..........................................................
   // @method
   o.setup           = FG3dTechniquePass_setup;
   o.fullCode        = FG3dTechniquePass_fullCode;
   o.setFullCode     = FG3dTechniquePass_setFullCode;
   o.code            = FG3dTechniquePass_code;
   o.activeEffects   = FG3dTechniquePass_activeEffects;
   o.sortRenderables = FG3dTechniquePass_sortRenderables;
   o.drawRegion      = FG3dTechniquePass_drawRegion;
   return o;

   //==========================================================
   // <T>获得全代码。</T>
   //
   // @method
   // @return String 全代码
   //==========================================================
   function FG3dTechniquePass_setup(){
      var o = this;
      var m = o._materialMap = RClass.create(FG3dMaterialMap);
      m.linkGraphicContext(o);
      m.setup(EG3dMaterialMap.Count, 32);
   }

   //==========================================================
   // <T>获得全代码。</T>
   //
   // @method
   // @return String 全代码
   //==========================================================
   function FG3dTechniquePass_fullCode(){
      return this._fullCode;
   }

   //==========================================================
   // <T>设置全代码。</T>
   //
   // @method
   // @return p:fullCode:String 全代码
   //==========================================================
   function FG3dTechniquePass_setFullCode(p){
      this._fullCode = p;
   }

   //==========================================================
   // <T>获得名称。</T>
   //
   // @method
   // @return 名称
   //==========================================================
   function FG3dTechniquePass_code(){
      return this._code;
   }

   //==========================================================
   // <T>排序渲染对象处理。</T>
   //
   // @method
   // @param s:source:FG3dRenderable 区域
   // @param t:target:FG3dRenderable 目标
   //==========================================================
   function FG3dTechniquePass_sortRenderables(s, t){
      var ms = s.material().info();
      var mt = t.material().info();
      if(ms.optionAlpha && mt.optionAlpha){
         return 0;
      }else if(ms.optionAlpha && !mt.optionAlpha){
         return 1;
      }else if(!ms.optionAlpha && mt.optionAlpha){
         return -1;
      }else{
         var se = s.activeEffect();
         var te = t.activeEffect();
         return se.hashCode() - te.hashCode();
      }
   }

   //==========================================================
   // <T>激活效果器。</T>
   //
   // @method
   // @param p:region:FG3dRetion 区域
   //==========================================================
   function FG3dTechniquePass_activeEffects(p, rs){
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
   // @param p:region:FG3dRetion 区域
   //==========================================================
   function FG3dTechniquePass_drawRegion(p){
      var o = this;
      var cb = o._graphicContext.capability();
      var rs = p.renderables();
      // 激活效果器
      o.activeEffects(p, rs);
      // 控件排序
      rs.sort(o.sortRenderables);
      // 渲染处理
      var c = rs.count();
      if(c > 0){
         // 材质影射处理
         if(cb.optionMaterialMap){
            var mm = o._materialMap;
            mm.resize(EG3dMaterialMap.Count, c);
            //var mm = p.materialMap();
            for(var i = 0; i < c; i++){
               var r = rs.get(i);
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
            p._materialMap = mm;
         }
         // 绘制处理
         for(var i = 0; i < c; i++){
            var r = rs.get(i);
            var e = r.activeEffect();
            o._graphicContext.setProgram(e.program());
            e.drawRenderable(p, r, i);
         }
      }
   }
}
