//==========================================================
// <T>材质信息。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.Graphic3d.SG3dMaterialInfo = function SG3dMaterialInfo(){
   var o = this;
   //..........................................................
   // @attribute 效果名称
   o.effectCode           = 'automatic';
   // @attribute 变换名称
   o.transformName        = null;
   //..........................................................
   // @attribute 设置深度
   o.optionDepth          = null;
   // @attribute 设置双面
   o.optionDouble         = null;
   // @attribute 设置透明
   o.optionAlpha          = null;
   // @attribute 设置视角
   o.optionView           = null;
   // @attribute 设置法线反向
   o.optionNormalInvert   = null;
   // @attribute 设置影子
   o.optionShadow         = null;
   // @attribute 设置自阴影
   o.optionShadowSelf     = null;
   //..........................................................
   // @attribute 设置光源
   o.optionLight          = null;
   // @attribute 设置合并
   o.optionMerge          = null;
   // @attribute 设置排序
   o.optionSort           = null;
   // @attribute 排序级别
   o.sortLevel            = null;
   // @attribute 设置比较
   o.optionCompare        = null;
   // @attribute 设置动态
   o.optionDynamic        = null;
   // @attribute 设置投射
   o.optionTransmittance  = null;
   // @attribute 设置不透明
   o.optionOpacity        = null;
   //..........................................................
   // @attribute 存储纹理
   o.coordRateWidth       = 1.0;
   o.coordRateHeight      = 1.0;
   // @attribute 颜色信息
   o.colorMin             = 0.0;
   o.colorMax             = 1.0;
   o.colorRate            = 1.0;
   o.colorMerge           = 1.0;
   // @attribute 透明信息
   o.alphaBase            = 1.0;
   o.alphaRate            = 1.0;
   o.alphaLevel           = 1.0;
   o.alphaMerge           = 1.0;
   //..........................................................
   // 环境光颜色 (RGB=颜色，A=强度)
   o.ambientColor         = new MO.SColor4();
   // 环境光阴影
   o.ambientShadow        = 1.0;
   // 散射光颜色 (RGB=颜色，A=强度)
   o.diffuseColor         = new MO.SColor4();
   // 散射光阴影
   o.diffuseShadow        = 1.0;
   // 散射光相机颜色 (RGB=颜色，A=强度)
   o.diffuseViewColor     = new MO.SColor4();
   // 散射光视角阴影
   o.diffuseViewShadow    = 1.0;
   // 高光颜色 (RGB=颜色，A=强度)
   o.specularColor        = new MO.SColor4();
   // 高光信息
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   // 高光信息
   o.specularInfo         = null;
   // 高光视角颜色 (RGB=颜色，A=强度)
   o.specularViewColor    = new MO.SColor4();
   // 高光视角信息
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   // 高光视角阴影
   o.specularViewShadow   = null;
   // 反射颜色 (RGB=颜色，A=强度)
   o.reflectColor         = new MO.SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   // 存储折射
   o.refractFrontColor    = new MO.SColor4();
   o.refractBackColor     = new MO.SColor4();
   // 存储不透明度
   o.opacityColor         = new MO.SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   // 存储自发光
   o.emissiveColor        = new MO.SColor4();
   //..........................................................
   // @method
   o.assign               = SG3dMaterialInfo_assign;
   o.calculate            = SG3dMaterialInfo_calculate;
   o.reset                = SG3dMaterialInfo_reset;
   //..........................................................
   // @construct
   o.reset();
   return o;

   //==========================================================
   // <T>接收数据信息。</T>
   //
   // @method
   // @param p:info:SG3dMaterialInfo 材质信息
   //==========================================================
   function SG3dMaterialInfo_assign(p){
      var o = this;
      // 存储属性
      o.effectCode = p.effectCode;
      o.transformName = p.transformName;
      // 存储设置
      o.optionDepth = p.optionDepth;
      o.optionAlpha = p.optionAlpha;
      o.optionDouble = p.optionDouble;
      o.optionView = p.optionView;
      o.optionNormalInvert = p.optionNormalInvert;
      o.optionShadow = p.optionShadow;
      o.optionShadowSelf = p.optionShadowSelf;
      // 存储设置
      o.optionLight = p.optionLight;
      o.optionMerge = p.optionMerge;
      o.optionCompare = p.optionCompare;
      o.optionOpacity = p.optionOpacity;
      o.optionTransmittance = p.optionTransmittance;
      // 存储信息
      o.sortLevel = p.sortLevel;
      // 存储颜色
      o.colorMin = p.colorMin;
      o.colorMax = p.colorMax;
      o.colorRate = p.colorRate;
      o.colorMerge = p.colorMerge;
      // 存储透明
      o.alphaBase = p.alphaBase;
      o.alphaRate = p.alphaRate;
      o.alphaLevel = p.alphaLevel;
      o.alphaMerge = p.alphaMerge;
      // 存储属性
      o.ambientColor.assign(p.ambientColor);
      o.ambientShadow = p.ambientShadow;
      o.diffuseColor.assign(p.diffuseColor);
      o.diffuseShadow = p.diffuseShadow;
      o.diffuseViewColor.assign(p.diffuseViewColor);
      o.diffuseViewShadow = p.diffuseViewShadow;
      o.specularColor.assign(p.specularColor);
      o.specularBase = p.specularBase;
      o.specularLevel = p.specularLevel;
      o.specularAverage = p.specularAverage;
      o.specularShadow = p.specularShadow;
      o.specularViewColor.assign(p.specularViewColor);
      o.specularViewBase = p.specularViewBase;
      o.specularViewRate = p.specularViewRate;
      o.specularViewAverage = p.specularViewAverage;
      o.specularViewShadow = p.specularViewShadow;
      o.reflectColor.assign(p.reflectColor);
      o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
      o.reflectShadow = p.reflectShadow;
      o.refractFrontColor.assign(p.refractFrontColor);
      o.refractFrontMerge = p.refractFrontMerge;
      o.refractFrontShadow = p.refractFrontShadow;
      o.refractBackColor.assign(p.refractBackColor);
      o.refractBackMerge = p.refractBackMerge;
      o.refractBackShadow = p.refractBackShadow;
      o.opacityColor.assign(p.opacityColor);
      o.opacityRate = p.opacityRate;
      o.opacityAlpha = p.optionAlpha;
      o.opacityDepth = p.optionDepth;
      o.opacityTransmittance = p.optionTransmittance;
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
      // 存储属性
      o.effectCode = p.effectCode;
      o.transformName = p.transformName;
      // 存储设置
      o.optionDepth = p.optionDepth;
      o.optionAlpha = p.optionAlpha;
      o.optionDouble = p.optionDouble;
      o.optionView = p.optionView;
      o.optionNormalInvert = p.optionNormalInvert;
      o.optionShadow = p.optionShadow;
      o.optionShadowSelf = p.optionShadowSelf;
      // 存储设置
      o.optionLight = p.optionLight;
      o.optionMerge = p.optionMerge;
      o.optionCompare = p.optionCompare;
      o.optionOpacity = p.optionOpacity;
      o.optionTransmittance = p.optionTransmittance;
      // 存储信息
      o.sortLevel = p.sortLevel;
      // 存储颜色
      o.colorMin = p.colorMin;
      o.colorMax = p.colorMax;
      o.colorRate = p.colorRate;
      o.colorMerge = p.colorMerge;
      // 存储透明
      o.alphaBase = p.alphaBase;
      o.alphaRate = p.alphaRate;
      o.alphaLevel = p.alphaLevel;
      o.alphaMerge = p.alphaMerge;
      // 存储属性
      o.ambientColor.assignPower(p.ambientColor);
      o.ambientShadow = p.ambientShadow;
      o.diffuseColor.assignPower(p.diffuseColor);
      o.diffuseShadow = p.diffuseShadow;
      o.diffuseViewColor.assignPower(p.diffuseViewColor);
      o.diffuseViewShadow = p.diffuseViewShadow;
      o.specularColor.assignPower(p.specularColor);
      o.specularBase = p.specularBase;
      o.specularLevel = p.specularLevel;
      o.specularAverage = p.specularAverage;
      o.specularShadow = p.specularShadow;
      o.specularViewColor.assignPower(p.specularViewColor);
      o.specularViewBase = p.specularViewBase;
      o.specularViewRate = p.specularViewRate;
      o.specularViewAverage = p.specularViewAverage;
      o.specularViewShadow = p.specularViewShadow;
      o.reflectColor.assignPower(p.reflectColor);
      o.reflectMerge = RFloat.toRange(p.reflectMerge, 0, 2);
      o.reflectShadow = p.reflectShadow;
      o.refractFrontColor.assignPower(p.refractFrontColor);
      o.refractFrontMerge = p.refractFrontMerge;
      o.refractFrontShadow = p.refractFrontShadow;
      o.refractBackColor.assignPower(p.refractBackColor);
      o.refractBackMerge = p.refractBackMerge;
      o.refractBackShadow = p.refractBackShadow;
      o.opacityColor.assignPower(p.opacityColor);
      o.opacityRate = p.opacityRate;
      o.opacityAlpha = p.optionAlpha;
      o.opacityDepth = p.optionDepth;
      o.opacityTransmittance = p.optionTransmittance;
      o.emissiveColor.assignPower(p.emissiveColor);
   }

   //==========================================================
   // <T>重置数据内容。</T>
   //
   // @method
   //==========================================================
   function SG3dMaterialInfo_reset(){
      var o = this;
      o.coordRateWidth = 1.0;
      o.coordRateHeight = 1.0;
      o.colorMin = 0.0;
      o.colorMax = 1.0;
      o.colorRate = 1.0;
      o.colorMerge = 1.0;
      o.alphaBase = 0.1;
      o.alphaRate = 1.0;
      o.alphaLevel = 1.0;
      o.alphaMerge = 1.0;
      o.ambientColor.set(0.5, 0.5, 0.5, 1.0);
      o.ambientShadow = 1.0;
      o.diffuseColor.set(0.5, 0.5, 0.5, 1.0);
      o.diffuseShadow = 1.0;
      o.diffuseViewColor.set(1.0, 1.0, 1.0, 1.0);
      o.diffuseViewShadow = 1.0;
      o.specularColor.set(0.5, 0.5, 0.5, 1.0);
      o.specularBase = 0.0;
      o.specularLevel = 16.0;
      o.specularAverage = 1.0;
      o.specularShadow = 1.0;
      o.specularViewColor.set(1.0, 1.0, 1.0, 1.0);
      o.specularViewBase = 0.0;
      o.specularViewRate = 16.0;
      o.specularViewAverage = 1.0;
      o.specularViewShadow = 1.0;
      o.reflectColor.set(1.0, 1.0, 1.0, 1.0);
      o.reflectMerge = 1.0;
      o.reflectShadow = 1.0;
      o.refractFrontColor.set(1.0, 1.0, 1.0, 1.0);
      o.refractFrontMerge = 1.0;
      o.refractFrontShadow = 1.0;
      o.refractBackColor.set(1.0, 1.0, 1.0, 1.0);
      o.refractBackMerge = 1.0;
      o.refractBackShadow = 1.0;
      o.opacityColor.set(1.0, 1.0, 1.0, 1.0);
      o.opacityRate = 1.0;
      o.opacityAlpha = 1.0;
      o.opacityDepth = 1.0;
      o.opacityTransmittance = 1.0;
      o.emissiveColor.set(1.0, 1.0, 1.0, 1.0);
   }
}
