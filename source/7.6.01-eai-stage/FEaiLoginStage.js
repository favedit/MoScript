//==========================================================
// <T>国家舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiLoginStage = function FEaiLoginStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   //..........................................................
   // @attribute
   o._code = MO.EEaiStage.Login;
   return o;
}
