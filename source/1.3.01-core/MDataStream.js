//==========================================================
// <T>数据流基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
function MDataStream(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._viewer      = null;
   o._endianCd    = false;
   o._position    = 0;
   //..........................................................
   // @method
   o.testString   = FByteStream_testString;
   // @method
   o.readBoolean  = FByteStream_readBoolean;
   o.readInt8     = FByteStream_readInt8;
   o.readInt16    = FByteStream_readInt16;
   o.readInt32    = FByteStream_readInt32;
   o.readInt64    = FByteStream_readInt64;
   o.readUint8    = FByteStream_readUint8;
   o.readUint16   = FByteStream_readUint16;
   o.readUint32   = FByteStream_readUint32;
   o.readUint64   = FByteStream_readUint64;
   o.readFloat    = FByteStream_readFloat;
   o.readDouble   = FByteStream_readDouble;
   o.readString   = FByteStream_readString;
   o.readBytes    = FByteStream_readBytes;
   o.readData     = FByteStream_readData;
   // @method
   o.writeBoolean = FByteStream_writeBoolean;
   o.writeInt8    = FByteStream_writeInt8;
   o.writeInt16   = FByteStream_writeInt16;
   o.writeInt32   = FByteStream_writeInt32;
   o.writeInt64   = FByteStream_writeInt64;
   o.writeUint8   = FByteStream_writeUint8;
   o.writeUint16  = FByteStream_writeUint16;
   o.writeUint32  = FByteStream_writeUint32;
   o.writeUint64  = FByteStream_writeUint64;
   o.writeFloat   = FByteStream_writeFloat;
   o.writeDouble  = FByteStream_writeDouble;
   o.writeString  = FByteStream_writeString;
   return o;
}

//==========================================================
// <T>测试字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
function FByteStream_testString(){
   var o = this;
   var position = o._position;
   var length = o._viewer.getUint16(position, o._endianCd);
   position += 2;
   var result = new TString();
   for(var i = 0; i < length; i++){
      var value = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      result.push(String.fromCharCode(value));
   }
   return result.toString();
}

//==========================================================
// <T>读取布尔值。</T>
//
// @method
// @return Boolean 布尔值
//==========================================================
function FByteStream_readBoolean(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value > 0;
}

//==========================================================
// <T>读取有8位有符号整数。</T>
//
// @method
// @return Integer 8位有符号整数
//==========================================================
function FByteStream_readInt8(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd);
   o._position++;
   return value;
}

//==========================================================
// <T>读取有16位有符号整数。</T>
//
// @method
// @return Integer 16位有符号整数
//==========================================================
function FByteStream_readInt16(){
   var o = this;
   var value = o._viewer.getInt16(o._position, o._endianCd);
   o._position += 2;
   return value;
}

//==========================================================
// <T>读取有32位有符号整数。</T>
//
// @method
// @return Integer 32位有符号整数
//==========================================================
function FByteStream_readInt32(){
   var o = this;
   var value = o._viewer.getInt32(o._position, o._endianCd);
   o._position += 4;
   return value;
}

//==========================================================
// <T>读取有64位有符号整数。</T>
//
// @method
// @return Integer 64位有符号整数
//==========================================================
function FByteStream_readInt64(){
   var o = this;
   var value = o._viewer.getInt64(o._position, o._endianCd);
   o._position += 8;
   return value;
}

//==========================================================
// <T>读取有8位无符号整数。</T>
//
// @method
// @return Integer 8位无符号整数
//==========================================================
function FByteStream_readUint8(){
   var o = this;
   var value = o._viewer.getUint8(o._position, o._endianCd);
   o._position += 1;
   return value;
}

//==========================================================
// <T>读取有16位无符号整数。</T>
//
// @method
// @return Integer 16位无符号整数
//==========================================================
function FByteStream_readUint16(){
   var o = this;
   var value = o._viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   return value;
}

//==========================================================
// <T>读取有32位无符号整数。</T>
//
// @method
// @return Integer 32位无符号整数
//==========================================================
function FByteStream_readUint32(){
   var o = this;
   var value = o._viewer.getUint32(o._position, o._endianCd);
   o._position += 4;
   return value;
}

//==========================================================
// <T>读取有64位无符号整数。</T>
//
// @method
// @return Integer 64位无符号整数
//==========================================================
function FByteStream_readUint64(){
   var o = this;
   var value = o._viewer.getUint64(o._position, o._endianCd);
   o._position += 8;
   return value;
}

//==========================================================
// <T>读取浮点数。</T>
//
// @method
// @return Number 浮点数
//==========================================================
function FByteStream_readFloat(){
   var o = this;
   var value = o._viewer.getFloat32(o._position, o._endianCd);
   o._position += 4;
   return value;
}

//==========================================================
// <T>读取双精度浮点数。</T>
//
// @method
// @return Number 双精度浮点数
//==========================================================
function FByteStream_readDouble(){
   var o = this;
   var value = o._viewer.getFloat64(o._position, o._endianCd);
   o._position += 8;
   return value;
}

//==========================================================
// <T>读取字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
function FByteStream_readString(){
   var o = this;
   var viewer = o._viewer;
   var length = viewer.getUint16(o._position, o._endianCd);
   o._position += 2;
   var value = new TString();
   for(var i = 0; i < length; i++){
      var character = viewer.getUint16(o._position, o._endianCd);
      o._position += 2;
      value.push(String.fromCharCode(character));
   }
   return value.flush();
}

