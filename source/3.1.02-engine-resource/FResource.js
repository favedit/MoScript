with(MO){
   //==========================================================
   // <T>资源基类。</T>
   //
   // @class
   // @author maocy
   // @version 150105
   //==========================================================
   MO.FResource = function FResource(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._typeCode     = RClass.register(o, new AGetter('_typeCode'));
      o._type         = RClass.register(o, new AGetter('_type'));
      // @attribute
      o._guid         = RClass.register(o, new AGetSet('_guid'));
      o._code         = RClass.register(o, new AGetSet('_code'));
      o._label        = RClass.register(o, new AGetSet('_label'));
      // @attribute
      o._sourceUrl    = RClass.register(o, new AGetSet('_sourceUrl'));
      // @attribute
      o._dataCompress = false;
      o._dataBlock    = false;
      return o;
   }
}
