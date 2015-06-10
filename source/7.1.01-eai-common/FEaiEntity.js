with(MO){
   //==========================================================
   // <T>场景实体基类。</T>
   //
   // @class
   // @author sunpeng
   // @history 150606
   //==========================================================
   MO.FEaiEntity = function FEaiEntity(o){
      o = RClass.inherits(this, o, FObject);
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiEntity_dispose = function FEaiEntity_dispose(){
      var o = this;
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}