//==========================================================
// <T>数据流基类。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.MEncryptedStream = function MEncryptedStream(o){
   o = MO.Class.inherits(this, o, MO.MDataStream);
   //..........................................................
   o._sign        = null;
   o._signLength  = null;
   o._data        = null;
   o._dataViewer  = null;
   //..........................................................
   // @method
   o.testString   = MO.MEncryptedStream_testString;
   // @method
   o.readBoolean  = MO.MEncryptedStream_readBoolean;
   o.readInt8     = MO.MEncryptedStream_readInt8;
   o.readInt16    = MO.MEncryptedStream_readInt16;
   o.readInt32    = MO.MEncryptedStream_readInt32;
   o.readInt64    = MO.MEncryptedStream_readInt64;
   o.readUint8    = MO.MEncryptedStream_readUint8;
   o.readUint16   = MO.MEncryptedStream_readUint16;
   o.readUint32   = MO.MEncryptedStream_readUint32;
   o.readUint64   = MO.MEncryptedStream_readUint64;
   o.readFloat    = MO.MEncryptedStream_readFloat;
   o.readDouble   = MO.MEncryptedStream_readDouble;
   o.readString   = MO.MEncryptedStream_readString;
   o.readBytes    = MO.MEncryptedStream_readBytes;
   o.readData     = MO.MEncryptedStream_readData;
   // @method
   o.writeBoolean = MO.MEncryptedStream_writeBoolean;
   o.writeInt8    = MO.MEncryptedStream_writeInt8;
   o.writeInt16   = MO.MEncryptedStream_writeInt16;
   o.writeInt32   = MO.MEncryptedStream_writeInt32;
   o.writeInt64   = MO.MEncryptedStream_writeInt64;
   o.writeUint8   = MO.MEncryptedStream_writeUint8;
   o.writeUint16  = MO.MEncryptedStream_writeUint16;
   o.writeUint32  = MO.MEncryptedStream_writeUint32;
   o.writeUint64  = MO.MEncryptedStream_writeUint64;
   o.writeFloat   = MO.MEncryptedStream_writeFloat;
   o.writeDouble  = MO.MEncryptedStream_writeDouble;
   o.writeString  = MO.MEncryptedStream_writeString;
   o.writeBytes   = MO.MEncryptedStream_writeBytes;
   o.writeData    = MO.MEncryptedStream_writeData;
   return o;
}

//==========================================================
// <T>测试字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.MEncryptedStream_testString = function MEncryptedStream_testString(){
   var o = this;
   debugger
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
MO.MEncryptedStream_readBoolean = function MEncryptedStream_readBoolean(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd) ^ o._sign[0];
   o._position++;
   return value > 0;
}

//==========================================================
// <T>读取有8位有符号整数。</T>
//
// @method
// @return Integer 8位有符号整数
//==========================================================
MO.MEncryptedStream_readInt8 = function MEncryptedStream_readInt8(){
   var o = this;
   var value = o._viewer.getInt8(o._position, o._endianCd) ^ o._sign[0];
   o._position++;
   return value;
}

//==========================================================
// <T>读取有16位有符号整数。</T>
//
// @method
// @return Integer 16位有符号整数
//==========================================================
MO.MEncryptedStream_readInt16 = function MEncryptedStream_readInt16(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 2; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt16(0, endianCd);
   o._position += 2;
   return value;
}

//==========================================================
// <T>读取有32位有符号整数。</T>
//
// @method
// @return Integer 32位有符号整数
//==========================================================
MO.MEncryptedStream_readInt32 = function MEncryptedStream_readInt32(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt32(0, endianCd);
   o._position += 4;
   return value;
}

//==========================================================
// <T>读取有64位有符号整数。</T>
//
// @method
// @return Integer 64位有符号整数
//==========================================================
MO.MEncryptedStream_readInt64 = function MEncryptedStream_readInt64(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getInt64(0, endianCd);
   o._position += 8;
   return value;
}

//==========================================================
// <T>读取有8位无符号整数。</T>
//
// @method
// @return Integer 8位无符号整数
//==========================================================
MO.MEncryptedStream_readUint8 = function MEncryptedStream_readUint8(){
   var o = this;
   var value = o._viewer.getUint8(o._position, o._endianCd) ^ o._sign[0];
   o._position += 1;
   return value;
}

//==========================================================
// <T>读取有16位无符号整数。</T>
//
// @method
// @return Integer 16位无符号整数
//==========================================================
MO.MEncryptedStream_readUint16 = function MEncryptedStream_readUint16(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 2; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint16(0, endianCd);
   o._position += 2;
   return value;
}

