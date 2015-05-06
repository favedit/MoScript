//==========================================================
// <T>效果器信息。</T>
//
// @author maocy
// @history 150113
//==========================================================
function SG3dEffectInfo(){
   var o = this;
   //..........................................................
   // @attribute 代码
   o.code                  = null;
   o.techniqueCode         = null;
   o.techniqueModeCode     = null;
   // @attribute 状态
   o.optionMerge           = null;
   o.mergeCount            = null;
   // @attribute 状态
   o.fillModeCd            = null;
   o.optionCullMode        = null;
   o.cullModeCd            = null;
   o.optionDepthTest       = null;
   o.depthModeCd           = null;
   o.optionDepthWrite      = null;
   o.optionBlendMode       = null;
   o.blendSourceMode       = null;
   o.blendTargetMode       = null;
   o.optionAlphaTest       = null;
   o.optionNormalInvert    = null;
   o.optionNormalCompress  = null;
   // @attribute 配置
   o.supportInstance       = null;
   // @attribute 顶点模式
   o.vertexCount           = 0;
   o.vertexColor           = null;
   o.vertexCoord           = null;
   o.vertexNormal          = null;
   o.vertexNormalFull      = null;
   o.vertexSkeleton        = null;
   o.vertexBoneCount       = 0;
   // @attribute 像素模式
   o.fragmentAlpha         = null;
   o.fragmentBump          = null;
   o.fragmentAmbient       = null;
   o.fragmentDiffuse       = null;
   o.fragmentDiffuseView   = null;
   o.fragmentSpecularColor = null;
   o.fragmentSpecularLevel = null;
   o.fragmentSpecularView  = null;
   o.fragmentEnvironment   = null;
   o.fragmentLight         = null;
   o.fragmentReflect       = null;
   o.fragmentRefract       = null;
   o.fragmentEmissive      = null;
   o.fragmentHeight        = null;
   // @attribute 参数信息
   o.attributes            = new TArray();
   o.samplers              = new TArray();
   //..........................................................
   // @method
   o.attributeContains     = SG3dEffectInfo_attributeContains;
   o.samplerContains       = SG3dEffectInfo_samplerContains;
   o.reset                 = SG3dEffectInfo_reset;
   //..........................................................
   // @construct
   o.reset();
   return o;
}

//==========================================================
// <T>判断是否存在属性信息。</T>
//
// @method
// @param p:name:String 名称
// @return Boolean 是否存在
//==========================================================
function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}

//==========================================================
// <T>判断是否存在取样信息。</T>
//
// @method
// @param p:name:String 名称
// @return Boolean 是否存在
//==========================================================
function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
function SG3dEffectInfo_reset(){
   var o = this;
   // @attribute 代码
   o.code = null;
   // @attribute 状态
   o.optionMerge = false;
   o.mergeCount = 0;
   // @attribute 状态
   o.fillModeCd = EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.optionNormalInvert = false;
   o.optionNormalCompress = true;
   // @attribute 配置
   o.supportInstance = false;
   // @attribute 顶点模式
   o.vertexCount = 0;
   o.vertexColor = false;
   o.vertexCoord = false;
   o.vertexNormal = false;
   o.vertexNormalFull = false;
   o.vertexSkeleton = false;
   o.vertexBoneCount = 0;
   // @attribute 像素模式
   o.fragmentAlpha = false;
   o.fragmentBump = false;
   o.fragmentAmbient = false;
   o.fragmentDiffuse = false;
   o.fragmentDiffuseView = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView = false;
   o.fragmentEnvironment = false;
   o.fragmentLight = false;
   o.fragmentReflect = false;
   o.fragmentRefract = false;
   o.fragmentEmissive = false;
   o.fragmentHeight = false;
   // @attribute 参数信息
   o.attributes.clear();
   o.samplers.clear();
}
