//==========================================================
// <T>时间轴控件。</T>
//
// @class
// @author 
// @version 151009
//==========================================================
MO.FEaiChartCustomerSphereOperation = function FEaiChartCustomerSphereOperation(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._imageButton = null;
   //..........................................................
   // @event
   o.onImageLoad  = MO.FEaiChartCustomerSphereOperation_onImageLoad;
   o.onPaintBegin = MO.FEaiChartCustomerSphereOperation_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiChartCustomerSphereOperation_construct;
   // @method
   o.setup        = MO.FEaiChartCustomerSphereOperation_setup;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereOperation_onImageLoad = function FEaiChartCustomerSphereOperation_onImageLoad() {
   this._ready = true;
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereOperation_onPaintBegin = function FEaiChartCustomerSphereOperation_onPaintBegin(event) {
   var o = this;
   if (!o._ready) {
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 绘制中心点
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var virtualSize = event.virtualSize;
   var imageButton = o._imageButton;
   var imageSize = imageButton.size();
   var left = (virtualSize.width - imageSize.width) * 0.5;
   var top = (virtualSize.height - imageSize.height) * 0.5;
   graphic.drawImage(o._imageButton, left, top, imageSize.width, imageSize.height);
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereOperation_construct = function FEaiChartCustomerSphereOperation_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCustomerSphereOperation_setup = function FEaiChartCustomerSphereOperation_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建按键图片
   var image = o._imageButton = imageConsole.load('{eai.resource}/world/button.png');
   image.addLoadListener(o, o.onImageLoad);
}
