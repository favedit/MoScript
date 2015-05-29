with(MO){
   //==========================================================
   // <T>WebGL渲染布局。</T>
   //
   // @class
   // @author maocy
   // @history 150212
   //==========================================================
   MO.FWglLayout = function FWglLayout(o){
      o = RClass.inherits(this, o, FG3dLayout);
      //..........................................................
      // @attribute
      o._native  = null;
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
   MO.FWglLayout_setup = function FWglLayout_setup(){
      var o = this;
      o.__base.FG3dLayout.setup.call(o);
      // 创建层
      var c = o._graphicContext;
      o._native = c._nativeLayout.createVertexArrayOES();
   }

   //==========================================================
   // <T>绑定处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglLayout_bind = function FWglLayout_bind(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(o._native);
   }

   //==========================================================
   // <T>解除绑定处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglLayout_unbind = function FWglLayout_unbind(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(null);
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglLayout_active = function FWglLayout_active(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(o._native);
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglLayout_deactive = function FWglLayout_deactive(){
      var o = this;
      var c = o._graphicContext;
      c._nativeLayout.bindVertexArrayOES(null);
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
      var layout = o._native;
      if(layout){
         c._nativeLayout.deleteVertexArrayOES(layout);
         o._native = null;
      }
      // 父处理
      o.__base.FG3dLayout.dispose.call(o);
   }
}
