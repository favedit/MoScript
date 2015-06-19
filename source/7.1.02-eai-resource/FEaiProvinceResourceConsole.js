with(MO){
   //==========================================================
   // <T>省份资源控制台。</T>
   //
   // @class
   // @author maocy
   // @history 150618
   //==========================================================
   MO.FEaiProvinceResourceConsole = function FEaiProvinceResourceConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._provinceCodes = RClass.register(o, new AGetter('_provinceCodes'));
      o._provinceNames = RClass.register(o, new AGetter('_provinceNames'));
      //..........................................................
      // @method
      o.construct      = FEaiProvinceResourceConsole_construct;
      // @method
      o.findByCode     = FEaiProvinceResourceConsole_findByCode;
      o.findByName     = FEaiProvinceResourceConsole_findByName;
      o.unserialize    = FEaiProvinceResourceConsole_unserialize;
      // @method
      o.dispose        = FEaiProvinceResourceConsole_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiProvinceResourceConsole_construct = function FEaiProvinceResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._provinceCodes = new TDictionary();
      o._provinceNames = new TDictionary();
   }

   //==========================================================
   // <T>根据代码获得省份资源。</T>
   //
   // @method
   // @param code:String 代码
   // @return FEaiProvinceResource 省份资源
   //==========================================================
   MO.FEaiProvinceResourceConsole_findByCode = function FEaiProvinceResourceConsole_findByCode(code){
      return this._provinceCodes.get(code);
   }

   //==========================================================
   // <T>根据名称获得省份资源。</T>
   //
   // @method
   // @param name:String 名称
   // @return FEaiProvinceResource 省份资源
   //==========================================================
   MO.FEaiProvinceResourceConsole_findByName = function FEaiProvinceResourceConsole_findByName(name){
      return this._provinceNames.get(name);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiProvinceResourceConsole_unserialize = function FEaiProvinceResourceConsole_unserialize(input){
      var o = this;
      var provinceCodes = o._provinceCodes;
      var provinceNames = o._provinceNames;
      var count = input.readInt32();
      for(var i = 0; i < count; i++){
         var province = RClass.create(FEaiProvinceResource);
         province.unserialize(input);
         provinceCodes.set(province.code(), province);
         provinceNames.set(province.name(), province);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiProvinceResourceConsole_dispose = function FEaiProvinceResourceConsole_dispose(){
      var o = this;
      o._provinceCodes = RObject.dispose(o._provinceCodes);
      o._provinceNames = RObject.dispose(o._provinceNames);
      // 父处理
      o.__base.FConsole.dispose.call(o);
   }
}
