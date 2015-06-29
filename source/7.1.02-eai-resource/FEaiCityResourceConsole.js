with(MO){
   //==========================================================
   // <T>城市资源控制台。</T>
   //
   // @class
   // @author maocy
   // @history 150618
   //==========================================================
   MO.FEaiCityResourceConsole = function FEaiCityResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._citys      = RClass.register(o, new AGetter('_citys'));
      //..........................................................
      // @method
      o.construct   = FEaiCityResourceConsole_construct;
      // @method
      o.find        = FEaiCityResourceConsole_find;
      o.unserialize = FEaiCityResourceConsole_unserialize;
      // @method
      o.dispose     = FEaiCityResourceConsole_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityResourceConsole_construct = function FEaiCityResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._citys = new TDictionary();
   }

   //==========================================================
   // <T>根据代码查找城市信息。</T>
   //
   // @method
   // @param code:String 代码
   // @return 城市信息
   //==========================================================
   MO.FEaiCityResourceConsole_find = function FEaiCityResourceConsole_find(code){
      return this._citys.get(code);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityResourceConsole_unserialize = function FEaiCityResourceConsole_unserialize(input){
      var o = this;
      var citys = o._citys;
      var cards = o._cards;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var city = RClass.create(FEaiCityResource);
         city.unserialize(input);
         citys.set(city.code(), city);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityResourceConsole_dispose = function FEaiCityResourceConsole_dispose(){
      var o = this;
      o._citys = RObject.dispose(o._citys);
      // 父处理
      o.__base.FConsole.dispose.call(o);
   }
}
