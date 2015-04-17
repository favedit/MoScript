//==========================================================
// <T>材质信息。</T>
//
// @author maocy
// @history 150107
//==========================================================
function SG3dMaterialInfo(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute 效果名称
   o.effectCode           = 'automatic';
   // @attribute 变换名称
   //o.transformName        = null;
   //..........................................................
   // @attribute 设置深度
   o.optionDepth          = null;
   // @attribute 设置双面
   o.optionDouble         = null;
   // @attribute 设置法线反向
   o.optionNormalInvert   = null;
   // @attribute 设置影子
   o.optionShadow         = null;
   // @attribute 设置自阴影
   o.optionShadowSelf     = null;
   //..........................................................
   // @attribute 设置光源
   //o.optionLight          = null;
   // @attribute 设置合并
   //o.optionMerge          = null;
   // @attribute 设置排序
   //o.optionSort           = null;
   // @attribute 排序级别
   //o.sortLevel            = null;
   // @attribute 设置比较
   //o.optionCompare        = null;
   // @attribute 设置动态
   //o.optionDynamic        = null;
   //..........................................................
   // @attribute 存储纹理
   //o.coordRateWidth       = 1.0;
   //o.coordRateHeight      = 1.0;
   // @attribute 透明信息
   o.optionAlpha          = null;
   o.alphaBase            = 1.0;
   o.alphaRate            = 1.0;
   o.alphaLevel           = 1.0;
   o.alphaMerge           = 1.0;
   // @attribute 颜色信息
   o.optionColor          = null;
   o.colorMin             = 0.0;
   o.colorMax             = 1.0;
   o.colorRate            = 0.5;
   o.colorMerge           = 1.0;
   //..........................................................
   // @attribute 设置光信息
   o.optionAmbient        = null;
   o.ambientColor         = new SColor4();
   o.ambientShadow        = 1.0;
   // @attribute 散射光信息
   o.optionDiffuse        = null;
   o.diffuseColor         = new SColor4();
   o.diffuseShadow        = 1.0;
   // @attribute 散射光视角信息
   o.optionDiffuseView    = null;
   o.diffuseViewColor     = new SColor4();
   o.diffuseViewShadow    = 1.0;
   // @attribute 高光信息
   o.optionSpecular       = null;
   o.specularColor        = new SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   // @attribute 高光视角信息
   o.optionSpecularView   = null;
   o.specularViewColor    = new SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   // @attribute 反射信息
   o.optionReflect        = null;
   o.reflectColor         = new SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   // @attribute 折射信息
   o.optionRefract        = null;
   o.refractFrontColor    = new SColor4();
   o.refractBackColor     = new SColor4();
   // @attribute 不透明信息
   o.optionOpacity        = null;
   o.opacityColor         = new SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   // @attribute 发光信息
   o.optionEmissive       = null;
   o.emissiveColor        = new SColor4();
   //..........................................................
   // @method
   o.assign               = SG3dMaterialInfo_assign;
   o.calculate            = SG3dMaterialInfo_calculate;
   o.reset                = SG3dMaterialInfo_reset;
   //..........................................................
   // @construct
   o.reset();
   return o;
}

