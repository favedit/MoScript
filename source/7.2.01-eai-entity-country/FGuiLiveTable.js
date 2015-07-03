//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 150702
//==========================================================
MO.FGuiLiveTable = function FGuiLiveTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._currentDate          = null;
   o._rank                 = MO.Class.register(o, new MO.AGetSet('_rank'));
   o._data                 = MO.Class.register(o, new MO.AGetSet('_data'));
   // @attribute
   o._rankLogoImage        = null;
   o._rankLineImage        = null;
   o._rankLinePadding      = null;
   o._rank1Image           = null;
   o._rank2Image           = null;
   o._rank3Image           = null;
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   // @attribute
   o._columnLabels         = null;
   o._columnDefines        = null;
   o._columnWidths         = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FGuiLiveTable_onImageLoad;
   //..........................................................
   // @method
   o.construct             = MO.FGuiLiveTable_construct;
   // @method
   o.setup                 = MO.FGuiLiveTable_setup;
   o.drawRow               = MO.FGuiLiveTable_drawRow;
   o.onPaintBegin          = MO.FGuiLiveTable_onPaintBegin;
   // @method
   o.dispose               = MO.FGuiLiveTable_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FGuiLiveTable_onImageLoad = function FGuiLiveTable_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiLiveTable_construct = function FGuiLiveTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 创建属性
   o._currentDate = MO.TDate();
   o._rankLinePadding = new MO.SPadding(80, 0, 80, 0);
   o._backgroundPadding = new MO.SPadding(80, 80, 80, 80);
   o._columnLabels = new Array('时间', '城市', '顾客-手机尾号', '投资额(元)');
   o._columnDefines = new Array(110, 110, 160, 166);
   o._columnWidths = new Array();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FGuiLiveTable_setup = function FGuiLiveTable_setup() {
   var o = this;
   // 创建图片
   var image = o._logoImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/logo.png');
   // 创建图片
   var image = o._backgroundImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/grid.png');
   // 创建图片
   var image = o._rankLineImage = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/line.png');
   // 创建图片
   var image = o._rank1Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/1.png');
   // 创建图片
   var image = o._rank2Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/2.png');
   // 创建图片
   var image = o._rank3Image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl('../ars/eai/statistics/3.png');
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FGuiLiveTable_drawRow = function FGuiLiveTable_drawRow(graphic, entity, flag, index, x, y, width){
   var o = this;
   var widths = o._columnWidths;
   var fontColor = null;
   if(flag){
      fontColor = '#59FDE9';
   }else{
      fontColor = '#1DACE5';
   }
   // 绘制底框
   if(flag){
      if(o._rankLineImage.testReady()){
         graphic.drawGridImage(o._rankLineImage, x - 5, y - 32, width - 14, 51, o._rankLinePadding);
      }
      var columnWidth = widths[0];
      var imageX = x + (columnWidth * 0.5) - 23;
      var imageY = y - 25;
      if((index == 0) && o._rank1Image.testReady()){
         graphic.drawImage(o._rank1Image, imageX, imageY, 46, 37);
      }
      if((index == 1) && o._rank2Image.testReady()){
         graphic.drawImage(o._rank2Image, imageX, imageY, 46, 37);
      }
      if((index == 2) && o._rank3Image.testReady()){
         graphic.drawImage(o._rank3Image, imageX, imageY, 46, 37);
      }
   }
   // 绘制时间
   if(!flag){
      o._currentDate.parse(entity.date());
      var text = o._currentDate.format('HH24:MI:SS');
      var textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[0] / 2 - textWidth / 2, y, fontColor);
   }
   // 绘制城市
   x += widths[0] + 1;
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var cityEntity = cityConsole.findCityByCard(entity.card());
   text = '';
   if (cityEntity) {
      text = cityEntity.label();
   }
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[1] / 2 - textWidth / 2, y, fontColor);
   // 绘制人员
   x += widths[1] + 1;
   text = entity.customer() + ' - ' + entity.phone();
   textWidth = graphic.textWidth(text);
   graphic.drawText(text, x + widths[2] / 2 - textWidth / 2, y, fontColor);
   // 绘制颜色
   x += widths[2] + 1;
   var investment = MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   if (investment.length > 7) {
      var highColor = null;
      if(investment.length > 9){
         highColor = '#FDEF01';
      }else{
         highColor = '#EB6C03';
      }
      var high = investment.substring(0, investment.length - 7);
      var low = investment.substring(investment.length - 7, investment.length);
      var highWidth = graphic.textWidth(high);
      var lowWidth = graphic.textWidth(low);
      graphic.drawText(high, x + widths[3] - 5 - lowWidth - highWidth, y, highColor);
      graphic.drawText(low, x + widths[3] - 5 - lowWidth, y, fontColor);
   } else {
      text = investment;
      textWidth = graphic.textWidth(text);
      graphic.drawText(text, x + widths[3] - 5 - textWidth, y, fontColor);
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiLiveTable_onPaintBegin = function FGuiLiveTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var widthRate = width / o._size.width;
   var heightRate = height / o._size.height;
   for(var i = 0; i < 4; i++){
      o._columnWidths[i] = o._columnDefines[i] * widthRate;
   }
   var drawLeft = left + 8;
   //..........................................................
   // 绘制背景
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   //..........................................................
   // 绘制标题
   var titleText = '钰诚控股 - e租宝';
   graphic.setFont('bold 30px Microsoft YaHei');
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (right - left) / 2 - (titleWidth / 2);
   if(o._logoImage.testReady()){
      graphic.drawImage(o._logoImage, textLeft - 77, top + 35, 62, 62);
   }
   graphic.drawText(titleText, textLeft, top + 76, '#00B2F2');
   drawPosition += 70
   //..........................................................
   // 绘制表头
   graphic.setFont('22px Microsoft YaHei');
   var headText = '';
   var headTextWidth = 0;
   var headLeft = drawLeft;
   var headTop = top + 116;
   var headTextTop = headTop + 26;
   var headHeight = 40;
   for(var i = 0; i < 4; i++){
      var headText = o._columnLabels[i];
      var headTextWidth = graphic.textWidth(headText);
      graphic.fillRectangle(headLeft, headTop, o._columnWidths[i], headHeight, '#122A46');
      graphic.drawText(headText, headLeft + o._columnWidths[i] / 2 - headTextWidth / 2, headTextTop, '#00B2F2');
      headLeft += o._columnWidths[i] + 2;
   }
   //..........................................................
   // 绘制前3名
   var rankEntity = o._rank;
   if(rankEntity){
      graphic.setFont('22px Microsoft YaHei');
      var tableTop = top + 190;
      var tableText = '';
      var tableTextWidth = 0;
      var dataEntities = o._data;
      var count = rankEntity.count();
      for(var i = 0; i < count; i++) {
         var entity = rankEntity.at(i);
         o.drawRow(graphic, entity, true, i, drawLeft, tableTop + 44 * i, width);
      }
   }
   //..........................................................
   // 绘制即时列表
   var dataEntities = o._data;
   if(dataEntities){
      graphic.setFont('22px Microsoft YaHei');
      var tableTop = top + 320;
      var tableText = '';
      var tableTextWidth = 0;
      var count = dataEntities.count();
      for(var i = 0; i < count; i++) {
         var entity = dataEntities.at(i);
         o.drawRow(graphic, entity, false, i, drawLeft, tableTop + 32 * i, width);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiLiveTable_dispose = function FGuiLiveTable_dispose(){
   var o = this;
   o._backgroundPadding = RObject.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
