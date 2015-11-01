//==========================================================
// <T>加载和保存属性的接口。</T>
//
// @face
// @author maocy
// @version 150806
//==========================================================
MO.MPersistenceAble = function MPersistenceAble(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.unserialize                = MO.Method.empty;
   o.unserializeBuffer          = MO.MPersistenceAble_unserializeBuffer;
   o.unserializeSignBuffer      = MO.MPersistenceAble_unserializeSignBuffer;
   o.unserializeEncryptedBuffer = MO.MPersistenceAble_unserializeEncryptedBuffer;
   // @method
   o.serialize                  = MO.Method.empty;
   o.serializeBuffer            = MO.MPersistenceAble_serializeBuffer;
   o.serializeSignBuffer        = MO.MPersistenceAble_serializeSignBuffer;
   o.serializeEncryptedBuffer   = MO.MPersistenceAble_serializeEncryptedBuffer;
   return o;
}

//==========================================================
// <T>从数据中反序列化数据内容。</T>
//
// @method
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistenceAble_unserializeBuffer = function MPersistenceAble_unserializeBuffer(buffer, endianCd){
   var o = this;
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.unserialize(view);
   // 释放数据
   view.dispose();
}

//==========================================================
// <T>从数据中反序列化数据内容。</T>
//
// @method
// @param sign:Integer 签名
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistenceAble_unserializeSignBuffer = function MPersistenceAble_unserializeSignBuffer(sign, buffer, endianCd){
   var o = this;
   // 签名处理
   var bytes = new Uint8Array(buffer);
   MO.Lang.Byte.encodeBytes(bytes, 0, bytes.length, sign);
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.unserialize(view);
   // 释放数据
   view.dispose();
}

//==========================================================
// <T>从加密数据中反序列化数据内容。</T>
//
// @method
// @param sign:Integer 签名
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistenceAble_unserializeEncryptedBuffer = function MPersistenceAble_unserializeEncryptedBuffer(sign, buffer, endianCd){
   var o = this;
   // 反序列化数据
   var view = MO.Class.create(MO.FEncryptedView);
   view.setSign(sign);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.unserialize(view);
   // 释放数据
   view.dispose();
}

//==========================================================
// <T>将数据内容序列化到缓冲中。</T>
//
// @method
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistenceAble_serializeBuffer = function MPersistenceAble_serializeBuffer(buffer, endianCd){
   var o = this;
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.serialize(view);
   // 释放数据
   view.dispose();
}

//==========================================================
// <T>将数据内容序列化到缓冲中。</T>
//
// @method
// @param sign:Integer 签名
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistenceAble_serializeSignBuffer = function MPersistenceAble_serializeSignBuffer(buffer, endianCd){
   var o = this;
   // 反序列化数据
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.serialize(view);
   // 释放数据
   view.dispose();
}

//==========================================================
// <T>将数据内容序列化到加密缓冲中。</T>
//
// @method
// @param sign:Integer 签名
// @param buffer:ArrayBuffer 缓冲
// @param endianCd:Boolean 编码
//==========================================================
MO.MPersistenceAble_serializeEncryptedBuffer = function MPersistenceAble_serializeEncryptedBuffer(sign, buffer, endianCd){
   var o = this;
   // 反序列化数据
   var view = MO.Class.create(MO.FEncryptedView);
   view.setSign(sign);
   view.setEndianCd(endianCd);
   view.link(buffer);
   // 读取数据
   o.serialize(view);
   // 释放数据
   view.dispose();
}
