//==========================================================
// <T>WebGL渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
function FWglLayout(o){
   o = RClass.inherits(this, o, FG3dLayout);
   //..........................................................
   // @method
   o.setup    = FWglLayout_setup;
   // @method
   o.bind     = FWglLayout_bind;
   o.unbind   = FWglLayout_unbind;
   // @method
   o.active   = FWglLayout_active;
   o.deactive = FWglLayout_deactive;
   // @method
   o.dispose  = FWglLayout_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglLayout_setup(){
   var o = this;
   o.__base.FG3dLayout.setup.call(o);
   var c = o._graphicContext;
   o._native = c._nativeLayout.createVertexArrayOES();
}

//==========================================================
// <T>绑定处理。</T>
//
// @method
//==========================================================
function FWglLayout_bind(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(o._native);
}

//==========================================================
// <T>解除绑定处理。</T>
//
// @method
//==========================================================
function FWglLayout_unbind(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(null);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FWglLayout_active(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(o._native);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FWglLayout_deactive(){
   var o = this;
   var c = o._graphicContext;
   c._nativeLayout.bindVertexArrayOES(null);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FWglLayout_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._native;
   if(n){
      c._nativeLayout.deleteVertexArrayOES(n);
      o._native = null;
   }
}
