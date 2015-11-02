//==========================================================
// <T>产品甜甜圈。</T>
//
// @class
// @author sunpeng
// @version 150630
//==========================================================
MO.FEaiChartMktCustomerV2Doughnut = function FEaiChartMktCustomerV2Doughnut(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   // o._startTime        = MO.Class.register(o, new MO.AGetSet('_startTime'));
   // o._endTime          = MO.Class.register(o, new MO.AGetSet('_endTime'));
    o._ready            = false;

   // o._investmentTotal  = 0;
   // o._intervalMiniute  = 10;
   // @attribute
   // o._baseHeight = 5;
   // o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   // o._triangleWidth    = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   // o._triangleHeight   = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   // o._decoLineGap      = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   // o._decoLineWidth    = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o._circleRadius     = MO.Class.register(o, new MO.AGetSet('_circleRadius'), 10);
  // o._circleAngle      = MO.Class.register(o, new MO.AGetSet('_circleAngle'), 0);
   o._trendInfo        = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._TenderBef        = MO.Class.register(o, new MO.AGetSet('_TenderBef'));
   o._FirstLoad        = MO.Class.register(o, new MO.AGetSet('_FirstLoad'));
   o._circleStyle      = MO.Class.register(o, new MO.AGetSet('_circleStyle'));
   o._circleAirRadius  = MO.Class.register(o, new MO.AGetSet('_airRadius'), 7);
   o._circlelColor     = MO.Class.register(o, new MO.AGetSet('_circlelColor'),'#ffffff');
   //o._tatolColor       = MO.Class.register(o, new MO.AGetSet('_circlelColor'),'#ffffff');
   //..........................................................
   // @event
   o.oeUpdate          = MO.FEaiChartMktCustomerV2Doughnut_oeUpdate;
   //..........................................................
   // @method
   o.construct         = MO.FEaiChartMktCustomerV2Doughnut_construct;
  // o.sync              = MO.FEaiChartMktCustomerV2Doughnut_sync;
   // o.drawTrend         = MO.FEaiChartMktCustomerV2Doughnut_drawTrend;
   o.onPaintBegin      = MO.FEaiChartMktCustomerV2Doughnut_onPaintBegin;
   o.on24HDataFetch    = MO.FEaiChartMktCustomerV2Doughnut_on24HDataFetch;  
   o.setCircleStyle    = MO.FEaiChartMktCustomerV2Doughnut_setCircleStyle;
   o.dispose           = MO.FEaiChartMktCustomerV2Doughnut_dispose;
   o.draw              = MO.FEaiChartMktCustomerV2Doughnut_draw;
   return o;
}
MO.FEaiChartMktCustomerV2Doughnut_setCircleStyle  =  function FEaiChartMktCustomerV2Doughnut_setCircleStyle(Radius,color,unit){
  var o = this;
  o.setCircleRadius(o._circleStyle.radius);
  o.setCircleAirRadius(o.__circleStyle.radius*11/15);
  o.setCircleColor(o.__circleStyle.circlelColor);
  o.setTatolColor(o.__circleStyle.tatolColor);
  
}
MO.FEaiChartMktCustomerV2Doughnut_dispose = function FEaiChartMktCustomerV2Doughnut_dispose(){
   var o = this;
   o._trendInfo = MO.Lang.Object.dispose(o._trendInfo);
   o._circleStyle = MO.Lang.Object.dispose(o._circleStyle);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}


