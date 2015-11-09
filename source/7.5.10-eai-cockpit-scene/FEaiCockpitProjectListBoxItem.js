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
   o._pbarTimeBgImage      = null;
   o._pbarTimeFillImage    = null;
   o._pbarProjectBgImage   = null;
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
   // @method
   o.dispose         = MO.FEaiCockpitProjectListBoxItem_dispose;
   return o;
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

   o._fontTitle.parse('bold #FFFFFF 22px Microsoft YaHei');
   o._fontSponsor.parse('bold #FFFFFF 18px Microsoft YaHei');
   o._font2ndRow.parse('bold #FFFFFF 15px Microsoft YaHei');
   o._fontProgress.parse('bold #FFFFFF 19px Microsoft YaHei');

   var imageConsole = MO.Console.find(MO.FImageConsole);
   o._bgImage = imageConsole.load('{eai.resource}/cockpit/project/item_bg.png');
   o._pbarTimeBgImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_time_bg.png');
   o._pbarTimeFillImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_time_fill.png');
   o._pbarProjectBgImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_project_bg.png');
   o._pbarProjectFillImage = imageConsole.load('{eai.resource}/cockpit/project/pgbar_project_fill.png');
   o._indicatorLightOff_0 = imageConsole.load('{eai.resource}/cockpit/notice/progress_bad.png');
   o._indicatorLightOff_1 = imageConsole.load('{eai.resource}/cockpit/notice/progress_bad.png');
   o._indicatorLightOff_2 = imageConsole.load('{eai.resource}/cockpit/notice/progress_bad.png');
   o._indicatorLightOn_0 = imageConsole.load('{eai.resource}/cockpit/notice/progress_good.png');
   o._indicatorLightOn_1 = imageConsole.load('{eai.resource}/cockpit/notice/progress_good.png');
   o._indicatorLightOn_2 = imageConsole.load('{eai.resource}/cockpit/notice/progress_good.png');
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectListBoxItem_draw = function FEaiCockpitProjectListBoxItem_draw(graphic, rectangle) {
   var o = this;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;

   //graphic.drawRectangle(left, top, width, height, 'red', 1);

   var drawX = left + 10;
   var drawY = top + 26;

   // 绘制背景

   graphic.drawImage(o._bgImage, left, top, 320, 120);

   var fontTitle = o._fontTitle;
   var fontSponsor = o._fontSponsor;
   var font2ndRow = o._font2ndRow;
   var fontProgress = o._fontProgress;

   var unit = o._unit;
   var textWidth = 0;
   // 绘制第一行
   drawText = unit.name();
   graphic.setFont(fontTitle.toString());
   graphic.drawText(drawText, drawX, drawY, fontTitle.color);

   drawX = 205;
   drawY -= 2;
   var drawText = '责任人：';
   graphic.setFont(fontSponsor.toString());
   graphic.drawText(drawText, drawX, drawY, fontSponsor.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;

   drawText = unit.uname();
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
   drawY -= 15;
   graphic.drawImage(o._indicatorLightOff_0, drawX, drawY, 20, 20);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_1, drawX, drawY, 20, 20);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_2, drawX, drawY, 20, 20);

   bakDrawX += unit.priority() * 20;
   graphic.drawImage(o['_indicatorLightOn_' + unit.priority()], bakDrawX, drawY, 20, 20);

   drawX = 190;
   drawY += 15;
   drawText = '状态指示灯';
   graphic.setFont(font2ndRow.toString());
   graphic.drawText(drawText, drawX, drawY, font2ndRow.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;
   
   drawX += 10;
   var bakDrawX = drawX;
   drawY -= 15;
   graphic.drawImage(o._indicatorLightOff_0, drawX, drawY, 20, 20);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_1, drawX, drawY, 20, 20);
   drawX += 20;
   graphic.drawImage(o._indicatorLightOff_2, drawX, drawY, 20, 20);

   bakDrawX += unit.status() * 20;
   graphic.drawImage(o['_indicatorLightOn_' + unit.status()], bakDrawX, drawY, 20, 20);

   // 绘制第三行
   drawX = left + 10;
   drawY += 44;

   drawText = '时间进度';
   graphic.setFont(fontProgress.toString());
   graphic.drawText(drawText, drawX, drawY, fontProgress.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth + 10;
   drawY -= 15;
   graphic.drawImage(o._pbarTimeBgImage, drawX, drawY, 216, 21);

   var clipWidth = 216 * unit.timeProgress() * 0.01;
   var clipHeight = 21;
   graphic._handle.save();
   graphic._handle.rect(drawX, drawY, clipWidth, 21)
   graphic._handle.clip();
   graphic.drawImage(o._pbarTimeFillImage, drawX, drawY, 216, 21);
   graphic._handle.restore();

   drawY += 15;
   drawText = unit.timeProgress() + '%';
   graphic.setFont(fontProgress.toString());
   textWidth = graphic.textWidth(drawText);
   drawX = drawX + (216 - textWidth) * 0.5;
   graphic.drawText(drawText, drawX, drawY, fontProgress.color);

   // 绘制第四行
   drawX = left + 10;
   drawY += 28;

   drawText = '项目进度';
   graphic.setFont(fontProgress.toString());
   graphic.drawText(drawText, drawX, drawY, fontProgress.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth + 10;
   drawY -= 15;
   graphic.drawImage(o._pbarProjectBgImage, drawX, drawY, 216, 21);

   var clipWidth = 216 * unit.proProgress() * 0.01;
   var clipHeight = 21;
   graphic._handle.save();
   graphic._handle.rect(drawX, drawY, clipWidth, 21)
   graphic._handle.clip();
   graphic.drawImage(o._pbarProjectFillImage, drawX, drawY, 216, 21);
   graphic._handle.restore();

   drawY += 15;
   drawText = unit.proProgress() + '%';
   graphic.setFont(fontProgress.toString());
   textWidth = graphic.textWidth(drawText);
   drawX = drawX + (216 - textWidth) * 0.5;
   graphic.drawText(drawText, drawX, drawY, fontProgress.color);
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
   o._pbarTimeFillImage = MO.Lang.Object.dispose(o._pbarTimeFillImage);
   o._pbarProjectBgImage = MO.Lang.Object.dispose(o._pbarProjectBgImage);
   o._pbarProjectFillImage = MO.Lang.Object.dispose(o._pbarProjectFillImage);
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
