//==========================================================
// <T>资源分组。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FResourceGroup = function FResourceGroup(o){
   o = MO.Class.inherits(this, o, MO.FResource);
   //..........................................................
   // @attribute
   o._resources = null;
   return o;
}
