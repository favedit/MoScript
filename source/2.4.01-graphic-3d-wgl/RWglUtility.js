with(MO){
   //==========================================================
   // <T>WebGL工具集。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.RWglUtility = function RWglUtility(){
      return this;
   }

   //==========================================================
   // <T>转换填充模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param fillCd:Integer 填充模式
   // @return Integer 渲染填充模式
   //==========================================================
   MO.RWglUtility.prototype.convertFillMode = function RWglUtility_convertFillMode(graphic, fillCd){
      switch(fillCd){
         case EG3dFillMode.Point:
            return graphic.POINT;
         case EG3dFillMode.Line:
            return graphic.LINE;
         case EG3dFillMode.Face:
            return graphic.FILL;
      }
      throw new TError(this, "Convert fill mode failure. (fill_cd={1})", fillCd);
   }

   //==========================================================
   // <T>转换绘制模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param drawCd:Integer 填充模式
   // @return Integer 渲染填充模式
   //==========================================================
   MO.RWglUtility.prototype.convertDrawMode = function RWglUtility_convertDrawMode(graphic, drawCd){
      switch(drawCd){
         case EG3dDrawMode.Point:
            return graphic.POINTS;
         case EG3dDrawMode.Lines:
            return graphic.LINES;
         case EG3dDrawMode.LineStrip:
            return graphic.LINE_STRIP;
         case EG3dDrawMode.LineLoop:
            return graphic.LINE_LOOP;
         case EG3dDrawMode.Triangles:
            return graphic.TRIANGLES;
         case EG3dDrawMode.TriangleStrip:
            return graphic.TRIANGLE_STRIP;
         case EG3dDrawMode.TriangleFan:
            return graphic.TRIANGLE_FAN;
         case EG3dDrawMode.Quads:
            return graphic.QUADS;
         case EG3dDrawMode.QuadStrip:
            return graphic.QUAD_STRIP;
      }
      throw new TError(this, "Convert draw mode failure. (draw_cd={1})", drawCd);
   }

   //==========================================================
   // <T>转换剔除模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param cullCd:Integer 剔除模式
   // @return Integer 渲染剔除模式
   //==========================================================
   MO.RWglUtility.prototype.convertCullMode = function RWglUtility_convertCullMode(graphic, cullCd){
      switch(cullCd){
         case EG3dCullMode.Front:
            return graphic.FRONT;
         case EG3dCullMode.Back:
            return graphic.BACK;
         case EG3dCullMode.Both:
            return graphic.FRONT_AND_BACK;
      }
      throw new TError(this, "Convert cull mode failure. (cull_cd={1})", cullCd);
   }

   //==========================================================
   // <T>转换深度模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param depthCd:Integer 深度模式
   // @return Integer 渲染深度模式
   //==========================================================
   MO.RWglUtility.prototype.convertDepthMode = function RWglUtility_convertDepthMode(graphic, depthCd){
      switch(depthCd){
         case EG3dDepthMode.Equal:
            return graphic.EQUAL;
         case EG3dDepthMode.NotEqual:
            return graphic.NOTEQUAL;
         case EG3dDepthMode.Less:
            return graphic.LESS;
         case EG3dDepthMode.LessEqual:
            return graphic.LEQUAL;
         case EG3dDepthMode.Greater:
            return graphic.GREATER;
         case EG3dDepthMode.GreaterEqual:
            return graphic.GEQUAL;
         case EG3dDepthMode.Always:
            return graphic.ALWAYS;
      }
      throw new TError(this, "Convert depth mode failure. (depth_cd={1})", depthCd);
   }

   //==========================================================
   // <T>转换融合模式类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param blendCd:Integer 融合模式
   // @return Integer 渲染融合模式
   //==========================================================
   MO.RWglUtility.prototype.convertBlendFactors = function RWglUtility_convertBlendFactors(graphic, blendCd){
      switch(blendCd){
         case EG3dBlendMode.Zero:
            return graphic.ZERO;
         case EG3dBlendMode.One:
            return graphic.ONE;
         case EG3dBlendMode.SrcColor:
            return graphic.SRC_COLOR;
         case EG3dBlendMode.OneMinusSrcColor:
            return graphic.ONE_MINUS_SRC_COLOR;
         case EG3dBlendMode.DstColor:
            return graphic.DST_COLOR;
         case EG3dBlendMode.OneMinusDstColor:
            return graphic.ONE_MINUS_DST_COLOR;
         case EG3dBlendMode.SrcAlpha:
            return graphic.SRC_ALPHA;
         case EG3dBlendMode.OneMinusSrcAlpha:
            return graphic.ONE_MINUS_SRC_ALPHA;
         case EG3dBlendMode.DstAlpha:
            return graphic.DST_ALPHA;
         case EG3dBlendMode.OneMinusDstAlpha:
            return graphic.ONE_MINUS_DST_ALPHA;
         case EG3dBlendMode.SrcAlphaSaturate:
            return graphic.SRC_ALPHA_SATURATE;
      }
      throw new TError(this, "Convert blend factors failure. (blend_cd={1})", blendCd);
   }

   //==========================================================
   // <T>转换索引宽度类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param strideCd:Integer 索引宽度
   // @return Integer 渲染索引宽度
   //==========================================================
   MO.RWglUtility.prototype.convertIndexStride = function RWglUtility_convertIndexStride(graphic, strideCd){
      switch(strideCd){
         case EG3dIndexStride.Uint16:
            return graphic.UNSIGNED_SHORT;
         case EG3dIndexStride.Uint32:
            return graphic.UNSIGNED_INT;
      }
      throw new TError(this, "Convert index stride failure. (stride_cd={1})", strideCd);
   }

   //==========================================================
   // <T>转换采样过滤类型。</T>
   //
   // @method
   // @param graphic:WebGLObject 渲染环境
   // @param filterCd:Integer 采样过滤
   // @return Integer 渲染索引宽度
   //==========================================================
   MO.RWglUtility.prototype.convertSamplerFilter = function RWglUtility_convertSamplerFilter(graphic, filterCd){
      switch(filterCd){
         case EG3dSamplerFilter.Unknown:
            return 0;
         case EG3dSamplerFilter.Nearest:
            return graphic.NEAREST;
         case EG3dSamplerFilter.Linear:
            return graphic.LINEAR;
         case EG3dSamplerFilter.Repeat:
            return graphic.REPEAT;
         case EG3dSamplerFilter.ClampToEdge:
            return graphic.CLAMP_TO_EDGE;
         case EG3dSamplerFilter.ClampToBorder:
            return graphic.CLAMP_TO_BORDER;
      }
      throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", filterCd);
   }
   //..........................................................
   // 实例化内容
   MO.RWglUtility = new RWglUtility();
}
