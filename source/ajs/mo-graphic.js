function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject);
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.linkCanvas          = RMethod.virtual(o, 'linkCanvas');
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
   return o;
}
function FG2dContext(o){
   o = RClass.inherits(this, o, FObject);
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.linkCanvas          = RMethod.virtual(o, 'linkCanvas');
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
   return o;
}
var ERenderAttributeFormat = new function ERenderAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte = 5;
   o.ByteNormal = 6;
   return o;
}
var ERenderBlendMode = new function ERenderBlendMode(){
   var o = this;
   o.None = 0;
   o.SourceAlpha= 1;
   o.OneMinusSourceAlpha = 2;
   return o;
}
var ERenderCullMode = new function ERenderCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
var ERenderDepthMode = new function ERenderDepthMode(){
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
var ERenderFillMode = new function ERenderFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
var ERenderIndexStride = new function ERenderIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
var ERenderParameterFormat = new function ERenderParameterFormat(){
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
var ERenderShader = new function ERenderShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
var ERenderTexture = new function ERenderTexture(){
   var o = this;
   o.None = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
function FRenderCamera(o){
   o = RClass.inherits(this, o, FObject);
   o.name = null;
   o.matrix = null;
   o.position = null;
   o.direction = null;
   o._centerFront = 0;
   o._centerBack = 0;
   o._focalNear = 0.1;
   o._focalFar = 100.0;
   o._planes = null;
   o._frustum = null;
   o.projection = null;
   o.viewport = null;
   o._axisUp = null;
   o._axisX = null;
   o._axisY = null;
   o._axisZ = null;
   o.construct     = FRenderCamera_construct;
   o.doWalk        = FRenderCamera_doWalk;
   o.doStrafe      = FRenderCamera_doStrafe;
   o.doFly         = FRenderCamera_doFly;
   o.doYaw         = FRenderCamera_doYaw;
   o.doPitch       = FRenderCamera_doPitch;
   o.lookAt        = FRenderCamera_lookAt;
   o.updateFrustum = FRenderCamera_updateFrustum;
   o.update        = FRenderCamera_update;
   return o;
}
function FRenderCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.matrix = new SMatrix3d();
   o.position = new SPoint3();
   o.direction = new SVector3();
   o.viewport = RClass.create(FRenderViewport);
   o.projection = RClass.create(FRenderProjection);
   o._axisUp = new SVector3();
   o._axisUp.set(0, 1, 0);
   o._axisX = new SVector3();
   o._axisY = new SVector3();
   o._axisZ = new SVector3();
}
function FRenderCamera_doWalk(){
}
function FRenderCamera_doStrafe(){
}
function FRenderCamera_doFly(){
}
function FRenderCamera_doYaw(){
}
function FRenderCamera_doPitch(){
}
function FRenderCamera_lookAt(x, y, z){
   var o = this;
   var p = o.position;
   o.direction.set(x - p.x, y - p.y, z - p.z);
   o.direction.normalize();
}
function FRenderCamera_updateFrustum(){
}
function FRenderCamera_update(){
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
   d[12] = -ax.dotPoint3(o.position);
   d[13] = -ay.dotPoint3(o.position);
   d[14] = -az.dotPoint3(o.position);
   d[15] = 1.0;
}
function FRenderContext(o){
   o = RClass.inherits(this, o, FObject);
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.linkCanvas          = RMethod.virtual(o, 'linkCanvas');
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
   return o;
}
function FRenderCubeTexture(o){
   o = RClass.inherits(this, o, FRenderTexture);
   o.size = 0;
   o.construct = FRenderTexture_construct;
   return o;
}
function FRenderTexture_construct(){
   var o = this;
   o.__base.FRenderTexture.construct();
   o._textureCd = ERenderTexture.Cube;
}
function FRenderFlatTexture(o){
   o = RClass.inherits(this, o, FRenderTexture);
   o.width = 0;
   o.height = 0;
   o.construct = FRenderFlatTexture_construct;
   return o;
}
function FRenderFlatTexture_construct(){
   var o = this;
   o.__base.FRenderTexture.construct();
   o._textureCd = ERenderTexture.Flat2d;
}
function FRenderFragmentShader(o){
   o = RClass.inherits(this, o, FRenderShader);
   return o;
}
function FRenderIndexBuffer(o){
   o = RClass.inherits(this, o, FRenderObject);
   o.strideCd = ERenderIndexStride.Uint16;
   o.count    = 0;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FRenderLight(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FRenderMaterial(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FRenderObject(o){
   o = RClass.inherits(this, o, FObject);
   o._context = null;
   o.linkContext = FRenderObject_linkContext;
   o.setup       = FRenderObject_setup;
   return o;
}
function FRenderObject_linkContext(c){
   this._context = c;
}
function FRenderObject_setup(){
}
function FRenderProgram(o){
   o = RClass.inherits(this, o, FRenderObject);
   o._attributes     = null;
   o._parameters     = null;
   o._samplers       = null;
   o._vertexShader   = null;
   o._fragmentShader = null;
   o.hasAttribute      = FRenderProgram_hasAttribute;
   o.attributeRegister = FRenderProgram_attributeRegister;
   o.attributeFind     = FRenderProgram_attributeFind;
   o.attributes        = FRenderProgram_attributes;
   o.hasParameter      = FRenderProgram_hasParameter;
   o.parameterRegister = FRenderProgram_parameterRegister;
   o.parameterFind     = FRenderProgram_parameterFind;
   o.parameters        = FRenderProgram_parameters;
   o.hasSampler        = FRenderProgram_hasSampler;
   o.samplers          = FRenderProgram_samplers;
   o.vertexShader    = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader  = RMethod.virtual(o, 'fragmentShader');
   return o;
}
function FRenderProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
function FRenderProgram_attributeRegister(n){
   var o = this;
   var r = RClass.create(FRenderProgramAttribute);
   r.name = n;
   o.attributes().set(n, r);
   return r;
}
function FRenderProgram_attributeFind(n){
   return this._attributes ? this._attributes.get(n) : null;
}
function FRenderProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}
function FRenderProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
function FRenderProgram_parameterRegister(pn, pf){
   var o = this;
   var r = RClass.create(FRenderProgramParameter);
   r.name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
function FRenderProgram_parameterFind(n){
   return this._parameters ? this._parameters.get(n) : null;
}
function FRenderProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}
function FRenderProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
function FRenderProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
function FRenderProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   o.name = null;
   o.linker = null;
   o.statusUsed = false;
   o.slot = -1;
   o.index = -1;
   o.formatCd = -1;
   return o;
}
function FRenderProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   o.name = null;
   o.linker = null;
   o.statusUsed = false;
   o.shaderCd = -1;
   o.formatCd = -1;
   o.slot = -1;
   o.size = 0;
   o.buffer = null;
   return o;
}
function FRenderProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   o.name = null;
   o.linker = null;
   o.statusUsed = false;
   o.slot = -1;
   o.index = 0;
   o.source = null;
   return o;
}
function FRenderProjection(o){
   o = RClass.inherits(this, o, FObject);
   o.width       = 0;
   o.height      = 0;
   o.angle       = 60;
   o.fieldOfView = 0;
   o.scale       = 0;
   o.znear       = 0.01;
   o.zfar        = 200;
   o.matrix     = null;
   o.construct = FRenderProjection_construct;
   o.update    = FRenderProjection_update;
   return o;
}
function FRenderProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.matrix = new SPerspectiveMatrix3d();
}
function FRenderProjection_update(){
   var o = this;
   o.fieldOfView = RMath.DEGREE_RATE * o.angle;
   o.matrix.perspectiveFieldOfViewLH(o.fieldOfView, o.width / o.height, o.znear, o.zfar);
}
function FRenderShader(o){
   o = RClass.inherits(this, o, FRenderObject);
   o.source = null;
   return o;
}
function FRenderTexture(o){
   o = RClass.inherits(this, o, FRenderObject);
   o._textureCd  = 0;
   o._statusLoad = false;
   return o;
}
function FRenderVertexBuffer(o){
   o = RClass.inherits(this, o, FRenderObject);
   o.stride = 0;
   o.count  = 0;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FRenderVertexShader(o){
   o = RClass.inherits(this, o, FRenderShader);
   return o;
}
function FRenderViewport(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = FRenderViewport_set;
   return o;
}
function FRenderViewport_set(l, t, w, h){
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
   o.x = 0;
   o.y = 0;
   o.z = 0;
   o.assign    = SVector3_assign;
   o.set       = SVector3_set;
   o.absolute  = SVector3_absolute;
   o.normalize = SVector3_normalize;
   o.dotPoint3 = SVector3_dotPoint3;
   o.cross     = SVector3_cross;
   o.cross2    = SVector3_cross2;
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
   switch(pt.textureCd){
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
   return result;
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
   o.setParameter   = FWglProgram_setParameter;
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
      var count = as.Count();
      for(var n = 0; n < count; n++){
         var a = as.get(n);
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
         var i = g.getUniformLocation(pn, p.name);
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name, i);
         if(!r){
            return r;
         }
         p.slot = i;
         if(i != null){
            p.statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name);
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name, i);
         if(!r){
            return r;
         }
         p.slot = i;
         if(i != -1){
            p.statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name);
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name, i);
         if(!r){
            return r;
         }
         p.slot = i;
         if(i != null){
            p.statusUsed = true;;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p.statusUsed){
            p.index = si++;
         }
      }
   }
   return r;
}
function FWglProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.parameterFind(pn);
   o._context.bindConst(null, p.slot, p.formatCd, pv, pc);
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
