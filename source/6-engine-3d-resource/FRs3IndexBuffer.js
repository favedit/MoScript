//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3IndexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._geometry    = null;
   o._count       = null;
   o._strideCd    = ERenderIndexStride.Unknown;
   o._data        = null;
   //..........................................................
   // @method
   o.unserialize  = FRs3IndexBuffer_unserialize;
   return o;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3IndexBuffer_unserialize(p){
   var o = this;
   // 读取属性
   var c = o._count = p.readInt32();
   o._strideCd = p.readInt8();
   // 读取所有数据
   o._data = new ArrayBuffer(2 * c);
   var w = new Uint16Array(o._data);
   for(var i = 0; i < c; i++){
      w[i] = p.readUint16();
   }
}
