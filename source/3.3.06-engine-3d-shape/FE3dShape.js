with(MO){
    //==========================================================
   // <T>渲染形状。</T>
   //
   // @class
   // @author maocy
   // @history 150610
   //==========================================================
   MO.FE3dShape = function FE3dShape(o){
      o = RClass.inherits(this, o, FE3dFace);
      //..........................................................
      // @method
      o.construct = FE3dShape_construct;
      // @method
      o.testReady = FE3dShape_testReady;
      o.loadUrl   = FE3dShape_loadUrl;
      // @method
      o.dispose   = FE3dShape_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShape_construct = function FE3dShape_construct(){
      var o = this;
      o.__base.FE3dFace.construct.call(o);
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @return 是否准备好
   //==========================================================
   MO.FE3dShape_testReady = function FE3dShape_testReady(){
      var o = this;
      if(!o._ready){
         var renderable = o._renderable;
         if(renderable){
            // 检查是否准备好
            o._ready = renderable.testReady();
            if(o._ready){
               var size = renderable.size();
               var adjustSize = renderable.adjustSize();
               var matrix = o.matrix();
               //matrix.sx = adjustSize.width / size.width;
               matrix.sz = adjustSize.height / size.height;
               matrix.updateForce();
               var event = new SEvent(o);
               o.processLoadListener(event);
               event.dispose();
            }
            // 设置材质引用
            o._materialReference = renderable;
         }
      }
      return o._ready;
   }

   //==========================================================
   // <T>加载位图处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShape_loadUrl = function FE3dShape_loadUrl(url){
      var o = this;
      var context = o._graphicContext;
      o._renderable = RConsole.find(FE3dShapeConsole).loadUrl(context, url);
      o._ready = false;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dShape_dispose = function FE3dShape_dispose(){
      var o = this;
      // 父处理
      o.__base.FE3dFace.dispose.call(o);
   }
}
