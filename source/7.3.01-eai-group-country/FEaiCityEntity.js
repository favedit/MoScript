with(MO){
   //==========================================================
   // <T>全国城市实体类。</T>
   //
   // @class
   // @author maocy
   // @history 150619
   //==========================================================
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      //..........................................................
      // @attribute
      o._code       = RClass.register(o, new AGetSet('_code'));
      o._data       = RClass.register(o, new AGetSet('_data'));
      o._renderable = RClass.register(o, new AGetter('_renderable'));
      //..........................................................
      // @method
      o.construct   = FEaiCityEntity_construct;
      // @method
      o.build       = FEaiCityEntity_build;
      o.update      = FEaiCityEntity_update;
      // @method
      o.dispose     = FEaiCityEntity_dispose;
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
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_build = function FEaiCityEntity_build(context){
      var o = this;
      var location = o._data.location();
      o._code = o._data.code();
      // 创建位图数据
      var bitmapData = context.createObject(MO.FE3dBitmapData);
      bitmapData.loadUrl('/script/ars/eai/dot.png');
      // 创建位图
      var bitmap = o._renderable = context.createObject(MO.FE3dBitmap);
      bitmap.setData(bitmapData);
      bitmap.material().info().optionAlpha = true;
      // 设置坐标
      var matrix = bitmap.matrix();
      matrix.tx = location.x * 0.2 - 20.1;
      matrix.ty = location.y * 0.25 - 7.9;
      matrix.tz = -0.0001;
      matrix.sx = 0.2;
      matrix.sy = 0.2;
      matrix.sz = 0.2;
      matrix.update();
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
      var renderable = o._renderable;
      var material = renderable.material();
      var range = 1;
      if(data){
         var total = data.investmentTotal() / 10000000;
         range = total / 2;
         if(total > 1){
            total = 1;
         }
         material.info().ambientColor.set(total + 0.1, 0, total + 0.1, 1);
      }else{
         material.info().ambientColor.set(0, 0, 0, 1);
      }
      material.update();
      if(range < 1){
         range = 1;
      }
      if(range > 2){
         range = 2;
      }
      var matrix = renderable.matrix();
      matrix.tx = location.x * 0.2 - 20.3 + (0.2 * range / 2);
      matrix.ty = location.y * 0.25 - 8 + (0.2 * range / 2);
      matrix.tz = -0.0001;
      matrix.sx = 0.2 * range;
      matrix.sy = 0.2 * range;
      matrix.sz = 0.2 * range;
      matrix.update();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
      var o = this;
      // 父处理
      o.__base.FEaiEntity.dispose.call(o);
   }
}
