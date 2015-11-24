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
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiChart_dispose = function MUiChart_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
