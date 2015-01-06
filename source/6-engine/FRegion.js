//==========================================================
// <T>渲染可绘制对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRegion(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._renderables = null;
   //..........................................................
   // @method
   o.construct      = FRegion_construct;
   o.renderables    = FRegion_renderables;
   o.pushRenderable = FRegion_pushRenderable;
   o.clear          = FRegion_clear;
   o.dispose        = FRegion_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = RClass.create(FRenderables);
}

//==========================================================
// <T>获得渲染对象集合。</T>
//
// @return FRenderables 渲染对象集合
//==========================================================
function FRegion_renderables(p){
   return this._renderables;
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FRegion_pushRenderable(p){
   this._renderables.push(p);
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
function FRegion_clear(){
   this._renderables.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRegion_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
