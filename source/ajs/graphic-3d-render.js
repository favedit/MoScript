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
   o.Unknown        = 'Unknown';
   o.Nearest        = 'Nearest';
   o.Linear         = 'Linear';
   o.Repeat         = 'Repeat';
   o.MirroredRepeat = 'MirroredRepeat';
   o.ClampToEdge    = 'ClampToEdge';
   o.ClampToBorder  = 'ClampToBorder';
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
MO.SG3dLayoutBuffer = function SG3dLayoutBuffer(){
   var o = this;
   o.slot     = null;
   o.buffer   = null;
   o.index    = null;
   o.formatCd = null;
   o.dispose  = MO.SG3dLayoutBuffer_dispose;
   return o;
}
MO.SG3dLayoutBuffer_dispose = function SG3dLayoutBuffer_dispose(){
   var o = this;
   o.slot = null;
   o.buffer = null;
   o.index = null;
   o.formatCd = null;
}
MO.SG3dLayoutSampler = function SG3dLayoutSampler(){
   var o = this;
   o.slot    = null;
   o.index   = -1;
   o.texture = null;
   o.dispose = MO.SG3dLayoutSampler_dispose;
   return o;
}
MO.SG3dLayoutSampler_dispose = function SG3dLayoutSampler_dispose(){
   var o = this;
   o.slot = null;
   o.index = -1;
   o.texture = null;
}
MO.FG3dBuffer = function FG3dBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data   = MO.Class.register(o, new MO.AGetSet('_data'));
   o.isValid = MO.Method.virtual(o, 'isValid');
   o.dispose = MO.FG3dBuffer_dispose;
   return o;
}
MO.FG3dBuffer_dispose = function FG3dBuffer_dispose(){
   var o = this;
   o._data = null;
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dContext = function FG3dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._viewportRectangle  = MO.Class.register(o, new MO.AGetter('_viewportRectangle'));
   o._capability         = MO.Class.register(o, new MO.AGetter('_capability'));
   o._statistics         = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._fillModeCd         = MO.EG3dFillMode.Face;
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
   o.construct           = MO.FG3dContext_construct;
   o.linkCanvas          = MO.FG3dContext_linkCanvas;
   o.createObject        = MO.FG3dContext_createObject;
   o.createProgram       = MO.Method.virtual(o, 'createProgram');
   o.createLayout        = MO.Method.virtual(o, 'createLayout');
   o.createVertexBuffer  = MO.Method.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = MO.Method.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = MO.Method.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = MO.Method.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = MO.Method.virtual(o, 'createRenderTarget');
   o.setViewport         = MO.Method.virtual(o, 'setViewport');
   o.setFillMode         = MO.Method.virtual(o, 'setFillMode');
   o.setDepthMode        = MO.Method.virtual(o, 'setDepthMode');
   o.setCullingMode      = MO.Method.virtual(o, 'setCullingMode');
   o.setBlendFactors     = MO.Method.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = MO.Method.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = MO.Method.virtual(o, 'setRenderTarget');
   o.setProgram          = MO.Method.virtual(o, 'setProgram');
   o.bindVertexBuffer    = MO.Method.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = MO.Method.virtual(o, 'bindTexture');
   o.prepare             = MO.FG3dContext_prepare;
   o.clear               = MO.Method.virtual(o, 'clear');
   o.clearColor          = MO.Method.virtual(o, 'clearColor');
   o.clearDepth          = MO.Method.virtual(o, 'clearDepth');
   o.drawTriangles       = MO.Method.virtual(o, 'drawTriangles');
   o.present             = MO.Method.virtual(o, 'present');
   o.dispose             = MO.FG3dContext_dispose;
   return o;
}
MO.FG3dContext_construct = function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._viewportRectangle = new MO.SRectangle();
   o._statistics = MO.Class.create(MO.FG3dStatistics);
   MO.Console.find(MO.FStatisticsConsole).register('graphic3d.context', o._statistics);
   o._storePrograms = new MO.TObjects();
   o._storeLayouts = new MO.TObjects();
   o._storeBuffers = new MO.TObjects();
   o._storeTextures = new MO.TObjects();
   o._storeTargets = new MO.TObjects();
}
MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
MO.FG3dContext_createObject = function FG3dContext_createObject(clazz){
   var o = this;
   var instance = MO.Class.create(clazz);
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
      o._storePrograms = MO.Lang.Object.dispose(programs);
   }
   var layouts = o._storeLayouts;
   if(layouts){
      var count = layouts.count();
      for(var i = 0; i < count; i++){
         var layout = layouts.at(i);
         layout.dispose();
      }
      o._storeLayouts = MO.Lang.Object.dispose(layouts);
   }
   var buffers = o._storeBuffers;
   if(buffers){
      var count = buffers.count();
      for(var i = 0; i < count; i++){
         var buffer = buffers.at(i);
         buffer.dispose();
      }
      o._storeBuffers = MO.Lang.Object.dispose(buffers);
   }
   var textures = o._storeTextures;
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var texture = textures.at(i);
         texture.dispose();
      }
      o._storeTextures = MO.Lang.Object.dispose(textures);
   }
   var targets = o._storeTargets;
   if(targets){
      var count = targets.count();
      for(var i = 0; i < count; i++){
         var target = targets.at(i);
         target.dispose();
      }
      o._storeTargets = MO.Lang.Object.dispose(targets);
   }
   o._program = null;
   o._viewportRectangle = MO.Lang.Object.dispose(o._viewportRectangle);
   o._capability = MO.Lang.Object.dispose(o._capability);
   o._statistics = MO.Lang.Object.dispose(o._statistics);
   o._handleInstance = null;
   o._handleLayout = null;
   o._handle = null;
   o.__base.FGraphicContext.dispose.call(o);
}
MO.FG3dCubeTexture = function FG3dCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o.size = 0;
   o.construct = MO.FG3dTexture_construct;
   o.upload    = MO.Method.virtual(o, 'upload');
   o.update    = MO.Method.empty;
   return o;
}
MO.FG3dTexture_construct = function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Cube;
}
MO.FG3dFlatTexture = function FG3dFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o._optionFlipY = MO.Class.register(o, new MO.AGetSet('_optionFlipY'), false);
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o.construct    = MO.FG3dFlatTexture_construct;
   o.uploadData   = MO.Method.virtual(o, 'uploadData');
   o.upload       = MO.Method.virtual(o, 'upload');
   o.update       = MO.Method.empty;
   o.dispose      = MO.FG3dFlatTexture_dispose;
   return o;
}
MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct.call(o);
   o._textureCd = MO.EG3dTexture.Flat2d;
   o._size = new MO.SSize2();
}
MO.FG3dFlatTexture_dispose = function FG3dFlatTexture_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o.__base.FG3dTexture.dispose.call(o);
}
MO.FG3dFragmentShader = function FG3dFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._strideCd   = MO.Class.register(o, new MO.AGetSet('_strideCd'), MO.EG3dIndexStride.Uint16);
   o._count      = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o._drawModeCd = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._lineWidth  = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   o.upload      = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dLayout = function FG3dLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._buffers       = MO.Class.register(o, new MO.AGetter('_buffers'));
   o._samplers      = MO.Class.register(o, new MO.AGetter('_samplers'));
   o.linkBuffers    = MO.FG3dLayout_linkBuffers;
   o.bindBuffers    = MO.FG3dLayout_bindBuffers;
   o.linkSamplers   = MO.FG3dLayout_linkSamplers;
   o.bindSamplers   = MO.FG3dLayout_bindSamplers;
   o.unbindSamplers = MO.FG3dLayout_unbindSamplers;
   o.dispose        = MO.FG3dLayout_dispose;
   return o;
}
MO.FG3dLayout_construct = function FG3dLayout_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
}
MO.FG3dLayout_linkBuffers = function FG3dLayout_linkBuffers(buffers){
   var o = this;
   if(!buffers.isEmpty()){
      var items = o._buffers;
      if(!items){
         items = o._buffers = new MO.TObjects();
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
MO.FG3dLayout_linkSamplers = function FG3dLayout_linkSamplers(samplers){
   var o = this;
   if(!samplers.isEmpty()){
      var items = o._samplers;
      if(!items){
         items = o._samplers = new MO.TObjects();
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
   o._buffers = MO.Lang.Object.dispose(o._buffers);
   o._samplers = MO.Lang.Object.dispose(o._samplers);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dProgram = function FG3dProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = MO.FG3dProgram_hasAttribute;
   o.registerAttribute = MO.FG3dProgram_registerAttribute;
   o.findAttribute     = MO.FG3dProgram_findAttribute;
   o.attributes        = MO.FG3dProgram_attributes;
   o.hasParameter      = MO.FG3dProgram_hasParameter;
   o.registerParameter = MO.FG3dProgram_registerParameter;
   o.findParameter     = MO.FG3dProgram_findParameter;
   o.parameters        = MO.FG3dProgram_parameters;
   o.hasSampler        = MO.FG3dProgram_hasSampler;
   o.registerSampler   = MO.FG3dProgram_registerSampler;
   o.findSampler       = MO.FG3dProgram_findSampler;
   o.samplers          = MO.FG3dProgram_samplers;
   o.vertexShader      = MO.Method.virtual(o, 'vertexShader');
   o.fragmentShader    = MO.Method.virtual(o, 'fragmentShader');
   o.setAttribute      = MO.FG3dProgram_setAttribute;
   o.setParameter      = MO.FG3dProgram_setParameter;
   o.setParameter4     = MO.FG3dProgram_setParameter4;
   o.setSampler        = MO.FG3dProgram_setSampler;
   o.upload            = MO.Method.virtual(o, 'upload');
   o.dispose           = MO.FG3dProgram_dispose;
   return o;
}
MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramAttribute);
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
      r = o._attributes = new MO.TDictionary();
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
   var r = MO.Class.create(MO.FG3dProgramParameter);
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
      r = o._parameters = new MO.TDictionary();
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
   var r = MO.Class.create(MO.FG3dProgramSampler);
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
      r = o._samplers = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
}
MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == MO.SMatrix3d) || (t == MO.SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == MO.SColor4){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == MO.SPoint3) || (t == MO.SVector3)){
      d = MO.Lang.TypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == MO.SPoint4) || (t == MO.SVector4)){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new MO.TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   if(p.attachData(d)){
      o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
   }
}
MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = MO.Lang.TypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}
MO.FG3dProgram_setSampler = function FG3dProgram_setSampler(name, texture){
   var o = this;
   var sampler = o.findSampler(name);
   if(!sampler){
      throw new MO.TError(o, 'Bind invalid sampler. (name={1})', name);
   }
   o._graphicContext.bindTexture(sampler._slot, sampler._index, texture);
}
MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
   var o = this;
   o._attributes = MO.Lang.Object.dispose(o._attributes, true);
   o._parameters = MO.Lang.Object.dispose(o._parameters, true);
   o._samplers = MO.Lang.Object.dispose(o._samplers, true);
   o._vertexShader = MO.Lang.Object.dispose(o._vertexShader);
   o._fragmentShader = MO.Lang.Object.dispose(o._fragmentShader);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = MO.Class.register(o, new MO.AGetter('_statusUsed'), false);
   o._slot       = null;
   o._index      = -1;
   o._formatCd   = MO.Class.register(o, new MO.AGetter('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o.loadConfig  = MO.FG3dProgramAttribute_loadConfig;
   o.dispose     = MO.FG3dProgramAttribute_dispose;
   return o;
}
MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dAttributeFormat, xconfig.get('format'));
}
MO.FG3dProgramAttribute_dispose = function FG3dProgramAttribute_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dProgramParameter = function FG3dProgramParameter(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._formatCd   = MO.EG3dParameterFormat.Unknown;
   o._define     = MO.Class.register(o, new MO.AGetter('_define'));
   o._statusUsed = false;
   o._slot       = null;
   o._size       = 0;
   o._buffer     = null;
   o._memory     = null;
   o.attachData  = MO.FG3dProgramParameter_attachData;
   o.loadConfig  = MO.FG3dProgramParameter_loadConfig;
   o.dispose     = MO.FG3dProgramParameter_dispose;
   return o;
}
MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(value){
   var o = this;
   var result = false;
   var clazz = value.constructor;
   if(clazz == MO.SMatrix3d){
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(16);
      }
      result = MO.Lang.Float.attach(memory, value._data, 16);
   }else if(clazz == Float32Array){
      var length = value.length;
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(length);
      }
      result = MO.Lang.Float.attach(memory, value, length);
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   return result;
}
MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dParameterFormat, xconfig.get('format'));
   o._define = xconfig.get('define');
}
MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
   var o = this;
   o._slot = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dProgramSampler = function FG3dProgramSampler(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = false;
   o._formatCd   = MO.Class.register(o, new MO.AGetter('_formatCd'), MO.EG3dTexture.Flat2d);
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.loadConfig  = MO.FG3dProgramSampler_loadConfig;
   o.dispose     = MO.FG3dProgramSampler_dispose;
   return o;
}
MO.FG3dProgramSampler_loadConfig = function FG3dProgramSampler_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._bind = MO.Lang.Boolean.parse(xconfig.get('bind', 'Y'));
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dTexture, xconfig.get('format', 'Flat2d'));
}
MO.FG3dProgramSampler_dispose = function FG3dProgramSampler_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dRenderTarget = function FG3dRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._size     = MO.Class.register(o, new MO.AGetter('_size'));
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   o._textures = null;
   o.construct = MO.FG3dRenderTarget_construct;
   o.setQualityCd = MO.FG3dRenderTarget_setQualityCd;
   o.textures  = MO.FG3dRenderTarget_textures;
   o.dispose   = MO.FG3dRenderTarget_dispose;
   return o;
}
MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new MO.SSize2();
   o._color = new MO.SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
