MO.FWglContext = function FWglContext(o){
   o = MO.Class.inherits(this, o, MO.FG3dContext);
   o._handle             = MO.Class.register(o, new MO.AGetter('_handle'));
   o._handleInstance     = null;
   o._handleLayout       = null;
   o._handleDrawBuffers  = MO.Class.register(o, new MO.AGetter('_handleDrawBuffers'));
   o._handleSamplerS3tc  = MO.Class.register(o, new MO.AGetter('_handleSamplerS3tc'));
   o._handleDebugShader  = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = null;
   o._parameters         = null;
   o._extensions         = null;
   o._statusRecord       = false;
   o._recordBuffers      = MO.Class.register(o, new MO.AGetter('_recordBuffers'));
   o._recordSamplers     = MO.Class.register(o, new MO.AGetter('_recordSamplers'));
   o._statusFloatTexture = MO.Class.register(o, new MO.AGetter('_statusFloatTexture'), false);
   o._statusDrawBuffers  = MO.Class.register(o, new MO.AGetter('_statusDrawBuffers'), false);
   o._statusScissor      = MO.Class.register(o, new MO.AGetter('_statusScissor'), false);
   o._data9              = null;
   o._data16             = null;
   o.construct           = MO.FWglContext_construct;
   o.isValid             = MO.FWglContext_isValid;
   o.linkCanvas          = MO.FWglContext_linkCanvas;
   o.parameter           = MO.FWglContext_parameter;
   o.parameters          = MO.FWglContext_parameters;
   o.extension           = MO.FWglContext_extension;
   o.extensions          = MO.FWglContext_extensions;
   o.enableFloatTexture  = MO.FWglContext_enableFloatTexture;
   o.enableDrawBuffers   = MO.FWglContext_enableDrawBuffers;
   o.recordBegin         = MO.FWglContext_recordBegin;
   o.recordEnd           = MO.FWglContext_recordEnd;
   o.createProgram       = MO.FWglContext_createProgram;
   o.createLayout        = MO.FWglContext_createLayout;
   o.createVertexBuffer  = MO.FWglContext_createVertexBuffer;
   o.createIndexBuffer   = MO.FWglContext_createIndexBuffer;
   o.createFlatTexture   = MO.FWglContext_createFlatTexture;
   o.createCubeTexture   = MO.FWglContext_createCubeTexture;
   o.createRenderTarget  = MO.FWglContext_createRenderTarget;
   o.setViewport         = MO.FWglContext_setViewport;
   o.setFillMode         = MO.FWglContext_setFillMode;
   o.setDepthMode        = MO.FWglContext_setDepthMode;
   o.setCullingMode      = MO.FWglContext_setCullingMode;
   o.setBlendFactors     = MO.FWglContext_setBlendFactors;
   o.setScissorRectangle = MO.FWglContext_setScissorRectangle;
   o.setRenderTarget     = MO.FWglContext_setRenderTarget;
   o.setProgram          = MO.FWglContext_setProgram;
   o.bindConst           = MO.FWglContext_bindConst;
   o.bindVertexBuffer    = MO.FWglContext_bindVertexBuffer;
   o.bindTexture         = MO.FWglContext_bindTexture;
   o.clear               = MO.FWglContext_clear;
   o.clearColor          = MO.FWglContext_clearColor;
   o.clearDepth          = MO.FWglContext_clearDepth;
   o.readPixels          = MO.FWglContext_readPixels;
   o.drawTriangles       = MO.FWglContext_drawTriangles;
   o.present             = MO.FWglContext_present;
   o.checkError          = MO.FWglContext_checkError;
   o.saveConfig          = MO.FWglContext_saveConfig;
   o.dispose             = MO.FWglContext_dispose;
   return o;
}
MO.FWglContext_construct = function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new MO.SG3dContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
   o._recordBuffers = new MO.TObjects();
   o._recordSamplers = new MO.TObjects();
}
MO.FWglContext_isValid = function FWglContext_isValid(){
   return this._handle;
}
MO.FWglContext_linkCanvas = function FWglContext_linkCanvas(hCanvas){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, hCanvas)
   o._hCanvas = hCanvas;
   if(hCanvas.getContext){
      var parameters = new Object();
      parameters.alpha = o._optionAlpha;
      parameters.antialias = o._optionAntialias;
      parameters.depth = true;
      parameters.stencil = false;
      parameters.premultipliedAlpha = false;
      var handle = null;
      var codes = ['experimental-webgl2', 'experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl']
      var count = codes.length;
      for(var i = 0; i < count; i++){
         var code = codes[i];
         handle = hCanvas.getContext(code, parameters);
         if(handle){
            break;
         }
      }
      if(!handle){
         MO.Logger.error(o, 'Create context3d failure.');
         var event = new MO.SEvent(o);
         event.code = MO.EGraphicError.UnsupportWebGL;
         event.message = "Current browser can't support WebGL technique.";
         MO.Window.processDeviceError(event);
         event.dispose();
         return false;
      }
      o._handle = handle;
      o._contextAttributes = handle.getContextAttributes();
   }else{
      var event = new MO.SEvent(o);
      event.code = MO.EGraphicError.UnsupportWebGL;
      event.message = "Canvas can't support WebGL technique.";
      MO.Window.processDeviceError(event);
      event.dispose();
      return false;
   }
   var handle = o._handle;
   o.setDepthMode(true, MO.EG3dDepthMode.LessEqual);
   o.setCullingMode(true, MO.EG3dCullMode.Front);
   var capability = o._capability;
   capability.vendor = handle.getParameter(handle.VENDOR);
   capability.version = handle.getParameter(handle.VERSION);
   capability.shaderVersion = handle.getParameter(handle.SHADING_LANGUAGE_VERSION);
   capability.attributeCount = handle.getParameter(handle.MAX_VERTEX_ATTRIBS);
   capability.vertexConst = handle.getParameter(handle.MAX_VERTEX_UNIFORM_VECTORS);
   capability.varyingCount = handle.getParameter(handle.MAX_VARYING_VECTORS);
   capability.fragmentConst = handle.getParameter(handle.MAX_FRAGMENT_UNIFORM_VECTORS);
   capability.samplerCount = handle.getParameter(handle.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   capability.samplerSize = handle.getParameter(handle.MAX_TEXTURE_SIZE);
   var extension = o._handleInstance = handle.getExtension('ANGLE_instanced_arrays');
   if(extension){
      capability.optionInstance = true;
   }
   capability.mergeCount = parseInt((capability.vertexConst - 32) / 4);
   var extension = o._handleLayout = handle.getExtension('OES_vertex_array_object');
   if(extension){
      capability.optionLayout = true;
   }
   var extension = handle.getExtension('OES_element_index_uint');
   if(extension){
      capability.optionIndex32 = true;
   }
   var extension = o._handleDrawBuffers = handle.getExtension('WEBGL_draw_buffers');
   if(extension){
      capability.optionDrawBuffers = true;
   }
   var extension = o._handleSamplerS3tc = handle.getExtension('WEBGL_compressed_texture_s3tc');
   if(extension){
      capability.samplerCompressRgb = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
      capability.samplerCompressRgba = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
   }
   var shader = capability.shader = new Object();
   var vertexPrecision = shader.vertexPrecision = new Object();
   if(handle.getShaderPrecisionFormat){
      vertexPrecision.floatLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_FLOAT);
      vertexPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_FLOAT);
      vertexPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_FLOAT);
      vertexPrecision.intLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_INT);
      vertexPrecision.intMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_INT);
      vertexPrecision.intHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_INT);
   }
   var fragmentPrecision = shader.fragmentPrecision = new Object();
   if(handle.getShaderPrecisionFormat){
      fragmentPrecision.floatLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_FLOAT);
      fragmentPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_FLOAT);
      fragmentPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_FLOAT);
      fragmentPrecision.intLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_INT);
      fragmentPrecision.intMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_INT);
      fragmentPrecision.intHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_INT);
   }
   var extension = o._handleDebugShader = handle.getExtension('WEBGL_debug_shaders');
   if(extension){
      capability.optionShaderSource = true;
   }
   return true;
}
MO.FWglContext_parameter = function FWglContext_parameter(name){
   var parameters = this.parameters();
   return parameters[name];
}
MO.FWglContext_parameters = function FWglContext_parameters(){
   var o = this;
   var parameters = o._parameters;
   if(parameters){
      return parameters;
   }
   var names =['ACTIVE_TEXTURE',
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
   var handle = o._handle;
   var count = names.length;
   parameters = new Object();
   for(var i = 0; i < count; i++){
      var name = names[i];
      parameters[name] = handle.getParameter(handle[name]);
   }
   var extension = handle.getExtension('WEBGL_debug_renderer_info');
   if(extension){
      parameters['UNMASKED_RENDERER_WEBGL'] = handle.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      parameters['UNMASKED_VENDOR_WEBGL'] = handle.getParameter(extension.UNMASKED_VENDOR_WEBGL);
   }
   o._parameters = parameters;
   return parameters;
}
MO.FWglContext_extension = function FWglContext_extension(name){
   var extensions = this.extensions();
   return extensions[name];
}
MO.FWglContext_extensions = function FWglContext_extensions(){
   var o = this;
   var extensions = o._extensions;
   if(!extensions){
      extensions = o._extensions = new Object();
      var handle = o._handle;
      var names = handle.getSupportedExtensions();
      var count = names.length;
      for(var i = 0; i < count; i++){
         var name = names[i];
         extensions[name] = handle.getExtension(name);
      }
   }
   return extensions;
}
MO.FWglContext_enableFloatTexture = function FWglContext_enableFloatTexture(){
   var o = this;
   if(!o._statusFloatTexture){
      var handle = o._handle;
      var extension = handle.getExtension('OES_texture_float');
      if(!extension){
         return false;
      }
      var extension = handle.getExtension('OES_texture_float_linear');
      if(!extension){
         return false;
      }
      o._statusFloatTexture = true;
   }
   return o._statusFloatTexture;
}
MO.FWglContext_enableDrawBuffers = function FWglContext_enableDrawBuffers(){
   var o = this;
   if(!o._statusDrawBuffers){
      var handle = o._handle;
      var extension = o._handleDrawBuffers;
      if(!extension){
         return false;
      }
      extension.drawBuffersWEBGL([
         extension.COLOR_ATTACHMENT0_WEBGL
      ]);
      o._statusDrawBuffers = true;
   }
}
MO.FWglContext_recordBegin = function FWglContext_recordBegin(){
   var o = this;
   o._recordBuffers.clear();
   o._recordSamplers.clear();
   o._statusRecord = true;
}
MO.FWglContext_recordEnd = function FWglContext_recordEnd(){
   this._statusRecord = false;
}
MO.FWglContext_createProgram = function FWglContext_createProgram(){
   var o = this;
   var program = o.createObject(MO.FWglProgram);
   o._storePrograms.push(program);
   o._statistics._programTotal++;
   return program;
}
MO.FWglContext_createLayout = function FWglContext_createLayout(){
   var o = this;
   var layout = MO.Class.create(MO.FWglLayout);
   layout.linkGraphicContext(o);
   if(o._capability.optionLayout){
      layout.setup();
   }
   o._storeLayouts.push(layout);
   o._statistics._layoutTotal++;
   return layout;
}
MO.FWglContext_createVertexBuffer = function FWglContext_createVertexBuffer(clazz){
   var o = this;
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglVertexBuffer));
   buffer.linkGraphicContext(o);
   buffer.setup();
   o._storeBuffers.push(buffer);
   o._statistics._vertexBufferTotal++;
   return buffer;
}
MO.FWglContext_createIndexBuffer = function FWglContext_createIndexBuffer(clazz){
   var o = this;
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglIndexBuffer));
   o._storeBuffers.push(buffer);
   o._statistics._indexBufferTotal++;
   return buffer;
}
MO.FWglContext_createFlatTexture = function FWglContext_createFlatTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglFlatTexture));
   o._storeTextures.push(texture);
   o._statistics._flatTextureTotal++;
   return texture;
}
MO.FWglContext_createCubeTexture = function FWglContext_createCubeTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglCubeTexture));
   o._storeTextures.push(texture);
   o._statistics._cubeTextureTotal++;
   return texture;
}
MO.FWglContext_createRenderTarget = function FWglContext_createRenderTarget(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglRenderTarget));
   o._storeTargets.push(texture);
   o._statistics._targetTotal++;
   return texture;
}
MO.FWglContext_setViewport = function FWglContext_setViewport(left, top, width, height){
   var o = this;
   o._viewportRectangle.set(left, top, width, height);
   o._handle.viewport(left, top, width, height);
}
MO.FWglContext_setFillMode = function FWglContext_setFillMode(fillModeCd){
   var o = this;
   var graphic = o._handle;
   if(o._fillModeCd == fillModeCd){
      return false;
   }
   o._statistics._frameFillModeCount++;
   switch(fillModeCd){
      case EG3dFillMode.Point:
         graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.POINT);
         break;
      case EG3dFillMode.Line:
         graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.LINE);
         break;
      case EG3dFillMode.Face:
         graphic.polygonMode(graphic.FRONT, graphic.FILL);
         break;
      default:
         throw new MO.TError('Invalid parameter. (fill_mode={1})', fillModeCd);
   }
   o._fillModeCd = fillModeCd;
   return true;
}
MO.FWglContext_setDepthMode = function FWglContext_setDepthMode(depthFlag, depthCd){
   var o = this;
   var graphic = o._handle;
   if((o._optionDepth == depthFlag) && (o._depthModeCd == depthCd)){
      return false;
   }
   o._statistics._frameDepthModeCount++;
   if(o._optionDepth != depthFlag){
      if(depthFlag){
         graphic.enable(graphic.DEPTH_TEST);
      }else{
         graphic.disable(graphic.DEPTH_TEST);
      }
      o._optionDepth = depthFlag;
   }
   if(depthFlag && (o._depthModeCd != depthCd)){
      var depthCode = MO.RWglUtility.convertDepthMode(graphic, depthCd);
      graphic.depthFunc(depthCode);
      o._depthModeCd = depthCd;
   }
   return true;
}
MO.FWglContext_setCullingMode = function FWglContext_setCullingMode(cullFlag, cullCd){
   var o = this;
   var graphic = o._handle;
   if((o._optionCull == cullFlag) && (o._cullModeCd == cullCd)){
      return false;
   }
   o._statistics._frameCullModeCount++;
   if(o._optionCull != cullFlag){
      if(cullFlag){
         graphic.enable(graphic.CULL_FACE);
      }else{
         graphic.disable(graphic.CULL_FACE);
      }
      o._optionCull = cullFlag;
   }
   if(cullFlag && (o._cullModeCd != cullCd)){
      var cullValue = MO.RWglUtility.convertCullMode(graphic, cullCd);
      graphic.cullFace(cullValue);
      o._cullModeCd = cullCd;
   }
   return true;
}
MO.FWglContext_setBlendFactors = function FWglContext_setBlendFactors(blendFlag, sourceCd, tagetCd){
   var o = this;
   var graphic = o._handle;
   if((o._statusBlend == blendFlag) && (o._blendSourceCd == sourceCd) && (o._blendTargetCd == tagetCd)){
      return false;
   }
   o._statistics._frameBlendModeCount++;
   if(o._statusBlend != blendFlag){
      if(blendFlag){
         graphic.enable(graphic.BLEND);
      }else{
         graphic.disable(graphic.BLEND);
         o._blendSourceCd = 0;
         o._blendTargetCd = 0;
      }
      o._statusBlend = blendFlag;
   }
   if(blendFlag && ((o._blendSourceCd != sourceCd) || (o._blendTargetCd != tagetCd))){
      var sourceValue = MO.RWglUtility.convertBlendFactors(graphic, sourceCd);
      var tagetValue = MO.RWglUtility.convertBlendFactors(graphic, tagetCd);
      graphic.blendFunc(sourceValue, tagetValue);
      o._blendSourceCd = sourceCd;
      o._blendTargetCd = tagetCd;
   }
   return true;
}
MO.FWglContext_setScissorRectangle = function FWglContext_setScissorRectangle(left, top, width, height){
   var o = this;
   var handle = o._handle;
   var scissorFlag = (width > 0) && (height > 0);
   if(o._statusScissor != scissorFlag){
      if(scissorFlag){
         handle.enable(handle.SCISSOR_TEST);
      }else{
         handle.disable(handle.SCISSOR_TEST);
      }
      o._statusScissor = scissorFlag;
   }
   if(scissorFlag){
      handle.scissor(left, top, width, height);
   }
}
MO.FWglContext_setRenderTarget = function FWglContext_setRenderTarget(renderTarget){
   var o = this;
   var graphic = o._handle;
   if(o._activeRenderTarget == renderTarget){
      return;
   }
   o._statistics._frameTargetCount++;
   var result = true;
   if(renderTarget == null){
      graphic.bindFramebuffer(graphic.FRAMEBUFFER, null);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!result){
         return result;
      }
      var size = o._size;
      graphic.viewport(0, 0, size.width, size.height);
   }else{
      graphic.bindFramebuffer(graphic.FRAMEBUFFER, renderTarget._handle);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", renderTarget._handle);
      if(!result){
         return result;
      }
      var size = renderTarget.size();
      graphic.viewport(0, 0, size.width, size.height);
   }
   o._activeRenderTarget = renderTarget;
   return result;
}
MO.FWglContext_setProgram = function FWglContext_setProgram(program){
   var o = this;
   var graphic = o._handle;
   if(o._program == program){
      return;
   }
   o._statistics._frameProgramCount++;
   if(program){
      graphic.useProgram(program._handle);
   }else{
      graphic.useProgram(null);
   }
   o._program = program;
   return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", program, program._handle);
}
MO.FWglContext_bindConst = function FWglContext_bindConst(shaderCd, slot, formatCd, data, count){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameConstCount++;
   switch(formatCd){
      case MO.EG3dParameterFormat.Float1:{
         graphic.uniform1fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float2:{
         graphic.uniform2fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3:{
         graphic.uniform3fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float4:{
         graphic.uniform4fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3x3:{
         var bytes = o._data9;
         bytes[ 0] = data[ 0];
         bytes[ 1] = data[ 4];
         bytes[ 2] = data[ 8];
         bytes[ 3] = data[ 1];
         bytes[ 4] = data[ 5];
         bytes[ 5] = data[ 9];
         bytes[ 6] = data[ 2];
         bytes[ 7] = data[ 6];
         bytes[ 8] = data[10];
         graphic.uniformMatrix3fv(slot, graphic.FALSE, bytes);
         o._statistics._frameConstLength += bytes.byteLength;
         result = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float4x4:{
         var bytes = null;
         if(data.constructor == Float32Array){
            bytes = data;
         }else if(data.writeData){
            bytes = o._data16;
            data.writeData(bytes, 0);
         }else{
            throw new MO.TError('Unknown data type.');
         }
         graphic.uniformMatrix4fv(slot, graphic.FALSE, bytes);
         o._statistics._frameConstLength += bytes.byteLength;
         result = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown format type. (format_cd={1})', formatCd);
      }
   }
   return result;
}
MO.FWglContext_bindVertexBuffer = function FWglContext_bindVertexBuffer(slot, vertexBuffer, offset, formatCd){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameBufferCount++;
   if(o._statusRecord){
      var layout = new MO.SG3dLayoutBuffer();
      layout.slot = slot;
      layout.buffer = vertexBuffer;
      layout.index = offset;
      layout.formatCd = formatCd;
      o._recordBuffers.push(layout);
   }
   var handle = null;
   if(vertexBuffer != null){
      handle = vertexBuffer._handle;
   }
   graphic.bindBuffer(graphic.ARRAY_BUFFER, handle);
   result = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", handle);
   if(!result){
      return result;
   }
   if(vertexBuffer){
      graphic.enableVertexAttribArray(slot);
      result = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", slot);
      if(!result){
         return result;
      }
   }else{
      graphic.disableVertexAttribArray(slot);
      result = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", slot);
      return result;
   }
   var stride = vertexBuffer._stride;
   switch(formatCd){
      case MO.EG3dAttributeFormat.Float1:
         graphic.vertexAttribPointer(slot, 1, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float2:
         graphic.vertexAttribPointer(slot, 2, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float3:
         graphic.vertexAttribPointer(slot, 3, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float4:
         graphic.vertexAttribPointer(slot, 4, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4Normal:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, true, stride, offset);
         break;
      default:
         throw new MO.TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
   }
   result = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", slot, formatCd);
   return result;
}
MO.FWglContext_bindTexture = function FWglContext_bindTexture(slot, index, texture){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameTextureCount++;
   if(o._statusRecord){
      var layout = new MO.SG3dLayoutSampler();
      layout.slot = slot;
      layout.index = index;
      layout.texture = texture;
      o._recordSamplers.push(layout);
   }
   if(o._activeTextureSlot != slot){
      graphic.uniform1i(slot, index);
      graphic.activeTexture(graphic.TEXTURE0 + index);
      result = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", slot, index);
      if(!result){
         return result;
      }
      o._activeTextureSlot = slot;
   }
   if(texture == null){
      graphic.bindTexture(graphic.TEXTURE_2D, null);
      result = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", slot);
      return result;
   }
   var handle = texture._handle;
   var textureCd = texture.textureCd();
   switch(textureCd){
      case MO.EG3dTexture.Flat2d:{
         graphic.bindTexture(graphic.TEXTURE_2D, handle);
         result = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      case MO.EG3dTexture.Cube:{
         graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, handle);
         result = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown texture type.');
      }
   }
   return result;
}
MO.FWglContext_clear = function FWglContext_clear(red, green, blue, alpha, depth){
   var o = this;
   var graphic = o._handle;
   graphic.clearColor(red, green, blue, alpha);
   graphic.clearDepth(depth);
   graphic.clear(graphic.COLOR_BUFFER_BIT | graphic.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_clearColor = function FWglContext_clearColor(red, green, blue, alpha){
   var o = this;
   var graphic = o._handle;
   graphic.clearColor(red, green, blue, alpha);
   graphic.clear(graphic.COLOR_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_clearDepth = function FWglContext_clearDepth(depth){
   var o = this;
   var graphic = o._handle;
   graphic.clearDepth(depth);
   graphic.clear(graphic.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_readPixels = function FWglContext_readPixels(left, top, width, height){
   var o = this;
   var graphic = o._handle;
   var length = 4 * width * height;
   var data = new Uint8Array(length);
   graphic.readPixels(left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
   return data;
}
MO.FWglContext_drawTriangles = function FWglContext_drawTriangles(indexBuffer, offset, count){
   var o = this;
   var graphic = o._handle;
   var result = true;
   if(offset == null){
      offset = 0;
   }
   if(count == null){
      count = indexBuffer.count();
   }
   graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, indexBuffer._handle);
   result = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", indexBuffer, offset, count, indexBuffer._handle);
   if(!result){
       return result;
   }
   var strideCd = indexBuffer.strideCd();
   var strideValue = MO.RWglUtility.convertIndexStride(graphic, strideCd);
   var offsetValue = 0;
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         offsetValue = offset << 1;
         break;
      case MO.EG3dIndexStride.Uint32:
         offsetValue = offset << 2;
         break;
   }
   var drawModeCd = indexBuffer.drawModeCd();
   var drawModeValue = MO.RWglUtility.convertDrawMode(graphic, drawModeCd);
   switch(drawModeCd){
      case MO.EG3dDrawMode.Line:
         break;
   }
   graphic.drawElements(drawModeValue, count, strideValue, offsetValue);
   o._statistics._frameTriangleCount += count;
   o._statistics._frameDrawCount++;
   result = o.checkError("drawElements", "Draw triangles failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
   if(!result){
       return result;
   }
   graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, null);
   result = o.checkError("bindBuffer", "Bind element array buffer failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
   if(!result){
       return result;
   }
   return result;
}
MO.FWglContext_present = function FWglContext_present(){
}
MO.FWglContext_checkError = function FWglContext_checkError(code, message, parameter1){
   var o = this;
   if(!o._capability.optionDebug){
      return true;
   }
   if(!MO.Runtime.isDebug()){
      return true;
   }
   var graphic = o._handle;
   var result = false;
   var error = null;
   var errorInfo = null;
   while(true){
      error = graphic.getError();
      if(error == graphic.NO_ERROR){
         result = true;
         break;
      }
      switch(error){
         case graphic.INVALID_OPERATION:
            errorInfo = "Invalid operation.";
            break;
         case graphic.INVALID_ENUM:
            errorInfo = "Invalid enum.";
            break;
         case graphic.INVALID_VALUE:
            errorInfo = "Invalid value.";
            break;
         case graphic.INVALID_FRAMEBUFFER_OPERATION:
            errorInfo = "Invalid paramebuffer opeartion.";
            break;
         case graphic.OUT_OF_MEMORY:
            errorInfo = "Out of memory.";
            break;
         default:
            errorInfo = "Unknown";
            break;
      }
   }
   if(!result){
      MO.Logger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', error, errorInfo);
   }
   return result;
}
MO.FWglContext_saveConfig = function FWglContext_saveConfig(xconfig){
   var o = this;
   var parameters = o.parameters();
   var xparameters = xconfig.create('Parameters');
   MO.Lang.Xml.saveObject(xparameters, 'Parameter', parameters);
   var extensions = o.extensions();
   var xextensions = xconfig.create('Extensions');
   MO.Lang.Xml.saveObject(xextensions, 'Extension', extensions);
}
MO.FWglContext_dispose = function FWglContext_dispose(){
   var o = this;
   o._data9 = null;
   o._data16 = null;
   o._recordBuffers = MO.Lang.Object.dispose(o._recordBuffers);
   o._recordSamplers = MO.Lang.Object.dispose(o._recordSamplers);
   o._contextAttributes = null;
   o._parameters = null;
   o._extensions = null;
   o._activeTextureSlot = null;
   o._handleDrawBuffers  = null;
   o._handleSamplerS3tc = null;
   o._handleDebugShader = null;
   o.__base.FG3dContext.dispose.call(o);
}
MO.FWglCubeTexture = function FWglCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dCubeTexture);
   o._handle    = null;
   o.setup      = MO.FWglCubeTexture_setup;
   o.isValid    = MO.FWglCubeTexture_isValid;
   o.makeMipmap = MO.FWglCubeTexture_makeMipmap;
   o.upload     = MO.FWglCubeTexture_upload;
   o.update     = MO.FWglCubeTexture_update;
   o.dispose    = MO.FWglCubeTexture_dispose;
   return o;
}
MO.FWglCubeTexture_setup = function FWglCubeTexture_setup(){
   var o = this;
   var g = o._graphicContext._handle;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._handle = g.createTexture();
}
MO.FWglCubeTexture_isValid = function FWglCubeTexture_isValid(){
   var o = this;
   var g = o._graphicContext._handle;
   return g.isTexture(o._handle);
}
MO.FWglCubeTexture_makeMipmap = function FWglCubeTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   g.generateMipmap(g.TEXTURE_CUBE_MAP);
}
MO.FWglCubeTexture_upload = function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._graphicContext;
   var g = c._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
   o.update();
}
MO.FWglCubeTexture_update = function FWglCubeTexture_update(){
   var o = this;
   o.__base.FG3dCubeTexture.update.call(o);
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMinCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
   }
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMagCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, c);
   }
}
MO.FWglCubeTexture_dispose = function FWglCubeTexture_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._handle;
   if(n){
      c._handle.deleteTexture(n);
      o._handle = null;
   }
   o.__base.FG3dCubeTexture.dispose.call(o);
}
MO.FWglFlatTexture = function FWglFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dFlatTexture);
   o._handle       = null;
   o._statusUpdate = false;
   o.setup         = MO.FWglFlatTexture_setup;
   o.isValid       = MO.FWglFlatTexture_isValid;
   o.texture       = MO.FWglFlatTexture_texture;
   o.makeMipmap    = MO.FWglFlatTexture_makeMipmap;
   o.uploadData    = MO.FWglFlatTexture_uploadData;
   o.upload        = MO.FWglFlatTexture_upload;
   o.uploadElement = MO.FWglFlatTexture_uploadElement;
   o.update        = MO.FWglFlatTexture_update;
   o.dispose       = MO.FWglFlatTexture_dispose;
   return o;
}
MO.FWglFlatTexture_setup = function FWglFlatTexture_setup(){
   var o = this;
   var g = o._graphicContext._handle;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._handle = g.createTexture();
}
MO.FWglFlatTexture_isValid = function FWglFlatTexture_isValid(){
   var o = this;
   var g = o._graphicContext._handle;
   return g.isTexture(o._handle);
}
MO.FWglFlatTexture_texture = function FWglFlatTexture_texture(){
   return this;
}
MO.FWglFlatTexture_makeMipmap = function FWglFlatTexture_makeMipmap(){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   handle.generateMipmap(handle.TEXTURE_2D);
}
MO.FWglFlatTexture_uploadData = function FWglFlatTexture_uploadData(content, width, height){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   var data = null;
   if(content.constructor == ArrayBuffer){
      data = new Uint8Array(content);
   }else if(content.constructor == Uint8Array){
      data = content;
   }else if(content.constructor == Float32Array){
      if(!context.enableFloatTexture()){
         throw new MO.TError('Invalid content float format.');
      }
      data = content;
   }else{
      throw new MO.TError('Invalid content format.');
   }
   o.width = width;
   o.height = height;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   var internalformatCd = handle.RGBA;
   var formatCd = handle.RGBA;
   var typeCd = handle.UNSIGNED_BYTE;
   if(content.constructor == Float32Array){
      internalformatCd = handle.ALPHA;
      formatCd = handle.ALPHA;
      typeCd = handle.FLOAT;
   }
   handle.texImage2D(handle.TEXTURE_2D, 0, internalformatCd, width, height, 0, formatCd, typeCd, data);
   o._statusLoad = context.checkError("texImage2D", "Upload content failure.");
   o.update();
}
MO.FWglFlatTexture_upload = function FWglFlatTexture_upload(content){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var handle = context._handle;
   var data = null;
   var tagName = content.tagName;
   if((tagName == 'IMG') || (tagName == 'VIDEO') || (tagName == 'CANVAS')){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      data = content.image();
   }else if(MO.Class.isClass(content, MO.MCanvasObject)){
      data = content.htmlCanvas();
   }else{
      throw new TError('Invalid image format.');
   }
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   if(o._optionFlipY){
      handle.pixelStorei(handle.UNPACK_FLIP_Y_WEBGL, true);
   }
   handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, data);
   o.update();
   o._statusLoad = context.checkError("texImage2D", "Upload image failure.");
}
MO.FWglFlatTexture_uploadElement = function FWglFlatTexture_uploadElement(element){
   var o = this;
   var handle = o._graphicContext._handle;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, element);
   if(!o._statusUpdate){
      o.update();
      o._statusUpdate = true;
   }
}
MO.FWglFlatTexture_update = function FWglFlatTexture_update(){
   var o = this;
   o.__base.FG3dFlatTexture.update.call(o);
   var handle = o._graphicContext._handle;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMinCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMagCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapS);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_S, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapT);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_T, code);
   }
}
MO.FWglFlatTexture_dispose = function FWglFlatTexture_dispose(){
   var o = this;
   var context = o._graphicContext;
   var handle = o._handle;
   if(handle){
      context._handle.deleteTexture(handle);
      o._handle = null;
   }
   o.__base.FG3dFlatTexture.dispose.call(o);
}
MO.FWglFragmentShader = function FWglFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dFragmentShader);
   o._handle      = null;
   o.setup        = MO.FWglFragmentShader_setup;
   o.targetSource = MO.FWglFragmentShader_targetSource;
   o.upload       = MO.FWglFragmentShader_upload;
   o.dispose      = MO.FWglFragmentShader_dispose;
   return o;
}
MO.FWglFragmentShader_setup = function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createShader(graphic.FRAGMENT_SHADER);
}
MO.FWglFragmentShader_targetSource = function FWglFragmentShader_targetSource(){
   var o = this;
   var source = null;
   var context = o._graphicContext;
   var capability = context.capability();
   if(capability.optionShaderSource){
      source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
   }else{
      source = o._source;
   }
   return source;
}
MO.FWglFragmentShader_upload = function FWglFragmentShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._handle;
   var shader = o._handle;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._handle = null;
      throw new MO.TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
