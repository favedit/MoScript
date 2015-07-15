//==========================================================
// <T>动态渲染对象。</T>
//
// @author maocy
// @history 150715
//==========================================================
MO.ME3dDynamicRenderable = function ME3dDynamicRenderable(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   //..........................................................
   // @method
   o.construct = MO.ME3dDynamicRenderable_construct;
   // @method
   o.dispose   = MO.ME3dDynamicRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.ME3dDynamicRenderable_construct = function ME3dDynamicRenderable_construct(){
   var o = this;
   // 设置属性
   o._color = new MO.SColor4(1, 1, 1, 1);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.ME3dDynamicRenderable_dispose = function ME3dDynamicRenderable_dispose(){
   var o = this;
   // 设置属性
   o._color = MO.Lang.Object.dispose(o._color);
}
