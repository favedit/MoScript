//==========================================================
// <T>WebGL工具集。</T>
//
// @author maocy
// @history 141230
//==========================================================
var RWglUtility = new function RWglUtility(){
   var o = this;
   // @method
   o.convertFillMode      = RWglUtility_convertFillMode;
   o.convertCullMode      = RWglUtility_convertCullMode;
   o.convertDepthMode     = RWglUtility_convertDepthMode;
   o.convertBlendFactors  = RWglUtility_convertBlendFactors;
   o.convertIndexStride   = RWglUtility_convertIndexStride;
   o.convertSamplerFilter = RWglUtility_convertSamplerFilter;
   return o;
}

//==========================================================
// <T>转换填充模式类型。</T>
//
// @method
// @param g:context:WebGLObject 渲染环境
// @param v:fillCd:Integer 填充模式
// @return Integer 渲染填充模式
//==========================================================
function RWglUtility_convertFillMode(g, v){
   switch(v){
      case EG3dFillMode.Point:
         return g.POINT;
      case EG3dFillMode.Line:
         return g.LINE;
      case EG3dFillMode.Face:
         return g.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", v);
}

//==========================================================
// <T>转换剔除模式类型。</T>
//
// @method
// @param g:context:WebGLObject 渲染环境
// @param v:cullCd:Integer 剔除模式
// @return Integer 渲染剔除模式
//==========================================================
function RWglUtility_convertCullMode(g, v){
   switch(v){
      case EG3dCullMode.Front:
         return g.FRONT;
      case EG3dCullMode.Back:
         return g.BACK;
      case EG3dCullMode.Both:
         return g.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", v);
}

//==========================================================
// <T>转换深度模式类型。</T>
//
// @method
// @param g:context:WebGLObject 渲染环境
// @param v:depthCd:Integer 深度模式
// @return Integer 渲染深度模式
//==========================================================
function RWglUtility_convertDepthMode(g, v){
   switch(v){
      case EG3dDepthMode.Equal:
         return g.EQUAL;
      case EG3dDepthMode.NotEqual:
         return g.NOTEQUAL;
      case EG3dDepthMode.Less:
         return g.LESS;
      case EG3dDepthMode.LessEqual:
         return g.LEQUAL;
      case EG3dDepthMode.Greater:
         return g.GREATER;
      case EG3dDepthMode.GreaterEqual:
         return g.GEQUAL;
      case EG3dDepthMode.Always:
         return g.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", v);
}

//==========================================================
// <T>转换融合模式类型。</T>
//
// @method
// @param g:context:WebGLObject 渲染环境
// @param v:blendCd:Integer 融合模式
// @return Integer 渲染融合模式
//==========================================================
function RWglUtility_convertBlendFactors(g, v){
   switch(v){
      case EG3dBlendMode.SourceAlpha:
         return g.SRC_ALPHA;
      case EG3dBlendMode.OneMinusSourceAlpha:
         return g.ONE_MINUS_SRC_ALPHA;
      default:
         break;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", v);
}

//==========================================================
// <T>转换索引宽度类型。</T>
//
// @method
// @param g:context:WebGLObject 渲染环境
// @param v:strideCd:Integer 索引宽度
// @return Integer 渲染索引宽度
//==========================================================
function RWglUtility_convertIndexStride(g, v){
   switch(v){
      case EG3dIndexStride.Uint16:
         return g.UNSIGNED_SHORT;
      case EG3dIndexStride.Uint32:
         return g.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", v);
}

//==========================================================
// <T>转换采样过滤类型。</T>
//
// @method
// @param g:context:WebGLObject 渲染环境
// @param v:filter_cd:Integer 采样过滤
// @return Integer 渲染索引宽度
//==========================================================
function RWglUtility_convertSamplerFilter(g, v){
   switch(v){
      case EG3dSamplerFilter.Unknown:
         return 0;
      case EG3dSamplerFilter.Nearest:
         return g.NEAREST;
      case EG3dSamplerFilter.Linear:
         return g.LINEAR;
      case EG3dSamplerFilter.Repeat:
         return g.REPEAT;
      case EG3dSamplerFilter.ClampToEdge:
         return g.CLAMP_TO_EDGE;
      case EG3dSamplerFilter.ClampToBorder:
         return g.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", v);
}
