//==========================================================
// <T>三维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
MO.SMatrix3d = function SMatrix3d(){
   var o = this;
   MO.SMatrix4x4.call(o);
   //..........................................................
   // @attribute
   o._dirty         = false;
   // @attribute
   o.tx             = 0;
   o.ty             = 0;
   o.tz             = 0;
   o.rx             = 0;
   o.ry             = 0;
   o.rz             = 0;
   o.sx             = 1;
   o.sy             = 1;
   o.sz             = 1;
   //..........................................................
   // @method
   o.isIdentity     = MO.SMatrix3d_isIdentity;
   o.identity       = MO.SMatrix3d_identity;
   o.setTranslate   = MO.SMatrix3d_setTranslate;
   o.setRotation    = MO.SMatrix3d_setRotation;
   o.setScale       = MO.SMatrix3d_setScale;
   o.setScaleAll    = MO.SMatrix3d_setScaleAll;
   o.set            = MO.SMatrix3d_set;
   o.setAll         = MO.SMatrix3d_setAll;
   o.equals         = MO.SMatrix3d_equals;
   o.assign         = MO.SMatrix3d_assign;
   o.attach         = MO.SMatrix3d_attach;
   o.append         = MO.SMatrix3d_append;
   o.updateForce    = MO.SMatrix3d_updateForce;
   o.update         = MO.SMatrix3d_update;
   o.merge          = MO.SMatrix3d_merge;
   o.parse          = MO.SMatrix3d_parse;
   o.serialize      = MO.SMatrix3d_serialize;
   o.unserialize    = MO.SMatrix3d_unserialize;
   o.saveConfig     = MO.SMatrix3d_saveConfig;
   //..........................................................
   // @construct
   o.identity();
   return o;
}

//============================================================
// <T>是否为单位化数据。</T>
//
// @method
// @return 是否单位化
//============================================================
MO.SMatrix3d_isIdentity = function SMatrix3d_isIdentity(){
   var o = this;
   if((o.tx != 0) || (o.ty != 0) || (o.tz != 0)){
      return false;
   }
   if((o.rx != 0) || (o.ry != 0) || (o.rz != 0)){
      return false;
   }
   if((o.sx != 1) || (o.sy != 1) || (o.sz != 1)){
      return false;
   }
   return o.isIdentityData();
}

//============================================================
// <T>单位化处理。</T>
//
// @method
//============================================================
MO.SMatrix3d_identity = function SMatrix3d_identity(){
   var o = this;
   o.tx = o.ty = o.tz = 0;
   o.rx = o.ry = o.rz = 0;
   o.sx = o.sy = o.sz = 1;
   return o.identityData();
}

//============================================================
// <T>设置平移内容。</T>
//
// @method
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
MO.SMatrix3d_setTranslate = function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o.tx = x;
   o.ty = y;
   o.tz = z;
   o._dirty = true;
}

//============================================================
// <T>设置旋转内容。</T>
//
// @method
// @param x:Float X旋转
// @param y:Float Y旋转
// @param z:Float Z旋转
//============================================================
MO.SMatrix3d_setRotation = function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o.rx = x;
   o.ry = y;
   o.rz = z;
   o._dirty = true;
}

//============================================================
// <T>设置缩放内容。</T>
//
// @method
// @param x:Float X缩放
// @param y:Float Y缩放
// @param z:Float Z缩放
//============================================================
MO.SMatrix3d_setScale = function SMatrix3d_setScale(x, y, z){
   var o = this;
   o.sx = x;
   o.sy = y;
   o.sz = z;
   o._dirty = true;
}

//============================================================
// <T>设置全部缩放内容。</T>
//
// @method
// @param p:value:Float 缩放
//============================================================
MO.SMatrix3d_setScaleAll = function SMatrix3d_setScaleAll(p){
   var o = this;
   o.sz = o.sy = o.sx = p;
   o._dirty = true;
}

//============================================================
// <T>设置内容。</T>
//
// @method
// @param pt:SPoint3 坐标
// @param pr:SVector3 旋转
// @param ps:SVector3 缩放
//============================================================
MO.SMatrix3d_set = function SMatrix3d_set(pt, pr, ps){
   var o = this;
   o.tx = pt.x;
   o.ty = pt.y;
   o.tz = pt.z;
   o.rx = pr.x;
   o.ry = pr.y;
   o.rz = pr.z;
   o.sx = ps.x;
   o.sy = ps.y;
   o.sz = ps.z;
   o._dirty = true;
}

