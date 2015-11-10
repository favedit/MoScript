//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FEaiCockpitForecastListBoxItem = function FEaiCockpitForecastListBoxItem(o) {
   o = MO.Class.inherits(this, o, MO.FGuiListBoxItem);
   //..........................................................
   // @attribute
   o._noticeUnit           = null;
   // @attribute
   o._isSelected           = MO.Class.register(o, new MO.AGetSet('_isSelected'), false);
   // @attribute
   o._bgImageNormal        = null;
   o._bgImageSelected      = null;
   o._pbarBgImage          = null;
   o._pbarFillImage        = null;
   o._pbarGoodImage        = null;
   o._pbarBadImage         = null;
   // @attribute
   o._font1stRowW          = null;
   o._font1stRowY          = null;
   o._font2ndRowW          = null;
   o._font2ndRowY          = null;
   //..........................................................
   // @method
   o.construct       = MO.FEaiCockpitForecastListBoxItem_construct;
   // @method
   o.setup           = MO.FEaiCockpitForecastListBoxItem_setup;
   o.draw            = MO.FEaiCockpitForecastListBoxItem_draw;
   o.onImageLoad     = MO.FEaiCockpitForecastListBoxItem_onImageLoad;
   // @method
   o.dispose         = MO.FEaiCockpitForecastListBoxItem_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_onImageLoad = function FEaiCockpitForecastListBoxItem_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_construct = function FEaiCockpitForecastListBoxItem_construct() {
   var o = this;
   o.__base.FGuiListBoxItem.construct.call(o);
   // 设置变量
   o._font1stRowW = new MO.SUiFont();
   o._font1stRowY = new MO.SUiFont();
   o._font2ndRowW = new MO.SUiFont();
   o._font2ndRowY = new MO.SUiFont();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_setup = function FEaiCockpitForecastListBoxItem_setup(noticeUnit) {
   var o = this;
   o._noticeUnit = noticeUnit;

   o._font1stRowW.parse('bold #FFFFFF 24px Microsoft YaHei');
   o._font1stRowY.parse('bold #FFEC3B 24px Microsoft YaHei');
   o._font2ndRowW.parse('bold #FFFFFF 22px Microsoft YaHei');
   o._font2ndRowY.parse('bold #FFEC3B 22px Microsoft YaHei');

   var imageConsole = MO.Console.find(MO.FImageConsole);
   var bgImageNormal = o._bgImageNormal = imageConsole.load('{eai.resource}/cockpit/notice/item_bg_normal.png');
   var bgImageSelected = o._bgImageSelected = imageConsole.load('{eai.resource}/cockpit/notice/item_bg_selected.png');
   var pbarBgImage = o._pbarBgImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_bar_bg.png');
   var pbarFillImage = o._pbarFillImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_bar_fill.png');
   var pbarGoodImage = o._pbarGoodImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_good.png');
   var pbarBadImage = o._pbarBadImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_bad.png');

   bgImageNormal.addLoadListener(o, o.onImageLoad);
   bgImageSelected.addLoadListener(o, o.onImageLoad);
   pbarBgImage.addLoadListener(o, o.onImageLoad);
   pbarFillImage.addLoadListener(o, o.onImageLoad);
   pbarGoodImage.addLoadListener(o, o.onImageLoad);
   pbarBadImage.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_draw = function FEaiCockpitForecastListBoxItem_draw(graphic, rectangle) {
   var o = this;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;

   //graphic.drawRectangle(left, top, width, height, 'red', 1);

   var drawX = left + 40;
   var drawY = top + 34;

   // 绘制背景
   if (o._isSelected) {
      graphic.drawImage(o._bgImageSelected, left, top, 889, 88);
   }
   else {
      graphic.drawImage(o._bgImageNormal, left, top, 889, 88);
   }

   var font1stRowW = o._font1stRowW;
   var font1stRowY = o._font1stRowY;
   var font2ndRowW = o._font2ndRowW;
   var font2ndRowY = o._font2ndRowY;

   var noticeUnit = o._noticeUnit;
   // 绘制第一行
   var drawText = '负责人：';
   var textWidth = 0;
   graphic.setFont(font1stRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;

   drawText = noticeUnit.label();
   graphic.setFont(font1stRowY.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowY.color);
   drawX = 580;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_dispose = function FEaiCockpitForecastListBoxItem_dispose(){
   var o = this;
   o._noticeUnit = MO.Lang.Object.dispose(o._noticeUnit);
   o._bgImageNormal = MO.Lang.Object.dispose(o._bgImageNormal);
   o._bgImageSelected = MO.Lang.Object.dispose(o._bgImageSelected);
   o._pbarBgImage = MO.Lang.Object.dispose(o._pbarBgImage);
   o._pbarFillImage = MO.Lang.Object.dispose(o._pbarFillImage);
   o._pbarGoodImage = MO.Lang.Object.dispose(o._pbarGoodImage);
   o._pbarBadImage = MO.Lang.Object.dispose(o._pbarBadImage);
   o._font1stRowW = MO.Lang.Object.dispose(o._font1stRowW);
   o._font1stRowY = MO.Lang.Object.dispose(o._font1stRowY);
   o._font2ndRowW = MO.Lang.Object.dispose(o._font2ndRowW);
   o._font2ndRowY = MO.Lang.Object.dispose(o._font2ndRowY);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
