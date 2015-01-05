//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Geometry(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._optionInstanced = false;
   o._instanceCount   = 0;
   o._materialCode    = null;
   o._vertexCount     = 0;
   o._indexCount      = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._boneIds         = null;
   o._track           = null;
   //..........................................................
   // @method
   o.construct        = FRs3Geometry_construct;
   o.unserialize      = FRs3Geometry_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Geometry_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Geometry_unserialize(p){
   var o = this;
   // 读取属性
   o._optionInstanced = p.readBoolean();
   o._instanceCount = p.readInt8();
   //o._matrix.Unserialize(pInput);
   //o._outline.Unserialize(pInput);
   o._materialCode = p.readString();
   o._vertexCount = p.readInt32();
   // 读取顶点缓冲
   var vc = p.readInt8();
   for(var n = 0; n < vc; n++){
      var vb = RClass.create(FRs3VertexBuffer);
      vb._vertexCount = o._vertexCount;
      vb.unserialize(p)
      o._vertexBuffers.push(vb);
   }
   // 读取索引缓冲
   var ib = o._indexBuffer = RClass.create(FRs3IndexBuffer);
   ib.unserialize(p);
   // 读取骨头集合
   //var boneCount = p.readInt8();
   //for(var n = 0; n < boneCount; n++){
   //   o._boneIds->Push(pInput->ReadUint8());
   //}
   // 读取跟踪
   //_pTrack->Unserialize(pInput);
   // MO_DEBUG("Unserialize geometry success. (vertex=%d, index=%d, bone=%d, frame=%d)", _vertexBuffer->Count(), _indexBuffer->Count(), boneCount, _pTrack->Frames().Count());
}
