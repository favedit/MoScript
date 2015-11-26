//==========================================================
// <T>线图显示类。</T>
//
// @class
// @author adu
// @history 150715
//==========================================================
MO.FEaiCockpitTrendSnapshotLine = function FEaiCockpitTrendSnapshotLine(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._data                    = null;
   //..........................................................
   // @method
   o.construct                = MO.FEaiCockpitTrendSnapshotLine_construct;
   o.setup                    = MO.FEaiCockpitTrendSnapshotLine_setup;
   o.onImageLoad              = MO.FEaiCockpitTrendSnapshotLine_onImageLoad;
   o.onPaintBegin             = MO.FEaiCockpitTrendSnapshotLine_onPaintBegin;
   o.dispose                  = MO.FEaiCockpitTrendSnapshotLine_dispose;

   o.setData                  = MO.FEaiCockpitTrendSnapshotLine_setData;
   o.drawLine                 = MO.FEaiCockpitTrendSnapshotLine_drawLine;
   //..........................................................
   return o;
}
MO.FEaiCockpitTrendSnapshotLine_drawLine = function FEaiCockpitTrendSnapshotLine_drawLine(graphic, rectangle, dataheigt, minValue,maxValue, code, color, lineWidth){
   var o = this;
   var handle = graphic._handle;
   handle.beginPath();
   var units = o._data.days();
   var count = units.count();
   // 计算步宽
   var left = rectangle.left ;
   var top = rectangle.top;
   var width = rectangle.width ;
   var height = dataheigt ;
   var stepWidth = width / count;
   var stepHeight = dataheigt / maxValue;
   for(var n = 0; n < count; n++){
      var unit = units.at(n);
      var x = left + stepWidth * n;
      var y = top + height - stepHeight * unit[code];
      if(n == 0){
         handle.moveTo(x, y);
      }else{
          if(unit[code]!=0)
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
MO.FEaiCockpitTrendSnapshotLine_construct = function FEaiCockpitTrendSnapshotLine_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   //o._data = MO.Class.create(MO.FEaiCockpitTrendSnapshotLineData);
}

MO.FEaiCockpitTrendSnapshotLine_setup = function FEaiCockpitTrendSnapshotLine_setup() {
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);

}

MO.FEaiCockpitTrendSnapshotLine_onImageLoad = function FEaiCockpitTrendSnapshotLine_onImageLoad() {
   this.dirty();
}

MO.FEaiCockpitTrendSnapshotLine_onPaintBegin = function FEaiCockpitTrendSnapshotLine_onPaintBegin(event) {
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
   graphic.drawRectangle(left, top, width, height, '#ffffff', 3);
   if(!data){
      return;
   }
   var units = data.days();
   var count = units._count;
   var maxValue =0;
   var minValue =0;
   var maxValueInvest =0;
   var minValueInvest =0;
   for(var i=0;i<count;i++){
      var day = units.at(i);
      maxValueInvest = Math.max(day.priorInvestmentAmount(), maxValueInvest);
      maxValueInvest = Math.max(day.priorRedemptionAmount(), maxValueInvest);
      minValueInvest = Math.min(day.priorNetinvestmentAmount(), minValueInvest);
      maxValueInvest = Math.max(day.investmentAmount(), maxValueInvest);
      maxValueInvest = Math.max(day.redemptionAmount(), maxValueInvest);
      minValueInvest = Math.min(day.netinvestmentAmount(), minValueInvest);
   }
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorInvestmentAmount', '#4b5e6f', 1);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorRedemptionAmount', '#80a861', 1);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorNetinvestmentAmount', '#947b91', 1);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_investmentAmount', '#51c0db', 2);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_redemptionAmount', '#68f34e', 2);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_netinvestmentAmount', '#9b1933', 2);
}

MO.FEaiCockpitTrendSnapshotLine_setData = function FEaiCockpitTrendSnapshotLine_setData(data) {
   var o = this;
   var data = o._data = data;
}

MO.FEaiCockpitTrendSnapshotLine_dispose = function FEaiCockpitTrendSnapshotLine_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}