//==========================================================
// <T>读取类型数据。</T>
//
// @method
// @param dataCd:EDataType 数据类型
// @return Object 数据
//==========================================================
function FByteStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case EDataType.Int8:
         return o.readInt8();
      case EDataType.Int16:
         return o.readInt16();
      case EDataType.Int32:
         return o.readInt32();
      case EDataType.Int64:
         return o.readInt64();
      case EDataType.Uint8:
         return o.readUint8();
      case EDataType.Uint16:
         return o.readUint16();
      case EDataType.Uint32:
         return o.readUint32();
      case EDataType.Uint64:
         return o.readUint64();
      case EDataType.Float32:
         return o.readFloat();
      case EDataType.Float64:
         return o.readDouble();
      case EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}

//==========================================================
// <T>读取字节数组。</T>
//
// @method
// @param data:ArrayBuffer 数组
// @param offset:Integer 开始位置
// @param length:Integer 长度
// @return Integer 读取长度
//==========================================================
function FByteStream_readBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   // 检查长度
   if(length <= 0){
      return;
   }
   // 暂时不支持开始位置选择
   if(offset != 0){
      throw new TError('Unsupport.');
   }
   // 8字节复制
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getFloat64(o._position, o._endianCd);
         o._position += 8;
      }
      return;
   }
   // 4字节复制
   if(length % 4 == 0){
      var count = length >> 2;
      var array = new Uint32Array(data);
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint32(o._position, o._endianCd);
         o._position += 4;
      }
      return;
   }
   // 2字节复制
   if(length % 2 == 0){
      var count = length >> 1;
      var array = new Uint16Array(data);
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint16(o._position, o._endianCd);
         o._position += 2;
      }
      return;
   }
   // 逐字节复制
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      array[i] = viewer.getUint8(o._position++, o._endianCd);
   }
}

//==========================================================
// <T>写入布尔值。</T>
//
// @method
// @return value:Boolean 布尔值
//==========================================================
function FByteStream_writeBoolean(value){
   var o = this;
   o._viewer.setInt8(o._position, (value > 0) ? 1 : 0, o._endianCd);
   o._position++;
}

//==========================================================
// <T>写入8位有符号整数。</T>
//
// @method
// @return value:Integer 8位有符号整数
//==========================================================
function FByteStream_writeInt8(value){
   var o = this;
   o._viewer.setInt8(o._position, value, o._endianCd);
   o._position++;
}

//==========================================================
// <T>写入16位有符号整数。</T>
//
// @method
// @return value:Integer 16位有符号整数
//==========================================================
function FByteStream_writeInt16(value){
   var o = this;
   o._viewer.setInt16(o._position, value, o._endianCd);
   o._position += 2;
}

//==========================================================
// <T>写入32位有符号整数。</T>
//
// @method
// @return value:Integer 32位有符号整数
//==========================================================
function FByteStream_writeInt32(value){
   var o = this;
   o._viewer.setInt32(o._position, value, o._endianCd);
   o._position += 4;
}

//==========================================================
// <T>写入64位有符号整数。</T>
//
// @method
// @return value:Integer 64位有符号整数
//==========================================================
function FByteStream_writeInt64(value){
   var o = this;
   o._viewer.setInt64(o._position, value, o._endianCd);
   o._position += 8;
}

//==========================================================
// <T>写入8位无符号整数。</T>
//
// @method
// @return value:Integer 8位无符号整数
//==========================================================
function FByteStream_writeUint8(value){
   var o = this;
   o._viewer.setUint8(o._position, value, o._endianCd);
   o._position += 1;
}

//==========================================================
// <T>写入16位无符号整数。</T>
//
// @method
// @return value:Integer 16位无符号整数
//==========================================================
function FByteStream_writeUint16(value){
   var o = this;
   o._viewer.setUint16(o._position, value, o._endianCd);
   o._position += 2;
}

//==========================================================
// <T>写入32位无符号整数。</T>
//
// @method
// @return value:Integer 32位无符号整数
//==========================================================
function FByteStream_writeUint32(value){
   var o = this;
   o._viewer.setUint32(o._position, value, o._endianCd);
   o._position += 4;
}

//==========================================================
// <T>写入64位无符号整数。</T>
//
// @method
// @return value:Integer 64位无符号整数
//==========================================================
function FByteStream_writeUint64(value){
   var o = this;
   o._viewer.setUint64(o._position, value, o._endianCd);
   o._position += 8;
}

//==========================================================
// <T>写入浮点数。</T>
//
// @method
// @return value:Number 浮点数
//==========================================================
function FByteStream_writeFloat(value){
   var o = this;
   o._viewer.setFloat32(o._position, value, o._endianCd);
   o._position += 4;
}

//==========================================================
// <T>写入双精度浮点数。</T>
//
// @method
// @return value:Number 双精度浮点数
//==========================================================
function FByteStream_writeDouble(value){
   var o = this;
   o._viewer.setDouble(o._position, value, o._endianCd);
   o._position += 8;
}

//==========================================================
// <T>写入字符串。</T>
//
// @method
// @return value:String 字符串
//==========================================================
function FByteStream_writeString(value){
   var o = this;
   var viewer = o._viewer;
   var length = v.length;
   viewer.setUint16(o._position, length, o._endianCd);
   o._position += 2;
   for(var i = 0; i < length; i++){
      viewer.setUint16(o._position, value.charCodeAt(i), o._endianCd)
      o._position += 2;
   }
}
