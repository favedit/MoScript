//==========================================================
// <T>WebGL渲染环境。</T>
//
// @author maocy
// @refer https://www.khronos.org/registry/webgl
// @history 141230
//==========================================================
function FWglContext(o){
   o = RClass.inherits(this, o, FG3dContext);
   //..........................................................
   // @attribute
   o._native             = null;
   o._nativeInstance     = null;
   o._nativeLayout       = null;
   o._nativeDebugShader  = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = null;
   // @attribute
   o._parameters         = null;
   o._extensions         = null;
   // @attribute
   o._statusRecord       = false;
   o._recordBuffers      = null;
   o._recordSamplers     = null;
   // @attribute
   o._data9              = null;
   o._data16             = null;
   //..........................................................
   // @method
   o.construct           = FWglContext_construct;
   // @method
   o.linkCanvas          = FWglContext_linkCanvas;
   // @method
   o.parameters          = FWglContext_parameters;
   o.extensions          = FWglContext_extensions;
   // @method
   o.recordBuffers       = FWglContext_recordBuffers;
   o.recordSamplers      = FWglContext_recordSamplers;
   o.recordBegin         = FWglContext_recordBegin;
   o.recordEnd           = FWglContext_recordEnd;
   // @method
   o.createProgram       = FWglContext_createProgram;
   o.createLayout        = FWglContext_createLayout;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.createRenderTarget  = FWglContext_createRenderTarget;
   // @method
   o.setViewport         = FWglContext_setViewport;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setRenderTarget     = FWglContext_setRenderTarget;
   o.setProgram          = FWglContext_setProgram;
   // @method
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   // @method
   o.clear               = FWglContext_clear;
   o.clearColor          = FWglContext_clearColor;
   o.clearDepth          = FWglContext_clearDepth;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   // @method
   o.checkError          = FWglContext_checkError;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new SG3dContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
   o._recordBuffers = new TObjects();
   o._recordSamplers = new TObjects();
}

//==========================================================
// <T>关联页面画布标签。</T>
//
// @method
// @param h:hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
function FWglContext_linkCanvas(h){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, h)
   // 获得环境
   o._hCanvas = h;
   if(h.getContext){
      // 设置参数
      var a = new Object();
      a.alpha = o._optionAlpha;
      a.antialias = o._optionAntialias;
      //a.premultipliedAlpha = false;
      // 初始化对象
      var n = h.getContext('experimental-webgl', a);
      if(n == null){
         n = h.getContext('webgl', a);
      }
      if(n == null){
         throw new TError("Current browser can't support WebGL technique.");
      }
      o._native = n;
      o._contextAttributes = n.getContextAttributes();
   }
   var g = o._native;
   // 设置状态
   o.setViewport(0, 0, h.width, h.height);
   o.setDepthMode(true, EG3dDepthMode.LessEqual);
   o.setCullingMode(true, EG3dCullMode.Front);
   // 获得渲染信息
   var c = o._capability;
   c.vendor = g.getParameter(g.VENDOR);
   c.version = g.getParameter(g.VERSION);
   c.shaderVersion = g.getParameter(g.SHADING_LANGUAGE_VERSION);
   c.attributeCount = g.getParameter(g.MAX_VERTEX_ATTRIBS);
   c.vertexConst = g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
   c.varyingCount = g.getParameter(g.MAX_VARYING_VECTORS);
   c.fragmentConst = g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
   c.samplerCount = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   c.samplerSize = g.getParameter(g.MAX_TEXTURE_SIZE);
   // 测试实例绘制支持
   var e = o._nativeInstance = g.getExtension('ANGLE_instanced_arrays');
   if(e){
      c.optionInstance = true;
   }
   c.mergeCount = parseInt((c.vertexConst - 32) / 4);
   // 测试顶点布局支持
   var e = o._nativeLayout = g.getExtension('OES_vertex_array_object');
   if(e){
      c.optionLayout = true;
   }
   // 测试32位索引支持
   var e = g.getExtension('OES_element_index_uint');
   if(e){
      c.optionIndex32 = true;
   }
   // 测试纹理压缩支持
   var e = o._nativeSamplerS3tc = g.getExtension('WEBGL_compressed_texture_s3tc');
   if(e){
      c.samplerCompressRgb = e.COMPRESSED_RGB_S3TC_DXT1_EXT;
      c.samplerCompressRgba = e.COMPRESSED_RGBA_S3TC_DXT5_EXT;
   }
   // 测定渲染精度
   var s = c.shader = new Object();
   var sv = s.vertexPrecision = new Object();
   sv.floatLow = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.LOW_FLOAT);
   sv.floatMedium = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.MEDIUM_FLOAT);
   sv.floatHigh = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.HIGH_FLOAT);
   sv.intLow = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.LOW_INT);
   sv.intMedium = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.MEDIUM_INT);
   sv.intHigh = g.getShaderPrecisionFormat(g.VERTEX_SHADER, g.HIGH_INT);
   var sf = s.fragmentPrecision = new Object();
   sf.floatLow = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.LOW_FLOAT);
   sf.floatMedium = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.MEDIUM_FLOAT);
   sf.floatHigh = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_FLOAT);
   sf.intLow = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.LOW_INT);
   sf.intMedium = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.MEDIUM_INT);
   sf.intHigh = g.getShaderPrecisionFormat(g.FRAGMENT_SHADER, g.HIGH_INT);
   // 测试调试渲染器支持
   var e = o._nativeDebugShader = g.getExtension('WEBGL_debug_shaders');
   if(e){
      c.optionShaderSource = true;
   }
}

