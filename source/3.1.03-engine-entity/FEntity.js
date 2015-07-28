//==========================================================
// <T>实体对象。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEntity = function FEntity(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @method
   o.processLoad = MO.Method.emptyTrue;
   return o;
}
