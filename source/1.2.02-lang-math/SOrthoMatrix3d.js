//==========================================================
// <T>投影矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SOrthoMatrix3d(){
   var o = this;
   SMatrix3d.call(o);
   //..........................................................
   // @method
   o.perspectiveLH            = SOrthoMatrix3d_perspectiveLH;
   o.perspectiveRH            = SOrthoMatrix3d_perspectiveRH;
   o.perspectiveFieldOfViewLH = SOrthoMatrix3d_perspectiveFieldOfViewLH;
   o.perspectiveFieldOfViewRH = SOrthoMatrix3d_perspectiveFieldOfViewRH;
   return o;
}

//==========================================================
// <T>计算左手矩阵。</T>
//
// @param pw:width:Number 宽度
// @param ph:width:Number 高度
// @param pn:znear:Number 近平面
// @param pf:zfar:Number 远平面
//==========================================================
function SOrthoMatrix3d_perspectiveLH(pw, ph, pn, pf){
   var d = this._data;
   // 填充行1数据
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   // 填充行2数据
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   // 填充行3数据
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   // 填充行4数据
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}

//==========================================================
// <T>计算右手矩阵。</T>
//
// @param pw:width:Number 宽度
// @param ph:width:Number 高度
// @param pn:znear:Number 近平面
// @param pf:zfar:Number 远平面
//==========================================================
function SOrthoMatrix3d_perspectiveRH(pw, ph, pn, pf){
   var d = this._data;
   // 填充行1数据
   d[ 0] = 2.0 * pn / pw;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   // 填充行2数据
   d[ 4] = 0.0;
   d[ 5] = 2.0 * pn / ph;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   // 填充行3数据
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   // 填充行4数据
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}
   
//==========================================================
// <T>根据FOV计算左手矩阵。</T>
//
// @param pv:fieldOfView:Number 夹角
// @param pr:aspectRatio:Number 高宽比率
// @param pn:znear:Number 近平面
// @param pf:zfar:Number 远平面
//==========================================================
function SOrthoMatrix3d_perspectiveFieldOfViewLH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   // 填充行1数据
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   // 填充行2数据
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   // 填充行3数据
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pf - pn);
   d[11] = 1.0;
   // 填充行4数据
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pn - pf);
   d[15] = 0.0;
}

//==========================================================
// <T>根据FOV计算右手矩阵。</T>
//
// @param pv:fieldOfView:Number 夹角
// @param pr:aspectRatio:Number 高宽比率
// @param pn:znear:Number 近平面
// @param pf:zfar:Number 远平面
//==========================================================
function SOrthoMatrix3d_perspectiveFieldOfViewRH(pv, pr, pn, pf){
   var d = this._data;
   var sy = 1.0 / Math.tan(pv * 0.5);
   var sx = sy / pr;
   // 填充行1数据
   d[ 0] = sx;
   d[ 1] = 0.0;
   d[ 2] = 0.0;
   d[ 3] = 0.0;
   // 填充行2数据
   d[ 4] = 0.0;
   d[ 5] = sy;
   d[ 6] = 0.0;
   d[ 7] = 0.0;
   // 填充行3数据
   d[ 8] = 0.0;
   d[ 9] = 0.0;
   d[10] = pf / (pn - pf);
   d[11] = 1.0;
   // 填充行4数据
   d[12] = 0.0;
   d[13] = 0.0;
   d[14] = (pn * pf) / (pf - pn);
   d[15] = 0.0;
}