//==========================================================
// <T>获得参数集合。</T>
//
// @method
// @return Object 参数集合
//==========================================================
function FWglContext_parameters(){
   var o = this;
   // 获得属性
   var r = o._parameters;
   if(r){
      return r;
   }
   // 获得参数
   var ns =['ACTIVE_TEXTURE',
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
      'ALPHA_BITS',
      'ARRAY_BUFFER_BINDING',
      'BLEND',
      'BLEND_COLOR',
      'BLEND_DST_ALPHA',
      'BLEND_DST_RGB',
      'BLEND_EQUATION_ALPHA',
      'BLEND_EQUATION_RGB',
      'BLEND_SRC_ALPHA',
      'BLEND_SRC_RGB',
      'BLUE_BITS',
      'COLOR_CLEAR_VALUE',
      'COLOR_WRITEMASK',
      'COMPRESSED_TEXTURE_FORMATS',
      'CULL_FACE',
      'CULL_FACE_MODE',
      'CURRENT_PROGRAM',
      'DEPTH_BITS',
      'DEPTH_CLEAR_VALUE',
      'DEPTH_FUNC',
      'DEPTH_RANGE',
      'DEPTH_TEST',
      'DEPTH_WRITEMASK',
      'DITHER',
      'ELEMENT_ARRAY_BUFFER_BINDING',
      'FRAMEBUFFER_BINDING',
      'FRONT_FACE',
      'GENERATE_MIPMAP_HINT',
      'GREEN_BITS',
      'IMPLEMENTATION_COLOR_READ_FORMAT',
      'IMPLEMENTATION_COLOR_READ_TYPE',
      'LINE_WIDTH',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'MAX_CUBE_MAP_TEXTURE_SIZE',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_TEXTURE_SIZE',
      'MAX_VARYING_VECTORS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'MAX_VIEWPORT_DIMS',
      'PACK_ALIGNMENT',
      'POLYGON_OFFSET_FACTOR',
      'POLYGON_OFFSET_FILL',
      'POLYGON_OFFSET_UNITS',
      'RED_BITS',
      'RENDERBUFFER_BINDING',
      'RENDERER',
      'SAMPLE_BUFFERS',
      'SAMPLE_COVERAGE_INVERT',
      'SAMPLE_COVERAGE_VALUE',
      'SAMPLES',
      'SCISSOR_BOX',
      'SCISSOR_TEST',
      'SHADING_LANGUAGE_VERSION',
      'STENCIL_BACK_FAIL',
      'STENCIL_BACK_FUNC',
      'STENCIL_BACK_PASS_DEPTH_FAIL',
      'STENCIL_BACK_PASS_DEPTH_PASS',
      'STENCIL_BACK_REF',
      'STENCIL_BACK_VALUE_MASK',
      'STENCIL_BACK_WRITEMASK',
      'STENCIL_BITS',
      'STENCIL_CLEAR_VALUE',
      'STENCIL_FAIL',
      'STENCIL_FUNC',
      'STENCIL_PASS_DEPTH_FAIL',
      'STENCIL_PASS_DEPTH_PASS',
      'STENCIL_REF',
      'STENCIL_TEST',
      'STENCIL_VALUE_MASK',
      'STENCIL_WRITEMASK',
      'SUBPIXEL_BITS',
      'TEXTURE_BINDING_2D',
      'TEXTURE_BINDING_CUBE_MAP',
      'UNPACK_ALIGNMENT',
      'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      'UNPACK_FLIP_Y_WEBGL',
      'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      'VENDOR',
      'VERSION',
      'VIEWPORT'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getParameter(g[n]);
   }
   // 获得调试信息
   var e = g.getExtension('WEBGL_debug_renderer_info');
   if(e){
      r['UNMASKED_RENDERER_WEBGL'] = g.getParameter(e.UNMASKED_RENDERER_WEBGL);
      r['UNMASKED_VENDOR_WEBGL'] = g.getParameter(e.UNMASKED_VENDOR_WEBGL);
   }
   // 设置参数
   o._parameters = r;
   return r;
}

