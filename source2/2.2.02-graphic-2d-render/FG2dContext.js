with(MO){
   //==========================================================
   // <T>渲染环境。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG2dContext = function FG2dContext(o){
      o = RClass.inherits(this, o, FGraphicContext);
      //..........................................................
      // @attribute
      o._size      = null;
      //..........................................................
      // @method
      o.construct  = FG2dContext_construct;
      // @method
      o.linkCanvas = FG2dContext_linkCanvas;
      // @method
      o.size       = FG2dContext_size;
      // @method
      o.dispose    = FG2dContext_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FG2dContext_construct = function FG2dContext_construct(){
      var o = this;
      o.__base.FGraphicContext.construct.call(o);
      // 设置属性
      o._size = new SSize2();
   }

   //==========================================================
   // <T>关联页面画布标签。</T>
   //
   // @method
   // @param h:hCanvas:HtmlCanvasTag 页面画布标签
   //==========================================================
   MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(h){
      var o = this;
      o._size.set(h.width, h.height);
   }

   //==========================================================
   // <T>获得尺寸。</T>
   //
   // @method
   // @return SSize2 尺寸
   //==========================================================
   MO.FG2dContext_size = function FG2dContext_size(){
      return this._size;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG2dContext_dispose = function FG2dContext_dispose(){
      var o = this;
      o._size = RObject.dispose(o._size);
      // 父处理
      o.__base.FGraphicContext.dispose.call(o);
   }
}