//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Doughnut_construct = function FEaiChartMktCustomerV2Doughnut_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // o._TenderBef = new Array(6);
   // o._TenderBef = [0,0,0,0,0,0];
   // o._FirstLoad = new Array(6);
   // o._FirstLoad = [true,true,true,true,true,true];
   o._trendInfo = MO.Class.create(MO.FEaiLogicInfoTrendUnit);
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
// MO.FEaiChartMktCustomerV2Doughnut_sync = function FEaiChartMktCustomerV2Doughnut_sync() {
//    var o = this;
//    if (!o._ready) {
//       return;
//    }
//    var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
//    if(!systemLogic.testReady()){
//       return;
//    }
//    var currentDate = systemLogic.currentDate();
//    currentDate.truncMinute(o._intervalMiniute);
//    // 设置开始时间
//    var startTime = o._startTime;
//    startTime.assign(currentDate);
//    startTime.addDay(-1);
//    // 设置结束时间
//    var endTime = o._endTime;
//    endTime.assign(currentDate);
//    // 发送数据
//    var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
//    statisticsLogic.department().doMarketerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
// }

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
// MO.FEaiChartMktCustomerV2Doughnut_on24HDataFetch = function FEaiChartMktCustomerV2Doughnut_on24HDataFetch(event) {
//    var o = this;
//    // 读取数据
//    o._trendInfo.unserializeSignBuffer(event.sign, event.content, true);
//    // 脏处理
//   // o.dirty();
// }

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Doughnut_oeUpdate = function FEaiChartMktCustomerV2Doughnut_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   // 更新内容
   if (o._ready) {
      return;
   } 
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
     // o.sync();
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
// MO.FEaiChartMktCustomerV2Doughnut_drawTrend = function FEaiChartMktCustomerV2Doughnut_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor){
//    var o = this;
//    var startTime = o._startTime;
//    var units = o._trendInfo.units();
//    var count = units.count();
//    var unitFirst = units.first();
//    var handle = graphic._handle;
//    handle.lineCap = 'round';
//    // 找到最大
//    var pixPer10k = dataHeight * 10000 / maxAmount;
//    var amount = unitFirst[propertyName];
//    var lastX = dataLeft;
//    var lastY = dataBottom - amount / 10000 * pixPer10k;
//    // 绘制曲线
//    handle.beginPath();
//    handle.moveTo(lastX, lastY);
//    var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
//    for(var i = 1; i < count; i++){
//       var unit = units.get(i);
//       var value = unit[propertyName];
//       startTime.parseAuto(unit.recordDate());
//       startTime.refresh();
//       var degreeSpan = startTime.date.getTime() - bakTime;
//       var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
//       var y = dataBottom - value / 10000 * pixPer10k;
//       y -= o._baseHeight;
//       handle.lineTo(x, y);
//    }
//    var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
//    //var bottomColor = '#' + hexColor.substring(2);
//    var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
//    var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
//    //var topColor = '#' + hexColor.substring(2);
//    var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
//    var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
//    gradient.addColorStop('0', bottomColor);
//    gradient.addColorStop('1', topColor);
//    var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
//    opGradient.addColorStop('0', opBottomColor);
//    opGradient.addColorStop('1', opTopColor);
//    handle.strokeStyle = gradient;
//    handle.lineWidth = 4;
//    handle.stroke();
//    //handle.fillStyle = opGradient;
//    //handle.lineTo(x, dataBottom);
//    //handle.lineTo(dataLeft, dataBottom);
//    //handle.lineTo(dataLeft, lastY);
//    //handle.fill();
// }
MO.FEaiChartMktCustomerV2Doughnut_draw = function FEaiChartMktCustomerV2Doughnut_draw(context) {
    var o = this;
    if(!o._ready){
      return;
   }
   if(!o._trendInfo){
     return;
   }
    var graphic = context.graphic;
    var rectangle = context.rectangle;
    var productRadius = o.circleRadius();
    var airRadius     = o.circleAirRadius();
    var circle_x = rectangle.left+rectangle.width/30+productRadius;
    var top = rectangle.top;
    var bottom = rectangle.top + rectangle.height;
    var circle_y = rectangle.top +rectangle.productRadius;
    var textColor = '';
    textColor = o.circlelColor();
    graphic._handle.beginPath();
    graphic._handle.arc(circle_x,circle_y, productRadius,0*Math.PI,2*Math.PI);
    graphic._handle.closePath();
    graphic._handle.strokeStyle = textColor;
    graphic._handle.stroke();
    graphic._handle.beginPath();
    graphic._handle.arc(circle_x,circle_y, airRadius,0*Math.PI,2*Math.PI,false);
    graphic._handle.closePath();
    graphic._handle.strokeStyle = textColor;
    graphic._handle.stroke();
    graphic._handle.beginPath();
    graphic._handle.arc(circle_x,circle_y, productRadius,0*Math.PI-Math.PI/2,2*Math.PI*tendRate-Math.PI/2,false);
    graphic._handle.arc(circle_x,circle_y, airRadius,2*Math.PI*tendRate-Math.PI/2,0*Math.PI-Math.PI/2,true);
    graphic._handle.closePath();
    graphic._handle.fillStyle = textColor;
    graphic._handle.fill();


    textPx = 'px Microsoft YaHei';
    textSize = 28;
    textPx = textSize + textPx
    graphic.setFont(textPx);
    //产品投资比例
    lable = persentRate+'%';
    productText_w = graphic.textWidth(lable)/2;
    graphic.drawText(lable, circle_x-productText_w, top+productRadius+productInterval+i*(2*productRadius+productInterval)+textSize/2,'#FFFFFF');
    yearRate = (unit.rate()).toFixed(2);;
    productText = unit.label();
    //graphic.setFont('blod 480px Microsoft YaHei');
    graphic.drawText(productText, text_x, circle_y, textColor);
    yearRate =  '年化利率 :' + yearRate +'%';
    graphic.setFont('20px Microsoft YaHei');
    graphic.drawText(yearRate, text_x, circle_y, '#FFFFFF');
    tatolLable = (unit.invesmentTotal()/100000000).toFixed(2);
    lable = '总计:'+"   "+tatolLable+'亿';
    graphic.drawText(lable,text_x, circle_y, '#FFFFFF');
    dayLable  = unit.invesmentDay()/100000000;
    lable = '当日:'+"    "+dayLable+'亿';
    graphic.drawText(lable,text_x, circle_y, '#FFFFFF');
    // graphic._handle.beginPath();
    // graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), productRadius,0*Math.PI,2*Math.PI);
    // graphic._handle.closePath();
    // graphic._handle.strokeStyle = textColor;
    // graphic._handle.stroke();
    // graphic._handle.beginPath();
    // graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), airRadius,0*Math.PI,2*Math.PI,false);
    // graphic._handle.closePath();
    // graphic._handle.strokeStyle = textColor;
    // graphic._handle.stroke();
    // graphic._handle.beginPath();
    // graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), productRadius,0*Math.PI-Math.PI/2,2*Math.PI*tendRate-Math.PI/2,false);
    // graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), airRadius,2*Math.PI*tendRate-Math.PI/2,0*Math.PI-Math.PI/2,true);
    // graphic._handle.closePath();
    // graphic._handle.fillStyle = textColor;
    // graphic._handle.fill();

}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Doughnut_onPaintBegin = function FEaiChartMktCustomerV2Doughnut_onPaintBegin(event) {
   var o = this;
   if (!o._ready || !units) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;

   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
    // var ss = o.circleAngle();
    // o.setCircleAngle(ss+10000);
    // var ss = o.circleAngle();
    var unit = o._trendInfo
    var units =  o._trendInfo.units();
    // for (var i =0;i<5;i++ ){
    //   var s = o._TenderBef[i]=i;
    // }
    var productRadius = rectangle.height/units.count()*5/12;
    var airRadius     = rectangle.height/units.count()* 11/36;
    var productInterval = rectangle.height/units.count()*1/9;
    var tendRate =0;
    var unitsCount = units.count();
    var BefCount =0;
    var tenderInvesment=0;
    var tenderTotal=0;
    var persentRate=0;
    var lable='' ;
    var productText ='';
    var yearRate = '';
    var dayLable ='';
    var tatolLable = '';
    var FirstLoad = o._FirstLoad;
    var circle_x = decoLeft+rectangle.width/2;
    var text_x   = decoLeft+rectangle.width*2/3;
    var text_interval = rectangle.height/36;
    var productText_w = 0;
    var productText_h = 0;
    var textSize = 0 ;
    var textPx = '';
    var textColor = '';
    if(units){
    for(var i=0;i<unitsCount;i++){
        var unit = units.get(i);
         BefCount = o._TenderBef[i];
         tenderInvesment = unit.tenderInvesment();
         tenderTotal = unit.tenderTotal();
         if(BefCount>= tenderInvesment){
             BefCount = tenderInvesment;
             o._TenderBef[i] =BefCount;
         }else{
              if(FirstLoad[i]){
                BefCount = tenderInvesment ;
                FirstLoad[i] = false;
              }else{
                  if(tenderInvesment-BefCount>10000000){
                   BefCount  += 10000000;
                  }else if(tenderInvesment-BefCount>1000000){
                    BefCount += 1000000;
                  }else if(tenderInvesment-BefCount>100000){
                    BefCount += 100000;
                  }else if(tenderInvesment-BefCount>10000){
                    BefCount += 10000;
                  }
              }
             o._TenderBef[i] =BefCount;
            
         }
         switch(i){
          case 0:
          textColor = "#00c6ed";
          break;
          case 1:
          textColor = "#10d19c";
          break;
          case 2:
          textColor = "#7b47d7";
          break;
          case 3:
          textColor = "#ea3256";
          break;
          case 4:
          textColor = "#ff6817";
          break;
          case 5:
          textColor = '#ffeb4a';
          break;

         }
         tendRate = BefCount/tenderTotal;
         persentRate = ((tenderInvesment/tenderTotal).toFixed(2)*100).toFixed(0);
         graphic._handle.beginPath();
         graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), productRadius,0*Math.PI,2*Math.PI);
         graphic._handle.closePath();
         graphic._handle.strokeStyle = textColor;
         graphic._handle.stroke();
         graphic._handle.beginPath();
         graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), airRadius,0*Math.PI,2*Math.PI,false);
         graphic._handle.closePath();
         graphic._handle.strokeStyle = textColor;
         graphic._handle.stroke();
         graphic._handle.beginPath();
         graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), productRadius,0*Math.PI-Math.PI/2,2*Math.PI*tendRate-Math.PI/2,false);
         graphic._handle.arc(circle_x,top+productRadius+productInterval+i*(2*productRadius+productInterval), airRadius,2*Math.PI*tendRate-Math.PI/2,0*Math.PI-Math.PI/2,true);
         graphic._handle.closePath();
         graphic._handle.fillStyle = textColor;
         graphic._handle.fill();
         textPx = 'px Microsoft YaHei';
         textSize = 28;
         textPx = textSize + textPx
         graphic.setFont(textPx);
         //产品投资比例
         lable = persentRate+'%';
         productText_w = graphic.textWidth(lable)/2;
         //productText_h = graphic.textHight(lable)/2;
         graphic.drawText(lable, circle_x-productText_w, top+productRadius+productInterval+i*(2*productRadius+productInterval)+textSize/2,'#FFFFFF');
         yearRate = (unit.rate()).toFixed(2);;
         productText = unit.label();
         //graphic.setFont('blod 480px Microsoft YaHei');
         graphic.drawText(productText, text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval)-text_interval*2, textColor);
         yearRate =  '年化利率 :' + yearRate +'%';
         graphic.setFont('20px Microsoft YaHei');
         graphic.drawText(yearRate, text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval), '#FFFFFF');
         tatolLable = (unit.invesmentTotal()/100000000).toFixed(2);
         lable = '总计:'+"   "+tatolLable+'亿';
         graphic.drawText(lable,text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval)+text_interval, '#FFFFFF');
         dayLable  = unit.invesmentDay()/100000000;
         lable = '当日:'+"    "+dayLable+'亿';
         graphic.drawText(lable,text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval)+text_interval*2, '#FFFFFF');


        //if( unit.code()= "newnianxiang")


     }
   }


}



