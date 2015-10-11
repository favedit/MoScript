﻿//==========================================================
// <T>三维矩阵。</T>
//
// @struct
// @author maocy
// @version 150207
//==========================================================
MO.SMatrix3x3 = function SMatrix3x3(){
   var o = this;
   //..........................................................
   // @attribute
   o._data           = new Array(9);
   //..........................................................
   // @method
   o.data            = MO.SMatrix3x3_data;
   // @method
   o.equalsData      = MO.SMatrix3x3_equalsData;
   o.assignData      = MO.SMatrix3x3_assignData;
   o.assign4x4       = MO.SMatrix3x3_assign4x4;
   o.appendData      = MO.SMatrix3x3_appendData;
   // @method
   o.rotationX       = MO.SMatrix3x3_rotationX;
   o.rotationY       = MO.SMatrix3x3_rotationY;
   o.rotationZ       = MO.SMatrix3x3_rotationZ;
   o.rotation        = MO.SMatrix3x3_rotation;
   // @method
   o.invert          = MO.SMatrix3x3_invert;
   o.transform       = MO.SMatrix3x3_transform;
   o.transformPoint3 = MO.SMatrix3x3_transformPoint3;
   // @method
   o.build           = MO.SMatrix3x3_build;
   // @method
   o.writeData       = MO.SMatrix3x3_writeData;
   // @method
   o.toString        = MO.SMatrix3x3_toString;
   return o;
}

//============================================================
// <T>获得数据。</T>
//
// @method
// @return Float32Array 数据
//============================================================
MO.SMatrix3x3_data = function SMatrix3x3_data(){
   return this._data;
}

//============================================================
// <T>判断数据内容是否相等。</T>
//
// @method
// @param p:data:Array 数据
// @return Boolean 是否相等
//============================================================
MO.SMatrix3x3_equalsData = function SMatrix3x3_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 9; i++){
      if(d[i] != p[i]){
         return false;
      }
   }
   return true;
}

//============================================================
// <T>接收一个数据内容。</T>
//
// @method
// @param valueData:Array 数据
//============================================================
MO.SMatrix3x3_assignData = function SMatrix3x3_assignData(valueData){
   var o = this;
   var data = o._data;
   for(var n = 0; n < 9; n++){
      data[n] = valueData[n];
   }
   return o;
}

//============================================================
// <T>接收一个数据内容。</T>
//
// @method
// @param value:SMatrix4x4 四维矩阵
//============================================================
MO.SMatrix3x3_assign4x4 = function SMatrix3x3_assign4x4(value){
   var o = this;
   var data = o._data;
   var valueData = value.data();
   data[0] = valueData[0];
   data[1] = valueData[1];
   data[2] = valueData[2];
   data[3] = valueData[4];
   data[4] = valueData[5];
   data[5] = valueData[6];
   data[6] = valueData[8];
   data[7] = valueData[9];
   data[8] = valueData[10];
   return o;
}