//==========================================================
// <T>获得扩展集合。</T>
//
// @method
// @return Object 扩展集合
//==========================================================
function FWglContext_extensions(){
   var o = this;
   // 获得属性
   var r = o._extensions;
   if(!r){
      r = o._extensions = new Object();
      // 获得参数
      var g = o._native;
      var s = g.getSupportedExtensions();
      var c = s.length;
      for(var i = 0; i < c; i++){
         var n = s[i];
         r[n] = g.getExtension(n);
      }
   }
   return r;
}

//==========================================================
// <T>获得记录缓冲集合。</T>
//
// @method
// @return TObjects 缓冲集合
//==========================================================
function FWglContext_recordBuffers(){
   return this._recordBuffers;
}

//==========================================================
// <T>获得记录取样集合。</T>
//
// @method
// @return TObjects 取样集合
//==========================================================
function FWglContext_recordSamplers(){
   return this._recordSamplers;
}

//==========================================================
// <T>开始记录操作。</T>
//
// @method
//==========================================================
function FWglContext_recordBegin(){
   var o = this;
   o._recordBuffers.clear();
   o._recordSamplers.clear();
   o._statusRecord = true;
}

//==========================================================
// <T>解除记录操作。</T>
//
// @method
//==========================================================
function FWglContext_recordEnd(){
   this._statusRecord = false;
}

//==========================================================
// <T>创建渲染程序。</T>
//
// @method
// @return FProgram3d 顶点缓冲
//==========================================================
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._programTotal++;
   return r;
}

//==========================================================
// <T>创建布局。</T>
//
// @method
// @return FProgram3d 顶点缓冲
//==========================================================
function FWglContext_createLayout(){
   var o = this;
   var r = RClass.create(FWglLayout);
   r.linkGraphicContext(o);
   if(o._capability.optionLayout){
      r.setup();
   }
   o._statistics._layoutTotal++;
   return r;
}

//==========================================================
// <T>创建顶点缓冲。</T>
//
// @method
// @return FVertexBuffer3d 顶点缓冲
//==========================================================
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._vertexBufferTotal++;
   return r;
}

//==========================================================
// <T>创建索引缓冲。</T>
//
// @method
// @return FIndexBuffer3d 索引缓冲
//==========================================================
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._indexBufferTotal++;
   return r;
}

//==========================================================
// <T>创建平面渲染纹理。</T>
//
// @method
// @return FG3dFlatTexture 平面渲染纹理
//==========================================================
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._flatTextureTotal++;
   return r;
}

//==========================================================
// <T>创建立方渲染纹理。</T>
//
// @method
// @return FG3dCubeTexture 立方渲染纹理
//==========================================================
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._cubeTextureTotal++;
   return r;
}

//==========================================================
// <T>创建渲染目标。</T>
//
// @method
// @return FG3dRenderTarget 渲染目标
//==========================================================
function FWglContext_createRenderTarget(){
   var o = this;
   var r = RClass.create(FWglRenderTarget);
   r.linkGraphicContext(o);
   r.setup();
   o._statistics._targetTotal++;
   return r;
}

//==========================================================
// <T>设置视角大小。</T>
//
// @param l:left:Integer 左位置
// @param t:top:Integer 上位置
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
//==========================================================
function FWglContext_setViewport(l, t, w, h){
   var o = this;
   o._size.set(w, h);
   o._native.viewport(l, t, w, h);
}

