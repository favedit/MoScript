//==========================================================
// <T>统计基类。</T>
//
// @class
// @author maocy
// @version 150303
//==========================================================
MO.FStatistics = function FStatistics(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code      = null;
   //..........................................................
   // @method
   o.reset      = MO.FStatistics_reset;
   o.resetFrame = MO.FStatistics_resetFrame;
   return o;
}

//==========================================================
// <T>重置所有数据。</T>
//
// @method
//==========================================================
MO.FStatistics_reset = function FStatistics_reset(){
}

//==========================================================
// <T>重置所有帧数据。</T>
//
// @method
//==========================================================
MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
}
