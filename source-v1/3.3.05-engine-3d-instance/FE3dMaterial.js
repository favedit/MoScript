 //==========================================================
// <T>渲染资源。</T>
//
// @class
// @author maocy
// @history 150430
//==========================================================
function FE3dMaterial(o){
   o = RClass.inherits(this, o, FE3rMaterial);
   //..........................................................
   // @attribute
   o._parent    = null;
   //..........................................................
   // @method
   o.loadParent = FE3dRenderable_loadParent;
   return o;
}

//==========================================================
// <T>加载父材质。</T>
//
// @method
// @param material:FE3rMaterial 父材质
//==========================================================
function FE3dRenderable_loadParent(material){
   var o = this;
   o._parent = material;
}
