//==========================================================
// <T>资源材质信息。</T>
//
// @author maocy
// @history 150107
//==========================================================
function SRs3MaterialInfo(o){
   if(!o){o = this;}
   SG3dMaterialInfo(o);
   //..........................................................
   // @method
   o.unserialize = SRs3MaterialInfo_unserialize;
   o.saveConfig  = SRs3MaterialInfo_saveConfig;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SRs3MaterialInfo_unserialize(p){
   var o = this;
   // 读取信息
   o.effectCode = p.readString();
   //o.transformName = p.readString();
   // 读取设置
   o.optionDepth = p.readBoolean();
   o.optionAlpha = p.readBoolean();
   o.optionDouble = p.readBoolean();
   o.optionView = p.readBoolean();
   o.optionNormalInvert = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   //o.optionLight = p.readBoolean();
   //o.optionMerge = p.readBoolean();
   //o.optionSort = p.readBoolean();
   //o.sortLevel = p.readInt32();
   //o.optionCompare = p.readString();
   //o.optionDynamic = p.readBoolean();
   //o.optionTransmittance = p.readBoolean();
   //o.optionOpacity = p.readBoolean();
   // 读取纹理
   //o.coordRateWidth = p.readFloat();
   //o.coordRateHeight = p.readFloat();
   // 读取透明
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   //o.alphaLevel = p.readFloat();
   //o.alphaMerge = p.readFloat();
   // 读取颜色
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   // 存储属性
   o.ambientColor.unserialize(p);
   //o.ambientShadow = p.readFloat();
   o.diffuseColor.unserialize(p);
   //o.diffuseShadow = p.readFloat();
   o.diffuseViewColor.unserialize(p);
   //o.diffuseViewShadow = p.readFloat();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularLevel = p.readFloat();
   //o.specularAverage = p.readFloat();
   //o.specularShadow = p.readFloat();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewLevel = p.readFloat();
   //o.specularViewAverage = p.readFloat();
   //o.specularViewShadow = p.readFloat();
   // 存储反射
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   //o.reflectShadow = p.readFloat();
   // 存储折射
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   // 存储不透明度
   //o.opacityColor.unserialize(p);
   //o.opacityRate = p.readFloat();
   //o.opacityAlpha = p.readFloat();
   //o.opacityDepth = p.readFloat();
   //o.opacityTransmittance = p.readFloat();
   // 存储自发光
   o.emissiveColor.unserialize(p);
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function SRs3MaterialInfo_saveConfig(p){
   var o = this;
   // 存储属性
   p.set('effect_code', o.effectCode);
   // 存储配置
   p.setBoolean('option_alpha', o.optionAlpha);
   p.setBoolean('option_double', o.optionDouble);
   p.setBoolean('option_view', o.optionView);
   p.setBoolean('option_normal_invert', o.optionNormalInvert);
   p.setBoolean('option_shadow', o.optionShadow);
   p.setBoolean('option_shadow_self', o.optionShadowSelf);
   // 存储材质
   var x = p.create('Alpha');
   x.setFloat('base', o.alphaBase);
   x.setFloat('rate', o.alphaRate);
   var x = p.create('Color');
   x.setFloat('min', o.colorMin);
   x.setFloat('max', o.colorMax);
   x.setFloat('rate', o.colorRate);
   x.setFloat('merge', o.colorMerge);
   o.ambientColor.savePower(p.create('Ambient'));
   o.diffuseColor.savePower(p.create('Diffuse'));
   o.diffuseViewColor.savePower(p.create('DiffuseView'));
   var x = p.create('Specular');
   o.specularColor.savePower(x);
   x.setFloat('base', o.specularBase);
   x.setFloat('level', o.specularLevel);
   var x = p.create('SpecularView');
   o.specularViewColor.savePower(x);
   x.setFloat('base', o.specularViewBase);
   x.setFloat('level', o.specularViewLevel);
   var x = p.create('Reflect');
   o.reflectColor.savePower(x);
   x.setFloat('merge', o.reflectMerge);
   o.refractFrontColor.savePower(p.create('RefractFront'));
   o.refractBackColor.savePower(p.create('RefractBack'));
   o.emissiveColor.savePower(p.create('Emissive'));
}
