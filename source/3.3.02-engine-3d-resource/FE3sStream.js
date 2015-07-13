//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 150128
//==========================================================
MO.FE3sStream = function FE3sStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code             = MO.Class.register(o, new MO.AGetSet('_code'));
   o._elementDataCd    = MO.Class.register(o, new MO.AGetSet('_elementDataCd'), 0);
   o._elementCount     = MO.Class.register(o, new MO.AGetSet('_elementCount'), 0);
   o._elementNormalize = MO.Class.register(o, new MO.AGetSet('_elementNormalize'), false);
   o._dataStride       = MO.Class.register(o, new MO.AGetSet('_dataStride'), 0);
   o._dataCount        = MO.Class.register(o, new MO.AGetSet('_dataCount'), 0);
   o._dataLength       = MO.Class.register(o, new MO.AGetSet('_dataLength'), 0);
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._formatCd         = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   //..........................................................
   // @method
   o.unserialize       = MO.FE3sStream_unserialize;
   // @method
   o.dispose           = MO.FE3sStream_dispose;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sStream_unserialize = function FE3sStream_unserialize(input){
   var o = this;
   // 读取属性
   o._code = input.readString();
   o._elementDataCd = input.readUint8();
   o._elementCount = input.readUint8();
   o._elementNormalize = input.readBoolean();
   var dataStride = o._dataStride = input.readUint8();
   var dataCount = o._dataCount = input.readInt32();
   var dataLength = o._dataLength = dataStride * dataCount;
   // 读取所有数据
   var data = o._data = new ArrayBuffer(dataLength);
   input.readBytes(data, 0, dataLength);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sStream_dispose = function FE3sStream_dispose(){
   var o = this;
   o.data = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
