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
   //graphic.drawRectangle(left, top, width, height, '#ffffff', 3);
   var data = o._data;
   var pointX = left + width/2;
   var pointY = top + height/2;
   if(!data){
      return;
   }
   var radius = height* 15/48;
   var handle = graphic._handle;
   var rates = data.Rates();
   var count = rates._count;
   var startDegree = 0;
   var endDegree = 0;
   var textX =0;
   var textY =0;
   var textradius = radius+40;
   var textDegree = 0;
   var title = '当月产品总规模以及占比';
   var titleWidth = graphic.textWidth(title);
   graphic.setFont('bold 16px Microsoft YaHei');
   graphic.drawText(title,left+width/2,top+25,'#fee71f');

   for (var i = 0; i < count; i++) {
      var item = rates.at(i);
      var investmentAmount = item.investmentAmount();
      var amount = data.investmentAmount();
      startDegree = endDegree;
      endDegree = startDegree+2 * Math.PI * investmentAmount/amount;
      textDegree = Math.PI * investmentAmount/amount + startDegree;
      // if (textDegree>Math.PI) {
      // textX = pointX-textradius*Math.cos(textDegree)+15;
      // }
      // else{
      // textX = pointX+textradius*Math.cos(textDegree)-35;
      // }


      // if(textDegree>Math.PI){
      // textY = pointY-Math.abs(textradius*Math.sin(textDegree)+25);
      // }else{
      // textY = pointY+textradius*Math.sin(textDegree)-5;
      // }
      var ssss = textradius*Math.sin(textDegree);
      if(textDegree<Math.PI/2){
         textX = pointX+textradius*Math.cos(textDegree);
         textY = pointY+textradius*Math.sin(textDegree);
      }else if(textDegree<=Math.PI){
         textX = pointX-Math.abs(textradius*Math.cos(textDegree));
         textY = pointY+Math.abs(textradius*Math.sin(textDegree));
      }else if(textDegree<=Math.PI*1.5){
         textX = pointX-Math.abs(textradius*Math.cos(textDegree)-20);
         textY = pointY-Math.abs(textradius*Math.sin(textDegree))+20;
      }else if(textDegree<Math.PI*2){
         textX = pointX+Math.abs(textradius*Math.cos(textDegree)-10);
         textY = pointY-Math.abs(textradius*Math.sin(textDegree)+20);
      }

      graphic.setFont('bold 12px Microsoft YaHei');
      var text = Math.round(investmentAmount/amount*100) +'%';
      graphic.drawText(text,textX,textY,'#ffffff');
      handle.beginPath();
      switch(item.productName()){
         case 'e租年享':
         handle.fillStyle = '#eeb041';
         break;
         case 'e租年丰':
         handle.fillStyle = '#499aec';
         break;
         case 'e租财富':
         handle.fillStyle = '#d796fe';
         break;
         case 'e租富享':
         handle.fillStyle = '#91ecdb';
         break;
         case 'e租富盈':
         handle.fillStyle = '#eb7374';
         break;
         case 'e租稳赢':
         handle.fillStyle = '#8551e2';
         break;
         default :
         handle.fillStyle = '#ffffff';
         break;
      }
      graphic.drawText(text,textX,textY,handle.fillStyle);
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