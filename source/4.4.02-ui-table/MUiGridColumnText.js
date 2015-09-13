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
   o._textAlign = MO.Class.register(o, new MO.AGetSet('_textAlign'), MO.EUiAlign.Center);
   //..........................................................
   // @method
   o.construct = MO.MUiGridColumnText_construct;
   o.dispose   = MO.MUiGridColumnText_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnText_construct = function MUiGridColumnText_construct(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumnText_dispose = function MUiGridColumnText_dispose(){
   var o = this;
}
