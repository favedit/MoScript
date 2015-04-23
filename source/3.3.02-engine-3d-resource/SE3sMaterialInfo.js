//==========================================================
// <T>资源材质信息。</T>
//
// @author maocy
// @history 150107
//==========================================================
function SE3sMaterialInfo(){
   var o = this;
   SG3dMaterialInfo.call(o);
   //..........................................................
   // @method
   o.unserialize = SE3sMaterialInfo_unserialize;
   o.saveConfig  = SE3sMaterialInfo_saveConfig;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SE3sMaterialInfo_unserialize(p){
   var o = this;
   // 读取信息
   o.effectCode = p.readString();
   //o.transformName = p.readString();
   // 读取设置
   o.optionDepth = p.readBoolean();
   o.optionDouble = p.readBoolean();
   o.optionNormalInvert = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   //o.optionLight = p.readBoolean();
   //o.optionMerge = p.readBoolean();
   //o.optionSort = p.readBoolean();
   //o.sortLevel = p.readInt32();
   //o.optionCompare = p.readString();
   //o.optionDynamic = p.readBoolean();
   // 读取纹理
   //o.coordRateWidth = p.readFloat();
   //o.coordRateHeight = p.readFloat();
   // 读取透明
   o.optionAlpha = p.readBoolean();
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   // 读取颜色
   o.optionColor = p.readBoolean();
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   // 存储属性
   o.optionAmbient = p.readBoolean();
   o.ambientColor.unserialize(p);
   // 存储属性
   o.optionDiffuse = p.readBoolean();
   o.diffuseColor.unserialize(p);
   o.optionDiffuseView = p.readBoolean();
   o.diffuseViewColor.unserialize(p);
   // 存储属性
   o.optionSpecular = p.readBoolean();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularLevel = p.readFloat();
   o.optionSpecularView = p.readBoolean();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewLevel = p.readFloat();
   // 存储反射
   o.optionReflect = p.readBoolean();
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   // 存储折射
   o.optionRefract = p.readBoolean();
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   // 存储不透明度
   o.optionOpacity = p.readBoolean();
   o.opacityColor.unserialize(p);
   o.opacityRate = p.readFloat();
   o.opacityAlpha = p.readFloat();
   o.opacityDepth = p.readFloat();
   o.opacityTransmittance = p.readFloat();
   // 存储自发光
   o.optionEmissive = p.readBoolean();
   o.emissiveColor.unserialize(p);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function SE3sMaterialInfo_saveConfig(p){
   var o = this;
   // 存储属性
   p.set('effect_code', o.effectCode);
   // 存储配置
   p.setBoolean('option_double', o.optionDouble);
   p.setBoolean('option_alpha', o.optionAlpha);
   p.setBoolean('option_normal_invert', o.optionNormalInvert);
   p.setBoolean('option_shadow', o.optionShadow);
   p.setBoolean('option_shadow_self', o.optionShadowSelf);
   // 存储透明
   var x = p.create('Alpha');
   x.setBoolean('valid', o.optionAlpha);
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   // 存储颜色
   var x = p.create('Color');
   x.setBoolean('valid', o.optionColor);
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('rate', o.colorRate);
   x.setFloat('merge', o.colorMerge);
   // 存储环境
   var x = p.create('Ambient')
   x.setBoolean('valid', o.optionAmbient);
   o.ambientColor.savePower(x);
   // 存储散射
   var x = p.create('Diffuse');
   x.setBoolean('valid', o.optionDiffuse);
   o.diffuseColor.savePower(x);
   // 存储散射视角
   var x = p.create('DiffuseView');
   x.setBoolean('valid', o.optionDiffuseView);
   o.diffuseViewColor.savePower(x);
   // 存储高光
   var x = p.create('Specular');
   x.setBoolean('valid', o.optionSpecular);
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   // 存储高光视角
   var x = p.create('SpecularView');
   x.setBoolean('valid', o.optionSpecularView);
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   // 存储反射
   var x = p.create('Reflect');
   x.setBoolean('valid', o.optionReflect);
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   // 存储折射
   var x = p.create('Refract')
   x.setBoolean('valid', o.optionRefract);
   o.refractFrontColor.savePower(x.create('Front'));
   o.refractBackColor.savePower(x.create('Back'));
   // 存储透明
   var x = p.create('Opacity')
   x.setBoolean('valid', o.optionOpacity);
   o.opacityColor.savePower(x);
   x.setFloat('rate', o.opacityRate);
   x.setFloat('alpha', o.opacityAlpha);
   x.setFloat('depth', o.opacityDepth);
   x.setFloat('transmittance', o.opacityTransmittance);
   // 存储发光
   var x = p.create('Emissive')
   x.setBoolean('valid', o.optionEmissive);
   o.emissiveColor.savePower(x);
}
