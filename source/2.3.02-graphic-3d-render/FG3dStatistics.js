with(MO){
   //==========================================================
   // <T>统计基类。</T>
   //
   // @class
   // @author maocy
   // @version 150303
   //==========================================================
   MO.FG3dStatistics = function FG3dStatistics(o){
      o = RClass.inherits(this, o, FStatistics);
      //..........................................................
      // @attribute
      o._frameClearCount     = RClass.register(o, new AGetter('_frameClearCount'), 0);
      o._frameFillModeCount  = RClass.register(o, new AGetter('_frameFillModeCount'), 0);
      o._frameDepthModeCount = RClass.register(o, new AGetter('_frameDepthModeCount'), 0);
      o._frameCullModeCount  = RClass.register(o, new AGetter('_frameCullModeCount'), 0);
      o._frameBlendModeCount = RClass.register(o, new AGetter('_frameBlendModeCount'), 0);
      o._frameProgramCount   = RClass.register(o, new AGetter('_frameProgramCount'), 0);
      o._frameConstCount     = RClass.register(o, new AGetter('_frameConstCount'), 0);
      o._frameConstLength    = RClass.register(o, new AGetter('_frameConstLength'), 0);
      o._frameBufferCount    = RClass.register(o, new AGetter('_frameBufferCount'), 0);
      o._frameTextureCount   = RClass.register(o, new AGetter('_frameTextureCount'), 0);
      o._frameTargetCount    = RClass.register(o, new AGetter('_frameTargetCount'), 0);
      o._frameDrawCount      = RClass.register(o, new AGetter('_frameDrawCount'), 0);
      o._frameTriangleCount  = RClass.register(o, new AGetter('_frameTriangleCount'), 0);
      // @attribute
      o._programTotal        = RClass.register(o, new AGetter('_programTotal'), 0);
      o._layoutTotal         = RClass.register(o, new AGetter('_layoutTotal'), 0);
      o._vertexBufferTotal   = RClass.register(o, new AGetter('_vertexBufferTotal'), 0);
      o._indexBufferTotal    = RClass.register(o, new AGetter('_indexBufferTotal'), 0);
      o._flatTextureTotal    = RClass.register(o, new AGetter('_flatTextureTotal'), 0);
      o._cubeTextureTotal    = RClass.register(o, new AGetter('_cubeTextureTotal'), 0);
      o._targetTotal         = RClass.register(o, new AGetter('_targetTotal'), 0);
      //..........................................................
      // @method
      o.reset                = FG3dStatistics_reset;
      o.resetFrame           = FG3dStatistics_resetFrame;
      return o;
   }

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   MO.FG3dStatistics_reset = function FG3dStatistics_reset(){
      o._programTotal = 0;
      o._layoutTotal = 0;
      o._vertexBufferTotal = 0;
      o._indexBufferTotal = 0;
      o._flatTextureTotal = 0;
      o._cubeTextureTotal = 0;
      o._targetTotal = 0;
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //
   // @method
   //==========================================================
   MO.FG3dStatistics_resetFrame = function FG3dStatistics_resetFrame(){
      var o = this;
      o._frameClearCount = 0;
      o._frameFillModeCount = 0;
      o._frameDepthModeCount = 0;
      o._frameCullModeCount = 0;
      o._frameBlendModeCount = 0;
      o._frameProgramCount = 0;
      o._frameConstCount = 0;
      o._frameConstLength = 0;
      o._frameBufferCount = 0;
      o._frameTextureCount = 0;
      o._frameTargetCount = 0;
      o._frameTriangleCount = 0;
      o._frameDrawCount = 0;
   }
}
