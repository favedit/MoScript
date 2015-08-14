//==========================================================
// <T>界面表格渲染环境。</T>
//
// @struct
//==========================================================
MO.SGuiGridPaintContext = function SGuiGridPaintContext(){
   var o = this;
   //..........................................................
   // @attribute
   o.graphic   = null;
   o.rectangle = new MO.SRectangle();
   o.style     = new MO.SUiGridCellStyle();
   //..........................................................
   // @method
   o.dispose   = MO.SGuiGridPaintContext_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiGridPaintContext_dispose = function SGuiGridPaintContext_dispose(){
   var o = this;
   o.graphic = null;
   o.rectangle = MO.Lang.Object.dispose(o.rectangle);
   o.style = MO.Lang.Object.dispose(o.style);
}
