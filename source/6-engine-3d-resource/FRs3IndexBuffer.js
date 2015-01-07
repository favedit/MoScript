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
   o._strideCd    = EG3dIndexStride.Unknown;
   o._memory      = null;
   o._data        = null;
   //..........................................................
   // @method
   o.count        = FRs3IndexBuffer_count;
   o.strideCd     = FRs3IndexBuffer_strideCd;
   o.memory       = FRs3IndexBuffer_memory;
   o.data         = FRs3IndexBuffer_data;
   o.unserialize  = FRs3IndexBuffer_unserialize;
   return o;
}

//==========================================================
// <T>获得总数</T>
//
// @return Integer 总数
//==========================================================
function FRs3IndexBuffer_count(){
   return this._count;
}

//==========================================================
// <T>获得宽度类型</T>
//
// @return Integer 宽度类型
//==========================================================
function FRs3IndexBuffer_strideCd(){
   return this._strideCd;
}

//==========================================================
// <T>获得内存</T>
//
// @return ArrayBuffer 内存
//==========================================================
function FRs3IndexBuffer_memory(){
   return this._memory;
}

//==========================================================
// <T>获得数据</T>
//
// @return TypeArray 数据
//==========================================================
function FRs3IndexBuffer_data(){
   return this._data;
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
   var sc = o._strideCd = p.readInt8();
   // 读取数据
   if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(2 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint16();
      }
   }else if(sc == EG3dIndexStride.Uint16){
      o._memory = new ArrayBuffer(4 * c);
      var d = o._data = new Uint16Array(o._memory);
      for(var i = 0; i < c; i++){
         d[i] = p.readUint32();
      }
   }else{
      throw new TError('Unknown stride type. (stride_cd={1})', sc);
   }
}
