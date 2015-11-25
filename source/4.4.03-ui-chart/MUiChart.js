//==========================================================
// <T>图表。</T>
//
// @class
// @author maocy
// @version 151124
//==========================================================
MO.MUiChart = function MUiChart(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._dataset  = MO.Class.register(o, new MO.AGetSet('_dataset'));
   //..........................................................
   // @method
   o.construct = MO.MUiChart_construct;
   // @method
   o.dispose   = MO.MUiChart_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiChart_construct = function MUiChart_construct(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiChart_dispose = function MUiChart_dispose(){
   var o = this;
}
