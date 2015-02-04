//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150202
//==========================================================
function FE3dMeshRenderable(o){
   o = RClass.inherits(this, o, FG3dRenderable);
   //..........................................................
   // @attribute
   o._display         = null;
   o._modelMatrix     = null;
   o._renderable      = null;
   o._meshAnimation   = null;
   o._activeTrack     = null;
   o._bones           = null;
   //..........................................................
   // @method
   o.construct        = FE3dMeshRenderable_construct;
   // @method
   o.modelMatrix      = FE3dMeshRenderable_modelMatrix;
   o.findVertexBuffer = FE3dMeshRenderable_findVertexBuffer;
   o.vertexCount      = FE3dMeshRenderable_vertexCount;
   o.vertexBuffers    = FE3dMeshRenderable_vertexBuffers;
   o.indexBuffer      = FE3dMeshRenderable_indexBuffer;
   o.findTexture      = FE3dMeshRenderable_findTexture;
   o.textures         = FE3dMeshRenderable_textures;
   o.bones            = FE3dMeshRenderable_bones;
   // @method
   o.update           = FE3dMeshRenderable_update;
   o.process          = FE3dMeshRenderable_process;
   // @method
   o.dispose          = FE3dMeshRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dMeshRenderable_construct(){
   var o = this;
   o.__base.FG3dRenderable.construct.call(o);
   o._modelMatrix = new SMatrix3d();
}

//==========================================================
// <T>获得模型矩阵。</T>
//
// @method
// @return SMatrix3d 模型矩阵
//==========================================================
function FE3dMeshRenderable_modelMatrix(){
   return this._modelMatrix;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @return FG3dVertexBuffer 顶点缓冲
//==========================================================
function FE3dMeshRenderable_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FE3dMeshRenderable_vertexCount(){
   return this._renderable.vertexCount();
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FE3dMeshRenderable_vertexBuffers(){
   return this._renderable.vertexBuffers();
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3dMeshRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3dMeshRenderable_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3dMeshRenderable_textures(){
   return this._textures;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FE3dMeshRenderable_bones(p){
   return this._bones;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dMeshRenderable_update(p){
   var o = this;
   var m = o._matrix;
   var mm = o._modelMatrix
   var dm = o._display.matrix();
   if(o._activeTrack){
      m.assign(o._activeTrack._matrix);
      m.append(mm);
   }else{
      m.assign(mm);
   }
   m.append(dm);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dMeshRenderable_process(p){
   var o = this;
   o.__base.FG3dRenderable.process.call(p)
   var a = o._meshAnimation;
   if(a){
      a.process(o._activeTrack);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dMeshRenderable_dispose(){
   var o = this;
   // 设置属性
   // 释放矩阵
   var v = o._modelMatrix;
   if(v){
      v.dispose();
      o._modelMatrix = null;
   }
   // 父处理
   o.__base.FG3dRenderable.dispose.call(o);
}
