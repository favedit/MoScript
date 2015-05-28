 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dModel(o){
   o = RClass.inherits(this, o, FE3dSpace, MPoolAble, MLinkerResource, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady     = false;
   // @attribute
   o._renderable    = null;
   o._display       = null;
   //..........................................................
   // @method
   o.construct      = FE3dModel_construct;
   // @method
   o.display        = FE3dModel_display;
   // @method
   o.testReady      = FE3dModel_testReady;
   o.renderable     = FE3dModel_renderable;
   o.setRenderable  = FE3dModel_setRenderable;
   o.loadRenderable = FE3dModel_loadRenderable;
   o.processLoad    = FE3dModel_processLoad;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dModel_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
   // 创建显示层
   var layer = o._layer = RClass.create(FDisplayLayer);
   o.registerLayer('sprite', layer);
   // 创建显示对象
   var display = o._display = RClass.create(FE3dModelDisplay);
   layer.pushDisplay(display);
}

//==========================================================
// <T>获得显示对象。</T>
//
// @method
// @return FE3dModelDisplay 显示对象
//==========================================================
function FE3dModel_display(){
   return this._display;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
function FE3dModel_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>获得渲染对象。</T>
//
// @method
// @return 渲染对象
//==========================================================
function FE3dModel_renderable(){
   return this._renderable;
}

//==========================================================
// <T>设置渲染对象。</T>
//
// @method
// @param renderable 渲染对象
//==========================================================
function FE3dModel_setRenderable(renderable){
   this._renderable = renderable;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param renderable:FE3rModel 渲染对象
//==========================================================
function FE3dModel_loadRenderable(renderable){
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
function FE3dModel_processLoad(){
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
