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
      o._dates      = RClass.register(o, new AGetter('_dates'));
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
