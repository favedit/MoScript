//==========================================================
// <T>资源分组。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FResourceGroup = function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._code      = MO.Class.register(o, new MO.AGetter('_code'));
   o._resources = null;
   return o;
}
