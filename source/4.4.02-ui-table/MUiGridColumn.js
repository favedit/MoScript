//==========================================================
// <T>表格列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridColumn = function MUiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.MUiPadding, MO.MUiMargin, MO.MUiTextFormator);
   //..........................................................
   // @attribute
   o._grid        = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._index       = MO.Class.register(o, new MO.AGetSet('_index'), -1);
   // @attribute
   o._name        = MO.Class.register(o, new MO.AGetSet('_name'));
   o._label       = MO.Class.register(o, new MO.AGetSet('_label'));
   o._dataName    = MO.Class.register(o, new MO.AGetSet('_dataName'));
   // @attribute
   o._backColor   = MO.Class.register(o, new MO.AGetSet('_backColor'));
   o._font        = MO.Class.register(o, new MO.AGetter('_font'));
   o._width       = MO.Class.register(o, new MO.AGetSet('_width'), 100);
   o._realWidth   = MO.Class.register(o, new MO.AGetSet('_realWidth'), 100);
   o._alignCd     = MO.Class.register(o, new MO.AGetSet('_alignCd'), MO.EUiAlign.Left);
   o._cellPadding = MO.Class.register(o, new MO.AGetter('_cellPadding'));
   // @attribute
   o._cellClass   = null;
   //..........................................................
   // @method
   o.construct    = MO.MUiGridColumn_construct;
   // @method
   o.createCell   = MO.MUiGridColumn_createCell;
   // @method
   o.findFont     = MO.MUiGridColumn_findFont;
   // @method
   o.dispose      = MO.MUiGridColumn_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumn_construct = function MUiGridColumn_construct(){
   var o = this;
   o.__base.MUiPadding.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
   // 设置属性
   o._cellPadding = new MO.SPadding();
}

//==========================================================
// <T>创建单元格。</T>
//
// @method
// @return FGuiGridCellText 单元格
//==========================================================
MO.MUiGridColumn_createCell = function MUiGridColumn_createCell(clazz){
   var o = this;
   var cell = MO.Class.create(MO.Runtime.nvl(clazz, o._cellClass));
   cell.setGrid(o._grid);
   cell.setColumn(o);
   return cell;
}

//==========================================================
// <T>查找字体。</T>
//
// @method
// @return SUiFont 字体
//==========================================================
MO.MUiGridColumn_findFont = function MUiGridColumn_findFont(){
   var o = this;
   var font = o._font;
   if(!font){
      font = o._grid.headFont();
   }
   return font;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumn_dispose = function MUiGridColumn_dispose(){
   var o = this;
   // 释放属性
   o._grid = null;
   o._cellPadding = MO.Lang.Object.dispose(o._cellPadding);
   // 父处理
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
}