MO.FWglFragmentShader_dispose = function FWglFragmentShader_dispose(){
   var o = this;
   var context = o._graphicContext;
   var shader = o._handle;
   if(shader){
      context._handle.deleteShader(shader);
      o._handle = null;
   }
   o.__base.FG3dFragmentShader.dispose.call(o);
}
MO.FWglIndexBuffer = function FWglIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dIndexBuffer);
   o._handle = null;
   o.setup   = MO.FWglIndexBuffer_setup;
   o.isValid = MO.FWglIndexBuffer_isValid;
   o.upload  = MO.FWglIndexBuffer_upload;
   o.dispose = MO.FWglIndexBuffer_dispose;
   return o;
}
MO.FWglIndexBuffer_setup = function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._handle = o._graphicContext._handle.createBuffer();
}
MO.FWglIndexBuffer_isValid = function FWglIndexBuffer_isValid(){
   var o = this;
   var handle = o._graphicContext._handle;
   return handle.isBuffer(o._handle);
}
MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(data, count, remain){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   if(remain){
      o._data = data;
   }
   o._count = count;
   var memory = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      if(o._strideCd == MO.EG3dIndexStride.Uint16){
         memory = new Uint16Array(data);
      }else if(o._strideCd == MO.EG3dIndexStride.Uint32){
         memory = new Uint32Array(data);
      }else{
         throw new TError(o, 'Index stride is invalid.');
      }
   }else if(data.constructor == Uint16Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint16){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else if(data.constructor == Uint32Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint32){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else{
      throw new TError(o, 'Upload index data type is invalid. (value={1})', data);
   }
   handle.bindBuffer(handle.ELEMENT_ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bind buffer failure.');
   handle.bufferData(handle.ELEMENT_ARRAY_BUFFER, memory, handle.STATIC_DRAW);
   context.checkError('bufferData', 'Upload buffer data. (count={1})', count);
}
MO.FWglIndexBuffer_dispose = function FWglIndexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   o._resource = null;
   var handle = o._handle;
   if(handle){
      context._handle.deleteBuffer(handle);
      o._handle = null;
   }
   o.__base.FG3dIndexBuffer.dispose.call(o);
}
MO.FWglLayout = function FWglLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dLayout);
   o._handle  = null;
   o.setup    = MO.FWglLayout_setup;
   o.bind     = MO.FWglLayout_bind;
   o.unbind   = MO.FWglLayout_unbind;
   o.active   = MO.FWglLayout_active;
   o.deactive = MO.FWglLayout_deactive;
   o.dispose  = MO.FWglLayout_dispose;
   return o;
}
MO.FWglLayout_setup = function FWglLayout_setup(){
   var o = this;
   o.__base.FG3dLayout.setup.call(o);
   var c = o._graphicContext;
   o._handle = c._handleLayout.createVertexArrayOES();
}
MO.FWglLayout_bind = function FWglLayout_bind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}
MO.FWglLayout_unbind = function FWglLayout_unbind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}
MO.FWglLayout_active = function FWglLayout_active(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}
MO.FWglLayout_deactive = function FWglLayout_deactive(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}
MO.FWglLayout_dispose = function FWglLayout_dispose(){
   var o = this;
   var c = o._graphicContext;
   var layout = o._handle;
   if(layout){
      c._handleLayout.deleteVertexArrayOES(layout);
      o._handle = null;
   }
   o.__base.FG3dLayout.dispose.call(o);
}
MO.FWglProgram = function FWglProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dProgram);
   o._handle        = null;
   o.setup          = MO.FWglProgram_setup;
   o.vertexShader   = MO.FWglProgram_vertexShader;
   o.fragmentShader = MO.FWglProgram_fragmentShader;
   o.upload         = MO.FWglProgram_upload;
   o.build          = MO.FWglProgram_build;
   o.link           = MO.FWglProgram_link;
   o.dispose        = MO.FWglProgram_dispose;
   return o;
}
MO.FWglProgram_setup = function FWglProgram_setup(){
   var o = this;
   var c = g = o._graphicContext;
   o._handle = c._handle.createProgram();
}
MO.FWglProgram_vertexShader = function FWglProgram_vertexShader(){
   var o = this;
   var shader = o._vertexShader;
   if(!shader){
      shader = o._vertexShader = MO.Class.create(MO.FWglVertexShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_fragmentShader = function FWglProgram_fragmentShader(){
   var o = this;
   var shader = o._fragmentShader;
   if(!shader){
      shader = o._fragmentShader = MO.Class.create(MO.FWglFragmentShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_upload = function FWglProgram_upload(shaderCd, source){
   var o = this;
   if(shaderCd == MO.EG3dShader.Vertex){
      o.vertexShader().upload(source);
   }else if(shaderCd == MO.EG3dShader.Fragment){
      o.fragmentShader().upload(source);
   }else{
      throw new Error('Unknown type');
   }
}
MO.FWglProgram_build = function FWglProgram_build(){
   var o = this;
   var context = o._graphicContext;
   var g = context._handle;
   var pn = o._handle;
   var vertexShader = o.vertexShader();
   g.attachShader(pn, vertexShader._handle);
   var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vertexShader._handle);
   if(!result){
      return result;
   }
   var fragmentShader = o.fragmentShader();
   g.attachShader(pn, fragmentShader._handle);
   var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fragmentShader._handle);
   if(!result){
      return result;
   }
   if(o.hasAttribute()){
      var attributes = o.attributes();
      var ac = attributes.count();
      for(var n = 0; n < ac; n++){
         var attribute = attributes.at(n);
         var attributeName = attribute.name();
         g.bindAttribLocation(pn, n, attributeName);
         result = context.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, attributeName);
         if(!result){
            return result;
         }
      }
   }
}
MO.FWglProgram_link = function FWglProgram_link(){
   var o = this;
   var context = o._graphicContext;
   var g = context._handle;
   var result = false;
   var pn = o._handle;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      MO.Logger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._handle);
      o._handle = null;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   result = context.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!result){
      return result;
   }
   if(o.hasParameter()){
      var count = o._parameters.count();
      for(var n = 0; n < count; n++){
         var parameter = o._parameters.at(n);
         var handle = g.getUniformLocation(pn, parameter.name());
         result = context.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, parameter.name(), handle);
         if(!result){
            return result;
         }
         parameter._slot = handle;
         if(handle != null){
            parameter._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var count = o._attributes.count();
      for(var n = 0; n < count; n++){
         var attribute = o._attributes.at(n);
         var handle = g.getAttribLocation(pn, attribute.name());
         result = context.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, attribute.name(), handle);
         if(!result){
            return result;
         }
         attribute._slot = handle;
         if(handle != -1){
            attribute._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var count = o._samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = o._samplers.at(n);
         var handle = g.getUniformLocation(pn, sampler.name());
         result = context.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, sampler.name(), handle);
         if(!result){
            return result;
         }
         sampler._slot = handle;
         if(handle != null){
            sampler._statusUsed = true;
         }
      }
      var si = 0;
      for(var n = 0; n < count; n++){
         var sampler = o._samplers.value(n);
         if(sampler._statusUsed){
            sampler._index = si++;
         }
      }
   }
   return result;
}
MO.FWglProgram_dispose = function FWglProgram_dispose(){
   var o = this;
   var context = o._graphicContext;
   var handle = o._handle;
   if(handle){
      context._handle.deleteProgram(handle);
      o._handle = null;
   }
   o.__base.FG3dProgram.dispose.call(o);
}
MO.FWglRenderTarget = function FWglRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dRenderTarget);
   o._optionDepth = true;
   o._handle      = null;
   o._handleDepth = null;
   o.setup        = MO.FWglRenderTarget_setup;
   o.build        = MO.FWglRenderTarget_build;
   o.dispose      = MO.FWglRenderTarget_dispose;
   return o;
}
MO.FWglRenderTarget_setup = function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var context = o._graphicContext;
   var graphic = context._handle;
   o._handle = graphic.createFramebuffer();
   return context.checkError('createFramebuffer', 'Create frame buffer failure.');
}
MO.FWglRenderTarget_build = function FWglRenderTarget_build(){
   var o = this;
   var size = o._size;
   var context = o._graphicContext;
   var handle = context._handle;
   handle.bindFramebuffer(handle.FRAMEBUFFER, o._handle);
   var result = context.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!result){
      return result;
   }
   if(o._optionDepth){
      var depthHandle = o._handleDepth = handle.createRenderbuffer();
      var result = context.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!result){
         return result;
      }
      handle.bindRenderbuffer(handle.RENDERBUFFER, depthHandle);
      var result = context.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!result){
         return result;
      }
      handle.renderbufferStorage(handle.RENDERBUFFER, handle.DEPTH_COMPONENT16, size.width, size.height);
      var result = context.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!result){
         return result;
      }
      handle.framebufferRenderbuffer(handle.FRAMEBUFFER, handle.DEPTH_ATTACHMENT, handle.RENDERBUFFER, depthHandle);
      var result = context.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._handle, depthHandle);
      if(!result){
         return result;
      }
   }
   var textures = o._textures;
   var textureCount = textures.count();
   var attachment0 = handle.COLOR_ATTACHMENT0;
   if(context.statusDrawBuffers()){
      var extension = context.handleDrawBuffers();
      attachment0 = extension.COLOR_ATTACHMENT0_WEBGL;
   }
   for(var i = 0; i < textureCount; i++){
      var texture = textures.get(i);
      handle.bindTexture(handle.TEXTURE_2D, texture._handle);
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, handle.LINEAR);
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, handle.LINEAR);
      handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, size.width, size.height, 0, handle.RGBA, handle.UNSIGNED_BYTE, null);
      var result = context.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", texture._handle, size.width, size.height);
      if(!result){
         return result;
      }
      handle.framebufferTexture2D(handle.FRAMEBUFFER, attachment0 + i, handle.TEXTURE_2D, texture._handle, 0);
      var result = context.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._handle, texture._handle);
      if(!result){
         return result;
      }
   }
   handle.bindFramebuffer(handle.FRAMEBUFFER, null);
}
MO.FWglRenderTarget_dispose = function FWglRenderTarget_dispose(){
   var o = this;
   var context = o._graphicContext;
   var handleDepth = o._handleDepth;
   if(handleDepth){
      context._handle.deleteRenderbuffer(handleDepth);
      o._handleDepth = null;
   }
   var handle = o._handle;
   if(handle){
      context._handle.deleteFramebuffer(handle);
      o._handle = null;
   }
   o.__base.FG3dRenderTarget.dispose.call(o);
}
MO.FWglVertexBuffer = function FWglVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexBuffer);
   o._handle = null;
   o.setup   = MO.FWglVertexBuffer_setup;
   o.isValid = MO.FWglVertexBuffer_isValid;
   o.upload  = MO.FWglVertexBuffer_upload;
   o.dispose = MO.FWglVertexBuffer_dispose;
   return o;
}
MO.FWglVertexBuffer_setup = function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createBuffer();
}
MO.FWglVertexBuffer_isValid = function FWglVertexBuffer_isValid(){
   var o = this;
   var graphic = o._graphicContext._handle;
   return graphic.isBuffer(o._handle);
}
MO.FWglVertexBuffer_upload = function FWglVertexBuffer_upload(data, stride, count, remain){
   var o = this;
   var context = o._graphicContext;
   var graphics = context._handle;
   if(remain){
      o._data = data;
   }
   o._stride = stride;
   o._count = count;
   var arrays = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      switch(o._formatCd){
         case MO.EG3dAttributeFormat.Float1:
         case MO.EG3dAttributeFormat.Float2:
         case MO.EG3dAttributeFormat.Float3:
         case MO.EG3dAttributeFormat.Float4:
            arrays = new Float32Array(data);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            arrays = new Uint8Array(data);
            break;
         default:
            throw new MO.TError(o, 'Unknown data type.');
      }
   }else if(data.constructor == Uint8Array){
      arrays = data;
   }else if(data.constructor == Float32Array){
      arrays = data;
   }else{
      throw new MO.TError(o, 'Upload vertex data type is invalid. (data={1})', data);
   }
   graphics.bindBuffer(graphics.ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bindbuffer');
   graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
   context.checkError('bufferData', 'bufferData');
}
MO.FWglVertexBuffer_dispose = function FWglVertexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   o._resource = null;
   var buffer = o._handle;
   if(buffer){
      context._handle.deleteBuffer(buffer);
      o._handle = null;
   }
   o.__base.FG3dVertexBuffer.dispose.call(o);
}
MO.FWglVertexShader = function FWglVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexShader);
   o._handle      = null;
   o.setup        = MO.FWglVertexShader_setup;
   o.targetSource = MO.FWglVertexShader_targetSource;
   o.upload       = MO.FWglVertexShader_upload;
   o.dispose      = MO.FWglVertexShader_dispose;
   return o;
}
MO.FWglVertexShader_setup = function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createShader(graphic.VERTEX_SHADER);
}
MO.FWglVertexShader_targetSource = function FWglVertexShader_targetSource(){
   var o = this;
   var source = null;
   var context = o._graphicContext;
   var capability = context.capability();
   if(capability.optionShaderSource){
      source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
   }else{
      source = o._source;
   }
   return source;
}
MO.FWglVertexShader_upload = function FWglVertexShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._handle;
   var shader = o._handle;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._handle = null;
      throw new MO.TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
