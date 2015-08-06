//==========================================================
// <T>数据流基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.MDataStream = function MDataStream(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._viewer      = null;
   o._endianCd    = false;
   o._position    = 0;
   //..........................................................
   // @method
   o.testString   = MO.MDataStream_testString;
   // @method
   o.readBoolean  = MO.MDataStream_readBoolean;
   o.readInt8     = MO.MDataStream_readInt8;
   o.readInt16    = MO.MDataStream_readInt16;
   o.readInt32    = MO.MDataStream_readInt32;
   o.readInt64    = MO.MDataStream_readInt64;
   o.readUint8    = MO.MDataStream_readUint8;
   o.readUint16   = MO.MDataStream_readUint16;
   o.readUint32   = MO.MDataStream_readUint32;
   o.readUint64   = MO.MDataStream_readUint64;
   o.readFloat    = MO.MDataStream_readFloat;
   o.readDouble   = MO.MDataStream_readDouble;
   o.readString   = MO.MDataStream_readString;
   o.readBytes    = MO.MDataStream_readBytes;
   o.readData     = MO.MDataStream_readData;
   // @method
   o.writeBoolean = MO.MDataStream_writeBoolean;
   o.writeInt8    = MO.MDataStream_writeInt8;
   o.writeInt16   = MO.MDataStream_writeInt16;
   o.writeInt32   = MO.MDataStream_writeInt32;
   o.writeInt64   = MO.MDataStream_writeInt64;
   o.writeUint8   = MO.MDataStream_writeUint8;
   o.writeUint16  = MO.MDataStream_writeUint16;
   o.writeUint32  = MO.MDataStream_writeUint32;
   o.writeUint64  = MO.MDataStream_writeUint64;
   o.writeFloat   = MO.MDataStream_writeFloat;
   o.writeDouble  = MO.MDataStream_writeDouble;
   o.writeString  = MO.MDataStream_writeString;
   o.writeBytes   = MO.MDataStream_writeBytes;
   o.writeData    = MO.MDataStream_writeData;
   return o;
}

//==========================================================
// <T>测试字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.MDataStream_testString = function MDataStream_testString(){
   var o = this;
   var position = o._position;
   var length = o._viewer.getUint16(position, o._endianCd);
   position += 2;
   var result = new MO.TString();
   for(var i = 0; i < length; i++){
      var value = o._viewer.getUint16(position, o._endianCd);
      position += 2;
      result.push(String.fromCharCode(value));
   }
   return result.flush();
}

