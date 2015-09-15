//==========================================================
// <T>头部标题。</T>
//
// @class
// @author zyj
// @history 150910
//==========================================================
MO.FEaiChartPerfMarketerHead = function FEaiChartPerfMarketerHead(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._logoimg              = null;
   o._backgroundImage      = null;
   o._titleImage           = null;
   o._rankLinePadding      = null;
   o._backgroundPadding    = null;
   o._logoPadding          = null;
   // @event
   o.onImageLoad           = MO.FEaiChartPerfMarketerHead_onImageLoad;
   o.onPaintBegin          = MO.FEaiChartPerfMarketerHead_onPaintBegin;
   // @method
   o.construct             = MO.FEaiChartPerfMarketerHead_construct;
   // @method
   o.setup                 = MO.FEaiChartPerfMarketerHead_setup;

   o.dispose               = MO.FEaiChartPerfMarketerHead_dispose;
   return o;
}
//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerHead_setup = function FEaiChartPerfMarketerHead_setup(){
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
   var image = o._logoimg = imageConsole.load('{eai.resource}/performence_marketer/logo.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._titleImage = imageConsole.load('{eai.resource}/performence_marketer/telte.png');
   image.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerHead_construct = function FEaiChartPerfMarketerHead_construct() {
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
MO.FEaiChartPerfMarketerHead_onImageLoad = function FEaiChartPerfMarketerHead_onImageLoad(){
   this.dirty();
}
//==========================================================
// <T>头部标题</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerHead_onPaintBegin = function FEaiChartPerfMarketerHead_onPaintBegin(event){
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   // graphic.drawGridImage(o._logoimg, left, top, logoSize.width, logoSize.height, o._logoPadding);

   // logo
   graphic.drawGridImage(o._logoimg, left, top, 202, 176, o._logoPadding);
   var titleL =  width / 2 - 728 / 2;
   // title
   graphic.drawGridImage(o._titleImage, titleL, 70, 728, 67, o._logoPadding);
   
   // 投资 赎回 净投
   graphic.setFont('bold 24px Microsoft YaHei');
   graphic.drawCircle(width-565 , 176, 10, 0,"#fb2509","#fb2509");
   graphic.drawText("投资", width-550 , 184, "#fb2509");
   graphic.drawCircle(width-435 , 176, 10, 0,"#457eff","#457eff");
   graphic.drawText("赎回", width-420 , 184, "#457eff");
   graphic.drawCircle(width-305 , 176, 10, 0,"#02fb49","#02fb49");
   graphic.drawText("净投", width-290 , 184, "#02fb49");
}
//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartPerfMarketerHead_dispose = function FEaiChartPerfMarketerHead_dispose(){
   var o = this;
   // o._units = MO.Lang.Object.dispose(o._units);
   // o._backgroundPadding = MO.Lang.Object.dispose(o._logoPadding);
   // // 父处理
   // o.__base.FGuiControl.dispose.call(o);
}