//============================================================
// <T>设置内容。</T>
//
// @method
// @param ptx:Float X坐标
// @param pty:Float Y坐标
// @param ptz:Float Z坐标
// @param prx:Float X旋转
// @param pry:Float Y旋转
// @param prz:Float Z旋转
// @param psx:Float X缩放
// @param psy:Float Y缩放
// @param psz:Float Z缩放
//============================================================
MO.SMatrix3d_setAll = function SMatrix3d_setAll(ptx, pty, ptz, prx, pry, prz, psx, psy, psz){
   var o = this;
   o.tx = ptx;
   o.ty = pty;
   o.tz = ptz;
   o.rx = prx;
   o.ry = pry;
   o.rz = prz;
   o.sx = psx;
   o.sy = psy;
   o.sz = psz;
   o._dirty = true;
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @param p:matrix:SMatrix3d 矩阵
// @return Boolean 是否相等
//============================================================
MO.SMatrix3d_equals = function SMatrix3d_equals(p){
   return this.equalsData(p._data);
}

//============================================================
// <T>接收一个矩阵。</T>
//
// @method
// @param p:matrix:SMatrix3d 矩阵
//============================================================
MO.SMatrix3d_assign = function SMatrix3d_assign(p){
   var o = this;
   o.tx = p.tx;
   o.ty = p.ty;
   o.tz = p.tz;
   o.rx = p.rx;
   o.ry = p.ry;
   o.rz = p.rz;
   o.sx = p.sx;
   o.sy = p.sy;
   o.sz = p.sz;
   return o.assignData(p._data);
}

//============================================================
// <T>接收一个矩阵，返回是否修改。</T>
//
// @method
// @param p:matrix:SMatrix3d 矩阵
//============================================================
MO.SMatrix3d_attach = function SMatrix3d_attach(p){
   var o = this;
   o.tx = p.tx;
   o.ty = p.ty;
   o.tz = p.tz;
   o.rx = p.rx;
   o.ry = p.ry;
   o.rz = p.rz;
   o.sx = p.sx;
   o.sy = p.sy;
   o.sz = p.sz;
   return o.attachData(p._data);
}

//============================================================
// <T>追加一个矩阵。</T>
//
// @method
// @param p:value:SMatrix3d 矩阵
//============================================================
MO.SMatrix3d_append = function SMatrix3d_append(p){
   this.appendData(p._data);
}

//============================================================
// <T>强制更新数据。</T>
//
// @method
//============================================================
MO.SMatrix3d_updateForce = function SMatrix3d_updateForce(){
   var o = this;
   var d = o._data;
   var rsx = Math.sin(o.rx);
   var rcx = Math.cos(o.rx);
   var rsy = Math.sin(o.ry);
   var rcy = Math.cos(o.ry);
   var rsz = Math.sin(o.rz);
   var rcz = Math.cos(o.rz);
   d[ 0] = rcy * rcz * o.sx;
   d[ 1] = rcy * rsz * o.sx;
   d[ 2] = -rsy * o.sx;
   d[ 3] = 0;
   d[ 4] = (rsx * rsy * rcz - rcx * rsz) * o.sy;
   d[ 5] = (rsx * rsy * rsz + rcx * rcz) * o.sy;
   d[ 6] = rsx * rcy * o.sy;
   d[ 7] = 0;
   d[ 8] = (rcx * rsy * rcz + rsx * rsz) * o.sz;
   d[ 9] = (rcx * rsy * rsz - rsx * rcz) * o.sz;
   d[10] = rcx * rcy * o.sz;
   d[11] = 0;
   d[12] = o.tx;
   d[13] = o.ty;
   d[14] = o.tz;
   d[15] = 1;
}

//============================================================
// <T>更新数据。</T>
//
// @method
//============================================================
MO.SMatrix3d_update = function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}

