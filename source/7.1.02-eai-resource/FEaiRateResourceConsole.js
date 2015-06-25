with(MO){
   //==========================================================
   // <T>省份资源控制台。</T>
   //
   // @class
   // @author maocy
   // @history 150618
   //==========================================================
   MO.FEaiRateResourceConsole = function FEaiRateResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._rates      = RClass.register(o, new AGetter('_rates'));
      //..........................................................
      // @method
      o.construct   = FEaiRateResourceConsole_construct;
      // @method
      o.find        = FEaiRateResourceConsole_find;
      o.unserialize = FEaiRateResourceConsole_unserialize;
      // @method
      o.dispose     = FEaiRateResourceConsole_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiRateResourceConsole_construct = function FEaiRateResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._rates = new TObjects();
   }

   //==========================================================
   // <T>根据代码获得省份资源。</T>
   //
   // @method
   // @param code:String 代码
   // @return FEaiProvinceResource 省份资源
   //==========================================================
   MO.FEaiRateResourceConsole_find = function FEaiRateResourceConsole_find(code){
      return this._rates.get(code);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiRateResourceConsole_unserialize = function FEaiRateResourceConsole_unserialize(input){
      var o = this;
      var count = o._count = input.readInt32();
      for(var i = 0; i < count; i++){
         var rate = MO.Class.create(FEaiRateResource);
         rate.unserialize(input)
         o._rates.push(rate);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiRateResourceConsole_dispose = function FEaiRateResourceConsole_dispose(){
      var o = this;
      o._rates = RObject.dispose(o._rates);
      // 父处理
      o.__base.FConsole.dispose.call(o);
   }
}
