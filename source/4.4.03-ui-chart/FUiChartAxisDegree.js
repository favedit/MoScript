//==========================================================
// <T>图表轴刻度。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.FUiChartAxisDegree = function FUiChartAxisDegree(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._axis     = MO.Class.register(o, new MO.AGetSet('_axis'));
   // @attribute
   o._value    = MO.Class.register(o, new MO.AGetSet('_value'));
   //..........................................................
   // @method
   o.construct = MO.FUiChartAxisDegree_construct;
   // @method
   o.dispose   = MO.FUiChartAxisDegree_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiChartAxisDegree_construct = function FUiChartAxisDegree_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiChartAxisDegree_dispose = function FUiChartAxisDegree_dispose(){
   var o = this;
   // 释放属性
   o._axis = null;
   o._value = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
