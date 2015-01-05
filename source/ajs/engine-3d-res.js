function FRs3Geometry(o){
   o = RClass.inherits(this, o, FObject);
   o._optionInstanced = false;
   o._instanceCount   = 0;
   o._materialCode    = null;
   o._vertexCount     = 0;
   o._indexCount      = 0;
   o._vertexBuffers   = null;
   o._indexBuffer     = null;
   o._boneIds         = null;
   o._track           = null;
   o.construct        = FRs3Geometry_construct;
   o.unserialize      = FRs3Geometry_unserialize;
   return o;
}
function FRs3Geometry_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}
function FRs3Geometry_unserialize(p){
   var o = this;
   o._optionInstanced = p.readBoolean();
   o._instanceCount = p.readInt8();
   o._materialCode = p.readString();
   o._vertexCount = p.readInt32();
   var vc = p.readInt8();
   for(var n = 0; n < vc; n++){
      var vb = RClass.create(FRs3VertexBuffer);
      vb._vertexCount = o._vertexCount;
      vb.unserialize(p)
      o._vertexBuffers.push(vb);
   }
   var ib = o._indexBuffer = RClass.create(FRs3IndexBuffer);
   ib.unserialize(p);
}
function FRs3IndexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._count       = null;
   o._strideCd    = ERenderIndexStride.Unknown;
   o._data        = null;
   o.unserialize  = FRs3IndexBuffer_unserialize;
   return o;
}
function FRs3IndexBuffer_unserialize(p){
   var o = this;
   var c = o._count = p.readInt32();
   o._strideCd = p.readInt8();
   o._data = new ArrayBuffer(2 * c);
   var w = new Uint16Array(o._data);
   for(var i = 0; i < c; i++){
      w[i] = p.readUint16();
   }
}
function FRs3Model(o){
   o = RClass.inherits(this, o, FRs3Resource);
   o._geometrys  = null;
   o._skeleton   = null;
   o._animation  = null;
   o.construct   = FRs3Model_construct;
   o.geometrys   = FRs3Model_geometrys;
   o.unserialize = FRs3Model_unserialize;
   return o;
}
function FRs3Model_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._geometrys = new TObjects();
}
function FRs3Model_geometrys(){
   return this._geometrys;
}
function FRs3Model_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   var gc = p.readInt16();
   for(var n = 0; n < gc; n++){
      var g = RClass.create(FRs3Geometry);
      g.unserialize(p);
      o._geometrys.push(g);
   }
}
function FRs3Resource(o){
   o = RClass.inherits(this, o, FResource);
   o._contentLength = 0;
   o.unserialize    = FRs3Resource_unserialize;
   return o;
}
function FRs3Resource_unserialize(p){
   this._name = p.readString();
}
function FRs3VertexBuffer(o){
   o = RClass.inherits(this, o, FObject);
   o._geometry    = null;
   o._name        = null;
   o._formatCd    = ERenderAttributeFormat.Unknown;
   o._vertexCount = 0;
   o._stride      = 0;
   o._data        = null;
   o.unserialize  = FRs3VertexBuffer_unserialize;
   return o;
}
function FRs3VertexBuffer_unserialize(p){
   var o = this;
   o._name = p.readString();
   o._formatCd = p.readInt8();
   o._stride = p.readInt8();
   var c = o._vertexCount;
   var t = o._stride * c;
   o._data = new ArrayBuffer(t);
   var w = new Uint8Array(o._data);
   for(var i = 0; i < t; i++){
      w[i] = p.readUint8();
   }
}
