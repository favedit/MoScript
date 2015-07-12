//==========================================================
// <T>WebGL渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
MO.FWglLayout = function FWglLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dLayout);
   //..........................................................
   // @attribute
   o._handle  = null;
   //..........................................................
   // @method
   o.setup    = MO.FWglLayout_setup;
   // @method
   o.bind     = MO.FWglLayout_bind;
   o.unbind   = MO.FWglLayout_unbind;
   // @method
   o.active   = MO.FWglLayout_active;
   o.deactive = MO.FWglLayout_deactive;
   // @method
   o.dispose  = MO.FWglLayout_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FWglLayout_setup = function FWglLayout_setup(){
   var o = this;
   o.__base.FG3dLayout.setup.call(o);
   // 创建层
   var c = o._graphicContext;
   o._handle = c._handleLayout.createVertexArrayOES();
}

//==========================================================
// <T>绑定处理。</T>
//
// @method
//==========================================================
MO.FWglLayout_bind = function FWglLayout_bind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}

//==========================================================
// <T>解除绑定处理。</T>
//
// @method
//==========================================================
MO.FWglLayout_unbind = function FWglLayout_unbind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FWglLayout_active = function FWglLayout_active(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
MO.FWglLayout_deactive = function FWglLayout_deactive(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FWglLayout_dispose = function FWglLayout_dispose(){
   var o = this;
   var c = o._graphicContext;
   // 释放对象
   var layout = o._handle;
   if(layout){
      c._handleLayout.deleteVertexArrayOES(layout);
      o._handle = null;
   }
   // 父处理
   o.__base.FG3dLayout.dispose.call(o);
}
