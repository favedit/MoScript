//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dTexture = function FG3dTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._textureCd   = MO.Class.register(o, new MO.AGetter('_textureCd'), MO.EG3dTexture.Unknown);
   o._filterMinCd = MO.Class.register(o, new MO.AGetSet('_filterMinCd'), MO.EG3dSamplerFilter.Linear);
   o._filterMagCd = MO.Class.register(o, new MO.AGetSet('_filterMagCd'), MO.EG3dSamplerFilter.Linear);
   o._wrapS       = MO.Class.register(o, new MO.AGetSet('_wrapS'), MO.EG3dSamplerFilter.Unknown);
   o._wrapT       = MO.Class.register(o, new MO.AGetSet('_wrapT'), MO.EG3dSamplerFilter.Unknown);
   // @attribute
   o._statusLoad  = false;
   //..........................................................
   // @method
   o.isValid      = MO.Method.virtual(o, 'isValid');
   // @method
   o.setFilterCd  = MO.FG3dTexture_setFilterCd;
   o.setWrapCd    = MO.FG3dTexture_setWrapCd;
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
