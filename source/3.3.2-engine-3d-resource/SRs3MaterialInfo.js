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
   o.effectName = p.readString();
   o.transformName = p.readString();
   // 读取设置
   o.optionLight = p.readBoolean();
   o.optionMerge = p.readBoolean();
   o.optionSort = p.readBoolean();
   o.sortLevel = p.readInt32();
   o.optionAlpha = p.readBoolean();
   o.optionDepth = p.readBoolean();
   o.optionCompare = p.readString();
   o.optionDouble = p.readBoolean();
   o.optionShadow = p.readBoolean();
   o.optionShadowSelf = p.readBoolean();
   o.optionDynamic = p.readBoolean();
   o.optionTransmittance = p.readBoolean();
   o.optionOpacity = p.readBoolean();
   // 读取纹理
   o.coordRateWidth = p.readFloat();
   o.coordRateHeight = p.readFloat();
   // 读取颜色
   o.colorMin = p.readFloat();
   o.colorMax = p.readFloat();
   o.colorRate = p.readFloat();
   o.colorMerge = p.readFloat();
   // 读取透明
   o.alphaBase = p.readFloat();
   o.alphaRate = p.readFloat();
   o.alphaLevel = p.readFloat();
   o.alphaMerge = p.readFloat();
   // 存储属性
   o.ambientColor.unserialize(p);
   o.ambientShadow = p.readFloat();
   o.diffuseColor.unserialize(p);
   o.diffuseShadow = p.readFloat();
   o.diffuseViewColor.unserialize(p);
   o.diffuseViewShadow = p.readFloat();
   o.specularColor.unserialize(p);
   o.specularBase = p.readFloat();
   o.specularRate = p.readFloat();
   o.specularAverage = p.readFloat();
   o.specularShadow = p.readFloat();
   o.specularViewColor.unserialize(p);
   o.specularViewBase = p.readFloat();
   o.specularViewRate = p.readFloat();
   o.specularViewAverage = p.readFloat();
   o.specularViewShadow = p.readFloat();
   // 存储反射
   o.reflectColor.unserialize(p);
   o.reflectMerge = p.readFloat();
   o.reflectShadow = p.readFloat();
   // 存储折射
   o.refractFrontColor.unserialize(p);
   o.refractBackColor.unserialize(p);
   // 存储不透明度
   o.opacityColor.unserialize(p);
   o.opacityRate = p.readFloat();
   o.opacityAlpha = p.readFloat();
   o.opacityDepth = p.readFloat();
   o.opacityTransmittance = p.readFloat();
   // 存储自发光
   o.emissiveColor.unserialize(p);
}
