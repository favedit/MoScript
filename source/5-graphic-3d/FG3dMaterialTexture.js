//==========================================================
// <T>渲染材质。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FG3dMaterialTexture(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   //..........................................................
   // @attribute 名称
   o.name = null;
   // 设置合并
   o.reflectColor = null;
   //..........................................................
   // @method
   o.construct   = FG3dMaterial_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dMaterial_construct(){
   var o = this;
   o.ambientColor = new SColor4();
   o.diffuseColor = new SColor4();
   o.diffuseViewColor = new SColor4();
   o.specularColor = new SColor4();
   o.specularViewColor = new SColor4();
   o.reflectColor = new SColor4();
}
