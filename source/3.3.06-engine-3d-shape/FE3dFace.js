 //==========================================================
// <T>渲染平面。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dFace = function FE3dFace(o){
   o = MO.Class.inherits(this, o, MO.FE3dMeshRenderable, MO.MListener);
   //..........................................................
   // @attribute
   o._ready           = false;
   o._size            = MO.Class.register(o, new MO.AGetter('_size'));
   o._loadListeners   = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   // @attribute
   o._statusDirty     = true;
   //..........................................................
   // @method
   o.construct        = MO.FE3dFace_construct;
   // @method
   o.setSize          = MO.FE3dFace_setSize;
   o.setData          = MO.FE3dFace_setData;
   // @method
   o.findVertexBuffer = MO.FE3dFace_findVertexBuffer;
   o.vertexBuffers    = MO.FE3dFace_vertexBuffers;
   o.findTexture      = MO.FE3dFace_findTexture;
   o.textures         = MO.FE3dFace_textures;
   o.material         = MO.FE3dFace_material;
   // @method
   o.dirty            = MO.FE3dFace_dirty;
   o.processLoad      = MO.FE3dFace_processLoad;
   o.process          = MO.FE3dFace_process;
   // @method
   o.dispose          = MO.FE3dFace_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dFace_construct = function FE3dFace_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
   // 设置属性
   o._size = new MO.SSize2();
}

//==========================================================
// <T>设置大小。</T>
//
// @param width:Number 宽度
// @param height:Number 高度
//==========================================================
MO.FE3dFace_setSize = function FE3dFace_setSize(width, height){
   var o = this;
   o._size.set(width, height);
   o._matrix.setScale(width, height, 1);
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param data:FE3dFaceData 渲染对象
//==========================================================
MO.FE3dFace_setData = function FE3dFace_setData(data){
   var o = this;
   o._renderable = data;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
MO.FE3dFace_findVertexBuffer = function FE3dFace_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
MO.FE3dFace_vertexBuffers = function FE3dFace_vertexBuffers(){
   return this._renderable.vertexBuffers();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
MO.FE3dFace_findTexture = function FE3dFace_findTexture(p){
   return this._renderable.findTexture(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
MO.FE3dFace_textures = function FE3dFace_textures(){
   return this._renderable.textures();
}

//==========================================================
// <T>查找材质。</T>
//
// @method
// @return FE3dMaterial 材质
//==========================================================
MO.FE3dFace_material = function FE3dFace_material(){
   return this._renderable.material();
}

//==========================================================
// <T>脏处理。</T>
//
// @method
//==========================================================
MO.FE3dFace_dirty = function FE3dFace_dirty(){
   this._statusDirty = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dFace_processLoad = function FE3dFace_processLoad(){
   var o = this;
   //if(!o._renderable.testReady()){
   //   return false;
   //}
   //o.loadRenderable(o._renderable);
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dFace_process = function FE3dFace_process(){
   var o = this;
   o.__base.FE3dMeshRenderable.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dFace_dispose = function FE3dFace_dispose(){
   var o = this;
   // 清空属性
   o._material = RObject.dispoe(o._material);
   // 父处理
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
