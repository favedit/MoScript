//==========================================================
// <T>线图显示类。</T>
//
// @class
// @author adu
// @history 150715
//==========================================================
MO.FEaiCockpitMessageAchievementRateChart = function FEaiCockpitMessageAchievementRateChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._data                    = null;
   //..........................................................
   // @method
   o.construct                = MO.FEaiCockpitMessageAchievementRateChart_construct;
   o.setup                    = MO.FEaiCockpitMessageAchievementRateChart_setup;
   o.onImageLoad              = MO.FEaiCockpitMessageAchievementRateChart_onImageLoad;
   o.onPaintBegin             = MO.FEaiCockpitMessageAchievementRateChart_onPaintBegin;
   o.dispose                  = MO.FEaiCockpitMessageAchievementRateChart_dispose;

   o.setData                  = MO.FEaiCockpitMessageAchievementRateChart_setData;
   o.drawLine                 = MO.FEaiCockpitMessageAchievementRateChart_drawLine;
   //..........................................................
   return o;
}
MO.FEaiCockpitMessageAchievementRateChart_drawLine = function FEaiCockpitMessageAchievementRateChart_drawLine(graphic, rectangle, dataheigt, minValue,maxValue, code, color, lineWidth){
   var o = this;
   var handle = graphic._handle;
   handle.beginPath();
   var units = o._data.days();
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
MO.FEaiCockpitMessageAchievementRateChart_construct = function FEaiCockpitMessageAchievementRateChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   //o._data = MO.Class.create(MO.FEaiCockpitMessageAchievementRateChartData);
}

MO.FEaiCockpitMessageAchievementRateChart_setup = function FEaiCockpitMessageAchievementRateChart_setup() {
   var o = this;

}

MO.FEaiCockpitMessageAchievementRateChart_onImageLoad = function FEaiCockpitMessageAchievementRateChart_onImageLoad() {
   this.dirty();
}

MO.FEaiCockpitMessageAchievementRateChart_onPaintBegin = function FEaiCockpitMessageAchievementRateChart_onPaintBegin(event) {
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
   var data = o._data;
   var pointX = left + width/2;
   var pointY = top + height/2;
   if(!data){
      return;
   }
   var rates = data.Rates();
   var count = rates._count;
   var startDegree = 0;
   var endDegree = 0;
   for (var i = 0; i < count; i++) {
      var item = rates.at(i);
      startDegree = endDegree;
      endDegree = startDegree+2 * Math.PI * item.investmentAmount()/data.investmentAmount();
      var radius = height* 15/48;
      var handle = graphic._handle;
      handle.beginPath();
      switch(item.productName()){
         case 'e租年享':
         handle.fillStyle = '#efaf41';
         break;
         case 'e租年丰':
         handle.fillStyle = '#4999ee';
         break;
         case 'e租财富':
         handle.fillStyle = '#c186e4';
         break;
         case 'e租富享':
         handle.fillStyle = '#8feddb';
         break;
         case 'e租富盈':
         handle.fillStyle = '#e97576';
         break;
         case 'e租稳赢':
         handle.fillStyle = '#8652e3';
         break;
         default :
         handle.fillStyle = '#ffffff';
         break;
      }
      handle.moveTo(pointX,pointY);
      handle.arc(pointX,pointY,radius,startDegree,endDegree);
      handle.fill();
   }
  // var count = 
   // if(!data){
   //    return;
   // }
   // var units = data.days();
   // var count = units._count;
   // var maxValue =0;
   // var minValue =0;
   // var maxValueInvest =0;
   // var minValueInvest =0;
   // for(var i=0;i<count;i++){
   //    var day = units.at(i);
   //    maxValueInvest = Math.max(day.priorInvestmentAmount(), maxValueInvest);
   //    maxValueInvest = Math.max(day.priorRedemptionAmount(), maxValueInvest);
   //    minValueInvest = Math.min(day.priorNetinvestmentAmount(), minValueInvest);
   //    maxValueInvest = Math.max(day.investmentAmount(), maxValueInvest);
   //    maxValueInvest = Math.max(day.redemptionAmount(), maxValueInvest);
   //    minValueInvest = Math.min(day.netinvestmentAmount(), minValueInvest);
   // }
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorInvestmentAmount', '#4b5e6f', 2);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorRedemptionAmount', '#80a861', 2);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorNetinvestmentAmount', '#947b91', 2);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_investmentAmount', '#51c0db', 3);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_redemptionAmount', '#68f34e', 3);
   // o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_netinvestmentAmount', '#9b1933', 3);
}

MO.FEaiCockpitMessageAchievementRateChart_setData = function FEaiCockpitMessageAchievementRateChart_setData(data) {
   var o = this;
   var data = o._data = data;
}

MO.FEaiCockpitMessageAchievementRateChart_dispose = function FEaiCockpitMessageAchievementRateChart_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}