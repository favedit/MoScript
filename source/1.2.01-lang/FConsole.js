//==========================================================
// <T>后台服务基类。</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
MO.FConsole = function FConsole(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._scopeCd = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   return o;
}
