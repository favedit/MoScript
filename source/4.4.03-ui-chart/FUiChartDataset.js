//==========================================================
// <T>图表数据集。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FUiChartDataset = function FUiChartDataset(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._serieses = MO.Class.register(o, new MO.AGetter('_serieses'));
   //..........................................................
   // @method
   o.construct = MO.FUiChartDataset_construct;
   // @method
   o.dispose   = MO.FUiChartDataset_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_construct = function FUiChartDataset_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 配置属性
   o._serieses = new MO.TObjects();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiChartDataset_dispose = function FUiChartDataset_dispose(){
   var o = this;
   // 释放属性
   o._serieses = MO.Lang.Object.dispose(o._serieses);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
