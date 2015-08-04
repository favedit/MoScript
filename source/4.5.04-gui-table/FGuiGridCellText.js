//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCellText = function FGuiGridCellText(o){
   o = MO.Class.inherits(this, o, MO.FUiGridCellText);
   //..........................................................
   // @method
   o.onPaint = MO.FGuiGridCellText_onPaint;
   //..........................................................
   // @method
   o.paint   = MO.FGuiGridCellText_paint;
   // @method
   o.dispose = MO.FGuiGridCellText_dispose;
   return o;
}

//==========================================================
// <T>绘制事件处理。</T>
//
// @method
// @return 绘制事件处理
//==========================================================
MO.FGuiGridCellText_onPaint = function FGuiGridCellText_onPaint(event){
   var o = this;
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @return 绘制处理
//==========================================================
MO.FGuiGridCellText_paint = function FGuiGridCellText_paint(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCellText_dispose = function FGuiGridCellText_dispose(){
   var o = this;
   // 释放属性
   o._grid = null;
   o._column = null;
   o._row = null;
   // 父处理
   o.__base.FUiGridCellText.dispose.call(o);
}
