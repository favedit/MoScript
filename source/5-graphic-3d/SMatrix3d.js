//==========================================================
// <T>四维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SMatrix3d(o){
   if(!o){o = this;}
   // @attribute
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
   // @method
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
   // @construct
   o.identity();
   return o;
}

//============================================================
// <T>单位化处理。</T>
//============================================================
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

//============================================================
// <T>设置平移内容。</T>
//
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o._tx = x;
   o._ty = y;
   o._tz = z;
   o.dirty = true;
}

//============================================================
// <T>设置旋转内容。</T>
//
// @param x:Float X旋转
// @param y:Float Y旋转
// @param z:Float Z旋转
//============================================================
function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o._rx = x;
   o._ry = y;
   o._rz = z;
   o.dirty = true;
}

//============================================================
// <T>设置缩放内容。</T>
//
// @param x:Float X缩放
// @param y:Float Y缩放
// @param z:Float Z缩放
//============================================================
function SMatrix3d_setScale(x, y, z){
   var o = this;
   o._sx = x;
   o._sy = y;
   o._sz = z;
   o.dirty = true;
}

//============================================================
// <T>接收一个数据。</T>
//
// @param p:array:Float32Array 数据
//============================================================
function SMatrix3d_assignData(p){
   var d = this._data;
   for(var n = 0; n < 16; n++){
      d[n] = p[n];
   }
}

//============================================================
// <T>接收一个矩阵。</T>
//
// @param p:matrix:SMatrix3d 矩阵
//============================================================
function SMatrix3d_assign(p){
   this.assignData(p._data);
}

//============================================================
// <T>追加一个矩阵数据内容。</T>
//
// @param v:values:Float32Array 数据
//============================================================
function SMatrix3d_appendData(v){
   var d = this._data;
   // 矩阵计算
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
   // 复制内容
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

//============================================================
// <追加一个矩阵。</T>
//
// @param v:value:SMatrix3d 矩阵
//============================================================
function SMatrix3d_append(v){
   this.appendData(v.data());
}

//============================================================
// <T>平移内容。</T>
//
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
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

//============================================================
// <T>X轴旋转内容。</T>
//  1    0   0 0
//  0  cos sin 0
//  0 -sin cos 0
//  0    0   0 1 
//
// @param v:value:Float 弧度
//============================================================
function SMatrix3d_rotationX(v){
   // 计算旋转
   var rs = Math.sin(v);
   var rc = Math.cos(v);
   // 追加内容
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

//============================================================
// <T>Y轴旋转内容。</T>
//  cos   0  sin  0
//  0     1    0  0
//  -sin  0  cos  0
//  0     0    0  1 
//
// @param v:value:Float 弧度
//============================================================
function SMatrix3d_rotationY(v){
   // 计算旋转
   var rs = Math.sin(v);
   var rc = Math.cos(v);
   // 追加内容
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

//============================================================
// <T>Z轴旋转内容。</T>
//  cos  sin  0 0
//  -sin cos  1 0
//  0      0  1 0
//  0      0  0 1 
//
// @param v:value:Float 弧度
//============================================================
function SMatrix3d_rotationZ(v){
   // 计算旋转
   var rs = Math.sin(v);
   var rc = Math.cos(v);
   // 追加内容
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

//============================================================
// <T>设置旋转内容。</T>
//  1    0   0 0
//  0  cos sin 0
//  0 -sin cos 0
//  0    0   0 1 
//
// @param x:Float X弧度
// @param y:Float Y弧度
// @param z:Float Z弧度
//============================================================
function SMatrix3d_rotation(x, y, z){
   // 计算旋转
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   // 追加内容
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

//============================================================
// <T>设置缩放内容。</T>
//
// @param x:Float X比例
// @param y:Float Y比例
// @param z:Float Z比例
//============================================================
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

//============================================================
// <T>强制更新数据。</T>
//============================================================
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

//============================================================
// <T>更新数据。</T>
//============================================================
function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}

//============================================================
// <T>获得数据。</T>
//
// @return Float32Array 数据
//============================================================
function SMatrix3d_data(){
   return this._data;
}
