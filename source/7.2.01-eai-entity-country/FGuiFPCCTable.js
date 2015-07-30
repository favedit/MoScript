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
   var padding = 5;
   //列表矩形
   graphic.drawRectangle(left, top, width, height, "#fff", 1);
   //标题
   var titleText = "理财师业绩展示中心";
   var titleHeight = 32;
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var titleLeft = left + (width - titleWidth) * 0.5;
   graphic.setFont(o._headFontStyle);
   graphic.drawText(titleText, titleLeft, top + padding, '#55FFED');
   //理财师排行榜
   var rankLeft = left + padding;
   var rankTop = top + titleHeight + padding * 2;
   var rankWidth = width - padding*2;
   var rankHeight = 40;
   for(){
      
   }
   graphic.drawRectangle(rankLeft, rankTop, rankWidth, rankHeight, "#fff", 1);




}