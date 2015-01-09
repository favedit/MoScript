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
   o._code  = null;
   o._effectName = null;
   // @attribute
   o._optionLight = null;
   o._optionMerge = null;
   o._optionSort = null;
   o._sortLevel = null;
   o._optionAlpha = null;
   o._optionDepth = null;
   o._optionCompare = null;
   o._optionDouble = null;
   o._optionShadow = null;
   o._optionShadowSelf = null;
   o._optionDynamic = null;
   o._optionTransmittance = null;
   o._optionOpacity = null;
   // 存储纹理
   o._coordRateWidth = null;
   o._coordRateHeight = null;
   // 存储颜色
   o._colorMin = null;
   o._colorMax = null;
   o._colorRate = null;
   o._colorMerge = null;
   // 存储透明
   o._alphaBase = null;
   o._alphaRate = null;
   o._alphaLevel = null;
   o._alphaMerge = null;
   // @attribute
   o._ambientColor = null;
   o._ambientShadow = null;
   o._diffuseColor = null;
   o._diffuseShadow = null;
   o._diffuseViewColor = null;
   o._diffuseViewShadow = null;
   o._specularColor = null;
   o._specularBase = null;
   o._specularRate = null;
   o._specularAverage = null;
   o._specularShadow = null;
   o._specularViewColor = null;
   o._specularViewBase = null;
   o._specularViewRate = null;
   o._specularViewAverage = null;
   o._specularViewShadow = null;
      // 存储反射
   o._reflectColor = null;
   o._reflectMerge = null;
   o._reflectShadow = null;
      // 存储折射
   o._refractFrontColor = null;
   o._refractBackColor = null;
      // 存储不透明度
   o._opacityColor = null;
   o._opacityRate = null;
   o._opacityAlpha = null;
   o._opacityDepth = null;
   o._opacityTransmittance = null;
   // 存储自发光
   o._emissiveColor = null;
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = FRs3Material_construct;
   o.code        = FRs3Material_code;
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
   o._ambientColor = new SColor4()
   o._diffuseColor = new SColor4()
   o._diffuseViewColor = new SColor4()
   o._specularColor = new SColor4()
   o._specularViewColor = new SColor4()
   o._reflectColor = new SColor4()
   o._refractFrontColor = new SColor4()
   o._opacityColor = new SColor4()
   o._emissiveColor = null;
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
   o._effectName = p.readString();
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
