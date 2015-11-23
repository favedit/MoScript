//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151108
//==========================================================
MO.FEaiCockpitProjectListBoxItem = function FEaiCockpitProjectListBoxItem(o) {
   o = MO.Class.inherits(this, o, MO.FGuiListBoxItem);
   //..........................................................
   // @attribute
   o._unit                 = null;
   // @attribute
   o._bgImage              = null;
   o._pbarTimeBgImage = null;
   o._pbarTimeIconImage = null;
//   o._pbarTimeFillImage    = null;
   o._pbarProjectBgImage = null;
   o._pbarProjectIconImage = null;
   o._indicatorLightOff_0  = null;
   o._indicatorLightOff_1  = null;
   o._indicatorLightOff_2  = null;
   o._indicatorLightOn_0   = null;
   o._indicatorLightOn_1   = null;
   o._indicatorLightOn_2   = null;
   // @attribute
   o._fontTitle            = null;
   o._fontSponsor          = null;
   o._font2ndRow           = null;
   o._fontProgress         = null;
   //..........................................................
   // @method
   o.construct       = MO.FEaiCockpitProjectListBoxItem_construct;
   // @method
   o.setup           = MO.FEaiCockpitProjectListBoxItem_setup;
   o.draw            = MO.FEaiCockpitProjectListBoxItem_draw;
   o.onImageLoad     = MO.FEaiCockpitProjectListBoxItem_onImageLoad;
   // @method
   o.dispose         = MO.FEaiCockpitProjectListBoxItem_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectListBoxItem_onImageLoad = function FEaiCockpitProjectListBoxItem_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectListBoxItem_construct = function FEaiCockpitProjectListBoxItem_construct() {
   var o = this;
   o.__base.FGuiListBoxItem.construct.call(o);
   // 设置变量
   o._fontTitle = new MO.SUiFont();
   o._fontSponsor = new MO.SUiFont();
   o._font2ndRow = new MO.SUiFont();
   o._fontProgress = new MO.SUiFont();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectListBoxItem_setup = function FEaiCockpitProjectListBoxItem_setup(unit) {
   var o = this;
   o._unit = unit;

   o._fontTitle.parse('bold #FFEC3B 21px Microsoft YaHei');
   o._fontSponsor.parse('#FFFFFF 18px Microsoft YaHei');
   o._font2ndRow.parse('#FFFFFF 15px Microsoft YaHei');
   o._fontProgress.parse('#FFFFFF 19px Microsoft YaHei');

   var imageConsole = MO.Console.find(MO.FImageConsole);
   o._bgImage = imageConsole.load('{eai.resource}/cockpit/project/item_bg.png');
   o._pbarTimeBgImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_time_bg.png');
   o._pbarTimeIconImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_time_icon.png');
    //  o._pbarTimeFillImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_time_fill.png');
   o._pbarProjectBgImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_project_bg.png');
   o._pbarProjectIconImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_project_icon.png');
//   o._pbarProjectFillImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_project_fill.png');
   o._indicatorLightOff_0 = imageConsole.load('{eai.resource}/cockpit/project/pg_light_off_0.png');
   o._indicatorLightOff_1 = imageConsole.load('{eai.resource}/cockpit/project/pg_light_off_1.png');
   o._indicatorLightOff_2 = imageConsole.load('{eai.resource}/cockpit/project/pg_light_off_2.png');
   o._indicatorLightOn_0 = imageConsole.load('{eai.resource}/cockpit/project/pg_light_on_0.png');
   o._indicatorLightOn_1 = imageConsole.load('{eai.resource}/cockpit/project/pg_light_on_1.png');
   o._indicatorLightOn_2 = imageConsole.load('{eai.resource}/cockpit/project/pg_light_on_2.png');

   o._bgImage.addLoadListener(o, o.onImageLoad);
   o._pbarTimeBgImage.addLoadListener(o, o.onImageLoad);
 //  o._pbarTimeFillImage.addLoadListener(o, o.onImageLoad);
   o._pbarTimeIconImage.addLoadListener(o, o.onImageLoad);
   o._pbarProjectBgImage.addLoadListener(o, o.onImageLoad);
 //  o._pbarProjectFillImage.addLoadListener(o, o.onImageLoad);
   o._pbarProjectIconImage.addLoadListener(o, o.onImageLoad);
   o._indicatorLightOff_0.addLoadListener(o, o.onImageLoad);
   o._indicatorLightOff_1.addLoadListener(o, o.onImageLoad);
   o._indicatorLightOff_2.addLoadListener(o, o.onImageLoad);
   o._indicatorLightOn_0.addLoadListener(o, o.onImageLoad);
   o._indicatorLightOn_1.addLoadListener(o, o.onImageLoad);
   o._indicatorLightOn_2.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectListBoxItem_draw = function FEaiCockpitProjectListBoxItem_draw(graphic, rectangle, rate) {
   var o = this;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;

   //graphic.drawRectangle(left, top, width, height, 'red', 1);

   var drawX = left + 10;
   var drawY = top + 26;

   if (rate == null || rate == undefined) {
      rate = 1;
   }

   // 绘制背景

   graphic.drawImage(o._bgImage, left, top, 320, 120);

   var fontTitle = o._fontTitle;
   var fontSponsor = o._fontSponsor;
   var font2ndRow = o._font2ndRow;
   var fontProgress = o._fontProgress;

   var unit = o._unit;
   var textWidth = 0;
   // 绘制第一行
   var drawText = unit.name();
   graphic.setFont(fontTitle.toString());
   graphic.drawText(drawText, drawX, drawY, fontTitle.color);

   //drawText = '责任人：';
   //graphic.setFont(fontSponsor.toString());
   //graphic.drawText(drawText, drawX, drawY, fontSponsor.color);
   //textWidth = graphic.textWidth(drawText);
   //drawX += textWidth;

   drawText = unit.uname();
   textWidth = graphic.textWidth(drawText);
   drawX = left + width - textWidth
   drawY -= 2;
   graphic.setFont(fontSponsor.toString());
   graphic.drawText(drawText, drawX, drawY, fontSponsor.color);
   // 绘制第二行
   drawX = left + 12;
   drawY += 28;

   drawText = '优先级';
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;
   
   drawX += 10;
   var bakDrawX = drawX;
   drawY -= 10;
   graphic.drawImage(o._indicatorLightOff_0, drawX, drawY, 12, 12);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_1, drawX, drawY, 12, 12);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_2, drawX, drawY, 12, 12);

   bakDrawX += unit.priority() * 20;
   graphic.drawImage(o['_indicatorLightOn_' + unit.priority()], bakDrawX, drawY, 12, 12);

   drawX = 190;
   drawY += 10;
   drawText = '状态指示灯';
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;
   
   drawX += 10;
   var bakDrawX = drawX;
   drawY -= 10;
   graphic.drawImage(o._indicatorLightOff_0, drawX, drawY, 12, 12);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_1, drawX, drawY, 12, 12);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_2, drawX, drawY, 12, 12);

   bakDrawX += unit.status() * 20;
   graphic.drawImage(o['_indicatorLightOn_' + unit.status()], bakDrawX, drawY, 12, 12);

   // 绘制第三行
   drawX = left + 10;
   drawY += 44;

   drawText = '时间进度';
   graphic.setFont(fontProgress.toString());
   graphic.drawText(drawText, drawX, drawY, fontProgress.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth + 10;
   drawY -= 10;
   graphic.drawImage(o._pbarTimeBgImage, drawX, drawY, 205, 6);

   var clipWidth = 205 * unit.timeProgress() * 0.01 * rate;
   var clipHeight = 21;
  // graphic._handle.save();
  // graphic._handle.rect(drawX, drawY, clipWidth, 21)
  // graphic._handle.clip();
  // graphic.drawImage(o._pbarTimeFillImage, drawX, drawY, 216, 21);
   graphic.drawImage(o._pbarTimeIconImage, drawX - 43/2 + clipWidth, drawY - 7, 43, 19);

   graphic._handle.restore();

  // drawY += 10;
   drawText = parseInt(unit.timeProgress() * rate) + '%';
   graphic.setFont(fontProgress.toString());
   textWidth = graphic.textWidth(drawText);
  // drawX = drawX + (216 - textWidth) * 0.5;
   graphic.drawText(drawText, drawX - 43 / 2 + clipWidth + 3, drawY + 10, fontProgress.color);

   // 绘制第四行
   drawX = left + 10;
   drawY += 28;

   drawText = '项目进度';
   graphic.setFont(fontProgress.toString());
   graphic.drawText(drawText, drawX, drawY + 10, fontProgress.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth + 10;
  // drawY -= 10;
   graphic.drawImage(o._pbarProjectBgImage, drawX, drawY , 205, 6);

   var clipWidth = 205 * unit.proProgress() * 0.01 * rate;
   var clipHeight = 21;
  //graphic._handle.save();
  // graphic._handle.rect(drawX, drawY, clipWidth, 21)
  // graphic._handle.clip();
  // graphic.drawImage(o._pbarProjectFillImage, drawX, drawY, 216, 21);
   graphic.drawImage(o._pbarProjectIconImage, drawX - 43 / 2 + clipWidth, drawY - 7, 43, 19);
   graphic._handle.restore();

  // drawY += 10;
   drawText = parseInt(unit.proProgress() * rate) + '%';
   graphic.setFont(fontProgress.toString());
   textWidth = graphic.textWidth(drawText);
  // drawX = drawX + (216 - textWidth) * 0.5;
   graphic.drawText(drawText, drawX - 43 / 2 + clipWidth + 3, drawY + 10, fontProgress.color);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectListBoxItem_dispose = function FEaiCockpitProjectListBoxItem_dispose(){
   var o = this;
   o._unit = MO.Lang.Object.dispose(o._unit);
   o._bgImage = MO.Lang.Object.dispose(o._bgImage);
   o._pbarTimeBgImage = MO.Lang.Object.dispose(o._pbarTimeBgImage);
    //  o._pbarTimeFillImage = MO.Lang.Object.dispose(o._pbarTimeFillImage);
   o._pbarTimeIconImage = MO.Lang.Object.dispose(o._pbarTimeIconImage);
   o._pbarProjectBgImage = MO.Lang.Object.dispose(o._pbarProjectBgImage);
   o._pbarProjectIconImage = MO.Lang.Object.dispose(o._pbarProjectIconImage);
//   o._pbarProjectFillImage = MO.Lang.Object.dispose(o._pbarProjectFillImage);
   o._indicatorLightOff_0 = MO.Lang.Object.dispose(o._indicatorLightOff_0);
   o._indicatorLightOff_1 = MO.Lang.Object.dispose(o._indicatorLightOff_1);
   o._indicatorLightOff_2 = MO.Lang.Object.dispose(o._indicatorLightOff_2);
   o._indicatorLightOn_0 = MO.Lang.Object.dispose(o._indicatorLightOn_0);
   o._indicatorLightOn_1 = MO.Lang.Object.dispose(o._indicatorLightOn_1);
   o._indicatorLightOn_2 = MO.Lang.Object.dispose(o._indicatorLightOn_2);
   o._fontTitle = MO.Lang.Object.dispose(o._fontTitle);
   o._fontSponsor = MO.Lang.Object.dispose(o._fontSponsor);
   o._font2ndRow = MO.Lang.Object.dispose(o._font2ndRow);
   o._fontProgress = MO.Lang.Object.dispose(o._fontProgress);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
