//==========================================================
// <T>头部标题。</T>
//
// @class
// @author zyj
// @history 150910
//==========================================================
MO.FEaiChartPerfMarketerCharts = function FEaiChartPerfMarketerCharts(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._backgroundImage      = null;
   o._dayImage             = null;
   o._monthImage           = null;
   o._cumulativeImage      = null;
   o.__chartBackgroundImage= null;
   o._rankLinePadding      = null;
   o._backgroundPadding    = null;
   o._logoPadding          = null;
   o._startTime = MO.Class.register(o, new MO.AGetSet('_startTime'));
   o._endTime = MO.Class.register(o, new MO.AGetSet('_endTime'));
   o._trendInfo = MO.Class.register(o, new MO.AGetSet('_trendInfo'));

   // @event
   o.onImageLoad           = MO.FEaiChartPerfMarketerCharts_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartPerfMarketerCharts_onPaintBegin;
   // @method
   o.construct             = MO.FEaiChartPerfMarketerCharts_construct;
   // @method
   o.setup                 = MO.FEaiChartPerfMarketerCharts_setup;
   o.dispose               = MO.FEaiChartPerfMarketerCharts_dispose;
   return o;
}
//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerCharts_setup = function FEaiChartPerfMarketerCharts_setup(){
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片

   var image = o._backgroundImage = imageConsole.load('{eai.resource}/performence_marketer/bg2.png');
   image.addLoadListener = (o, o.onImageLoad);
   var image = o._chartBackgroundImage = imageConsole.load('{eai.resource}/performence_marketer/right.png');
   image.addLoadListener = (o, o.onImageLoad);
   var image = o._dayImage = imageConsole.load('{eai.resource}/performence_marketer/3.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._monthImage = imageConsole.load('{eai.resource}/performence_marketer/2.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._cumulativeImage = imageConsole.load('{eai.resource}/performence_marketer/1.png');
   image.addLoadListener(o, o.onImageLoad);

}
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerCharts_construct = function FEaiChartPerfMarketerCharts_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 创建属性
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(0, 0, 0, 0);
   o._logoPadding = new MO.SPadding(0, 0, 0, 0);
   o._startTime = new MO.TDate();
   o._endTime = new MO.TDate();
   o._trendInfo = MO.Class.create(MO.FEaiChartPerfMarketerInfo);
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerCharts_onImageLoad = function FEaiChartPerfMarketerCharts_onImageLoad(){
   this.dirty();
}
//==========================================================
// <T>头部标题</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerCharts_onPaintBegin = function FEaiChartPerfMarketerCharts_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._logoPadding);
   // 当日
   graphic.drawGridImage(o._dayImage, left+20, top+41, 82, 236, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, left+433, top+41, 1416, 236, o._logoPadding);
    // 刻度
   var startTime = o.startTime();
   var endTime = o.endTime();
   var timeSpan = endTime.date.getTime() - startTime.date.getTime();
   var bakTime = startTime.date.getTime();

   // var decoRight = rectangle.left + rectangle.width - 5;
   // var decoLineMargin = o.triangleWidth() + o.decoLineGap();
   // var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
   // var dataRight = decoRight - decoLineMargin - o.decoLineWidth();

   var text;
   var drawText = false;
   var textWidth = 0;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;
   var decoRight = rectangle.left + rectangle.width - 5;
   var decoLeft = rectangle.left + 5;
   console.log(startTime.format('HH24:MI'));
   graphic.setFont('21px Microsoft YaHei');
   // if(!startTime.isAfter(endTime)){
   //    console.log(1233333333333333333333)
   //    var span = startTime.date.getTime() - bakTime;
   //    // var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
   //    // graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
   //    text = startTime.format('HH24:MI');
   //    startTime.addHour(1);
   //    startTime.truncHour();
   //    drawText = !drawText;
   //    if (drawText) {
   //       textWidth = graphic.textWidth(text);
   //       graphic.drawText(text, 500 - textWidth / 2, middle + 20, '#59FDE9');
   //    }
   // }
   // console.log(startTime.isAfter(endTime));
   while (!startTime.isAfter(endTime)) {
       console.log(1233333333333333333333);
      var span = startTime.date.getTime() - bakTime;
      // var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
      // graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
      text = startTime.format('HH24:MI');
      startTime.addHour(1);
      startTime.truncHour();
      drawText = !drawText;
      if (drawText) {
         textWidth = graphic.textWidth(text);
         graphic.drawText(text, 500 - textWidth / 2, middle + 20, '#59FDE9');
      }
   }
   // graphic.drawLine(dataRight, middle - o.degreeLineHeight(), dataRight, middle, '#FFFFFF', 1);
   text = endTime.format('HH24:MI');
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, 500 - textWidth / 2, 445 , '#59FDE9');
   // graphic.drawText(text, dataRight - textWidth / 2, middle + 40, '#59FDE9');
   // graphic.drawText("12:00", 479, 445, '#eeb92f');

   startTime.date.setTime(bakTime);
   startTime.refresh();

   // graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);

   
   // 当月
   graphic.drawGridImage(o._monthImage, left+20, top+310, 82, 236, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, left+433, top+310, 1416, 236, o._logoPadding);
   // 累计
   graphic.drawGridImage(o._cumulativeImage, left+20, top+578, 82, 236, o._logoPadding);
   graphic.drawGridImage(o._chartBackgroundImage, left+433, top+578, 1416, 236, o._logoPadding);
}
//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerCharts_dispose = function FEaiChartPerfMarketerCharts_dispose(){
   var o = this;
   // o._units = MO.Lang.Object.dispose(o._units);
   // o._backgroundPadding = MO.Lang.Object.dispose(o._logoPadding);
   // // 父处理
   // o.__base.FGuiControl.dispose.call(o);
}
