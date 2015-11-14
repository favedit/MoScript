//==========================================================
// <T>线图显示类。</T>
//
// @class
// @author adu
// @history 150715
//==========================================================
MO.FGuiLineChart = function FGuiLineChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._data                    = null;
   //..........................................................
   // @method
   o.construct                = MO.FGuiLineChart_construct;
   o.setup                    = MO.FGuiLineChart_setup;
   o.onImageLoad              = MO.FGuiLineChart_onImageLoad;
   o.onPaintBegin             = MO.FGuiLineChart_onPaintBegin;
   o.dispose                  = MO.FGuiLineChart_dispose;

   o.setData                  = MO.FGuiLineChart_setData;
   //..........................................................
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiLineChart_construct = function FGuiLineChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   o._data = MO.Class.create(MO.FGuiLineChartData);
}

MO.FGuiLineChart_setup = function FGuiLineChart_setup() {
   var o = this;

}

MO.FGuiLineChart_onImageLoad = function FGuiLineChart_onImageLoad() {
   this.dirty();
}

MO.FGuiLineChart_onPaintBegin = function FGuiLineChart_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);

   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;

   graphic.drawRectangle(left, top, width, height, "#ff0000", 4);
}

MO.FGuiLineChart_setData = function FGuiLineChart_setData(data) {
   var o = this;

   var data = o._data = data;
}

MO.FGuiLineChart_dispose = function FGuiLineChart_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}