with(MO){
   //==========================================================
   // <T>城市资源控制台。</T>
   //
   // @class
   // @author maocy
   // @history 150618
   //==========================================================
   MO.FEaiHistoryResourceConsole = function FEaiHistoryResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._investmentDay           = RClass.register(o, new AGetter('_investmentDay'));
      o._investmentTotal         = RClass.register(o, new AGetter('_investmentTotal'));
      o._investmentProvinceDay   = RClass.register(o, new AGetter('_investmentProvinceDay'));
      o._investmentProvinceTotal = RClass.register(o, new AGetter('_investmentProvinceTotal'));
      o._investmentCityDay       = RClass.register(o, new AGetter('_investmentCityDay'));
      o._investmentCityTotal     = RClass.register(o, new AGetter('_investmentCityTotal'));
      o._provinces               = RClass.register(o, new AGetter('_provinces'));
      o._citys                   = RClass.register(o, new AGetter('_citys'));
      o._dates                   = RClass.register(o, new AGetter('_dates'));
      //..........................................................
      // @method
      o.construct   = FEaiHistoryResourceConsole_construct;
      // @method
      o.unserialize = FEaiHistoryResourceConsole_unserialize;
      // @method
      o.dispose     = FEaiHistoryResourceConsole_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiHistoryResourceConsole_construct = function FEaiHistoryResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._provinces = new TDictionary();
      o._citys = new TDictionary();
      o._dates = new TDictionary();
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiHistoryResourceConsole_unserialize = function FEaiHistoryResourceConsole_unserialize(input){
      var o = this;
      // 读取属性
      o._investmentDay = input.readFloat();
      o._investmentTotal = input.readFloat();
      o._investmentProvinceDay = input.readFloat();
      o._investmentProvinceTotal = input.readFloat();
      o._investmentCityDay = input.readFloat();
      o._investmentCityTotal = input.readFloat();
      // 读取省份属性
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiHistoryProvinceResource);
         province.unserialize(input);
         o._provinces.set(province.code(), province);
      }
      // 读取城市属性
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var city = RClass.create(FEaiHistoryCityResource);
         city.unserialize(input);
         o._citys.set(city.code(), city);
      }
      // 读取日期属性
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var date = RClass.create(FEaiHistoryDateResource);
         date.unserialize(input);
         o._dates.set(date.code(), date);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiHistoryResourceConsole_dispose = function FEaiHistoryResourceConsole_dispose(){
      var o = this;
      o._dates = RObject.dispose(o._dates);
      // 父处理
      o.__base.FConsole.dispose.call(o);
   }
}
