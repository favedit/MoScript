//==========================================================
// <T>世界地图数据。</T>
//
// @class
// @author maocy
// @history 150727
//==========================================================
MO.FEaiMapWorldData = function FEaiMapWorldData(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._countries  = MO.Class.register(o, new MO.AGetter('_countries'));
   //..........................................................
   // @method
   o.construct   = MO.FEaiMapWorldData_construct;
   // @method
   o.unserialize = MO.FEaiMapWorldData_unserialize;
   // @method
   o.dispose     = MO.FEaiMapWorldData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapWorldData_construct = function FEaiMapWorldData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 创建属性
   o._countries = new MO.TObjects();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiMapWorldData_unserialize = function FEaiMapWorldData_unserialize(input){
   var o = this;
   var count = input.readInt32();
   if(count > 0){
      var countries = o._countries;
      for(var i = 0; i < count; i++){
         var country = MO.Class.create(MO.FEaiMapCountryData);
         country.unserialize(input);
         countries.push(country);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapWorldData_dispose = function FEaiMapWorldData_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
