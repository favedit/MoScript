//==========================================================
// <T>渲染3D对象。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
MO.ME3dObject = function ME3dObject(o){
   o = MO.Class.inherits(this, o, MO.MGraphicObject, MO.MAttributeCode);
   //..........................................................
   // @attribute
   o._guid = MO.Class.register(o, new MO.AGetSet('_guid'));
   return o;
}
