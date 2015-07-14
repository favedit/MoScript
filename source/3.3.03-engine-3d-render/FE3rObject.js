//==========================================================
// <T>渲染3D对象。</T>
//
// @class
// @author maocy
// @history 150206
//==========================================================
MO.FE3rObject = function FE3rObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
