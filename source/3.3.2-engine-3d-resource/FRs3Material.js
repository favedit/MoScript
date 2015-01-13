//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._code       = null;
   // @attribute
   o._info       = null;
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = FRs3Material_construct;
   o.code        = FRs3Material_code;
   o.effectName  = FRs3Material_effectName;
   o.info        = FRs3Material_info;
   o.textures    = FRs3Material_textures;
   o.unserialize = FRs3Material_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   // @attribute
   o._info = new SG3dMaterialInfo();
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FRs3Material_code(){
   return this._code;
}

//==========================================================
// <T>获得效果名称。</T>
//
// @method
// @return String 效果名称
//==========================================================
function FRs3Material_effectName(){
   return this._info.effectName;
}

//==========================================================
// <T>获得材质信息。</T>
//
// @method
// @return SG3dMaterialInfo 材质信息
//==========================================================
function FRs3Material_info(){
   return this._info;
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TObjects 纹理集合
//==========================================================
function FRs3Material_textures(){
   return this._textures;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Material_unserialize(p){
   var o = this;
   // 读取属性
   o._code = p.readString();
   // 读取信息
   var m = o._info;
   m.effectName = p.readString();
   m.transformName = p.readString();
   // 读取设置
   m.optionLight = p.readBoolean();
   m.optionMerge = p.readBoolean();
   m.optionSort = p.readBoolean();
   m.sortLevel = p.readInt32();
   m.optionAlpha = p.readBoolean();
   m.optionDepth = p.readBoolean();
   m.optionCompare = p.readString();
   m.optionDouble = p.readBoolean();
   m.optionShadow = p.readBoolean();
   m.optionShadowSelf = p.readBoolean();
   m.optionDynamic = p.readBoolean();
   m.optionTransmittance = p.readBoolean();
   m.optionOpacity = p.readBoolean();
   // 读取纹理
   m.coordRateWidth = p.readFloat();
   m.coordRateHeight = p.readFloat();
   // 读取颜色
   m.colorMin = p.readFloat();
   m.colorMax = p.readFloat();
   m.colorRate = p.readFloat();
   m.colorMerge = p.readFloat();
   // 读取透明
   m.alphaBase = p.readFloat();
   m.alphaRate = p.readFloat();
   m.alphaLevel = p.readFloat();
   m.alphaMerge = p.readFloat();
   // 存储属性
   m.ambientColor.unserialize(p);
   m.ambientShadow = p.readFloat();
   m.diffuseColor.unserialize(p);
   m.diffuseShadow = p.readFloat();
   m.diffuseViewColor.unserialize(p);
   m.diffuseViewShadow = p.readFloat();
   m.specularColor.unserialize(p);
   m.specularBase = p.readFloat();
   m.specularRate = p.readFloat();
   m.specularAverage = p.readFloat();
   m.specularShadow = p.readFloat();
   m.specularViewColor.unserialize(p);
   m.specularViewBase = p.readFloat();
   m.specularViewRate = p.readFloat();
   m.specularViewAverage = p.readFloat();
   m.specularViewShadow = p.readFloat();
   // 存储反射
   m.reflectColor.unserialize(p);
   m.reflectMerge = p.readFloat();
   m.reflectShadow = p.readFloat();
   // 存储折射
   m.refractFrontColor.unserialize(p);
   m.refractBackColor.unserialize(p);
   // 存储不透明度
   m.opacityColor.unserialize(p);
   m.opacityRate = p.readFloat();
   m.opacityAlpha = p.readFloat();
   m.opacityDepth = p.readFloat();
   m.opacityTransmittance = p.readFloat();
   // 存储自发光
   m.emissiveColor.unserialize(p);
   // 读取纹理集合
   var c = p.readInt8();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
