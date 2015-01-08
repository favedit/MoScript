var EG3dAttributeFormat = new function EG3dAttributeFormat(){
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
var EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.None = 0;
   o.SourceAlpha= 1;
   o.OneMinusSourceAlpha = 2;
   return o;
}
var EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
var EG3dDepthMode = new function EG3dDepthMode(){
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
var EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
var EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
var EG3dParameterFormat = new function EG3dParameterFormat(){
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
var EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
var EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o.name = null;
   o.optionMerge = null;
   o.optionSort = null;
   o.sortLevel = null;
   o.optionAlpha = null;
   o.optionDepth = null;
   o.optionCompare = null;
   o.optionDouble = null;
   o.optionShadow = null;
   o.optionShadowSelf = null;
   o.color = null;
   o.alpha = null;
   o.ambientColor = null;
   o.ambientShadow = null;
   o.diffuseColor = null;
   o.diffuseShadow = null;
   o.diffuseViewColor = null;
   o.diffuseViewShadow = null;
   o.specularColor = null;
   o.specularShadow = null;
   o.specularInfo = null;
   o.specularViewColor = null;
   o.specularViewInfo = null;
   o.specularViewShadow = null;
   o.reflectColor = null;
   o.textures = null;
   o.construct = FG3dBaseMaterial_construct;
   o.textures  = FG3dBaseMaterial_textures;
   return o;
}
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.ambientColor = new SColor4();
   o.diffuseColor = new SColor4();
   o.diffuseViewColor = new SColor4();
   o.specularColor = new SColor4();
   o.specularViewColor = new SColor4();
   o.reflectColor = new SColor4();
}
function FG3dBaseMaterial_textures(){
   return this.textures;
}
function FG3dCamera(o){
   o = RClass.inherits(this, o, FObject);
   o.name = null;
   o.matrix        = null;
   o._position      = null;
   o.direction     = null;
   o._centerFront = 0;
   o._centerBack = 0;
   o._focalNear = 0.1;
   o._focalFar = 100.0;
   o._planes       = null;
   o._frustum      = null;
   o._projection   = null;
   o._viewport     = null;
   o._axisUp       = null;
   o._axisX        = null;
   o._axisY        = null;
   o._axisZ        = null;
   o.construct     = FG3dCamera_construct;
   o.position      = FG3dCamera_position;
   o.setPosition   = FG3dCamera_setPosition;
   o.doWalk        = FG3dCamera_doWalk;
   o.doStrafe      = FG3dCamera_doStrafe;
   o.doFly         = FG3dCamera_doFly;
   o.doYaw         = FG3dCamera_doYaw;
   o.doPitch       = FG3dCamera_doPitch;
   o.lookAt        = FG3dCamera_lookAt;
   o.updateFrustum = FG3dCamera_updateFrustum;
   o.update        = FG3dCamera_update;
   return o;
}
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.matrix = new SMatrix3d();
   o._position = new SPoint3();
   o.direction = new SVector3();
   o.viewport = RClass.create(FG3dViewport);
   o.projection = RClass.create(FG3dProjection);
   o._axisUp = new SVector3();
   o._axisUp.set(0, 1, 0);
   o._axisX = new SVector3();
   o._axisY = new SVector3();
   o._axisZ = new SVector3();
}
function FG3dCamera_position(){
   return this._position;
}
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
function FG3dCamera_doWalk(){
}
function FG3dCamera_doStrafe(){
}
function FG3dCamera_doFly(){
}
function FG3dCamera_doYaw(){
}
function FG3dCamera_doPitch(){
}
function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   o.direction.set(x - p.x, y - p.y, z - p.z);
   o.direction.normalize();
}
function FG3dCamera_updateFrustum(){
}
function FG3dCamera_update(){
   var o = this;
   var ax = o._axisX;
   var ay = o._axisY;
   var az = o._axisZ;
   az.assign(o.direction);
   az.normalize();
   o._axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   var d = o.matrix.data();
   d[ 0] = ax.x;
   d[ 1] = ay.x;
   d[ 2] = az.x;
   d[ 3] = 0.0;
   d[ 4] = ax.y;
   d[ 5] = ay.y;
   d[ 6] = az.y;
   d[ 7] = 0.0;
   d[ 8] = ax.z;
   d[ 9] = ay.z;
   d[10] = az.z;
   d[11] = 0.0;
   d[12] = -ax.dotPoint3(o._position);
   d[13] = -ay.dotPoint3(o._position);
   d[14] = -az.dotPoint3(o._position);
   d[15] = 1.0;
}
function FG3dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.construct           = FG3dContext_construct;
   o.createProgram       = RMethod.virtual(o, 'createProgram');
   o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
   o.setFillMode         = RMethod.virtual(o, 'setFillMode');
   o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
   o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
   o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
   o.setProgram          = RMethod.virtual(o, 'setProgram');
   o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = RMethod.virtual(o, 'bindTexture');
   o.clear               = RMethod.virtual(o, 'clear');
   o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
   o.present             = RMethod.virtual(o, 'present');
   o.dispose             = FG3dContext_dispose;
   return o;
}
function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}
function FG3dContext_dispose(){
   var o = this;
   o._program = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG3dCubeTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.size = 0;
   o.construct = FG3dTexture_construct;
   return o;
}
function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Cube;
}
function FG3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   o._direction = null;
   o.construct = FG3dDirectionalLight_construct;
   o.direction = FG3dDirectionalLight_direction;
   return o;
}
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
}
function FG3dDirectionalLight_direction(){
   return this._direction;
}
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._program       = null;
   o.program        = FG3dEffect_program;
   o.setParameter   = FG3dEffect_setParameter;
   o.setSampler     = FG3dEffect_setSampler;
   o.drawRenderable = FG3dEffect_drawRenderable;
   o.loadUrl        = FG3dEffect_loadUrl;
   return o;
}
function FG3dEffect_program(){
   return this._program;
}
function FG3dEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}
function FG3dEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}
function FG3dEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
   c.setProgram(p);
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dEffect_loadUrl(u){
   var o = this;
   var c = o._context;
   var x = RClass.create(FXmlConnection);
   var d = x.send(u);
   var p = o._program = c.createProgram();
   p.loadConfig(d);
   p.build();
   p.link();
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._effects = null;
   o._path = "/assets/shader/";
   o.construct  = FG3dEffectConsole_construct;
   o.find       = FG3dEffectConsole_find;
   o.findByName = FG3dEffectConsole_findByName;
   return o;
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._effects = new TDictionary();
}
function FG3dEffectConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var e = o._effects.get(n);
   if(e == null){
      e = RClass.createByName(n);
      e.linkContext(c);
      e._path = o._path;
      e.load();
      o._effects.set(n, e);
   }
   return e;
}
function FG3dEffectConsole_findByName(c, p){
   var o = this;
   if(o._effect == null){
      o._effect = RClass.create(FG3dSampleAutomaticEffect);
      o._effect.linkContext(c);
      o._effect._path = o._path;
      o._effect.load();
   }
   return o._effect;
}
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.width     = 0;
   o.height    = 0;
   o.construct = FG3dFlatTexture_construct;
   return o;
}
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Flat2d;
}
function FG3dFragmentShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o.strideCd = EG3dIndexStride.Uint16;
   o.count    = 0;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dLight(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FG3dLightMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   return o;
}
function FG3dMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   o._textures = null;
   o.textures  = FG3dMaterial_textures;
   return o;
}
function FG3dMaterial_textures(){
   return this._textures;
}
function FG3dMaterialTexture(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o.name = null;
   o.reflectColor = null;
   o.construct   = FG3dMaterial_construct;
   return o;
}
function FG3dMaterial_construct(){
   var o = this;
   o.ambientColor = new SColor4();
   o.diffuseColor = new SColor4();
   o.diffuseViewColor = new SColor4();
   o.specularColor = new SColor4();
   o.specularViewColor = new SColor4();
   o.reflectColor = new SColor4();
}
function FG3dObject(o){
   o = RClass.inherits(this, o, FObject);
   o._context = null;
   o.linkContext = FG3dObject_linkContext;
   o.setup       = FG3dObject_setup;
   return o;
}
function FG3dObject_linkContext(c){
   this._context = c;
}
function FG3dObject_setup(){
}
function FG3dPointLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dProgram(o){
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
   o.setAttribute      = RMethod.virtual(o, 'setAttribute');
   o.setParameter      = RMethod.virtual(o, 'setParameter');
   o.setSampler        = RMethod.virtual(o, 'setSampler');
   o.upload            = RMethod.virtual(o, 'upload');
   o.loadConfig        = FG3dProgram_loadConfig;
   return o;
}
function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = RClass.create(FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = RClass.create(FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = RClass.create(FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
function FG3dProgram_loadConfig(p){
   var o = this;
   var ns = p.nodes();
   var nc = ns.count();
   for(var i = 0; i < nc; i++){
      var n = ns.get(i);
      if(n.isName('State')){
      }else if(n.isName('Specular')){
      }else if(n.isName('Parameter')){
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(n);
         o.parameters().set(pp.name(), pp);
         var s = pp.toString();
      }else if(n.isName('Attribute')){
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(n);
         o.attributes().set(pa.name(), pa);
      }else if(n.isName('Sampler')){
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(n);
         o.samplers().set(ps.name(), ps);
      }else if(n.isName('Source')){
         var st = n.get('name');
         var sv = n.value();
         if(st == 'vertex'){
            o.upload(EG3dShader.Vertex, sv);
         }else if(st == 'fragment'){
            o.upload(EG3dShader.Fragment, sv);
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', n.name());
      }
   }
}
function FG3dProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._slot       = -1;
   o._index      = -1;
   o._formatCd   = EG3dAttributeFormat.Unknown;
   o.name        = FG3dProgramAttribute_name;
   o.linker      = FG3dProgramAttribute_linker;
   o.loadConfig  = FG3dProgramAttribute_loadConfig;
   return o;
}
function FG3dProgramAttribute_name(){
   return this._name;
}
function FG3dProgramAttribute_linker(){
   return this._linker;
}
function FG3dProgramAttribute_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
}
function FG3dProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._shaderCd   = -1;
   o._formatCd   = EG3dParameterFormat.Unknown;
   o._slot       = -1;
   o._size       = 0;
   o._buffer     = null;
   o.name        = FG3dProgramParameter_name;
   o.linker      = FG3dProgramParameter_linker;
   o.loadConfig  = FG3dProgramParameter_loadConfig;
   return o;
}
function FG3dProgramParameter_name(){
   return this._name;
}
function FG3dProgramParameter_linker(){
   return this._linker;
}
function FG3dProgramParameter_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
}
function FG3dProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;
}
function FG3dProgramSampler_name(){
   return this._name;
}
function FG3dProgramSampler_linker(){
   return this._linker;
}
function FG3dProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._source = p.get('source');
}
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   o.width       = 0;
   o.height      = 0;
   o.angle       = 60;
   o.fieldOfView = 0;
   o.scale       = 0;
   o.znear       = 0.01;
   o.zfar        = 200;
   o.matrix     = null;
   o.construct = FG3dProjection_construct;
   o.update    = FG3dProjection_update;
   return o;
}
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.matrix = new SPerspectiveMatrix3d();
}
function FG3dProjection_update(){
   var o = this;
   o.fieldOfView = RMath.DEGREE_RATE * o.angle;
   o.matrix.perspectiveFieldOfViewLH(o.fieldOfView, o.width / o.height, o.znear, o.zfar);
}
function FG3dRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._camera               = null;
   o._projection           = null;
   o._directionalLight     = null
   o._renderables          = null;
   o._matrixViewProjection = null;
   o._cameraPosition       = null;
   o._lightDirection       = null;
   o.construct             = FG3dRegion_construct;
   o.matrixViewProjection  = FG3dRegion_matrixViewProjection;
   o.cameraPosition        = FG3dRegion_cameraPosition;
   o.lightDirection        = FG3dRegion_lightDirection;
   o.renderables           = FG3dRegion_renderables;
   o.pushRenderable        = FG3dRegion_pushRenderable;
   o.prepare               = FG3dRegion_prepare;
   o.update                = FG3dRegion_update;
   o.dispose               = FG3dRegion_dispose;
   return o;
}
function FG3dRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = new TObjects();
   o._matrixViewProjection = new SMatrix3d();
   o._cameraPosition = new Float32Array(3);
   o._lightDirection = new Float32Array(3);
}
function FG3dRegion_matrixViewProjection(p){
   return this._matrixViewProjection;
}
function FG3dRegion_cameraPosition(){
   return this._cameraPosition;
}
function FG3dRegion_lightDirection(){
   return this._lightDirection;
}
function FG3dRegion_renderables(p){
   return this._renderables;
}
function FG3dRegion_pushRenderable(p){
   this._renderables.push(p);
}
function FG3dRegion_prepare(){
   var o = this;
   o._matrixViewProjection.assign(o._camera.matrix);
   o._matrixViewProjection.append(o._projection.matrix);
   var cp = o._camera.position();
   o._cameraPosition[0] = cp.x;
   o._cameraPosition[1] = cp.y;
   o._cameraPosition[2] = cp.z;
   var ld = o._directionalLight.direction();
   ld.normalize();
   o._lightDirection[0] = ld.x;
   o._lightDirection[1] = ld.y;
   o._lightDirection[2] = ld.z;
   o._renderables.clear();
}
function FG3dRegion_update(){
}
function FG3dRegion_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
function FG3dRenderable(o){
   o = RClass.inherits(this, o, FGraphicRenderable);
   o._matrix            = null;
   o._effectName        = null;
   o._effect            = null;
   o._materialName      = null;
   o._material          = null;
   o._materialReference = null;
   o.construct          = FG3dRenderable_construct;
   o.matrix             = FG3dRenderable_matrix;
   o.effectName         = FG3dRenderable_effectName;
   o.material           = FG3dRenderable_material;
   o.testVisible        = FG3dRenderable_testVisible;
   o.update             = FG3dRenderable_update;
   return o;
}
function FG3dRenderable_construct(){
   var o = this;
   o.__base.FGraphicRenderable.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}
