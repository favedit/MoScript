//==========================================================
// <T>渲染3D数据流。</T>
//
// @author maocy
// @history 150206
//==========================================================
MO.FE3rStream = function FE3rStream(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   //..........................................................
   // @attribute
   o._resource    = MO.Class.register(o, new MO.AGetter('_resource'));
   o._buffer      = MO.Class.register(o, new MO.AGetter('_buffer'));
   //..........................................................
   // @method
   o.loadResource = MO.FE3rStream_loadResource;
   return o;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param resource:FE3sStream 资源信息
//==========================================================
MO.FE3rStream_loadResource = function FE3rStream_loadResource(resource){
   var o = this;
   // 获得属性
   var code = resource.code();
   var dataCount = resource._dataCount;
   // 设置属性
   o._resource = resource;
   o._vertexCount = dataCount;
   // 创建顶点缓冲
   var buffer = o._buffer = o._graphicContext.createVertexBuffer(FE3rVertexBuffer);
   buffer.setCode(code);
   buffer.setResource(resource);
   switch(code){
      case "bone_index":
         buffer.setFormatCd(EG3dAttributeFormat.Byte4);
         break;
      case "bone_weight":
         buffer.setFormatCd(EG3dAttributeFormat.Byte4Normal);
         break;
      default:
         throw new MO.TError("Unknown code");
   }
   buffer.upload(resource._data, resource._dataStride, dataCount);
}
