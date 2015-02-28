//==========================================================
// <T>渲染3D数据流。</T>
//
// @author maocy
// @history 150206
//==========================================================
function FRd3Stream(o){
   o = RClass.inherits(this, o, FRd3Object);
   //..........................................................
   // @attribute
   o._buffer      = null;
   o._resource    = null;
   //..........................................................
   // @method
   o.resource     = FRd3Stream_resource;
   o.buffer       = FRd3Stream_buffer;
   // @method
   o.loadResource = FRd3Stream_loadResource;
   return o;
}

//==========================================================
// <T>获得名称。</T>
//
// @return String 名称
//==========================================================
function FRd3Stream_resource(){
   return this._resource;
}

//==========================================================
// <T>获得缓冲。</T>
//
// @return FG3dVertexBuffer 缓冲
//==========================================================
function FRd3Stream_buffer(){
   return this._buffer;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param p:resource:FRsModel 资源信息
//==========================================================
function FRd3Stream_loadResource(p){
   var o = this;
   // 设置属性
   var c = p._code;
   o._resource = p;
   o._vertexCount = p._dataCount;
   // 创建顶点缓冲
   var b = o._buffer = o._graphicContext.createVertexBuffer();
   b._name = c;
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
