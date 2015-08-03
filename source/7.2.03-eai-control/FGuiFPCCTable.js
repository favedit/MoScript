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
   // @attribute
   o._padding = 0;
   o._headFontText = null;
   o._headFontStyle = null;
   o._headFontHeight = 0;

   o._rankHeight = 0;
   o._rankCount = 0;

   o._tableTitleTexts = null;
   o._tableTitleTextHeight = 0;
   o._tableTextPadding = 0;
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
   o._headFontText = "理财师业绩展示中心";
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   o._headFontHeight = 30;

   o._padding = 6;
   o._rankHeight = 40;
   o._rankCount = 3;
   
   o._tableTitleTexts = new Array('时间', '公司', '理财师', '理财师业绩', '注册/投资', '投资/赎回');
   o._tableTitleFontStyle = '16px Microsoft songti';
   o._tableTitleTextHeight = 16;
   o._tableTextPadding = 7;

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
   //列表矩形
   graphic.drawRectangle(left, top, width, height, "#fff", 1);
   //标题
   graphic.setFont(o._headFontStyle);
   var headWidth = graphic.textWidth(o._headFontText);
   var headLeft = left + (width - headWidth) * 0.5;
   var headTop = top + o._padding + o._headFontHeight;
   graphic.setFont(o._headFontStyle);
   graphic.drawText(o._headFontText, headLeft, headTop, '#55FFED');
   //理财师排行榜
   var rankLeft = left + o._padding;
   var rankTop = headTop + o._padding * 2;
   var rankWidth = width - o._padding * 2;
   var rankLastTop = 0;
   for (var i = 1; i <= o._rankCount; i++) {
      if (i == 1)
         graphic.drawRectangle(rankLeft, rankTop, rankWidth, o._rankHeight, "#fff", 1);
      else
         graphic.drawRectangle(rankLeft, rankTop + o._rankHeight * (i - 1), rankWidth, o._rankHeight, "#fff", 1);

      if (i == 3) {
         rankLastTop = rankTop + o._rankHeight * (i - 1) + o._rankHeight;
      }
   }
   //理财师实时表
   var realtimeListTop = rankLastTop + o._padding;
   var realtimeListHeight = height - rankLastTop - o._padding;
   graphic.drawRectangle(rankLeft, realtimeListTop, rankWidth, realtimeListHeight, "#fff", 1);
   //理财师实时表－标题
   var tableTitleTextLeft = rankLeft + o._padding;
   graphic.setFont(o._tableTitleFontStyle);
   for (var j = 0; j < o._tableTitleTexts.length; j++) {
      var tableText = o._tableTitleTexts[j];
      var tableTextWidth = graphic.textWidth(tableText);
      var tableTextTop = realtimeListTop + o._tableTitleTextHeight + o._tableTextPadding;
      //标题与边框绘制
      if (j == 0) {
         graphic.drawText(tableText, tableTitleTextLeft, tableTextTop, "#fff");
         o.drawRectangleByText(graphic, tableText, o._tableTitleTextHeight, "#7798f2", 1, tableTitleTextLeft, tableTextTop, 1);
      } else {
         var tableTextWidthBefore = graphic.textWidth(o._tableTitleTexts[j - 1]);
         tableTitleTextLeft = tableTitleTextLeft + tableTextWidthBefore + o._tableTextPadding;
         graphic.drawText(tableText, tableTitleTextLeft, tableTextTop, "#fff");
         o.drawRectangleByText(graphic, tableText, o._tableTitleTextHeight, "#ff6d4b", 1, tableTitleTextLeft, tableTextTop, 1);
      }
   }
}
//==========================================================
// <T>绘制字外面的矩形。</T>
//
// @param graphic:dataValue:FG2dCanvasContext 画板
// @param text:dataValue:String    文字
// @param textHeight:dataValue:int 文字高度
// @param color:dataValue:String   矩形颜色
// @param lineWidth:dataValue:int  矩形线的宽度
// @param x:dataValue:int          文字X轴
// @param y:dataValue:int          文字Y轴
// @param padding:dataValue:int    文字与边框的距离
//
// @method
//==========================================================
MO.FGuiFPCCTable_drawRectangleByText = function FGuiFPCCTable_drawRectangleByText(graphic, text, textHeight, color, lineWidth, x, y, padding) {
   padding = padding * 1.5;
   var left = x - padding;
   var top = y - padding - textHeight;
   var textWidth = graphic.textWidth(text);
   var width = padding*2 + textWidth;
   var height = textHeight + padding * 4;
   graphic.drawRectangle(left, top, width, height, color, lineWidth);
}