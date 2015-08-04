//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150803
//==========================================================
MO.FEaiChartMarketerTrendUnit = function FEaiChartMarketerTrendUnit(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._recordDate    = MO.Class.register(o, new MO.AGetter('_recordDate'));
   o._investment    = MO.Class.register(o, new MO.AGetter('_investment'));
   o._redemption    = MO.Class.register(o, new MO.AGetter('_redemption'));
   o._netinvestment = MO.Class.register(o, new MO.AGetter('_netinvestment'));
   o._interest      = MO.Class.register(o, new MO.AGetter('_interest'));
   o._performance   = MO.Class.register(o, new MO.AGetter('_performance'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiChartMarketerTrendUnit_construct;
   // @method
   o.unserialize    = MO.FEaiChartMarketerTrendUnit_unserialize;
   // @method
   o.dispose        = MO.FEaiChartMarketerTrendUnit_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTrendUnit_construct = function FEaiChartMarketerTrendUnit_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiChartMarketerTrendUnit_unserialize = function FEaiChartMarketerTrendUnit_unserialize(input){
   var o = this;
   o._recordDate = input.readString();
   o._investment = input.readDouble();
   o._redemption = input.readDouble();
   o._netinvestment = input.readDouble();
   o._interest = input.readDouble();
   o._performance = input.readDouble();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTrendUnit_dispose = function FEaiChartMarketerTrendUnit_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