//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
//MO.FEaiChartMktCustomerV2Doughnut_onPaintBegin = function FEaiChartMktCustomerV2Doughnut_onPaintBegin(event) {
//    var o = this;
//    if (!o._ready) {
//       return;
//    }
//    o.__base.FGuiControl.onPaintBegin.call(o, event);
//    var graphic = event.graphic;
//    var rectangle = event.rectangle;

//    var top = rectangle.top;
//    var bottom = rectangle.top + rectangle.height;
//    var middle = bottom - 30;

//    var decoLeft = rectangle.left + 5;
//    var decoRight = rectangle.left + rectangle.width - 5;
//    var decoLineMargin = o.triangleWidth() + o.decoLineGap();
//    // 绘制左右三角及轴延长部分
//    graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
//    graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
//    graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
//    graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
//    var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
//    var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
//    var dataTop = top + 60;
//    var dataBottom = bottom - 30;
//    var dataHeight = dataBottom - dataTop;
//    // 主轴
//    graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
//    // 刻度
//    var startTime = o.startTime();
//    var endTime = o.endTime();
//    var timeSpan = endTime.date.getTime() - startTime.date.getTime();
//    var bakTime = startTime.date.getTime();
//    var text;
//    var drawText = false;
//    var textWidth = 0;
//    while (!startTime.isAfter(endTime)) {
//       var span = startTime.date.getTime() - bakTime;
//       var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
//       graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
//       text = startTime.format('HH24:00');
//       startTime.addHour(1);
//       drawText = !drawText;
//       if (drawText) {
//          graphic.setFont('bold 20px Microsoft YaHei');
//          textWidth = graphic.textWidth(text);
//          graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
//       }

