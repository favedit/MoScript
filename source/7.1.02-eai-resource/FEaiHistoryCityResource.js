with(MO){
   //==========================================================
   // <T>城市资源。</T>
   //
   // @class
   // @author maocy
   // @history 150618
   //==========================================================
   MO.FEaiHistoryCityResource = function FEaiHistoryCityResource(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code            = RClass.register(o, new AGetSet('_code'));
      o._investmentDay   = RClass.register(o, new AGetSet('_investmentDay'));
      o._investmentTotal = RClass.register(o, new AGetSet('_investmentTotal'));
      //..........................................................
      // @method
      o.unserialize      = FEaiHistoryCityResource_unserialize;
      return o;
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiHistoryCityResource_unserialize = function FEaiHistoryCityResource_unserialize(input){
      var o = this;
      o._code = input.readUint16();
      o._investmentDay = input.readFloat();
      o._investmentTotal = input.readFloat();
   }
}
