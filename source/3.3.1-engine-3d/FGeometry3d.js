//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FGeometry3d(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   //..........................................................
   // @method
   o.construct         = FGeometry3d_construct;
   o.testVisible       = FGeometry3d_testVisible;
   o.findVertexBuffer  = FGeometry3d_findVertexBuffer;
   o.vertexBuffers     = FGeometry3d_vertexBuffers;
   o.indexBuffer       = FGeometry3d_indexBuffer;
   o.findTexture       = FGeometry3d_findTexture;
   o.textures          = FGeometry3d_textures;
   o.bones             = FGeometry3d_bones;
   o.load              = FGeometry3d_load;
   o.build             = FGeometry3d_build;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FGeometry3d_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FGeometry3d_testVisible(p){
   var o = this;
   var r = o._ready;
   if(!r){
      var d = o._renderable;
      if(d){
         r = o._ready = d.testReady();
      }
   }
   return r;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @return FG3dVertexBuffer 顶点缓冲
//==========================================================
function FGeometry3d_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FGeometry3d_vertexBuffers(){
   return this._renderable.vertexBuffers();
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FGeometry3d_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FGeometry3d_findTexture(p){
   return this._renderable.findTexture(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FGeometry3d_textures(){
   return this._renderable.textures();
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FGeometry3d_bones(p){
   return this._bones;
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Geometry 资源
//==========================================================
function FGeometry3d_load(p){
   var o = this;
   // 获得材质
   var m = o._material;
   var mr = o._materialResource = p.material();
   m.assignInfo(mr.info());
   // 设置属性
   o._effectName = m.info().effectName;
   o._renderable = p;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:animation:FRd3Animation 动画
//==========================================================
function FGeometry3d_build(p){
   var o = this;
   var r = o._renderable;
   // 建立骨头集合
   var rbs = r.boneIds();
   if(rbs){
      var bs = o._bones = new TObjects();
      var c = rbs.length();
      for(var i = 0; i < c; i++){
         var bi = rbs.get(i);
         var b = p.findBone(bi);
         if(b == null){
            throw new TError("Bone is not exists. (bone_id={1})", bi);
         }
         bs.push(b);
      }
   }
}
