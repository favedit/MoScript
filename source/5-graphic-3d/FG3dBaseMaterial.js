//==========================================================
// <T>基础渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 名称
   o.name = null;
   // 设置合并
   o.optionMerge = null;
   // 设置排序
   o.optionSort = null;
   // 排序级别
   o.sortLevel = null;
   // 设置透明
   o.optionAlpha = null;
   // 设置深度
   o.optionDepth = null;
   // 设置比较
   o.optionCompare = null;
   // 设置双面
   o.optionDouble = null;
   // 设置影子
   o.optionShadow = null;
   // 设置自阴影
   o.optionShadowSelf = null;
   // 颜色信息
   o.color = null;
   // 透明信息
   o.alpha = null;
   // 环境光颜色 (RGB=颜色，A=强度)
   o.ambientColor = null;
   // 环境光阴影
   o.ambientShadow = null;
   // 散射光颜色 (RGB=颜色，A=强度)
   o.diffuseColor = null;
   // 散射光阴影
   o.diffuseShadow = null;
   // 散射光相机颜色 (RGB=颜色，A=强度)
   o.diffuseViewColor = null;
   // 散射光视角阴影
   o.diffuseViewShadow = null;
   // 高光颜色 (RGB=颜色，A=强度)
   o.specularColor = null;
   // 高光阴影
   o.specularShadow = null;
   // 高光信息
   o.specularInfo = null;
   // 高光视角颜色 (RGB=颜色，A=强度)
   o.specularViewColor = null;
   // 高光视角信息
   o.specularViewInfo = null;
   // 高光视角阴影
   o.specularViewShadow = null;
   // 反射颜色 (RGB=颜色，A=强度)
   o.reflectColor = null;
   // 纹理集合
   o.textures = null;
   //..........................................................
   // @method
   o.construct = FG3dBaseMaterial_construct;
   o.textures  = FG3dBaseMaterial_textures;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.ambientColor = new SColor4();
   o.diffuseColor = new SColor4();
   o.diffuseViewColor = new SColor4();
   o.specularColor = new SColor4();
   o.specularViewColor = new SColor4();
   o.reflectColor = new SColor4();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dBaseMaterial_textures(){
   return this.textures;
}
