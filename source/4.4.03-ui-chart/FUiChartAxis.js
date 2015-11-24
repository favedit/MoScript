//==========================================================
// <T>图表轴。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FUiChartAxis = function FUiChartAxis(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._degrees  = MO.Class.register(o, new MO.AGetter('_degrees'));
   //..........................................................
   // @method
   o.construct = MO.FUiChartAxis_construct;
   // @method
   o.dispose   = MO.FUiChartAxis_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_construct = function FUiChartAxis_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 配置属性
   o._degrees = new MO.TObjects();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiChartAxis_dispose = function FUiChartAxis_dispose(){
   var o = this;
   // 释放属性
   o._degrees = MO.Lang.Object.dispose(o._degrees);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