MO.FG3dRenderTarget_setQualityCd = function FG3dRenderTarget_setQualityCd(qualityCd){
   var o = this;
   var size = o._size;
   switch(qualityCd){
      case MO.EGraphicQuality.Highest:
         size.set(4096, 4096);
         break;
      case MO.EGraphicQuality.High:
         size.set(2048, 2048);
         break;
      case MO.EGraphicQuality.Middle:
         size.set(1024, 1024);
         break;
      case MO.EGraphicQuality.Low:
         size.set(512, 512);
         break;
      case MO.EGraphicQuality.Lowest:
         size.set(256, 256);
         break;
      default:
         size.set(64, 64);
   }
}
MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new MO.TObjects();
   }
   return textures;
}
MO.FG3dRenderTarget_dispose = function FG3dRenderTarget_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._color = MO.Lang.Object.dispose(o._color);
   o._textures = MO.Lang.Object.dispose(o._textures);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dShader = function FG3dShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._source = MO.Class.register(o, new MO.AGetter('_source'));
   o.upload  = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dStatistics = function FG3dStatistics(o){
   o = MO.Class.inherits(this, o, MO.FStatistics);
   o._frameClearCount     = MO.Class.register(o, new MO.AGetter('_frameClearCount'), 0);
   o._frameFillModeCount  = MO.Class.register(o, new MO.AGetter('_frameFillModeCount'), 0);
   o._frameDepthModeCount = MO.Class.register(o, new MO.AGetter('_frameDepthModeCount'), 0);
   o._frameCullModeCount  = MO.Class.register(o, new MO.AGetter('_frameCullModeCount'), 0);
   o._frameBlendModeCount = MO.Class.register(o, new MO.AGetter('_frameBlendModeCount'), 0);
   o._frameProgramCount   = MO.Class.register(o, new MO.AGetter('_frameProgramCount'), 0);
   o._frameConstCount     = MO.Class.register(o, new MO.AGetter('_frameConstCount'), 0);
   o._frameConstLength    = MO.Class.register(o, new MO.AGetter('_frameConstLength'), 0);
   o._frameBufferCount    = MO.Class.register(o, new MO.AGetter('_frameBufferCount'), 0);
   o._frameTextureCount   = MO.Class.register(o, new MO.AGetter('_frameTextureCount'), 0);
   o._frameTargetCount    = MO.Class.register(o, new MO.AGetter('_frameTargetCount'), 0);
   o._frameDrawCount      = MO.Class.register(o, new MO.AGetter('_frameDrawCount'), 0);
   o._frameTriangleCount  = MO.Class.register(o, new MO.AGetter('_frameTriangleCount'), 0);
   o._programTotal        = MO.Class.register(o, new MO.AGetter('_programTotal'), 0);
   o._layoutTotal         = MO.Class.register(o, new MO.AGetter('_layoutTotal'), 0);
   o._vertexBufferTotal   = MO.Class.register(o, new MO.AGetter('_vertexBufferTotal'), 0);
   o._indexBufferTotal    = MO.Class.register(o, new MO.AGetter('_indexBufferTotal'), 0);
   o._flatTextureTotal    = MO.Class.register(o, new MO.AGetter('_flatTextureTotal'), 0);
   o._cubeTextureTotal    = MO.Class.register(o, new MO.AGetter('_cubeTextureTotal'), 0);
   o._targetTotal         = MO.Class.register(o, new MO.AGetter('_targetTotal'), 0);
   o.reset                = MO.FG3dStatistics_reset;
   o.resetFrame           = MO.FG3dStatistics_resetFrame;
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
MO.FG3dTexture = function FG3dTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code        = MO.Class.register(o, new MO.AGetSet('_code'));
   o._textureCd   = MO.Class.register(o, new MO.AGetter('_textureCd'), MO.EG3dTexture.Unknown);
   o._filterMinCd = MO.Class.register(o, new MO.AGetSet('_filterMinCd'), MO.EG3dSamplerFilter.Linear);
   o._filterMagCd = MO.Class.register(o, new MO.AGetSet('_filterMagCd'), MO.EG3dSamplerFilter.Linear);
   o._wrapS       = MO.Class.register(o, new MO.AGetSet('_wrapS'), MO.EG3dSamplerFilter.Unknown);
   o._wrapT       = MO.Class.register(o, new MO.AGetSet('_wrapT'), MO.EG3dSamplerFilter.Unknown);
   o._statusLoad  = false;
   o.isValid      = MO.Method.virtual(o, 'isValid');
   o.setFilterCd  = MO.FG3dTexture_setFilterCd;
   o.setWrapCd    = MO.FG3dTexture_setWrapCd;
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
MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._formatCd = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o._stride   = MO.Class.register(o, new MO.AGetSet('_stride'), 0);
   o._count    = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o.upload    = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dVertexShader = function FG3dVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
