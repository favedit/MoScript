//==========================================================
// <T>表格单元格。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridCell = function FGuiGridCell(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @method
   o.onPaint   = MO.FGuiGridCell_onPaint;
   //..........................................................
   // @method
   o.construct = MO.FGuiGridCell_construct;
   // @method
   o.draw      = MO.FGuiGridCell_draw;
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
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
// @param context:SGuiGridPaintContext 绘制环境
//==========================================================
MO.FGuiGridCell_draw = function FGuiGridCell_draw(context){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridCell_dispose = function FGuiGridCell_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.FObject.dispose.call(o);
}
