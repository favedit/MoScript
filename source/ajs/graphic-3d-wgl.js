MO.Graphic3d.SWglContextCapability = function SWglContextCapability(){
   var o = this;
   SG3dContextCapability.call(o);
   return o;
}
MO.Graphic3d.FWglContext = function FWglContext(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dContext);
   o._native             = null;
   o._nativeInstance     = null;
   o._nativeLayout       = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = 0;
   o._parameters         = null;
   o._extensions         = null;
   o._data9              = null;
   o._data16             = null;
   o.construct           = FWglContext_construct;
   o.linkCanvas          = FWglContext_linkCanvas;
   o.parameters          = FWglContext_parameters;
   o.extensions          = FWglContext_extensions;
   o.createProgram       = FWglContext_createProgram;
   o.createLayout        = FWglContext_createLayout;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.createRenderTarget  = FWglContext_createRenderTarget;
   o.setViewport         = FWglContext_setViewport;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setRenderTarget     = FWglContext_setRenderTarget;
   o.setProgram          = FWglContext_setProgram;
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   o.clear               = FWglContext_clear;
   o.clearColor          = FWglContext_clearColor;
   o.clearDepth          = FWglContext_clearDepth;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   o.checkError          = FWglContext_checkError;
   return o;
   function FWglContext_construct(){
      var o = this;
      o.__base.FG3dContext.construct.call(o);
      o._capability = new SWglContextCapability();
      o._data9 = new Float32Array(9);
      o._data16 = new Float32Array(16);
   }
   function FWglContext_linkCanvas(h){
      var o = this;
      o.__base.FG3dContext.linkCanvas.call(o, h)
      o._hCanvas = h;
      if(h.getContext){
         var n = h.getContext('webgl', {antialias:true});
         if(n == null){
            n = h.getContext('experimental-webgl', {antialias:true});
         }
         if(n == null){
            throw new TError("Current browser can't support WebGL technique.");
         }
         o._native = n;
      }
      var g = o._native;
      o.setViewport(h.width, h.height);
      o.setDepthMode(true, EG3dDepthMode.LessEqual);
      o.setCullingMode(true, EG3dCullMode.Front);
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
      var e = o._nativeInstance = g.getExtension('ANGLE_instanced_arrays');
      if(e){
         c.optionInstance = true;
      }
      var e = o._nativeLayout = g.getExtension('OES_vertex_array_object');
      if(e){
         c.optionLayout = true;
      }
   }
   function FWglContext_parameters(){
      var o = this;
      var r = o._parameters;
      if(r){
         return r;
      }
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
   function FWglContext_extensions(){
      var o = this;
      var r = o._extensions;
      if(r){
         return r;
      }
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
   function FWglContext_createProgram(){
      var o = this;
      var r = RClass.create(FWglProgram);
      r.linkGraphicContext(o);
      r.setup();
      return r;
   }
   function FWglContext_createLayout(){
      var o = this;
      if(!o._capability.optionLayout){
         throw new TError(o, 'Unsupport layout.');
      }
      var r = RClass.create(FWglLayout);
      r.linkGraphicContext(o);
      r.setup();
      return r;
   }
   function FWglContext_createVertexBuffer(){
      var o = this;
      var r = RClass.create(FWglVertexBuffer);
      r.linkGraphicContext(o);
      r.setup();
      return r;
   }
   function FWglContext_createIndexBuffer(){
      var o = this;
      var r = RClass.create(FWglIndexBuffer);
      r.linkGraphicContext(o);
      r.setup();
      return r;
   }
   function FWglContext_createFlatTexture(){
      var o = this;
      var r = RClass.create(FWglFlatTexture);
      r.linkGraphicContext(o);
      r.setup();
      return r;
   }
   function FWglContext_createCubeTexture(){
      var o = this;
      var r = RClass.create(FWglCubeTexture);
      r.linkGraphicContext(o);
      r.setup();
      return r;
   }
   function FWglContext_createRenderTarget(){
      var o = this;
      var r = RClass.create(FWglRenderTarget);
      r.linkGraphicContext(o);
      r.setup();
      return r;
   }
   function FWglContext_setViewport(l, t, w, h){
      var o = this;
      o._size.set(w, h);
      o._native.viewport(l, t, w, h);
   }
   function FWglContext_setFillMode(p){
      var o = this;
      var g = o._native;
      if(o._fillModeCd == p){
         return;
      }
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
   function FWglContext_setDepthMode(f, v){
      var o = this;
      var g = o._native;
      if((o._optionDepth == f) && (o._depthModeCd == v)){
         return true;
      }
      if(o._optionDepth != f){
         if(f){
            g.enable(g.DEPTH_TEST);
         }else{
            g.disable(g.DEPTH_TEST);
         }
         o._optionDepth = f;
      }
      if(f && (o._depthModeCd != v)){
         var r = RWglUtility.convertDepthMode(g, v);
         g.depthFunc(r);
         o._depthModeCd = v;
      }
      return true;
   }
   function FWglContext_setCullingMode(f, v){
      var o = this;
      var g = o._native;
      if((o._optionCull == f) && (o._optionCull == v)){
         return true;
      }
      if(o._optionCull != f){
         if(f){
            g.enable(g.CULL_FACE);
         }else{
            g.disable(g.CULL_FACE);
         }
         o._optionCull = f;
      }
      if(f && (o._cullModeCd != v)){
         var r = RWglUtility.convertCullMode(g, v);
         g.cullFace(r);
         o._cullModeCd = v;
      }
      return true;
   }
   function FWglContext_setBlendFactors(f, vs, vt){
      var o = this;
      var g = o._native;
      if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
         return true;
      }
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
      if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
         var gs = RWglUtility.convertBlendFactors(g, vs);
         var gt = RWglUtility.convertBlendFactors(g, vt);
         g.blendFunc(gs, gt);
         o._blendSourceCd = vs;
         o._blendTargetCd = vt;
      }
      return true;
   }
   function FWglContext_setScissorRectangle(l, t, w, h){
      this._native.scissor(l, t, w, h);
   }
   function FWglContext_setRenderTarget(p){
      var o = this;
      var g = o._native;
      if(o._activeRenderTarget == p){
         return;
      }
      var r = true;
      if(p == null){
         g.bindFramebuffer(g.FRAMEBUFFER, null);
         r = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
         if(!r){
            return r;
         }
         g.viewport(0, 0, o._size.width, o._size.height);
      }else{
         g.bindFramebuffer(g.FRAMEBUFFER, p._native);
         result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", p._native);
         if(!r){
            return r;
         }
         var s = p.size();
         g.viewport(0, 0, s.width, s.height);
      }
      o._activeRenderTarget = p;
   }
   function FWglContext_setProgram(p){
      var o = this;
      var g = o._native;
      if(o._program == p){
         return;
      }
      if(p){
         g.useProgram(p._native);
      }else{
         g.useProgram(null);
      }
      o._program = p;
      var r = o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", p, p._native);
      return r;
   }
   function FWglContext_bindConst(psc, psl, pdf, pdt, pdc){
      var o = this;
      var g = o._native;
      var r = true;
      switch(pdf){
         case EG3dParameterFormat.Float1:{
            g.uniform1fv(psl, pdt);
            r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
            break;
         }
         case EG3dParameterFormat.Float2:{
            g.uniform2fv(psl, pdt);
            r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
            break;
         }
         case EG3dParameterFormat.Float3:{
            g.uniform3fv(psl, pdt);
            r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
            break;
         }
         case EG3dParameterFormat.Float4:{
            g.uniform4fv(psl, pdt);
            r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
            break;
         }
         case EG3dParameterFormat.Float3x3:{
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
            r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
            break;
         }
         case EG3dParameterFormat.Float4x3:{
            if(length % 48 != 0){
               RLogger.fatal(o, null, "Count is invalid. (count=%d)", pdc);
               return false;
            }
            var count = length / 48;
            g.uniform4fv(psl, g.FALSE, pd);
            r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", psc, psl, pdt, pdc);
            break;
         }
         case EG3dParameterFormat.Float4x4:{
            if(pdt.constructor == Float32Array){
               g.uniformMatrix4fv(psl, g.FALSE, pdt);
            }else if(pdt.writeData){
               var d = o._data16;
               pdt.writeData(d, 0);
               g.uniformMatrix4fv(psl, g.FALSE, d);
            }else{
               throw new TError('Unknown data type.');
            }
            r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, count=%d)", psc, psl, pdt, pdc);
            break;
         }
      }
      return r;
   }
   function FWglContext_bindVertexBuffer(s, b, i, f){
      var o = this;
      var g = o._native;
      var r = true;
      var n = null;
      if(b != null){
         n = b._native;
      }
      g.bindBuffer(g.ARRAY_BUFFER, n);
      r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
      if(!r){
         return r;
      }
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
      r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
      return r;
   }
   function FWglContext_bindTexture(ps, pi, pt){
      var o = this;
      var g = o._native;
      var r = true;
      if(pt == null){
         g.bindTexture(g.TEXTURE_2D, null);
         r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
         return r;
      }
      if(o._activeTextureSlot != ps){
         g.uniform1i(ps, pi);
         g.activeTexture(g.TEXTURE0 + pi);
         r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
         if(!r){
            return r;
         }
         o._renderTextureActiveSlot = ps;
      }
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
      }
      var wt = RWglUtility.convertSamplerFilter(g, pt.wrapT());
      if(wt){
      }
      return r;
   }
   function FWglContext_clear(r, g, b, a, d){
      var o = this;
      var c = o._native;
      c.clearColor(r, g, b, a);
      c.clearDepth(d);
      c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
   }
   function FWglContext_clearColor(r, g, b, a){
      var o = this;
      var c = o._native;
      c.clearColor(r, g, b, a);
      c.clear(c.COLOR_BUFFER_BIT);
   }
   function FWglContext_clearDepth(d){
      var o = this;
      var c = o._native;
      c.clearDepth(d);
      c.clear(c.DEPTH_BUFFER_BIT);
   }
   function FWglContext_drawTriangles(b, i, c){
      var o = this;
      var g = o._native;
      var r = true;
      if(i == null){
         i = 0;
      }
      if(c == null){
         c = b.count();
      }
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
      r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
      if(!r){
          return r;
      }
      var strideCd = RWglUtility.convertIndexStride(g, b.strideCd());
      if(b._fillMode == EG3dFillMode.Line){
         g.drawElements(g.LINES, c, strideCd, 2 * i);
      }else{
         g.drawElements(g.TRIANGLES, c, strideCd, 2 * i);
      }
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
   function FWglContext_present(){
   }
   function FWglContext_checkError(c, m, p1){
      if(!RRuntime.isDebug()){
         return true;
      }
      var o = this;
      var g = o._native;
      var r = false;
      var e = null;
      var es = null;
      while(true){
         e = g.getError();
         if(e == g.NO_ERROR){
            r = true;
            break;
         }
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
      if(!r){
         RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
      }
      return r;
   }
}
MO.Graphic3d.FWglCubeTexture = function FWglCubeTexture(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dCubeTexture);
   o._native    = null;
   o.setup      = FWglCubeTexture_setup;
   o.makeMipmap = FWglCubeTexture_makeMipmap;
   o.upload     = FWglCubeTexture_upload;
   return o;
   function FWglCubeTexture_setup(){
      var o = this;
      var g = o._graphicContext._native;
      o.__base.FG3dCubeTexture.setup.call(o);
      o._native = g.createTexture();
   }
   function FWglCubeTexture_makeMipmap(){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
      g.generateMipmap(g.TEXTURE_CUBE_MAP);
   }
   function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
      g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
      o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
   }
}
MO.Graphic3d.FWglFlatTexture = function FWglFlatTexture(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dFlatTexture);
   o._native    = null;
   o.setup      = FWglFlatTexture_setup;
   o.makeMipmap = FWglFlatTexture_makeMipmap;
   o.uploadData = FWglFlatTexture_uploadData;
   o.upload     = FWglFlatTexture_upload;
   return o;
   function FWglFlatTexture_setup(){
      var o = this;
      var g = o._graphicContext._native;
      o.__base.FG3dFlatTexture.setup.call(o);
      o._native = g.createTexture();
   }
   function FWglFlatTexture_makeMipmap(){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      g.bindTexture(g.TEXTURE_2D, o._native);
      g.generateMipmap(g.TEXTURE_2D);
   }
   function FWglFlatTexture_uploadData(d, w, h){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      o.width = w;
      o.height = h;
      g.bindTexture(g.TEXTURE_2D, o._native);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, d);
      o._statusLoad = c.checkError("texImage2D", "Upload data failure.");
   }
   function FWglFlatTexture_upload(p){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var m = null;
      if(p.constructor == Image){
         m = p;
      }else if(RClass.isClass(p, FImage)){
         m = p.image();
      }else{
         throw new TError('Invalid image format.');
      }
      g.bindTexture(g.TEXTURE_2D, o._native);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, m);
      o._statusLoad = c.checkError("texImage2D", "Upload image failure.");
   }
}
MO.Graphic3d.FWglFragmentShader = function FWglFragmentShader(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dFragmentShader);
   o._native = null;
   o.setup   = FWglFragmentShader_setup;
   o.upload  = FWglFragmentShader_upload;
   o.dispose = FWglFragmentShader_dispose;
   return o;
   function FWglFragmentShader_setup(){
      var o = this;
      o.__base.FG3dFragmentShader.setup.call(o);
      var g = o._graphicContext._native;
      o._native = g.createShader(g.FRAGMENT_SHADER);
   }
   function FWglFragmentShader_upload(v){
      var o = this;
      var g = o._graphicContext._native;
      var n = o._native;
      g.shaderSource(n, v);
      g.compileShader(n);
      var r = g.getShaderParameter(n, g.COMPILE_STATUS);
      if(!r){
         var i = g.getShaderInfoLog(n);
         g.deleteShader(n);
         o._native = null;
         throw new TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', i, v);
      }
      o._source = v;
      return true;
   }
   function FWglFragmentShader_dispose(){
      var o = this;
      var g = o._graphicContext._native;
      if(o._native){
         g.deleteShader(o._native);
      }
      o._native = null;
      o.__base.FG3dFragmentShader.dispose.call(o);
   }
}
MO.Graphic3d.FWglFragmentShader = function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dIndexBuffer);
   o.setup  = FWglIndexBuffer_setup;
   o.upload = FWglIndexBuffer_upload;
   return o;
   function FWglIndexBuffer_setup(){
      var o = this;
      o.__base.FG3dIndexBuffer.setup.call(o);
      o._native = o._graphicContext._native.createBuffer();
   }
   function FWglIndexBuffer_upload(pd, pc){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      o._count = pc;
      var d = null;
      if((pd.constructor == Array) || (pd.constructor == ArrayBuffer)){
         d = new Uint16Array(pd);
      }else if(pd.constructor == Uint16Array){
         d = pd;
      }else{
         RLogger.fatal(o, null, 'Upload index data type is invalid. (value={1})', pd);
      }
      g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
      c.checkError('bindBuffer', 'Bind buffer failure.');
      g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
      c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
   }
}
MO.Graphic3d.FWglLayout = function FWglLayout(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dLayout);
   o.setup    = FWglLayout_setup;
   o.bind     = FWglLayout_bind;
   o.unbind   = FWglLayout_unbind;
   o.active   = FWglLayout_active;
   o.deactive = FWglLayout_deactive;
   o.dispose  = FWglLayout_dispose;
   return o;
   function FWglLayout_setup(){
      var o = this;
      o.__base.FG3dLayout.setup.call(o);
      var c = o._graphicContext;
      o._native = c._nativeLayout.createVertexArrayOES();
   }
   function FWglLayout_bind(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(o._native);
   }
   function FWglLayout_unbind(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(null);
   }
   function FWglLayout_active(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(o._native);
   }
   function FWglLayout_deactive(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(null);
   }
   function FWglLayout_dispose(){
      var o = this;
      var c = o._graphicContext;
      var n = o._native;
      if(n){
         c._nativeLayout.deleteVertexArrayOES(n);
         o._native = null;
      }
   }
}
MO.Graphic3d.FWglProgram = function FWglProgram(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dProgram);
   o._native        = null;
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.dispose        = FWglProgram_dispose;
   return o;
   function FWglProgram_setup(){
      var o = this;
      var c = g = o._graphicContext;
      o._native = c._native.createProgram();
   }
   function FWglProgram_vertexShader(){
      var o = this;
      var s = o._vertexShader;
      if(!s){
         s = o._vertexShader = RClass.create(FWglVertexShader);
         s.linkGraphicContext(o);
         s.setup();
      }
      return s;
   }
   function FWglProgram_fragmentShader(){
      var o = this;
      var s = o._fragmentShader;
      if(!s){
         s = o._fragmentShader = RClass.create(FWglFragmentShader);
         s.linkGraphicContext(o);
         s.setup();
      }
      return s;
   }
   function FWglProgram_upload(t, s){
      var o = this;
      if(t == EG3dShader.Vertex){
         o.vertexShader().upload(s);
      }else if(t == EG3dShader.Fragment){
         o.fragmentShader().upload(s);
      }else{
         throw new Error('Unknown type');
      }
   }
   function FWglProgram_build(){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var pn = o._native;
      var vs = o.vertexShader();
      g.attachShader(pn, vs._native);
      var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
      if(!r){
         return r;
      }
      var fs = o.fragmentShader();
      g.attachShader(pn, fs._native);
      var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
      if(!r){
         return r;
      }
      if(o.hasAttribute()){
         var as = o.attributes();
         var ac = as.count();
         for(var n = 0; n < ac; n++){
            var a = as.value(n);
            var an = a.name();
            g.bindAttribLocation(pn, n, an);
            r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
            if(!r){
               return r;
            }
         }
      }
   }
   function FWglProgram_link(){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var r = false;
      var pn = o._native;
      g.linkProgram(pn);
      var pr = g.getProgramParameter(pn, g.LINK_STATUS);
      if(!pr){
         var pi = g.getProgramInfoLog(pn);
         RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
         g.deleteProgram(o._native);
         o._native = null;
         return false;
      }
      g.validateProgram(pn);
      var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
      if(!pr){
         var pi = g.getProgramInfoLog(pn);
      }
      g.finish();
      r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
      if(!r){
         return r;
      }
      if(o.hasParameter()){
         var pc = o._parameters.count();
         for(var n = 0; n < pc; n++){
            var p = o._parameters.value(n);
            var i = g.getUniformLocation(pn, p.name());
            r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
            if(!r){
               return r;
            }
            p._slot = i;
            if(i != null){
               p._statusUsed = true;
            }
         }
      }
      if(o.hasAttribute()){
         var pc = o._attributes.count();
         for(var n = 0; n < pc; n++){
            var p = o._attributes.value(n);
            var i = g.getAttribLocation(pn, p.name());
            r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
            if(!r){
               return r;
            }
            p._slot = i;
            if(i != -1){
               p._statusUsed = true;
            }
         }
      }
      if(o.hasSampler()){
         var pc = o._samplers.count();
         for(var n = 0; n < pc; n++){
            var p = o._samplers.value(n);
            var i = g.getUniformLocation(pn, p.name());
            r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
            if(!r){
               return r;
            }
            p._slot = i;
            if(i != null){
               p._statusUsed = true;
            }
         }
         var si = 0;
         for(var n = 0; n < pc; n++){
            var p = o._samplers.value(n);
            if(p._statusUsed){
               p._index = si++;
            }
         }
      }
      return r;
   }
   function FWglProgram_dispose(){
      var o = this;
      if(o._program){
         o._graphicContext._native.deleteProgram(o._program);
      }
      o._program = null;
      o.base.FProgram3d.dispose.call(o);
   }
}
MO.Graphic3d.FWglRenderTarget = function FWglRenderTarget(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dRenderTarget);
   o._optionDepth = true;
   o._native      = null;
   o._nativeDepth = null;
   o.setup        = FWglRenderTarget_setup;
   o.build        = FWglRenderTarget_build;
   return o;
   function FWglRenderTarget_setup(){
      var o = this;
      o.__base.FG3dRenderTarget.setup.call(o);
      var c = o._graphicContext;
      var g = c._native;
      o._native = g.createFramebuffer();
      return c.checkError('createFramebuffer', 'Create frame buffer failure.');
   }
   function FWglRenderTarget_build(){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      g.bindFramebuffer(g.FRAMEBUFFER, o._native);
      var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
      if(!r){
         return r;
      }
      if(o._optionDepth){
         var nd = o._nativeDepth = g.createRenderbuffer();
         var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
         if(!r){
            return r;
         }
         g.bindRenderbuffer(g.RENDERBUFFER, nd);
         var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
         if(!r){
            return r;
         }
         g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, o._size.width, o._size.height);
         var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
         if(!r){
            return r;
         }
         g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
         var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._native, nd);
         if(!r){
            return r;
         }
      }
      var ts = o._textures;
      var tc = ts.count();
      for(var i = 0; i < tc; i++){
         var t = ts.get(i);
         g.bindTexture(g.TEXTURE_2D, t._native);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
         g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, o._size.width, o._size.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
         var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._native, o._size.width, o._size.height);
         if(!r){
            return r;
         }
         g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t._native, 0);
         var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._native, t._native);
         if(!r){
            return r;
         }
      }
   }
}
MO.Graphic3d.FWglVertexBuffer = function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dVertexBuffer);
   o.setup  = FWglVertexBuffer_setup;
   o.upload = FWglVertexBuffer_upload;
   return o;
   function FWglVertexBuffer_setup(){
      var o = this;
      o.__base.FG3dVertexBuffer.setup.call(o);
      var g = o._graphicContext._native;
      o._native = g.createBuffer();
   }
   function FWglVertexBuffer_upload(v, s, c){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      o.stride = s;
      o.count  = c;
      var d = null;
      if((v.constructor == Array) || (v.constructor == ArrayBuffer)){
         d = new Float32Array(v);
      }else if(v.constructor == Uint8Array){
         d = v;
      }else if(v.constructor == Float32Array){
         d = v;
      }else{
         throw new TError(o, 'Upload vertex data type is invalid. (value={1})', v);
      }
      g.bindBuffer(g.ARRAY_BUFFER, o._native);
      c.checkError('bindBuffer', 'Bindbuffer');
      g.bufferData(g.ARRAY_BUFFER, d, g.STATIC_DRAW);
      c.checkError('bufferData', 'bufferData');
   }
}
MO.Graphic3d.FWglVertexShader = function FWglVertexShader(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dVertexShader);
   o._native = null;
   o.setup   = FWglVertexShader_setup;
   o.upload  = FWglVertexShader_upload;
   o.dispose = FWglVertexShader_dispose;
   return o;
   function FWglVertexShader_setup(){
      var o = this;
      o.__base.FG3dVertexShader.setup.call(o);
      var g = o._graphicContext._native;
      o._native = g.createShader(g.VERTEX_SHADER);
   }
   function FWglVertexShader_upload(v){
      var o = this;
      var g = o._graphicContext._native;
      var n = o._native;
      g.shaderSource(n, v);
      g.compileShader(n);
      var r = g.getShaderParameter(n, g.COMPILE_STATUS);
      if(!r){
         var i = g.getShaderInfoLog(n);
         g.deleteShader(n);
         o._native = null;
         throw new TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', i, v);
      }
      o._source = v;
      return true;
   }
   function FWglVertexShader_dispose(){
      var o = this;
      var g = o._graphicContext._native;
      if(o._native){
         g.deleteShader(o._native);
      }
      o._native = null;
      o.__base.FG3dVertexShader.dispose.call(o);
   }
}
MO.Graphic3d.RWglUtility = new function RWglUtility(){
   var o = this;
   o.convertFillMode      = RWglUtility_convertFillMode;
   o.convertCullMode      = RWglUtility_convertCullMode;
   o.convertDepthMode     = RWglUtility_convertDepthMode;
   o.convertBlendFactors  = RWglUtility_convertBlendFactors;
   o.convertIndexStride   = RWglUtility_convertIndexStride;
   o.convertSamplerFilter = RWglUtility_convertSamplerFilter;
   return o;
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
   function RWglUtility_convertIndexStride(g, v){
      switch(v){
         case EG3dIndexStride.Uint16:
            return g.UNSIGNED_SHORT;
         case EG3dIndexStride.Uint32:
            return g.UNSIGNED_INT;
      }
      throw new TError(this, "Convert index stride failure. (stride_cd={1})", v);
   }
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
}
