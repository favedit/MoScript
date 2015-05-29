with(MO){
    //==========================================================
   // <T>游戏玩家对象。</T>
   //
   // @class
   // @author maocy
   // @history 150419
   //==========================================================
   MO.FGmPlayerEntity = function FGmPlayerEntity(o){
      o = RClass.inherits(this, o, FGmRoleEntity);
      //..........................................................
      // @method
      o.construct  = FGmPlayerEntity_construct;
      // @method
      o.dispose    = FGmPlayerEntity_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmPlayerEntity_construct = function FGmPlayerEntity_construct(){
      var o = this;
      o.__base.FGmRoleEntity.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmPlayerEntity_dispose = function FGmPlayerEntity_dispose(){
      var o = this;
      // 父处理
      o.__base.FGmRoleEntity.dispose.call(o);
   }
}
