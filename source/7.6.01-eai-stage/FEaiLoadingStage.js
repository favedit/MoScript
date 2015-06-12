//==========================================================
// <T>集团报表舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiLoadingStage = function FEaiLoadingStage(o){
   o = MO.RClass.inherits(this, o, MO.FEaiStage);
   //..........................................................
   // @attribute
   o._code = MO.EEaiStage.Loading;
   return o;
}
