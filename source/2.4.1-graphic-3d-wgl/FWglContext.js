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
   o._activeRenderTarget = null;
   o._activeTextureSlot  = 0;
   // @attribute
   o._parameters         = null;
   o._extensions         = null;
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
   o.createProgram       = FWglContext_createProgram;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.createRenderTarget  = FWglContext_createRenderTarget;
   // @method
   o.setViewPort         = FWglContext_setViewPort;
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
   o._capability = new SWglContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
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
      var n = h.getContext('webgl');
      if(n == null){
         n = h.getContext('experimental-webgl', {antialias:true});
      }
      if(n == null){
         throw new TError("Current browser can't support WebGL technique.");
      }
      o._native = n;
   }
   var g = o._native;
   // 设置状态
   o.setViewPort(h.width, h.height);
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
   if(r){
      return r;
   }
   // 获得参数
   var ns =[
      'ANGLE_instanced_arrays',
      'EXT_blend_minmax',
      'EXT_color_buffer_float',
      'EXT_color_buffer_half_float',
      'EXT_disjoint_timer_query',
      'EXT_frag_depth',
      'EXT_sRGB',
      'EXT_shader_texture_lod',
      'EXT_texture_filter_anisotropic',
      'OES_element_index_uint',
      'OES_standard_derivatives',
      'OES_texture_float',
      'OES_texture_float_linear',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'OES_vertex_array_object',
      'WEBGL_color_buffer_float',
      'WEBGL_compressed_texture_atc',
      'WEBGL_compressed_texture_es3',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_debug_renderer_info',
      'WEBGL_debug_shader_precision',
      'WEBGL_debug_shaders',
      'WEBGL_depth_texture',
      'WEBGL_draw_buffers',
      'WEBGL_draw_elements_no_range_check',
      'WEBGL_dynamic_texture',
      'WEBGL_lose_context',
      'WEBGL_security_sensitive_resources',
      'WEBGL_shared_resources',
      'WEBGL_subscribe_uniform',
      'WEBGL_texture_from_depth_video'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getExtension(n);
   }
   o._extensions = r;
   return r;
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
   r.linkContext(o);
   r.setup();
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
   r.linkContext(o);
   r.setup();
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
   r.linkContext(o);
   r.setup();
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
   r.linkContext(o);
   r.setup();
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
   r.linkContext(o);
   r.setup();
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
   r.linkContext(o);
   r.setup();
   return r;
}

//============================================================
// <T>设置视角大小。</T>
//
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
//============================================================
function FWglContext_setViewPort(w, h){
   var g = this._native;
   g.viewportWidth = w;
   g.viewportHeight = h;
   g.viewport(0, 0, w, h);
}

//============================================================
// <T>设置填充模式。</T>
//
// @param fillModeCd 填充模式
// @return 处理结果
//============================================================
function FWglContext_setFillMode(){
}

//============================================================
// <T>设置深度模式。</T>
//
// @param f:depthFlag:Boolean 深度开关
// @param v:depthCd:EG3dDepthMode 深度模式
// @return 处理结果
//============================================================
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
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

//============================================================
// <T>设置剪裁模式。</T>
//
// @param f:cullFlag:Boolean 剪裁开关
// @param v:cullCd:EG3dCullMode 剪裁模式
// @return 处理结果
//============================================================
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._optionCull == f) && (o._optionCull == v)){
      return true;
   }
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

//============================================================
// <T>设置融合方式。</T>
//
// @param f:blendFlag:Boolean 剪裁开关
// @param vs:sourceCd:EG3dBlendMode 来源融合模式
// @param vt:tagetCd:EG3dBlendMode 目标融合模式
// @return 处理结果
//============================================================
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   // 检查状态
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   // 设置开关
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
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

//============================================================
// <T>设置有效区域。</T>
//
// @param l:left:Integer 左位置
// @param t:top:Integer 上位置
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
// @return 处理结果
//============================================================
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}

