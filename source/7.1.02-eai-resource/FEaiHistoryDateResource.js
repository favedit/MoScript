//==========================================================
// <T>城市资源。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiHistoryDateResource = function FEaiHistoryDateResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code            = MO.Class.register(o, new MO.AGetter('_code'));
   o._investmentDay   = MO.Class.register(o, new MO.AGetter('_investmentDay'));
   o._investmentTotal = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._provinces       = MO.Class.register(o, new MO.AGetter('_provinces'));
   o._citys           = MO.Class.register(o, new MO.AGetter('_citys'));
   //..........................................................
   // @method
   o.construct        = MO.FEaiHistoryDateResource_construct;
   // @method
   o.unserialize      = MO.FEaiHistoryDateResource_unserialize;
   // @method
   o.dispose          = MO.FEaiHistoryDateResource_dispose;
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
   o._provinces = new MO.TDictionary();
   o._citys = new MO.TDictionary();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiHistoryDateResource_unserialize = function FEaiHistoryDateResource_unserialize(input){
   var o = this;
   // 读取属性
   o._code = input.readString();
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
   // 读取城市
   var provinces = o._provinces;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiHistoryProvinceResource);
      province.unserialize(input);
      provinces.set(province.code(), province);
   }
   // 读取城市
   var citys = o._citys;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiHistoryCityResource);
      city.unserialize(input);
      citys.set(city.code(), city);
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
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o._citys = MO.Lang.Object.dispose(o._citys);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
