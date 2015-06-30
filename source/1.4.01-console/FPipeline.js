//==========================================================
// <T>处理管道。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FPipeline = function FPipeline(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code = MO.Class.register(o, new MO.AGetter('_code'));
   return o;
}
