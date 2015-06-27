//==========================================================
// <T>内容管道。</T>
//
// @class
// @author maocy
// @version 141231
//==========================================================
MO.FContentPipeline = function FContentPipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   //..........................................................
   // @attribute
   o._scopeCd = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   return o;
}
