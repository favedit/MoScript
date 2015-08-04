MO.FUiGridCell = function FUiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._grid      = MO.Class.register(o, new AGetSet('_grid'));
   o._column    = MO.Class.register(o, new AGetSet('_column'));
   o._row       = MO.Class.register(o, new AGetSet('_row'));
   o._value     = MO.Class.register(o, new AGetSet('_value'));
   o.text       = MO.FUiGridCell_text;
   o.setText    = MO.FUiGridCell_setText;
   o.dispose    = MO.FUiGridCell_dispose;
   return o;
}
MO.FUiGridCell_text = function FUiGridCell_text(){
   var o = this;
   var text = o._column.formatText(o._value);
   return text;
}
MO.FUiGridCell_setText = function FUiGridCell_setText(text){
   var o = this;
   var value = o._column.formatValue(text);
   o.setValue(value);
}
MO.FUiGridCell_dispose = function FUiGridCell_dispose(){
   var o = this;
   o._grid = null;
   o._column = null;
   o._row = null;
   o.__base.FObject.dispose.call(o);
}
MO.FUiGridCellText = function FUiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FUiGridCell);
   o.dispose    = MO.FUiGridCellText_dispose;
   return o;
}
MO.FUiGridCellText_dispose = function FUiGridCellText_dispose(){
   var o = this;
   o.__base.FUiGridCell.dispose.call(o);
}
MO.FUiGridColumn = function FUiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiComponent, MO.MUiTextFormator);
   o._grid      = MO.Class.register(o, new AGetSet('_grid'));
   o._index     = MO.Class.register(o, new AGetSet('_index'), -1);
   o._width     = MO.Class.register(o, new AGetSet('_width'), 100);
   o._cellClass = MO.FUiGridCell;
   o.createCell = MO.FUiGridColumn_createCell;
   o.dispose    = MO.FUiGridColumn_dispose;
   return o;
}
MO.FUiGridColumn_createCell = function FUiGridColumn_createCell(clazz){
   var o = this;
   var cell = MO.Class.create(MO.Runtime.nvl(clazz, o._cellClass));
   cell.setGrid(o._grid);
   cell.setColumn(o);
   return cell;
}
MO.FUiGridColumn_dispose = function FUiGridColumn_dispose(){
   var o = this;
   o._grid = null;
   o._cellClass = null;
   o.__base.FObject.dispose.call(o);
}
MO.FUiGridColumnText = function FUiGridColumnText(o){
   o = MO.Class.inherits(this, o, MO.FUiGridColumn);
   o.dispose = MO.FUiGridColumnText_dispose;
   return o;
}
MO.FUiGridColumnText_dispose = function FUiGridColumnText_dispose(){
   var o = this;
   o.__base.FUiGridColumn.dispose.call(o);
}
MO.FUiGridControl = function FUiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._displayCount = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
   o._rowHeight    = MO.Class.register(o, new MO.APtyInteger('rowHeight'), 0);
   o._columns      = MO.Class.register(o, new AGetter('_columns'));
   o._rowClass     = MO.FUiGridRow;
   o._rows         = MO.Class.register(o, new AGetter('_rows'));
   o._focusRow     = null;
   o._focusCell    = null;
   o.construct    = FUiGridControl_construct;
   o.createRow    = FUiGridControl_createRow;
   o.pushColumn   = FUiGridControl_pushColumn;
   o.pushRow      = FUiGridControl_pushRow;
   o.dispose      = FUiGridControl_dispose;
   return o;
}
MO.FUiGridControl_construct = function FUiGridControl_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._columns = new MO.TDictionary();
   o._rows = new MO.TObjects();
}
MO.FUiGridControl_createRow = function FUiGridControl_createRow(clazz){
   var o = this;
   var row = MO.Class.create(MO.Runtime.nvl(clazz, o._rowClass));
   row.setTable(o);
   return row;
}
MO.FUiGridControl_pushColumn = function FUiGridControl_pushColumn(column){
   var o = this;
   var name = column.name();
   o._columns.set(name, column);
}
MO.FUiGridControl_pushRow = function FUiGridControl_pushRow(row){
   var o = this;
   o._rows.push(row);
}
MO.FUiGridControl_dispose = function FUiGridControl_dispose(){
   var o = this;
   o._columns = MO.Lang.Object.dispose(o._columns);
   o._rowClass = null;
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._focusRow = null;
   o._focusCell = null;
   o.__base.FObject.dispose.call(o);
}
MO.FUiGridRow = function FUiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._grid    = MO.Class.register(o, new AGetSet('_grid'));
   o._cells    = MO.Class.register(o, new AGetter('_cells'));
   o.construct = FUiGridRow_construct;
   o.dispose   = FUiGridRow_dispose;
}
MO.FUiGridRow_construct = function FUiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._cells = new MO.TObjects();
}
MO.FUiGridRow_dispose = function FUiGridRow_dispose(){
   var o = this;
   o._grid = null;
   o._cells = MO.Lang.Object.dispose(o._cells);
   o.__base.FObject.dispose.call(o);
}
