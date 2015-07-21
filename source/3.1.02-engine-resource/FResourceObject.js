//==========================================================
// <T>资源对象。</T>
//
// @class
// @author maocy
// @version 150721
//==========================================================
MO.FResourceObject = function FResourceObject(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._typeCode = MO.Class.register(o, new MO.AGetter('_typeCode'));
   // @attribute
   o._guid     = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code     = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label    = MO.Class.register(o, new MO.AGetSet('_label'));
   return o;
}
