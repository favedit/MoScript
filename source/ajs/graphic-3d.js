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
