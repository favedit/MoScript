with(MO){
    //==========================================================
   // <T>游戏NPC对象。</T>
   //
   // @class
   // @author maocy
   // @history 150419
   //==========================================================
   MO.FGmNpcEntity = function FGmNpcEntity(o){
      o = RClass.inherits(this, o, FGmSpriteEntity);
      //..........................................................
      // @method
      o.construct  = FGmNpcEntity_construct;
      // @method
      o.dispose    = FGmNpcEntity_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmNpcEntity_construct = function FGmNpcEntity_construct(){
      var o = this;
      o.__base.FGmSpriteEntity.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmNpcEntity_dispose = function FGmNpcEntity_dispose(){
      var o = this;
      // 父处理
      o.__base.FGmSpriteEntity.dispose.call(o);
   }
}
