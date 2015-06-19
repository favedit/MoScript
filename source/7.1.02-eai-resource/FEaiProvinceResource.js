with(MO){
   //==========================================================
   // <T>省份资源。</T>
   //
   // @class
   // @author maocy
   // @history 150619
   //==========================================================
   MO.FEaiProvinceResource = function FEaiProvinceResource(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code       = RClass.register(o, new AGetSet('_code'));
      o._name       = RClass.register(o, new AGetter('_name'));
      o._label      = RClass.register(o, new AGetSet('_label'));
      //..........................................................
      // @method
      o.unserialize = FEaiProvinceResource_unserialize;
      return o;
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiProvinceResource_unserialize = function FEaiProvinceResource_unserialize(input){
      var o = this;
      o._code = input.readUint16();
      o._name = input.readString();
      o._label = input.readString();
   }
}
