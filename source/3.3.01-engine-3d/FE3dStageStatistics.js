//==========================================================
// <T>统计基类。</T>
//
// @class
// @author maocy
// @version 150303
//==========================================================
MO.FE3dStageStatistics = function FE3dStageStatistics(o){
   o = MO.Class.inherits(this, o, MO.FStatistics);
   //..........................................................
   // @attribute
   o._frame               = null;
   o._frameProcess        = null;
   o._frameDraw           = null;
   o._frameDrawSort       = null;
   o._frameDrawRenderable = null;
   //..........................................................
   // @method
   o.construct            = MO.FE3dStageStatistics_construct;
   // @method
   o.reset                = MO.FE3dStageStatistics_reset;
   o.resetFrame           = MO.FE3dStageStatistics_resetFrame;
   return o;
}

//==========================================================
// <T>重置所有数据。</T>
//
// @method
//==========================================================
MO.FE3dStageStatistics_construct = function FE3dStageStatistics_construct(){
   var o = this;
   o.__base.FStatistics.construct.call(o);
   o._frame = new MO.TSpeed();
   o._frameProcess = new MO.TSpeed();
   o._frameDraw = new MO.TSpeed();
   o._frameDrawSort = new MO.TSpeed();
   o._frameDrawRenderable = new MO.TSpeed();
}

//==========================================================
// <T>重置所有数据。</T>
//
// @method
//==========================================================
MO.FE3dStageStatistics_reset = function FE3dStageStatistics_reset(){
}

//==========================================================
// <T>重置所有帧数据。</T>
//
// @method
//==========================================================
MO.FE3dStageStatistics_resetFrame = function FE3dStageStatistics_resetFrame(){
   var o = this;
   o._frame.reset();
   o._frameProcess.reset();
   o._frameDraw.reset();
   o._frameDrawSort.reset();
   o._frameDrawRenderable.reset();
}
