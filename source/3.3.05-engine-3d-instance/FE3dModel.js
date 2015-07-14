 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dModel = function FE3dModel(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MPoolAble, MO.MLinkerResource, MO.MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady     = false;
   // @attribute
   o._display       = MO.Class.register(o, new MO.AGetter('_display'));
   o._renderable    = MO.Class.register(o, new MO.AGetSet('_renderable'));
   //..........................................................
   // @method
   o.construct      = MO.FE3dModel_construct;
   // @method
   o.testReady      = MO.FE3dModel_testReady;
   o.loadRenderable = MO.FE3dModel_loadRenderable;
   o.processLoad    = MO.FE3dModel_processLoad;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dModel_construct = function FE3dModel_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   // 创建显示层
   var layer = o._layer = MO.Class.create(MO.FDisplayLayer);
   o.registerLayer('sprite', layer);
   // 创建显示对象
   var display = o._display = MO.Class.create(MO.FE3dModelDisplay);
   layer.pushDisplay(display);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.FE3dModel_testReady = function FE3dModel_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param renderable:FE3rModel 渲染对象
//==========================================================
MO.FE3dModel_loadRenderable = function FE3dModel_loadRenderable(renderable){
   var o = this;
   o._renderable = renderable;
   var resource = renderable.resource();
   // 选择技术
   o.selectTechnique(o, FE3dGeneralTechnique);
   // 加载资源
   o.loadResource(resource);
   // 创建渲染对象
   o._display.load(renderable);
   // 数据准备完成
   o._dataReady = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dModel_processLoad = function FE3dModel_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   var renderable = o._renderable;
   if(!renderable.testReady()){
      return false;
   }
   o.loadRenderable(renderable);
   // 加载完成
   o.processLoadListener(o);
   return true;
}
