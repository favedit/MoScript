//==========================================================
// <T>实体对象。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEntity = function FEntity(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MReady);
   //..........................................................
   // @attribute
   o._statusReady = false;
   //..........................................................
   // @method
   o.testReady    = MO.FEntity_testReady;
   // @method
   o.processLoad  = MO.Method.emptyTrue;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FEntity_testReady = function FEntity_testReady(){
   return this._statusReady;
}
