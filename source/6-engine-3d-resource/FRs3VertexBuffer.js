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
   o.unserialize  = FRs3VertexBuffer_unserialize;
   return o;
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
   var w = new Uint8Array(o._data);
   for(var i = 0; i < t; i++){
      w[i] = p.readUint8();
   }
}
