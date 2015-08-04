//==========================================================
// <T>表格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridControl = function MUiGridControl(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._displayCount = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
   o._headHeight   = MO.Class.register(o, new MO.APtyInteger('_headHeight'), 48);
   o._rowHeight    = MO.Class.register(o, new MO.APtyInteger('rowHeight'), 0);
   //..........................................................
   // @attribute
   o._columns      = MO.Class.register(o, new MO.AGetter('_columns'));
   o._rowClass     = MO.FUiGridRow;
   o._rows         = MO.Class.register(o, new MO.AGetter('_rows'));
   // @attribute
   o._focusRow     = null;
   o._focusCell    = null;
   //..........................................................
   // @method
   o.construct     = MO.MUiGridControl_construct;
   // @method
   o.createRow     = MO.MUiGridControl_createRow;
   o.pushColumn    = MO.MUiGridControl_pushColumn;
   o.pushRow       = MO.MUiGridControl_pushRow;
   // @method
   o.dispose       = MO.MUiGridControl_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridControl_construct = function MUiGridControl_construct(){
   var o = this;
   o._columns = new MO.TDictionary();
   o._rows = new MO.TObjects();
}

//==========================================================
// <T>创建一个行对象。</T>
//
// @method
// @return FUiGridRow 行控件
//==========================================================
MO.MUiGridControl_createRow = function MUiGridControl_createRow(clazz){
   var o = this;
   var row = MO.Class.create(MO.Runtime.nvl(clazz, o._rowClass));
   row.setTable(o);
   return row;
}

//==========================================================
// <T>增加一个列对象。</T>
//
// @method
// @return FUiGridRow 行控件
//==========================================================
MO.MUiGridControl_pushColumn = function MUiGridControl_pushColumn(column){
   var o = this;
   var columns = o._columns;
   var name = column.name();
   column.setGrid(o);
   column.setIndex(columns.count());
   columns.set(name, column);
}

//==========================================================
// <T>创建一个行对象。</T>
//
// @method
// @return FUiGridRow 行控件
//==========================================================
MO.MUiGridControl_pushRow = function MUiGridControl_pushRow(row){
   var o = this;
   row.setGrid(o);
   o._rows.push(row);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridControl_dispose = function MUiGridControl_dispose(){
   var o = this;
   // 释放属性
   o._columns = MO.Lang.Object.dispose(o._columns);
   o._rowClass = null;
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._focusRow = null;
   o._focusCell = null;
}
