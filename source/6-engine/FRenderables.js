//==========================================================
// <T>渲染可绘制对象集合。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRenderables(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._renderables = null;
   //..........................................................
   // @method
   o.construct    = FRenderables_construct;
   o.count        = FRenderables_count;
   o.get          = FRenderables_get;
   o.push         = FRenderables_push;
   o.clear        = FRenderables_clear;
   o.dispose      = FRenderables_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRenderables_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = new TObjects();
}

//==========================================================
// <T>获得总数。</T>
//
// @method
// @return Integer 总数
//==========================================================
function FRenderables_count(p){
   return this._renderables.count();
}

//==========================================================
// <T>获得一个渲染对象。</T>
//
// @return FRenderable 渲染对象
//==========================================================
function FRenderables_get(p){
   return this._renderables.get(p);
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FRenderables_push(p){
   this._renderables.push(p);
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
function FRenderables_clear(){
   this._renderables.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRenderables_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
