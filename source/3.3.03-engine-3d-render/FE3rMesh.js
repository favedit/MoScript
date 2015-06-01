with(MO){
   //==========================================================
   // <T>渲染模型网格。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3rMesh = function FE3rMesh(o){
      o = RClass.inherits(this, o, FE3rObject);
      //..........................................................
      // @attribute
      o._ready            = false;
      o._resource         = null;
      o._vertexCount      = 0;
      o._vertexBuffers    = null;
      o._indexBuffer      = null;
      o._resourceMaterial = null;
      o._material         = null;
      o._textures         = null;
      //..........................................................
      // @method
      o.construct         = FE3rMesh_construct;
      // @method
      o.testReady         = FE3rMesh_testReady;
      // @method
      o.resource          = FE3rMesh_resource;
      o.setResource       = FE3rMesh_setResource;
      o.vertexCount       = FE3rMesh_vertexCount;
      o.findVertexBuffer  = FE3rMesh_findVertexBuffer;
      o.vertexBuffers     = FE3rMesh_vertexBuffers;
      o.indexBuffer       = FE3rMesh_indexBuffer;
      o.material          = FE3rMesh_material;
      o.findTexture       = FE3rMesh_findTexture;
      o.textures          = FE3rMesh_textures;
      // @method
      o.resource          = FE3rMesh_resource;
      o.loadResource      = FE3rMesh_loadResource;
      o.processLoad       = FE3rMesh_processLoad;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rMesh_construct = function FE3rMesh_construct(){
      var o = this;
      o.__base.FE3rObject.construct.call(o);
      o._vertexBuffers = new TObjects();
   }

   //==========================================================
   // <T>测试是否加载完成。</T>
   //
   // @method
   // @return 是否完成
   //==========================================================
   MO.FE3rMesh_testReady = function FE3rMesh_testReady(){
      var o = this;
      if(!o._ready){
         // 测试资源是否加载完成
         if(!o._resource.testReady()){
            return false;
         }
         // 测试所有位图加载好
         var ts = o._textures;
         if(ts != null){
            var c = ts.count();
            for(var i = 0; i < c; i++){
               var t = ts.value(i);
               if(!t.testReady()){
                  return false;
               }
            }
         }
         // 加载完成
         //o._ready = true;
      }
      return o._ready;
   }

   //==========================================================
   // <T>获得唯一编号。</T>
   //
   // @method
   // @return String 唯一编号
   //==========================================================
   MO.FE3rMesh_guid = function FE3rMesh_guid(){
      return this._resource.guid();
   }

   //==========================================================
   // <T>获得资源。</T>
   //
   // @return FE3sModel 资源
   //==========================================================
   MO.FE3rMesh_resource = function FE3rMesh_resource(){
      return this._resource;
   }

   //==========================================================
   // <T>设置资源。</T>
   //
   // @param p:resource:FE3sModel 资源
   //==========================================================
   MO.FE3rMesh_setResource = function FE3rMesh_setResource(p){
      this._resource = p;
   }

   //==========================================================
   // <T>获得顶点总数。</T>
   //
   // @method
   // @return Integer 顶点总数
   //==========================================================
   MO.FE3rMesh_vertexCount = function FE3rMesh_vertexCount(){
      return this._vertexCount;
   }

   //==========================================================
   // <T>查找顶点缓冲。</T>
   //
   // @method
   // @param p:name:String 名称
   //==========================================================
   MO.FE3rMesh_findVertexBuffer = function FE3rMesh_findVertexBuffer(p){
      var o = this;
      var vs = o._vertexBuffers;
      var c = vs.count();
      for(var n = 0; n < c; n++){
         var v = vs.get(n);
         if(v.name() == p){
            return v;
         }
      }
      return null;
   }

   //==========================================================
   // <T>获得顶点缓冲集合。</T>
   //
   // @method
   // @return TObjects 顶点缓冲集合
   //==========================================================
   MO.FE3rMesh_vertexBuffers = function FE3rMesh_vertexBuffers(){
      return this._vertexBuffers;
   }

   //==========================================================
   // <T>获得索引缓冲。</T>
   //
   // @method
   // @return FG3dIndexBuffer 索引缓冲
   //==========================================================
   MO.FE3rMesh_indexBuffer = function FE3rMesh_indexBuffer(){
      return this._indexBuffer;
   }

   //==========================================================
   // <T>获得材质。</T>
   //
   // @method
   // @return FRsMaterial 材质
   //==========================================================
   MO.FE3rMesh_material = function FE3rMesh_material(){
      return this._material;
   }

   //==========================================================
   // <T>根据名称查找纹理。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FG3dIndexBuffer 纹理
   //==========================================================
   MO.FE3rMesh_findTexture = function FE3rMesh_findTexture(p){
      return this._textures.get(p);
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return TDictionary 纹理集合
   //==========================================================
   MO.FE3rMesh_textures = function FE3rMesh_textures(){
      return this._textures;
   }

   //==========================================================
   // <T>获得资源。</T>
   //
   // @method
   // @return FE3sMesh 资源
   //==========================================================
   MO.FE3rMesh_resource = function FE3rMesh_resource(){
      return this._resource;
   }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @param resource:FE3sGeometry 资源
   //==========================================================
   MO.FE3rMesh_loadResource = function FE3rMesh_loadResource(resource){
      var o = this;
      var context = o._graphicContext;
      // 设置属性
      o._resource = resource;
      // 创建顶点缓冲集合
      var streamResources = resource.streams();
      var streamCount = streamResources.count();
      for(var i = 0; i < streamCount; i++){
         var streamResource = streamResources.get(i);
         var code = streamResource._code;
         var dataCount = streamResource._dataCount;
         var data = streamResource._data;
         if((code == 'index16') || (code == 'index32')){
            // 创建索引缓冲
            var buffer = o._indexBuffer = context.createIndexBuffer();
            buffer._resource = streamResource;
            var dataCd = streamResource.elementDataCd();
            if(dataCd == EDataType.Uint16){
               buffer._strideCd = EG3dIndexStride.Uint16;
            }else if(dataCd == EDataType.Uint32){
               buffer._strideCd = EG3dIndexStride.Uint32;
            }else{
               throw new TError(o, "Unknown data type.");
            }
            buffer.upload(data, 3 * dataCount);
         }else{
            // 创建顶点缓冲
            var buffer = context.createVertexBuffer();
            buffer._name = code;
            buffer._resource = streamResource;
            buffer._vertexCount = dataCount;
            var pixels = null;
            switch(code){
               case "position":
                  pixels = new Float32Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Float3;
                  break;
               case "coord":
                  pixels = new Float32Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Float2;
                  break;
               case "color":
                  pixels = new Uint8Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
                  break;
               case "normal":
               case "binormal":
               case "tangent":
                  pixels = new Uint8Array(data);
                  buffer._formatCd = EG3dAttributeFormat.Byte4Normal;
                  break;
               default:
                  throw new TError(o, "Unknown code");
            }
            buffer.upload(pixels, streamResource._dataStride, dataCount);
            o._vertexBuffers.push(buffer);
         }
      }
      o._ready = true;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3rMesh_processLoad = function FE3rMesh_processLoad(){
      var o = this;
      // 检查数据已加载
      if(o._dataReady){
         return true;
      }
      // 检查资源是否准备好
      if(!o._resource.testReady()){
         return false;
      }
      // 加载资源
      o.loadResource(o._resource);
      return true;
   }
}
