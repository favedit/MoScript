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
   //o._bgImageNormal        = null;
   //o._bgImageSelected      = null;
   o._pbarBgImage          = null;
   o._pbarFillImage        = null;
  // o._pbarGoodImage        = null;
  // o._pbarBadImage         = null;
   // @attribute
   o._font1stRowW          = null;
   o._font1stRowY          = null;
   o._font2ndRowW          = null;
   o._font2ndRowY          = null;
   o._formatDate           = null;
   //..........................................................
   // @method
   o.construct       = MO.FEaiCockpitNoticeListBoxItem_construct;
   // @method
   o.loadData        = MO.FEaiCockpitNoticeListBoxItem_loadData;
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
   o._formatDate = new MO.TDate();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeListBoxItem_loadData = function FEaiCockpitNoticeListBoxItem_loadData(noticeUnit) {
   var o = this;
   o._noticeUnit = noticeUnit;
   o._font1stRowW.parse('bold #FFFFFF 24px Microsoft YaHei');
   o._font1stRowY.parse('bold #FFEC3B 24px Microsoft YaHei');
   o._font2ndRowW.parse('bold #FFFFFF 22px Microsoft YaHei');
   o._font2ndRowY.parse('bold #FFEC3B 22px Microsoft YaHei');
   o._pbarBgImage = o._listBox.loadResourceImage('{eai.resource}/cockpit/notice/progress_bar_bg.png');
   o._pbarFillImage = o._listBox.loadResourceImage('{eai.resource}/cockpit/notice/progress_bar_fill.png');
   o._degreeImportantImage = o._listBox.loadResourceImage('{eai.resource}/cockpit/notice/degree_important.png');
   o._degreeUrgentImage = o._listBox.loadResourceImage('{eai.resource}/cockpit/notice/degree_urgent.png');
   o._degreeNormalImage = o._listBox.loadResourceImage('{eai.resource}/cockpit/notice/degree_normal.png');

   //var imageConsole = MO.Console.find(MO.FImageConsole);
   //var pbarBgImage = o._pbarBgImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_bar_bg.png');
   //var pbarFillImage = o._pbarFillImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_bar_fill.png');
   //var degreeImportantImage = o._degreeImportantImage = imageConsole.load('{eai.resource}/cockpit/notice/degree_important.png');
   //var degreeUrgentImage = o._degreeUrgentImage = imageConsole.load('{eai.resource}/cockpit/notice/degree_urgent.png');
   //var degreeNormalImage = o._degreeNormalImage = imageConsole.load('{eai.resource}/cockpit/notice/degree_normal.png');
   //pbarBgImage.addLoadListener(o, o.onImageLoad);
   //pbarFillImage.addLoadListener(o, o.onImageLoad);
   //degreeImportantImage.addLoadListener(o, o.onImageLoad);
   //degreeUrgentImage.addLoadListener(o, o.onImageLoad);
   //degreeNormalImage.addLoadListener(o, o.onImageLoad);
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
/*
   if (o._isSelected) {
      graphic.drawImage(o._bgImageSelected, left, top, 880, 80);
   }
   else {
      graphic.drawImage(o._bgImageNormal, left, top, 880, 80);
   }
*/
   var font1stRowW = o._font1stRowW;
   var font1stRowY = o._font1stRowY;
   var font2ndRowW = o._font2ndRowW;
   var font2ndRowY = o._font2ndRowY;

   var noticeUnit = o._noticeUnit;
   var percent = noticeUnit.viewCount() / noticeUnit.userCount();
   if (percent > 100) {
       percent = 100;
   }
    // 绘制第一行
/*
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
   */
   drawText = noticeUnit.label();
   graphic.setFont(font2ndRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);

   drawX = 410;
   drawText = noticeUnit.publishDate();
   var formatDate = o._formatDate;
   formatDate.parseAuto(drawText);
   drawText = formatDate.format('YYYY-MM-DD')
   graphic.setFont(font2ndRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);
   
   drawX = 560;
   drawY -= 16;
   graphic.drawImage(o._pbarBgImage, drawX, drawY, 199, 13);

   var clipWidth = 199 * percent * rate * 0.01;
   var clipHeight = 21;
   graphic._handle.save();
   graphic._handle.rect(drawX, drawY, clipWidth, 13)
 //  console.log(clipWidth);
   graphic._handle.clip();
   graphic.drawImage(o._pbarFillImage, drawX, drawY, 199, 13);
   graphic._handle.restore();

   var urgencyLevel = noticeUnit.urgencyLevel();
   var urgencyImage = null;
   if (urgencyLevel == 1) {
       urgencyImage = o._degreeNormalImage;
   } else if (urgencyLevel == 2) {
       urgencyImage = o._degreeImportantImage;
   } else if (urgencyLevel == 3) {
       urgencyImage = o._degreeUrgentImage;
   }
   if (urgencyImage) {
      graphic.drawImage(urgencyImage, drawX + 260, drawY - 10, 63, 37);
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
   //o._bgImageNormal = MO.Lang.Object.dispose(o._bgImageNormal);
   //o._bgImageSelected = MO.Lang.Object.dispose(o._bgImageSelected);
   o._pbarBgImage = MO.Lang.Object.dispose(o._pbarBgImage);
   o._pbarFillImage = MO.Lang.Object.dispose(o._pbarFillImage);
  // o._pbarGoodImage = MO.Lang.Object.dispose(o._pbarGoodImage);
 //  o._pbarBadImage = MO.Lang.Object.dispose(o._pbarBadImage);
   o._font1stRowW = MO.Lang.Object.dispose(o._font1stRowW);
   o._font1stRowY = MO.Lang.Object.dispose(o._font1stRowY);
   o._font2ndRowW = MO.Lang.Object.dispose(o._font2ndRowW);
   o._font2ndRowY = MO.Lang.Object.dispose(o._font2ndRowY);
   o._formatDate = MO.Lang.Object.dispose(o._formatDate);
   o._degreeImportantImage = MO.Lang.Object.dispose(o._degreeImportantImage);
   o._degreeUrgentImage = MO.Lang.Object.dispose(o._degreeUrgentImage);
   o._degreeNormalImage = MO.Lang.Object.dispose(o._degreeNormalImage);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
