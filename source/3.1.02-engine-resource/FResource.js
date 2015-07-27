//==========================================================
// <T>资源基类。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FResource = function FResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   //o._typeCode     = MO.Class.register(o, new MO.AGetter('_typeCode'));
   //o._type         = MO.Class.register(o, new MO.AGetter('_type'));
   // @attribute
   o._guid         = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code         = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label        = MO.Class.register(o, new MO.AGetSet('_label'));
   // @attribute
   //o._sourceUrl    = MO.Class.register(o, new MO.AGetSet('_sourceUrl'));
   // @attribute
   //o._dataCompress = false;
   //o._dataBlock    = false;
   return o;
}
