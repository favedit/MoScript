//==========================================================
// <T>四维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
MO.SMatrix4x4 = function SMatrix4x4(){
   var o = this;
   //..........................................................
   // @attribute
   o._data           = new Array(16);
   //..........................................................
   // @method
   o.data            = MO.SMatrix4x4_data;
   // @method
   o.isIdentityData  = MO.SMatrix4x4_isIdentityData;
   o.identityData    = MO.SMatrix4x4_identityData;
   // @method
   o.equalsData      = MO.SMatrix4x4_equalsData;
   o.assignData      = MO.SMatrix4x4_assignData;
   o.attachData      = MO.SMatrix4x4_attachData;
   o.appendData      = MO.SMatrix4x4_appendData;
   // @method
   o.addTranslate    = MO.SMatrix4x4_addTranslate;
   o.addRotationX    = MO.SMatrix4x4_addRotationX;
   o.addRotationY    = MO.SMatrix4x4_addRotationY;
   o.addRotationZ    = MO.SMatrix4x4_addRotationZ;
   o.addRotation     = MO.SMatrix4x4_addRotation;
   o.addRotationAxis = MO.SMatrix4x4_addRotationAxis;
   o.addScale        = MO.SMatrix4x4_addScale;
   // @method
   o.normalize       = MO.SMatrix4x4_normalize;
   o.invert          = MO.SMatrix4x4_invert;
   o.transform       = MO.SMatrix4x4_transform;
   o.transformValue3 = MO.SMatrix4x4_transformValue3;
   o.transformPoint3 = MO.SMatrix4x4_transformPoint3;
   // @method
   o.buildQuaternion = MO.SMatrix4x4_buildQuaternion;
   o.build           = MO.SMatrix4x4_build;
   // @method
   o.writeData       = MO.SMatrix4x4_writeData;
   o.writeData4x3    = MO.SMatrix4x4_writeData4x3;
   // @method
   o.toString        = MO.SMatrix4x4_toString;
   return o;
}

//============================================================
// <T>获得数据。</T>
//
// @method
// @return Float32Array 数据
//============================================================
MO.SMatrix4x4_data = function SMatrix4x4_data(){
   return this._data;
}

//============================================================
// <T>是否为单位化数据。</T>
//
// @method
// @return 是否单位化
//============================================================
MO.SMatrix4x4_isIdentityData = function SMatrix4x4_isIdentityData(){
   var d = this._data;
   var v = MO.Const.identity4x4;
   for(var i = 0; i < 16; i++){
      if(d[i] != v[i]){
         return false;
      }
   }
   return true;
}

//============================================================
// <T>单位化处理。</T>
//
// @method
//============================================================
MO.SMatrix4x4_identityData = function SMatrix4x4_identityData(){
   var o = this;
   var d = o._data;
   var v = MO.Const.identity4x4;
   for(var i = 0; i < 16; i++){
      d[i] = v[i];
   }
   return o;
}