//==========================================================
// <T>设置填充模式。</T>
//
// @param p:fillModeCd:EG3dFillMode 填充模式
//==========================================================
function FWglContext_setFillMode(p){
   var o = this;
   var g = o._native;
   // 检查状态
   if(o._fillModeCd == p){
      return;
   }
   o._statistics._frameFillModeCount++;
   //..........................................................
   // 设置开关
   switch(p){
      case EG3dFillMode.Point:
         g.polygonMode(g.FRONT_AND_BACK, g.POINT);
         break;
      case EG3dFillMode.Line:
         g.polygonMode(g.FRONT_AND_BACK, g.LINE);
         break;
      case EG3dFillMode.Face:
         g.polygonMode(g.FRONT, g.FILL);
         break;
      default:
         throw new TError('Invalid parameter. (fill_mode={1})', p);
   }
   o._fillModeCd = p;
   return true;
}

//==========================================================
// <T>设置深度模式。</T>
//
// @param f:depthFlag:Boolean 深度开关
// @param v:depthCd:EG3dDepthMode 深度模式
// @return 处理结果
//==========================================================
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
   o._statistics._frameDepthModeCount++;
   //..........................................................
   // 设置开关
   if(o._optionDepth != f){
      if(f){
         g.enable(g.DEPTH_TEST);
      }else{
         g.disable(g.DEPTH_TEST);
      }
      o._optionDepth = f;
   }
   // 设置内容
   if(f && (o._depthModeCd != v)){
      var r = RWglUtility.convertDepthMode(g, v);
      g.depthFunc(r);
      o._depthModeCd = v;
   }
   return true;
}

//==========================================================
// <T>设置剪裁模式。</T>
//
// @param f:cullFlag:Boolean 剪裁开关
// @param v:cullCd:EG3dCullMode 剪裁模式
// @return 处理结果
//==========================================================
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._optionCull == f) && (o._cullModeCd == v)){
      return true;
   }
   o._statistics._frameCullModeCount++;
   //..........................................................
   // 设置开关
   if(o._optionCull != f){
      if(f){
         g.enable(g.CULL_FACE);
      }else{
         g.disable(g.CULL_FACE);
      }
      o._optionCull = f;
   }
   // 设置内容
   if(f && (o._cullModeCd != v)){
      var r = RWglUtility.convertCullMode(g, v);
      g.cullFace(r);
      o._cullModeCd = v;
   }
   return true;
}

//==========================================================
// <T>设置融合方式。</T>
//
// @param f:blendFlag:Boolean 剪裁开关
// @param vs:sourceCd:EG3dBlendMode 来源融合模式
// @param vt:tagetCd:EG3dBlendMode 目标融合模式
// @return 处理结果
//==========================================================
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   o._statistics._frameBlendModeCount++;
   //..........................................................
   // 设置开关
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
         o._blendSourceCd = 0;
         o._blendTargetCd = 0;
      }
      o._statusBlend = f;
   }
   // 设置效果
   if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
      var gs = RWglUtility.convertBlendFactors(g, vs);
      var gt = RWglUtility.convertBlendFactors(g, vt);
      g.blendFunc(gs, gt);
      o._blendSourceCd = vs;
      o._blendTargetCd = vt;
   }
   return true;
}

//==========================================================
// <T>设置有效区域。</T>
//
// @param l:left:Integer 左位置
// @param t:top:Integer 上位置
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
// @return 处理结果
//==========================================================
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}

//==========================================================
// <T>设置渲染目标。</T>
//
// @method
// @param p:renderTarget:FG3dRenderTarget 渲染目标
//==========================================================
function FWglContext_setRenderTarget(p){
   var o = this;
   var g = o._native;
   // 检查是否需要切换
   if(o._activeRenderTarget == p){
      return;
   }
   o._statistics._frameTargetCount++;
   //............................................................
   // 设置程序
   var r = true;
   if(p == null){
      // 解除渲染目标
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      r = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!r){
         return r;
      }
      // 修改视角
      g.viewport(0, 0, o._size.width, o._size.height);
   }else{
      // 绑定渲染目标
      g.bindFramebuffer(g.FRAMEBUFFER, p._native);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", p._native);
      if(!r){
         return r;
      }
      // 修改视角
      var s = p.size();
      g.viewport(0, 0, s.width, s.height);
   }
   o._activeRenderTarget = p;
}

//==========================================================
// <T>设置渲染程序。</T>
//
// @param p:program:FG3dProgram 渲染程序
//==========================================================
function FWglContext_setProgram(p){
   var o = this;
   var g = o._native;
   // 检查参数
   if(o._program == p){
      return;
   }
   o._statistics._frameProgramCount++;
   //............................................................
   // 设置程序
   if(p){
      g.useProgram(p._native);
   }else{
      g.useProgram(null);
   }
   o._program = p;
   // 检查错误
   return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", p, p._native);
}

