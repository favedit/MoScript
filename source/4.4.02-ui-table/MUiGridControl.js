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
   // @attribute
   o._displayHead   = MO.Class.register(o, new MO.AGetSet('_displayHead'), true);
   o._displayFooter = MO.Class.register(o, new MO.AGetSet('_displayFooter'), true);
   o._displayCount  = MO.Class.register(o, new MO.AGetSet('_displayCount'), 20);
   // @attribute
   o._columns       = MO.Class.register(o, new MO.AGetter('_columns'));
   // @attribute
   o._headFont      = MO.Class.register(o, new MO.AGetter('_headFont'));
   o._headBackColor = MO.Class.register(o, new MO.AGetSet('_headBackColor'), '#000000');
   o._headHeight    = MO.Class.register(o, new MO.AGetSet('_headHeight'), 32);
   // @attribute
   o._rowClass      = MO.FUiGridRow;
   o._rowFont       = MO.Class.register(o, new MO.AGetter('_rowFont'));
   o._rowHeight     = MO.Class.register(o, new MO.AGetSet('_rowHeight'), 28);
   o._rowLimitCount = MO.Class.register(o, new MO.AGetter('_rowLimitCount'), 0);
   o._rows          = MO.Class.register(o, new MO.AGetter('_rows'));
   o._rowPool       = null;
   // @attribute
   o._focusRow      = null;
   o._focusCell     = null;
   //..........................................................
   // @method
   o.construct      = MO.MUiGridControl_construct;
   // @method
   o.createRow      = MO.MUiGridControl_createRow;
   o.allocRow       = MO.MUiGridControl_allocRow;
   o.freeRow        = MO.MUiGridControl_freeRow;
   o.pushColumn     = MO.MUiGridControl_pushColumn;
   o.pushRow        = MO.MUiGridControl_pushRow;
   o.clearRows      = MO.MUiGridControl_clearRows;
   // @method
   o.dispose        = MO.MUiGridControl_dispose;
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
   o._headFont = new MO.SUiFont();
   o._rows = new MO.TObjects();
   o._rowFont = new MO.SUiFont();
   o._rowPool = MO.Class.create(MO.FObjectPool);
}

//==========================================================
// <T>创建一个行对象。</T>
//
// @method
// @param clazz:Function 类对象
// @return FUiGridRow 行控件
//==========================================================
MO.MUiGridControl_createRow = function MUiGridControl_createRow(clazz){
   var o = this;
   // 创建行对象
   var row = MO.Class.create(MO.Runtime.nvl(clazz, o._rowClass));
   row.setGrid(o);
   // 创建格子集合
   var columns = o._columns;
   var count = columns.count();
   for(var i = 0; i < count; i++){
      var column = columns.at(i);
      var cell = column.createCell();
      row.pushCell(cell);
   }
   return row;
}

//==========================================================
// <T>收集一个行对象。</T>
//
// @method
// @param clazz:Function 类对象
// @return FUiGridRow 行控件
//==========================================================
MO.MUiGridControl_allocRow = function MUiGridControl_allocRow(clazz){
   var o = this;
   var row = null;
   var pool = o._rowPool;
   if(pool.hasFree()){
      row = pool.alloc();
   }else{
      row = o.createRow(clazz);
   }
   return row;
}

//==========================================================
// <T>释放一个行对象。</T>
//
// @method
// @param row:FUiGridRow 行控件
//==========================================================
MO.MUiGridControl_freeRow = function MUiGridControl_freeRow(row){
   this._rowPool.free(row);
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
// <T>清空行对象集合。</T>
//
// @method
//==========================================================
MO.MUiGridControl_clearRows = function MUiGridControl_clearRows(){
   var o = this;
   var rows = o._rows;
   var count = rows.count();
   for(var i = 0; i < count; i++){
      var row = rows.at(i);
      o.freeRow(row);
   }
   rows.clear();
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
   o._rowPool = MO.Lang.Object.dispose(o._rowPool);
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._focusRow = null;
   o._focusCell = null;
   o._rowFont = null;
}