MO.FWglVertexShader_dispose = function FWglVertexShader_dispose(){
   var o = this;
   var context = o._graphicContext;
   var shader = o._handle;
   if(shader){
      context._handle.deleteShader(shader);
      o._handle = null;
   }
   o.__base.FG3dVertexShader.dispose.call(o);
}
MO.RWglUtility = function RWglUtility(){
   return this;
}
MO.RWglUtility.prototype.convertFillMode = function RWglUtility_convertFillMode(graphic, fillCd){
   switch(fillCd){
      case MO.EG3dFillMode.Point:
         return graphic.POINT;
      case MO.EG3dFillMode.Line:
         return graphic.LINE;
      case MO.EG3dFillMode.Face:
         return graphic.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", fillCd);
}
MO.RWglUtility.prototype.convertDrawMode = function RWglUtility_convertDrawMode(graphic, drawCd){
   switch(drawCd){
      case MO.EG3dDrawMode.Point:
         return graphic.POINTS;
      case MO.EG3dDrawMode.Lines:
         return graphic.LINES;
      case MO.EG3dDrawMode.LineStrip:
         return graphic.LINE_STRIP;
      case MO.EG3dDrawMode.LineLoop:
         return graphic.LINE_LOOP;
      case MO.EG3dDrawMode.Triangles:
         return graphic.TRIANGLES;
      case MO.EG3dDrawMode.TriangleStrip:
         return graphic.TRIANGLE_STRIP;
      case MO.EG3dDrawMode.TriangleFan:
         return graphic.TRIANGLE_FAN;
      case MO.EG3dDrawMode.Quads:
         return graphic.QUADS;
      case MO.EG3dDrawMode.QuadStrip:
         return graphic.QUAD_STRIP;
   }
   throw new TError(this, "Convert draw mode failure. (draw_cd={1})", drawCd);
}
MO.RWglUtility.prototype.convertCullMode = function RWglUtility_convertCullMode(graphic, cullCd){
   switch(cullCd){
      case MO.EG3dCullMode.Front:
         return graphic.FRONT;
      case MO.EG3dCullMode.Back:
         return graphic.BACK;
      case MO.EG3dCullMode.Both:
         return graphic.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", cullCd);
}
MO.RWglUtility.prototype.convertDepthMode = function RWglUtility_convertDepthMode(graphic, depthCd){
   switch(depthCd){
      case MO.EG3dDepthMode.Equal:
         return graphic.EQUAL;
      case MO.EG3dDepthMode.NotEqual:
         return graphic.NOTEQUAL;
      case MO.EG3dDepthMode.Less:
         return graphic.LESS;
      case MO.EG3dDepthMode.LessEqual:
         return graphic.LEQUAL;
      case MO.EG3dDepthMode.Greater:
         return graphic.GREATER;
      case MO.EG3dDepthMode.GreaterEqual:
         return graphic.GEQUAL;
      case MO.EG3dDepthMode.Always:
         return graphic.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", depthCd);
}
MO.RWglUtility.prototype.convertBlendFactors = function RWglUtility_convertBlendFactors(graphic, blendCd){
   switch(blendCd){
      case MO.EG3dBlendMode.Zero:
         return graphic.ZERO;
      case MO.EG3dBlendMode.One:
         return graphic.ONE;
      case MO.EG3dBlendMode.SrcColor:
         return graphic.SRC_COLOR;
      case MO.EG3dBlendMode.OneMinusSrcColor:
         return graphic.ONE_MINUS_SRC_COLOR;
      case MO.EG3dBlendMode.DstColor:
         return graphic.DST_COLOR;
      case MO.EG3dBlendMode.OneMinusDstColor:
         return graphic.ONE_MINUS_DST_COLOR;
      case MO.EG3dBlendMode.SrcAlpha:
         return graphic.SRC_ALPHA;
      case MO.EG3dBlendMode.OneMinusSrcAlpha:
         return graphic.ONE_MINUS_SRC_ALPHA;
      case MO.EG3dBlendMode.DstAlpha:
         return graphic.DST_ALPHA;
      case MO.EG3dBlendMode.OneMinusDstAlpha:
         return graphic.ONE_MINUS_DST_ALPHA;
      case MO.EG3dBlendMode.SrcAlphaSaturate:
         return graphic.SRC_ALPHA_SATURATE;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", blendCd);
}
MO.RWglUtility.prototype.convertIndexStride = function RWglUtility_convertIndexStride(graphic, strideCd){
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         return graphic.UNSIGNED_SHORT;
      case MO.EG3dIndexStride.Uint32:
         return graphic.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", strideCd);
}
MO.RWglUtility.prototype.convertSamplerFilter = function RWglUtility_convertSamplerFilter(graphic, filterCd){
   switch(filterCd){
      case MO.EG3dSamplerFilter.Unknown:
         return 0;
      case MO.EG3dSamplerFilter.Nearest:
         return graphic.NEAREST;
      case MO.EG3dSamplerFilter.Linear:
         return graphic.LINEAR;
      case MO.EG3dSamplerFilter.Repeat:
         return graphic.REPEAT;
      case MO.EG3dSamplerFilter.MirroredRepeat:
         return graphic.MIRRORED_REPEAT;
      case MO.EG3dSamplerFilter.ClampToEdge:
         return graphic.CLAMP_TO_EDGE;
      case MO.EG3dSamplerFilter.ClampToBorder:
         return graphic.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", filterCd);
}
MO.RWglUtility = new MO.RWglUtility();