function FG3dRenderable_matrix(){
   return this._matrix;
}
function FG3dRenderable_effectName(){
   return this._effectName;
}
function FG3dRenderable_material(){
   return this._material;
}
function FG3dRenderable_testVisible(){
   return true;
}
function FG3dRenderable_update(p){
   var o = this;
   o._matrix.assign(p);
}
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   o.source = null;
   return o;
}
function FG3dSpotLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name      = null;
   o._passes    = null;
   o.construct  = FG3dTechnique_construct;
   o.name       = FG3dTechnique_name;
   o.drawRegion = FG3dTechnique_drawRegion;
   return o;
}
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._passes = new TObjects();
}
function FG3dTechnique_name(){
   return this._name;
}
function FG3dTechnique_drawRegion(r){
   var o = this;
   var ps = o._passes;
   var c = ps.count();
   for(var n = 0; n < c; n++){
      var p = ps.get(n);
      p.drawRegion(r);
   }
   o._context.present();
}
function FG3dTechniqueConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._techniques = null;
   o.construct   = FG3dTechniqueConsole_construct;
   o.find        = FG3dTechniqueConsole_find;
   return o;
}
function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new TDictionary();
}
function FG3dTechniqueConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var t = o._techniques.get(n);
   if(t == null){
      t = RClass.createByName(n);
      t.linkContext(c);
      t.setup();
      o._techniques.set(n, t);
   }
   return t;
}
function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name      = null;
   o.name       = FG3dTechniquePass_name;
   o.drawRegion = FG3dTechniquePass_drawRegion;
   return o;
}
function FG3dTechniquePass_name(){
   return this._name;
}
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var ec = RConsole.find(FG3dEffectConsole);
   var rs = p.renderables();
   var c = rs.count();
   for(var n = 0; n < c; n++){
      var r = rs.get(n);
      var en = r.effectName();
      var e = ec.findByName(o._context, en);
      o._context.setProgram(e.program());
      e.drawRenderable(p, r);
   }
}
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._textureCd  = EG3dTexture.Unknown;
   o._statusLoad = false;
   o.textureCd   = FG3dTexture_textureCd;
   return o;
}
function FG3dTexture_textureCd(){
   return this._textureCd;
}
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name     = 0;
   o._formatCd = EG3dAttributeFormat.Unknown;
   o.stride    = 0;
   o.count     = 0;
   o.name   = FG3dVertexBuffer_name;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dVertexBuffer_name(){
   return this._name;
}
function FG3dVertexShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dViewport(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = FG3dViewport_set;
   return o;
}
function FG3dViewport_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
   o.width = w;
   o.height= h;
}
var REngine3d = new function REngine3d(){
   var o = this;
   o.contexts = new TObjects();
   o.createContext = REngine3d_createContext;
   return o;
}
function REngine3d_createContext(c, h){
   var o = this;
   var r = RClass.create(c);
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}
function SColor4(o){
   if(!o){o = this;}
   o.red         = 0;
   o.green       = 0;
   o.blue        = 0;
   o.alpha       = 1;
   o._data       = null;
   o.assign      = SColor4_assign;
   o.set         = SColor4_set;
   o.data        = SColor4_data;
   o.unserialize = SColor4_unserialize
   o.toString    = SColor4_toString;
   return o;
}
function SColor4_assign(p){
   var o = this;
   o.red = p.red;
   o.green = p.green;
   o.blue = p.blue;
   o.alpha = p.alpha;
}
function SColor4_set(r, g, b, a){
   var o = this;
   o.red = r;
   o.green = g;
   o.blue = b;
   o.alpha = a;
}
function SColor4_data(){
   var o = this;
   var d = o._data;
   if(d == null){
      d = o._data = new Float32Array(4);
   }
   d[0] = o.red;
   d[1] = o.green;
   d[2] = o.blue;
   d[2] = o.alpha;
   return d;
}
function SColor4_unserialize(p){
   var o = this;
   o.red = p.readFloat();
   o.green = p.readFloat();
   o.blue = p.readFloat();
   o.alpha = p.readFloat();
}
function SColor4_toString(){
   var o = this;
   return o.red + ',' + o.green + ',' + o.blue + ',' + o.alpha;
}
function SMatrix3d(o){
   if(!o){o = this;}
   o._dirty = false;
   o._tx    = 0;
   o._ty    = 0;
   o._tz    = 0;
   o._rx    = 0;
   o._ry    = 0;
   o._rz    = 0;
   o._sx    = 1;
   o._sy    = 1;
   o._sz    = 1;
   o._data  = new Float32Array(16);
   o.identity     = SMatrix3d_identity;
   o.setTranslate = SMatrix3d_setTranslate
   o.setRotation  = SMatrix3d_setRotation
   o.setScale     = SMatrix3d_setScale
   o.assignData   = SMatrix3d_assignData;
   o.assign       = SMatrix3d_assign;
   o.appendData   = SMatrix3d_appendData;
   o.append       = SMatrix3d_append;
   o.translate    = SMatrix3d_translate;
   o.rotationX    = SMatrix3d_rotationX;
   o.rotationY    = SMatrix3d_rotationY;
   o.rotationZ    = SMatrix3d_rotationZ;
   o.rotation     = SMatrix3d_rotation;
   o.scale        = SMatrix3d_scale;
   o.updateForce  = SMatrix3d_updateForce;
   o.update       = SMatrix3d_update;
   o.data         = SMatrix3d_data;
   o.identity();
   return o;
}
function SMatrix3d_identity(){
   var o = this;
   o._tx = o._ty = o._tz = 0;
   o._rx = o._ry = o._rz = 0;
   o._sx = o._sy = o._sz = 1;
   var d = o._data;
   d[ 0] = 1; d[ 1] = 0; d[ 2] = 0; d[ 3] = 0;
   d[ 4] = 0; d[ 5] = 1; d[ 6] = 0; d[ 7] = 0;
   d[ 8] = 0; d[ 9] = 0; d[10] = 1; d[11] = 0;
   d[12] = 0; d[13] = 0; d[14] = 0; d[15] = 1;
}
function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o._tx = x;
   o._ty = y;
   o._tz = z;
   o.dirty = true;
}
function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o._rx = x;
   o._ry = y;
   o._rz = z;
   o.dirty = true;
}
function SMatrix3d_setScale(x, y, z){
   var o = this;
   o._sx = x;
   o._sy = y;
   o._sz = z;
   o.dirty = true;
}
function SMatrix3d_assignData(p){
   var d = this._data;
   for(var n = 0; n < 16; n++){
      d[n] = p[n];
   }
}
function SMatrix3d_assign(p){
   this.assignData(p._data);
}
function SMatrix3d_appendData(v){
   var d = this._data;
   var v00 = (d[ 0] * v[0]) + (d[ 1] * v[4]) + (d[ 2] * v[ 8]) + (d[ 3] * v[12]);
   var v01 = (d[ 0] * v[1]) + (d[ 1] * v[5]) + (d[ 2] * v[ 9]) + (d[ 3] * v[13]);
   var v02 = (d[ 0] * v[2]) + (d[ 1] * v[6]) + (d[ 2] * v[10]) + (d[ 3] * v[14]);
   var v03 = (d[ 0] * v[3]) + (d[ 1] * v[7]) + (d[ 2] * v[11]) + (d[ 3] * v[15]);
   var v04 = (d[ 4] * v[0]) + (d[ 5] * v[4]) + (d[ 6] * v[ 8]) + (d[ 7] * v[12]);
   var v05 = (d[ 4] * v[1]) + (d[ 5] * v[5]) + (d[ 6] * v[ 9]) + (d[ 7] * v[13]);
   var v06 = (d[ 4] * v[2]) + (d[ 5] * v[6]) + (d[ 6] * v[10]) + (d[ 7] * v[14]);
   var v07 = (d[ 4] * v[3]) + (d[ 5] * v[7]) + (d[ 6] * v[11]) + (d[ 7] * v[15]);
   var v08 = (d[ 8] * v[0]) + (d[ 9] * v[4]) + (d[10] * v[ 8]) + (d[11] * v[12]);
   var v09 = (d[ 8] * v[1]) + (d[ 9] * v[5]) + (d[10] * v[ 9]) + (d[11] * v[13]);
   var v10 = (d[ 8] * v[2]) + (d[ 9] * v[6]) + (d[10] * v[10]) + (d[11] * v[14]);
   var v11 = (d[ 8] * v[3]) + (d[ 9] * v[7]) + (d[10] * v[11]) + (d[11] * v[15]);
   var v12 = (d[12] * v[0]) + (d[13] * v[4]) + (d[14] * v[ 8]) + (d[15] * v[12]);
   var v13 = (d[12] * v[1]) + (d[13] * v[5]) + (d[14] * v[ 9]) + (d[15] * v[13]);
   var v14 = (d[12] * v[2]) + (d[13] * v[6]) + (d[14] * v[10]) + (d[15] * v[14]);
   var v15 = (d[12] * v[3]) + (d[13] * v[7]) + (d[14] * v[11]) + (d[15] * v[15]);
   d[ 0] = v00;
   d[ 1] = v01;
   d[ 2] = v02;
   d[ 3] = v03;
   d[ 4] = v04;
   d[ 5] = v05;
   d[ 6] = v06;
   d[ 7] = v07;
   d[ 8] = v08;
   d[ 9] = v09;
   d[10] = v10;
   d[11] = v11;
   d[12] = v12;
   d[13] = v13;
   d[14] = v14;
   d[15] = v15;
}
function SMatrix3d_append(v){
   this.appendData(v.data());
}
function SMatrix3d_translate(x, y, z){
   var d = new Float32Array(16);
   d[ 0] = 1;
   d[ 1] = 0;
   d[ 2] = 0;
   d[ 3] = 0;
   d[ 4] = 0;
   d[ 5] = 1;
   d[ 6] = 0;
   d[ 7] = 0;
   d[ 8] = 0;
   d[ 9] = 0;
   d[10] = 1;
   d[11] = 0;
   d[12] = x;
   d[13] = y;
   d[14] = z;
   d[15] = 1;
   this.appendData(d);
}
function SMatrix3d_rotationX(v){
   var rs = Math.sin(v);
   var rc = Math.cos(v);
   var d = new Float32Array(16);
   d[ 0] = 1;
   d[ 1] = 0;
   d[ 2] = 0;
   d[ 3] = 0;
   d[ 4] = 0;
   d[ 5] = rc;
   d[ 6] = rs;
   d[ 7] = 0;
   d[ 8] = 0;
   d[ 9] = -rs;
   d[10] = rc;
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
   this.appendData(d);
}
function SMatrix3d_rotationY(v){
   var rs = Math.sin(v);
   var rc = Math.cos(v);
   var d = new Float32Array(16);
   d[ 0] = rc;
   d[ 1] = 0;
   d[ 2] = rs;
   d[ 3] = 0;
   d[ 4] = 0;
   d[ 5] = 1;
   d[ 6] = 0;
   d[ 7] = 0;
   d[ 8] = -rs;
   d[ 9] = 0;
   d[10] = rc;
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
   this.appendData(d);
}
function SMatrix3d_rotationZ(v){
   var rs = Math.sin(v);
   var rc = Math.cos(v);
   var d = new Float32Array(16);
   d[ 0] = rc;
   d[ 1] = rs;
   d[ 2] = 0;
   d[ 3] = 0;
   d[ 4] = -rs;
   d[ 5] = rc;
   d[ 6] = 1;
   d[ 7] = 0;
   d[ 8] = 0;
   d[ 9] = 0;
   d[10] = 1;
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
   this.appendData(d);
}
function SMatrix3d_rotation(x, y, z){
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   var d = new Float32Array(16);
   d[ 0] = rcy * rcz;
   d[ 1] = rcy * rsz;
   d[ 2] = -rsy;
   d[ 3] = 0;
   d[ 4] = rsx * rsy * rcz - rcx * rsz;
   d[ 5] = rsx * rsy * rsz + rcx * rcz;
   d[ 6] = rsx * rcy;
   d[ 7] = 0;
   d[ 8] = rcx * rsy * rcz + rsx * rsz;
   d[ 9] = rcx * rsy * rsz - rsx * rcx;
   d[10] = rcx * rcy;
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
   this.appendData(d);
}
function SMatrix3d_scale(x, y, z){
   var d = new Float32Array(16);
   d[ 0] = x;
   d[ 1] = 0;
   d[ 2] = 0;
   d[ 3] = 0;
   d[ 4] = 0;
   d[ 5] = y;
   d[ 6] = 0;
   d[ 7] = 0;
   d[ 8] = 0;
   d[ 9] = 0;
   d[10] = z;
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
   this.appendData(d);
}
function SMatrix3d_updateForce(){
   var o = this;
   var d = o._data;
   var rsx = Math.sin(o._rx);
   var rcx = Math.cos(o._rx);
   var rsy = Math.sin(o._ry);
   var rcy = Math.cos(o._ry);
   var rsz = Math.sin(o._rz);
   var rcz = Math.cos(o._rz);
   d[ 0] = rcy * rcz * o._sx;
   d[ 1] = rcy * rsz * o._sx;
   d[ 2] = -rsy * o._sx;
   d[ 3] = 0;
   d[ 4] = (rsx * rsy * rcz - rcx * rsz) * o._sy;
   d[ 5] = (rsx * rsy * rsz + rcx * rcz) * o._sy;
   d[ 6] = rsx * rcy * o._sy;
   d[ 7] = 0;
   d[ 8] = (rcx * rsy * rcz + rsx * rsz) * o._sz;
   d[ 9] = (rcx * rsy * rsz - rsx * rcz) * o._sz;
   d[10] = rcx * rcy * o._sz;
   d[11] = 0;
   d[12] = o._tx;
   d[13] = o._ty;
   d[14] = o._tz;
   d[15] = 1;
}
function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}
function SMatrix3d_data(){
   return this._data;
}
function SPerspectiveMatrix3d(o){
   if(!o){o = this;}
   SMatrix3d(o);
   o.perspectiveLH            = SPerspectiveMatrix3d_perspectiveLH;
   o.perspectiveRH            = SPerspectiveMatrix3d_perspectiveRH;
   o.perspectiveFieldOfViewLH = SPerspectiveMatrix3d_perspectiveFieldOfViewLH;
   o.perspectiveFieldOfViewRH = SPerspectiveMatrix3d_perspectiveFieldOfViewRH;
   return o;
}
function SPerspectiveMatrix3d_perspectiveLH(pw, ph, pn, pf){
   var d = this._data;
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SPerspectiveMatrix3d_perspectiveRH(pw, ph, pn, pf){
   var d = this._data;
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SPerspectiveMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
function SPerspectiveMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pf - pn);
   d[15] = 0.0;
}
function SVector3(o){
   if(!o){o = this;}
   o.x         = 0;
   o.y         = 0;
   o.z         = 0;
   o._data     = null;
   o.assign    = SVector3_assign;
   o.set       = SVector3_set;
   o.absolute  = SVector3_absolute;
   o.normalize = SVector3_normalize;
   o.dotPoint3 = SVector3_dotPoint3;
   o.cross     = SVector3_cross;
   o.cross2    = SVector3_cross2;
   o.data      = SVector3_data;
   return o;
}
function SVector3_assign(v){
   var o = this;
   o.x = v.x;
   o.y = v.y;
   o.z = v.z;
}
function SVector3_set(x, y, z){
   var o = this;
   o.x = x;
   o.y = y;
   o.z = z;
}
function SVector3_absolute(){
   var o = this;
   return Math.sqrt((o.x * o.x) + (o.y * o.y) + (o.z * o.z));
}
function SVector3_normalize(){
   var o = this;
   var v = o.absolute();
   if(v != 0.0){
      o.x /= v;
      o.y /= v;
      o.z /= v;
   }
}
function SVector3_dotPoint3(v){
   var o = this;
   return (o.x * v.x) + (o.y * v.y) + (o.z * v.z);
}
function SVector3_cross(v){
   var o = this;
   var vx = (o.y * v.z) - (o.z * v.y);
   var vy = (o.z * v.x) - (o.x * v.z);
   var vz = (o.x * v.y) - (o.y * v.x);
   o.x = vx;
   o.y = vy;
   o.z = vz;
}
function SVector3_cross2(po, pi){
   var o = this;
   po.x = (o.y * pi.z) - (o.z * pi.y);
   po.y = (o.z * pi.x) - (o.x * pi.z);
   po.z = (o.x * pi.y) - (o.y * pi.x);
}
function SVector3_data(){
   var o = this;
   var d = o._data;
   if(d == null){
      d = o._data = new Float32Array(3);
   }
   d[0] = o.x;
   d[1] = o.y;
   d[2] = o.z;
   return d;
}
