//==========================================================
// <T>渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._textureCd   = EG3dTexture.Unknown;
   o._filterMinCd = EG3dSamplerFilter.Linear;
   o._filterMagCd = EG3dSamplerFilter.Linear;
   o._wrapS       = EG3dSamplerFilter.Unknown;
   o._wrapT       = EG3dSamplerFilter.Unknown;
   // @attribute
   o._statusLoad  = false;
   //..........................................................
   // @method
   o.isValid      = RMethod.virtual(o, 'isValid');
   o.textureCd    = FG3dTexture_textureCd;
   // @method
   o.filterMinCd  = FG3dTexture_filterMinCd;
   o.filterMagCd  = FG3dTexture_filterMagCd;
   o.setFilter    = FG3dTexture_setFilter;
   // @method
   o.wrapS        = FG3dTexture_wrapS;
   o.wrapT        = FG3dTexture_wrapT;
   o.setWrap      = FG3dTexture_setWrap;
   return o;
}

//==========================================================
// <T>获得渲染纹理类型。</T>
//
// @author maocy
// @return 纹理类型
//==========================================================
function FG3dTexture_textureCd(){
   return this._textureCd;
}

//==========================================================
// <T>获得最小取样。</T>
//
// @method
// @return 最小取样
//==========================================================
function FG3dTexture_filterMinCd(){
   return this._filterMinCd;
}

//==========================================================
// <T>获得最大取样。</T>
//
// @method
// @return 最大取样
//==========================================================
function FG3dTexture_filterMagCd(){
   return this._filterMagCd;
}

//==========================================================
// <T>设置取样。</T>
//
// @method
// @param pi:min:EG3dSamplerFilter 最小取样
// @param pa:mag:EG3dSamplerFilter 最大取样
//==========================================================
function FG3dTexture_setFilter(pi, pa){
   var o = this;
   o._filterMinCd = pi;
   o._filterMagCd = pa;
}

//==========================================================
// <T>获得S卷动。</T>
//
// @method
// @return S卷动
//==========================================================
function FG3dTexture_wrapS(){
   return this._wrapS;
}

//==========================================================
// <T>获得T卷动。</T>
//
// @method
// @return T卷动
//==========================================================
function FG3dTexture_wrapT(){
   return this._wrapT;
}

//==========================================================
// <T>设置卷动。</T>
//
// @method
// @param ps:wrapS:EG3dSamplerFilter S卷动
// @param pt:wrapT:EG3dSamplerFilter T卷动
//==========================================================
function FG3dTexture_setWrap(ps, pt){
   var o = this;
   o._wrapS = ps;
   o._wrapT = pt;
}
