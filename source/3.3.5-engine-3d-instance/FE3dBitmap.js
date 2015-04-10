 //==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dBitmap(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MListenerLoad);
   //..........................................................
   // @attribute
   o._ready        = false;
   o._renderable   = null;
   //..........................................................
   // @method
   o.construct     = FE3dBitmap_construct;
   // @method
   o.testReady     = FE3dBitmap_testReady;
   o.renderable    = FE3dBitmap_renderable;
   o.setRenderable = FE3dBitmap_setRenderable;
   o.processLoad   = FE3dBitmap_processLoad;
   o.process       = FE3dBitmap_process;
   o.loadUrl       = FE3dBitmap_loadUrl;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dBitmap_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FE3dBitmap_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dBitmap 渲染对象
//==========================================================
function FE3dBitmap_renderable(p){
   return this._renderable;
}

//==========================================================
// <T>加载渲染对象。</T>
//
// @param p:renderable:FE3dBitmap 渲染对象
//==========================================================
function FE3dBitmap_setRenderable(p){
   var o = this;
   this._renderable= p;
   o._ready = true;
   // 加载完成
   o.processLoadListener(o);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dBitmap_processLoad(){
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
function FE3dBitmap_process(){
   var o = this;
   o.__base.FE3dMeshRenderable.process.call(o);
}

//==========================================================
// <T>加载位图处理。</T>
//
// @method
//==========================================================
function FE3dBitmap_loadUrl(context, url){
   var o = this;
   o._renderable = RConsole.find(FE3rBitmapConsole).loadUrl(context, url);
}