//============================================================
// <T>判断数据内容是否相等。</T>
//
// @method
// @param p:data:Array 数据
// @return Boolean 是否相等
//============================================================
MO.SMatrix4x4_equalsData = function SMatrix4x4_equalsData(p){
   var d = this._data;
   for(var i = 0; i < 16; i++){
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
// @param values:Array 数据
//============================================================
MO.SMatrix4x4_assignData = function SMatrix4x4_assignData(values){
   var o = this;
   var data = o._data;
   for(var n = 0; n < 16; n++){
      data[n] = values[n];
   }
   return o;
}

//============================================================
// <T>接收一个数据内容，返回是否修改。</T>
//
// @method
// @param p:data:Array 数据
//============================================================
MO.SMatrix4x4_attachData = function SMatrix4x4_attachData(p){
   var r = false;
   var d = this._data;
   for(var i = 0; i < 16; i++){
      var v = p[i];
      if(!r){
         if(d[i] != v){
            r = true;
         }
      }
      d[i] = v;
   }
   return r;
}

//============================================================
// <T>追加一个数据内容。</T>
//
// @method
// @param p:data:Array 数据
//============================================================
MO.SMatrix4x4_appendData = function SMatrix4x4_appendData(p){
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
// <T>平移内容。</T>
//
// @method
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
MO.SMatrix4x4_addTranslate = function SMatrix4x4_addTranslate(x, y, z){
   var v = MO.Lang.Array.array16;
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
MO.SMatrix4x4_addRotationX = function SMatrix4x4_addRotationX(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = MO.Lang.Array.array16;
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
MO.SMatrix4x4_addRotationY = function SMatrix4x4_addRotationY(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = MO.Lang.Array.array16;
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
MO.SMatrix4x4_addRotationZ = function SMatrix4x4_addRotationZ(p){
   // 计算旋转
   var rs = Math.sin(p);
   var rc = Math.cos(p);
   // 追加内容
   var v = MO.Lang.Array.array16;
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
MO.SMatrix4x4_addRotation = function SMatrix4x4_addRotation(x, y, z){
   // 计算旋转
   var rsx = Math.sin(x);
   var rcx = Math.cos(x);
   var rsy = Math.sin(y);
   var rcy = Math.cos(y);
   var rsz = Math.sin(z);
   var rcz = Math.cos(z);
   // 追加内容
   var v = MO.Lang.Array.array16;
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
// <T>增加轴旋转内容。</T>
//
// @method
// @param axis:SVector3 轴
// @param angle:Float 角度
//============================================================
MO.SMatrix4x4_addRotationAxis = function SMatrix4x4_addRotationAxis(axis, angle){
   // 计算旋转
   var c = Math.cos(angle);
   var s = Math.sin(angle);
   var t = 1 - c;
   var x = axis.x;
   var y = axis.y;
   var z = axis.z;
   var tx = t * x;
   var ty = t * y;
   // 追加内容
   var v = MO.Lang.Array.array16;
   v[ 0] = tx * x + c;
   v[ 1] = tx * y - s * z;
   v[ 2] = tx * z + s * y;
   v[ 3] = 0;
   v[ 4] = tx * y + s * z;
   v[ 5] = ty * y + c;
   v[ 6] = ty * z - s * x;
   v[ 7] = 0;
   v[ 8] = tx * z - s * y;
   v[ 9] = ty * z + s * x;
   v[10] = t * z * z + c;
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
MO.SMatrix4x4_addScale = function SMatrix4x4_addScale(x, y, z){
   var v = MO.Lang.Array.array16;
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
// <T>单位化矩阵。</T>
//
// @method
// @return Boolean 是否成功
//============================================================
MO.SMatrix4x4_normalize = function SMatrix4x4_normalize(){
   var o = this;
   var data = o._data;
   var m44 = data[15];
   if(m44 == 0){
      return false;
   }else if(m44 == 1){
      return true;
   }else{
      var scale = 1 / m44
      for(var i = 0; i < 16; i++){
         data[i] = data[i] * scale;
      }
      return true
   }
}

//============================================================
// <T>计算逆矩阵。</T>
//
// @method
// @return Boolean 是否成功
//============================================================
MO.SMatrix4x4_invert = function SMatrix4x4_invert(){
   var o = this;
   var d = o._data;
   var v = MO.Lang.Array.array16;
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
   if(r == 0){
     return false;
   }
   r = 1 / r;
   // 设置内容
   for(var i = 0; i < 16; i++){
      d[i] = v[i] * r;
   }
   return true;
}

//==========================================================
// <T>变换顶点数据。</T>
//
// @method
// @param outputData:Array 输出数据
// @param outputIndex:Integer 输出位置
// @param inputData:Array 输入数据
// @param inputIndex:Integer 输入位置
// @param count:Integer 个数
//==========================================================
MO.SMatrix4x4_transform = function SMatrix4x4_transform(outputData, outputIndex, inputData, inputIndex, count){
   var data = this._data;
   for(var i = 0; i < count; i++){
      var x = inputData[inputIndex++];
      var y = inputData[inputIndex++];
      var z = inputData[inputIndex++];
      outputData[outputIndex++] = (x * data[ 0]) + (y * data[ 4]) +(z * data[ 8]) + data[12];
      outputData[outputIndex++] = (x * data[ 1]) + (y * data[ 5]) +(z * data[ 9]) + data[13];
      outputData[outputIndex++] = (x * data[ 2]) + (y * data[ 6]) +(z * data[10]) + data[14];
   }
}

//==========================================================
// <T>变换顶点数据。</T>
//
// @method
// @param input:SPoint3 输入顶点
// @param output:SPoint3 输出顶点
//==========================================================
MO.SMatrix4x4_transformPoint3 = function SMatrix4x4_transformPoint3(input, output){
   // 计算数据
   var data = this._data;
   var x = (input.x * data[ 0]) + (input.y * data[ 4]) +(input.z * data[ 8]) + data[12];
   var y = (input.x * data[ 1]) + (input.y * data[ 5]) +(input.z * data[ 9]) + data[13];
   var z = (input.x * data[ 2]) + (input.y * data[ 6]) +(input.z * data[10]) + data[14];
   // 设置结果
   var result = null;
   if(output){
      result = output;
   }else{
      result = new MO.SPoint3();
   }
   result.set(x, y, z);
   return result;
}

//==========================================================
// <T>变换顶点数据。</T>
//
// @method
// @param x:Number X坐标
// @param y:Number Y坐标
// @param z:Number Z坐标
// @param output:SPoint3 输出顶点
//==========================================================
MO.SMatrix4x4_transformValue3 = function SMatrix4x4_transformValue3(x, y, z, output){
   // 计算数据
   var data = this._data;
   var x = (x * data[ 0]) + (y * data[ 4]) +(z * data[ 8]) + data[12];
   var y = (x * data[ 1]) + (y * data[ 5]) +(z * data[ 9]) + data[13];
   var z = (x * data[ 2]) + (y * data[ 6]) +(z * data[10]) + data[14];
   // 设置结果
   var result = null;
   if(output){
      result = output;
   }else{
      result = new MO.SPoint3();
   }
   result.set(x, y, z);
   return result;
}

//============================================================
// <T>构建一个矩阵。</T>
//
// @method
// @param t:translation:SPoint3 位移
// @param r:quaternion:SQuaternion 旋转
// @param s:scale:SVector3 缩放
//============================================================
MO.SMatrix4x4_build = function SMatrix4x4_build(t, r, s){
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
   d[ 0] = (1 - 2 * (y2 + z2)) * s.x;
   d[ 1] = 2 * (xy - wz) * s.x;
   d[ 2] = 2 * (xz + wy) * s.x;
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz) * s.y;
   d[ 5] = (1 - 2 * (x2 + z2)) * s.y;
   d[ 6] = 2 * (yz - wx) * s.y;
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy) * s.z;
   d[ 9] = 2 * (yz + wx) * s.z;
   d[10] = (1 - 2 * (x2 + y2)) * s.z;
   d[11] = 0;
   d[12] = t.x;
   d[13] = t.y;
   d[14] = t.z;
   d[15] = 1;
}

//============================================================
// <T>构建一个矩阵。</T>
//
// @method
// @param t:translation:SPoint3 位移
// @param r:quaternion:SQuaternion 旋转
// @param s:scale:SVector3 缩放
//============================================================
MO.SMatrix4x4_buildQuaternion = function SMatrix4x4_buildQuaternion(r){
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
   d[ 0] = 1 - 2 * (y2 + z2);
   d[ 1] = 2 * (xy - wz);
   d[ 2] = 2 * (xz + wy);
   d[ 3] = 0;
   d[ 4] = 2 * (xy + wz);
   d[ 5] = 1 - 2 * (x2 + z2);
   d[ 6] = 2 * (yz - wx);
   d[ 7] = 0;
   d[ 8] = 2 * (xz - wy);
   d[ 9] = 2 * (yz + wx);
   d[10] = 1 - 2 * (x2 + y2);
   d[11] = 0;
   d[12] = 0;
   d[13] = 0;
   d[14] = 0;
   d[15] = 1;
}

//==========================================================
// <T>写入数据。</T>
//
// @method
// @param d:data:Array 数组
// @param i:offset:Integer 索引位置
//==========================================================
MO.SMatrix4x4_writeData = function SMatrix4x4_writeData(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[ 0];
   d[i++] = pd[ 4];
   d[i++] = pd[ 8];
   d[i++] = pd[12];
   d[i++] = pd[ 1];
   d[i++] = pd[ 5];
   d[i++] = pd[ 9];
   d[i++] = pd[13];
   d[i++] = pd[ 2];
   d[i++] = pd[ 6];
   d[i++] = pd[10];
   d[i++] = pd[14];
   d[i++] = pd[ 3];
   d[i++] = pd[ 7];
   d[i++] = pd[11];
   d[i++] = pd[15];
}

//==========================================================
// <T>写入数据。</T>
//
// @method
// @param d:data:Array 数组
// @param i:offset:Integer 索引位置
//==========================================================
MO.SMatrix4x4_writeData4x3 = function SMatrix4x4_writeData4x3(d, i){
   var o = this;
   var pd = o._data;
   d[i++] = pd[ 0];
   d[i++] = pd[ 4];
   d[i++] = pd[ 8];
   d[i++] = pd[12];
   d[i++] = pd[ 1];
   d[i++] = pd[ 5];
   d[i++] = pd[ 9];
   d[i++] = pd[13];
   d[i++] = pd[ 2];
   d[i++] = pd[ 6];
   d[i++] = pd[10];
   d[i++] = pd[14];
}

//==========================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.SMatrix4x4_toString = function SMatrix4x4_toString(){
   var d = this._data;
   var r = new MO.TString();
   for(var y = 0; y < 4; y++){
      if(y > 0){
         r.append('|');
      }
      for(var x = 0; x < 4; x++){
         var i = y * 4 + x;
         var v = d[i];
         if(x > 0){
            r.append(',');
         }
         r.append(MO.Lang.Float.format(v, 0, null, 3, null));
      }
   }
   return r.flush();
}
