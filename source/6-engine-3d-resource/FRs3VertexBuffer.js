//==========================================================
// <T>顶点缓冲。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3VertexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._geometry    = null;
   o._name        = null;
   o._formatCd    = ERenderAttributeFormat.Unknown;
   o._vertexCount = 0;
   o._stride      = 0;
   o._data        = null;
   //..........................................................
   // @method
   o.name         = FRs3VertexBuffer_name;
   o.formatCd     = FRs3VertexBuffer_formatCd;
   o.unserialize  = FRs3VertexBuffer_unserialize;
   o.dispose      = FRs3VertexBuffer_dispose;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FRs3VertexBuffer_name(){
   return this._name;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FRs3VertexBuffer_formatCd(){
   return this._formatCd;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3VertexBuffer_unserialize(p){
   var o = this;
   // 读取属性
   o._name = p.readString();
   o._formatCd = p.readInt8();
   o._stride = p.readInt8();
   // 读取所有数据
   var c = o._vertexCount;
   var t = o._stride * c;
   o._data = new ArrayBuffer(t);
   p.readBytes(o._data, 0, t);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRs3VertexBuffer_dispose(){
   var o = this;
   o.__base.FObject.dispose.call(o);
   o._geometry = null;
   o._name = null;
   o._formatCd = null;
   o._vertexCount = null;
   o._stride = null;
   o._data = null;
}
