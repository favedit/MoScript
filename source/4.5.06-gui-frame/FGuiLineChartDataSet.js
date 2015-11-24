//==========================================================
// <T>线图单行数据。</T>
//
// @class
// @author sunpeng
// @history 151106
//==========================================================
MO.FGuiLineChartDataSet = function FGuiLineChartDataSet(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._strokeColor = MO.Class.register(o, new MO.AGetSet('_strokeColor'));
   o._pointColor = MO.Class.register(o, new MO.AGetSet('_pointColor'));
   o._pointStrokeColor = MO.Class.register(o, new MO.AGetSet('_pointStrokeColor'));
   o._data = MO.Class.register(o, new MO.AGetSet('_data'));

   return o;
}