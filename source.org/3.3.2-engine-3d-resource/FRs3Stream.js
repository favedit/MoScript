//==========================================================
// <T>数据流。</T>
//
// @author maocy
// @history 150128
//==========================================================
function FRs3Stream(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._code             = null;
   o._elementDataCd    = 0;
   o._elementCount     = 0;
   o._elementNormalize = false;
   o._dataStride       = 0;
   o._dataCount        = 0;
   o._dataLength       = 0;
   o._data             = null;

   o._formatCd      = EG3dAttributeFormat.Unknown;
   //..........................................................
   // @method
   o.name              = FRs3Stream_name;
   o.formatCd          = FRs3Stream_formatCd;
   o.unserialize       = FRs3Stream_unserialize;
   o.dispose           = FRs3Stream_dispose;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FRs3Stream_name(){
   return this._name;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FRs3Stream_formatCd(){
   return this._formatCd;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Stream_unserialize(p){
   var o = this;
   // 读取属性
   o._code = p.readString();
   o._elementDataCd = p.readUint8();
   o._elementCount = p.readUint8();
   o._elementNormalize = p.readBoolean();
   var ds = o._dataStride = p.readUint8();
   var dc = o._dataCount = p.readInt32();
   var dl = o._dataLength = ds * dc;
   // 读取所有数据
   var d = o._data = new ArrayBuffer(dl);
   p.readBytes(d, 0, dl);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRs3Stream_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
}
