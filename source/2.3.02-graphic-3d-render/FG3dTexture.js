with(MO){
   //==========================================================
   // <T>渲染纹理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dTexture = function FG3dTexture(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._textureCd   = RClass.register(o, new AGetter('_textureCd'), EG3dTexture.Unknown);
      o._filterMinCd = RClass.register(o, new AGetSet('_filterMinCd'), EG3dSamplerFilter.Linear);
      o._filterMagCd = RClass.register(o, new AGetSet('_filterMagCd'), EG3dSamplerFilter.Linear);
      o._wrapS       = RClass.register(o, new AGetSet('_wrapS'), EG3dSamplerFilter.Unknown);
      o._wrapT       = RClass.register(o, new AGetSet('_wrapT'), EG3dSamplerFilter.Unknown);
      // @attribute
      o._statusLoad  = false;
      //..........................................................
      // @method
      o.isValid      = RMethod.virtual(o, 'isValid');
      // @method
      o.setFilterCd  = FG3dTexture_setFilterCd;
      o.setWrapCd    = FG3dTexture_setWrapCd;
      return o;
   }

   //==========================================================
   // <T>设置取样。</T>
   //
   // @method
   // @param minCd:EG3dSamplerFilter 最小取样
   // @param magCd:EG3dSamplerFilter 最大取样
   //==========================================================
   MO.FG3dTexture_setFilterCd = function FG3dTexture_setFilterCd(minCd, magCd){
      var o = this;
      o._filterMinCd = minCd;
      o._filterMagCd = magCd;
   }

   //==========================================================
   // <T>设置卷动。</T>
   //
   // @method
   // @param wrapS:EG3dSamplerFilter S卷动
   // @param wrapT:EG3dSamplerFilter T卷动
   //==========================================================
   MO.FG3dTexture_setWrapCd = function FG3dTexture_setWrapCd(wrapS, wrapT){
      var o = this;
      o._wrapS = wrapS;
      o._wrapT = wrapT;
   }
}