//==========================================================
// <T>绑定常量数据。</T>
//
// @param psc:shaderCd:EG3dShader 渲染器类型
// @param psl:slot:Integer 插槽
// @param pdf:formatCd:EG3dParameterFormat 数据类型
// @param pdt:data:Float32Array 数据
// @param pdc:count:Integer 数据个数
// @return Boolean 处理结果
//==========================================================
function FWglContext_bindConst(psc, psl, pdf, pdt, pdc){
   var o = this;
   var g = o._native;
   var r = true;
   o._statistics._frameConstCount++;
   //............................................................
   // 修改数据
   switch(pdf){
      case EG3dParameterFormat.Float1:{
         // 修改数据
         g.uniform1fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         // 检查错误
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float2:{
         // 修改数据
         g.uniform2fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         // 检查错误
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3:{
         // 修改数据
         g.uniform3fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         // 检查错误
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4:{
         // 修改数据
         g.uniform4fv(psl, pdt);
         o._statistics._frameConstLength += pdt.byteLength;
         // 检查错误
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3x3:{
         // 修改数据
         var dt = o._data9;
         dt[ 0] = pdt[ 0];
         dt[ 1] = pdt[ 4];
         dt[ 2] = pdt[ 8];
         dt[ 3] = pdt[ 1];
         dt[ 4] = pdt[ 5];
         dt[ 5] = pdt[ 9];
         dt[ 6] = pdt[ 2];
         dt[ 7] = pdt[ 6];
         dt[ 8] = pdt[10];
         g.uniformMatrix3fv(psl, g.FALSE, dt);
         o._statistics._frameConstLength += dt.byteLength;
         // 检查错误
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x3:{
         // 修改数据
         g.uniform4fv(psl, g.FALSE, pd);
         o._statistics._frameConstLength += dt.byteLength;
         // 检查错误
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x4:{
         // 修改数据
         var d = null;
         if(pdt.constructor == Float32Array){
            d = pdt;
         }else if(pdt.writeData){
            d = o._data16;
            pdt.writeData(d, 0);
         }else{
            throw new TError('Unknown data type.');
         }
         g.uniformMatrix4fv(psl, g.FALSE, d);
         o._statistics._frameConstLength += d.byteLength;
         // 检查错误
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, count=%d)", psc, psl, pdt, pdc);
         break;
      }
   }
   return r;
}

//==========================================================
// <T>绑定顶点缓冲。</T>
//
// @param s:slot:Integer 插槽
// @param b:vertexBuffer:FG3dVertexBuffer 顶点缓冲
// @param i:offset:Integer 偏移位置
// @param f:formatCd:String 格式
//==========================================================
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
   o._statistics._frameBufferCount++;
   //............................................................
   // 录制模式
   if(o._statusRecord){
      var l = new SG3dLayoutBuffer();
      l.slot = s;
      l.buffer = b;
      l.index = i;
      l.formatCd = f;
      o._recordBuffers.push(l);
   }
   //............................................................
   // 设定顶点流
   var n = null;
   if(b != null){
      n = b._native;
   }
   g.bindBuffer(g.ARRAY_BUFFER, n);
   // 检查错误
   r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
   if(!r){
      return r;
   }
   //............................................................
   // 激活顶点流
   if(b != null){
      g.enableVertexAttribArray(s);
      r = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", s);
      if(!r){
         return r;
      }
   }else{
      g.disableVertexAttribArray(s);
      r = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", s);
      return r;
   }
   //............................................................
   // 设置顶点流
   var bs = b._stride;
   switch(f){
      case EG3dAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4Normal:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, true, bs, i);
         break;
      default:
         throw new TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   // 检查错误
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   return r;
}

//==========================================================
// <T>绑定纹理。</T>
//
// @param ps:slot:Object 插槽
// @param pi:index:Integer 索引
// @param pt:texture:FG3dTexture 纹理
// @return 处理结果
//==========================================================
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   o._statistics._frameTextureCount++;
   //............................................................
   // 录制模式
   if(o._statusRecord){
      var l = new SG3dLayoutSampler();
      l.slot = ps;
      l.index = pi;
      l.texture = pt;
      o._recordSamplers.push(l);
   }
   //............................................................
   // 激活纹理
   if(o._activeTextureSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._activeTextureSlot = ps;
   }
   //............................................................
   // 空纹理处理
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
   }
   //............................................................
   // 绑定纹理
   var gt = null;
   var gn = pt._native;
   switch(pt.textureCd()){
      case EG3dTexture.Flat2d:{
         gt = g.TEXTURE_2D;
         g.bindTexture(g.TEXTURE_2D, pt._native);
         r = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", gn);
         if(!r){
            return r;
         }
         break;
      }
      case EG3dTexture.Cube:{
         gt = g.TEXTURE_CUBE_MAP;
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", gn);
         if(!r){
            return r;
         }
         break;
      }
      default:{
         RLogger.fatal(o, null, "Unknown texture type.");
         break;
      }
   }
   return r;
}

//==========================================================
// <T>清空内容。</T>
//
// @param r:red:Float 红色
// @param g:green:Float 绿色
// @param b:blue:Float 蓝色
// @param a:alpha:Float 透明
// @param d:depth:Float 深度
//==========================================================
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}

//==========================================================
// <T>清空颜色内容。</T>
//
// @param r:red:Float 红色
// @param g:green:Float 绿色
// @param b:blue:Float 蓝色
// @param a:alpha:Float 透明
// @param d:depth:Float 深度
//==========================================================
function FWglContext_clearColor(r, g, b, a){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clear(c.COLOR_BUFFER_BIT);
   o._statistics._frameClearCount++;
}

//==========================================================
// <T>清空深度内容。</T>
//
// @param d:depth:Float 深度
//==========================================================
function FWglContext_clearDepth(d){
   var o = this;
   var c = o._native;
   c.clearDepth(d);
   c.clear(c.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}

//==========================================================
// <T>绘制三角形。</T>
//
// @param b:indexBuffer:FIndexBuffer3d 索引缓冲
// @param i:offset:Integer 开始位置
// @param c:count:Integer 索引总数
//==========================================================
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   // 设置参数
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count();
   }
   // 绘制索引流
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd());
   //GL_POINTS,  
   //GL_LINE_STRIP,  
   //GL_LINE_LOOP,  
   //GL_LINES,  
   //GL_TRIANGLE_STRIP,  
   //GL_TRIANGLE_FAN,  
   //GL_TRIANGLES,  
   //GL_QUAD_STRIP,  
   //GL_QUADS, 
   if(b._fillMode == EG3dFillMode.Line){
      //if(b._lineWidth){
      //   g.lineWidth(b._lineWidth);
      //}
      //g.enable(g.BLEND);
      //g.enable(g.LINE_SMOOTH);
      //g.hint(g.LINE_SMOOTH_HINT, g.FASTEST);
      //g.blendFunc(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA); 
      g.drawElements(g.LINES, c, strideCd, 2 * i);
   }else{
      g.drawElements(g.TRIANGLES, c, strideCd, 2 * i);
   }
   o._statistics._frameTriangleCount += c;
   o._statistics._frameDrawCount++;
   r = o.checkError("drawElements", "Draw triangles failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, null);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   return r;
}

