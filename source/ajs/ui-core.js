MO.FUiCanvas = function FUiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE2dCanvas);
   o.createContext = MO.FUiCanvas_createContext;
   return o;
}
MO.FUiCanvas_createContext = function FUiCanvas_createContext(){
   return MO.Class.create(MO.FUiCanvasContext);
}
MO.FUiCanvasContext = function FUiCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dCanvasContext);
   o.construct    = MO.FUiCanvasContext_construct;
   o.drawFontText = MO.FUiCanvasContext_drawFontText;
   o.dispose      = MO.FUiCanvasContext_dispose;
   return o;
}
MO.FUiCanvasContext_construct = function FUiCanvasContext_construct() {
   var o = this;
   o.__base.FG2dCanvasContext.construct.call(o);
}
MO.FUiCanvasContext_drawFontText = function FUiCanvasContext_drawFontText(text, font, x, y, width, height, alignCd){
   var o = this;
   if(MO.Lang.String.isEmpty(text)){
      return;
   }
   var handle = o._handle;
   handle.font = font.toString();
   handle.fillStyle = font.color;
   var textWidth = o.textWidth(text);
   var cx = x + (width - textWidth) * 0.5;
   var cy = y + (height - font.size) * 0.5 + font.size;
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
MO.FUiCanvasContext_dispose = function FUiCanvasContext_dispose() {
   var o = this;
   o.__base.FG2dCanvasContext.dispose.call(o);
}
