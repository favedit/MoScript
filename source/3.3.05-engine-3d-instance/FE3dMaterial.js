//==========================================================
// <T>渲染资源。</T>
//
// @class
// @author maocy
// @history 150430
//==========================================================
MO.FE3dMaterial = function FE3dMaterial(o){
   o = MO.Class.inherits(this, o, MO.FE3rMaterial);
   //..........................................................
   // @attribute
   o._parent    = null;
   //..........................................................
   // @method
   o.loadParent = MO.FE3dRenderable_loadParent;
   return o;
}

//==========================================================
// <T>加载父材质。</T>
//
// @method
// @param material:FE3rMaterial 父材质
//==========================================================
MO.FE3dRenderable_loadParent = function FE3dRenderable_loadParent(material){
   var o = this;
   o._parent = material;
}
