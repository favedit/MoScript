//==========================================================
// <T>统计理财师单元。</T>
//
// @class
// @author maocy
// @history 150803
//==========================================================
MO.FEaiChartMarketerTrendInfo = function FEaiChartMarketerTrendInfo(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._trendUints    = MO.Class.register(o, new MO.AGetter('_trendUints'));
   //..........................................................
   // @method
   o.construct      = MO.FEaiChartMarketerTrendInfo_construct;
   // @method
   o.unserialize    = MO.FEaiChartMarketerTrendInfo_unserialize;
   // @method
   o.dispose        = MO.FEaiChartMarketerTrendInfo_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTrendInfo_construct = function FEaiChartMarketerTrendInfo_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._trendUints = new MO.TObjects();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiChartMarketerTrendInfo_unserialize = function FEaiChartMarketerTrendInfo_unserialize(input){
   var o = this;
   var units = o._trendUints;
   units.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var unit = MO.Class.create(MO.FEaiChartMarketerTrendUnit);
      unit.unserialize(input);
      units.push(unit);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMarketerTrendInfo_dispose = function FEaiChartMarketerTrendInfo_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
