//==========================================================
// <T>线图数据。</T>
//
// @class
// @author adu
// @history 151106
//==========================================================
MO.FGuiLineChartData = function FGuiLineChartData(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._labels = MO.Class.register(o, new MO.AGetSet('_labels'));
   o._datas = MO.Class.register(o, new MO.AGetSet('_datas'));
   return o;
}