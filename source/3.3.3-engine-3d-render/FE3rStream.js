//==========================================================
// <T>渲染3D数据流。</T>
//
// @author maocy
// @history 150206
//==========================================================
function FE3rStream(o){
   o = RClass.inherits(this, o, FE3rObject);
   //..........................................................
   // @attribute
   o._buffer      = null;
   o._resource    = null;
   //..........................................................
   // @method
   o.resource     = FE3rStream_resource;
   o.buffer       = FE3rStream_buffer;
   // @method
   o.loadResource = FE3rStream_loadResource;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FE3rStream_resource(){
   return this._resource;
}

//==========================================================
// <T>获得缓冲。</T>
//
// @return FG3dVertexBuffer 缓冲
//==========================================================
function FE3rStream_buffer(){
   return this._buffer;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param p:resource:FRsModel 资源信息
//==========================================================
function FE3rStream_loadResource(p){
   var o = this;
   // 设置属性
   var c = p._code;
   o._resource = p;
   o._vertexCount = p._dataCount;
   // 创建顶点缓冲
   var b = o._buffer = o._graphicContext.createVertexBuffer();
   b._name = c;
   b._resource = p;
   switch(c){
      case "bone_index":
         b._formatCd = EG3dAttributeFormat.Byte4;
         break;
      case "bone_weight":
         b._formatCd = EG3dAttributeFormat.Byte4Normal;
         break;
      default:
         throw new TError("Unknown code");
   }
   b.upload(p._data, p._dataStride, p._dataCount);
}