//============================================================
// <T>设置渲染目标。</T>
//
// @method
// @param p:renderTarget:FG3dRenderTarget 渲染目标
//============================================================
function FWglContext_setRenderTarget(p){
   var o = this;
   var g = o._native;
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

//============================================================
// <T>设置渲染程序。</T>
//
// @param v:program:FG3dProgram 渲染程序
//============================================================
function FWglContext_setProgram(v){
   var o = this;
   var g = o._native;
   // 设置程序
   if(v != null){
      g.useProgram(v._native);
   }else{
      g.useProgram(null);
   }
   _program = v;
   // 检查错误
   var r = o.checkError("useProgram", "Set program failure. (program={1}, program_id={2})", v, v._native);
   return r;
}

//============================================================
// <T>绑定常量数据。</T>
//
// @param psc:shaderCd:EG3dShader 渲染器类型
// @param psl:slot:Integer 插槽
// @param pdf:formatCd:EG3dParameterFormat 数据类型
// @param pdt:data:Float32Array 数据
// @param pdc:count:Integer 数据个数
// @return Boolean 处理结果
//============================================================
function FWglContext_bindConst(psc, psl, pdf, pdt, pdc){
   var o = this;
   var g = o._native;
   var r = true;
   // 检查变更
   //TBool changed = UpdateConsts(psc, psl, pData, pdc);
   //if(!changed){
   //   return EContinue;
   //}
   // 修改数据
   switch(pdf){
      case EG3dParameterFormat.Float1:{
         // 修改数据
         g.uniform1fv(psl, pdt);
         // 检查错误
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float2:{
         // 修改数据
         g.uniform2fv(psl, pdt);
         // 检查错误
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float3:{
         // 修改数据
         g.uniform3fv(psl, pdt);
         // 检查错误
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4:{
         // 修改数据
         g.uniform4fv(psl, pdt);
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
         // 检查错误
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x3:{
         // 检查长度
         if(length % 48 != 0){
            RLogger.fatal(o, null, "Count is invalid. (count=%d)", pdc);
            return false;
         }
         // 修改数据
         var count = length / 48;
         g.uniform4fv(psl, g.FALSE, pd);
         // 检查错误
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
         break;
      }
      case EG3dParameterFormat.Float4x4:{
         // 修改数据
         if(pdt.constructor == Float32Array){
            g.uniformMatrix4fv(psl, g.FALSE, pdt);
         }else if(pdt.writeData){
            var d = o._data16;
            pdt.writeData(d, 0);
            g.uniformMatrix4fv(psl, g.FALSE, d);
         }else{
            throw new TError('Unknown data type.');
         }
         // 检查错误
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, count=%d)", psc, psl, pdt, pdc);
         break;
      }
   }
   return r;
}

//============================================================
// <T>绑定顶点缓冲。</T>
//
// @param s:slot:Integer 插槽
// @param b:vertexBuffer:FG3dVertexBuffer 顶点缓冲
// @param i:offset:Integer 偏移位置
// @param f:formatCd:String 格式
//============================================================
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
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
   var bs = b.stride;
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
         RLogger.fatal(o, null, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   // 检查错误
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   // MO_INFO("Bind vertex buffer. (slot=%d, offset=%d, format_cd=%d, stride=%d, buffer_id=%d, count=%d, length=%d)", slot, offset, formatCd, stride, bufferId, pVertexBuffer->Count(), pVertexBuffer->DataLength());
   return r;
}

//============================================================
// <T>绑定纹理。</T>
//
// @param ps:slo:Integer 插槽
// @param pi:index:Integer 索引
// @param pt:texture:FG3dTexture 纹理
// @return 处理结果
//============================================================
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   //............................................................
   // 空纹理处理
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
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
      o._renderTextureActiveSlot = ps;
   }
   //............................................................
   // 绑定纹理
   var gt = null;
   switch(pt.textureCd()){
      case EG3dTexture.Flat2d:{
         gt = g.TEXTURE_2D;
         g.bindTexture(g.TEXTURE_2D, pt._native);
         r = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      case EG3dTexture.Cube:{
         gt = g.TEXTURE_CUBE_MAP;
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", pt._native);
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
   //............................................................
   // 设置过滤器
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMinCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MIN_FILTER, fc);
   }
   var fc = RWglUtility.convertSamplerFilter(g, pt.filterMagCd());
   if(fc){
      g.texParameteri(gt, g.TEXTURE_MAG_FILTER, fc);
   }
   var ws = RWglUtility.convertSamplerFilter(g, pt.wrapS());
   if(ws){
      //g.texParameteri(gt, g.TEXTURE_WRAP_S, ws);
   }
   var wt = RWglUtility.convertSamplerFilter(g, pt.wrapT());
   if(wt){
      //g.texParameteri(gt, g.TEXTURE_WRAP_T, wt);
   }
   return r;
}

//============================================================
// <T>清空内容。</T>
//
// @param r:red:Float 红色
// @param g:green:Float 绿色
// @param b:blue:Float 蓝色
// @param a:alpha:Float 透明
// @param d:depth:Float 深度
//============================================================
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
}

//============================================================
// <T>绘制三角形。</T>
//
// @param b:indexBuffer:FIndexBuffer3d 索引缓冲
// @param i:offset:Integer 开始位置
// @param c:count:Integer 索引总数
//============================================================
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
   g.drawElements(g.TRIANGLES, c, strideCd, 2 * i);
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

//============================================================
// <T>绘制处理。</T>
//
// @return 处理结果
//============================================================
function FWglContext_present(){
}

//============================================================
// <T>检查执行错误。</T>
//
// @param c:code:String 代码
// @param m:message:String 消息
// @param p1:parameter1:String 参数1
//============================================================
function FWglContext_checkError(c, m, p1){
   // 检查运行模式
   if(!RRuntime.isDebug()){
      return true;
   }
   // 获得错误原因
   var o = this;
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
