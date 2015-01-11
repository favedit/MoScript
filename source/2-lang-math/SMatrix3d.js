//==========================================================
// <T>三维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SMatrix3d(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o._dirty       = false;
   // @attribute
   o.tx           = 0.0;
   o.ty           = 0.0;
   o.tz           = 0.0;
   o.rx           = 0.0;
   o.ry           = 0.0;
   o.rz           = 0.0;
   o.sx           = 1.0;
   o.sy           = 1.0;
   o.sz           = 1.0;
   // @attribute
   o._data        = new Float32Array(16);
   //..........................................................
   // @method
   o.data         = SMatrix3d_data;
   // @method
   o.identity     = SMatrix3d_identity;
   o.setTranslate = SMatrix3d_setTranslate
   o.setRotation  = SMatrix3d_setRotation
   o.setScale     = SMatrix3d_setScale
   o.equalsData   = SMatrix3d_equalsData;
   o.equals       = SMatrix3d_equals;
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
   o.invert       = SMatrix3d_invert;
   o.updateForce  = SMatrix3d_updateForce;
   o.update       = SMatrix3d_update;
   o.serialize    = SMatrix3d_serialize;
   o.unserialize  = SMatrix3d_unserialize;
   //..........................................................
   // @construct
   o.identity();
   return o;
}

//============================================================
// <T>获得数据。</T>
//
// @method
// @return Float32Array 数据
//============================================================
function SMatrix3d_data(){
   return this._data;
}

//============================================================
// <T>单位化处理。</T>
//
// @method
//============================================================
function SMatrix3d_identity(){
   var o = this;
   o.tx = o.ty = o.tz = 0;
   o.rx = o.ry = o.rz = 0;
   o.sx = o.sy = o.sz = 1;
   var d = o._data;
   d[ 0] = 1; d[ 1] = 0; d[ 2] = 0; d[ 3] = 0;
   d[ 4] = 0; d[ 5] = 1; d[ 6] = 0; d[ 7] = 0;
   d[ 8] = 0; d[ 9] = 0; d[10] = 1; d[11] = 0;
   d[12] = 0; d[13] = 0; d[14] = 0; d[15] = 1;
}

