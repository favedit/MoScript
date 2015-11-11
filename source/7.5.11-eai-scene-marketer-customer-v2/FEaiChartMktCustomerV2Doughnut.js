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
   o._ready            = false;
   o._circleRadius     = MO.Class.register(o, new MO.AGetSet('_circleRadius'), 10);
   o._trendInfo        = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._trendInfos       = MO.Class.register(o, new MO.AGetSet('_trendInfos'));
   o._TenderBef        = MO.Class.register(o, new MO.AGetSet('_TenderBef'));
   o._FirstLoad        = MO.Class.register(o, new MO.AGetSet('_FirstLoad'));
   o._circleStyle      = MO.Class.register(o, new MO.AGetSet('_circleStyle'));
   o._circleAirRadius  = MO.Class.register(o, new MO.AGetSet('_airRadius'), 7);
   o._circlelColor     = MO.Class.register(o, new MO.AGetSet('_circlelColor'),'#ffffff');
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
   o._backgroundImage  = null;
   o._backgroundPadding = MO.Class.register(o, new MO.AGetSet('_backgroundPadding'));
   return o;
}
MO.FEaiChartMktCustomerV2Doughnut_setCircleStyle  =  function FEaiChartMktCustomerV2Doughnut_setCircleStyle(Radius,color,unit){
  var o = this;
  o.setCircleRadius(o._circleStyle.radius);
  o.setCircleAirRadius(o._circleStyle.radius*11/15);
  o.setCircleColor(o._circleStyle.circlelColor);
  o.setTatolColor(o._circleStyle.tatolColor);
  
}
MO.FEaiChartMktCustomerV2Doughnut_dispose = function FEaiChartMktCustomerV2Doughnut_dispose(){
   var o = this;
   o._trendInfo = MO.Lang.Object.dispose(o._trendInfo);
   o._trendInfos = MO.Lang.Object.dispose(o._trendInfos);

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
   o._trendInfo = MO.Class.create(MO.FEaiLogicInfoTender);
   o._TenderBef ={};
   o._FirstLoad ={};
    for (var i =0;i<6;i++ ){
      o._TenderBef[i]=i;
      o.FirstLoad[i]=true;
    }
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/doughnutbg.png');
   o._backgroundPadding = new MO.SPadding(20, 20, 20, 20);
   this.dirty();
}


//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktCustomerV2Doughnut_oeUpdate = function FEaiChartMktCustomerV2Doughnut_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   // 更新内容s
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


MO.FEaiChartMktCustomerV2Doughnut_draw = function FEaiChartMktCustomerV2Doughnut_draw(context) {
    var o = this;
    if(!o._ready||!units){
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
    var left = rectangle.left;
    var top = rectangle.top;
    var width = rectangle.width;
    var height = rectangle.height;
    var right = left + width;
    var bottom = top + height;
    var drawPosition = top;
    var heightRate = height / o._size.height;
    var drawLeft = left + 12;
    var drawRight = right - 12;
    var drawWidth = right - left;

   //graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, 'red', 2);

   var hCenter = rectangle.left + rectangle.width / 2;
   var vCenter = rectangle.top + rectangle.height / 2;


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


}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Doughnut_onPaintBegin = function FEaiChartMktCustomerV2Doughnut_onPaintBegin(event) {
   var o = this;
    var unit = o._trendInfo
    var units =  o._trendInfo.units();
   if (!o._ready||!units ) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var width = rectangle.width;
   var height = rectangle.height;
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
    var circle_x = decoLeft+rectangle.width*17/24;
    var text_x   = decoLeft+rectangle.width*1/10;
    var text_interval = rectangle.height/36;
    var productText_w = 0;
    var productText_h = 0;
    var textSize = 0 ;
    var textPx = '';
    var textColor = '';
    graphic.drawGridImage(o._backgroundImage, decoLeft, top-10, width, height+10, o._backgroundPadding);

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
          textColor = "#00c6ed";
          break;
          case 2:
          textColor = "#00c6ed";
          break;
          case 3:
          textColor = "#00c6ed";
          break;
          case 4:
          textColor = "#00c6ed";
          break;
          case 5:
          textColor = '#00c6ed';
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
         textSize = 20;
         textPx = textSize + textPx
         graphic.setFont(textPx);
         //产品投资比例
         lable = persentRate+'%';
         productText_w = graphic.textWidth(lable)/2;
         //productText_h = graphic.textHight(lable)/2;
         graphic.drawText(lable, circle_x-productText_w, top+productRadius+productInterval+i*(2*productRadius+productInterval)+textSize/2,'#ffeb4a');
         yearRate = (unit.rate()).toFixed(2);;
         productText = unit.label();
         //graphic.setFont('blod 480px Microsoft YaHei');
         graphic.drawText(productText, text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval)-text_interval*2+10, '#ffeb4a');
         yearRate =  '年化利率 :' + yearRate +'%';
         graphic.setFont('12px Microsoft YaHei');
         graphic.drawText(yearRate, text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval), '#FFFFFF');
         tatolLable = (unit.invesmentTotal()/100000000).toFixed(2);
         lable = '总计:'+"   "+tatolLable+'亿';
         graphic.drawText(lable,text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval)+text_interval, '#FFFFFF');
         dayLable  = (unit.invesmentDay()/100000000).toFixed(2);
         lable = '当日:'+"    "+dayLable+'亿';
         graphic.drawText(lable,text_x, top+productRadius+productInterval+i*(2*productRadius+productInterval)+text_interval*2, '#FFFFFF');

     }
   }


}

