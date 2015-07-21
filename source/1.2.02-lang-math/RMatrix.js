//==========================================================
// <T>矩阵函数管理类</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
MO.RMatrix = function RMatrix(){
   var o = this;
   // @const
   o.identity3x3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
   o.identity4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
   return o;
}

//==========================================================
// <T>计算左手矩阵。</T>
//
// @param matrix:SMatrix3d 矩阵
// @param width:Number 宽度
// @param height:Number 高度
// @param znear:Number 近平面
// @param zfar:Number 远平面
//==========================================================
MO.RMatrix.prototype.perspectiveLH = function RMatrix_perspectiveLH(matrix, width, height, znear, zfar){
   var data = matrix.data();
   // 填充行1数据
   data[ 0] = 2 * znear / width;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   // 填充行2数据
   data[ 4] = 0;
   data[ 5] = 2 * znear / height;
   data[ 6] = 0;
   data[ 7] = 0;
   // 填充行3数据
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (zfar - znear);
   data[11] = 1;
   // 填充行4数据
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}

//==========================================================
// <T>计算右手矩阵。</T>
//
// @param matrix:SMatrix3d 矩阵
// @param width:width:Number 宽度
// @param height:width:Number 高度
// @param znear:znear:Number 近平面
// @param zfar:zfar:Number 远平面
//==========================================================
MO.RMatrix.prototype.perspectiveRH = function RMatrix_perspectiveRH(matrix, width, height, znear, zfar){
   var data = matrix.data();
   // 填充行1数据
   data[ 0] = 2 * znear / width;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   // 填充行2数据
   data[ 4] = 0;
   data[ 5] = 2 * znear / height;
   data[ 6] = 0;
   data[ 7] = 0;
   // 填充行3数据
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (znear - zfar);
   data[11] = 1;
   // 填充行4数据
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}
   
//==========================================================
// <T>根据FOV计算左手矩阵。</T>
//
// @param matrix:SMatrix3d 矩阵
// @param fieldOfView:Number 夹角
// @param aspectRatio:Number 高宽比率
// @param znear:znear:Number 近平面
// @param zfar:zfar:Number 远平面
//==========================================================
MO.RMatrix.prototype.perspectiveFieldOfViewLH = function RMatrix_perspectiveFieldOfViewLH(matrix, fieldOfView, aspectRatio, znear, zfar){
   var data = matrix.data();
   var sy = 1 / Math.tan(fieldOfView * 0.5);
   var sx = sy / aspectRatio;
   // 填充行1数据
   data[ 0] = sx;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   // 填充行2数据
   data[ 4] = 0;
   data[ 5] = sy;
   data[ 6] = 0;
   data[ 7] = 0;
   // 填充行3数据
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (zfar - znear);
   data[11] = 1;
   // 填充行4数据
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (znear - zfar);
   data[15] = 0;
}

//==========================================================
// <T>根据FOV计算右手矩阵。</T>
//
// @param matrix:SMatrix3d 矩阵
// @param fieldOfView:fieldOfView:Number 夹角
// @param aspectRatio:aspectRatio:Number 高宽比率
// @param znear:znear:Number 近平面
// @param zfar:zfar:Number 远平面
//==========================================================
MO.RMatrix.prototype.perspectiveFieldOfViewRH = function RMatrix_perspectiveFieldOfViewRH(matrix, fieldOfView, aspectRatio, znear, zfar){
   var data = matrix.data();
   var sy = 1 / Math.tan(fieldOfView * 0.5);
   var sx = sy / aspectRatio;
   // 填充行1数据
   data[ 0] = sx;
   data[ 1] = 0;
   data[ 2] = 0;
   data[ 3] = 0;
   // 填充行2数据
   data[ 4] = 0;
   data[ 5] = sy;
   data[ 6] = 0;
   data[ 7] = 0;
   // 填充行3数据
   data[ 8] = 0;
   data[ 9] = 0;
   data[10] = zfar / (znear - zfar);
   data[11] = 1;
   // 填充行4数据
   data[12] = 0;
   data[13] = 0;
   data[14] = (znear * zfar) / (zfar - znear);
   data[15] = 0;
}

//==========================================================
// <T>计算正交投影矩阵。</T>
//
// @param matrix:SMatrix3d 矩阵
// @param left:Float 左位置
// @param top:Float 上位置
// @param width:Float 宽度
// @param height:Float 高度
// @param znear:Float 近平面
// @param zfar:Float 远平面
//==========================================================
MO.RMatrix.prototype.orthoLH = function RMatrix_orthoLH(matrix, left, top, width, height, znear, zfar){
   var o = this;
   // 计算变量
   var right = left + width;
   var bottom = top + height;
   var distance = zfar - znear;
   var x = (left + right) / width;
   var y = (top + bottom) / height;
   var z = znear / distance;
   // 设置数据
   var data = MO.Lang.Array.copy(o.identity4x4, 0, 16, matrix.data(), 0);
   data[ 0] = 2 / width;
   data[ 5] = 2 / height;
   data[10] = 1 / distance;
   data[12] = -x;
   data[13] = -y;
   data[14] = -z;
}

//==========================================================
// <T>计算正交投影矩阵。</T>
//
// @param matrix:SMatrix3d 矩阵
// @param left:Float 左位置
// @param top:Float 上位置
// @param width:Float 宽度
// @param height:Float 高度
// @param znear:Float 近平面
// @param zfar:Float 远平面
//==========================================================
MO.RMatrix.prototype.orthoRH = function RMatrix_orthoRH(matrix, left, top, width, height, znear, zfar){
   var o = this;
   // 计算变量
   var right = left + width;
   var bottom = top + height;
   var distance = zfar - znear;
   var x = (left + right) / width;
   var y = (top + bottom) / height;
   var z = (znear + zfar) / distance;
   // 设置数据
   var data = MO.Lang.Array.copy(o.identity4x4, 0, 16, matrix.data(), 0);
   data[ 0] = 2 / width;
   data[ 5] = 2 / height;
   data[10] = -2 / distance;
   data[12] = -x;
   data[13] = -y;
   data[14] = -z;
}

//..........................................................
// 实例化内容
MO.Lang.Matrix = new MO.RMatrix();