//============================================================
// <T>设置平移内容。</T>
//
// @method
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
function SMatrix3d_setTranslate(x, y, z){
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
function SMatrix3d_setRotation(x, y, z){
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
function SMatrix3d_setScale(x, y, z){
   var o = this;
   o.sx = x;
   o.sy = y;
   o.sz = z;
   o._dirty = true;
}

//============================================================
// <T>判断数据是否相等。</T>
//
// @method
// @param p:array:Float32Array 数据
// @return Boolean 是否相等
//============================================================
function SMatrix3d_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 16; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @param p:matrix:SMatrix3d 矩阵
// @return Boolean 是否相等
//============================================================
function SMatrix3d_equals(p){
   return this.equalsData(p._data);
}

//============================================================
// <T>接收一个数据。</T>
//
// @method
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
// @method
// @param p:matrix:SMatrix3d 矩阵
//============================================================
function SMatrix3d_assign(p){
   this.assignData(p._data);
}

//============================================================
// <T>追加一个矩阵数据内容。</T>
//
// @method
// @param p:values:Float32Array 数据
//============================================================
function SMatrix3d_appendData(p){
   var d = this._data;
   // 矩阵计算
   var v00 = (d[ 0] * p[0]) + (d[ 1] * p[4]) + (d[ 2] * p[ 8]) + (d[ 3] * p[12]);
   var v01 = (d[ 0] * p[1]) + (d[ 1] * p[5]) + (d[ 2] * p[ 9]) + (d[ 3] * p[13]);
   var v02 = (d[ 0] * p[2]) + (d[ 1] * p[6]) + (d[ 2] * p[10]) + (d[ 3] * p[14]);
   var v03 = (d[ 0] * p[3]) + (d[ 1] * p[7]) + (d[ 2] * p[11]) + (d[ 3] * p[15]);
   var v04 = (d[ 4] * p[0]) + (d[ 5] * p[4]) + (d[ 6] * p[ 8]) + (d[ 7] * p[12]);
   var v05 = (d[ 4] * p[1]) + (d[ 5] * p[5]) + (d[ 6] * p[ 9]) + (d[ 7] * p[13]);
   var v06 = (d[ 4] * p[2]) + (d[ 5] * p[6]) + (d[ 6] * p[10]) + (d[ 7] * p[14]);
   var v07 = (d[ 4] * p[3]) + (d[ 5] * p[7]) + (d[ 6] * p[11]) + (d[ 7] * p[15]);
   var v08 = (d[ 8] * p[0]) + (d[ 9] * p[4]) + (d[10] * p[ 8]) + (d[11] * p[12]);
   var v09 = (d[ 8] * p[1]) + (d[ 9] * p[5]) + (d[10] * p[ 9]) + (d[11] * p[13]);
   var v10 = (d[ 8] * p[2]) + (d[ 9] * p[6]) + (d[10] * p[10]) + (d[11] * p[14]);
   var v11 = (d[ 8] * p[3]) + (d[ 9] * p[7]) + (d[10] * p[11]) + (d[11] * p[15]);
   var v12 = (d[12] * p[0]) + (d[13] * p[4]) + (d[14] * p[ 8]) + (d[15] * p[12]);
   var v13 = (d[12] * p[1]) + (d[13] * p[5]) + (d[14] * p[ 9]) + (d[15] * p[13]);
   var v14 = (d[12] * p[2]) + (d[13] * p[6]) + (d[14] * p[10]) + (d[15] * p[14]);
   var v15 = (d[12] * p[3]) + (d[13] * p[7]) + (d[14] * p[11]) + (d[15] * p[15]);
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
// @method
// @param p:value:SMatrix3d 矩阵
//============================================================
function SMatrix3d_append(p){
   this.appendData(p._data);
}

//============================================================
// <T>平移内容。</T>
//
// @method
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
function SMatrix3d_translate(x, y, z){
   var v = RMath.float16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = x;
   v[13] = y;
   v[14] = z;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>X轴旋转内容。</T>
//  1    0   0 0
//  0  cos sin 0
//  0 -sin cos 0
//  0    0   0 1 
//
// @method
// @param p:value:Float 弧度
//============================================================
function SMatrix3d_rotationX(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RMath.float16;
   v[ 0] = 1;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = rc;
   v[ 6] = rs;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = -rs;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>Y轴旋转内容。</T>
//  cos   0  sin  0
//  0     1    0  0
//  -sin  0  cos  0
//  0     0    0  1 
//
// @method
// @param p:value:Float 弧度
//============================================================
function SMatrix3d_rotationY(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RMath.float16;
   v[ 0] = rc;
   v[ 1] = 0;
   v[ 2] = rs;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = 1;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = -rs;
   v[ 9] = 0;
   v[10] = rc;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>Z轴旋转内容。</T>
//  cos  sin  0 0
//  -sin cos  1 0
//  0      0  1 0
//  0      0  0 1 
//
// @method
// @param p:value:Float 弧度
//============================================================
function SMatrix3d_rotationZ(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RMath.float16;
   v[ 0] = rc;
   v[ 1] = rs;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = -rs;
   v[ 5] = rc;
   v[ 6] = 1;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = 1;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>设置旋转内容。</T>
//  1    0   0 0
//  0  cos sin 0
//  0 -sin cos 0
//  0    0   0 1 
//
// @method
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
   var v = RMath.float16;
   v[ 0] = rcy * rcz;
   v[ 1] = rcy * rsz;
   v[ 2] = -rsy;
   v[ 3] = 0;
   v[ 4] = rsx * rsy * rcz - rcx * rsz;
   v[ 5] = rsx * rsy * rsz + rcx * rcz;
   v[ 6] = rsx * rcy;
   v[ 7] = 0;
   v[ 8] = rcx * rsy * rcz + rsx * rsz;
   v[ 9] = rcx * rsy * rsz - rsx * rcx;
   v[10] = rcx * rcy;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>设置缩放内容。</T>
//
// @method
// @param x:Float X比例
// @param y:Float Y比例
// @param z:Float Z比例
//============================================================
function SMatrix3d_scale(x, y, z){
   var v = RMath.float16;
   v[ 0] = x;
   v[ 1] = 0;
   v[ 2] = 0;
   v[ 3] = 0;
   v[ 4] = 0;
   v[ 5] = y;
   v[ 6] = 0;
   v[ 7] = 0;
   v[ 8] = 0;
   v[ 9] = 0;
   v[10] = z;
   v[11] = 0;
   v[12] = 0;
   v[13] = 0;
   v[14] = 0;
   v[15] = 1;
   this.appendData(v);
}

//============================================================
// <T>计算逆矩阵。</T>
//
// @method
// @return Boolean 是否成功
//============================================================
function SMatrix3d_invert(){
   var o = this;
   var d = o._data;
   var v = RMath.float16;
   // 计算矩阵
   v[ 0] =  (d[ 5] * d[10] * d[15]) - (d[ 5] * d[11] * d[14]) - (d[ 9] * d[ 6] * d[15]) + (d[ 9] * d[ 7] * d[14]) + (d[13] * d[ 6] * d[11]) - (d[13] * d[ 7] * d[10]);
   v[ 4] = -(d[ 4] * d[10] * d[15]) + (d[ 4] * d[11] * d[14]) + (d[ 8] * d[ 6] * d[15]) - (d[ 8] * d[ 7] * d[14]) - (d[12] * d[ 6] * d[11]) + (d[12] * d[ 7] * d[10]);
   v[ 8] =  (d[ 4] * d[ 9] * d[15]) - (d[ 4] * d[11] * d[13]) - (d[ 8] * d[ 5] * d[15]) + (d[ 8] * d[ 7] * d[13]) + (d[12] * d[ 5] * d[11]) - (d[12] * d[ 7] * d[ 9]);
   v[12] = -(d[ 4] * d[ 9] * d[14]) + (d[ 4] * d[10] * d[13]) + (d[ 8] * d[ 5] * d[14]) - (d[ 8] * d[ 6] * d[13]) - (d[12] * d[ 5] * d[10]) + (d[12] * d[ 6] * d[ 9]);
   v[ 1] = -(d[ 1] * d[10] * d[15]) + (d[ 1] * d[11] * d[14]) + (d[ 9] * d[ 2] * d[15]) - (d[ 9] * d[ 3] * d[14]) - (d[13] * d[ 2] * d[11]) + (d[13] * d[ 3] * d[10]);
   v[ 5] =  (d[ 0] * d[10] * d[15]) - (d[ 0] * d[11] * d[14]) - (d[ 8] * d[ 2] * d[15]) + (d[ 8] * d[ 3] * d[14]) + (d[12] * d[ 2] * d[11]) - (d[12] * d[ 3] * d[10]);
   v[ 9] = -(d[ 0] * d[ 9] * d[15]) + (d[ 0] * d[11] * d[13]) + (d[ 8] * d[ 1] * d[15]) - (d[ 8] * d[ 3] * d[13]) - (d[12] * d[ 1] * d[11]) + (d[12] * d[ 3] * d[ 9]);
   v[13] =  (d[ 0] * d[ 9] * d[14]) - (d[ 0] * d[10] * d[13]) - (d[ 8] * d[ 1] * d[14]) + (d[ 8] * d[ 2] * d[13]) + (d[12] * d[ 1] * d[10]) - (d[12] * d[ 2] * d[ 9]);
   v[ 2] =  (d[ 1] * d[ 6] * d[15]) - (d[ 1] * d[ 7] * d[14]) - (d[ 5] * d[ 2] * d[15]) + (d[ 5] * d[ 3] * d[14]) + (d[13] * d[ 2] * d[ 7]) - (d[13] * d[ 3] * d[ 6]);
   v[ 6] = -(d[ 0] * d[ 6] * d[15]) + (d[ 0] * d[ 7] * d[14]) + (d[ 4] * d[ 2] * d[15]) - (d[ 4] * d[ 3] * d[14]) - (d[12] * d[ 2] * d[ 7]) + (d[12] * d[ 3] * d[ 6]);
   v[10] =  (d[ 0] * d[ 5] * d[15]) - (d[ 0] * d[ 7] * d[13]) - (d[ 4] * d[ 1] * d[15]) + (d[ 4] * d[ 3] * d[13]) + (d[12] * d[ 1] * d[ 7]) - (d[12] * d[ 3] * d[ 5]);
   v[14] = -(d[ 0] * d[ 5] * d[14]) + (d[ 0] * d[ 6] * d[13]) + (d[ 4] * d[ 1] * d[14]) - (d[ 4] * d[ 2] * d[13]) - (d[12] * d[ 1] * d[ 6]) + (d[12] * d[ 2] * d[ 5]);
   v[ 3] = -(d[ 1] * d[ 6] * d[11]) + (d[ 1] * d[ 7] * d[10]) + (d[ 5] * d[ 2] * d[11]) - (d[ 5] * d[ 3] * d[10]) - (d[ 9] * d[ 2] * d[ 7]) + (d[ 9] * d[ 3] * d[ 6]);
   v[ 7] =  (d[ 0] * d[ 6] * d[11]) - (d[ 0] * d[ 7] * d[10]) - (d[ 4] * d[ 2] * d[11]) + (d[ 4] * d[ 3] * d[10]) + (d[ 8] * d[ 2] * d[ 7]) - (d[ 8] * d[ 3] * d[ 6]);
   v[11] = -(d[ 0] * d[ 5] * d[11]) + (d[ 0] * d[ 7] * d[ 9]) + (d[ 4] * d[ 1] * d[11]) - (d[ 4] * d[ 3] * d[ 9]) - (d[ 8] * d[ 1] * d[ 7]) + (d[ 8] * d[ 3] * d[ 5]);
   v[15] =  (d[ 0] * d[ 5] * d[10]) - (d[ 0] * d[ 6] * d[ 9]) - (d[ 4] * d[ 1] * d[10]) + (d[ 4] * d[ 2] * d[ 9]) + (d[ 8] * d[ 1] * d[ 6]) - (d[ 8] * d[ 2] * d[ 5]);
   // 计算内容
   var r = d[ 0] * v[ 0] + d[ 1] * v[ 4] + d[ 2] * v[ 8] + d[ 3] * v[12];
   if(r == 0.0){
     return false;
   }
   r = 1.0 / r;
   // 设置内容
   for(var i = 0; i < 16; i++){
      d[i] = v[i] * r;
   }
   return true;
}

//============================================================
// <T>强制更新数据。</T>
//
// @method
//============================================================
function SMatrix3d_updateForce(){
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
function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SMatrix3d_serialize(p){
   var o = this;
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
function SMatrix3d_unserialize(p){
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
