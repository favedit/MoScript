//==========================================================
// <T>表格列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FUiGridColumn = function FUiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiComponent, MO.MUiTextFormator);
   //..........................................................
   // @attribute
   o._grid      = MO.Class.register(o, new AGetSet('_grid'));
   o._index     = MO.Class.register(o, new AGetSet('_index'), -1);
   o._width     = MO.Class.register(o, new AGetSet('_width'), 100);
   // @attribute
   o._cellClass = MO.FUiGridCell;
   //..........................................................
   // @method
   o.createCell = MO.FUiGridColumn_createCell;
   // @method
   o.dispose    = MO.FUiGridColumn_dispose;
   return o;
}

//==========================================================
// <T>创建单元格。</T>
//
// @method
// @param clazz:Function 类对象
// @return FCell 单元格
//==========================================================
MO.FUiGridColumn_createCell = function FUiGridColumn_createCell(clazz){
   var o = this;
   var cell = MO.Class.create(MO.Runtime.nvl(clazz, o._cellClass));
   cell.setGrid(o._grid);
   cell.setColumn(o);
   return cell;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiGridColumn_dispose = function FUiGridColumn_dispose(){
   var o = this;
   // 释放属性
   o._grid = null;
   o._cellClass = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
