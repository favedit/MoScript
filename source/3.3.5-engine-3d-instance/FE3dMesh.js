 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dMesh(o){
   o = RClass.inherits(this, o, FE3dSpace, MLinkerResource, MListenerLoad);
   //..........................................................
   // @attribute
   o._ready         = false;
   o._display       = null;
   o._renderable    = null;
   o._layer         = null;
   //..........................................................
   // @method
   o.construct      = FE3dMesh_construct;
   // @method
   o.testReady      = FE3dMesh_testReady;
   o.loadRenderable = FE3dMesh_loadRenderable;
   o.processLoad    = FE3dMesh_processLoad;
   o.process        = FE3dMesh_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dMesh_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   // 创建显示层
   var l = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('Layer', l);
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
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dMesh 渲染对象
//==========================================================
function FE3dMesh_loadRenderable(p){
   var o = this;
   o.selectTechnique(o, FE3dGeneralTechnique);
   // 加载资源
   var resource = p.resource();
   o.loadResource(p.resource());
   // 创建渲染对象
   var m = RClass.create(FE3dMeshRenderable);
   m.setResource(resource._renderable);
   m._material.loadResource(resource._display._material);
   m._renderable = p;
   var vbs = p._vertexBuffers;
   var vbc = vbs.count();
   for(var i = 0; i < vbc; i++){
      var vb = vbs.getAt(i);
      m._vertexBuffers.set(vb._name, vb);
   }
   m._indexBuffer = p._indexBuffer;
   m.matrix().assign(m.resource().matrix());
   // 创建渲染对象
   var display = o._display = RClass.create(FE3dMeshDisplay);
   display._renderable = m;
   display.load(resource._display);
   display.pushRenderable(m);
   o._layer.pushDisplay(display);
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
   o.__base.FE3dSpace.process.call(o);
}
