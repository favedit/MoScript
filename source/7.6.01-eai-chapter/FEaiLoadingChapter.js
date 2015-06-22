//==========================================================
// <T>集团报表舞台。</T>
//
// @class
// @author maocy
// @history 150604
//==========================================================
MO.FEaiLoadingChapter = function FEaiLoadingChapter(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChapter);
   //..........................................................
   // @attribute
   o._code = MO.EEaiChapter.Loading;
   return o;
}
