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


    //..........................................................
   // 设置数据
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      o._tableCount = 11;
      o._rankStart = 100;
      o._rankTitleStart = 5;
      o._rankHeight = 174;
      o._rankRowHeight = 50;
      o._rankIconStart = 22;
      o._rankTextStart = 8;
      o._rankRowUp = 36;
      o._rankRowDown = 68;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   }else{
      o._tableCount = 19;
      o._rankStart = 1416;
      o._rankTitleStart = 0;
      o._rankHeight = 174;
      o._rankWeeksHeight = 174;
      o._rankMonthHeight = 139;
      o._rankDayHeight = 137;
      o._rankRowHeight = 40;
      o._rankIconStart = 25;
      o._rankTextStart = 0;
      o._rankRowUp = 32;
      o._rankRowDown = 51;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }

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