//==========================================================
// <T>读取有32位无符号整数。</T>
//
// @method
// @return Integer 32位无符号整数
//==========================================================
MO.MEncryptedStream_readUint32 = function MEncryptedStream_readUint32(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint32(0, endianCd);
   o._position += 4;
   return value;
}

//==========================================================
// <T>读取有64位无符号整数。</T>
//
// @method
// @return Integer 64位无符号整数
//==========================================================
MO.MEncryptedStream_readUint64 = function MEncryptedStream_readUint64(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getUint64(0, endianCd);
   o._position += 8;
   return value;
}

//==========================================================
// <T>读取浮点数。</T>
//
// @method
// @return Number 浮点数
//==========================================================
MO.MEncryptedStream_readFloat = function MEncryptedStream_readFloat(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 4; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getFloat32(0, endianCd);
   o._position += 4;
   return value;
}

//==========================================================
// <T>读取双精度浮点数。</T>
//
// @method
// @return Number 双精度浮点数
//==========================================================
MO.MEncryptedStream_readDouble = function MEncryptedStream_readDouble(){
   var o = this;
   var sign = o._sign;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   var dataViewer = o._dataViewer;
   for(var i = 0; i < 8; i++){
      dataViewer.setUint8(i, viewer.getUint8(o._position + i, endianCd) ^ sign[i], endianCd);
   }
   var value = dataViewer.getFloat64(0, endianCd);
   o._position += 8;
   return value;
}

//==========================================================
// <T>读取字符串。</T>
//
// @method
// @return String 字符串
//==========================================================
MO.MEncryptedStream_readString = function MEncryptedStream_readString(){
   var o = this;
   var sign = o._sign;
   var signLength = o._signLength;
   var dataViewer = o._dataViewer;
   var viewer = o._viewer;
   var endianCd = o._endianCd;
   // 读取长度
   var length = o.readUint16();
   if(length == 0){
      return '';
   }
   var dataBuffer = new Uint8Array(o._data);
   var buffer = new Uint8Array(o._memory);
   // 读取内容
   var position = o._position;
   var value = new MO.TString();
   for(var i = 0; i < length; i++){
      var index = i << 1;
      //var cl = viewer.getUint8(position    , endianCd);
      //dataViewer.setUint8(0, cl, endianCd);
      //var ch = viewer.getUint8(position + 1, endianCd);
      //dataViewer.setUint8(1, ch, endianCd);
      dataViewer.setUint8(0, viewer.getUint8(position    , endianCd) ^ sign[(index    ) % signLength], endianCd);
      dataViewer.setUint8(1, viewer.getUint8(position + 1, endianCd) ^ sign[(index + 1) % signLength], endianCd);
      var character = dataViewer.getUint16(0, endianCd);
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
MO.MEncryptedStream_readBytes = function MEncryptedStream_readBytes(data, offset, length){
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
MO.MEncryptedStream_readData = function MEncryptedStream_readData(dataCd){
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
MO.MEncryptedStream_writeBoolean = function MEncryptedStream_writeBoolean(value){
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
MO.MEncryptedStream_writeInt8 = function MEncryptedStream_writeInt8(value){
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
MO.MEncryptedStream_writeInt16 = function MEncryptedStream_writeInt16(value){
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
MO.MEncryptedStream_writeInt32 = function MEncryptedStream_writeInt32(value){
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
MO.MEncryptedStream_writeInt64 = function MEncryptedStream_writeInt64(value){
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
MO.MEncryptedStream_writeUint8 = function MEncryptedStream_writeUint8(value){
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
MO.MEncryptedStream_writeUint16 = function MEncryptedStream_writeUint16(value){
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
MO.MEncryptedStream_writeUint32 = function MEncryptedStream_writeUint32(value){
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
MO.MEncryptedStream_writeUint64 = function MEncryptedStream_writeUint64(value){
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
MO.MEncryptedStream_writeFloat = function MEncryptedStream_writeFloat(value){
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
MO.MEncryptedStream_writeDouble = function MEncryptedStream_writeDouble(value){
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
MO.MEncryptedStream_writeString = function MEncryptedStream_writeString(value){
   var o = this;
   var sign = o._sign;
   var signLength = o._signLength;
   var viewer = o._viewer;
   var length = v.length;
   var endianCd = o._endianCd;
   var position = o._position;
   viewer.setUint16(position, length ^ sign[0], endianCd);
   position += 2;
   for(var i = 0; i < length; i++){
      viewer.setUint16(position, value.charCodeAt(i) ^ sign[i % signLength], endianCd);
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
MO.MEncryptedStream_writeBytes = function MEncryptedStream_writeBytes(data, offset, length){
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
MO.MEncryptedStream_writeData = function MEncryptedStream_writeData(dataCd, value){
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
