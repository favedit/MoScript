//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FNetRd3ModelMesh(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._resource         = null;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._boneIds          = null;
   o._textures         = null;
   //..........................................................
   // @method
   o.construct         = FNetRd3ModelMesh_construct;
   o.testReady         = FNetRd3ModelMesh_testReady;
   o.vertexCount       = FNetRd3ModelMesh_vertexCount;
   o.findVertexBuffer  = FNetRd3ModelMesh_findVertexBuffer;
   o.vertexBuffers     = FNetRd3ModelMesh_vertexBuffers;
   o.indexBuffer       = FNetRd3ModelMesh_indexBuffer;
   o.material          = FNetRd3ModelMesh_material;
   o.findTexture       = FNetRd3ModelMesh_findTexture;
   o.textures          = FNetRd3ModelMesh_textures;
   o.boneIds           = FNetRd3ModelMesh_boneIds;
   o.loadResource      = FNetRd3ModelMesh_loadResource;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FNetRd3ModelMesh_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
function FNetRd3ModelMesh_testReady(){
   var o = this;
   if(!o._ready){
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
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FNetRd3ModelMesh_vertexCount(){
   return this._vertexCount;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FNetRd3ModelMesh_findVertexBuffer(p){
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
function FNetRd3ModelMesh_vertexBuffers(){
   return this._vertexBuffers;
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FNetRd3ModelMesh_indexBuffer(){
   return this._indexBuffer;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FRsMaterial 材质
//==========================================================
function FNetRd3ModelMesh_material(){
   return this._material;
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FG3dIndexBuffer 纹理
//==========================================================
function FNetRd3ModelMesh_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FNetRd3ModelMesh_textures(){
   return this._textures;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TArray 骨头集合
//==========================================================
function FNetRd3ModelMesh_boneIds(p){
   return this._boneIds;
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Geometry 资源
//==========================================================
function FNetRd3ModelMesh_loadResource(p){
   var o = this;
   var c = o._context;
   o._resource = p;
   // 创建顶点缓冲集合
   var rss = p.streams();
   var rsc = rss.count();
   for(var i = 0; i < rsc; i++){
      var rs = rss.get(i);
      var rc = rs._code;
      if((rc == 'index16') || (rc == 'index32')){
         // 创建索引缓冲
         var b = o._indexBuffer = c.createIndexBuffer();
         b.upload(rs._data, rs._dataCount * 3);
      }else{
         // 创建顶点缓冲
         var b = c.createVertexBuffer();
         b._name = rc;
         o._vertexCount = rs._dataCount;
         switch(rc){
            case "position":
               b._formatCd = EG3dAttributeFormat.Float3;
               break;
            case "coord":
               b._formatCd = EG3dAttributeFormat.Float2;
               break;
            case "normal":
            case "binormal":
            case "tangent":
               b._formatCd = EG3dAttributeFormat.Byte4Normal;
               break;
            default:
               throw new TError("Unknown code");
         }
         b.upload(rs._data, rs._dataStride, rs._dataCount);
         o._vertexBuffers.push(b);
      }
   }
}