//============================================================
// <T>合并数据。</T>
//
// @method
//============================================================
MO.SMatrix3d_merge = function SMatrix3d_merge(bm, am){
   var o = this;
   o.tx = bm.tx + am.tx;
   o.ty = bm.ty + am.ty;
   o.tz = bm.tz + am.tz;
   o.rx = bm.rx + am.rx;
   o.ry = bm.ry + am.ry;
   o.rz = bm.rz + am.rz;
   o.sx = bm.sx * am.sx;
   o.sy = bm.sy * am.sy;
   o.sz = bm.sz * am.sz;
   o.updateForce();
}
function my_create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
function my_normalize(out, mat) {
    var m44 = mat[15]
    // Cannot normalize.
    if (m44 === 0) 
        return false
    var scale = 1 / m44
    for (var i=0; i<16; i++)
        out[i] = mat[i] * scale
    return true
}
function my_clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
function my_determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

function my_invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

function my_transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};
function my_vec4multMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
}

//gets upper-left of a 4x4 matrix into a 3x3 of vectors
function my_mat3from4(out, mat4x4) {
    out[0][0] = mat4x4[ 0];
    out[0][1] = mat4x4[ 1];
    out[0][2] = mat4x4[ 2];

    out[1][0] = mat4x4[ 4];
    out[1][1] = mat4x4[ 5];
    out[1][2] = mat4x4[ 6];

    out[2][0] = mat4x4[ 8];
    out[2][1] = mat4x4[ 9];
    out[2][2] = mat4x4[10];
}

function my_combine(out, a, b, scale1, scale2) {
    out[0] = a[0] * scale1 + b[0] * scale2;
    out[1] = a[1] * scale1 + b[1] * scale2;
    out[2] = a[2] * scale1 + b[2] * scale2;
}
var vec3 = {
   length: function length(a) {
      var x = a[0], y = a[1], z = a[2];
      return Math.sqrt(x * x + y * y + z * z)
   },
   normalize: function normalize(out, a) {
         var x = a[0], y = a[1], z = a[2];
         var len = x * x + y * y + z * z
         if (len > 0) {
            len = 1 / Math.sqrt(len)
            out[0] = a[0] * len
            out[1] = a[1] * len
            out[2] = a[2] * len
         }
         return out
      },
   dot: function dot(a, b){
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
   },
   cross: function cross(out, a, b) {
      var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out
   }
}

var tmp = my_create()
var perspectiveMatrix = my_create();
var tmpVec4 = [0, 0, 0, 0];
var row = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
var pdum3 = [0, 0, 0];

