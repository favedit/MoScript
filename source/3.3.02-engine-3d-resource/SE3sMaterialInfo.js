//==========================================================
// <T>资源材质信息。</T>
//
// @author maocy
// @history 150107
//==========================================================
MO.SE3sMaterialInfo = function SE3sMaterialInfo(){
   var o = this;
   MO.SG3dMaterialInfo.call(o);
   //..........................................................
   // @method
   o.unserialize = MO.SE3sMaterialInfo_unserialize;
   o.saveConfig  = MO.SE3sMaterialInfo_saveConfig;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.SE3sMaterialInfo_unserialize = function SE3sMaterialInfo_unserialize(input){
   var o = this;
   // 读取信息
   o.effectCode = input.readString();
   //o.transformName = input.readString();
   // 读取设置
   o.optionDepth = input.readBoolean();
   o.optionDouble = input.readBoolean();
   o.optionNormalInvert = input.readBoolean();
   o.optionShadow = input.readBoolean();
   o.optionShadowSelf = input.readBoolean();
   //o.optionLight = input.readBoolean();
   //o.optionMerge = input.readBoolean();
   //o.optionSort = input.readBoolean();
   //o.sortLevel = input.readInt32();
   //o.optionCompare = input.readString();
   //o.optionDynamic = input.readBoolean();
   // 读取纹理
   //o.coordRateWidth = input.readFloat();
   //o.coordRateHeight = input.readFloat();
   // 读取透明
   o.optionAlpha = input.readBoolean();
   o.alphaBase = input.readFloat();
   o.alphaRate = input.readFloat();
   // 读取颜色
   o.optionColor = input.readBoolean();
   o.colorMin = input.readFloat();
   o.colorMax = input.readFloat();
   o.colorBalance = input.readFloat();
   o.colorRate = input.readFloat();
   // 存储属性
   o.optionVertex = input.readBoolean();
   o.vertexColor.unserialize(input);
   // 存储属性
   o.optionAmbient = input.readBoolean();
   o.ambientColor.unserialize(input);
   // 存储属性
   o.optionDiffuse = input.readBoolean();
   o.diffuseColor.unserialize(input);
   o.optionDiffuseView = input.readBoolean();
   o.diffuseViewColor.unserialize(input);
   // 存储属性
   o.optionSpecular = input.readBoolean();
   o.specularColor.unserialize(input);
   o.specularBase = input.readFloat();
   o.specularLevel = input.readFloat();
   o.optionSpecularView = input.readBoolean();
   o.specularViewColor.unserialize(input);
   o.specularViewBase = input.readFloat();
   o.specularViewLevel = input.readFloat();
   // 存储反射
   o.optionReflect = input.readBoolean();
   o.reflectColor.unserialize(input);
   o.reflectMerge = input.readFloat();
   // 存储折射
   o.optionRefract = input.readBoolean();
   o.refractFrontColor.unserialize(input);
   o.refractBackColor.unserialize(input);
   // 存储不透明度
   o.optionOpacity = input.readBoolean();
   o.opacityColor.unserialize(input);
   o.opacityRate = input.readFloat();
   o.opacityAlpha = input.readFloat();
   o.opacityDepth = input.readFloat();
   o.opacityTransmittance = input.readFloat();
   // 存储自发光
   o.optionEmissive = input.readBoolean();
   o.emissiveColor.unserialize(input);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.SE3sMaterialInfo_saveConfig = function SE3sMaterialInfo_saveConfig(xconfig){
   var o = this;
   // 存储属性
   xconfig.set('effect_code', o.effectCode);
   // 存储配置
   xconfig.setBoolean('option_double', o.optionDouble);
   xconfig.setBoolean('option_alpha', o.optionAlpha);
   xconfig.setBoolean('option_normal_invert', o.optionNormalInvert);
   xconfig.setBoolean('option_shadow', o.optionShadow);
   xconfig.setBoolean('option_shadow_self', o.optionShadowSelf);
   // 存储透明
   var x = xconfig.create('Alpha');
   x.setBoolean('valid', o.optionAlpha);
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   // 存储颜色
   var x = xconfig.create('Color');
   x.setBoolean('valid', o.optionColor);
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('balance', o.colorBalance);
   x.setFloat('rate', o.colorRate);
   // 存储环境
   var x = xconfig.create('Vertex')
   x.setBoolean('valid', o.optionVertex);
   o.vertexColor.savePower(x);
   // 存储环境
   var x = xconfig.create('Ambient')
   x.setBoolean('valid', o.optionAmbient);
   o.ambientColor.savePower(x);
   // 存储散射
   var x = xconfig.create('Diffuse');
   x.setBoolean('valid', o.optionDiffuse);
   o.diffuseColor.savePower(x);
   // 存储散射视角
   var x = xconfig.create('DiffuseView');
   x.setBoolean('valid', o.optionDiffuseView);
   o.diffuseViewColor.savePower(x);
   // 存储高光
   var x = xconfig.create('Specular');
   x.setBoolean('valid', o.optionSpecular);
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   // 存储高光视角
   var x = xconfig.create('SpecularView');
   x.setBoolean('valid', o.optionSpecularView);
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   // 存储反射
   var x = xconfig.create('Reflect');
   x.setBoolean('valid', o.optionReflect);
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   // 存储折射
   var x = xconfig.create('Refract')
   x.setBoolean('valid', o.optionRefract);
   o.refractFrontColor.savePower(x.create('Front'));
   o.refractBackColor.savePower(x.create('Back'));
   // 存储透明
   var x = xconfig.create('Opacity')
   x.setBoolean('valid', o.optionOpacity);
   o.opacityColor.savePower(x);
   x.setFloat('rate', o.opacityRate);
   x.setFloat('alpha', o.opacityAlpha);
   x.setFloat('depth', o.opacityDepth);
   x.setFloat('transmittance', o.opacityTransmittance);
   // 存储发光
   var x = xconfig.create('Emissive')
   x.setBoolean('valid', o.optionEmissive);
   o.emissiveColor.savePower(x);
}
