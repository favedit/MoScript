//==========================================================
// <T>字节流。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FBytes(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._memory   = null;
   o._viewer   = null;
   o._endianCd = 0;
   //..........................................................
   // @method
   o.construct = FBytes_construct;
   // @method
   o.getInt8   = FBytes_getInt8;
   o.getInt16  = FBytes_getInt16;
   o.getInt32  = FBytes_getInt32;
   o.getInt64  = FBytes_getInt64;
   o.getUint8  = FBytes_getUint8;
   o.getUint16 = FBytes_getUint16;
   o.getUint32 = FBytes_getUint32;
   o.getUint64 = FBytes_getUint64;
   o.getFloat  = FBytes_getFloat;
   o.getDouble = FBytes_getDouble;
   // @method
   o.setInt8   = FBytes_setInt8;
   o.setInt16  = FBytes_setInt16;
   o.setInt32  = FBytes_setInt32;
   o.setInt64  = FBytes_setInt64;
   o.setUint8  = FBytes_setUint8;
   o.setUint16 = FBytes_setUint16;
   o.setUint32 = FBytes_setUint32;
   o.setUint64 = FBytes_setUint64;
   o.setFloat  = FBytes_setFloat;
   o.setDouble = FBytes_setDouble;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FBytes_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._memory = new ArrayBuffer();
   o._viewer = new DataView(o._memory);
}

//==========================================================
// <T>获得有8位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 8位有符号整数
//==========================================================
function FBytes_getInt8(p){
   var o = this;
   return o._viewer.getInt8(p, o._endianCd);
}

//==========================================================
// <T>获得有16位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 16位有符号整数
//==========================================================
function FBytes_getInt16(p){
   var o = this;
   return o._viewer.getInt16(p, o._endianCd);
}

//==========================================================
// <T>获得有32位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 32位有符号整数
//==========================================================
function FBytes_getInt32(p){
   var o = this;
   return o._viewer.getInt32(p, o._endianCd);
}

//==========================================================
// <T>获得有64位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 64位有符号整数
//==========================================================
function FBytes_getInt64(p){
   var o = this;
   return o._viewer.getInt64(p, o._endianCd);
}

//==========================================================
// <T>获得有8位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 8位无符号整数
//==========================================================
function FBytes_getUint8(p){
   var o = this;
   return o._viewer.getUint8(p, o._endianCd);
}

//==========================================================
// <T>获得有16位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 16位无符号整数
//==========================================================
function FBytes_getUint16(p){
   var o = this;
   return o._viewer.getUint16(p, o._endianCd);
}

//==========================================================
// <T>获得有32位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 32位无符号整数
//==========================================================
function FBytes_getUint32(p){
   var o = this;
   return o._viewer.getUint32(p, o._endianCd);
}

//==========================================================
// <T>获得有64位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @return Integer 64位无符号整数
//==========================================================
function FBytes_getUint64(p){
   var o = this;
   return o._viewer.getUint64(p, o._endianCd);
}

//==========================================================
// <T>获得浮点数。</T>
//
// @param p:index:Integer 索引位置
// @return Number 浮点数
//==========================================================
function FBytes_getFloat(p){
   var o = this;
   return o._viewer.getFloat32(p, o._endianCd);
}

//==========================================================
// <T>获得双精度浮点数。</T>
//
// @param p:index:Integer 索引位置
// @return Number 双精度浮点数
//==========================================================
function FBytes_getDouble(p){
   var o = this;
   return o._viewer.getFloat64(p, o._endianCd);
}

//==========================================================
// <T>设置有8位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 8位有符号整数
//==========================================================
function FBytes_setInt8(p, v){
   var o = this;
   o._viewer.setInt8(p, v, o._endianCd);
}

//==========================================================
// <T>设置有16位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 16位有符号整数
//==========================================================
function FBytes_setInt16(p, v){
   var o = this;
   o._viewer.setInt16(p, v, o._endianCd);
}

//==========================================================
// <T>设置有32位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 32位有符号整数
//==========================================================
function FBytes_setInt32(p, v){
   var o = this;
   o._viewer.setInt32(p, v, o._endianCd);
}

//==========================================================
// <T>设置有64位有符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 64位有符号整数
//==========================================================
function FBytes_setInt64(p, v){
   var o = this;
   o._viewer.setInt64(p, v, o._endianCd);
}

//==========================================================
// <T>设置有8位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 8位无符号整数
//==========================================================
function FBytes_setUint8(p, v){
   var o = this;
   o._viewer.setUint8(p, v, o._endianCd);
}

//==========================================================
// <T>设置有16位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 16位无符号整数
//==========================================================
function FBytes_setUint16(p, v){
   var o = this;
   o._viewer.setUint16(p, v, o._endianCd);
}

//==========================================================
// <T>设置有32位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 32位无符号整数
//==========================================================
function FBytes_setUint32(p, v){
   var o = this;
   o._viewer.setUint32(p, v, o._endianCd);
}

//==========================================================
// <T>设置有64位无符号整数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Integer 64位无符号整数
//==========================================================
function FBytes_setUint64(p, v){
   var o = this;
   o._viewer.setUint64(p, v, o._endianCd);
}

//==========================================================
// <T>设置浮点数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Number 浮点数
//==========================================================
function FBytes_setFloat(p, v){
   var o = this;
   o._viewer.setFloat32(p, v, o._endianCd);
}

//==========================================================
// <T>设置双精度浮点数。</T>
//
// @param p:index:Integer 索引位置
// @param v:value:Number 双精度浮点数
//==========================================================
function FBytes_setDouble(p, v){
   var o = this;
   o._viewer.setDouble(p, v, o._endianCd);
}