MO.SMatrix3d_parse = function SMatrix3d_parse(translation, scale, skew, perspective, quaternion){
   var o = this;
   if(!translation) translation = [0,0,0];
   if(!scale) scale = [0,0,0];
   if(!skew) skew = [0,0,0];
   if(!perspective) perspective = [0,0,0,1];
   if(!quaternion) quaternion = [0,0,0,1];

   //normalize, if not possible then bail out early
   if(!my_normalize(tmp, o._data)){
      return false
   }

   // perspectiveMatrix is used to solve for perspective, but it also provides
   // an easy way to test for singularity of the upper 3x3 component.
   my_clone(perspectiveMatrix, tmp);
   perspectiveMatrix[3] = 0
   perspectiveMatrix[7] = 0
   perspectiveMatrix[11] = 0
   perspectiveMatrix[15] = 1

   // If the perspectiveMatrix is not invertible, we are also unable to
   // decompose, so we'll bail early. Constant taken from SkMatrix44::invert.
   if(Math.abs(my_determinant(perspectiveMatrix) < 1e-8)){
      return false
   }

   var a03 = tmp[3], a13 = tmp[7], a23 = tmp[11], a30 = tmp[12], a31 = tmp[13], a32 = tmp[14], a33 = tmp[15];
   // First, isolate perspective.
   if(a03 !== 0 || a13 !== 0 || a23 !== 0){
      tmpVec4[0] = a03
      tmpVec4[1] = a13
      tmpVec4[2] = a23
      tmpVec4[3] = a33
      // Solve the equation by inverting perspectiveMatrix and multiplying
      // rightHandSide by the inverse.
      // resuing the perspectiveMatrix here since it's no longer needed
      var ret = my_invert(perspectiveMatrix, perspectiveMatrix);
      if(!ret){
         return false
      }
      my_transpose(perspectiveMatrix, perspectiveMatrix);

      //multiply by transposed inverse perspective matrix, into perspective vec4
      my_vec4multMat4(perspective, tmpVec4, perspectiveMatrix);
   } else { 
      //no perspective
      perspective[0] = perspective[1] = perspective[2] = 0
      perspective[3] = 1
   }

   // Next take care of translation
   translation[0] = a30;
   translation[1] = a31;
   translation[2] = a32;

   // Now get scale and shear. 'row' is a 3 element array of 3 component vectors
   my_mat3from4(row, tmp);

   // Compute X scale factor and normalize first row.
   scale[0] = vec3.length(row[0]);
   vec3.normalize(row[0], row[0]);

   // Compute XY shear factor and make 2nd row orthogonal to 1st.
   skew[0] = vec3.dot(row[0], row[1]);
   my_combine(row[1], row[1], row[0], 1.0, -skew[0])

   // Now, compute Y scale and normalize 2nd row.
   scale[1] = vec3.length(row[1])
   vec3.normalize(row[1], row[1])
   skew[0] /= scale[1]

   // Compute XZ and YZ shears, orthogonalize 3rd row
   skew[1] = vec3.dot(row[0], row[2])
   my_combine(row[2], row[2], row[0], 1.0, -skew[1])
   skew[2] = vec3.dot(row[1], row[2])
   my_combine(row[2], row[2], row[1], 1.0, -skew[2])

   // Next, get Z scale and normalize 3rd row.
   scale[2] = vec3.length(row[2])
   vec3.normalize(row[2], row[2])
   skew[1] /= scale[2]
   skew[2] /= scale[2]

   // At this point, the matrix (in rows) is orthonormal.
   // Check for a coordinate system flip.  If the determinant
   // is -1, then negate the matrix and the scaling factors.
   vec3.cross(pdum3, row[1], row[2]);
   if(vec3.dot(row[0], pdum3) < 0){
      for(var i = 0; i < 3; i++){
         scale[i] *= -1;
         row[i][0] *= -1;
         row[i][1] *= -1;
         row[i][2] *= -1;
      }
   }

   // Now, get the rotations out
   quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] - row[1][1] - row[2][2], 0))
   quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] + row[1][1] - row[2][2], 0))
   quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] - row[1][1] + row[2][2], 0))
   quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] + row[1][1] + row[2][2], 0))

   if (row[2][1] > row[1][2])
      quaternion[0] = -quaternion[0]
   if (row[0][2] > row[2][0])
      quaternion[1] = -quaternion[1]
   if (row[1][0] > row[0][1])
      quaternion[2] = -quaternion[2]

   var qx = quaternion[0];
   var qy = quaternion[1];
   var qz = quaternion[2];
   var qw = quaternion[3];
   o.rx = Math.atan2((qw * qx + qy * qz) * 2, 1 - 2 * (qx * qx + qy * qy));
   o.ry = Math.asin(2 * (qw * qy - qz * qx));
   o.rz = Math.atan2((qw * qz + qx * qy) * 2, 1 - 2 * (qy * qy + qz * qz));
   return true
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SMatrix3d_serialize = function SMatrix3d_serialize(p){
   var o = this;
   p.writeFloat(o.tx);
   p.writeFloat(o.ty);
   p.writeFloat(o.tz);
   p.writeFloat(o.rx);
   p.writeFloat(o.ry);
   p.writeFloat(o.rz);
   p.writeFloat(o.sx);
   p.writeFloat(o.sy);
   p.writeFloat(o.sz);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
MO.SMatrix3d_unserialize = function SMatrix3d_unserialize(p){
   var o = this;
   o.tx = p.readFloat();
   o.ty = p.readFloat();
   o.tz = p.readFloat();
   o.rx = p.readFloat();
   o.ry = p.readFloat();
   o.rz = p.readFloat();
   o.sx = p.readFloat();
   o.sy = p.readFloat();
   o.sz = p.readFloat();
   o.updateForce();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
MO.SMatrix3d_saveConfig = function SMatrix3d_saveConfig(p){
   var o = this;
   p.set('tx', MO.Lang.Float.format(o.tx));
   p.set('ty', MO.Lang.Float.format(o.ty));
   p.set('tz', MO.Lang.Float.format(o.tz));
   p.set('rx', MO.Lang.Float.format(o.rx));
   p.set('ry', MO.Lang.Float.format(o.ry));
   p.set('rz', MO.Lang.Float.format(o.rz));
   p.set('sx', MO.Lang.Float.format(o.sx));
   p.set('sy', MO.Lang.Float.format(o.sy));
   p.set('sz', MO.Lang.Float.format(o.sz));
}
