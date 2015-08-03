//==========================================================
// <T>数据观察基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.MDataView = function MDataView(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._viewer     = null;
   o._endianCd   = MO.Class.register(o, new MO.AGetSet('_endianCd'), false);
   //..........................................................
   // @method
   o.getInt8     = MO.MDataView_getInt8;
   o.getInt16    = MO.MDataView_getInt16;
   o.getInt32    = MO.MDataView_getInt32;
   o.getInt64    = MO.MDataView_getInt64;
   o.getUint8    = MO.MDataView_getUint8;
   o.getUint16   = MO.MDataView_getUint16;
   o.getUint32   = MO.MDataView_getUint32;
   o.getUint64   = MO.MDataView_getUint64;
   o.getFloat    = MO.MDataView_getFloat;
   o.getDouble   = MO.MDataView_getDouble;
   // @method
   o.setInt8     = MO.MDataView_setInt8;
   o.setInt16    = MO.MDataView_setInt16;
   o.setInt32    = MO.MDataView_setInt32;
   o.setInt64    = MO.MDataView_setInt64;
   o.setUint8    = MO.MDataView_setUint8;
   o.setUint16   = MO.MDataView_setUint16;
   o.setUint32   = MO.MDataView_setUint32;
   o.setUint64   = MO.MDataView_setUint64;
   o.setFloat    = MO.MDataView_setFloat;
   o.setDouble   = MO.MDataView_setDouble;
   return o;
}

//==========================================================
// <T>获得有8位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 8位有符号整数
//==========================================================
MO.MDataView_getInt8 = function MDataView_getInt8(p){
   var o = this;
   return o._viewer.getInt8(p, o._endianCd);
}

//==========================================================
// <T>获得有16位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 16位有符号整数
//==========================================================
MO.MDataView_getInt16 = function MDataView_getInt16(p){
   var o = this;
   return o._viewer.getInt16(p, o._endianCd);
}

//==========================================================
// <T>获得有32位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 32位有符号整数
//==========================================================
MO.MDataView_getInt32 = function MDataView_getInt32(p){
   var o = this;
   return o._viewer.getInt32(p, o._endianCd);
}

//==========================================================
// <T>获得有64位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 64位有符号整数
//==========================================================
MO.MDataView_getInt64 = function MDataView_getInt64(p){
   var o = this;
   return o._viewer.getInt64(p, o._endianCd);
}

//==========================================================
// <T>获得有8位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 8位无符号整数
//==========================================================
MO.MDataView_getUint8 = function MDataView_getUint8(p){
   var o = this;
   return o._viewer.getUint8(p, o._endianCd);
}

//==========================================================
// <T>获得有16位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 16位无符号整数
//==========================================================
MO.MDataView_getUint16 = function MDataView_getUint16(p){
   var o = this;
   return o._viewer.getUint16(p, o._endianCd);
}

//==========================================================
// <T>获得有32位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 32位无符号整数
//==========================================================
MO.MDataView_getUint32 = function MDataView_getUint32(p){
   var o = this;
   return o._viewer.getUint32(p, o._endianCd);
}

//==========================================================
// <T>获得有64位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 64位无符号整数
//==========================================================
MO.MDataView_getUint64 = function MDataView_getUint64(p){
   var o = this;
   return o._viewer.getUint64(p, o._endianCd);
}

//==========================================================
// <T>获得浮点数。</T>
//
// @param p:index:Integer 索引位置
// @return Number 浮点数
//==========================================================
MO.MDataView_getFloat = function MDataView_getFloat(p){
   var o = this;
   return o._viewer.getFloat32(p, o._endianCd);
}

//==========================================================
// <T>获得双精度浮点数。</T>
//
// @param p:index:Integer 索引位置
// @return Number 双精度浮点数
//==========================================================
MO.MDataView_getDouble = function MDataView_getDouble(p){
   var o = this;
   return o._viewer.getFloat64(p, o._endianCd);
}

//==========================================================
// <T>设置有8位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 8位有符号整数
//==========================================================
MO.MDataView_setInt8 = function MDataView_setInt8(p, v){
   var o = this;
   o._viewer.setInt8(p, v, o._endianCd);
}

//==========================================================
// <T>设置有16位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 16位有符号整数
//==========================================================
MO.MDataView_setInt16 = function MDataView_setInt16(p, v){
   var o = this;
   o._viewer.setInt16(p, v, o._endianCd);
}

//==========================================================
// <T>设置有32位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 32位有符号整数
//==========================================================
MO.MDataView_setInt32 = function MDataView_setInt32(p, v){
   var o = this;
   o._viewer.setInt32(p, v, o._endianCd);
}

//==========================================================
// <T>设置有64位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 64位有符号整数
//==========================================================
MO.MDataView_setInt64 = function MDataView_setInt64(p, v){
   var o = this;
   o._viewer.setInt64(p, v, o._endianCd);
}

//==========================================================
// <T>设置有8位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 8位无符号整数
//==========================================================
MO.MDataView_setUint8 = function MDataView_setUint8(p, v){
   var o = this;
   o._viewer.setUint8(p, v, o._endianCd);
}

//==========================================================
// <T>设置有16位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 16位无符号整数
//==========================================================
MO.MDataView_setUint16 = function MDataView_setUint16(p, v){
   var o = this;
   o._viewer.setUint16(p, v, o._endianCd);
}

//==========================================================
// <T>设置有32位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 32位无符号整数
//==========================================================
MO.MDataView_setUint32 = function MDataView_setUint32(p, v){
   var o = this;
   o._viewer.setUint32(p, v, o._endianCd);
}

//==========================================================
// <T>设置有64位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 64位无符号整数
//==========================================================
MO.MDataView_setUint64 = function MDataView_setUint64(p, v){
   var o = this;
   o._viewer.setUint64(p, v, o._endianCd);
}

//==========================================================
// <T>设置浮点数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Number 浮点数
//==========================================================
MO.MDataView_setFloat = function MDataView_setFloat(p, v){
   var o = this;
   o._viewer.setFloat32(p, v, o._endianCd);
}

//==========================================================
// <T>设置双精度浮点数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Number 双精度浮点数
//==========================================================
MO.MDataView_setDouble = function MDataView_setDouble(p, v){
   var o = this;
   o._viewer.setDouble(p, v, o._endianCd);
}