//==========================================================
// <T>接收数据信息。</T>
//
// @method
// @param p:info:SG3dMaterialInfo 材质信息
//==========================================================
function SG3dMaterialInfo_assign(p){
   var o = this;
   // 设置属性
   o.effectCode = p.effectCode;
   o.transformName = p.transformName;
   // 设置配置
   o.optionDepth = p.optionDepth;
   o.optionDouble = p.optionDouble;
   o.optionNormalInvert = p.optionNormalInvert;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   // 设置颜色
   o.optionColor = p.optionColor;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   // 设置透明
   o.optionAlpha = p.optionAlpha;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   // 设置环境
   o.optionAmbient = p.optionAmbient;
   o.ambientColor.assign(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   // 设置散射
   o.optionDiffuse = p.optionDiffuse;
   o.diffuseColor.assign(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   // 设置散射视角
   o.optionDiffuseView = p.optionDiffuseView;
   o.diffuseViewColor.assign(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   // 设置高光
   o.optionSpecular = p.optionSpecular;
   o.specularColor.assign(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularLevel = p.specularLevel;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   // 设置高光视角
   o.optionSpecularView = p.optionSpecularView;
   o.specularViewColor.assign(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   // 设置反射
   o.optionReflect = p.optionReflect;
   o.reflectColor.assign(p.reflectColor);
   o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
   o.reflectShadow = p.reflectShadow;
   // 设置折射
   o.optionRefract = p.optionRefract;
   o.refractFrontColor.assign(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assign(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   // 设置不透明
   o.optionOpacity = p.optionOpacity;
   o.opacityColor.assign(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   // 设置发光
   o.optionEmissive = p.optionEmissive;
   o.emissiveColor.assign(p.emissiveColor);
}

//==========================================================
// <T>计算数据信息。</T>
//
// @method
// @param p:info:SG3dMaterialInfo 材质信息
//==========================================================
function SG3dMaterialInfo_calculate(p){
   var o = this;
   // 设置属性
   o.effectCode = p.effectCode;
   o.transformName = p.transformName;
   // 设置配置
   o.optionDepth = p.optionDepth;
   o.optionDouble = p.optionDouble;
   o.optionNormalInvert = p.optionNormalInvert;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   // 设置颜色
   o.optionColor = p.optionColor;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   // 设置透明
   o.optionAlpha = p.optionAlpha;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   // 设置环境
   o.optionAmbient = p.optionAmbient;
   o.ambientColor.assignPower(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   // 设置散射
   o.optionDiffuse = p.optionDiffuse;
   o.diffuseColor.assignPower(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   // 设置散射视角
   o.optionDiffuseView = p.optionDiffuseView;
   o.diffuseViewColor.assignPower(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   // 设置高光
   o.optionSpecular = p.optionSpecular;
   o.specularColor.assignPower(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularLevel = p.specularLevel;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   // 设置高光视角
   o.optionSpecularView = p.optionSpecularView;
   o.specularViewColor.assignPower(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   // 设置反射
   o.optionReflect = p.optionReflect;
   o.reflectColor.assignPower(p.reflectColor);
   o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
   o.reflectShadow = p.reflectShadow;
   // 设置折射
   o.optionRefract = p.optionRefract;
   o.refractFrontColor.assignPower(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assignPower(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   // 设置不透明
   o.optionOpacity = p.optionOpacity;
   o.opacityColor.assignPower(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   // 设置发光
   o.optionEmissive = p.optionEmissive;
   o.emissiveColor.assignPower(p.emissiveColor);
}

//==========================================================
// <T>重置数据内容。</T>
//
// @method
//==========================================================
function SG3dMaterialInfo_reset(){
   var o = this;
   // 设置属性
   o.optionDepth = true;
   o.optionDouble = false;
   o.optionNormalInvert = false;
   o.optionShadow = true;
   o.optionShadowSelf = true;
   // 设置属性
   //o.coordRateWidth = 1.0;
   //o.coordRateHeight = 1.0;
   // 设置属性
   o.optionColor = true;
   o.colorMin = 0.0;
   o.colorMax = 1.0;
   o.colorRate = 0.5;
   o.colorMerge = 1.0;
   // 设置属性
   o.optionAlpha = false;
   o.alphaBase = 0.2;
   o.alphaRate = 1.0;
   o.alphaLevel = 1.0;
   o.alphaMerge = 1.0;
   // 设置属性
   o.optionAmbient = true;
   o.ambientColor.set(0.5, 0.5, 0.5, 1.0);
   o.ambientShadow = 1.0;
   // 设置属性
   o.optionDiffuse = true;
   o.diffuseColor.set(0.5, 0.5, 0.5, 1.0);
   o.diffuseShadow = 1.0;
   // 设置属性
   o.optionDiffuseView = true;
   o.diffuseViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.diffuseViewShadow = 1.0;
   // 设置属性
   o.optionSpecular = true;
   o.specularColor.set(0.5, 0.5, 0.5, 1.0);
   o.specularBase = 0.0;
   o.specularLevel = 16.0;
   o.specularAverage = 1.0;
   o.specularShadow = 1.0;
   // 设置属性
   o.optionSpecularView = true;
   o.specularViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.specularViewBase = 0.0;
   o.specularViewRate = 16.0;
   o.specularViewAverage = 1.0;
   o.specularViewShadow = 1.0;
   // 设置属性
   o.optionReflect = true;
   o.reflectColor.set(1.0, 1.0, 1.0, 1.0);
   o.reflectMerge = 1.0;
   o.reflectShadow = 1.0;
   // 设置属性
   o.optionRefract = true;
   o.refractFrontColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractFrontMerge = 1.0;
   o.refractFrontShadow = 1.0;
   o.refractBackColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractBackMerge = 1.0;
   o.refractBackShadow = 1.0;
   // 设置属性
   o.optionOpacity = true;
   o.opacityColor.set(1.0, 1.0, 1.0, 1.0);
   o.opacityRate = 1.0;
   o.opacityAlpha = 1.0;
   o.opacityDepth = 1.0;
   o.opacityTransmittance = 1.0;
   // 设置属性
   o.optionEmissive = true;
   o.emissiveColor.set(1.0, 1.0, 1.0, 1.0);
}
