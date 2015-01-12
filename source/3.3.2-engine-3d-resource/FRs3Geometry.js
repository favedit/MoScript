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
   o._matrix          = null;
   o._outline         = null;
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
   o.materialCode     = FRs3Geometry_materialCode;
   o.findVertexBuffer = FRs3Geometry_findVertexBuffer;
   o.vertexBuffers    = FRs3Geometry_vertexBuffers;
   o.indexBuffer      = FRs3Geometry_indexBuffer;
   o.boneIds          = FRs3Geometry_boneIds;
   o.track            = FRs3Geometry_track;
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
   o._matrix = new SMatrix3d();
   o._outline = new SOutline3();
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>获得材质代码。</T>
//
// @method
// @return String 材质代码
//==========================================================
function FRs3Geometry_materialCode(){
   return this._materialCode;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FRs3Geometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   if(vs){
      var c = vs.count();
      for(var n = 0; n < c; n++){
         var v = vs.get(n);
         if(v.name() == p){
            return v;
         }
      }
   }
   return null;
}

//==========================================================
// <T>获得顶点缓冲集合</T>
//
// @method
// @return 顶点缓冲集合
//==========================================================
function FRs3Geometry_vertexBuffers(){
   return this._vertexBuffers;
}

//==========================================================
// <T>获得索引缓冲集合</T>
//
// @method
// @return 索引缓冲集合
//==========================================================
function FRs3Geometry_indexBuffer(){
   return this._indexBuffer;
}

//==========================================================
// <T>获得骨头编号集合。</T>
//
// @method
// @return TArray 骨头编号集合
//==========================================================
function FRs3Geometry_boneIds(){
   return this._boneIds;
}

//==========================================================
// <T>获得跟踪。</T>
//
// @method
// @return FRsTrack 跟踪
//==========================================================
function FRs3Geometry_track(){
   return this._track;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Geometry_unserialize(p){
   var o = this;
   // 读取属性
   o._optionInstanced = p.readBoolean();
   o._instanceCount = p.readInt8();
   o._matrix.unserialize(p);
   o._outline.unserialize(p);
   // 读取材质代码
   o._materialCode = p.readString();
   // 读取顶点缓冲
   o._vertexCount = p.readInt32();
   var vc = p.readInt8();
   if(vc > 0){
      var vs = o._vertexBuffers = new TObjects();
      for(var i = 0; i < vc; i++){
         var vb = RClass.create(FRs3VertexBuffer);
         vb._vertexCount = o._vertexCount;
         vb.unserialize(p)
         vs.push(vb);
      }
   }
   // 读取索引缓冲
   var ib = o._indexBuffer = RClass.create(FRs3IndexBuffer);
   ib.unserialize(p);
   // 读取骨头集合
   var bc = p.readInt8();
   if(bc > 0){
      var bs = o._boneIds = new TArray();
      for(var i = 0; i < bc; i++){
         bs.push(p.readUint8());
      }
   }
   // 读取跟踪
   if(p.readBoolean()){
      var k = o._track = RClass.create(FRs3Track);
      k.unserialize(p);
   }
}