//    }
//    startTime.date.setTime(bakTime);
//    startTime.refresh();
//    // 曲线
//    var trendInfo = o._trendInfo;
//    var units = trendInfo.units();
//    if(!units){
//       return;
//    }
//    if(units.isEmpty()){
//       return;
//    }
//    var unitFirst = units.first();
//    // 找到最大数值
//    var maxAmount = 0;
//    var count = units.count();
//    for (var i = 0; i < count; i++) {
//       var unit = units.get(i);
//       var investment = unit.investment();
//       if (investment > maxAmount) {
//          maxAmount = investment;
//       }
//       var redemption = unit.redemption();
//       if (redemption > maxAmount) {
//          maxAmount = redemption;
//       }
//    }
//    o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
//    o.drawTrend(graphic, '_redemption', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#0088FF', '#0000FF');
//    //o.drawTrend(graphic, '_netinvestment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#00FF00');
//    //o.drawTrend(graphic, '_interest', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FFFFFF');
//    // 完成
//    startTime.date.setTime(bakTime);
//    startTime.refresh();
//    // 统计
//    var lastHour = -1;
//    var hourInves = 0;
//    var maxHourInves = 0;
//    startTime.parseAuto(unitFirst.recordDate());
//    startTime.refresh();
//    lastHour = startTime.date.getHours();
//    for (var i = 0; i < count; i++) {
//       var unit = units.get(i);
//       startTime.parseAuto(unit.recordDate());
//       startTime.refresh();
//       var hour = startTime.date.getHours();
//       if (lastHour == hour) {
//          hourInves += unit.redemption();
//       }else{
//          if(hourInves > maxHourInves){
//             maxHourInves = hourInves;
//             hourInves = 0;
//          }
//          lastHour = hour;
//       }
//    }
//    // 输出数据文本
//    graphic.setFont('24px Microsoft YaHei');
//    graphic.drawText("24H数据曲线", decoLeft, top, '#54F0FF');
//    // 输出数据文本
//    graphic.setFont('22px Microsoft YaHei');
//    var rowStart = top + 30;
//    var rowHeight = 22;
//    // 计算宽度
//    var textWidth = graphic.textWidth('投资总计：');
//    var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
//    var investmentTotalWidth = graphic.textWidth(investmentTotalText);
//    var redemptionTotalText = MO.Lang.Float.unitFormat(trendInfo.redemptionTotal(), 0, 0, 2, 0, 10000, '万');
//    var redemptionTotalWidth = graphic.textWidth(redemptionTotalText);
//    var netinvestmentTotalText = MO.Lang.Float.unitFormat(trendInfo.netinvestmentTotal(), 0, 0, 2, 0, 10000, '万');
//    var netinvestmentTotalWidth = graphic.textWidth(netinvestmentTotalText);
//    var interestTotalText = MO.Lang.Float.unitFormat(trendInfo.interestTotal(), 0, 0, 2, 0, 10000, '万');
//    var interestTotalWidth = graphic.textWidth(interestTotalText);
//    var maxWidth = Math.max(Math.max(Math.max(investmentTotalWidth, redemptionTotalWidth), netinvestmentTotalWidth), interestTotalWidth);
//    // 绘制文字
//    graphic.drawText('投资总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
//    graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
//    graphic.drawText('赎回总额：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
//    graphic.drawText(redemptionTotalText, decoLeft + textWidth + maxWidth - redemptionTotalWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
//    graphic.drawText('净投总额：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
//    graphic.drawText(netinvestmentTotalText, decoLeft + textWidth + maxWidth - netinvestmentTotalWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
//    graphic.drawText('利息总额：', decoLeft, rowStart + rowHeight * 3 + 15, '#00CFFF');
//    graphic.drawText(interestTotalText, decoLeft + textWidth + maxWidth - interestTotalWidth, rowStart + rowHeight * 3 + 15, '#00B5F6');
//    // 设置时间
//    startTime.date.setTime(bakTime);
//    startTime.refresh();
// }
