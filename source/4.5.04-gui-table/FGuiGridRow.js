//==========================================================
// <T>界面控件。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.FGuiGridRow = function FGuiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MUiGridRow);
   //..........................................................
   // @method
   o.construct = MO.FGuiGridRow_construct;
   o.dispose   = MO.FGuiGridRow_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiGridRow_construct = function FGuiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MUiGridRow.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiGridRow_dispose = function FGuiGridRow_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiGridRow.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
