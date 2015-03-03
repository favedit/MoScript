//==========================================================
// <T>统计基类。</T>
//
// @class
// @author maocy
// @version 150303
//==========================================================
function FG3dStatistics(o){
   o = RClass.inherits(this, o, FStatistics);
   //..........................................................
   // @attribute
   o._frameTriangleCount = 0;
   o._frameDrawCount     = 0;
   //..........................................................
   // @method
   o.reset      = FG3dStatistics_reset;
   o.resetFrame = FG3dStatistics_resetFrame;
   return o;
}

//==========================================================
// <T>重置所有数据。</T>
//
// @method
//==========================================================
function FG3dStatistics_reset(){
}

//==========================================================
// <T>重置所有帧数据。</T>
//
// @method
//==========================================================
function FG3dStatistics_resetFrame(){
   var o = this;
   o._frameTriangleCount = 0;
   o._frameDrawCount = 0;
}
