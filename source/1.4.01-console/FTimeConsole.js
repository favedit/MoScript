//==========================================================
// <T>时间控制台。</T>
//
// @console
// @author maocy
// @version 150629
//==========================================================
MO.FTimeConsole = function FTimeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Global;
   // @attribute
   o._date     = null;
   //..........................................................
   // @method
   o.construct = MO.FTimeConsole_construct;
   // @method
   o.dispose   = MO.FTimeConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FTimeConsole_construct = function FTimeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FTimeConsole_dispose = function FTimeConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
}
