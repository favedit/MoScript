//==========================================================
// <T>时间轴控件。</T>
//
// @class
// @author sunpeng
// @version 150630
//==========================================================
MO.FEaiChartStatMarketerBarChart = function FEaiChartStatMarketerBarChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._infoProvince = MO.Class.register(o, new MO.AGetSet('_infoProvince'));
   o._provinceTextFont = MO.Class.register(o, new MO.AGetSet('_provinceTextFont'));
   o._ready = false;
   o._investmentTotal = 0;
   // @attribute
   o._baseHeight = 5;
   o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   o._triangleWidth = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   o._triangleHeight = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   o._decoLineGap = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   o._decoLineWidth = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   //..........................................................
   // @event
   o.oeUpdate = MO.FEaiChartStatMarketerBarChart_oeUpdate;
   //..........................................................
   // @method
   o.construct = MO.FEaiChartStatMarketerBarChart_construct;
   o.sync = MO.FEaiChartStatMarketerBarChart_sync;
   o.drawTrend = MO.FEaiChartStatMarketerBarChart_drawTrend;
   o.onPaintBegin = MO.FEaiChartStatMarketerBarChart_onPaintBegin;
   o.on24HDataFetch = MO.FEaiChartStatMarketerBarChart_on24HDataFetch;
   return o;
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerBarChart_construct = function FEaiChartStatMarketerBarChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiLogicInfoCustomerTrend);
   o._infoProvince = MO.Class.create(MO.FEaiChartStatMarketerInfo);
   o._provinceTextFont = new MO.SUiFont();
   o._provinceTextFont.size = 20;
   o._provinceTextFont.bold = true;
   o._provinceTextFont.color = '#59FDE9'
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartStatMarketerBarChart_oeUpdate = function FEaiChartStatMarketerBarChart_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   // 更新内容
   if (o._ready) {
      return;
   }
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
   }
   return MO.EEventStatus.Stop;
}


//==========================================================
// <T>绘制柱状图处理。</T>
//
// @method
//==========================================================
MO.FEaiChartStatMarketerBarChart_onPaintBegin = function FEaiChartStatMarketerBarChart_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   var provincesarr = o._infoProvince._provinces;
   if (!provincesarr) {
      return;
   }

   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var handle = graphic._handle;

   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var middle = bottom - 30;
   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   var provinceCount = 10;
   var width = (rectangle.width + rectangle.left) / 71;
   var intervalWidth = (rectangle.width + rectangle.left) / 33;
   var maxInverstment = 0;
   var rectColor = ['#ba0010', '#ba0010','#ba0010', '#ba0010', '#ba4a00', '#b97800', '#b9b300', '#6ab000', '#009845', '#028071', '#115e75', '#164c6f', '#193d6a', '#242e61', '#3c2460'];

   graphic._handle.beginPath();
   for (var i = 0 ; i < provincesarr.count() ; i++) {
      var province = provincesarr.get(i);
      if (maxInverstment < province.investmentTotal()) {
         maxInverstment = province.investmentTotal();
      }
   }
   graphic.drawLine(decoLeft, bottom - 70, decoRight, bottom - 70, '#F8CB3D', 3);
   var realityCount = 0;
   var provinceTextFont = o._provinceTextFont;
   var volume;
   var investmentNow;
   var rectTangleHight = rectangle.height*1/15*13/22;
   var rectangleSpan =rectangle.height*1/15*9/22
   var rectTangleWidth = width;
   if (provincesarr) {
      for (var i = 0 ; i < provincesarr.count() ; i++) {
         var province = provincesarr.get(i);
         var code = province.code();
         var provincename = MO.Console.find(MO.FEaiResourceConsole).provinceModule().findByCode(code);
         var provinceLabel = '';
         var hight = 0;
         var color = '#F8CB3D';
         if (provincename && provincename.label()) {  
            provinceLabel = provincename.label();        
            realityCount++;
            hight = 25/25*  rectangle.height* (province.investmentTotal()+maxInverstment/70) / maxInverstment
            graphic.setFont('9px Microsoft YaHei');
            // var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
            // var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
            // var bottomColor = '#' + hexColor.substring(2);
            graphic.drawTextVertical(provinceLabel, decoLeft + realityCount * intervalWidth , bottom - 45, provinceTextFont);
            // graphic._handle.rect(decoLeft + realityCount * intervalWidth, bottom - 80 - hight, width, hight);
            investmentNow = province.investmentTotal();
            if(investmentNow>=maxInverstment){
               volume = 15;
            }else if(investmentNow>=maxInverstment*0.93){
               volume = 14;
            }else if(investmentNow>=maxInverstment*0.86){
               volume = 13;
            }else if(investmentNow>=maxInverstment*0.8){
               volume = 12;
            }else if(investmentNow>=maxInverstment*0.73){
               volume = 11;
            }else if(investmentNow>=maxInverstment*0.66){
               volume = 10;
            }else if(investmentNow>=maxInverstment*0.6){
               volume = 9;
            }else if(investmentNow>=maxInverstment*0.53){
               volume = 8;
            }else if(investmentNow>=maxInverstment*0.46){
               volume = 7;
            }else if(investmentNow>=maxInverstment*0.4){
               volume = 6;
            }else if(investmentNow>=maxInverstment*0.33){
               volume = 5;
            }else if(investmentNow>=maxInverstment*0.26){
               volume = 4;
            }else if(investmentNow>=maxInverstment*0.2){
               volume = 3;
            }else if(investmentNow>=maxInverstment*0.13){
               volume = 2;
            }else if(investmentNow>=maxInverstment*0.06){
               volume = 1;
            }else{
               volume = 1;
            }
           
            for (var n=1;n<=volume;n++){
               graphic.fillRectangle(decoLeft + realityCount * intervalWidth,bottom - 80 -n*rectangleSpan-n*rectTangleHight,rectTangleWidth,rectTangleHight,rectColor[15-n]);
            }
         }
      }
      // var gradient = graphic.createLinearGradient(0, rectangle.top+30, 0, bottom -80-n*rectangleSpan-n*rectTangleHight,rectTangleWidth,rectTangleHight,rectColor[n]);
      // gradient.addColorStop('0', '#fb2609');
      // gradient.addColorStop('1', '#1c12a5');
      // graphic._handle.fillStyle = gradient;
      // graphic._handle.fill();
   }

}
