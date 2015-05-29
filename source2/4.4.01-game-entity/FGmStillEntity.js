with(MO){
    //==========================================================
   // <T>游戏静物对象。</T>
   //
   // @class
   // @author maocy
   // @history 150419
   //==========================================================
   MO.FGmStillEntity = function FGmStillEntity(o){
      o = RClass.inherits(this, o, FGmEntity);
      //..........................................................
      // @method
      o.construct  = FGmStillEntity_construct;
      // @method
      o.dispose    = FGmStillEntity_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmStillEntity_construct = function FGmStillEntity_construct(){
      var o = this;
      o.__base.FGmEntity.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmStillEntity_dispose = function FGmStillEntity_dispose(){
      var o = this;
      // 父处理
      o.__base.FGmEntity.dispose.call(o);
   }
}
