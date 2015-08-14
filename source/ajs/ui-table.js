MO.MUiGridCell = function MUiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._grid          = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._column        = MO.Class.register(o, new MO.AGetSet('_column'));
   o._row           = MO.Class.register(o, new MO.AGetSet('_row'));
   o._alignCd       = MO.Class.register(o, new MO.AGetSet('_alignCd'), MO.EUiAlign.Left);
   o._font          = MO.Class.register(o, new MO.AGetSet('_font'));
   o._value         = MO.Class.register(o, new MO.AGetSet('_value'));
   o.findFont       = MO.MUiGridCell_findFont;
   o.calculateStyle = MO.MUiGridCell_calculateStyle;
   o.text           = MO.MUiGridCell_text;
   o.setText        = MO.MUiGridCell_setText;
   o.dispose        = MO.MUiGridCell_dispose;
   return o;
}
MO.MUiGridCell_findFont = function MUiGridCell_findFont(){
   var o = this;
   var font = o._font;
   if(font){
      font = o._row.font();
   }
   if(!font){
      font = o._column.font();
   }
   if(!font){
      font = o._grid.rowFont();
   }
   return font;
}
MO.MUiGridCell_calculateStyle = function MUiGridCell_calculateStyle(style){
   var o = this;
   var row = o._row;
   var column = o._column;
   var grid = o._grid;
   var font = o._font;
   if(font){
      font = row.font();
   }
   if(!font){
      font = column.font();
   }
   if(!font){
      font = grid.rowFont();
   }
   style.font = font;
   var alignCd = o._alignCd;
   if(!alignCd){
      alignCd = column.alignCd();
   }
   style.alignCd = alignCd;
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
MO.MUiGridCellCurrency = function MUiGridCellCurrency(o){
   o = MO.Class.inherits(this, o, MO.MUiGridCell);
   o.construct = MO.MUiGridCellCurrency_construct;
   o.dispose   = MO.MUiGridCellCurrency_dispose;
   return o;
}
MO.MUiGridCellCurrency_construct = function MUiGridCellCurrency_construct(){
   var o = this;
   o.__base.MUiGridCell.construct.call(o);
}
MO.MUiGridCellCurrency_dispose = function MUiGridCellCurrency_dispose(){
   var o = this;
   o.__base.MUiGridCell.dispose.call(o);
}
MO.MUiGridCellDate = function MUiGridCellDate(o){
   o = MO.Class.inherits(this, o, MO.MUiGridCell);
   o.construct = MO.MUiGridCellDate_construct;
   o.dispose   = MO.MUiGridCellDate_dispose;
   return o;
}
MO.MUiGridCellDate_construct = function MUiGridCellDate_construct(){
   var o = this;
   o.__base.MUiGridCell.construct.call(o);
}
MO.MUiGridCellDate_dispose = function MUiGridCellDate_dispose(){
   var o = this;
   o.__base.MUiGridCell.dispose.call(o);
}
MO.MUiGridCellText = function MUiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.MUiGridCell);
   o.construct = MO.MUiGridCellText_construct;
   o.dispose   = MO.MUiGridCellText_dispose;
   return o;
}
MO.MUiGridCellText_construct = function MUiGridCellText_construct(){
   var o = this;
   o.__base.MUiGridCell.construct.call(o);
}
MO.MUiGridCellText_dispose = function MUiGridCellText_dispose(){
   var o = this;
   o.__base.MUiGridCell.dispose.call(o);
}
MO.MUiGridColumn = function MUiGridColumn(o){
   o = MO.Class.inherits(this, o, MO.MUiPadding, MO.MUiMargin, MO.MUiTextFormator);
   o._grid        = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._index       = MO.Class.register(o, new MO.AGetSet('_index'), -1);
   o._name        = MO.Class.register(o, new MO.AGetSet('_name'));
   o._label       = MO.Class.register(o, new MO.AGetSet('_label'));
   o._dataName    = MO.Class.register(o, new MO.AGetSet('_dataName'));
   o._backColor   = MO.Class.register(o, new MO.AGetSet('_backColor'));
   o._font        = MO.Class.register(o, new MO.AGetter('_font'));
   o._width       = MO.Class.register(o, new MO.AGetSet('_width'), 100);
   o._realWidth   = MO.Class.register(o, new MO.AGetSet('_realWidth'), 100);
   o._alignCd     = MO.Class.register(o, new MO.AGetSet('_alignCd'), MO.EUiAlign.Left);
   o._cellPadding = MO.Class.register(o, new MO.AGetter('_cellPadding'));
   o._cellClass   = null;
   o.construct    = MO.MUiGridColumn_construct;
   o.createCell   = MO.MUiGridColumn_createCell;
   o.findFont     = MO.MUiGridColumn_findFont;
   o.dispose      = MO.MUiGridColumn_dispose;
   return o;
}
MO.MUiGridColumn_construct = function MUiGridColumn_construct(){
   var o = this;
   o.__base.MUiPadding.construct.call(o);
   o.__base.MUiMargin.construct.call(o);
   o._cellPadding = new MO.SPadding();
}
MO.MUiGridColumn_createCell = function MUiGridColumn_createCell(clazz){
   var o = this;
   var cell = MO.Class.create(MO.Runtime.nvl(clazz, o._cellClass));
   cell.setGrid(o._grid);
   cell.setColumn(o);
   return cell;
}
MO.MUiGridColumn_findFont = function MUiGridColumn_findFont(){
   var o = this;
   var font = o._font;
   if(!font){
      font = o._grid.headFont();
   }
   return font;
}
MO.MUiGridColumn_dispose = function MUiGridColumn_dispose(){
   var o = this;
   o._grid = null;
   o._cellPadding = MO.Lang.Object.dispose(o._cellPadding);
   o.__base.MUiMargin.dispose.call(o);
   o.__base.MUiPadding.dispose.call(o);
}
MO.MUiGridColumnCurrency = function MUiGridColumnCurrency(o){
   o = MO.Class.inherits(this, o);
   o._currencyPercent = MO.Class.register(o, new MO.AGetSet('_currencyPercent'), 2);
   o._normalColor     = MO.Class.register(o, new MO.AGetSet('_normalColor'), '#000000');
   o._highColor       = MO.Class.register(o, new MO.AGetSet('_highColor'), '#000000');
   o._lowerColor      = MO.Class.register(o, new MO.AGetSet('_lowerColor'), '#000000');
   o._negativeColor   = MO.Class.register(o, new MO.AGetSet('_negativeColor'), '#000000');
   o.construct        = MO.MUiGridColumnCurrency_construct;
   o.formatText       = MO.MUiGridColumnCurrency_formatText;
   o.dispose          = MO.MUiGridColumnCurrency_dispose;
   return o;
}
MO.MUiGridColumnCurrency_construct = function MUiGridColumnCurrency_construct(){
   var o = this;
}
MO.MUiGridColumnCurrency_formatText = function MUiGridColumnCurrency_formatText(value){
   var o = this;
   var text = MO.Lang.Float.format(MO.Runtime.nvl(value, 0), null, null, o._currencyPercent, '0');
   return text;
}
MO.MUiGridColumnCurrency_dispose = function MUiGridColumnCurrency_dispose(){
   var o = this;
}
MO.MUiGridColumnDate = function MUiGridColumnDate(o){
   o = MO.Class.inherits(this, o);
   o._dateFormat = MO.Class.register(o, new MO.AGetSet('_dateFormat'), 'YYYY/MM/DD HH24:MI:SS');
   o._dateValue  = null;
   o.construct   = MO.MUiGridColumnDate_construct;
   o.formatText  = MO.MUiGridColumnDate_formatText;
   o.dispose     = MO.MUiGridColumnDate_dispose;
   return o;
}
MO.MUiGridColumnDate_construct = function MUiGridColumnDate_construct(){
   var o = this;
   o._dateValue = new MO.TDate();
}
MO.MUiGridColumnDate_formatText = function MUiGridColumnDate_formatText(value){
   var o = this;
   var date = o._dateValue;
   date.parse(value);
   return date.format(o._dateFormat);
}
MO.MUiGridColumnDate_dispose = function MUiGridColumnDate_dispose(){
   var o = this;
   o._dateValue = MO.Lang.Object.dispose(o._dateValue);
}
MO.MUiGridColumnText = function MUiGridColumnText(o){
   o = MO.Class.inherits(this, o);
   o.construct = MO.MUiGridColumnText_construct;
   o.dispose   = MO.MUiGridColumnText_dispose;
   return o;
}
MO.MUiGridColumnText_construct = function MUiGridColumnText_construct(){
   var o = this;
}
MO.MUiGridColumnText_dispose = function MUiGridColumnText_dispose(){
   var o = this;
}
MO.MUiGridControl = function MUiGridControl(o){
   o = MO.Class.inherits(this, o);
   o._displayHead   = MO.Class.register(o, new MO.AGetSet('_displayHead'), true);
   o._displayFooter = MO.Class.register(o, new MO.AGetSet('_displayFooter'), true);
   o._displayCount  = MO.Class.register(o, new MO.AGetSet('_displayCount'), 20);
   o._columns       = MO.Class.register(o, new MO.AGetter('_columns'));
   o._headFont      = MO.Class.register(o, new MO.AGetter('_headFont'));
   o._headBackColor = MO.Class.register(o, new MO.AGetSet('_headBackColor'), '#000000');
   o._headHeight    = MO.Class.register(o, new MO.AGetSet('_headHeight'), 32);
   o._rowClass      = MO.FUiGridRow;
   o._rowFont       = MO.Class.register(o, new MO.AGetter('_rowFont'));
   o._rowHeight     = MO.Class.register(o, new MO.AGetSet('_rowHeight'), 28);
   o._rowLimitCount = MO.Class.register(o, new MO.AGetter('_rowLimitCount'), 0);
   o._rows          = MO.Class.register(o, new MO.AGetter('_rows'));
   o._rowPool       = null;
   o._focusRow      = null;
   o._focusCell     = null;
   o.construct      = MO.MUiGridControl_construct;
   o.createRow      = MO.MUiGridControl_createRow;
   o.allocRow       = MO.MUiGridControl_allocRow;
   o.freeRow        = MO.MUiGridControl_freeRow;
   o.pushColumn     = MO.MUiGridControl_pushColumn;
   o.pushRow        = MO.MUiGridControl_pushRow;
   o.clearRows      = MO.MUiGridControl_clearRows;
   o.dispose        = MO.MUiGridControl_dispose;
   return o;
}
MO.MUiGridControl_construct = function MUiGridControl_construct(){
   var o = this;
   o._columns = new MO.TDictionary();
   o._headFont = new MO.SUiFont();
   o._rows = new MO.TObjects();
   o._rowFont = new MO.SUiFont();
   o._rowPool = MO.Class.create(MO.FObjectPool);
}
MO.MUiGridControl_createRow = function MUiGridControl_createRow(clazz){
   var o = this;
   var row = MO.Class.create(MO.Runtime.nvl(clazz, o._rowClass));
   row.setGrid(o);
   var columns = o._columns;
   var count = columns.count();
   for(var i = 0; i < count; i++){
      var column = columns.at(i);
      var cell = column.createCell();
      row.pushCell(cell);
   }
   return row;
}
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
MO.MUiGridControl_freeRow = function MUiGridControl_freeRow(row){
   this._rowPool.free(row);
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
MO.MUiGridControl_dispose = function MUiGridControl_dispose(){
   var o = this;
   o._columns = MO.Lang.Object.dispose(o._columns);
   o._rowClass = null;
   o._rowPool = MO.Lang.Object.dispose(o._rowPool);
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._focusRow = null;
   o._focusCell = null;
   o._rowFont = null;
}
MO.MUiGridRow = function MUiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._grid     = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._cells    = MO.Class.register(o, new MO.AGetter('_cells'));
   o._font     = MO.Class.register(o, new MO.AGetSet('_font'));
   o._height   = MO.Class.register(o, new MO.AGetSet('_height'), 28);
   o.construct = MO.MUiGridRow_construct;
   o.pushCell  = MO.MUiGridRow_pushCell;
   o.get       = MO.MUiGridRow_get;
   o.set       = MO.MUiGridRow_set;
   o.dispose   = MO.MUiGridRow_dispose;
}
MO.MUiGridRow_construct = function MUiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._cells = new MO.TDictionary();
}
MO.MUiGridRow_pushCell = function MUiGridRow_pushCell(cell){
   var o = this;
   cell.setRow(o)
   var column = cell.column();
   var dataName = column.dataName();
   o._cells.set(dataName, cell);
}
MO.MUiGridRow_get = function MUiGridRow_get(name, value){
   var o = this;
   var cell = o._cells.get(name);
   return cell.value(value);
}
MO.MUiGridRow_set = function MUiGridRow_set(name, value){
   var o = this;
   var cell = o._cells.get(name);
   return cell.setValue(value);
}
MO.MUiGridRow_dispose = function MUiGridRow_dispose(){
   var o = this;
   o._grid = null;
   o._cells = MO.Lang.Object.dispose(o._cells);
   o.__base.FObject.dispose.call(o);
}
MO.SUiGridCellStyle = function SUiGridCellStyle(){
   var o = this;
   o.alignCd = null;
   o.font    = null;
   o.dispose = MO.SUiGridCellStyle_dispose;
   return o;
}
MO.SUiGridCellStyle_dispose = function SUiGridCellStyle_dispose(){
   var o = this;
   o.alignCd = null;
   o.font = null;
}
