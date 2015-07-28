//==========================================================
// <T>实体基类。</T>
//
// @class
// @author maocy
// @history 150727
//==========================================================
MO.FEaiEntity = function FEaiEntity(o){
   o = MO.Class.inherits(this, o, MO.FEntity, MO.MGraphicObject, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
