//==========================================================
// <T>表格列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridColumnText = function MUiGridColumnText(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   //..........................................................
   // @method
   o.dispose = MO.MUiGridColumnText_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnText_dispose = function MUiGridColumnText_dispose(){
   var o = this;
}