//==========================================================
// <T>读取布尔值。</T>
//
// @method
// @return Boolean 布尔值
//==========================================================
MO.MDataStream_readBoolean = function MDataStream_readBoolean(){
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
MO.MDataStream_readInt8 = function MDataStream_readInt8(){
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
MO.MDataStream_readInt16 = function MDataStream_readInt16(){
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
MO.MDataStream_readInt32 = function MDataStream_readInt32(){
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
MO.MDataStream_readInt64 = function MDataStream_readInt64(){
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
MO.MDataStream_readUint8 = function MDataStream_readUint8(){
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
MO.MDataStream_readUint16 = function MDataStream_readUint16(){
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
MO.MDataStream_readUint32 = function MDataStream_readUint32(){
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
MO.MDataStream_readUint64 = function MDataStream_readUint64(){
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
MO.MDataStream_readFloat = function MDataStream_readFloat(){
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
MO.MDataStream_readDouble = function MDataStream_readDouble(){
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
MO.MDataStream_readString = function MDataStream_readString(){
   var o = this;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var position = o._position;
   var length = viewer.getUint16(position, endianCd);
   position += 2;
   var value = new MO.TString();
   for(var i = 0; i < length; i++){
      var character = viewer.getUint16(position, endianCd);
      value.push(String.fromCharCode(character));
      position += 2;
   }
   o._position = position;
   return value.flush();
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
MO.MDataStream_readBytes = function MDataStream_readBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   // 检查长度
   if(length <= 0){
      return;
   }
   // 暂时不支持开始位置选择
   if(offset != 0){
      throw new MO.TError(o, 'Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   // 8字节复制
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getFloat64(position, endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   // 4字节复制
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint32(position, endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   // 2字节复制
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         array[i] = viewer.getUint16(position, endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   // 逐字节复制
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      array[i] = viewer.getUint8(position++, endianCd);
   }
   o._position = position;
}

//==========================================================
// <T>读取类型数据。</T>
//
// @method
// @param dataCd:EDataType 数据类型
// @return Object 数据
//==========================================================
MO.MDataStream_readData = function MDataStream_readData(dataCd){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.readInt8();
      case MO.EDataType.Int16:
         return o.readInt16();
      case MO.EDataType.Int32:
         return o.readInt32();
      case MO.EDataType.Int64:
         return o.readInt64();
      case MO.EDataType.Uint8:
         return o.readUint8();
      case MO.EDataType.Uint16:
         return o.readUint16();
      case MO.EDataType.Uint32:
         return o.readUint32();
      case MO.EDataType.Uint64:
         return o.readUint64();
      case MO.EDataType.Float32:
         return o.readFloat();
      case MO.EDataType.Float64:
         return o.readDouble();
      case MO.EDataType.String:
         return o.readString();
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}

//==========================================================
// <T>写入布尔值。</T>
//
// @method
// @return value:Boolean 布尔值
//==========================================================
MO.MDataStream_writeBoolean = function MDataStream_writeBoolean(value){
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
MO.MDataStream_writeInt8 = function MDataStream_writeInt8(value){
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
MO.MDataStream_writeInt16 = function MDataStream_writeInt16(value){
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
MO.MDataStream_writeInt32 = function MDataStream_writeInt32(value){
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
MO.MDataStream_writeInt64 = function MDataStream_writeInt64(value){
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
MO.MDataStream_writeUint8 = function MDataStream_writeUint8(value){
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
MO.MDataStream_writeUint16 = function MDataStream_writeUint16(value){
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
MO.MDataStream_writeUint32 = function MDataStream_writeUint32(value){
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
MO.MDataStream_writeUint64 = function MDataStream_writeUint64(value){
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
MO.MDataStream_writeFloat = function MDataStream_writeFloat(value){
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
MO.MDataStream_writeDouble = function MDataStream_writeDouble(value){
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
MO.MDataStream_writeString = function MDataStream_writeString(value){
   var o = this;
   var viewer = o._viewer;
   var length = v.length;
   var endianCd = o._endianCd;
   var position = o._position;
   viewer.setUint16(position, length, endianCd);
   position += 2;
   for(var i = 0; i < length; i++){
      viewer.setUint16(position, value.charCodeAt(i), endianCd);
      position += 2;
   }
   o._position = position;
}

//==========================================================
// <T>写入字节数组。</T>
//
// @method
// @param data:ArrayBuffer 数组
// @param offset:Integer 开始位置
// @param length:Integer 长度
// @return Integer 读取长度
//==========================================================
MO.MDataStream_writeBytes = function MDataStream_writeBytes(data, offset, length){
   var o = this;
   var viewer = o._viewer;
   // 检查长度
   if(length <= 0){
      return;
   }
   // 暂时不支持开始位置选择
   if(offset != 0){
      throw new MO.TError('Unsupport.');
   }
   var position = o._position;
   var endianCd = o._endianCd;
   // 8字节复制
   if(length % 8 == 0){
      var array = new Float64Array(data);
      var count = length >> 3;
      for(var i = 0; i < count; i++){
         viewer.setFloat64(position, array[i], endianCd);
         position += 8;
      }
      o._position = position;
      return;
   }
   // 4字节复制
   if(length % 4 == 0){
      var array = new Uint32Array(data);
      var count = length >> 2;
      for(var i = 0; i < count; i++){
         viewer.setUint32(position, array[i], endianCd);
         position += 4;
      }
      o._position = position;
      return;
   }
   // 2字节复制
   if(length % 2 == 0){
      var array = new Uint16Array(data);
      var count = length >> 1;
      for(var i = 0; i < count; i++){
         viewer.setUint16(position, array[i], endianCd);
         position += 2;
      }
      o._position = position;
      return;
   }
   // 逐字节复制
   var array = new Uint8Array(data);
   for(var i = 0; i < length; i++){
      viewer.setUint8(position++, array[i], endianCd);
   }
   o._position = position;
}

//==========================================================
// <T>写入类型数据。</T>
//
// @method
// @param dataCd:EDataType 数据类型
// @param value:Object 数据
//==========================================================
MO.MDataStream_writeData = function MDataStream_writeData(dataCd, value){
   var o = this;
   switch(dataCd){
      case MO.EDataType.Int8:
         return o.writeInt8(value);
      case MO.EDataType.Int16:
         return o.writeInt16(value);
      case MO.EDataType.Int32:
         return o.writeInt32(value);
      case MO.EDataType.Int64:
         return o.writeInt64(value);
      case MO.EDataType.Uint8:
         return o.writeUint8(value);
      case MO.EDataType.Uint16:
         return o.writeUint16(value);
      case MO.EDataType.Uint32:
         return o.writeUint32(value);
      case MO.EDataType.Uint64:
         return o.writeUint64(value);
      case MO.EDataType.Float32:
         return o.writeFloat(value);
      case MO.EDataType.Float64:
         return o.writeDouble(value);
      case MO.EDataType.String:
         return o.writeString(value);
   }
   throw new TError(o, 'Unknown data cd. (data_cd={1})', dataCd);
}
