MO.EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
MO.EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
MO.EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.Zero             = 0;
   o.One              = 1;
   o.SrcColor         = 2;
   o.OneMinusSrcColor = 3;
   o.DstColor         = 4;
   o.OneMinusDstColor = 5;
   o.SrcAlpha         = 6;
   o.OneMinusSrcAlpha = 7;
   o.DstAlpha         = 8;
   o.OneMinusDstAlpha = 9;
   o.SrcAlphaSaturate = 10;
   return o;
}
MO.EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
MO.EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
MO.EG3dDrawMode = new function EG3dDrawMode(){
   var o = this;
   o.Unknown = 0;
   o.Points = 1;
   o.Lines = 2;
   o.LineStrip = 3;
   o.LineLoop = 4;
   o.Triangles = 5;
   o.TriangleStrip = 6;
   o.TriangleFan = 7;
   o.Quads = 8;
   o.QuadStrip = 9;
   return o;
}
MO.EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
MO.EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
MO.EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
MO.EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'diffuse';
   o.Alpha         = 'alpha';
   o.Normal        = 'normal';
   o.SpecularColor = 'specular.color';
   o.SpecularLevel = 'specular.level';
   o.Light         = 'light';
   o.Reflect       = 'reflect';
   o.Refract       = 'refract';
   o.Emissive      = 'emissive';
   o.Height        = 'height';
   o.Environment   = 'environment';
   return o;
}
MO.EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
MO.EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
MO.EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
MO.SG3dContextCapability = function SG3dContextCapability(){
   var o = this;
   o.vendor              = null;
   o.version             = null;
   o.shaderVersion       = null;
   o.optionDebug         = false;
   o.optionInstance      = false;
   o.optionLayout        = false;
   o.optionMaterialMap   = false;
   o.optionIndex32       = false;
   o.optionShaderSource  = false;
   o.mergeCount          = 0;
   o.attributeCount      = null;
   o.vertexCount         = 65536;
   o.vertexConst         = null;
   o.fragmentConst       = null;
   o.varyingCount        = null;
   o.samplerCount        = null;
   o.samplerSize         = null;
   o.samplerCompressRgb  = null;
   o.samplerCompressRgba = null;
   o.shader              = null;
   return o;
}
MO.SG3dContextCapability.prototype.calculateBoneCount = function SG3dContextCapability_calculateBoneCount(boneCount, vertexCount){
   var o = this;
   var rb = 0;
   var bi = boneCount % 4;
   if(bi != 0){
      rb = boneCount + 4 - bi;
   }else{
      rb = boneCount;
   }
   var r = 0;
   var ib = (o.vertexConst - 16) / 4;
   if(rb > ib){
      r = ib;
   }else{
      r = rb;
   }
   return r;
}
MO.SG3dContextCapability.prototype.calculateInstanceCount = function SG3dContextCapability_calculateInstanceCount(boneCount, vertexCount){
   var o = this;
   var cr = (4 * boneCount) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vertexCount > 0){
      var iv = o.vertexCount / vertexCount;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
MO.SG3dContextCapability.prototype.dispose = function SG3dContextCapability_dispose(){
   var o = this;
   o.shader = null;
   MO.RObject.free(o);
}
with(MO){
   MO.SG3dLayoutBuffer = function SG3dLayoutBuffer(){
      var o = this;
      o.slot     = null;
      o.buffer   = null;
      o.index    = null;
      o.formatCd = null;
      o.dispose  = SG3dLayoutBuffer_dispose;
      return o;
   }
   MO.SG3dLayoutBuffer_dispose = function SG3dLayoutBuffer_dispose(){
      var o = this;
      o.slot = null;
      o.buffer = null;
      o.index = null;
      o.formatCd = null;
   }
}
with(MO){
   MO.SG3dLayoutSampler = function SG3dLayoutSampler(){
      var o = this;
      o.slot    = null;
      o.index   = -1;
      o.texture = null;
      o.dispose = SG3dLayoutSampler_dispose;
      return o;
   }
   MO.SG3dLayoutSampler_dispose = function SG3dLayoutSampler_dispose(){
      var o = this;
      o.slot = null;
      o.index = -1;
      o.texture = null;
   }
}
with(MO){
   MO.FG3dBuffer = function FG3dBuffer(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._code   = RClass.register(o, new AGetSet('_code'));
      o.isValid = RMethod.virtual(o, 'isValid');
      return o;
   }
}
with(MO){
   MO.FG3dContext = function FG3dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      o._optionAlpha        = true;
      o._optionAntialias    = false;
      o._size               = RClass.register(o, new AGetter('_size'));
      o._logicSize          = RClass.register(o, new AGetter('_logicSize'));
      o._ratio              = RClass.register(o, new AGetSet('_ratio'));
      o._sizeRatio          = RClass.register(o, new AGetter('_sizeRatio'));
      o._capability         = RClass.register(o, new AGetter('_capability'));
      o._statistics         = RClass.register(o, new AGetter('_statistics'));
      o._fillModeCd         = EG3dFillMode.Face;
      o._optionDepth        = false;
      o._optionCull         = false;
      o._depthModeCd        = 0;
      o._cullModeCd         = 0;
      o._statusBlend        = false;
      o._blendSourceCd      = 0;
      o._blendTargetCd      = 0;
      o._program            = null;
      o._storePrograms      = null;
      o._storeLayouts       = null;
      o._storeBuffers       = null;
      o._storeTextures      = null;
      o._storeTargets       = null;
      o.construct           = FG3dContext_construct;
      o.linkCanvas          = FG3dContext_linkCanvas;
      o.createObject        = FG3dContext_createObject;
      o.createProgram       = RMethod.virtual(o, 'createProgram');
      o.createLayout        = RMethod.virtual(o, 'createLayout');
      o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
      o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
      o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
      o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
      o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
      o.setViewport         = RMethod.virtual(o, 'setViewport');
      o.setFillMode         = RMethod.virtual(o, 'setFillMode');
      o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
      o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
      o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
      o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
      o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
      o.setProgram          = RMethod.virtual(o, 'setProgram');
      o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
      o.bindTexture         = RMethod.virtual(o, 'bindTexture');
      o.prepare             = FG3dContext_prepare;
      o.clear               = RMethod.virtual(o, 'clear');
      o.clearColor          = RMethod.virtual(o, 'clearColor');
      o.clearDepth          = RMethod.virtual(o, 'clearDepth');
      o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
      o.present             = RMethod.virtual(o, 'present');
      o.dispose             = FG3dContext_dispose;
      return o;
   }
   MO.FG3dContext_construct = function FG3dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      o._size = new SSize2(1280, 720);
      o._logicSize = new SSize2(1280, 720);
      o._sizeRatio = new SSize2(1, 1);
      o._statistics = RClass.create(FG3dStatistics);
      RConsole.find(FStatisticsConsole).register('graphic3d.context', o._statistics);
      o._storePrograms = new TObjects();
      o._storeLayouts = new TObjects();
      o._storeBuffers = new TObjects();
      o._storeTextures = new TObjects();
      o._storeTargets = new TObjects();
   }
   MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }
   MO.FG3dContext_createObject = function FG3dContext_createObject(clazz){
      var o = this;
      var instance = RClass.create(clazz);
      instance.linkGraphicContext(o);
      instance.setup();
      return instance;
   }
   MO.FG3dContext_prepare = function FG3dContext_prepare(){
      this._statistics.resetFrame();
   }
   MO.FG3dContext_dispose = function FG3dContext_dispose(){
      var o = this;
      var programs = o._storePrograms;
      if(programs){
         var count = programs.count();
         for(var i = 0; i < count; i++){
            var program = programs.at(i);
            program.dispose();
         }
         o._storePrograms = RObject.dispose(programs);
      }
      var layouts = o._storeLayouts;
      if(layouts){
         var count = layouts.count();
         for(var i = 0; i < count; i++){
            var layout = layouts.at(i);
            layout.dispose();
         }
         o._storeLayouts = RObject.dispose(layouts);
      }
      var buffers = o._storeBuffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            buffer.dispose();
         }
         o._storeBuffers = RObject.dispose(buffers);
      }
      var textures = o._storeTextures;
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var texture = textures.at(i);
            texture.dispose();
         }
         o._storeTextures = RObject.dispose(textures);
      }
      var targets = o._storeTargets;
      if(targets){
         var count = targets.count();
         for(var i = 0; i < count; i++){
            var target = targets.at(i);
            target.dispose();
         }
         o._storeTargets = RObject.dispose(targets);
      }
      o._program = null;
      o._size = RObject.dispose(o._size);
      o._logicSize = RObject.dispose(o._logicSize);
      o._sizeRatio = RObject.dispose(o._sizeRatio);
      o._capability = RObject.dispose(o._capability);
      o._statistics = RObject.dispose(o._statistics);
      o._handleInstance = null;
      o._handleLayout = null;
      o._handle = null;
      o.__base.FGraphicContext.dispose.call(o);
   }
}
with(MO){
   MO.FG3dCubeTexture = function FG3dCubeTexture(o){
      o = RClass.inherits(this, o, FG3dTexture);
      o.size = 0;
      o.construct = FG3dTexture_construct;
      o.upload    = RMethod.virtual(o, 'upload');
      o.update    = RMethod.empty;
      return o;
   }
   MO.FG3dTexture_construct = function FG3dTexture_construct(){
      var o = this;
      o.__base.FG3dTexture.construct();
      o._textureCd = EG3dTexture.Cube;
   }
}
with(MO){
   MO.FG3dFlatTexture = function FG3dFlatTexture(o){
      o = RClass.inherits(this, o, FG3dTexture);
      o._optionFlipY = RClass.register(o, new AGetSet('_optionFlipY'), false);
      o._size        = RClass.register(o, new AGetter('_size'));
      o.construct    = FG3dFlatTexture_construct;
      o.uploadData   = RMethod.virtual(o, 'uploadData');
      o.upload       = RMethod.virtual(o, 'upload');
      o.update       = RMethod.empty;
      return o;
   }
   MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
      var o = this;
      o.__base.FG3dTexture.construct();
      o._textureCd = EG3dTexture.Flat2d;
   }
}
with(MO){
   MO.FG3dFragmentShader = function FG3dFragmentShader(o){
      o = RClass.inherits(this, o, FG3dShader);
      return o;
   }
}
with(MO){
   MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
      o = RClass.inherits(this, o, FG3dBuffer);
      o._strideCd   = RClass.register(o, new AGetSet('_strideCd'), EG3dIndexStride.Uint16);
      o._count      = RClass.register(o, new AGetSet('_count'), 0);
      o._drawModeCd = RClass.register(o, new AGetSet('_drawModeCd'), EG3dDrawMode.Triangles);
      o._lineWidth  = RClass.register(o, new AGetSet('_lineWidth'), 1);
      o.upload      = RMethod.virtual(o, 'upload');
      return o;
   }
}
with(MO){
   MO.FG3dLayout = function FG3dLayout(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._buffers       = null;
      o._samplers      = null;
      o.buffers        = FG3dLayout_buffers;
      o.linkBuffers    = FG3dLayout_linkBuffers;
      o.bindBuffers    = FG3dLayout_bindBuffers;
      o.samplers       = FG3dLayout_samplers;
      o.linkSamplers   = FG3dLayout_linkSamplers;
      o.bindSamplers   = FG3dLayout_bindSamplers;
      o.unbindSamplers = FG3dLayout_unbindSamplers;
      o.dispose        = FG3dLayout_dispose;
      return o;
   }
   MO.FG3dLayout_construct = function FG3dLayout_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
   }
   MO.FG3dLayout_buffers = function FG3dLayout_buffers(){
      return this._buffers;
   }
   MO.FG3dLayout_linkBuffers = function FG3dLayout_linkBuffers(buffers){
      var o = this;
      if(!buffers.isEmpty()){
         var items = o._buffers;
         if(!items){
            items = o._buffers = new TObjects();
         }
         items.assign(buffers);
      }
   }
   MO.FG3dLayout_bindBuffers = function FG3dLayout_bindBuffers(){
      var o = this;
      var context = o._graphicContext;
      var buffers = o._buffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            context.bindVertexBuffer(buffer.slot, buffer.buffer, buffer.index, buffer.formatCd);
         }
      }
   }
   MO.FG3dLayout_samplers = function FG3dLayout_samplers(){
      return this._samplers;
   }
   MO.FG3dLayout_linkSamplers = function FG3dLayout_linkSamplers(samplers){
      var o = this;
      if(!samplers.isEmpty()){
         var items = o._samplers;
         if(!items){
            items = o._samplers = new TObjects();
         }
         items.assign(samplers);
      }
   }
   MO.FG3dLayout_bindSamplers = function FG3dLayout_bindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, sampler.texture);
         }
      }
   }
   MO.FG3dLayout_unbindSamplers = function FG3dLayout_unbindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, null);
         }
      }
   }
   MO.FG3dLayout_dispose = function FG3dLayout_dispose(){
      var o = this;
      o._buffers = RObject.dispose(o._buffers);
      o._samplers = RObject.dispose(o._samplers);
      o.__base.FG3dObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dProgram = function FG3dProgram(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._attributes       = null;
      o._parameters       = null;
      o._samplers         = null;
      o._vertexShader     = null;
      o._fragmentShader   = null;
      o.hasAttribute      = FG3dProgram_hasAttribute;
      o.registerAttribute = FG3dProgram_registerAttribute;
      o.findAttribute     = FG3dProgram_findAttribute;
      o.attributes        = FG3dProgram_attributes;
      o.hasParameter      = FG3dProgram_hasParameter;
      o.registerParameter = FG3dProgram_registerParameter;
      o.findParameter     = FG3dProgram_findParameter;
      o.parameters        = FG3dProgram_parameters;
      o.hasSampler        = FG3dProgram_hasSampler;
      o.registerSampler   = FG3dProgram_registerSampler;
      o.findSampler       = FG3dProgram_findSampler;
      o.samplers          = FG3dProgram_samplers;
      o.vertexShader      = RMethod.virtual(o, 'vertexShader');
      o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
      o.setAttribute      = FG3dProgram_setAttribute;
      o.setParameter      = FG3dProgram_setParameter;
      o.setParameter4     = FG3dProgram_setParameter4;
      o.setSampler        = FG3dProgram_setSampler;
      o.upload            = RMethod.virtual(o, 'upload');
      o.dispose           = FG3dProgram_dispose;
      return o;
   }
   MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
      var o = this;
      var r = o._attributes;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
      var o = this;
      var r = RClass.create(FG3dProgramAttribute);
      r._name = n;
      o.attributes().set(n, r);
      return r;
   }
   MO.FG3dProgram_findAttribute = function FG3dProgram_findAttribute(n){
      return this._attributes ? this._attributes.get(n) : null;
   }
   MO.FG3dProgram_attributes = function FG3dProgram_attributes(){
      var o = this;
      var r = o._attributes;
      if(r == null){
         r = o._attributes = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_hasParameter = function FG3dProgram_hasParameter(){
      var o = this;
      var r = o._parameters;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerParameter = function FG3dProgram_registerParameter(pn, pf){
      var o = this;
      var r = RClass.create(FG3dProgramParameter);
      r._name = pn;
      r.formatCd = pf;
      o.parameters().set(pn, r);
      return r;
   }
   MO.FG3dProgram_findParameter = function FG3dProgram_findParameter(n){
      return this._parameters ? this._parameters.get(n) : null;
   }
   MO.FG3dProgram_parameters = function FG3dProgram_parameters(){
      var o = this;
      var r = o._parameters;
      if(r == null){
         r = o._parameters = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_hasSampler = function FG3dProgram_hasSampler(){
      var o = this;
      var r = o._samplers;
      return r ? !r.isEmpty() : false;
   }
   MO.FG3dProgram_registerSampler = function FG3dProgram_registerSampler(pn){
      var o = this;
      var r = RClass.create(FG3dProgramSampler);
      r._name = pn;
      o.samplers().set(pn, r);
      return r;
   }
   MO.FG3dProgram_findSampler = function FG3dProgram_findSampler(n){
      return this._samplers ? this._samplers.get(n) : null;
   }
   MO.FG3dProgram_samplers = function FG3dProgram_samplers(){
      var o = this;
      var r = o._samplers;
      if(r == null){
         r = o._samplers = new TDictionary();
      }
      return r;
   }
   MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
      var o = this;
      var p = o.findAttribute(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid attribute. (name={1})', pn);
      }
      o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
   }
   MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
      var o = this;
      var p = o.findParameter(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid parameter. (name={1})', pn);
      }
      var d = null;
      var t = pv.constructor;
      if((t == Float32Array) || (t == SMatrix3d) || (t == SPerspectiveMatrix3d)){
         d = pv;
      }else if(t == SColor4){
         d = RTypeArray.float4();
         d[0] = pv.red;
         d[1] = pv.green;
         d[2] = pv.blue;
         d[3] = pv.alpha;
      }else if((t == SPoint3) || (t == SVector3)){
         d = RTypeArray.float3();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
      }else if((t == SPoint4) || (t == SVector4)){
         d = RTypeArray.float4();
         d[0] = pv.x;
         d[1] = pv.y;
         d[2] = pv.z;
         d[3] = pv.w;
      }else{
         throw new TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
      }
      if(p.attachData(d)){
         o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
      }
   }
   MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
      var v = RTypeArray.float4();
      v[0] = px;
      v[1] = py;
      v[2] = pz;
      v[3] = pw;
      this.setParameter(pn, v, 1);
   }
   MO.FG3dProgram_setSampler = function FG3dProgram_setSampler(pn, pt){
      var o = this;
      var p = o.findSampler(pn);
      if(p == null){
         throw new TError(o, 'Bind invalid sampler. (name={1})', pn);
      }
      o._graphicContext.bindTexture(p._slot, p._index, pt);
   }
   MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
      var o = this;
      o._attributes = RObject.dispose(o._attributes, true);
      o._parameters = RObject.dispose(o._parameters, true);
      o._samplers = RObject.dispose(o._samplers, true);
      o._vertexShader = RObject.dispose(o._vertexShader);
      o._fragmentShader = RObject.dispose(o._fragmentShader);
      o.__base.FG3dObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = RClass.register(o, new AGetter('_name'));
      o._linker     = RClass.register(o, new AGetter('_linker'));
      o._statusUsed = false;
      o._slot       = null;
      o._index      = -1;
      o._formatCd   = EG3dAttributeFormat.Unknown;
      o.loadConfig  = FG3dProgramAttribute_loadConfig;
      o.dispose     = FG3dProgramAttribute_dispose;
      return o;
   }
   MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(xconfig){
      var o = this;
      o._name = xconfig.get('name');
      o._linker = xconfig.get('linker');
      o._formatCd = REnum.encode(EG3dAttributeFormat, xconfig.get('format'));
   }
   MO.FG3dProgramAttribute_dispose = function FG3dProgramAttribute_dispose(){
      var o = this;
      o._slot = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dProgramParameter = function FG3dProgramParameter(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = RClass.register(o, new AGetter('_name'));
      o._linker     = RClass.register(o, new AGetter('_linker'));
      o._formatCd   = EG3dParameterFormat.Unknown;
      o._define     = RClass.register(o, new AGetter('_define'));
      o._statusUsed = false;
      o._slot       = null;
      o._size       = 0;
      o._buffer     = null;
      o._memory     = null;
      o.attachData  = FG3dProgramParameter_attachData;
      o.loadConfig  = FG3dProgramParameter_loadConfig;
      o.dispose     = FG3dProgramParameter_dispose;
      return o;
   }
   MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(value){
      var o = this;
      var result = false;
      var clazz = value.constructor;
      if(clazz == SMatrix3d){
         var memory = o._memory;
         if(!memory){
            memory = o._memory = new Float32Array(16);
         }
         result = RFloat.attach(memory, value._data, 16);
      }else if(clazz == Float32Array){
         var length = value.length;
         var memory = o._memory;
         if(!memory){
            memory = o._memory = new Float32Array(length);
         }
         result = RFloat.attach(memory, value, length);
      }else{
         throw new TError(o, 'Unknown data type.');
      }
      return result;
   }
   MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(xconfig){
      var o = this;
      o._name = xconfig.get('name');
      o._linker = xconfig.get('linker');
      o._formatCd = REnum.encode(EG3dParameterFormat, xconfig.get('format'));
      o._define = xconfig.get('define');
   }
   MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
      var o = this;
      o._slot = null;
      o._memory = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dProgramSampler = function FG3dProgramSampler(o){
      o = RClass.inherits(this, o, FObject);
      o._name       = RClass.register(o, new AGetter('_name'));
      o._linker     = RClass.register(o, new AGetter('_linker'));
      o._statusUsed = false;
      o._formatCd   = RClass.register(o, new AGetter('_formatCd'), EG3dTexture.Flat2d);
      o._bind       = true;
      o._slot       = -1;
      o._index      = 0;
      o._source     = null;
      o.loadConfig  = FG3dProgramSampler_loadConfig;
      o.dispose     = FG3dProgramSampler_dispose;
      return o;
   }
   MO.FG3dProgramSampler_loadConfig = function FG3dProgramSampler_loadConfig(xconfig){
      var o = this;
      o._name = xconfig.get('name');
      o._linker = xconfig.get('linker');
      o._bind = RBoolean.parse(xconfig.get('bind', 'Y'));
      o._formatCd = REnum.encode(EG3dTexture, xconfig.get('format', 'Flat2d'));
   }
   MO.FG3dProgramSampler_dispose = function FG3dProgramSampler_dispose(){
      var o = this;
      o._slot = null;
      o.__base.FObject.dispose.call(o);
   }
}
with(MO){
   MO.FG3dRenderTarget = function FG3dRenderTarget(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._size     = RClass.register(o, new AGetter('_size'));
      o._color    = RClass.register(o, new AGetter('_color'));
      o._textures = null;
      o.construct = FG3dRenderTarget_construct;
      o.textures  = FG3dRenderTarget_textures;
      o.dispose   = FG3dRenderTarget_dispose;
      return o;
   }
   MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
      var o = this;
      o.__base.FG3dObject.construct();
      o._size = new SSize2();
      o._color = new SColor4();
      o._color.set(0.0, 0.0, 0.0, 1.0);
   }
   MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
      var o = this;
      var textures = o._textures;
      if(textures == null){
         textures = o._textures = new TObjects();
      }
      return textures;
   }
   MO.FG3dRenderTarget_dispose = function FG3dRenderTarget_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
      o.__base.dispose.construct();
   }
}
with(MO){
   MO.FG3dShader = function FG3dShader(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._source = RClass.register(o, new AGetter('_source'));
      o.upload  = RMethod.virtual(o, 'upload');
      return o;
   }
}
with(MO){
   MO.FG3dStatistics = function FG3dStatistics(o){
      o = RClass.inherits(this, o, FStatistics);
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
      o._programTotal        = RClass.register(o, new AGetter('_programTotal'), 0);
      o._layoutTotal         = RClass.register(o, new AGetter('_layoutTotal'), 0);
      o._vertexBufferTotal   = RClass.register(o, new AGetter('_vertexBufferTotal'), 0);
      o._indexBufferTotal    = RClass.register(o, new AGetter('_indexBufferTotal'), 0);
      o._flatTextureTotal    = RClass.register(o, new AGetter('_flatTextureTotal'), 0);
      o._cubeTextureTotal    = RClass.register(o, new AGetter('_cubeTextureTotal'), 0);
      o._targetTotal         = RClass.register(o, new AGetter('_targetTotal'), 0);
      o.reset                = FG3dStatistics_reset;
      o.resetFrame           = FG3dStatistics_resetFrame;
      return o;
   }
   MO.FG3dStatistics_reset = function FG3dStatistics_reset(){
      o._programTotal = 0;
      o._layoutTotal = 0;
      o._vertexBufferTotal = 0;
      o._indexBufferTotal = 0;
      o._flatTextureTotal = 0;
      o._cubeTextureTotal = 0;
      o._targetTotal = 0;
   }
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
with(MO){
   MO.FG3dTexture = function FG3dTexture(o){
      o = RClass.inherits(this, o, FG3dObject);
      o._textureCd   = RClass.register(o, new AGetter('_textureCd'), EG3dTexture.Unknown);
      o._filterMinCd = RClass.register(o, new AGetSet('_filterMinCd'), EG3dSamplerFilter.Linear);
      o._filterMagCd = RClass.register(o, new AGetSet('_filterMagCd'), EG3dSamplerFilter.Linear);
      o._wrapS       = RClass.register(o, new AGetSet('_wrapS'), EG3dSamplerFilter.Unknown);
      o._wrapT       = RClass.register(o, new AGetSet('_wrapT'), EG3dSamplerFilter.Unknown);
      o._statusLoad  = false;
      o.isValid      = RMethod.virtual(o, 'isValid');
      o.setFilterCd  = FG3dTexture_setFilterCd;
      o.setWrapCd    = FG3dTexture_setWrapCd;
      return o;
   }
   MO.FG3dTexture_setFilterCd = function FG3dTexture_setFilterCd(minCd, magCd){
      var o = this;
      o._filterMinCd = minCd;
      o._filterMagCd = magCd;
   }
   MO.FG3dTexture_setWrapCd = function FG3dTexture_setWrapCd(wrapS, wrapT){
      var o = this;
      o._wrapS = wrapS;
      o._wrapT = wrapT;
   }
}
with(MO){
   MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
      o = RClass.inherits(this, o, FG3dBuffer);
      o._formatCd = RClass.register(o, new AGetSet('_formatCd'), EG3dAttributeFormat.Unknown);
      o._stride   = RClass.register(o, new AGetSet('_stride'), 0);
      o._count    = RClass.register(o, new AGetSet('_count'), 0);
      o.upload    = RMethod.virtual(o, 'upload');
      return o;
   }
}
with(MO){
   MO.FG3dVertexShader = function FG3dVertexShader(o){
      o = RClass.inherits(this, o, FG3dShader);
      return o;
   }
}
