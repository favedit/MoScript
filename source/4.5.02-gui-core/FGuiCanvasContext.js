//==========================================================
// <T>界面渲染环境。</T>
//
// @class
// @author maocy
// @history 150805
//==========================================================
MO.FGuiCanvasContext = function FGuiCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dCanvasContext);
   //..........................................................
   // @method
   o.construct    = MO.FGuiCanvasContext_construct;
   // @method
   o.drawFontText = MO.FGuiCanvasContext_drawFontText;
   // @method
   o.dispose      = MO.FGuiCanvasContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasContext_construct = function FGuiCanvasContext_construct() {
   var o = this;
   o.__base.FG2dCanvasContext.construct.call(o);
}

//==========================================================
// <T>绘制文字。</T>
//
// @method
// @param text:String 文本
// @param font:SUiFont 字体
// @param x:Integer 横坐标
// @param y:Integer 纵坐标
// @param width:Integer 高度
// @param height:Integer 宽度
// @param alignCd:EUiAlign 对齐方式
//==========================================================
MO.FGuiCanvasContext_drawFontText = function FGuiCanvasContext_drawFontText(text, font, x, y, width, height, alignCd){
   var o = this;
   // 检查参数
   if(MO.Lang.String.isEmpty(text)){
      return;
   }
   // 计算位置
   var handle = o._handle;
   handle.font = font.toString();
   //handle.textBaseline = 'top';
   handle.fillStyle = font.color;
   var textWidth = o.textWidth(text);
   var cx = x + (width - textWidth) * 0.5;
   var cy = y + (height - font.size) * 0.5 + font.size;
   // 绘制文字
   if(alignCd == MO.EUiAlign.Left){
      handle.fillText(text, x, cy);
   }else if(alignCd == MO.EUiAlign.Right){
      handle.fillText(text, x + (width - textWidth), cy);
   }else if(alignCd == MO.EUiAlign.Center){
      handle.fillText(text, cx, cy);
   }else{
      throw new MO.TError('Invalid align type.');
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiCanvasContext_dispose = function FGuiCanvasContext_dispose() {
   var o = this;
   o.__base.FG2dCanvasContext.dispose.call(o);
}
