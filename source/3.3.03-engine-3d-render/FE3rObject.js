with(MO){
   //==========================================================
   // <T>渲染3D对象。</T>
   //
   // @class
   // @author maocy
   // @history 150206
   //==========================================================
   MO.FE3rObject = function FE3rObject(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      //..........................................................
      // @attribute
      o._guid = RClass.register(o, new AGetSet('_guid'));
      o._code = RClass.register(o, new AGetSet('_code'));
      return o;
   }
}
