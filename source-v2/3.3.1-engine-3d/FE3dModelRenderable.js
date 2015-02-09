//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FE3dModelRenderable(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   //..........................................................
   // @method
   o.construct         = FE3dModelRenderable_construct;
   o.testVisible       = FE3dModelRenderable_testVisible;
   o.vertexCount       = FE3dModelRenderable_vertexCount;
   o.findVertexBuffer  = FE3dModelRenderable_findVertexBuffer;
   o.vertexBuffers     = FE3dModelRenderable_vertexBuffers;
   o.indexBuffer       = FE3dModelRenderable_indexBuffer;
   o.findTexture       = FE3dModelRenderable_findTexture;
   o.textures          = FE3dModelRenderable_textures;
   o.bones             = FE3dModelRenderable_bones;
   o.load              = FE3dModelRenderable_load;
   o.build             = FE3dModelRenderable_build;
   o.update            = FE3dModelRenderable_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dModelRenderable_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FE3dModelRenderable_testVisible(p){
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
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FE3dModelRenderable_vertexCount(){
   return this._renderable.vertexCount();
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @return FG3dVertexBuffer 顶点缓冲
//==========================================================
function FE3dModelRenderable_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FE3dModelRenderable_vertexBuffers(){
   return this._renderable.vertexBuffers();
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3dModelRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3dModelRenderable_findTexture(p){
   return this._renderable.findTexture(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3dModelRenderable_textures(){
   return this._renderable.textures();
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FE3dModelRenderable_bones(p){
   return this._bones;
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Geometry 资源
//==========================================================
function FE3dModelRenderable_load(p){
   var o = this;
   // 获得材质
   var m = o._material;
   var mr = o._materialResource = p.material();
   if(mr){
      m.assignInfo(mr.info());
   }
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
function FE3dModelRenderable_build(p){
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

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dModelRenderable_update(p){
   var o = this;
   var m = o._display.matrix();
   o._matrix.assign(m);
}
