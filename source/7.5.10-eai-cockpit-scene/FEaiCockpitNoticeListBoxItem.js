//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FEaiCockpitNoticeListBoxItem = function FEaiCockpitNoticeListBoxItem(o) {
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
   o.construct       = MO.FEaiCockpitNoticeListBoxItem_construct;
   // @method
   o.setup           = MO.FEaiCockpitNoticeListBoxItem_setup;
   o.draw            = MO.FEaiCockpitNoticeListBoxItem_draw;
   o.onImageLoad     = MO.FEaiCockpitNoticeListBoxItem_onImageLoad;
   // @method
   o.dispose         = MO.FEaiCockpitNoticeListBoxItem_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeListBoxItem_onImageLoad = function FEaiCockpitNoticeListBoxItem_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeListBoxItem_construct = function FEaiCockpitNoticeListBoxItem_construct() {
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
MO.FEaiCockpitNoticeListBoxItem_setup = function FEaiCockpitNoticeListBoxItem_setup(noticeUnit) {
   var o = this;
   o._noticeUnit = noticeUnit;

   o._font1stRowW.parse('bold #FFFFFF 24px Microsoft YaHei');
   o._font1stRowY.parse('bold #FFEC3B 24px Microsoft YaHei');
   o._font2ndRowW.parse('bold #FFFFFF 22px Microsoft YaHei');
   o._font2ndRowY.parse('bold #FFEC3B 22px Microsoft YaHei');

   var imageConsole = MO.Console.find(MO.FImageConsole);
   var bgImageNormal = o._bgImageNormal = imageConsole.load('{eai.resource}/cockpit/notice/item_bg.png');
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
MO.FEaiCockpitNoticeListBoxItem_draw = function FEaiCockpitNoticeListBoxItem_draw(graphic, rectangle, rate) {
   var o = this;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;

   //graphic.drawRectangle(left, top, width, height, 'red', 1);

   var drawX = left + 40;
   var drawY = top + 34;

   if (rate == null || rate == undefined) {
      rate = 1;
   }

   // 绘制背景
   if (o._isSelected) {
      graphic.drawImage(o._bgImageSelected, left, top, 880, 80);
   }
   else {
      graphic.drawImage(o._bgImageNormal, left, top, 880, 80);
   }

   var font1stRowW = o._font1stRowW;
   var font1stRowY = o._font1stRowY;
   var font2ndRowW = o._font2ndRowW;
   var font2ndRowY = o._font2ndRowY;

   var noticeUnit = o._noticeUnit;
   var percent = noticeUnit.viewCount() / noticeUnit.userCount();
   // 绘制第一行
   var drawText = '负责人：';
   var textWidth = 0;
   graphic.setFont(font1stRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;

   drawText = noticeUnit.userName();
   graphic.setFont(font1stRowY.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowY.color);
   drawX = 580;

   drawText = '当前阅读量：';
   graphic.setFont(font1stRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;

   drawText = parseInt(percent * rate) + '%';
   graphic.setFont(font1stRowY.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowY.color);
   // 绘制第二行
   drawX = left + 40;
   drawY += 36;

   drawText = noticeUnit.label();
   graphic.setFont(font2ndRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);

   drawX = 410;
   drawText = noticeUnit.publishDate();
   graphic.setFont(font2ndRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);
   
   drawX = 560;
   drawY -= 16;
   graphic.drawImage(o._pbarBgImage, drawX, drawY, 244, 21);

   var clipWidth = 244 * percent * rate * 0.01;
   var clipHeight = 21;
   graphic._handle.save();
   graphic._handle.rect(drawX, drawY, clipWidth, 21)
   graphic._handle.clip();
   graphic.drawImage(o._pbarFillImage, drawX, drawY, 244, 21);
   graphic._handle.restore();

   drawX = 845;
   drawY -= 34;
   // 绘制笑脸
   if (percent > 0.5) {
      graphic.drawImage(o._pbarGoodImage, drawX, drawY, 49, 49);
   }
   else {
      graphic.drawImage(o._pbarBadImage, drawX, drawY, 49, 49);
   }

}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeListBoxItem_dispose = function FEaiCockpitNoticeListBoxItem_dispose(){
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
