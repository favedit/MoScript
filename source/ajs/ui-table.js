MO.MUiGridCell = function MUiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._grid      = MO.Class.register(o, new AGetSet('_grid'));
   o._column    = MO.Class.register(o, new AGetSet('_column'));
   o._row       = MO.Class.register(o, new AGetSet('_row'));
   o._value     = MO.Class.register(o, new AGetSet('_value'));
   o.text       = MO.MUiGridCell_text;
   o.setText    = MO.MUiGridCell_setText;
   o.dispose    = MO.MUiGridCell_dispose;
   return o;
}
MO.MUiGridCell_text = function MUiGridCell_text(){
   var o = this;
   var text = o._column.formatText(o._value);
   return text;
}
MO.MUiGridCell_setText = function MUiGridCell_setText(text){
   var o = this;
   var value = o._column.formatValue(text);
   o.setValue(value);
}
MO.MUiGridCell_dispose = function MUiGridCell_dispose(){
   var o = this;
   o._grid = null;
   o._column = null;
   o._row = null;
   o.__base.FObject.dispose.call(o);
}
MO.MUiGridCellText = function MUiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.MUiGridCell);
   o.dispose    = MO.MUiGridCellText_dispose;
   return o;
}
MO.MUiGridCellText_dispose = function MUiGridCellText_dispose(){
   var o = this;
   o.__base.MUiGridCell.dispose.call(o);
}
MO.MUiGridColumn = function MUiGridColumn(o){
   o = MO.Class.inherits(this, o);
   o._grid      = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._index     = MO.Class.register(o, new MO.AGetSet('_index'), -1);
   o._name      = MO.Class.register(o, new MO.AGetSet('_name'));
   o._label     = MO.Class.register(o, new MO.AGetSet('_label'));
   o._dataName  = MO.Class.register(o, new MO.AGetSet('_dataName'));
   o._font      = MO.Class.register(o, new MO.AGetter('_font'));
   o._width     = MO.Class.register(o, new MO.AGetSet('_width'), 100);
   o.construct  = MO.MUiGridColumn_construct;
   o.createCell = MO.Method.virtual(o, 'createCell');
   o.dispose    = MO.MUiGridColumn_dispose;
   return o;
}
MO.MUiGridColumn_construct = function MUiGridColumn_construct(){
   var o = this;
   o._font = new MO.SUiFont();
}
MO.MUiGridColumn_dispose = function MUiGridColumn_dispose(){
   var o = this;
   o._grid = null;
   o._font = MO.Lang.Object.dispose(o._font);
}
MO.MUiGridColumnText = function MUiGridColumnText(o){
   o = MO.Class.inherits(this, o);
   o.dispose = MO.MUiGridColumnText_dispose;
   return o;
}
MO.MUiGridColumnText_dispose = function MUiGridColumnText_dispose(){
   var o = this;
}
MO.MUiGridControl = function MUiGridControl(o){
   o = MO.Class.inherits(this, o);
   o._displayCount = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
   o._headHeight   = MO.Class.register(o, new MO.APtyInteger('_headHeight'), 48);
   o._rowHeight    = MO.Class.register(o, new MO.APtyInteger('rowHeight'), 0);
   o._columns      = MO.Class.register(o, new MO.AGetter('_columns'));
   o._rowClass     = MO.FUiGridRow;
   o._rows         = MO.Class.register(o, new MO.AGetter('_rows'));
   o._focusRow     = null;
   o._focusCell    = null;
   o.construct     = MO.MUiGridControl_construct;
   o.createRow     = MO.MUiGridControl_createRow;
   o.pushColumn    = MO.MUiGridControl_pushColumn;
   o.pushRow       = MO.MUiGridControl_pushRow;
   o.dispose       = MO.MUiGridControl_dispose;
   return o;
}
MO.MUiGridControl_construct = function MUiGridControl_construct(){
   var o = this;
   o._columns = new MO.TDictionary();
   o._rows = new MO.TObjects();
}
MO.MUiGridControl_createRow = function MUiGridControl_createRow(clazz){
   var o = this;
   var row = MO.Class.create(MO.Runtime.nvl(clazz, o._rowClass));
   row.setTable(o);
   return row;
}
MO.MUiGridControl_pushColumn = function MUiGridControl_pushColumn(column){
   var o = this;
   var columns = o._columns;
   var name = column.name();
   column.setGrid(o);
   column.setIndex(columns.count());
   columns.set(name, column);
}
MO.MUiGridControl_pushRow = function MUiGridControl_pushRow(row){
   var o = this;
   row.setGrid(o);
   o._rows.push(row);
}
MO.MUiGridControl_dispose = function MUiGridControl_dispose(){
   var o = this;
   o._columns = MO.Lang.Object.dispose(o._columns);
   o._rowClass = null;
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._focusRow = null;
   o._focusCell = null;
}
MO.MUiGridRow = function MUiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._grid    = MO.Class.register(o, new AGetSet('_grid'));
   o._cells    = MO.Class.register(o, new AGetter('_cells'));
   o.construct = MUiGridRow_construct;
   o.dispose   = MUiGridRow_dispose;
}
MO.MUiGridRow_construct = function MUiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._cells = new MO.TObjects();
}
MO.MUiGridRow_dispose = function MUiGridRow_dispose(){
   var o = this;
   o._grid = null;
   o._cells = MO.Lang.Object.dispose(o._cells);
   o.__base.FObject.dispose.call(o);
}
