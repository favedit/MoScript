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
   o.drawLine                 = MO.FGuiLineChart_drawLine;
   //..........................................................
   return o;
}
MO.FGuiLineChart_drawLine = function FGuiLineChart_drawLine(graphic, rectangle, dataheigt, maxValue, code, color, lineWidth){
   var o = this;
   var handle = graphic._handle;
   handle.beginPath();
   var units = o._data.units();
   var count = units.count();
   // 计算步宽
   var left = rectangle.left + 140;
   var top = rectangle.top;
   var width = rectangle.width - 180;
   var height = dataheigt ;
   var stepWidth = width / count;
   var stepHeight = dataheigt / maxValue;
   for(var n = 0; n < count; n++){
      var unit = units.at(n);
      var x = left + stepWidth * n;
      var y = top + height - stepHeight * unit[code]+35;
      if(n == 0){
         handle.moveTo(x, y);
      }else{
         // if(unit[code]!=0)
         handle.lineTo(x, y);
      }
   }
   handle.lineWidth = lineWidth;
   handle.strokeStyle = color;
   handle.stroke();

}
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiLineChart_construct = function FGuiLineChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   //o._data = MO.Class.create(MO.FGuiLineChartData);
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
   var data = o._data ;
   var dataheigt = height/2;
   if(!data){
      return;
   }
   var units = data.units();
   var count = units._count;
   var maxValue =0;
   var minValue =0;
   for(var i=0;i<count;i++){
      var unit = units.at(i);
      maxValue = Math.max(unit.value(), maxValue);
   }
   o.drawLine(graphic, rectangle, dataheigt, maxValue, '_value', '#ffffff', 2);
}

MO.FGuiLineChart_setData = function FGuiLineChart_setData(data) {
   var o = this;

   var data = o._data = data;
}

MO.FGuiLineChart_dispose = function FGuiLineChart_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}