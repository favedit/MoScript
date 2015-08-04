//==========================================================
// <T>统计理财师动态数据。</T>
//
// @class
// @author maocy
// @history 150804
//==========================================================
MO.FEaiChartMarketerDynamic = function FEaiChartMarketerDynamic(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._investmentTotal    = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._redemptionTotal    = MO.Class.register(o, new MO.AGetter('_redemptionTotal'));
   o._netinvestmentTotal = MO.Class.register(o, new MO.AGetter('_netinvestmentTotal'));
   o._interestTotal      = MO.Class.register(o, new MO.AGetter('_interestTotal'));
   o._performanceTotal   = MO.Class.register(o, new MO.AGetter('_performanceTotal'));
   //..........................................................
   // @method
   o.construct           = MO.FEaiChartMarketerDynamic_construct;
   // @method
   o.unserialize         = MO.FEaiChartMarketerDynamic_unserialize;
   // @method
   o.dispose             = MO.FEaiChartMarketerDynamic_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerDynamic_construct = function FEaiChartMarketerDynamic_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiChartMarketerDynamic_unserialize = function FEaiChartMarketerDynamic_unserialize(input){
   var o = this;
   o._investmentTotal = input.readDouble();
   o._redemptionTotal = input.readDouble();
   o._netinvestmentTotal = input.readDouble();
   o._interestTotal = input.readDouble();
   o._performanceTotal = input.readDouble();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerDynamic_dispose = function FEaiChartMarketerDynamic_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
