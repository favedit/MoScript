//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FE3sStream(o){
   o = RClass.inherits(this, o, FObject, MAttributeCode);
   //..........................................................
   // @attribute
   o._elementDataCd    = 0;
   o._elementCount     = 0;
   o._elementNormalize = false;
   o._dataStride       = 0;
   o._dataCount        = 0;
   o._dataLength       = 0;
   o._data             = null;
   o._formatCd         = EG3dAttributeFormat.Unknown;
   //..........................................................
   // @method
   o.elementDataCd     = FE3sStream_elementDataCd;
   o.formatCd          = FE3sStream_formatCd;
   o.dataStride        = FE3sStream_dataStride;
   o.dataCount         = FE3sStream_dataCount;
   o.data              = FE3sStream_data;
   // @method
   o.unserialize       = FE3sStream_unserialize;
   // @method
   o.dispose           = FE3sStream_dispose;
   return o;
}

//==========================================================
// <T>获得元素数据类型。</T>
//
// @return String 元素数据类型
//==========================================================
function FE3sStream_elementDataCd(){
   return this._elementDataCd;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FE3sStream_formatCd(){
   return this._formatCd;
}

//==========================================================
// <T>获得数据宽度。</T>
//
// @return Integer 宽度
//==========================================================
function FE3sStream_dataStride(){
   return this._dataStride;
}

//==========================================================
// <T>获得数据个数。</T>
//
// @return Integer 个数
//==========================================================
function FE3sStream_dataCount(){
   return this._dataCount;
}

//==========================================================
// <T>获得数据。</T>
//
// @return ArrayBuffer 数据
//==========================================================
function FE3sStream_data(){
   return this._data;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sStream_unserialize(input){
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
function FE3sStream_dispose(){
   var o = this;
   o.data = null;
   o.__base.FObject.dispose.call(o);
}
