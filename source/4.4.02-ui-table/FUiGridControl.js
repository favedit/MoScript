//==========================================================
// <T>表格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FUiGridControl = function FUiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @property
   o._displayCount = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
   o._rowHeight    = MO.Class.register(o, new MO.APtyInteger('rowHeight'), 0);
   //..........................................................
   // @attribute
   o._columns      = MO.Class.register(o, new AGetter('_columns'));
   o._rowClass     = MO.FUiGridRow;
   o._rows         = MO.Class.register(o, new AGetter('_rows'));
   // @attribute
   o._focusRow     = null;
   o._focusCell    = null;
   //..........................................................
   // @method
   o.construct    = FUiGridControl_construct;
   // @method
   o.createRow    = FUiGridControl_createRow;
   o.pushColumn   = FUiGridControl_pushColumn;
   o.pushRow      = FUiGridControl_pushRow;
   // @method
   o.dispose      = FUiGridControl_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiGridControl_construct = function FUiGridControl_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 初始化
   o._columns = new MO.TDictionary();
   o._rows = new MO.TObjects();
}

//==========================================================
// <T>创建一个行对象。</T>
//
// @method
// @return FUiGridRow 行控件
//==========================================================
MO.FUiGridControl_createRow = function FUiGridControl_createRow(clazz){
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
MO.FUiGridControl_pushColumn = function FUiGridControl_pushColumn(column){
   var o = this;
   var name = column.name();
   o._columns.set(name, column);
}

//==========================================================
// <T>创建一个行对象。</T>
//
// @method
// @return FUiGridRow 行控件
//==========================================================
MO.FUiGridControl_pushRow = function FUiGridControl_pushRow(row){
   var o = this;
   o._rows.push(row);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiGridControl_dispose = function FUiGridControl_dispose(){
   var o = this;
   // 释放属性
   o._columns = MO.Lang.Object.dispose(o._columns);
   o._rowClass = null;
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._focusRow = null;
   o._focusCell = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
