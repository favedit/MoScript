 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dMesh = function FE3dMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MLinkerResource, MO.MListenerLoad);
   //..........................................................
   // @attribute
   o._ready         = false;
   o._display       = null;
   o._renderable    = null;
   o._layer         = null;
   //..........................................................
   // @method
   o.construct      = MO.FE3dMesh_construct;
   // @method
   o.testReady      = MO.FE3dMesh_testReady;
   o.loadRenderable = MO.FE3dMesh_loadRenderable;
   o.processLoad    = MO.FE3dMesh_processLoad;
   o.process        = MO.FE3dMesh_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dMesh_construct = function FE3dMesh_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   // 创建显示层
   var l = o._layer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('Layer', l);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
MO.FE3dMesh_testReady = function FE3dMesh_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dMesh 渲染对象
//==========================================================
MO.FE3dMesh_loadRenderable = function FE3dMesh_loadRenderable(p){
   var o = this;
   var resource = p.resource();
   // 加载技术
   var technique = o.selectTechnique(o, FE3dGeneralTechnique);
   technique.setResource(resource.technique());
   // 加载资源
   o.loadResource(resource);
   // 创建渲染对象
   var m = MO.Class.create(MO.FE3dMeshRenderable);
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
   var display = o._display = MO.Class.create(MO.FE3dMeshDisplay);
   display._renderable = m;
   display.load(resource._display);
   display.pushRenderable(m);
   o._layer.pushDisplay(display);
   // 加载完成
   o._ready = true;
   o.processLoadListener(o);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dMesh_processLoad = function FE3dMesh_processLoad(){
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
MO.FE3dMesh_process = function FE3dMesh_process(){
   var o = this;
   o.__base.FE3dSpace.process.call(o);
}
