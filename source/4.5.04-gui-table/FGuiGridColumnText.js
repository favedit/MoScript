//==========================================================
// <T>表格列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridColumnText = function FGuiGridColumnText(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridColumn, MO.MUiGridColumnText);
   //..........................................................
   // @method
   o.construct  = MO.FGuiGridColumnText_construct;
   // @method
   o.createCell = MO.FGuiGridColumnText_createCell;
   // @method
   o.dispose    = MO.FGuiGridColumnText_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnText_construct = function FGuiGridColumnText_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridColumn.construct.call(o);
}

//==========================================================
// <T>创建单元格。</T>
//
// @method
// @return FGuiGridCellText 单元格
//==========================================================
MO.FGuiGridColumnText_createCell = function FGuiGridColumnText_createCell(){
   return MO.Class.create(MO.FGuiGridCellText);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnText_dispose = function FGuiGridColumnText_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumn.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
