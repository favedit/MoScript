//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCell = function FGuiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridCell);
   //..........................................................
   // @method
   o.onPaint   = MO.FGuiGridCell_onPaint;
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCell_construct;
   // @method
   o.testReady = MO.Method.emptyTrue;
   o.draw      = MO.Method.empty;
   // @method
   o.dispose   = MO.FGuiGridCell_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCell_construct = function FGuiGridCell_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridCell.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCell_dispose = function FGuiGridCell_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridCell.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
