//==========================================================
// <T>后台服务基类。</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
function FConsole(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o.scopeCd = EScope.Global;
   return o;
}
