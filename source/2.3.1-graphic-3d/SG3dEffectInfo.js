//==========================================================
// <T>效果器信息。</T>
//
// @author maocy
// @history 150113
//==========================================================
function SG3dEffectInfo(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute 代码
   o.code                  = null;
   // @attribute 状态
   o.fillModeCd            = EG3dFillMode.Fill;
   o.optionCullMode        = true;
   o.cullModeCd            = EG3dCullMode.Front;
   o.optionDepthTest       = true;
   o.depthModeCd           = EG3dDepthMode.Less;
   o.optionDepthWrite      = true;
   o.optionBlendMode       = false;
   o.blendSourceMode       = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode       = EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest       = false;
   // @attribute 配置
   o.supportInstance       = false;
   // @attribute 顶点模式
   o.vertexColor           = false;
   o.vertexCoord           = false;
   o.vertexNormal          = false;
   o.vertexNormalFull      = false;
   o.vertexSkeleton        = false;
   // @attribute 像素模式
   o.fragmentAlpha         = false;
   o.fragmentBump          = false;
   o.fragmentAmbient       = false;
   o.fragmentDiffuse       = false;
   o.fragmentDiffuseView   = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView  = false;
   o.fragmentEnvironment   = false;
   o.fragmentLight         = false;
   o.fragmentReflect       = false;
   o.fragmentRefract       = false;
   o.fragmentEmissive      = false;
   o.fragmentHeight        = false;
   // @attribute 参数信息
   o.attributes            = new Object();
   o.samplers              = new Object();
   //..........................................................
   // @method
   o.attributeContains     = SG3dEffectInfo_attributeContains;
   o.samplerContains       = SG3dEffectInfo_samplerContains;
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
   return this.attributes[p] != null;
}


//==========================================================
// <T>判断是否存在取样信息。</T>
//
// @method
// @param p:name:String 名称
// @return Boolean 是否存在
//==========================================================
function SG3dEffectInfo_samplerContains(p){
   return this.samplers[p] != null;
}
