with(MO){
   //==========================================================
   // <T>城市资源。</T>
   //
   // @class
   // @author maocy
   // @history 150618
   //==========================================================
   MO.FEaiHistoryDateResource = function FEaiHistoryDateResource(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code       = RClass.register(o, new AGetSet('_code'));
      o._citys      = RClass.register(o, new AGetter('_citys'));
      //..........................................................
      // @method
      o.construct   = FEaiHistoryDateResource_construct;
      // @method
      o.unserialize = FEaiHistoryDateResource_unserialize;
      // @method
      o.dispose     = FEaiHistoryDateResource_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiHistoryDateResource_construct = function FEaiHistoryDateResource_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置属性
      o._citys = new TDictionary();
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiHistoryDateResource_unserialize = function FEaiHistoryDateResource_unserialize(input){
      var o = this;
      o._code = input.readString();
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var city = RClass.create(FEaiHistoryCityResource);
         city.unserialize(input);
         o._citys.set(city.code(), city);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiHistoryDateResource_dispose = function FEaiHistoryDateResource_dispose(){
      var o = this;
      // 清空属性
      o._citys = RObject.dispose(o._citys);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
