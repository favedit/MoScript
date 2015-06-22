with(MO){
   //==========================================================
   // <T>全国城市实体类。</T>
   //
   // @class
   // @author maocy
   // @history 150619
   //==========================================================
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity, MEaiCityRenderable);
      //..........................................................
      // @attribute
      o._data     = RClass.register(o, new AGetSet('_data'));
      //..........................................................
      // @method
      o.construct = FEaiCityEntity_construct;
      // @method
      o.build     = FEaiCityEntity_build;
      o.update    = FEaiCityEntity_update;
      // @method
      o.dispose   = FEaiCityEntity_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      o.__base.MEaiCityRenderable.construct.call(o);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_build = function FEaiCityEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
      var o = this;
      var location = o._data.location();
      var range = 1;
      if(data){
         var total = Math.sqrt(data.investmentTotal()) / 100;
         range = total / 2;
         if(total > 1){
            total = 1;
         }
         o._color.set(total, 0, total, total);
      }else{
         o._color.set(0, 0, 0, 0);
      }
      range = Math.sqrt(range);
      if(range < 1){
         range = 1;
      }
      if(range > 3){
         range = 3;
      }
      o._size.set(range, range);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
      var o = this;
      // 父处理
      o.__base.MEaiCityRenderable.dispose.call(o);
      o.__base.FEaiEntity.dispose.call(o);
   }
}
