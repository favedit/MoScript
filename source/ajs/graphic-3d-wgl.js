function FWglContext(o){
   o = RClass.inherits(this, o, FRenderContext);
   o._native             = null;
   o._textureActiveSlot  = 0;
   o.linkCanvas          = FWglContext_linkCanvas;
   o.createProgram       = FWglContext_createProgram;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.setViewPort         = FWglContext_setViewPort;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setProgram          = FWglContext_setProgram;
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   o.clear               = FWglContext_clear;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   o.checkError          = FWglContext_checkError;
   return o;
}
function FWglContext_linkCanvas(h){
   this._native = h.getContext('experimental-webgl')
}
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_setViewPort(w, h){
   var g = this._native;
   g.viewportWidth = w;
   g.viewportHeight = h;
   g.viewport(0, 0, w, h);
}
function FWglContext_setFillMode(){
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
function FWglContext_setProgram(v){
   var o = this;
   var g = o._native;
   if(v != null){
      g.useProgram(v._native);
   }else{
      g.useProgram(null);
   }
   _program = v;
   var r = o.checkError("useProgram", "Set program failure. (program={1}, program_id={2})", v, v._native);
   return r;
}
function FWglContext_bindConst(shaderCd, slot, formatCd, pd, length){
   var o = this;
   var g = o._native;
   var r = true;
   switch (formatCd){
      case ERenderParameterFormat.Float1:{
         if(length % 4 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         var count = length / 4;
         g.uniform1fv(slot, count, pd);
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float2:{
         if(length % 8 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         var count = length / 8;
         g.uniform2fv(slot, count, pd);
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float3:{
         if(length % 12 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=d)", length);
            return false;
         }
         var count = length / 12;
         g.uniform3fv(slot, count, pd);
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float4:{
         if(length % 16 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         var count = length / 16;
         g.uniform4fv(slot, count, pd);
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float3x3:{
         if(length % 36 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         var count = length / 36;
         g.uniformMatrix3fv(slot, count, false, pd);
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float4x3:{
         if(length % 48 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         var count = length / 48;
         g.uniform4fv(slot, count * 3, pd);
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
      case ERenderParameterFormat.Float4x4:{
         if(length % 64 != 0){
            RLogger.fatal(o, null, "Float4x4 length is invalid. (length=%d)", length);
            return false;
         }
         var count = length >> 6;
         var dt = new Float32Array(16);
         dt[ 0] = pd[ 0];
         dt[ 1] = pd[ 4];
         dt[ 2] = pd[ 8];
         dt[ 3] = pd[12];
         dt[ 4] = pd[ 1];
         dt[ 5] = pd[ 5];
         dt[ 6] = pd[ 9];
         dt[ 7] = pd[13];
         dt[ 8] = pd[ 2];
         dt[ 9] = pd[ 6];
         dt[10] = pd[10];
         dt[11] = pd[14];
         dt[12] = pd[ 3];
         dt[13] = pd[ 7];
         dt[14] = pd[11];
         dt[15] = pd[15];
         g.uniformMatrix4fv(slot, false, dt);
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
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
      case ERenderAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case ERenderAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case ERenderAttributeFormat.Byte4Normal:
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
   if(o._textureActiveSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._renderTextureActiveSlot = ps;
   }
   switch(pt.textureCd()){
      case ERenderTexture.Flat2d:{
         g.bindTexture(g.TEXTURE_2D, pt._native);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
         r = o.checkError("glBindTexture", "Bind texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      case ERenderTexture.Cube:{
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         r = o.checkError("glBindTexture", "Bind texture failure. (texture_id=%d)", pt._native);
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
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
}
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count;
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd);
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
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FRenderCubeTexture);
   o._native = null;
   o.setup  = FWglCubeTexture_setup;
   o.link     = FWglCubeTexture_link;
   return o;
}
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FRenderFlatTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglCubeTexture_link(v){
   this._Texture = v;
}
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FRenderFlatTexture);
   o._native = null;
   o.onImageLoad = FWglFlatTexture_onImageLoad;
   o.setup   = FWglFlatTexture_setup;
   o.loadUrl = FWglFlatTexture_loadUrl;
   o.upload  = FWglFlatTexture_upload;
   return o;
}
function FWglFlatTexture_onImageLoad(v){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, v);
   var r = c.checkError("texImage2D", "");
   o._statusLoad = r;
}
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FRenderFlatTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglFlatTexture_loadUrl(p){
   var o = this;
   var r = new Image();
   r.src = p;
   r.onload = function(){o.onImageLoad(this);}
}
function FWglFlatTexture_upload(p){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, p);
   var r = c.checkError("texImage2D", "Upload image failure.");
   o._statusLoad = r;
}
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FRenderFragmentShader);
   o._native = null;
   o.setup   = FWglFragmentShader_setup;
   o.upload  = FWglFragmentShader_upload;
   o.dispose = FWglFragmentShader_dispose;
   return o;
}
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FRenderFragmentShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}
function FWglFragmentShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload fragment shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(s);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglFragmentShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FRenderFragmentShader.dispose.call(o);
}
function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, FRenderIndexBuffer);
   o.setup  = FWglIndexBuffer_setup;
   o.upload = FWglIndexBuffer_upload;
   return o;
}
function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FRenderIndexBuffer.setup.call(o);
   var g = o._context._native;
   o._native = g.createBuffer();
}
function FWglIndexBuffer_upload(pd, pc){
   var o = this;
   var c = o._context;
   var g = c._native;
   o.count  = pc;
   var d = null;
   if(pd.constructor == Array){
      d = new Uint16Array(pd);
   }else if(pd.constructor == Uint16Array){
      d = pd;
   }else{
      RLogger.fatal(o, null, 'Upload index data type is invalid. (value={1})', pd);
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}
function FWglProgram(o){
   o = RClass.inherits(this, o, FRenderProgram);
   o._native        = null;
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.setAttribute   = FWglProgram_setAttribute;
   o.setParameter   = FWglProgram_setParameter;
   o.setSampler     = FWglProgram_setSampler;
   o.dispose        = FWglProgram_dispose;
   return o;
}
function FWglProgram_setup(){
   var o = this;
   var g = o._context._native;
   o._native = g.createProgram();
}
function FWglProgram_vertexShader(){
   var o = this;
   var s = o._vertexShader;
   if(s == null){
      s = RClass.create(FWglVertexShader);
      s.linkContext(o._context);
      s.setup();
      o._vertexShader = s;
   }
   return s;
}
function FWglProgram_fragmentShader(){
   var o = this;
   var s = o._fragmentShader;
   if(s == null){
      s = RClass.create(FWglFragmentShader);
      s.linkContext(o._context);
      s.setup();
      o._fragmentShader = s;
   }
   return s;
}
function FWglProgram_upload(t, s){
   var o = this;
   var g = o._context._native;
   if(t == ERenderShader.Vertex){
      var vs = o.vertexShader();
      vs.upload(s);
   }else if(t == ERenderShader.Fragment){
      var fs = o.fragmentShader();
      fs.upload(s);
   }else{
      throw new Error('Unknown type');
   }
}
function FWglProgram_build(){
   var o = this;
   var c = o._context;
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
   var c = o._context;
   var g = c._native;
   var r = false;
   var pn = o._native;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._native);
      o._native = null;;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Validate program failure. (reason={1})", pi);
      g.deleteProgram(o._native);
      o._native = null;;
      return false;
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
            p._statusUsed = true;;
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
function FWglProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   o._context.bindVertexBuffer(p._slot, pb, 0, pf);
}
function FWglProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   o._context.bindConst(null, p._slot, p._formatCd, pv, pc);
}
function FWglProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   o._context.bindTexture(p._slot, p._index, pt);
}
function FWglProgram_dispose(){
   var o = this;
   if(o._program){
      o._context._context.deleteProgram(o._program);
   }
   o._program = null;
   o.base.FProgram3d.dispose.call(o);
}
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FRenderVertexBuffer);
   o.setup  = FWglVertexBuffer_setup;
   o.upload = FWglVertexBuffer_upload;
   return o;
}
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FRenderVertexBuffer.setup.call(o);
   var g = o._context._native;
   o._native = g.createBuffer();
}
function FWglVertexBuffer_upload(v, s, c){
   var o = this;
   var c = o._context;
   var g = c._native;
   o.stride = s;
   o.count  = c;
   var d = null;
   if(v.constructor == Array){
      d = new Float32Array(v);
   }else if(v.constructor == Float32Array){
      d = v;
   }else{
      RLogger.fatal(o, null, 'Upload vertex data type is invalid. (value={1})', v);
   }
   g.bindBuffer(g.ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}
function FWglVertexShader(o){
   o = RClass.inherits(this, o, FRenderVertexShader);
   o._native = null;
   o.setup   = FWglVertexShader_setup;
   o.upload  = FWglVertexShader_upload;
   o.dispose = FWglVertexShader_dispose;
   return o;
}
function FWglVertexShader_setup(){
   var o = this;
   o.__base.FRenderVertexShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.VERTEX_SHADER);
}
function FWglVertexShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload vertex shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(s);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglVertexShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FRenderVertexShader.dispose.call(o);
}
var RWglUtility = new function RWglUtility(){
   var o = this;
   o.convertFillMode     = RWglUtility_convertFillMode;
   o.convertCullMode     = RWglUtility_convertCullMode;
   o.convertDepthMode    = RWglUtility_convertDepthMode;
   o.convertBlendFactors = RWglUtility_convertBlendFactors;
   o.convertIndexStride  = RWglUtility_convertIndexStride;
   return o;
}
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
