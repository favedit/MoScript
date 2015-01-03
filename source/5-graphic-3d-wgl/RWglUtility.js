//==========================================================
// <T>WebGL工具集。</T>
//
// @author maocy
// @history 141230
//==========================================================
var RWglUtility = new function RWglUtility(){
   var o = this;
   // @method
   o.convertFillMode     = RWglUtility_convertFillMode;
   o.convertCullMode     = RWglUtility_convertCullMode;
   o.convertDepthMode    = RWglUtility_convertDepthMode;
   o.convertBlendFactors = RWglUtility_convertBlendFactors;
   o.convertIndexStride  = RWglUtility_convertIndexStride;
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
      case ERenderFillMode.Point:
         return g.POINT;
      case ERenderFillMode.Line:
         return g.LINE;
      case ERenderFillMode.Face:
         return g.FILL;
   }
   RLogger.fatal(this, null, "Convert fill mode failure. (fill_cd={1})", v);
   return g.FILL;
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
      case ERenderCullMode.Front:
         return g.FRONT;
      case ERenderCullMode.Back:
         return g.BACK;
      case ERenderCullMode.Both:
         return g.FRONT_AND_BACK;
   }
   RLogger.fatal(this, null, "Convert cull mode failure. (cull_cd={1})", v);
   return g.FRONT;
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
      case ERenderDepthMode.Equal:
         return g.EQUAL;
      case ERenderDepthMode.NotEqual:
         return g.NOTEQUAL;
      case ERenderDepthMode.Less:
         return g.LESS;
      case ERenderDepthMode.LessEqual:
         return g.LEQUAL;
      case ERenderDepthMode.Greater:
         return g.GREATER;
      case ERenderDepthMode.GreaterEqual:
         return g.GEQUAL;
      case ERenderDepthMode.Always:
         return g.ALWAYS;
   }
   RLogger.fatal(this, null, "Convert depth mode failure. (depth_cd={1})", v);
   return g.LESS;
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
      case ERenderBlendMode.SourceAlpha:
         return g.SRC_ALPHA;
      case ERenderBlendMode.OneMinusSourceAlpha:
         return g.ONE_MINUS_SRC_ALPHA;
      default:
         break;
   }
   RLogger.fatal(this, null, "Convert blend factors failure. (blend_cd={1})", v);
   return 0;
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
      case ERenderIndexStride.Uint16:
         return g.UNSIGNED_SHORT;
      case ERenderIndexStride.Uint32:
         return g.UNSIGNED_INT;
   }
   RLogger.fatal(this, null, "Convert index stride failure. (stride_cd={1})", v);
   return 0;
}

