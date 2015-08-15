//==========================================================
// <T>表格行。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridRow = function MUiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._grid     = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._cells    = MO.Class.register(o, new MO.AGetter('_cells'));
   // @attribute
   o._font     = MO.Class.register(o, new MO.AGetSet('_font'));
   o._height   = MO.Class.register(o, new MO.AGetSet('_height'), 28);
   //..........................................................
   // @method
   o.construct = MO.MUiGridRow_construct;
   // @method
   o.findCell  = MO.MUiGridRow_findCell;
   o.pushCell  = MO.MUiGridRow_pushCell;
   o.get       = MO.MUiGridRow_get;
   o.set       = MO.MUiGridRow_set;
   // @method
   o.dispose   = MO.MUiGridRow_dispose;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridRow_construct = function MUiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._cells = new MO.TDictionary();
}

//==========================================================
// <T>根据名称查找一个单元格。</T>
//
// @method
// @param name:String 名称
// @return MUiGridCell 单元格
//==========================================================
MO.MUiGridRow_findCell = function MUiGridRow_findCell(name){
   var o = this;
   var cell = o._cells.get(name);
   return cell;
}

//==========================================================
// <T>增加一个单元格。</T>
//
// @method
// @param cell 单元格
//==========================================================
MO.MUiGridRow_pushCell = function MUiGridRow_pushCell(cell){
   var o = this;
   cell.setRow(o)
   var column = cell.column();
   var dataName = column.dataName();
   o._cells.set(dataName, cell);
}

//==========================================================
// <T>获得一个数据内容。</T>
//
// @method
// @param name:String 名称
// @param value:Object 内容
//==========================================================
MO.MUiGridRow_get = function MUiGridRow_get(name, value){
   var o = this;
   var cell = o._cells.get(name);
   return cell.value(value);
}

//==========================================================
// <T>设置一个数据内容。</T>
//
// @method
// @param name:String 名称
// @param value:Object 内容
//==========================================================
MO.MUiGridRow_set = function MUiGridRow_set(name, value){
   var o = this;
   var cell = o._cells.get(name);
   return cell.setValue(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridRow_dispose = function MUiGridRow_dispose(){
   var o = this;
   // 释放属性
   o._grid = null;
   o._cells = MO.Lang.Object.dispose(o._cells);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