//==========================================================
// <T>绘制处理。</T>
//
// @return 处理结果
//==========================================================
function FWglContext_present(){
}

//==========================================================
// <T>检查执行错误。</T>
//
// @param c:code:String 代码
// @param m:message:String 消息
// @param p1:parameter1:String 参数1
//==========================================================
function FWglContext_checkError(c, m, p1){
   var o = this;
   // 检查运行模式
   if(!o._capability.optionDebug){
      return true;
   }
   if(!RRuntime.isDebug()){
      return true;
   }
   // 获得错误原因
   var g = o._native;
   var r = false;
   var e = null;
   var es = null;
   while(true){
      // 获得错误
      e = g.getError();
      if(e == g.NO_ERROR){
         r = true;
         break;
      }
      // 获得原因
      switch(e){
         case g.INVALID_OPERATION:
            es = "Invalid operation.";
            break;
         case g.INVALID_ENUM:
            es = "Invalid enum.";
            break;
         case g.INVALID_VALUE:
            es = "Invalid value.";
            break;
         case g.INVALID_FRAMEBUFFER_OPERATION:
            es = "Invalid paramebuffer opeartion."; 
            break;
         case g.OUT_OF_MEMORY:
            es = "Out of memory.";
            break;
         default:
            es = "Unknown"; 
            break;
      }
   }
   //............................................................
   // 输出错误信息
   if(!r){
      RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
   }
   return r;
}
