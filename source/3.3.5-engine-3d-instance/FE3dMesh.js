 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dMesh(o){
   o = RClass.inherits(this, o, FE3dDisplay, MListenerLoad);
   //..........................................................
   // @attribute
   o._ready         = false;
   o._resource      = null;
   o._renderable    = null;
   //..........................................................
   // @method
   o.testReady      = FE3dMesh_testReady;
   o.resource       = FE3dMesh_resource;
   o.setResource    = FE3dMesh_setResource;
   o.loadRenderable = FE3dMesh_loadRenderable;
   o.processLoad    = FE3dMesh_processLoad;
   o.process        = FE3dMesh_process;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FE3dMesh_testReady(){
   return this._ready;
}

//==========================================================
// <T>获得资源。</T>
//
// @return FE3sModel 资源
//==========================================================
function FE3dMesh_resource(){
   return this._resource;
}

//==========================================================
// <T>设置资源。</T>
//
// @param p:resource:FE3sModel 资源
//==========================================================
function FE3dMesh_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dMesh 渲染对象
//==========================================================
function FE3dMesh_loadRenderable(p){
   var o = this;
   var m = RClass.create(FE3dMeshRenderable);
   m._renderable = p;
   var vbs = p._vertexBuffers;
   var vbc = vbs.count();
   for(var i = 0; i < vbc; i++){
      var vb = vbs.getAt(i);
      m._vertexBuffers.set(vb._name, vb);
   }
   m._indexBuffer = p._indexBuffer;
   o.pushRenderable(m);
   o._ready = true;
   // 加载完成
   o.processLoadListener(o);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dMesh_processLoad(){
   var o = this;
   if(!o._renderable.testReady()){
      return false;
   }
   o.loadRenderable(o._renderable);
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dMesh_process(){
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
}
