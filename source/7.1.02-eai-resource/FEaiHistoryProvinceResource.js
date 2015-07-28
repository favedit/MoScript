//==========================================================
// <T>历史省份城市资源。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiHistoryProvinceResource = function FEaiHistoryProvinceResource(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code            = MO.Class.register(o, new MO.AGetSet('_code'));
   o._investmentDay   = MO.Class.register(o, new MO.AGetSet('_investmentDay'));
   o._investmentTotal = MO.Class.register(o, new MO.AGetSet('_investmentTotal'));
   //..........................................................
   // @method
   o.unserialize      = MO.FEaiHistoryProvinceResource_unserialize;
   return o;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiHistoryProvinceResource_unserialize = function FEaiHistoryProvinceResource_unserialize(input){
   var o = this;
   o._code = input.readUint16();
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
}
