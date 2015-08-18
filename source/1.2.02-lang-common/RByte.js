//==========================================================
// <T>浮点数管理类。</T>
//
// @reference
// @author maocy
// @version 150131
//==========================================================
MO.RByte = function RByte(){
   return this;
}

//===========================================================
// <T>复制字节数组。</T>
//
// @method
// @param po:outputData:Array 输出数据
// @param poi:outputIndex:Integer 输出位置
// @param pi:inputData:Array 输入数据
// @param pii:inputIndex:Integer 输入位置
// @param pc:count:Integer 总数
//===========================================================
MO.RByte.prototype.copy = function RByte_copy(po, poi, pi, pii, pc){
   for(var i = 0; i < pc; i++){
      po[poi++] = pi[pii++];
   }
}

//===========================================================
// <T>加密字节数组。</T>
//
// @method
// @param data:Array 数据
// @param offset:Integer 位置
// @param length:Integer 长度
// @param key:Integer 键
//===========================================================
MO.RByte.prototype.encodeBytes = function RByte_encodeBytes(data, offset, length, key){
   var o = this;
   var sign = new Uint8Array(8);
   sign[0] = (key >> 16) & 0xFF;
   sign[1] = (key >>  8) & 0xFF;
   sign[2] = (key      ) & 0xFF;
   sign[3] = (key >> 24) & 0xFF;
   sign[4] = (key      ) & 0xFF;
   sign[5] = (key >> 24) & 0xFF;
   sign[6] = (key >> 16) & 0xFF;
   sign[7] = (key >>  8) & 0xFF;
   for(var i = 0; i < length; i++){
      data[offset + i] ^= sign[i % 8];
   }
}
//..........................................................
// 实例化内容
MO.RByte = new MO.RByte();
MO.Lang.Byte = MO.RByte;