//============================================================
// <T>追加一个数据内容。</T>
//
// @method
// @param p:data:Array 数据
//============================================================
MO.SMatrix3x3_appendData = function SMatrix3x3_appendData(p){
   var d = this._data;
   // 矩阵计算
   var v0 = (d[0] * p[0]) + (d[1] * p[3]) + (d[2] * p[6]);
   var v1 = (d[0] * p[1]) + (d[1] * p[4]) + (d[2] * p[7]);
   var v2 = (d[0] * p[2]) + (d[1] * p[5]) + (d[2] * p[8]);
   var v3 = (d[3] * p[0]) + (d[4] * p[3]) + (d[5] * p[6]);
   var v4 = (d[3] * p[1]) + (d[4] * p[4]) + (d[5] * p[7]);
   var v5 = (d[3] * p[2]) + (d[4] * p[5]) + (d[5] * p[8]);
   var v6 = (d[6] * p[0]) + (d[7] * p[3]) + (d[8] * p[6]);
   var v7 = (d[6] * p[1]) + (d[7] * p[4]) + (d[8] * p[7]);
   var v8 = (d[6] * p[2]) + (d[7] * p[5]) + (d[8] * p[8]);
   // 复制内容
   d[0] = v0;
   d[1] = v1;
   d[2] = v2;
   d[3] = v3;
   d[4] = v4;
   d[5] = v5;
   d[6] = v6;
   d[7] = v7;
   d[8] = v8;
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
MO.SMatrix3x3_rotationX = function SMatrix3x3_rotationX(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = MO.Lang.Math.value9;
   v[0] = 1;
   v[1] = 0;
   v[2] = 0;
   v[3] = 0;
   v[4] = rc;
   v[5] = rs;
   v[6] = 0;
   v[7] = -rs;
   v[8] = rc;
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
MO.SMatrix3x3_rotationY = function SMatrix3x3_rotationY(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RMath.value9;
   v[0] = rc;
   v[1] = 0;
   v[2] = rs;
   v[3] = 0;
   v[4] = 1;
   v[5] = 0;
   v[6] = -rs;
   v[7] = 0;
   v[8] = rc;
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
MO.SMatrix3x3_rotationZ = function SMatrix3x3_rotationZ(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = RMath.value9;
   v[0] = rc;
   v[1] = rs;
   v[2] = 0;
   v[3] = -rs;
   v[4] = rc;
   v[5] = 1;
   v[6] = 0;
   v[7] = 0;
   v[8] = 1;
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
MO.SMatrix3x3_rotation = function SMatrix3x3_rotation(x, y, z){
   // 计算旋转
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   // 追加内容
   var v = RMath.value9;
   v[0] = rcy * rcz;
   v[1] = rcy * rsz;
   v[2] = -rsy;
   v[3] = rsx * rsy * rcz - rcx * rsz;
   v[4] = rsx * rsy * rsz + rcx * rcz;
   v[5] = rsx * rcy;
   v[6] = rcx * rsy * rcz + rsx * rsz;
   v[7] = rcx * rsy * rsz - rsx * rcx;
   v[8] = rcx * rcy;
   this.appendData(v);
}

//============================================================
// <T>计算逆矩阵。</T>
//
// @method
// @return Boolean 是否成功
//============================================================
MO.SMatrix3x3_invert = function SMatrix3x3_invert(){
   var o = this;
   var d = o._data;
   var v = RValue.value9;
   // 计算矩阵
   v[0] = (d[4] * d[8]) - (d[5] * d[7]);
   v[1] = (d[2] * d[7]) - (d[1] * d[8]);
   v[2] = (d[1] * d[5]) - (d[2] * d[4]);
   v[3] = (d[5] * d[6]) - (d[3] * d[8]);
   v[4] = (d[0] * d[8]) - (d[2] * d[6]);
   v[5] = (d[2] * d[3]) - (d[0] * d[5]);
   v[6] = (d[3] * d[7]) - (d[4] * d[6]);
   v[7] = (d[1] * d[6]) - (d[0] * d[7]);
   v[8] = (d[0] * d[4]) - (d[1] * d[3]);
   // 计算内容
   var r = (d[0] * v[0]) + (d[1] * v[3]) + (d[2] * v[6]);
   if(r == 0){
      return false;
   }
   r = 1 / r;
   // 设置内容
   for(var i = 0; i < 9; i++){
      d[i] = v[i] * r;
   }
   return true;
}

//==========================================================
// <T>变换顶点数据。</T>
//
// @method
// @param po:outputData:Array 输出数据
// @param pi:inputData:Array 输入数据
// @param pc:count:Integer 个数
//==========================================================
MO.SMatrix3x3_transform = function SMatrix3x3_transform(po, pi, pc){
   var d = this._data;
   for(var i = 0; i < pc; i++){
      var n = (i << 1) + i;
      po[n    ] = (pi[n] * d[0]) + (pi[n + 1] * d[3]) +(pi[n + 2] * d[6]);
      po[n + 1] = (pi[n] * d[1]) + (pi[n + 1] * d[4]) +(pi[n + 2] * d[7]);
      po[n + 2] = (pi[n] * d[2]) + (pi[n + 1] * d[5]) +(pi[n + 2] * d[8]);
   }
}

//==========================================================
// <T>变换顶点数据。</T>
//
// @method
// @param inputPoint:SPoint3 输入顶点
// @param outputPoint:SPoint3 输出顶点
//==========================================================
MO.SMatrix3x3_transformPoint3 = function SMatrix3x3_transformPoint3(inputPoint, outputPoint){
   var d = this._data;
   // 计算内容
   var x = (inputPoint.x * d[0]) + (inputPoint.y * d[3]) +(inputPoint.z * d[6]);
   var y = (inputPoint.x * d[1]) + (inputPoint.y * d[4]) +(inputPoint.z * d[7]);
   var z = (inputPoint.x * d[2]) + (inputPoint.y * d[5]) +(inputPoint.z * d[8]);
   // 输出结果
   var value = null;
   if(outputPoint){
      value = outputPoint;
   }else{
      value = new MO.SPoint3();
   }
   value.set(x, y, z);
   return value;
}

//============================================================
// <T>构建一个矩阵。</T>
//
// @method
// @param t:translation:SPoint3 位移
// @param r:quaternion:SQuaternion 旋转
// @param s:scale:SVector3 缩放
//============================================================
MO.SMatrix3x3_build = function SMatrix3x3_build(r){
   var d = this._data;
   var x2 = r.x * r.x;
   var y2 = r.y * r.y;
   var z2 = r.z * r.z;
   var xy = r.x * r.y;
   var xz = r.x * r.z;
   var yz = r.y * r.z;
   var wx = r.w * r.x;
   var wy = r.w * r.y;
   var wz = r.w * r.z;
   d[0] = 1 - 2 * (y2 + z2);
   d[1] = 2 * (xy - wz);
   d[2] = 2 * (xz + wy);
   d[3] = 2 * (xy + wz);
   d[4] = 1 - 2 * (x2 + z2);
   d[5] = 2 * (yz - wx);
   d[6] = 2 * (xz - wy);
   d[7] = 2 * (yz + wx);
   d[8] = 1 - 2 * (x2 + y2);
}

//==========================================================
// <T>写入数据。</T>
//
// @method
// @param d:data:Array 数组
// @param i:offset:Integer 索引位置
//==========================================================
MO.SMatrix3x3_writeData = function SMatrix3x3_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[0];
   d[i++] = pd[3];
   d[i++] = pd[6];
   d[i++] = pd[1];
   d[i++] = pd[4];
   d[i++] = pd[7];
   d[i++] = pd[2];
   d[i++] = pd[5];
   d[i++] = pd[8];
}

//==========================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.SMatrix3x3_toString = function SMatrix3x3_toString(){
   var d = this._data;
   var r = new MO.TString();
   for(var y = 0; y < 3; y++){
      if(y > 0){
         r.append('|');
      }
      for(var x = 0; x < 3; x++){
         var i = y * 3 + x;
         var v = d[i];
         if(x > 0){
            r.append(',');
         }
         r.append(MO.Lang.Float.format(v, 0, null, 3, null));
      }
   }
   return r.flush();
}
