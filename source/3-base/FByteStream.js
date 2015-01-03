//==========================================================
// <T>字节流。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FByteStream(o){
   o = RClass.inherits(this, o, FBytes);
   //..........................................................
   // @attribute
   o._position   = 0;
   //..........................................................
   // @method
   o.readInt8    = FByteStream_readInt8;
   o.readInt16   = FByteStream_readInt16;
   o.readInt32   = FByteStream_readInt32;
   o.readInt64   = FByteStream_readInt64;
   o.readUint8   = FByteStream_readUint8;
   o.readUint16  = FByteStream_readUint16;
   o.readUint32  = FByteStream_readUint32;
   o.readUint64  = FByteStream_readUint64;
   o.readFloat   = FByteStream_readFloat;
   o.readDouble  = FByteStream_readDouble;
   // @method
   o.writeInt8   = FByteStream_writeInt8;
   o.writeInt16  = FByteStream_writeInt16;
   o.writeInt32  = FByteStream_writeInt32;
   o.writeInt64  = FByteStream_writeInt64;
   o.writeUint8  = FByteStream_writeUint8;
   o.writeUint16 = FByteStream_writeUint16;
   o.writeUint32 = FByteStream_writeUint32;
   o.writeUint64 = FByteStream_writeUint64;
   o.writeFloat  = FByteStream_writeFloat;
   o.writeDouble = FByteStream_writeDouble;
   return o;
}

//==========================================================
// <T>读取有8位有符号整数。</T>
//
// @return Integer 8位有符号整数
//==========================================================
function FByteStream_readInt8(){
   var o = this;
   var r = o._viewer.getInt8(o._position, o._endianCd);
   o._position += 1;
   return r;
}

//==========================================================
// <T>读取有16位有符号整数。</T>
//
// @return Integer 16位有符号整数
//==========================================================
function FByteStream_readInt16(){
   var o = this;
   var r = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return r;
}

//==========================================================
// <T>读取有32位有符号整数。</T>
//
// @return Integer 32位有符号整数
//==========================================================
function FByteStream_readInt32(){
   var o = this;
   var r = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return r;
}

//==========================================================
// <T>读取有64位有符号整数。</T>
//
// @return Integer 64位有符号整数
//==========================================================
function FByteStream_readInt64(){
   var o = this;
   var r = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return r;
}

//==========================================================
// <T>读取有8位无符号整数。</T>
//
// @return Integer 8位无符号整数
//==========================================================
function FByteStream_readUint8(){
   var o = this;
   var r = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return r;
}

//==========================================================
// <T>读取有16位无符号整数。</T>
//
// @return Integer 16位无符号整数
//==========================================================
function FByteStream_readUint16(){
   var o = this;
   var r = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return r;
}

//==========================================================
// <T>读取有32位无符号整数。</T>
//
// @return Integer 32位无符号整数
//==========================================================
function FByteStream_readUint32(){
   var o = this;
   var r = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return r;
}

//==========================================================
// <T>读取有64位无符号整数。</T>
//
// @return Integer 64位无符号整数
//==========================================================
function FByteStream_readUint64(){
   var o = this;
   var r = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return r;
}

//==========================================================
// <T>读取浮点数。</T>
//
// @return Number 浮点数
//==========================================================
function FByteStream_readFloat(){
   var o = this;
   var r = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return r;
}

//==========================================================
// <T>读取双精度浮点数。</T>
//
// @return Number 双精度浮点数
//==========================================================
function FByteStream_readDouble(){
   var o = this;
   var r = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return r;
}

//==========================================================
// <T>写入有8位有符号整数。</T>
//
// @return v:value:Integer 8位有符号整数
//==========================================================
function FByteStream_writeInt8(v){
   var o = this;
   var r = o._viewer.setInt8(o._position, v, o._endianCd);
   o._position += 1;
   return r;
}

//==========================================================
// <T>写入有16位有符号整数。</T>
//
// @return v:value:Integer 16位有符号整数
//==========================================================
function FByteStream_writeInt16(v){
   var o = this;
   var r = o._viewer.setInt16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}

//==========================================================
// <T>写入有32位有符号整数。</T>
//
// @return v:value:Integer 32位有符号整数
//==========================================================
function FByteStream_writeInt32(v){
   var o = this;
   var r = o._viewer.setInt32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}

//==========================================================
// <T>写入有64位有符号整数。</T>
//
// @return v:value:Integer 64位有符号整数
//==========================================================
function FByteStream_writeInt64(v){
   var o = this;
   var r = o._viewer.setInt64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}

//==========================================================
// <T>写入有8位无符号整数。</T>
//
// @return v:value:Integer 8位无符号整数
//==========================================================
function FByteStream_writeUint8(v){
   var o = this;
   var r = o._viewer.setUint8(o._position, v, o._endianCd);
   o._position += 1;
   return r;
}

//==========================================================
// <T>写入有16位无符号整数。</T>
//
// @return v:value:Integer 16位无符号整数
//==========================================================
function FByteStream_writeUint16(v){
   var o = this;
   var r = o._viewer.setUint16(o._position, v, o._endianCd);
   o._position += 2;
   return r;
}

//==========================================================
// <T>写入有32位无符号整数。</T>
//
// @return v:value:Integer 32位无符号整数
//==========================================================
function FByteStream_writeUint32(v){
   var o = this;
   var r = o._viewer.setUint32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}

//==========================================================
// <T>写入有64位无符号整数。</T>
//
// @return v:value:Integer 64位无符号整数
//==========================================================
function FByteStream_writeUint64(v){
   var o = this;
   var r = o._viewer.setUint64(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}

//==========================================================
// <T>写入浮点数。</T>
//
// @return v:value:Number 浮点数
//==========================================================
function FByteStream_writeFloat(v){
   var o = this;
   var r = o._viewer.setFloat32(o._position, v, o._endianCd);
   o._position += 4;
   return r;
}

//==========================================================
// <T>写入双精度浮点数。</T>
//
// @return v:value:Number 双精度浮点数
//==========================================================
function FByteStream_writeDouble(v){
   var o = this;
   var r = o._viewer.setDouble(o._position, v, o._endianCd);
   o._position += 8;
   return r;
}
