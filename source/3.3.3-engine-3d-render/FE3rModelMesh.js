//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rModelMesh(o){
   o = RClass.inherits(this, o, FE3rMesh);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._vertexCount      = 0;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._material         = null;
   o._skins            = null;
   o._boneIds          = null;
   o._textures         = null;
   //..........................................................
   // @method
   o.construct         = FE3rModelMesh_construct;
   // @method
   o.testReady         = FE3rModelMesh_testReady;
   // @method
   o.guid              = FE3rModelMesh_guid;
   o.vertexCount       = FE3rModelMesh_vertexCount;
   o.findVertexBuffer  = FE3rModelMesh_findVertexBuffer;
   o.vertexBuffers     = FE3rModelMesh_vertexBuffers;
   o.indexBuffer       = FE3rModelMesh_indexBuffer;
   o.material          = FE3rModelMesh_material;
   o.skins             = FE3rModelMesh_skins;
   o.pushSkin          = FE3rModelMesh_pushSkin;
   o.findTexture       = FE3rModelMesh_findTexture;
   o.textures          = FE3rModelMesh_textures;
   o.boneIds           = FE3rModelMesh_boneIds;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rModelMesh_construct(){
   var o = this;
   o.__base.FE3rMesh.construct.call(o);
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
function FE3rModelMesh_testReady(){
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
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3rModelMesh_guid(){
   return this._resource.guid();
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FE3rModelMesh_vertexCount(){
   return this._vertexCount;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FE3rModelMesh_findVertexBuffer(p){
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
function FE3rModelMesh_vertexBuffers(){
   return this._vertexBuffers;
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3rModelMesh_indexBuffer(){
   return this._indexBuffer;
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FRsMaterial 材质
//==========================================================
function FE3rModelMesh_material(){
   return this._material;
}

//==========================================================
// <T>获得渲染蒙皮集合。</T>
//
// @method
// @return TObjects<FE3rSkin> 渲染蒙皮集合
//==========================================================
function FE3rModelMesh_skins(){
   return this._skins;
}

//==========================================================
// <T>增加一个蒙皮。</T>
//
// @method
// @return FE3rSkin 蒙皮
//==========================================================
function FE3rModelMesh_pushSkin(p){
   var o = this;
   var r = o._skins;
   if(!r){
      r = o._skins = new TObjects();
   }
   r.push(p);
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FG3dIndexBuffer 纹理
//==========================================================
function FE3rModelMesh_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3rModelMesh_textures(){
   return this._textures;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TArray 骨头集合
//==========================================================
function FE3rModelMesh_boneIds(p){
   return this._boneIds;
}
