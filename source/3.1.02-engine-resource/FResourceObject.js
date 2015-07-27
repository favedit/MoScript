//==========================================================
// <T>资源对象。</T>
//
// @class
// @author maocy
// @version 150721
//==========================================================
MO.FResourceObject = function FResourceObject(o){
   o = MO.Class.inherits(this, o, MO.FResource);
   //..........................................................
   // @attribute
   o._typeCode = MO.Class.register(o, new MO.AGetter('_typeCode'));
   return o;
}
