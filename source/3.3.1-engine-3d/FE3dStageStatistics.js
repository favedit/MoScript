//==========================================================
// <T>统计基类。</T>
//
// @class
// @author maocy
// @version 150303
//==========================================================
function FE3dStageStatistics(o){
   o = RClass.inherits(this, o, FStatistics);
   //..........................................................
   // @attribute
   o._frame        = null;
   o._frameProcess = null;
   o._frameDraw    = null;
   //..........................................................
   // @method
   o.construct     = FE3dStageStatistics_construct;
   // @method
   o.reset         = FE3dStageStatistics_reset;
   o.resetFrame    = FE3dStageStatistics_resetFrame;
   return o;
}

//==========================================================
// <T>重置所有数据。</T>
//
// @method
//==========================================================
function FE3dStageStatistics_construct(){
   var o = this;
   o.__base.FStatistics.construct.call(o);
   o._frame = new TSpeed();
   o._frameProcess = new TSpeed();
   o._frameDraw = new TSpeed();
}

//==========================================================
// <T>重置所有数据。</T>
//
// @method
//==========================================================
function FE3dStageStatistics_reset(){
}

//==========================================================
// <T>重置所有帧数据。</T>
//
// @method
//==========================================================
function FE3dStageStatistics_resetFrame(){
   var o = this;
   o._frame.reset();
   o._frameProcess.reset();
   o._frameDraw.reset();
}
