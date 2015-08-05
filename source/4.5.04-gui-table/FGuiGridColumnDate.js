//==========================================================
// <T>界面表格时间列。</T>
//
// @class
// @author maocy
// @version 150805
//==========================================================
MO.FGuiGridColumnDate = function FGuiGridColumnDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiGridColumn, MO.MUiGridColumnDate);
   //..........................................................
   // @method
   o.construct  = MO.FGuiGridColumnDate_construct;
   // @method
   o.formatText = MO.FGuiGridColumnDate_formatText;
   // @method
   o.dispose    = MO.FGuiGridColumnDate_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnDate_construct = function FGuiGridColumnDate_construct(){
   var o = this;
   o.__base.FGuiGridColumn.construct.call(o);
   o.__base.MUiGridColumnDate.construct.call(o);
   // 设置属性
   o._cellClass = MO.FGuiGridCellDate;
}

//==========================================================
// <T>格式化数据为文本。</T>
//
// @method
// @param value:String 数据
// @return String 文本
//==========================================================
MO.FGuiGridColumnDate_formatText = function FGuiGridColumnDate_formatText(value){
   return this.__base.MUiGridColumnDate.formatText.call(this, value)
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridColumnDate_dispose = function FGuiGridColumnDate_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridColumnDate.dispose.call(o);
   o.__base.FGuiGridColumn.dispose.call(o);
}
