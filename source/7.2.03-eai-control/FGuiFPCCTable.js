//==========================================================
// <T>页面对象。</T>
//
// @class
// @author sunpeng
// @version 150710
//==========================================================
MO.FGuiFPCCTable = function FGuiFPCCTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._frameTime = MO.Class.register(o, new MO.AGetSet('_frameTime'));
   // @attribute
   o._ready = MO.Class.register(o, new MO.AGetSet('_ready'), false);
   //..........................................................
   // @method
   //o.play = FGuiFPCCTable_play;
   //o.pause = FGuiFPCCTable_pause;
   //o.stop = FGuiFPCCTable_stop;
   // @method
   o.setup = MO.FGuiFPCCTable_setup;
   o.onPaintBegin = MO.FGuiFPCCTable_onPaintBegin;
   o.onImageLoad = MO.FGuiFPCCTable_onImageLoad;
   o.drawRectangleByText = MO.FGuiFPCCTable_drawRectangleByText;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiFPCCTable_setup = function FGuiFPCCTable_setup() {
   var o = this;
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   o._tableTitleFontStyle = '16px Microsoft songti';

}

//==========================================================
// <T>图片加载完成后重绘。</T>
//
// @method
//==========================================================
MO.FGuiFPCCTable_onImageLoad = function FGuiFPCCTable_onImageLoad() {
   var o = this;
   if (--o._imageToLoad == 0) {
      o._ready = true;
      o._lastTick = MO.Timer.current();
      o.dirty();
   }
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiFPCCTable_onPaintBegin = function FGuiFPCCTable_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //数据加载
   var left = rectangle.left;
   var top = rectangle.top;
   var height = rectangle.height;
   var width = rectangle.width;
   var padding = 6;
   //列表矩形
   graphic.drawRectangle(left, top, width, height, "#fff", 1);
   //标题
   var titleText = "理财师业绩展示中心";
   var titleHeight = 30;
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var titleLeft = left + (width - titleWidth) * 0.5;
   var titleTop = top + padding + titleHeight;
   graphic.setFont(o._headFontStyle);
   graphic.drawText(titleText, titleLeft, titleTop, '#55FFED');
   //理财师排行榜
   var rankLeft = left + padding;
   var rankTop = titleTop + padding * 2;
   var rankWidth = width - padding * 2;
   var rankHeight = 40;
   var rankCount = 3;
   var rankLastTop = 0;
   for (var i = 1; i <= rankCount; i++) {
      if (i == 1)
         graphic.drawRectangle(rankLeft, rankTop, rankWidth, rankHeight, "#fff", 1);
      else
         graphic.drawRectangle(rankLeft, rankTop + rankHeight * (i - 1), rankWidth, rankHeight, "#fff", 1);

      if (i == 3) {
         rankLastTop = rankTop + rankHeight * (i - 1) + rankHeight;
      }
   }
   //理财师实时表
   var realtimeListTop = rankLastTop + padding;
   var realtimeListHeight = height - rankLastTop - padding;
   graphic.drawRectangle(rankLeft, realtimeListTop, rankWidth, realtimeListHeight, "#fff", 1);
   //理财师实时表－标题
   var tableTitleTexts = new Array('时间', '公司', '理财师', '理财师业绩', '注册/投资', '投资/赎回');
   var tableTitleTextLeft = rankLeft + padding;
   var tableTitleTextHeight = 16;
   var tableTextMargin = 2;
   var tableTextPadding = 7;

   graphic.setFont(o._tableTitleFontStyle);
   for (var j = 0; j < tableTitleTexts.length; j++) {
      var tableText = tableTitleTexts[j];
      var tableTextWidth = graphic.textWidth(tableText);
      var tableTextTop = realtimeListTop + tableTitleTextHeight + tableTextPadding;
      //标题绘制
      if (j == 0) {
         //         graphic.drawRectangle(tableTitleTextLeft - tableTextMargin, tableTextTop - tableTitleTextHeight - tableTextMargin, tableTextWidth + tableTextMargin * 2, tableTitleTextHeight + tableTextMargin * 4, "#ff6d4b", 1);
         graphic.drawText(tableText, tableTitleTextLeft, tableTextTop, "#fff");
         o.drawRectangleByText(graphic, tableText, 16, "#7798f2", 1, tableTitleTextLeft, tableTextTop, 1);
      } else {
         var tableTextWidthBefore = graphic.textWidth(tableTitleTexts[j - 1]);
         tableTitleTextLeft = tableTitleTextLeft + tableTextWidthBefore + tableTextPadding;
         //         graphic.drawRectangle(tableTitleTextLeft - tableTextMargin, tableTextTop - tableTitleTextHeight - tableTextMargin, tableTextWidth + tableTextMargin * 2, tableTitleTextHeight + 2 + tableTextMargin * 4, "#ff6d4b", 1);
         graphic.drawText(tableText, tableTitleTextLeft, tableTextTop, "#fff");
         o.drawRectangleByText(graphic, tableText, 16, "#ff6d4b", 1, tableTitleTextLeft, tableTextTop, 1);
      }
   }
}

MO.FGuiFPCCTable_drawRectangleByText = function FGuiFPCCTable_drawRectangleByText(graphic, text, textHeight, color, lineWidth, x, y, padding) {
   padding = padding * 1.5;
   var left = x - padding;
   var top = y - padding - textHeight;
   var textWidth = graphic.textWidth(text);
   var width = padding + textWidth;
   var height = textHeight + padding * 4;
   graphic.drawRectangle(left, top, width, height, color, lineWidth);
}