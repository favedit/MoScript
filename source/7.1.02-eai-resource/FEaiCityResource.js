with(MO){
   //==========================================================
   // <T>城市资源。</T>
   //
   // @class
   // @author maocy
   // @history 150618
   //==========================================================
   MO.FEaiCityResource = function FEaiCityResource(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._provinceCode  = RClass.register(o, new AGetter('_provinceCode'));
      o._code          = RClass.register(o, new AGetter('_code'));
      o._label         = RClass.register(o, new AGetter('_label'));
      o._level         = RClass.register(o, new AGetter('_level'));
      o._location      = RClass.register(o, new AGetter('_location'));
      //..........................................................
      // @method
      o.construct      = FEaiCityResource_construct;
      // @method
      o.unserialize    = FEaiCityResource_unserialize;
      // @method
      o.dispose        = FEaiCityResource_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityResource_construct = function FEaiCityResource_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 设置属性
      o._location = new SPoint3();
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityResource_unserialize = function FEaiCityResource_unserialize(input){
      var o = this;
      o._provinceCode = input.readUint16();
      o._code = input.readUint16();
      o._label = input.readString();
      o._level = input.readUint16();
      o._location.unserialize(input);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityResource_dispose = function FEaiCityResource_dispose(){
      var o = this;
      // 清空属性
      o._location = RObject.dispose(o._location);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
